# Migration Report: eventsound.ie → www.eventsound.ie

## URL Mapping

| Legacy URL | New Route | Status |
|---|---|---|
| `eventsound.ie/` | `/` | ✅ Migrated |
| `eventsound.ie/about/` | `/about` | ✅ New page |
| `eventsound.ie/services/` | `/services` | ✅ New page |
| `eventsound.ie/services/live-event-production/` | `/services#live-event-production` | ✅ Anchor link |
| `eventsound.ie/services/audio-equipment/` | `/services#audio-equipment` | ✅ Anchor link |
| `eventsound.ie/services/led-video-display-screens/` | `/services#led-video-display-screens` | ✅ Anchor link |
| `eventsound.ie/services/hybrid-events/` | `/services#hybrid-events` | ✅ Anchor link |
| `eventsound.ie/services/lighting-effects/` | `/services#lighting-effects` | ✅ Anchor link |
| `eventsound.ie/services/stage-hire-pipe-drape/` | `/services#stage-hire-pipe-drape` | ✅ Anchor link |
| `eventsound.ie/services/video-equipment/` | `/services#video-equipment` | ✅ Anchor link |
| `eventsound.ie/faq/` | `/faq` | ✅ New page |
| `eventsound.ie/reviews/` | `/reviews` | ✅ New page |
| `eventsound.ie/contact/` | `/contact` | ✅ Updated |
| `eventsound.ie/health-and-safety/` | `/health-and-safety` | ✅ New page |
| `/av-production` (internal) | `/services` | ✅ Kept as alias |

## Content Migrated

### Brand
- ✅ Name: Event Sound Pro Audio & Entertainment
- ✅ Email: info@eventsound.ie
- ✅ Phone: +353 87 288 8761, +353 86 831 1851, +353 86 352 0476
- ✅ Location: Townrath, Drogheda, Co. Louth, Ireland
- ✅ LinkedIn: https://ie.linkedin.com/company/event-sound-pro-audio

### Services (7 services with full descriptions)
- Live Event Production
- Audio Equipment (brands: L-Acoustics, Martin Audio, Allen & Heath, Yamaha, Shure, Sennheiser)
- LED Video & Display Screens (brands: Unilumin, Samsung, LG)
- Hybrid Events
- Lighting & Effects (brands: Chamsys)
- Stage Hire & Pipe & Drape (brands: GUIL)
- Video Equipment

### Testimonials (8 real reviews migrated)
- Paul Barnes (Fingal County Council)
- Kevin Rowe (Kevin Rowe Events)
- Phil Nulty
- Tom F., Emma R., Mairead L., John K., Sarah M.

### FAQ (12 questions across 3 categories)
- General Enquiries (4)
- Equipment & Services (4)
- Event Planning & Support (4)

### Health & Safety
- Full safety statement migrated

## Structured Content Files
- `src/config/site.ts` — Brand config (single source of truth)
- `src/content/services.ts` — 7 services with descriptions, features, brands
- `src/content/faqs.ts` — 12 FAQs in 3 categories
- `src/content/testimonials.ts` — 8 real client testimonials
- `src/content/about.ts` — About copy and H&S statement

## Legacy Brand Verification
- ✅ Zero matches for "StageSpark"
- ✅ Zero matches for "Stage Spark"
- ✅ Zero matches for "hello@stagespark.ie"
- ✅ Zero matches for "+35312345678"

## TODO
- [ ] Generate branded OG image (`/public/og-image.png`)
- [ ] Add Facebook and Instagram social URLs to `src/config/site.ts`
- [ ] Upload legacy gallery images to Supabase storage via admin panel
- [ ] Seed testimonials into database via admin panel or seed script
- [ ] Consider adding 301 redirects for old service slugs if domain migrates
