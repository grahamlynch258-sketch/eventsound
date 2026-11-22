import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  type BatchDetails,
  type GalleryPhoto,
  descriptiveFileName,
  draftText,
  galleryJsonLd,
  groupByEvent,
  isHeic,
  manifestKey,
  manifestLookup,
  manifestTemplate,
  monthYear,
  needsDescription,
  parseManifest,
  slugify,
  toDateColumn,
} from "@/lib/galleryBulk";

const read = (file: string) => readFileSync(resolve(process.cwd(), file), "utf-8");

const batch: BatchDetails = {
  eventName: "Swords Castle Summer Concerts",
  location: "Swords, Co. Dublin",
  date: "2025-07",
  category: "Outdoor events",
  services: ["led-video-walls", "sound"],
};

describe("gallery bulk upload: names and placeholder text", () => {
  it("builds a descriptive, search-friendly file name from the event and place", () => {
    expect(descriptiveFileName(batch, 2, "IMG_4471.HEIC")).toBe("swords-castle-summer-concerts-swords-co-dublin-03");
    expect(descriptiveFileName({ ...batch, eventName: "", location: "" }, 0, "Stage Left (1).JPG")).toBe("stage-left-1");
    expect(slugify("Škoda Ireland — Launch!")).toBe("skoda-ireland-launch");
  });

  it("formats and stores the event month", () => {
    expect(monthYear("2025-07")).toBe("July 2025");
    expect(monthYear("2025-07-19")).toBe("July 2025");
    expect(monthYear("")).toBe("");
    expect(toDateColumn("2025-07")).toBe("2025-07-01");
    expect(toDateColumn("2025-07-19")).toBe("2025-07-19");
    expect(toDateColumn("July")).toBeNull();
  });

  it("drafts placeholder text and knows it is only a placeholder", () => {
    const draft = draftText(batch, 0);
    expect(draft).toEqual({
      title: "Swords Castle Summer Concerts (1)",
      alt: "Outdoor events at Swords Castle Summer Concerts, Swords, Co. Dublin",
      caption: "Swords Castle Summer Concerts, Swords, Co. Dublin, July 2025",
    });
    expect(needsDescription(draft, batch, 0)).toBe(true);
    expect(needsDescription({ ...draft, alt: "LED wall" }, batch, 0)).toBe(true);
    expect(needsDescription({ ...draft, alt: "Outdoor LED screen beside the main stage at dusk, crowd in the foreground" }, batch, 0)).toBe(false);
  });

  it("recognises iPhone HEIC files by type or by name", () => {
    expect(isHeic({ name: "IMG_1.HEIC", type: "" })).toBe(true);
    expect(isHeic({ name: "photo", type: "image/heif" })).toBe(true);
    expect(isHeic({ name: "photo.jpg", type: "image/jpeg" })).toBe(false);
  });
});

describe("gallery bulk upload: manifest of descriptions", () => {
  it("reads a CSV manifest with quoted commas, in any column order", () => {
    const rows = parseManifest([
      "caption,filename,alt,title",
      '"Main stage, Friday night",IMG_4471.HEIC,"Outdoor LED screen beside the main stage, crowd in front",Main stage screen',
      ",IMG_4472.jpg,Sound desk at front of house,",
    ].join("\n"));
    expect(rows).toEqual([
      { filename: "IMG_4471.HEIC", title: "Main stage screen", alt: "Outdoor LED screen beside the main stage, crowd in front", caption: "Main stage, Friday night" },
      { filename: "IMG_4472.jpg", title: undefined, alt: "Sound desk at front of house", caption: undefined },
    ]);
  });

  it("reads a JSON manifest and matches files whatever their extension or case", () => {
    const lookup = manifestLookup(parseManifest('[{"filename":"IMG_4471.HEIC","alt_text":"Curved LED wall behind a speaker"}]'));
    expect(lookup.get(manifestKey("img_4471.jpg"))?.alt).toBe("Curved LED wall behind a speaker");
    expect(manifestKey("C:\\photos\\IMG_9.JPG")).toBe("img_9");
  });

  it("rejects a manifest without a filename column and writes a fillable template", () => {
    expect(() => parseManifest("title,alt\nA,B")).toThrow(/filename/);
    expect(manifestTemplate(["a.jpg", 'b "wide".jpg'])).toBe('filename,title,alt,caption\n"a.jpg",,,\n"b ""wide"".jpg",,,');
    expect(parseManifest(manifestTemplate(["a.jpg"]))).toEqual([{ filename: "a.jpg", title: undefined, alt: undefined, caption: undefined }]);
  });
});

