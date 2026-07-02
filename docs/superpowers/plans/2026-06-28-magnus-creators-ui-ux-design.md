# Magnus Creators — UI/UX Design Specification

> **Phase 2 of the Magnus Creators website build — translating brand strategy into concrete component and page designs.**

**Reference:** Brand strategy, color palette, typography, and sitemap are defined in `docs/superpowers/specs/2026-06-27-magnus-creators-website-design.md`.

---

## Section 1: Home Page — Section-by-Section Design

---

### 1.1 Preloader

**Visual:**
- Full-screen overlay, background `#050505`
- Centered: MAGNUS CREATORS logotype (font: Space Grotesk, 700, tracking 0.3em)
- Letters animate in one-by-one: `translateY(100%)` → `translateY(0)`, stagger 0.08s each
- Below logo: thin horizontal progress bar (2px, `#00E5FF`), width animates 0% → 100% over 1.5s
- Below bar: percentage counter (e.g., "42%") in Satoshi, 0.8rem, `#999`

**Animation Sequence:**
1. Letters reveal top-to-bottom (0–0.6s)
2. Progress bar fills (0.3–1.8s)
3. Hold briefly (1.8–2.0s)
4. Entire preloader slides up: `translateY(0)` → `translateY(-100%)` over 0.6s cubic-bezier(0.77,0,0.175,1)
5. Main page content fades in

**Exit Condition:** Preloader exits when `isLoaded: true` in Zustand store. Never shown again on return visits (localStorage flag `magnus_visited`).

**Technical:** `useSceneStore.getState().setIsLoaded(true)` called after animations complete. Lenis scroll paused during preloader.

---

### 1.2 Navigation

**Visual:**
- Position: `fixed`, top-0, full-width, `z-index: 50`
- Height: 80px desktop, 64px mobile
- Background: transparent on hero, transitions to `rgba(5,5,5,0.85)` + `backdrop-filter: blur(20px)` after 100px scroll
- Left: MAGNUS CREATORS wordmark (Space Grotesk, 700, tracking 0.15em, 1rem)
- Center/Right: nav links + CTA button

**Links:**
- Labels: Home, About, Services, Portfolio, Contact
- Style: General Sans, 0.875rem, tracking 0.05em, `#999`
- Hover: underline slides in from left (scaleX 0→1, 0.3s ease), text becomes `#FFF`
- Active page: underline persistent, text `#00E5FF`

**CTA Button ("Get in Touch"):**
- Pill shape: `border-radius: 9999px`
- Background: `#FFF`, Text: `#050505`
- Hover: background → `#00E5FF`, text stays dark, `box-shadow: 0 0 20px rgba(0,229,255,0.3)`
- Transition: 0.3s all cubic-bezier(0.25,0.46,0.45,0.94)

**Mobile:**
- Hamburger icon (3 lines, 2px thick, 24px wide)
- On open: full-screen overlay, links stacked vertically, centered, 2rem gap
- Menu animates in: opacity 0→1 + translateY -20px→0, 0.4s

---

### 1.3 Hero Section

**Layout:** Full viewport height (`100vh`), content centered vertically

**Background Layer (R3F Canvas — see Phase 4):**
- Full-screen `<Canvas>` with `fixed` positioning behind content
- Scene: floating camera rig, film reels, light orbs, particle field, fog
- Camera: slow auto-rotation, mouse-parallax offset ±5°

**Gradient Overlay:**
- `linear-gradient(to bottom, transparent 0%, rgba(5,5,5,0.3) 50%, #050505 100%)`
- Ensures text readability over 3D scene

**Content (z-index above canvas):**
- Eyebrow: "CREATIVE PRODUCTION AGENCY" — Satoshi, 0.75rem, tracking 0.3em, `#00E5FF`, uppercase
- Main headline (H1): 3 lines, Space Grotesk 700
  - Line 1: "We Create"
  - Line 2: `<span className="text-electric-blue">Experiences</span>`
  - Line 3: "That Move People."
  - Size: `clamp(3rem, 8vw, 7rem)`, line-height 0.95, letter-spacing -0.02em
