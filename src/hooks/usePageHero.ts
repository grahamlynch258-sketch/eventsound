import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function usePageHero(category: string, fallback: string): string {
  const [heroUrl, setHeroUrl] = useState<string>(fallback);

  useEffect(() => {
    async function fetchHero() {
      try {
        const { data } = await supabase
          .from("library_images")
          .select("image_url")
          .eq("category", category)
          .order("created_at", { ascending: false })
          .limit(1);
        if (data && data.length > 0) setHeroUrl(data[0].image_url);
      } catch {
        // fallback image will be used
      }
    }
    fetchHero();
  }, [category, fallback]);

  return heroUrl;
}
