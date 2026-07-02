# MAGNUS CREATORS — Website Design Specification

## Project Overview

**Client:** Magnus Creators Creative Production Agency
**Domain:** magnuscreators.com
**Tagline:** "Creating Stories Beyond Reality"
**Current State:** Existing "Motion Nest" single-page HTML/CSS/JS site → Complete rebrand to React/Next.js/Tailwind/R3F/GSAP

**Goal:** An Awwwards-quality cinematic web experience that positions Magnus Creators as one of the world's premier creative film production agencies. The experience should feel like Apple, Tesla, Porsche, Nike, and Studio Freight combined — luxury, immersive, dark-themed, cinematic.

---

## Phase 1: Brand Strategy & Site Architecture

### 1.1 Brand Positioning

**Agency Identity:** MAGNUS CREATORS is a full-service luxury creative studio at the intersection of high-end film production, immersive 3D experiences, AI-powered content creation, and digital storytelling.

**Core Pillars:**
- Cinematic Excellence — Every frame is intentional, every cut purposeful
- Creative Innovation — AI-augmented workflows, cutting-edge tech
- Global Standards — Competing with top creative agencies worldwide
- Luxury Positioning — Premium, minimal, elegant

**Target Audience:**
1. Luxury real estate developers (DDL, Godrej, Hyatt, etc.)
2. Premium fashion/lifestyle brands
3. Corporate entities needing brand films/commercials
4. High-net-worth individuals (luxury weddings, private events)
5. Music artists and labels (music videos, documentaries)

**Competitive Differentiation:**
- Full-stack creative offering: Film + 3D + Events + AI under one roof
- AI-integrated production pipeline (AI avatars, AI-generated visuals, AI editing)
- Proven track record with luxury global brands
- Cinematic storytelling over commodity production

**Mood Board References:**
- Studio Freight (dark luxury, minimal type)
- Apple (cinematic product reveals, smooth scroll)
- Awwwards SOTY winners (scroll-driven 3D, immersive)
- Tesla (bold typography, restraint, high-impact)
- Porsche (elegant motion, precision)
- Nike (athletic energy, bold statements)

---

### 1.2 Visual Identity

**Color Palette:**
| Role | Hex | Usage |
|------|-----|-------|
| Background | `#050505` | Primary dark background |
| Primary Accent | `#00E5FF` | Electric blue — CTAs, glows, highlights |
| Secondary Accent | `#8B5CF6` | Purple — gradients, secondary highlights |
| Text Primary | `#FFFFFF` | Headings, key text |
| Text Secondary | `#999999` | Body copy, muted labels |
| Glass Fill | `rgba(255,255,255,0.04)` | Glassmorphism card backgrounds |
| Glass Border | `rgba(255,255,255,0.08)` | Subtle card borders |
| Glow Blue | `rgba(0,229,255,0.15)` | Blue glow effects |
| Glow Purple | `rgba(139,92,246,0.15)` | Purple glow effects |

**Typography:**
- **Display/Headings:** Space Grotesk (700, 500) — bold, cinematic, modern
- **Body/UI:** General Sans (400, 500) — clean, readable, premium
- **Accent/Labels:** Satoshi (500) — geometric, contemporary
- **Fallback:** system-ui, -apple-system, sans-serif
- **Scale:** Massive headings (clamp 4rem–10vw), elegant subheads, generous line-height

**Visual Effects:**
- Glassmorphism cards with `backdrop-filter: blur(20px)`
- Soft glowing borders using box-shadow with accent colors
- Noise texture overlay (SVG filter) for film grain
- Subtle gradient meshes as section backgrounds
- Dynamic lighting via Three.js scene

---

### 1.3 Site Architecture & Sitemap

```
MAGNUS CREATORS
├── HOME (/)
│   ├── Preloader (animated logo reveal + loading bar)
│   ├── Navigation (fixed, glass, magnetic hover)
│   ├── Hero (fullscreen R3F canvas, animated headline)
│   ├── Scroll Journey (camera moves through creative worlds)
│   ├── About (storytelling, timeline, floating images)
│   ├── Services (5 immersive 3D cards)
│   ├── Portfolio (filter grid, lightbox, video)
│   ├── Workflow (5-stage animated timeline)
│   ├── Clients (infinite marquee, logo wall)
│   ├── Testimonials (3D glass card carousel)
│   ├── Why Choose Us (6 feature cards)
│   ├── Contact CTA (animated form, map)
│   └── Footer (dark, cinematic, newsletter)
│
├── PORTFOLIO (/portfolio)
│   └── Filterable grid: Films | Commercials | Architecture | Events | Real Estate | Drone | AI Videos
│
├── SERVICES (/services)
│   └── Individual service landing pages:
│       ├── /services/filmmaking
│       ├── /services/event-coverage
│       ├── /services/3d-rendering
│       ├── /services/2d-3d-tours
│       └── /services/ai-video-production
│
├── ABOUT (/about)
│   └── Full story, team, timeline, awards
│
└── CONTACT (/contact)
    └── Interactive form, Google Maps, WhatsApp, social links
```

