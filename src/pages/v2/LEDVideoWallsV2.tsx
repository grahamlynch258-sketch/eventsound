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
import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, Phone, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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

function SlotImage({ slots, slotId, aspect = "aspect-video", className = "" }: {
  slots: ServicePageImageSlot[];
  slotId: string;
  aspect?: string;
  className?: string;
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
  { question: "What pixel pitch LED wall do I need for a conference?", answer: "For conferences with viewing distances of 3 to 10 metres, we recommend 2.6mm or 3.9mm pixel pitch panels. For exhibitions where attendees stand 1 to 3 metres from the screen, 1.9mm provides the sharpest image. Our team will advise based on your venue layout and audience size." },
  { question: "Can LED walls be used outdoors?", answer: "Yes. We provide weather-rated outdoor LED panels with high-brightness output for daylight visibility. Outdoor screens typically use 3.9mm to 4.8mm pixel pitch and are mounted on freestanding ground-support structures." },
  { question: "How much does LED wall hire cost in Ireland?", answer: "LED wall hire starts from €125 per square metre per day for dry hire. Pricing varies depending on pixel pitch, screen size, and event requirements. We recommend speaking to our team to ensure you get the best setup and the most out of your budget." },
  { question: "What is the largest LED wall you can provide?", answer: "We regularly install screens up to 50m² and can configure larger displays for outdoor festivals and concerts. Screen size is limited only by venue dimensions and structural capacity." },
  { question: "What content can be displayed on LED video walls?", answer: "Anything — live camera feeds, pre-recorded video, presentations, social media walls, sponsor logos, and live event graphics. We provide full content playback and can help with content formatting to ensure it looks perfect on screen." },
  { question: "Do you provide operators with the LED screens?", answer: "Yes, all our LED wall hire packages include experienced technicians for setup, operation throughout your event, and breakdown. You never need to worry about the technical side." },
];

// ── Use Cases ────────────────────────────────────────────────────────────────

const useCases = [
  { slotId: "use-case-1", title: "Corporate conferences and seminars", copy: "Main stage backdrop for keynote presentations, IMAG (image magnification) for large audiences, and confidence monitors for speakers. LED walls replace projection in venues with high ambient light." },
  { slotId: "use-case-2", title: "Awards ceremonies and gala dinners", copy: "Full-width LED backdrops for branding, nominee graphics, winner announcements, and live camera relay so every table has a clear view of the stage." },
  { slotId: "use-case-3", title: "Exhibitions and trade shows", copy: "Stand-mounted LED panels for product demonstrations, promotional video loops, and branded content. High-resolution 1.9mm panels ensure sharp visuals at close viewing distances." },
  { slotId: "use-case-4", title: "Outdoor festivals and concerts", copy: "High-brightness LED screens for main stage visuals, live camera feeds, sponsor content, and audience engagement. Weather-rated panels with ground-support or rigged mounting." },
  { slotId: "use-case-5", title: "Product launches and brand activations", copy: "Custom-sized screens with branded content, countdown sequences, reveal moments, and social media feeds displayed in real time." },
  { slotId: "use-case-6", title: "Hybrid and virtual events", copy: "LED walls as studio backdrops for presenters, combined with camera relay for in-room and remote audiences simultaneously." },
];

// ── Pixel Pitch Table ────────────────────────────────────────────────────────

const pixelPitchData = [
  { pitch: "1.9mm", bestFor: "Exhibitions, close-up product visuals", minDistance: "3m" },
  { pitch: "2.6mm", bestFor: "Conferences, keynote backdrops", minDistance: "4.5m" },
  { pitch: "3.9mm", bestFor: "Large conferences, stage backdrops", minDistance: "6.5m" },
  { pitch: "4.8mm", bestFor: "Outdoor festivals, concerts", minDistance: "8.5m" },
];

// ── Why Hire List ────────────────────────────────────────────────────────────

const whyItems = [
  "Unilumin and Absen LED panels — industry-leading resolution and colour accuracy",
  "Over 35 years of event production experience across Ireland",
  "Full-service: delivery, installation, operation, and breakdown included",
  "Indoor and outdoor LED walls from 6m² to 100m²+",
  "Curved and custom configurations for immersive installations",
  "Works alongside your creative team or agency for content delivery",
  "Transparent pricing — no hidden fees or surprise extras",
  "Available nationwide: Dublin, Cork, Galway, Limerick, Belfast, and beyond",
];

// ── Location Pages ───────────────────────────────────────────────────────────

const locationLinks = [
  { city: "Dublin", href: "/services/led-walls/dublin" },
  { city: "Cork", href: "/services/led-walls/cork" },
  { city: "Galway", href: "/services/led-walls/galway" },
  { city: "Belfast", href: "/services/led-walls/belfast" },
  { city: "Limerick", href: "/services/led-walls/limerick" },
  { city: "Athlone", href: "/services/led-walls/athlone" },
];

// ── Main Component ───────────────────────────────────────────────────────────

export default function LEDVideoWallsV2() {
  const { hero, gallery: libraryGallery } = useServiceImages("service-led-walls");
  const { data: slots = [] } = useServicePageImages("led-video-walls");

  // Build hero slideshow array from all Library images in this category
  const heroImages: { image_url: string; alt_text: string | null }[] = [];
  if (hero) heroImages.push({ image_url: hero, alt_text: "Unilumin LED video wall installed at a corporate event in Ireland" });
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
    name: "LED Video Wall Hire",
    description: "LED video wall hire across Ireland. Unilumin and Absen panels from 1.9mm to 3.9mm pixel pitch for conferences, exhibitions, concerts, and corporate events.",
    url: "https://eventsound.ie/services/led-video-walls",
    provider: { name: "EventSound", url: "https://eventsound.ie" },
    areaServed: ["Dublin", "Cork", "Galway", "Belfast", "Limerick", "Ireland"],
    serviceType: "LED Video Wall Hire",
  });

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://eventsound.ie" },
      { name: "Services", url: "https://eventsound.ie/services" },
      { name: "LED Video Walls", url: "https://eventsound.ie/services/led-video-walls" },
    ],
  });

  useSeo({
    title: "LED Screen Hire Ireland | LED Video Wall Rental Dublin | EventSound",
    description: "LED video wall hire across Ireland. Unilumin & Absen panels from 1.9mm to 3.9mm pixel pitch. Indoor, outdoor & curved configurations. Delivery, setup & operator included.",
    canonical: "https://eventsound.ie/services/led-video-walls",
    additionalSchemas: [
      { schema: serviceSchema, schemaId: "service-schema" },
      { schema: breadcrumbSchema, schemaId: "breadcrumb-schema" },
    ],
  });

  return (
    <PageShell>
      {/* ── Section 1: Hero — crystal clear image, no overlays ── */}
      <section
        className="relative min-h-[85vh] flex items-center overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Hero images — NO overlay, NO opacity reduction, NO gradient mask */}
        <div className="absolute inset-0">
          {heroImages.map((img, i) => (
            <img
              key={img.image_url}
              src={img.image_url}
              alt={img.alt_text || "LED video wall at event"}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms]"
              style={{ opacity: i === currentSlide ? 1 : 0 }}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : undefined}
              decoding="async"
            />
          ))}
        </div>

        {/* Content overlaid centred — text-shadow for readability */}
        <div
          className="relative z-10 container mx-auto px-6 pb-14 pt-32 text-center flex flex-col items-center"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
        >
          {/* Breadcrumb */}
          <nav className="mb-8 text-base text-white/80 animate-fade-up" aria-label="Breadcrumb">
            <ol className="flex items-center justify-center gap-2">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><ChevronRight className="h-4 w-4" /></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><ChevronRight className="h-4 w-4" /></li>
              <li className="text-white">LED Video Walls</li>
            </ol>
          </nav>

          <p className="text-sm font-semibold tracking-[0.2em] text-accent uppercase mb-4 animate-fade-up [animation-delay:100ms]">
            EventSound &middot; LED Video Walls
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-accent mb-6 animate-fade-up [animation-delay:200ms]">
            LED Screen Hire Ireland
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mb-6 animate-fade-up [animation-delay:300ms]">
            High-impact visual displays for events of every scale
          </p>
          <p className="text-lg text-white/90 max-w-3xl mb-10 animate-fade-up [animation-delay:400ms]">
            EventSound provides LED video wall hire across Ireland for conferences, corporate events, exhibitions, awards ceremonies, concerts, and outdoor festivals. Based in Drogheda, Co. Louth, we deliver and install LED walls at venues in Dublin, Cork, Galway, Belfast, and nationwide.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-up [animation-delay:500ms]" style={{ textShadow: "none" }}>
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

          {/* Slideshow dots */}
          {heroImages.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-2 animate-fade-up [animation-delay:600ms]" style={{ textShadow: "none" }}>
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
        </div>
      </section>

      {/* ── Section 2: Key Stats ── */}
      <section className="container mx-auto px-4 -mt-12 relative z-10 mb-16">
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="per m² / day" sublabel="dry hire from" value={<>&euro;<CountUp end={125} /></>} />
            <StatCard label="custom sizes" sublabel="indoor &amp; outdoor" value="6–100m²+" />
            <StatCard label="event production" sublabel="experience across Ireland" value={<><CountUp end={35} /> yrs</>} />
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
              We stock Unilumin and Absen LED panels in pixel pitches from 1.9mm to 3.9mm, with screen sizes from 6m² for conference presentations to 50m²+ for large-scale outdoor stages. Every hire includes delivery, installation, content management, a dedicated on-site operator, and full breakdown after your event. For individual screen and TV monitor hire for conferences and exhibitions, see our{" "}
              <Link to="/services/led-screen-hire/" className="text-accent hover:underline">LED Screen Hire</Link> service.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Section 4: Service Type Cards ── */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid gap-8 md:grid-cols-3">
          <ServiceTypeCard
            slots={slots}
            slotId="service-type-1"
            title="Indoor LED Wall Hire"
            delay={0}
          >
            <p>Indoor LED walls are the standard for corporate conferences, awards nights, AGMs, product launches, and exhibitions across Ireland. Our indoor Unilumin panels deliver high resolution and accurate colour reproduction at close viewing distances — essential when your audience is seated 3 to 10 metres from the screen.</p>
            <p>For conferences and seminars, we recommend 2.6mm or 3.9mm pixel pitch panels depending on your venue size and viewing distance. For exhibitions and trade shows where attendees view the screen from 1 to 3 metres, our 1.9mm panels provide the sharpest detail for product imagery and video content.</p>
            <p>Indoor LED walls replace traditional projection in venues where ambient light, ceiling height, or room layout make projectors impractical. LED panels produce their own light, so they deliver consistent brightness and contrast regardless of room lighting conditions.</p>
          </ServiceTypeCard>

          <ServiceTypeCard
            slots={slots}
            slotId="service-type-2"
            title="Outdoor LED Wall Hire"
            delay={0.1}
          >
            <p>For outdoor events, festivals, concerts, and sports screenings, we provide weather-rated LED panels with high-brightness output visible in direct sunlight. Our outdoor screens are available in sizes from 8m² to 50m²+ and are built on freestanding ground-support structures or integrated with stage rigging.</p>
            <p>We have provided outdoor LED walls for events including the Swords Castle Summer Concerts (main stage LED wall, PA, and lighting) and multi-day festival productions. Outdoor LED panels use a higher pixel pitch (typically 3.9mm to 4.8mm) for viewing distances of 10 metres and above, balancing image quality with the brightness needed for daylight visibility.</p>
          </ServiceTypeCard>

          <ServiceTypeCard
            slots={slots}
            slotId="service-type-3"
            title="Curved and Custom LED Wall Configurations"
            delay={0.2}
          >
            <p>EventSound designs and installs curved, angled, and custom-shaped LED wall configurations for immersive event experiences. Our curved Absen LED wall installation at the PRISM Immersive Technology Summit at DkIT transformed the An Macánna Theatre into an engaging conference space with a wraparound visual backdrop for speakers and demonstrations.</p>
            <p>We also delivered a curved LED video wall installation for Beta Festival 2025 at The Digital Hub, Dublin, creating a fully immersive digital art experience for festival attendees. Custom configurations are available for product launches, experiential marketing, immersive exhibitions, and creative installations.</p>
          </ServiceTypeCard>
        </div>
      </section>

      {/* ── Section 5: Pricing Guide + Pixel Pitch Table ── */}
      <section className="container mx-auto px-4 mb-16">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">LED Wall Hire Pricing Guide</h2>
            <p className="text-muted-foreground leading-relaxed">
              LED wall hire starts from €125 per square metre per day for dry hire. Final pricing depends on pixel pitch (finer pitches like 1.9mm cost more than 3.9mm), total screen area, number of event days, venue access time for installation, and whether additional services such as media servers or camera switching are required. We recommend speaking to our team before booking — we'll help you choose the right specification for your venue and audience so you get the most out of your budget. Contact us for a detailed quote based on your specific event requirements.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="max-w-2xl mx-auto overflow-hidden rounded-xl border border-border/50">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-accent/10 text-left">
                  <th className="px-4 py-3 font-semibold">Pixel Pitch</th>
                  <th className="px-4 py-3 font-semibold">Best For</th>
                  <th className="px-4 py-3 font-semibold">Min. Viewing Distance</th>
                </tr>
              </thead>
              <tbody>
                {pixelPitchData.map((row, i) => (
                  <tr key={row.pitch} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                    <td className="px-4 py-3 font-medium text-accent">{row.pitch}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.bestFor}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.minDistance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Section 6: Use Cases ── */}
      <section className="container mx-auto px-4 mb-16">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-8">LED Wall Hire Use Cases</h2>
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((uc, i) => (
            <ScrollReveal key={uc.slotId} delay={i * 0.08}>
              <div className="group rounded-xl border border-border/50 bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="aspect-[4/3] overflow-hidden">
                  <SlotImage slots={slots} slotId={uc.slotId} aspect="aspect-[4/3]" className="transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold mb-2">{uc.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{uc.copy}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Section 7: Why Hire from EventSound ── */}
      <section className="container mx-auto px-4 mb-16">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-8">Why Hire LED Walls from EventSound?</h2>
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

      {/* ── Section 8: Google Reviews — static grid ── */}
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

      {/* ── Section 9: Frequently Combined With ── */}
      <section className="container mx-auto px-4 mb-16">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Frequently Combined With</h2>
            <p className="text-muted-foreground leading-relaxed">
              Many of our clients combine LED video walls with{" "}
              <Link to="/services/lighting-design/" className="text-accent hover:underline">professional event lighting</Link>{" "}
              and{" "}
              <Link to="/services/av-production/" className="text-accent hover:underline">full AV production</Link>{" "}
              for a complete visual experience. For events with a remote audience, add our{" "}
              <Link to="/services/virtual-events/" className="text-accent hover:underline">live streaming and hybrid event</Link>{" "}
              services. See how we delivered LED walls for the{" "}
              <Link to="/case-studies/swords-castle-summer-concerts" className="text-accent hover:underline">Swords Castle Summer Concerts</Link>.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Brand Banner ── */}
      <BrandBanner serviceKey="led-video-walls" />

      {/* ── Section 10: Gallery ── */}
      <section className="container mx-auto px-4 mb-16">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-8">Recent LED Wall Projects</h2>
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

      {/* ── Section 11: FAQ Accordion ── */}
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

      {/* ── Section 12: Inline Quote Form ── */}
      <section id="quote-form" className="container mx-auto px-4 mb-16 scroll-mt-20">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Need LED Walls for Your Event?</h2>
              <p className="text-muted-foreground">
                Tell us your venue, date, and requirements — we'll respond with a tailored quote within 24 hours.
              </p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-6 md:p-8">
              <ContactForm />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              or call{" "}
              <a href="tel:+353863520476" className="text-accent hover:underline font-medium">
                086 352 0476
              </a>
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Section 13: Location Links ── */}
      <section className="container mx-auto px-4 mb-16">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Find LED Wall Hire Near You</h2>
            <p className="text-muted-foreground mb-6">
              EventSound provides LED wall hire across Ireland. Select a city below to learn more about LED wall services in your area.
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
    </PageShell>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ value, label, sublabel }: { value: React.ReactNode; label: string; sublabel: string }) {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-5 text-center shadow-lg">
      <p className="text-2xl md:text-3xl font-bold text-accent">{value}</p>
      <p className="text-sm font-medium text-foreground mt-1">{label}</p>
      <p className="text-xs text-muted-foreground">{sublabel}</p>
    </div>
  );
}

function ServiceTypeCard({
  slots,
  slotId,
  title,
  delay,
  children,
}: {
  slots: ServicePageImageSlot[];
  slotId: string;
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <ScrollReveal delay={delay}>
      <div className="group rounded-xl border border-border/50 bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="aspect-[16/10] overflow-hidden">
          <SlotImage slots={slots} slotId={slotId} aspect="aspect-[16/10]" className="transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-3">{title}</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
