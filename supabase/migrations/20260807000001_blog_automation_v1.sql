-- EventSound blog automation V1
-- Structured content is stored in Supabase. Only published rows are publicly readable.

CREATE TYPE public.blog_post_status AS ENUM (
  'idea',
  'researching',
  'awaiting_images',
  'building',
  'awaiting_approval',
  'published',
  'rejected'
);

CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  status public.blog_post_status NOT NULL DEFAULT 'idea',
  topic TEXT NOT NULL,
  primary_keyword TEXT,
  seo_brief JSONB NOT NULL DEFAULT '{}'::jsonb,
  meta_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  og_image_url TEXT,
  noindex BOOLEAN NOT NULL DEFAULT false,
  featured_image_url TEXT,
  featured_image_alt TEXT,
  image_request_text TEXT,
  image_folder_id TEXT,
  author TEXT NOT NULL DEFAULT 'EventSound',
  category TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}'::text[],
  sort_order INTEGER NOT NULL DEFAULT 0,
  schema_json JSONB,
  internal_link_targets JSONB NOT NULL DEFAULT '[]'::jsonb,
  approved_at TIMESTAMPTZ,
  approved_by TEXT,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at TIMESTAMPTZ,
  CONSTRAINT blog_posts_published_timestamp CHECK (
    status <> 'published' OR published_at IS NOT NULL
  )
);

CREATE TABLE public.blog_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  storage_url TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  alt_text TEXT NOT NULL DEFAULT '',
  caption TEXT,
  position INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  ai_description TEXT,
  image_subject TEXT,
  event_type TEXT,
  equipment_visible TEXT[] NOT NULL DEFAULT '{}'::text[],
  possible_use TEXT,
  hero_suitability INTEGER CHECK (hero_suitability BETWEEN 0 AND 100),
  article_relevance INTEGER CHECK (article_relevance BETWEEN 0 AND 100),
  drive_file_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (blog_post_id, drive_file_id)
);

CREATE INDEX blog_posts_public_index
  ON public.blog_posts (published_at DESC)
  WHERE status = 'published';
CREATE INDEX blog_posts_status_index ON public.blog_posts (status, updated_at DESC);
CREATE INDEX blog_images_post_position_index ON public.blog_images (blog_post_id, position);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published blog posts are public"
ON public.blog_posts FOR SELECT
USING (status = 'published');

CREATE POLICY "Admins can read all blog posts"
ON public.blog_posts FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert blog posts"
ON public.blog_posts FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update blog posts"
ON public.blog_posts FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blog posts"
ON public.blog_posts FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Images for published blog posts are public"
ON public.blog_images FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.blog_posts
    WHERE blog_posts.id = blog_images.blog_post_id
      AND blog_posts.status = 'published'
  )
);

CREATE POLICY "Admins can read all blog images"
ON public.blog_images FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert blog images"
ON public.blog_images FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update blog images"
ON public.blog_images FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blog images"
ON public.blog_images FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.enforce_blog_publish_state()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'published' THEN
    RAISE EXCEPTION 'A blog post cannot be inserted as published';
  END IF;

  IF TG_OP = 'UPDATE' AND NEW.status = 'published' AND OLD.status <> 'published' THEN
    IF OLD.status <> 'awaiting_approval' THEN
      RAISE EXCEPTION 'Only an awaiting_approval blog post can be published';
    END IF;
    NEW.published_at := COALESCE(NEW.published_at, now());
    NEW.approved_at := COALESCE(NEW.approved_at, now());
  END IF;

  IF TG_OP = 'UPDATE' AND OLD.status = 'published' AND NEW.status <> 'published' THEN
    NEW.published_at := NULL;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER enforce_blog_publish_state_trigger
BEFORE INSERT OR UPDATE OF status ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.enforce_blog_publish_state();

CREATE OR REPLACE FUNCTION public.approve_blog_post(
  _post_id UUID,
  _approved_by TEXT DEFAULT 'n8n human approval'
)
RETURNS public.blog_posts
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result public.blog_posts;
BEGIN
  IF auth.role() <> 'service_role' AND NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Admin or service role required';
  END IF;

  UPDATE public.blog_posts
  SET status = 'published',
      approved_by = NULLIF(trim(_approved_by), ''),
      rejection_reason = NULL
  WHERE id = _post_id AND status = 'awaiting_approval'
  RETURNING * INTO result;

  IF result.id IS NULL THEN
    RAISE EXCEPTION 'Post not found or not awaiting approval';
  END IF;
  RETURN result;
END;
$$;

CREATE OR REPLACE FUNCTION public.reject_blog_post(
  _post_id UUID,
  _reason TEXT DEFAULT NULL
)
RETURNS public.blog_posts
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result public.blog_posts;
BEGIN
  IF auth.role() <> 'service_role' AND NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Admin or service role required';
  END IF;

  UPDATE public.blog_posts
  SET status = 'rejected', rejection_reason = NULLIF(trim(_reason), '')
  WHERE id = _post_id AND status = 'awaiting_approval'
  RETURNING * INTO result;

  IF result.id IS NULL THEN
    RAISE EXCEPTION 'Post not found or not awaiting approval';
  END IF;
  RETURN result;
END;
$$;

REVOKE ALL ON FUNCTION public.approve_blog_post(UUID, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.reject_blog_post(UUID, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.approve_blog_post(UUID, TEXT) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.reject_blog_post(UUID, TEXT) TO authenticated, service_role;

INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can view published blog assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

CREATE POLICY "Admins can upload blog assets"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update blog assets"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blog assets"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

