import { schedule } from "@netlify/functions";

// Runs daily at 06:00 UTC. Blog posts and case studies are prerendered at
// build time, so a post scheduled for today only becomes visible to crawlers
// (static HTML, sitemap) after a rebuild. This checks whether anything went
// live in the last 25 hours and, if so, triggers the same build hook as the
// admin Publish button. No content due means no build, so no build minutes.

const WINDOW_HOURS = 25;

async function countGoingLive(supabaseUrl: string, key: string, since: string, now: string) {
  const headers = { apikey: key, Authorization: `Bearer ${key}`, Prefer: "count=exact", Range: "0-0" };
  const window = `published_at=gt.${encodeURIComponent(since)}&published_at=lte.${encodeURIComponent(now)}`;
  const urls = [
    `${supabaseUrl}/rest/v1/blog_posts?select=slug&status=eq.published&${window}`,
    `${supabaseUrl}/rest/v1/case_studies?select=slug&is_published=eq.true&${window}`,
  ];
  let total = 0;
  for (const url of urls) {
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`Supabase ${res.status} for ${url.split("?")[0]}`);
    const range = res.headers.get("content-range") || "*/0";
    total += Number(range.split("/")[1] || 0);
  }
  return total;
}

export const handler = schedule("0 6 * * *", async () => {
  const buildHook = process.env.NETLIFY_BUILD_HOOK;
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!buildHook) {
    console.warn("scheduled-rebuild: NETLIFY_BUILD_HOOK is not set; skipping");
    return { statusCode: 200 };
  }

  const now = new Date();
  const since = new Date(now.getTime() - WINDOW_HOURS * 3600 * 1000);
  let due = 1; // If the check itself fails, rebuild anyway: a wasted build is cheaper than a missed post.
  if (supabaseUrl && key) {
    try {
      due = await countGoingLive(supabaseUrl, key, since.toISOString(), now.toISOString());
    } catch (error) {
      console.error("scheduled-rebuild: content check failed, rebuilding anyway", error);
    }
  }

  if (due === 0) {
    console.log("scheduled-rebuild: nothing went live in the last 25 hours; no build");
    return { statusCode: 200 };
  }

  const res = await fetch(`${buildHook}?trigger_title=${encodeURIComponent("Scheduled rebuild: new content went live")}`, {
    method: "POST",
  });
  console.log(`scheduled-rebuild: ${due} item(s) due; build hook responded ${res.status}`);
  return { statusCode: 200 };
});
