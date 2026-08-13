import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { deleteStorageObjectByUrl, uploadImageToStorage } from "@/lib/uploadImage";
import { Check, Copy, ImagePlus, Loader2, Star, Trash2, X } from "lucide-react";

const BUCKET = "blog-images";

type BlogImageRow = {
  id: string;
  storage_url: string;
  original_filename: string;
  alt_text: string;
  caption: string | null;
  position: number;
  is_featured: boolean;
};

type PendingFile = { key: string; file: File; preview: string; alt: string };

type Props = {
  postId: string;
  /** Use this image as the post's featured image. */
  onSetFeatured: (url: string, alt: string) => void;
};

/**
 * Per-post photo section. Photos uploaded here belong to this article only:
 * they're compressed, stored in the blog-images bucket, and can be placed
 * anywhere in the article body via {{image:id}} markers, which the public
 * page renders as full-width figures with alt text and captions.
 */
export function BlogImageManager({ postId, onSetFeatured }: Props) {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingRef = useRef<PendingFile[]>([]);
  const [images, setImages] = useState<BlogImageRow[]>([]);
  const [pending, setPending] = useState<PendingFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [copiedImageId, setCopiedImageId] = useState<string | null>(null);
  const isUploading = uploadingKey !== null;

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("blog_images")
      .select("id, storage_url, original_filename, alt_text, caption, position, is_featured")
      .eq("blog_post_id", postId)
      .order("position", { ascending: true });
    if (!error) setImages((data as BlogImageRow[]) || []);
  }, [postId]);

  useEffect(() => { void load(); }, [load]);
  useEffect(() => { pendingRef.current = pending; }, [pending]);
  useEffect(() => () => {
    pendingRef.current.forEach((item) => URL.revokeObjectURL(item.preview));
  }, []);

  function addFiles(list: FileList | File[]) {
    if (isUploading) return;
    const files = Array.from(list).filter((f) => f.type.startsWith("image/"));
    if (!files.length) return;
    setPending((prev) => [
      ...prev,
      ...files.map((file) => ({
        key: `${file.name}-${file.size}-${Math.random().toString(36).slice(2)}`,
        file,
        preview: URL.createObjectURL(file),
        alt: "",
      })),
    ]);
  }

  function clearPending() {
    pending.forEach((p) => URL.revokeObjectURL(p.preview));
    setPending([]);
  }

  async function uploadAll() {
    if (pending.some((p) => !p.alt.trim())) return;
    const batch = [...pending];
    const failed = new Set<string>();
    let position = images.length ? Math.max(...images.map((i) => i.position)) + 1 : 0;
    let ok = 0;
    for (const item of batch) {
      setUploadingKey(item.key);
      let uploadedPath: string | null = null;
      try {
        const uploaded = await uploadImageToStorage(item.file, `post-${postId.slice(0, 8)}`, BUCKET);
        uploadedPath = uploaded.path;
        const { error } = await supabase.from("blog_images").insert({
          blog_post_id: postId,
          storage_url: uploaded.publicUrl,
          original_filename: item.file.name,
          alt_text: item.alt.trim(),
          position: position++,
        });
        if (error) throw error;
        ok++;
        URL.revokeObjectURL(item.preview);
      } catch (err) {
        failed.add(item.key);
        if (uploadedPath) await supabase.storage.from(BUCKET).remove([uploadedPath]);
        toast({ title: `Upload failed: ${item.file.name}`, description: err instanceof Error ? err.message : "Unknown error", variant: "destructive" });
      }
    }
    setUploadingKey(null);
    setPending(batch.filter((item) => failed.has(item.key)));
    await load();
    if (ok) toast({ title: ok === 1 ? "Photo added" : `${ok} photos added` });
  }

  async function updateField(id: string, field: "alt_text" | "caption", value: string) {
    const { error } = await supabase.from("blog_images").update({ [field]: value || (field === "caption" ? null : value) }).eq("id", id);
    if (error) toast({ title: "Couldn't save", description: error.message, variant: "destructive" });
    else await load();
  }

  async function remove(image: BlogImageRow) {
    const { error } = await supabase.from("blog_images").delete().eq("id", image.id);
    if (error) toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    else {
      await deleteStorageObjectByUrl(image.storage_url);
      toast({ title: "Photo removed", description: "If it was placed in the article, delete its {{image}} line too." });
      await load();
    }
  }

  async function copyImageMarker(id: string) {
    const marker = `{{image:${id}}}`;
    try {
      await navigator.clipboard.writeText(marker);
      setCopiedImageId(id);
      toast({ title: "Image code copied", description: "Paste it exactly where you want the photo in the article." });
      window.setTimeout(() => setCopiedImageId((current) => (current === id ? null : current)), 1800);
    } catch {
      toast({ title: "Couldn't copy image code", description: `Copy this manually: ${marker}`, variant: "destructive" });
    }
  }

  const missingAlt = pending.filter((p) => !p.alt.trim()).length;

  return (
    <section className="rounded-xl border p-6">
      <h2 className="text-lg font-semibold">Photos for this article</h2>
      <p className="mt-1 mb-4 text-sm text-muted-foreground">
        Drop photos here, describe each one, then use <strong>Copy image code</strong> and paste it exactly
        where you want the photo in the article. Photos are compressed automatically.
      </p>

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => { e.preventDefault(); setDragActive(false); addFiles(e.dataTransfer.files); }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-8 text-center transition-colors ${dragActive ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`}
      >
        <ImagePlus className="h-5 w-5 text-muted-foreground" />
        <p className="text-sm font-medium">Drag &amp; drop photos for this post, or click to choose</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          disabled={isUploading}
          className="hidden"
          onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = ""; }}
        />
      </div>

      {pending.length > 0 && (
        <div className="mt-4 space-y-3 rounded-lg border p-4">
          <p className="text-sm font-medium">Describe each photo before uploading</p>
          {pending.map((item) => (
            <div key={item.key} className="flex items-center gap-3">
              <img src={item.preview} alt="" className="h-12 w-16 shrink-0 rounded object-cover bg-muted" />
              <Input
                value={item.alt}
                disabled={isUploading}
                placeholder='e.g. "Follow spot on the lectern at an awards night in Dublin"'
                onChange={(e) => setPending((prev) => prev.map((p) => (p.key === item.key ? { ...p, alt: e.target.value } : p)))}
                className={item.alt.trim() ? "" : "border-destructive/60"}
              />
              {uploadingKey === item.key ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
              ) : (
                <button type="button" disabled={isUploading} onClick={() => setPending((prev) => { const it = prev.find((p) => p.key === item.key); if (it) URL.revokeObjectURL(it.preview); return prev.filter((p) => p.key !== item.key); })} className="shrink-0 rounded p-1 text-muted-foreground hover:bg-muted">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
          <div className="flex items-center gap-3">
            <Button type="button" onClick={() => void uploadAll()} disabled={isUploading || missingAlt > 0}>
              {isUploading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading…</> : `Upload ${pending.length === 1 ? "photo" : `${pending.length} photos`}`}
            </Button>
            <Button type="button" variant="ghost" onClick={clearPending} disabled={isUploading}>Cancel</Button>
            {missingAlt > 0 && <p className="text-xs text-destructive">{missingAlt} still need a description</p>}
          </div>
        </div>
      )}

      {images.length > 0 && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {images.map((image) => (
            <div key={image.id} className="overflow-hidden rounded-lg border">
              <img src={image.storage_url} alt={image.alt_text} loading="lazy" className="aspect-video w-full object-cover bg-muted" />
              <div className="space-y-2 p-3">
                <Input
                  defaultValue={image.alt_text}
                  placeholder="Describe the photo (alt text)"
                  onBlur={(e) => { if (e.target.value.trim() && e.target.value !== image.alt_text) void updateField(image.id, "alt_text", e.target.value.trim()); }}
                  className="text-xs"
                />
                <Input
                  defaultValue={image.caption || ""}
                  placeholder="Caption shown under the photo (optional)"
                  onBlur={(e) => { if (e.target.value !== (image.caption || "")) void updateField(image.id, "caption", e.target.value.trim()); }}
                  className="text-xs"
                />
                <div className="flex flex-wrap gap-1.5">
                  <Button type="button" size="sm" onClick={() => void copyImageMarker(image.id)}>
                    {copiedImageId === image.id ? (
                      <><Check className="mr-1 h-3 w-3" /> Copied</>
                    ) : (
                      <><Copy className="mr-1 h-3 w-3" /> Copy image code</>
                    )}
                  </Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => onSetFeatured(image.storage_url, image.alt_text)}>
                    <Star className="mr-1 h-3 w-3" /> Featured
                  </Button>
                  <Button type="button" size="sm" variant="destructive" onClick={() => void remove(image)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
