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

const CONVERSIONS = {
  QUOTE_FORM: {
    id: 'AW-XXXXXXXXXX/XXXXXXXXXXXXXXXXXXXXX', // Replace with actual Conversion ID/Label
  },
  PHONE_CLICK: {
    id: 'AW-XXXXXXXXXX/XXXXXXXXXXXXXXXXXXXXX', // Replace with actual Conversion ID/Label
  },
} as const;

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
