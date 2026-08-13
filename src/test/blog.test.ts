import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  canTransitionBlogStatus,
  countTailorMarkers,
  getBlogAuthorType,
  getBlogSeo,
  insertBlogContent,
  isScheduledBlogPost,
  isValidBlogSlug,
  onlyPublished,
  safeContentUrl,
  toBlogSlug,
} from "@/lib/blog";

describe("blog publication rules", () => {
  it("only exposes published posts", () => {
    const posts = [{ status: "published" as const, slug: "public" }, { status: "awaiting_approval" as const, slug: "private" }, { status: "rejected" as const, slug: "rejected" }];
    expect(onlyPublished(posts).map((post) => post.slug)).toEqual(["public"]);
  });

  it("requires awaiting approval before publishing", () => {
    expect(canTransitionBlogStatus("building", "published")).toBe(false);
    expect(canTransitionBlogStatus("awaiting_approval", "published")).toBe(true);
    expect(canTransitionBlogStatus("rejected", "published")).toBe(false);
    expect(canTransitionBlogStatus("published", "awaiting_approval")).toBe(true);
  });

  it("counts tailoring blockers across article and image fields", () => {
    expect(countTailorMarkers("[TAILOR: venue] body [TAILOR: crew]", "[TAILOR: image]", null)).toBe(3);
    expect(countTailorMarkers("Ready to publish", "Real image description")).toBe(0);
  });

  it("inserts an image marker at the editor caret without joining lines", () => {
    const result = insertBlogContent("First paragraph.\nSecond paragraph.", "{{image:abc-123}}", 16);
    expect(result.content).toBe("First paragraph.\n{{image:abc-123}}\nSecond paragraph.");
    expect(result.content.slice(result.caret)).toBe("Second paragraph.");
  });

  it("distinguishes future scheduled posts from already-live posts", () => {
    const now = new Date("2026-08-13T12:00:00.000Z");
    expect(isScheduledBlogPost({ status: "published", published_at: "2026-08-17T00:00:00.000Z" }, now)).toBe(true);
    expect(isScheduledBlogPost({ status: "published", published_at: "2026-08-12T00:00:00.000Z" }, now)).toBe(false);
    expect(isScheduledBlogPost({ status: "awaiting_approval", published_at: "2026-08-17T00:00:00.000Z" }, now)).toBe(false);
  });

  it("uses Person for Graham and Organization for the EventSound fallback", () => {
    expect(getBlogAuthorType("Graham Lynch")).toBe("Person");
    expect(getBlogAuthorType("EventSound")).toBe("Organization");
    expect(getBlogAuthorType(null)).toBe("Organization");
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

describe("blog migration safeguards", () => {
  const migration = readFileSync(
    resolve(process.cwd(), "supabase/migrations/20260807000001_blog_automation_v1.sql"),
    "utf8",
  );

  it("keeps future-dated posts and their image rows private at the database layer", () => {
    expect(migration).toMatch(/status = 'published' AND published_at <= now\(\)/);
    expect(migration).toMatch(/blog_posts\.published_at <= now\(\)/);
  });

  it("preserves the scheduled date when an article is taken offline", () => {
    expect(migration).not.toContain("NEW.published_at := NULL");
  });
});
