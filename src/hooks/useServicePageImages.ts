import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ServicePageImageSlot = {
  id: string;
  page_slug: string;
  slot_id: string;
  slot_label: string;
  image_url: string | null;
  alt_text: string | null;
  display_order: number;
};

export function useServicePageImages(pageSlug: string) {
  return useQuery({
    queryKey: ["service-page-images", pageSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("service_page_images")
        .select("*")
        .eq("page_slug", pageSlug)
        .order("display_order");

      if (error) throw error;
      return data as ServicePageImageSlot[];
    },
  });
}
