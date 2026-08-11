export interface LeadAttribution {
  landing_page: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  gclid: string;
  msclkid: string;
  first_landing_page: string;
  first_referrer: string;
  first_touch_at: string;
}
type Touchpoint = Omit<LeadAttribution, "first_landing_page" | "first_referrer" | "first_touch_at"> & {
  captured_at: string;
};

const STORAGE_KEY = "eventsound_first_touch";

const emptyAttribution: LeadAttribution = {
  landing_page: "",
  referrer: "",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
  gclid: "",
  msclkid: "",
  first_landing_page: "",
  first_referrer: "",
  first_touch_at: "",
};

function readCurrentTouchpoint(): Touchpoint {
  const params = new URLSearchParams(window.location.search);

  return {
    landing_page: window.location.href,
    referrer: document.referrer || "",
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
    gclid: params.get("gclid") || "",
    msclkid: params.get("msclkid") || "",
    captured_at: new Date().toISOString(),
  };
}

function readStoredTouchpoint(): Touchpoint | null {
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) as Touchpoint : null;
  } catch {
    return null;
  }
}

export function captureLeadAttribution(): LeadAttribution {
  if (typeof window === "undefined") return emptyAttribution;

  const current = readCurrentTouchpoint();
  let first = readStoredTouchpoint();

  if (!first) {
    first = current;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(first));
    } catch {
      // Attribution must never prevent the enquiry form from working.
    }
  }

  return {
    landing_page: current.landing_page,
    referrer: current.referrer || first.referrer,
    utm_source: current.utm_source || first.utm_source,
    utm_medium: current.utm_medium || first.utm_medium,
    utm_campaign: current.utm_campaign || first.utm_campaign,
    utm_content: current.utm_content || first.utm_content,
    utm_term: current.utm_term || first.utm_term,
    gclid: current.gclid || first.gclid,
    msclkid: current.msclkid || first.msclkid,
    first_landing_page: first.landing_page,
    first_referrer: first.referrer,
    first_touch_at: first.captured_at,
  };
}
