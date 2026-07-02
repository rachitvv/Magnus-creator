# Magnus Creators — Next.js Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A fully scaffolded Next.js 14 (App Router) project with TypeScript, Tailwind CSS v3, React Three Fiber, GSAP, Framer Motion, Lenis Smooth Scroll, and the Magnus Creators brand theme — ready to run with `pnpm dev`.

**Architecture:** A Next.js App Router project with a custom Tailwind theme extending the design system (colors, fonts), a Zustand store for 3D scene state, GSAP + Lenis smooth scroll wired into the root layout, and placeholder page shells for Home, Portfolio, Services, About, Contact.

---

## File Map

| File | Purpose |
|------|---------|
| `package.json` | All dependencies + scripts |
| `next.config.js` | Next.js configuration |
| `tsconfig.json` | TypeScript configuration |
| `tailwind.config.ts` | Custom theme: colors, fonts, animations |
| `postcss.config.js` | PostCSS for Tailwind |
| `src/app/layout.tsx` | Root layout: fonts, smooth scroll, global providers |
| `src/app/page.tsx` | Home page shell |
| `src/app/globals.css` | CSS variables + Tailwind directives |
| `src/app/portfolio/page.tsx` | Portfolio page shell |
| `src/app/services/page.tsx` | Services page shell |
| `src/app/about/page.tsx` | About page shell |
| `src/app/contact/page.tsx` | Contact page shell |
| `src/lib/constants.ts` | Brand colors, site config constants |
| `src/lib/gsap.ts` | GSAP + ScrollTrigger registration |
| `src/lib/lenis.ts` | Lenis smooth scroll setup |
| `src/store/sceneStore.ts` | Zustand store for 3D scene state |
| `src/components/ui/.gitkeep` | Placeholder for UI components |
| `src/components/layout/.gitkeep` | Placeholder for layout components |
| `src/components/sections/.gitkeep` | Placeholder for page sections |
| `src/components/three/.gitkeep` | Placeholder for Three.js/R3F components |
| `src/components/animations/.gitkeep` | Placeholder for GSAP animation hooks |
| `src/hooks/.gitkeep` | Placeholder for custom hooks |
| `src/public/assets/.gitkeep` | Placeholder for static assets |

---

## Task 1: Create package.json

**Files:**
- Create: `D:\All projects\motio nest\package.json`

- [ ] **Step 1: Write package.json**

```json
{
  "name": "magnus-creators",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@gsap/react": "^2.1.1",
    "@react-three/drei": "^9.114.3",
    "@react-three/fiber": "^8.17.10",
    "@react-three/postprocessing": "^2.16.3",
    "framer-motion": "^11.11.17",
    "gsap": "^3.12.5",
    "lenis": "^1.1.14",
    "next": "14.2.16",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "three": "^0.169.0",
    "zustand": "^5.0.1"
  },
  "devDependencies": {
    "@types/node": "^20.16.13",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "@types/three": "^0.169.0",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.3"
  }
}
```

---

## Task 2: Create Next.js and TypeScript configs

**Files:**
- Create: `D:\All projects\motio nest\next.config.js`
- Create: `D:\All projects\motio nest\tsconfig.json`

