import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { whenSettled } from "@/lib/prerenderBoot";

describe("whenSettled", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-17T12:00:00Z"));
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
