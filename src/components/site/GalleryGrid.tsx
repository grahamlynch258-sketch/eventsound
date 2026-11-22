import { cdnImage } from "@/lib/imageCdn";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { type GalleryPhoto, groupByEvent } from "@/lib/galleryBulk";

interface GalleryGridProps {
  selectedCategory: string | null;
  onCategoryChange: (cat: string | null) => void;
}

const BASE_COLUMNS = "id, title, category, image_url, alt_text";
const EVENT_COLUMNS = `${BASE_COLUMNS}, caption, event_name, location, taken_on, width, height`;

export function GalleryGrid({ selectedCategory, onCategoryChange }: GalleryGridProps) {
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["gallery-items"],
    queryFn: async (): Promise<GalleryPhoto[]> => {
      const withEvents = await supabase
        .from("gallery_items")
        .select(EVENT_COLUMNS)
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (!withEvents.error) return withEvents.data as GalleryPhoto[];

      // Before the 2026-11-22 migration has run the event columns do not
      // exist; fall back so the gallery keeps working.
      const legacy = await supabase
        .from("gallery_items")
        .select(BASE_COLUMNS)
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (legacy.error) throw legacy.error;
      return legacy.data as GalleryPhoto[];
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

  const groups = groupByEvent(filtered);
  const hasEvents = groups.some((group) => group.eventName);

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
        <div className="space-y-14">
          {groups.map((group) => (
            <div key={group.key || "more"}>
              {group.eventName ? (
                <header className="mb-5">
                  <h2 className="text-2xl font-semibold tracking-tight">{group.eventName}</h2>
                  {(group.location || group.when) && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {[group.location, group.when].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </header>
              ) : (
                hasEvents && <h2 className="mb-5 text-2xl font-semibold tracking-tight">More from our events</h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.photos.map((item) => (
                  <figure key={item.id}>
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted">
                      <img
                        {...cdnImage(item.image_url, "third")}
                        alt={item.alt_text || item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        width={item.width || 800}
                        height={item.height || 600}
                      />
                    </div>
                    {item.caption && (
                      <figcaption className="mt-2 text-sm leading-snug text-muted-foreground">{item.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
