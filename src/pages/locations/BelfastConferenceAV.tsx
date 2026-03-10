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

const BelfastConferenceAV = () => {
  const faqs = [
    { question: "What does conference AV cost in Belfast?", answer: "We provide bespoke quotations based on your event's specific requirements. We can quote in either GBP or EUR. Contact us with your event details for a detailed quote within 24 hours." },
    { question: "Do you operate cross-border for Belfast events?", answer: "Yes. We regularly provide conference AV at venues in Belfast and across Northern Ireland. Equipment transport across the border is routine, and we are experienced in the logistics of cross-border event production." },
    { question: "Can you provide conference AV at ICC Belfast?", answer: "Yes. We provide conference AV at ICC Belfast, including its main auditorium, exhibition spaces, and meeting rooms. Our team is familiar with ICC Belfast's technical infrastructure, power distribution, and load-in procedures." },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://eventsound.ie/" },
    { name: "Services", url: "https://eventsound.ie/services" },
    { name: "Conference AV Hire", url: "https://eventsound.ie/services/conference-av-hire" },
    { name: "Conference AV Belfast", url: "https://eventsound.ie/services/conference-av/belfast" },
  ]);

  useSeo({
    title: "Conference AV Services Belfast | Event Sound & AV Hire | EventSound",
    description: "Conference AV hire in Belfast. Sound, LED screens, confidence monitors & stage lighting for corporate conferences across Northern Ireland. Get a quote today.",
    canonical: "https://eventsound.ie/services/conference-av/belfast",
    ogTitle: "Conference AV Services Belfast | EventSound",
    ogDescription: "Professional conference AV in Belfast & Northern Ireland. Cross-border service from Ireland.",
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
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Conference AV Hire", href: "/services/conference-av-hire" },
          { label: "Belfast" },
        ]}
      />
      <PageHeader
        title="Conference AV Services in Belfast"
        subtitle="Cross-border conference AV for Belfast's world-class venues"
        backgroundImage={hero}
        backgroundAlt="Conference AV setup at corporate event in Belfast"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Belfast is a world-class conference destination, recognised with multiple Best Conference Destination awards. ICC Belfast is one of Europe's leading convention centres, Titanic Belfast offers unique event spaces, and the city's hotel sector continues to grow. EventSound provides conference AV services in Belfast and across Northern Ireland, operating cross-border from our base in Ireland.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">What Our Belfast Conference AV Service Includes</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Our conference AV service covers everything needed for a professional event: radio microphones (lectern, roving, and headset from Shure, Sennheiser, and JTS), PA systems with LD Systems and L-Acoustics components, digital mixing desks, front lighting for presenter visibility and camera feeds, display screens or projection, confidence monitors, long-range presenter clickers, and on-site technicians.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            For larger Belfast conferences, we provide livestreaming capability for hybrid events, IMAG camera feeds, and multi-room audio distribution. ICC Belfast's 75,000+ square feet of event space can accommodate complex multi-room configurations, and our technical team has experience managing AV across large-scale conference setups.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Cross-Border Conference AV Service</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound operates across the island of Ireland. Belfast is readily accessible from our base and we regularly transport equipment and technical staff across the border for events in Northern Ireland. Cross-border equipment movement is routine and straightforward — there are no customs complications for temporary event AV.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            We can provide quotations in either GBP or EUR for Belfast and Northern Ireland events. Our pricing and service levels are consistent regardless of location on the island.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Belfast Venues We Provide Conference AV For</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound provides conference AV at Belfast's leading venues, including{" "}
            <a href="https://www.iccbelfast.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">ICC Belfast</a>,{" "}
            <a href="https://www.titanicbelfast.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Titanic Belfast</a>,{" "}
            <a href="https://www.titanicexhibitioncentre.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Titanic Exhibition Centre</a>,{" "}
            <a href="https://www.waterfront.co.uk" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Waterfront Hall</a>,{" "}
            <a href="https://www.belfastcity.gov.uk/cityhall" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Belfast City Hall</a>,{" "}
            <a href="https://www.hastingshotels.com/europa-belfast" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Europa Hotel</a>,{" "}
            <a href="https://www.hastingshotels.com/grand-central" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Grand Central Hotel</a>, and{" "}
            <a href="https://www.hilton.com/en/hotels/bfsblhi-hilton-belfast" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Hilton Belfast</a>.
          </p>

          <ScrollReveal>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Looking for LED wall hire in Belfast? See our dedicated <Link to="/services/led-walls/belfast" className="text-accent hover:underline">Belfast LED Wall Hire</Link> page. You can also explore our full <Link to="/services/conference-av-hire" className="text-accent hover:underline">Conference AV Hire</Link> service for Ireland-wide coverage.
            </p>
          </ScrollReveal>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 transition-transform duration-300 hover:scale-[1.05] cursor-default">Frequently Asked Questions — Conference AV Belfast</h2>
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
            <h3 className="text-xl font-semibold mb-2">Get a Quote for Conference AV in Belfast</h3>
            <p className="text-muted-foreground mb-4 transition-transform duration-300 hover:scale-[1.04] cursor-default">From corporate meetings at city-centre hotels to international conferences at ICC Belfast, EventSound delivers cross-border conference AV across Northern Ireland. Contact us with your event details for a quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default BelfastConferenceAV;
