import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Edit, Plus, Search, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { BlogPost, BlogPostStatus } from "@/types/blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { countTailorMarkers, isScheduledBlogPost } from "@/lib/blog";

type Decision = { post: BlogPost; action: "approve" | "reject" | "unpublish" } | null;

export default function AdminBlogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<BlogPostStatus | "all">("all");
  const [decision, setDecision] = useState<Decision>(null);
  const { toast } = useToast();

  const loadPosts = useCallback(async () => {
    setLoading(true);
    let query = supabase.from("blog_posts").select("*").order("updated_at", { ascending: false });
    if (status !== "all") query = query.eq("status", status);
    const { data, error } = await query;
    if (error) {
      toast({ title: "Could not load blog posts", description: error.message, variant: "destructive" });
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  }, [status, toast]);

  useEffect(() => { void loadPosts(); }, [loadPosts]);

  const visiblePosts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return posts;
    return posts.filter((post) => post.title.toLowerCase().includes(term) || post.slug.includes(term));
  }, [posts, search]);

  async function submitDecision() {
    if (!decision) return;
    let error;
    if (decision.action === "approve") {
      ({ error } = await supabase.rpc("approve_blog_post", { _post_id: decision.post.id, _approved_by: "EventSound admin" }));
    } else if (decision.action === "reject") {
      ({ error } = await supabase.rpc("reject_blog_post", { _post_id: decision.post.id, _reason: "Rejected in EventSound admin" }));
    } else {
      // The database preserves published_at so the original schedule is
      // retained if the article goes live again.
      ({ error } = await supabase.from("blog_posts").update({ status: "awaiting_approval" }).eq("id", decision.post.id));
    }

    if (error) {
      toast({ title: "Decision failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: decision.action === "approve" ? "Article is live" : decision.action === "reject" ? "Article rejected" : "Article taken offline (kept as draft)" });
      await loadPosts();
    }
    setDecision(null);
  }

  function tailorCount(post: BlogPost) {
    return countTailorMarkers(post.content, post.featured_image_alt);
  }

  function isScheduled(post: BlogPost) {
    return isScheduledBlogPost(post);
  }

  return (
    <main className="container mx-auto p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold">Blog</h1><p className="mt-1 text-muted-foreground">Edit drafts and explicitly approve finished articles.</p></div>
        <Button asChild><Link to="/admin/blog/new"><Plus className="mr-2 h-4 w-4" />New article</Link></Button>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <div className="relative min-w-72 flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search title or slug" className="pl-9" /></div>
        <select value={status} onChange={(event) => setStatus(event.target.value as BlogPostStatus | "all")} className="rounded-md border border-input bg-background px-3 text-sm">
          <option value="all">All statuses</option>
          <option value="idea">Idea</option><option value="researching">Researching</option><option value="awaiting_images">Awaiting images</option><option value="building">Building</option><option value="awaiting_approval">Awaiting approval</option><option value="published">Published</option><option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader><TableRow><TableHead>Article</TableHead><TableHead>Status</TableHead><TableHead>Updated</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {!loading && visiblePosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell><p className="font-medium">{post.title}</p><p className="text-xs text-muted-foreground">/blog/{post.slug}</p></TableCell>
                <TableCell><div className="flex flex-wrap gap-1.5">
                  <Badge variant={post.status === "published" ? "default" : "secondary"}>
                    {isScheduled(post) ? `live from ${new Date(post.published_at!).toLocaleDateString("en-IE", { day: "numeric", month: "short" })}` : post.status.replace(/_/g, " ")}
                  </Badge>
                  {tailorCount(post) > 0 && <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">{tailorCount(post)} to tailor</Badge>}
                </div></TableCell>
                <TableCell>{new Date(post.updated_at).toLocaleDateString("en-IE")}</TableCell>
                <TableCell><div className="flex justify-end gap-2">
                  {post.status === "awaiting_approval" && <><Button size="sm" onClick={() => setDecision({ post, action: "approve" })} disabled={tailorCount(post) > 0} title={tailorCount(post) > 0 ? "Finish tailoring before going live" : undefined}><CheckCircle2 className="mr-1 h-4 w-4" />Go live</Button><Button size="sm" variant="outline" onClick={() => setDecision({ post, action: "reject" })}><XCircle className="mr-1 h-4 w-4" />Reject</Button></>}
                  {post.status === "published" && <Button size="sm" variant="outline" onClick={() => setDecision({ post, action: "unpublish" })}><XCircle className="mr-1 h-4 w-4" />Take offline</Button>}
                  <Button asChild size="sm" variant="ghost"><Link to={`/admin/blog/${post.id}`}><Edit className="h-4 w-4" /><span className="sr-only">Edit {post.title}</span></Link></Button>
                </div></TableCell>
              </TableRow>
            ))}
            {!loading && visiblePosts.length === 0 && <TableRow><TableCell colSpan={4} className="py-10 text-center text-muted-foreground">No blog posts found.</TableCell></TableRow>}
            {loading && <TableRow><TableCell colSpan={4} className="py-10 text-center text-muted-foreground">Loading...</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={Boolean(decision)} onOpenChange={(open) => !open && setDecision(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>{decision?.action === "approve" ? "Make this article live?" : decision?.action === "unpublish" ? "Take this article offline?" : "Reject this article?"}</AlertDialogTitle><AlertDialogDescription>{decision?.action === "approve" ? "It becomes publicly visible from its publish date (immediately if the date has passed)." : decision?.action === "unpublish" ? "It comes off the site immediately and goes back to draft. Nothing is deleted and it can go live again any time." : "The draft and images will be retained. It can be revised later."}</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => void submitDecision()}>{decision?.action === "approve" ? "Go live" : decision?.action === "unpublish" ? "Take offline" : "Reject without deleting"}</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
