import { describe, it, expect } from "vitest";
import { siteConfig } from "@/config/site";

describe("siteConfig", () => {
  it("has correct brand name", () => {
    expect(siteConfig.brandName).toBe("EventSound AV Services");
    expect(siteConfig.shortName).toBe("EventSound");
  });

  it("has production canonical base", () => {
    expect(siteConfig.canonicalBase).toBe("https://eventsound.ie");
  });

  it("uses the agreed business facts", () => {
    expect(siteConfig.primaryLocation).toBe("Drogheda, Co. Louth");
    expect(siteConfig.companyExperienceYears).toBe("20+");
    expect(siteConfig.ronanExperienceYears).toBe("40+");
    expect(siteConfig.phone).toBe("+353863520476");
    expect(siteConfig.pricing.ledWallDryHirePerSquareMetrePerDay).toBe(125);
  });

  it("uses a raster social-sharing image on the canonical host", () => {
    expect(siteConfig.ogImage).toMatch(/^https:\/\/eventsound\.ie\/.+\.png$/);
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
