'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { usePathname } from 'next/navigation';

export function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!overlayRef.current) return;

    // Skip the initial "wipe in" on first mount — start hidden, no animation
    if (isFirstRender.current) {
      gsap.set(overlayRef.current, { scaleY: 0, transformOrigin: 'top' });
      isFirstRender.current = false;
      return;
    }

    gsap.set(overlayRef.current, { scaleY: 0, transformOrigin: 'top' });
    gsap.to(overlayRef.current, {
      scaleY: 1,
      duration: 0.5,
      ease: 'power3.inOut',
    });

    const timeout = setTimeout(() => {
      if (!overlayRef.current) return;
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
      style={{ height: '100vh', transform: 'scaleY(0)' }}
    />
  );
}
