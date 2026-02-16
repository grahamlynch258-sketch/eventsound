import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Define the shape of content from the database
interface DbContent {
  page: string;
  section: string;
  field: string;
  value: string | null;
}

// Define fallback content structure
interface ContentFallbacks {
  [key: string]: {
    [field: string]: string;
  };
}

/**
 * Typed content mapper with graceful fallbacks
 * Fetches content from site_content table or returns fallback values
 */
export function usePageContent(
  page: string,
  sections: string[],
  fallbacks: ContentFallbacks
) {
  const { data: rawContent, isLoading } = useQuery({
    queryKey: ["site_content", page, sections],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("page, section, field, value")
        .eq("page", page)
        .in("section", sections);

      if (error) throw error;
      return data as DbContent[];
    },
    // Return empty array on error to gracefully fall back
    retry: false,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  /**
   * Get content value for a specific section and field
   * Falls back to provided fallback if not found in database
   */
  const getContent = (section: string, field: string): string => {
    // Try to find in database content first
    if (rawContent) {
      const dbValue = rawContent.find(
        (item) => item.section === section && item.field === field
      )?.value;
      
      if (dbValue !== null && dbValue !== undefined) {
        return dbValue;
      }
    }

    // Fall back to provided fallback
    const fallbackValue = fallbacks[section]?.[field];
    return fallbackValue ?? "";
  };

  return {
    getContent,
    isLoading,
  };
}
