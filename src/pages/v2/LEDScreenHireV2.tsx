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
  { question: "What size LED screen do I need for my event?", answer: "For a boardroom or small meeting of up to 20 people, a 55-inch to 65-inch screen works well. For conference rooms with 50 to 100 delegates, we recommend 75-inch to 86-inch displays. For audiences over 100, consider multiple screens or our LED video wall service for maximum visibility. The ideal size depends on viewing distance, venue lighting, and content type — contact us and we'll recommend the best setup for your space." },
  { question: "Can I hire a single TV screen for a one-day event?", answer: "Yes. We offer screen hire for any duration from a single day to multi-week installations. Single-day corporate events, conferences, and product launches are our most common booking type. Every hire includes delivery, setup, and collection regardless of duration." },
  { question: "Do you provide stands and mounts for hired screens?", answer: "Every screen hire comes with a professional freestanding floor stand as standard. We also offer table-top stands for smaller displays and wall-mount brackets where the venue allows. All stands are height-adjustable and designed for event use — they're stable, look professional, and can be repositioned during the event if needed." },
  { question: "Can you set up video conferencing on a hired screen?", answer: "Yes. We regularly set up screens for hybrid events with Microsoft Teams, Zoom, and Google Meet. We can provide the screen, a conference camera, ceiling or table microphones, and a speaker system — everything needed for remote participants to see and hear the room clearly. This is popular for AGMs, board meetings, and corporate town halls with remote attendees." },
  { question: "What is the difference between an LED screen and an LED video wall?", answer: "An LED screen is a single display unit — like a large TV or monitor — typically ranging from 43 to 98 inches. An LED video wall is built from multiple modular LED panels tiled together to create a seamless display that can be any size, commonly from 6 to 50 square metres. LED screens are ideal for conferences, exhibitions, and meeting rooms. LED video walls are used for main stage visuals, concert backdrops, large conference keynotes, and outdoor events. We offer both — see our LED Video Wall Hire page for modular panel installations." },
  { question: "How much does LED screen hire cost in Ireland?", answer: "Every EventSound screen hire is quoted on an all-inclusive basis covering the screen, stand, cabling, delivery, setup, on-site support, and collection. Pricing depends on screen size, quantity, duration, and venue location. Contact us for a free, no-obligation quote — we'll recommend the best setup for your event and provide a clear breakdown with no hidden fees." },
];

// ── Alternating Service Sections Data ────────────────────────────────────────

const serviceSections = [
  {
    slotId: "conference-screen",
    title: "Conference & Meeting Screen Hire",
    copy: [
      "Large-format LED screens and TV monitors are the standard for corporate conferences, seminars, AGMs, and company meetings across Ireland. We provide high-resolution displays that connect to laptops, tablets, and video conferencing platforms including Microsoft Teams, Zoom, and Google Meet.",
      "We can provide anything from 55-inch TV screens for boardroom presentations to huge 50m²+ LED video walls for main stage conference backdrops. Every screen hire includes a freestanding floor stand, HDMI and USB-C connectivity, and setup by our technical crew.",
      "We regularly provide conference screen hire for events hosted by organisations including Fingal County Council, Louth Local Enterprise Office, and corporate clients across Dublin and the wider Leinster region. For multi-room conferences, we can deploy screens in the main hall, breakout rooms, registration areas, and speaker preparation rooms simultaneously.",
    ],
  },
  {
    slotId: "outdoor-led",
    title: "Outdoor LED Screen Hire",
    copy: [
      "For outdoor events, festivals, concerts, and sports screenings, we provide weather-rated LED panels with high-brightness output visible in direct sunlight. Our outdoor screens are available in sizes from 8m² to 50m²+ and are built on freestanding ground-support structures or integrated with stage rigging.",
      "We have provided outdoor LED walls for events including the Swords Castle Summer Concerts (main stage LED wall, PA, and lighting) and multi-day festival productions. Outdoor LED panels use a higher pixel pitch (typically 3.9mm to 4.8mm) for viewing distances of 10 metres and above, balancing image quality with the brightness needed for daylight visibility.",
    ],
  },
  {
    slotId: "curved-led",
    title: "Custom Curved & Immersive LED",
    copy: [
      "EventSound designs and installs curved, angled, and custom-shaped LED wall configurations for immersive event experiences. Our curved Absen LED wall installation at the PRISM Immersive Technology Summit at DkIT transformed the An Macánna Theatre into an engaging conference space with a wraparound visual backdrop for speakers and demonstrations.",
      "We also delivered a curved LED video wall installation for Beta Festival 2025 at The Digital Hub, Dublin, creating a fully immersive digital art experience for festival attendees. Custom configurations are available for product launches, experiential marketing, immersive exhibitions, and creative installations.",
    ],
  },
  {
    slotId: "tv-hire",
    title: "TV Screen Hire for Events",
    copy: [
      "Sometimes a straightforward TV screen is exactly what's needed. For product demonstrations, behind-the-scenes content at award nights, photo slideshows at social events, or sponsor branding in reception areas, a high-quality TV screen on a professional stand delivers the message without the complexity of a full AV setup.",
      "Our TV hire service includes smart TVs with USB media playback, so you can simply plug in a USB drive with your content. For more complex requirements, we can provide media players, content scheduling systems, or a live laptop feed.",
    ],
  },
];

