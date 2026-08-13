import type { BlogPost, BlogPostStatus } from "@/types/blog";

export const BLOG_STATUSES: BlogPostStatus[] = [
  "idea",
  "researching",
  "awaiting_images",
  "building",
  "awaiting_approval",
  "published",
  "rejected",
];

const ALLOWED_TRANSITIONS: Record<BlogPostStatus, BlogPostStatus[]> = {
  idea: ["researching", "building", "rejected"],
  researching: ["awaiting_images", "building", "awaiting_approval", "rejected"],
  awaiting_images: ["building", "rejected"],
  building: ["awaiting_images", "awaiting_approval", "rejected"],
  awaiting_approval: ["building", "published", "rejected"],
  published: ["building", "awaiting_approval"],
  rejected: ["idea", "building"],
};

export function isValidBlogSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export function toBlogSlug(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isPublishedPost(post: Pick<BlogPost, "status">): boolean {
  return post.status === "published";
}

export function onlyPublished<T extends Pick<BlogPost, "status">>(posts: T[]): T[] {
  return posts.filter(isPublishedPost);
}

export function canTransitionBlogStatus(from: BlogPostStatus, to: BlogPostStatus): boolean {
  return from === to || ALLOWED_TRANSITIONS[from].includes(to);
}

export function countTailorMarkers(...values: Array<string | null | undefined>): number {
  return values.reduce((total, value) => total + ((value || "").match(/\[TAILOR/g) || []).length, 0);
}

export function insertBlogContent(content: string, insertion: string, position: number): { content: string; caret: number } {
  const safePosition = Math.max(0, Math.min(position, content.length));
  const prefix = safePosition > 0 && !content.slice(0, safePosition).endsWith("\n") ? "\n" : "";
  const reusesFollowingNewline = content.slice(safePosition).startsWith("\n");
  const suffix = reusesFollowingNewline ? "" : "\n";
  return {
    content: `${content.slice(0, safePosition)}${prefix}${insertion}${suffix}${content.slice(safePosition)}`,
    caret: safePosition + prefix.length + insertion.length + suffix.length + (reusesFollowingNewline ? 1 : 0),
  };
}

export function isScheduledBlogPost(
  post: Pick<BlogPost, "status" | "published_at">,
  now: Date = new Date(),
): boolean {
  if (post.status !== "published" || !post.published_at) return false;
  const publishTime = Date.parse(post.published_at);
  return Number.isFinite(publishTime) && publishTime > now.getTime();
}

export function getBlogAuthorType(author?: string | null): "Person" | "Organization" {
  const name = (author || "EventSound").trim().toLowerCase();
  return name === "eventsound" || name === "eventsound av services" ? "Organization" : "Person";
}

export function getBlogSeo(post: Pick<BlogPost, "slug" | "title" | "excerpt" | "meta_title" | "meta_description" | "canonical_url" | "og_image_url" | "featured_image_url" | "noindex">) {
  return {
    title: post.meta_title || `${post.title} | EventSound Blog`,
    description: post.meta_description || post.excerpt,
    canonical: post.canonical_url || `https://eventsound.ie/blog/${post.slug}/`,
    ogTitle: post.meta_title || post.title,
    ogDescription: post.meta_description || post.excerpt,
    ogImage: post.og_image_url || post.featured_image_url || undefined,
    noindex: post.noindex,
  };
}

export function safeContentUrl(value: string, kind: "link" | "image" = "link"): string | null {
  const url = value.trim();
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "https:" || (kind === "link" && parsed.protocol === "mailto:")) {
      return parsed.toString();
    }
  } catch {
    return null;
  }
  return null;
}
