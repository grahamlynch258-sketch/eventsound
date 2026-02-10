import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { FolderOpen } from "lucide-react";

type LibraryImage = {
  id: string;
  category: string;
  image_url: string;
  file_name: string;
  alt_text: string | null;
};

const categories = [
  { value: "headlines", label: "Headlines" },
  { value: "supplements", label: "Supplements" },
  { value: "portfolio", label: "Portfolio" },
  { value: "logos", label: "Logos" },
];

interface ImageLibraryPickerProps {
  onSelect: (url: string) => void;
  trigger?: React.ReactNode;
}

export default function ImageLibraryPicker({ onSelect, trigger }: ImageLibraryPickerProps) {
  const [open, setOpen] = useState(false);

  const { data: images } = useQuery({
    queryKey: ["library-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("library_images")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as LibraryImage[];
    },
    enabled: open,
  });

  function handleSelect(url: string) {
    onSelect(url);
    setOpen(false);
  }

  function getImagesForCategory(category: string) {
    return images?.filter((img) => img.category === category) || [];
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <FolderOpen className="h-4 w-4" />
            Choose from Library
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Choose from Image Library</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="headlines" className="flex-1 overflow-hidden flex flex-col">
          <TabsList>
            {categories.map((cat) => (
              <TabsTrigger key={cat.value} value={cat.value}>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((cat) => (
            <TabsContent key={cat.value} value={cat.value} className="flex-1 overflow-y-auto">
              {getImagesForCategory(cat.value).length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No images in this category yet.
                </p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-4 p-1">
                  {getImagesForCategory(cat.value).map((img) => (
                    <button
                      key={img.id}
                      onClick={() => handleSelect(img.image_url)}
                      className="group relative aspect-video overflow-hidden rounded-lg border bg-muted hover:ring-2 hover:ring-primary transition-all"
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
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
