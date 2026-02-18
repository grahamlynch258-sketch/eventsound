import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export function WhatWeDoMarquee({ items, intervalSec = 4 }: WhatWeDoMarqueeProps) {
  const visibleCount = 4;
  const [startIndex, setStartIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const advance = useCallback(() => {
    setStartIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (paused) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const id = setInterval(advance, intervalSec * 1000);
    return () => clearInterval(id);
  }, [paused, advance, intervalSec]);

  const visible: { item: MarqueeItem; originalIndex: number }[] = [];
  for (let i = 0; i < visibleCount; i++) {
    const idx = (startIndex + i) % items.length;
    visible.push({ item: items[idx], originalIndex: idx });
  }

  return (
    <div
      className="relative py-6 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="flex gap-4">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map(({ item, originalIndex }) => (
            <ServiceCard key={originalIndex} item={item} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ServiceCard({ item }: { item: MarqueeItem }) {
  const Icon = item.icon;

  const card = (
    <motion.div
      layout
      initial={{ opacity: 0, x: 300, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -300, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 200, damping: 28, mass: 1 }}
      className="group flex flex-col rounded-xl border border-border/50 bg-card p-7 transition-colors duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 h-full w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      tabIndex={0}
    >
      {Icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-5 transition-colors group-hover:bg-primary/15">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      )}
      <h3 className="font-serif text-xl font-semibold mb-3 text-foreground">{item.label}</h3>
      {item.description && (
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{item.description}</p>
      )}
      <div className="mt-5 flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        Learn more <ArrowUpRight className="h-3 w-3" />
      </div>
    </motion.div>
  );

  return item.href ? (
    <Link to={item.href} className="flex-1 min-w-0">
      {card}
    </Link>
  ) : (
    <div className="flex-1 min-w-0">
      {card}
    </div>
  );
}
