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

// City positions calculated from lat/lon using equirectangular projection
// matching the Natural Earth 50m viewBox (0 0 457 600)
const CITIES: CityMarker[] = [
  { name: "Dublin", x: 381, y: 307, ledWallsPath: "/services/led-walls/dublin", conferenceAvPath: "/services/conference-av/dublin" },
  { name: "Cork", x: 187, y: 507, ledWallsPath: "/services/led-walls/cork", conferenceAvPath: "/services/conference-av/cork" },
  { name: "Galway", x: 136, y: 318, ledWallsPath: "/services/led-walls/galway", conferenceAvPath: "/services/conference-av/galway" },
  { name: "Belfast", x: 409, y: 134, ledWallsPath: "/services/led-walls/belfast", conferenceAvPath: "/services/conference-av/belfast" },
  { name: "Limerick", x: 173, y: 402, ledWallsPath: "/services/led-walls/limerick", conferenceAvPath: "/services/conference-av/limerick" },
  { name: "Athlone", x: 234, y: 297, ledWallsPath: "/services/led-walls/athlone", conferenceAvPath: "/services/conference-av/athlone" },
];

/**
 * Geographically accurate Ireland coastline outline.
 * Source: Natural Earth 50m land polygons (public domain).
 * 293 points, equirectangular projection with cos correction at 53.4°N.
 * viewBox: 0 0 457 600
 */
const IRELAND_PATH = "M295.22,56.04L302.14,57.32L308.35,52.50L315.77,37.32L320.94,36.36L326.64,37.59L337.83,35.69L357.70,28.60L366.56,28.48L379.09,32.20L388.42,32.12L396.71,42.98L401.16,60.09L411.51,77.00L425.04,91.71L425.58,100.71L420.74,105.55L410.63,111.55L410.67,117.97L417.34,114.73L423.10,113.24L436.96,114.67L441.81,121.20L445.16,130.97L446.92,139.00L445.72,147.72L441.99,144.95L438.20,137.15L433.99,133.55L429.10,131.61L431.32,142.32L430.44,156.65L432.58,158.00L439.16,158.25L434.81,172.92L425.82,176.90L415.33,178.39L412.80,183.59L410.89,190.28L405.42,200.26L398.20,205.89L389.27,204.76L380.53,200.31L384.28,205.56L385.95,210.97L379.40,213.00L372.57,211.89L369.24,215.44L369.02,222.28L371.33,231.09L375.90,237.34L379.55,251.43L382.58,267.05L387.29,276.49L388.26,288.20L387.57,293.96L388.42,304.31L386.42,307.95L387.93,317.67L393.47,337.77L395.89,348.97L397.46,373.42L393.54,382.58L388.28,391.27L384.85,401.58L382.20,412.70L380.60,430.64L369.21,451.67L364.37,456.89L358.75,460.11L371.03,474.81L361.00,481.37L350.06,483.44L337.96,479.76L330.42,480.21L323.54,484.97L320.83,487.85L318.66,486.46L314.12,474.39L310.79,486.85L303.82,490.82L291.88,489.97L271.93,493.29L264.25,496.84L261.07,502.39L258.70,508.81L255.58,512.60L252.06,514.59L236.66,519.32L233.63,521.22L226.49,531.58L217.14,537.57L209.39,539.36L202.52,533.33L199.69,529.71L196.50,527.87L185.93,528.15L189.27,530.01L191.42,534.27L192.47,542.43L191.27,550.42L186.06,554.48L179.84,555.23L170.03,563.53L157.05,565.79L150.03,573.43L107.13,586.35L104.70,586.50L98.78,583.21L92.36,581.76L85.96,582.78L67.99,590.00L59.28,588.57L70.38,570.63L85.30,561.58L86.85,559.10L81.97,557.88L53.62,564.17L43.78,569.52L33.93,571.08L38.49,562.90L51.19,551.70L58.00,546.43L62.16,544.34L66.90,537.76L80.28,530.29L37.18,545.70L25.85,543.82L23.19,539.52L14.37,541.54L11.02,531.13L24.09,515.37L31.70,508.59L40.74,504.93L49.45,499.68L52.68,493.25L48.58,491.21L22.50,492.84L10.00,491.47L10.68,486.38L12.98,480.74L25.92,471.09L32.93,469.54L39.17,470.46L45.27,472.93L50.22,476.16L64.89,474.31L58.77,468.14L57.69,455.62L53.00,451.41L59.00,445.61L65.87,442.08L77.32,430.07L81.39,428.25L104.05,425.33L128.48,419.01L152.70,410.30L140.28,405.43L134.33,399.00L124.77,411.99L117.89,416.96L98.45,419.62L92.30,418.15L83.64,414.12L80.95,415.66L78.44,418.77L65.58,425.15L52.06,426.67L67.78,414.98L87.73,395.17L92.18,388.90L98.50,378.02L96.54,373.17L92.44,370.41L106.89,348.02L111.98,343.95L121.24,343.29L128.04,339.74L131.03,339.73L133.72,338.40L139.67,331.70L130.49,327.42L121.00,325.23L91.66,327.56L87.80,327.05L84.16,324.99L81.80,322.03L80.02,314.41L77.87,312.71L71.25,312.71L64.72,315.04L60.16,314.81L55.69,311.48L62.83,303.70L53.62,301.86L44.31,303.39L36.55,301.03L36.31,296.15L39.83,291.28L35.22,286.66L34.27,280.81L39.17,277.94L44.53,278.89L55.47,274.57L69.46,272.47L57.46,268.21L52.67,264.56L52.44,258.97L53.39,254.19L67.30,246.10L82.11,242.53L81.02,237.20L82.06,231.44L67.08,229.78L52.29,233.84L53.87,222.83L57.41,212.89L58.11,206.34L57.40,199.32L50.48,202.32L49.66,192.43L46.69,185.65L36.43,190.32L36.69,181.37L39.65,175.12L45.02,172.40L50.35,173.58L60.24,173.46L69.78,168.76L83.53,167.56L105.44,169.03L120.51,182.30L124.40,179.93L130.42,171.54L133.25,170.62L155.95,174.27L170.05,179.10L173.82,177.59L171.79,168.29L166.93,161.84L173.03,153.40L180.44,147.68L185.40,144.82L196.83,141.28L201.81,137.94L205.14,127.08L210.42,118.04L181.73,122.74L154.43,112.02L158.76,104.45L164.52,100.15L174.47,96.86L175.41,92.91L180.44,89.62L188.77,80.99L185.71,69.72L187.35,61.47L193.34,56.10L195.21,48.39L197.88,42.71L210.04,40.68L221.73,35.41L225.95,35.92L239.75,34.70L244.43,36.83L243.36,27.51L251.84,26.29L255.15,28.15L256.61,34.76L260.46,38.97L261.65,46.30L259.07,51.96L254.75,56.32L258.70,60.78L252.58,68.84L259.18,65.41L268.59,57.51L268.10,51.06L266.50,42.95L263.88,35.63L265.09,27.57L270.38,22.52L284.28,19.99L278.58,10.84L283.66,10.00L289.17,11.91L297.29,19.04L305.73,24.63L314.48,29.06L306.07,37.94L295.73,44.10L291.66,50.81L295.22,56.04Z";

