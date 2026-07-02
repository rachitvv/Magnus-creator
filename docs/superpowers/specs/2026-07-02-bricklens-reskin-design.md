# BrickLens Studio Re-Skin — Design Spec

**Date:** 2026-07-02
**Status:** Approved for implementation
**Reference:** Screenshots in `C:\Users\RACHIT\OneDrive\Pictures\Screenshots\` + https://bricklensstudio.com/

## Goal
Re-skin the existing Next.js 14 project ("Magnus Creators") to clone the visual theme and information architecture of bricklensstudio.com, while keeping the existing animation framework (GSAP, Framer Motion, R3F, Lenis) intact and toning down the heavy 3D layer.

## Palette
| Token | Value | Use |
|---|---|---|
| `--bg` | `#F2EFE7` | Warm cream page background |
| `--bg-elevated` | `#FFFFFF` | Cards, surfaces |
| `--ink` | `#0A0A0A` | Primary text, headlines |
| `--ink-muted` | `#6B6B6B` | Secondary text, labels |
| `--accent` | `#E8A23C` | Warm amber dot, hover accents |
| `--accent-soft` | `#F5E6C4` | Amber tint backgrounds |
| `--inverse-bg` | `#1A1A1A` | Dark CTA section |
| `--inverse-ink` | `#FFFFFF` | CTA text |
| `--border` | `rgba(10,10,10,0.08)` | Subtle dividers |

## Typography
- **Headlines:** Space Grotesk (existing) — bold/black weights
- **Body:** Inter (replace Outfit) — regular weight
- **Stat numerals:** Space Grotesk 700, oversized (6xl–8xl)
- **Drop:** Syne (currently aliased as satoshi)

## Branding
- `name`: BrickLens Studio
- `tagline`: "Crafting cinematic stories for real estate & hospitality brands"
- `domain`: bricklensstudio.com
- `email`: Sales@bricklensstudio.com

## Sections (Homepage)
1. **Nav** — minimal cream-bg, dark text, links: About, Work, Services, Get in touch
2. **Hero** — top-positioned headline, "Get in touch" pill button with amber dot, generous whitespace
3. **About / Two-column** — "Bringing Ideas to Life" + "Collaborate with Us"
4. **SectionMarker** — horizontal bar: `• Premium Services  (BL-01)  ©2026`
5. **Services** — 2-column. Left: oversized "BrickLens Services®" headline + description. Right: 4 numbered cards (Filmmaking, Event Coverage, 3D Renders, 2D/3D Tours) with circular number badges
6. **Stats** — 3-column. Massive numbers (7+, 82+, 84%) + small labels
7. **Portfolio** — "Signature Projects®" header, 2-col video grid (Myriad, Adagio, Terra Solis, Sweden Palace) with overlay tag
8. **Testimonials** — client logos row + 3 testimonial cards
9. **Inverse CTA** — dark charcoal section. Left: "Have a project in mind?" form (Name, Email, Budget). Right: "Let's talk." headline + "Schedule a Strategy Call" button
10. **Footer** — minimal: logo + nav + contact + ©2026

## Component Plan

### Keep
- `Reveal` (fade-up scroll reveal)
- `AnimatedSection`
- `MagneticButton` (recolored)
- `useInView`, `useCounterAnimation`, `useMagneticEffect`, `useMousePosition`, `useScrollProgress`
- `Lenis` smooth scroll
- `Preloader` (re-themed to cream)
- `PageTransition` (re-themed)
- `Cursor` (recolored to amber)

### New
- `SectionMarker.tsx` — horizontal metadata bar
- `NumberedServiceCard.tsx` — circular number badge card
- `ProjectCard.tsx` — portfolio video card with overlay
- `InverseCTA.tsx` — dark CTA section
- `HeroMark.tsx` — small amber accent dot used in hero + section markers

### Modified
- `Navbar.tsx` — cream-bg, dark text, no glass
- `Preloader.tsx` — cream theme, BrickLens mark
- `MobileMenu.tsx` — full-screen cream
- `Cursor.tsx` — amber accent
- `MagneticButton.tsx` — dark primary, ink-bordered outline
- `ServiceCard.tsx` → delete (replaced by `NumberedServiceCard.tsx`)
- `tailwind.config.ts` — new palette, drop electric-blue/purple-accent
- `globals.css` — cream body bg, remove dark gradients/glow, add `.section-marker`, remove noise overlay
- `src/lib/constants.ts` — BrickLens branding + 4 services + testimonials + stats + clients
- `src/app/layout.tsx` — Inter font (replacing Outfit), drop Syne, BrickLens metadata

### 3D Scene — Tone Down
- Drop: `FilmReel.tsx`, `LightOrbs.tsx`, `ScrollWorlds.tsx`, `PostProcessing.tsx`, `HeroEnvironment.tsx`
- Simplify: `Particles.tsx` → subtle floating dust motes only
- Modify: `SceneProvider.tsx` → render only Particles, no R3F camera/postprocessing
- Keep: `CameraRig.tsx` (unused now but available)

## Pages
- **`/` (Home)** — full re-skin, all 10 sections above
- **`/about`** — re-skin to BrickLens about (currently 3.1 KB, expand to include "Bringing Ideas to Life" + "Collaborate with Us" sections)
- **`/services`** — re-skin to numbered 4-service list; DELETE `/services/2d-3d-tours`, `/services/3d-rendering`, `/services/ai-video-production`, `/services/event-coverage`, `/services/filmmaking` (not in BrickLens IA)
- **`/portfolio`** — re-skin to 4 video cards with section markers
- **`/contact`** — re-skin to inverse "Let's talk." pattern with form

## Cleanup (delete)
- Root HTML files: `index.html`, `contact.html`, `adagio-premium.html`, `myriad.html`, `sweden-palace.html`, `terra-solis.html`, `2d-3d-tours.html`, `3d-renders.html`, `ai-graphic-design.html`, `event-coverage.html`, `filmmaking.html`
- Root: `style.css`, `script.js`
- `.next/` build cache

## Keep
All Next.js framework + animation + assets (already documented above)

## Verification
- `npm run build` exits 0
- All 5 routes render without errors
- Cream background, amber accent, dark CTA visible
- 4 portfolio videos playable on hover
- Numbered service cards render with circular badges
- Testimonials + client logos display
- Form is visible (no backend needed)