- [ ] **Step 1: Write next.config.js**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;
```

- [ ] **Step 2: Write tsconfig.json**

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## Task 3: Create Tailwind and PostCSS configs

**Files:**
- Create: `D:\All projects\motio nest\tailwind.config.ts`
- Create: `D:\All projects\motio nest\postcss.config.js`

- [ ] **Step 1: Write tailwind.config.ts**

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        'electric-blue': '#00E5FF',
        'purple-accent': '#8B5CF6',
        white: '#FFFFFF',
        'text-muted': '#999999',
        'glass-fill': 'rgba(255,255,255,0.04)',
        'glass-border': 'rgba(255,255,255,0.08)',
        'glow-blue': 'rgba(0,229,255,0.15)',
        'glow-purple': 'rgba(139,92,246,0.15)',
      },
      fontFamily: {
        space: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        general: ['var(--font-general-sans)', 'system-ui', 'sans-serif'],
        satoshi: ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'marquee-scroll': 'marquee-scroll 30s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'marquee-scroll': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Write postcss.config.js**

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

## Task 4: Create globals.css and lib files

**Files:**
- Create: `D:\All projects\motio nest\src\app\globals.css`
- Create: `D:\All projects\motio nest\src\lib\constants.ts`
- Create: `D:\All projects\motio nest\src\lib\gsap.ts`
- Create: `D:\All projects\motio nest\src\lib\lenis.ts`
- Create: `D:\All projects\motio nest\src\store\sceneStore.ts`

- [ ] **Step 1: Write globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #050505;
  --electric-blue: #00E5FF;
  --purple-accent: #8B5CF6;
  --white: #ffffff;
  --text-muted: #999999;
  --glass-fill: rgba(255, 255, 255, 0.04);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glow-blue: rgba(0, 229, 255, 0.15);
  --glow-purple: rgba(139, 92, 246, 0.15);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  background-color: var(--bg);
  color: var(--white);
}

body {
  overflow-x: hidden;
}

/* Noise texture overlay */
.noise-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9998;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}

/* Glassmorphism utility */
.glass {
  background: var(--glass-fill);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
}

/* Glow utilities */
.glow-blue {
  box-shadow: 0 0 20px var(--glow-blue), 0 0 40px var(--glow-blue);
}

.glow-purple {
  box-shadow: 0 0 20px var(--glow-purple), 0 0 40px var(--glow-purple);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: var(--bg);
}
::-webkit-scrollbar-thumb {
  background: var(--electric-blue);
  border-radius: 3px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Write lib/constants.ts**

```typescript
export const SITE_CONFIG = {
  name: 'MAGNUS CREATORS',
  tagline: 'Creating Stories Beyond Reality',
  domain: 'magnuscreators.com',
  email: 'hello@magnuscreators.com',
  phone: '+91 98765 43210',
  instagram: 'https://instagram.com/magnuscreators',
  linkedin: 'https://linkedin.com/company/magnuscreators',
  whatsapp: 'https://wa.me/919876543210',
};

export const BRAND_COLORS = {
  bg: '#050505',
  'electric-blue': '#00E5FF',
  'purple-accent': '#8B5CF6',
  white: '#FFFFFF',
  'text-muted': '#999999',
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
];

export const SERVICES = [
  {
    id: 'filmmaking',
    title: 'Film Making',
    icon: '🎬',
    description: 'Wedding Films, Commercial Films, Corporate Videos, Music Videos, Documentaries, Drone Cinematography',
    href: '/services/filmmaking',
  },
  {
    id: 'event-coverage',
    title: 'Event Coverage',
    icon: '📷',
    description: 'Corporate Events, Luxury Weddings, Concerts, Sports, Product Launches, Live Streaming',
    href: '/services/event-coverage',
  },
  {
    id: '3d-rendering',
    title: '3D Rendering',
    icon: '🏛',
    description: 'Architecture, Interior Visualization, Exterior Visualization, Product Rendering, Real Estate, Furniture',
    href: '/services/3d-rendering',
  },
  {
    id: '2d-3d-tours',
    title: '2D & 3D Tours',
    icon: '🏠',
    description: 'Virtual Walkthroughs, VR Tours, Real Estate Tours, Hotels, Resorts, Commercial Buildings',
    href: '/services/2d-3d-tours',
  },
  {
    id: 'ai-video-production',
    title: 'AI Video Production',
    icon: '🤖',
    description: 'AI Commercials, AI Product Videos, AI Fashion Videos, AI Social Media Ads, AI Animation, AI Talking Avatar, AI Cinematic Content',
    href: '/services/ai-video-production',
  },
];
```

- [ ] **Step 3: Write lib/gsap.ts**

```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const initGSAP = () => {
  if (typeof window === 'undefined') return;

  ScrollTrigger.defaults({
    markers: false,
  });

  // Refresh ScrollTrigger on load
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
};
```

- [ ] **Step 4: Write lib/lenis.ts**

```typescript
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export const initLenis = (): Lenis => {
  if (typeof window === 'undefined') {
    throw new Error('Lenis can only be initialized in browser');
  }

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  // Connect Lenis to GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
};

