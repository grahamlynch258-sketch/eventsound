export const siteConfig = {
  brandName: "Event Sound Pro Audio & Entertainment",
  shortName: "Event Sound",
  tagline: "LED Walls • Staging • Lighting • Audio",
  legalName: "Event Sound Pro Audio & Entertainment",

  email: "TODO_EMAIL",
  phone: "TODO_PHONE",
  phoneDisplay: "TODO_PHONE_DISPLAY",
  whatsapp: "TODO_WHATSAPP",

  addressLocality: "Drogheda",
  addressRegion: "Co. Louth",
  postalCode: "TODO_POSTALCODE",
  country: "IE",
  primaryLocation: "Drogheda, Co. Louth, Ireland",
  serviceAreas: ["Louth", "Dublin", "Meath", "Nationwide Ireland"],

  quoteResponseSLA: "within 24 hours",

  social: {
    facebook: "TODO_FACEBOOK_URL",
    instagram: "TODO_INSTAGRAM_URL",
    linkedin: "TODO_LINKEDIN_URL",
  },

  ogImage: "https://lovable.dev/opengraph-image-p98pqg.png",
  canonicalBase: "https://eventsound.lovable.app",

  serviceTypes: [
    "LED Video Walls",
    "Stage Design & Build",
    "Event Lighting",
    "Audio & PA Systems",
    "Live Streaming",
    "Video Production",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
