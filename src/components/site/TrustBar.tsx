import { Shield, Clock, Award, Users } from "lucide-react";
import { motion } from "framer-motion";

type TrustItem = { value: string; label: string };

const ICONS = [Award, Users, Shield, Clock];

const DEFAULT_ITEMS: TrustItem[] = [
  { value: "End-to-End", label: "Full-Service Production" },
  { value: "Expert", label: "Experienced Crew" },
  { value: "100%", label: "Fully Insured" },
  { value: "<24h", label: "Quote Response" },
];

export function TrustBar({ items }: { items?: TrustItem[] }) {
  const safeItems =
    Array.isArray(items) && items.filter((i) => i?.value && i?.label).length > 0
      ? items.filter((i) => i?.value && i?.label)
      : DEFAULT_ITEMS;

  return (
    <section className="border-y border-border/50 bg-card/30">
      <div className="container py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {safeItems.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-center gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground tracking-tight">
                    {item.value}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
