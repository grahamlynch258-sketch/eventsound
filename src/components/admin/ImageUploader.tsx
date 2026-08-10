import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { deleteStorageObjectByUrl, uploadImageToStorage } from "@/lib/uploadImage";
import { Upload, X, Loader2 } from "lucide-react";

type PendingFile = {
  key: string;
  file: File;
  preview: string;
  alt: string;
};

type Props = {
  category: string;
  categoryLabel: string;
  onUploaded: () => void;
};

function formatSize(bytes: number): string {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

/**
 * Drag-and-drop uploader with a mandatory alt-text step.
 * Files are queued, described, then uploaded together — nothing reaches the
 * database without alt text. Images are compressed client-side on upload.
 */
export function ImageUploader({ category, categoryLabel, onUploaded }: Props) {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<PendingFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const isUploading = uploadingKey !== null;

  function addFiles(list: FileList | File[]) {
    const images = Array.from(list).filter((f) => f.type.startsWith("image/"));
    if (!images.length) return;
    setPending((prev) => [
      ...prev,
      ...images.map((file) => ({
        key: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
        file,
        preview: URL.createObjectURL(file),
        alt: "",
      })),
    ]);
  }

  function removePending(key: string) {
    setPending((prev) => {
      const item = prev.find((p) => p.key === key);
      if (item) URL.revokeObjectURL(item.preview);
      return prev.filter((p) => p.key !== key);
    });
  }

  function clearPending() {
    pending.forEach((p) => URL.revokeObjectURL(p.preview));
    setPending([]);
  }

  async function nextSortOrder(): Promise<{ start: number; hasOrderColumns: boolean }> {
    const { data, error } = await supabase
      .from("library_images")
      .select("sort_order")
      .eq("category", category)
      .order("sort_order", { ascending: false })
      .limit(1);
    // Before the SQL migration has been run the column doesn't exist — fall
    // back to a minimal insert so the admin still works.
    if (error) return { start: 0, hasOrderColumns: false };
    return { start: ((data?.[0] as { sort_order?: number } | undefined)?.sort_order ?? -1) + 1, hasOrderColumns: true };
  }

  async function handleUploadAll() {
    if (pending.some((p) => !p.alt.trim())) return;
    const { start, hasOrderColumns } = await nextSortOrder();
    let order = start;
    let ok = 0;
    const failed: string[] = [];

    for (const item of pending) {
      setUploadingKey(item.key);
      try {
        const uploaded = await uploadImageToStorage(item.file, category);
        const base = {
          category,
          image_url: uploaded.publicUrl,
          file_name: item.file.name,
          alt_text: item.alt.trim(),
        };
        const { error } = await supabase.from("library_images").insert(
          hasOrderColumns
            ? { ...base, sort_order: order++, is_active: true, width: uploaded.width, height: uploaded.height }
            : base,
        );
        if (error) {
          await deleteStorageObjectByUrl(uploaded.publicUrl);
          throw error;
        }
        ok++;
      } catch (err) {
        failed.push(`${item.file.name}: ${err instanceof Error ? err.message : "unknown error"}`);
      }
    }

    setUploadingKey(null);
    clearPending();
    onUploaded();
    if (failed.length) {
      toast({
        title: `${ok} uploaded, ${failed.length} failed`,
        description: failed.join("; ").slice(0, 300),
        variant: "destructive",
      });
    } else {
      toast({ title: ok === 1 ? "Image uploaded" : `${ok} images uploaded` });
    }
  }

  const missingAlt = pending.filter((p) => !p.alt.trim()).length;

  return (
    <div className="space-y-4">
      <div
        role="button"
        tabIndex={0}
        aria-label={`Upload images to ${categoryLabel}`}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors ${
          dragActive ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
        }`}
      >
        <Upload className="h-6 w-6 text-muted-foreground" />
        <p className="text-sm font-medium">
          Drag &amp; drop photos here, or click to choose
        </p>
        <p className="text-xs text-muted-foreground">
          Uploading to: <strong>{categoryLabel}</strong> · large photos are optimised automatically
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {pending.length > 0 && (
        <Card>
          <CardContent className="space-y-3 p-4">
            <p className="text-sm font-medium">
              Describe each photo before uploading{" "}
              <span className="text-muted-foreground font-normal">
                (alt text — what's in the picture, for Google and screen readers)
              </span>
            </p>
            {pending.map((item) => (
              <div key={item.key} className="flex items-center gap-3">
                <img
                  src={item.preview}
                  alt=""
                  className="h-14 w-20 shrink-0 rounded object-cover bg-muted"
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <input
                    type="text"
                    value={item.alt}
                    disabled={isUploading}
                    onChange={(e) =>
                      setPending((prev) => prev.map((p) => (p.key === item.key ? { ...p, alt: e.target.value } : p)))
                    }
                    placeholder='e.g. "LED wall and stage lighting at a gala dinner in Dublin"'
                    className={`w-full rounded border bg-background px-2 py-1.5 text-sm ${
                      item.alt.trim() ? "border-border" : "border-destructive/60"
                    }`}
                  />
                  <p className="truncate text-xs text-muted-foreground">
                    {item.file.name} · {formatSize(item.file.size)}
                  </p>
                </div>
                {uploadingKey === item.key ? (
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
                ) : (
                  <button
                    type="button"
                    aria-label={`Remove ${item.file.name}`}
                    disabled={isUploading}
                    onClick={() => removePending(item.key)}
                    className="shrink-0 rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <div className="flex items-center gap-3 pt-1">
              <Button onClick={handleUploadAll} disabled={isUploading || missingAlt > 0}>
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading…
                  </>
                ) : (
                  `Upload ${pending.length} ${pending.length === 1 ? "image" : "images"}`
                )}
              </Button>
              <Button variant="ghost" onClick={clearPending} disabled={isUploading}>
                Cancel
              </Button>
              {missingAlt > 0 && (
                <p className="text-xs text-destructive">
                  {missingAlt} {missingAlt === 1 ? "photo needs" : "photos need"} a description first
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
