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
      ["/services/audio-equipment", "/services/av-production/"],
    ];

    for (const [source, target] of requiredRedirects) {
      expect(rules).toContainEqual({ source, target, status: "301" });
      expect(rules).toContainEqual({ source: `${source}/`, target, status: "301" });
    }
  });

  it("places the SPA fallback after every permanent redirect", () => {
    expect(rules.at(-1)).toEqual({ source: "/*", target: "/index.html", status: "200" });
    expect(rules.slice(0, -1).every(({ status }) => status === "301" || status === "404")).toBe(true);
  });

  it("serves policy pages instead of redirecting the old privacy URL to the homepage", () => {
    expect(rules).toContainEqual({ source: "/privacy-policy", target: "/privacy-policy/", status: "301" });
    expect(rules).toContainEqual({ source: "/cookie-policy", target: "/cookie-policy/", status: "301" });
    expect(rules).not.toContainEqual({ source: "/privacy-policy/", target: "/", status: "301" });
  });

  it("lists only canonical trailing-slash URLs in the generated sitemap", () => {
    const sitemap = fs.readFileSync(publicPath("sitemap.xml"), "utf8");
    const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

    expect(urls.length).toBeGreaterThan(0);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((url) => url.startsWith("https://eventsound.ie/") && url.endsWith("/"))).toBe(true);
  });
});
