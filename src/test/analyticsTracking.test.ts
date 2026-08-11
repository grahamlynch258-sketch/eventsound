import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  INTERNAL_TRAFFIC_STORAGE_KEY,
  saveConsentPreferences,
} from "@/lib/consent";
import { trackConversion, trackEvent } from "@/utils/trackConversion";

describe("privacy-safe analytics events", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.replaceState({}, "", "/contact/");
    window.gtag = vi.fn();
    window.clarity = vi.fn();
  });

  it("sends the same funnel event to Google and Clarity with filterable tags", () => {
    saveConsentPreferences({ analytics: true, advertising: false });
    trackEvent("quote_form_step_complete", {
      form_context: "Conference AV",
      step: 2,
    });

    expect(window.gtag).toHaveBeenCalledWith("event", "quote_form_step_complete", {
      form_context: "Conference AV",
      step: 2,
    });
    expect(window.clarity).toHaveBeenCalledWith("set", "form_context", "Conference AV");
    expect(window.clarity).toHaveBeenCalledWith("set", "step", "2");
    expect(window.clarity).toHaveBeenCalledWith("event", "quote_form_step_complete");
  });

  it("does not emit funnel events before analytics consent", () => {
    trackEvent("quote_form_start", { form_context: "General enquiry" });
    expect(window.gtag).not.toHaveBeenCalled();
    expect(window.clarity).not.toHaveBeenCalled();
  });

  it("requires the separate advertising choice for Google Ads conversions", () => {
    const callback = vi.fn();
    saveConsentPreferences({ analytics: true, advertising: false });
    trackConversion("QUOTE_FORM", { callback });
    expect(window.gtag).not.toHaveBeenCalled();
    expect(callback).toHaveBeenCalledOnce();

    saveConsentPreferences({ analytics: true, advertising: true });
    trackConversion("QUOTE_FORM");
    expect(window.gtag).toHaveBeenCalledWith("event", "conversion", {
      send_to: "AW-1014417298/u4o1CJXNg5UcEJKP2-MD",
      value: undefined,
      currency: "EUR",
      event_callback: undefined,
    });
  });

  it("does not emit events for internal traffic or admin routes", () => {
    saveConsentPreferences({ analytics: true, advertising: false });
    window.localStorage.setItem(INTERNAL_TRAFFIC_STORAGE_KEY, "true");
    trackEvent("quote_form_start", { form_context: "Internal test" });
    expect(window.gtag).not.toHaveBeenCalled();
    expect(window.clarity).not.toHaveBeenCalled();

    window.localStorage.removeItem(INTERNAL_TRAFFIC_STORAGE_KEY);
    window.history.replaceState({}, "", "/admin/");
    trackEvent("route_view", { page_type: "admin" });
    expect(window.gtag).not.toHaveBeenCalled();
    expect(window.clarity).not.toHaveBeenCalled();
  });
});
