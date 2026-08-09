import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { serviceGridItems } from "@/content/services";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ServicesGrid() {
  return (
    <section className="container py-20 md:py-28">
      <ScrollReveal>
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="section-kicker mb-3">What We Do</p>
          <div className="gold-rule mx-auto mb-5" />
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">One production partner, every technical detail</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Choose a specialist service or let EventSound design and operate the complete production—from the first site question to final load-out.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {serviceGridItems.map((service) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.slug}
              to={service.href}
              className="group flex min-h-[210px] flex-col rounded-xl border border-border/50 bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent/35 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 transition-colors group-hover:bg-accent/15">
                <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-semibold">{service.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                Explore service <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
