import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { serviceGridItems } from "@/content/services";
import { WhatWeDoMarquee } from "./WhatWeDoMarquee";

const marqueeItems = serviceGridItems.map((s) => ({
  label: s.title,
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

      <WhatWeDoMarquee items={marqueeItems} durationSec={18} />

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {serviceGridItems.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <Link
              to={`/services#${service.slug}`}
              className="group relative flex flex-col rounded-xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 h-full"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 mb-4 transition-colors group-hover:bg-primary/15">
                <service.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{service.description}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowUpRight className="h-3 w-3" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
