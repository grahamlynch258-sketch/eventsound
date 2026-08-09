export const siteConfig = {
  brandName: "EventSound AV Services",
  shortName: "EventSound",
  tagline: "Premium Event Production — Ireland",
  legalName: "EventSound AV Services",

  companyExperienceYears: "20+",
  ronanExperienceYears: "40+",

  email: "info@eventsound.ie",
  phone: "+353863520476",
  phoneDisplay: "+353 86 352 0476",
  phoneSecondary: "+353872888761",
  phoneSecondaryDisplay: "+353 87 288 8761",
  phoneOperations: "+353868311851",
  phoneOperationsDisplay: "+353 86 831 1851",

  addressLocality: "Drogheda",
  addressRegion: "County Louth",
  addressStreet: "Townrath",
  postalCode: "",
  country: "IE",
  primaryLocation: "Drogheda, Co. Louth",
  serviceAreas: ["Dublin", "Leinster", "Nationwide Ireland"],

  quoteResponseSLA: "within 24 hours",

  pricing: {
    ledWallDryHirePerSquareMetrePerDay: 125,
    currency: "EUR",
  },

  social: {
    facebook: "",
    instagram: "",
    linkedin: "https://ie.linkedin.com/company/event-sound-pro-audio",
  },

  ogImage: "https://eventsound.ie/Brand/logo_1920x1080.png",
  logo: "https://eventsound.ie/Brand/logo_transparent.png",
  canonicalBase: "https://eventsound.ie",

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
