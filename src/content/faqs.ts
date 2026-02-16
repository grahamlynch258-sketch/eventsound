export type FaqCategory = {
  title: string;
  items: { question: string; answer: string }[];
};

export const faqs: FaqCategory[] = [
  {
    title: "General Enquiries",
    items: [
      {
        question: "What areas do you serve?",
        answer: "We're based in Drogheda, Co. Louth, and serve clients across Dublin, Leinster, and nationwide Ireland. We regularly deliver events throughout the country and are happy to travel for the right project.",
      },
      {
        question: "How do I get a quote for my event?",
        answer: "Visit our contact page to submit your event details, or call us directly. We'll respond with a tailored recommendation and quote within 24 hours.",
      },
      {
        question: "What types of events do you cater to?",
        answer: "We cater to corporate conferences, gala dinners, product launches, live concerts, festivals, weddings, hybrid and virtual events, and private celebrations of all sizes.",
      },
      {
        question: "Do you offer long-term rental options?",
        answer: "Yes — contact our team for long-term hire rates on audio, visual, and staging equipment. We offer flexible packages for residencies, exhibition seasons, and multi-event contracts.",
      },
    ],
  },
  {
    title: "Equipment & Services",
    items: [
      {
        question: "What sound systems do you provide?",
        answer: "We supply complete PA packages from leading manufacturers including L-Acoustics, Martin Audio, LD Systems, and Celto Acoustique. From conference sound to concert-scale line arrays, we match the right system to your event.",
      },
      {
        question: "Can I hire wireless microphones for my event?",
        answer: "Absolutely. We carry professional Shure and Sennheiser wireless systems suitable for presentations, panel discussions, and live performances.",
      },
      {
        question: "Do you provide technical operators?",
        answer: "Yes. Our experienced crew handle pre-show testing, live operation, and troubleshooting so you can focus on your event. Every booking includes the option of on-site technical support.",
      },
      {
        question: "How customisable are the LED video walls?",
        answer: "Our LED walls are fully modular — we configure screen sizes, aspect ratios, and brightness levels to suit your venue and content. We can create single screens, multi-screen arrays, or creative curved configurations.",
      },
    ],
  },
  {
    title: "Event Planning & Support",
    items: [
      {
        question: "How far in advance should I book?",
        answer: "As early as possible for the best availability, especially during peak season. That said, last-minute bookings are always welcome and we'll do our best to accommodate. Larger events typically involve months of planning.",
      },
      {
        question: "Do you offer consultations?",
        answer: "Yes. If you're unsure about lighting, audio, staging, or venue suitability, we offer free consultations to help you plan the right production package for your event.",
      },
      {
        question: "What are the payment terms?",
        answer: "We accept card payment and bank transfer. Events are typically structured with staged payments — a deposit to secure the booking and the balance due before or on the event date. Contact our team for full details.",
      },
      {
        question: "Do you handle both indoor and outdoor events?",
        answer: "Yes — we deliver both indoor and outdoor events. Our equipment is rated for outdoor use and we carry weatherproofing solutions for stages, lighting, and audio in open-air settings.",
      },
    ],
  },
];
