import { Link } from "react-router-dom";
import { Mic, Monitor, Lightbulb, Frame, Clapperboard, Wand2 } from "lucide-react";

const services = [
  { icon: Mic, title: "Audio", description: "Crystal-clear PA, wireless mics, foldback — tuned for your venue." },
  { icon: Monitor, title: "Visuals", description: "LED walls, projection, playback — show-ready and reliable." },
  { icon: Lightbulb, title: "Lighting", description: "Architectural washes, stage lighting, intelligent fixtures." },
  { icon: Frame, title: "Staging", description: "Custom staging, risers, set builds — safe and camera-ready." },
  { icon: Clapperboard, title: "Video Recording", description: "Multi-cam capture, live streaming, post-production." },
  { icon: Wand2, title: "Draping & Décor", description: "Pipe and drape, star cloth, scenic elements for atmosphere." },
];

export function ServicesGrid() {
  return (
    <section className="container py-20 md:py-28">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">What We Do</p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Full-service event production
        </h2>
        <p className="mt-4 text-muted-foreground">
          Everything you need for corporate events, conferences, galas, and live shows — delivered, installed, and operated by experienced crew.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.title}
            to="/contact"
            className="group relative rounded-lg border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:bg-card/80 hover:shadow-lg"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 mb-4 transition-colors group-hover:bg-primary/20">
              <service.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-serif text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-sm text-muted-foreground">{service.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
