
-- Add 3 portrait background images for the bottom section of the homepage
INSERT INTO public.site_images (page, section, key, image_url, alt_text)
VALUES
  ('home', 'bottom_portraits', 'portrait_1', '', 'Portrait background image 1'),
  ('home', 'bottom_portraits', 'portrait_2', '', 'Portrait background image 2'),
  ('home', 'bottom_portraits', 'portrait_3', '', 'Portrait background image 3')
ON CONFLICT DO NOTHING;
