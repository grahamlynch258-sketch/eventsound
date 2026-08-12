import { beforeEach, describe, expect, it, vi } from "vitest";
import { INTERNAL_TRAFFIC_STORAGE_KEY } from "@/lib/analytics";
import { trackConversion, trackEvent } from "@/utils/trackConversion";

describe("privacy-safe analytics events", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.replaceState({}, "", "/contact/");
    window.gtag = vi.fn();
    window.clarity = vi.fn();
  });

  it("sends the same funnel event to Google and Clarity with filterable tags", () => {
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

  it("sends Google Ads conversions for eligible public traffic", () => {
    trackConversion("QUOTE_FORM");
    expect(window.gtag).toHaveBeenCalledWith("event", "conversion", {
      send_to: "AW-1014417298/u4o1CJXNg5UcEJKP2-MD",
      value: undefined,
      currency: "EUR",
      event_callback: undefined,
    });
  });

  it("does not emit events for internal traffic or admin routes", () => {
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