- Subheadline: "Creating Stories Beyond Reality" — General Sans, 1.25rem, `#999`, max-width 500px
- Spacing: 2rem between eyebrow and H1, 1.5rem between H1 and subheadline, 2.5rem between subheadline and CTAs

**Text Animation (on load):**
- Eyebrow: fade in + translateY 20px→0, 0.6s, delay 0.2s
- H1 lines: each line slides up from clip-path `inset(100% 0% 0% 0%)` → `inset(0% 0% 0% 0%)`, stagger 0.15s
- Subheadline: fade in, delay 0.6s
- CTAs: fade in + scale 0.95→1, delay 0.9s

**CTA Buttons:**
- Primary ("View Portfolio"): `bg-electric-blue` pill, `glow-blue` box-shadow, hover scale 1.02
- Secondary ("Book a Project"): `glass` pill, border `glass-border`, hover border → `#00E5FF`
- Gap between: 1rem
- Magnetic effect on hover (cursor within 20px radius)

**Scroll Indicator:**
- Bottom center, 3rem from bottom
- "Scroll" label + animated down-arrow
- Arrow bounces: translateY 0→8px→0, 1.5s ease-in-out infinite
- Fades out after 200px scroll

---

### 1.4 About Section

**Layout:** 2-column grid, `max-width: 1400px`, centered, `padding: 8rem 1.5rem`

**Left Column (40%):**
- Eyebrow: "02 — ABOUT" in Satoshi, 0.75rem, tracking 0.2em, `#00E5FF`
- Heading: "Crafting Cinematic Stories Since 2017"
  - Space Grotesk 700, `clamp(2.5rem, 4vw, 4rem)`, line-height 1.1
- Decorative: thin vertical line (2px, `#00E5FF`, 60px tall) left of eyebrow

**Right Column (60%):**
- Paragraph 1: "Magnus Creators is a full-service luxury creative studio..." — General Sans, 1.125rem, `#999`, line-height 1.8
- Paragraph 2: continuation — same style
- Stats row below paragraphs:
  - 4 stats in a row: "7+ Years", "150+ Projects", "98% Retention", "12 Countries"
  - Each: number in Space Grotesk 700, `3rem`, `#00E5FF`; label in General Sans, 0.875rem, `#999`
  - Counter animation on scroll-into-view: 0 → target over 2s, ease-out

**Animation on Scroll:**
- Left column: slides in from left (translateX -50px→0) + fade, trigger: `top 80%`
- Right column: slides in from right (translateX 50px→0) + fade, same trigger
- Stats: number counter animation triggers on visibility

---

### 1.5 Services Section

**Layout:** Full-width, `padding: 8rem 1.5rem`, dark section (`#050505`)

**Header:**
- Eyebrow: "03 — SERVICES"
- Heading: "Our Services" — centered, Space Grotesk 700, `clamp(2.5rem, 5vw, 4.5rem)`
- Subhead: "End-to-end creative production for brands that demand excellence"
- `max-width: 1400px`, centered

**Service Cards Grid (5 cards):**
- Desktop: 3 columns, 2 rows (last row 1 card centered or 2 cards)
- Tablet: 2 columns
- Mobile: 1 column

**Each Card:**
- Background: `glass-fill` with `backdrop-filter: blur(20px)`, `border: 1px solid glass-border`
- Border-radius: 1rem
- Padding: 2rem
- Content: icon (emoji, 3rem), title (Space Grotesk 700, 1.25rem), description (General Sans, 0.9rem, `#999`)
- Hover state:
  - `translateY(-8px)`
  - Border color → `rgba(0,229,255,0.3)`
  - `box-shadow: 0 20px 40px rgba(0,229,255,0.1)`
  - 3D tilt: `rotateX` and `rotateY` based on mouse position within card (±5°)
  - Transition: 0.4s cubic-bezier(0.25,0.46,0.45,0.94)

