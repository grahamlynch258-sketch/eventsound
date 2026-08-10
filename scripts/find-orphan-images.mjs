// Finds files in the site-images bucket that nothing in the database points at.
//
// Uses the SERVICE ROLE key so it can see every row, including unpublished
// gallery items and draft case studies. That matters: a check run with the
// public key cannot see those rows, and would wrongly report their images as
// unused. Do not try to do this with the anon key.
//
// Safe by default — prints a report and deletes nothing.
//
//   node scripts/find-orphan-images.mjs              # dry run (default)
//   node scripts/find-orphan-images.mjs --superseded # delete ONLY originals whose
//                                                    # "-optimized" twin is in use
//   node scripts/find-orphan-images.mjs --all        # delete every unreferenced file
//
// Usage (PowerShell, one session only — never commit this key):
//   $env:SUPABASE_SERVICE_ROLE_KEY = "<service role key from Supabase → Settings → API>"
//   node scripts/find-orphan-images.mjs
import { createClient } from "@supabase/supabase-js";
import { loadEnv } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOCAL_ENV = loadEnv("production", path.join(__dirname, ".."), "");
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || LOCAL_ENV.VITE_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "site-images";

// Every table that can hold an image URL. Whole rows are scanned, so a URL
// embedded in body text (e.g. a case study) still counts as "in use".
const TABLES = [
  "library_images",
  "gallery_items",
  "service_page_images",
  "site_images",
  "about_images",
  "categories",
  "case_studies",
  "site_content",
  "page_seo",
];

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing VITE_SUPABASE_URL (.env) or SUPABASE_SERVICE_ROLE_KEY (env var).");
  console.error('PowerShell:  $env:SUPABASE_SERVICE_ROLE_KEY = "<key>"');
  process.exit(1);
}

const mode = process.argv.includes("--all") ? "all"
  : process.argv.includes("--superseded") ? "superseded"
  : "dry";

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function listAll(prefix = "") {
  const out = [];
  let offset = 0;
  for (;;) {
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .list(prefix, { limit: 100, offset, sortBy: { column: "name", order: "asc" } });
    if (error) throw error;
    if (!data?.length) break;
    for (const entry of data) {
      const full = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.id === null) out.push(...(await listAll(full)));
      else out.push({ path: full, size: Number(entry.metadata?.size ?? 0) });
    }
    if (data.length < 100) break;
    offset += 100;
  }
  return out;
}

console.log("Reading storage…");
const files = await listAll();
const totalMb = files.reduce((n, f) => n + f.size, 0) / 1024 / 1024;
console.log(`  ${files.length} files, ${totalMb.toFixed(1)} MB`);

console.log("Reading every database row (service role — sees drafts too)…");
let blob = "";
for (const table of TABLES) {
  const { data, error } = await supabase.from(table).select("*");
  if (error) {
    console.log(`  ${table}: skipped (${error.message})`);
    continue;
  }
  blob += JSON.stringify(data);
  console.log(`  ${table}: ${data.length} rows`);
}

// A file counts as referenced if its path appears anywhere in that text,
// either raw or URL-encoded (spaces become %20 inside a URL).
const isReferenced = (p) => blob.includes(p) || blob.includes(encodeURIComponent(p)) || blob.includes(p.replace(/ /g, "%20"));

const orphans = files.filter((f) => !isReferenced(f.path));
const stem = (p) => p.replace(/\.(jpe?g|png|webp|heic|avif)$/i, "").replace(/-optimized$/, "");
const referencedStems = new Set(files.filter((f) => isReferenced(f.path)).map((f) => stem(f.path)));

const superseded = orphans.filter((f) => referencedStems.has(stem(f.path)));
const noTwin = orphans.filter((f) => !referencedStems.has(stem(f.path)));
const mb = (list) => (list.reduce((n, f) => n + f.size, 0) / 1024 / 1024).toFixed(1);

console.log(`\n── Result ─────────────────────────────────`);
console.log(`  In use                : ${files.length - orphans.length} files`);
console.log(`  Superseded originals  : ${superseded.length} files, ${mb(superseded)} MB  (an optimised copy is in use — safe to remove)`);
console.log(`  Unreferenced, no twin : ${noTwin.length} files, ${mb(noTwin)} MB  (check these before removing)`);

if (noTwin.length) {
  console.log(`\n  Largest unreferenced files with no optimised twin:`);
  for (const f of [...noTwin].sort((a, b) => b.size - a.size).slice(0, 20)) {
    console.log(`    ${(f.size / 1024).toFixed(0).padStart(6)} KB  ${f.path}`);
  }
}

if (mode === "dry") {
  console.log(`\nNothing deleted (dry run).`);
  console.log(`  --superseded  remove the ${superseded.length} superseded originals only`);
  console.log(`  --all         remove all ${orphans.length} unreferenced files`);
  process.exit(0);
}

const target = mode === "superseded" ? superseded : orphans;
console.log(`\nDeleting ${target.length} files (${mb(target)} MB)…`);
let removed = 0;
for (let i = 0; i < target.length; i += 100) {
  const batch = target.slice(i, i + 100).map((f) => f.path);
  const { error } = await supabase.storage.from(BUCKET).remove(batch);
  if (error) {
    console.error(`  batch failed: ${error.message}`);
    continue;
  }
  removed += batch.length;
  process.stdout.write(`\r  removed ${removed}/${target.length}`);
}
console.log(`\nDone. ${removed} files removed.`);
