import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useServiceImages } from "@/hooks/useServiceImages";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const FAQ = () => {
  const { hero } = useServiceImages("hero-faq");
  const faqs: { question: string; answer: React.ReactNode }[] = [
    {
      question: "What areas do you serve?",
      answer: "We're based in Dublin, Ireland, and serve clients nationwide. We regularly work at venues throughout Ireland."
    },
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking as early as possible, especially for peak season (September-December). However, we can often accommodate last-minute requests depending on availability."
    },
    {
      question: "Do you provide setup and breakdown?",
      answer: "Yes, all our services include professional setup, operation during your event, and breakdown. Our experienced crew ensures everything runs smoothly."
    },
    {
      question: "What size events do you cater for?",
      answer: "We handle events of all sizes, from intimate corporate meetings to large-scale conferences and concerts with thousands of attendees."
    },
    {
      question: "Do you offer site visits before the event?",
      answer: "Yes, we recommend site visits for larger events to ensure optimal equipment placement and technical planning."
    },
    {
      question: "What payment terms do you offer?",
      answer: "We typically require a deposit to secure your booking, with the balance due before or on the day of your event. We can discuss payment plans for larger productions."
    },
    {
      question: "Can you work with indoor and outdoor events?",
      answer: "Yes, we have experience with both indoor and outdoor events. We can provide weather-protected solutions for outdoor venues."
    },
    {
      question: "Do you provide technical operators?",
      answer: <>Yes, all our <Link to="/services/av-production" className="text-accent hover:underline">AV equipment</Link> can be hired with experienced technical operators who manage everything from setup to operation.</>
    },
    {
      question: "What brands of equipment do you use?",
      answer: <>We use industry-leading brands including L-Acoustics <Link to="/services/av-production" className="text-accent hover:underline">sound systems</Link>, Unilumin <Link to="/services/led-video-walls" className="text-accent hover:underline">LED walls</Link>, and Chamsys <Link to="/services/lighting-design" className="text-accent hover:underline">lighting control</Link>.</>
    },
    {
      question: "Do you offer wireless microphones?",
      answer: <>Yes, we provide professional <Link to="/services/av-production" className="text-accent hover:underline">wireless microphone systems</Link> including handheld, lapel, and headset options.</>
    },
    {
      question: "Can you provide LED video walls?",
      answer: <>Yes, we offer high-resolution <Link to="/services/led-video-walls" className="text-accent hover:underline">LED video walls</Link> in various sizes and configurations for corporate events, conferences, and live shows.</>
    },
    {
      question: "Do you have insurance and certifications?",
      answer: <>Yes, we maintain full public liability insurance and our <Link to="/services/staging-pipe-drape" className="text-accent hover:underline">staging</Link> is TUV-certified. Our team is trained in safe equipment operation and rigging.</>
    }
  ];

  useSeo({
    title: "FAQ | EventSound Event Production Ireland",
    description: "Frequently asked questions about EventSound's AV hire & event production services. Pricing, equipment, coverage areas, booking process & more. Get answers.",
    canonical: "https://eventsound.ie/faq",
    ogTitle: "FAQ | EventSound Ireland",
    ogDescription: "Frequently asked questions about our event production and AV hire services in Ireland.",
  });

  return (
    <PageShell>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our event production services"
        backgroundImage={hero}
        backgroundAlt="EventSound professional event production setup"
      />
      <div className="container mx-auto px-4 py-12">
        <StaggerContainer className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <StaggerItem key={index}>
            <div className="rounded-xl border border-accent/30 bg-card/40 backdrop-blur-sm p-6">
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

        <ScrollReveal>
        <div className="max-w-4xl mx-auto mt-12">
          <div className="rounded-xl border border-accent/30 bg-card/40 backdrop-blur-sm p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Still Have Questions?</h3>
            <p className="text-muted-foreground mb-6">Get in touch, and we will be happy to help with your event requirements.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </PageShell>
  );
};

export default FAQ;