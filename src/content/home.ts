// Copy for the homepage sections below the services grid (HomeSections.tsx).
//
// Rules (src/test/homeContent.test.ts enforces them):
// - Every company-specific claim comes from content/blog/_FACTS.md. If a fact
//   is not in that file, it does not go here.
// - No prices except the LED dry-hire rate, read from siteConfig.pricing.
// - No personal names. No venue or client that is not in the facts file.
// - Case-study links use the slugs that are live in the CMS. If a case study
//   is renamed in Admin, update the slug here (verify_live.py will show the
//   old URL serving the "not found" shell).

import { siteConfig } from "@/config/site";

const LED_RATE = `€${siteConfig.pricing.ledWallDryHirePerSquareMetrePerDay} per m² per day`;
const YEARS = siteConfig.companyExperienceYears;

/** Cities named in the facts file as served. */
export const servedCities = [
  "Dublin", "Cork", "Galway", "Belfast", "Limerick", "Waterford",
  "Kilkenny", "Athlone", "Dundalk", "Navan", "Swords",
] as const;

/** Cities that have their own LED wall and conference AV pages. */
export const cityPages = ["Dublin", "Cork", "Galway", "Belfast", "Limerick", "Athlone"] as const;

const cityList = `${servedCities.slice(0, -1).join(", ")} and ${servedCities[servedCities.length - 1]}`;

export const homeIntro = {
  kicker: "Event Production",
  heading: "Event production across Ireland, run by one team",
  paragraphs: [
    `EventSound AV Services is an owner-led event production company based in Drogheda, Co. Louth. You may also see the name written as Event Sound. For ${YEARS} years the team has supplied and operated sound, LED screens, lighting, staging and video, from small conferences to outdoor concerts for more than 8,000 people a night.`,
    "Most clients book in one of two ways. Some need a single service, such as an LED video wall or a PA system with an engineer. Others hand over the whole technical production, and we plan it, build it, run it on the day and take it away afterwards.",
    "Either way you get one quote that covers equipment, delivery, installation, on-site operation and breakdown. There are no hidden fees.",
  ],
  links: [
    { label: "Full event production", href: "/services/event-production/" },
    { label: "AV hire and production", href: "/services/av-production/" },
  ],
};

export type HomeEventType = { key: string; title: string; text: string; href: string; linkLabel: string };

export const homeEventTypes: { kicker: string; heading: string; intro: string; items: HomeEventType[] } = {
  kicker: "Who We Work With",
  heading: "The events we produce",
  intro: "The equipment changes from one event to the next. The approach does not: the right kit for the room, installed and run by an experienced crew.",
  items: [
    {
      key: "conferences",
      title: "Conferences and AGMs",
      text: "Sound, screens, lighting and presentation support for single-room and multi-room conferences, with wireless microphones for speakers and panels.",
      href: "/services/conference-av-hire/",
      linkLabel: "Conference AV hire",
    },
    {
      key: "outdoor",
      title: "Outdoor concerts and festivals",
      text: "Weather-rated LED screens, line array PA systems and TUV-certified modular staging with adjustable legs for uneven ground.",
      href: "/services/led-video-walls/",
      linkLabel: "LED video walls",
    },
    {
      key: "launches",
      title: "Launches and awards nights",
      text: "LED walls, stage lighting and sound for brand launches and awards ceremonies, planned and operated as one production.",
      href: "/services/event-production/",
      linkLabel: "Event production",
    },
    {
      key: "hybrid",
      title: "Hybrid and streamed events",
      text: "Multi-camera filming and live streaming to YouTube, Vimeo, Teams or Zoom, with a backup internet connection.",
      href: "/services/virtual-events/",
      linkLabel: "Hybrid events",
    },
    {
      key: "theatre",
      title: "Musicals and school shows",
      text: "Sound, wireless microphones and lighting for schools, musical societies and community theatre groups, working with the venue's own rig.",
      href: "/services/musical-theatre/",
      linkLabel: "Musical theatre",
    },
    {
      key: "hire",
      title: "Screens and LED on hire",
      text: `Display screens from 43 to 98 inches on stands, and LED walls on dry hire at ${LED_RATE}.`,
      href: "/services/led-screen-hire/",
      linkLabel: "LED screen hire",
    },
  ],
};

