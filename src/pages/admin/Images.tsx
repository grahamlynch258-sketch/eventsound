import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useUploadImage } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Upload, Plus, X, Info } from "lucide-react";
import ImageLibraryPicker from "@/components/admin/ImageLibraryPicker";
import ImagePickerModal from "@/components/admin/ImagePickerModal";
import type { ServicePageImageSlot } from "@/hooks/useServicePageImages";

// ── Site Images (existing) ──────────────────────────────────────────────────

type SiteImage = {
  id: string;
  page: string;
  section: string;
  key: string;
  image_url: string;
  alt_text: string | null;
};

const imageSlots = [
  { page: "home", section: "hero", key: "background", label: "Homepage Hero Background" },
  { page: "av-production", section: "hero", key: "background", label: "AV Production Hero Background" },
  { page: "home", section: "bottom_portraits", key: "portrait_1", label: "Homepage Portrait 1 (Left)" },
  { page: "home", section: "bottom_portraits", key: "portrait_2", label: "Homepage Portrait 2 (Centre)" },
  { page: "home", section: "bottom_portraits", key: "portrait_3", label: "Homepage Portrait 3 (Right)" },
];

// ── Shared service page wireframe layout ────────────────────────────────────
// Both LED Video Walls and LED Screen Hire use the same slot IDs and layout.

type SlotGroup = {
  label: string;
  slots: string[];
  cols: number;
  aspect: string;
};

const SERVICE_PAGE_LAYOUT: SlotGroup[] = [
  {
    label: "Service types",
    slots: ["service-type-1", "service-type-2", "service-type-3"],
    cols: 3,
    aspect: "aspect-[16/10]",
  },
  {
    label: "Use cases",
    slots: ["use-case-1", "use-case-2", "use-case-3", "use-case-4", "use-case-5", "use-case-6"],
    cols: 3,
    aspect: "aspect-[4/3]",
  },
  {
    label: "Gallery",
    slots: ["gallery-1", "gallery-2", "gallery-3", "gallery-4", "gallery-5", "gallery-6"],
    cols: 3,
    aspect: "aspect-[4/3]",
  },
];

// ── Main component ──────────────────────────────────────────────────────────

