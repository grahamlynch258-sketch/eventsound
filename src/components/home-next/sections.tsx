import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { animate, motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { cdnImage } from "@/lib/imageCdn";
import type { ImagePreset } from "@/lib/imageCdn";
import { siteConfig } from "@/config/site";
import { cityPages, homeCoverage, homeFaqs, homeIntro, homeProcess, homeProof } from "@/content/home";
import { testimonials } from "@/content/testimonials";
import {
  homeNextBrief,
  homeNextClients,
  homeNextDay,
  homeNextHero,
  homeNextServices,
  homeNextStats,
  homeNextWorkPhotos,
} from "@/content/homeNext";
import type { HomePhoto } from "@/content/homeNext";
import { Wave } from "./Wave";

// Sections of the home page preview (/home-next/). Copy comes from
// src/content/home.ts and src/content/homeNext.ts; styles from
// src/styles/home-next.css. The page reads correctly with every animation
// switched off: motion only ever starts from a finished layout.

const EASE = [0.22, 1, 0.36, 1] as const;
const DESKTOP = "(min-width: 900px)";

function useMedia(query: string) {
  const [matches, setMatches] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);
    update();
    list.addEventListener("change", update);
    return () => list.removeEventListener("change", update);
  }, [query]);
  return matches;
}

function Photo({ photo, preset, priority = false, className, alt }: { photo: HomePhoto; preset: ImagePreset; priority?: boolean; className?: string; alt?: string }) {
  return (
    <img
      {...cdnImage(photo.src, preset)}
      alt={alt ?? photo.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
      style={{ objectPosition: photo.position, height: photo.overscan }}
    />
  );
}

const Arrow = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
);
const ArrowOut = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12l8-8M6 4h6v6" /></svg>
);

// Words that rise out of a mask, once, when the heading comes into view.
const wordRise = { hide: { y: "112%" }, show: { y: "0%", transition: { duration: 0.8, ease: EASE } } };

function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <Fragment key={i}>
          <span className="hn-w"><motion.span variants={wordRise}>{word}</motion.span></span>{" "}
        </Fragment>
      ))}
    </>
  );
}

function Heading({ parts, id }: { parts: [string, string]; id?: string }) {
  return (
    <motion.h2 id={id} initial="hide" whileInView="show" viewport={{ once: true, margin: "0px 0px -12% 0px" }} transition={{ staggerChildren: 0.04 }}>
      <Words text={parts[0]} /> <em><Words text={parts[1]} /></em>
    </motion.h2>
  );
}

function Reveal({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "p" | "ol" }) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag className={className} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 0.7, ease: "easeOut" }}>
      {children}
    </Tag>
  );
}

const Cue = ({ n, children }: { n: string; children: ReactNode }) => <p className="hn-cue">{n} / {children}</p>;

