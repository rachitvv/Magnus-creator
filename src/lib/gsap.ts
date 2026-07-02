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