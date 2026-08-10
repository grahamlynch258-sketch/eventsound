import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { deleteStorageObjectByUrl } from "@/lib/uploadImage";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ArrowUp, ArrowDown, Trash2, Copy, Check } from "lucide-react";
import ServiceSectionsManager from "@/components/admin/ServiceSectionsManager";
import { ImageUploader } from "@/components/admin/ImageUploader";

type LibraryImage = {
  id: string;
  category: string;
  image_url: string;
  file_name: string;
  alt_text: string | null;
  created_at: string;
  // Present once the 2026-08-10 migration has run:
  sort_order?: number;
  is_active?: boolean;
  width?: number | null;
  height?: number | null;
};

type CategoryDef = {
  value: string;
  label: string;
  /** Plain-English "where do these photos show up" note, shown above the uploader. */
  info: string;
  /** First Live image acts as the page banner / first slide. */
  firstIsHero?: boolean;
  /** Every Live image rotates in a slideshow, rather than only the first showing. */
  isSlideshow?: boolean;
};

const SERVICE_INFO = (path: string) =>
  `#1 Live image = the top banner of ${path} (1920×800 works best); any other Live images appear in that page's photo grid further down.`;

// LED Walls, LED Screen Hire and Musical & Theatre use the newer page layout,
// where the whole category rotates in the banner instead of only the first image.
const SLIDESHOW_SERVICE_INFO = (path: string) =>
  `Every Live image here rotates in the big banner slideshow at the top of ${path}, in this order (1920×800 works best). ` +
  `The numbered photo slots further down that page (“Use case 1”, “Gallery 3”…) are set under Admin → Manage Images, not here.`;

const categories: CategoryDef[] = [
  {
    value: "portfolio",
    label: "🏠 Homepage Slideshow",
    info:
      "Rotating background at the top of the homepage. Only Live images show, in this order — keep your best 5–8 Live. " +
      "The #1 image is what Google measures for page speed: after changing it, press “Publish site” on the Dashboard. Best size: landscape 1920×1080.",
    firstIsHero: true,
    isSlideshow: true,
  },
  {
    value: "hero-services",
    label: "🖼 Services Page Banner",
    info: "Top banner of the main Services page. The #1 Live image is used; anything below it is a spare. Best size: 1920×800.",
    firstIsHero: true,
  },
  {
    value: "hero-gallery",
    label: "🖼 Gallery Page Banner",
    info: "Top banner of the Gallery page. The #1 Live image is used. Best size: 1920×800.",
    firstIsHero: true,
  },
  {
    value: "hero-case-studies",
    label: "🖼 Case Studies Banner",
    info: "Top banner of the Case Studies page. The #1 Live image is used. Best size: 1920×800.",
    firstIsHero: true,
  },
  {
    value: "hero-faq",
    label: "🖼 FAQ Page Banner",
    info: "Top banner of the FAQ page (currently empty — page shows a plain header until an image is added). Best size: 1920×800.",
    firstIsHero: true,
  },
  {
    value: "hero-reviews",
    label: "🖼 Reviews Page Banner",
    info: "Top banner of the Reviews page (currently empty — page shows a plain header until an image is added). Best size: 1920×800.",
    firstIsHero: true,
  },
  {
    value: "hero-health-safety",
    label: "🖼 Health & Safety Banner",
    info: "Top banner of the Health & Safety page (currently empty — page shows a plain header until an image is added). Best size: 1920×800.",
    firstIsHero: true,
  },
  { value: "service-led-walls", label: "📺 LED Walls", info: SLIDESHOW_SERVICE_INFO("/services/led-video-walls"), firstIsHero: true, isSlideshow: true },
  { value: "service-led-screen-hire", label: "📺 LED Screen Hire", info: SLIDESHOW_SERVICE_INFO("/services/led-screen-hire"), firstIsHero: true, isSlideshow: true },
  { value: "service-av-production", label: "🔊 AV Production", info: SERVICE_INFO("/services/av-production"), firstIsHero: true },
  { value: "service-conference-av", label: "🎤 Conference AV", info: SERVICE_INFO("/services/conference-av-hire"), firstIsHero: true },
  { value: "service-lighting", label: "💡 Lighting", info: SERVICE_INFO("/services/lighting-design"), firstIsHero: true },
  { value: "service-staging", label: "🎪 Staging", info: SERVICE_INFO("/services/staging-pipe-drape"), firstIsHero: true },
  { value: "service-event-production", label: "🎛 Event Production", info: SERVICE_INFO("/services/event-production"), firstIsHero: true },
  { value: "service-video", label: "🎥 Video Production", info: SERVICE_INFO("/services/video-production"), firstIsHero: true },
  { value: "service-virtual", label: "💻 Virtual Events", info: SERVICE_INFO("/services/virtual-events"), firstIsHero: true },
  { value: "service-musical-theatre", label: "🎭 Musical & Theatre", info: SLIDESHOW_SERVICE_INFO("/services/musical-theatre"), firstIsHero: true, isSlideshow: true },
  { value: "service-sections", label: "📝 Content Sections", info: "" },
  {
    value: "supplements",
    label: "👷 About — Behind the Scenes",
    info: "Photo grid in the “Behind the Scenes” section of the About page. Live images show in this order.",
  },
  {
    value: "logos",
    label: "🏷 Logos",
    info: "Logo files (brand banners etc.). Not shown automatically — use “Copy URL” to place one.",
  },
  {
    value: "headlines",
    label: "🗂 General Library",
    info: "Not shown on any page automatically. General storage — use “Copy URL” to link an image from content.",
  },
  {
    value: "hero",
    label: "🗂 Legacy",
    info: "Left over from an earlier version of the site. Nothing here is shown on any page — safe to ignore or delete.",
  },
];

