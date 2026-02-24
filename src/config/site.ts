export const siteConfig = {
  brandName: "Event Sound Pro Audio & Entertainment",
  shortName: "Event Sound",
 tagline: "Premium Event Production — Ireland",
  legalName: "Event Sound Pro Audio & Entertainment",

  email: "info@eventsound.ie",
  emailSecondary: "Graham@eventsound.ie",
  phone: "+353872888761",
  phoneDisplay: "+353 87 288 8761",
  phoneSecondary: "+353868311851",
  phoneSecondaryDisplay: "+353 86 831 1851",
  phoneTertiary: "+353863520476",
  phoneTertiaryDisplay: "+353 86 352 0476",

  addressLocality: "Dublin",
  addressRegion: "Ireland",
  addressStreet: "Townrath",
  postalCode: "",
  country: "IE",
  primaryLocation: "Dublin, Ireland",
  serviceAreas: ["Louth", "Dublin", "Meath", "Nationwide Ireland"],

  quoteResponseSLA: "within 24 hours",

  social: {
    facebook: "",
    instagram: "",
    linkedin: "https://ie.linkedin.com/company/event-sound-pro-audio",
  },

  ogImage: "https://www.eventsound.ie/og-image.svg",
  canonicalBase: "https://www.eventsound.ie",

  serviceTypes: [
    "Live Event Production",
    "Audio Equipment",
    "LED Video & Display Screens",
    "Hybrid Events",
    "Lighting & Effects",
    "Stage Hire & Pipe & Drape",
    "Video Equipment",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
