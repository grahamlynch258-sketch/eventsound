import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface MarqueeItem {
  label: string;
  href?: string;
  icon?: LucideIcon;
}

interface WhatWeDoMarqueeProps {
  items: MarqueeItem[];
  durationSec?: number;
}

export function WhatWeDoMarquee({ items, durationSec = 20 }: WhatWeDoMarqueeProps) {
  const repeated = [...items, ...items, ...items];

  return (
    <div
      className="marquee-container relative overflow-hidden py-4"
      style={{ "--marquee-duration": `${durationSec}s` } as React.CSSProperties}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

      <div className="marquee-track flex w-max gap-3">
        {repeated.map((item, i) => {
          const Icon = item.icon;
          const inner = (
            <span className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring whitespace-nowrap">
              {Icon && (
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </span>
              )}
              {item.label}
            </span>
          );

          return item.href ? (
            <Link key={i} to={item.href} tabIndex={0}>
              {inner}
            </Link>
          ) : (
            <span key={i} tabIndex={0}>
              {inner}
            </span>
          );
        })}
      </div>
    </div>
  );
}
