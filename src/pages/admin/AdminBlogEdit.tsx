import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import { isValidBlogSlug, toBlogSlug } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

type EditablePost = {
  title: string; slug: string; topic: string; primary_keyword: string; excerpt: string; content: string;
  meta_title: string; meta_description: string; canonical_url: string; og_image_url: string;
  featured_image_url: string; featured_image_alt: string; image_request_text: string;
  author: string; category: string; tags: string; noindex: boolean;
};

const emptyPost: EditablePost = { title: "", slug: "", topic: "", primary_keyword: "", excerpt: "", content: "", meta_title: "", meta_description: "", canonical_url: "", og_image_url: "", featured_image_url: "", featured_image_alt: "", image_request_text: "", author: "EventSound", category: "", tags: "", noindex: false };

export default function AdminBlogEdit() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState(emptyPost);
  const [status, setStatus] = useState("idea");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew || !id) return;
    supabase.from("blog_posts").select("*").eq("id", id).single().then(({ data, error }) => {
      if (error || !data) { toast({ title: "Article not found", description: error?.message, variant: "destructive" }); navigate("/admin/blog"); return; }
      setStatus(data.status);
      setForm({ title: data.title, slug: data.slug, topic: data.topic, primary_keyword: data.primary_keyword || "", excerpt: data.excerpt, content: data.content, meta_title: data.meta_title || "", meta_description: data.meta_description || "", canonical_url: data.canonical_url || "", og_image_url: data.og_image_url || "", featured_image_url: data.featured_image_url || "", featured_image_alt: data.featured_image_alt || "", image_request_text: data.image_request_text || "", author: data.author, category: data.category || "", tags: data.tags.join(", "), noindex: data.noindex });
    });
  }, [id, isNew, navigate, toast]);

  function update<K extends keyof EditablePost>(key: K, value: EditablePost[K]) { setForm((current) => ({ ...current, [key]: value })); }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    const slug = form.slug || toBlogSlug(form.title);
    if (!form.title.trim() || !form.topic.trim() || !isValidBlogSlug(slug)) { toast({ title: "Check required fields", description: "Title, topic and a lowercase hyphenated slug are required.", variant: "destructive" }); return; }
    setSaving(true);
    const shared = { ...form, slug, tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean), primary_keyword: form.primary_keyword || null, meta_title: form.meta_title || null, meta_description: form.meta_description || null, canonical_url: form.canonical_url || null, og_image_url: form.og_image_url || null, featured_image_url: form.featured_image_url || null, featured_image_alt: form.featured_image_alt || null, image_request_text: form.image_request_text || null };
    const { tags: _tagsText, ...withoutTagsText } = shared;
    const payload = { ...withoutTagsText, tags: shared.tags };
    const result = isNew
      ? await supabase.from("blog_posts").insert({ ...payload, status: "idea" } as TablesInsert<"blog_posts">).select("id").single()
      : await supabase.from("blog_posts").update(payload as TablesUpdate<"blog_posts">).eq("id", id!);
    setSaving(false);
    if (result.error) { toast({ title: "Save failed", description: result.error.message, variant: "destructive" }); return; }
    toast({ title: "Article saved" });
    navigate("/admin/blog");
  }

  return (
    <main className="container mx-auto max-w-5xl p-6">
      <Button asChild variant="ghost" className="mb-5 px-0"><Link to="/admin/blog"><ArrowLeft className="mr-2 h-4 w-4" />Back to blog</Link></Button>
      <div className="mb-6"><h1 className="text-3xl font-bold">{isNew ? "New blog article" : "Edit blog article"}</h1><p className="mt-1 text-muted-foreground">Status: {status.replace(/_/g, " ")}. Publishing is only available as an explicit approval action.</p></div>
      <form onSubmit={save} className="space-y-8">
        <section className="grid gap-5 rounded-xl border p-6 md:grid-cols-2">
          <Field label="Title"><Input value={form.title} onChange={(event) => { update("title", event.target.value); if (isNew && !form.slug) update("slug", toBlogSlug(event.target.value)); }} required /></Field>
          <Field label="Slug"><Input value={form.slug} onChange={(event) => update("slug", toBlogSlug(event.target.value))} required /></Field>
          <Field label="Topic"><Input value={form.topic} onChange={(event) => update("topic", event.target.value)} required /></Field>
          <Field label="Primary keyword"><Input value={form.primary_keyword} onChange={(event) => update("primary_keyword", event.target.value)} /></Field>
          <Field label="Author"><Input value={form.author} onChange={(event) => update("author", event.target.value)} /></Field>
          <Field label="Category"><Input value={form.category} onChange={(event) => update("category", event.target.value)} /></Field>
          <Field label="Tags (comma separated)" className="md:col-span-2"><Input value={form.tags} onChange={(event) => update("tags", event.target.value)} /></Field>
          <Field label="Excerpt" className="md:col-span-2"><Textarea value={form.excerpt} onChange={(event) => update("excerpt", event.target.value)} rows={4} /></Field>
          <Field label="Markdown content" className="md:col-span-2"><Textarea value={form.content} onChange={(event) => update("content", event.target.value)} rows={22} className="font-mono text-sm" /></Field>
        </section>
        <section className="grid gap-5 rounded-xl border p-6 md:grid-cols-2">
          <Field label="Meta title"><Input value={form.meta_title} onChange={(event) => update("meta_title", event.target.value)} /></Field>
          <Field label="Canonical URL"><Input type="url" value={form.canonical_url} onChange={(event) => update("canonical_url", event.target.value)} /></Field>
          <Field label="Meta description" className="md:col-span-2"><Textarea value={form.meta_description} onChange={(event) => update("meta_description", event.target.value)} /></Field>
          <Field label="Featured image URL"><Input type="url" value={form.featured_image_url} onChange={(event) => update("featured_image_url", event.target.value)} /></Field>
          <Field label="Featured image alt text"><Input value={form.featured_image_alt} onChange={(event) => update("featured_image_alt", event.target.value)} /></Field>
          <Field label="Open Graph image URL"><Input type="url" value={form.og_image_url} onChange={(event) => update("og_image_url", event.target.value)} /></Field>
          <Field label="Image request" className="md:col-span-2"><Textarea value={form.image_request_text} onChange={(event) => update("image_request_text", event.target.value)} rows={5} /></Field>
          <div className="flex items-center gap-3 md:col-span-2"><Switch checked={form.noindex} onCheckedChange={(checked) => update("noindex", checked)} id="noindex" /><Label htmlFor="noindex">Keep this published article out of search indexes</Label></div>
        </section>
        <Button type="submit" disabled={saving}><Save className="mr-2 h-4 w-4" />{saving ? "Saving..." : "Save article"}</Button>
      </form>
    </main>
  );
}

function Field({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) { return <div className={className}><Label className="mb-2 block">{label}</Label>{children}</div>; }
