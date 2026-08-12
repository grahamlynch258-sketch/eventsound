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

type Decision = { post: BlogPost; action: "approve" | "reject" } | null;

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
    const { error } = decision.action === "approve"
      ? await supabase.rpc("approve_blog_post", { _post_id: decision.post.id, _approved_by: "EventSound admin" })
      : await supabase.rpc("reject_blog_post", { _post_id: decision.post.id, _reason: "Rejected in EventSound admin" });

    if (error) {
      toast({ title: "Decision failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: decision.action === "approve" ? "Article published" : "Article rejected" });
      await loadPosts();
    }
    setDecision(null);
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
                <TableCell><Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status.replace(/_/g, " ")}</Badge></TableCell>
                <TableCell>{new Date(post.updated_at).toLocaleDateString("en-IE")}</TableCell>
                <TableCell><div className="flex justify-end gap-2">
                  {post.status === "awaiting_approval" && <><Button size="sm" onClick={() => setDecision({ post, action: "approve" })}><CheckCircle2 className="mr-1 h-4 w-4" />Approve</Button><Button size="sm" variant="outline" onClick={() => setDecision({ post, action: "reject" })}><XCircle className="mr-1 h-4 w-4" />Reject</Button></>}
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
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>{decision?.action === "approve" ? "Publish this article?" : "Reject this article?"}</AlertDialogTitle><AlertDialogDescription>{decision?.action === "approve" ? "This explicit approval makes the article publicly visible immediately." : "The draft and images will be retained. It can be revised later."}</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => void submitDecision()}>{decision?.action === "approve" ? "Approve and publish" : "Reject without deleting"}</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
