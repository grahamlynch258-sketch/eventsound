export const INTERNAL_TRAFFIC_STORAGE_KEY = "eventsound_internal_traffic";

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
  return !isAdminPath() && !isInternalTraffic();
}
