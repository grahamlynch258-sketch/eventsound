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
          EventSound provides end-to-end event production and AV equipment hire for corporate events, conferences, awards ceremonies, gala dinners, and live shows across Ireland. As your dedicated production partner, we go beyond simple equipment hire — every piece of kit is delivered, installed, tested, and operated by our experienced crew. We work closely with your team from planning through to wrap, so you can focus on your event while we handle the technical production.
        </p>
      </div>

      <WhatWeDoMarquee items={marqueeItems} />
    </section>
  );
}
