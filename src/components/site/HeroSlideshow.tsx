import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type Props = {
  intervalMs?: number;
};

export function HeroSlideshow({ intervalMs = 5000 }: Props) {
  // Remove the static pre-rendered hero once the React hero image is ready
  useEffect(() => {
    if (firstImageLoaded) {
      document.getElementById("hero-prerender")?.remove();
    }
  }, [firstImageLoaded]);

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
  const [hasTransitioned, setHasTransitioned] = useState(false);
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);

  const images = headlines && headlines.length > 0
    ? headlines.map((h) => ({ url: h.image_url, alt: h.alt_text || h.file_name || "Event production" }))
    : [];

  // Preload the first image before showing anything.
  // If a <link rel="preload"> already fetched it, skip the extra Image() load.
  useEffect(() => {
    if (images.length === 0) return;
    const firstUrl = images[0].url;
    const preload = document.querySelector<HTMLLinkElement>('link[rel="preload"][as="image"]');
    if (preload && preload.href === firstUrl) {
      setFirstImageLoaded(true);
      return;
    }
    const img = new Image();
    img.src = firstUrl;
    img.onload = () => setFirstImageLoaded(true);
  }, [images.length > 0 ? images[0].url : ""]);

  useEffect(() => {
    if (images.length <= 1 || !firstImageLoaded) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        prevIndexRef.current = prev;
        return (prev + 1) % images.length;
      });
      setHasTransitioned(true);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images.length, intervalMs, firstImageLoaded]);

  if (images.length === 0 || !firstImageLoaded) return null;

  // Before first transition: render ONLY the active slide.
  // This prevents off-screen slides from registering as LCP candidates.
  if (!hasTransitioned) {
    const first = images[0];
    return (
      <img
        src={first.url}
        alt={first.alt}
        loading="eager"
        decoding="sync"
        fetchPriority="high"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  // After first transition: render all slides with animation
  return (
    <>
      {images.map((img, i) => {
        const isActive = i === currentIndex;
        const isPrev = i === prevIndexRef.current;

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
              transition: (isActive || isPrev) ? "transform 0.7s ease" : "none",
            }}
          />
        );
      })}
    </>
  );
}
