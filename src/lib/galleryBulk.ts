// Logic behind the gallery bulk upload (admin) and the event-grouped public
// gallery. Kept free of React and Supabase so it can be tested directly.

export interface BatchDetails {
  eventName: string;
  location: string;
  /** yyyy-mm (month input) or yyyy-mm-dd; empty when unknown. */
  date: string;
  category: string;
  services: string[];
}

export interface PhotoText {
  title: string;
  alt: string;
  caption: string;
}

export interface ManifestRow extends Partial<PhotoText> {
  filename: string;
}

export const GALLERY_SERVICES = [
  { key: "led-video-walls", label: "LED video walls" },
  { key: "led-screens", label: "LED screens" },
  { key: "sound", label: "Sound and PA" },
  { key: "lighting", label: "Lighting" },
  { key: "staging", label: "Staging and drape" },
  { key: "video-streaming", label: "Video and streaming" },
  { key: "conference-av", label: "Conference AV" },
  { key: "event-production", label: "Full event production" },
] as const;

export function slugify(text: string, max = 60): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, max)
    .replace(/-+$/g, "");
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2025-07" or "2025-07-19" → "July 2025". Empty string when not a date. */
export function monthYear(date: string | null | undefined): string {
  const match = /^(\d{4})-(\d{2})/.exec(date || "");
  if (!match) return "";
  const month = MONTHS[Number(match[2]) - 1];
  return month ? `${month} ${match[1]}` : "";
}

/** "2025-07" → "2025-07-01" for the date column; null when empty or invalid. */
export function toDateColumn(date: string): string | null {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  if (/^\d{4}-\d{2}$/.test(date)) return `${date}-01`;
  return null;
}

/**
 * A descriptive file name for search engines: event, place and a running
 * number, e.g. "swords-castle-summer-concerts-swords-03". The uploader adds
 * a timestamp and the extension.
 */
export function descriptiveFileName(batch: BatchDetails, index: number, original: string): string {
  const base = [slugify(batch.eventName, 44), slugify(batch.location, 24)].filter(Boolean).join("-");
  const number = String(index + 1).padStart(2, "0");
  return base ? `${base}-${number}` : slugify(original.replace(/\.[^.]+$/, "")) || `photo-${number}`;
}

/**
 * Placeholder text built from the batch details. It is a starting point, not
 * a description: it says where the photo is from, not what it shows.
 */
export function draftText(batch: BatchDetails, index: number): PhotoText {
  const where = [batch.eventName, batch.location].filter(Boolean).join(", ");
  const when = monthYear(batch.date);
  const number = index + 1;
  return {
    title: batch.eventName ? `${batch.eventName} (${number})` : `Photo ${number}`,
    alt: [batch.category || "Event production", where && `at ${where}`].filter(Boolean).join(" "),
    caption: [where, when].filter(Boolean).join(", "),
  };
}

/** True while the alt text is still the automatic placeholder (or empty). */
export function needsDescription(text: PhotoText, batch: BatchDetails, index: number): boolean {
  const alt = text.alt.trim();
  return alt.length < 15 || alt === draftText(batch, index).alt;
}

function parseCsvLine(line: string): string[] {
  const cells: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (quoted) {
      if (char === '"' && line[i + 1] === '"') { cell += '"'; i++; }
      else if (char === '"') quoted = false;
      else cell += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") { cells.push(cell); cell = ""; }
    else cell += char;
  }
  cells.push(cell);
  return cells.map((value) => value.trim());
}

/**
 * Reads a manifest of descriptions, written by a person or an agent that has
 * looked at the photos. Accepts CSV with a header row (filename, title, alt,
 * caption in any order) or a JSON array of objects with those keys.
 */
