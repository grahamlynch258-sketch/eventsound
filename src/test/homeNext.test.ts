import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { STORAGE_PUBLIC_PREFIX } from "@/lib/imageCdn";
import { homeProof } from "@/content/home";
import {
  homeNextBrief,
  homeNextClients,
  homeNextDay,
  homeNextHero,
  homeNextServices,
  homeNextStats,
  homeNextWorkPhotos,
} from "@/content/homeNext";

const read = (file: string) => readFileSync(resolve(process.cwd(), file), "utf-8");

const photos = [
  homeNextHero.photo,
  homeNextBrief.photo,
  ...homeNextServices.items.map((item) => item.photo),
  ...homeNextDay.steps.map((step) => step.photo),
  ...Object.values(homeNextWorkPhotos).map((entry) => entry.photo),
];

const copy = [
  homeNextHero.eyebrow, ...homeNextHero.lines, homeNextHero.sub, homeNextHero.slateShort, homeNextHero.slateLong, ...homeNextHero.facts,
  ...homeNextClients,
  ...homeNextStats.map((stat) => stat.label),
  ...homeNextServices.heading, homeNextServices.intro, ...homeNextServices.items.flatMap((item) => [item.name, item.text, item.caption]),
  ...homeNextDay.heading, homeNextDay.intro, ...homeNextDay.steps.flatMap((step) => [step.label, step.title, step.text]),
  ...homeNextBrief.heading, homeNextBrief.intro,
  ...photos.map((photo) => photo.alt),
].join("\n");

describe("home page preview (/home-next/)", () => {
  it("stays out of search: noindex, not in the sitemap, served from the noindex shell", () => {
    expect(read("src/pages/HomeNext.tsx")).toMatch(/noindex: true/);
    expect(read("public/sitemap.xml")).not.toContain("home-next");
    expect(read("public/_redirects")).toMatch(/^\/home-next\s+\/spa\.html\s+200$/m);
    expect(read("src/App.tsx")).toContain('<Route path="/home-next"');
    // The live home page is still the old one.
    expect(read("src/App.tsx")).toContain('<Route path="/" element={<Suspense fallback={null}><Index /></Suspense>} />');
  });

  it("keeps the search phrase in the main heading", () => {
    expect(homeNextHero.eyebrow).toMatch(/audio visual hire & event production/i);
    expect(homeNextHero.eyebrow).toMatch(/Ireland/);
  });

  it("publishes no prices and no staff names, and uses the current smallest LED wall", () => {
    expect(copy).not.toMatch(/[€£$]\s?\d/);
    expect(copy).not.toMatch(/\b(Ronan|Mark|Graham)\b/);
    expect(copy).not.toMatch(/\b6\s?m²/);
    expect(copy).toContain("7 m²");
  });

  it("uses only photos from the site's own image bucket, each with a real description", () => {
    for (const photo of photos) {
      expect(photo.src.startsWith(`${STORAGE_PUBLIC_PREFIX}site-images/`), photo.src).toBe(true);
      expect(photo.alt.length, photo.src).toBeGreaterThan(30);
    }
    // No photo is used twice.
    expect(new Set(photos.map((photo) => photo.src)).size).toBe(photos.length);
  });

  it("links every service to a page that exists, and calls the AV hire page AV hire", () => {
    const sitemap = read("public/sitemap.xml");
    for (const item of homeNextServices.items) {
      expect(sitemap, item.href).toContain(`<loc>https://eventsound.ie${item.href}</loc>`);
    }
    expect(homeNextServices.items.find((item) => item.href === "/services/av-production/")?.name).toBe("AV hire");
  });

  it("only gives photos to case studies that are on the home page", () => {
    const keys = homeProof.items.map((item) => item.key);
    for (const key of Object.keys(homeNextWorkPhotos)) expect(keys).toContain(key);
  });

  it("offers the same event types and audience sizes as the contact form it pre-fills", () => {
    const form = read("src/components/site/ContactForm.tsx");
    for (const option of [...homeNextBrief.eventTypes, ...homeNextBrief.audienceSizes]) {
      expect(form, option).toContain(`<option>${option}</option>`);
    }
    expect(form).toContain("briefFromNavigation");
  });
});
