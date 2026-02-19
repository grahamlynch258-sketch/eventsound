export type Testimonial = {
  client_name: string;
  client_role: string;
  company: string;
  quote: string;
  rating: number;
  is_featured: boolean;
};

export const testimonials: Testimonial[] = [
  {
    client_name: "Paul Barnes",
    client_role: "Events Manager",
    company: "Fingal County Council",
    quote: "We have engaged Event Sound to provide audio visual support on many occasions. From meetings and gala events to outdoor concerts. Always a professional, reliable and accommodating partner.",
    rating: 5,
    is_featured: true,
  },
  {
    client_name: "Kevin Rowe",
    client_role: "Event Director",
    company: "Kevin Rowe Events",
    quote: "I've been working with Event Sound over many years on corporate events and large fundraisers. A great team offering quality, reliability, and dependability.",
    rating: 5,
    is_featured: true,
  },
  {
    client_name: "Phil Nulty",
    client_role: "Event Organiser",
    company: "Nulty Events",
    quote: "Ronan and Mark are great guys to deal with and have everything you need for your event. 100% professional service.",
    rating: 5,
    is_featured: true,
  },
  {
    client_name: "Tom F.",
    client_role: "",
    company: "",
    quote: "From the initial consultation to the event day, Event Sound was fantastic. They provided us with top-of-the-line audio equipment for our conference, and the team ensured everything ran smoothly. Will definitely book again!",
    rating: 5,
    is_featured: false,
  },
  {
    client_name: "Emma R.",
    client_role: "",
    company: "",
    quote: "Event Sound provided the PA system and lighting for our wedding, and it was a huge success. Their attention to detail and understanding of what we wanted made the day even more special. Highly recommended!",
    rating: 5,
    is_featured: false,
  },
  {
    client_name: "Mairead L.",
    client_role: "",
    company: "",
    quote: "We hired Event Sound for a music festival, and they delivered beyond our expectations. The sound was crystal clear, and the stage setup was perfect. The crew was efficient, and everything went off without a hitch.",
    rating: 5,
    is_featured: false,
  },
  {
    client_name: "John K.",
    client_role: "",
    company: "",
    quote: "The LED video walls completely transformed our product launch. The clarity and colour quality were beyond impressive. The technical team made the whole process easy and stress-free.",
    rating: 5,
    is_featured: false,
  },
  {
    client_name: "Sarah M.",
    client_role: "",
    company: "",
    quote: "Event Sound provided the audio and lighting for our corporate event, and everything was flawless. The team was incredibly professional, and the sound quality was outstanding. Will definitely use them again!",
    rating: 5,
    is_featured: false,
  },
];