export function parseManifest(text: string): ManifestRow[] {
  const trimmed = text.replace(/^﻿/, "").trim();
  if (!trimmed) return [];
  if (trimmed.startsWith("[")) {
    const parsed = JSON.parse(trimmed) as Array<Record<string, unknown>>;
    return parsed
      .map((row) => ({
        filename: String(row.filename ?? row.file ?? "").trim(),
        title: row.title ? String(row.title).trim() : undefined,
        alt: row.alt ?? row.alt_text ? String(row.alt ?? row.alt_text).trim() : undefined,
        caption: row.caption ? String(row.caption).trim() : undefined,
      }))
      .filter((row) => row.filename);
  }
  // Split on newlines that are not inside quotes.
  const lines: string[] = [];
  let current = "";
  let quotes = 0;
  for (const line of trimmed.split(/\r?\n/)) {
    current = current ? `${current}\n${line}` : line;
    quotes += (line.match(/"/g) || []).length;
    if (quotes % 2 === 0) { lines.push(current); current = ""; quotes = 0; }
  }
  if (current) lines.push(current);
  const header = parseCsvLine(lines[0]).map((name) => name.toLowerCase().replace(/[^a-z]/g, ""));
  const column = (names: string[]) => header.findIndex((name) => names.includes(name));
  const fileColumn = column(["filename", "file", "name"]);
  if (fileColumn < 0) throw new Error('The manifest needs a "filename" column.');
  const titleColumn = column(["title"]);
  const altColumn = column(["alt", "alttext"]);
  const captionColumn = column(["caption"]);
  return lines.slice(1).map(parseCsvLine).filter((cells) => cells[fileColumn]).map((cells) => ({
    filename: cells[fileColumn],
    title: titleColumn >= 0 ? cells[titleColumn] || undefined : undefined,
    alt: altColumn >= 0 ? cells[altColumn] || undefined : undefined,
    caption: captionColumn >= 0 ? cells[captionColumn] || undefined : undefined,
  }));
}

/** File names match without their extension and ignoring case, so IMG_1.HEIC matches img_1.jpg. */
export function manifestKey(filename: string): string {
  return filename.split(/[\\/]/).pop()!.replace(/\.[^.]+$/, "").toLowerCase().trim();
}

export function manifestLookup(rows: ManifestRow[]): Map<string, ManifestRow> {
  return new Map(rows.map((row) => [manifestKey(row.filename), row]));
}

/** A manifest template for the files in the queue, for a person or agent to fill in. */
export function manifestTemplate(filenames: string[]): string {
  const quote = (value: string) => `"${value.replace(/"/g, '""')}"`;
  return ["filename,title,alt,caption", ...filenames.map((name) => `${quote(name)},,,`)].join("\n");
}

export function isHeic(file: { name: string; type: string }): boolean {
  return /image\/hei[cf]/i.test(file.type) || /\.(heic|heif)$/i.test(file.name);
}

// ── Public gallery ────────────────────────────────────────────────────────

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string | null;
  image_url: string;
  alt_text: string | null;
  caption?: string | null;
  event_name?: string | null;
  location?: string | null;
  taken_on?: string | null;
  width?: number | null;
  height?: number | null;
}

export interface GalleryGroup {
  key: string;
  eventName: string | null;
  location: string | null;
  when: string;
  photos: GalleryPhoto[];
}

/**
 * Groups photos by event, newest event first, keeping each event's own
 * order. Photos with no event stay together in one group at the end.
 */
export function groupByEvent(photos: GalleryPhoto[]): GalleryGroup[] {
  const groups = new Map<string, GalleryGroup & { latest: string }>();
  for (const photo of photos) {
    const eventName = photo.event_name?.trim() || null;
    const key = eventName ? slugify(eventName) : "";
    let group = groups.get(key);
    if (!group) {
      group = { key, eventName, location: null, when: "", photos: [], latest: "" };
      groups.set(key, group);
    }
    group.photos.push(photo);
    if (!group.location && photo.location) group.location = photo.location.trim();
    if (photo.taken_on && photo.taken_on > group.latest) {
      group.latest = photo.taken_on;
      group.when = monthYear(photo.taken_on);
    }
  }
  return [...groups.values()]
    .sort((a, b) => {
      if (!a.eventName !== !b.eventName) return a.eventName ? -1 : 1;
      return b.latest.localeCompare(a.latest);
    })
    .map(({ latest: _latest, ...group }) => group);
}

/** schema.org ImageGallery for the gallery page: one ImageObject per photo. */
export function galleryJsonLd(photos: GalleryPhoto[], pageUrl: string, organisation: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${organisation} event photo gallery`,
    url: pageUrl,
    image: photos.map((photo) => ({
      "@type": "ImageObject",
      contentUrl: photo.image_url,
      name: photo.title,
      ...(photo.alt_text ? { description: photo.alt_text } : {}),
      ...(photo.caption ? { caption: photo.caption } : {}),
      ...(photo.width && photo.height ? { width: photo.width, height: photo.height } : {}),
      ...(photo.taken_on ? { dateCreated: photo.taken_on } : {}),
      ...(photo.location ? { contentLocation: { "@type": "Place", name: photo.location } } : {}),
      creator: { "@type": "Organization", name: organisation },
      creditText: organisation,
      copyrightNotice: organisation,
    })),
  };
}
