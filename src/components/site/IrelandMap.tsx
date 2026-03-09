import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface IrelandMapProps {
  service: "led-walls" | "conference-av";
}

interface CityMarker {
  name: string;
  x: number;
  y: number;
  ledWallsPath: string;
  conferenceAvPath: string;
}

const CITIES: CityMarker[] = [
  { name: "Dublin", x: 354, y: 250, ledWallsPath: "/services/led-walls/dublin", conferenceAvPath: "/services/conference-av/dublin" },
  { name: "Cork", x: 252, y: 416, ledWallsPath: "/services/led-walls/cork", conferenceAvPath: "/services/conference-av/cork" },
  { name: "Galway", x: 122, y: 266, ledWallsPath: "/services/led-walls/galway", conferenceAvPath: "/services/conference-av/galway" },
  { name: "Belfast", x: 348, y: 100, ledWallsPath: "/services/led-walls/belfast", conferenceAvPath: "/services/conference-av/belfast" },
  { name: "Limerick", x: 140, y: 356, ledWallsPath: "/services/led-walls/limerick", conferenceAvPath: "/services/conference-av/limerick" },
  { name: "Athlone", x: 218, y: 268, ledWallsPath: "/services/led-walls/athlone", conferenceAvPath: "/services/conference-av/athlone" },
];

// Detailed Ireland outline — clockwise from Malin Head capturing coastline features
const IRELAND_PATH = `M230,28
L248,32 L258,40 L255,48 L260,44 L268,40
L280,36 L295,33 L312,32 L328,34 L340,38
L350,44 L358,52 L364,62 L368,74 L366,84
L360,90 L354,96 L348,93 L346,99 L350,106
L358,114 L364,126 L360,136 L356,146
L350,155 L344,162 L340,168 L336,174
L338,182 L342,194 L345,206 L348,218 L350,230
L354,242 L358,252 L362,258 L358,264
L360,274 L358,286 L356,298 L354,310
L356,322 L358,334 L362,346 L366,358 L368,366
L362,374 L355,380 L345,386 L332,390 L318,394
L306,398 L292,402 L280,406 L268,410 L260,414
L254,418 L250,414 L246,420
L236,428 L226,434 L216,440 L206,444 L196,448
L186,454 L178,458 L170,454 L164,448
L158,440 L154,444 L148,442
L136,450 L124,448 L116,444
L122,436 L130,426 L124,420
L112,430 L100,438 L88,436 L78,428
L84,420 L92,412 L86,406
L76,402 L66,398 L58,392
L64,384 L74,376 L80,370 L78,364
L86,358 L96,352 L108,348 L118,344 L122,338 L116,334
L106,330 L98,326 L92,322
L88,314 L84,304 L82,294
L84,286 L88,278
L94,270 L104,264 L116,260 L128,258
L118,250 L106,244 L94,238 L84,230
L74,224 L68,216 L70,206
L76,198 L72,192 L76,184
L68,178 L62,170 L56,162 L52,154
L50,146 L52,138 L58,130
L66,122 L76,116 L86,110
L94,106 L100,102 L106,98
L112,94 L120,90 L130,86 L142,82
L150,74 L156,64 L160,56
L164,48 L170,42 L178,38
L190,32 L208,28 L220,27 Z`;

const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const SERVICE_LABELS = {
  "led-walls": { heading: "Find LED Wall Hire Near You", intro: "EventSound provides LED wall hire across Ireland. Select a city below to learn more about LED wall services in your area.", tooltip: "LED Wall Hire", linkLabel: "LED Wall Hire" },
  "conference-av": { heading: "Find Conference AV Near You", intro: "EventSound provides conference AV services across Ireland. Select a city below to learn more about conference AV in your area.", tooltip: "Conference AV", linkLabel: "Conference AV" },
};

const VB_MIN_X = 30;
const VB_MIN_Y = 10;
const VB_WIDTH = 400;
const VB_HEIGHT = 470;

export function IrelandMap({ service }: IrelandMapProps) {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const mapRef = useRef<SVGSVGElement>(null);
  const labels = SERVICE_LABELS[service];

  const handleIslandHover = (e: React.MouseEvent<SVGPathElement>) => {
    if (!mapRef.current) return;
    const pt = mapRef.current.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = mapRef.current.getScreenCTM();
    if (!ctm) return;
    const svgPt = pt.matrixTransform(ctm.inverse());
    setTooltip({ text: "We serve all of Ireland — contact us for a quote", x: svgPt.x, y: svgPt.y - 15 });
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
            viewBox={`${VB_MIN_X} ${VB_MIN_Y} ${VB_WIDTH} ${VB_HEIGHT}`}
            className="w-full h-auto"
            role="img"
            aria-label={`Interactive map of Ireland showing EventSound ${labels.linkLabel} locations`}
          >
            {/* Filled island shape */}
            <path
              d={IRELAND_PATH}
              className="fill-muted/30 stroke-accent/50 hover:fill-muted/40 transition-colors duration-200 cursor-pointer"
              strokeWidth="2"
              strokeLinejoin="round"
              onMouseMove={handleIslandHover}
              onMouseLeave={() => setTooltip(null)}
              onClick={() => { window.location.href = "/contact"; }}
            />

            {/* City markers */}
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
                  left: `${((tooltip.x - VB_MIN_X) / VB_WIDTH) * 100}%`,
                  top: `${((tooltip.y - VB_MIN_Y) / VB_HEIGHT) * 100}%`,
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
