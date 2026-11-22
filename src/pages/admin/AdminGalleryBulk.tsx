import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, Download, FileText, Loader2, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { type UploadedImage, uploadImageToStorage } from "@/lib/uploadImage";
import {
  type BatchDetails,
  type PhotoText,
  GALLERY_SERVICES,
  descriptiveFileName,
  draftText,
  isHeic,
  manifestKey,
  manifestLookup,
  manifestTemplate,
  needsDescription,
  parseManifest,
  toDateColumn,
} from "@/lib/galleryBulk";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Bulk upload for the gallery. One batch = one event.
//
// 1. Fill in the event details once.
// 2. Drop the photos (JPEG, PNG, WebP or iPhone HEIC). A manifest.csv dropped
//    with them fills in title, alt text and caption by file name.
// 3. Check the descriptions, then upload. Photos are saved HIDDEN.
// 4. Publish the batch once every photo has a real description.
//
// Each photo is resized and compressed in the browser by uploadImageToStorage,
// stored under a descriptive file name, and saved with its pixel size.

type Status = "converting" | "ready" | "uploading" | "done" | "error";

type Item = {
  key: string;
  /** Fixed when the photo is added, so numbering never shifts when others are removed. */
  seq: number;
  originalName: string;
  file: File | null;
  preview: string;
  text: PhotoText;
  edited: boolean;
  status: Status;
  error?: string;
  /** Set once the file is in storage, so a retry after a failed save does not upload it twice. */
  uploaded?: UploadedImage;
  rowId?: string;
  published?: boolean;
};

const emptyBatch: BatchDetails = { eventName: "", location: "", date: "", category: "", services: [] };

async function heicToJpeg(file: File): Promise<File> {
  // Loaded only when an iPhone HEIC photo is dropped: the converter is large.
  const { default: heic2any } = await import("heic2any");
  const converted = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.92 });
  const blob = Array.isArray(converted) ? converted[0] : converted;
  return new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), { type: "image/jpeg", lastModified: file.lastModified });
}

