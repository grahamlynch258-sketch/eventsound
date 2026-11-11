// Re-uploads every object in the public image buckets with a 1-year cache
// header. New uploads from the admin already get this; existing objects were
// stored with "no-cache", which forces repeat visitors to re-download every
// image and stops Netlify's image resizer from caching them. URLs do not
// change. Objects that already have the header are skipped, so it is safe to
// run again.
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
const BUCKETS = (process.env.STORAGE_BUCKETS || "site-images,case-study-images").split(",").map((b) => b.trim()).filter(Boolean);
const CACHE_CONTROL = "31536000";

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing VITE_SUPABASE_URL (.env) or SUPABASE_SERVICE_ROLE_KEY (env var).");
  process.exit(1);
}

console.log(`Project: ${new URL(SUPABASE_URL).host}`);
const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function listAll(bucket, prefix = "") {
  const files = [];
  let offset = 0;
  for (;;) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(prefix, { limit: 100, offset, sortBy: { column: "name", order: "asc" } });
    if (error) throw error;
    if (!data?.length) break;
    for (const entry of data) {
      const full = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.id === null) {
        files.push(...(await listAll(bucket, full))); // folder
      } else {
        files.push({ path: full, cacheControl: entry.metadata?.cacheControl || "" });
      }
    }
    if (data.length < 100) break;
    offset += 100;
  }
  return files;
}

let totalOk = 0;
let totalFailed = 0;
for (const bucket of BUCKETS) {
  let files;
  try {
    files = await listAll(bucket);
  } catch (err) {
    console.error(`Could not list "${bucket}": ${err.message}`);
    totalFailed++;
    continue;
  }
  const todo = files.filter((file) => !file.cacheControl.includes(CACHE_CONTROL));
  console.log(`"${bucket}": ${files.length} objects, ${files.length - todo.length} already cached for a year, ${todo.length} to refresh.`);
  if (files.length === 0) {
    console.log("  (0 objects usually means the key is not the service_role key, or the bucket name is wrong.)");
  }

  let ok = 0;
  let failed = 0;
  for (const file of todo) {
    try {
      const { data, error: dlError } = await supabase.storage.from(bucket).download(file.path);
      if (dlError) throw dlError;
      const { error: upError } = await supabase.storage.from(bucket).upload(file.path, data, {
        cacheControl: CACHE_CONTROL,
        contentType: data.type || undefined,
        upsert: true,
      });
      if (upError) throw upError;
      ok++;
      if (ok % 10 === 0 || ok === todo.length) console.log(`  refreshed ${ok}/${todo.length}`);
    } catch (err) {
      failed++;
      console.error(`  FAILED ${file.path}: ${err.message}`);
    }
  }
  totalOk += ok;
  totalFailed += failed;
}
console.log(`\nDone. ${totalOk} refreshed, ${totalFailed} failed.`);
process.exit(totalFailed ? 1 : 0);
