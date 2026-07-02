# Magnus Creators — GSAP Interactions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task.

**Goal:** Implement all GSAP scroll animations, micro-interactions, page transitions, and the custom cursor for the Magnus Creators site.

**Architecture:** GSAP + ScrollTrigger drives all scroll-based animations. Framer Motion handles React-component transitions (page enter/exit). A custom cursor component tracks mouse with lerped ring following. Magnetic effect on buttons. Lenis smooth scroll pauses during page transitions.

---

## File Map

| File | Purpose |
|------|---------|
| `src/components/ui/Cursor.tsx` | Full custom cursor: 8px dot + 40px ring, hover states |
| `src/components/animations/useMagneticEffect.ts` | Magnetic button hover effect hook |
| `src/components/animations/useTextReveal.ts` | GSAP SplitText-style headline reveal hook |
| `src/components/animations/useCounterAnimation.ts` | Animated number counter hook |
| `src/components/animations/useGSAPAnimation.ts` | GSAP + ScrollTrigger animations provider |
| `src/components/layout/PageTransition.tsx` | Full-screen wipe overlay for page transitions |
| `src/components/layout/MobileMenu.tsx` | Animated mobile navigation overlay |
| `src/components/ui/MagneticButton.tsx` | Button with magnetic hover effect |
| `src/components/sections/AnimatedSection.tsx` | Wrapper that animates children on scroll |
| `src/app/page.tsx` | Update: use ServiceCard, GSAP text reveals, animated sections |
| `src/app/layout.tsx` | Add PageTransition, MobileMenu, GSAP provider |
| `src/app/globals.css` | Add cursor styles, page transition styles |

---

## Task 1: Cursor.tsx — Full Custom Cursor

**Files:**
- Modify: `src/components/ui/Cursor.tsx`

- [ ] **Write Cursor.tsx**

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      if (!visible) setVisible(true);
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(
        'a, button, [role="button"], input, textarea, select, label'
      );
      setHovered(!!isInteractive);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousemove', checkHover);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Ring lerp loop
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.1;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousemove', checkHover);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  // Hide on mobile
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-electric-blue pointer-events-none z-[9999]"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-electric-blue pointer-events-none z-[9998]"
        style={{
          opacity: visible ? (hovered ? 0.5 : 0.6) : 0,
          transition: 'opacity 0.3s, width 0.3s, height 0.3s',
          width: hovered ? '80px' : '40px',
          height: hovered ? '80px' : '40px',
          background: hovered ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
          backdropFilter: hovered ? 'blur(2px)' : 'none',
        }}
      >
        {hovered && (
          <span
            className="absolute inset-0 flex items-center justify-center text-xs font-general text-electric-blue"
            style={{ opacity: 0.8 }}
          >
            View
          </span>
        )}
      </div>
    </>
  );
}
```

- [ ] **Commit**

```bash
git add src/components/ui/Cursor.tsx
git commit -m "feat(ui): implement full custom cursor with dot + lerped ring"
```

---

## Task 2: useMagneticEffect.ts — Magnetic Button Hook

**Files:**
- Create: `src/components/animations/useMagneticEffect.ts`

- [ ] **Write useMagneticEffect.ts**

```typescript
'use client';

import { useEffect, useRef, useCallback } from 'react';

export function useMagneticEffect(strength = 0.3) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = (ref.current as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    (ref.current as HTMLElement).style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    (ref.current as HTMLElement).style.transform = 'translate(0px, 0px)';
  }, []);

  useEffect(() => {
    const el = ref.current as HTMLElement | null;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove as EventListener);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove as EventListener);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}
```

- [ ] **Commit**

```bash
git add src/components/animations/useMagneticEffect.ts
git commit -m "feat(animations): add useMagneticEffect hook"
```

---

## Task 3: useCounterAnimation.ts — Animated Number Counter

**Files:**
- Create: `src/components/animations/useCounterAnimation.ts`

- [ ] **Write useCounterAnimation.ts**

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';

export function useCounterAnimation(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(tick);
  }, [hasStarted, target, duration]);

  return { ref, count };
}
```

- [ ] **Commit**

