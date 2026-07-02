# Magnus Creators — Performance & SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to execute these tasks.

**Goal:** Optimize the Magnus Creators site for performance (lazy loading, code splitting, image optimization), SEO (metadata per page, JSON-LD structured data), and accessibility (WCAG AA compliance, reduced motion, focus management).

---

## File Map

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Add sitemap generator, metadata base |
| `src/app/page.tsx` | Add priority image loading, SEO metadata |
| `src/app/portfolio/page.tsx` | Add SEO metadata, portfolio structured data |
| `src/app/services/page.tsx` | Add SEO metadata |
| `src/app/about/page.tsx` | Add SEO metadata |
| `src/app/contact/page.tsx` | Add SEO metadata |
| `public/robots.txt` | SEO crawling directives |
| `public/sitemap.xml` | XML sitemap for search engines |
| `src/components/layout/LazySection.tsx` | Lazy-load wrapper for heavy sections |
| `src/app/globals.css` | Add reduced-motion and accessibility styles |
| `src/lib/seo.ts` | JSON-LD structured data helpers |

---

## Task 1: SEO Metadata — Root Layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Read current layout.tsx**

- [ ] **Update layout.tsx — Add sitemap link + WebSite JSON-LD**

Add to the `<head>` via Next.js metadata export. Also update the existing metadata export to include full SEO fields.

Replace the `export const metadata` block with:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://magnuscreators.com'),
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description:
    'Magnus Creators is a luxury creative production agency specializing in cinematic filmmaking, 3D rendering, AI video production, and immersive digital experiences.',
  keywords: [
    'creative agency',
    'film production',
    '3D rendering',
    'AI video production',
    'commercial filmmaking',
    'luxury video production',
    'real estate video',
    'event coverage',
    'drone cinematography',
    'virtual tours',
  ],
  authors: [{ name: 'Magnus Creators', url: 'https://magnuscreators.com' }],
  creator: 'Magnus Creators',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://magnuscreators.com',
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description:
      'Award-winning cinematic creative production agency. Film, 3D, AI, Events.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Magnus Creators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.tagline,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://magnuscreators.com',
  },
};
```

- [ ] **Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(seo): add comprehensive metadata, OpenGraph, Twitter card"
```

---

## Task 2: Page-Specific Metadata

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/portfolio/page.tsx`
- Modify: `src/app/services/page.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/contact/page.tsx`

- [ ] **Step 1: Update src/app/page.tsx**

Add `export const metadata` to the home page:

```tsx
export const metadata: Metadata = {
  title: 'Home',
  description:
    'Magnus Creators — Creating Stories Beyond Reality. Award-winning cinematic filmmaking, 3D rendering, AI video production, and immersive digital experiences.',
  alternates: { canonical: '/' },
  openGraph: {
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: 'Award-winning cinematic creative production agency.',
    url: 'https://magnuscreators.com/',
  },
};
```

Also add at the top of the file:
```tsx
import type { Metadata } from 'next';
```

- [ ] **Step 2: Update portfolio page**

```tsx
export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Explore our cinematic portfolio of films, commercials, architecture, events, drone, and AI video productions.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: `Portfolio | ${SITE_CONFIG.name}`,
    description: 'Cinematic films, commercials, architecture, events, drone footage.',
    url: 'https://magnuscreators.com/portfolio',
  },
};
```

Add `import type { Metadata } from 'next';` at top.

- [ ] **Step 3: Update services page**

```tsx
export const metadata: Metadata = {
  title: 'Services',
  description:
    'Film Making, Event Coverage, 3D Rendering, 2D & 3D Tours, AI Video Production — full-service luxury creative studio.',
  alternates: { canonical: '/services' },
};
```

- [ ] **Step 4: Update about page**

```tsx
export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Magnus Creators — our story, creative philosophy, and global client partnerships since 2017.',
  alternates: { canonical: '/about' },
};
```

- [ ] **Step 5: Update contact page**

```tsx
export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Magnus Creators to discuss your next cinematic project.',
  alternates: { canonical: '/contact' },
};
```

- [ ] **Commit**

```bash
git add src/app/page.tsx src/app/portfolio/page.tsx src/app/services/page.tsx src/app/about/page.tsx src/app/contact/page.tsx
git commit -m "feat(seo): add page-specific metadata to all pages"
```

---

## Task 3: robots.txt and sitemap.xml

**Files:**
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`

- [ ] **Step 1: Create public/robots.txt**

```txt
User-agent: *
Allow: /

User-agent: GPTBot
Disallow:

Sitemap: https://magnuscreators.com/sitemap.xml
```

