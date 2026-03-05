import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type Props = {
  intervalMs?: number;
};

export function HeroSlideshow({ intervalMs = 5000 }: Props) {
  const { data: headlines } = useQuery({
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
  const prevIndexRef = useRef(-1);
  const hasTransitioned = useRef(false);
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);

  const images = headlines && headlines.length > 0
    ? headlines.map((h) => ({ url: h.image_url, alt: h.alt_text || h.file_name || "Event production" }))
    : [];

  // Preload the first image before showing anything
  useEffect(() => {
    if (images.length === 0) return;
    const img = new Image();
    img.src = images[0].url;
    img.onload = () => setFirstImageLoaded(true);
  }, [images.length > 0 ? images[0].url : ""]);

  useEffect(() => {
    if (images.length <= 1 || !firstImageLoaded) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        prevIndexRef.current = prev;
        hasTransitioned.current = true;
        return (prev + 1) % images.length;
      });
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images.length, intervalMs, firstImageLoaded]);

  if (images.length === 0 || !firstImageLoaded) return null;

  return (
    <>
      {images.map((img, i) => {
        const isActive = i === currentIndex;
        const isPrev = i === prevIndexRef.current;
        const shouldAnimate = hasTransitioned.current && (isActive || isPrev);

        let transform: string;
        if (isActive) {
          transform = "translateX(0)";
        } else if (isPrev) {
          transform = "translateX(-100%)";
        } else {
          transform = "translateX(100%)";
        }

        return (
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
            style={{
              transform,
              transition: shouldAnimate ? "transform 0.7s ease" : "none",
            }}
          />
        );
      })}
    </>
  );
}
