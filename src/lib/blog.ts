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
  published: ["building"],
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

