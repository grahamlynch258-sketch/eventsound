// Photos, captions and the few lines of copy that are new on the home page
// preview (/home-next/). Everything else on that page is read from
// src/content/home.ts, so the two pages cannot drift apart.
//
// Same rules as home.ts:
// - Every company-specific claim comes from content/blog/_FACTS.md.
// - No prices here. No personal names. No venue or client that is not in the
//   facts file or already captioned on the live site.
// - To change a photo, change its file name here. Every photo below is already
//   in the site-images bucket and already published on the site. Look at a
//   photo before using it: nothing with children, nothing you cannot caption.

import { STORAGE_PUBLIC_PREFIX } from "@/lib/imageCdn";
import { siteConfig } from "@/config/site";

const photo = (file: string) => `${STORAGE_PUBLIC_PREFIX}site-images/${file}`;

export type HomePhoto = {
  src: string;
  alt: string;
  /** CSS object-position, for photos whose subject is off-centre. */
  position?: string;
  /** Drawn taller than its frame, anchored to the top, to crop a strip off the bottom of the file. */
  overscan?: string;
};

export const homeNextHero = {
  eyebrow: "Audio visual hire & event production · Ireland",
  lines: ["Every seat hears it.", "Every seat sees it."],
  sub: "Sound, LED screens, lighting, staging and video for events across Ireland. One team plans it, builds it and runs it on the day, and one quote covers the lot.",
  photo: {
    src: photo("1771935457044-dr5vefjk49n-optimized.webp"),
    alt: "A band on stage at Swords Castle Summer Concerts, lit by beams through haze in front of an LED wall, seen over the heads of the crowd",
  } satisfies HomePhoto,
  slateTitle: "In the photo",
  slateShort: "Swords Castle Summer Concerts, 2025.",
  slateLong: "Outdoor LED screen and event production for more than 8,000 people a night.",
  facts: [`${siteConfig.companyExperienceYears} years' experience`, "Our own equipment and crew", "Fully insured", "Reply within 24 hours"],
};

export const homeNextClients = ["Fingal County Council", "Louth County Council", "Local Enterprise Office Louth", "Škoda Ireland"];

export const homeNextStats = [
  { value: 35, unit: "+", label: "years of event production experience" },
  { value: 8000, unit: "+", label: "people a night at Swords Castle Summer Concerts" },
  { value: 100, unit: "m²+", label: "LED walls, starting from 7 m² for conferences" },
  { value: 24, unit: "h", label: "to reply with a recommended setup and a quote" },
];

export type HomeService = { name: string; text: string; href: string; caption: string; photo: HomePhoto };

export const homeNextServices: { heading: [string, string]; intro: string; items: HomeService[] } = {
  heading: ["One production partner,", "every technical detail."],
  intro: "Choose a specialist service, or let EventSound design and operate the complete production, from the first site question to final load-out.",
  items: [
    {
      name: "Full event production",
      text: "One accountable team from technical planning to load-out.",
      href: "/services/event-production/",
      caption: "Music awards night, Hillgrove Hotel, Monaghan. LED screen, lighting and staging.",
      photo: { src: photo("1774965207833-69ufr6x9ojj.jpg"), alt: "LED screen above a stage with moving lights and truss towers in a hotel ballroom, set for a music awards night", position: "50% 62%" },
    },
    {
      name: "Conference AV",
      text: "Sound, screens, lighting, presentations and crew for single-room and multi-room conferences.",
      href: "/services/conference-av-hire/",
      caption: "dotMD conference, Galway. LED video wall and stage lighting.",
      photo: { src: photo("1772704834679-uszp9l79k4.jpeg"), alt: "Conference hall with rows of chairs facing an LED wall under a lighting truss", position: "24% 50%" },
    },
    {
      name: "LED video walls",
      text: "Indoor, outdoor and curved LED walls, installed and operated. From 7 m² to 100 m²+.",
      href: "/services/led-video-walls/",
      caption: "LED video wall in a hotel ballroom, set for a conference.",
      photo: { src: photo("1771953271892-v1mndebjda-optimized.webp"), alt: "Wide LED video wall glowing green in a dark hotel ballroom" },
    },
    {
      name: "Sound & PA systems",
      text: "PA, wireless microphones, stage monitors and experienced sound engineers.",
      href: "/services/sound-hire/",
      caption: "Swords Castle Summer Concerts, 2025. PA system and stage lighting.",
      photo: { src: photo("1771955196661-0edr69j5boqs-optimized.webp"), alt: "Outdoor concert stage at dusk with a band playing to a large crowd", position: "50% 55%" },
    },
    {
      name: "Lighting design",
      text: "Stage, architectural and camera-ready event lighting.",
      href: "/services/lighting-design/",
      caption: "Castle venue at dusk, lit with coloured LED uplighting.",
      photo: { src: photo("1771955388023-84cdfr643bt-optimized.webp"), alt: "Castle facade at dusk lit in blue, green, pink and red" },
    },
    {
      name: "Staging & drape",
      text: "Safe staging, risers and pipe-and-drape transformations.",
      href: "/services/staging-pipe-drape/",
      caption: "Stage, drape and a lighting truss built in a sports hall.",
      photo: { src: photo("1781346146635-lr3bjpa4e5.jpg"), alt: "Stage with black drape and a truss of moving lights built in a sports hall", position: "50% 38%" },
    },
    {
      name: "Video & streaming",
      text: "Multi-camera capture, live streaming and playback.",
      href: "/services/video-production/",
      caption: "The production desk at a conference, with a remote speaker on the monitor.",
      photo: { src: photo("1771873698314-j7w56ha1zu9-optimized.webp"), alt: "Vision mixer, laptop and monitor on a production desk, with a conference stage beyond" },
    },
    {
      name: "AV hire",
      text: "Sound, screens and presentation systems, delivered, set up and run by a technician.",
      href: "/services/av-production/",
      caption: "Local Enterprise Week launch. Display screen, PA and lectern.",
      photo: { src: photo("1774974652548-72dhjfh32l5.jpg"), alt: "Display screen on a stand beside a lectern and a column speaker in a hotel function room", overscan: "104%" },
    },
  ],
};