export default function AdminLibrary() {
  const { loading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingAlt, setEditingAlt] = useState<string | null>(null);
  const [altTextValue, setAltTextValue] = useState("");
  const [activeTab, setActiveTab] = useState("portfolio");

  const isServiceSections = activeTab === "service-sections";

  const { data: images, isLoading: imagesLoading } = useQuery({
    queryKey: ["library-images", activeTab],
    queryFn: async (): Promise<LibraryImage[]> => {
      const ordered = await supabase
        .from("library_images")
        .select("*")
        .eq("category", activeTab)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (!ordered.error) return ordered.data as LibraryImage[];

      // Before the SQL migration has run, sort_order doesn't exist yet.
      const legacy = await supabase
        .from("library_images")
        .select("*")
        .eq("category", activeTab)
        .order("created_at", { ascending: true });
      if (legacy.error) throw legacy.error;
      return legacy.data as LibraryImage[];
    },
    enabled: !isServiceSections,
  });

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: ["library-images", activeTab] });
    // The public site caches these under the same prefix (slideshow, page banners).
    queryClient.invalidateQueries({ queryKey: ["library-images"] });
  }

  const deleteImage = useMutation({
    mutationFn: async (img: LibraryImage) => {
      const { error } = await supabase.from("library_images").delete().eq("id", img.id);
      if (error) throw error;
      // Remove the database reference first. If storage cleanup fails, the
      // result is an orphaned object rather than a broken image on the site.
      await deleteStorageObjectByUrl(img.image_url);
    },
    onSuccess: () => {
      invalidate();
      toast({ title: "Image deleted" });
    },
    onError: (error) => {
      toast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    },
  });

  const updateAltText = useMutation({
    mutationFn: async ({ id, alt_text }: { id: string; alt_text: string }) => {
      const { error } = await supabase.from("library_images").update({ alt_text }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidate();
      setEditingAlt(null);
      setAltTextValue("");
    },
  });

  const toggleActive = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from("library_images").update({ is_active }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
    onError: () =>
      toast({
        title: "Couldn't update",
        description: "Has the database migration from docs/image-workflow-runbook.md been run?",
        variant: "destructive",
      }),
  });

  const swapOrder = useMutation({
    mutationFn: async ({ a, b }: { a: LibraryImage; b: LibraryImage }) => {
      const first = await supabase.from("library_images").update({ sort_order: b.sort_order }).eq("id", a.id);
      if (first.error) throw first.error;
      const second = await supabase.from("library_images").update({ sort_order: a.sort_order }).eq("id", b.id);
      if (second.error) throw second.error;
    },
    onSuccess: invalidate,
    onError: () =>
      toast({
        title: "Couldn't reorder",
        description: "Has the database migration from docs/image-workflow-runbook.md been run?",
        variant: "destructive",
      }),
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  function copyUrl(url: string, id: string) {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast({ title: "URL copied to clipboard" });
    setTimeout(() => setCopiedId(null), 2000);
  }

  const orderingReady = (images ?? []).every((img) => typeof img.sort_order === "number");
  // The public site uses the first ACTIVE image, which isn't always position #1
  // (an image above it may be hidden) — badge the one that's really in use.
  const firstLiveIndex = (images ?? []).findIndex((img) => img.is_active ?? true);

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
          <h1 className="text-lg font-semibold">Image Library</h1>
        </div>
      </header>

      <main className="container py-8">
        <p className="mb-6 text-muted-foreground">
          Each tab is one place on the website. Drop photos into the right tab, give each a short description, and
          they're live — no deploy needed. Use the arrows to reorder and the switch to show/hide.
        </p>

        <Tabs defaultValue="portfolio" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 h-auto flex-wrap">
            {categories.map((cat) => (
              <TabsTrigger key={cat.value} value={cat.value}>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat.value} value={cat.value}>
              {cat.value === "service-sections" ? (
                <ServiceSectionsManager />
              ) : (
                <>
                  {cat.info && (
                    <div className="mb-4 rounded-lg border border-accent/20 bg-accent/10 p-3">
                      <p className="text-sm text-foreground">{cat.info}</p>
                    </div>
                  )}

                  <div className="mb-6">
                    <ImageUploader category={cat.value} categoryLabel={cat.label} onUploaded={invalidate} />
                  </div>

                  {imagesLoading ? (
                    <p className="py-4 text-muted-foreground">Loading images...</p>
                  ) : (images ?? []).length === 0 ? (
                    <Card>
                      <CardContent className="flex items-center justify-center py-12">
                        <p className="text-sm text-muted-foreground">No images yet. Drop some above to get started.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {(images ?? []).map((img, index, arr) => {
                        const isLive = img.is_active ?? true;
                        return (
                          <Card key={img.id} className={`overflow-hidden ${isLive ? "" : "opacity-60"}`}>
                            <div className="relative aspect-video bg-muted">
                              <img
                                src={img.image_url}
                                alt={img.alt_text || img.file_name}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover"
                              />
                              <span className="absolute left-1.5 top-1.5 rounded bg-background/85 px-1.5 py-0.5 text-xs font-medium">
                                #{index + 1}
                                {cat.firstIsHero && index === firstLiveIndex
                                  ? cat.isSlideshow
                                    ? " · first slide"
                                    : " · banner"
                                  : ""}
                              </span>
                            </div>
                            <CardContent className="p-0">
                              <div className="p-2">
                                {editingAlt === img.id ? (
                                  <div className="space-y-2">
                                    <input
                                      type="text"
                                      value={altTextValue}
                                      onChange={(e) => setAltTextValue(e.target.value)}
                                      placeholder="Describe this image for SEO & accessibility"
                                      className="w-full rounded border border-border bg-background px-2 py-1 text-xs"
                                      autoFocus
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          updateAltText.mutate({ id: img.id, alt_text: altTextValue });
                                        }
                                        if (e.key === "Escape") {
                                          setEditingAlt(null);
                                        }
                                      }}
                                    />
                                    <div className="flex gap-1">
                                      <button
                                        onClick={() => updateAltText.mutate({ id: img.id, alt_text: altTextValue })}
                                        className="rounded bg-primary px-2 py-0.5 text-xs text-primary-foreground hover:bg-primary/90"
                                      >
                                        Save
                                      </button>
                                      <button
                                        onClick={() => setEditingAlt(null)}
                                        className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground hover:bg-muted/80"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setEditingAlt(img.id);
                                      setAltTextValue(img.alt_text || "");
                                    }}
                                    className={`w-full truncate rounded px-1 py-0.5 text-left text-xs hover:bg-muted/50 ${
                                      img.alt_text ? "text-muted-foreground" : "italic text-destructive"
                                    }`}
                                    title={img.alt_text || "No alt text — click to add"}
                                  >
                                    {img.alt_text || "⚠ No alt text — click to add"}
                                  </button>
                                )}
                              </div>
                              <div className="flex items-center justify-between gap-2 px-2 pb-1">
                                <p className="truncate text-xs text-muted-foreground/60" title={img.file_name}>
                                  {img.file_name}
                                </p>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs text-muted-foreground">{isLive ? "Live" : "Hidden"}</span>
                                  <Switch
                                    checked={isLive}
                                    disabled={!orderingReady}
                                    onCheckedChange={(checked) => toggleActive.mutate({ id: img.id, is_active: checked })}
                                    aria-label={isLive ? "Hide image" : "Show image"}
                                  />
                                </div>
                              </div>
                              <div className="flex gap-1.5 p-2 pt-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  disabled={!orderingReady || index === 0}
                                  onClick={() => swapOrder.mutate({ a: img, b: arr[index - 1] })}
                                  aria-label="Move up"
                                >
                                  <ArrowUp className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  disabled={!orderingReady || index === arr.length - 1}
                                  onClick={() => swapOrder.mutate({ a: img, b: arr[index + 1] })}
                                  aria-label="Move down"
                                >
                                  <ArrowDown className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1"
                                  onClick={() => copyUrl(img.image_url, img.id)}
                                >
                                  {copiedId === img.id ? (
                                    <Check className="mr-1 h-3 w-3" />
                                  ) : (
                                    <Copy className="mr-1 h-3 w-3" />
                                  )}
                                  {copiedId === img.id ? "Copied" : "URL"}
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => deleteImage.mutate(img)}>
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
