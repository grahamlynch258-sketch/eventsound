import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUploadImage } from "@/hooks/useSiteContent";
import { useQuery } from "@tanstack/react-query";
import { Upload } from "lucide-react";

type LibraryImage = {
  id: string;
  category: string;
  image_url: string;
  file_name: string;
  alt_text: string | null;
};

const categories = [
  { value: "service-led-walls", label: "LED Walls" },
  { value: "service-led-screen-hire", label: "LED Screen Hire" },
  { value: "service-av-production", label: "AV Production" },
  { value: "service-lighting", label: "Lighting" },
  { value: "service-staging", label: "Staging" },
  { value: "service-event-production", label: "Event Production" },
  { value: "service-video", label: "Video" },
  { value: "service-virtual", label: "Virtual Events" },
  { value: "service-conference-av", label: "Conference AV" },
  { value: "portfolio", label: "Portfolio" },
  { value: "headlines", label: "Headlines" },
  { value: "supplements", label: "Supplements" },
];

interface ImagePickerModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string) => void;
}

export default function ImagePickerModal({ open, onClose, onSelect }: ImagePickerModalProps) {
  const { toast } = useToast();
  const uploadImage = useUploadImage();
  const [filterCategory, setFilterCategory] = useState(categories[0].value);

  const { data: images } = useQuery({
    queryKey: ["library-images-picker", filterCategory],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("library_images")
        .select("*")
        .eq("category", filterCategory)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as LibraryImage[];
    },
    enabled: open,
  });

  function handleSelect(url: string) {
    onSelect(url);
    onClose();
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage.mutateAsync(file);
      handleSelect(url);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Choose Image</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="library" className="flex-1 overflow-hidden flex flex-col">
          <TabsList>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="library">Choose from Library</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="flex-1 flex items-center justify-center py-12">
            <label className="flex flex-col items-center gap-3 cursor-pointer rounded-lg border-2 border-dashed px-12 py-10 hover:bg-muted/50 transition-colors">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Click to upload an image</span>
              <span className="text-xs text-muted-foreground/60">Uploads to site-images bucket</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
              />
            </label>
          </TabsContent>

          <TabsContent value="library" className="flex-1 overflow-hidden flex flex-col gap-3">
            <div className="flex flex-wrap gap-1">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={filterCategory === cat.value ? "default" : "outline"}
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => setFilterCategory(cat.value)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto">
              {(images ?? []).length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No images in this category.
                </p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-4 p-1">
                  {(images ?? []).map((img) => (
                    <button
                      key={img.id}
                      onClick={() => handleSelect(img.image_url)}
                      className="group relative aspect-video overflow-hidden rounded-lg border bg-muted hover:ring-2 hover:ring-accent transition-all"
                    >
                      <img
                        src={img.image_url}
                        alt={img.alt_text || img.file_name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="truncate px-2 py-1 text-xs text-white">
                          {img.file_name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
