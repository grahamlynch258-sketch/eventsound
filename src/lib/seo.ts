import { siteConfig } from "@/config/site";

export function canonicalUrlForPath(pathOrUrl: string): string {
  const url = pathOrUrl.startsWith("http")
    ? new URL(pathOrUrl)
    : new URL(pathOrUrl || "/", siteConfig.canonicalBase);

  url.protocol = "https:";
  url.host = new URL(siteConfig.canonicalBase).host;
  url.search = "";
  url.hash = "";

  if (!url.pathname.endsWith("/")) {
    url.pathname += "/";
  }

  return url.toString();
}
