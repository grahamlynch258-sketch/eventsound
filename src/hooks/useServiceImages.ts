import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ServiceImage {
  id: string;
  image_url: string;
  alt_text: string | null;
}

export function useServiceImages(category: string): {
  hero: string | null;
  heroAlt: string | null;
  gallery: ServiceImage[];
  loading: boolean;
} {
  const [images, setImages] = useState<ServiceImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const ordered = await supabase
          .from("library_images")
          .select("id, image_url, alt_text")
          .eq("category", category)
          .eq("is_active", true)
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: true });

        if (!ordered.error && ordered.data) {
          setImages(ordered.data);
          return;
        }

        // Before the sort_order/is_active migration has run, fall back to the
        // legacy ordering so pages keep their images.
        const legacy = await supabase
          .from("library_images")
          .select("id, image_url, alt_text")
          .eq("category", category)
          .order("created_at", { ascending: true });
        if (!legacy.error && legacy.data) setImages(legacy.data);
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
    heroAlt: images.length > 0 ? images[0].alt_text : null,
    gallery: images.slice(1),
    loading,
  };
}
