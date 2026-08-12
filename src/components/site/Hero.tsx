import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSlideshow } from "./HeroSlideshow";
import { siteConfig } from "@/config/site";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Desktop-only hover spotlight: track the cursor as CSS variables on the
  // section; index.css uses them to open a soft lens in the overlay and show
  // a slightly magnified copy of the slide under the cursor.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
        el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
      });
    };
    const onEnter = () => el.setAttribute("data-spotlight", "on");
    const onLeave = () => el.removeAttribute("data-spotlight");

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-cta-location="homepage_hero"
      className="hero-spotlight relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 md:min-h-[82vh]"
    >
      <div className="absolute inset-0">
        <HeroSlideshow />
        <div className="hero-spotlight-mask absolute inset-0 bg-background/60" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-gradient-to-b from-transparent to-background" />
      <div className="container relative z-10 py-12 text-center sm:py-16 md:py-24">
        <p className="section-kicker mb-3 md:mb-4">Professional Event Production — Ireland</p>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Audio Visual Hire &amp; Event Production Ireland
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white md:mt-5 md:text-lg">
          One experienced team. Every aspect of your event covered.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row md:mt-8">
          <Button asChild size="lg">
            <Link to="/contact/">
              Plan my event <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={`tel:${siteConfig.phone}`}>
              <Phone className="mr-2 h-4 w-4" /> Call us
            </a>
          </Button>
        </div>
        <ul className="mx-auto mt-5 grid max-w-3xl grid-cols-2 gap-x-3 gap-y-2 text-left text-xs text-white/85 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-6 md:mt-7 md:text-sm">
          {["20+ years' experience", "Fully insured", "Nationwide delivery", "Reply within 24 hours"].map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" /> {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
