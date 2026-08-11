import { beforeEach, describe, expect, it, vi } from "vitest";
import { captureLeadAttribution } from "@/lib/leadAttribution";

describe("lead attribution", () => {
  beforeEach(() => {
    sessionStorage.clear();
    window.history.replaceState({}, "", "/?utm_source=google&utm_medium=cpc&utm_campaign=conference&gclid=test-click");
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-07T10:00:00.000Z"));
  });

  it("retains first-touch campaign data when a visitor moves to the contact page", () => {
    const first = captureLeadAttribution();

    expect(first.utm_source).toBe("google");
    expect(first.utm_campaign).toBe("conference");
    expect(first.gclid).toBe("test-click");
    expect(first.first_landing_page).toContain("utm_source=google");

    window.history.pushState({}, "", "/contact/");
    const contact = captureLeadAttribution();

    expect(contact.landing_page).toMatch(/\/contact\/$/);
    expect(contact.utm_source).toBe("google");
    expect(contact.utm_medium).toBe("cpc");
    expect(contact.first_touch_at).toBe("2026-08-07T10:00:00.000Z");
  });
});
