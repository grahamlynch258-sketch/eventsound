import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { quickAnswers } from "@/content/quickAnswers";
import { siteConfig } from "@/config/site";

const read = (rel: string) => fs.readFileSync(path.join(process.cwd(), rel), "utf8");
const entries = Object.values(quickAnswers);
const allText = (entry: (typeof entries)[number]) =>
  [entry.question, entry.answer, ...entry.facts.flatMap((fact) => [fact.label, fact.value])].join(" ");

describe("answer-first blocks on the main service pages", () => {
  it("covers the eight service pages, each rendered once", () => {
    const pages: Record<string, string> = {
      ledVideoWalls: "src/pages/v2/LEDVideoWallsV2.tsx",
      avHire: "src/pages/services/AVProduction.tsx",
      conferenceAv: "src/pages/services/ConferenceAvHire.tsx",
      lighting: "src/pages/services/LightingDesign.tsx",
      staging: "src/pages/services/StagingPipeDrape.tsx",
      soundHire: "src/pages/services/AudioSystems.tsx",
      eventProduction: "src/pages/services/EventProduction.tsx",
      ledScreenHire: "src/pages/v2/LEDScreenHireV2.tsx",
    };
    expect(Object.keys(quickAnswers).sort()).toEqual(Object.keys(pages).sort());
    for (const [key, file] of Object.entries(pages)) {
      expect(read(file).split(`<QuickAnswer content={quickAnswers.${key}}`).length - 1).toBe(1);
    }
  });

  it("gives a self-contained answer of 40 to 70 words under a question heading", () => {
    for (const entry of entries) {
      const words = entry.answer.trim().split(/\s+/).length;
      expect(words, entry.key).toBeGreaterThanOrEqual(40);
      expect(words, entry.key).toBeLessThanOrEqual(70);
      expect(entry.question.endsWith("?"), entry.key).toBe(true);
      expect(entry.answer.startsWith("EventSound"), entry.key).toBe(true);
      expect(entry.facts.length, entry.key).toBeGreaterThanOrEqual(6);
    }
  });

  it("publishes no price except the LED dry-hire rate from site config", () => {
    const rate = String(siteConfig.pricing.ledWallDryHirePerSquareMetrePerDay);
    for (const entry of entries) {
      const text = allText(entry);
      expect(text, entry.key).not.toMatch(/\u00a3/);
      const euroFigures = [...text.matchAll(/\u20ac\s?([\d,]+)/g)].map((match) => match[1]);
      if (entry.key === "led-video-walls") {
        expect(euroFigures.length).toBeGreaterThan(0);
        expect(new Set(euroFigures)).toEqual(new Set([rate]));
      } else {
        expect(euroFigures, entry.key).toEqual([]);
      }
    }
  });

  it("keeps vague price examples off the service pages", () => {
    for (const file of fs.readdirSync(path.join(process.cwd(), "src/pages/services"))) {
      expect(read(`src/pages/services/${file}`), file).not.toMatch(/few hundred euro|from around \u20ac/i);
    }
  });
});
