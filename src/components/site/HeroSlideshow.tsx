import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type Props = {
  intervalMs?: number;
};

type Slide = { id: string; image_url: string; alt_text: string | null; file_name: string };

// Every mounted slide is downloaded by the browser (they sit in the viewport,
// so loading="lazy" never defers them). Cap the rotation and only mount the
// slides taking part in the current transition.
const MAX_SLIDES = 12;

export function HeroSlideshow({ intervalMs = 5000 }: Props) {
  const { data: headlines } = useQuery({
    queryKey: ["library-images", "portfolio"],
    queryFn: async (): Promise<Slide[]> => {
      const ordered = await supabase
        .from("library_images")
        .select("id, image_url, alt_text, file_name")
        .eq("category", "portfolio")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true })
        .limit(MAX_SLIDES);
      if (!ordered.error) return ordered.data;

      // Before the sort_order/is_active migration has run, fall back to the
      // legacy ordering so the slideshow keeps working.
      const legacy = await supabase
        .from("library_images")
        .select("id, image_url, alt_text, file_name")
        .eq("category", "portfolio")
        .order("created_at", { ascending: true })
        .limit(MAX_SLIDES);
      if (legacy.error) throw legacy.error;
      return legacy.data;
    },
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const prevIndexRef = useRef(-1);
  const [hasTransitioned, setHasTransitioned] = useState(false);
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);
  // While a slide animation is running, the hover-spotlight lens is hidden so
  // its static magnified content never fights the sliding background.
  const [isSliding, setIsSliding] = useState(false);
  const slideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      setIsSliding(true);
      if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
      slideTimerRef.current = setTimeout(() => setIsSliding(false), 750);
    }, intervalMs);
    return () => {
      clearInterval(timer);
      if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
    };
  }, [images.length, intervalMs, firstImageLoaded]);

  if (images.length === 0 || !firstImageLoaded) return null;

  // Duplicate of the active slide shown only inside the hover-spotlight lens
  // (see .hero-spotlight-zoom in index.css). Same URL as the visible slide, so
  // it costs no extra download; opacity 0 keeps it out of LCP candidates.
  const spotlightZoom = (url: string) => (
    <img
      src={url}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      width={1920}
      height={1080}
      className={`hero-spotlight-zoom${isSliding ? " is-sliding" : ""}`}
    />
  );

  // Before first transition: render ONLY the active slide.
  // This prevents off-screen slides from registering as LCP candidates.
  if (!hasTransitioned) {
    const first = images[0];
    return (
      <>
        <img
          src={first.url}
          alt={first.alt}
          loading="eager"
          decoding="sync"
          // React 18 drops the camelCase fetchPriority prop (and warns); the
          // browser only honours the lowercase DOM attribute.
          {...({ fetchpriority: "high" } as Record<string, string>)}
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {spotlightZoom(first.url)}
      </>
    );
  }

  // After the first transition, mount only the slides involved in the
  // animation: previous (sliding out), current (sliding in), and next
  // (pre-loading off-screen for the upcoming transition).
  const nextIndex = (currentIndex + 1) % images.length;

  return (
    <>
      {images.map((img, i) => {
        const isActive = i === currentIndex;
        const isPrev = i === prevIndexRef.current;
        const isNext = i === nextIndex;
        if (!isActive && !isPrev && !isNext) return null;

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
            {...(i === 0 ? ({ fetchpriority: "high" } as Record<string, string>) : {})}
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
      {spotlightZoom(images[currentIndex].url)}
    </>
  );
}
