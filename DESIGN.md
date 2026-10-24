---
name: Toki
description: Portfolio de développeur full-stack, noir et chrome liquide WebGL.
colors:
  void: "#000000"
  ink: "#09090b"
  panel-top: "#151517"
  panel-bottom: "#050506"
  card-top: "#1d1e22"
  card-mid: "#0a0a0c"
  fg: "#f2f2f2"
  lead-text: "#e4e6ec"
  soft-text: "#d6d9e0"
  body-text: "#b4b7bf"
  quiet-text: "#a9acb4"
  nav-text: "#b8bcc5"
  mut: "#8b8e96"
  hair: "rgba(255,255,255,.11)"
  silver-hi: "#fafbfd"
  silver-lo: "#a7acb6"
  slab-ink: "#1b1c20"
typography:
  display:
    fontFamily: "Clash, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.5rem, min(9.4rem, 17vh, 8.2vw), 11.875rem)"
    fontWeight: 600
    lineHeight: 0.88
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Clash, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.75rem, 7.5vw, 8.5rem)"
    fontWeight: 500
    lineHeight: 0.86
    letterSpacing: "-0.05em"
  title:
    fontFamily: "Clash, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.375rem, 2vw, 2rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  lead:
    fontFamily: "Zodiak, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.375rem, 2.5vw, 2.875rem)"
    fontWeight: 300
    lineHeight: 1.18
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Zodiak, Georgia, Times New Roman, serif"
    fontSize: "clamp(1rem, 1.25vw, 1.1875rem)"
    fontWeight: 300
    lineHeight: 1.6
  label:
    fontFamily: "ui-monospace, SF Mono, JetBrains Mono, Menlo, Consolas, monospace"
    fontSize: "max(10px, .6875rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.2em"
  button:
    fontFamily: "ui-monospace, SF Mono, JetBrains Mono, Menlo, Consolas, monospace"
    fontSize: "max(10px, .75rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.14em"
rounded:
  pill: "62.4375rem"
  card: "1.375rem"
  next-shot: "1rem"
  tile: "clamp(.875rem, 1.3vw, 1.25rem)"
  shot: ".75rem"
  circle: "50%"
spacing:
  px: "clamp(1.25rem, 4.6vw, 5.5rem)"
  gap: "clamp(0.75rem, 1.8vw, 1.75rem)"
  sec: "clamp(5rem, 10vw, 10.625rem)"
  hpb: "clamp(1.75rem, 6vh, 4rem)"
components:
  button-chrome:
    backgroundColor: "{colors.panel-bottom}"
    textColor: "{colors.fg}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    height: "3.125rem"
    padding: "0 clamp(1.5rem, 3vw, 2.125rem)"
  button-chrome-hover:
    backgroundColor: "{colors.silver-hi}"
    textColor: "{colors.ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.soft-text}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    height: "3.125rem"
  nav-link:
    textColor: "{colors.nav-text}"
    rounded: "{rounded.pill}"
    padding: "0.75rem clamp(0.75rem, 1.5vw, 1.125rem)"
  nav-link-active:
    backgroundColor: "{colors.silver-hi}"
    textColor: "{colors.ink}"
  legend-chip:
    backgroundColor: "rgba(255,255,255,.04)"
    textColor: "{colors.nav-text}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: ".4375rem .875rem .4375rem .4375rem"
  legend-chip-pressed:
    backgroundColor: "{colors.silver-hi}"
    textColor: "{colors.ink}"
  pin:
    backgroundColor: "{colors.silver-hi}"
    textColor: "{colors.ink}"
    rounded: "{rounded.circle}"
    size: "2.125rem"
  card:
    backgroundColor: "{colors.card-top}"
    rounded: "{rounded.card}"
  flow-capsule:
    backgroundColor: "{colors.panel-top}"
    textColor: "{colors.fg}"
    rounded: "{rounded.pill}"
    height: "clamp(4.75rem, 6vw, 5.75rem)"
  stack-slab:
    backgroundColor: "{colors.silver-hi}"
    textColor: "{colors.slab-ink}"
    rounded: "{rounded.card}"
    padding: "clamp(1.25rem, 2.2vw, 2rem)"
