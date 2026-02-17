/**
 * Typed CMS key constants.
 * Use these instead of string literals to catch mismatches at compile time.
 */

export const CMS_PAGES = {
  home: "home",
  services: "services",
  avProduction: "av-production",
  contact: "contact",
  about: "about",
  faq: "faq",
  gallery: "gallery",
} as const;

export type PageKey = (typeof CMS_PAGES)[keyof typeof CMS_PAGES];

export const CMS_SECTIONS = {
  home: {
    hero: "hero",
    features: "features",
    cta2: "cta2",
  },
  services: {
    hero: "hero",
    items: "items",
  },
  avProduction: {
    hero: "hero",
    categories: "categories",
    infoCards: "info_cards",
  },
  contact: {
    main: "main",
    sidebar: "sidebar",
    form: "form",
  },
} as const;

export type SectionKey<P extends PageKey> =
  P extends "home" ? (typeof CMS_SECTIONS.home)[keyof typeof CMS_SECTIONS.home]
  : P extends "services" ? (typeof CMS_SECTIONS.services)[keyof typeof CMS_SECTIONS.services]
  : P extends "av-production" ? (typeof CMS_SECTIONS.avProduction)[keyof typeof CMS_SECTIONS.avProduction]
  : P extends "contact" ? (typeof CMS_SECTIONS.contact)[keyof typeof CMS_SECTIONS.contact]
  : string;

/** Image library categories */
export const IMAGE_CATEGORIES = {
  headlines: "headlines",
  supplements: "supplements",
  portfolio: "portfolio",
  logos: "logos",
} as const;

export type ImageCategory = (typeof IMAGE_CATEGORIES)[keyof typeof IMAGE_CATEGORIES];
