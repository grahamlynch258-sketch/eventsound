import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {
  cityPages,
  homeCoverage,
  homeEventTypes,
  homeFaqs,
  homeIntro,
  homeProcess,
  homeProof,
  servedCities,
} from "@/content/home";
import { HomeCoverage, HomeEventTypes, HomeFaq, HomeIntro, HomeProcess, HomeProof } from "@/components/site/HomeSections";
import { siteConfig } from "@/config/site";

const read = (file: string) => readFileSync(resolve(process.cwd(), file), "utf-8");

const allCopy = [
  homeIntro.heading, ...homeIntro.paragraphs,
  homeEventTypes.heading, homeEventTypes.intro, ...homeEventTypes.items.flatMap((i) => [i.title, i.text]),
  homeProof.heading, homeProof.intro, homeProof.clients, ...homeProof.items.flatMap((i) => [i.title, i.where, i.text]),
  homeCoverage.heading, ...homeCoverage.paragraphs,
  homeProcess.heading, ...homeProcess.steps.flatMap((s) => [s.title, s.text]),
  ...homeFaqs.flatMap((f) => [f.question, f.answer]),
].join("\n");

// The facts file wraps long lines; compare against it with whitespace collapsed.
const facts = read("content/blog/_FACTS.md").replace(/\s+/g, " ");
const sitemapPaths = [...read("public/sitemap.xml").matchAll(/<loc>https:\/\/eventsound\.ie([^<]*)<\/loc>/g)].map((m) => m[1]);

describe("homepage copy", () => {
  it("publishes no price except the LED dry-hire rate from site config", () => {
    const rate = `€${siteConfig.pricing.ledWallDryHirePerSquareMetrePerDay} per m² per day`;
    const figures = allCopy.match(/[€£$]\s?\d[\d,.]*/g) ?? [];
    expect(figures.length).toBeGreaterThan(0);
    for (const figure of figures) expect(figure).toBe(`€${siteConfig.pricing.ledWallDryHirePerSquareMetrePerDay}`);
    expect(allCopy).toContain(rate);
    expect(allCopy).not.toMatch(/\bfrom (around|about|just)\b|few hundred|starting at/i);
  });

  it("names no staff or performers and no hype words", () => {
    expect(allCopy).not.toMatch(/\b(Ronan|Mark|Graham|Nathan Carter)\b/);
    expect(allCopy).not.toMatch(/cutting-edge|seamless|unforgettable|state-of-the-art|world-class/i);
    expect(allCopy).not.toMatch(/\bISO\b|award-winning/i);
  });

  it("only names cities, clients and events that are in the facts file", () => {
    for (const city of servedCities) expect(facts, city).toContain(city);
    for (const client of ["Fingal County Council", "Louth County Council", "Local Enterprise Office Louth", "Škoda Ireland"]) {
      expect(facts, client).toContain(client);
      expect(homeProof.clients).toContain(client);
    }
    for (const event of ["Swords Castle Summer Concerts", "Beta Festival", "School Summit", "PRISM Immersive Technology Summit", "Explore Fingal launch"]) {
      expect(facts, event).toContain(event);
    }
    expect(homeProof.items.map((i) => i.title)).toEqual([
      "Swords Castle Summer Concerts", "Beta Festival", "School Summit", "PRISM Immersive Technology Summit", "Explore Fingal launch",
    ]);
    expect(facts).toContain("8,000+ attendees per night");
    expect(facts).toContain("Site visits are free for confirmed bookings");
    expect(facts).toContain(siteConfig.companyExperienceYears);
  });

  it("mentions the name people search for, Event Sound, in running text", () => {
    expect(homeIntro.paragraphs.join(" ")).toContain("Event Sound");
    expect(homeFaqs.some((f) => f.question.includes("Event Sound"))).toBe(true);
  });

  it("links only to pages that exist", () => {
    const internal = [
      ...homeIntro.links.map((l) => l.href),
      ...homeEventTypes.items.map((i) => i.href),
      ...cityPages.flatMap((c) => [`/services/led-walls/${c.toLowerCase()}/`, `/services/conference-av/${c.toLowerCase()}/`]),
      "/case-studies/", "/faq/",
    ];
    for (const href of internal) expect(sitemapPaths, href).toContain(href);
    // Case studies are added to the sitemap at build time from the CMS, so
    // only their shape can be checked here.
    for (const item of homeProof.items) expect(item.href).toMatch(/^\/case-studies\/[a-z0-9-]+\/$/);
  });

  it("is long enough to lift the homepage past 700 words and adds six H2 sections", () => {
    expect(allCopy.split(/\s+/).filter(Boolean).length).toBeGreaterThanOrEqual(480);
    expect(homeFaqs.length).toBeGreaterThanOrEqual(3);
    expect(homeFaqs.length).toBeLessThanOrEqual(6);
  });

  it("renders every section with its heading and links", () => {
    render(
      <MemoryRouter>
        <HomeIntro /><HomeEventTypes /><HomeProof /><HomeCoverage /><HomeProcess /><HomeFaq />
      </MemoryRouter>,
    );
    const h2s = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    expect(h2s).toEqual([
      homeIntro.heading, homeEventTypes.heading, homeProof.heading, homeCoverage.heading, homeProcess.heading,
      "Questions we are asked most",
    ]);
    expect(screen.getByRole("link", { name: /Swords Castle Summer Concerts/ })).toHaveAttribute(
      "href", "/case-studies/swords-castle-summer-concerts/",
    );
    expect(screen.getAllByRole("link", { name: "Dublin" }).map((a) => a.getAttribute("href"))).toEqual([
      "/services/led-walls/dublin/", "/services/conference-av/dublin/",
    ]);
    for (const faq of homeFaqs) expect(screen.getByText(faq.question)).toBeInTheDocument();
  });

  it("the closing call to action links straight to the canonical URLs (no redirect hop)", () => {
    const cta = read("src/components/site/CTASection.tsx");
    expect(cta).toContain('primaryHref = "/contact/"');
    expect(cta).toContain('secondaryHref = "/services/"');
  });

  it("the homepage publishes its FAQ as schema", () => {
    const page = read("src/pages/Index.tsx");
    expect(page).toContain('generateFAQSchema({ questions: homeFaqs })');
    expect(page).toContain('schemaId: "faq-schema"');
  });
});
