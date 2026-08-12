---
slug: led-wall-presentation-content
title: "How to Prepare Presentation Content for a Big LED Wall (Aspect Ratios, Safe Areas, Playback)"
meta_title: "LED Wall Presentation Content: Ratios, Safe Areas, Playback"
meta_description: "How to prepare presentation content for an LED wall — aspect ratios, custom slide sizes, safe areas, video formats and testing playback before show day."
excerpt: "LED walls are rarely the shape your slides assume. How to set up decks for a custom canvas, respect safe areas and deliver video files that play cleanly on a big screen."
category: LED Walls
tags: [led-walls, presentation-content, conference-av]
primary_keyword: led wall presentation content
featured_image: ""
featured_image_alt: "[TAILOR: real photo + specific alt text]"
author: Graham Lynch
published_at: 2026-08-27
---

Most presentation problems on show day were baked in weeks earlier, when someone built a deck for a laptop screen instead of the wall it would actually play on. LED walls are modular: they are built to whatever size and shape the event needs, and that shape is often not 16:9. The result is familiar — stretched logos, cropped titles, text hidden behind a lectern.

This guide covers how to prepare LED wall presentation content properly: confirming the canvas, setting up slides, respecting safe areas, exporting video that behaves and testing playback before doors. The advice applies whichever supplier builds your screen. EventSound builds [LED video walls](/services/led-video-walls/) from 6m² to 50m²+, including curved and custom-shaped configurations — which is exactly where the standard 16:9 assumption falls apart.

## Start with the canvas, not the deck

An LED wall is assembled from panels, so its shape follows the design of the event rather than a television standard. A 4m × 2.25m wall happens to be 16:9. A 6m × 2.5m wall behind a conference stage is far wider, and a curved or column-shaped build bears no resemblance to a slide at all.

Before anyone designs anything, get two numbers from your AV supplier:

1. **The content resolution in pixels** — the canvas your content should be built to. For example, a 4m × 2m wall of 2.6mm panels is roughly 1,536 × 768 pixels.
2. **The aspect ratio** — the shape of that canvas, plus any areas the set design will cover.

Note that LED walls carry fewer pixels than people expect. A wall several metres wide can have a lower resolution than the laptop it is designed on, and that is fine — it is viewed from metres away, not centimetres. What matters is designing to the real canvas; our guide to [pixel pitch and viewing distance](/blog/pixel-pitch-explained/) explains why resolution and sharpness depend on where the audience sits.

At the Beta Festival in The Digital Hub, Dublin, we built a curved LED wall for an art and technology exhibition. A canvas like that cannot simply receive a PowerPoint export — the content has to be made for the shape.

> [TAILOR: the Beta Festival curved wall — actual dimensions and shape, a photo, and how the exhibition content was mapped onto it.]

## Set the slide size before you design anything

Every major tool can match a custom canvas, but the setting is buried and the order matters.

- **PowerPoint:** Design → Slide Size → Custom Slide Size. PowerPoint measures slides in centimetres rather than pixels, so match the ratio: for a 2:1 canvas, 50.8cm × 25.4cm works perfectly.
- **Keynote:** use a custom slide size, which can be set in pixels directly.
- **Google Slides:** File → Page setup → Custom.

Set the size first, then design. Resizing an existing deck reflows every layout, and "we'll tidy it later" turns into an hour of nudging text boxes the night before the event.

If the deck already exists and cannot be rebuilt, the honest fallback is pillarboxing: the deck plays at its correct ratio and the remaining wall width carries a background or branding. A pillarboxed deck looks deliberately framed. A stretched one looks wrong to every person in the room.

## Respect the safe areas

On stage, parts of the wall are routinely obstructed. The bottom edge sits behind the lectern, panellists' heads or set pieces, and on very wide walls the outer edges fall outside comfortable reading range for people seated at the sides.

Practical rules that survive contact with a real stage:

- Keep titles, figures and anything that must be read inside the central 90% of the canvas — roughly a 5% margin on every side.
- Keep the bottom 10–15% free of critical content if a lectern or seated panel sits in front of the wall.
- On wide canvases, centre-weight the message and use the outer thirds for imagery or brand texture.
- Check lower-third name straps against the stage plan, not against a blank slide.

> [TAILOR: an annotated photo of a real EventSound conference wall showing where the lectern and stage furniture overlapped the canvas.]

## Design for the back of the room

A slide that reads perfectly at arm's length can be illegible from row twenty. Design for the furthest paying seat.

