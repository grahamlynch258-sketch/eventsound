# Blog — setup and publishing runbook

The blog ships in four steps. Step 1 (SQL) is safe to run right now and must
happen before the code deploys. Steps 3–4 repeat for every publishing wave.

---

## Step 1 — Run the blog migration in Supabase (once)

Supabase Dashboard → project **blhxvtmhhvrorajkszhy** → **SQL Editor** → paste
the entire contents of
[supabase/migrations/20260807000001_blog_automation_v1.sql](../supabase/migrations/20260807000001_blog_automation_v1.sql)
→ **Run**. (It's the whole file — ~240 lines. Run it **once**: it creates
types and tables without IF-NOT-EXISTS guards, so a second run errors
harmlessly on the first line.)

What it creates:
- `blog_posts` — the posts, with SEO fields and a status pipeline
  (`idea → … → awaiting_approval → published`) built for the future
  automation agent. Only `published` rows are publicly readable.
- `blog_images` — per-post image records (used later by the automation).
- A `blog-images` storage bucket (public read, admin write).
- Guard rails: a post can never be *inserted* as published — it must pass
  through approval. The import script (Step 3) handles this automatically.

Expected result: "Success. No rows returned".

## Step 2 — Deploy the blog code

Merge/push the `feat/blog` branch to `main` (or tell Claude to push it).
Netlify builds as usual. After deploy:
- `/blog` and `/blog/<slug>/` routes exist (listing shows a friendly empty
  state until posts are imported)
- Blog appears in the header (under Portfolio) and footer navigation
- Admin Dashboard gains a **Blog** card (list, edit, statuses)
- The prerender and sitemap automatically include published posts on every
  build — each post ships as fully crawlable static HTML with Article +
  Breadcrumb schema

## Step 3 — Tailor, then import the posts

The 20 drafts live in `content/blog/*.md`. Workflow:

1. **Read each post** (Graham). Where you see a `> [TAILOR: …]` marker, that's
   where a real event, venue, number or photo goes — voice-note or edit it in.
   The frontmatter `featured_image` / `featured_image_alt` also need a real
   library image URL + description per post.
2. **Import** (PowerShell, from the `eventsound-live` folder):

   ```
   $env:SUPABASE_SERVICE_ROLE_KEY = "<service role key>"
   node scripts/import-blog-posts.mjs            # dry run — shows what would happen
   node scripts/import-blog-posts.mjs --import   # actually publishes
   ```

   Safety built in: files still containing `[TAILOR` markers are **skipped**
   (they're unfinished), files are matched by slug so re-running after edits
   updates rather than duplicates, and the publish dates come from each
   file's `published_at` (waves: 20 Aug / 27 Aug / 3 Sep — edit freely).

3. Posts are live on the site the moment the import finishes (the pages read
   from the database). The static/prerendered versions and the sitemap update
   at the next build →

## Step 4 — Publish + request indexing (per wave)

1. Press **Publish site** on the admin Dashboard (rebakes static HTML +
   sitemap with the new posts).
2. Search Console → URL Inspection → **Request Indexing** for each new
   `/blog/<slug>/` URL (~10/day quota — a wave of 8 fits in one sitting).
3. Watch Search Console coverage over the following days; the content plan's
   success measures live in [blog-content-plan.md](blog-content-plan.md).

## Editing after launch

- Quick fixes: Admin → Blog → edit the post (live immediately; press Publish
  site if you want the static copy refreshed too).
- Bigger edits: change the markdown file and re-run the import (`--import`) —
  it updates the published row in place.
