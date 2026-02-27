-- Service Sections: admin-managed content blocks for service pages
CREATE TABLE public.service_sections (
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

CREATE POLICY "Anyone can read service_sections"
ON public.service_sections FOR SELECT
USING (true);

CREATE POLICY "Admins can insert service_sections"
ON public.service_sections FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update service_sections"
ON public.service_sections FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete service_sections"
ON public.service_sections FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_service_sections_key_order
ON public.service_sections (service_key, sort_order);
