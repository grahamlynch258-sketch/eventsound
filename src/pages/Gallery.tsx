import { useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { useSeo } from "@/hooks/useSeo";

const Gallery = () => {
  useSeo({
    title: "Event Production Portfolio | EventSound Ireland",
    description: "View our portfolio of successful events across Ireland. LED wall installations, lighting designs, and audio setups for corporate conferences, galas, and live shows.",
    canonical: "https://eventsound.ie/gallery",
    ogTitle: "Event Production Portfolio | EventSound Ireland",
    ogDescription: "View our portfolio of successful events across Ireland. LED wall installations, lighting designs, and audio setups."
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <PageShell>
      <PageHeader
        title="Portfolio"
        subtitle="See our work across corporate events, conferences, and live productions"
      />
      <GalleryGrid 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
    </PageShell>
  );
};

export default Gallery;