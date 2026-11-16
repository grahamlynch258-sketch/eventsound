import { siteConfig } from "@/config/site";

// Answer-first content for the five main service pages (see QuickAnswer.tsx).
//
// Rules, agreed with the owner in November 2026:
// - Every statement must already be true of the service: it comes from
//   content/blog/_FACTS.md or from the page's own copy and FAQs. Never add a
//   venue, client, number or piece of kit that is not in one of those.
// - No prices or price examples. The single exception is the LED dry-hire
//   rate, which is read from siteConfig so it cannot drift.
// - The answer is one short paragraph (40 to 70 words) that stands on its own.

export interface QuickAnswerContent {
  key: string;
  question: string;
  answer: string;
  tableCaption: string;
  facts: Array<{ label: string; value: string }>;
}

const ledRate = `€${siteConfig.pricing.ledWallDryHirePerSquareMetrePerDay}`;
const coverage = "Dublin, Cork, Galway, Belfast, Limerick, Athlone and venues nationwide";

export const quickAnswers = {
  ledVideoWalls: {
    key: "led-video-walls",
    question: "How does LED video wall hire work, and what does it cost?",
    answer: `EventSound hires modular LED video walls for conferences, concerts, festivals and corporate events across Ireland, from 6 m² conference screens to outdoor stage screens of 50 m² and larger. Dry hire starts from ${ledRate} per square metre per day. Operated hire, with delivery, installation, a dedicated operator and breakdown, is quoted per event.`,
    tableCaption: "LED video wall hire at a glance",
    facts: [
      { label: "Dry-hire rate", value: `From ${ledRate} per square metre per day` },
      { label: "Operated hire", value: "Delivery, installation, content playback, an on-site operator and breakdown included; quoted per event" },
      { label: "Screen sizes", value: "From 6 m² for a conference stage to 50 m² and larger for outdoor stages, built to the venue" },
      { label: "Pixel pitch", value: "1.9 mm to 4.8 mm; 2.6 mm or 3.9 mm suits most conferences" },
      { label: "Indoor and outdoor", value: "Indoor panels, and weather-rated high-brightness panels for outdoor events" },
      { label: "Builds", value: "Flat, curved and custom shapes, freestanding on ground support or rigged with the stage" },
      { label: "Panels", value: "Unilumin and Absen" },
      { label: "Coverage", value: coverage },
    ],
  },
  avHire: {
    key: "av-hire",
    question: "What does AV hire from EventSound include?",
    answer: "EventSound supplies and operates AV equipment for conferences, corporate events, exhibitions and live shows in Dublin and across Ireland. You can hire a single screen or microphone, or a complete package of sound, screens, lighting and staging. Every hire includes delivery, installation, an on-site technician and collection after the event.",
    tableCaption: "AV hire at a glance",
    facts: [
      { label: "What you can hire", value: "Single items or a complete AV package specified for the venue and audience" },
      { label: "Included in every hire", value: "Delivery, installation, an on-site technician and collection" },
      { label: "Sound", value: "PA systems, digital mixing, and wireless handheld, lapel and headset microphones (Shure, Sennheiser)" },
      { label: "Screens", value: "LED video walls, flat screens from 55 to 86 inches, projectors and confidence monitors" },
      { label: "Lighting and staging", value: "Chamsys-controlled lighting, TUV-certified staging, pipe and drape" },
      { label: "Recording and streaming", value: "Multi-camera production with streaming to Zoom, Teams, YouTube and Vimeo" },
      { label: "When to book", value: "2 to 4 weeks ahead for standard corporate events; 4 to 8 weeks for large productions and September to December" },
      { label: "Pricing", value: "One all-inclusive quote per event, based on the equipment, duration and venue" },
    ],
  },
  conferenceAv: {
    key: "conference-av",
    question: "What does conference AV hire include?",
    answer: "EventSound plans and operates conference AV across Ireland as one production: PA and wireless microphones, an LED wall or projection, confidence monitors, stage lighting and technical crew. We cover single-room meetings, multi-room conferences with breakout sessions, and hybrid events with live streaming. Pricing is quoted per event from your venue, delegate numbers and running order.",
    tableCaption: "Conference AV hire at a glance",
    facts: [
      { label: "Typical setup", value: "PA with wireless microphones, an LED screen or projector, confidence monitors, stage lighting and a dedicated technician" },
      { label: "Multi-room conferences", value: "Each room gets its own PA, display and technician, with content managed centrally" },
      { label: "Hybrid and streaming", value: "Multi-camera switching and branded graphics, streamed to Zoom, Teams, YouTube or Vimeo" },
      { label: "Crew", value: "On-site technicians run slides, video playback and camera switching throughout" },
      { label: "When to book", value: "4 to 6 weeks ahead for 200 or more delegates; smaller meetings in 1 to 2 weeks; September to November is peak season" },
      { label: "What we need to quote", value: "The venue, delegate numbers and running order" },
      { label: "Recent conference work", value: "PRISM Immersive Technology Summit, School Summit careers exhibitions and Local Enterprise Week" },
      { label: "Coverage", value: coverage },
    ],
  },
  lighting: {
    key: "event-lighting",
    question: "What does event lighting hire include?",
    answer: "EventSound designs and hires lighting for conferences, corporate events, gala dinners, concerts and outdoor stages in Dublin and across Ireland. Every hire includes a lighting technician who programmes and operates the rig, and larger productions get a dedicated lighting designer. Fixtures run on Chamsys control and can be matched to your brand colours.",
    tableCaption: "Event lighting hire at a glance",
    facts: [
      { label: "Fixtures", value: "Moving heads, LED wash and uplighting, follow spots, pin spots, gobo projection and architectural lighting" },
      { label: "Control", value: "Chamsys MagicQ, programmed and tested before the event day" },
      { label: "Crew", value: "A lighting technician with every hire; a dedicated lighting designer for larger productions" },
      { label: "Setup time", value: "Typically 4 to 8 hours before a standard corporate or conference event; festival stages and complex shows can need a full day" },
      { label: "Outdoor events", value: "Weatherproof fixtures with suitable power distribution" },
      { label: "Brand colours", value: "LED fixtures can be programmed to any colour" },
      { label: "Pricing", value: "Quoted per event; the quote sets out the design, fixtures, programming, control and operator" },
      { label: "Coverage", value: "Dublin and venues across Ireland" },
    ],
  },
  staging: {
    key: "stage-hire",
    question: "What stage sizes can I hire, and what is included?",
    answer: "EventSound hires modular stages for conferences, awards, concerts and outdoor events across Ireland, from 3 m x 2 m presentation platforms to 12 m x 10 m concert stages, built to custom sizes. All staging is TUV-certified and installed by trained crew, with skirting, steps and safety rails. Pipe and drape and star cloth are also available.",
    tableCaption: "Stage hire at a glance",
    facts: [
      { label: "Stage sizes", value: "3 m x 2 m presentation platforms up to 12 m x 10 m concert stages, in custom shapes" },
      { label: "Certification", value: "TUV-certified, European-manufactured modular staging" },
      { label: "Indoor and outdoor", value: "Adjustable legs for grass, gravel and slopes; safety rails and weatherproof decking outdoors" },
      { label: "Setup time", value: "About 2 to 3 hours for a 6 m x 4 m indoor stage; larger outdoor stages with roofing can need a full day" },
      { label: "Safety", value: "Front-of-stage and crowd barriers, cable ramps and safety rails available" },
      { label: "Pipe and drape", value: "Black, white and grey drape for backdrops and room division; star cloth backdrops" },
      { label: "Pricing", value: "Quoted per event from your venue and requirements" },
      { label: "Coverage", value: "Dublin and venues across Ireland" },
    ],
  },
} satisfies Record<string, QuickAnswerContent>;
