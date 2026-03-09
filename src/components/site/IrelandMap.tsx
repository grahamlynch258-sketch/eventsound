import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface IrelandMapProps {
  service: "led-walls" | "conference-av";
}

interface CityMarker {
  name: string;
  left: string;
  top: string;
  ledWallsPath: string;
  conferenceAvPath: string;
}

const CITIES: CityMarker[] = [
  { name: "Dublin", left: "78%", top: "48%", ledWallsPath: "/services/led-walls/dublin", conferenceAvPath: "/services/conference-av/dublin" },
  { name: "Cork", left: "46%", top: "83%", ledWallsPath: "/services/led-walls/cork", conferenceAvPath: "/services/conference-av/cork" },
  { name: "Galway", left: "20%", top: "50%", ledWallsPath: "/services/led-walls/galway", conferenceAvPath: "/services/conference-av/galway" },
  { name: "Belfast", left: "72%", top: "18%", ledWallsPath: "/services/led-walls/belfast", conferenceAvPath: "/services/conference-av/belfast" },
  { name: "Limerick", left: "30%", top: "67%", ledWallsPath: "/services/led-walls/limerick", conferenceAvPath: "/services/conference-av/limerick" },
  { name: "Athlone", left: "44%", top: "50%", ledWallsPath: "/services/led-walls/athlone", conferenceAvPath: "/services/conference-av/athlone" },
];

const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const SERVICE_LABELS = {
  "led-walls": { heading: "Find LED Wall Hire Near You", intro: "EventSound provides LED wall hire across Ireland. Select a city below to learn more about LED wall services in your area.", tooltip: "LED Wall Hire" },
  "conference-av": { heading: "Find Conference AV Near You", intro: "EventSound provides conference AV services across Ireland. Select a city below to learn more about conference AV in your area.", tooltip: "Conference AV" },
};

export function IrelandMap({ service }: IrelandMapProps) {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const labels = SERVICE_LABELS[service];

  const getCityPath = (city: CityMarker) =>
    service === "led-walls" ? city.ledWallsPath : city.conferenceAvPath;

  return (
    <ScrollReveal>
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-4 transition-transform duration-300 hover:scale-[1.05] cursor-default">
            {labels.heading}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {labels.intro}
          </p>
        </div>

        <div className="relative max-w-sm mx-auto">
          <img
            src="/images/ireland-map.jpg"
            alt="Map of Ireland showing EventSound service locations"
            className="w-full h-auto mix-blend-multiply brightness-150"
            loading="lazy"
            decoding="async"
          />

          {/* City markers */}
          {CITIES.map((city) => (
            <Link
              key={city.name}
              to={getCityPath(city)}
              className="absolute group"
              style={{ left: city.left, top: city.top, transform: "translate(-50%, -50%)" }}
              onMouseEnter={() => setHoveredCity(city.name)}
              onMouseLeave={() => setHoveredCity(null)}
            >
              {/* Pulsing ring */}
              {!reducedMotion && (
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full border-2 border-accent/40 animate-ping" />
              )}
              {/* Dot */}
              <span className="relative block h-3.5 w-3.5 rounded-full bg-accent border-2 border-background shadow-lg group-hover:scale-125 transition-transform" />
              {/* City name label */}
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[11px] font-bold text-accent whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {city.name}
              </span>

              {/* Tooltip on hover */}
              <AnimatePresence>
                {hoveredCity === city.name && (
                  <motion.span
                    initial={reducedMotion ? {} : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute -top-11 left-1/2 -translate-x-1/2 bg-card border border-border/50 rounded-lg px-3 py-1.5 text-sm text-foreground shadow-lg whitespace-nowrap z-10"
                  >
                    {city.name} — {labels.tooltip}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}
