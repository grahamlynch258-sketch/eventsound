import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface MarqueeItem {
  label: string;
  description?: string;
  href?: string;
  icon?: LucideIcon;
}

interface WhatWeDoMarqueeProps {
  items: MarqueeItem[];
  durationSec?: number;
}

export function WhatWeDoMarquee({ items, durationSec = 30 }: WhatWeDoMarqueeProps) {
  const repeated = [...items, ...items, ...items];

  return (
    <div
      className="marquee-container relative overflow-hidden py-4"
      style={{ "--marquee-duration": `${durationSec}s` } as React.CSSProperties}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

      <div className="marquee-track flex w-max gap-4">
        {repeated.map((item, i) => {
          const Icon = item.icon;
          const card = (
            <span className="group inline-flex w-72 flex-col rounded-xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              {Icon && (
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 mb-4 transition-colors group-hover:bg-primary/15">
                  <Icon className="h-5 w-5 text-primary" />
                </span>
              )}
              <span className="font-serif text-lg font-semibold mb-2 text-foreground">{item.label}</span>
              {item.description && (
                <span className="text-sm text-muted-foreground leading-relaxed flex-1">{item.description}</span>
              )}
              <span className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowUpRight className="h-3 w-3" />
              </span>
            </span>
          );

          return item.href ? (
            <Link key={i} to={item.href} tabIndex={0} className="flex-shrink-0">
              {card}
            </Link>
          ) : (
            <span key={i} tabIndex={0} className="flex-shrink-0">
              {card}
            </span>
          );
        })}
      </div>
    </div>
  );
}
