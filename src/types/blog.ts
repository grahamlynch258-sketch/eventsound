import type { Tables } from "@/integrations/supabase/types";

export type BlogPost = Tables<"blog_posts">;
export type BlogImage = Tables<"blog_images">;
export type BlogPostStatus = BlogPost["status"];
export type BlogPostWithImages = BlogPost & { blog_images: BlogImage[] };

