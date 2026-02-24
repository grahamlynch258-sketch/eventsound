ALTER TABLE public.library_images DROP CONSTRAINT IF EXISTS library_images_category_check;
ALTER TABLE public.library_images ADD CONSTRAINT library_images_category_check CHECK (category IN ('headlines', 'supplements', 'portfolio', 'logos', 'hero', 'service-led-walls', 'service-av-production', 'service-lighting', 'service-staging', 'service-event-production', 'service-video', 'service-virtual'));
