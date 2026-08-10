-- Library images: explicit ordering, activation, stored dimensions.
-- Additive only — safe to run against the live project while the current
-- site code is deployed (old code ignores these columns).

ALTER TABLE public.library_images
  ADD COLUMN IF NOT EXISTS sort_order  integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_active   boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS width       integer,
  ADD COLUMN IF NOT EXISTS height      integer,
  ADD COLUMN IF NOT EXISTS updated_at  timestamptz NOT NULL DEFAULT now();

-- Preserve today's implicit display order (created_at ascending, per category)
-- so the site looks identical the moment the new code deploys.
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
