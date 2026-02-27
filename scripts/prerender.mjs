import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, '..', 'dist');

// ── Schema generators (plain JS equivalents of src/lib/schema.ts) ───────────

function buildFAQSchema(questions) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };
}

function buildServiceSchema({ name, description, serviceType, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "serviceType": serviceType,
    "url": url,
    "provider": {
      "@type": "LocalBusiness",
      "name": "EventSound",
      "@id": "https://eventsound.ie/#organization",
      "telephone": "+353872888761",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dublin",
        "addressCountry": "IE"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "Ireland"
    }
  };
}

function buildBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

function buildArticleSchema({ headline, description, image, datePublished, dateModified, author, publisher, keywords, articleSection }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    ...(dateModified && { "dateModified": dateModified }),
    "author": {
      "@type": author.url ? "Organization" : "Person",
      "name": author.name,
      ...(author.url && { "url": author.url })
    },
    "publisher": {
      "@type": "Organization",
      "name": publisher.name,
      ...(publisher.logo && {
        "logo": { "@type": "ImageObject", "url": publisher.logo }
      })
    },
    ...(keywords && { "keywords": keywords }),
    ...(articleSection && { "articleSection": articleSection })
  };
}

/** Return array of JSON-LD script tags to inject for a given route */
function schemasToHtml(schemas) {
  return schemas
    .map(s => `    <script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join('\n');
}

// ── Per-route schema data ───────────────────────────────────────────────────

const SERVICE_PAGE_SCHEMAS = {
  '/services/led-video-walls': {
    faqs: [
      { question: "What size LED screen do I need for my event?", answer: "Screen size depends on your audience size and venue. For conferences of 100-300 people, a 3m x 2m screen works well. For outdoor concerts with 1,000+ attendees, you may need 5m x 3m or larger. We do a free site survey to recommend the perfect configuration for your space." },
      { question: "Can LED walls be used outdoors in Ireland?", answer: "Yes — our LED panels are rated for outdoor use and can handle Irish weather conditions including rain and wind. We use weatherproof cabinets and provide covered rigging solutions for outdoor festivals, concerts, and council events." },
      { question: "How far in advance should I book LED screen hire?", answer: "We recommend booking 4-6 weeks ahead for standard events and 2-3 months for large festivals or peak season (May-September). However, we can often accommodate shorter notice depending on availability." },
      { question: "What content can be displayed on LED video walls?", answer: "Anything — live camera feeds, pre-recorded video, presentations, social media walls, sponsor logos, and live event graphics. We provide full content playback and can help with content formatting to ensure it looks perfect on screen." },
      { question: "Do you provide operators with the LED screens?", answer: "Yes, all our LED wall hire packages include experienced technicians for setup, operation throughout your event, and breakdown. You never need to worry about the technical side." },
      { question: "What is the difference between LED walls and projection screens?", answer: "LED walls are significantly brighter, work in daylight conditions, and offer superior image quality. Projection screens are affected by ambient light and are generally only suitable for darker indoor venues. For most events in Ireland, LED walls deliver a far better audience experience." },
    ],
    service: { name: "LED Video Wall Hire", description: "Professional LED video wall hire for conferences, concerts, festivals and corporate events across Ireland. Custom configurations from 2m² to 50m²+.", serviceType: "LED Screen Rental", url: "https://eventsound.ie/services/led-video-walls" },
    breadcrumb: [
      { name: "Home", url: "https://eventsound.ie/" },
      { name: "Services", url: "https://eventsound.ie/services" },
      { name: "LED Video Walls", url: "https://eventsound.ie/services/led-video-walls" },
    ],
  },

  '/services/lighting-design': {
    faqs: [
      { question: "What types of event lighting do you provide?", answer: "We provide stage lighting, uplighting, wash lighting, moving heads, follow spots, architectural lighting, LED festoon, and custom mood lighting. Our inventory covers everything from intimate corporate dinners to large outdoor festival stages." },
      { question: "Can you light outdoor events and festivals?", answer: "Absolutely. We have weatherproof fixtures and extensive experience lighting outdoor stages, festival grounds, and open-air venues across Ireland. All our outdoor setups include appropriate power distribution and safety measures." },
      { question: "Do you provide a lighting designer for my event?", answer: "Yes — every lighting hire includes an experienced lighting technician who will program and operate the rig throughout your event. For larger productions, we provide a dedicated lighting designer who works with you on the creative vision." },
      { question: "How does lighting design affect the audience experience?", answer: "Lighting sets the mood, directs attention, and creates atmosphere. Good lighting design can transform a plain venue into an immersive experience, improve video and photography quality, and keep audiences engaged throughout the event." },
      { question: "How early do you need to set up stage lighting?", answer: "Typically 4-8 hours before the event for a standard corporate or conference setup. Festival stages and complex productions may require a full day. We always coordinate load-in schedules with your venue and other suppliers." },
      { question: "Can you match lighting to our brand colours?", answer: "Yes — LED fixtures can be programmed to any colour. We regularly match lighting to corporate brand guidelines, event themes, and sponsor requirements. Just share your brand colours, and we will programme them into the rig." },
    ],
    service: { name: "Event Lighting Design & Hire", description: "Professional event lighting design and hire in Ireland. Stage lighting, uplighting, moving heads, and custom mood lighting for conferences, concerts and corporate events.", serviceType: "Event Lighting Hire", url: "https://eventsound.ie/services/lighting-design" },
    breadcrumb: [
      { name: "Home", url: "https://eventsound.ie/" },
      { name: "Services", url: "https://eventsound.ie/services" },
      { name: "Lighting Design", url: "https://eventsound.ie/services/lighting-design" },
    ],
  },

  '/services/event-production': {
    faqs: [
      { question: "What does event production management include?", answer: "We handle all technical aspects of your event — AV equipment sourcing, stage and set design, crew coordination, supplier management, technical rehearsals, and on-site production management. Think of us as your technical production partner from planning through to breakdown." },
      { question: "How far in advance should I engage a production company?", answer: "For large events like festivals or multi-day conferences, 3-6 months is ideal. Corporate events and awards nights typically need 6-8 weeks. We can work to tighter timelines but earlier engagement means better planning and availability." },
      { question: "Do you manage other suppliers on my behalf?", answer: "Yes — we coordinate with staging companies, power suppliers, venues, caterers, and any other technical suppliers involved in your event. Having one production company manage all technical elements ensures everything works together seamlessly." },
      { question: "Can you produce events anywhere in Ireland?", answer: "Yes, we produce events nationwide. While we are based in Dublin, we regularly deliver events across all 32 counties and have strong relationships with venues throughout Ireland." },
      { question: "What size events do you handle?", answer: "Everything from boardroom presentations for 20 people to outdoor festivals for 10,000+. We scale our crew and equipment to match your event. Recent projects include the Swords Castle Summer Concerts (8,000+ per night) and intimate corporate conferences." },
      { question: "What happens if equipment fails during my event?", answer: "We carry backup equipment on-site for all critical systems and our technicians are trained to handle any technical issues immediately. In over three decades of event production, we have built redundancy into every setup to ensure your event runs smoothly." },
    ],
    service: { name: "Event Production Services", description: "End-to-end event production management in Ireland. AV coordination, stage design, crew management, and on-site production for conferences, concerts and corporate events.", serviceType: "Event Production Management", url: "https://eventsound.ie/services/event-production" },
    breadcrumb: [
      { name: "Home", url: "https://eventsound.ie/" },
      { name: "Services", url: "https://eventsound.ie/services" },
      { name: "Event Production", url: "https://eventsound.ie/services/event-production" },
    ],
  },

  '/services/staging-pipe-drape': {
    faqs: [
      { question: "What stage sizes are available for hire?", answer: "We offer modular staging from small 3m x 2m presentation platforms up to large 12m x 10m concert stages. The modular system means we can build to any custom size and shape to suit your venue and event requirements." },
      { question: "Can staging be used on uneven ground outdoors?", answer: "Yes — our staging systems have adjustable legs that compensate for uneven ground. We regularly set up outdoor stages on grass, gravel, and sloped sites. All outdoor staging includes safety rails and weatherproof decking." },
      { question: "What is pipe and drape used for?", answer: "Pipe and drape creates instant room divisions, backdrops, entrance features, and venue dressing. It is commonly used to transform blank venues, hide unsightly areas, create backstage spaces, and add visual impact to corporate events and exhibitions." },
      { question: "How long does stage setup take?", answer: "A standard 6m x 4m indoor stage takes approximately 2-3 hours. Larger outdoor stages with roofing and safety barriers may require a full day. We always coordinate setup times with your venue and event schedule." },
      { question: "Do you provide safety barriers and crowd management equipment?", answer: "Yes — we supply front-of-stage barriers, crowd control barriers, cable ramps, and safety rails as part of our staging packages. All installations comply with Irish health and safety regulations." },
      { question: "Can pipe and drape match our event branding?", answer: "Yes — drape is available in a range of colours including black, white, and grey. We can also accommodate custom colours for branded events and add lighting to the drape for additional visual impact." },
    ],
    service: { name: "Stage Hire & Pipe and Drape", description: "Modular stage hire and pipe and drape solutions across Ireland. Indoor and outdoor staging for conferences, concerts and corporate events.", serviceType: "Stage Hire", url: "https://eventsound.ie/services/staging-pipe-drape" },
    breadcrumb: [
      { name: "Home", url: "https://eventsound.ie/" },
      { name: "Services", url: "https://eventsound.ie/services" },
      { name: "Staging & Pipe Drape", url: "https://eventsound.ie/services/staging-pipe-drape" },
    ],
  },

  '/services/video-production': {
    faqs: [
      { question: "What video production services do you offer for events?", answer: "We provide multi-camera live filming, live streaming, IMAG (image magnification) for large audiences, post-event highlight videos, speaker recording, and live vision mixing. All services include professional camera operators and equipment." },
      { question: "Can you live stream our event?", answer: "Yes — we provide full live streaming to any platform including YouTube, Vimeo, Teams, Zoom, and custom RTMP destinations. Our streaming packages include encoding hardware, graphics overlays, and a dedicated streaming technician." },
      { question: "What is IMAG and when do I need it?", answer: "IMAG stands for Image Magnification — projecting live camera feeds onto large screens so audiences can see speakers and performers close-up. It is essential for any event with 200+ attendees where not everyone has a clear sightline to the stage." },
      { question: "How many cameras do you typically use?", answer: "Most corporate events use 2-3 cameras. Large concerts and conferences may use 4-6 cameras plus robotic PTZ cameras. We recommend a camera plan based on your event layout, content, and budget." },
      { question: "Do you provide post-event video editing?", answer: "Yes — we offer full post-production including multi-camera editing, colour grading, graphics, and delivery in any format. Highlight reels are typically delivered within 5-10 working days after your event." },
      { question: "What internet connection do I need for live streaming?", answer: "We recommend a minimum 10Mbps dedicated upload speed for HD streaming. We carry bonded cellular units as backup and can provide satellite uplink for venues with poor connectivity." },
    ],
    service: { name: "Event Video Production", description: "Professional event video production in Ireland. Multi-camera filming, live streaming, IMAG, and post-event editing for conferences, concerts and corporate events.", serviceType: "Event Video Production", url: "https://eventsound.ie/services/video-production" },
    breadcrumb: [
      { name: "Home", url: "https://eventsound.ie/" },
      { name: "Services", url: "https://eventsound.ie/services" },
      { name: "Video Production", url: "https://eventsound.ie/services/video-production" },
    ],
  },

  '/services/virtual-events': {
    faqs: [
      { question: "What is a hybrid event?", answer: "A hybrid event combines a live in-person audience with a remote online audience. We provide the AV production, cameras, streaming, and platform integration to ensure both audiences have an engaging, professional experience." },
      { question: "Which virtual event platforms do you support?", answer: "We work with all major platforms including Zoom, Microsoft Teams, Hopin, Webex, YouTube Live, Vimeo, and custom RTMP solutions. We can also recommend the best platform for your specific event requirements and audience size." },
      { question: "Can virtual attendees interact with the live event?", answer: "Yes — we set up live Q&A, polling, chat moderation, and remote speaker integration so virtual attendees can participate fully. We have produced events where remote panellists appear on the main stage LED screens alongside in-person speakers." },
      { question: "What equipment is needed at the venue for a hybrid event?", answer: "At minimum: cameras, microphones, an encoding system, and a reliable internet connection. For a professional production, we add LED screens for remote speaker display, graphics overlays, and a dedicated streaming operator." },
      { question: "How reliable is live streaming for important events?", answer: "Very reliable with proper planning. We use broadcast-grade encoders, redundant internet connections (wired + bonded cellular), and monitoring throughout. In three decades of production, we have built robust failover systems for mission-critical streams." },
      { question: "Do you provide a studio for virtual events?", answer: "We can transform any suitable space into a professional virtual studio with branded backdrops, lighting, cameras, and teleprompters. We also work with dedicated studio venues in Dublin if you need a purpose-built environment." },
    ],
    service: { name: "Virtual & Hybrid Event Production", description: "Professional virtual and hybrid event production in Ireland. Live streaming, remote speaker integration, and platform management for conferences and corporate events.", serviceType: "Virtual Event Production", url: "https://eventsound.ie/services/virtual-events" },
    breadcrumb: [
      { name: "Home", url: "https://eventsound.ie/" },
      { name: "Services", url: "https://eventsound.ie/services" },
      { name: "Virtual Events", url: "https://eventsound.ie/services/virtual-events" },
    ],
  },

  '/services/av-production': {
    faqs: [
      { question: "What does AV production include?", answer: "AV production covers all audio and visual technical elements for your event — PA systems, microphones, mixing desks, projection, LED screens, playback systems, and technical crew. We provide everything needed to ensure your event sounds and looks professional." },
      { question: "What size PA system do I need?", answer: "PA sizing depends on your venue and audience. A boardroom needs a small column speaker, a conference for 200 needs a medium line array, and an outdoor event for 2,000+ needs a large concert PA. We always recommend the right system based on a venue assessment." },
      { question: "Do you provide sound engineers?", answer: "Yes — all our AV packages include experienced sound engineers who manage the audio throughout your event. For larger events, we provide separate FOH (front of house) and monitor engineers." },
      { question: "Can you handle presentations and playback?", answer: "Yes — we manage all presentation playback including PowerPoint, Keynote, video playback, and confidence monitors for speakers. We test all presentations before the event starts to avoid any issues during your programme." },
      { question: "What happens during a site visit?", answer: "We assess the venue layout, power availability, rigging points, load-in access, and acoustics. This ensures we specify the right equipment and plan the setup efficiently. Site visits are free for all confirmed bookings." },
      { question: "Do you carry backup equipment?", answer: "Yes — we carry backup for all critical equipment including spare microphones, cables, laptops, and switching systems. Our technicians are trained to swap faulty equipment within minutes so your event is never disrupted." },
    ],
    service: { name: "AV Production & Hire", description: "Professional AV production and equipment hire in Ireland. PA systems, microphones, mixing, projection, and full technical crew for conferences, concerts and corporate events.", serviceType: "AV Equipment Hire", url: "https://eventsound.ie/services/av-production" },
    breadcrumb: [
      { name: "Home", url: "https://eventsound.ie/" },
      { name: "Services", url: "https://eventsound.ie/services" },
      { name: "AV Production", url: "https://eventsound.ie/services/av-production" },
    ],
  },
};

const FAQ_PAGE_QUESTIONS = [
  { question: "What areas do you serve?", answer: "We're based in Dublin, Ireland, and serve clients nationwide. We regularly work at venues throughout Ireland." },
  { question: "How far in advance should I book?", answer: "We recommend booking as early as possible, especially for peak season (September-December). However, we can often accommodate last-minute requests depending on availability." },
  { question: "Do you provide setup and breakdown?", answer: "Yes, all our services include professional setup, operation during your event, and breakdown. Our experienced crew ensures everything runs smoothly." },
  { question: "What size events do you cater for?", answer: "We handle events of all sizes, from intimate corporate meetings to large-scale conferences and concerts with thousands of attendees." },
  { question: "Do you offer site visits before the event?", answer: "Yes, we recommend site visits for larger events to ensure optimal equipment placement and technical planning." },
  { question: "What payment terms do you offer?", answer: "We typically require a deposit to secure your booking, with the balance due before or on the day of your event. We can discuss payment plans for larger productions." },
  { question: "Can you work with indoor and outdoor events?", answer: "Yes, we have experience with both indoor and outdoor events. We can provide weather-protected solutions for outdoor venues." },
  { question: "Do you provide technical operators?", answer: "Yes, all our AV equipment can be hired with experienced technical operators who manage everything from setup to operation." },
  { question: "What brands of equipment do you use?", answer: "We use industry-leading brands including L-Acoustics sound systems, Unilumin LED walls, and Chamsys lighting control." },
  { question: "Do you offer wireless microphones?", answer: "Yes, we provide professional wireless microphone systems including handheld, lapel, and headset options." },
  { question: "Can you provide LED video walls?", answer: "Yes, we offer high-resolution LED video walls in various sizes and configurations for corporate events, conferences, and live shows." },
  { question: "Do you have insurance and certifications?", answer: "Yes, we maintain full public liability insurance and our staging is TUV-certified. Our team is trained in safe equipment operation and rigging." },
];

/** Build all JSON-LD schemas for a given route path. Returns array of schema objects. */
function getSchemasForRoute(routePath, caseStudyData) {
  // Service pages: FAQPage + Service + BreadcrumbList
  const serviceData = SERVICE_PAGE_SCHEMAS[routePath];
  if (serviceData) {
    return [
      buildFAQSchema(serviceData.faqs),
      buildServiceSchema(serviceData.service),
      buildBreadcrumbSchema(serviceData.breadcrumb),
    ];
  }

  // FAQ page: FAQPage only
  if (routePath === '/faq') {
    return [buildFAQSchema(FAQ_PAGE_QUESTIONS)];
  }

  // Case study detail pages: Article
  if (routePath.startsWith('/case-studies/') && routePath !== '/case-studies' && caseStudyData) {
    return [buildArticleSchema({
      headline: caseStudyData.title,
      description: caseStudyData.excerpt || caseStudyData.meta_description || '',
      image: caseStudyData.og_image_url || caseStudyData.featured_image_url || '',
      datePublished: caseStudyData.published_at || '',
      dateModified: caseStudyData.updated_at || undefined,
      author: { name: "EventSound", url: "https://eventsound.ie" },
      publisher: { name: "EventSound", logo: "https://eventsound.ie/logo.png" },
      keywords: caseStudyData.tags ? caseStudyData.tags.join(', ') : undefined,
      articleSection: caseStudyData.category || undefined,
    })];
  }

  // No page-specific schemas for other routes
  return [];
}

// ── Static routes with their SEO metadata ───────────────────────────────────

const ROUTES = [
  { path: '/', title: 'Event Production Ireland | AV & LED Screen Hire | EventSound', description: 'Professional event production, AV hire, and LED screen rental across Ireland. Sound systems, lighting design, staging, and video production for conferences, concerts, and corporate events.' },
  { path: '/about', title: 'About EventSound | Three Decades of Event Production in Ireland', description: 'Learn about EventSound — over three decades of experience delivering professional AV hire and event production services across Ireland.' },
  { path: '/services', title: 'Event Production Services Ireland | AV Hire & Equipment Rental | EventSound', description: 'Full-service event production in Ireland. LED video walls, sound systems, lighting design, staging, video production, and virtual event solutions.' },
  { path: '/services/led-video-walls', title: 'LED Video Wall Hire Ireland | LED Screen Rental | EventSound', description: 'Professional LED video wall hire across Ireland. Custom configurations for conferences, concerts, festivals, and corporate events.' },
  { path: '/services/lighting-design', title: 'Event Lighting Design & Hire Ireland | Stage Lighting | EventSound', description: 'Professional event lighting design and hire in Ireland. Stage lighting, uplighting, moving heads, and custom mood lighting for events.' },
  { path: '/services/event-production', title: 'Event Production Services Ireland | Full Technical Production | EventSound', description: 'End-to-end event production management in Ireland. AV coordination, stage design, crew management, and on-site production for events of all sizes.' },
  { path: '/services/staging-pipe-drape', title: 'Stage Hire & Pipe and Drape Ireland | Event Staging | EventSound', description: 'Modular stage hire and pipe and drape solutions across Ireland. Indoor and outdoor staging for conferences, concerts, and corporate events.' },
  { path: '/services/video-production', title: 'Event Video Production Ireland | Live Streaming & Filming | EventSound', description: 'Professional event video production in Ireland. Multi-camera filming, live streaming, IMAG, and post-event editing for conferences and events.' },
  { path: '/services/virtual-events', title: 'Virtual & Hybrid Event Production Ireland | Live Streaming | EventSound', description: 'Professional virtual and hybrid event production in Ireland. Live streaming, remote speaker integration, and platform management.' },
  { path: '/services/av-production', title: 'AV Production & Hire Ireland | Sound Systems & PA Hire | EventSound', description: 'Professional AV production and equipment hire in Ireland. PA systems, microphones, mixing, projection, and full technical crew.' },
  { path: '/contact', title: 'Contact EventSound | Get a Quote for Your Event', description: 'Get in touch with EventSound for a free quote. Professional AV hire and event production services across Ireland. We typically respond within 24 hours.' },
  { path: '/faq', title: 'FAQ | Event Production & AV Hire Questions | EventSound', description: 'Frequently asked questions about EventSound event production services, AV hire, pricing, and event planning in Ireland.' },
  { path: '/gallery', title: 'Event Gallery | Our Work | EventSound', description: 'Browse our portfolio of event production work across Ireland. LED video walls, lighting design, staging, and AV setups for conferences, concerts, and corporate events.' },
  { path: '/reviews', title: 'Client Reviews | EventSound Event Production Ireland', description: 'Read what our clients say about EventSound event production services. Trusted by organisations across Ireland for AV hire and event production.' },
  { path: '/health-and-safety', title: 'Health & Safety | EventSound Event Production', description: 'EventSound health and safety policies for event production. Fully insured, risk assessed, and compliant with Irish regulations.' },
  { path: '/case-studies', title: 'Case Studies | Event Production Projects | EventSound', description: 'Explore our event production case studies. Real projects showcasing LED video walls, sound systems, lighting, and staging across Ireland.' },
];

// ── Fetch case studies from Supabase (expanded for Article schema) ───────────

async function getCaseStudies() {
  try {
    const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
    const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      console.log('No Supabase credentials — skipping case study prerender');
      return [];
    }

    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/case_studies?select=slug,meta_title,meta_description,title,excerpt,featured_image_url,og_image_url,published_at,updated_at,tags,category&is_published=eq.true&noindex=eq.false`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    if (!res.ok) {
      console.log('Failed to fetch case studies:', res.status);
      return [];
    }

    const data = await res.json();
    return data.map(cs => ({
      path: `/case-studies/${cs.slug}`,
      title: cs.meta_title || `${cs.title} | EventSound Case Study`,
      description: cs.meta_description || cs.excerpt || 'EventSound event production case study',
      // Extra fields for Article schema
      _raw: cs,
    }));
  } catch (err) {
    console.log('Error fetching case studies:', err.message);
    return [];
  }
}

