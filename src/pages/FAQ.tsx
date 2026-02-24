import { useEffect } from "react";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { generateFAQSchema } from "@/lib/schema";
import heroFallback from "@/assets/hero-av-production.jpg";

const FAQ = () => {
  const faqs = [
    {
      question: "What areas do you serve?",
      answer: "We're based in Drogheda, Co. Louth and serve Dublin, Leinster, and nationwide across Ireland. We regularly work at venues throughout the country."
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
      answer: "Yes, all our AV equipment can be hired with experienced technical operators who manage everything from setup to operation."
    },
    {
      question: "What brands of equipment do you use?",
      answer: "We use industry-leading brands including L-Acoustics sound systems, Unilumin LED walls, and Chamsys lighting control."
    },
    {
      question: "Do you offer wireless microphones?",
      answer: "Yes, we provide professional wireless microphone systems including handheld, lapel, and headset options."
    },
    {
      question: "Can you provide LED video walls?",
      answer: "Yes, we offer high-resolution LED video walls in various sizes and configurations for corporate events, conferences, and live shows."
    },
    {
      question: "Do you have insurance and certifications?",
      answer: "Yes, we maintain full public liability insurance and our staging is TUV-certified. Our team is trained in safe equipment operation and rigging."
    }
  ];

  const faqSchema = generateFAQSchema({ questions: faqs });

  useSeo({
    title: "FAQ | EventSound Event Production Ireland",
    description: "Frequently asked questions about EventSound's event production and AV hire services in Ireland. Learn about our services, coverage areas, and booking process.",
    canonical: "https://eventsound.ie/faq",
    ogTitle: "FAQ | EventSound Ireland",
    ogDescription: "Frequently asked questions about our event production and AV hire services in Ireland.",
    schema: faqSchema,
    schemaId: "faq-schema"
  });

  return (
    <PageShell>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our event production services"
        backgroundImage={heroFallback}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
};

export default FAQ;