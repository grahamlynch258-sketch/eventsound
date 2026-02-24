# Domain Cutover Plan: eventsound.ie

## Pre-Cutover Checklist
- [ ] All content populated via admin (case studies, gallery, testimonials)
- [ ] SEO QA checklist passes (see docs/seo-qa.md)
- [ ] Contact form tested end-to-end
- [ ] OG image loads correctly
- [ ] VITE_INDEXABLE=true set in Netlify env vars for Production

## DNS Changes
- [ ] Log into domain registrar for eventsound.ie
- [ ] Add Netlify DNS records:
  - A record: 75.2.60.5 (Netlify load balancer)
  - CNAME: www → inspiring-daffodil-811d11.netlify.app
- [ ] Or: Change nameservers to Netlify DNS
- [ ] Wait for DNS propagation (up to 48 hours, usually 1-4 hours)

## Netlify Custom Domain
- [ ] Netlify → Domain management → Add custom domain: eventsound.ie
- [ ] Add www.eventsound.ie as domain alias
- [ ] Enable HTTPS → Netlify provisions Let's Encrypt SSL automatically
- [ ] Verify SSL certificate active (padlock in browser)

## Redirects
- [ ] Add to netlify.toml: redirect www.eventsound.ie → eventsound.ie (or vice versa)
- [ ] Verify old Netlify URL redirects to eventsound.ie

## Cloudflare Turnstile
- [ ] Verify eventsound.ie is in Turnstile hostname allowlist
- [ ] Test CAPTCHA renders on production domain

## Post-Cutover Verification
- [ ] Site loads at https://eventsound.ie
- [ ] Site loads at https://www.eventsound.ie (redirects to primary)
- [ ] Contact form works on production domain
- [ ] Admin login works on production domain
- [ ] All images load (no mixed content warnings)
- [ ] Run full SEO QA checklist

## Google Search Console
- [ ] Add property: https://eventsound.ie
- [ ] Verify ownership (DNS TXT record or HTML meta tag)
- [ ] Submit sitemap: https://eventsound.ie/sitemap.xml
- [ ] Request indexing for homepage
- [ ] Monitor for crawl errors over next 7 days

## Rollback Plan
If critical issues found after cutover:
1. Revert DNS to previous hosting
2. Keep Netlify site running on staging URL as fallback
3. Fix issues on staging, re-test, re-cutover