/**
 * Photo, tag and shape for each case study in homeProof (home.ts), by key.
 * A case study with no entry here is listed as text on the last card:
 * School Summit has none because both of its photos show school pupils.
 */
export const homeNextWorkPhotos: Record<string, { photo: HomePhoto; tag: string; ratio: number }> = {
  "swords-castle": {
    photo: { src: photo("1771873632647-7wm5bfjpgty-optimized.webp"), alt: "Outdoor stage at Swords Castle at dusk with blue beams, an LED screen and a large crowd" },
    tag: "Outdoor LED · production",
    ratio: 1.5,
  },
  "beta-festival": {
    photo: { src: photo("1771936630657-gj2r0d0jd9d-optimized.webp"), alt: "Curved LED video wall showing a burst of coloured hearts in a dark exhibition room" },
    tag: "Curved LED · sound",
    ratio: 0.82,
  },
  prism: {
    photo: { src: photo("1771936631763-mdafs9ziwl-optimized.webp"), alt: "Speaker on a theatre stage in front of a curved LED screen, with the audience in silhouette" },
    tag: "Conference production",
    ratio: 1.333,
  },
  "explore-fingal": {
    photo: { src: photo("1774527236585-9foc4f6xr6r.jpg"), alt: "Hotel ballroom with rows of chairs facing an LED screen showing the Explore Fingal brand launch", position: "60% 55%" },
    tag: "Full production",
    ratio: 0.75,
  },
};

export const homeNextDay = {
  heading: ["From empty room", "to showtime."] as [string, string],
  intro: "Our crew installs and tests everything, operates it during the event and removes it afterwards.",
  steps: [
    {
      label: "Load-in",
      title: "Our own equipment and crew",
      text: "The equipment arrives with the people who will install it and run it.",
      photo: { src: photo("1771873668065-9hbvs4n5ral-optimized.webp"), alt: "Crew in high-visibility vests fitting panels to a large LED wall on a stage", position: "78% 50%" } satisfies HomePhoto,
    },
    {
      label: "Installation",
      title: "Built, then tested",
      text: "Screens, sound, lighting and staging go in and are tested before anyone needs them.",
      photo: { src: photo("1771873676245-o017y4ylh3s-optimized.webp"), alt: "LED wall showing a colour test pattern on a stage in a hotel ballroom", position: "66% 50%" } satisfies HomePhoto,
    },
    {
      label: "Rehearsal",
      title: "Rehearsed before doors",
      text: "On production jobs, rehearsal is part of the day, after load-in and installation.",
      photo: { src: photo("1781179401517-i6l3b01b5cs.png"), alt: "Empty hall with rows of chairs facing a stage lit in deep purple through haze", position: "50% 62%" } satisfies HomePhoto,
    },
    {
      label: "The show",
      title: "Run by the crew who built it",
      text: "We operate everything during the event, with backup equipment on site for critical systems.",
      photo: { src: photo("1774964599261-sn4c7lu4col.jpg"), alt: "Dancers on stage in front of three LED screens under moving lights in a hotel ballroom", position: "50% 0%", overscan: "112%" } satisfies HomePhoto,
    },
  ],
};

export const homeNextBrief = {
  heading: ["Tell us the date, the venue", "and the vision."] as [string, string],
  intro: "We reply within 24 hours with a clear recommendation and one all-inclusive quote. No hidden fees.",
  photo: {
    src: photo("1771936567815-i2kp32gppxi-optimized.webp"),
    alt: "Cathedral nave set for a banquet, its columns lit in purple with a pattern projected on the far window",
  } satisfies HomePhoto,
  // These two lists must match the options in ContactForm.tsx, which the brief pre-fills.
  eventTypes: ["Conference / Corporate", "Concert / Live Music", "Exhibition / Expo", "Awards / Gala Dinner", "Festival / Outdoor", "Theatre / Musical", "Product Launch", "Community / Council Event", "Other"],
  audienceSizes: ["Under 50", "50 - 200", "200 - 500", "500 - 2,000", "2,000+"],
};
