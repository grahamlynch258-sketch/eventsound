import { useEffect, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { useSeo } from "@/hooks/useSeo";
import { useServiceImages } from "@/hooks/useServiceImages";

const Gallery = () => {
  useSeo({
    title: "Event Production Portfolio | EventSound Ireland",
    description: "Photos from EventSound events across Ireland. LED video walls, stage lighting, PA systems & staging at conferences, concerts, festivals & corporate events.",
    canonical: "https://eventsound.ie/gallery",
    ogTitle: "Event Production Portfolio | EventSound Ireland",
    ogDescription: "View our portfolio of successful events across Ireland. LED wall installations, lighting designs, and audio setups."
  });

  // The build writes an ImageGallery schema into this page's static HTML
  // (scripts/prerender.mjs). Take it out when the visitor moves to another
  // page inside the app, where it no longer applies.
  useEffect(() => () => document.getElementById("gallery-schema")?.remove(), []);

  const { hero, heroAlt } = useServiceImages("hero-gallery");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <PageShell>
      <PageHeader
        title="Portfolio"
        subtitle="See our work across corporate events, conferences, and live productions"
        backgroundImage={hero}
        backgroundAlt={heroAlt ?? "Professional event production setup — EventSound portfolio"}
      />
      <GalleryGrid 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
    </PageShell>
  );
};

export default Gallery;