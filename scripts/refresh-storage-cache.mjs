// Re-uploads every object in the site-images bucket with a 1-year cache
// header. New uploads from the admin already get this; existing objects were
// stored with "no-cache", which forces repeat visitors to re-download every
// image. URLs do not change.
//
// Usage (PowerShell, one session only — never commit this key):
//   $env:SUPABASE_SERVICE_ROLE_KEY = "<service role key from Supabase → Settings → API>"
//   node scripts/refresh-storage-cache.mjs
import { createClient } from "@supabase/supabase-js";
import { loadEnv } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOCAL_ENV = loadEnv("production", path.join(__dirname, ".."), "");
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || LOCAL_ENV.VITE_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "site-images";
const CACHE_CONTROL = "31536000";

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing VITE_SUPABASE_URL (.env) or SUPABASE_SERVICE_ROLE_KEY (env var).");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function listAll(prefix = "") {
  const files = [];
  let offset = 0;
  for (;;) {
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .list(prefix, { limit: 100, offset, sortBy: { column: "name", order: "asc" } });
    if (error) throw error;
    if (!data?.length) break;
    for (const entry of data) {
      const full = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.id === null) {
        files.push(...(await listAll(full))); // folder
      } else {
        files.push(full);
      }
    }
    if (data.length < 100) break;
    offset += 100;
  }
  return files;
}

const files = await listAll();
console.log(`Found ${files.length} objects in "${BUCKET}".`);

let ok = 0;
let failed = 0;
for (const file of files) {
  try {
    const { data, error: dlError } = await supabase.storage.from(BUCKET).download(file);
    if (dlError) throw dlError;
    const { error: upError } = await supabase.storage.from(BUCKET).upload(file, data, {
      cacheControl: CACHE_CONTROL,
      contentType: data.type || undefined,
      upsert: true,
    });
    if (upError) throw upError;
    ok++;
    process.stdout.write(`\r  refreshed ${ok}/${files.length}`);
  } catch (err) {
    failed++;
    console.error(`\n  FAILED ${file}: ${err.message}`);
  }
}
console.log(`\nDone. ${ok} refreshed, ${failed} failed.`);