const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const SERVICE_LABELS = {
  "led-walls": { heading: "Find LED Wall Hire Near You", intro: "EventSound provides LED wall hire across Ireland. Select a city below to learn more about LED wall services in your area.", tooltip: "LED Wall Hire", linkLabel: "LED Wall Hire" },
  "conference-av": { heading: "Find Conference AV Near You", intro: "EventSound provides conference AV services across Ireland. Select a city below to learn more about conference AV in your area.", tooltip: "Conference AV", linkLabel: "Conference AV" },
};

const VB_WIDTH = 457;
const VB_HEIGHT = 600;

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
            viewBox={`0 0 ${VB_WIDTH} ${VB_HEIGHT}`}
            className="w-full h-auto"
            role="img"
            aria-label={`Interactive map of Ireland showing EventSound ${labels.linkLabel} locations`}
          >
            {/* Geographically accurate island shape — Natural Earth 50m */}
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
                    <animate attributeName="r" values="8;16;8" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                )}
                <Link to={getCityPath(city)}>
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r="7"
                    className="fill-accent stroke-background cursor-pointer hover:fill-accent/80 transition-colors"
                    strokeWidth="2"
                    onMouseEnter={() => {
                      setTooltip({ text: `${city.name} — ${labels.tooltip}`, x: city.x, y: city.y - 22 });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                </Link>
                <text
                  x={city.x}
                  y={city.y - 16}
                  textAnchor="middle"
                  className="fill-foreground text-[11px] font-semibold pointer-events-none select-none"
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
                  left: `${(tooltip.x / VB_WIDTH) * 100}%`,
                  top: `${(tooltip.y / VB_HEIGHT) * 100}%`,
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
