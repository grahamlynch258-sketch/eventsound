import { Shield, Clock, Award, Users } from "lucide-react";

const stats = [
  { icon: Award, label: "Years Experience", value: "15+" },
  { icon: Users, label: "Events Delivered", value: "500+" },
  { icon: Shield, label: "Fully Insured", value: "100%" },
  { icon: Clock, label: "Response Time", value: "<24h" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border/50 bg-card/50">
      <div className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
