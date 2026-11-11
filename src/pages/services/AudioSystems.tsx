import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useServiceImages } from "@/hooks/useServiceImages";
import { useServiceSections } from "@/hooks/useServiceSections";
import { ServiceSections } from "@/components/site/ServiceSections";
import { BrandBanner } from "@/components/site/BrandSidebar";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { ServiceHeroActions } from "@/components/site/ServiceHeroActions";
import { ServiceEnquirySection } from "@/components/site/ServiceEnquirySection";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/lib/schema";

const faqs = [
  {
    question: "What size PA system do I need for my event?",
    answer: "The right PA depends on the room, audience size and programme. Speech-only conferences need even coverage and clear vocal reproduction. Bands and outdoor events need more headroom, low-frequency coverage and stage monitoring. We size the system from your venue and running order rather than quoting a generic speaker package.",
  },
  {
    question: "Do you provide a sound engineer with the equipment?",
    answer: "Yes. Operated sound hire includes setup, system tuning, soundcheck and an experienced engineer for the event. Larger live shows can also include a separate monitor engineer. The quotation states the equipment, crew and working hours clearly.",
  },
  {
    question: "Can you provide wireless microphones for conferences?",
    answer: "Yes. We supply handheld, lapel and headset wireless microphones for keynote speakers, panels and audience questions. We coordinate frequencies, prepare spare units and manage microphone changes throughout the programme.",
  },
  {
    question: "Can you provide sound and monitors for a live band?",
    answer: "Yes. We provide front-of-house PA, digital mixing, microphones, DI boxes and stage monitors for bands and live performers. Send the technical rider where available. If there is no rider, tell us the lineup and instruments and we will build the input and monitor plan.",
  },
  {
    question: "Do you provide sound hire for outdoor events?",
    answer: "Yes. Outdoor sound requires coverage planning, suitable power, weather protection and enough capacity for the audience area. We provide systems for council events, concerts, festivals and public gatherings, including delay speakers where the site needs them.",
  },
  {
    question: "What information do you need to quote sound hire?",
    answer: "Send the venue, audience size, event timings, room or site layout, performer or presenter details and any technical riders. For live music, include the band lineup and monitor requirements. This lets us recommend a complete package without pricing equipment you do not need.",
  },
];

