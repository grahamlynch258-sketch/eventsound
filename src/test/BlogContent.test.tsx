import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BlogContent } from "@/components/blog/BlogContent";

describe("BlogContent", () => {
  it("renders structured Markdown without injecting HTML", () => {
    const { container } = render(<BlogContent content={'## Useful advice\n\n<script>alert("xss")</script>\n\n[LED walls](/services/led-video-walls)'} />);
    expect(screen.getByRole("heading", { name: "Useful advice" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LED walls" })).toHaveAttribute("href", "/services/led-video-walls");
    expect(container.querySelector("script")).toBeNull();
    expect(screen.getByText(/<script>/)).toBeInTheDocument();
  });

  it("only renders related structured image markers", () => {
    const images = [{ id: "11111111-1111-4111-8111-111111111111", blog_post_id: "post", storage_url: "https://example.com/image.jpg", original_filename: "image.jpg", alt_text: "LED wall at an event", caption: "A real event setup", position: 0, is_featured: false, ai_description: null, image_subject: null, event_type: null, equipment_visible: [], possible_use: null, hero_suitability: 90, article_relevance: 90, drive_file_id: null, created_at: "2026-08-07T00:00:00Z" }];
    render(<BlogContent content={'{{image:11111111-1111-4111-8111-111111111111}}\n{{image:22222222-2222-4222-8222-222222222222}}'} images={images} />);
    expect(screen.getByRole("img", { name: "LED wall at an event" })).toHaveAttribute("src", "https://example.com/image.jpg");
    expect(screen.getAllByRole("img")).toHaveLength(1);
  });
});

