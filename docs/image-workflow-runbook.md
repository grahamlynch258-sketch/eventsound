# Image workflow — one-time setup runbook

Three setup steps, in this order. Step 1 is safe to do right now, before the new
code is deployed (it only *adds* things; the current live site ignores them).
Deploy the code only after Step 1 is done.

> These changes live on the branch `feat/image-workflow`, checked out in the
> separate folder `Documents\GitHub\eventsound-live` (a git worktree of the same
> repo, based on the real GitHub `main` that Netlify deploys). Your old clone in
> `Documents\GitHub\eventsound` is a stale line of history kept as an archive —
> don't push from it.

---

## Step 1 — Run this SQL in Supabase (do this first)

Supabase Dashboard → project **blhxvtmhhvrorajkszhy** (the one the live site
uses) → **SQL Editor** → paste everything below → **Run**.

It does two things:
- Adds ordering/activation columns to `library_images` (reorder arrows and
  Live/Hidden switches in the admin).
- Creates the `service_sections` table — its migration file has existed in the
  repo since February but was never applied to the live database, so the admin
  "Content Sections" tab has been silently broken.

```sql
-- ============================================================
-- 1) library_images: ordering, activation, dimensions
-- ============================================================
ALTER TABLE public.library_images
  ADD COLUMN IF NOT EXISTS sort_order  integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_active   boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS width       integer,
  ADD COLUMN IF NOT EXISTS height      integer,
  ADD COLUMN IF NOT EXISTS updated_at  timestamptz NOT NULL DEFAULT now();

WITH ranked AS (
  SELECT id,
         row_number() OVER (PARTITION BY category ORDER BY created_at ASC) - 1 AS rn
  FROM public.library_images
)
UPDATE public.library_images li
SET sort_order = ranked.rn
FROM ranked
WHERE li.id = ranked.id;

DROP TRIGGER IF EXISTS update_library_images_updated_at ON public.library_images;
CREATE TRIGGER update_library_images_updated_at
BEFORE UPDATE ON public.library_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_library_images_cat_active_order
  ON public.library_images (category, is_active, sort_order);

-- ============================================================
-- 2) service_sections: apply the migration that never reached prod
-- ============================================================
CREATE TABLE IF NOT EXISTS public.service_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_key TEXT NOT NULL,
    image_url TEXT NOT NULL,
    file_name TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    title_attr TEXT,
    caption TEXT,
    section_heading TEXT,
    section_description TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.service_sections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read service_sections" ON public.service_sections;
CREATE POLICY "Anyone can read service_sections"
ON public.service_sections FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Admins can insert service_sections" ON public.service_sections;
CREATE POLICY "Admins can insert service_sections"
ON public.service_sections FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can update service_sections" ON public.service_sections;
CREATE POLICY "Admins can update service_sections"
ON public.service_sections FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can delete service_sections" ON public.service_sections;
CREATE POLICY "Admins can delete service_sections"
ON public.service_sections FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX IF NOT EXISTS idx_service_sections_key_order
ON public.service_sections (service_key, sort_order);
```

Expected result: "Success. No rows returned" (the UPDATE reports ~153 rows).

---

## Step 2 — Create the Netlify build hook (for the Publish button)

1. Netlify → your site → **Site configuration → Build & deploy → Build hooks →
   Add build hook**. Name it `Admin publish button`, branch `main`. Copy the URL.
2. Netlify → **Site configuration → Environment variables → Add a variable**:
   - Key: `NETLIFY_BUILD_HOOK`
   - Value: the URL you just copied
3. Keep this server-only value in Netlify. Do not prefix it with `VITE_` or add
   it to a client-side environment file, because Vite variables are public.

The Dashboard button calls an authenticated Netlify function. The function
verifies the signed-in Supabase user has the `admin` role before reading this
server-only hook and triggering the build. Until the variable is set, the
button reports that publishing is not configured.

---

## Step 3 — Review, merge, deploy

1. Step 1 SQL run ✔
2. Review the branch `feat/image-workflow` (GitHub Desktop → the
   `eventsound-live` folder) and merge it to `main` however you normally do
   (PR or direct push). Netlify builds `main` as usual.
3. In Admin → Image Library you'll now see: drag-and-drop upload with a
   required alt-text step, ⬆⬇ reorder arrows, Live/Hidden switches, and each
   tab labelled with exactly where its photos appear.
4. Press **Publish site** (Dashboard) only after changing the **first**
   homepage slideshow image or when prerendered pages need re-baking.
   Everything else goes live instantly.

---

## Content jobs the admin can now do (no code involved)

- **18 filled image slots on the LED / Musical & Theatre pages have no alt
  text** — Admin → Manage Images, click through the slots and add descriptions.
- **The 6 "Behind the Scenes" photos on the About page have no alt text** —
  Admin → Image Library → About tab.
- The FAQ / Reviews / Health & Safety pages have never had banner images —
  three new Library tabs now exist for them (optional).
- The "General Library" tab holds ~105 old unlabelled images that aren't shown
  anywhere — ignore, or tidy when bored. Nothing depends on them.

## Optional script (run locally — needs the service-role key)

`node scripts/refresh-storage-cache.mjs` — re-uploads every existing storage
object with a 1-year cache header (they currently serve `no-cache`, so repeat
visitors re-download every image; new uploads are already fixed). URLs don't
change. Get the key from Supabase → Project Settings → API keys. **Never commit
it or put it in `.env`.** PowerShell, one session only:
`$env:SUPABASE_SERVICE_ROLE_KEY = "<paste>"` then run the script from the
`eventsound-live` folder.
