/**
 * optimize-images.mjs
 *
 * Downloads images from Supabase storage, converts to WebP (quality 75),
 * resizes (hero → 1920px wide, gallery/thumbnails → 800px wide),
 * uploads the optimised version back to the same bucket, and updates
 * the database row to point at the new URL.
 *
 * Usage:
 *   node scripts/optimize-images.mjs --dry-run   # preview without changing anything
 *   node scripts/optimize-images.mjs              # optimise all unoptimised images
 *
 * Requires in .env:
 *   VITE_SUPABASE_URL
 *   VITE_SUPABASE_PUBLISHABLE_KEY  (anon key — used for reads)
 *   SUPABASE_SERVICE_ROLE_KEY       (service key — needed for writes/uploads)
 *
 * The service role key is in your Supabase dashboard → Settings → API → service_role.
 * Add it to .env as:  SUPABASE_SERVICE_ROLE_KEY="eyJ..."
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

// ── Load .env manually (no dotenv dependency) ───────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let val = trimmed.slice(eqIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "site-images";
const DRY_RUN = process.argv.includes("--dry-run");

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in .env");
  process.exit(1);
}

if (!DRY_RUN && !SUPABASE_SERVICE_KEY) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY in .env (required for writes).");
  console.error("Find it in Supabase Dashboard → Settings → API → service_role.");
  console.error("Add to .env:  SUPABASE_SERVICE_ROLE_KEY=\"eyJ...\"");
  console.error("\nRun with --dry-run to preview without needing the service key.");
  process.exit(1);
}

// Read headers use anon key; write headers use service role key
const readHeaders = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
};

const writeHeaders = SUPABASE_SERVICE_KEY
  ? { apikey: SUPABASE_SERVICE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_KEY}` }
  : readHeaders;

// Hero categories get 1920px max width; everything else gets 800px
const HERO_CATEGORIES = ["portfolio", "service-led-walls", "service-av-production",
  "service-lighting", "service-staging", "service-event-production",
  "service-video-production", "service-virtual-events"];

function isHeroCategory(category) {
  return HERO_CATEGORIES.includes(category);
}

// ── Supabase REST helpers ───────────────────────────────────────────────────

async function fetchAllImages(table) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${table}?select=id,image_url,category,file_name,alt_text&order=created_at.asc`,
    { headers: readHeaders }
  );
  if (!res.ok) throw new Error(`Failed to fetch ${table}: ${res.status} ${await res.text()}`);
  return res.json();
}

async function fetchGalleryItems() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/gallery_items?select=id,image_url,title,alt_text&order=sort_order.asc`,
    { headers: readHeaders }
  );
  if (!res.ok) throw new Error(`Failed to fetch gallery_items: ${res.status}`);
  return res.json();
}

async function updateImageUrl(table, id, newUrl) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`,
    {
      method: "PATCH",
      headers: { ...writeHeaders, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({ image_url: newUrl }),
    }
  );
  if (!res.ok) throw new Error(`Failed to update ${table} id=${id}: ${res.status}`);
}

async function uploadToStorage(fileName, buffer, contentType) {
  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${fileName}`,
    {
      method: "POST",
      headers: {
        ...writeHeaders,
        "Content-Type": contentType,
        "x-upsert": "true",
      },
      body: buffer,
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed for ${fileName}: ${res.status} ${text}`);
  }
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${fileName}`;
}

// ── Core optimisation ───────────────────────────────────────────────────────

async function optimizeImage(imageUrl, maxWidth) {
  // Download the original
  const res = await fetch(imageUrl);
  if (!res.ok) throw new Error(`Download failed: ${res.status} ${imageUrl}`);
  const buffer = Buffer.from(await res.arrayBuffer());

  const originalKB = (buffer.length / 1024).toFixed(0);

  // Get metadata
  const metadata = await sharp(buffer).metadata();
  const needsResize = metadata.width > maxWidth;

  // Convert to WebP, resize if needed
  let pipeline = sharp(buffer).webp({ quality: 75 });
  if (needsResize) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  const optimized = await pipeline.toBuffer();
  const optimizedKB = (optimized.length / 1024).toFixed(0);
  const savings = (((buffer.length - optimized.length) / buffer.length) * 100).toFixed(0);

  return {
    buffer: optimized,
    originalKB,
    optimizedKB,
    savings,
    originalWidth: metadata.width,
    originalHeight: metadata.height,
    originalFormat: metadata.format,
  };
}

function getOptimizedFileName(originalUrl) {
  // Extract the filename from the Supabase URL
  const urlObj = new URL(originalUrl);
  const pathParts = urlObj.pathname.split("/");
  const originalName = pathParts[pathParts.length - 1];

  // Replace extension with -optimized.webp
  const nameWithoutExt = originalName.replace(/\.[^.]+$/, "");
  return `${nameWithoutExt}-optimized.webp`;
}

function isAlreadyOptimized(url) {
  return url.includes("-optimized.webp");
}

function isSupabaseStorageUrl(url) {
  return url && url.includes("/storage/v1/object/public/");
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(DRY_RUN ? "🔍 DRY RUN — no changes will be made\n" : "");

  // Fetch all images from both tables
  const [libraryImages, galleryItems] = await Promise.all([
    fetchAllImages("library_images"),
    fetchGalleryItems(),
  ]);

  console.log(`Found ${libraryImages.length} library images, ${galleryItems.length} gallery items\n`);

  let optimized = 0;
  let skipped = 0;
  let errors = 0;
  let totalSaved = 0;

  // Process library_images
  for (const img of libraryImages) {
    if (!isSupabaseStorageUrl(img.image_url)) {
      console.log(`  SKIP (not Supabase storage): ${img.file_name || img.id}`);
      skipped++;
      continue;
    }

    if (isAlreadyOptimized(img.image_url)) {
      console.log(`  SKIP (already optimized): ${img.file_name || img.id}`);
      skipped++;
      continue;
    }

    const maxWidth = isHeroCategory(img.category) ? 1920 : 800;
    const label = `[library_images] ${img.category}/${img.file_name || img.id}`;

    try {
      const result = await optimizeImage(img.image_url, maxWidth);
      const newFileName = getOptimizedFileName(img.image_url);

      if (DRY_RUN) {
        console.log(`  ${label}`);
        console.log(`    ${result.originalFormat} ${result.originalWidth}x${result.originalHeight} → WebP ${maxWidth}px max`);
        console.log(`    ${result.originalKB} KB → ${result.optimizedKB} KB (${result.savings}% smaller)`);
      } else {
        const newUrl = await uploadToStorage(newFileName, result.buffer, "image/webp");
        await updateImageUrl("library_images", img.id, newUrl);
        console.log(`  ✓ ${label}: ${result.originalKB} KB → ${result.optimizedKB} KB (${result.savings}% smaller)`);
      }

      totalSaved += parseInt(result.originalKB) - parseInt(result.optimizedKB);
      optimized++;
    } catch (err) {
      console.error(`  ✗ ${label}: ${err.message}`);
      errors++;
    }
  }

  // Process gallery_items
  for (const item of galleryItems) {
    if (!isSupabaseStorageUrl(item.image_url)) {
      console.log(`  SKIP (not Supabase storage): ${item.title || item.id}`);
      skipped++;
      continue;
    }

    if (isAlreadyOptimized(item.image_url)) {
      console.log(`  SKIP (already optimized): ${item.title || item.id}`);
      skipped++;
      continue;
    }

    const label = `[gallery_items] ${item.title || item.id}`;

    try {
      const result = await optimizeImage(item.image_url, 800);
      const newFileName = getOptimizedFileName(item.image_url);

      if (DRY_RUN) {
        console.log(`  ${label}`);
        console.log(`    ${result.originalFormat} ${result.originalWidth}x${result.originalHeight} → WebP 800px max`);
        console.log(`    ${result.originalKB} KB → ${result.optimizedKB} KB (${result.savings}% smaller)`);
      } else {
        const newUrl = await uploadToStorage(newFileName, result.buffer, "image/webp");
        await updateImageUrl("gallery_items", item.id, newUrl);
        console.log(`  ✓ ${label}: ${result.originalKB} KB → ${result.optimizedKB} KB (${result.savings}% smaller)`);
      }

      totalSaved += parseInt(result.originalKB) - parseInt(result.optimizedKB);
      optimized++;
    } catch (err) {
      console.error(`  ✗ ${label}: ${err.message}`);
      errors++;
    }
  }

  // Summary
  console.log(`\n${"─".repeat(60)}`);
  console.log(`${DRY_RUN ? "Would optimise" : "Optimised"}: ${optimized} images`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Errors: ${errors}`);
  console.log(`Total savings: ~${totalSaved} KB (~${(totalSaved / 1024).toFixed(1)} MB)`);
  if (DRY_RUN) console.log(`\nRe-run without --dry-run to apply changes.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
