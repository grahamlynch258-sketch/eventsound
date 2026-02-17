import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  primaryHref?: string;
  secondaryHref?: string;
}

export function CTASection({
  title = "Ready to elevate your next event?",
  description,
  primaryCtaLabel = "Get a Free Quote",
  secondaryCtaLabel = "View Our Services",
  primaryHref = "/contact",
  secondaryHref = "/av-production",
}: CTASectionProps) {
  const finalDescription =
    description ||
    `Tell us your date, venue, and vision. We'll come back with a clear recommendation and a transparent quote — ${siteConfig.quoteResponseSLA}.`;

  return (
    <section className="relative border-y border-border/50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="container relative py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-kicker mb-4">Ready?</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {title}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {finalDescription}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="font-semibold shadow-gold">
              <Link to={primaryHref}>
                {primaryCtaLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to={secondaryHref}>{secondaryCtaLabel}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
