import { Link } from "react-router-dom";
import { CheckCircle2, ExternalLink, Phone } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { siteConfig } from "@/config/site";

interface ProofItem {
  title: string;
  description: string;
  href?: string;
}

interface ServiceEnquirySectionProps {
  serviceName: string;
  heading: string;
  description: string;
  included: string[];
  proof: ProofItem;
}

export function ServiceEnquirySection({
  serviceName,
  heading,
  description,
  included,
  proof,
}: ServiceEnquirySectionProps) {
  return (
    <section id="quote-form" className="scroll-mt-24 border-y border-border/50 bg-card/30 py-16 md:py-20">
      <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div>
          <p className="section-kicker mb-3">Plan with confidence</p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">{description}</p>

          <ul className="mt-7 space-y-3">
            {included.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-xl border border-accent/25 bg-background/70 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Relevant project</p>
            <h3 className="mt-2 text-lg font-semibold">{proof.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{proof.description}</p>
            {proof.href && (
              <Link to={proof.href} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
                View the project <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            )}
          </div>

          <a href={`tel:${siteConfig.phone}`} className="mt-6 inline-flex items-center gap-2 font-semibold text-accent hover:underline">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Prefer to talk? Call us on {siteConfig.phoneDisplay}
          </a>
        </div>

        <div className="rounded-xl border border-accent/30 bg-background p-5 shadow-lg md:p-8">
          <h3 className="text-2xl font-semibold">Tell us about your event</h3>
          <p className="mb-6 mt-2 text-sm text-muted-foreground">You do not need a technical specification. The event basics are enough to start.</p>
          <ContactForm defaultServices={[serviceName]} formContext={serviceName} />
        </div>
      </div>
    </section>
  );
}
