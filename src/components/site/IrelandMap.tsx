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
  { name: "Dublin", x: 352, y: 250, ledWallsPath: "/services/led-walls/dublin", conferenceAvPath: "/services/conference-av/dublin" },
  { name: "Cork", x: 252, y: 416, ledWallsPath: "/services/led-walls/cork", conferenceAvPath: "/services/conference-av/cork" },
  { name: "Galway", x: 125, y: 262, ledWallsPath: "/services/led-walls/galway", conferenceAvPath: "/services/conference-av/galway" },
  { name: "Belfast", x: 348, y: 100, ledWallsPath: "/services/led-walls/belfast", conferenceAvPath: "/services/conference-av/belfast" },
  { name: "Limerick", x: 135, y: 358, ledWallsPath: "/services/led-walls/limerick", conferenceAvPath: "/services/conference-av/limerick" },
  { name: "Athlone", x: 218, y: 265, ledWallsPath: "/services/led-walls/athlone", conferenceAvPath: "/services/conference-av/athlone" },
];

/*
 * Accurate Ireland outline traced clockwise from Malin Head.
 * Key coastal features: Lough Foyle, Belfast Lough, Dublin Bay, Carnsore Point,
 * Cork Harbour, Mizen Head, Bantry Bay, Beara Peninsula, Kenmare River,
 * Iveragh (Ring of Kerry), Dingle Bay, Dingle Peninsula, Shannon Estuary,
 * Loop Head, Cliffs of Moher, Galway Bay, Connemara, Killary, Clew Bay,
 * Achill, Blacksod Bay, Sligo Bay, Donegal Bay, Bloody Foreland, Horn Head.
 */
const IRELAND_PATH = [
  // Malin Head → Inishowen east
  "M230,28 L238,34 L244,40 L250,42 L254,46",
  // Lough Foyle inlet
  "L252,52 L248,58 L252,56 L258,50 L264,46",
  // North coast — Derry to Antrim
  "L272,42 L280,38 L290,36 L302,34 L314,33 L326,34 L336,38",
  // Fair Head / NE Antrim
  "L346,42 L354,48 L360,56 L364,66 L366,76 L366,84",
  // Belfast Lough inlet
  "L362,90 L356,95 L352,92 L350,96 L348,100 L352,106 L356,108",
  // Ards Peninsula / Down coast
  "L360,116 L364,126 L366,134 L362,140 L358,146 L356,152",
  // South Down / Carlingford Lough
  "L352,158 L348,164 L344,170 L340,174 L338,178",
  // Dundalk Bay → east coast straight run
  "L340,184 L342,190 L344,200 L346,210 L348,222 L350,234",
  // Dublin Bay indent
  "L352,242 L356,250 L360,256 L358,262 L356,260 L358,266",
  // Wicklow / Wexford coast
  "L360,274 L360,282 L358,292 L356,302 L356,312 L358,324 L360,336",
  // Carnsore Point — SE corner
  "L362,348 L366,358 L370,366 L368,372",
  // South coast — Waterford
  "L364,376 L358,382 L350,386 L340,390 L328,394 L316,396 L304,400",
  // East Cork coast
  "L290,404 L278,408 L268,412",
  // Cork Harbour indent
  "L260,416 L256,420 L252,418 L250,416 L248,420",
  // West Cork coast
  "L240,426 L232,430 L224,434 L216,438 L208,442 L200,446",
  // Mizen Head — southernmost
  "L190,452 L182,456 L176,458 L170,456",
  // Sheep's Head → Bantry Bay inlet
  "L166,452 L162,448 L160,440 L158,434 L160,438 L156,444 L152,446",
  // Beara Peninsula
  "L144,452 L136,454 L128,452 L120,448",
  // Kenmare River inlet
  "L124,442 L128,436 L132,428 L128,424 L124,420",
  // Iveragh Peninsula — Ring of Kerry
  "L116,428 L108,434 L100,438 L92,440 L84,436 L78,430",
  // Dingle Bay inlet
  "L82,424 L88,416 L92,410 L88,406",
  // Dingle Peninsula
  "L80,404 L72,400 L64,396 L58,392",
  // Brandon Head → Tralee Bay
  "L60,386 L66,380 L72,374 L78,370",
  // Kerry Head → Shannon Estuary
  "L76,364 L80,360 L84,356 L78,350 L74,344",
  // Loop Head — Clare
  "L72,340 L68,336 L66,332",
  // Clare west coast — Cliffs of Moher
  "L68,326 L66,318 L66,310 L68,302 L70,294",
  // Burren / Black Head
  "L74,286 L78,280",
  // Galway Bay inlet
  "L84,274 L92,268 L100,264 L110,260 L120,258 L130,258",
  // Connemara coast
  "L124,252 L116,246 L108,240 L100,234 L92,228 L84,224 L78,218",
  // Slyne Head area
  "L72,212 L68,206 L70,200 L74,194",
  // Killary Harbour → Renvyle
  "L72,188 L76,182 L74,178 L70,174 L66,170",
  // Clew Bay → Achill
  "L68,164 L74,158 L70,152 L62,148 L56,142 L52,136 L50,130",
  // Blacksod Bay → North Mayo
  "L48,124 L50,118 L52,112 L56,106 L62,100 L68,96",
  // Killala Bay → Sligo
  "L76,92 L82,88 L88,84 L96,82 L102,78",
  // Donegal Bay inlet
  "L108,76 L114,72 L120,70 L128,68 L136,66 L142,64 L148,62",
  // Southwest Donegal → Bloody Foreland
  "L154,60 L158,56 L162,50 L164,44 L168,40",
  // Horn Head → north Donegal coast
  "L172,38 L178,36 L186,34 L196,32 L208,30 L218,28 Z",
].join(" ");

const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const SERVICE_LABELS = {
  "led-walls": { heading: "Find LED Wall Hire Near You", intro: "EventSound provides LED wall hire across Ireland. Select a city below to learn more about LED wall services in your area.", tooltip: "LED Wall Hire", linkLabel: "LED Wall Hire" },
  "conference-av": { heading: "Find Conference AV Near You", intro: "EventSound provides conference AV services across Ireland. Select a city below to learn more about conference AV in your area.", tooltip: "Conference AV", linkLabel: "Conference AV" },
};

const VB_MIN_X = 30;
const VB_MIN_Y = 15;
const VB_WIDTH = 400;
const VB_HEIGHT = 465;

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