// ── Screen Size Guide ────────────────────────────────────────────────────────

const sizeGuide = [
  { size: '55–75"', label: "Small meetings & breakout rooms", description: "Ideal for boardrooms, breakout sessions, and intimate presentations. Sharp text and clear visuals at close range.", badge: "Up to 50 people" },
  { size: "7m² – 12.5m²", label: "Conferences & exhibitions", description: "LED video walls for keynote presentations, exhibition stands, and mid-to-large conference halls. High-impact visuals at distance.", badge: "50–200 delegates" },
  { size: "18m²+", label: "Large venues & outdoor events", description: "Full-scale LED walls for major conferences, concerts, festivals, and outdoor events. Maximum visual impact for large audiences.", badge: "200+ delegates" },
];

// ── Why Choose List ──────────────────────────────────────────────────────────

const whyItems = [
  "Professional-grade LED screens, TV monitors, and LED video walls — not consumer-grade equipment",
  "From 55-inch TV screens for boardrooms to huge 50m²+ LED video walls for main stage productions",
  "Indoor and outdoor LED walls with Unilumin and Absen panels — industry-leading resolution and colour accuracy",
  "Curved and custom LED wall configurations for immersive event experiences",
  "Freestanding floor stands, table mounts, and wall-mount options for all screen sizes",
  "Content loading and management included — send us your files, we handle the rest",
  "Full-service hire: delivery, installation, testing, on-site support, and collection",
  "Over 35 years of event production experience across Ireland",
  "Available nationwide: Dublin, Cork, Galway, Limerick, Belfast, and beyond",
];

// ── All-Inclusive Checklist ──────────────────────────────────────────────────

const allInclusiveItems = [
  "Screen & stand",
  "All cabling",
  "Delivery",
  "Setup & testing",
  "On-site support",
  "Collection",
  "Content loading",
  "No hidden fees",
];

// ── Location Links ───────────────────────────────────────────────────────────

const locationLinks = [
  { city: "Dublin", href: "/services/led-walls/dublin" },
  { city: "Cork", href: "/services/led-walls/cork" },
  { city: "Galway", href: "/services/led-walls/galway" },
  { city: "Belfast", href: "/services/led-walls/belfast" },
  { city: "Limerick", href: "/services/led-walls/limerick" },
  { city: "Athlone", href: "/services/led-walls/athlone" },
];

// ── Main Component ───────────────────────────────────────────────────────────