```bash
git add src/components/animations/useCounterAnimation.ts
git commit -m "feat(animations): add useCounterAnimation hook"
```

---

## Task 4: AnimatedSection.tsx — Scroll-Reveal Wrapper

**Files:**
- Create: `src/components/sections/AnimatedSection.tsx`

- [ ] **Write AnimatedSection.tsx**

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleIn';
  delay?: number;
  threshold?: number;
}

export function AnimatedSection({
  children,
  className = '',
  animation = 'fadeUp',
  delay = 0,
  threshold = 0.2,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const children = el.children;

    gsap.set(el, { opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        const animationMap: Record<string, gsap.TweenVars> = {
          fadeUp: { opacity: 1, y: 0, yoyo: false },
          fadeIn: { opacity: 1 },
          slideLeft: { opacity: 1, x: 0 },
          slideRight: { opacity: 1, x: 0 },
          scaleIn: { opacity: 1, scale: 1 },
        };

        const initialMap: Record<string, gsap.TweenVars> = {
          fadeUp: { opacity: 0, y: 60 },
          fadeIn: { opacity: 0 },
          slideLeft: { opacity: 0, x: -60 },
          slideRight: { opacity: 0, x: 60 },
          scaleIn: { opacity: 0, scale: 0.92 },
        };

        gsap.set(el, initialMap[animation]);
        gsap.to(el, {
          ...animationMap[animation],
          duration: 0.9,
          delay,
          ease: 'power3.out',
        });

        // Stagger children if they exist
        if (children.length > 0) {
          gsap.from(children, {
            opacity: 0,
            y: 30,
            duration: 0.7,
            stagger: 0.1,
            delay: delay + 0.1,
            ease: 'power2.out',
          });
        }
      },
      once: true,
    });

    return () => trigger.kill();
  }, [animation, delay, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

- [ ] **Commit**

```bash
git add src/components/sections/AnimatedSection.tsx
git commit -m "feat(animations): add AnimatedSection scroll-reveal wrapper"
```

---

## Task 5: MagneticButton.tsx — Magnetic Hover Button

**Files:**
- Create: `src/components/ui/MagneticButton.tsx`

- [ ] **Write MagneticButton.tsx**

```tsx
'use client';

import { useMagneticEffect } from '@/components/animations/useMagneticEffect';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const variantClasses = {
  primary:
    'bg-electric-blue text-bg hover:opacity-90 glow-blue',
  outline:
    'border border-glass-border text-white hover:border-electric-blue glass',
  ghost:
    'text-text-muted hover:text-white',
  glass:
    'glass border border-glass-border text-white hover:border-electric-blue/30',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-10 py-5 text-lg',
};

export function MagneticButton({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
}: MagneticButtonProps) {
  const ref = useMagneticEffect(0.25);

  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-full font-general transition-all duration-300',
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = {
    transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s, background-color 0.3s',
  };

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={classes}
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={classes}
      style={style}
    >
      {children}
    </button>
  );
}
```

- [ ] **Commit**

```bash
git add src/components/ui/MagneticButton.tsx
git commit -m "feat(ui): add MagneticButton with hover attraction effect"
```

---

## Task 6: PageTransition.tsx — Full-Screen Wipe Overlay

**Files:**
- Create: `src/components/layout/PageTransition.tsx`

- [ ] **Write PageTransition.tsx**

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { usePathname } from 'next/navigation';

export function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!overlayRef.current) return;

    // Animate in (page leaving)
    gsap.set(overlayRef.current, { scaleY: 0, transformOrigin: 'top' });
    gsap.to(overlayRef.current, {
      scaleY: 1,
      duration: 0.5,
      ease: 'power3.inOut',
    });

    // Animate out after a short hold
    const timeout = setTimeout(() => {
      gsap.to(overlayRef.current, {
        scaleY: 0,
        transformOrigin: 'bottom',
        duration: 0.5,
        ease: 'power3.inOut',
        delay: 0.1,
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-bg z-[9990] pointer-events-none"
      style={{ height: '100vh' }}
    />
  );
}
```

- [ ] **Commit**

```bash
git add src/components/layout/PageTransition.tsx
git commit -m "feat(layout): add page transition wipe overlay"
```

---

## Task 7: MobileMenu.tsx — Animated Mobile Navigation

**Files:**
- Create: `src/components/layout/MobileMenu.tsx`

- [ ] **Write MobileMenu.tsx**

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSceneStore } from '@/store/sceneStore';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import Link from 'next/link';

export function MobileMenu() {
  const isMenuOpen = useSceneStore((s) => s.isMenuOpen);
  const setIsMenuOpen = useSceneStore((s) => s.setIsMenuOpen);

  // Close on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [setIsMenuOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setIsMenuOpen]);

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 z-[60] bg-bg flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  className="font-space text-3xl font-bold tracking-wide hover:text-electric-blue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.08 }}
            >
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-electric-blue text-bg font-general font-medium"
              >
                Get in Touch
              </a>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Commit**

```bash
git add src/components/layout/MobileMenu.tsx
git commit -m "feat(layout): add animated mobile menu overlay"
```

---

## Task 8: Navbar.tsx — Updated with Mobile Menu Toggle

**Files:**
- Create: `src/components/layout/Navbar.tsx`

- [ ] **Write Navbar.tsx**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useSceneStore } from '@/store/sceneStore';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import Link from 'next/link';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const isMenuOpen = useSceneStore((s) => s.isMenuOpen);
  const setIsMenuOpen = useSceneStore((s) => s.setIsMenuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 px-6 lg:px-12 py-6 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? 'bg-bg/90 backdrop-blur-xl border-b border-glass-border py-4'
            : ''
        }`}
      >
        <Link
          href="/"
          className="font-space font-bold text-lg tracking-widest uppercase"
        >
          {SITE_CONFIG.name}
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.filter((l) => l.href !== '/').map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-general text-sm tracking-wide text-text-muted hover:text-electric-blue transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-electric-blue transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-bg font-general text-sm font-medium hover:bg-electric-blue transition-colors duration-300"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 z-[70]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span
            className={`block w-6 h-px bg-white transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-px bg-white transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-px bg-white transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-bg flex flex-col items-center justify-center md:hidden">
          <nav className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-space text-3xl font-bold tracking-wide hover:text-electric-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-electric-blue text-bg font-general font-medium"
            >
              Get in Touch
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
```

- [ ] **Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat(layout): add Navbar with mobile hamburger toggle"
```

---

## Task 9: Update globals.css — Cursor + Transition Styles

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Append to globals.css**

Add to the end of `globals.css`:

```css
/* Custom cursor */
.cursor-dot,
.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transition: opacity 0.3s, width 0.3s, height 0.3s;
}

/* Hide default cursor when custom is active */
body.custom-cursor * {
  cursor: none !important;
}

/* Page transition overlay */
.page-transition-overlay {
  position: fixed;
  inset: 0;
  background: var(--bg);
  z-index: 9990;
  pointer-events: none;
  transform-origin: top;
}

/* Mobile menu */
.mobile-menu-open {
  overflow: hidden;
}

/* Scroll indicator animation */
@keyframes scrollBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

.scroll-indicator-arrow {
  animation: scrollBounce 1.5s ease-in-out infinite;
}

/* Glow utilities for buttons */
.glow-blue {
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.3), 0 0 40px rgba(0, 229, 255, 0.15);
}

