
-- Create library_images table for storing categorized image assets
CREATE TABLE public.library_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('headlines', 'supplements', 'portfolio', 'logos')),
  image_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  alt_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.library_images ENABLE ROW LEVEL SECURITY;

-- Anyone can view library images (used on frontend)
CREATE POLICY "Anyone can read library_images"
  ON public.library_images FOR SELECT
  USING (true);

-- Only admins can insert
CREATE POLICY "Admins can insert library_images"
  ON public.library_images FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete
CREATE POLICY "Admins can delete library_images"
  ON public.library_images FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update
CREATE POLICY "Admins can update library_images"
  ON public.library_images FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));
