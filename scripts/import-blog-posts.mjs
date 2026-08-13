// Imports blog posts from content/blog/*.md into the blog_posts table AS
// DRAFTS (status: awaiting_approval). Nothing becomes public from this
// script: tailoring, photos and the go-live toggle all happen in the admin
// (Admin → Blog). TAILOR markers are fine in drafts — the admin shows a
// per-post "N to tailor" badge and blocks Go live until they're gone.
//
// Safety:
//  - DRY RUN by default — prints what would happen, writes nothing.
//    Pass --import to actually write.
//  - Posts whose slug already exists are SKIPPED, so re-running never
//    clobbers tailoring done in the admin. Pass --force to overwrite an
//    existing draft's fields from the file (status is never touched).
//  - Files starting with "_" (e.g. _FACTS.md) are always ignored.
//
// Usage (PowerShell, one session only — never commit this key):
//   $env:SUPABASE_SERVICE_ROLE_KEY = "<service role key from Supabase → Settings → API>"
//   node scripts/import-blog-posts.mjs            # dry run
//   node scripts/import-blog-posts.mjs --import   # import all posts as drafts
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'blog');

// Read VITE_SUPABASE_URL from .env without a dotenv dependency
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const m = line.trim().match(/^([A-Z_]+)=["']?([^"']*)["']?$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const doImport = process.argv.includes('--import');
const force = process.argv.includes('--force');

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing VITE_SUPABASE_URL (.env) or SUPABASE_SERVICE_ROLE_KEY (env var).');
  process.exit(1);
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return null;
  const meta = {};
  for (const rawLine of match[1].split('\n')) {
    const line = rawLine.replace(/\r$/, '');
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      meta[kv[1]] = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    } else {
      meta[kv[1]] = value.replace(/^["']|["']$/g, '');
    }
  }
  return { meta, body: match[2].trim() };
}

const REQUIRED = ['slug', 'title', 'meta_title', 'meta_description', 'excerpt', 'category', 'primary_keyword', 'published_at'];

const files = fs.readdirSync(CONTENT_DIR)
  .filter(f => f.endsWith('.md') && !f.startsWith('_'))
  .sort();

console.log(`${files.length} post files found in content/blog/  (${doImport ? 'IMPORTING' : 'dry run — pass --import to write'})\n`);

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
let ok = 0, skipped = 0, failed = 0;

for (const file of files) {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
  const parsed = parseFrontmatter(raw);
  if (!parsed) { console.log(`✗ ${file}: no frontmatter block`); failed++; continue; }
  const { meta, body } = parsed;

  const missing = REQUIRED.filter(k => !meta[k]);
  if (missing.length) { console.log(`✗ ${file}: missing frontmatter: ${missing.join(', ')}`); failed++; continue; }

  const tailorCount = (raw.match(/\[TAILOR/g) || []).length;
  const tailorNote = tailorCount > 0 ? ` (${tailorCount} tailoring spots — finish in the admin)` : '';

  const fields = {
    title: meta.title,
    excerpt: meta.excerpt,
    content: body,
    topic: meta.primary_keyword || meta.title,
    primary_keyword: meta.primary_keyword,
    meta_title: meta.meta_title,
    meta_description: meta.meta_description,
    featured_image_url: meta.featured_image || null,
    featured_image_alt: meta.featured_image_alt || null,
    author: meta.author || 'Graham Lynch',
    category: meta.category,
    tags: Array.isArray(meta.tags) ? meta.tags : [],
    noindex: false,
    published_at: new Date(meta.published_at).toISOString(),
  };

  if (!doImport) {
    console.log(`✓ ${file}: would import draft "${fields.title}" (${body.split(/\s+/).length} words, scheduled ${fields.published_at.slice(0, 10)})${tailorNote}`);
    ok++;
    continue;
  }

  try {
    const { data: existing, error: readError } = await supabase
      .from('blog_posts').select('id, status').eq('slug', meta.slug).maybeSingle();
    if (readError) throw readError;

    if (!existing) {
      const { error: insertError } = await supabase
        .from('blog_posts')
        .insert({ slug: meta.slug, status: 'awaiting_approval', ...fields });
      if (insertError) throw insertError;
      console.log(`✓ ${file}: imported draft "${fields.title}"${tailorNote}`);
      ok++;
    } else if (force) {
      // Overwrite content fields from the file but never touch status —
      // a live post stays live, a draft stays a draft.
      const { error: updateError } = await supabase
        .from('blog_posts').update(fields).eq('id', existing.id);
      if (updateError) throw updateError;
      console.log(`✓ ${file}: overwrote existing ${existing.status} post from file (--force)`);
      ok++;
    } else {
      console.log(`⏭  ${file}: already in the database (${existing.status}) — skipped so admin edits are safe. Use --force to overwrite.`);
      skipped++;
    }
  } catch (err) {
    console.log(`✗ ${file}: ${err.message}`);
    failed++;
    continue;
  }
}

console.log(`\n${ok} ok, ${skipped} skipped, ${failed} failed.`);
if (doImport && ok > 0) {
  console.log('\nAll imported posts are DRAFTS. Next: Admin → Blog — tailor each post (text +');
  console.log('photos), then press "Go live". Posts appear on the site from their publish');
  console.log('date. After the first few go live, press "Publish site" on the Dashboard so');
  console.log('the prerendered pages and sitemap update, then request indexing in Search');
  console.log('Console for each new URL.');
}