export default function AudioSystems() {
  const { hero, heroAlt, gallery } = useServiceImages("service-av-production");
  const { data: sections = [] } = useServiceSections("audio-systems");

  const faqSchema = generateFAQSchema({ questions: faqs });
  const serviceSchema = generateServiceSchema({
    name: "Sound Hire and PA System Hire",
    description: "Operated sound and PA system hire for conferences, corporate events, live bands and outdoor events in Dublin and across Ireland.",
    url: "https://eventsound.ie/services/sound-hire",
    provider: { name: "EventSound", url: "https://eventsound.ie" },
    areaServed: ["Dublin", "Louth", "Meath", "Cork", "Galway", "Belfast", "Limerick", "Ireland"],
    serviceType: "Sound and PA System Hire",
  });
  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://eventsound.ie" },
      { name: "Services", url: "https://eventsound.ie/services" },
      { name: "Sound Hire", url: "https://eventsound.ie/services/sound-hire" },
    ],
  });

  useSeo({
    title: "Sound Hire Dublin | PA System Hire Ireland",
    description: "Sound and PA system hire for conferences, corporate events, bands and outdoor events in Dublin and across Ireland. Equipment, setup and engineer included.",
    canonical: "https://eventsound.ie/services/sound-hire",
    additionalSchemas: [
      { schema: faqSchema, schemaId: "faq-schema" },
      { schema: serviceSchema, schemaId: "service-schema" },
      { schema: breadcrumbSchema, schemaId: "breadcrumb-schema" },
    ],
  });

  return (
    <PageShell>
      <Breadcrumb items={[
        { name: "Home", href: "/" },
        { name: "Services", href: "/services/" },
        { name: "Sound Hire" },
      ]} />
      <PageHeader
        title="Sound Hire Dublin & PA System Hire Ireland"
        subtitle="Clear, even sound for conferences, live music and outdoor events"
        backgroundImage={hero}
        backgroundAlt={heroAlt ?? "Professional PA system and sound engineer at an event in Ireland"}
      >
        <ServiceHeroActions
          serviceName="Sound / PA Systems"
          benefits={["System sized for the venue", "Wireless microphones and monitors", "Setup and engineer included"]}
        />
      </PageHeader>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground">
            EventSound provides professional sound hire and PA system hire for conferences, corporate events, concerts, festivals and public events across Ireland. We supply the speakers, digital mixing, wireless microphones, stage monitors and experienced crew needed to deliver clear coverage from the first soundcheck to the final cue.
          </p>

          <h2 className="text-2xl font-semibold">PA System Hire Planned Around the Audience</h2>
          <p className="text-muted-foreground">
            A speech in a hotel ballroom, a five-piece band on an outdoor stage and a panel discussion all need different systems. We look at the venue, audience area, programme and sound-level requirements before selecting the PA. Our inventory includes compact point-source systems, column speakers, line arrays, subwoofers and delay speakers from professional manufacturers including L-Acoustics, Martin Audio and Celto Acoustique.
          </p>

          <h2 className="text-2xl font-semibold">Conference Sound and Wireless Microphones</h2>
          <p className="text-muted-foreground">
            For conferences, AGMs and corporate events, we provide lectern microphones, wireless lapel and headset microphones, handheld microphones for audience questions, playback and digital mixing. The system is tuned for clear speech across the room, with spare microphones and an engineer managing levels throughout the event.
          </p>

          <h2 className="text-2xl font-semibold">Live Band and Outdoor Sound Hire</h2>
          <p className="text-muted-foreground">
            Live music packages include front-of-house sound, microphones, DI boxes, stage monitors and a soundcheck built around the performers. For outdoor events, we also plan audience coverage, available power, weather protection and any delay speakers required. Send the technical rider where available, or tell us the lineup and we will build the input and monitor plan.
          </p>

          <h2 className="text-2xl font-semibold">What the Sound Hire Quote Includes</h2>
          <div className="text-left inline-block">
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>PA system sized and positioned for the venue and audience</li>
              <li>Digital mixing desk, playback and signal distribution</li>
              <li>Wireless microphones, band microphones and DI boxes as required</li>
              <li>Stage monitoring for performers and presenters</li>
              <li>Delivery, setup, system tuning, operation and collection</li>
              <li>A clear crew and working-hours allowance</li>
            </ul>
          </div>

          {sections.length > 0 && <ServiceSections sections={sections} />}

          {gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Recent Sound Systems</h2>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gallery.slice(0, 4).map((img) => (
                  <StaggerItem key={img.id}>
                    <img
                      src={img.image_url}
                      alt={img.alt_text || "Professional sound system at an event in Ireland"}
                      className="rounded-lg w-full aspect-video object-cover"
                      loading="lazy"
                      decoding="async"
                      width={600}
                      height={338}
                    />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          )}

          <BrandBanner serviceKey="av-production" />

          <h2 className="text-2xl font-semibold">Sound Hire or Full AV Production?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Choose sound hire when audio is the main requirement. If the event also needs screens, presentation playback, lighting, cameras or several technical departments, our <Link to="/services/av-production/" className="text-accent hover:underline">full AV production service</Link> combines them under one technical plan. Conference organisers can also see our <Link to="/services/conference-av-hire/" className="text-accent hover:underline">conference AV hire packages</Link>.
          </p>

          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
            <StaggerContainer className="space-y-6">
              {faqs.map((faq) => (
                <StaggerItem key={faq.question}>
                  <div className="rounded-xl border border-accent/30 bg-card/40 backdrop-blur-sm p-6">
                    <div className="rounded-lg bg-accent/10 border border-accent/20 px-4 py-3 mb-4">
                      <h3 className="text-lg font-semibold text-accent">{faq.question}</h3>
                    </div>
                    <p className="text-foreground/90 leading-relaxed">{faq.answer}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-2">Need Sound for Your Event?</h3>
            <p className="text-muted-foreground mb-4">Send the venue, audience size, timings and performer or presenter details. We will recommend the right system and crew.</p>
            <Link to="/contact/"><Button size="lg">Get a Sound Hire Quote</Button></Link>
          </div>
        </div>
      </div>

      <ServiceEnquirySection
        serviceName="Sound / PA Systems"
        heading="Turn the venue and running order into a sound plan"
        description="Tell us the audience size, room or site, timings and who needs to be heard. We will specify the PA, microphones, monitors and crew without expecting you to write a technical brief."
        included={[
          "Speech, playback, band inputs and audience coverage planned together",
          "Wireless microphone and stage-monitor requirements confirmed",
          "Delivery, setup, soundcheck, operation and collection allowed for",
        ]}
        proof={{
          title: "Swords Castle Summer Concerts",
          description: "Outdoor PA, stage monitoring, lighting and LED delivered as one council event production.",
          href: "/case-studies/swords-castle-summer-concerts/",
        }}
      />
      <StickyCtaBar />
    </PageShell>
  );
}
