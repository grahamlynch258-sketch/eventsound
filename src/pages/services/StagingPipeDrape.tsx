import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useServiceImages } from "@/hooks/useServiceImages";
import { useServiceSections } from "@/hooks/useServiceSections";
import { ServiceSections } from "@/components/site/ServiceSections";
import { BrandBanner } from "@/components/site/BrandSidebar";

export default function StagingPipeDrape() {
  const faqs = [
    { question: "What stage sizes are available for hire?", answer: "We offer modular staging from small 3m x 2m presentation platforms up to large 12m x 10m concert stages. The modular system means we can build to any custom size and shape to suit your venue and event requirements." },
    { question: "Can staging be used on uneven ground outdoors?", answer: "Yes — our staging systems have adjustable legs that compensate for uneven ground. We regularly set up outdoor stages on grass, gravel, and sloped sites. All outdoor staging includes safety rails and weatherproof decking." },
    { question: "What is pipe and drape used for?", answer: "Pipe and drape creates instant room divisions, backdrops, entrance features, and venue dressing. It is commonly used to transform blank venues, hide unsightly areas, create backstage spaces, and add visual impact to corporate events and exhibitions." },
    { question: "How long does stage setup take?", answer: "A standard 6m x 4m indoor stage takes approximately 2-3 hours. Larger outdoor stages with roofing and safety barriers may require a full day. We always coordinate setup times with your venue and event schedule." },
    { question: "Do you provide safety barriers and crowd management equipment?", answer: "Yes — we supply front-of-stage barriers, crowd control barriers, cable ramps, and safety rails as part of our staging packages. All installations comply with Irish health and safety regulations." },
    { question: "Can pipe and drape match our event branding?", answer: "Yes — drape is available in a range of colours including black, white, and grey. We can also accommodate custom colours for branded events and add lighting to the drape for additional visual impact." }
  ];

  useSeo({
    title: "Stage Hire Dublin & Ireland | Setup & Breakdown Included | EventSound",
    description: "Professional event staging, pipe and drape, star cloth, and scenic elements for corporate events, conferences, and live shows across Ireland. TUV-certified, safety-first.",
    canonical: "https://eventsound.ie/services/staging-pipe-drape",
  });
  const { hero, gallery } = useServiceImages("service-staging");
  const { data: sections = [] } = useServiceSections("staging-pipe-drape");

  return (
    <PageShell>
      <PageHeader
        title="Staging, Pipe & Drape in Ireland"
        subtitle="Safe, professional staging and scenic solutions for any venue"
        backgroundImage={hero}
        backgroundAlt="Professional staging and pipe and drape installation at an event in Ireland"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound provides professional staging, pipe and drape, star cloth, and scenic elements for corporate events, conferences, awards ceremonies, and live shows across Ireland. All our staging is TUV-certified and European-manufactured, installed by trained crew with safety as the primary consideration.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Modular Stage Solutions</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Our modular staging systems are versatile, safe, and camera-ready. We supply platforms, risers, catwalks, presenter stages, and full stage builds in custom configurations to suit any venue — indoors or outdoors. All staging is levelled, skirted, and finished to a professional standard. We design layouts that optimise sightlines, access, and safety for your audience and performers.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Pipe & Drape, Star Cloth & Scenic</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Transform your venue with pipe and drape systems, star cloth backdrops, and custom scenic elements. Whether you need to divide a space, create a branded backdrop, mask backstage areas, or add atmosphere to a gala dinner, our draping solutions are clean, professional, and available in a range of colours and fabrics. Star cloth adds a dramatic effect for awards nights and evening events.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Why EventSound for Staging & Drape?</h2>
          <div className="text-left inline-block">
          <ul className="space-y-2 text-muted-foreground list-disc list-inside transition-transform duration-300 hover:scale-[1.04] cursor-default">
            <li>TUV-certified staging — European-manufactured, safety-first</li>
            <li>Modular platforms and risers for any configuration</li>
            <li>Pipe and drape in multiple colours and fabrics</li>
            <li>Star cloth and scenic backdrops for atmosphere</li>
            <li>Installed by trained crew with full risk assessment</li>
          </ul>
          </div>

          {sections.length > 0 && <ServiceSections sections={sections} />}

          {gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Our Staging Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gallery.map((img) => (
                  <img key={img.id} src={img.image_url} alt={img.alt_text || "Event staging and drape installation"} className="rounded-lg w-full aspect-video object-cover" loading="lazy" decoding="async" width={600} height={338} />
                ))}
              </div>
            </div>
          )}

          <BrandBanner serviceKey="staging-pipe-drape" />

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Related Services</h2>
          <div className="flex flex-wrap gap-3 justify-center transition-transform duration-300 hover:scale-[1.03] cursor-default">
            <Link to="/services/lighting-design"><Button variant="outline">Lighting Design</Button></Link>
            <Link to="/services/event-production"><Button variant="outline">Event Production</Button></Link>
            <Link to="/services/led-video-walls"><Button variant="outline">LED Video Walls</Button></Link>
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
            <h3 className="text-xl font-semibold mb-2">Need Staging or Draping?</h3>
            <p className="text-muted-foreground mb-4 transition-transform duration-300 hover:scale-[1.04] cursor-default">Tell us your venue and event requirements — we'll design a staging solution and quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
