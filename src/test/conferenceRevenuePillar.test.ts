import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function source(path: string): string {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

describe("conference AV revenue pillar", () => {
  it("targets the national commercial terms with one primary page", () => {
    const page = source("src/pages/services/ConferenceAvHire.tsx");
    expect(page).toContain("Conference AV Hire Ireland | Sound, Screens, Lighting & Crew");
    expect(page).toContain("Conference AV Hire and Production in Ireland");
    expect(page).toContain("Conference Equipment Hire and Technical Production");
    expect(page).toContain("conference sound and lighting");
    expect(page).toContain('canonical: "https://eventsound.ie/services/conference-av-hire/"');
  });

  it("qualifies single-room, multi-room and full-production buyers", () => {
    const page = source("src/pages/services/ConferenceAvHire.tsx");
    expect(page).toContain("Single-room conferences");
    expect(page).toContain("Multi-room conferences");
    expect(page).toContain("Full conference production");
    expect(page).not.toContain("typically starts from €800 to €1,500 per day");
  });

  it("passes conference intent from overlapping service pages", () => {
    for (const path of [
      "src/pages/services/AVProduction.tsx",
      "src/pages/services/LightingDesign.tsx",
      "src/pages/services/VideoProduction.tsx",
      "src/pages/services/EventProduction.tsx",
      "src/pages/services/VirtualEvents.tsx",
    ]) {
      expect(source(path), path).toContain("/services/conference-av-hire/");
    }
  });

  it("keeps the homepage and prerendered HTML aligned", () => {
    expect(source("src/content/services.ts")).toContain("Conference AV & Production");
    const prerender = source("scripts/prerender.mjs");
    expect(prerender).toContain("Conference AV Hire Ireland | Sound, Screens, Lighting & Crew");
    expect(prerender).toContain("Choose a single-room package, multi-room conference equipment hire or full conference production");
  });

  it("normalises national and city URLs to trailing-slash canonicals", () => {
    const redirects = source("public/_redirects");
    for (const slug of ["dublin", "cork", "galway", "belfast", "limerick", "athlone"]) {
      expect(redirects).toContain(`/services/conference-av/${slug}`);
      expect(source(`src/pages/locations/${slug === "athlone" ? "Athalone" : slug[0].toUpperCase() + slug.slice(1)}ConferenceAV.tsx`)).toContain(
        `canonical: "https://eventsound.ie/services/conference-av/${slug}/"`,
      );
    }
  });
});
