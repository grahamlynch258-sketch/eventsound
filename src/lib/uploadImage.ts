import { supabase } from "@/integrations/supabase/client";

/**
 * Shared image upload core for all admin surfaces.
 *
 * Every image uploaded through here is:
 *  - decoded with EXIF orientation applied
 *  - resized to fit MAX_DIMENSION (only ever downscaled)
 *  - re-encoded to WebP (JPEG fallback for browsers without WebP encode)
 *  - stored under a per-section folder with a readable, unique filename
 *  - served with a 1-year immutable cache header (filenames are unique,
 *    so stale caches are impossible)
 *
 * GIFs and SVGs are uploaded untouched — re-encoding would destroy
 * animation / vector data.
 */

const MAX_DIMENSION = 2560;
const WEBP_QUALITY = 0.82;
const JPEG_QUALITY = 0.85;
const ONE_YEAR_SECONDS = "31536000";
const BUCKET = "site-images";

export interface PreparedImage {
  blob: Blob;
  contentType: string;
  extension: string;
  width: number | null;
  height: number | null;
}

export interface UploadedImage {
  publicUrl: string;
  path: string;
  width: number | null;
  height: number | null;
}

/** "My Photo (1).JPG" → "my-photo-1" */
export function slugifyFileName(name: string): string {
  const base = name.replace(/\.[^.]+$/, "");
  const slug = base
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return slug || "image";
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

export async function prepareImage(file: File): Promise<PreparedImage> {
  const passthrough = file.type === "image/gif" || file.type === "image/svg+xml";

  let bitmap: ImageBitmap | null = null;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    // Not decodable (e.g. some SVGs) — upload as-is with unknown dimensions.
  }

  if (passthrough || !bitmap) {
    return {
      blob: file,
      contentType: file.type || "application/octet-stream",
      extension: file.name.split(".").pop()?.toLowerCase() || "bin",
      width: bitmap?.width ?? null,
      height: bitmap?.height ?? null,
    };
  }

  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return {
      blob: file,
      contentType: file.type,
      extension: file.name.split(".").pop()?.toLowerCase() || "jpg",
      width: null,
      height: null,
    };
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  let blob = await canvasToBlob(canvas, "image/webp", WEBP_QUALITY);
  let contentType = "image/webp";
  let extension = "webp";
  if (!blob) {
    blob = await canvasToBlob(canvas, "image/jpeg", JPEG_QUALITY);
    contentType = "image/jpeg";
    extension = "jpg";
  }

  // If re-encoding didn't help (already well-optimised and no resize), keep the original.
  if (!blob || (scale === 1 && blob.size >= file.size)) {
    return {
      blob: file,
      contentType: file.type,
      extension: file.name.split(".").pop()?.toLowerCase() || "jpg",
      width,
      height,
    };
  }

  return { blob, contentType, extension, width, height };
}

export async function uploadImageToStorage(
  file: File,
  category?: string,
  bucket: string = BUCKET,
): Promise<UploadedImage> {
  const prepared = await prepareImage(file);
  const folder = category ? slugifyFileName(category) : "uploads";
  const path = `${folder}/${Date.now()}-${slugifyFileName(file.name)}.${prepared.extension}`;

  const { error } = await supabase.storage.from(bucket).upload(path, prepared.blob, {
    cacheControl: ONE_YEAR_SECONDS,
    contentType: prepared.contentType,
    upsert: false,
  });
  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);

  return { publicUrl, path, width: prepared.width, height: prepared.height };
}

/**
 * Best-effort delete of the storage object behind a public URL, whichever
 * public bucket it lives in. Never throws: rows referencing externally-hosted
 * or already-deleted objects should still be removable from the database.
 */
export async function deleteStorageObjectByUrl(publicUrl: string): Promise<void> {
  const match = publicUrl.match(/\/object\/public\/([^/]+)\/(.+?)(?:\?|$)/);
  if (!match) return;
  const [, bucket, rawPath] = match;
  const path = decodeURIComponent(rawPath);
  if (!path) return;
  try {
    await supabase.storage.from(bucket).remove([path]);
  } catch {
    // Ignore — orphan cleanup is handled by scripts/find-orphan-images.mjs.
  }
}
