import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Award, GraduationCap, Monitor, Music, Presentation, Video } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  cityPages,
  homeCoverage,
  homeEventTypes,
  homeFaqs,
  homeIntro,
  homeProcess,
  homeProof,
} from "@/content/home";

// The homepage sections below the services grid. All copy lives in
// src/content/home.ts; nothing here loads data, so the sections are in the
// page the moment it renders (and in the static snapshot crawlers read).

function SectionHeading({ kicker, heading, intro }: { kicker: string; heading: string; intro?: string }) {
  return (
    <ScrollReveal>
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className="section-kicker mb-3">{kicker}</p>
        <div className="gold-rule mx-auto mb-5" />
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h2>
        {intro && <p className="mt-4 leading-relaxed text-muted-foreground">{intro}</p>}
      </div>
    </ScrollReveal>
  );
}

export function HomeIntro() {
  return (
    <section className="border-y border-border/50 bg-card/30">
      <div className="container py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="section-kicker mb-3">{homeIntro.kicker}</p>
          <div className="gold-rule mb-5" />
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{homeIntro.heading}</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90 md:text-lg">
            {homeIntro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
            {homeIntro.links.map((link) => (
              <Link key={link.href} to={link.href} className="inline-flex items-center gap-1.5 font-semibold text-accent hover:underline">
                {link.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const EVENT_ICONS: Record<string, LucideIcon> = {
  conferences: Presentation,
  outdoor: Music,
  launches: Award,
  hybrid: Video,
  theatre: GraduationCap,
  hire: Monitor,
};

export function HomeEventTypes() {
  return (
    <section className="container py-20 md:py-28">
      <SectionHeading kicker={homeEventTypes.kicker} heading={homeEventTypes.heading} intro={homeEventTypes.intro} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {homeEventTypes.items.map((item) => {
          const Icon = EVENT_ICONS[item.key] ?? Presentation;
          return (
            <div key={item.key} className="flex flex-col rounded-xl border border-border/50 bg-card p-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              <Link to={item.href} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
                {item.linkLabel} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function HomeProof() {
  return (
    <section className="container py-20 md:py-28">
      <SectionHeading kicker={homeProof.kicker} heading={homeProof.heading} intro={homeProof.intro} />
      <ul className="mx-auto max-w-4xl divide-y divide-border/50 rounded-xl border border-border/50 bg-card">
        {homeProof.items.map((item) => (
          <li key={item.key}>
            <Link
              to={item.href}
              className="group flex flex-col gap-1 p-6 transition-colors hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex-row sm:items-center sm:gap-6"
            >
              <div className="sm:w-2/5">
                <h3 className="font-serif text-lg font-semibold group-hover:text-accent">{item.title}</h3>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.where}</p>
              </div>
              <p className="flex-1 text-sm leading-relaxed text-foreground/90">{item.text}</p>
              <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-accent">
                Case study <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-6 max-w-4xl text-center text-sm text-muted-foreground">
        {homeProof.clients}{" "}
        <Link to="/case-studies/" className="font-semibold text-accent hover:underline">See all case studies</Link>
      </p>
    </section>
  );
}

const citySlug = (city: string) => city.toLowerCase();

export function HomeCoverage() {
  return (
    <section className="border-y border-border/50 bg-card/30">
      <div className="container py-20 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-kicker mb-3">{homeCoverage.kicker}</p>
          <div className="gold-rule mx-auto mb-5" />
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{homeCoverage.heading}</h2>
          {homeCoverage.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mt-5 leading-relaxed text-foreground/90 md:text-lg">{paragraph}</p>
          ))}
          <div className="mt-8 grid gap-6 text-left sm:grid-cols-2">
            {[
              { label: homeCoverage.ledLabel, base: "/services/led-walls/" },
              { label: homeCoverage.conferenceLabel, base: "/services/conference-av/" },
            ].map((group) => (
              <div key={group.base} className="rounded-xl border border-border/50 bg-card p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{group.label}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {cityPages.map((city) => (
                    <li key={city}>
                      <Link
                        to={`${group.base}${citySlug(city)}/`}
                        className="inline-block rounded-full border border-border px-3.5 py-1.5 text-sm transition-colors hover:border-accent/60 hover:text-accent"
                      >
                        {city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeProcess() {
  return (
    <section className="container py-20 md:py-28">
      <SectionHeading kicker={homeProcess.kicker} heading={homeProcess.heading} />
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {homeProcess.steps.map((step, index) => (
          <li key={step.title} className="rounded-xl border border-border/50 bg-card p-6">
            <p className="font-serif text-3xl font-semibold text-accent" aria-hidden="true">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function HomeFaq() {
  return (
    <section className="border-t border-border/50 bg-card/30">
      <div className="container py-20 md:py-24">
        <SectionHeading kicker="FAQ" heading="Questions we are asked most" />
        <div className="mx-auto max-w-3xl space-y-4">
          {homeFaqs.map((faq) => (
            <div key={faq.question} className="rounded-xl border border-border/50 bg-card p-6">
              <h3 className="text-lg font-semibold text-accent">{faq.question}</h3>
              <p className="mt-2 leading-relaxed text-foreground/90">{faq.answer}</p>
            </div>
          ))}
          <p className="pt-2 text-center text-sm text-muted-foreground">
            <Link to="/faq/" className="font-semibold text-accent hover:underline">More questions answered</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
