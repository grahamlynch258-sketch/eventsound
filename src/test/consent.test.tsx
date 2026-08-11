import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ConsentBanner } from "@/components/site/ConsentBanner";
import {
  CONSENT_STORAGE_KEY,
  INTERNAL_TRAFFIC_STORAGE_KEY,
  OPEN_CONSENT_SETTINGS_EVENT,
} from "@/lib/consent";

describe("analytics consent", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.gtag = vi.fn();
    window.clarity = vi.fn();
  });

  it("starts with optional storage denied and saves an accept-all decision", () => {
    render(<MemoryRouter initialEntries={["/"]}><ConsentBanner /></MemoryRouter>);

    expect(screen.getByRole("dialog", { name: "Your privacy choices" })).toBeInTheDocument();
    expect(window.gtag).toHaveBeenCalledWith("consent", "update", {
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });

    fireEvent.click(screen.getByRole("button", { name: "Accept all" }));

    const saved = JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY) || "null");
    expect(saved).toMatchObject({ version: 1, analytics: true, advertising: true });
    expect(window.gtag).toHaveBeenLastCalledWith("consent", "update", {
      ad_storage: "granted",
      analytics_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
    expect(window.clarity).toHaveBeenLastCalledWith("consentv2", {
      ad_Storage: "granted",
      analytics_Storage: "granted",
    });
    expect(screen.queryByRole("dialog", { name: "Your privacy choices" })).not.toBeInTheDocument();
  });

  it("supports granular choices and can be reopened from the footer event", async () => {
    render(<MemoryRouter initialEntries={["/cookie-policy/"]}><ConsentBanner /></MemoryRouter>);

    fireEvent.click(screen.getByRole("button", { name: "Manage choices" }));
    fireEvent.click(screen.getByRole("checkbox", { name: /Analytics/i }));
    fireEvent.click(screen.getByRole("button", { name: "Save choices" }));

    expect(JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY) || "null")).toMatchObject({
      analytics: true,
      advertising: false,
    });

    act(() => window.dispatchEvent(new Event(OPEN_CONSENT_SETTINGS_EVENT)));
    expect(await screen.findByRole("checkbox", { name: /Analytics/i })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: /Advertising measurement/i })).not.toBeChecked();
  });

  it("does not show on admin pages or staff-opted-out devices", () => {
    const { unmount } = render(<MemoryRouter initialEntries={["/admin/"]}><ConsentBanner /></MemoryRouter>);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    unmount();

    window.localStorage.setItem(INTERNAL_TRAFFIC_STORAGE_KEY, "true");
    render(<MemoryRouter initialEntries={["/"]}><ConsentBanner /></MemoryRouter>);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
