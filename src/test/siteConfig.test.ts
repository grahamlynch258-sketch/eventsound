import { describe, it, expect } from "vitest";
import { siteConfig } from "@/config/site";

describe("siteConfig", () => {
  it("has correct brand name", () => {
    expect(siteConfig.brandName).toBe("Event Sound Pro Audio & Entertainment");
    expect(siteConfig.shortName).toBe("Event Sound");
  });

  it("has production canonical base", () => {
    expect(siteConfig.canonicalBase).toBe("https://www.eventsound.ie");
  });

  it("has valid email", () => {
    expect(siteConfig.email).toContain("@eventsound.ie");
  });

  it("has no StageSpark references", () => {
    const json = JSON.stringify(siteConfig).toLowerCase();
    expect(json).not.toContain("stagespark");
    expect(json).not.toContain("stage spark");
  });
});