export default function LEDScreenHireV2() {
  const { hero, gallery: libraryGallery } = useServiceImages("service-led-screen-hire");
  const { data: slots = [] } = useServicePageImages("led-screen-hire");

  // Build hero slideshow array
  const heroImages: { image_url: string; alt_text: string | null }[] = [];
  if (hero) heroImages.push({ image_url: hero, alt_text: "LED screen and TV monitor hire for corporate events in Ireland" });
  for (const img of libraryGallery) heroImages.push(img);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Auto-advance slideshow
  useEffect(() => {
    if (isPaused || heroImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, heroImages.length]);

  const serviceSchema = generateServiceSchema({
    name: "LED Screen & TV Hire",
    description: "Professional LED screen and TV hire for conferences, exhibitions, and corporate events across Ireland. Screens from 43 inches to 98 inches with delivery, setup, and on-site support included.",
    url: "https://eventsound.ie/services/led-screen-hire/",
    provider: { name: "EventSound", url: "https://eventsound.ie/" },
    areaServed: ["Dublin", "Cork", "Galway", "Belfast", "Limerick", "Ireland"],
    serviceType: "LED Screen Hire",
  });

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://eventsound.ie/" },
      { name: "Services", url: "https://eventsound.ie/services/" },
      { name: "LED Screen Hire", url: "https://eventsound.ie/services/led-screen-hire/" },
    ],
  });

  const faqSchema = generateFAQSchema({ questions: faqs });

  useSeo({
    title: "LED Screen Hire Ireland | TV Screen & Monitor Rental for Events | EventSound",
    description: "Professional LED screen and TV hire for conferences, exhibitions, and corporate events across Ireland. Screens from 43\" to 98\". Delivery, setup, and on-site support included. Get a free quote.",
    canonical: "https://eventsound.ie/services/led-screen-hire/",
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
              alt={img.alt_text || "LED screen at event"}
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
                <li className="text-white/90">LED Screen Hire</li>
              </ol>
            </nav>

            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase mb-3">
              EventSound &middot; LED Screen Hire
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              LED Screen &amp; TV Hire Ireland
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-4">
              Professional screen and monitor hire for conferences, exhibitions, and corporate events
            </p>
            <p className="text-sm md:text-base text-white/80 mb-8 leading-relaxed">
              EventSound provides LED screen and TV monitor hire for corporate events, conferences, exhibitions, and trade shows across Dublin, Cork, Galway, Belfast, and nationwide Ireland. Whether you need a single large-format display for a boardroom presentation or a multi-screen setup across an exhibition floor, we supply the screens, stands, cabling, and on-site technical support as part of every hire.
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
              Trusted by Fingal County Council &middot; PRISM Summit &middot; Swords Castle Concerts &middot; Local Enterprise Office Louth
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
            <StatCard label="Screens & video walls" value={<>55" – 50m²+</>} />
            <StatCard label="Delivery, setup & collection" value="All-inclusive" />
            <StatCard label="Event production experience" value={<><CountUp end={35} /> yrs</>} />
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
              Our LED screen hire service covers individual displays from 43 inches to 98 inches — ideal for venues and events where a full LED video wall isn't required but you still need professional, high-brightness visually impactful displays. For larger video wall installations using modular LED panels, see our{" "}
              <Link to="/services/led-video-walls/" className="text-accent hover:underline">LED Video Wall Hire</Link> service.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Sections 4–7: Alternating Service Sections ── */}
      {serviceSections.map((section, i) => (
        <section key={section.slotId} className={i % 2 === 1 ? "bg-muted/30" : ""}>
          <div className="container mx-auto px-4 py-16">
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
              {/* Image */}
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

              {/* Text */}
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

      {/* ── Section 8: Screen Size Guide ── */}
      <section className="container mx-auto px-4 py-16">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Which Screen Size Do You Need?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Not sure which display suits your event? Here's a quick guide based on room size and audience.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
          {sizeGuide.map((card, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="group rounded-xl border border-border/50 bg-card p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-accent/40">
                <p className="text-3xl md:text-4xl font-bold text-accent mb-2">{card.size}</p>
                <h3 className="text-lg font-semibold mb-3">{card.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{card.description}</p>
                <span className="inline-block rounded-full bg-accent/10 border border-accent/30 px-4 py-1.5 text-xs font-semibold text-accent">
                  {card.badge}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Section 9: All-Inclusive Banner ── */}
      <section className="container mx-auto px-4 mb-16">
        <ScrollReveal>
          <div className="rounded-2xl bg-gray-900 p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">All-Inclusive Screen Hire</h2>
                <p className="text-gray-300 leading-relaxed">
                  Every EventSound screen hire is quoted on an all-inclusive basis covering the screen, stand, cabling, delivery, setup, on-site support, and collection. Pricing depends on screen size, quantity, duration, and venue location. Contact us for a free, no-obligation quote — we'll recommend the best setup for your event and provide a clear breakdown with no hidden fees.
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

      {/* ── Section 10: Why Choose EventSound ── */}
      <section className="container mx-auto px-4 mb-16">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose EventSound for Screen Hire</h2>
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

      {/* ── Section 11: Google Reviews ── */}
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

      {/* ── Section 12: Frequently Combined With ── */}
      <section className="container mx-auto px-4 mb-16">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Frequently Combined With</h2>
            <p className="text-muted-foreground leading-relaxed">
              Many of our clients combine LED screen hire with{" "}
              <Link to="/services/av-production/" className="text-accent hover:underline">full AV production</Link>{" "}
              for conferences and corporate events. For larger visual displays using modular panels, see our{" "}
              <Link to="/services/led-video-walls/" className="text-accent hover:underline">LED Video Wall Hire</Link>{" "}
              service. Add{" "}
              <Link to="/services/virtual-events/" className="text-accent hover:underline">live streaming and hybrid event</Link>{" "}
              production for remote audiences.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Brand Banner ── */}
      <BrandBanner serviceKey="led-screen-hire" />

      {/* ── Section 13: Gallery ── */}
      <section className="container mx-auto px-4 mb-16">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-8">Recent Screen Hire Projects</h2>
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

      {/* ── Section 14: FAQ Accordion ── */}
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

      {/* ── Section 15: Two-Column Quote Form ── */}
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
                  Need <span className="text-accent">Screen Hire</span> for Your Event?
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

      {/* ── Section 16: Location Links ── */}
      <section className="container mx-auto px-4 mb-16">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Find Screen Hire Near You</h2>
            <p className="text-muted-foreground mb-6">
              EventSound provides LED screen and TV hire across Ireland. Select a city below to learn more about screen hire services in your area.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {locationLinks.map((loc) => (
                <Button
                  key={loc.city}
                  variant="outline"
                  className="transition-transform hover:scale-105"
                  asChild
                >
                  <Link to={loc.href}>{loc.city}</Link>
                </Button>
              ))}
            </div>
          </div>
        </ScrollReveal>
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
