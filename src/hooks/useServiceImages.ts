import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ServiceImage {
  id: string;
  image_url: string;
  alt_text: string | null;
}

export function useServiceImages(category: string): { hero: string | null; gallery: ServiceImage[]; loading: boolean } {
  const [images, setImages] = useState<ServiceImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const { data, error } = await supabase
          .from("library_images")
          .select("id, image_url, alt_text")
          .eq("category", category)
          .order("created_at", { ascending: true });
        if (!error && data) setImages(data);
      } catch {
        // silently fail — fallback images will be used
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [category]);

  return {
    hero: images.length > 0 ? images[0].image_url : null,
    gallery: images.slice(1),
    loading,
  };
}
