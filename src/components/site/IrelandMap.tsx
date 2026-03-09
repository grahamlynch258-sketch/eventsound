import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface CityMarker {
  name: string;
  x: number;
  y: number;
  ledWallsPath: string;
  conferenceAvPath: string;
}

interface IrelandMapProps {
  service: "led-walls" | "conference-av";
}

const CITIES: CityMarker[] = [
  { name: "Dublin", x: 335, y: 270, ledWallsPath: "/services/led-walls/dublin", conferenceAvPath: "/services/conference-av/dublin" },
  { name: "Cork", x: 195, y: 430, ledWallsPath: "/services/led-walls/cork", conferenceAvPath: "/services/conference-av/cork" },
  { name: "Galway", x: 130, y: 260, ledWallsPath: "/services/led-walls/galway", conferenceAvPath: "/services/conference-av/galway" },
  { name: "Belfast", x: 310, y: 145, ledWallsPath: "/services/led-walls/belfast", conferenceAvPath: "/services/conference-av/belfast" },
  { name: "Limerick", x: 170, y: 365, ledWallsPath: "/services/led-walls/limerick", conferenceAvPath: "/services/conference-av/limerick" },
  { name: "Athlone", x: 225, y: 275, ledWallsPath: "/services/led-walls/athlone", conferenceAvPath: "/services/conference-av/athlone" },
];

// Simplified Ireland outline + 32 county borders SVG paths
const IRELAND_OUTLINE = `M310,60 L340,55 L365,70 L380,95 L370,110 L355,105 L340,115 L335,130 L345,140 L360,145 L370,135 L385,140 L380,160 L365,170 L350,165 L335,175 L340,190 L355,200 L370,210 L380,230 L370,245 L355,250 L365,265 L375,275 L365,290 L350,295 L340,310 L345,325 L335,340 L350,355 L355,370 L340,385 L325,390 L310,400 L300,415 L285,420 L270,430 L260,445 L245,450 L230,445 L220,455 L205,460 L190,455 L175,445 L160,450 L145,445 L130,435 L120,420 L130,405 L145,395 L140,380 L150,365 L145,350 L135,340 L140,325 L155,315 L150,300 L140,285 L130,275 L120,260 L110,250 L100,240 L95,225 L100,210 L110,200 L120,190 L115,175 L125,165 L135,155 L130,140 L140,130 L155,125 L165,115 L175,100 L190,95 L200,85 L215,80 L225,70 L240,65 L255,60 L270,55 L285,55 L300,58 Z`;

