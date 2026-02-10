import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useUploadImage } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Upload, Trash2 } from "lucide-react";
import ImageLibraryPicker from "@/components/admin/ImageLibraryPicker";

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

export default function AdminImages() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const uploadImage = useUploadImage();

  const { data: images, isLoading: imagesLoading } = useQuery({
    queryKey: ["site-images"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_images").select("*");
      if (error) throw error;
      return data as SiteImage[];
    },
  });

  const updateImage = useMutation({
    mutationFn: async ({
      page,
      section,
      key,
      image_url,
      alt_text,
    }: {
      page: string;
      section: string;
      key: string;
      image_url: string;
      alt_text?: string;
    }) => {
      const { data, error } = await supabase
        .from("site_images")
        .upsert({ page, section, key, image_url, alt_text }, { onConflict: "page,section,key" })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-images"] });
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

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    slot: (typeof imageSlots)[0]
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadImage.mutateAsync(file);
      await updateImage.mutateAsync({
        page: slot.page,
        section: slot.section,
        key: slot.key,
        image_url: url,
      });
      toast({ title: "Image updated" });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  }

  function getImageForSlot(slot: (typeof imageSlots)[0]) {
    return images?.find(
      (img) => img.page === slot.page && img.section === slot.section && img.key === slot.key
    );
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
          <h1 className="text-lg font-semibold">Manage Images</h1>
        </div>
      </header>

      <main className="container py-8">
        <p className="mb-6 text-muted-foreground">
          Upload and manage hero images and backgrounds across the site.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {imageSlots.map((slot) => {
            const image = getImageForSlot(slot);
            return (
              <Card key={`${slot.page}-${slot.section}-${slot.key}`}>
                <CardHeader>
                  <CardTitle className="text-base">{slot.label}</CardTitle>
                  <CardDescription>
                    {slot.page} / {slot.section}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {image?.image_url ? (
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <img
                        src={image.image_url}
                        alt={image.alt_text || slot.label}
                        className="h-full w-full object-cover"
                      />
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
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleUpload(e, slot)}
                      />
                    </label>
                    <ImageLibraryPicker
                      onSelect={async (url) => {
                        await updateImage.mutateAsync({
                          page: slot.page,
                          section: slot.section,
                          key: slot.key,
                          image_url: url,
                        });
                        toast({ title: "Image updated from library" });
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
