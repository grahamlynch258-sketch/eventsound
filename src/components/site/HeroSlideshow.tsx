import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type Props = {
  fallbackImage: string;
  singleImage?: string | null;
  intervalMs?: number;
};

export function HeroSlideshow({ fallbackImage, singleImage, intervalMs = 5000 }: Props) {
  const { data: headlines, isLoading } = useQuery({
    queryKey: ["library-images", "headlines"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("library_images")
        .select("id, image_url, alt_text, file_name")
        .eq("category", "portfolio")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  // Show fallback immediately so the hero is never blank, then swap to Supabase images.
  const images = isLoading
    ? [{ url: singleImage || fallbackImage, alt: "Event production" }]
    : headlines && headlines.length > 0
      ? headlines.map((h) => ({ url: h.image_url, alt: h.alt_text || h.file_name }))
      : [{ url: singleImage || fallbackImage, alt: "Event production" }];

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  if (images.length === 0) return null;

  return (
    <>
      {images.map((img, i) => (
        <img
          key={img.url}
          src={img.url}
          alt={img.alt}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={i === 0 ? "high" : undefined}
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: i === currentIndex ? 1 : 0 }}
        />
      ))}
    </>
  );
}
