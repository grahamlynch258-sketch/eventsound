import { Shield, Clock, Award, Users } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Award, label: "Years Experience", value: "15+" },
  { icon: Users, label: "Events Delivered", value: "500+" },
  { icon: Shield, label: "Fully Insured", value: "100%" },
  { icon: Clock, label: "Response Time", value: "<24h" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border/50 bg-card/30">
      <div className="container py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground tracking-tight">{stat.value}</p>
                <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