const COUNTY_PATHS = [
  { id: "donegal", d: "M155,60 L190,55 L215,50 L240,55 L255,60 L240,65 L225,70 L215,80 L200,85 L190,95 L175,100 L165,115 L155,125 L140,130 L130,140 L120,135 L125,120 L135,105 L145,90 L155,75 Z" },
  { id: "derry", d: "M255,60 L270,55 L285,55 L300,58 L310,60 L305,75 L290,80 L275,85 L260,80 L250,70 Z" },
  { id: "antrim", d: "M310,60 L340,55 L365,70 L380,95 L370,110 L355,105 L340,115 L330,105 L320,90 L305,75 Z" },
  { id: "tyrone", d: "M250,70 L260,80 L275,85 L290,80 L305,75 L320,90 L330,105 L315,110 L300,105 L285,110 L270,105 L255,100 L245,90 Z" },
  { id: "fermanagh", d: "M220,100 L245,90 L255,100 L270,105 L260,120 L245,125 L230,120 L215,115 Z" },
  { id: "armagh", d: "M285,110 L300,105 L315,110 L330,120 L325,135 L310,130 L295,125 L285,120 Z" },
  { id: "down", d: "M330,105 L340,115 L335,130 L345,140 L360,145 L370,135 L385,140 L380,160 L365,170 L350,165 L335,175 L325,160 L325,135 L330,120 Z" },
  { id: "monaghan", d: "M270,105 L285,110 L285,120 L295,125 L290,135 L275,140 L260,135 L255,120 L260,120 Z" },
  { id: "cavan", d: "M215,115 L230,120 L245,125 L260,120 L255,120 L260,135 L275,140 L270,155 L255,160 L240,155 L225,150 L210,145 L205,130 Z" },
  { id: "leitrim", d: "M205,130 L210,145 L225,150 L240,155 L235,170 L220,175 L205,170 L195,155 L190,140 Z" },
  { id: "sligo", d: "M155,125 L165,115 L175,100 L190,95 L190,110 L195,130 L190,140 L175,145 L160,140 L150,135 Z" },
  { id: "mayo", d: "M100,140 L115,135 L130,140 L135,155 L125,165 L115,175 L100,180 L95,195 L100,210 L95,225 L85,215 L80,200 L85,185 L80,170 L85,155 L95,145 Z" },
  { id: "roscommon", d: "M175,145 L190,140 L195,155 L205,170 L220,175 L215,190 L205,205 L190,210 L175,205 L165,190 L160,175 L165,160 Z" },
  { id: "galway-county", d: "M95,225 L100,240 L110,250 L120,260 L130,275 L140,285 L150,300 L155,315 L160,325 L155,335 L145,330 L130,325 L120,315 L115,300 L105,290 L95,275 L90,260 L85,245 L90,230 Z" },
  { id: "galway-city", d: "M120,260 L130,265 L125,275 L115,270 Z" },
  { id: "longford", d: "M215,190 L220,175 L235,170 L240,180 L240,195 L230,200 L220,200 Z" },
  { id: "westmeath", d: "M230,200 L240,195 L255,195 L265,200 L270,215 L260,225 L245,225 L235,215 Z" },
  { id: "meath", d: "M270,215 L280,200 L295,195 L310,200 L325,210 L335,225 L325,240 L310,240 L295,235 L280,230 Z" },
  { id: "louth", d: "M290,135 L295,125 L310,130 L325,135 L325,160 L335,175 L325,185 L310,180 L300,170 L295,155 Z" },
  { id: "dublin-county", d: "M325,240 L335,225 L340,235 L350,250 L355,265 L345,270 L335,265 L330,255 Z" },
  { id: "kildare", d: "M280,255 L295,250 L310,255 L320,270 L310,285 L295,285 L280,275 Z" },
  { id: "offaly", d: "M225,225 L245,225 L260,225 L270,240 L265,255 L250,260 L235,255 L225,245 Z" },
  { id: "laois", d: "M250,260 L265,255 L280,255 L280,275 L275,290 L260,295 L245,290 L240,275 Z" },
  { id: "wicklow", d: "M320,270 L335,265 L345,270 L355,285 L350,300 L340,310 L330,305 L320,295 L315,280 Z" },
  { id: "carlow", d: "M295,285 L310,285 L320,295 L315,310 L305,315 L290,310 L285,300 Z" },
  { id: "kilkenny", d: "M260,295 L275,290 L285,300 L290,310 L285,325 L270,330 L255,325 L250,310 Z" },
  { id: "wexford", d: "M305,315 L315,310 L330,305 L340,310 L345,325 L335,340 L350,355 L340,370 L325,365 L310,355 L300,340 L295,325 Z" },
  { id: "clare", d: "M120,315 L140,325 L155,335 L160,345 L155,360 L145,370 L135,365 L125,355 L120,340 Z" },
  { id: "tipperary", d: "M175,310 L195,305 L215,310 L235,315 L250,310 L255,325 L250,340 L235,350 L220,355 L205,350 L190,340 L175,330 Z" },
  { id: "waterford", d: "M255,325 L270,330 L285,325 L295,325 L300,340 L290,355 L275,365 L260,360 L250,350 L250,340 Z" },
  { id: "kerry", d: "M100,365 L120,355 L135,365 L145,370 L155,380 L150,395 L140,410 L130,420 L115,425 L100,415 L90,400 L85,385 Z" },
  { id: "cork-county", d: "M130,420 L140,410 L150,395 L160,400 L175,395 L195,390 L215,395 L235,400 L250,410 L260,425 L250,440 L235,445 L220,450 L205,455 L190,450 L175,445 L160,445 L145,440 Z" },
  { id: "limerick-county", d: "M140,340 L155,335 L160,345 L175,340 L190,340 L205,350 L195,365 L180,375 L165,380 L150,375 L140,365 Z" },
];

