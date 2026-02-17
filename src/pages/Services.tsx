import { PageShell } from "@/components/site/PageShell";
import { CTASection } from "@/components/site/CTASection";
import { services } from "@/content/services";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { CMS_PAGES, CMS_SECTIONS } from "@/lib/cmsKeys";

export default function Services() {
  const { data: heroData } = useSiteContent(CMS_PAGES.services, CMS_SECTIONS.services.hero);
  const { data: itemsData } = useSiteContent(CMS_PAGES.services, CMS_SECTIONS.services.items);

  const heroTitle = heroData?.values?.headline || "Comprehensive Event Production";
  const heroDescription =
    heroData?.values?.subheadline ||
    "From audio and lighting to LED video walls and staging — everything you need for flawless events, delivered and operated by experienced crew.";

  return (
    <PageShell>
      <main>
        <section className="container py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="section-kicker mb-3">Our Services</p>
            <div className="gold-rule mb-5" />
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              {heroTitle}
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {heroDescription}
            </p>
          </div>
        </section>

        <section className="container pb-20 md:pb-28">
          <div className="space-y-8">
            {services.map((service, i) => {
              // CMS override keys: service_<slug>_summary
              const cmsKey = `service_${service.slug.replace(/-/g, "_")}_summary`;
              const cmsSummary = itemsData?.values?.[cmsKey];
              const description = cmsSummary || service.description;

              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  id={service.slug}
                  className="rounded-xl border border-border/50 bg-card p-6 md:p-8 scroll-mt-24"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                      <service.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-semibold">{service.title}</h2>
                      <p className="text-sm text-muted-foreground mt-1">{service.shortDescription}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {description}
                  </p>
                  <ul className="grid gap-2 md:grid-cols-2 mb-6">
                    {service.features.map((f) => (
                      <li key={f} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/contact">
                      Get a Quote <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </section>

        <CTASection />
      </main>
    </PageShell>
  );
}
