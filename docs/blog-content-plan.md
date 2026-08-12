# Blog launch plan — 20 posts, keyword-mapped

Companion to [blog-style-guide.md](blog-style-guide.md). The style guide says
"add keyword mapping before publication" — this is that mapping, built from
what eventsound.ie actually ranks for (verified Aug 2026: #1 organic for
"LED video wall hire Ireland", "conference AV hire Ireland", "LED wall hire
Dublin") plus the money pages the posts must feed.

**Strategy in one line:** every post deepens a cluster around a page that
already ranks, links down to that page, and gives Google (and AI crawlers)
evidence that EventSound is the authority behind the ranking.

**Publish in three waves, roughly a week apart** — smoother crawl pickup, and
wave-1 lessons tune wave 3. Set realistic `published_at` dates; request
indexing in Search Console after each wave (~10/day quota).

---

## Wave 1 — the money-page moat (8 posts)

Deepens the two clusters where we already hold #1. Highest priority.

| # | Working title | Primary query target | Feeds page | Notes / evidence needed |
|---|---|---|---|---|
| 1 | **Conference AV Planning in Ireland: The Technical Brief to Build Before You Request Quotes** | conference av checklist / how to plan conference av | /services/conference-av-hire/ | PILLAR. Ends with downloadable briefing template (lead asset). |
| 2 | **What Does LED Wall Hire Cost in Ireland? Price Per m², Crew and What the Quote Includes** | led wall hire cost ireland / led screen hire price | /services/led-video-walls/ | We publish a real €125/m²/day dry-hire rate in site config — use it. Beats AVL's cost article by covering crew/processing/power, not just panels. Date the prices. |
| 3 | **LED Wall or Projector? How to Choose for Your Conference Venue** | led wall vs projector | /services/led-video-walls/ | Comparison intent; reuse FAQ answer already on the service page as seed. |
| 4 | **Pixel Pitch Without the Jargon: Specifying an LED Wall by Viewing Distance** | pixel pitch explained / what pixel pitch do I need | /services/led-video-walls/ | Needs one diagram + real examples (2.6mm Absen at conference distance etc.). |
| 5 | **LED Screen or LED Wall? TVs from 43" to Modular Walls — Which Your Event Needs** | led screen hire vs led wall | /services/led-screen-hire/ + /services/led-video-walls/ | We have BOTH pages; this post routes each intent to the right one (anti-cannibalisation). |
| 6 | **What Actually Drives Conference AV Costs: Equipment, Crew, Rehearsals and Venue Constraints** | conference av cost / av hire cost ireland | /services/conference-av-hire/ | Transparency piece; mirrors what wins for The Conference Works in the UK. |
| 7 | **The Conference AV Failure Checklist: What We Eliminate Before Doors Open** | av checklist / event av problems | /services/conference-av-hire/ + /services/event-production/ | Risk/contingency gap topic: backup playback, spare radio mics, signal paths. |
| 8 | **How to Prepare Presentation Content for a Big LED Wall (Aspect Ratios, Safe Areas, Playback)** | presentation on led wall / led screen content format | /services/led-video-walls/ | Identified as a market-wide gap. Very practical; screenshots of PowerPoint canvas setup. |

## Wave 2 — local and vertical (6 posts)

Feeds the 12 city pages and the theatre vertical; competitors can't copy this
without our project history.

| # | Working title | Primary query target | Feeds page | Notes / evidence needed |
|---|---|---|---|---|
| 9 | **LED Wall Hire in Dublin: Venues, Sizes and Real Costs** | led wall hire dublin | /services/led-walls/dublin/ | Name real venue types (CCD, hotels); one Dublin project story. |
| 10 | **Outdoor LED Screens and Irish Weather: What It Takes to Run a Screen Outdoors** | outdoor led screen hire ireland | /services/led-video-walls/ | Swords Castle Summer Concerts experience — wind loading, IP ratings, ground support. |
| 11 | **Sound and Wireless Mics for School Musicals and Panto: A 30-Channel Survival Guide** | school musical sound hire / wireless mics musical | /services/musical-theatre/ | Toomey-style vertical play; panto season timing (publish before October). |
| 12 | **How We Produced the Swords Castle Summer Concerts (8,000 People a Night)** | (brand/case-study; long-tail "outdoor concert production ireland") | /services/event-production/ | Case study per style-guide structure, ending "what organisers can learn". |
| 13 | **Conference AV for Hotel Venues: What Venue Teams and Organisers Each Need to Know** | hotel conference av | /services/conference-av-hire/ + city pages | Draws on Grand Hotel Malahide / Hillgrove work already in the image slots. |
| 14 | **Stage Hire Outdoors: Uneven Ground, Weather and Safety Rails Explained** | outdoor stage hire ireland | /services/staging-pipe-drape/ | TUV certification is the proof point. |

## Wave 3 — depth and differentiation (6 posts)

The gap topics almost nobody in the Irish set covers.

| # | Working title | Primary query target | Feeds page | Notes / evidence needed |
|---|---|---|---|---|
| 15 | **Hybrid Speakers Without the Awkwardness: A Production Workflow for Remote Presenters** | remote speaker conference / hybrid event production | /services/virtual-events/ | Mix-minus, return video, rehearsal steps — operational gap topic. |
| 16 | **Accessible Conference AV: Captioning, Hearing Support and Inclusive Production** | accessible event av / event captioning ireland | /services/conference-av-hire/ | Near-zero Irish competition; genuine differentiator. |
| 17 | **Behind the Show: What Your AV Technician Is Actually Doing During Your Conference** | (supporting; justifies crew pricing) | /services/event-production/ | Humanises the all-inclusive pricing model. |
| 18 | **From Empty Ballroom to Live Show: A Corporate Event Production Timeline** | event production process / av setup time | /services/event-production/ | Photo-sequence post; load-in to de-rig with real timings. |
| 19 | **Live Streaming an AGM or Town Hall: Cameras, Platforms and What Can Go Wrong** | agm live streaming ireland / town hall streaming | /services/video-production/ + /services/virtual-events/ | Include the redundancy story (bonded cellular backup). |
| 20 | **How to Compare AV Quotes Like-for-Like: A Procurement Guide for Event Organisers** | compare av quotes / av procurement | /services/conference-av-hire/ | Consultancy-style trust play; candid about when a small event needs less. |

---

## Internal linking rules (every post)

1. Link to the **one money page** it feeds (first third of the article).
2. Link to **two sibling posts** in the same cluster (once they exist).
3. The money page links back to its 2–3 best posts (add after wave 1 indexes).
4. City-page posts cross-link their city page AND the parent service page.

## Authoring workflow (proposed)

Per post, Graham supplies raw material — 10 minutes each, voice note or bullet
points: the real story (venue, numbers, what went wrong/right), 2–4 photos from
the library, and the price/spec facts to state. Drafting (per the style guide)
can then be done by Claude or Codex; **Graham does the technical fact-check
pass** — he is the named expert, and the audit shows named authorship is a
differentiator. Byline: Graham Lynch — EventSound, 20+ years of event
production.

## Import format (for the bulk-upload script)

One markdown file per post in `content/blog/`, frontmatter header:

```markdown
---
slug: led-wall-hire-cost-ireland
title: What Does LED Wall Hire Cost in Ireland?
meta_title: LED Wall Hire Cost Ireland 2026 | Price Per m² | EventSound
meta_description: Real LED wall hire pricing in Ireland — per-m² rates, crew, ...
excerpt: A transparent breakdown of what LED wall hire actually costs ...
category: LED Walls
tags: [led-walls, pricing]
primary_keyword: led wall hire cost ireland
featured_image: <library URL or storage path>
featured_image_alt: Outdoor LED wall at Swords Castle Summer Concerts at dusk
author: Graham Lynch
published_at: 2026-08-20
---

Post body in markdown…
```

`scripts/import-blog-posts.mjs` (to be built with the blog port) reads the
folder and inserts rows as `published` via the service key.

## Success measures (30/60/90 days)

- Wave URLs indexed (Search Console coverage) within 14 days of each wave
- Impressions on target queries trending up by day 30
- First blog-assisted enquiry attribution (Clarity/conversion events) by day 60–90
- Money-page rankings held or improved (the blog must never cannibalise them —
  each post's meta title deliberately differs from its money page's)
