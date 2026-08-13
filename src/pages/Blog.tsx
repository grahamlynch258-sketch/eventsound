import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSeo } from "@/hooks/useSeo";
import { supabase } from "@/integrations/supabase/client";
import type { BlogPost } from "@/types/blog";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useSeo({
    title: "Event Production Blog | EventSound Ireland",
    description: "Practical advice on AV production, LED video walls, lighting, staging and live events from EventSound.",
    canonical: "https://eventsound.ie/blog/",
  });

  useEffect(() => {
    let mounted = true;
    supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      // published_at doubles as a scheduler: future-dated posts stay hidden
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false })
      .then(({ data, error }) => {
        if (!mounted) return;
        if (error) console.error("Error fetching blog posts:", error);
        setPosts(data || []);
        setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  return (
    <PageShell>
      <PageHeader title="EventSound Blog" subtitle="Practical guidance for planning reliable, high-impact events" />
      <main className="container mx-auto px-4 py-12">
        {loading ? (
          <p className="text-center text-muted-foreground">Loading articles...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-muted-foreground">No articles are published yet.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                <Card className="h-full overflow-hidden border-border/60 transition-shadow hover:shadow-lg">
                  {post.featured_image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img src={post.featured_image_url} alt={post.featured_image_alt || post.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                  )}
                  <CardHeader>
                    {post.category && <Badge className="mb-2 w-fit">{post.category}</Badge>}
                    <CardTitle className="group-hover:text-accent">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 line-clamp-3 text-muted-foreground">{post.excerpt}</p>
                    {post.published_at && (
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.published_at).toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </PageShell>
  );
}

