import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { useServiceImages } from "@/hooks/useServiceImages";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { Breadcrumb } from "@/components/site/Breadcrumb";

const CorkConferenceAV = () => {
  const faqs = [
    { question: "What does conference AV cost in Cork?", answer: "Conference AV is quoted on a bespoke basis because every event has different requirements. A small board meeting needs different equipment to a 600-delegate plenary session. Contact us with your event details and we'll provide a transparent, itemised quote within 24 hours." },
    { question: "Can you provide AV for pharmaceutical company conferences in Cork?", answer: "Yes. We regularly provide conference AV for corporate events in Cork. Our equipment and service standards are built to meet the expectations of multinational organisations. We provide radio microphones, PA systems, front lighting, confidence monitors, and livestreaming for events of all scales." },
    { question: "Do you provide livestreaming for Cork conferences?", answer: "Yes. We provide livestreaming capability including camera feeds, encoding, and integration with Zoom, Microsoft Teams, and dedicated streaming platforms. This allows remote delegates to participate alongside your in-person audience in real time." },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema({ items: [
    { name: "Home", url: "https://eventsound.ie/" },
    { name: "Services", url: "https://eventsound.ie/services" },
    { name: "Conference AV Hire", url: "https://eventsound.ie/services/conference-av-hire" },
    { name: "Conference AV Cork", url: "https://eventsound.ie/services/conference-av/cork" },
  ] });

  useSeo({
    title: "Conference AV Services Cork | Event Sound & AV Hire | EventSound",
    description: "Conference AV hire in Cork. Sound, projection, LED screens & staging for corporate conferences, seminars & AGMs across Cork city & county. Get a free quote.",
    canonical: "https://eventsound.ie/services/conference-av/cork",
    ogTitle: "Conference AV Services Cork | EventSound",
    ogDescription: "Professional conference AV services in Cork. Radio mics, PA systems, front lighting & on-site technicians.",
    ogType: "website",
    additionalSchemas: [
      { schema: breadcrumbSchema, schemaId: "breadcrumb-schema" }
    ],
  });
  const { hero } = useServiceImages("service-conference-av");

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Conference AV Hire", href: "/services/conference-av-hire" },
          { name: "Cork" },
        ]}
      />
      <PageHeader
        title="Conference AV Services in Cork"
        subtitle="Professional conference AV for Cork's pharmaceutical and technology sector"
        backgroundImage={hero}
        backgroundAlt="Conference AV setup at corporate event in Cork"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Cork is Ireland's second city and a centre for pharmaceutical, technology, and life sciences industries. Companies including Apple, Pfizer, Johnson & Johnson, and Dell are headquartered in the region, generating consistent demand for professional conference AV at Cork's hotels and event venues. EventSound provides conference AV services across Cork city and county, delivering the same equipment quality and technical standards we provide nationwide.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">What Our Cork Conference AV Service Includes</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Our conference AV service is tailored to each event. A typical setup may include radio microphones (lectern, roving handheld, and headset options from Shure, Sennheiser, and JTS), a PA system built on LD Systems or L-Acoustics components, a digital mixing desk for precise audio control, and front lighting to ensure presenters are clearly visible to the audience and on camera.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            We also provide display screens or projection for presentations, confidence monitors so speakers can see their slides without turning away from the audience, long-range presenter clickers for stage freedom, and livestreaming capability for hybrid events connecting in-person and remote delegates.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Every booking includes an on-site technician who manages equipment from setup through teardown, handles microphone transitions between speakers, monitors audio levels, and resolves any technical issues in real time.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Conference AV for Cork's Pharma and Tech Sector</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Cork's multinational companies run internal conferences, training programmes, product launches, and client events throughout the year. These organisations require AV that meets international corporate standards — reliable audio, professional presentation, and technical teams that operate discreetly and efficiently. EventSound understands these expectations and delivers consistently.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            We have provided conference AV for corporate events across Cork's business parks and city-centre hotels. Whether your event is a 50-person team meeting or a 500-delegate national conference, we supply equipment and expertise to match.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Cork Venues We Provide Conference AV For</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound provides conference AV at Cork's leading venues, including{" "}
            <a href="https://www.rochestownpark.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Rochestown Park Hotel & Conference Centre</a>,{" "}
            <a href="https://www.radissonhotels.com/en-us/hotels/radisson-blu-cork" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Radisson Blu Hotel Cork</a>,{" "}
            <a href="https://www.claytonhotelsilversprings.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Clayton Hotel Silver Springs</a>,{" "}
            <a href="https://www.fotaisland.ie" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Fota Island Resort</a>,{" "}
            <a href="https://www.doylehotels.ie/the-river-lee-hotel" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">The River Lee Hotel</a>,{" "}
            <a href="https://www.flynnhotels.com/hotels/imperial-hotel-cork" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">The Imperial Hotel Cork</a>,{" "}
            <a href="https://thedean.ie/cork" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">The Dean Cork</a>,{" "}
            <a href="https://www.theaddresscork.ie" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">The Address Cork</a>,{" "}
            <a href="https://www.claytonhotelcorkcity.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Clayton Hotel Cork City</a>, and{" "}
            <a href="https://www.corkcity.ie/en/cork-city-hall/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Cork City Hall</a>.
          </p>

          <ScrollReveal>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Looking for LED wall hire in Cork? See our dedicated <Link to="/services/led-walls/cork" className="text-accent hover:underline">Cork LED Wall Hire</Link> page. You can also explore our full <Link to="/services/conference-av-hire" className="text-accent hover:underline">Conference AV Hire</Link> service for Ireland-wide coverage.
            </p>
          </ScrollReveal>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 transition-transform duration-300 hover:scale-[1.05] cursor-default">Frequently Asked Questions — Conference AV Cork</h2>
            <StaggerContainer className="space-y-6">
              {faqs.map((faq, i) => (
                <StaggerItem key={i}>
                  <div className="rounded-xl border border-accent/30 bg-card/40 backdrop-blur-sm p-6 transition-transform duration-300 hover:scale-[1.03] cursor-default">
                    <div className="rounded-lg bg-accent/10 border border-accent/20 px-4 py-3 mb-4">
                      <h3 className="text-lg font-semibold text-accent">{faq.question}</h3>
                    </div>
                    <div className="rounded-lg bg-card/60 border border-border/30 px-4 py-3">
                      <p className="text-foreground/90 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <div className="mt-12 text-center transition-transform duration-300 hover:scale-[1.04] cursor-default">
            <h3 className="text-xl font-semibold mb-2">Get a Quote for Conference AV in Cork</h3>
            <p className="text-muted-foreground mb-4 transition-transform duration-300 hover:scale-[1.04] cursor-default">From board meetings at The Imperial Hotel to national conferences at Rochestown Park, EventSound provides professional conference AV across Cork. Contact us with your event details for a quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default CorkConferenceAV;