**Service Data (from constants.ts):**
| Icon | Title | Description |
|------|-------|-------------|
| 🎬 | Film Making | Wedding Films, Commercial Films, Corporate Videos, Music Videos, Documentaries, Drone Cinematography |
| 📷 | Event Coverage | Corporate Events, Luxury Weddings, Concerts, Sports, Product Launches, Live Streaming |
| 🏛 | 3D Rendering | Architecture, Interior Visualization, Exterior Visualization, Product Rendering, Real Estate, Furniture |
| 🏠 | 2D & 3D Tours | Virtual Walkthroughs, VR Tours, Real Estate Tours, Hotels, Resorts, Commercial Buildings |
| 🤖 | AI Video Production | AI Commercials, AI Product Videos, AI Fashion Videos, AI Social Media Ads, AI Animation, AI Talking Avatar, AI Cinematic Content |

**Animation:** Cards stagger in on scroll: 0.1s delay between each, `opacity 0→1` + `translateY(40px→0)`

---

### 1.6 Portfolio Section

**Layout:** Full-width, `padding: 8rem 1.5rem`

**Header:**
- Eyebrow: "04 — PORTFOLIO"
- Heading: "Selected Work"
- Subhead: "A glimpse into our world of cinematic storytelling"

**Filter Tabs:**
- Horizontal scroll on mobile
- Tabs: All | Films | Commercials | Architecture | Events | Real Estate | Drone | AI Videos
- Active tab: `bg-electric-blue` pill
- Inactive: `glass` pill, hover `border-electric-blue/50`
- Filter transition: fade out non-matching items, fade in matching, 0.3s

**Portfolio Grid:**
- Desktop: 3 columns, aspect-ratio `4/3` each
- Gap: 1.5rem
- Items animate in on scroll with stagger

**Each Portfolio Item (card):**
- Background image/video thumbnail, `border-radius: 0.75rem`, `overflow: hidden`
- On hover:
  - Image scales `1.0 → 1.05` over 0.6s
  - Dark overlay fades in (rgba 0,0,0,0.4)
  - "View Project" text appears centered, fades in
  - Category tag top-left
  - Cursor changes to custom "View" cursor
- Video items: autoplay on hover (muted)

**Load More:** "Load More Projects" button at bottom — outline style, centered

---

### 1.7 Workflow Section

**Layout:** Full-width, centered content, `padding: 8rem 1.5rem`

**Header:**
- Eyebrow: "05 — PROCESS"
- Heading: "How We Work"
- Subhead: "A seamless journey from concept to delivery"

**5-Stage Horizontal Timeline (desktop):**
- Stages connected by animated line
- Line draws from left to right as section scrolls into view

**Each Stage:**
- Number: large (Space Grotesk, 700, 4rem, `#00E5FF` with glow)
- Icon: 2.5rem
- Title: Space Grotesk 700, 1.25rem
- Description: General Sans, 0.9rem, `#999`
- Connector: animated SVG line with moving dot

**Stages:**
1. **Discovery** — "Understanding your vision, audience, and goals"
2. **Planning** — "Strategic creative direction and production roadmap"
3. **Production** — "Cinematic capture with premium equipment"
4. **Editing** — "Post-production with color grading and sound design"
5. **Delivery** — "Final files in multiple formats, ready to publish"

**Animation:** Each stage reveals as user scrolls, stagger 0.2s, slide up + fade in

**Mobile:** Vertical timeline, centered

---

### 1.8 Clients Section

**Layout:** Full-width, `padding: 6rem 0`, border-top + border-bottom `glass-border`

**Header (optional, small):**
- "Trusted by Global Brands"

**Infinite Marquee:**
- Logo strip scrolls continuously: left to right, 30s linear infinite
- 2 identical sets of logos side-by-side for seamless loop
- Logos: grayscale(100%) → grayscale(0%) + opacity 0.7 → 1 on hover
- Hover: pauses marquee, logo scales 1.05
- Logos include: DLF, Godrej Properties, Hyatt, Amazon Basics, Flame University, Accor, The Heart of Europe, Terra Solis, Jacob & Co, Royal Enfield

**Animation:** `marquee-scroll` keyframes (defined in tailwind.config.ts), `animation-play-state: paused` on hover

---

