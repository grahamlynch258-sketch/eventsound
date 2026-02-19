import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/site/PageShell";
import { CTASection } from "@/components/site/CTASection";
import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["All", "LED Walls", "Lighting", "Audio", "Staging", "Corporate"] as const;

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxImage, setLightboxImage] = useState<{ url: string; alt: string } | null>(null);

  const { data: images, isLoading } = useQuery({
    queryKey: ["gallery-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("id, title, image_url, category, alt_text, sort_order")
        .eq("is_published", true) // Only fetch published items
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const filtered = activeCategory === "All"
    ? images
    : images?.filter((img) => img.category === activeCategory);

  return (
    <PageShell>
      <main>
        {/* Hero */}
        <section className="container py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="section-kicker mb-3">Portfolio</p>
            <div className="gold-rule mb-5" />
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Our work in action
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Browse our portfolio of corporate events, conferences, galas, and live shows delivered across Ireland.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="container pb-6">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  activeCategory === cat
                    ? "border-primary bg-primary/10 text-primary shadow-gold"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Gallery grid */}
        <section className="container pb-20 md:pb-28">
          {isLoading ? (
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[4/3] rounded-xl" />
              ))}
            </div>
          ) : filtered && filtered.length > 0 ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {filtered.map((img, i) => (
                <motion.button
                  key={img.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => setLightboxImage({ url: img.image_url, alt: img.alt_text || img.title })}
                  className="group relative w-full overflow-hidden rounded-xl border border-border/50 bg-card break-inside-avoid"
                >
                  <img
                    src={img.image_url}
                    alt={img.alt_text || img.title}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{img.alt_text || img.title}</p>
                      {img.category && (
                        <p className="text-xs text-primary capitalize mt-0.5">{img.category}</p>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              <p>No images in this category yet.</p>
            </div>
          )}
        </section>

        <CTASection />

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md p-4"
              onClick={() => setLightboxImage(null)}
            >
              <button
                className="absolute top-6 right-6 p-2.5 rounded-full bg-card/80 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setLightboxImage(null)}
                aria-label="Close lightbox"
              >
                <X className="h-5 w-5" />
              </button>
              <motion.img
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={lightboxImage.url}
                alt={lightboxImage.alt}
                className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </PageShell>
  );
}