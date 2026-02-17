import { Link } from "react-router-dom";

interface MarqueeItem {
  title: string;
  slug: string;
}

interface WhatWeDoMarqueeProps {
  items: MarqueeItem[];
  durationSec?: number;
}

export function WhatWeDoMarquee({ items, durationSec = 30 }: WhatWeDoMarqueeProps) {
  // Duplicate items 3x for seamless loop
  const tripleItems = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden py-8 -mx-4 sm:mx-0">
      {/* Left edge fade */}
      <div className="marquee-fade-left" />
      
      {/* Right edge fade */}
      <div className="marquee-fade-right" />
      
      {/* Marquee track */}
      <div
        className="marquee-track"
        style={{ animationDuration: `${durationSec}s` }}
      >
        {tripleItems.map((item, index) => (
          <Link
            key={`${item.slug}-${index}`}
            to={`/services#${item.slug}`}
            className="marquee-pill"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
