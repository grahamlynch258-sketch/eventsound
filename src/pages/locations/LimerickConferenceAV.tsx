import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { useServiceImages } from "@/hooks/useServiceImages";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";

const LimerickConferenceAV = () => {
  const faqs = [
    { question: "What does conference AV cost in Limerick?", answer: "Every event is different, so we provide bespoke quotations. Contact us with your event details and we'll provide a detailed, transparent quote within 24 hours." },
    { question: "Can you provide AV for conferences at the University of Limerick?", answer: "Yes. UL hosts hundreds of conferences and academic events each year. We provide conference AV for events at UL's conference facilities, including the UL Arena and campus meeting venues. Our team is experienced with the university's event infrastructure." },
    { question: "Do you cover the wider Shannon region?", answer: "Yes. We serve events across Limerick city and the wider Shannon region, including Ennis, Shannon town, North Tipperary, and surrounding areas." },
  ];

  useSeo({
    title: "Conference AV Services Limerick | Event Sound & AV Hire | EventSound",
    description: "Professional conference AV in Limerick & the Shannon region. Radio mics, PA systems, front lighting, livestreaming. Limerick Strand Hotel, UL & Limerick venues.",
    canonical: "https://eventsound.ie/services/conference-av/limerick",
    ogTitle: "Conference AV Services Limerick | EventSound",
    ogDescription: "Professional conference AV in Limerick & the Shannon region. Radio mics, PA systems & on-site technicians.",
    ogType: "website",
  });
  const { hero } = useServiceImages("service-conference-av");

  return (
    <PageShell>
      <PageHeader
        title="Conference AV Services in Limerick"
        subtitle="Professional conference AV for Limerick and the Shannon region"
        backgroundImage={hero}
        backgroundAlt="Conference AV setup at corporate event in Limerick"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Limerick is the Shannon region's primary conference destination, with a strategic location under two hours from Dublin, Cork, and Galway. The city's conference infrastructure is anchored by the Limerick Strand Hotel and the University of Limerick, which together host hundreds of events each year. EventSound provides conference AV across Limerick city and the wider Shannon region.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">What Our Limerick Conference AV Service Includes</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Our conference AV service is specified to each event. A typical Limerick conference setup includes radio microphones (lectern, roving, and headset from Shure, Sennheiser, and JTS), PA systems with LD Systems and L-Acoustics components, a digital mixing desk, front lighting, display screens or projection, confidence monitors, long-range presenter clickers, and an on-site technician.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            For larger events at the Limerick Strand Hotel's Shannon Suite (capacity 600) or University of Limerick conference facilities, we add livestreaming for hybrid delivery, IMAG camera feeds, and multi-room audio distribution for plenary and breakout sessions.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Conference AV for Limerick's Corporate and Academic Market</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Limerick's pharmaceutical and technology companies — Analog Devices, Cook Medical, Northern Trust, and others — regularly host corporate conferences, training events, and client presentations that require professional AV. The University of Limerick adds significant academic conference demand. EventSound provides equipment and technical support that meets the standards both sectors expect.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Shannon Airport, just 15 minutes from Limerick city, provides international connectivity for events attracting overseas delegates. Colbert Train Station connects Limerick to Dublin and Cork by rail. This accessibility makes Limerick a practical choice for national conferences, and the AV infrastructure needs to match.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Limerick Venues We Provide Conference AV For</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound provides conference AV at Limerick's leading venues, including{" "}
            <a href="https://www.strandhotellimerick.ie" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Limerick Strand Hotel</a>,{" "}
            <a href="https://www.ul.ie" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">University of Limerick</a>,{" "}
            <a href="https://www.radissonhotels.com/en-us/hotels/radisson-blu-limerick" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Radisson Blu Hotel Limerick</a>,{" "}
            <a href="https://www.claytonhotellimerick.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Clayton Hotel Limerick</a>,{" "}
            <a href="https://www.greenhillsgroup.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Greenhills Hotel</a>,{" "}
            <a href="https://www.southcourthotel.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">South Court Hotel</a>,{" "}
            <a href="https://www.castletroypark.ie" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Castletroy Park Hotel</a>, and{" "}
            <a href="https://www.adaremanor.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Adare Manor</a>.
          </p>

          <ScrollReveal>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Looking for LED wall hire in Limerick? See our dedicated <Link to="/services/led-walls/limerick" className="text-accent hover:underline">Limerick LED Wall Hire</Link> page. You can also explore our full <Link to="/services/conference-av-hire" className="text-accent hover:underline">Conference AV Hire</Link> service for Ireland-wide coverage.
            </p>
          </ScrollReveal>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 transition-transform duration-300 hover:scale-[1.05] cursor-default">Frequently Asked Questions — Conference AV Limerick</h2>
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
            <h3 className="text-xl font-semibold mb-2">Get a Quote for Conference AV in Limerick</h3>
            <p className="text-muted-foreground mb-4 transition-transform duration-300 hover:scale-[1.04] cursor-default">From corporate training at the Limerick Strand Hotel to academic conferences at UL, EventSound delivers professional conference AV across the Shannon region. Contact us for a quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default LimerickConferenceAV;