export type HomeProofItem = { key: string; title: string; where: string; text: string; href: string };

export const homeProof: { kicker: string; heading: string; intro: string; items: HomeProofItem[]; clients: string } = {
  kicker: "Recent Work",
  heading: "Events we have delivered",
  intro: "A few of the productions the team has built and operated.",
  items: [
    {
      key: "swords-castle",
      title: "Swords Castle Summer Concerts",
      where: "Swords, Co. Dublin · 2025",
      text: "Outdoor LED screen and event production for concerts with more than 8,000 people a night.",
      href: "/case-studies/swords-castle-summer-concerts/",
    },
    {
      key: "beta-festival",
      title: "Beta Festival",
      where: "The Digital Hub, Dublin · 2025",
      text: "A curved LED video wall and sound for an art and technology exhibition.",
      href: "/case-studies/beta-festival-2025-curved-led-video-wall-sound-for-art-technology-exhibition/",
    },
    {
      key: "school-summit",
      title: "School Summit",
      where: "Eikon Arena · 2025",
      text: "LED wall and conference AV.",
      href: "/case-studies/school-summit-career-expos/",
    },
    {
      key: "prism",
      title: "PRISM Immersive Technology Summit",
      where: "Mac Anna Theatre",
      text: "Conference production.",
      href: "/case-studies/prism-immersive-technology-summit/",
    },
    {
      key: "explore-fingal",
      title: "Explore Fingal launch",
      where: "Grand Hotel, Malahide",
      text: "Full event production for a destination tourism brand launch.",
      href: "/case-studies/explore-fingal-destination-tourism-brand-launch-full-event-production-at-the-grand-hotel-malahide/",
    },
  ],
  clients: "Clients include Fingal County Council, Louth County Council, Local Enterprise Office Louth and Škoda Ireland.",
};

export const homeCoverage = {
  kicker: "Where We Work",
  heading: "Based in Drogheda, working nationwide",
  paragraphs: [
    `Our base is in Townrath, Drogheda, Co. Louth, between Dublin and Belfast. From there we deliver, install and operate events throughout Ireland, including ${cityList}.`,
  ],
  ledLabel: "LED wall hire by city",
  conferenceLabel: "Conference AV by city",
};

export const homeProcess = {
  kicker: "How It Works",
  heading: "How a booking works",
  steps: [
    {
      title: "Tell us about the event",
      text: "Send the date, the venue, the audience size and what you want people to see and hear.",
    },
    {
      title: "Get one all-inclusive quote",
      text: "We reply within 24 hours with a recommended setup and a quote covering equipment, delivery, installation, operation and breakdown.",
    },
    {
      title: "Site visit and plan",
      text: "For confirmed bookings we visit the venue free of charge and agree the layout with you.",
    },
    {
      title: "Build, run, pack down",
      text: "Our crew installs and tests everything, operates it during the event and removes it afterwards.",
    },
  ],
};

export const homeFaqs = [
  {
    question: "What does EventSound do?",
    answer:
      "EventSound AV Services hires out and operates audio visual equipment for events in Ireland: sound systems, LED video walls and screens, lighting, staging, and video and live streaming. You can book one service or the full technical production.",
  },
  {
    question: "Is EventSound the same company as Event Sound?",
    answer:
      "Yes. The trading name is EventSound AV Services, and some people write it as Event Sound. It is one company, based in Drogheda, Co. Louth.",
  },
  {
    question: "Which parts of Ireland do you cover?",
    answer: `All of it. We are based in Drogheda and cover events in ${cityList}, and anywhere in between.`,
  },
  {
    question: "What is included in a quote?",
    answer:
      "Equipment, delivery, installation, on-site operation and breakdown are all included in one figure. There are no hidden fees. Site visits are free for confirmed bookings.",
  },
  {
    question: "How much does AV hire cost?",
    answer: `It depends on the equipment, the venue, the hours and the crew needed, so each event is quoted individually. The one published rate is LED wall dry hire at ${LED_RATE}. Operated packages are quoted all-inclusive.`,
  },
];
