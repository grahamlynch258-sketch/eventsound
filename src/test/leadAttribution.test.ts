import { beforeEach, describe, expect, it, vi } from "vitest";
import { captureLeadAttribution } from "@/lib/leadAttribution";
import { CONSENT_STORAGE_KEY } from "@/lib/consent";

describe("lead attribution", () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({
      version: 1,
      analytics: true,
      advertising: false,
      updatedAt: "2026-08-07T09:00:00.000Z",
    }));
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

  it("does not store or attach campaign attribution without measurement consent", () => {
    localStorage.removeItem(CONSENT_STORAGE_KEY);

    const attribution = captureLeadAttribution();

    expect(attribution.utm_source).toBe("");
    expect(attribution.gclid).toBe("");
    expect(sessionStorage.getItem("eventsound_first_touch")).toBeNull();
  });
});
