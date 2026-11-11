import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function source(path: string): string {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

describe("published blog internal links", () => {
  it("links the LED service page to the live display-comparison guide", () => {
    expect(source("src/pages/v2/LEDVideoWallsV2.tsx")).toContain(
      "/blog/led-screen-or-led-wall/",
    );
  });

  it("links AV and conference pages to the live technical-brief guide", () => {
    expect(source("src/pages/services/AVProduction.tsx")).toContain(
      "/blog/conference-av-technical-brief/",
    );
    expect(source("src/pages/services/ConferenceAvHire.tsx")).toContain(
      "/blog/conference-av-technical-brief/",
    );
  });

  it("ships the same live links in the first-pass static HTML", () => {
    const prerender = source("scripts/prerender.mjs");
    expect(prerender).toContain(
      'href="/blog/led-screen-or-led-wall/"',
    );
    expect(prerender).toContain(
      'href="/blog/conference-av-technical-brief/"',
    );
    expect(prerender).toContain(
      "shellBodyHtml = SERVICE_PAGE_GUIDES[route.path] || '';",
    );
  });
});
