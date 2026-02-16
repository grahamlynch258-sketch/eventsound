import { ContentData } from "@/hooks/useSiteContent";

export interface HomeHeroContent {
  tagline: string;
  headline: string;
  subheadline: string;
  cta_primary: string;
  cta_secondary: string;
}

export interface TrustBarItem {
  value: string;
  label: string;
}

export interface HomeFeaturesContent {
  items: TrustBarItem[];
}

export interface HomeCta2Content {
  title: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  primaryHref?: string;
  secondaryHref?: string;
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
 * Safely extract homepage features (TrustBar) content from CMS data with fallbacks
 * Expected CMS keys: feature_1_value, feature_1_label, feature_2_value, feature_2_label, etc.
 */
export function mapFeaturesContent(
  cmsData: ContentData | undefined,
  fallback: HomeFeaturesContent
): HomeFeaturesContent {
  if (!cmsData || !cmsData.values || Object.keys(cmsData.values).length === 0) {
    return fallback;
  }

  // Extract items from CMS data
  const items: TrustBarItem[] = [];
  let index = 1;
  
  while (cmsData.values[`feature_${index}_value`] || cmsData.values[`feature_${index}_label`]) {
    const value = cmsData.values[`feature_${index}_value`];
    const label = cmsData.values[`feature_${index}_label`];
    
    // Only add if both value and label exist and are non-empty
    if (value && label && value.trim() && label.trim()) {
      items.push({ value: value.trim(), label: label.trim() });
    }
    
    index++;
    // Safety limit to prevent infinite loops
    if (index > 10) break;
  }

  // Return CMS items if any valid ones found, otherwise fallback
  return items.length > 0 ? { items } : fallback;
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

  return {
    title: cmsData.values.title ?? fallback.title,
    description: cmsData.values.description ?? fallback.description,
    primaryCtaLabel: cmsData.values.primaryCtaLabel ?? fallback.primaryCtaLabel,
    secondaryCtaLabel: cmsData.values.secondaryCtaLabel ?? fallback.secondaryCtaLabel,
    primaryHref: cmsData.values.primaryHref ?? fallback.primaryHref,
    secondaryHref: cmsData.values.secondaryHref ?? fallback.secondaryHref,
  };
}
