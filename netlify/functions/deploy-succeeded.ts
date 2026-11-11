import type { Handler } from "@netlify/functions";

// Netlify calls a function named "deploy-succeeded" after every successful
// deploy. For production deploys only, submit the sitemap URLs to IndexNow
// (Bing, Yandex, Seznam, Naver share submissions). Bing's index feeds ChatGPT
// search and Copilot, so new pages reach AI answers faster.
//
// The key is public by design: it must be served at /<key>.txt.
const INDEXNOW_KEY = "eb0d88e4a3b40184ab22673270edf14f";
const HOST = "eventsound.ie";

export const handler: Handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const deploy = body.payload ?? {};
    if (deploy.context !== "production") {
      return { statusCode: 200, body: `Skipped IndexNow for ${deploy.context ?? "unknown"} deploy` };
    }

    const sitemapRes = await fetch(`https://${HOST}/sitemap.xml`);
    if (!sitemapRes.ok) throw new Error(`sitemap returned ${sitemapRes.status}`);
    const xml = await sitemapRes.text();
    const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
    if (!urlList.length) return { statusCode: 200, body: "No sitemap URLs found" };

    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    });
    console.log(`IndexNow: submitted ${urlList.length} URLs, response ${res.status}`);
    return { statusCode: 200, body: `IndexNow ${res.status}` };
  } catch (error) {
    // Never fail loudly: this is a best-effort notification.
    console.error("IndexNow submission failed", error);
    return { statusCode: 200, body: "IndexNow submission failed" };
  }
};
