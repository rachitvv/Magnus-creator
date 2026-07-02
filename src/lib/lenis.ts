import Lenis from 'lenis';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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