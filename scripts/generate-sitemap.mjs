import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get Supabase credentials from environment
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Static routes with priority
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.8', changefreq: 'monthly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/gallery', priority: '0.8', changefreq: 'weekly' },
  { path: '/case-studies', priority: '0.8', changefreq: 'weekly' },
  { path: '/reviews', priority: '0.6', changefreq: 'monthly' },
  { path: '/faq', priority: '0.5', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/health-and-safety', priority: '0.4', changefreq: 'yearly' },
];

async function generateSitemap() {
  console.log('Generating sitemap...');

  try {
    // Fetch published case studies
    const { data: caseStudies, error } = await supabase
      .from('case_studies')
      .select('slug, updated_at')
      .eq('is_published', true)
      .eq('noindex', false);

    if (error) {
      console.error('Error fetching case studies:', error);
      // Continue with static routes even if case studies fetch fails
    }

    // Build sitemap XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static routes
    staticRoutes.forEach(route => {
      xml += '  <url>\n';
      xml += `    <loc>https://eventsound.ie${route.path}</loc>\n`;
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
      xml += `    <priority>${route.priority}</priority>\n`;
      xml += '  </url>\n';
    });

    // Add case study routes
    if (caseStudies && caseStudies.length > 0) {
      caseStudies.forEach(caseStudy => {
        xml += '  <url>\n';
        xml += `    <loc>https://eventsound.ie/case-studies/${caseStudy.slug}</loc>\n`;
        if (caseStudy.updated_at) {
          const lastmod = new Date(caseStudy.updated_at).toISOString().split('T')[0];
          xml += `    <lastmod>${lastmod}</lastmod>\n`;
        }
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += '  </url>\n';
      });
      console.log(`Added ${caseStudies.length} case study URLs to sitemap`);
    } else {
      console.log('No published case studies found');
    }

    xml += '</urlset>';

    // Write sitemap to public folder
    const publicDir = path.join(__dirname, '..', 'public');
    const sitemapPath = path.join(publicDir, 'sitemap.xml');

    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(sitemapPath, xml);
    console.log(`✅ Sitemap generated successfully at ${sitemapPath}`);
    console.log(`Total URLs: ${staticRoutes.length + (caseStudies?.length || 0)}`);

  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();