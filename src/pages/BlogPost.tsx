import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { BlogContent } from "@/components/blog/BlogContent";
import { PageShell } from "@/components/site/PageShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSeo } from "@/hooks/useSeo";
import { supabase } from "@/integrations/supabase/client";
import { getBlogAuthorType, getBlogSeo } from "@/lib/blog";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/schema";
import type { BlogPostWithImages } from "@/types/blog";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostWithImages | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (!slug) return;
    supabase
      .from("blog_posts")
      .select("*, blog_images(*)")
      .eq("slug", slug)
      .eq("status", "published")
      // published_at doubles as a scheduler: future-dated posts stay hidden
      .lte("published_at", new Date().toISOString())
      .order("position", { referencedTable: "blog_images", ascending: true })
      .maybeSingle()
      .then(({ data, error }) => {
        if (!mounted) return;
        if (error || !data) {
          navigate("/404", { replace: true });
        } else {
          setPost(data as BlogPostWithImages);
        }
        setLoading(false);
      });
    return () => { mounted = false; };
  }, [navigate, slug]);

  const seo = post ? getBlogSeo(post) : undefined;
  const schemas = useMemo(() => {
    if (!post || !post.published_at) return undefined;
    return {
      article: generateArticleSchema({
        headline: post.title,
        description: post.excerpt,
        image: post.og_image_url || post.featured_image_url || "https://eventsound.ie/Brand/logo_1920x1080.png",
        datePublished: post.published_at,
        dateModified: post.updated_at,
        author: { name: post.author || "EventSound", url: "https://eventsound.ie", type: getBlogAuthorType(post.author) },
        publisher: { name: "EventSound", logo: "https://eventsound.ie/Brand/logo_transparent.png" },
        keywords: post.tags.join(", "),
        articleSection: post.category || undefined,
      }),
      breadcrumb: generateBreadcrumbSchema({
        items: [
          { name: "Home", url: "https://eventsound.ie/" },
          { name: "Blog", url: "https://eventsound.ie/blog/" },
          { name: post.title, url: `https://eventsound.ie/blog/${post.slug}/` },
        ],
      }),
    };
  }, [post]);

  useSeo({
    title: seo?.title || "Blog Article | EventSound",
    description: seo?.description,
    canonical: seo?.canonical,
    ogTitle: seo?.ogTitle,
    ogDescription: seo?.ogDescription,
    ogImage: seo?.ogImage,
    ogType: "article",
    noindex: !post || seo?.noindex,
    schema: schemas?.article,
    schemaId: "blog-article-schema",
    additionalSchemas: schemas ? [{ schema: schemas.breadcrumb, schemaId: "blog-breadcrumb-schema" }] : undefined,
  });

  if (loading) return <PageShell><main className="container mx-auto px-4 py-20 text-center text-muted-foreground">Loading article...</main></PageShell>;
  if (!post) return null;

  return (
    <PageShell>
      <main>
        <article>
          <header className="border-b border-border/60 bg-card/20">
            <div className="container mx-auto max-w-5xl px-4 py-12 md:py-16">
              <Link to="/blog"><Button variant="ghost" className="mb-7 px-0"><ArrowLeft className="mr-2 h-4 w-4" />Back to Blog</Button></Link>
              {post.category && <Badge className="mb-4 block w-fit">{post.category}</Badge>}
              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">{post.title}</h1>
              <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">{post.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                <span>{post.author}</span>
                {post.published_at && <span className="flex items-center gap-2"><Calendar className="h-4 w-4" />{new Date(post.published_at).toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" })}</span>}
              </div>
            </div>
          </header>

          {post.featured_image_url && (
            <div className="container mx-auto max-w-5xl px-4 pt-10">
              <img src={post.featured_image_url} alt={post.featured_image_alt || post.title} className="aspect-video w-full rounded-xl border border-border/60 object-cover" {...({ fetchpriority: "high" } as Record<string, string>)} />
            </div>
          )}

          <div className="container mx-auto max-w-3xl px-4 py-12">
            <BlogContent content={post.content} images={post.blog_images} />
            <div className="mt-14 rounded-xl border border-accent/30 bg-card/40 p-8 text-center">
              <h2 className="text-2xl font-bold">Planning an event?</h2>
              <p className="mt-3 text-muted-foreground">Talk to EventSound about the technical production your event needs.</p>
              <Button asChild className="mt-6"><Link to="/contact">Get a Quote</Link></Button>
            </div>
          </div>
        </article>
      </main>
    </PageShell>
  );
}