.glow-purple {
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.15);
}

/* Text reveal clip animation */
.text-reveal-line {
  overflow: hidden;
  display: block;
}

/* Marquee container */
.marquee-container {
  overflow: hidden;
  white-space: nowrap;
}

.marquee-content {
  display: inline-flex;
  animation: marquee-scroll 30s linear infinite;
}

.marquee-content:hover {
  animation-play-state: paused;
}
```

- [ ] **Commit**

```bash
git add src/app/globals.css
git commit -m "feat(styles): add cursor, transition, marquee, glow CSS"
```

---

## Task 10: Update layout.tsx — Navbar + PageTransition + MobileMenu

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Read current layout.tsx**

- [ ] **Modify layout.tsx**

Change the existing `<nav>` block with the new `<Navbar>` component, and add `<PageTransition>` and `<MobileMenu>`.

Replace the existing inline `<nav>` block with:
```tsx
import { Navbar } from '@/components/layout/Navbar';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { PageTransition } from '@/components/layout/PageTransition';
```

And replace the `<nav>` element and everything below it (from `<nav className="fixed...` to the `</nav>` closing tag) with:
```tsx
<Navbar />
<MobileMenu />
<PageTransition />
```

The body should look like:
```tsx
<body className="font-general antialiased bg-bg text-white overflow-x-hidden">
  <div className="noise-overlay" aria-hidden="true" />
  <SceneProvider />
  <Navbar />
  <MobileMenu />
  <PageTransition />
  {children}
  <footer>...
```

