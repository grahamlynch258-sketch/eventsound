import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * One page owns each head term (Search Console, 22 Nov 2026: Google was
 * splitting "AV hire" and "event production services" across four pages).
 *  - The services index must not use those head terms in its title.
 *  - /services/av-production/ is the AV hire page and is always linked as "AV hire".
 */
const read = (file: string) => fs.readFileSync(path.join(process.cwd(), file), "utf8");

const walk = (dir: string): string[] =>
  fs.readdirSync(path.join(process.cwd(), dir), { withFileTypes: true }).flatMap((entry) => {
    const rel = `${dir}/${entry.name}`;
    if (entry.isDirectory()) return entry.name === "admin" || entry.name === "test" ? [] : walk(rel);
    return /\.(tsx?|mjs)$/.test(entry.name) ? [rel] : [];
  });

describe("page ownership", () => {
  it("keeps the head terms out of the services index title", () => {
    const sources = [read("src/pages/Services.tsx"), read("scripts/prerender.mjs")];
    const titles = [
      sources[0].match(/useSeo\(\{\s*title: "([^"]+)"/)?.[1],
      sources[1].match(/path: '\/services', title: '([^']+)'/)?.[1],
    ];
    for (const title of titles) {
      expect(title).toBeTruthy();
      expect(title).not.toMatch(/event production services/i);
      expect(title).not.toMatch(/av hire/i);
    }
    expect(titles[0]).toBe(titles[1]);
  });

  it("always links the AV hire page as AV hire, never as AV production", () => {
    const offenders: string[] = [];
    for (const file of [...walk("src"), "scripts/prerender.mjs"]) {
      const text = read(file);
      const patterns = [
        /to="\/services\/av-production\/"[^>]*>\s*([^<]*AV Production[^<]*)</gi,
        /(?:label|title|name): "(AV Production[^"]*)"[^\n]*services\/av-production/gi,
      ];
      for (const pattern of patterns) {
        for (const match of text.matchAll(pattern)) offenders.push(`${file}: ${match[1]}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("gives the two service pages distinct names in the main menu", () => {
    const header = read("src/components/site/SiteHeader.tsx");
    expect(header).toContain('{ to: "/services/av-production/", label: "AV Hire"');
    expect(header).toContain('{ to: "/services/event-production/", label: "Event Production"');
  });
});