### 1.9 Testimonials Section

**Layout:** Full-width, `padding: 8rem 1.5rem`

**Header:**
- Eyebrow: "06 — TESTIMONIALS"
- Heading: "What Our Clients Say"

**3D Carousel:**
- 3 cards visible on desktop (center prominent, sides slightly rotated/hidden)
- Auto-advances every 5s
- Navigation: dots below + left/right arrows
- Swipe-enabled on mobile

**Each Card (glass):**
- Background: `glass-fill`, `backdrop-filter: blur(20px)`, `border: 1px solid glass-border`
- Border-radius: 1.25rem
- Padding: 2.5rem
- Quote icon (decorative, top-left): " — General Sans, 3rem, `#00E5FF`, opacity 0.3
- Quote text: General Sans, 1.125rem, `#FFF`, line-height 1.7, italic
- Author: name (Space Grotesk 700, 1rem) + role (General Sans, 0.875rem, `#999`)
- 3D tilt on hover (like service cards)

**Cards Data:**
1. "Motion Nest completely transformed our real estate listings with their cinematic videography. Every property now stands out!" — Rahul Mehta, CEO, Skyline Realty
2. "The level of detail and storytelling in their real estate videos is unmatched. They turned a simple home tour into a visual masterpiece." — Samantha Roy, Marketing Director, Elite Properties
3. "I was amazed by how seamlessly they captured the ambiance and essence of our properties. Professional, creative, and always top-quality!" — Neha Sood, CMO, Urban Nest Realty

---

### 1.10 Why Choose Us Section

**Layout:** Full-width, `padding: 8rem 1.5rem`

**Header:**
- Eyebrow: "07 — WHY US"
- Heading: "Why Choose Magnus Creators"
- Centered, max-width 800px

**6 Feature Cards (2x3 grid desktop, 2x3 tablet, 1x6 mobile):**

| Icon | Title | Description |
|------|-------|-------------|
| 🎥 | Premium Equipment | RED, ARRI, Sony cinema cameras; DJI drones; professional lighting |
| 👥 | Professional Team | 15+ creatives, directors, editors, 3D artists, AI specialists |
| 🎨 | Creative Direction | Award-winning creative heads with global experience |
| 🤖 | AI Technology | Cutting-edge AI for avatars, rendering, content generation |
| ⚡ | Fast Delivery | 7-day turnaround on standard projects |
| 🌍 | Global Standards | 12 countries, 150+ projects, Fortune 500 clients |

**Card Design:**
- Icon: 2.5rem, top
- Title: Space Grotesk 700, 1.125rem
- Description: General Sans, 0.875rem, `#999`
- `glass` background, `border-radius: 1rem`, `padding: 2rem`
- Hover: border → `#00E5FF`, translateY(-4px), glow

**Animation:** Cards stagger in on scroll, 0.1s delay between each

---

### 1.11 Contact CTA Section

**Layout:** Full-width, `padding: 10rem 1.5rem`, centered

**Visual:**
- Large heading: "Ready to Create Something Extraordinary?" — Space Grotesk 700, `clamp(2.5rem, 5vw, 5rem)`
- Subhead: "Let's discuss your project and bring your vision to life."
- Primary CTA: "Start a Project →" — `bg-electric-blue` pill, large (px-12 py-5), glow
- Secondary: "Book a Call" — outline style

**Background:** Subtle radial gradient from `#0a0a1a` to `#050505`, adds depth

**Animation:** Section fades + scales in (0.95→1) on scroll

---

### 1.12 Footer

**Layout:** Full-width, `padding: 4rem 1.5rem 2rem`, border-top `glass-border`

**Grid (4 columns desktop, 2 tablet, 1 mobile):**

**Column 1 — Brand:**
- Logo: MAGNUS CREATORS wordmark (Space Grotesk 700)
- Tagline: "Creating Stories Beyond Reality"
- Social icons row: Instagram, LinkedIn, YouTube, Twitter/X
  - Each: 40px circle, `glass` background, hover → `border-electric-blue`

