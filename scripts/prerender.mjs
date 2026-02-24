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
];

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

  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();

  for (const route of ROUTES) {
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
