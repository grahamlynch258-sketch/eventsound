import { ContentData } from "@/hooks/useSiteContent";

export interface TrustBarItem { value: string; label: string; }

export interface HomeHeroContent {
  tagline: string; headline: string; subheadline: string;
  cta_primary: string; cta_secondary: string;
}

export interface HomeFeaturesContent { items: TrustBarItem[]; }

export interface HomeCta2Content {
  title: string; description: string;
  primaryCtaLabel: string; secondaryCtaLabel: string;
  primaryHref: string; secondaryHref: string;
}

export function mapHeroContent(cms: ContentData | undefined, fallback: HomeHeroContent): HomeHeroContent {
  const v = cms?.values;
  if (!v || Object.keys(v).length === 0) return fallback;
  return {
    tagline: v.tagline ?? fallback.tagline,
    headline: v.headline ?? fallback.headline,
    subheadline: v.subheadline ?? fallback.subheadline,
    cta_primary: v.cta_primary ?? fallback.cta_primary,
    cta_secondary: v.cta_secondary ?? fallback.cta_secondary,
  };
}

export function mapFeaturesContent(cms: ContentData | undefined, fallback: HomeFeaturesContent): HomeFeaturesContent {
  const v = cms?.values;
  if (!v || Object.keys(v).length === 0) return fallback;
  const items: TrustBarItem[] = [];
  for (let i = 1; i <= 10; i++) {
    const val = v["feature_" + i + "_value"]?.trim();
    const lbl = v["feature_" + i + "_label"]?.trim();
    if (!val && !lbl) break;
    if (val && lbl) items.push({ value: val, label: lbl });
  }
  return items.length > 0 ? { items } : fallback;
}

export function mapCta2Content(cms: ContentData | undefined, fallback: HomeCta2Content): HomeCta2Content {
  const v = cms?.values;
  if (!v || Object.keys(v).length === 0) return fallback;
  return {
    title: v.headline ?? v.title ?? fallback.title,
    description: v.description ?? fallback.description,
    primaryCtaLabel: v.button_text ?? v.primaryCtaLabel ?? fallback.primaryCtaLabel,
    secondaryCtaLabel: v.secondaryCtaLabel ?? fallback.secondaryCtaLabel,
    primaryHref: v.primaryHref ?? fallback.primaryHref,
    secondaryHref: v.secondaryHref ?? fallback.secondaryHref,
  };
}