**Column 2 — Navigation:**
- "Navigation" label (Satoshi, 0.75rem, `#00E5FF`, uppercase, tracking 0.1em)
- Links: Home, About, Services, Portfolio, Contact
  - Each: General Sans, 0.9rem, `#999`, hover → `#FFF`

**Column 3 — Services:**
- "Services" label (same style)
- Links to 5 service pages

**Column 4 — Contact:**
- "Get in Touch" label
- Email: hello@magnuscreators.com (hover → `#00E5FF`)
- Phone: +91 98765 43210
- WhatsApp button: green pill, WhatsApp icon

**Bottom Bar:**
- "© 2026 MAGNUS CREATORS. All rights reserved." (left)
- "Crafted with passion" (right)
- General Sans, 0.8rem, `#999`
- Border-top: `glass-border`, padding-top: 2rem

---

## Section 2: Sub-Page Design Specifications

---

### 2.1 Portfolio Page (/portfolio)

**Hero:**
- Full-width, 60vh height
- Background: large typography "PORTFOLIO" as texture (very subtle, opacity 0.03)
- Overlay gradient: `rgba(5,5,5,0.7)` to `#050505`
- Centered content:
  - Eyebrow: "OUR WORK"
  - H1: "Portfolio" — Space Grotesk 700, `clamp(3rem, 6vw, 6rem)`
  - Subhead: "A curated collection of our finest cinematic work"
- No 3D canvas on this page (performance)

**Filter Bar:**
- Sticky below nav on scroll
- Same filter tabs as homepage portfolio section

**Portfolio Grid:**
- Masonry-style on desktop (varying heights), grid on mobile
- More items than homepage preview (12-18 items)
- Load More button at bottom

**Lightbox:**
- Full-screen overlay, `rgba(0,0,0,0.95)`
- Video/image centered, max 90vw × 90vh
- Close (X) top-right
- Prev/Next arrows
- Project info below: title, category, description
- Keyboard navigation (Esc, ←, →)

---

### 2.2 Services Page (/services)

**Hero:**
- Same as portfolio page hero style
- H1: "Our Services"
- Subhead: "End-to-end creative production services"

**Service Rows:**
- Each service gets a full section (not cards)
- Alternating left/right layout: text | image
- Image: relevant stock photo or placeholder, rounded corners
- Text: icon, title, description, sub-service list
- CTA: "Interested in this service? →"

**Individual Service Pages** (5 sub-pages):
- `/services/filmmaking`
- `/services/event-coverage`
- `/services/3d-rendering`
- `/services/2d-3d-tours`
- `/services/ai-video-production`

Each has:
- Immersive hero with relevant 3D element or video background
- Service description
- Sub-services as cards
- 3-4 portfolio pieces related to this service
- CTA section

---

### 2.3 About Page (/about)

**Hero:**
- Same style as portfolio/services heroes
- H1: "About Magnus Creators"
- Subhead: "A collective of storytellers, technologists, and creative minds"

**Story Section:**
- Two-column: large pull-quote left, body text right
- Timeline of milestones (2017–present) with animated vertical line

**Stats Section:**
- Large numbers (7+ years, 150+ projects, etc.)

**Team Section (optional for Phase 1):**
- Grid of team member cards (photo, name, role)
- Hover: reveal social links

**Awards Section:**
- Logo/award display strip

---

### 2.4 Contact Page (/contact)

**Hero:**
- H1: "Let's Create Together"
- Subhead: "Have a project in mind? We'd love to hear about it."

**Two-Column Layout:**

**Left Column — Form:**
- Name input
- Email input
- Service dropdown
- Budget range dropdown (optional)
- Project details textarea
- Submit button: "Send Message" — `bg-electric-blue`, full-width
- Success state: form replaced with thank-you message + check animation

**Right Column — Info:**
- Phone (clickable)
- Email (clickable)
- WhatsApp button
- Social links (Instagram, LinkedIn)
- Embedded Google Map (dark theme filter via CSS)

---

## Section 3: Component Library

---

### 3.1 Button Component

**File:** `src/components/ui/Button.tsx`

