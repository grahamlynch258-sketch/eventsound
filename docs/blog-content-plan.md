# Blog launch plan — 20 posts, mapped to real Search Console data

> **v3 revision (13 Aug, after external review): keyword ownership.** Every
> transactional phrase ("video wall hire", "stage hire ireland", "event
> lighting hire", "led screen hire") is OWNED by its service page — the SERPs
> for those terms are commercial, and a blog post competing for them risks
> cannibalising the page that should win. Each blog post owns exactly ONE
> narrower informational query instead. Six posts are being retargeted
> accordingly (H1, intro, headings and anchors — not just meta titles):
>
> | Post | Old target (now service-page-owned) | New blog target |
> |---|---|---|
> | video-wall-hire-guide | video wall hire | how does video wall hire work / video wall sizes for events |
> | stage-hire-ireland-guide | stage hire ireland | what size stage do I need for an event |
> | event-lighting-hire-ireland | event lighting hire ireland | what lighting does my event venue need |
> | led-screen-or-led-wall | led screen hire | led screen vs led wall |
> | event-lighting-design-guide | event lighting design (page already ~pos 8) | conference & awards-night lighting design |
> | outdoor-stage-hire-ireland | outdoor stage hire | outdoor stage planning checklist ireland |
>
> **Publication schedule (replaces the three waves): two posts per week,
> strongest first, measured as we go.** Weeks 1–4: Swords Castle case study +
> LED wall cost → video walls for theatre + school musical sound → LED wall vs
> projector + conference technical brief → AGM streaming + conference AV
> costs. The six retargeted guides and the rest publish only after Search
> Console shows the first eight indexing cleanly and service-page rankings
> holding. `published_at` now acts as a scheduler (future-dated posts stay
> hidden on the site, in the prerender and in the sitemap), so everything
> tailored can be imported in one go with staggered dates.

Companion to [blog-style-guide.md](blog-style-guide.md). **v2 — rebuilt around
the GSC export of 12 Aug 2026** (3-month: 711 queries, 14.5k impressions, avg
pos 21.8 · 16-month: 1,000 queries, 46.5k impressions). Verified separately:
#1 organic for "LED video wall hire Ireland", "conference AV hire Ireland",
"LED wall hire Dublin".

## What the data says (drives everything below)

1. **Lighting is the closest breakthrough.** 124 lighting queries, 1,369
   impressions, average position 12.4 — the whole cluster sits just off page
   one ("event lighting design" pos 6 · 97 imp; "lighting hire available" pos 8
   · 82; "event lighting" pos 4.9 · 48). The lighting page already earns 1,661
   imp at pos 11. Two good posts + internal links can tip the cluster onto
   page 1. The old plan had zero lighting posts — fixed.
2. **"Video wall" (without "LED") is the volume phrasing we miss.** "video
   wall hire" 386 imp @ pos 21.5, "hire video wall" 292 @ 24.9, "video wall
   rental" 66 @ 19.7 — plus cheap vertical wins already at pos 11–18: drama,
   theatres, fashion shows, talent shows.
3. **Stage hire is a big cluster that went dark.** 16-month data: "stage
   hire"/"stage for hire" ~1,300 imp, "indoor stage hire" 576, "stage hire for
   event" 313, "outdoor stage hire" 84 @ pos 16.9 — **almost none of it in the
   last 3 months**, and the staging page isn't in the top-15 pages by
   impressions. The cluster needs both posts AND a page investigation.
4. **Cost content is validated.** "led wall hire cost" pos 2.5 with clicks,
   "video wall hire cost" pos 1 with a click, "led video wall price" 20 imp —
   buyers ask, and we already win when we answer.
5. **Almost all traffic is non-brand** (18 of 24 non-branded clicks vs 6 brand)
   and several top-position/zero-click queries look like AI-assistant query
   fan-out ("irish suppliers programmed lights live event production", pos 1.9,
   107 imp) — the llms.txt/AI-crawler work is visibly in play.
6. Conference cluster is still young (page at pos ~29) — keep building it, but
   it's the slow burner, not the quick win.

## Non-blog flags surfaced by the data (separate follow-ups)

- **Staging page visibility**: why did the stage-hire cluster disappear from
  recent impressions? Check the page's title/content vs the queries.
- **"Video wall" phrasing**: the LED walls page should say "video wall hire"
  naturally in copy/FAQs, not only "LED video wall".
- **Touchscreen rental**: ~190 impressions (pos ~38) for touch screen rental —
  do we even hire them? Business decision before any content.

---

## Wave 1 — data-backed quick wins (8 posts)

| # | Working title | Primary query (imp @ pos, 3mo) | Feeds page |
|---|---|---|---|
| 1 | **Event Lighting Design: How Professionals Light a Conference, Awards Night or Live Show** | event lighting design (97 @ 6.0) + lighting design for events (51 @ 6.2) | /services/lighting-design/ |
| 2 | **Event Lighting Hire in Ireland: Uplighting, Moving Heads and What Your Venue Needs** | lighting hire available (82 @ 8.0) + event lighting solutions hire (47 @ 5.5) + corporate event lighting (49 @ 11) | /services/lighting-design/ |
| 3 | **Video Wall Hire: Sizes, Costs and How It Works** | video wall hire (386 @ 21.5) + hire video wall (292 @ 24.9) + video wall rental (66 @ 19.7) | /services/led-video-walls/ |
| 4 | **What Does LED Wall Hire Cost in Ireland? Price Per m², Crew and What the Quote Includes** | led wall hire cost (pos 2.5, converting) + led video wall price (20 @ 12.9) | /services/led-video-walls/ |
| 5 | **Stage Hire in Ireland: Indoor and Outdoor Stages, Sizes and Safety** | stage hire (~1,300 imp/16mo) + indoor stage hire (576) | /services/staging-pipe-drape/ |
| 6 | **Outdoor Stage Hire: Weather, Ground and What It Takes to Build a Show Outside** | outdoor stage hire (84 @ 16.9) + outdoor stages (45 @ 14.8) | /services/staging-pipe-drape/ |
| 7 | **Conference AV Planning in Ireland: The Technical Brief to Build Before You Request Quotes** | conference av checklist / conference sound and lighting (50 @ 14.7) | /services/conference-av-hire/ — PILLAR + downloadable template |
| 8 | **LED Wall or Projector? How to Choose for Your Conference Venue** | led wall vs projector (comparison intent; supports cluster) | /services/led-video-walls/ |

## Wave 2 — verticals and depth (6 posts)

| # | Working title | Primary query | Feeds page |
|---|---|---|---|
| 9 | **Video Walls for Theatre, Drama and School Shows: Digital Backdrops That Work** | video wall hire drama (69 @ 11.3) + video wall hire theatres (64 @ 18.4) | /services/musical-theatre/ + /services/led-video-walls/ |
| 10 | **Sound and Wireless Mics for School Musicals and Panto: A 30-Channel Survival Guide** | school musical sound hire (panto season — publish by early Oct) | /services/musical-theatre/ |
| 11 | **Pixel Pitch Without the Jargon: Specifying an LED Wall by Viewing Distance** | pixel pitch explained | /services/led-video-walls/ |
| 12 | **LED Screen or LED Wall? TVs from 43" to Modular Walls — Which Your Event Needs** | led screen hire (166 @ 27.9) routing | /services/led-screen-hire/ ↔ /services/led-video-walls/ |
| 13 | **How We Produced the Swords Castle Summer Concerts (8,000 People a Night)** | case study; long-tail concert production | /services/event-production/ |
| 14 | **How to Prepare Presentation Content for a Big LED Wall (Aspect Ratios, Safe Areas, Playback)** | market gap (competitor audit) | /services/led-video-walls/ |

## Wave 3 — trust, costs and differentiation (6 posts)

| # | Working title | Primary query | Feeds page |
|---|---|---|---|
| 15 | **What Actually Drives Conference AV Costs: Equipment, Crew, Rehearsals and Venue Constraints** | av costs (pos 1.5!) / how much is av | /services/conference-av-hire/ |
| 16 | **The Conference AV Failure Checklist: What We Eliminate Before Doors Open** | risk/contingency gap topic | /services/conference-av-hire/ + /services/event-production/ |
| 17 | **Hybrid Speakers Without the Awkwardness: A Production Workflow for Remote Presenters** | hybrid/remote speaker (16-month evidence) | /services/virtual-events/ |
| 18 | **Live Streaming an AGM or Town Hall: Cameras, Platforms and What Can Go Wrong** | agm live streaming ireland | /services/video-production/ |
| 19 | **Accessible Conference AV: Captioning, Hearing Support and Inclusive Production** | near-zero Irish competition (audit gap) | /services/conference-av-hire/ |
| 20 | **How to Compare AV Quotes Like-for-Like: A Procurement Guide for Event Organisers** | compare av quotes / trust play | /services/conference-av-hire/ |

Cut from v1 (no query evidence): hotel-venues piece, standalone Dublin post
(city pages already earn impressions — Limerick 549, Athlone 321, Galway 179 —
supporting posts add little), "behind the show" and "production timeline"
(fold their material into #13 and #16).

---

## Internal linking rules (every post)

1. Link to the **one money page** it feeds, in the first third.
2. Link to **two sibling posts** in the same cluster (once they exist).
3. After wave 1 indexes, add links from each money page back to its 2–3 posts.
4. Vertical posts cross-link the vertical page AND the parent service page.

## Authoring workflow

Per post Graham supplies ~10 minutes of raw material (voice note or bullets):
the real story (venue, numbers, what went wrong/right), 2–4 photos from the
library, price/spec facts. Drafting per the style guide (Claude or Codex);
**Graham fact-checks and takes the byline** (named expertise is a
differentiator per the audit). Byline: Graham Lynch — EventSound, 20+ years of
event production.

## Import format (for the bulk-upload script)

One markdown file per post in `content/blog/`, frontmatter header:

```markdown
---
slug: event-lighting-design-guide
title: "Event Lighting Design: How Professionals Light a Conference"
meta_title: Event Lighting Design Ireland | Conference & Show Lighting | EventSound
meta_description: How professional lighting design works for conferences, ...
excerpt: What a lighting designer actually does, and how to brief one ...
category: Lighting
tags: [lighting, conference-av]
primary_keyword: event lighting design
featured_image: <library URL or storage path>
featured_image_alt: Moving-head lighting rig over a corporate awards stage in Dublin
author: Graham Lynch
published_at: 2026-08-20
---

Post body in markdown…
```

`scripts/import-blog-posts.mjs` (ships with the blog port) reads the folder and
inserts rows as `published` via the service key.

## Success measures (30/60/90 days)

- Wave URLs indexed within 14 days of each wave (Search Console coverage)
- Lighting cluster average position from 12.4 into single digits by day 45
- "video wall hire" from pos 21.5 to page 1 by day 60–90
- Stage-hire cluster impressions reappearing by day 45
- First blog-assisted enquiry attribution (conversion events) by day 60–90
- Money-page rankings held (post meta titles deliberately differ from money
  pages to avoid cannibalisation)