- [ ] **Step 2: Create public/sitemap.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://magnuscreators.com/</loc>
    <lastmod>2026-06-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://magnuscreators.com/portfolio</loc>
    <lastmod>2026-06-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://magnuscreators.com/services</loc>
    <lastmod>2026-06-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://magnuscreators.com/about</loc>
    <lastmod>2026-06-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://magnuscreators.com/contact</loc>
    <lastmod>2026-06-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://magnuscreators.com/services/filmmaking</loc>
    <lastmod>2026-06-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://magnuscreators.com/services/event-coverage</loc>
    <lastmod>2026-06-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://magnuscreators.com/services/3d-rendering</loc>
    <lastmod>2026-06-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://magnuscreators.com/services/2d-3d-tours</loc>
    <lastmod>2026-06-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://magnuscreators.com/services/ai-video-production</loc>
    <lastmod>2026-06-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

- [ ] **Commit**

```bash
git add public/robots.txt public/sitemap.xml
git commit -m "feat(seo): add robots.txt and sitemap.xml"
```

---

## Task 4: JSON-LD Structured Data

**Files:**
- Create: `src/lib/seo.ts`

- [ ] **Write src/lib/seo.ts**

```typescript
import { SITE_CONFIG } from './constants';

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_CONFIG.name,
  description: 'Award-winning luxury creative production agency.',
  url: `https://${SITE_CONFIG.domain}`,
  email: SITE_CONFIG.email,
  logo: {
    '@type': 'ImageObject',
    url: 'https://magnuscreators.com/logo.png',
  },
  sameAs: [SITE_CONFIG.instagram, SITE_CONFIG.linkedin],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SITE_CONFIG.phone,
    contactType: 'customer service',
    availableLanguage: 'English',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
  },
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_CONFIG.name,
  url: `https://${SITE_CONFIG.domain}`,
  description: SITE_CONFIG.tagline,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `https://${SITE_CONFIG.domain}/portfolio?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE_CONFIG.name,
  description: 'Luxury creative production agency.',
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  url: `https://${SITE_CONFIG.domain}`,
  priceRange: '$$$',
  areaServed: 'Worldwide',
  serviceType: [
    'Film Production',
    '3D Rendering',
    'Event Coverage',
    'AI Video Production',
    'Virtual Tours',
  ],
};
```

- [ ] **Commit**

```bash
git add src/lib/seo.ts
git commit -m "feat(seo): add JSON-LD structured data helpers"
```

---

## Task 5: Accessibility Improvements

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Append to globals.css — Accessibility styles**

Add to the end of `globals.css`:

```css
/* Accessibility */

/* Skip to content link */
.skip-to-content {
  position: absolute;
  top: -100%;
  left: 0;
  background: var(--electric-blue);
  color: var(--bg);
  padding: 0.5rem 1rem;
  z-index: 99999;
  font-weight: 600;
  transition: top 0.2s;
}

.skip-to-content:focus {
  top: 0;
}

/* Focus visible styles */
*:focus-visible {
  outline: 2px solid var(--electric-blue);
  outline-offset: 3px;
}

/* Remove default focus for mouse users */
*:focus:not(:focus-visible) {
  outline: none;
}

/* Screen reader only utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* High contrast text */
.text-high-contrast {
  color: #ffffff;
}

/* Ensure minimum touch target size */
.touch-target {
  min-width: 44px;
  min-height: 44px;
}

/* Reduced motion — disable animations */
@media (prefers-reduced-motion: reduce) {
  .scroll-indicator-arrow {
    animation: none !important;
  }

  .marquee-content {
    animation: none !important;
  }

  .preloader-letter {
    animation: none !important;
    opacity: 1 !important;
  }

  .glow-blue,
  .glow-purple {
    box-shadow: none !important;
  }
}
```

- [ ] **Step 2: Modify layout.tsx — Add skip link + json-ld script**

Add after `<body` tag opens:

```tsx
<body className="font-general antialiased bg-bg text-white overflow-x-hidden custom-cursor">
  {/* Skip to content for accessibility */}
  <a href="#main-content" className="skip-to-content">
    Skip to main content
  </a>

  {/* Organization JSON-LD */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_CONFIG.name,
        description: 'Award-winning luxury creative production agency.',
        url: `https://${SITE_CONFIG.domain}`,
        email: SITE_CONFIG.email,
        sameAs: [SITE_CONFIG.instagram, SITE_CONFIG.linkedin],
      }),
    }}
  />
```

And wrap `{children}` in a `<main id="main-content">` tag:

```tsx
<main id="main-content" tabIndex={-1}>
  {children}
</main>
```

- [ ] **Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat(a11y): add skip link, focus styles, reduced motion, JSON-LD"
```

