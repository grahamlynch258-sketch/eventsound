import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("analytics bootstrap", () => {
  const html = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf8");

  it("sets denied consent before loading vendor scripts", () => {
    const consentIndex = html.indexOf('window.gtag("consent", "default"');
    const googleIndex = html.indexOf("www.googletagmanager.com/gtag/js");
    const clarityIndex = html.indexOf("www.clarity.ms/tag/");

    expect(consentIndex).toBeGreaterThan(-1);
    expect(consentIndex).toBeLessThan(googleIndex);
    expect(consentIndex).toBeLessThan(clarityIndex);
    expect(html).toContain('analytics_storage: "denied"');
    expect(html).toContain('ad_storage: "denied"');
  });

  it("limits external analytics to production public traffic", () => {
    expect(html).toContain('window.location.hostname === "eventsound.ie"');
    expect(html).toContain('window.location.pathname.indexOf("/admin/") === 0');
    expect(html).toContain("eventsound_internal_traffic");
  });
});
