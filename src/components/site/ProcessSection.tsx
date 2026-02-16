import { MessageSquare, FileText, Truck, Headphones } from "lucide-react";

const steps = [
  { icon: MessageSquare, step: "01", title: "Brief", description: "Share your event details — date, venue, audience, and must-haves." },
  { icon: FileText, step: "02", title: "Quote", description: "We recommend a clean package and confirm pricing within 24 hours." },
  { icon: Truck, step: "03", title: "Deliver", description: "We arrive early, build clean, test everything, and hand over confidently." },
  { icon: Headphones, step: "04", title: "Support", description: "Our crew stays on-site to operate and troubleshoot — you focus on the show." },
];

export function ProcessSection() {
  return (
    <section className="bg-card/50 border-y border-border/50">
      <div className="container py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">How It Works</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            From brief to bump-out
          </h2>
          <p className="mt-4 text-muted-foreground">
            A streamlined process designed to take the stress out of event production.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.step} className="relative text-center md:text-left">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-px bg-border/50" />
              )}
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10 mb-4">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Step {s.step}</p>
              <h3 className="font-serif text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
