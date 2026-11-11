import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { cleanKeywords, serviceLinksFor } from "@/lib/serviceLinks";

const read = (rel: string) => fs.readFileSync(path.join(process.cwd(), rel), "utf8");

describe("case study service links", () => {
  it("maps the CMS service labels to service pages without duplicates", () => {
    const links = serviceLinksFor([
      "LED Video Walls",
      "Lighting Design",
      "Event Production",
      "Sound Systems",
      "Event Staging",
      "Technical Support",
    ]);
    expect(links.map((link) => link.href)).toEqual([
      "/services/led-video-walls/",
      "/services/lighting-design/",
      "/services/event-production/",
      "/services/sound-hire/",
      "/services/staging-pipe-drape/",
    ]);
  });

  it("splits hyphen-joined CMS tags into clean keywords", () => {
    expect(cleanKeywords(["LEDWALL-Audio-Lighting-Concert-Swords-SwordsCastle-Fingal", "audio"])).toBe(
      "LEDWALL, Audio, Lighting, Concert, Swords, SwordsCastle, Fingal",
    );
    expect(cleanKeywords([])).toBeUndefined();
  });
});

describe("every app route resolves correctly on Netlify", () => {
  const appRoutes = [...read("src/App.tsx").matchAll(/<Route path="([^"]+)"/g)].map((match) => match[1]);
  const prerendered = new Set(
    [...read("scripts/prerender.mjs").matchAll(/\{ path: '([^']+)'/g)].map((match) => match[1]),
  );
  const rules = read("public/_redirects")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const [source, target, status] = line.split(/\s+/);
      return { source, target, status };
    });
  const spaPrefixes = rules
    .filter((rule) => rule.status === "200" && rule.target === "/spa.html")
    .map((rule) => rule.source.replace(/\*$/, ""));
  const redirected = new Set(rules.filter((rule) => rule.status === "301").map((rule) => rule.source));

  it("is prerendered, rewritten to the noindex SPA shell, or permanently redirected", () => {
    const uncovered = appRoutes.filter((route) => {
      if (route === "*") return false;
      const concrete = route.replace(/:[^/]+/g, "x");
      return !(
        prerendered.has(route) ||
        redirected.has(route) ||
        spaPrefixes.some((prefix) => concrete === prefix || concrete.startsWith(prefix.endsWith("/") ? prefix : `${prefix}/`))
      );
    });
    expect(uncovered).toEqual([]);
  });
});

describe("site-wide SEO hygiene", () => {
  it("does not let the reviews widget inject Product review schema", () => {
    const offenders = ["src/components/GoogleReviews.tsx", "src/pages/v2/LEDScreenHireV2.tsx", "src/pages/v2/LEDVideoWallsV2.tsx", "src/pages/v2/MusicalTheatreV2.tsx"]
      .filter((file) => read(file).includes("structuredData={true}"));
    expect(offenders).toEqual([]);
  });

  it("does not preload the homepage hero on every page", () => {
    expect(read("index.html")).not.toMatch(/rel="preload" as="image"/);
  });

  it("names the brand's spaced form in the organisation schema", () => {
    expect(read("index.html")).toContain('"alternateName": ["EventSound", "Event Sound"]');
  });

  it("uses one configured Google review link", () => {
    const hardCoded = ["src/pages/Reviews.tsx", "src/pages/v2/LEDScreenHireV2.tsx", "src/pages/v2/LEDVideoWallsV2.tsx", "src/pages/v2/MusicalTheatreV2.tsx"]
      .filter((file) => read(file).includes("writereview?placeid="));
    expect(hardCoded).toEqual([]);
  });

  it("serves the IndexNow key file that the deploy function references", () => {
    const key = read("netlify/functions/deploy-succeeded.ts").match(/INDEXNOW_KEY = "([0-9a-f]{32})"/)?.[1];
    expect(key).toBeTruthy();
    expect(read(`public/${key}.txt`).trim()).toBe(key);
  });
});
