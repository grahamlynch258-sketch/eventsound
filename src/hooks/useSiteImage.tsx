import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useSiteImage(page: string, section: string, key: string) {
  return useQuery({
    queryKey: ["site-image", page, section, key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_images")
        .select("image_url, alt_text")
        .eq("page", page)
        .eq("section", section)
        .eq("key", key)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });
}
