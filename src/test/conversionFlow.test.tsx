import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { ContactForm } from "@/components/site/ContactForm";
import { ServicesGrid } from "@/components/site/ServicesGrid";

describe("Phase 2 conversion flow", () => {
  it("links homepage services directly to their dedicated pages", () => {
    render(<MemoryRouter><ServicesGrid /></MemoryRouter>);

    expect(screen.getByRole("link", { name: /AV & Sound/i })).toHaveAttribute("href", "/services/av-production/");
    expect(screen.getByRole("link", { name: /LED Video Walls/i })).toHaveAttribute("href", "/services/led-video-walls/");
    expect(screen.getByRole("link", { name: /Conference AV/i })).toHaveAttribute("href", "/services/conference-av-hire/");
    expect(screen.getByRole("link", { name: /Lighting Design/i })).toHaveAttribute("href", "/services/lighting-design/");
  });

  it("collects qualified event basics and preserves the service context", () => {
    render(<ContactForm defaultServices={["Lighting Design"]} formContext="Lighting Design" />);

    fireEvent.change(screen.getByLabelText("Name *"), { target: { value: "Laura" } });
    fireEvent.change(screen.getByLabelText("Email *"), { target: { value: "laura@example.ie" } });
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    fireEvent.change(screen.getByLabelText("Event type *"), { target: { value: "Festival / Outdoor" } });
    fireEvent.change(screen.getByLabelText("Venue or town *"), { target: { value: "Mullingar" } });
    fireEvent.click(screen.getByLabelText("Date not confirmed yet"));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByLabelText("Lighting Design")).toBeChecked();
    expect(screen.getByLabelText("Available budget")).toBeInTheDocument();
    expect(screen.getByLabelText("How did you hear about EventSound?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Request my quote" })).toBeInTheDocument();
  });
});
