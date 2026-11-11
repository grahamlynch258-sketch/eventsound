import { useEffect, useState } from "react";

/**
 * Becomes true shortly after the page has finished loading. Use it to hold
 * back work that would compete with first paint, such as mounting the hidden
 * slides of a hero slideshow (hidden slides still sit in the viewport, so
 * loading="lazy" does not defer them).
 *
 * Stays false while the build captures the page (window.__PRERENDER_CAPTURE__),
 * so static snapshots contain only the first slide.
 */
export function useAfterPageLoad(delayMs = 1200): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.__PRERENDER_CAPTURE__) return;
    let timer: number | undefined;
    const arm = () => {
      timer = window.setTimeout(() => setReady(true), delayMs);
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return () => {
      window.removeEventListener("load", arm);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [delayMs]);

  return ready;
}
