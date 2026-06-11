import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/site/PageShell";
import { useSeo } from "@/hooks/useSeo";
import { useServiceImages } from "@/hooks/useServiceImages";
import { useServicePageImages } from "@/hooks/useServicePageImages";
import { ContactForm } from "@/components/site/ContactForm";
import { GoogleReviewsBadge } from "@/components/GoogleReviews";
import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";
import { BrandBanner } from "@/components/site/BrandSidebar";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, Phone, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import type { ServicePageImageSlot } from "@/hooks/useServicePageImages";

// ── Helpers ──────────────────────────────────────────────────────────────────

function useInView(ref: React.RefObject<HTMLElement | null>, once = true) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setVisible(true); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); if (once) obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, once]);
  return visible;
}

function CountUp({ end, suffix = "", duration = 1500 }: { end: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setCount(end); return; }
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function SlotImage({ slots, slotId, aspect = "aspect-video", className = "", width = 600, height = 450 }: {
  slots: ServicePageImageSlot[];
  slotId: string;
  aspect?: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  const slot = slots.find((s) => s.slot_id === slotId);
  if (slot?.image_url) {
    return (
      <img
        src={slot.image_url}
        alt={slot.alt_text || slot.slot_label}
        className={`w-full h-full object-cover ${className}`}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
      />
    );
  }
  return (
    <div className={`w-full ${aspect} bg-muted flex items-center justify-center text-muted-foreground text-sm`}>
      {slot?.slot_label || slotId}
    </div>
  );
}

// ── FAQ Data ─────────────────────────────────────────────────────────────────

const faqs = [
  { question: "What sound equipment do you provide for musicals?", answer: "We provide complete sound systems tailored to musical and theatre productions, including wireless microphone systems (Shure and Sennheiser), body-worn transmitters, headset and lavalier microphones, monitor speakers for performers, front-of-house PA systems, and mixing desks. We carry enough wireless channels to cover large cast productions with individual microphones for every performer." },
  { question: "Can you provide lighting for a school or community musical?", answer: "Yes. We regularly supply lighting for school musicals, amateur dramatics, and community theatre productions across Ireland. We can provide a complete lighting rig including moving heads, wash lights, follow spots, and a lighting desk — or supplement your venue's existing rig with additional fixtures and a qualified operator." },
  { question: "Do you provide operators or is it dry hire only?", answer: "Every hire includes experienced sound and lighting technicians as standard. For musical and theatre productions, we provide operators who attend your tech rehearsal, programme cues, and operate the desk for every performance. Dry hire is available for venues with their own technical crew." },
  { question: "How many wireless microphones can you provide?", answer: "We carry large-scale wireless systems that can support 30+ simultaneous channels, covering even the largest cast productions. Each performer gets their own body-worn transmitter with a Sennheiser headset microphone as standard, with DPA headset microphones available as a premium upgrade for productions that require the best possible vocal clarity. We bring spare units for every show." },
  { question: "Can you work with our existing venue equipment?", answer: "Absolutely. We regularly integrate with house rigs in theatres, community halls, and school auditoriums across Ireland. We'll do a site visit to assess what's already installed, then bring in additional equipment to fill any gaps — whether that's extra wireless microphones, front fills, or supplementary lighting." },
  { question: "How far in advance should we book for a musical production?", answer: "We recommend booking 6 to 8 weeks before your production opens. This allows time for a site visit, equipment planning, and scheduling around your rehearsal and tech week. For peak season (October to December, panto season) and large-scale productions, booking 3 months ahead is advisable." },
];

// ── Alternating Service Sections Data ────────────────────────────────────────

const serviceSections = [
  {
    slotId: "sound-production",
    title: "Sound Design & Wireless Microphones",
    copy: [
      "Clear, balanced sound is the foundation of every musical and theatre production. EventSound provides professional PA systems, wireless microphone rigs, and mixing desks designed specifically for live theatre — where every word of dialogue and every note needs to reach every seat in the house.",
      "We supply Shure and Sennheiser wireless systems with body-worn transmitters and discreet headset microphones for each performer. For productions that demand the highest audio quality, we offer DPA headset microphones as a premium option — the industry standard for musical theatre worldwide, delivering exceptional clarity and natural vocal reproduction. Our sound engineers programme individual channel EQ, manage cue-by-cue level changes, and handle all wireless frequency coordination — so your cast and creative team can focus on the performance.",
      "Whether it's a 10-person school play or a 40-person amateur musical with a live orchestra, we scale the system to match your production and venue.",
    ],
  },
  {
    slotId: "lighting-design",
    title: "Stage Lighting for Theatre & Musicals",
    copy: [
      "Lighting transforms a stage. EventSound provides complete theatrical lighting rigs including moving heads, LED wash fixtures, profile spots, follow spots, and intelligent lighting controlled via ChamSys desks. We design and programme scene-by-scene cue lists that bring your production to life.",
      "Our lighting operators attend your tech rehearsal to build and refine cues with your director, then run the show for every performance. We can provide a full rig for venues with no existing lighting, or supplement a house rig with additional fixtures, colour, and effects.",
    ],
  },
  {
    slotId: "led-backdrop",
    title: "LED Video Walls & Digital Backdrops",
    copy: [
      "Replace traditional painted flats and cloth backdrops with a high-resolution LED video wall that can change scenes instantly. LED backdrops allow you to display dynamic set designs, projections, video content, and atmospheric visuals that transform with each act — without any set changes.",
      "EventSound provides indoor LED panels in sizes from 3m wide to full-width stage backdrops. We handle content formatting, playback, and on-stage integration so your digital scenery is perfectly synchronised with the performance.",
    ],
  },
  {
    slotId: "staging-drape",
    title: "Staging, Drape & Set Support",
    copy: [
      "For venues without a permanent stage, we provide modular staging platforms, steps, and guardrails to create a performance area tailored to your production. Our GUIL stage platforms are height-adjustable and can be configured as thrust stages, in-the-round, or traditional proscenium layouts.",
      "We also supply pipe and drape systems for wings, masking, backdrops, and star cloth — giving your production a professional theatrical finish even in non-theatre venues like school halls, community centres, and hotel function rooms.",
    ],
  },
];

// ── Why Choose List ──────────────────────────────────────────────────────────

const whyItems = [
  "Complete production packages: sound, lighting, staging, and LED screens from a single supplier",
  "Experienced theatre sound and lighting operators for every performance",
  "Large-scale Shure and Sennheiser wireless microphone inventory — 30+ channels available",
  "ChamSys lighting control with scene-by-scene cue programming",
  "Tech rehearsal attendance included — we build cues with your director",
  "Flexible hire: full production packages or individual elements to supplement your venue's equipment",
  "Over 35 years of event and live production experience across Ireland",
  "Available nationwide — Dublin, Cork, Galway, Limerick, Belfast, and every county in between",
];

// ── All-Inclusive Checklist ──────────────────────────────────────────────────

const allInclusiveItems = [
  "Sound system & mics",
  "Lighting rig",
  "Delivery & setup",
  "Tech rehearsal",
  "Show operators",
  "Breakdown & collection",
  "Spare equipment",
  "No hidden fees",
];

// ── Main Component ───────────────────────────────────────────────────────────

export default function MusicalTheatreV2() {
  const { hero, gallery: libraryGallery } = useServiceImages("service-musical-theatre");
  const { data: slots = [] } = useServicePageImages("musical-theatre");

  const heroImages: { image_url: string; alt_text: string | null }[] = [];
  if (hero) heroImages.push({ image_url: hero, alt_text: "Musical theatre production with professional sound and lighting by EventSound" });
  for (const img of libraryGallery) heroImages.push(img);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    if (isPaused || heroImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, heroImages.length]);

  const serviceSchema = generateServiceSchema({
    name: "Musical & Theatre Production Hire",
    description: "Professional sound, lighting, and staging hire for musical and theatre productions across Ireland. Wireless microphones, stage lighting, LED backdrops, and full technical crew.",
    url: "https://eventsound.ie/services/musical-theatre",
    provider: { name: "EventSound", url: "https://eventsound.ie" },
    areaServed: ["Dublin", "Cork", "Galway", "Belfast", "Limerick", "Ireland"],
    serviceType: "Theatre Production Hire",
  });

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://eventsound.ie" },
      { name: "Services", url: "https://eventsound.ie/services" },
      { name: "Musical & Theatre", url: "https://eventsound.ie/services/musical-theatre" },
    ],
  });

  const faqSchema = generateFAQSchema({ questions: faqs });

  useSeo({
    title: "Musical & Theatre Production Hire Ireland | Sound & Lighting | EventSound",
    description: "Professional sound, lighting, and staging hire for musicals and theatre productions across Ireland. Wireless microphones, stage lighting rigs, LED backdrops, and experienced operators for every show.",
    canonical: "https://eventsound.ie/services/musical-theatre",
    additionalSchemas: [
      { schema: serviceSchema, schemaId: "service-schema" },
      { schema: breadcrumbSchema, schemaId: "breadcrumb-schema" },
      { schema: faqSchema, schemaId: "faq-schema" },
    ],
  });

  return (
    <PageShell>
      {/* ── Section 1: Hero ── */}
      <section
        className="relative min-h-[85vh] flex items-end overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="absolute inset-0">
          {heroImages.map((img, i) => (
            <img
              key={img.image_url}
              src={img.image_url}
              alt={img.alt_text || "Musical theatre production"}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms]"
              style={{ opacity: i === currentSlide ? 1 : 0 }}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : undefined}
              decoding="async"
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 pb-8 pt-32">
          <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-8 md:p-10 max-w-2xl animate-fade-up">
            <nav className="mb-6 text-sm text-white/70" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li className="text-white/90">Musical &amp; Theatre</li>
              </ol>
            </nav>

            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase mb-3">
              EventSound &middot; Musical &amp; Theatre
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Musical &amp; Theatre Production Hire Ireland
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-4">
              Professional sound, lighting, and staging for every production
            </p>
            <p className="text-sm md:text-base text-white/80 mb-8 leading-relaxed">
              EventSound provides complete technical production hire for musicals, plays, pantomimes, and theatrical performances across Ireland. From wireless microphones and stage lighting to LED backdrops and modular staging, we supply the equipment and experienced operators to bring your production to life — in theatres, school halls, community centres, and outdoor venues nationwide.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <Button size="lg" onClick={() => document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" })}>
                Get a Quote
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <a href="tel:+353863520476">
                  <Phone className="mr-2 h-4 w-4" />
                  086 352 0476
                </a>
              </Button>
            </div>

            <p className="text-xs text-white/50">
              Trusted by schools, drama societies &amp; theatre companies across Ireland
            </p>
          </div>
        </div>

        {heroImages.length > 1 && (
          <div className="absolute bottom-4 right-6 z-10 flex items-center gap-2">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/60"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── Section 2: Stats Strip ── */}
      <section className="container mx-auto px-4 -mt-12 relative z-10 mb-16">
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Wireless mic channels" value={<><CountUp end={30} />+</>} />
            <StatCard label="Delivery, setup & operators" value="All-inclusive" />
            <StatCard label="Production experience" value={<><CountUp end={35} /> yrs</>} />
            <div className="rounded-xl border border-border/50 bg-card p-5 text-center shadow-lg">
              <div className="flex items-center justify-center gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-2xl font-bold">5.0</p>
              <p className="text-xs text-muted-foreground">Google Reviews</p>
              <p className="text-[10px] text-muted-foreground/60 flex items-center justify-center gap-1 mt-1">
                <svg className="h-3 w-3" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                verified on Google
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Section 3: Intro + Cross-link ── */}
      <section className="container mx-auto px-4 mb-16">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you're staging a school musical, a community theatre production, a professional touring show, or a Christmas pantomime, EventSound provides the full technical package — or individual elements to supplement your venue's existing equipment. We work with your director and stage manager from tech rehearsal through to final curtain. For corporate event production, see our{" "}
              <Link to="/services/av-production/" className="text-accent hover:underline">AV Production</Link> service.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Sections 4–7: Alternating Service Sections ── */}
      {serviceSections.map((section, i) => (
        <section key={section.slotId} className={i % 2 === 1 ? "bg-muted/30" : ""}>
          <div className="container mx-auto px-4 py-16">
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
              <ScrollReveal direction={i % 2 === 0 ? "left" : "right"}>
                <div className={`aspect-[4/3] overflow-hidden rounded-xl border border-border/30 bg-muted ${i % 2 === 1 ? "md:[direction:ltr]" : ""}`}>
                  <SlotImage
                    slots={slots}
                    slotId={section.slotId}
                    aspect="aspect-[4/3]"
                    className="transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal direction={i % 2 === 0 ? "right" : "left"}>
                <div className={i % 2 === 1 ? "md:[direction:ltr]" : ""}>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{section.title}</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    {section.copy.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ))}

      {/* ── All-Inclusive Banner ── */}
      <section className="container mx-auto px-4 mb-16">
        <ScrollReveal>
          <div className="rounded-2xl bg-gray-900 p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">All-Inclusive Production Hire</h2>
                <p className="text-gray-300 leading-relaxed">
                  Every EventSound theatre production hire is quoted on an all-inclusive basis. We cover equipment, delivery, setup, tech rehearsal attendance, show operation, and collection. Pricing depends on production scale, venue, number of performances, and equipment requirements. Contact us for a free, detailed quote — we'll recommend the right setup for your production and provide a clear cost breakdown with no hidden fees.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {allInclusiveItems.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent shrink-0" />
                    <span className="text-sm text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Why Choose EventSound ── */}
      <section className="container mx-auto px-4 mb-16">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose EventSound for Your Production</h2>
        </ScrollReveal>
        <div className="max-w-2xl mx-auto space-y-3">
          {whyItems.map((item, i) => (
            <ScrollReveal key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.06}>
              <div className="flex items-start gap-3 rounded-lg border border-border/40 bg-card/60 px-4 py-3 transition-colors hover:bg-accent/5">
                <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <p className="text-muted-foreground">{item}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Google Reviews ── */}
      <section className="container mx-auto px-4 mb-16">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <h2 className="text-3xl font-bold">Google Reviews</h2>
            <div className="flex items-center gap-3">
              <GoogleReviewsBadge />
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://search.google.com/local/writereview?placeid=ChIJy0JQslYLZ0gRQOACHmQptmI"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Write a Review
                </a>
              </Button>
            </div>
          </div>
          <ReactGoogleReviews
            layout="custom"
            featurableId="b2ee5fe1-ce0a-4af5-8324-4558bd7d337e"
            structuredData={true}
            brandName="EventSound AV Services"
            renderer={(reviews) => {
              const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 3);
              return (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {visibleReviews.map((review) => (
                      <div
                        key={review.reviewId}
                        className="bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                      >
                        <div className="flex gap-1 mb-3">
                          {Array.from({ length: review.starRating }).map((_, i) => (
                            <svg key={i} viewBox="0 0 18 18" width="16" height="16">
                              <polygon
                                points="9,1 11.5,6.5 17,7 13,11 14,17 9,14 4,17 5,11 1,7 6.5,6.5"
                                fill="#FBBC04"
                              />
                            </svg>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-4">
                          {review.comment}
                        </p>
                        <div className="flex items-center gap-3">
                          {review.reviewer.profilePhotoUrl && (
                            <img
                              src={review.reviewer.profilePhotoUrl}
                              alt=""
                              className="w-8 h-8 rounded-full"
                            />
                          )}
                          <div>
                            <p className="text-sm font-semibold">{review.reviewer.displayName}</p>
                            <p className="text-xs text-muted-foreground">
                              {review.createTime
                                ? new Date(review.createTime).toLocaleDateString("en-IE", {
                                    year: "numeric",
                                    month: "short",
                                  })
                                : ""}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {!showAllReviews && reviews.length > 3 && (
                    <div className="text-center mt-8">
                      <button
                        onClick={() => setShowAllReviews(true)}
                        className="inline-flex items-center gap-2 px-6 py-2.5 border border-border rounded-lg text-sm font-semibold hover:bg-accent/10 transition-colors"
                      >
                        Show more reviews ({reviews.length - 3} more)
                      </button>
                    </div>
                  )}
                  {showAllReviews && reviews.length > 3 && (
                    <div className="text-center mt-8">
                      <button
                        onClick={() => setShowAllReviews(false)}
                        className="inline-flex items-center gap-2 px-6 py-2.5 border border-border rounded-lg text-sm font-semibold hover:bg-accent/10 transition-colors"
                      >
                        Show fewer reviews
                      </button>
                    </div>
                  )}
                </div>
              );
            }}
          />
        </ScrollReveal>
      </section>

      {/* ── Frequently Combined With ── */}
      <section className="container mx-auto px-4 mb-16">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Frequently Combined With</h2>
            <p className="text-muted-foreground leading-relaxed">
              Many theatre productions combine our sound and lighting packages with{" "}
              <Link to="/services/staging-pipe-drape/" className="text-accent hover:underline">staging and drape hire</Link>{" "}
              for venues without a permanent stage. For productions that use projected or digital backdrops, see our{" "}
              <Link to="/services/led-video-walls/" className="text-accent hover:underline">LED Video Wall Hire</Link>{" "}
              service. Add{" "}
              <Link to="/services/video-production/" className="text-accent hover:underline">video recording and live streaming</Link>{" "}
              to capture your show for on-demand viewing.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Brand Banner ── */}
      <BrandBanner serviceKey="musical-theatre" />

      {/* ── Gallery ── */}
      <section className="container mx-auto px-4 mb-16">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-8">Recent Productions</h2>
        </ScrollReveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["gallery-1", "gallery-2", "gallery-3", "gallery-4", "gallery-5", "gallery-6"].map((slotId, i) => (
            <ScrollReveal key={slotId} delay={i * 0.08}>
              <div className="group aspect-[4/3] overflow-hidden rounded-xl border border-border/30 bg-muted">
                <SlotImage
                  slots={slots}
                  slotId={slotId}
                  aspect="aspect-[4/3]"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── FAQ Accordion ── */}
      <section className="container mx-auto px-4 mb-16">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        </ScrollReveal>
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <AccordionItem value={`faq-${i}`} className="rounded-xl border border-border/50 bg-card px-4 transition-all hover:translate-x-1">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </ScrollReveal>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Two-Column Quote Form ── */}
      <section id="quote-form" className="bg-primary py-16 md:py-20 scroll-mt-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            <ScrollReveal direction="left">
              <div className="flex flex-col">
                <div className="mb-8">
                  <img
                    src="/Brand/logo_transparent.png"
                    alt="EventSound AV Services"
                    className="max-w-[280px] mx-auto md:mx-0"
                  />
                </div>

                <div className="mb-8">
                  <h3 className="text-white font-bold text-lg mb-3">Follow us on</h3>
                  <div className="flex gap-3">
                    <a href="https://www.linkedin.com/company/eventsound-avservices/" target="_blank" rel="noopener noreferrer"
                       className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a href="https://www.facebook.com/eventAVpro/" target="_blank" rel="noopener noreferrer"
                       className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-bold text-lg mb-4">Reach us through</h3>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(40 86% 72%)" strokeWidth="2">
                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-accent text-sm font-semibold mb-0.5">Email</p>
                      <a href="mailto:graham@eventsound.ie" className="text-white/80 text-sm hover:text-accent transition-colors">
                        graham@eventsound.ie
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(40 86% 72%)" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-accent text-sm font-semibold mb-0.5">Phone</p>
                      <a href="tel:+353863520476" className="text-white/80 text-sm hover:text-accent transition-colors">086 352 0476</a>
                      <span className="text-white/40 mx-1.5">|</span>
                      <a href="tel:+353872888761" className="text-white/80 text-sm hover:text-accent transition-colors">087 288 8761</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(40 86% 72%)" strokeWidth="2">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-accent text-sm font-semibold mb-0.5">Location</p>
                      <p className="text-white/80 text-sm">Drogheda, Co. Louth, Ireland</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Need <span className="text-accent">Production Hire</span> for Your Show?
                </h2>
                <p className="text-white/60 text-sm mb-6">
                  Fill out the form below &amp; receive a quote within 24 hours.
                </p>
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <StickyCtaBar />
    </PageShell>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-5 text-center shadow-lg">
      <p className="text-2xl md:text-3xl font-bold text-accent">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
}
