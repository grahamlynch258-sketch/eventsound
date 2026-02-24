-- Drop existing constraint and recreate with new categories
ALTER TABLE public.library_images DROP CONSTRAINT IF EXISTS library_images_category_check;

-- No constraint needed — allow any string value for category
-- This avoids needing a migration every time a new category is added
