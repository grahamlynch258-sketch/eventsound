import { describe, it, expect } from "vitest";
import {
  mapHeroContent,
  mapFeaturesContent,
  mapCta2Content,
  type HomeHeroContent,
  type HomeFeaturesContent,
  type HomeCta2Content,
} from "@/lib/contentMapper";

const HERO_FALLBACK: HomeHeroContent = {
  tagline: "Test Tagline",
  headline: "Test Headline",
  subheadline: "Test Subheadline",
  cta_primary: "CTA Primary",
  cta_secondary: "CTA Secondary",
};

const FEATURES_FALLBACK: HomeFeaturesContent = {
  items: [
    { value: "A", label: "Label A" },
    { value: "B", label: "Label B" },
  ],
};

const CTA2_FALLBACK: HomeCta2Content = {
  title: "Title",
  description: "Desc",
  primaryCtaLabel: "Primary",
  secondaryCtaLabel: "Secondary",
  primaryHref: "/primary",
  secondaryHref: "/secondary",
};

describe("mapHeroContent", () => {
  it("returns fallback when CMS is undefined", () => {
    const result = mapHeroContent(undefined, HERO_FALLBACK);
    expect(result.headline).toBe(HERO_FALLBACK.headline);
    expect(result.tagline).toBe(HERO_FALLBACK.tagline);
  });

  it("returns fallback when CMS values are empty", () => {
    const result = mapHeroContent({ values: {} }, HERO_FALLBACK);
    expect(result.headline).toBe(HERO_FALLBACK.headline);
  });

  it("merges CMS values with fallback", () => {
    const result = mapHeroContent(
      { values: { headline: "CMS Headline" } },
      HERO_FALLBACK
    );
    expect(result.headline).toBe("CMS Headline");
    expect(result.tagline).toBe("Test Tagline");
  });

  it("supports admin key aliases (title → headline)", () => {
    const result = mapHeroContent(
      { values: { title: "From Title" } },
      HERO_FALLBACK
    );
    expect(result.headline).toBe("From Title");
  });
});

describe("mapFeaturesContent", () => {
  it("returns fallback when CMS is null", () => {
    expect(mapFeaturesContent(null, FEATURES_FALLBACK)).toEqual(FEATURES_FALLBACK);
  });

  it("parses admin feature_N_title/description pattern", () => {
    const result = mapFeaturesContent(
      {
        values: {
          feature_1_title: "Fast",
          feature_1_description: "Quick builds",
          feature_2_title: "Safe",
          feature_2_description: "Insured crew",
        },
      },
      FEATURES_FALLBACK
    );
    expect(result.items).toHaveLength(2);
    expect(result.items[0]).toEqual({ value: "Fast", label: "Quick builds" });
  });

  it("falls back when features are incomplete", () => {
    const result = mapFeaturesContent(
      { values: { feature_1_title: "Only title" } },
      FEATURES_FALLBACK
    );
    expect(result).toEqual(FEATURES_FALLBACK);
  });
});

describe("mapCta2Content", () => {
  it("returns fallback when CMS is undefined", () => {
    expect(mapCta2Content(undefined, CTA2_FALLBACK)).toEqual(CTA2_FALLBACK);
  });

  it("supports admin key aliases (button_text → primaryCtaLabel)", () => {
    const result = mapCta2Content(
      { values: { headline: "CMS Title", button_text: "Go" } },
      CTA2_FALLBACK
    );
    expect(result.title).toBe("CMS Title");
    expect(result.primaryCtaLabel).toBe("Go");
  });
});
