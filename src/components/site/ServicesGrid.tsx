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
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Full-service event production
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Everything you need for corporate events, conferences, galas, and live shows — delivered, installed, and operated by experienced crew.
        </p>
      </div>

      <WhatWeDoMarquee items={marqueeItems} />
    </section>
  );
}
