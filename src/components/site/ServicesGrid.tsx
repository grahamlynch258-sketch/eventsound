import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { serviceGridItems } from "@/content/services";
import { WhatWeDoMarquee } from "./WhatWeDoMarquee";

const marqueeItems = serviceGridItems.map((s) => ({
  label: s.title,
  description: s.description,
  icon: s.icon,
  href: `/services#${s.slug}`,
}));

export function ServicesGrid() {
  return (
    <section className="container py-20 md:py-28">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="section-kicker mb-3">What We Do</p>
        <div className="gold-rule mx-auto mb-5" />
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight transition-transform duration-300 hover:scale-[1.06] cursor-default">
          Full-service event production
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed transition-transform duration-300 hover:scale-[1.05] cursor-default">
          EventSound is your complete event production partner — from initial brief to final breakdown. We supply, install, and operate professional AV equipment for corporate events, conferences, awards nights, gala dinners, festivals, and live shows across Ireland.
        </p>
      </div>

      <WhatWeDoMarquee items={marqueeItems} />
    </section>
  );
}
