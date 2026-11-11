import fs from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { carryFormState, findLiveButton, mountBehindSnapshot } from "@/lib/prerenderBoot";

const read = (rel: string) => fs.readFileSync(path.join(process.cwd(), rel), "utf8");

afterEach(() => {
  document.body.innerHTML = "";
  delete window.__APP_READY__;
});

describe("snapshot to live-app swap", () => {
  it("keeps the snapshot visible, parks its ids, then swaps in the live app", async () => {
    document.body.innerHTML =
      '<div id="root" data-prerender="full"><main><h1 id="title">Static</h1><form><input id="name" name="name"></form></main></div>';
    const snapshot = document.getElementById("root")!;
    // The visitor types into the static form before the app has booted.
    snapshot.querySelector<HTMLInputElement>("input")!.value = "Aoife";

    let liveInputEvents = 0;
    const swapped = mountBehindSnapshot(snapshot, (container) => {
      container.innerHTML = '<main><h1 id="title">Live</h1><form><input id="name" name="name"></form></main>';
      container.querySelector("input")!.addEventListener("input", () => (liveInputEvents += 1));
    });

    // While the app settles: snapshot still in the page, live copy hidden,
    // and ids resolve to the live elements only.
    const live = document.getElementById("root")!;
    expect(live).not.toBe(snapshot);
    expect(document.getElementById("root-snapshot")).toBe(snapshot);
    expect(live.style.opacity).toBe("0");
    expect(live.getAttribute("aria-hidden")).toBe("true");
    expect(document.getElementById("title")!.textContent).toBe("Live");
    expect(snapshot.querySelector("[data-snapshot-id='title']")).not.toBeNull();

    await swapped;

    expect(document.getElementById("root-snapshot")).toBeNull();
    expect(live.getAttribute("style")).toBeNull();
    expect(live.hasAttribute("aria-hidden")).toBe(false);
    expect(window.__APP_READY__).toBe(true);
    // Typed text reaches the live (React-controlled) input through an input event.
    expect(live.querySelector<HTMLInputElement>("input")!.value).toBe("Aoife");
    expect(liveInputEvents).toBe(1);
  });

  it("does not copy empty, hidden or unmatched fields", () => {
    document.body.innerHTML =
      '<div id="a"><input name="honeypot" value=""><input type="hidden" name="token" value="x"><textarea name="message">Hi</textarea></div>' +
      '<div id="b"><input name="honeypot" value=""><input type="hidden" name="token" value="live"><select name="other"></select></div>';
    carryFormState(document.getElementById("a")!, document.getElementById("b")!);
    const target = document.getElementById("b")!;
    expect(target.querySelector<HTMLInputElement>("[name=honeypot]")!.value).toBe("");
    expect(target.querySelector<HTMLInputElement>("[name=token]")!.value).toBe("live");
  });
});

describe("taps made before the app has loaded", () => {
  it("maps a tapped snapshot button to the same live button, never a submit button", () => {
    document.body.innerHTML =
      '<div id="s"><button aria-label="Open menu"></button><form><button type="button">Next</button><button type="submit">Send</button></form></div>' +
      '<div id="l"><button aria-label="Open menu"></button><form><button type="button">Next</button><button type="submit">Send</button></form></div>';
    const snapshot = document.getElementById("s")!;
    const live = document.getElementById("l")!;
    const [menu, , send] = Array.from(snapshot.querySelectorAll("button"));
    expect(findLiveButton(snapshot, live, menu)).toBe(live.querySelectorAll("button")[0]);
    expect(findLiveButton(snapshot, live, send)).toBeNull();
    expect(findLiveButton(snapshot, live, undefined)).toBeNull();
    // A button whose live counterpart reads differently is not clicked.
    live.querySelectorAll("button")[1].textContent = "Back";
    expect(findLiveButton(snapshot, live, snapshot.querySelectorAll("button")[1])).toBeNull();
  });
});

describe("full-page prerender wiring", () => {
  it("imports the boot helper before the app so fetch is wrapped first", () => {
    const main = read("src/main.tsx");
    expect(main.indexOf("./lib/prerenderBoot")).toBeGreaterThan(-1);
    expect(main.indexOf("./lib/prerenderBoot")).toBeLessThan(main.indexOf("./App"));
    expect(main).toContain('dataset.prerender === "full"');
  });

  it("keeps FAQ answers in the DOM when accordions are closed", () => {
    const accordion = read("src/components/ui/accordion.tsx");
    expect(accordion).toContain("forceMount");
    expect(accordion).toContain("data-[state=closed]:hidden");
  });

  it("holds app code back until first-screen images arrive, with interaction and time limits", () => {
    const prerender = read("scripts/prerender.mjs");
    expect(prerender).toContain("function deferredBootScript(entry, chunks)");
    expect(prerender).toContain('["pointerdown", "keydown", "touchstart", "scroll"]');
    expect(prerender).toContain("window.setTimeout(boot, 3000)");
    expect(prerender).toContain('rel="preload" as="image" fetchpriority="high"');
  });

  it("falls back to static shells if the snapshot step fails", () => {
    const prerender = read("scripts/prerender.mjs");
    expect(prerender).toContain("Full-page snapshots skipped, static shells kept");
    expect(prerender).toContain('data-prerender="full"');
  });
});
