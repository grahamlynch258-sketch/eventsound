import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("analytics bootstrap", () => {
  const html = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf8");

  it("loads Google and Clarity for eligible production traffic", () => {
    expect(html).toContain("www.googletagmanager.com/gtag/js");
    expect(html).toContain("www.clarity.ms/tag/");
    expect(html).toContain('window.gtag("config", "AW-1014417298")');
    expect(html).not.toContain('window.gtag("consent"');
  });

  it("limits external analytics to production public traffic", () => {
    expect(html).toContain('window.location.hostname === "eventsound.ie"');
    expect(html).toContain('window.location.pathname.indexOf("/admin/") === 0');
    expect(html).toContain("eventsound_internal_traffic");
  });
});
