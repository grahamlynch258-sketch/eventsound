import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { whenSettled } from "@/lib/prerenderBoot";

describe("whenSettled", () => {
  beforeEach(() => {
    // Fake timers start at the real clock, which is after the module's own
    // "last network activity" timestamp. Do not set the clock backwards.
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = "";
  });

  it("gives a page's data requests time to start after the heading appears", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    let settled = false;
    whenSettled(container).then(() => (settled = true));

    // No heading yet: never settles, however quiet the network is.
    await vi.advanceTimersByTimeAsync(1000);
    expect(settled).toBe(false);

    // Heading renders. The page's requests have not been issued yet, so a
    // quiet network must not count for the first 400 ms.
    container.innerHTML = "<h1>Gallery</h1>";
    await vi.advanceTimersByTimeAsync(300);
    expect(settled).toBe(false);

    await vi.advanceTimersByTimeAsync(200);
    expect(settled).toBe(true);
  });
});