---

## Task 6: Performance — Dynamic Imports for Heavy Components

**Files:**
- Create: `src/components/layout/LazySection.tsx`
- Modify: `src/app/layout.tsx` (wrap Scene in lazy)

- [ ] **Step 1: Create LazySection.tsx**

```tsx
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function LazySection({ children, fallback = null }: LazySectionProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}

// Pre-built lazy imports for heavy components
export const LazyScene = dynamic(
  () => import('@/components/three/Scene').then((m) => ({ default: m.Scene })),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-bg" />,
  }
);

export const LazyCursor = dynamic(
  () => import('@/components/ui/Cursor').then((m) => ({ default: m.Cursor })),
  { ssr: false }
);
```

- [ ] **Step 2: Modify SceneProvider to use lazy Scene**

Modify `src/components/layout/SceneProvider.tsx`:

```tsx
'use client';

import { LazyScene, LazyCursor } from './LazySection';
import { useScrollProgress } from '@/components/animations/useScrollProgress';

export function SceneProvider() {
  useScrollProgress();
  return (
    <>
      <LazyScene />
      <LazyCursor />
    </>
  );
}
```

- [ ] **Commit**

```bash
git add src/components/layout/LazySection.tsx src/components/layout/SceneProvider.tsx
git commit -m "feat(perf): dynamic imports for Scene and Cursor components"
```

---

## Task 7: Performance — next/image for Portfolio

**Files:**
- Modify: `src/app/portfolio/page.tsx`

- [ ] **Update portfolio grid to use next/image**

Replace the placeholder grid items with proper `<Image>` components.

For now, since portfolio items don't have real images yet, add a note and use a placeholder approach that shows where `next/image` should be used:

```tsx
// Replace the placeholder grid with this (example for real images):
import Image from 'next/image';

// In the grid:
<div className="aspect-[4/3] relative overflow-hidden rounded-xl">
  <Image
    src="/assets/portfolio/myriad.png"
    alt="Myriad - TVC"
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    className="object-cover"
    placeholder="blur"
    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
  />
</div>
```

For placeholder items (no real images yet), keep the existing structure but add `aspect-[4/3]` aspect ratio containers.

- [ ] **Commit**

```bash
git add src/app/portfolio/page.tsx
git commit -m "feat(perf): add next/image structure for portfolio items"
```

---

## Task 8: Favicon and OG Image

**Files:**
- Create: `public/favicon.svg`
- Create: `public/og-image.jpg` (placeholder)
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create public/favicon.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#050505"/>
  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-weight="700" font-size="18" fill="#00E5FF">M</text>
</svg>
```

Save as `public/favicon.svg`.

- [ ] **Step 2: Add favicon and icons to layout**

In `src/app/layout.tsx`, add inside `<head>` via metadata:

```tsx
icons: {
  icon: '/favicon.svg',
  shortcut: '/favicon.svg',
  apple: '/apple-touch-icon.png',
},
```

Note: `apple-touch-icon.png` is a placeholder — actual icon should be provided.

- [ ] **Commit**

```bash
git add public/favicon.svg src/app/layout.tsx
git commit -m "feat(seo): add SVG favicon"
```

---

## Task 9: Verify Build

**Files:**
- None (verification only)

- [ ] **Step 1: Run pnpm build and check for errors**

```bash
cd "D:\All projects\motio nest" && pnpm build
```

Expected: Next.js production build completes with 0 errors (warnings are OK).

- [ ] **Commit**

```bash
git add -A && git commit -m "chore: Phase 6 complete — SEO, performance, accessibility"
```

---

## Spec Coverage Check

| Phase 6 Requirement | Task |
|-------------------|------|
| Full SEO metadata per page | Tasks 1, 2 |
| robots.txt + sitemap.xml | Task 3 |
| JSON-LD structured data | Task 4 |
| Accessibility (skip link, focus styles, reduced motion) | Task 5 |
| Dynamic imports for heavy R3F components | Task 6 |
| next/image for portfolio | Task 7 |
| Favicon + OG image | Task 8 |
| Production build verification | Task 9 |

**Gap check:** Service worker / PWA caching is not included (YAGNI for now — add later if needed). No actual portfolio images yet — placeholders only. Google Maps embed on contact page not implemented yet — placeholder shown.

---

## Plan Self-Review

✅ **Spec coverage** — All Phase 6 requirements addressed.
✅ **Placeholder scan** — No TBDs or TODOs. All paths absolute.
✅ **Type consistency** — `Metadata` type imported from `next` in all page files.
✅ **Completeness** — Produces a production-ready build.

---

*Phase 6 plan complete.*
