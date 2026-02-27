import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";

interface MarqueeItem {
  label: string;
  description?: string;
  href?: string;
  icon?: LucideIcon;
}

interface WhatWeDoMarqueeProps {
  items: MarqueeItem[];
  intervalSec?: number;
}

export function WhatWeDoMarquee({ items, intervalSec = 2 }: WhatWeDoMarqueeProps) {
  const [visibleCount, setVisibleCount] = useState(4);
  const [startIndex, setStartIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [slideOffset, setSlideOffset] = useState(0);

  const pausedRef = useRef(paused);
  const animatingRef = useRef(animating);
  const hoveredRef = useRef(false);
  pausedRef.current = paused;
  animatingRef.current = animating;

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const getItems = (start: number, count: number) => {
    const result: { item: MarqueeItem; key: number }[] = [];
    for (let i = 0; i < count; i++) {
      const idx = (((start + i) % items.length) + items.length) % items.length;
      result.push({ item: items[idx], key: start + i });
    }
    return result;
  };

  const navigate = useCallback(
    (dir: "left" | "right") => {
      if (animatingRef.current) return;
      setDirection(dir);
      setAnimating(true);
      setSlideOffset(dir === "left" ? -(100 / visibleCount) : 100 / visibleCount);
    },
    [visibleCount]
  );

  const handleTransitionEnd = useCallback(() => {
    setStartIndex((prev) => {
      if (direction === "left") {
        return (prev + 1 + items.length) % items.length;
      } else {
        return (prev - 1 + items.length) % items.length;
      }
    });
    setSlideOffset(0);
    setAnimating(false);
    if (hoveredRef.current) {
      setPaused(true);
    }
  }, [direction, items.length]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const id = setInterval(() => {
      if (!pausedRef.current && !animatingRef.current && !hoveredRef.current) {
        navigate("left");
      }
    }, intervalSec * 1000);
    return () => clearInterval(id);
  }, [navigate, intervalSec]);

  const displayStart =
    direction === "right" && animating
      ? (startIndex - 1 + items.length) % items.length
      : startIndex;
  const displayItems = getItems(displayStart, visibleCount + 1);
  const cardWidthPct = 100 / visibleCount;

  return (
    <div
      className="relative py-6"
      onMouseEnter={() => {
        hoveredRef.current = true;
        setPaused(true);
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
        if (!animatingRef.current) {
          setPaused(false);
        }
      }}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      <div className="overflow-hidden">
        <div
          className="flex"
          style={{
            transform: `translateX(${slideOffset}%)`,
            transition: animating ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
            willChange: "transform",
            pointerEvents: animating ? "none" : "auto",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {displayItems.map(({ item, key }) => (
            <div key={key} className="flex-shrink-0 px-2" style={{ width: `${cardWidthPct}%` }}>
              <ServiceCard item={item} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => navigate("right")}
        disabled={animating}
        aria-label="Previous"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border/50 shadow-md text-foreground hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-40"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={() => navigate("left")}
        disabled={animating}
        aria-label="Next"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border/50 shadow-md text-foreground hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-40"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="flex justify-center gap-1.5 mt-5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (!animating) setStartIndex(i);
            }}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === startIndex ? "w-6 bg-accent" : "w-1.5 bg-border hover:bg-accent/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ServiceCard({ item }: { item: MarqueeItem }) {
  const Icon = item.icon;
  const card = (
    <div
      className="group relative flex flex-col rounded-xl border border-border/50 bg-card p-7 min-h-[220px] transition-colors duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      tabIndex={0}
    >
      {Icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-5 transition-colors group-hover:bg-accent/15">
          <Icon className="h-6 w-6 text-accent" />
        </div>
      )}
      <h3 className="font-serif text-xl font-semibold mb-3 text-foreground">{item.label}</h3>
      {item.description && (
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{item.description}</p>
      )}
      <div className="absolute bottom-7 left-7 flex items-center gap-1 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
        Learn more <ArrowUpRight className="h-3 w-3" />
      </div>
    </div>
  );

  return item.href ? (
    <Link to={item.href} className="block h-full">
      {card}
    </Link>
  ) : (
    <div className="h-full">{card}</div>
  );
}
