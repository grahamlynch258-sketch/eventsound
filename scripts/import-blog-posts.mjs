// Imports blog posts from content/blog/*.md into the blog_posts table.
//
// Each file needs the frontmatter described in content/blog/_FACTS.md.
// Posts are upserted by slug with status "published", so re-running after an
// edit updates the existing row rather than duplicating it.
//
// Safety:
//  - DRY RUN by default — prints what would happen, writes nothing.
//    Pass --import to actually write.
//  - Files still containing "[TAILOR" markers are skipped: they are drafts
//    awaiting Graham's real-event details. Override with --allow-tailor only
//    for testing on a non-production project.
//  - Files starting with "_" (e.g. _FACTS.md) are always ignored.
//
// Usage (PowerShell, one session only — never commit this key):
//   $env:SUPABASE_SERVICE_ROLE_KEY = "<service role key from Supabase → Settings → API>"
//   node scripts/import-blog-posts.mjs            # dry run
//   node scripts/import-blog-posts.mjs --import   # real import
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
const allowTailor = process.argv.includes('--allow-tailor');

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing VITE_SUPABASE_URL (.env) or SUPABASE_SERVICE_ROLE_KEY (env var).');
  process.exit(1);
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return null;
  const meta = {};
  for (const line of match[1].split('\n')) {
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
  if (tailorCount > 0 && !allowTailor) {
    console.log(`⏭  ${file}: ${tailorCount} [TAILOR] markers remain — finish tailoring first`);
    skipped++;
    continue;
  }

  const fields = {
    title: meta.title,
    excerpt: meta.excerpt,
    content: body,
    topic: meta.primary_keyword || meta.title,
    primary_keyword: meta.primary_keyword,
    meta_title: meta.meta_title,
    meta_description: meta.meta_description,
    featured_image_url: meta.featured_image || null,
    featured_image_alt: meta.featured_image_alt && !meta.featured_image_alt.includes('[TAILOR') ? meta.featured_image_alt : null,
    author: meta.author || 'Graham Lynch',
    category: meta.category,
    tags: Array.isArray(meta.tags) ? meta.tags : [],
    noindex: false,
    published_at: new Date(meta.published_at).toISOString(),
  };

  if (!doImport) {
    console.log(`✓ ${file}: would publish "${fields.title}" (${body.split(/\s+/).length} words, ${fields.published_at.slice(0, 10)})`);
    ok++;
    continue;
  }

  try {
    // A database trigger forbids inserting rows directly as "published" —
    // new posts go in as awaiting_approval, then approve_blog_post() flips
    // them (keeping our published_at). Existing published posts are updated
    // in place without touching status, so the trigger never objects.
    const { data: existing, error: readError } = await supabase
      .from('blog_posts').select('id, status').eq('slug', meta.slug).maybeSingle();
    if (readError) throw readError;

    if (!existing) {
      const { data: inserted, error: insertError } = await supabase
        .from('blog_posts')
        .insert({ slug: meta.slug, status: 'awaiting_approval', ...fields })
        .select('id').single();
      if (insertError) throw insertError;
      const { error: approveError } = await supabase.rpc('approve_blog_post', {
        _post_id: inserted.id, _approved_by: 'bulk import',
      });
      if (approveError) throw approveError;
      console.log(`✓ ${file}: published "${fields.title}"`);
    } else if (existing.status === 'published') {
      const { error: updateError } = await supabase
        .from('blog_posts').update(fields).eq('id', existing.id);
      if (updateError) throw updateError;
      console.log(`✓ ${file}: updated already-published "${fields.title}"`);
    } else {
      const { error: updateError } = await supabase
        .from('blog_posts').update({ status: 'awaiting_approval', ...fields }).eq('id', existing.id);
      if (updateError) throw updateError;
      const { error: approveError } = await supabase.rpc('approve_blog_post', {
        _post_id: existing.id, _approved_by: 'bulk import',
      });
      if (approveError) throw approveError;
      console.log(`✓ ${file}: published "${fields.title}"`);
    }
    ok++;
  } catch (err) {
    console.log(`✗ ${file}: ${err.message}`);
    failed++;
    continue;
  }
}

console.log(`\n${ok} ok, ${skipped} skipped (tailoring pending), ${failed} failed.`);
if (doImport && ok > 0) {
  console.log('\nNext: press "Publish site" in the admin (or trigger a Netlify deploy) so the');
  console.log('prerendered pages and sitemap pick up the new posts, then request indexing in');
  console.log('Search Console for each new URL.');
}
