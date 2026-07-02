'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useSceneStore } from '@/store/sceneStore';

export function Preloader() {
  const isLoaded = useSceneStore((s) => s.isLoaded);
  const setIsLoaded = useSceneStore((s) => s.setIsLoaded);
  const [barWidth, setBarWidth] = useState(0);
  const [showPercent, setShowPercent] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [lettersDone, setLettersDone] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem('magnus_visited');
    if (visited) {
      setIsLoaded(true);
      return;
    }

    // Animate letters first
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
          onComplete: () => setLettersDone(true),
        }
      );
    }

    // Start bar after 0.5s
    const barTimer = setTimeout(() => {
      // Animate bar width from 0 → 100
      const start = performance.now();
      const duration = 1500;

      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease in-out quad
        const eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        setBarWidth(Math.round(eased * 100));

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          setBarWidth(100);
          setShowPercent(true);
          // Slide up overlay
          setTimeout(() => {
            if (overlayRef.current) {
              gsap.to(overlayRef.current, {
                yPercent: -100,
                duration: 0.6,
                ease: 'power3.inOut',
                onComplete: () => {
                  setIsLoaded(true);
                  localStorage.setItem('magnus_visited', 'true');
                },
              });
            }
          }, 300);
        }
      };

      requestAnimationFrame(tick);
    }, 500);

    return () => clearTimeout(barTimer);
  }, [setIsLoaded]);

  if (isLoaded) return null;

  const letters = 'MAGNUS CREATORS'.split('');

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99999] bg-bg flex flex-col items-center justify-center"
      style={{ height: '100dvh' }}
    >
      <div
        ref={lettersRef}
        className="flex items-center gap-1 mb-16 overflow-hidden"
      >
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
          className="absolute top-0 left-0 h-full bg-electric-blue transition-all"
          style={{
            width: `${barWidth}%`,
            transitionDuration: '0ms',
          }}
        />
      </div>

      <div className="mt-6 font-satoshi text-sm text-text-muted">
        {showPercent ? '100%' : `${barWidth}%`}
      </div>
    </div>
  );
}