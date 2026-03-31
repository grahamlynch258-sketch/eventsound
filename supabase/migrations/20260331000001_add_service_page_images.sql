create table public.service_page_images (
  id uuid default gen_random_uuid() primary key,
  page_slug text not null,
  slot_id text not null,
  slot_label text not null,
  image_url text,
  alt_text text default '',
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(page_slug, slot_id)
);

alter table public.service_page_images enable row level security;

create policy "Public read access" on public.service_page_images
  for select using (true);

create policy "Admin write access" on public.service_page_images
  for all using (
    exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'admin')
  );

create trigger update_service_page_images_updated_at
  before update on public.service_page_images
  for each row execute function update_updated_at_column();

-- LED Video Walls — NO hero slot (hero managed in Library)
INSERT INTO public.service_page_images (page_slug, slot_id, slot_label, display_order) VALUES
  ('led-video-walls', 'indoor-use-case', 'Indoor LED wall', 1),
  ('led-video-walls', 'outdoor-use-case', 'Outdoor LED wall', 2),
  ('led-video-walls', 'curved-custom', 'Curved & custom configuration', 3),
  ('led-video-walls', 'corporate-conference', 'Corporate conference', 4),
  ('led-video-walls', 'awards-ceremony', 'Awards ceremony', 5),
  ('led-video-walls', 'exhibition', 'Exhibition & trade show', 6),
  ('led-video-walls', 'festival-outdoor', 'Outdoor festival / concert', 7),
  ('led-video-walls', 'product-launch', 'Product launch', 8),
  ('led-video-walls', 'hybrid-event', 'Hybrid / virtual event', 9),
  ('led-video-walls', 'gallery-1', 'Gallery 1', 10),
  ('led-video-walls', 'gallery-2', 'Gallery 2', 11),
  ('led-video-walls', 'gallery-3', 'Gallery 3', 12),
  ('led-video-walls', 'gallery-4', 'Gallery 4', 13),
  ('led-video-walls', 'gallery-5', 'Gallery 5', 14),
  ('led-video-walls', 'gallery-6', 'Gallery 6', 15);

-- LED Screen Hire — NO hero slot (hero managed in Library)
INSERT INTO public.service_page_images (page_slug, slot_id, slot_label, display_order) VALUES
  ('led-screen-hire', 'conference-screen', 'Conference & meeting screen', 1),
  ('led-screen-hire', 'exhibition-screen', 'Exhibition stand screen', 2),
  ('led-screen-hire', 'digital-signage', 'Digital signage / wayfinding', 3),
  ('led-screen-hire', 'tv-hire', 'TV screen hire', 4),
  ('led-screen-hire', 'gallery-1', 'Gallery 1', 10),
  ('led-screen-hire', 'gallery-2', 'Gallery 2', 11),
  ('led-screen-hire', 'gallery-3', 'Gallery 3', 12),
  ('led-screen-hire', 'gallery-4', 'Gallery 4', 13),
  ('led-screen-hire', 'gallery-5', 'Gallery 5', 14);