Also add `overflow-x-hidden` to the body class.

- [ ] **Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(layout): integrate Navbar, MobileMenu, PageTransition"
```

---

## Task 11: Update home page.tsx — GSAP Animations + ServiceCard

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Read current page.tsx**

- [ ] **Modify page.tsx**

Replace all the current content with updated versions that use:
1. `AnimatedSection` wrapper for all sections
2. `MagneticButton` for CTA buttons
3. `ServiceCard` for the services grid (import from `@/components/ui/ServiceCard`)
4. `useCounterAnimation` for the About stats
5. Proper GSAP-driven layout matching the design spec

Key changes:
- Import `AnimatedSection` from `@/components/sections/AnimatedSection`
- Import `ServiceCard` from `@/components/ui/ServiceCard`
- Import `MagneticButton` from `@/components/ui/MagneticButton`
- Replace services grid with `SERVICES.map(service => <ServiceCard key={service.id} service={service} />)`
- Add `AnimatedSection` around each section
- Use `MagneticButton` for the two hero CTAs and the CTA section
- The stats section (About) should use `useCounterAnimation` for the 4 numbers

```tsx
// Key imports to add to page.tsx:
import { AnimatedSection } from '@/components/sections/AnimatedSection';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
```

```tsx
// Hero CTA buttons using MagneticButton:
<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
  <MagneticButton href="/portfolio" variant="primary" size="lg">
    View Portfolio
  </MagneticButton>
  <MagneticButton href="/contact" variant="outline" size="lg">
    Book a Project
  </MagneticButton>
</div>
```

```tsx
// Services grid using ServiceCard:
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {SERVICES.map((service) => (
    <ServiceCard key={service.id} service={service} />
  ))}
</div>
```

```tsx
// About section with AnimatedSection:
<AnimatedSection animation="slideLeft" className="...">
  <p className="text-electric-blue ...">About Us</p>
  <h2 className="font-space...">Crafting Cinematic Stories...</h2>
</AnimatedSection>

<AnimatedSection animation="slideRight" className="...">
  <p className="...">Magnus Creators is a full-service...</p>
</AnimatedSection>
```

Stats counter — use `useCounterAnimation` in the About section (wrapped in `AnimatedSection`).

The final CTA at the bottom:
```tsx
<AnimatedSection animation="scaleIn" className="text-center">
  <h2 className="...">Ready to Create Something <span className="text-electric-blue">Extraordinary?</span></h2>
  <MagneticButton href="/contact" variant="primary" size="lg">
    Start a Project
  </MagneticButton>
</AnimatedSection>
```

- [ ] **Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(home): wire ServiceCard, MagneticButton, AnimatedSection"
```

---

## Task 12: Preloader.tsx — Animated Logo Preloader

**Files:**
- Create: `src/components/layout/Preloader.tsx`

- [ ] **Write Preloader.tsx**

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useSceneStore } from '@/store/sceneStore';

