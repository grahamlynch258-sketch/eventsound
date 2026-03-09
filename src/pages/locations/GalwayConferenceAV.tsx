import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { useServiceImages } from "@/hooks/useServiceImages";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";

const GalwayConferenceAV = () => {
  const faqs = [
    { question: "What does conference AV cost in Galway?", answer: "Every conference is different, so we provide bespoke quotations based on your specific requirements. Contact us with your event details — venue, audience size, and what you need — and we'll provide a detailed quote within 24 hours." },
    { question: "Can you provide AV for events along the Wild Atlantic Way?", answer: "Yes. We serve venues across the west of Ireland, from Galway city hotels to unique locations in Connemara, the Aran Islands, and County Clare. We transport all equipment and provide on-site technical support regardless of location." },
    { question: "Do you support multi-room conference setups in Galway?", answer: "Yes. For conferences with plenary sessions and breakout rooms, we provide multi-room audio distribution, separate microphone systems for each room, and centralised technical management. Our technicians coordinate audio across all spaces to ensure a seamless delegate experience." },
  ];

  useSeo({
    title: "Conference AV Services Galway | Event Sound & AV Hire | EventSound",
    description: "Professional conference AV services in Galway. Radio mics, PA systems, front lighting, livestreaming & on-site technicians for Galway hotels and venues.",
    canonical: "https://eventsound.ie/services/conference-av/galway",
    ogTitle: "Conference AV Services Galway | EventSound",
    ogDescription: "Professional conference AV services in Galway. Radio mics, PA systems, front lighting & on-site technicians.",
    ogType: "website",
  });
  const { hero } = useServiceImages("service-conference-av");

  return (
    <PageShell>
      <PageHeader
        title="Conference AV Services in Galway"
        subtitle="Professional conference AV for Galway's growing events market"
        backgroundImage={hero}
        backgroundAlt="Conference AV setup at corporate event in Galway"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Galway is one of Ireland's fastest-growing conference destinations. The city's combination of world-class hotel venues, the Wild Atlantic Way, and a growing technology sector (Medtronic, Boston Scientific, Cisco) attracts national and international conferences throughout the year. EventSound provides conference AV services across Galway city and the wider west of Ireland.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">What Our Galway Conference AV Service Includes</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Our conference AV provision is tailored to each client's event. A typical Galway conference setup includes radio microphones (lectern, roving handheld, and headset from Shure, Sennheiser, and JTS), PA systems using LD Systems and L-Acoustics components, a digital mixing desk, front lighting for presenter visibility, display screens or projection, confidence monitors, long-range presenter clickers, and an on-site technician throughout the event.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            For larger Galway conferences, we add livestreaming capability for hybrid event delivery, IMAG camera feeds for audience screens, and multi-room audio distribution for events with breakout sessions. Whether your conference is a 40-person training day at The Connacht Hotel or an 800-delegate event at Clayton Hotel Galway, we scale the equipment and technical support to match.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Conference AV for Galway's Growing Events Market</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Galway's technology and medical device sector generates consistent demand for corporate conference AV. Companies based in the region's IDA business parks regularly host training events, product launches, and national meetings that require professional sound, lighting, and technical support.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Beyond the corporate market, Galway's position as a cultural capital and tourism destination makes it a popular choice for association conferences, academic events (University of Galway, Atlantic Technological University), and incentive travel programmes. These events often choose Galway for its atmosphere and scenery — the AV needs to match that standard.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Galway Venues We Provide Conference AV For</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound provides conference AV at Galway's leading venues, including{" "}
            <a href="https://www.claytonhotelgalway.ie" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Clayton Hotel Galway</a>,{" "}
            <a href="https://www.galwaybayhotel.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Galway Bay Hotel</a>,{" "}
            <a href="https://www.salthillhotel.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Salthill Hotel</a>,{" "}
            <a href="https://www.theconnacht.ie" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">The Connacht Hotel</a>,{" "}
            <a href="https://www.theardilaunhotel.ie" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">The Ardilaun Hotel</a>,{" "}
            <a href="https://www.menloparkhotel.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Menlo Park Hotel</a>, and{" "}
            <a href="https://www.glenloabbeyhotel.ie" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Glenlo Abbey Hotel</a>.
            We also serve venues across the wider west of Ireland, including Connemara and County Clare.
          </p>

          <ScrollReveal>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Looking for LED wall hire in Galway? See our dedicated <Link to="/services/led-walls/galway" className="text-accent hover:underline">Galway LED Wall Hire</Link> page. You can also explore our full <Link to="/services/conference-av-hire" className="text-accent hover:underline">Conference AV Hire</Link> service for Ireland-wide coverage.
            </p>
          </ScrollReveal>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 transition-transform duration-300 hover:scale-[1.05] cursor-default">Frequently Asked Questions — Conference AV Galway</h2>
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
            <h3 className="text-xl font-semibold mb-2">Get a Quote for Conference AV in Galway</h3>
            <p className="text-muted-foreground mb-4 transition-transform duration-300 hover:scale-[1.04] cursor-default">From corporate training days at The Connacht Hotel to large-scale conferences at Clayton Hotel Galway, EventSound delivers professional conference AV across the west of Ireland. Contact us with your event details for a quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default GalwayConferenceAV;
