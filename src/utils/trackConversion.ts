/**
 * Google Ads conversion tracking utility.
 *
 * SETUP: Replace the placeholder values below with your actual
 * Google Ads Conversion IDs and Labels from:
 * Google Ads → Goals → Conversions → New conversion action
 *
 * You need TWO conversion actions:
 * 1. "Quote Form Submission" — Website conversion
 * 2. "Phone Call Click" — Website conversion
 *
 * The combined format for send_to is: AW-XXXXXXXXXX/XXXXXXXXXXXXXXXXXXXXX
 */

import { shouldTrackAdvertising, shouldTrackAnalytics } from "@/lib/consent";

const CONVERSIONS = {
  QUOTE_FORM: {
    id: 'AW-1014417298/u4o1CJXNg5UcEJKP2-MD',
  },
  PHONE_CLICK: {
    id: 'AW-1014417298/jzB-CL64kpUcEJKP2-MD',
  },
} as const;

export function trackEvent(name: string, parameters: Record<string, string | number | boolean> = {}) {
  try {
    if (!shouldTrackAnalytics()) return;

    if (typeof window.gtag === "function") {
      window.gtag("event", name, parameters);
    }

    if (typeof window.clarity === "function") {
      Object.entries(parameters).forEach(([key, value]) => {
        window.clarity?.("set", key, String(value).slice(0, 255));
      });
      window.clarity("event", name);
    }
  } catch {
    // Analytics must never interrupt the visitor journey.
  }
}

/**
 * Fire a Google Ads conversion event.
 * Safe to call even if gtag hasn't loaded yet (fails silently).
 */
export function trackConversion(
  type: keyof typeof CONVERSIONS,
  options?: {
    value?: number;
    currency?: string;
    callback?: () => void;
  }
) {
  try {
    if (!shouldTrackAdvertising()) {
      options?.callback?.();
      return;
    }

    if (typeof window.gtag !== 'function') {
      options?.callback?.();
      return;
    }

    window.gtag('event', 'conversion', {
      send_to: CONVERSIONS[type].id,
      value: options?.value,
      currency: options?.currency || 'EUR',
      event_callback: options?.callback,
    });

    // Safety timeout — don't let tracking block the user action
    if (options?.callback) {
      setTimeout(options.callback, 1000);
    }
  } catch {
    options?.callback?.();
  }
}
