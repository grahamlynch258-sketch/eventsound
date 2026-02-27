import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface GalleryItem {
  id: string;
  title: string;
  category: string | null;
  image_url: string;
  alt_text: string;
}

interface GalleryGridProps {
  selectedCategory: string | null;
  onCategoryChange: (cat: string | null) => void;
}

export function GalleryGrid({ selectedCategory, onCategoryChange }: GalleryGridProps) {
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["gallery-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("id, title, category, image_url, alt_text")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as GalleryItem[];
    },
  });

  const categories = [
    ...new Set(items.map((i) => i.category).filter(Boolean) as string[]),
  ];

  const filtered = selectedCategory
    ? items.filter((i) => i.category === selectedCategory)
    : items;

  if (isLoading) {
    return (
      <div className="container py-12 text-center text-muted-foreground">
        Loading gallery...
      </div>
    );
  }

  return (
    <section className="container py-12">
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
              !selectedCategory
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border hover:border-accent/50"
            }`}
            onClick={() => onCategoryChange(null)}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-accent/50"
              }`}
              onClick={() => onCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">No images found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="aspect-[4/3] rounded-xl overflow-hidden bg-muted">
              <img
                src={item.image_url}
                alt={item.alt_text || item.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
