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
      data?.forEach((item: any) => {
        values[item.key] = item.value;
        alignments[item.key] = item.alignment || "left";
      });
      return { values, alignments } as ContentData;
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
    }: {
      page: string;
      section: string;
      key: string;
      value: string;
      alignment?: string;
    }) => {
      const upsertData: any = { page, section, key, value };
      if (alignment) upsertData.alignment = alignment;
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