export default function AdminImages() {
  const { loading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const uploadImage = useUploadImage();

  // Site images data
  const { data: siteImages, isLoading: siteImagesLoading } = useQuery({
    queryKey: ["site-images"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_images").select("*");
      if (error) throw error;
      return data as SiteImage[];
    },
  });

  // Service page images data
  const { data: ledWallSlots } = useQuery({
    queryKey: ["service-page-images", "led-video-walls"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("service_page_images")
        .select("*")
        .eq("page_slug", "led-video-walls")
        .order("display_order");
      if (error) throw error;
      return data as ServicePageImageSlot[];
    },
  });

  const { data: ledScreenSlots } = useQuery({
    queryKey: ["service-page-images", "led-screen-hire"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("service_page_images")
        .select("*")
        .eq("page_slug", "led-screen-hire")
        .order("display_order");
      if (error) throw error;
      return data as ServicePageImageSlot[];
    },
  });

  // Site images mutations
  const updateSiteImage = useMutation({
    mutationFn: async ({ page, section, key, image_url, alt_text }: { page: string; section: string; key: string; image_url: string; alt_text?: string }) => {
      const { data, error } = await supabase
        .from("site_images")
        .upsert({ page, section, key, image_url, alt_text }, { onConflict: "page,section,key" })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["site-images"] }),
  });

  // Service page image mutations
  const updateSlotImage = useMutation({
    mutationFn: async ({ pageSlug, slotId, image_url }: { pageSlug: string; slotId: string; image_url: string | null }) => {
      const { error } = await supabase
        .from("service_page_images")
        .update({ image_url })
        .eq("page_slug", pageSlug)
        .eq("slot_id", slotId);
      if (error) throw error;
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["service-page-images", vars.pageSlug] });
    },
  });

  const updateSlotAlt = useMutation({
    mutationFn: async ({ pageSlug, slotId, alt_text }: { pageSlug: string; slotId: string; alt_text: string }) => {
      const { error } = await supabase
        .from("service_page_images")
        .update({ alt_text })
        .eq("page_slug", pageSlug)
        .eq("slot_id", slotId);
      if (error) throw error;
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["service-page-images", vars.pageSlug] });
    },
  });

  if (loading || siteImagesLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // ── Site image helpers ──────────────────────────────────────────────────

  async function handleSiteUpload(e: React.ChangeEvent<HTMLInputElement>, slot: (typeof imageSlots)[0]) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage.mutateAsync(file);
      await updateSiteImage.mutateAsync({ page: slot.page, section: slot.section, key: slot.key, image_url: url });
      toast({ title: "Image updated" });
    } catch (error) {
      toast({ title: "Upload failed", description: error instanceof Error ? error.message : "Unknown error", variant: "destructive" });
    }
  }

  function getSiteImageForSlot(slot: (typeof imageSlots)[0]) {
    return siteImages?.find((img) => img.page === slot.page && img.section === slot.section && img.key === slot.key);
  }

  // ── Render ────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Manage Images</h1>
        </div>
      </header>

      <main className="container py-8">
        <p className="mb-6 text-muted-foreground">
          Manage site images and service page visuals.
        </p>

        <Tabs defaultValue="site-images">
          <TabsList className="mb-6">
            <TabsTrigger value="site-images">Site Images</TabsTrigger>
            <TabsTrigger value="led-video-walls">LED Video Walls</TabsTrigger>
            <TabsTrigger value="led-screen-hire">LED Screen Hire</TabsTrigger>
          </TabsList>

          {/* ── Tab 1: Site Images (existing functionality) ── */}
          <TabsContent value="site-images">
            <div className="grid gap-6 md:grid-cols-2">
              {imageSlots.map((slot) => {
                const image = getSiteImageForSlot(slot);
                return (
                  <Card key={`${slot.page}-${slot.section}-${slot.key}`}>
                    <CardHeader>
                      <CardTitle className="text-base">{slot.label}</CardTitle>
                      <CardDescription>{slot.page} / {slot.section}</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      {image?.image_url ? (
                        <div className="relative aspect-video overflow-hidden rounded-lg">
                          <img src={image.image_url} alt={image.alt_text || slot.label} className="h-full w-full object-cover" />
                        </div>
                      ) : (
                        <div className="flex aspect-video items-center justify-center rounded-lg border-2 border-dashed bg-muted/50">
                          <p className="text-sm text-muted-foreground">No image set</p>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded border border-dashed px-4 py-3 text-sm hover:bg-muted">
                          <Upload className="h-4 w-4" />
                          Upload
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleSiteUpload(e, slot)} />
                        </label>
                        <ImageLibraryPicker
                          onSelect={async (url) => {
                            await updateSiteImage.mutateAsync({ page: slot.page, section: slot.section, key: slot.key, image_url: url });
                            toast({ title: "Image updated from library" });
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* ── Tab 2: LED Video Walls ── */}
          <TabsContent value="led-video-walls">
            <ServicePageWireframe
              pageSlug="led-video-walls"
              heroCategory="LED Walls"
              slots={ledWallSlots ?? []}
              onSetImage={(slotId, url) => updateSlotImage.mutate({ pageSlug: "led-video-walls", slotId, image_url: url })}
              onRemoveImage={(slotId) => updateSlotImage.mutate({ pageSlug: "led-video-walls", slotId, image_url: null })}
              onUpdateAlt={(slotId, alt) => updateSlotAlt.mutate({ pageSlug: "led-video-walls", slotId, alt_text: alt })}
            />
          </TabsContent>

          {/* ── Tab 3: LED Screen Hire ── */}
          <TabsContent value="led-screen-hire">
            <ServicePageWireframe
              pageSlug="led-screen-hire"
              heroCategory="LED Screen Hire"
              slots={ledScreenSlots ?? []}
              onSetImage={(slotId, url) => updateSlotImage.mutate({ pageSlug: "led-screen-hire", slotId, image_url: url })}
              onRemoveImage={(slotId) => updateSlotImage.mutate({ pageSlug: "led-screen-hire", slotId, image_url: null })}
              onUpdateAlt={(slotId, alt) => updateSlotAlt.mutate({ pageSlug: "led-screen-hire", slotId, alt_text: alt })}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// ── Service page wireframe component ────────────────────────────────────────

function ServicePageWireframe({
  pageSlug,
  heroCategory,
  slots,
  onSetImage,
  onRemoveImage,
  onUpdateAlt,
}: {
  pageSlug: string;
  heroCategory: string;
  slots: ServicePageImageSlot[];
  onSetImage: (slotId: string, url: string) => void;
  onRemoveImage: (slotId: string) => void;
  onUpdateAlt: (slotId: string, alt: string) => void;
}) {
  const [pickerSlot, setPickerSlot] = useState<string | null>(null);

  function getSlot(slotId: string) {
    return slots.find((s) => s.slot_id === slotId);
  }

  return (
    <div className="space-y-8">
      {/* Hero note */}
      <div className="flex items-start gap-2 rounded-lg border border-accent/20 bg-accent/5 p-3">
        <Info className="h-4 w-4 text-accent mt-0.5 shrink-0" />
        <p className="text-sm text-foreground">
          Hero image is managed in the <Link to="/admin/library" className="text-accent underline">Library</Link> page under the <strong>{heroCategory}</strong> category.
        </p>
      </div>

      {SERVICE_PAGE_LAYOUT.map((group) => (
        <div key={group.label}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {group.label}
          </h3>
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${group.cols}, minmax(0, 1fr))` }}
          >
            {group.slots.map((slotId) => {
              const slot = getSlot(slotId);
              if (!slot) return null;
              return (
                <ImageSlot
                  key={slotId}
                  slot={slot}
                  aspect={group.aspect}
                  onClickEmpty={() => setPickerSlot(slotId)}
                  onClickImage={() => setPickerSlot(slotId)}
                  onRemove={() => onRemoveImage(slotId)}
                  onAltBlur={(alt) => onUpdateAlt(slotId, alt)}
                />
              );
            })}
          </div>
        </div>
      ))}

      {/* Picker modal */}
      <ImagePickerModal
        open={pickerSlot !== null}
        onClose={() => setPickerSlot(null)}
        onSelect={(url) => {
          if (pickerSlot) onSetImage(pickerSlot, url);
          setPickerSlot(null);
        }}
      />
    </div>
  );
}

// ── Single image slot ───────────────────────────────────────────────────────

function ImageSlot({
  slot,
  aspect,
  onClickEmpty,
  onClickImage,
  onRemove,
  onAltBlur,
}: {
  slot: ServicePageImageSlot;
  aspect: string;
  onClickEmpty: () => void;
  onClickImage: () => void;
  onRemove: () => void;
  onAltBlur: (alt: string) => void;
}) {
  const [localAlt, setLocalAlt] = useState(slot.alt_text ?? "");

  return (
    <div className="space-y-1.5">
      {slot.image_url ? (
        <div className={`relative ${aspect} overflow-hidden rounded-lg border bg-muted group cursor-pointer`} onClick={onClickImage}>
          <img src={slot.image_url} alt={slot.alt_text || slot.slot_label} className="h-full w-full object-cover" />
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            className="absolute top-1.5 right-1.5 rounded-full bg-black/60 p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <button
          onClick={onClickEmpty}
          className={`w-full ${aspect} flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-muted/30 hover:bg-muted/60 transition-colors cursor-pointer`}
        >
          <Plus className="h-6 w-6 text-muted-foreground/50" />
          <span className="text-xs text-muted-foreground/60">{slot.slot_label}</span>
        </button>
      )}
      <input
        type="text"
        value={localAlt}
        onChange={(e) => setLocalAlt(e.target.value)}
        onBlur={() => {
          if (localAlt !== (slot.alt_text ?? "")) {
            onAltBlur(localAlt);
          }
        }}
        placeholder="Alt text..."
        className="w-full px-2 py-1 text-xs bg-background border border-border rounded"
      />
      <p className="text-[10px] text-muted-foreground/50 truncate">{slot.slot_label}</p>
    </div>
  );
}