---

## Phase 2: UI/UX Design

### 2.1 Page-by-Page Design Direction

**HOME — The Cinematic Experience:**
- **Hero:** Fullscreen R3F Canvas with animated 3D scene (floating camera rig, particles, film reel elements). Headline animates word-by-word. Two CTAs: "View Portfolio" (magnetic button glow) + "Book a Project" (outline glow).
- **Scroll Journey:** Single persistent R3F canvas — scroll position drives camera through 5 distinct "creative world" scenes: (1) Film set world, (2) 3D render world, (3) AI world, (4) Event world, (5) Final reel world. Each world has unique lighting, objects, fog, and color temperature.
- **About:** Split layout — large text left, animated timeline right. Floating images with parallax. Glassmorphism cards for stats.
- **Services:** 5 large cards in a grid. Each card tilts on hover (3D transform). On hover, a background video/image plays. Cards expand to full service sub-pages.
- **Portfolio:** Masonry/grid with category filters. Hover reveals video preview. Click opens fullscreen lightbox.
- **Workflow:** Horizontal scroll timeline on desktop, vertical on mobile. Each stage has animated icons. Stages animate in sequentially on scroll.
- **Clients:** Continuous marquee (infinite scroll) with client logos. Hover pauses marquee and enlarges logo.
- **Testimonials:** 3D carousel of glass cards. Auto-advances. Cards have subtle tilt effect.
- **Why Choose Us:** 6 cards in 2-row grid. Each has an animated icon, glow border on hover.
- **Contact CTA:** Fullwidth section with animated form inputs (underline expands on focus). Embedded Google Maps with dark filter.
- **Footer:** Dark, minimal. Animated logo. Social icons float on hover. Newsletter input.

**PORTFOLIO PAGE:**
- Hero with category filter tabs (All, Films, Commercials, Architecture, Events, Real Estate, Drone, AI Videos)
- Grid of portfolio items with hover video preview
- Lightbox with fullscreen video playback, prev/next navigation

**SERVICE PAGES:**
- Each service has immersive hero with relevant 3D scene
- Service detail list (sub-services)
- Case studies / work examples
- CTA to contact

**ABOUT PAGE:**
- Full agency story with large typography
- Animated timeline of milestones
- Team section with hover effects
- Awards/recognition section

**CONTACT PAGE:**
- Split layout: form left, map + info right
- Animated form inputs
- Floating WhatsApp button (bottom right)
- Social links with hover glow

---

### 2.2 Component Library

| Component | States | Notes |
|-----------|--------|-------|
| Button (Primary) | default, hover (glow + lift), active, disabled | Electric blue glow on hover |
| Button (Outline) | default, hover (fill + glow) | Glass background on hover |
| Magnetic Button | hover (follows cursor) | Subtle tilt + glow |
| Card (Glass) | default, hover (glow border, lift) | blur(20px) backdrop |
| Card (Service 3D) | default, hover (tilt + video play) | perspective: 1000px |
| Input | default, focus (underline expand), error | Animated underline |
| Textarea | default, focus, error | Same as input |
| Nav Link | default, hover (underline slide) | Smooth line animation |
| Portfolio Item | default, hover (video preview + overlay) | Cursor changes to "View" |
| Testimonial Card | default, active (3D tilt) | Carousel rotation |
| Logo (Marquee) | default, hover (pause + enlarge) | Infinite scroll loop |
| Cursor (Custom) | default, hover (enlarge + blend) | 8px dot + 40px outline |
| Cursor (Spotlight) | default, hover (spotlight reveal) | Gradient follows cursor |
| Preloader | loading (logo reveals letter-by-letter + bar) | Exits with slide-up |

---

### 2.3 Responsive Strategy

| Breakpoint | Behavior |
|------------|----------|
| Desktop (1200px+) | Full experience, horizontal scroll sections, 3D effects |
| Tablet (768–1199px) | Adapted grid (2-col), simplified 3D (fewer particles), preserved animations |
| Mobile (320–767px) | Single column, reduced animations, performant scroll, touch-optimized |

