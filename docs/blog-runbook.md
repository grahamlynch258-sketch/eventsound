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
  automation agent. Only `published` rows whose publish date has arrived are
  publicly readable, including through the raw API.
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

## Step 3 — Import all 20 drafts into the admin (once)

PowerShell, from the `eventsound-live` folder:

```
$env:SUPABASE_SERVICE_ROLE_KEY = "<service role key>"
node scripts/import-blog-posts.mjs            # dry run — shows what would happen
node scripts/import-blog-posts.mjs --import   # imports all 20 as DRAFTS
```

Nothing goes public at this step. Every post lands in **Admin → Blog** as a
draft with its scheduled date and a "N to tailor" badge. Re-running the import
later skips posts that already exist, so nothing you do in the admin gets
overwritten.

## Step 4 — Tailor and go live, post by post (all in the admin)

For each post, in Admin → Blog → edit:

1. **Tailor the text.** The amber badge counts the `[TAILOR: …]` spots; the
   "Find next [TAILOR]" button jumps to each one. Replace the marker with the
   real venue, number or story it asks for.
2. **Add the photos.** The "Photos for this article" section takes drag-and-
   drop uploads (compressed automatically, description required). For each
   photo: click into the article text where you want it, then press **Insert
   into article** — a `{{image:…}}` line drops in at your cursor and renders
   as a full-width photo with caption on the live page. Press **Featured** on
   the best one to make it the card/social image.
3. **Save**, then back on the list press **Go live**. The button stays
   disabled until the tailoring badge is gone. The post appears on the site
   from its publish date — future-dated posts stay hidden until the date, so
   you can make everything live in one sitting and the schedule drips them
   out two a week.
4. **Take offline** reverses it any time; nothing is deleted.

## Step 5 — After posts start appearing

1. Press **Publish site** on the Dashboard once after each publish date
   passes (rebakes the static pages + sitemap; the live pages themselves
   update automatically).
2. Search Console → URL Inspection → **Request Indexing** for each new
   `/blog/<slug>/` URL (~10/day quota).
3. Watch coverage and the success measures in
   [blog-content-plan.md](blog-content-plan.md).

## Editing after launch

Everything happens in Admin → Blog from here — the markdown files in
`content/blog/` are the historical source, not the live copy. (Re-importing
with `--force` would overwrite admin edits from the files; you almost never
want that.)
