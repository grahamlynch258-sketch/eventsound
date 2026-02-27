import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  useServiceSections,
  useCreateServiceSection,
  useUpdateServiceSection,
  useDeleteServiceSection,
  useSwapSectionOrder,
  type ServiceSection,
} from "@/hooks/useServiceSections";
import { useUploadImage } from "@/hooks/useSiteContent";
import { Upload, Trash2, ChevronUp, ChevronDown, Save, X, Plus, Pencil } from "lucide-react";

const SERVICE_TABS = [
  { key: "led-video-walls", label: "LED Walls" },
  { key: "av-production", label: "AV Production" },
  { key: "lighting-design", label: "Lighting" },
  { key: "staging-pipe-drape", label: "Staging" },
  { key: "event-production", label: "Event Prod." },
  { key: "video-production", label: "Video Prod." },
  { key: "virtual-events", label: "Virtual" },
  { key: "audio-systems", label: "Audio" },
];

function ServiceSectionList({ serviceKey }: { serviceKey: string }) {
  const { data: sections = [], isLoading } = useServiceSections(serviceKey);
  const createSection = useCreateServiceSection();
  const updateSection = useUpdateServiceSection();
  const deleteSection = useDeleteServiceSection();
  const swapOrder = useSwapSectionOrder();
  const uploadImage = useUploadImage();
  const { toast } = useToast();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    image_url: "",
    file_name: "",
    alt_text: "",
    title_attr: "",
    caption: "",
    section_heading: "",
    section_description: "",
  });

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage.mutateAsync(file);
      setForm((f) => ({ ...f, image_url: url, file_name: file.name }));
      toast({ title: "Image uploaded" });
    } catch (err) {
      toast({ title: "Upload failed", description: err instanceof Error ? err.message : "Unknown error", variant: "destructive" });
    }
    e.target.value = "";
  }

  async function handleAdd() {
    if (!form.image_url || !form.alt_text) {
      toast({ title: "Image and alt text are required", variant: "destructive" });
      return;
    }
    const maxOrder = sections.reduce((max, s) => Math.max(max, s.sort_order), -1);
    await createSection.mutateAsync({
      service_key: serviceKey,
      image_url: form.image_url,
      file_name: form.file_name,
      alt_text: form.alt_text,
      title_attr: form.title_attr || null,
      caption: form.caption || null,
      section_heading: form.section_heading || null,
      section_description: form.section_description || null,
      sort_order: maxOrder + 1,
    });
    resetForm();
    setIsAdding(false);
    toast({ title: "Section added" });
  }

  async function handleUpdate(id: string) {
    if (!form.alt_text) {
      toast({ title: "Alt text is required", variant: "destructive" });
      return;
    }
    await updateSection.mutateAsync({
      id,
      serviceKey,
      alt_text: form.alt_text,
      title_attr: form.title_attr || null,
      caption: form.caption || null,
      section_heading: form.section_heading || null,
      section_description: form.section_description || null,
      ...(form.image_url ? { image_url: form.image_url, file_name: form.file_name } : {}),
    });
    resetForm();
    setEditingId(null);
    toast({ title: "Section updated" });
  }

  function handleMove(index: number, direction: "up" | "down") {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= sections.length) return;
    swapOrder.mutate({
      a: { id: sections[index].id, sort_order: sections[index].sort_order },
      b: { id: sections[target].id, sort_order: sections[target].sort_order },
    });
  }

  function resetForm() {
    setForm({ image_url: "", file_name: "", alt_text: "", title_attr: "", caption: "", section_heading: "", section_description: "" });
  }

  function startEdit(s: ServiceSection) {
    setEditingId(s.id);
    setIsAdding(false);
    setForm({
      image_url: s.image_url,
      file_name: s.file_name,
      alt_text: s.alt_text,
      title_attr: s.title_attr || "",
      caption: s.caption || "",
      section_heading: s.section_heading || "",
      section_description: s.section_description || "",
    });
  }

  if (isLoading) return <p className="text-muted-foreground py-4">Loading...</p>;

  return (
    <div className="space-y-4">
      {!isAdding && !editingId && (
        <Button onClick={() => { resetForm(); setIsAdding(true); }}>
          <Plus className="mr-2 h-4 w-4" /> Add Section
        </Button>
      )}

      {(isAdding || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{isAdding ? "Add New Section" : "Edit Section"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label>Image {isAdding && "*"}</Label>
              {form.image_url && (
                <img src={form.image_url} alt="Preview" className="w-48 aspect-video object-cover rounded mb-2" />
              )}
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-dashed px-4 py-2 text-sm hover:bg-muted transition-colors">
                <Upload className="h-4 w-4" />
                {form.image_url ? "Replace Image" : "Upload Image"}
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
            <div>
              <Label>Alt Text *</Label>
              <Input value={form.alt_text} onChange={(e) => setForm({ ...form, alt_text: e.target.value })} placeholder="Describe the image (required for SEO)" />
            </div>
            <div>
              <Label>Title Attribute</Label>
              <Input value={form.title_attr} onChange={(e) => setForm({ ...form, title_attr: e.target.value })} placeholder="Optional tooltip text" />
            </div>
            <div>
              <Label>Caption</Label>
              <Input value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} placeholder="Optional caption below image" />
            </div>
            <div>
              <Label>Section Heading</Label>
              <Input value={form.section_heading} onChange={(e) => setForm({ ...form, section_heading: e.target.value })} placeholder="Heading text alongside the image" />
            </div>
            <div>
              <Label>Section Description</Label>
              <textarea
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md min-h-[80px]"
                value={form.section_description}
                onChange={(e) => setForm({ ...form, section_description: e.target.value })}
                placeholder="Body text for this section"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => isAdding ? handleAdd() : handleUpdate(editingId!)} disabled={createSection.isPending || updateSection.isPending}>
                <Save className="mr-2 h-4 w-4" /> Save
              </Button>
              <Button variant="outline" onClick={() => { resetForm(); setIsAdding(false); setEditingId(null); }}>
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {sections.length === 0 && !isAdding ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground text-sm">
            No sections yet. Add one to get started.
          </CardContent>
        </Card>
      ) : (
        sections.map((section, index) => (
          <Card key={section.id} className="overflow-hidden">
            <CardContent className="p-4 flex gap-4 items-start">
              <img src={section.image_url} alt={section.alt_text} className="w-32 h-20 object-cover rounded flex-shrink-0" />
              <div className="flex-1 min-w-0 space-y-1">
                <p className="font-semibold truncate">{section.section_heading || "(No heading)"}</p>
                <p className="text-xs text-muted-foreground truncate">Alt: {section.alt_text}</p>
                {section.caption && <p className="text-xs text-muted-foreground">Caption: {section.caption}</p>}
                <p className="text-xs text-muted-foreground/60 line-clamp-2">{section.section_description || "(No description)"}</p>
                <p className="text-xs text-muted-foreground/40">Order: {section.sort_order}</p>
              </div>
              <div className="flex flex-col gap-1 flex-shrink-0">
                <Button size="sm" variant="ghost" disabled={index === 0 || swapOrder.isPending} onClick={() => handleMove(index, "up")}>
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" disabled={index === sections.length - 1 || swapOrder.isPending} onClick={() => handleMove(index, "down")}>
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => startEdit(section)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => { if (confirm("Delete this section?")) deleteSection.mutate({ id: section.id, serviceKey }); }}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

export default function ServiceSectionsManager() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Service Page Content Sections</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Manage alternating image + text sections for each service page. The order here matches the order on the page.
      </p>
      <Tabs defaultValue="led-video-walls">
        <TabsList className="mb-4 flex-wrap">
          {SERVICE_TABS.map((tab) => (
            <TabsTrigger key={tab.key} value={tab.key}>{tab.label}</TabsTrigger>
          ))}
        </TabsList>
        {SERVICE_TABS.map((tab) => (
          <TabsContent key={tab.key} value={tab.key}>
            <ServiceSectionList serviceKey={tab.key} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