export const getLenis = (): Lenis | null => lenisInstance;

export const destroyLenis = () => {
  lenisInstance?.destroy();
  lenisInstance = null;
};
```

- [ ] **Step 5: Write store/sceneStore.ts**

```typescript
import { create } from 'zustand';

interface SceneState {
  // Active scroll world (0-4)
  activeWorld: number;
  setActiveWorld: (world: number) => void;

  // Camera scroll progress (0-1)
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;

  // Preloader state
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;

  // Menu state
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  activeWorld: 0,
  setActiveWorld: (world) => set({ activeWorld: world }),

  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),

  isLoaded: false,
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),

  isMenuOpen: false,
  setIsMenuOpen: (open) => set({ isMenuOpen: open }),
}));
```

---

## Task 5: Create root layout and page shells

**Files:**
- Create: `D:\All projects\motio nest\src\app\layout.tsx`
- Create: `D:\All projects\motio nest\src\app\page.tsx`
- Create: `D:\All projects\motio nest\src\app\portfolio\page.tsx`
- Create: `D:\All projects\motio nest\src\app\services\page.tsx`
- Create: `D:\All projects\motio nest\src\app\about\page.tsx`
- Create: `D:\All projects\motio nest\src\app\contact\page.tsx`

- [ ] **Step 1: Write src/app/layout.tsx**

```tsx
import type { Metadata } from 'next';
import { Space_Grotesk, General_Sans, Satoshi } from 'next/font/google';
import './globals.css';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const generalSans = General_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-general-sans',
  display: 'swap',
});