/* ------------------------------------------------------------------ hero */

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const desktop = useMedia(DESKTOP);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(p, [0, 1], ["0%", desktop ? "7%" : "3%"]);
  const headY = useTransform(p, [0, 1], ["0%", desktop ? "-22%" : "-10%"]);
  const sideY = useTransform(p, [0, 1], ["0%", desktop ? "-38%" : "-6%"]);
  const slateY = useTransform(p, [0.08, 0.6], ["0%", "-80%"]);
  const slateOpacity = useTransform(p, [0.08, 0.6], [1, 0]);
  const clip = useTransform(p, [0, 1], ["inset(0% 0% 0% 0% round 0px)", desktop ? "inset(0% 2.4% 7% 2.4% round 26px)" : "inset(0% 3% 5% 3% round 20px)"]);
  const rise = (delay: number) => ({ initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: EASE, delay } });
  const hero = homeNextHero;

  return (
    <section ref={ref} className="hn-hero" id="top" data-cta-location="homepage_hero">
      <motion.div className="hn-hero-frame" style={{ clipPath: clip }}>
        <motion.img
          {...cdnImage(hero.photo.src, "hero")}
          alt={hero.photo.alt}
          loading="eager"
          decoding="async"
          {...({ fetchpriority: "high" } as Record<string, string>)}
          style={{ y: imgY }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        />
        <div className="hn-hero-shade" />
      </motion.div>

      <div className="hn-wrap hn-hero-in">
        <motion.aside className="hn-slate" aria-label="About this photo" style={{ y: slateY, opacity: slateOpacity }}>
          <motion.div {...rise(0.9)}>
            <b>{hero.slateTitle}</b>
            {hero.slateShort}<span className="hn-slate-long"> {hero.slateLong}</span>
          </motion.div>
        </motion.aside>

        <motion.h1 className="hn-hero-h1" style={{ y: headY }}>
          <motion.span className="hn-eyebrow" initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}>{hero.eyebrow}</motion.span>
          <span className="hn-h1-main">
            {hero.lines.map((line, i) => (
              <Fragment key={line}>
                <motion.span className={i === 1 ? "hn-line hn-serif" : "hn-line"} initial="hide" animate="show" transition={{ staggerChildren: 0.055, delayChildren: 0.22 + i * 0.16 }}>
                  <Words text={line} />
                </motion.span>{" "}
              </Fragment>
            ))}
          </span>
        </motion.h1>

        <motion.div className="hn-hero-side" style={{ y: sideY }}>
          <motion.p className="hn-hero-sub" {...rise(0.7)}>{hero.sub}</motion.p>
          <motion.div className="hn-hero-actions" {...rise(0.8)}>
            <Link className="hn-btn hn-btn-gold" to="/contact/">Plan my event <Arrow /></Link>
            <a className="hn-btn hn-btn-ghost" href="#work">Recent work</a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div className="hn-hero-facts" {...rise(0.95)}>
        <ul className="hn-wrap">
          {hero.facts.map((fact, i) => (
            <li key={fact}><span>0{i + 1}</span>{fact}</li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}

export function Clients() {
  return (
    <div className="hn-clients">
      <div className="hn-wrap">
        <p>Clients include</p>
        <ul>{homeNextClients.map((client) => <li key={client}>{client}</li>)}</ul>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- intro */

function ScrubWord({ progress, from, children }: { progress: MotionValue<number>; from: number; children: string }) {
  const opacity = useTransform(progress, [from, from + 0.16], [0.2, 1]);
  return <><motion.span className="hn-sw" style={{ opacity }}>{children}</motion.span>{" "}</>;
}

function Count({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduce) return;
    const controls = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (v) => { el.textContent = Math.round(v).toLocaleString("en-IE"); } });
    return () => controls.stop();
  }, [inView, reduce, to]);
  return <span ref={ref}>{to.toLocaleString("en-IE")}</span>;
}

export function Intro() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.82", "end 0.52"] });
  const words = homeIntro.paragraphs[0].split(" ");
  return (
    <section className="hn-intro hn-section" id="about">
      <Wave className="hn-wave" />
      <div className="hn-wrap hn-intro-grid">
        <Cue n="01">Who we are</Cue>
        <p ref={ref} className="hn-statement">
          {words.map((word, i) => <ScrubWord key={i} progress={scrollYProgress} from={(i / words.length) * 0.84}>{word}</ScrubWord>)}
        </p>
        <dl className="hn-stats">
          {homeNextStats.map((stat) => (
            <div key={stat.label}>
              <dt aria-label={`${stat.value.toLocaleString("en-IE")}${stat.unit === "h" ? " hours" : ` ${stat.unit}`}`}><Count to={stat.value} /><small>{stat.unit}</small></dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- services */

export function Services() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const { heading, intro, items } = homeNextServices;

  // The row crossing a line just below mid-screen drives the photo.
  useEffect(() => {
    const rows = listRef.current?.querySelectorAll<HTMLElement>("li");
    if (!rows || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(Number(entry.target.getAttribute("data-i")));
    }, { rootMargin: "-55% 0px -44% 0px" });
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hn-svc hn-section" id="services">
      <div className="hn-wrap">
        <header className="hn-sec-head">
          <Cue n="02">What we do</Cue>
          <Heading parts={heading} />
          <Reveal as="p" className="hn-lede">{intro}</Reveal>
        </header>
        <div className="hn-svc-grid">
          <ol className="hn-svc-list" ref={listRef}>
            {items.map((item, i) => (
              <li key={item.href} data-i={i} className={i === active ? "hn-svc-row hn-is-on" : "hn-svc-row"} onPointerEnter={(e) => { if (e.pointerType === "mouse") setActive(i); }} onFocus={() => setActive(i)}>
                <Link to={item.href}>
                  <span className="hn-svc-n">0{i + 1}</span>
                  <span><span className="hn-svc-name">{item.name}</span><span className="hn-svc-d">{item.text}</span></span>
                  <Photo photo={item.photo} preset="third" className="hn-svc-thumb" alt="" />
                  <span className="hn-svc-go" aria-hidden="true"><ArrowOut /></span>
                </Link>
              </li>
            ))}
          </ol>
          <div className="hn-svc-stage">
            <div className="hn-svc-frame">
              {items.map((item, i) => <Photo key={item.href} photo={item.photo} preset="half" priority={i === 0} className={i === active ? "hn-on" : undefined} />)}
              <p className="hn-svc-cap">{items[active].caption}</p>
              <p className="hn-svc-count" aria-hidden="true">0{active + 1} / 0{items.length}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ work */

export function Work() {
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const desktop = useMedia(DESKTOP);
  const reduce = useReducedMotion();
  const pinned = desktop && !reduce;
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => -v * distance);

  // How far the strip has to travel: its own width less one screen.
  useLayoutEffect(() => {
    const el = track.current;
    if (!el || !pinned) { setDistance(0); return; }
    const measure = () => setDistance(Math.max(0, el.scrollWidth - document.documentElement.clientWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, [pinned]);

  const shown = homeProof.items.filter((item) => homeNextWorkPhotos[item.key]);
  const textOnly = homeProof.items.filter((item) => !homeNextWorkPhotos[item.key]);

  return (
    <section className="hn-work" id="work" ref={outer} style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined}>
      <div className="hn-work-pin">
        <div className="hn-wrap hn-work-head">
          <div>
            <Cue n="03">Recent work</Cue>
            <Heading parts={["Events we have", "delivered."]} />
          </div>
          <Reveal as="p" className="hn-lede">{homeProof.intro}</Reveal>
        </div>
        <div className="hn-work-scroller">
          <motion.div className="hn-work-track" ref={track} style={pinned ? { x } : undefined}>
            {shown.map((item) => {
              const { photo, tag, ratio } = homeNextWorkPhotos[item.key];
              return (
                <article className="hn-wcard" key={item.key} style={{ "--hn-ar": ratio } as CSSProperties}>
                  <Link to={item.href} aria-label={`${item.title}: case study`}>
                    <figure><Photo photo={photo} preset="half" /><span className="hn-wtag">{tag}</span></figure>
                  </Link>
                  <div>
                    <p className="hn-wwhere">{item.where}</p>
                    <h3><Link to={item.href}>{item.title}</Link></h3>
                    <p className="hn-wd">{item.text}</p>
                  </div>
                </article>
              );
            })}
            <div className="hn-wcard hn-wcard-end">
              <Link to="/case-studies/">
                <strong>{textOnly.length ? `${textOnly.map((item) => item.title).join(", ")}, and more.` : "More of our work."}</strong>
                <span>See all case studies <Arrow /></span>
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="hn-wrap hn-work-barwrap"><div className="hn-work-bar" aria-hidden="true"><motion.i style={{ scaleX: scrollYProgress }} /></div></div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ on the day */

export function Day() {
  const stepsRef = useRef<HTMLOListElement>(null);
  const desktop = useMedia(DESKTOP);
  const reduce = useReducedMotion();
  const { heading, intro, steps } = homeNextDay;
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: desktop ? ["start 0.82", "start 0.22"] : ["start 0.75", "end 0.7"] });
  const [lit, setLit] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const count = steps.filter((_, i) => v >= i / steps.length + 0.04).length;
    setLit((current) => Math.max(current, count));
  });
  const all = Boolean(reduce);

  return (
    <section className="hn-day hn-section" id="how">
      <div className="hn-wrap">
        <header className="hn-sec-head">
          <Cue n="04">On the day</Cue>
          <Heading parts={heading} />
          <Reveal as="p" className="hn-lede">{intro}</Reveal>
        </header>
        <div className="hn-day-body">
          <div className="hn-day-rail" aria-hidden="true">
            <motion.i style={all ? undefined : desktop ? { scaleX: scrollYProgress } : { scaleY: scrollYProgress }} />
          </div>
          <ol className="hn-day-steps" ref={stepsRef}>
            {steps.map((step, i) => (
              <li key={step.label} className={all || i < lit ? "hn-day-step hn-lit" : "hn-day-step"}>
                <figure><Photo photo={step.photo} preset="third" /></figure>
                <p className="hn-day-k">0{i + 1} · {step.label}</p>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- quotes */

export function Quotes() {
  // The two featured client quotes from the reviews page, which carry a name, a role and an organisation.
  const featured = testimonials.filter((t) => t.is_featured && t.client_role && t.company && !/\b(Ronan|Mark)\b/.test(t.quote)).slice(0, 2);
  if (featured.length === 0) return null;
  return (
    <section className="hn-quotes" aria-label="What clients say">
      <div className="hn-wrap">
        <div className="hn-quotes-card">
          <Wave className="hn-wave" lines={16} cycles={2.2} startPhase={1.1} />
          <Cue n="05">What clients say</Cue>
          {featured.map((t, i) => (
            <Reveal key={t.client_name}>
              <blockquote className={i === 0 ? undefined : "hn-small"}>
                <p>“{t.quote}”</p>
                <footer><span><b>{t.client_name}</b><br />{t.client_role}, {t.company}</span></footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- coverage */

export function Coverage() {
  const groups = [
    { label: homeCoverage.ledLabel, base: "/services/led-walls/" },
    { label: homeCoverage.conferenceLabel, base: "/services/conference-av/" },
  ];
  return (
    <section className="hn-cover hn-section" id="coverage">
      <div className="hn-wrap hn-cover-grid">
        <header className="hn-sec-head">
          <Cue n="06">Where we work</Cue>
          <Heading parts={["Based in Drogheda,", "working nationwide."]} />
          {homeCoverage.paragraphs.map((paragraph) => <Reveal as="p" className="hn-lede" key={paragraph.slice(0, 24)}>{paragraph}</Reveal>)}
        </header>
        <Reveal className="hn-cities">
          {groups.map((group) => (
            <div key={group.base}>
              <h3>{group.label}</h3>
              <ul className="hn-chips">
                {cityPages.map((city) => <li key={city}><Link to={`${group.base}${city.toLowerCase()}/`}>{city}</Link></li>)}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- faq */

export function Faq() {
  return (
    <section className="hn-faq hn-section" id="faq" style={{ paddingTop: 0 }}>
      <div className="hn-wrap hn-faq-grid">
        <header className="hn-sec-head">
          <Cue n="07">FAQ</Cue>
          <Heading parts={["Questions we are", "asked most."]} />
        </header>
        <Reveal>
          {homeFaqs.map((faq, i) => (
            <details key={faq.question} open={i === 0}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
          <Link className="hn-faq-more" to="/faq/">More questions answered <Arrow /></Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- brief */

export function Brief() {
  const ref = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const brief = homeNextBrief;

  // Carries the four answers to the contact page, which pre-fills its form from them.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = (name: string) => String(data.get(name) ?? "").trim();
    navigate("/contact/", { state: { brief: { event_date: text("event_date"), audience_size: text("audience_size"), venue: text("venue"), event_type: text("event_type") } } });
  };

  return (
    <section className="hn-brief" id="brief" ref={ref} data-cta-location="homepage_brief">
      <motion.div className="hn-brief-bg" style={{ y }}><Photo photo={brief.photo} preset="hero" /></motion.div>
      <div className="hn-wrap hn-brief-grid">
        <div className="hn-brief-copy">
          <Cue n="08">Start here</Cue>
          <Heading parts={brief.heading} />
          <Reveal as="p" className="hn-lede">{brief.intro}</Reveal>
          <Reveal as="ol" className="hn-steps">
            {homeProcess.steps.map((step, i) => (
              <li key={step.title}><span>0{i + 1}</span><b>{step.title}</b><p>{step.text}</p></li>
            ))}
          </Reveal>
        </div>
        <motion.form className="hn-form" onSubmit={onSubmit} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <h3>Plan my event</h3>
          <div className="hn-two">
            <label>Event date<input type="date" name="event_date" /></label>
            <label>Audience size
              <select name="audience_size" defaultValue="">
                <option value="">Select…</option>
                {brief.audienceSizes.map((size) => <option key={size}>{size}</option>)}
              </select>
            </label>
          </div>
          <label>Venue or town<input type="text" name="venue" placeholder="e.g. a hotel in Galway" autoComplete="off" /></label>
          <label>Type of event
            <select name="event_type" defaultValue="">
              <option value="">Select…</option>
              {brief.eventTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>
          <button className="hn-btn hn-btn-gold" type="submit" data-analytics-cta="quote">Get my quote <Arrow /></button>
          <p className="hn-form-note">Prefer to talk it through? Call <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a> or email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p>
        </motion.form>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- phone bar */

export function PhoneBar() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > window.innerHeight * 0.7));
  return (
    <div className={show ? "hn-bar hn-show" : "hn-bar"} data-prerender-skip data-cta-location="sticky_cta">
      <a className="hn-btn hn-btn-ghost" href={`tel:${siteConfig.phone}`}>Call us</a>
      <Link className="hn-btn hn-btn-gold" to="/contact/" data-analytics-cta="quote">Get a quote</Link>
    </div>
  );
}
