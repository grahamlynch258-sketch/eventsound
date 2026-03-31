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

-- LED Video Walls — NO hero (hero managed in Library)
INSERT INTO public.service_page_images (page_slug, slot_id, slot_label, display_order) VALUES
  ('led-video-walls', 'service-type-1', 'Service type 1', 1),
  ('led-video-walls', 'service-type-2', 'Service type 2', 2),
  ('led-video-walls', 'service-type-3', 'Service type 3', 3),
  ('led-video-walls', 'use-case-1', 'Use case 1', 4),
  ('led-video-walls', 'use-case-2', 'Use case 2', 5),
  ('led-video-walls', 'use-case-3', 'Use case 3', 6),
  ('led-video-walls', 'use-case-4', 'Use case 4', 7),
  ('led-video-walls', 'use-case-5', 'Use case 5', 8),
  ('led-video-walls', 'use-case-6', 'Use case 6', 9),
  ('led-video-walls', 'gallery-1', 'Gallery 1', 10),
  ('led-video-walls', 'gallery-2', 'Gallery 2', 11),
  ('led-video-walls', 'gallery-3', 'Gallery 3', 12),
  ('led-video-walls', 'gallery-4', 'Gallery 4', 13),
  ('led-video-walls', 'gallery-5', 'Gallery 5', 14),
  ('led-video-walls', 'gallery-6', 'Gallery 6', 15);

-- LED Screen Hire — SAME layout, SAME slot IDs, NO hero
INSERT INTO public.service_page_images (page_slug, slot_id, slot_label, display_order) VALUES
  ('led-screen-hire', 'service-type-1', 'Service type 1', 1),
  ('led-screen-hire', 'service-type-2', 'Service type 2', 2),
  ('led-screen-hire', 'service-type-3', 'Service type 3', 3),
  ('led-screen-hire', 'use-case-1', 'Use case 1', 4),
  ('led-screen-hire', 'use-case-2', 'Use case 2', 5),
  ('led-screen-hire', 'use-case-3', 'Use case 3', 6),
  ('led-screen-hire', 'use-case-4', 'Use case 4', 7),
  ('led-screen-hire', 'use-case-5', 'Use case 5', 8),
  ('led-screen-hire', 'use-case-6', 'Use case 6', 9),
  ('led-screen-hire', 'gallery-1', 'Gallery 1', 10),
  ('led-screen-hire', 'gallery-2', 'Gallery 2', 11),
  ('led-screen-hire', 'gallery-3', 'Gallery 3', 12),
  ('led-screen-hire', 'gallery-4', 'Gallery 4', 13),
  ('led-screen-hire', 'gallery-5', 'Gallery 5', 14),
  ('led-screen-hire', 'gallery-6', 'Gallery 6', 15);
