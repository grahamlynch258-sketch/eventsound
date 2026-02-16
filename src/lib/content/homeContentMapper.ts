import { ContentData } from "@/hooks/useSiteContent";

export interface HomeHeroContent {
  tagline: string;
  headline: string;
  subheadline: string;
  cta_primary: string;
  cta_secondary: string;
}

export interface HomeFeaturesContent {
  // Define feature content structure when needed
  [key: string]: string;
}

export interface HomeCta2Content {
  // Define CTA2 content structure when needed
  [key: string]: string;
}

export interface HomeContent {
  hero: HomeHeroContent;
  features: HomeFeaturesContent;
  cta2: HomeCta2Content;
}

/**
 * Safely extract homepage hero content from CMS data with fallbacks
 */
export function mapHeroContent(
  cmsData: ContentData | undefined,
  fallback: HomeHeroContent
): HomeHeroContent {
  if (!cmsData || !cmsData.values || Object.keys(cmsData.values).length === 0) {
    return fallback;
  }

  return {
    tagline: cmsData.values.tagline ?? fallback.tagline,
    headline: cmsData.values.headline ?? fallback.headline,
    subheadline: cmsData.values.subheadline ?? fallback.subheadline,
    cta_primary: cmsData.values.cta_primary ?? fallback.cta_primary,
    cta_secondary: cmsData.values.cta_secondary ?? fallback.cta_secondary,
  };
}

/**
 * Safely extract homepage features content from CMS data with fallbacks
 */
export function mapFeaturesContent(
  cmsData: ContentData | undefined,
  fallback: HomeFeaturesContent
): HomeFeaturesContent {
  if (!cmsData || !cmsData.values || Object.keys(cmsData.values).length === 0) {
    return fallback;
  }

  // Return CMS values or fallback
  return Object.keys(cmsData.values).length > 0 ? cmsData.values : fallback;
}

/**
 * Safely extract homepage CTA2 content from CMS data with fallbacks
 */
export function mapCta2Content(
  cmsData: ContentData | undefined,
  fallback: HomeCta2Content
): HomeCta2Content {
  if (!cmsData || !cmsData.values || Object.keys(cmsData.values).length === 0) {
    return fallback;
  }

  // Return CMS values or fallback
  return Object.keys(cmsData.values).length > 0 ? cmsData.values : fallback;
}
