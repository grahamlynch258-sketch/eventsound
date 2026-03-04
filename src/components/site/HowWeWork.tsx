import { Send, ClipboardList, Eye, Lock, Truck } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Send,
    title: "Tell Us About Your Event",
    description:
      "Submit an enquiry with the basics — date, venue, type of event, and what you're looking to achieve. You don't need to know the technical details. That's our job.",
  },
  {
    icon: ClipboardList,
    title: "Tailored Solution & Quote",
    description:
      "Our team reviews your brief and puts together a bespoke AV package with a clear, itemised quote — matched to your venue, audience size, and objectives.",
  },
  {
    icon: Eye,
    title: "See Your Event Before It Happens",
    description:
      "For larger productions, we walk you through a full pre-visualisation — equipment placement, screen sizing, stage layout — so you see exactly what to expect.",
  },
  {
    icon: Lock,
    title: "Technical Spec Locked In",
    description:
      "Once you're happy, we lock the spec. Equipment is allocated, crew is assigned, and a detailed production schedule is confirmed in writing.",
  },
  {
    icon: Truck,
    title: "Load-In & Event Day",
    description:
      "Our crew arrives ahead of schedule, builds the full production, runs a complete technical rehearsal, and stays on-site from soundcheck to load-out.",
  },
];

export default function HowWeWork() {
  return (
    <section className="bg-card/30 border-y border-border/50">
      <div className="container py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="section-kicker mb-3">Our Process</p>
          <div className="gold-rule mx-auto mb-5" />
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            How We Work
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            From first enquiry to final load-out — here's what to expect.
          </p>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block">
          {/* Connecting line */}
          <div className="relative max-w-5xl mx-auto mb-10">
            <div className="absolute top-7 left-[10%] right-[10%] h-px bg-accent/20" />
            <div className="grid grid-cols-5 gap-6">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative text-center"
                >
                  <div className="flex justify-center mb-5">
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10 shadow-[0_0_15px_rgba(var(--accent-rgb,212,175,55),0.15)]">
                      <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-background">
                        {i + 1}
                      </span>
                      <s.icon className="h-5 w-5 text-accent" />
                    </div>
                  </div>
                  <h3 className="font-serif text-base font-semibold mb-2 leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden space-y-0">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative flex gap-4 pb-8 last:pb-0"
            >
              {/* Vertical connector line */}
              {i < steps.length - 1 && (
                <div className="absolute left-7 top-14 bottom-0 w-px bg-accent/20" />
              )}
              <div className="relative flex-shrink-0">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-background">
                    {i + 1}
                  </span>
                  <s.icon className="h-5 w-5 text-accent" />
                </div>
              </div>
              <div className="pt-1">
                <h3 className="font-serif text-base font-semibold mb-1">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
