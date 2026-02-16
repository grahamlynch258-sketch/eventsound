import { PageShell } from "@/components/site/PageShell";
import { CTASection } from "@/components/site/CTASection";
import { about } from "@/content/about";
import { Shield } from "lucide-react";

export default function HealthAndSafety() {
  return (
    <PageShell>
      <main>
        <section className="container py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="section-kicker mb-3">Compliance</p>
            <div className="gold-rule mb-5" />
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Health & Safety
            </h1>
          </div>
        </section>

        <section className="container pb-20 md:pb-28">
          <div className="max-w-3xl">
            <div className="rounded-xl border border-border/50 bg-card p-6 md:p-10">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-6">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{about.healthAndSafety.body}</p>
                <p className="text-sm italic">{about.healthAndSafety.cta}</p>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
    </PageShell>
  );
}
