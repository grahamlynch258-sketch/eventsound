import { describe, expect, it } from "vitest";
import { canTransitionBlogStatus, getBlogSeo, isValidBlogSlug, onlyPublished, safeContentUrl, toBlogSlug } from "@/lib/blog";

describe("blog publication rules", () => {
  it("only exposes published posts", () => {
    const posts = [{ status: "published" as const, slug: "public" }, { status: "awaiting_approval" as const, slug: "private" }, { status: "rejected" as const, slug: "rejected" }];
    expect(onlyPublished(posts).map((post) => post.slug)).toEqual(["public"]);
  });

  it("requires awaiting approval before publishing", () => {
    expect(canTransitionBlogStatus("building", "published")).toBe(false);
    expect(canTransitionBlogStatus("awaiting_approval", "published")).toBe(true);
    expect(canTransitionBlogStatus("rejected", "published")).toBe(false);
  });

  it("normalises and validates slugs", () => {
    expect(toBlogSlug("How to Choose an LED Wall — Ireland")).toBe("how-to-choose-an-led-wall-ireland");
    expect(isValidBlogSlug("how-to-choose-an-led-wall")).toBe(true);
    expect(isValidBlogSlug("../Draft Post")).toBe(false);
  });

  it("uses article metadata with safe fallbacks", () => {
    const seo = getBlogSeo({ slug: "led-wall-size", title: "LED Wall Size", excerpt: "A practical guide.", meta_title: null, meta_description: null, canonical_url: null, og_image_url: null, featured_image_url: "https://example.com/hero.jpg", noindex: false });
    expect(seo.title).toBe("LED Wall Size | EventSound Blog");
    expect(seo.canonical).toBe("https://eventsound.ie/blog/led-wall-size/");
    expect(seo.ogImage).toBe("https://example.com/hero.jpg");
  });

  it("blocks unsafe content URLs", () => {
    expect(safeContentUrl("javascript:alert(1)")).toBeNull();
    expect(safeContentUrl("data:text/html,bad", "image")).toBeNull();
    expect(safeContentUrl("/services/led-video-walls")).toBe("/services/led-video-walls");
  });
});

