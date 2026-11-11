// Boot helpers for prerendered pages. IMPORT THIS FIRST in main.tsx: it wraps
// window.fetch before the Supabase client is created, so the app can tell when
// the first screen has finished loading its data.
//
// Why this exists: the build captures every public page fully rendered
// (scripts/capture-rendered.mjs) and ships that HTML inside #root, so crawlers
// that don't run JavaScript read the whole page. For visitors, React would
// normally throw that HTML away and start from a blank screen. Instead the
// app mounts invisibly behind the snapshot and swaps in once it has settled.

declare global {
  interface Window {
    /** Set by the build's headless browser while it captures a page. */
    __PRERENDER_CAPTURE__?: boolean;
    /** Set by the app when the first screen has rendered and data has loaded. */
    __APP_READY__?: boolean;
    /** Snapshot button the visitor tapped before the app was running. */
    __snapshotClick?: Element;
  }
}

let pendingFetches = 0;
let lastFetchChange = Date.now();

if (typeof window !== "undefined" && typeof window.fetch === "function") {
  const originalFetch = window.fetch.bind(window);
  window.fetch = (...args: Parameters<typeof fetch>) => {
    pendingFetches += 1;
    lastFetchChange = Date.now();
    const done = () => {
      pendingFetches = Math.max(0, pendingFetches - 1);
      lastFetchChange = Date.now();
    };
    const request = originalFetch(...args);
    request.then(done, done);
    return request;
  };
}

const QUIET_MS = 250;
const SOFT_LIMIT_MS = 5000;
const HARD_LIMIT_MS = 12000;

/**
 * Resolves when `container` shows a page heading and no fetch has been in
 * flight for a short quiet period. After SOFT_LIMIT_MS a heading alone is
 * enough; after HARD_LIMIT_MS it resolves regardless.
 */
export function whenSettled(container: HTMLElement): Promise<void> {
  const started = Date.now();
  return new Promise((resolve) => {
    // setTimeout, not requestAnimationFrame: background tabs pause rAF.
    const check = () => {
      const now = Date.now();
      const elapsed = now - started;
      const hasHeading = container.querySelector("h1") !== null;
      const quiet = pendingFetches === 0 && now - lastFetchChange >= QUIET_MS;
      if ((hasHeading && quiet) || (hasHeading && elapsed >= SOFT_LIMIT_MS) || elapsed >= HARD_LIMIT_MS) {
        resolve();
        return;
      }
      window.setTimeout(check, 50);
    };
    check();
  });
}

/** Waits (briefly) for images in the first screen of `container` to decode. */
function firstScreenImagesDecoded(container: HTMLElement, limitMs = 1200): Promise<void> {
  const images = Array.from(container.querySelectorAll("img")).filter((img) => {
    const rect = img.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0 && rect.width > 0;
  });
  const decoded = Promise.all(
    images.map((img) => (img.complete ? Promise.resolve() : img.decode().catch(() => undefined))),
  ).then(() => undefined);
  const timeout = new Promise<void>((resolve) => window.setTimeout(resolve, limitMs));
  return Promise.race([decoded, timeout]);
}

function setNativeValue(element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, value: string) {
  const prototype =
    element instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : element instanceof HTMLSelectElement
        ? HTMLSelectElement.prototype
        : HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(prototype, "value")?.set?.call(element, value);
  element.dispatchEvent(new Event(element instanceof HTMLSelectElement ? "change" : "input", { bubbles: true }));
}

/** Copies anything the visitor typed into the snapshot's form fields to the live app. */
export function carryFormState(from: HTMLElement, to: HTMLElement) {
  const active = document.activeElement;
  from
    .querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      "input[name], textarea[name], select[name]",
    )
    .forEach((source) => {
      if (source instanceof HTMLInputElement && ["hidden", "checkbox", "radio", "file", "submit"].includes(source.type)) return;
      const selector = `${source.tagName.toLowerCase()}[name="${CSS.escape(source.name)}"]`;
      const target = to.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(selector);
      if (!target) return;
      if (source.value && target.value !== source.value) setNativeValue(target, source.value);
      if (source === active) target.focus({ preventScroll: true });
    });
}

/**
 * If the visitor tapped a button in the snapshot (for example the mobile menu)
 * before the app was running, find the same button in the live app.
 * Submit buttons are never repeated.
 */
export function findLiveButton(snapshot: HTMLElement, live: HTMLElement, tapped: Element | undefined): HTMLButtonElement | null {
  // A button's default type is "submit", so only one inside a form counts.
  const submitsForm = (button: HTMLButtonElement) => button.type === "submit" && button.form !== null;
  if (!(tapped instanceof HTMLButtonElement) || !snapshot.contains(tapped) || submitsForm(tapped)) return null;
  const index = Array.from(snapshot.querySelectorAll("button")).indexOf(tapped);
  const candidate = live.querySelectorAll("button")[index];
  if (!candidate || submitsForm(candidate)) return null;
  const label = (element: Element) => (element.getAttribute("aria-label") || element.textContent || "").trim();
  return label(candidate) === label(tapped) ? candidate : null;
}

/**
 * Keeps the prerendered snapshot on screen, mounts the live app invisibly on
 * top of it, and swaps the two in one frame once the live app has settled.
 */
export function mountBehindSnapshot(snapshot: HTMLElement, mount: (container: HTMLElement) => void): Promise<void> {
  // The snapshot repeats every id the live app will use. Park them so
  // getElementById and label/anchor lookups find the live elements.
  snapshot.querySelectorAll("[id]").forEach((element) => {
    element.setAttribute("data-snapshot-id", element.id);
    element.removeAttribute("id");
  });
  snapshot.id = "root-snapshot";

  const live = document.createElement("div");
  live.id = "root";
  live.setAttribute("aria-hidden", "true");
  // Laid out in place (so in-view animations and lazy images behave normally)
  // but invisible, behind the snapshot and not clickable.
  live.style.cssText = "position:absolute;top:0;left:0;width:100%;opacity:0;pointer-events:none;z-index:-1";
  snapshot.after(live);
  mount(live);

  return whenSettled(live)
    .then(() => firstScreenImagesDecoded(live))
    .then(() => {
      carryFormState(snapshot, live);
      const tappedButton = findLiveButton(snapshot, live, window.__snapshotClick);
      delete window.__snapshotClick;
      snapshot.remove();
      live.removeAttribute("style");
      live.removeAttribute("aria-hidden");
      window.__APP_READY__ = true;
      if (tappedButton) window.setTimeout(() => tappedButton.click(), 0);
    });
}
