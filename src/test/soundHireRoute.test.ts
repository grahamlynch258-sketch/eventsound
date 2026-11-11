import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function source(path: string): string {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

describe("sound hire commercial landing page", () => {
  it("exposes the page through the application router", () => {
    const app = source("src/App.tsx");
    expect(app).toContain('import("@/pages/services/AudioSystems")');
    expect(app).toContain('path="/services/sound-hire"');
  });

  it("ships crawlable metadata, body copy and structured data", () => {
    const prerender = source("scripts/prerender.mjs");
    expect(prerender).toContain("'/services/sound-hire': {");
    expect(prerender).toContain("'/services/sound-hire': [");
    expect(prerender).toContain("{ path: '/services/sound-hire'");
    expect(prerender).toContain('serviceType: "Sound and PA System Hire"');
    expect(source("scripts/generate-sitemap.mjs")).toContain("{ path: '/services/sound-hire'");
  });

  it("links the page from the main discovery surfaces", () => {
    for (const path of [
      "src/content/services.ts",
      "src/pages/Services.tsx",
      "src/components/site/SiteHeader.tsx",
      "src/components/site/SiteFooter.tsx",
      "src/pages/services/AVProduction.tsx",
    ]) {
      expect(source(path), path).toContain("/services/sound-hire/");
    }
  });

  it("reclaims legacy sound URLs without redirecting the canonical page", () => {
    const redirects = source("public/_redirects");
    expect(redirects).toContain("/services/pa-hire/          /services/sound-hire/       301");
    expect(redirects).toContain("/services/audio-systems/            /services/sound-hire/          301");
    expect(redirects).toContain("/sound-hire-vision-hire-dublin-ireland/  /services/sound-hire/      301");
    expect(redirects).not.toMatch(/\/services\/sound-hire\/?\s+\/services\/av-production/);
    expect(redirects.trimEnd()).toMatch(/\/\*\s+\/404\.html\s+404$/);
  });
});
