import puppeteer from "puppeteer";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";
import { createServer } from "vite";

const ROUTES = [
  "/",
  "/services",
  "/about",
  "/contact",
  "/gallery",
  "/reviews",
  "/faq",
  "/health-and-safety",
  "/case-studies",
  "/av-production",
  "/services/led-video-walls",
  "/services/av-production",
  "/services/lighting-design",
  "/services/staging-pipe-drape",
  "/services/event-production",
  "/services/video-production",
  "/services/virtual-events",
];

// Fetch published case study slugs from Supabase for prerendering
async function getCaseStudySlugs() {
  try {
    const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      console.log('No Supabase credentials — skipping case study prerender');
      return [];
    }

    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/case_studies?select=slug&is_published=eq.true&noindex=eq.false`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );

    if (!res.ok) {
      console.log('Failed to fetch case studies:', res.status);
      return [];
    }

    const data = await res.json();
    return data.map(row => `/case-studies/${row.slug}`);
  } catch (err) {
    console.log('Error fetching case studies for prerender:', err.message);
    return [];
  }
}

async function prerender() {
  console.log("Starting prerender...");

  // Serve the built dist folder
  const { createServer: createHttpServer } = await import("http");
  const { readFileSync } = await import("fs");
  const { join, extname } = await import("path");

  const distDir = resolve("dist");
  const mimeTypes = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
  };

  const server = createHttpServer((req, res) => {
    let filePath = join(distDir, req.url === "/" ? "index.html" : req.url);
    if (!extname(filePath)) filePath = join(distDir, "index.html");
    if (!existsSync(filePath)) filePath = join(distDir, "index.html");

    try {
      const content = readFileSync(filePath);
      const ext = extname(filePath);
      res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
      res.end(content);
    } catch {
      const fallback = readFileSync(join(distDir, "index.html"));
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(fallback);
    }
  });

  await new Promise((r) => server.listen(4173, r));
  console.log("Preview server running on http://localhost:4173");

  const caseStudyRoutes = await getCaseStudySlugs();
  const allRoutes = [...ROUTES, ...caseStudyRoutes];
  if (caseStudyRoutes.length > 0) {
    console.log(`Found ${caseStudyRoutes.length} case study route(s) to prerender:`, caseStudyRoutes);
  }

  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();

  for (const route of allRoutes) {
    const url = `http://localhost:4173${route}`;
    console.log(`Prerendering ${route}...`);

    try {
      await page.goto(url, { waitUntil: "networkidle0", timeout: 15000 });
      // Wait a bit for React to render
      await page.waitForSelector("main", { timeout: 5000 }).catch(() => {});

      const html = await page.content();

      // Write to dist/[route]/index.html
      const outDir = route === "/" ? distDir : resolve(distDir, route.slice(1));
      if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

      const outFile = route === "/" ? resolve(distDir, "index.html") : resolve(outDir, "index.html");
      writeFileSync(outFile, html);
      console.log(`  ✓ Wrote ${outFile}`);
    } catch (err) {
      console.error(`  ✗ Failed ${route}: ${err.message}`);
    }
  }

  await browser.close();
  server.close();
  console.log("Prerender complete!");
}

prerender().catch(console.error);