// ── Main prerender ──────────────────────────────────────────────────────────

async function prerender() {
  console.log('Starting SEO pre-rendering (HTML injection)...');

  // Get case study routes
  const caseStudyRoutes = await getCaseStudies();
  const allRoutes = [...ROUTES, ...caseStudyRoutes];

  console.log(`Pre-rendering ${allRoutes.length} routes (${ROUTES.length} static + ${caseStudyRoutes.length} case studies)`);

  // Read the base index.html template
  const indexHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8');

  for (const route of allRoutes) {
    const routePath = route.path === '/' ? '' : route.path;
    const dir = path.join(DIST, routePath);
    const filePath = route.path === '/' ? path.join(DIST, 'index.html') : path.join(dir, 'index.html');

    // Create directory if needed
    if (route.path !== '/') {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Inject SEO meta tags into the HTML
    let html = indexHtml;

    // Add/replace <title> — Vite template has no <title> so we inject one
    if (/<title>[^<]*<\/title>/.test(html)) {
      html = html.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`);
    } else {
      html = html.replace('<meta charset="UTF-8" />', `<meta charset="UTF-8" />\n    <title>${route.title}</title>`);
    }

    // Replace meta description (template has multi-line version — use dotall-style match)
    if (html.includes('name="description"')) {
      html = html.replace(/(<meta[\s\S]*?name="description"[\s\S]*?content=")[^"]*"/, `$1${route.description}"`);
    } else {
      html = html.replace('</head>', `  <meta name="description" content="${route.description}">\n</head>`);
    }

    // Replace canonical URL
    const canonical = `https://eventsound.ie${route.path}`;
    if (html.includes('rel="canonical"')) {
      html = html.replace(/(<link\s+rel="canonical"\s+href=")[^"]*"/, `$1${canonical}"`);
    } else {
      html = html.replace('</head>', `  <link rel="canonical" href="${canonical}">\n</head>`);
    }

    // Replace existing OG tags in-place (template has site-level defaults)
    html = html.replace(/(property="og:title"\s+content=")[^"]*"/, `$1${route.title}"`);
    html = html.replace(/(property="og:description"[\s\S]*?content=")[^"]*"/, `$1${route.description}"`);
    html = html.replace(/(property="og:url"\s+content=")[^"]*"/, `$1${canonical}"`);

    // Inject page-specific JSON-LD schemas before </head>
    const schemas = getSchemasForRoute(route.path, route._raw);
    if (schemas.length > 0) {
      const schemaHtml = schemasToHtml(schemas);
      html = html.replace('</head>', `\n${schemaHtml}\n  </head>`);
    }

    fs.writeFileSync(filePath, html);
    const schemaCount = schemas.length;
    console.log(`  ✓ ${route.path}${schemaCount > 0 ? ` (${schemaCount} schema${schemaCount > 1 ? 's' : ''})` : ''}`);
  }

  console.log(`\nPre-rendered ${allRoutes.length} routes successfully!`);
}

prerender().catch(err => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
