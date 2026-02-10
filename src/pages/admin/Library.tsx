import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useUploadImage } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Upload, Trash2, Copy, Check } from "lucide-react";

type LibraryImage = {
  id: string;
  category: string;
  image_url: string;
  file_name: string;
  alt_text: string | null;
  created_at: string;
};

const categories = [
  { value: "headlines", label: "Headline Images" },
  { value: "supplements", label: "Supplement Images" },
  { value: "portfolio", label: "Portfolio Images" },
  { value: "logos", label: "Logos" },
];

export default function AdminLibrary() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const uploadImage = useUploadImage();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { data: images, isLoading: imagesLoading } = useQuery({
    queryKey: ["library-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("library_images")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as LibraryImage[];
    },
  });

  const deleteImage = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("library_images").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["library-images"] });
      toast({ title: "Image deleted" });
    },
  });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading || imagesLoading) {
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
    queryClient.invalidateQueries({ queryKey: ["library-images"] });
    toast({ title: "Images uploaded" });
    e.target.value = "";
  }

  function copyUrl(url: string, id: string) {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast({ title: "URL copied to clipboard" });
    setTimeout(() => setCopiedId(null), 2000);
  }

  function getImagesForCategory(category: string) {
    return images?.filter((img) => img.category === category) || [];
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

        <Tabs defaultValue="headlines">
          <TabsList className="mb-6">
            {categories.map((cat) => (
              <TabsTrigger key={cat.value} value={cat.value}>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat.value} value={cat.value}>
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

              {getImagesForCategory(cat.value).length === 0 ? (
                <Card>
                  <CardContent className="flex items-center justify-center py-12">
                    <p className="text-sm text-muted-foreground">
                      No images yet. Upload some to get started.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {getImagesForCategory(cat.value).map((img) => (
                    <Card key={img.id} className="overflow-hidden">
                      <div className="relative aspect-video bg-muted">
                        <img
                          src={img.image_url}
                          alt={img.alt_text || img.file_name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardContent className="p-3">
                        <p className="truncate text-xs text-muted-foreground mb-2">
                          {img.file_name}
                        </p>
                        <div className="flex gap-2">
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
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
