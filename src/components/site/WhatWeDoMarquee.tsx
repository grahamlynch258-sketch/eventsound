import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface MarqueeItem {
    label: string;
    href?: string;
}

interface WhatWeDoMarqueeProps {
    items: MarqueeItem[];
    /** Total scroll duration in seconds (default 32) */
  durationSec?: number;
    className?: string;
}

/**
 * Horizontally-scrolling pill row.
 * - CSS-only animation via `marquee-track` class (keyframes in index.css).
 * - Pauses on hover / keyboard focus-within.
 * - prefers-reduced-motion: renders a plain overflow-x-auto scrollable row instead.
 * - Duplicates list 2× so the loop is seamless (translateX(-50%) trick).
 */
export function WhatWeDoMarquee({
    items,
    durationSec = 32,
    className,
}: WhatWeDoMarqueeProps) {
    // Double the array so the second copy slides into view as the first exits
  const doubled = [...items, ...items];

  return (
        <div
                className={cn(
                          "relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden",
                          className,
                        )}
                aria-label="Services marquee"
              >
          {/* Left fade */}
              <div
                        className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10"
                        style={{
                                    background:
                                                  "linear-gradient(to right, hsl(var(--background)) 0%, transparent 100%)",
                        }}
                      />
          {/* Right fade */}
              <div
                        className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10"
                        style={{
                                    background:
                                                  "linear-gradient(to left, hsl(var(--background)) 0%, transparent 100%)",
                        }}
                      />
        
          {/*
                  Normal-motion: animated track.
                          reduced-motion: plain overflow-x-auto row (single copy, no animation).
                                */}
              <div className="py-4">
                {/* Animated row — hidden when reduced-motion prefers it */}
                      <div
                                  className="marquee-track motion-reduce:hidden flex gap-3 w-max"
                                  style={
                                    { "--marquee-duration": `${durationSec}s` } as React.CSSProperties
                                  }
                                >
                        {doubled.map((item, i) => (
                                              <Pill key={i} item={item} />
                                            ))}
                      </div>div>
              
                {/* Accessible reduced-motion fallback — overflow-x-auto single row */}
                      <div className="hidden motion-reduce:flex overflow-x-auto gap-3 px-4 pb-1 snap-x snap-mandatory scrollbar-none">
                        {items.map((item, i) => (
                            <Pill key={i} item={item} snap />
                          ))}
                      </div>div>
              </div>div>
        </div>div>
      );
}

function Pill({ item, snap }: { item: MarqueeItem; snap?: boolean }) {
    const base = cn(
          "shrink-0 inline-flex items-center rounded-full border border-white/10 bg-white/5",
          "px-4 py-2 text-sm font-medium text-muted-foreground",
          "transition-all duration-150",
          "hover:bg-white/10 hover:border-white/20 hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          snap && "snap-start",
        );
  
    if (item.href) {
          return (
                  <Link to={item.href} className={base}>
                    {item.label}
                  </Link>Link>
                );
    }
    return <span className={base}>{item.label}</span>span>;
}</div>
