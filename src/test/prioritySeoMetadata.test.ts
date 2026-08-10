import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const repoFile = (filename: string) => fs.readFileSync(path.join(process.cwd(), filename), "utf8");

const priorityPages = [
  {
    path: "/",
    source: "src/pages/Index.tsx",
    title: "EventSound | AV Hire & Event Production Ireland",
    description: "Professional AV hire and event production across Ireland. Sound systems, LED video walls, conference AV, staging and lighting with an experienced technical crew.",
  },
  {
    path: "/services/staging-pipe-drape",
    source: "src/pages/services/StagingPipeDrape.tsx",
    title: "Stage Hire Ireland & Dublin | Indoor & Outdoor Stages",
    description: "Indoor, outdoor and mobile stage hire across Ireland and Dublin. Modular stages, pipe and drape, delivery, installation and safety planning included.",
  },
  {
    path: "/services/av-production",
    source: "src/pages/services/AVProduction.tsx",
    title: "AV Hire Dublin & Ireland | Sound, Screens & Crew",
    description: "AV hire for conferences, corporate events and exhibitions in Dublin and across Ireland. Sound, screens, lighting, setup, operators and technical crew included.",
  },
  {
    path: "/services/lighting-design",
    source: "src/pages/services/LightingDesign.tsx",
    title: "Event Lighting Hire Dublin | Corporate & Stage Lighting",
    description: "Event lighting design and hire for corporate events, conferences, stages and concerts in Dublin and across Ireland. Programming and operator included.",
  },
  {
    path: "/services/event-production",
    source: "src/pages/services/EventProduction.tsx",
    title: "Event Production Company Ireland | Corporate & Live Events",
    description: "Technical event production for conferences, exhibitions, corporate events, festivals and live shows across Ireland. AV, LED, lighting, staging and crew.",
  },
  {
    path: "/services/video-production",
    source: "src/pages/services/VideoProduction.tsx",
    title: "Event Video Production Ireland | Multi-Camera & Streaming",
    description: "Multi-camera event video production, IMAG, recording and live streaming for conferences, concerts and corporate events across Ireland. Crew included.",
  },
  {
    path: "/services/led-video-walls",
    source: "src/pages/v2/LEDVideoWallsV2.tsx",
    title: "LED Video Wall Hire Ireland | Indoor & Outdoor Screens",
    description: "Indoor and outdoor LED video wall hire across Ireland and Dublin for conferences, corporate events, concerts and theatre. Installation and operator included.",
  },
  {
    path: "/services/musical-theatre",
    source: "src/pages/v2/MusicalTheatreV2.tsx",
    title: "Theatre Production Hire Ireland | Sound, Lighting & LED",
    description: "Sound, wireless microphones, lighting, staging and LED video wall hire for musicals, drama and theatre productions across Ireland, with experienced operators.",
  },
];

describe("priority SEO metadata", () => {
  const prerender = repoFile("scripts/prerender.mjs");

  it.each(priorityPages)("keeps $path client and prerender metadata aligned", ({ path: routePath, source, title, description }) => {
    const pageSource = repoFile(source);

    expect(title.length).toBeLessThanOrEqual(60);
    expect(pageSource).toContain(`title: "${title}"`);
    expect(pageSource).toContain(`description: "${description}"`);
    expect(prerender).toContain(`{ path: '${routePath}', title: '${title}', description: '${description}' }`);
  });
});
