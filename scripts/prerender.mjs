import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, '..', 'dist');

// Static routes with their SEO metadata
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

// Fetch case study slugs from Supabase
async function getCaseStudySlugs() {
  try {
    const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
    const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      console.log('No Supabase credentials — skipping case study prerender');
      return [];
    }

    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/case_studies?select=slug,meta_title,meta_description,title,excerpt&is_published=eq.true&noindex=eq.false`,
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
    }));
  } catch (err) {
    console.log('Error fetching case studies:', err.message);
    return [];
  }
}

async function prerender() {
  console.log('Starting SEO pre-rendering (HTML injection)...');

  // Get case study routes
  const caseStudyRoutes = await getCaseStudySlugs();
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

    fs.writeFileSync(filePath, html);
    console.log(`  ✓ ${route.path}`);
  }

  console.log(`\nPre-rendered ${allRoutes.length} routes successfully!`);
}

prerender().catch(err => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
