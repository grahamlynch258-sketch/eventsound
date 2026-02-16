export type CmsSection =
  | { values?: Record<string, unknown> | null }
  | null
  | undefined;

const s = (v: unknown, fb = "") =>
  typeof v === "string" && v.trim() ? v.trim() : fb;

export interface HomeHeroContent {
  tagline: string;
  headline: string;
  subheadline: string;
  cta_primary: string;
  cta_secondary: string;
  // optional href support if you add it later
  cta_primary_href?: string;
  cta_secondary_href?: string;
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
  description?: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  primaryHref: string;
  secondaryHref: string;
}

export function mapHeroContent(
  cms: CmsSection,
  fallback: HomeHeroContent
): HomeHeroContent {
  const v = (cms?.values ?? {}) as Record<string, unknown>;

  return {
    tagline: s(v.tagline, fallback.tagline),
    headline: s(v.headline ?? v.title, fallback.headline),
    subheadline: s(v.subheadline ?? v.description, fallback.subheadline),
    cta_primary: s(
      v.cta_primary ?? v.primary_button_text ?? v.button_text,
      fallback.cta_primary
    ),
    cta_secondary: s(
      v.cta_secondary ?? v.secondary_button_text,
      fallback.cta_secondary
    ),
    cta_primary_href: s(v.cta_primary_href ?? v.primary_href, fallback.cta_primary_href),
    cta_secondary_href: s(v.cta_secondary_href ?? v.secondary_href, fallback.cta_secondary_href),
  };
}

export function mapFeaturesContent(
  cms: CmsSection,
  fallback: HomeFeaturesContent
): HomeFeaturesContent {
  const v = (cms?.values ?? {}) as Record<string, unknown>;

  // Support direct items array (if you ever store it that way)
  const rawItems = v.items;
  if (Array.isArray(rawItems)) {
    const items = rawItems
      .map((x) => {
        const obj = x as Record<string, unknown>;
        return { value: s(obj.value), label: s(obj.label) };
      })
      .filter((i) => i.value && i.label);
    if (items.length) return { items };
  }

  // Support existing admin pattern: feature_1_title + feature_1_description
  const items: TrustBarItem[] = [];
  for (let i = 1; i <= 6; i++) {
    const value = s(v[`feature_${i}_title`], "");
    const label = s(v[`feature_${i}_description`], "");
    if (value && label) items.push({ value, label });
  }

  return items.length ? { items } : fallback;
}

export function mapCta2Content(
  cms: CmsSection,
  fallback: HomeCta2Content
): HomeCta2Content {
  const v = (cms?.values ?? {}) as Record<string, unknown>;

  return {
    title: s(v.title ?? v.headline, fallback.title),
    description: s(v.description, fallback.description ?? ""),
    primaryCtaLabel: s(v.primaryCtaLabel ?? v.button_text ?? v.primary_button_text, fallback.primaryCtaLabel),
    secondaryCtaLabel: s(v.secondaryCtaLabel ?? v.secondary_button_text, fallback.secondaryCtaLabel),
    primaryHref: s(v.primaryHref ?? v.primary_href, fallback.primaryHref),
    secondaryHref: s(v.secondaryHref ?? v.secondary_href, fallback.secondaryHref),
  };
}
