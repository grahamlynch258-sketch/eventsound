import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useUploadImage } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Upload, Trash2, Copy, Check } from "lucide-react";
import ServiceSectionsManager from "@/components/admin/ServiceSectionsManager";

type LibraryImage = {
  id: string;
  category: string;
  image_url: string;
  file_name: string;
  alt_text: string | null;
  created_at: string;
};

const categories = [
  // Homepage
  { value: "portfolio", label: "🏠 Homepage Slideshow" },

  // Page Hero Images
  { value: "hero-services", label: "🖼 Services Page Hero" },
  { value: "hero-gallery", label: "🖼 Gallery Page Hero" },
  { value: "hero-case-studies", label: "🖼 Case Studies Page Hero" },
  { value: "hero-portfolio", label: "🖼 Portfolio Page Hero" },

  // Service Page Images
  { value: "service-led-walls", label: "LED Walls" },
  { value: "service-av-production", label: "AV Production" },
  { value: "service-lighting", label: "Lighting" },
  { value: "service-staging", label: "Staging" },
  { value: "service-event-production", label: "Event Production" },
  { value: "service-video", label: "Video Production" },
  { value: "service-virtual", label: "Virtual Events" },

  // Content Sections
  { value: "service-sections", label: "📝 Content Sections" },

  // General
  { value: "headlines", label: "Library" },
  { value: "supplements", label: "Supplements" },
  { value: "logos", label: "Logos" },
  { value: "hero", label: "Hero (Legacy)" },
];

export default function AdminLibrary() {
  const { user, isAdmin, loading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const uploadImage = useUploadImage();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingAlt, setEditingAlt] = useState<string | null>(null);
  const [altTextValue, setAltTextValue] = useState("");
  const [activeTab, setActiveTab] = useState("portfolio");

  const isServiceSections = activeTab === "service-sections";

  const { data: images, isLoading: imagesLoading } = useQuery({
    queryKey: ["library-images", activeTab],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("library_images")
        .select("*")
        .eq("category", activeTab)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as LibraryImage[];
    },
    enabled: !isServiceSections,
  });

  const deleteImage = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("library_images").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["library-images", activeTab] });
      toast({ title: "Image deleted" });
    },
  });

  const updateAltText = useMutation({
    mutationFn: async ({ id, alt_text }: { id: string; alt_text: string }) => {
      const { error } = await supabase
        .from("library_images")
        .update({ alt_text })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["library-images", activeTab] });
      setEditingAlt(null);
      setAltTextValue("");
    },
  });


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>, category: string) {
    const files = e.target.files;
    if (!files?.length) return;

    for (const file of Array.from(files)) {
      try {
        const url = await uploadImage.mutateAsync(file);
        const { error } = await supabase.from("library_images").insert({
          category,
          image_url: url,
          file_name: file.name,
        });
        if (error) throw error;
      } catch (error) {
        toast({
          title: "Upload failed",
          description: error instanceof Error ? error.message : "Unknown error",
          variant: "destructive",
        });
      }
    }
    queryClient.invalidateQueries({ queryKey: ["library-images", category] });
    toast({ title: "Images uploaded" });
    e.target.value = "";
  }

  function copyUrl(url: string, id: string) {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast({ title: "URL copied to clipboard" });
    setTimeout(() => setCopiedId(null), 2000);
  }

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
          Upload and organise images for use across the website. Copy a URL to use it in content or categories.
        </p>

        <Tabs defaultValue="portfolio" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
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
              <div className="mb-6">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-dashed px-4 py-3 text-sm hover:bg-muted transition-colors">
                  <Upload className="h-4 w-4" />
                  Upload to {cat.label}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleUpload(e, cat.value)}
                  />
                </label>
              </div>

              {cat.value.startsWith("hero-") && (
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 mb-4">
                  <p className="text-sm text-foreground">
                    <strong>Page Header Image:</strong> The most recently uploaded image in this category will be used as the hero banner for the{" "}
                    {cat.value === "hero-services" ? "Services" : cat.value === "hero-gallery" ? "Gallery" : cat.value === "hero-case-studies" ? "Case Studies" : "Portfolio"}{" "}
                    page. Upload a new image to replace the current one. Recommended size: 1920×800px.
                  </p>
                </div>
              )}

              {imagesLoading ? (
                <p className="text-muted-foreground py-4">Loading images...</p>
              ) : (images ?? []).length === 0 ? (
                <Card>
                  <CardContent className="flex items-center justify-center py-12">
                    <p className="text-sm text-muted-foreground">
                      No images yet. Upload some to get started.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {(images ?? []).map((img) => (
                    <Card key={img.id} className="overflow-hidden">
                      <div className="relative aspect-video bg-muted">
                        <img
                          src={img.image_url}
                          alt={img.alt_text || img.file_name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardContent className="p-0">
                        {/* Alt text editing */}
                        <div className="p-2">
                          {editingAlt === img.id ? (
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={altTextValue}
                                onChange={(e) => setAltTextValue(e.target.value)}
                                placeholder="Describe this image for SEO & accessibility"
                                className="w-full px-2 py-1 text-xs bg-background border border-border rounded"
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
                                  className="px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingAlt(null)}
                                  className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded hover:bg-muted/80"
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
                              className={`w-full text-left text-xs truncate px-1 py-0.5 rounded hover:bg-muted/50 ${
                                img.alt_text ? "text-muted-foreground" : "text-destructive italic"
                              }`}
                              title={img.alt_text || "No alt text — click to add"}
                            >
                              {img.alt_text || "⚠ No alt text — click to add"}
                            </button>
                          )}
                        </div>
                        <p className="px-2 pb-1 text-xs text-muted-foreground/60 truncate" title={img.file_name}>
                          {img.file_name}
                        </p>
                        <div className="flex gap-2 p-2 pt-1">
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
                            {copiedId === img.id ? "Copied" : "Copy URL"}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteImage.mutate(img.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
