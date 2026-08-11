export const CONSENT_STORAGE_KEY = "eventsound_cookie_consent_v1";
export const INTERNAL_TRAFFIC_STORAGE_KEY = "eventsound_internal_traffic";
export const OPEN_CONSENT_SETTINGS_EVENT = "eventsound:open-consent-settings";

export interface ConsentPreferences {
  version: 1;
  analytics: boolean;
  advertising: boolean;
  updatedAt: string;
}

const deniedConsent = (): ConsentPreferences => ({
  version: 1,
  analytics: false,
  advertising: false,
  updatedAt: new Date().toISOString(),
});

export function readConsentPreferences(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;

  try {
    const saved = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!saved) return null;

    const parsed = JSON.parse(saved) as Partial<ConsentPreferences>;
    if (
      parsed.version !== 1
      || typeof parsed.analytics !== "boolean"
      || typeof parsed.advertising !== "boolean"
    ) {
      return null;
    }

    return {
      version: 1,
      analytics: parsed.analytics,
      advertising: parsed.advertising,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
    };
  } catch {
    return null;
  }
}

export function saveConsentPreferences(
  preferences: Pick<ConsentPreferences, "analytics" | "advertising">,
): ConsentPreferences {
  const saved: ConsentPreferences = {
    version: 1,
    analytics: preferences.analytics,
    advertising: preferences.advertising,
    updatedAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(saved));
  } catch {
    // Consent still applies for the current page even when storage is blocked.
  }

  return saved;
}

export function applyConsentPreferences(preferences: ConsentPreferences | null) {
  if (typeof window === "undefined") return;

  const effective = preferences || deniedConsent();
  const analyticsStorage = effective.analytics ? "granted" : "denied";
  const advertisingStorage = effective.advertising ? "granted" : "denied";

  window.gtag?.("consent", "update", {
    ad_storage: advertisingStorage,
    analytics_storage: analyticsStorage,
    ad_user_data: advertisingStorage,
    ad_personalization: advertisingStorage,
  });

  window.clarity?.("consentv2", {
    ad_Storage: advertisingStorage,
    analytics_Storage: analyticsStorage,
  });
}

export function isInternalTraffic(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(INTERNAL_TRAFFIC_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function isAdminPath(pathname = typeof window !== "undefined" ? window.location.pathname : ""): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export function shouldTrackAnalytics(): boolean {
  if (typeof window === "undefined") return false;
  return readConsentPreferences()?.analytics === true && !isAdminPath() && !isInternalTraffic();
}

export function shouldTrackAdvertising(): boolean {
  if (typeof window === "undefined") return false;
  return readConsentPreferences()?.advertising === true && !isAdminPath() && !isInternalTraffic();
}

export function openConsentSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_CONSENT_SETTINGS_EVENT));
}