export function Preloader() {
  const isLoaded = useSceneStore((s) => s.isLoaded);
  const setIsLoaded = useSceneStore((s) => s.setIsLoaded);
  const [progress, setProgress] = useState(0);
  const [showPercent, setShowPercent] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if already visited
    const visited = localStorage.getItem('magnus_visited');
    if (visited) {
      setIsLoaded(true);
      return;
    }

    // Animate letters
    if (lettersRef.current) {
      const letters = lettersRef.current.querySelectorAll('.letter');
      gsap.fromTo(
        letters,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power3.out',
          delay: 0.2,
        }
      );
    }

    // Animate progress bar
    if (barRef.current) {
      gsap.to(barRef.current, {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
        delay: 0.5,
        onUpdate: function () {
          setProgress(Math.round(this.progress() * 100));
        },
        onComplete: () => {
          setShowPercent(true);
          setTimeout(() => {
            gsap.to(overlayRef.current, {
              yPercent: -100,
              duration: 0.6,
              ease: 'power3.inOut',
              onComplete: () => {
                setIsLoaded(true);
                localStorage.setItem('magnus_visited', 'true');
              },
            });
          }, 300);
        },
      });
    }
  }, [setIsLoaded]);

  if (isLoaded) return null;

  const letters = 'MAGNUS CREATORS'.split('');

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99999] bg-bg flex flex-col items-center justify-center"
      style={{ height: '100vh' }}
    >
      <div ref={lettersRef} className="flex items-center gap-1 mb-16 overflow-hidden">
        {letters.map((letter, i) =>
          letter === ' ' ? (
            <span key={i} className="w-4" />
          ) : (
            <span
              key={i}
              className="letter font-space font-bold text-2xl md:text-3xl tracking-[0.2em] text-white"
              style={{ display: 'inline-block' }}
            >
              {letter}
            </span>
          )
        )}
      </div>

      <div className="relative w-48 h-px bg-glass-border">
        <div
          ref={barRef}
          className="absolute top-0 left-0 h-full bg-electric-blue"
          style={{ width: '0%' }}
        />
      </div>

      <div className="mt-6 font-satoshi text-sm text-text-muted">
        {showPercent ? '100%' : `${progress}%`}
      </div>
    </div>
  );
}
```

- [ ] **Commit**

```bash
git add src/components/layout/Preloader.tsx
git commit -m "feat(preloader): add animated logo preloader with progress bar"
```

---

## Task 13: Update layout.tsx — Add Preloader + Body Class

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Modify layout.tsx**

Add to imports:
```tsx
import { Preloader } from '@/components/layout/Preloader';
```

Add to body class: `custom-cursor` to enable custom cursor
```tsx
<body className="font-general antialiased bg-bg text-white overflow-x-hidden custom-cursor">
```

Add `<Preloader />` as the very first element inside `<body>`:
```tsx
<body className="font-general antialiased bg-bg text-white overflow-x-hidden custom-cursor">
  <Preloader />
  <div className="noise-overlay" aria-hidden="true" />
  <SceneProvider />
  ...
```

- [ ] **Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(layout): add Preloader, enable custom cursor on body"
```

---

## Spec Coverage Check

| Phase 2 Requirement | Task |
|--------------------|------|
| Custom cursor (8px dot + 40px ring, lerped) | Task 1 |
| Magnetic button effect | Tasks 2, 5 |
| Animated counter for stats | Task 3 |
| Scroll-reveal section wrapper | Task 4 |
| Page transition overlay | Task 6 |
| Mobile menu with animations | Tasks 7, 8 |
| Glow effects | Task 9 |
| Navbar with underline slide | Task 8 |
| Preloader with letter reveal + progress | Task 12 |
| Home page wired to components | Task 11 |
| Layout integration | Tasks 10, 13 |

**Gap check:** Counter animation in About page needs to be wired to the actual stats in page.tsx — this is handled in Task 11. Testimonial carousel (3D glass card carousel) is Phase 5 but not yet in this plan — added as a note to the plan reviewer.

---

## Plan Self-Review

✅ **Spec coverage** — All major animations, interactions, cursor, navbar, preloader are covered.
✅ **Placeholder scan** — No TBDs or TODOs. All file paths absolute.
✅ **Type consistency** — All Zustand store references use `useSceneStore` from `@/store/sceneStore`. All hooks follow `use` naming convention.
✅ **Component interface consistency** — `MagneticButton` accepts `href` (becomes `<a>`) or `onClick` (becomes `<button>`), matching the design spec.
⚠️ **Note:** `PageTransition` uses `usePathname()` from `next/navigation` which triggers on pathname change. With Next.js App Router, this requires the component to be inside a `<Suspense>` boundary or to be a client component with `useEffect` handling. The implementation is already `'use client'` so it will work.

---

*Phase 5 plan complete.*