export default function AdminGalleryBulk() {
  const [batch, setBatch] = useState<BatchDetails>(emptyBatch);
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const seqRef = useRef(0);
  const batchRef = useRef(batch);
  batchRef.current = batch;

  // The list lives in a ref as well as in state: uploads and conversions run
  // across many renders and must always read and write the latest list.
  const itemsRef = useRef<Item[]>([]);
  function updateItems(change: (current: Item[]) => Item[]) {
    itemsRef.current = change(itemsRef.current);
    setItems(itemsRef.current);
  }
  function patch(key: string, change: Partial<Item>) {
    updateItems((current) => current.map((item) => (item.key === key ? { ...item, ...change } : item)));
  }

  useEffect(() => {
    supabase.from("gallery_items").select("category").then(({ data }) => {
      setCategories([...new Set((data || []).map((row) => row.category).filter(Boolean))].sort());
    });
    // Free the preview images when leaving the screen.
    return () => itemsRef.current.forEach((item) => item.preview && URL.revokeObjectURL(item.preview));
  }, []);

  // Re-draft the placeholder text of photos nobody has edited when the batch details change.
  useEffect(() => {
    updateItems((current) => current.map((item) => (item.edited || item.status === "done" ? item : { ...item, text: draftText(batch, item.seq) })));
  }, [batch]);

  const waiting = items.filter((item) => item.file && (item.status === "ready" || item.status === "error"));
  const done = items.filter((item) => item.status === "done");
  const unpublished = done.filter((item) => !item.published);
  const undescribed = items.filter((item) => needsDescription(item.text, batch, item.seq)).length;
  const batchReady = batch.eventName.trim() !== "" && batch.category.trim() !== "";

  function applyManifest(text: string, label: string) {
    try {
      const lookup = manifestLookup(parseManifest(text));
      const matches = (item: Item) => item.status !== "done" && lookup.has(manifestKey(item.originalName));
      const matched = itemsRef.current.filter(matches).length;
      updateItems((current) => current.map((item) => {
        if (!matches(item)) return item;
        const row = lookup.get(manifestKey(item.originalName))!;
        return { ...item, edited: true, text: { title: row.title || item.text.title, alt: row.alt || item.text.alt, caption: row.caption ?? item.text.caption } };
      }));
      toast.success(`${label}: descriptions applied to ${matched} of ${lookup.size} listed photos`);
    } catch (error) {
      toast.error(`Could not read ${label}: ${(error as Error).message}`);
    }
  }

  async function addFiles(list: FileList | File[]) {
    const files = Array.from(list);
    const manifests = files.filter((file) => /\.(csv|json)$/i.test(file.name));
    const photos = files.filter((file) => file.type.startsWith("image/") || isHeic(file));
    if (photos.length) {
      const added: Item[] = photos.map((file) => {
        const seq = seqRef.current++;
        return {
          key: `${seq}-${file.name}-${file.size}-${file.lastModified}`,
          seq,
          originalName: file.name,
          file: isHeic(file) ? null : file,
          preview: isHeic(file) ? "" : URL.createObjectURL(file),
          text: draftText(batchRef.current, seq),
          edited: false,
          status: isHeic(file) ? "converting" : "ready",
        };
      });
      updateItems((current) => [...current, ...added]);
      // Convert iPhone photos one at a time so the page stays responsive.
      for (const [offset, file] of photos.entries()) {
        if (!isHeic(file)) continue;
        const key = added[offset].key;
        try {
          const jpeg = await heicToJpeg(file);
          patch(key, { file: jpeg, preview: URL.createObjectURL(jpeg), status: "ready" });
        } catch (error) {
          patch(key, { status: "error", error: `Could not convert this iPhone photo (${(error as Error).message}). Remove it, or export it as JPEG and add it again.` });
        }
      }
    }
    // Manifests are applied after the photos they describe are in the list.
    for (const manifest of manifests) applyManifest(await manifest.text(), manifest.name);
    if (!photos.length && !manifests.length) toast.error("Drop photos (JPEG, PNG, WebP, HEIC) or a manifest (.csv or .json).");
  }

  function remove(key: string) {
    const item = itemsRef.current.find((entry) => entry.key === key);
    if (item?.preview) URL.revokeObjectURL(item.preview);
    updateItems((current) => current.filter((entry) => entry.key !== key));
  }

  function downloadTemplate() {
    const url = URL.createObjectURL(new Blob([manifestTemplate(items.map((item) => item.originalName))], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "manifest.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    // Some browsers cancel the download if the URL is revoked straight away.
    window.setTimeout(() => URL.revokeObjectURL(url), 10000);
  }

  async function uploadAll() {
    if (!batchReady) { toast.error("Give the batch an event name and a category first."); return; }
    setBusy(true);
    // Rows with no sort order must not count as the highest (Postgres sorts nulls first when descending).
    const { data: last } = await supabase.from("gallery_items").select("sort_order")
      .order("sort_order", { ascending: false, nullsFirst: false }).limit(1);
    let sortOrder = (last?.[0]?.sort_order ?? 0) + 1;
    let failed = 0;
    for (const queued of [...itemsRef.current]) {
      if (!queued.file || (queued.status !== "ready" && queued.status !== "error")) continue;
      patch(queued.key, { status: "uploading", error: undefined });
      try {
        let uploaded = queued.uploaded;
        if (!uploaded) {
          const extension = queued.file.name.split(".").pop() || "jpg";
          const named = new File([queued.file], `${descriptiveFileName(batch, queued.seq, queued.originalName)}.${extension}`, { type: queued.file.type });
          uploaded = await uploadImageToStorage(named, batch.category);
          patch(queued.key, { uploaded });
        }
        // Read the text again: it may have been edited while earlier photos uploaded.
        const text = itemsRef.current.find((entry) => entry.key === queued.key)?.text ?? queued.text;
        const { data, error } = await supabase
          .from("gallery_items")
          .insert({
            title: text.title.trim() || draftText(batch, queued.seq).title,
            alt_text: text.alt.trim(),
            caption: text.caption.trim() || null,
            category: batch.category.trim(),
            image_url: uploaded.publicUrl,
            event_name: batch.eventName.trim(),
            location: batch.location.trim() || null,
            taken_on: toDateColumn(batch.date),
            width: uploaded.width,
            height: uploaded.height,
            services: batch.services,
            sort_order: sortOrder++,
            is_published: false,
          })
          .select("id")
          .single();
        if (error) throw error;
        patch(queued.key, { status: "done", rowId: data.id });
      } catch (error) {
        failed += 1;
        patch(queued.key, { status: "error", error: (error as Error).message });
      }
    }
    setBusy(false);
    if (failed) toast.error(`${failed} photo(s) failed. Fix or remove them and press Upload again.`);
    else toast.success("Uploaded and saved hidden. Publish the batch when the descriptions are right.");
  }

  async function saveTextAndPublish() {
    const targets = itemsRef.current.filter((item) => item.status === "done" && !item.published && item.rowId);
    if (!targets.length) return;
    if (undescribed > 0 && !window.confirm(`${undescribed} photo(s) still have placeholder alt text. Publish anyway?`)) return;
    setBusy(true);
    let failed = 0;
    // Save any description edits made after upload, then publish. Each photo
    // is marked published only if its own save succeeded.
    for (const item of targets) {
      const { error } = await supabase.from("gallery_items")
        .update({
          title: item.text.title.trim() || draftText(batch, item.seq).title,
          alt_text: item.text.alt.trim(),
          caption: item.text.caption.trim() || null,
          is_published: true,
        })
        .eq("id", item.rowId!);
      if (error) { failed += 1; patch(item.key, { error: `Not published: ${error.message}` }); }
      else patch(item.key, { published: true, error: undefined });
    }
    setBusy(false);
    const ok = targets.length - failed;
    if (failed) toast.error(`${failed} photo(s) could not be published and are still hidden. ${ok} published.`);
    else toast.success(`${ok} photos are now on the gallery. Press "Publish site" on the dashboard so the fast version of the page is rebuilt.`);
  }

  return (
    <main className="container mx-auto max-w-6xl space-y-6 p-6">
      <Button asChild variant="ghost" className="px-0"><Link to="/admin/gallery"><ArrowLeft className="mr-2 h-4 w-4" />Back to gallery</Link></Button>
      <div>
        <h1 className="text-3xl font-bold">Bulk upload</h1>
        <p className="mt-1 text-muted-foreground">One batch per event. Photos are compressed, renamed and saved hidden until you publish them.</p>
      </div>

      <Card>
        <CardHeader><CardTitle>1. The event</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div><Label htmlFor="bulk-event" className="mb-2 block">Event name *</Label>
            <Input id="bulk-event" value={batch.eventName} onChange={(e) => setBatch({ ...batch, eventName: e.target.value })} placeholder="Swords Castle Summer Concerts" /></div>
          <div><Label htmlFor="bulk-location" className="mb-2 block">Venue or town</Label>
            <Input id="bulk-location" value={batch.location} onChange={(e) => setBatch({ ...batch, location: e.target.value })} placeholder="Swords, Co. Dublin" /></div>
          <div><Label htmlFor="bulk-date" className="mb-2 block">Month of the event</Label>
            <Input id="bulk-date" type="month" value={batch.date} onChange={(e) => setBatch({ ...batch, date: e.target.value })} /></div>
          <div><Label htmlFor="bulk-category" className="mb-2 block">Gallery category *</Label>
            <Input id="bulk-category" list="bulk-categories" value={batch.category} onChange={(e) => setBatch({ ...batch, category: e.target.value })} placeholder="Pick one or type a new one" />
            <datalist id="bulk-categories">{categories.map((category) => <option key={category} value={category} />)}</datalist></div>
          <fieldset className="md:col-span-2">
            <legend className="mb-2 text-sm font-medium">Services shown in these photos</legend>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {GALLERY_SERVICES.map((service) => (
                <label key={service.key} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={batch.services.includes(service.key)}
                    onChange={(e) => setBatch({ ...batch, services: e.target.checked ? [...batch.services, service.key] : batch.services.filter((key) => key !== service.key) })} />
                  {service.label}
                </label>
              ))}
            </div>
          </fieldset>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>2. The photos</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div
            role="button" tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); void addFiles(e.dataTransfer.files); }}
            className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed p-10 text-center transition-colors ${dragActive ? "border-accent bg-accent/5" : "border-border"}`}
          >
            <Upload className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
            <p className="font-medium">Drop the event's photos here, or click to choose them</p>
            <p className="text-sm text-muted-foreground">JPEG, PNG, WebP and iPhone HEIC. Drop a manifest.csv with them to fill in the descriptions.</p>
            <input ref={inputRef} type="file" multiple accept="image/*,.heic,.heif,.csv,.json" className="hidden" data-testid="bulk-file-input"
              onChange={(e) => { if (e.target.files) void addFiles(e.target.files); e.target.value = ""; }} />
          </div>

          {items.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span><strong>{items.length}</strong> photos</span>
              <span className={undescribed ? "text-amber-600" : "text-emerald-600"}>{undescribed ? `${undescribed} still need a real description` : "every photo has a description"}</span>
              <Button type="button" size="sm" variant="outline" onClick={downloadTemplate}><Download className="mr-1 h-4 w-4" />Download manifest template</Button>
              <span className="flex items-center gap-1 text-muted-foreground"><FileText className="h-4 w-4" />Fill it in (or have an agent do it), then drop it back here.</span>
            </div>
          )}

          <ul className="space-y-3">
            {items.map((item) => {
              const placeholder = needsDescription(item.text, batch, item.seq);
              const locked = item.status === "uploading" || item.status === "converting" || busy || item.published === true;
              const edit = (change: Partial<PhotoText>) => patch(item.key, { edited: true, text: { ...item.text, ...change } });
              return (
                <li key={item.key} className="grid gap-3 rounded-lg border border-border p-3 md:grid-cols-[160px_1fr_auto]">
                  <div className="flex h-28 w-full items-center justify-center overflow-hidden rounded-md bg-muted md:w-40">
                    {item.preview ? <img src={item.preview} alt="" className="h-full w-full object-cover" />
                      : item.status === "converting" ? <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                      : <span className="px-2 text-center text-xs text-muted-foreground">No preview</span>}
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">{item.originalName}</p>
                    <Input aria-label={`Title for ${item.originalName}`} value={item.text.title} disabled={locked} onChange={(e) => edit({ title: e.target.value })} placeholder="Title" />
                    <Textarea aria-label={`Alt text for ${item.originalName}`} value={item.text.alt} disabled={locked} rows={2} onChange={(e) => edit({ alt: e.target.value })}
                      placeholder="Alt text: say what is in the photo, e.g. Curved LED video wall behind a speaker at a conference" className={placeholder ? "border-amber-400" : ""} />
                    <Input aria-label={`Caption for ${item.originalName}`} value={item.text.caption} disabled={locked} onChange={(e) => edit({ caption: e.target.value })} placeholder="Caption shown under the photo" />
                    {placeholder && <p className="text-xs text-amber-600">Placeholder alt text. Describe what the photo shows.</p>}
                    {item.error && <p className="text-xs text-destructive">{item.error}</p>}
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    {item.status === "converting" && <span className="flex items-center gap-1 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Converting</span>}
                    {item.status === "uploading" && <span className="flex items-center gap-1 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Uploading</span>}
                    {item.status === "done" && <span className="flex items-center gap-1 text-emerald-600"><CheckCircle2 className="h-4 w-4" />{item.published ? "Published" : "Saved, hidden"}</span>}
                    {(item.status === "ready" || item.status === "error") && (
                      <Button type="button" size="icon" variant="ghost" aria-label={`Remove ${item.originalName}`} disabled={busy} onClick={() => remove(item.key)}><X className="h-4 w-4" /></Button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>3. Upload, then publish</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Button type="button" onClick={uploadAll} disabled={busy || waiting.length === 0 || !batchReady}>
            {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
            Upload {waiting.length || ""} photo{waiting.length === 1 ? "" : "s"} (saved hidden)
          </Button>
          <Button type="button" variant="outline" onClick={saveTextAndPublish} disabled={busy || unpublished.length === 0}>
            Publish {unpublished.length || ""} uploaded photo{unpublished.length === 1 ? "" : "s"}
          </Button>
          {!batchReady && <p className="text-sm text-muted-foreground">Enter the event name and category to enable upload.</p>}
        </CardContent>
      </Card>
    </main>
  );
}
