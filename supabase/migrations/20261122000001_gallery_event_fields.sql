-- Gallery: fields for bulk uploads by event (22 November 2026).
--
-- Additive and safe to run more than once. Every column is optional, so
-- existing rows and the existing one-at-a-time form keep working.
--
--   caption     short sentence shown under the photo on the public gallery
--   event_name  the event the photo is from; photos are grouped by this
--   location    venue or town, shown beside the event name
--   taken_on    date of the event (day precision is not needed; the first of
--               the month is fine)
--   width,
--   height      pixel size of the stored file, so pages reserve the right
--               space and image search gets real dimensions
--   services    which services the photo shows, e.g. {led-video-walls,staging}

alter table public.gallery_items
  add column if not exists caption text,
  add column if not exists event_name text,
  add column if not exists location text,
  add column if not exists taken_on date,
  add column if not exists width integer,
  add column if not exists height integer,
  add column if not exists services text[] not null default '{}';

create index if not exists gallery_items_event_idx
  on public.gallery_items (event_name, sort_order);