const photo = (id: string, extra: Partial<GalleryPhoto> = {}): GalleryPhoto => ({
  id, title: `Photo ${id}`, category: "LED", image_url: `https://example.com/${id}.webp`, alt_text: `Alt ${id}`, ...extra,
});

describe("public gallery", () => {
  it("groups photos by event, newest event first, with untagged photos last", () => {
    const groups = groupByEvent([
      photo("old-1"),
      photo("beta-1", { event_name: "Beta Festival", location: "The Digital Hub, Dublin", taken_on: "2025-11-01" }),
      photo("swords-1", { event_name: "Swords Castle Summer Concerts", location: "Swords", taken_on: "2025-07-01" }),
      photo("beta-2", { event_name: "Beta Festival", taken_on: "2025-11-01" }),
    ]);
    expect(groups.map((g) => [g.eventName, g.when, g.photos.map((p) => p.id)])).toEqual([
      ["Beta Festival", "November 2025", ["beta-1", "beta-2"]],
      ["Swords Castle Summer Concerts", "July 2025", ["swords-1"]],
      [null, "", ["old-1"]],
    ]);
    expect(groups[0].location).toBe("The Digital Hub, Dublin");
  });

  it("describes every photo to search engines as an ImageObject", () => {
    const schema = galleryJsonLd(
      [photo("a", { caption: "Main stage at dusk", width: 2560, height: 1707, taken_on: "2025-07-01", location: "Swords" }), photo("b", { alt_text: null })],
      "https://eventsound.ie/gallery/", "EventSound AV Services",
    );
    expect(schema["@type"]).toBe("ImageGallery");
    expect(schema.image[0]).toMatchObject({
      "@type": "ImageObject", contentUrl: "https://example.com/a.webp", description: "Alt a", caption: "Main stage at dusk",
      width: 2560, height: 1707, dateCreated: "2025-07-01", contentLocation: { "@type": "Place", name: "Swords" },
      creditText: "EventSound AV Services",
    });
    expect(schema.image[1]).not.toHaveProperty("description");
    expect(schema.image[1]).not.toHaveProperty("caption");
  });

  it("the gallery page shows captions, groups by event and still works before the migration", () => {
    const grid = read("src/components/site/GalleryGrid.tsx");
    expect(grid).toContain("<figcaption");
    expect(grid).toContain("groupByEvent(filtered)");
    expect(grid).toMatch(/legacy[\s\S]*\.select\(BASE_COLUMNS\)/);
    expect(grid).toContain('{...cdnImage(item.image_url, "third")}');
  });
});

describe("gallery wiring", () => {
  it("the admin has a bulk upload screen that saves photos hidden", () => {
    expect(read("src/App.tsx")).toContain('path="/admin/gallery/bulk" element={<AdminRoute>');
    expect(read("src/pages/admin/AdminGallery.tsx")).toContain('to="/admin/gallery/bulk"');
    const bulk = read("src/pages/admin/AdminGalleryBulk.tsx");
    expect(bulk).toContain("is_published: false");
    expect(bulk).toContain('await import("heic2any")');
    expect(bulk).toContain("uploadImageToStorage(named, batch.category)");
  });

  it("the migration only adds optional columns", () => {
    const sql = read("supabase/migrations/20261122000001_gallery_event_fields.sql");
    for (const column of ["caption", "event_name", "location", "taken_on", "width", "height", "services"]) {
      expect(sql).toMatch(new RegExp(`add column if not exists ${column} `));
    }
    expect(sql.replace(/--.*$/gm, "")).not.toMatch(/drop |delete |truncate |alter column/i);
  });

  it("the sitemap lists gallery photos and case-study lead photos as images", () => {
    const sitemap = read("scripts/generate-sitemap.mjs");
    expect(sitemap).toContain('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"');
    expect(sitemap).toContain("if (route.path === '/gallery') xml += imageTags(galleryPhotos);");
    expect(sitemap).toContain("if (cs.featured_image_url) xml += imageTags([cs.featured_image_url]);");
  });

  it("the build writes an ImageGallery schema into the gallery page", () => {
    const prerender = read("scripts/prerender.mjs");
    expect(prerender).toContain('ImageGallery: "gallery-schema"');
    expect(prerender).toContain("if (routePath === '/gallery' && GALLERY_PHOTOS.length)");
    expect(read("src/pages/Gallery.tsx")).toContain('document.getElementById("gallery-schema")?.remove()');
  });
});