**Mobile Priorities:**
- No broken layouts — every section reflows gracefully
- 3D canvas simplified (lower particle count, simplified shaders)
- Touch-optimized buttons (min 44px tap targets)
- Swipeable testimonials
- Vertical scroll replaces horizontal scroll
- Preloader optimized (faster exit on mobile)

---

## Phase 3: React + Next.js Project Setup

### 3.1 Tech Stack

```
Framework:     Next.js 14 (App Router)
Styling:       Tailwind CSS v3
3D:            Three.js + React Three Fiber + Drei
Animation:     GSAP (ScrollTrigger, SplitText) + Framer Motion
Scroll:        Lenis Smooth Scroll
State:         React Context + Zustand (for 3D scene state)
Forms:         React Hook Form
Maps:          @react-google-maps/api
Deployment:    Vercel
```

### 3.2 Folder Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, smooth scroll
│   ├── page.tsx            # Home page
│   ├── globals.css         # Tailwind + custom CSS variables
│   ├── portfolio/
│   │   └── page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   ├── filmmaking/
│   │   ├── event-coverage/
│   │   ├── 3d-rendering/
│   │   ├── 2d-3d-tours/
│   │   └── ai-video-production/
│   ├── about/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
│
├── components/
│   ├── ui/                 # Primitive UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Cursor.tsx
│   │
│   ├── layout/             # Layout components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Preloader.tsx
│   │
│   ├── sections/           # Page sections (home page)
│   │   ├── Hero.tsx
│   │   ├── ScrollJourney.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Workflow.tsx
│   │   ├── Clients.tsx
│   │   ├── Testimonials.tsx
│   │   ├── WhyUs.tsx
│   │   └── ContactCTA.tsx
│   │
│   ├── three/              # Three.js / R3F components
│   │   ├── Scene.tsx       # Main R3F Canvas
│   │   ├── CameraRig.tsx   # Scroll-driven camera
│   │   ├── HeroEnvironment.tsx
│   │   ├── FilmReel.tsx
│   │   ├── Particles.tsx
│   │   ├── Lights.tsx
│   │   └── PostProcessing.tsx  # Bloom, noise, etc.
│   │
│   └── animations/         # Animation utilities
│       ├── GSAPProvider.tsx
│       ├── MagneticButton.tsx
│       └── TextReveal.tsx
│
├── hooks/
│   ├── useScrollProgress.ts
│   ├── useCursor.ts
│   ├── useMagneticEffect.ts
│   └── useLenis.ts
│
├── lib/
│   ├── gsap.ts             # GSAP initialization
│   ├── lenis.ts            # Lenis smooth scroll
│   └── constants.ts        # Site constants, colors, etc.
│
├── store/
│   └── sceneStore.ts       # Zustand store for 3D scene state
│
└── public/
    ├── assets/
    │   ├── videos/
    │   ├── images/
    │   └── models/         # .glb files for 3D
    └── fonts/
