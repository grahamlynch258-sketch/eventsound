# SEO QA Checklist

Run after every deploy to verify SEO is intact.

## Meta & Schema
- [ ] Homepage title contains "EventSound" and "Event Production"
- [ ] Homepage meta description present and under 160 chars
- [ ] og:image loads (not 404): /og-image.svg
- [ ] og:title and og:description present on all pages
- [ ] JSON-LD LocalBusiness schema present on homepage (view source, search "LocalBusiness")
- [ ] Article JSON-LD present on each published case study detail page
- [ ] Canonical URLs point to https://eventsound.ie/[path]

## Indexing & Crawling
- [ ] robots.txt accessible at /robots.txt
- [ ] sitemap.xml accessible at /sitemap.xml and lists all public routes
- [ ] Prerendered HTML: view source on /services — should contain full rendered content, not empty div#root
- [ ] robots meta tag: check for "index,follow,max-image-preview:large" (requires VITE_INDEXABLE=true)
- [ ] /admin/* pages have X-Robots-Tag: noindex header

## Contact Form
- [ ] Turnstile CAPTCHA widget visible on /contact
- [ ] Form submission succeeds (test with real data)
- [ ] Email arrives at info@eventsound.ie
- [ ] Submit without CAPTCHA → blocked
- [ ] Honeypot field hidden from user