---

# Design System: Toki

## Overview

**Creative North Star: "The Chrome Atelier"**

A black room lit by liquid metal. Everything sits on pure black (#000) behind a fixed, aria-hidden atmosphere of soft grey orbs, a diagonal light shaft, faint six-column rules, a perspective floor grid, film grain and a vignette. Against that night, the only "colour" is metal: display type cut in a silver gradient, frames and buttons ringed by a live WebGL chrome stroke, a mercury band dividing sections. There is no hue anywhere in the system; contrast and reflectivity do the work colour would do elsewhere.

Density is low and theatrical. Display type is huge and tightly tracked, set against small quiet serif copy and tiny spaced monospace labels. Layout runs on a 12-column grid with deliberate offsets and staggered columns rather than tidy rows. Motion is part of the material: lines rise out of blur, a highlight sweeps across silver type, cards and frames tilt in 3D and straighten on contact.

The project page (projet.html) extends this world without new tokens: the project screenshot is the stage, read by a chrome-ringed lens and numbered silver pins.

**Key Characteristics:**
- Monochrome only: black, greys, white, and the silver gradient. No accent hue.
- Three voices: Clash for display, Zodiak light for reading, system mono uppercase for labels and buttons.
- Live WebGL chrome rings on interactive frames (nav, cards, buttons, project frame, lens, flow capsules).
- Soft, deep, downward shadows and inset highlight lines; never hard offsets.
- Pill and generously rounded geometry; circles for pins and the lens.

## Colors

A colourless palette: pure black ground, a ladder of cool greys for text, and polished silver for anything that is active or prized.

### Primary
- **Polished Silver** (silver-hi to silver-lo, plus the `--silver` display gradient): the system's only "accent". Fills hovered and current nav links, hovered chrome buttons, pressed legend chips, numbered pins, the project tag, the first flow capsule and the stack slab. The `--silver` gradient (white through a dark mid-band at 50% back to near-white) is reserved for display type.

### Neutral
- **Void** (void): page ground and the fixed background layer.
- **Ink** (ink): text on silver surfaces.
- **Pressed Graphite** (panel-top to panel-bottom): vertical gradient behind nav, buttons and flow capsules.
- **Brushed Card** (card-top, card-mid): 160deg gradient for cards and stack panels, overlaid with 1px/3px vertical brushing and grain.
- **Bright Fog** (fg): default text.
- **Lead Pearl** (lead-text): large serif leads.
- **Soft Pearl** (soft-text): ghost button text, project meta values.
- **Body Grey** (body-text): hero and section intros, next-project line.
- **Quiet Grey** (quiet-text): card blurbs, overview paragraphs, pin detail.
- **Nav Grey** (nav-text): resting nav links and legend chips.
- **Muted Steel** (mut): mono labels, feature descriptions, legal line.
- **Hairline** (hair): 1px dividers; always paired with a 1.75rem white lead-in segment.
- **Slab Ink** (slab-ink): labels on the silver stack slab.

### Named Rules
**The No Hue Rule.** Nothing on any surface carries chroma. If a new element needs emphasis, it gets silver or white, never a colour.

**The Silver Is Earned Rule.** Solid silver fills mark state (hover, current, pressed) or a prized object (first flow step, stack slab, first stack panel, every third project card). Silver plates never sit side by side; the card rail cycles graphite, silver, ripple.

## Typography

**Display Font:** Clash Display variable (with Helvetica Neue, Arial)
**Body Font:** Zodiak variable, light 300 and italic (with Georgia, Times New Roman)
**Label/Mono Font:** system monospace stack (ui-monospace, SF Mono, JetBrains Mono, Menlo, Consolas)

**Character:** A heavy, tightly tracked grotesk sets the headline as an object; a light literary serif reads beside it, and spaced uppercase mono handles every small functional word.

### Hierarchy
- **Display** (600, fluid up to 11.875rem, 0.88): hero h1 and project name. Silver gradient with a white sweep highlight, drop shadow. The project title scales to its container by name length.
- **Headline** (500, clamp(2.75rem, 7.5vw, 8.5rem), 0.86): section heads (index work and stacks heads run larger, up to 15rem; footer "big" up to 12.5rem). Always silver gradient.
- **Title** (500, clamp(1.375rem, 2vw, 2rem), 1.05): feature, about item and card titles, flow step names. Solid white, never gradient.
- **Lead** (Zodiak 300, up to 2.875rem, 1.18): opening paragraph of a section; may mix in Clash 500 bold words and italic Zodiak emphasis.
- **Body** (Zodiak 300, clamp(1rem, 1.25vw, 1.1875rem), 1.5 to 1.6): intros cap at 26 to 36ch, overview text at 60ch.
- **Label** (mono 400 to 500, max(10px, .6875rem), 0.1 to 0.2em, uppercase): meta terms, numbering, step counters, legal line, tooltips.
- **Button** (mono 500, max(10px, .75rem), 0.14em, uppercase): every button and capsule label.

### Named Rules
**The Silver Display Rule.** Display and headline type is cut from the `--silver` gradient with background-clip text. This is deliberate identity (detector ignore recorded in .impeccable/config.json), not a stray gradient. Titles and body stay solid.

**The 10px Floor Rule.** Every mono label uses `max(10px, ...)` so the fluid scale never shrinks it below legibility.

## Layout

A centred `.wrap` (max 110rem, inline padding `px`) holding a 12-column grid with fluid `gap`. Sections are separated by `sec` top padding and a full-width mercury band (WebGL, masked at both ends). Compositions use offsets, not tidy blocks: hero line two indents, about items and feature lists stagger downward by column (0, then about 3 to 5vw, then 6 to 10vw), even cards drop lower than odd ones.

From 1280px up, the root font size scales with the viewport (`min(max(.8333vw,10px),24px)`, referenced to 1920px), so the whole layout scales proportionally on large screens and TV. Breakpoints: 1280px (fluid scale, six-card tilted rail), 900px (columns collapse to full width, staggers removed), 700px (single column, horizontal snap-scroll card rail, smaller pins and lens), 520px (nav tightening).

Project page: hero splits 5/7 columns (copy left, tilted frame right bleeding into the gutter); below 900px the frame stacks under the copy.

## Elevation & Depth

Depth is built from long, soft, downward shadows plus inset light lines, never flat cards and never hard offsets. Every raised surface has a top inset highlight (1px white at .14 to .24) and a faint inset outline. 3D perspective is part of depth: cards, the project frame and the next-project thumbnail tilt and straighten.

### Shadow Vocabulary
- **Deep drop** (`box-shadow: 0 2.125rem 3.75rem -1.625rem rgba(0,0,0,.95)`): cards, stack panels, stack slab.
- **Stage drop** (`box-shadow: 0 3.75rem 5.625rem -2.5rem rgba(0,0,0,.95)`): the project frame.
- **Nav float** (`box-shadow: 0 1.25rem 2.75rem -0.75rem rgba(0,0,0,.85)`): the fixed nav.
- **Small drop** (`box-shadow: 0 .5rem 1rem -.375rem rgba(0,0,0,.9)`): pins, tags, hovered tiles.
- **Top light** (`box-shadow: inset 0 1px 0 rgba(255,255,255,.14)`): every graphite surface.

### Named Rules
**The Soft Fall Rule.** Shadows fall straight down with a negative spread and high blur. Zero-blur offset shadows do not exist in this world.

## Shapes

Pills (62.4375rem) for nav, buttons, chips, tags, tooltips and flow capsules. Cards, panels, the project frame and the stack slab share one radius (1.375rem); screenshots inside them use .75rem; icon tiles use a fluid 0.875 to 1.25rem. Pins and the lens are circles. Borders are drawn as inset box-shadows, never as `border`. Dividers are 1px hairlines led by a 1.75rem white segment.

## Components

### Buttons
Mono uppercase capsules inside a live chrome ring.
- **Shape:** pill (62.4375rem), min height 3.125rem.
- **Chrome:** graphite gradient body inside a 2.5px rotating conic chrome border (CSS fallback; WebGL ring on top), blurred halo at 30%.
- **Hover / Focus:** body turns to silver gradient with ink text; press scales to .98. Focus is a 2px white outline offset 3px (global).
- **Ghost:** no ring; inset 1px white at .22, transparent body, soft-pearl text; hover lifts the line to .7 and adds an .08 white wash.

### Chips (legend)
- **Style:** pill, .04 white wash, inset 1px white at .12, mono label, a circular number badge on the left.
- **State:** hover brightens text and outline; pressed (`aria-pressed`) becomes solid silver with an ink badge.

### Cards / Containers
- **Corner Style:** 1.375rem.
- **Background:** brushed card gradient with radial pointer glow, vertical brushing, grain; a pointer-tracked specular sweep on hover. Variants: full silver plate (data-v 1) and radial ripple, right-aligned (data-v 2).
- **Shadow Strategy:** deep drop plus inset top light.
- **Internal Padding:** clamp(.625rem, .9vw, .875rem) around a .75rem-radius screenshot.

### Navigation
Fixed centred pill, graphite with brushing, WebGL chrome capsule ring. Logo mark is a 2.375rem circle that rotates on hover. Links are pills; hover, focus and `aria-current` turn solid silver. Hides upward on scroll down.

### Project Frame, Lens, Pins and Tag
The project screenshot sits in a card-style frame with a thick WebGL chrome ring, tilted (rotateY -8deg, rotateX 3deg) and unfolding from blur on load; it straightens while the pointer is over it. A circular lens (clamp 7.5 to 17rem) with chrome capsule ring magnifies under the pointer, finger on touch. Numbered silver pins (2.125rem circles, mono numbers) appear one by one; the active pin pings. A silver pill tag names the area under the lens.

### Features List
Three staggered columns, each item opened by the hairline divider, title in Clash, description in muted serif.

### Flow Capsules
Numbered chrome capsules (decimal-leading-zero counters in mono) linked by short silver bars; the first step is a silver capsule with ink text.

### Stack Slab
One full-width silver plate holding icon tiles (glassy white wash, inset outline) with mono uppercase names in slab ink; tiles lift .25rem on hover.

### Next-Project Link
Hairline-topped row: the next project's name in silver display type with a sweep on hover, its one-line description, and a tilted square thumbnail that straightens and zooms on hover.

### Motion and View Transitions
Easing is `cubic-bezier(.2,.8,.2,1)` throughout. Entrances rise 2.5rem out of blur and stagger by .12 to .14s. Cross-document view transitions are on (.7s); the card screenshot and the project frame share `view-transition-name: shot-<slug>`, so the card grows into the frame. Every animation and transition has a `prefers-reduced-motion` off switch.

## Do's and Don'ts

### Do:
- **Do** set every surface on black (#000) with the shared fixed atmosphere layer behind it.
- **Do** cut display and section headlines from the `--silver` gradient; keep titles and body solid.
- **Do** ring interactive frames with the WebGL `chromeRing`, falling back to the conic CSS chrome.
- **Do** draw edges as inset box-shadows and divide with the hairline plus 1.75rem white lead-in.
- **Do** use mono uppercase with `max(10px, ...)` for labels, numbering and buttons.
- **Do** give every motion a `prefers-reduced-motion` fallback.

### Don't:
- **Don't** introduce any hue; emphasis is silver or white.
- **Don't** use hard, zero-blur offset shadows; shadows fall soft and downward.
- **Don't** use `border` for outlines; use inset shadows.
- **Don't** set display type in Zodiak or body copy in Clash; the exceptions are italic Zodiak inside display lines and Clash bold words inside serif leads.
- **Don't** place two silver plates next to each other.