- Use fewer words and larger type than feels natural on a laptop. A quick test: view the slide on your laptop from three metres away — roughly a mid-room seat's experience.
- Prefer light text on dark backgrounds. LED is an emissive, bright medium: large pure-white slides can dominate a dim room and leave presenters silhouetted in front of a glowing rectangle.
- Avoid hairline table borders, 1px rules and fine serif detail. On coarser pixel pitches there are simply not enough pixels to draw them cleanly.
- Be careful with highly saturated single-colour text, especially pure red — it tends to look soft on LED. Slightly desaturated colours read cleaner.

## Video: formats that behave on show day

Video causes more show-day drama than slides, and almost all of it is avoidable at export time.

- Supply each video as a separate file as well as embedded in the deck. An MP4 (H.264) at 1080p or the canvas resolution is the safe default.
- Use a constant frame rate. Screen recordings from phones and Teams calls are often variable frame rate, which plays fine on a laptop and stutters through a playback system. Re-export at a constant 25 or 50 fps — which also matches camera feeds if your session uses IMAG.
- For 1080p playback, a bitrate around 20–30 Mbps is comfortable; extreme bitrates gain nothing and can choke playback machines.
- Embed audio at 48kHz stereo and tell the AV team which videos carry sound, so it is routed and checked rather than discovered.
- If content plays through a media server, the operator may request ProRes or HAP versions. Ask before exporting — it saves a re-render.
- Name files so a stranger can run the show: `03_keynote_smith_v2.mp4` beats `final_FINAL_new.mp4` every time.

## Playback: how your content actually reaches the wall

Nobody plugs a laptop straight into an LED wall. Content goes to a playback machine, then through an LED processor that maps the image onto the panels at the agreed resolution. That has three practical consequences.

**Present from the show machine where possible.** A presenter's own laptop brings adapter roulette, notifications, sleep mode and missing fonts to the stage. If someone genuinely must present from their own device — a live software demo, say — flag it in advance so resolution, adapters and audio can be planned.

**Embed your fonts.** In PowerPoint: File → Options → Save → embed fonts in the file. Otherwise the playback machine substitutes its own and your careful layout reflows. A PDF copy of the deck is a useful belt-and-braces backup: animations are lost, but the layout is bulletproof.

**Presenters never need to turn around.** A confidence monitor at the foot of the stage shows the current slide, and a clicker advances the deck. Ask your AV team to confirm both — a presenter craning at the wall behind them reads as unprepared, and it is entirely avoidable.

## Test before show day — not at ten to nine

Every deck should be tested on the actual playback system: fonts, aspect ratio, animations, embedded video and audio routing. At our own events, presentations are tested before the programme starts — the deadline for content exists so that testing can actually happen.

Agree a handover deadline with your AV supplier a few working days out. Late changes on the morning are a fact of conference life, but they should be edits to a tested deck, not the first time anyone has seen the file. For anything business-critical — a launch film, an awards sting — ask for a full run in rehearsal.

> [TAILOR: a real save — a presentation that arrived in the wrong format or with a broken video, and how it was caught and fixed before doors.]

## The handover checklist

- Canvas confirmed in pixels, with aspect ratio and any obstructed zones
- Slide size set to match **before** design work started
- Critical content inside the safe area; bottom margin respected
- Fonts embedded, plus a PDF backup of the deck
- Videos supplied as separate MP4s, constant frame rate, audio flagged
- Files named with running order, presenter and version
- Everything delivered by the agreed deadline
- Own-laptop demos flagged in advance
- Deck tested on the show system before the programme starts

## Frequently asked questions

**What resolution should slides be for an LED wall?**
Ask your supplier for the content resolution and build to that. The aspect ratio matters more than the pixel count — a correctly shaped deck scales cleanly, a wrongly shaped one never looks right.

**Can we just use our normal 16:9 deck?**
If the wall is 16:9, yes. If it is wider, either rebuild the key slides at the correct ratio or pillarbox the deck against a designed background. Never stretch it.

**Why does our video stutter on the big screen?**
The usual culprits are variable frame rate recordings, extreme bitrates or playing from a cloud link. Supply a local, constant-frame-rate MP4 and test it on the show machine.

**When should we send our content?**
By whatever deadline your AV team sets — typically a few working days before the event, so every file is tested before the programme starts rather than during it.

## Getting the canvas right for your event

Tell us your venue and what you want the wall to do, and we'll give you the exact canvas size and a one-page content spec to send your presenters — before anyone designs a slide. Still choosing the screen itself? Our [video wall hire guide](/blog/video-wall-hire-guide/) covers sizes and formats, or [talk to us about your event](/contact/).