const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const SERVICE_LABELS = {
  "led-walls": { heading: "Find LED Wall Hire Near You", intro: "EventSound provides LED wall hire across Ireland. Select a city below to learn more about LED wall services in your area.", tooltip: "LED Wall Hire", linkLabel: "LED Wall Hire" },
  "conference-av": { heading: "Find Conference AV Near You", intro: "EventSound provides conference AV services across Ireland. Select a city below to learn more about conference AV in your area.", tooltip: "Conference AV", linkLabel: "Conference AV" },
};

export function IrelandMap({ service }: IrelandMapProps) {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const mapRef = useRef<SVGSVGElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const labels = SERVICE_LABELS[service];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setActiveCity(null);
      }
    }
    if (activeCity) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [activeCity]);

  const handleCountyHover = (e: React.MouseEvent<SVGPathElement>) => {
    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTooltip({ text: "We serve all of Ireland — contact us for a quote", x, y });
  };

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

        <div className="relative max-w-md mx-auto">
          <svg
            ref={mapRef}
            viewBox="60 30 350 450"
            className="w-full h-auto"
            role="img"
            aria-label={`Interactive map of Ireland showing EventSound ${labels.linkLabel} locations`}
          >
            {COUNTY_PATHS.map((county) => (
              <path
                key={county.id}
                d={county.d}
                className="fill-muted/30 stroke-border/40 hover:fill-muted/50 transition-colors duration-200 cursor-pointer"
                strokeWidth="0.8"
                onMouseMove={handleCountyHover}
                onMouseLeave={() => setTooltip(null)}
                onClick={() => { setActiveCity(null); window.location.href = "/contact"; }}
              />
            ))}

            <path
              d={IRELAND_OUTLINE}
              className="fill-none stroke-accent/50"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {CITIES.map((city) => (
              <g key={city.name}>
                {!reducedMotion && (
                  <circle cx={city.x} cy={city.y} r="12" className="fill-none stroke-accent/40" strokeWidth="1.5">
                    <animate attributeName="r" values="8;14;8" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                )}
                <Link to={getCityPath(city)}>
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r="6"
                    className="fill-accent stroke-background cursor-pointer hover:fill-accent/80 transition-colors"
                    strokeWidth="2"
                    onMouseEnter={() => {
                      setTooltip({ text: `${city.name} — ${labels.tooltip}`, x: city.x, y: city.y - 20 });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                </Link>
                <text
                  x={city.x}
                  y={city.y - 14}
                  textAnchor="middle"
                  className="fill-foreground text-[10px] font-semibold pointer-events-none select-none"
                >
                  {city.name}
                </text>
              </g>
            ))}
          </svg>

          {/* Tooltip */}
          <AnimatePresence>
            {tooltip && (
              <motion.div
                initial={reducedMotion ? {} : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute pointer-events-none z-20 bg-card border border-border/50 rounded-lg px-3 py-1.5 text-sm text-foreground shadow-lg whitespace-nowrap"
                style={{
                  left: `${(tooltip.x / 410) * 100}%`,
                  top: `${(tooltip.y / 480) * 100}%`,
                  transform: "translate(-50%, -100%)",
                }}
              >
                {tooltip.text}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </ScrollReveal>
  );
}
