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
  /** Seconds per card — lower = faster scroll */
  intervalSec?: number;
}

export function WhatWeDoMarquee({ items, intervalSec = 3 }: WhatWeDoMarqueeProps) {
  const duration = items.length * intervalSec;

  return (
    <div className="marquee-container relative py-6">
      <div className="overflow-hidden">
        <div
          className="marquee-track flex gap-4"
          style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
        >
          {items.map((item, i) => (
            <div key={i} className="flex-shrink-0 w-72 sm:w-80">
              <ServiceCard item={item} />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {items.map((item, i) => (
            <div key={`dup-${i}`} className="flex-shrink-0 w-72 sm:w-80">
              <ServiceCard item={item} />
            </div>
          ))}
        </div>
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
