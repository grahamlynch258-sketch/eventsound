import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { generateFAQSchema, generateServiceSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useServiceImages } from "@/hooks/useServiceImages";
import heroFallback from "@/assets/category-vision.jpg";
import { BrandBanner } from "@/components/site/BrandSidebar";

export default function LEDVideoWalls() {
  const faqs = [
    { question: "What size LED screen do I need for my event?", answer: "Screen size depends on your audience size and venue. For conferences of 100-300 people, a 3m x 2m screen works well. For outdoor concerts with 1,000+ attendees, you may need 5m x 3m or larger. We do a free site survey to recommend the perfect configuration for your space." },
    { question: "Can LED walls be used outdoors in Ireland?", answer: "Yes — our LED panels are rated for outdoor use and can handle Irish weather conditions including rain and wind. We use weatherproof cabinets and provide covered rigging solutions for outdoor festivals, concerts, and council events." },
    { question: "How far in advance should I book LED screen hire?", answer: "We recommend booking 4-6 weeks ahead for standard events and 2-3 months for large festivals or peak season (May-September). However, we can often accommodate shorter notice depending on availability." },
    { question: "What content can be displayed on LED video walls?", answer: "Anything — live camera feeds, pre-recorded video, presentations, social media walls, sponsor logos, and live event graphics. We provide full content playback and can help with content formatting to ensure it looks perfect on screen." },
    { question: "Do you provide operators with the LED screens?", answer: "Yes, all our LED wall hire packages include experienced technicians for setup, operation throughout your event, and breakdown. You never need to worry about the technical side." },
    { question: "What is the difference between LED walls and projection screens?", answer: "LED walls are significantly brighter, work in daylight conditions, and offer superior image quality. Projection screens are affected by ambient light and are generally only suitable for darker indoor venues. For most events in Ireland, LED walls deliver a far better audience experience." }
  ];

  const serviceSchema = generateServiceSchema({
    name: "LED Video Wall Hire",
    description: "Professional LED video wall hire for conferences, concerts, festivals and corporate events across Ireland. Custom configurations from 2m² to 50m²+.",
    serviceType: "LED Screen Rental",
    url: "https://eventsound.ie/services/led-video-walls"
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://eventsound.ie/" },
    { name: "Services", url: "https://eventsound.ie/services" },
    { name: "LED Video Walls", url: "https://eventsound.ie/services/led-video-walls" }
  ]);

  useSeo({
    title: "LED Screen & Video Wall Hire Dublin & Ireland | EventSound",
    description: "Professional LED video wall hire for corporate events, conferences, and live shows across Ireland. Custom sizes, content playback, and on-site operation included.",
    canonical: "https://eventsound.ie/services/led-video-walls",
    schema: generateFAQSchema({ questions: faqs }),
    schemaId: "faq-schema",
    additionalSchemas: [
      { schema: serviceSchema, id: "service-schema" },
      { schema: breadcrumbSchema, id: "breadcrumb-schema" }
    ]
  });

  const { hero, gallery } = useServiceImages("service-led-walls");

  return (
    <PageShell>
      <PageHeader
        title="LED Video Wall Hire in Ireland"
        subtitle="High-impact visual displays for events of every scale"
        backgroundImage={hero || heroFallback}
        backgroundAlt="Unilumin LED video wall installed at a corporate event in Ireland"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound provides professional LED video wall hire for corporate events, conferences, product launches, awards ceremonies, and live shows across Ireland. Our Unilumin LED panels deliver stunning high-resolution visuals that transform any venue — from intimate boardrooms to large-scale arenas.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Custom Configurations for Every Venue</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Every event space is different, which is why we offer fully customisable LED wall sizes and configurations. Whether you need a single screen behind a keynote speaker, a wide-format display for a gala dinner, or a multi-screen setup for a conference breakout area, we design the layout to suit your venue and content. Our team handles pixel mapping, content scaling, and signal management so your visuals look perfect from every seat in the house.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Full-Service LED Wall Solutions</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            When you hire LED walls from EventSound, you get more than just panels. Our service includes delivery, installation, content playback management, on-site technical operation, and breakdown. We work with your creative team or agency to ensure presentations, videos, and live feeds display exactly as intended. Our experienced operators are on hand throughout your event to manage transitions, troubleshoot, and keep everything running seamlessly.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Why EventSound for LED Video Walls?</h2>
          <div className="text-left inline-block">
          <ul className="space-y-2 text-muted-foreground list-disc list-inside transition-transform duration-300 hover:scale-[1.04] cursor-default">
            <li>Unilumin LED panels — industry-leading resolution and reliability</li>
            <li>Custom sizing from 2m² to 50m² and beyond</li>
            <li>Full content playback and signal management included</li>
            <li>Experienced operators on-site for your entire event</li>
            <li>Serving clients nationwide across Ireland</li>
          </ul>
          </div>

          {gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Our LED Walls in Action</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gallery.map((img) => (
                  <img key={img.id} src={img.image_url} alt={img.alt_text || "LED video wall at event"} className="rounded-lg w-full aspect-video object-cover" loading="lazy" />
                ))}
              </div>
            </div>
          )}

          <BrandBanner serviceKey="led-video-walls" />

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Related Services</h2>
          <div className="flex flex-wrap gap-3 justify-center transition-transform duration-300 hover:scale-[1.03] cursor-default">
            <Link to="/services/lighting-design"><Button variant="outline">Lighting Design</Button></Link>
            <Link to="/services/video-production"><Button variant="outline">Video Production</Button></Link>
            <Link to="/services/event-production"><Button variant="outline">Event Production</Button></Link>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 transition-transform duration-300 hover:scale-[1.05] cursor-default">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-primary/30 bg-card/40 backdrop-blur-sm p-6 transition-transform duration-300 hover:scale-[1.03] cursor-default">
                  <div className="rounded-lg bg-primary/10 border border-primary/20 px-4 py-3 mb-4">
                    <h3 className="text-lg font-semibold text-primary">{faq.question}</h3>
                  </div>
                  <div className="rounded-lg bg-card/60 border border-border/30 px-4 py-3">
                    <p className="text-foreground/90 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center transition-transform duration-300 hover:scale-[1.04] cursor-default">
            <h3 className="text-xl font-semibold mb-2">Need LED Walls for Your Event?</h3>
            <p className="text-muted-foreground mb-4 transition-transform duration-300 hover:scale-[1.04] cursor-default">Tell us your venue, date, and requirements — we'll respond with a tailored quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
