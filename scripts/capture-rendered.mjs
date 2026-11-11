// Captures every prerendered route fully rendered in headless Chromium, so
// the static HTML that crawlers receive matches what a visitor sees.
//
// Called at the end of scripts/prerender.mjs. Everything here is best-effort:
// if the browser cannot start (or a page fails its sanity checks) the caller
// keeps the hand-built static shell for that route and the build still passes.

import http from 'http';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Third-party hosts that must not run during capture (analytics, captcha).
const BLOCKED_HOSTS = /clarity\.ms|googletagmanager\.com|google-analytics\.com|doubleclick\.net|googleadservices\.com|challenges\.cloudflare\.com|connect\.facebook\.net/;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml',
};

function startStaticServer(distDir) {
  const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const resolved = path.normalize(path.join(distDir, pathname));
    if (!resolved.startsWith(distDir)) { res.writeHead(403).end(); return; }
    const candidates = [resolved, path.join(resolved, 'index.html'), path.join(distDir, 'spa.html')];
    const file = candidates.find(f => fs.existsSync(f) && fs.statSync(f).isFile());
    if (!file) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(server)));
}

async function launchBrowser() {
  const { default: puppeteer } = await import('puppeteer');
  const options = { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] };
  try {
    return await puppeteer.launch(options);
  } catch (err) {
    if (!/Could not find Chrome|Browser was not found/i.test(err.message)) throw err;
    console.log('  Browser binary missing; downloading it once…');
    execSync('npx puppeteer browsers install chrome', { stdio: 'ignore', timeout: 240000 });
    return puppeteer.launch(options);
  }
}

// Runs in the page: scroll the whole page so in-view animations finish and
// lazy content loads, then return to the top.
async function scrollThrough() {
  const pause = (ms) => new Promise(r => setTimeout(r, ms));
  const step = Math.max(300, Math.floor(window.innerHeight * 0.8));
  for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await pause(120);
  }
  window.scrollTo(0, document.documentElement.scrollHeight);
  await pause(700);
  window.scrollTo(0, 0);
  await pause(300);
}

// Runs in the page: return the rendered #root as static HTML.
function extractSnapshot() {
  const root = document.getElementById('root');
  const clone = root.cloneNode(true);

  // Things that must not be frozen into static HTML.
  clone.querySelectorAll('[data-prerender-skip], iframe, script').forEach(node => node.remove());

  // Any scroll-reveal element still mid-animation gets its end state.
  let unfinished = 0;
  clone.querySelectorAll('[style*="opacity"]').forEach(node => {
    if (node.style.opacity !== '' && Number(node.style.opacity) < 1 && node.style.transform) {
      node.style.opacity = '1';
      node.style.transform = 'none';
      unfinished += 1;
    }
  });

  // Runtime-injected component styles (the reviews widget uses CSS-in-JS)
  // live in <head> and would be missing until the app boots; carry them along.
  let runtimeCss = '';
  for (const sheet of Array.from(document.styleSheets)) {
    const owner = sheet.ownerNode;
    if (!owner || owner.tagName !== 'STYLE' || !owner.hasAttribute('data-emotion')) continue;
    try { runtimeCss += Array.from(sheet.cssRules).map(rule => rule.cssText).join(''); } catch { /* cross-origin */ }
  }

  // The page's own FAQ schema, so the static JSON-LD always matches the
  // questions and answers visible in this snapshot.
  const faqSchema = document.getElementById('faq-schema')?.textContent?.trim() || '';

  const text = root.innerText || '';
  return {
    faqSchema,
    html: (runtimeCss ? `<style data-prerender-styles>${runtimeCss}</style>` : '') + clone.innerHTML,
    words: text.split(/\s+/).filter(Boolean).length,
    h1: (root.querySelector('h1')?.innerText || '').trim(),
    links: new Set(Array.from(root.querySelectorAll('a[href^="/"]')).map(a => a.getAttribute('href'))).size,
    unfinished,
  };
}

async function captureOne(browser, baseUrl, routePath) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1280, height: 900 });
    // Behave as the focused, visible tab so observers and animations run.
    if (typeof page.emulateFocusedPage === 'function') await page.emulateFocusedPage(true).catch(() => {});
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.evaluateOnNewDocument(() => { window.__PRERENDER_CAPTURE__ = true; });
    await page.setRequestInterception(true);
    page.on('request', request => (BLOCKED_HOSTS.test(request.url()) ? request.abort() : request.continue()));

    const url = `${baseUrl}${routePath === '/' ? '/' : `${routePath}/`}`;
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    // Timer polling: the default (animation frames) stalls in background tabs,
    // and several pages are captured at once.
    await page.waitForFunction('window.__APP_READY__ === true', { timeout: 25000, polling: 200 });
    await page.evaluate(scrollThrough);
    await page.waitForNetworkIdle({ idleTime: 500, timeout: 10000 }).catch(() => {});
    return await page.evaluate(extractSnapshot);
  } finally {
    await page.close().catch(() => {});
  }
}

/**
 * @param {{ distDir: string, routes: string[], concurrency?: number }} options
 * @returns {Promise<Map<string, { html: string, words: number, h1: string, links: number }>>}
 */
export async function captureRenderedRoutes({ distDir, routes, concurrency = 4 }) {
  const server = await startStaticServer(path.resolve(distDir));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const snapshots = new Map();
  let browser;
  try {
    browser = await launchBrowser();
    const queue = [...routes];
    const worker = async () => {
      for (let routePath = queue.shift(); routePath !== undefined; routePath = queue.shift()) {
        try {
          const snap = await captureOne(browser, baseUrl, routePath);
          // Sanity checks: a real page has a heading and body copy, and is not
          // the app's own "not found" screen.
          if (!snap.h1 || snap.h1 === '404' || snap.words < 80) {
            console.log(`  ! ${routePath}: snapshot rejected (h1="${snap.h1}", ${snap.words} words); keeping shell`);
            continue;
          }
          snapshots.set(routePath, snap);
          console.log(`  ✓ ${routePath}: ${snap.words} words, ${snap.links} internal links${snap.unfinished ? `, ${snap.unfinished} animations finalised` : ''}`);
        } catch (err) {
          console.log(`  ! ${routePath}: capture failed (${err.message.split('\n')[0]}); keeping shell`);
        }
      }
    };
    await Promise.all(Array.from({ length: Math.min(concurrency, routes.length) }, worker));
  } finally {
    if (browser) await browser.close().catch(() => {});
    await new Promise(resolve => server.close(resolve));
  }
  return snapshots;
}
