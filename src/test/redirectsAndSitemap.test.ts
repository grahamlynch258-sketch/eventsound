import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const publicPath = (filename: string) => path.join(process.cwd(), "public", filename);

describe("redirect and sitemap consistency", () => {
  const redirects = fs
    .readFileSync(publicPath("_redirects"), "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
  const rules = redirects.map((line) => {
    const [source, target, status] = line.split(/\s+/);
    return { source, target, status };
  });

  it("keeps the high-value legacy service redirects as permanent redirects", () => {
    const requiredRedirects = [
      ["/services/stage-hire-pipe-drape", "/services/staging-pipe-drape/"],
      ["/services/lighting-effects", "/services/lighting-design/"],
      ["/services/led-video-display-screens", "/services/led-video-walls/"],
      ["/services/live-event-production", "/services/event-production/"],
      ["/services/video-equipment", "/services/video-production/"],
      ["/services/audio-equipment", "/services/sound-hire/"],
    ];

    for (const [source, target] of requiredRedirects) {
      expect(rules).toContainEqual({ source, target, status: "301" });
      expect(rules).toContainEqual({ source: `${source}/`, target, status: "301" });
    }
  });

  it("ends with noindex SPA rewrites and then a real 404 for everything else", () => {
    expect(rules.at(-1)).toEqual({ source: "/*", target: "/404.html", status: "404" });
    const firstFallback = rules.findIndex(({ status }) => status === "200");
    expect(firstFallback).toBeGreaterThan(0);
    // Every permanent redirect comes before the first SPA rewrite.
    expect(rules.slice(0, firstFallback).every(({ status }) => status === "301" || status === "404")).toBe(true);
    // SPA rewrites only ever point at the noindex shell, never the homepage.
    expect(rules.filter(({ status }) => status === "200").every(({ target }) => target === "/spa.html")).toBe(true);
    expect(rules.some(({ target }) => target === "/index.html")).toBe(false);
  });

  it("lists only canonical trailing-slash URLs in the generated sitemap", () => {
    const sitemap = fs.readFileSync(publicPath("sitemap.xml"), "utf8");
    const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

    expect(urls.length).toBeGreaterThan(0);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((url) => url.startsWith("https://eventsound.ie/") && url.endsWith("/"))).toBe(true);
  });
});