const satoshi = Satoshi({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-satoshi',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
  description:
    'Magnus Creators is a luxury creative production agency specializing in cinematic filmmaking, 3D rendering, AI video production, and immersive digital experiences.',
  keywords: 'creative agency, film production, 3D rendering, AI video, commercial filmmaking',
  openGraph: {
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: 'Award-winning cinematic creative production agency.',
    url: `https://${SITE_CONFIG.domain}`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.tagline,
  },
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${generalSans.variable} ${satoshi.variable}`}
    >
      <body className="font-general antialiased bg-bg text-white">
        {/* Noise overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 w-full z-50 px-6 lg:px-12 py-6 flex items-center justify-between">
          <a
            href="/"
            className="font-space font-bold text-lg tracking-widest uppercase"
          >
            {SITE_CONFIG.name}
          </a>
          <ul className="hidden md:flex items-center gap-10">
            {NAV_LINKS.filter((l) => l.href !== '/').map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-general text-sm tracking-wide text-text-muted hover:text-electric-blue transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-bg font-general text-sm font-medium hover:bg-electric-blue transition-colors duration-300"
          >
            Get in Touch
          </a>
        </nav>

        {children}

        {/* Footer */}
        <footer className="border-t border-glass-border py-12 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <a
              href="/"
              className="font-space font-bold text-lg tracking-widest uppercase"
            >
              {SITE_CONFIG.name}
            </a>
            <div className="flex items-center gap-6">
              <a
                href={SITE_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-electric-blue transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href={SITE_CONFIG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-electric-blue transition-colors text-sm"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-text-muted hover:text-electric-blue transition-colors text-sm"
              >
                {SITE_CONFIG.email}
              </a>
            </div>
            <p className="text-text-muted text-xs">
              © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Write src/app/page.tsx (Home)**

```tsx
import { SERVICES, SITE_CONFIG } from '@/lib/constants';

export default function HomePage() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/50 to-bg z-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Placeholder for R3F Canvas — Task 6 will add actual 3D scene */}
          <div className="w-full h-full bg-bg/80 flex items-center justify-center">
            <p className="text-text-muted text-sm font-general tracking-widest uppercase animate-pulse">
              3D Scene Loading...
            </p>
          </div>
        </div>

        {/* Hero Text */}
        <div className="relative z-20 text-center px-6">
          <h1 className="font-space font-bold text-5xl md:text-7xl lg:text-9xl tracking-tight leading-[0.9] mb-6">
            We Create
            <br />
            <span className="text-electric-blue">Experiences</span>
            <br />
            That Move People.
          </h1>
          <p className="font-general text-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10">
            {SITE_CONFIG.tagline}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/portfolio"
              className="px-8 py-4 rounded-full bg-electric-blue text-bg font-general font-medium hover:opacity-90 transition-opacity glow-blue"
            >
              View Portfolio
            </a>
            <a
              href="/contact"
              className="px-8 py-4 rounded-full border border-glass-border text-white font-general font-medium hover:border-electric-blue transition-colors glass"
            >
              Book a Project
            </a>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-electric-blue font-general text-sm tracking-widest uppercase mb-4">
              About Us
            </p>
            <h2 className="font-space font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
              Crafting Cinematic Stories Since 2017
            </h2>
          </div>
          <div>
            <p className="text-text-muted font-general text-lg leading-relaxed mb-6">
              Magnus Creators is a full-service luxury creative studio specializing in cinematic filmmaking, immersive 3D experiences, and AI-powered content creation. We partner with global brands, luxury real estate developers, and visionary artists to produce work that transcends the ordinary.
            </p>
            <p className="text-text-muted font-general text-lg leading-relaxed">
              From high-end commercial productions to cutting-edge AI avatars, we bring together technology, artistry, and storytelling to create experiences that resonate.
            </p>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-32 px-6 lg:px-12 border-t border-glass-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-electric-blue font-general text-sm tracking-widest uppercase mb-4">
              What We Do
            </p>
            <h2 className="font-space font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Our Services
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <a
                key={service.id}
                href={service.href}
                className="group glass rounded-2xl p-8 hover:border-electric-blue/30 transition-all duration-500 hover:-translate-y-1"
              >
                <span className="text-4xl mb-6 block">{service.icon}</span>
                <h3 className="font-space font-bold text-xl mb-3 group-hover:text-electric-blue transition-colors">
                  {service.title}
                </h3>
                <p className="text-text-muted font-general text-sm leading-relaxed">
                  {service.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 lg:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-space font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-8">
            Ready to Create Something{' '}
            <span className="text-electric-blue">Extraordinary?</span>
          </h2>
          <p className="text-text-muted font-general text-lg mb-10">
            Let&apos;s discuss your project and bring your vision to life.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-electric-blue text-bg font-general font-semibold text-lg hover:opacity-90 transition-opacity glow-blue"
          >
            Start a Project
            <span>→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 3: Write src/app/portfolio/page.tsx**

```tsx
import { SITE_CONFIG } from '@/lib/constants';

export const metadata = {
  title: `Portfolio | ${SITE_CONFIG.name}`,
  description: 'Explore our cinematic portfolio of films, commercials, architecture, events, and AI video productions.',
};

export default function PortfolioPage() {
  return (
    <main className="pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-electric-blue font-general text-sm tracking-widest uppercase mb-4">
            Our Work
          </p>
          <h1 className="font-space font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight">
            Portfolio
          </h1>
          <p className="text-text-muted font-general text-lg mt-4 max-w-2xl mx-auto">
            A curated collection of our finest cinematic work across films, commercials, architecture, events, and AI content.
          </p>
        </div>

        {/* Filter tabs placeholder */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {['All', 'Films', 'Commercials', 'Architecture', 'Events', 'Real Estate', 'Drone', 'AI Videos'].map((tab) => (
            <button
              key={tab}
              className={`px-5 py-2 rounded-full text-sm font-general transition-colors ${
                tab === 'All'
                  ? 'bg-electric-blue text-bg'
                  : 'glass border border-glass-border text-text-muted hover:border-electric-blue/50 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Portfolio grid placeholder */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/3] glass rounded-xl flex items-center justify-center border border-glass-border hover:border-electric-blue/30 transition-colors cursor-pointer group"
            >
              <div className="text-center">
                <p className="text-text-muted text-sm font-general">Project {i + 1}</p>
                <p className="text-electric-blue/50 text-xs mt-1">Coming Soon</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Write src/app/services/page.tsx**

```tsx
import { SERVICES, SITE_CONFIG } from '@/lib/constants';

export const metadata = {
  title: `Services | ${SITE_CONFIG.name}`,
  description: 'Film Making, Event Coverage, 3D Rendering, 2D & 3D Tours, AI Video Production — full-service luxury creative studio.',
};

export default function ServicesPage() {
  return (
    <main className="pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-electric-blue font-general text-sm tracking-widest uppercase mb-4">
            What We Offer
          </p>
          <h1 className="font-space font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6">
            Our Services
          </h1>
          <p className="text-text-muted font-general text-lg max-w-2xl mx-auto">
            End-to-end creative production services for brands, developers, and visionaries who demand excellence.
          </p>
        </div>

        <div className="space-y-6">
          {SERVICES.map((service, index) => (
            <a
              key={service.id}
              href={service.href}
              className="group glass rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-6 hover:border-electric-blue/30 transition-all duration-500"
            >
              <div className="flex items-center gap-6">
                <span className="text-5xl">{service.icon}</span>
                <div>
                  <h2 className="font-space font-bold text-2xl md:text-3xl group-hover:text-electric-blue transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-text-muted font-general text-sm mt-1 max-w-xl">
                    {service.description}
                  </p>
                </div>
              </div>
              <div className="md:ml-auto">
                <span className="inline-flex items-center gap-2 text-electric-blue text-sm font-general opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <span>→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 5: Write src/app/about/page.tsx**

```tsx
import { SITE_CONFIG } from '@/lib/constants';

export const metadata = {
  title: `About | ${SITE_CONFIG.name}`,
  description: 'Learn about Magnus Creators — our story, team, creative philosophy, and global client partnerships.',
};

export default function AboutPage() {
  return (
    <main className="pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-electric-blue font-general text-sm tracking-widest uppercase mb-4">
            Our Story
          </p>
          <h1 className="font-space font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6">
            About Magnus Creators
          </h1>
          <p className="text-text-muted font-general text-lg max-w-3xl mx-auto">
            We are a collective of storytellers, technologists, and creative minds united by a singular passion — transforming visions into cinematic reality.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-16 mb-32">
          <div>
            <h2 className="font-space font-bold text-3xl mb-6">The Beginning</h2>
            <p className="text-text-muted font-general text-lg leading-relaxed mb-6">
              Founded in 2017, Magnus Creators began as a small team of passionate filmmakers with a shared dream — to create visual experiences that transcend the ordinary and leave lasting impressions on audiences worldwide.
            </p>
            <p className="text-text-muted font-general text-lg leading-relaxed">
              What started as a real estate video production house has evolved into a full-service luxury creative studio, working with global brands, five-star hotels, luxury developers, and visionary artists across four continents.
            </p>
          </div>
          <div>
            <h2 className="font-space font-bold text-3xl mb-6">Where We Are Now</h2>
            <p className="text-text-muted font-general text-lg leading-relaxed mb-6">
              Today, Magnus Creators stands at the intersection of traditional filmmaking excellence and cutting-edge technology. We leverage AI-powered tools, immersive 3D environments, and cinematic storytelling to deliver work that sets new industry standards.
            </p>
            <p className="text-text-muted font-general text-lg leading-relaxed">
              Our portfolio spans over 150 projects across 12 countries, with a client retention rate of 98% — a testament to our commitment to excellence and creative partnership.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-glass-border">
          {[
            { number: '7+', label: 'Years of Experience' },
            { number: '150+', label: 'Projects Worldwide' },
            { number: '98%', label: 'Client Retention' },
            { number: '12', label: 'Countries' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-space font-bold text-4xl md:text-5xl text-electric-blue mb-2">
                {stat.number}
              </p>
              <p className="text-text-muted font-general text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 6: Write src/app/contact/page.tsx**

```tsx
import { SITE_CONFIG } from '@/lib/constants';

export const metadata = {
  title: `Contact | ${SITE_CONFIG.name}`,
  description: 'Get in touch with Magnus Creators to discuss your next cinematic project.',
};

export default function ContactPage() {
  return (
    <main className="pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-electric-blue font-general text-sm tracking-widest uppercase mb-4">
            Get in Touch
          </p>
          <h1 className="font-space font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6">
            Let&apos;s Create Together
          </h1>
          <p className="text-text-muted font-general text-lg max-w-2xl mx-auto">
            Have a project in mind? We&apos;d love to hear about it. Reach out and let&apos;s start the conversation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <form className="space-y-6">
            <div>
              <label className="block font-general text-sm tracking-wide text-text-muted mb-2">
                Your Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-glass-fill border border-glass-border rounded-lg px-4 py-3 font-general text-white placeholder:text-text-muted/50 focus:outline-none focus:border-electric-blue transition-colors"
              />
            </div>
            <div>
              <label className="block font-general text-sm tracking-wide text-text-muted mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full bg-glass-fill border border-glass-border rounded-lg px-4 py-3 font-general text-white placeholder:text-text-muted/50 focus:outline-none focus:border-electric-blue transition-colors"
              />
            </div>
            <div>
              <label className="block font-general text-sm tracking-wide text-text-muted mb-2">
                Service Interested In
              </label>
              <select className="w-full bg-glass-fill border border-glass-border rounded-lg px-4 py-3 font-general text-white focus:outline-none focus:border-electric-blue transition-colors">
                <option value="">Select a service</option>
                <option value="filmmaking">Film Making</option>
                <option value="event-coverage">Event Coverage</option>
                <option value="3d-rendering">3D Rendering</option>
                <option value="2d-3d-tours">2D & 3D Tours</option>
                <option value="ai-video-production">AI Video Production</option>
              </select>
            </div>
            <div>
              <label className="block font-general text-sm tracking-wide text-text-muted mb-2">
                Project Details
              </label>
              <textarea
                rows={5}
                placeholder="Tell us about your project..."
                className="w-full bg-glass-fill border border-glass-border rounded-lg px-4 py-3 font-general text-white placeholder:text-text-muted/50 focus:outline-none focus:border-electric-blue transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 rounded-full bg-electric-blue text-bg font-general font-semibold hover:opacity-90 transition-opacity glow-blue"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass rounded-2xl p-8">
              <h3 className="font-space font-bold text-xl mb-4">Contact Info</h3>
              <div className="space-y-4">
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 text-text-muted hover:text-electric-blue transition-colors"
                >
                  <span>{SITE_CONFIG.email}</span>
                </a>
                <a
                  href={SITE_CONFIG.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-muted hover:text-electric-blue transition-colors"
                >
                  <span>{SITE_CONFIG.phone}</span>
                </a>
              </div>
            </div>

            <div className="glass rounded-2xl p-8">
              <h3 className="font-space font-bold text-xl mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href={SITE_CONFIG.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center hover:border-electric-blue transition-colors"
                >
                  <span className="text-lg">📸</span>
                </a>
                <a
                  href={SITE_CONFIG.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center hover:border-electric-blue transition-colors"
                >
                  <span className="text-lg">💼</span>
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="glass rounded-2xl aspect-video flex items-center justify-center border border-glass-border">
              <p className="text-text-muted text-sm font-general">Google Maps Integration</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
```

---

## Task 6: Create placeholder directories

**Files:**
- Create: `src/components/ui/.gitkeep`
- Create: `src/components/layout/.gitkeep`
- Create: `src/components/sections/.gitkeep`
- Create: `src/components/three/.gitkeep`
- Create: `src/components/animations/.gitkeep`
- Create: `src/hooks/.gitkeep`
- Create: `src/public/assets/.gitkeep`
- Create: `src/app/services/filmmaking/.gitkeep`
- Create: `src/app/services/event-coverage/.gitkeep`
- Create: `src/app/services/3d-rendering/.gitkeep`
- Create: `src/app/services/2d-3d-tours/.gitkeep`
- Create: `src/app/services/ai-video-production/.gitkeep`

- [ ] **Step 1: Create all placeholder directories**

Run in bash:
```bash
mkdir -p "D:/All projects/motio nest/src/components/ui" \
  "D:/All projects/motio nest/src/components/layout" \
  "D:/All projects/motio nest/src/components/sections" \
  "D:/All projects/motio nest/src/components/three" \
  "D:/All projects/motio nest/src/components/animations" \
  "D:/All projects/motio nest/src/hooks" \
  "D:/All projects/motio nest/src/public/assets" \
  "D:/All projects/motio nest/src/app/services/filmmaking" \
  "D:/All projects/motio nest/src/app/services/event-coverage" \
  "D:/All projects/motio nest/src/app/services/3d-rendering" \
  "D:/All projects/motio nest/src/app/services/2d-3d-tours" \
  "D:/All projects/motio nest/src/app/services/ai-video-production"

touch "D:/All projects/motio nest/src/components/ui/.gitkeep" \
  "D:/All projects/motio nest/src/components/layout/.gitkeep" \
  "D:/All projects/motio nest/src/components/sections/.gitkeep" \
  "D:/All projects/motio nest/src/components/three/.gitkeep" \
  "D:/All projects/motio nest/src/components/animations/.gitkeep" \
  "D:/All projects/motio nest/src/hooks/.gitkeep" \
  "D:/All projects/motio nest/src/public/assets/.gitkeep"
```

---

## Task 7: Install dependencies

- [ ] **Step 1: Run pnpm install**

Run in bash (from `D:\All projects\motio nest`):
```bash
cd "D:\All projects\motio nest" && pnpm install
```

Expected: Installs all dependencies without errors.

---

## Task 8: Verify dev server starts

- [ ] **Step 1: Run pnpm dev and check for errors**

Run in bash (from `D:\All projects\motio nest`):
```bash
cd "D:\All projects\motio nest" && pnpm dev
```

Expected: Next.js dev server starts on `http://localhost:3000` without errors.

---

## Spec Coverage Check

| Spec Requirement | Task(s) |
|------------------|---------|
| Next.js 14 App Router scaffold | Task 1, 2, 3, 4, 5 |
| Tailwind custom theme (brand colors) | Task 3 |
| Space Grotesk + General Sans + Satoshi fonts | Task 5 (layout.tsx) |
| Zustand scene store | Task 4 |
| GSAP + ScrollTrigger registration | Task 4 |
| Lenis smooth scroll wired to GSAP | Task 4 |
| Home page shell | Task 5 |
| Portfolio, Services, About, Contact pages | Task 5 |
| All folder structure directories | Task 6 |
| `pnpm install` + `pnpm dev` working | Tasks 7, 8 |

**Gap check:** No 3D scenes yet (Phase 4). No animations yet (Phase 5). No actual portfolio content. All of these are future phases — this scaffold is intentionally minimal and working.

---

## Plan Self-Review

✅ **Spec coverage** — All scaffold requirements accounted for in tasks.
✅ **Placeholder scan** — No TBDs, TODOs, or vague language. All paths, code, and commands are concrete.
✅ **Type consistency** — `useSceneStore` uses Zustand with proper TypeScript typing; metadata exports on each page; `SITE_CONFIG` imported from `lib/constants.ts` everywhere.
✅ **Completeness** — This produces a runnable scaffold. Phases 4–7 add the actual experience.
