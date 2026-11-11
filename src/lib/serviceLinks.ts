// Maps the free-text "services used" labels on case studies (CMS field) to
// the matching service pages. Keep in sync with SERVICE_LINK_RULES in
// scripts/prerender.mjs, which builds the same links into the static HTML.
const SERVICE_LINK_RULES: Array<[RegExp, string, string]> = [
  [/led\s*(video\s*)?wall|video wall/i, "/services/led-video-walls/", "LED video wall hire"],
  [/led screen|tv screen|monitor/i, "/services/led-screen-hire/", "LED screen hire"],
  [/light/i, "/services/lighting-design/", "Event lighting"],
  [/stag|drape/i, "/services/staging-pipe-drape/", "Stage hire"],
  [/sound|audio|\bpa\b/i, "/services/sound-hire/", "Sound and PA hire"],
  [/conference/i, "/services/conference-av-hire/", "Conference AV hire"],
  [/stream|hybrid|virtual/i, "/services/virtual-events/", "Hybrid events and streaming"],
  [/video|camera|film/i, "/services/video-production/", "Event video production"],
  [/theatre|musical/i, "/services/musical-theatre/", "Theatre production hire"],
  [/production/i, "/services/event-production/", "Event production"],
  [/\bav\b|audio.?visual/i, "/services/av-production/", "AV hire"],
];

export interface ServiceLink {
  href: string;
  label: string;
}

export function serviceLinksFor(labels: string[] | null | undefined): ServiceLink[] {
  const seen = new Set<string>();
  const links: ServiceLink[] = [];
  for (const label of labels ?? []) {
    const rule = SERVICE_LINK_RULES.find(([pattern]) => pattern.test(label));
    if (rule && !seen.has(rule[1])) {
      seen.add(rule[1]);
      links.push({ href: rule[1], label: rule[2] });
    }
  }
  return links;
}

// Some CMS tag arrays hold one hyphen-joined string ("LEDWALL-Audio-Lighting").
export function cleanKeywords(tags: string[] | null | undefined): string | undefined {
  const words = (tags ?? [])
    .flatMap((tag) => String(tag).split(/[-,|]/))
    .map((word) => word.trim())
    .filter(Boolean);
  const seen = new Set<string>();
  const unique = words.filter((word) => {
    const key = word.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return unique.length ? unique.join(", ") : undefined;
}
