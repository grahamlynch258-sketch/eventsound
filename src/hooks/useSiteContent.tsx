import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SiteContent = {
  id: string;
  page: string;
  section: string;
  key: string;
  value: string;
};

export type Category = {
  id: string;
  title: string;
  image_url: string;
  link: string;
  sort_order: number;
  is_active: boolean;
};

export type ContentData = {
  values: Record<string, string>;
  alignments: Record<string, string>;
  fontSizes: Record<string, number>;
  fontColors: Record<string, string>;
  fontWeights: Record<string, string>;
  fontFamilies: Record<string, string>;
  bgColors: Record<string, string>;
  bgOpacities: Record<string, number>;
  offsetsX: Record<string, number>;
  offsetsY: Record<string, number>;
};

export function useSiteContent(page: string, section: string) {
  return useQuery({
    queryKey: ["site-content", page, section],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("page", page)
        .eq("section", section);

      if (error) throw error;

      const values: Record<string, string> = {};
      const alignments: Record<string, string> = {};
      const fontSizes: Record<string, number> = {};
      const fontColors: Record<string, string> = {};
      const fontWeights: Record<string, string> = {};
      const fontFamilies: Record<string, string> = {};
      const bgColors: Record<string, string> = {};
      const bgOpacities: Record<string, number> = {};
      const offsetsX: Record<string, number> = {};
      const offsetsY: Record<string, number> = {};
      data?.forEach((item: any) => {
        values[item.key] = item.value;
        alignments[item.key] = item.alignment || "left";
        fontSizes[item.key] = item.font_size || 16;
        fontColors[item.key] = item.font_color || "#000000";
        fontWeights[item.key] = item.font_weight || "normal";
        fontFamilies[item.key] = item.font_family || "";
        bgColors[item.key] = item.bg_color || "";
        bgOpacities[item.key] = item.bg_opacity != null ? Number(item.bg_opacity) : 1;
        offsetsX[item.key] = item.offset_x || 0;
        offsetsY[item.key] = item.offset_y || 0;
      });
      return { values, alignments, fontSizes, fontColors, fontWeights, fontFamilies, bgColors, bgOpacities, offsetsX, offsetsY } as ContentData;
    },
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;
      return data as Category[];
    },
  });
}

export function useUpdateContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      page,
      section,
      key,
      value,
      alignment,
      font_size,
      font_color,
      font_weight,
      font_family,
      bg_color,
      bg_opacity,
      offset_x,
      offset_y,
    }: {
      page: string;
      section: string;
      key: string;
      value: string;
      alignment?: string;
      font_size?: number;
      font_color?: string;
      font_weight?: string;
      font_family?: string;
      bg_color?: string;
      bg_opacity?: number;
      offset_x?: number;
      offset_y?: number;
    }) => {
      const upsertData: any = { page, section, key, value };
      if (alignment) upsertData.alignment = alignment;
      if (font_size !== undefined) upsertData.font_size = font_size;
      if (font_color !== undefined) upsertData.font_color = font_color;
      if (font_weight !== undefined) upsertData.font_weight = font_weight;
      if (font_family !== undefined) upsertData.font_family = font_family;
      if (bg_color !== undefined) upsertData.bg_color = bg_color || null;
      if (bg_opacity !== undefined) upsertData.bg_opacity = bg_opacity;
      if (offset_x !== undefined) upsertData.offset_x = offset_x;
      if (offset_y !== undefined) upsertData.offset_y = offset_y;
      const { data, error } = await supabase
        .from("site_content")
        .upsert(upsertData, { onConflict: "page,section,key" })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["site-content", variables.page, variables.section],
      });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category: Partial<Category> & { id: string }) => {
      const { data, error } = await supabase
        .from("categories")
        .update(category)
        .eq("id", category.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      category: Omit<Category, "id" | "is_active"> & { is_active?: boolean }
    ) => {
      const { data, error } = await supabase
        .from("categories")
        .insert(category)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("categories").delete().eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useUploadImage() {
  return useMutation({
    mutationFn: async (file: File) => {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("site-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("site-images").getPublicUrl(fileName);

      return publicUrl;
    },
  });
}
