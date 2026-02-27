import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ServiceSection = {
  id: string;
  service_key: string;
  image_url: string;
  file_name: string;
  alt_text: string;
  title_attr: string | null;
  caption: string | null;
  section_heading: string | null;
  section_description: string | null;
  sort_order: number;
  created_at: string;
};

export function useServiceSections(serviceKey: string) {
  return useQuery({
    queryKey: ["service-sections", serviceKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("service_sections")
        .select("*")
        .eq("service_key", serviceKey)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as ServiceSection[];
    },
  });
}

export function useCreateServiceSection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (section: Omit<ServiceSection, "id" | "created_at">) => {
      const { error } = await supabase.from("service_sections").insert(section);
      if (error) throw error;
    },
    onSuccess: (_, v) => {
      qc.invalidateQueries({ queryKey: ["service-sections", v.service_key] });
    },
  });
}

export function useUpdateServiceSection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, serviceKey, ...updates }: Partial<ServiceSection> & { id: string; serviceKey: string }) => {
      const { error } = await supabase.from("service_sections").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_, v) => {
      qc.invalidateQueries({ queryKey: ["service-sections", v.serviceKey] });
    },
  });
}

export function useDeleteServiceSection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, serviceKey }: { id: string; serviceKey: string }) => {
      const { error } = await supabase.from("service_sections").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_, v) => {
      qc.invalidateQueries({ queryKey: ["service-sections", v.serviceKey] });
    },
  });
}

export function useSwapSectionOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ a, b }: { a: { id: string; sort_order: number }; b: { id: string; sort_order: number } }) => {
      const { error: e1 } = await supabase.from("service_sections").update({ sort_order: b.sort_order }).eq("id", a.id);
      if (e1) throw e1;
      const { error: e2 } = await supabase.from("service_sections").update({ sort_order: a.sort_order }).eq("id", b.id);
      if (e2) throw e2;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["service-sections"] });
    },
  });
}
