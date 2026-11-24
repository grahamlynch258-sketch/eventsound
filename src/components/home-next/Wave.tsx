import { useEffect, useRef } from "react";

// The bundle of fine lines from the EventSound logo, drawn as SVG paths.
// It drifts slowly and rises with scroll speed, like a level meter. With
// reduced motion it is drawn once and left still.

const TAU = Math.PI * 2;
const bump = (x: number, centre: number, width: number) => Math.exp(-(((x - centre) / width) ** 2));
const envelope = (x: number) => Math.sin(Math.PI * x) ** 0.7 * (0.3 + 0.7 * (0.55 * bump(x, 0.3, 0.16) + bump(x, 0.68, 0.2)));

type WaveProps = { className?: string; lines?: number; cycles?: number; startPhase?: number };

export function Wave({ className, lines = 20, cycles = 3.2, startPhase = 0 }: WaveProps) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const W = 1200, H = 200, STEPS = 150;
    const paths = Array.from(svg.querySelectorAll("path"));

    const draw = (level: number, phase: number) => {
      paths.forEach((path, i) => {
        const t = i / (paths.length - 1);
        const amplitude = 0.22 + 0.78 * t;
        let d = "";
        for (let s = 0; s <= STEPS; s++) {
          const x = s / STEPS;
          const e = envelope(x);
          const theta = TAU * cycles * x + phase + (t - 0.5) * 2.4 * (1 - e);
          const y = H / 2 - Math.sin(theta) * e * amplitude * level * H * 0.46;
          d += `${s ? "L" : "M"}${(x * W).toFixed(1)} ${y.toFixed(1)}`;
        }
        path.setAttribute("d", d);
      });
    };

    let phase = startPhase;
    draw(0.62, phase);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    let level = 0.5, target = 0.5, visible = false, frame = 0;
    let lastY = window.scrollY, lastT = performance.now();

    const tick = () => {
      frame = 0;
      if (!visible) return;
      target += (0.42 - target) * 0.04;
      level += (target - level) * 0.09;
      phase += 0.006 + level * 0.022;
      draw(level, phase);
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(tick);
    }, { rootMargin: "80px" });
    observer.observe(svg);

    const onScroll = () => {
      const now = performance.now(), y = window.scrollY;
      const speed = (Math.abs(y - lastY) / Math.max(16, now - lastT)) * 1000;
      lastY = y; lastT = now;
      target = Math.max(target, 0.42 + Math.min(1, speed / 2600) * 0.58);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [cycles, startPhase]);

  return (
    <svg ref={ref} className={className} viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <path key={i} fill="none" stroke="currentColor" strokeWidth={1} vectorEffect="non-scaling-stroke" strokeOpacity={0.28 + 0.6 * (i / (lines - 1))} />
      ))}
    </svg>
  );
}