**Variants:**
| Variant | Background | Border | Text | Hover |
|---------|-----------|--------|------|-------|
| `primary` | `#00E5FF` | none | `#050505` | glow-blue, scale 1.02 |
| `outline` | transparent | `rgba(255,255,255,0.08)` | `#FFF` | border→`#00E5FF`, glass bg |
| `ghost` | transparent | none | `#999` | text→`#FFF` |
| `glass` | `rgba(255,255,255,0.04)` | `rgba(255,255,255,0.08)` | `#FFF` | border→`rgba(0,229,255,0.3)` |

**Sizes:** `sm` (px-4 py-2, text-sm), `md` (px-6 py-3, text-base), `lg` (px-10 py-5, text-lg)

**Props:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  magnetic?: boolean; // enables magnetic hover effect
  glow?: boolean; // enables glow-blue class
}
```

**Magnetic Effect:** When `magnetic={true}`, button follows cursor within 20px radius, slight tilt

---

### 3.2 Card Component

**File:** `src/components/ui/Card.tsx`

**Types:**
- `GlassCard` — `glass` background, blur, border, used for feature/service cards
- `PortfolioCard` — image card with overlay, hover effects
- `TestimonialCard` — glass card with quote styling

**Props:**
```typescript
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean; // enables 3D tilt + glow on hover
  padding?: 'sm' | 'md' | 'lg';
}
```

---

### 3.3 Input / Textarea Components

**File:** `src/components/ui/Input.tsx`

**Design:**
- Background: `rgba(255,255,255,0.04)`
- Border: `1px solid rgba(255,255,255,0.08)`
- Border-radius: 0.5rem
- Padding: 1rem 1rem
- Text: General Sans, `#FFF`
- Placeholder: `#999` at 50% opacity
- Focus: border → `#00E5FF`, box-shadow `0 0 0 3px rgba(0,229,255,0.1)`
- Error: border → `#FF4444`, error message below in red

**Animation:** Underline expands from left on focus (width 0%→100%, 0.3s)

---

### 3.4 Navbar Component

**File:** `src/components/layout/Navbar.tsx`

**States:**
- `transparent` — on hero, over 3D canvas
- `scrolled` — after 100px scroll, glass background
- `menuOpen` — mobile, full-screen overlay

**Behavior:**
- Responds to `useSceneStore.isMenuOpen`
- Sets `isMenuOpen` on hamburger click
- Closes on link click or Escape key

---

### 3.5 Preloader Component

**File:** `src/components/layout/Preloader.tsx`

**Behavior:**
- Reads `useSceneStore.isLoaded`
- When `false`, renders full-screen preloader
- On mount, runs GSAP timeline: letters → progress bar → slide up
- On complete, calls `setIsLoaded(true)`, saves `magnus_visited` to localStorage
- On subsequent visits, skips preloader (reads localStorage)

---

### 3.6 Custom Cursor Component

**File:** `src/components/ui/Cursor.tsx`

**Design:**
- Small dot: 8px, `#00E5FF`, instant follow
- Large ring: 40px, `border: 1.5px solid #00E5FF`, lerped follow (factor 0.1)
- On hover interactive: ring expands to 70px, dot hides, text "View" appears in ring
- Blend mode: `mix-blend-mode: difference` on ring

**Implementation:**
- Two divs with `position: fixed`, `pointer-events: none`, `z-index: 9999`
- Dot: `transform: translate(-50%, -50%)` directly follows mouse
- Ring: lerped position via `requestAnimationFrame`

