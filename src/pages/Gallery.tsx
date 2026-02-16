import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/site/PageShell";
import { CTASection } from "@/components/site/CTASection";
import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxImage, setLightboxImage] = useState<{ url: string; alt: string } | null>(null);

  const { data: images, isLoading } = useQuery({
    queryKey: ["library-images-gallery"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("library_images")
        .select("id, image_url, alt_text, file_name, category")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const categories = images
    ? ["all", ...Array.from(new Set(images.map((img) => img.category)))]
    : ["all"];

  const filtered = activeCategory === "all"
    ? images
    : images?.filter((img) => img.category === activeCategory);

  return (
    <PageShell>
      <main>
        {/* Hero */}
        <section className="container py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Portfolio</p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Our work in action
            </h1>
            <p className="mt-4 text-muted-foreground">
              Browse our portfolio of corporate events, conferences, galas, and live shows delivered across Ireland.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="container pb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors capitalize ${
                  activeCategory === cat
                    ? "border-primary bg-primary/10 text-primary"
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
                <Skeleton key={i} className="aspect-[4/3] rounded-lg" />
              ))}
            </div>
          ) : filtered && filtered.length > 0 ? (
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((img) => (
                <motion.button
                  key={img.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setLightboxImage({ url: img.image_url, alt: img.alt_text || img.file_name })}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-border/50 bg-card"
                >
                  <img
                    src={img.image_url}
                    alt={img.alt_text || img.file_name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-sm font-medium text-foreground">{img.alt_text || img.file_name}</p>
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
              className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm p-4"
              onClick={() => setLightboxImage(null)}
            >
              <button
                className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setLightboxImage(null)}
                aria-label="Close lightbox"
              >
                <X className="h-6 w-6" />
              </button>
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={lightboxImage.url}
                alt={lightboxImage.alt}
                className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </PageShell>
  );
}