```

### 3.3 Tailwind Configuration

- Custom colors from palette as Tailwind theme extensions
- Custom font families: Space Grotesk, General Sans, Satoshi
- Custom animations: preloader-reveal, marquee-scroll, glow-pulse
- Glassmorphism utilities: bg-white/5, backdrop-blur-xl, border-white/10

### 3.4 Core Layout Setup

- **Lenis** initialized in root layout for smooth scroll across entire app
- **GSAP ScrollTrigger** registered globally
- **Custom cursor** component renders globally
- **Preloader** shows on first load only (localStorage flag)
- **Navbar** transparent on hero, glass on scroll

---

## Phase 4: Three.js Scenes & Animations

### 4.1 Hero 3D Environment

**Scene Elements:**
- Floating camera rig (cinema camera model — low-poly GLTF)
- Film reels rotating slowly
- Floating light orbs (blue + purple emissive)
- Particle system (sparkles, dust motes)
- Animated glass panels (transparent, refractive)
- Subtle fog for depth
- Moving volumetric smoke

**Lighting:**
- Ambient light (very low intensity)
- 2x Point lights (blue + purple) for color accents
- RectAreaLight simulating film light
- Bloom post-processing for glow

**Camera:**
- Fixed position, slow auto-rotation
- Subtle mouse-parallax offset (±5 degrees)
- No orbit controls — purely programmatic

### 4.2 Scroll Journey — 5 Creative Worlds

Single persistent R3F Canvas. ScrollTrigger drives transitions between 5 "worlds":

| World | Camera Z | Objects | Lighting | Fog Color |
|-------|----------|---------|----------|-----------|
| 1. Film World | 0 | Camera rig, film reels, clapperboard | Warm white | #1a0a0a |
| 2. 3D World | -20 | Geometric shapes, wireframes, cubes | Cool blue | #0a0a1a |
| 3. AI World | -40 | Neural network nodes, data streams, avatar silhouette | Purple/pink | #0a0a0a |
| 4. Event World | -60 | Disco lights, lens flare, bokeh circles | Dynamic multicolor | #0a0505 |
| 5. Final Reel | -80 | Reel closing, golden particles, Magnus logo | Warm gold | #050505 |

**Transitions:** Lerped camera position, object opacity fade, fog color blend, bloom intensity shift. Each world lasts ~200vh of scroll.

### 4.3 Service Card 3D Effect

- Each card uses CSS `perspective: 1000px` + `transform-style: preserve-3d`
- On hover: mouse position within card maps to `rotateX` (±8deg) and `rotateY` (±8deg)
- Background video/image plays on hover (muted, looped)
- Glow border intensifies on hover
- Framer Motion handles the smooth interpolation

### 4.4 Post-Processing Stack

Using `@react-three/postprocessing`:
- **Bloom** — Threshold: 0.8, intensity: 1.5, radius: 0.4
- **Noise** — Opacity: 0.03, grayscale: false (subtle film grain)
- **ChromaticAberration** — Very subtle (0.002 offset) for cinematic feel
- **Vignette** — Darkness: 0.5, offset: 0.3

---

## Phase 5: GSAP Interactions & Page Transitions

### 5.1 Scroll Animations

**Text Reveal:**
- Headlines use SplitText (GSAP) or manual character splitting
- Each word/character animates: `opacity: 0, y: 100` → `opacity: 1, y: 0`
- Stagger: 0.03s per character
- Trigger: ScrollTrigger, `start: "top 80%"`

**Image Reveal:**
- Images clip-path reveal from bottom to top: `inset(100% 0% 0% 0%)` → `inset(0% 0% 0% 0%)`
- Combined with subtle scale: 1.1 → 1.0

**Section Entrances:**
- Each section fades in + slides up on scroll
- Staggered children animate in sequence

### 5.2 Page Transitions

Using GSAP + Framer Motion:
- **Exit:** Current page content fades out + slides up slightly, overlay wipes in
- **Enter:** New page content reveals from below
- Transition duration: 0.6s with ease: `[0.77, 0, 0.175, 1]`
- Lenis scroll paused during transition

### 5.3 Micro-Interactions

**Magnetic Buttons:**
- Button follows cursor within 20px radius
- Slight scale up (1.05x) on hover
- Glow intensifies on hover
- Implemented via `mousemove` event + lerped position

**Cursor Effects:**
- 8px dot (instant follow) + 40px outline (lerped follow, 0.1 factor)
- Hover on interactive element: outline expands to 70px, dot hides
- Cursor text appears for portfolio items ("View")

**Parallax:**
- Hero background video/images move at 0.3x scroll speed
- Floating elements move at different rates
- Implemented via ScrollTrigger + GSAP

**Number Counters:**
- Stats animate from 0 to target on scroll into view
- Duration: 2s, ease: `power2.out`
- Trigger: `start: "top 80%"`

### 5.4 Lenis Smooth Scroll Integration

- Lenis initialized with `duration: 1.2, smoothWheel: true`
- GSAP ScrollTrigger scroller set to Lenis element
- RAF loop drives both Lenis and GSAP ticker
- On page navigation, Lenis scrolls to top

---

## Phase 6: Performance & SEO

### 6.1 Performance

**Image Optimization:**
- Next.js `<Image>` component with automatic WebP conversion
- Lazy loading with blur placeholder
- Responsive srcset for all breakpoints
- Priority loading for above-fold images

**3D Performance:**
- GLTF models compressed (Draco compression)
- Particle count limited: 200 desktop, 50 mobile
- Post-processing disabled on mobile
- R3F Canvas uses `frameloop="demand"` outside hero (only renders on change)
- LOD (Level of Detail) for complex 3D objects

**Code Splitting:**
- Dynamic imports for heavy components (R3F canvas, portfolio lightbox)
- Route-based splitting via Next.js App Router
- Component-level splitting for sections not in viewport

**Loading Strategy:**
- Critical CSS inlined
- Fonts preloaded with `font-display: swap`
- Preloader exits once critical assets loaded
- Service worker for asset caching

**Metrics Targets:**
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- Lighthouse Performance > 90

### 6.2 SEO

**Metadata (Next.js Metadata API):**
```typescript
export const metadata = {
  title: 'Magnus Creators | Creating Stories Beyond Reality',
  description: 'Magnus Creators is a luxury creative production agency specializing in cinematic filmmaking, 3D rendering, AI video production, and immersive digital experiences.',
  keywords: 'creative agency, film production, 3D rendering, AI video, commercial filmmaking, luxury video production',
  openGraph: {
    title: 'Magnus Creators | Creating Stories Beyond Reality',
    description: 'Award-winning cinematic creative production agency.',
    images: ['/og-image.jpg'],
    url: 'https://magnuscreators.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Magnus Creators',
    description: 'Creating Stories Beyond Reality',
  },
  robots: 'index, follow',
};
```

**Structured Data:**
- Organization schema (JSON-LD)
- VideoObject schema on portfolio pages
- LocalBusiness schema on contact page

**Accessibility:**
- WCAG 2.1 AA compliance target
- Focus management for page transitions
- ARIA labels on interactive elements
- Reduced motion preference respected (`prefers-reduced-motion`)
- Color contrast ratios > 4.5:1
- Skip-to-content link

---

## Phase 7: Deployment

### 7.1 Vercel Deployment

1. Push code to GitHub repository
2. Connect repo to Vercel dashboard
3. Configure build command: `npm run build`
4. Configure output directory: `.next`
5. Add environment variables (Google Maps API key if used)
6. Deploy with automatic HTTPS
7. Configure `vercel.json` for redirects (WWW → non-WWW)

### 7.2 Domain Configuration

- Register domain: magnuscreators.com (assumed)
- In Vercel: Add custom domain
- DNS: Point to Vercel nameservers
- SSL: Automatic via Let's Encrypt

### 7.3 Post-Deployment QA

- [ ] All pages load without errors
- [ ] Scroll animations trigger correctly
- [ ] 3D scenes render without WebGL errors
- [ ] Forms submit successfully
- [ ] Mobile responsive at all breakpoints
- [ ] Lighthouse audit passes > 90
- [ ] No 404 resources
- [ ] OG images render on social share
- [ ] Preloader shows on first visit, not on return

---

## Implementation Sequence

| Phase | Name | Duration Estimate | Dependencies |
|-------|------|-------------------|--------------|
| 1 | Brand Strategy & Sitemap | 1 day | — |
| 2 | UI/UX Design | 3–4 days | Phase 1 |
| 3 | React + Next.js Setup | 2 days | Phase 1 |
| 4 | Three.js Scenes | 4–5 days | Phase 3 |
| 5 | GSAP & Interactions | 3–4 days | Phase 3 |
| 6 | Performance & SEO | 1–2 days | Phase 4+5 |
| 7 | Deployment & QA | 0.5–1 day | All phases |

**Total Estimated:** 14–20 days

---

## Key Decisions Summary

| Decision | Choice | Rationale |
|----------|--------|-----------|
| 3D Architecture | Single persistent R3F Canvas | Smoothest scroll transitions, cinematic camera movement |
| Scroll Driver | GSAP ScrollTrigger | Industry standard, precise, well-documented |
| Smooth Scroll | Lenis | Best-in-class smooth scroll, GSAP compatible |
| State Management | Zustand (3D) + React Context (UI) | Lightweight, R3F-friendly |
| Page Transitions | GSAP + Framer Motion | Clean, configurable, reduced boilerplate |
| 3D Post-FX | @react-three/postprocessing | Integrated R3F pipeline |
| Font Loading | next/font (Google) | Automatic optimization, no FOUT |
| Image Optimization | next/image | Automatic WebP, lazy load, srcset |
| Mobile 3D | Reduced particles + disabled post-FX | Maintain 60fps on mobile |

---

## Outstanding Questions / Deferred Decisions

1. **3D Asset Source:** Will the site use purchased GLTF models (e.g., Sketchfab) or custom-built 3D assets? Custom looks more premium but costs more time.
2. **Video Hosting:** Where are portfolio videos hosted? (Vimeo, self-hosted, Mux, Cloudinary?) This affects video player implementation.
3. **Google Maps API Key:** Available for the contact page embed?
4. **AI Avatar Feature:** Will there be an interactive AI avatar on the site, or is "AI Video Production" just a service offered?
5. **Asset Delivery:** Will the client provide high-quality assets (photos, videos, logos, brand guidelines) or should the site use placeholder content initially?
6. **Authentication:** Any protected routes (client portal, portfolio upload) needed in the future?

---

*Spec written: 2026-06-27*
*Project: Magnus Creators Website*
*Status: Awaiting user review*
