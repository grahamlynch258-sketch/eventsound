import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/config/site";
import { quickAnswers } from "@/content/quickAnswers";
import { homeEventTypes, homeFaqs } from "@/content/home";

const read = (rel: string) => fs.readFileSync(path.join(process.cwd(), rel), "utf8");
const walk = (dir: string): string[] =>
  fs.readdirSync(path.join(process.cwd(), dir), { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(`${dir}/${entry.name}`) : [`${dir}/${entry.name}`]);

// Owner decisions of 22 November 2026:
// - EUR 125 per m2 per day is a STARTING price, for dry hire of P3 panels.
// - The largest walls are 100 m2 and more.
// - 3.9 mm is the coarsest panel held (no 4.8 mm or 4.9 mm).
const publicPages = walk("src/pages").filter((f) => f.endsWith(".tsx") && !f.includes("/admin/"));
// scripts/prerender.mjs writes the static descriptions and schema crawlers read.
const sources = [...publicPages, "src/content/quickAnswers.ts", "src/content/home.ts", "public/llms.txt", "scripts/prerender.mjs", "index.html"];

describe("LED facts agree everywhere", () => {
  it("the rate is a starting price for a named panel", () => {
    expect(siteConfig.pricing.ledWallDryHirePerSquareMetrePerDay).toBe(125);
    expect(siteConfig.pricing.ledWallDryHirePanel).toBe("P3");
  });

  it("every sentence that quotes the rate says 'from' and names P3", () => {
    const rate = String(siteConfig.pricing.ledWallDryHirePerSquareMetrePerDay);
    const sentences = [
      quickAnswers.ledVideoWalls.answer,
      quickAnswers.ledVideoWalls.facts.find((f) => f.label === "Dry-hire rate")!.value,
      homeEventTypes.items.find((i) => i.key === "hire")!.text,
      homeFaqs.find((f) => f.question.includes("cost"))!.answer,
      ...read("public/llms.txt").split("\n").filter((line) => line.includes(`€${rate}`)),
      ...read("content/blog/_FACTS.md").replace(/\s+/g, " ").split(/(?<=\))\s|- /).filter((line) => line.includes(`€${rate} per m²`)),
    ];
    expect(sentences.length).toBeGreaterThanOrEqual(6);
    for (const sentence of sentences) {
      expect(sentence, sentence).toMatch(/from|starts|starting/i);
      expect(sentence, sentence).toContain("P3");
    }
  });

  it("city pages and the LED page say the rate is for dry hire of P3 panels", () => {
    const pages = fs.readdirSync(path.join(process.cwd(), "src/pages/locations")).filter((f) => f.endsWith("LedWalls.tsx"))
      .map((f) => `src/pages/locations/${f}`);
    for (const page of [...pages, "src/pages/v2/LEDVideoWallsV2.tsx"]) {
      expect(read(page), page).toMatch(/per square metre per day for dry hire of P3 panels/);
      expect(read(page), page).not.toMatch(/per square metre(?: per day)? for dry hire[.,]/);
    }
  });

  it("no public page publishes a price other than the LED starting rate", () => {
    // Owner decision (16 and 22 November 2026): no prices, ranges or "from"
    // figures anywhere except the LED dry-hire starting rate.
    const rate = String(siteConfig.pricing.ledWallDryHirePerSquareMetrePerDay);
    for (const file of sources) {
      const figures = [...read(file).matchAll(/[€£]\s?([\d][\d,]*)/g)].map((m) => m[1]);
      expect(figures.filter((figure) => figure !== rate), file).toEqual([]);
    }
  });

  it("no public page mentions a 4.8 mm or 4.9 mm panel", () => {
    for (const file of sources) expect(read(file), file).not.toMatch(/4\.[89] ?mm/);
  });

  it("no public page caps LED walls at 50 square metres", () => {
    for (const file of sources) expect(read(file), file).not.toMatch(/50 ?m²|6 to 50 square metres/);
    expect(read("src/pages/v2/LEDVideoWallsV2.tsx")).toContain("100m²");
    expect(quickAnswers.ledVideoWalls.answer).toContain("100 m²");
  });

  it("the LED cost guide presents the rate as a starting price for P3 dry hire", () => {
    const post = read("content/blog/led-wall-hire-cost-ireland.md");
    expect(post).toContain("dry hire starts from €125 per square metre per day");
    expect(post).toMatch(/starting price, for P3 panels/);
    expect(post).not.toMatch(/published dry hire rate is €125/);
    const figures = [...post.matchAll(/€\s?([\d,]+)/g)].map((m) => m[1]);
    expect(new Set(figures)).toEqual(new Set(["125"]));
  });
});
