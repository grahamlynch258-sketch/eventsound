import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { generateFAQSchema, generateServiceSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useServiceImages } from "@/hooks/useServiceImages";

import { BrandBanner } from "@/components/site/BrandSidebar";

export default function VideoProduction() {
  const faqs = [
    { question: "What video production services do you offer for events?", answer: "We provide multi-camera live filming, live streaming, IMAG (image magnification) for large audiences, post-event highlight videos, speaker recording, and live vision mixing. All services include professional camera operators and equipment." },
    { question: "Can you live stream our event?", answer: "Yes — we provide full live streaming to any platform including YouTube, Vimeo, Teams, Zoom, and custom RTMP destinations. Our streaming packages include encoding hardware, graphics overlays, and a dedicated streaming technician." },
    { question: "What is IMAG and when do I need it?", answer: "IMAG stands for Image Magnification — projecting live camera feeds onto large screens so audiences can see speakers and performers close-up. It is essential for any event with 200+ attendees where not everyone has a clear sightline to the stage." },
    { question: "How many cameras do you typically use?", answer: "Most corporate events use 2-3 cameras. Large concerts and conferences may use 4-6 cameras plus robotic PTZ cameras. We recommend a camera plan based on your event layout, content, and budget." },
    { question: "Do you provide post-event video editing?", answer: "Yes — we offer full post-production including multi-camera editing, colour grading, graphics, and delivery in any format. Highlight reels are typically delivered within 5-10 working days after your event." },
    { question: "What internet connection do I need for live streaming?", answer: "We recommend a minimum 10Mbps dedicated upload speed for HD streaming. We carry bonded cellular units as backup and can provide satellite uplink for venues with poor connectivity." }
  ];

  const serviceSchema = generateServiceSchema({
    name: "Event Video Production",
    description: "Professional event video production in Ireland. Multi-camera filming, live streaming, IMAG, and post-event editing for conferences, concerts and corporate events.",
    serviceType: "Event Video Production",
    url: "https://eventsound.ie/services/video-production"
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://eventsound.ie/" },
    { name: "Services", url: "https://eventsound.ie/services" },
    { name: "Video Production", url: "https://eventsound.ie/services/video-production" }
  ]);

  useSeo({
    title: "Event Video Production & Streaming Dublin & Ireland | EventSound",
    description: "Professional multi-camera video production and live streaming for events across Ireland. Capture, broadcast, and post-production for corporate events, conferences, and live shows.",
    canonical: "https://eventsound.ie/services/video-production",
    schema: generateFAQSchema({ questions: faqs }),
    schemaId: "faq-schema",
    additionalSchemas: [
      { schema: serviceSchema, id: "service-schema" },
      { schema: breadcrumbSchema, id: "breadcrumb-schema" }
    ]
  });

  const { hero, gallery } = useServiceImages("service-video");

  return (
    <PageShell>
      <PageHeader title="Video Production & Streaming in Ireland" subtitle="Capture and broadcast your event to any audience" backgroundImage={hero} backgroundAlt="Multi-camera video production at a live event in Ireland" />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound provides professional multi-camera video production and live streaming for corporate events, conferences, product launches, and live shows across Ireland. Whether you need to capture your event for post-production or broadcast it live to a global audience, our video team delivers broadcast-quality results.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Multi-Camera Capture</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Our multi-camera setups capture every angle of your event — from wide shots of the venue to close-ups of speakers and performers. We use broadcast-grade cameras, vision mixers, and recording systems to produce professional footage suitable for corporate communications, social media, and marketing content. Our camera operators are experienced in live event environments and work discreetly to capture natural, engaging footage.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Live Streaming</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Extend your event's reach with professional live streaming to platforms including YouTube, Vimeo, Teams, Zoom, and custom RTMP destinations. We handle encoding, bandwidth management, and stream monitoring to ensure a reliable, high-quality broadcast. Graphics overlays, lower thirds, and picture-in-picture layouts are available to give your stream a polished, branded look.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Why EventSound for Video?</h2>
          <div className="text-left inline-block">
          <ul className="space-y-2 text-muted-foreground list-disc list-inside transition-transform duration-300 hover:scale-[1.04] cursor-default">
            <li>Broadcast-grade cameras and vision mixing</li>
            <li>Live streaming to any platform with custom branding</li>
            <li>Multi-camera setups for complete event coverage</li>
            <li>Post-production editing available</li>
            <li>Integrates seamlessly with our sound and lighting services</li>
          </ul>
          </div>

          {gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Our Video Production Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gallery.map((img) => (
                  <img key={img.id} src={img.image_url} alt={img.alt_text || "Video production at live event"} className="rounded-lg w-full aspect-video object-cover" loading="lazy" />
                ))}
              </div>
            </div>
          )}

          <BrandBanner serviceKey="video-production" />

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Related Services</h2>
          <div className="flex flex-wrap gap-3 justify-center transition-transform duration-300 hover:scale-[1.03] cursor-default">
            <Link to="/services/led-video-walls"><Button variant="outline">LED Video Walls</Button></Link>
            <Link to="/services/virtual-events"><Button variant="outline">Virtual Events</Button></Link>
            <Link to="/services/event-production"><Button variant="outline">Event Production</Button></Link>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 transition-transform duration-300 hover:scale-[1.05] cursor-default">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-accent/30 bg-card/40 backdrop-blur-sm p-6 transition-transform duration-300 hover:scale-[1.03] cursor-default">
                  <div className="rounded-lg bg-accent/10 border border-accent/20 px-4 py-3 mb-4">
                    <h3 className="text-lg font-semibold text-accent">{faq.question}</h3>
                  </div>
                  <div className="rounded-lg bg-card/60 border border-border/30 px-4 py-3">
                    <p className="text-foreground/90 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center transition-transform duration-300 hover:scale-[1.04] cursor-default">
            <h3 className="text-xl font-semibold mb-2">Need Video for Your Event?</h3>
            <p className="text-muted-foreground mb-4 transition-transform duration-300 hover:scale-[1.04] cursor-default">Tell us your event format and streaming requirements — we'll design a video solution and quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
