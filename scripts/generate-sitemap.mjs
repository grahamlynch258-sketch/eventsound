import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get Supabase credentials from environment
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Static routes with priority
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.8', changefreq: 'monthly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/gallery', priority: '0.6', changefreq: 'monthly' },
  { path: '/case-studies', priority: '0.8', changefreq: 'weekly' },
  { path: '/reviews', priority: '0.6', changefreq: 'monthly' },
  { path: '/faq', priority: '0.5', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/health-and-safety', priority: '0.5', changefreq: 'monthly' },
  { path: '/services/led-video-walls', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/av-production', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/lighting-design', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/staging-pipe-drape', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/event-production', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/video-production', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/virtual-events', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/conference-av-hire', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/led-screen-hire', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/musical-theatre', priority: '0.8', changefreq: 'monthly' },
  // Location pages — LED Walls
  { path: '/services/led-walls/dublin', priority: '0.7', changefreq: 'monthly' },
  { path: '/services/led-walls/cork', priority: '0.7', changefreq: 'monthly' },
  { path: '/services/led-walls/galway', priority: '0.7', changefreq: 'monthly' },
  { path: '/services/led-walls/belfast', priority: '0.7', changefreq: 'monthly' },
  { path: '/services/led-walls/limerick', priority: '0.7', changefreq: 'monthly' },
  { path: '/services/led-walls/athlone', priority: '0.7', changefreq: 'monthly' },
  // Location pages — Conference AV
  { path: '/services/conference-av/dublin', priority: '0.7', changefreq: 'monthly' },
  { path: '/services/conference-av/cork', priority: '0.7', changefreq: 'monthly' },
  { path: '/services/conference-av/galway', priority: '0.7', changefreq: 'monthly' },
  { path: '/services/conference-av/belfast', priority: '0.7', changefreq: 'monthly' },
  { path: '/services/conference-av/limerick', priority: '0.7', changefreq: 'monthly' },
  { path: '/services/conference-av/athlone', priority: '0.7', changefreq: 'monthly' },
  ];

function canonicalPath(routePath) {
  if (routePath === '/') return '/';
  return routePath.endsWith('/') ? routePath : `${routePath}/`;
}

async function generateSitemap() {
    console.log('Generating sitemap...');

  let caseStudies = [];
  let blogPosts = [];

  // Only fetch dynamic routes if Supabase env vars are available
  if (supabaseUrl && supabaseAnonKey) {
        try {
                const supabase = createClient(supabaseUrl, supabaseAnonKey);
                const { data, error } = await supabase
                  .from('case_studies')
                  .select('slug, updated_at')
                  .eq('is_published', true)
                  .eq('noindex', false);

          if (error) {
                    console.warn('Warning: Could not fetch case studies:', error.message);
          } else {
                    caseStudies = data || [];
          }

                const { data: posts, error: blogError } = await supabase
                  .from('blog_posts')
                  .select('slug, updated_at')
                  .eq('status', 'published')
                  .eq('noindex', false);

          if (blogError) {
                    // A missing table just means the blog hasn't been set up yet.
                    if (!/find the table/i.test(blogError.message)) {
                              console.warn('Warning: Could not fetch blog posts:', blogError.message);
                    }
          } else {
                    blogPosts = posts || [];
          }
        } catch (err) {
                console.warn('Warning: Supabase fetch failed, continuing with static routes only');
        }
  } else {
        console.warn('Warning: Supabase env vars not set, generating sitemap with static routes only');
  }

  // Build sitemap XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add static routes
  staticRoutes.forEach(route => {
        xml += '  <url>\n';
        xml += `    <loc>https://eventsound.ie${canonicalPath(route.path)}</loc>\n`;
        xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
        xml += `    <priority>${route.priority}</priority>\n`;
        xml += '  </url>\n';
  });

  // Add case study routes
  if (caseStudies.length > 0) {
        caseStudies.forEach(cs => {
                xml += '  <url>\n';
                xml += `    <loc>https://eventsound.ie/case-studies/${cs.slug}/</loc>\n`;
                if (cs.updated_at) {
                          const lastmod = new Date(cs.updated_at).toISOString().split('T')[0];
                          xml += `    <lastmod>${lastmod}</lastmod>\n`;
                }
                xml += '    <changefreq>monthly</changefreq>\n';
                xml += '    <priority>0.7</priority>\n';
                xml += '  </url>\n';
        });
        console.log(`Added ${caseStudies.length} case study URLs to sitemap`);
  } else {
        console.log('No published case studies found (or Supabase not available)');
  }

  // Add blog routes — the /blog listing page only once posts exist
  if (blogPosts.length > 0) {
        xml += '  <url>\n';
        xml += '    <loc>https://eventsound.ie/blog/</loc>\n';
        xml += '    <changefreq>weekly</changefreq>\n';
        xml += '    <priority>0.7</priority>\n';
        xml += '  </url>\n';
        blogPosts.forEach(post => {
                xml += '  <url>\n';
                xml += `    <loc>https://eventsound.ie/blog/${post.slug}/</loc>\n`;
                if (post.updated_at) {
                          const lastmod = new Date(post.updated_at).toISOString().split('T')[0];
                          xml += `    <lastmod>${lastmod}</lastmod>\n`;
                }
                xml += '    <changefreq>monthly</changefreq>\n';
                xml += '    <priority>0.6</priority>\n';
                xml += '  </url>\n';
        });
        console.log(`Added ${blogPosts.length} blog URLs to sitemap`);
  }

  xml += '</urlset>';

  // Write sitemap to public folder
  const publicDir = path.join(__dirname, '..', 'public');
    const sitemapPath = path.join(publicDir, 'sitemap.xml');

  if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(sitemapPath, xml);
    console.log(`Sitemap generated at ${sitemapPath}`);
    console.log(`Total URLs: ${staticRoutes.length + caseStudies.length + (blogPosts.length ? blogPosts.length + 1 : 0)}`);
}

generateSitemap();