**Mobile:** Hidden (touch devices don't need cursor)

---

### 3.7 Portfolio Grid Component

**File:** `src/components/sections/PortfolioGrid.tsx`

**Props:**
```typescript
interface PortfolioGridProps {
  items: PortfolioItem[];
  activeFilter: string;
}
```

**Features:**
- Filter animation: items fade out (opacity 0, scale 0.95), new items fade in
- Masonry layout on desktop
- Hover: video preview plays (if video), overlay appears
- Click: opens Lightbox

---

### 3.8 Service Card Component

**File:** `src/components/ui/ServiceCard.tsx`

**Props:**
```typescript
interface ServiceCardProps {
  service: Service; // from constants.ts
  index?: number;
}
```

**Features:**
- 3D tilt effect on hover (mouse-position-driven)
- Icon, title, description
- Hover border glow

---

### 3.9 Testimonial Card Component

**File:** `src/components/ui/TestimonialCard.tsx`

**Props:**
```typescript
interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}
```

**Features:**
- Glass background
- 3D tilt on hover
- Quote icon decorative element

---

### 3.10 Marquee Component

**File:** `src/components/ui/Marquee.tsx`

**Props:**
```typescript
interface MarqueeProps {
  items: string[];
  speed?: number; // seconds for one cycle, default 30
  direction?: 'left' | 'right';
}
```

**Implementation:**
- Two identical sets of items side-by-side
- CSS `animation: marquee-scroll Xs linear infinite`
- Pause on hover via `animation-play-state`

---

## Section 4: Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|---------------|
| Mobile | 320–767px | Single column, stacked nav, hidden cursor |
| Tablet | 768–1199px | 2-column grids, simplified 3D |
| Desktop | 1200px+ | Full experience |

**Mobile Priorities:**
- All sections reflow to single column
- Horizontal scroll sections become vertical
- 3D canvas: reduced particle count (50 vs 200), post-processing disabled
- Touch-optimized: min 44px tap targets
- Swipe gestures: testimonials, portfolio lightbox
- Font sizes scale down via `clamp()`
- Preloader faster (skip letter animation)

**Tablet:**
- 2-column grids for services, portfolio, feature cards
- Simplified animations (fewer stagger effects)
- 3D canvas particle count reduced to 100

---

## Section 5: Motion & Animation Specifications

| Element | Animation | Duration | Easing | Trigger |
|---------|-----------|----------|--------|---------|
| Preloader letters | translateY 100%→0, stagger 0.08s | 0.6s total | cubic-bezier(0.77,0,0.175,1) | On mount |
| Preloader bar | width 0%→100% | 1.5s | ease-out | After letters |
| Hero H1 lines | clip-path inset reveal, stagger 0.15s | 0.8s | cubic-bezier(0.25,0.46,0.45,0.94) | On load |
| Section fade-in | opacity 0→1, translateY 50px→0 | 0.8s | ease-out | ScrollTrigger 80% |
| Card hover tilt | rotateX/Y based on mouse % | 0.3s | ease-out | Mouse enter |
| Magnetic button | translate to cursor, scale 1.05 | 0.3s | ease-out | Mouse move |
| Cursor ring | translate with lerp factor 0.1 | RAF | — | Mouse move |
| Portfolio filter | opacity+scale transition | 0.3s | ease | State change |
| Counter animation | 0 → target | 2s | power2.out | ScrollTrigger |
| Marquee | translateX loop | 30s | linear | Infinite |
| Testimonial auto-advance | opacity transition | 0.5s | ease | 5s interval |
| Page transition overlay | scaleY 0→1 (top→bottom) | 0.6s | cubic-bezier(0.77,0,0.175,1) | Navigation |
| Noise overlay | static | — | — | Always on |

**GSAP ScrollTrigger settings:**
- `start: "top 80%"` for most section reveals
- `start: "top 50%"` for above-fold content
- `toggleActions: "play none none reverse"` for most animations
- `scrub: false` for most (not the scroll-journey camera)

**Reduced Motion:**
- All animations respect `prefers-reduced-motion: reduce`
- If set: no animated preloader, no scroll animations, static layout
- `animation-duration: 0.01ms` enforced via CSS

---

## Phase 2 vs Phase 4/5 Boundary

Phase 2 (this document) = **what** each component/section does and looks like.

Phase 4 (Three.js) = **how** the hero 3D scene and scroll journey are built in R3F.

Phase 5 (GSAP) = **how** all scroll animations, page transitions, and micro-interactions are implemented.

Phase 2 is the blueprint. Phases 4 and 5 implement it.

---

*Design specification complete. Reference for Phase 4 (Three.js scenes) and Phase 5 (GSAP interactions) builds.*
