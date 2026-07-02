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
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    const initialMap: Record<string, gsap.TweenVars> = {
      fadeUp: { opacity: 0, y: 60 },
      fadeIn: { opacity: 0 },
      slideLeft: { opacity: 0, x: -60 },
      slideRight: { opacity: 0, x: 60 },
      scaleIn: { opacity: 0, scale: 0.92 },
    };

    const animationMap: Record<string, gsap.TweenVars> = {
      fadeUp: { opacity: 1, y: 0 },
      fadeIn: { opacity: 1 },
      slideLeft: { opacity: 1, x: 0 },
      slideRight: { opacity: 1, x: 0 },
      scaleIn: { opacity: 1, scale: 1 },
    };

    gsap.set(el, initialMap[animation]);

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(el, {
          ...animationMap[animation],
          duration: 0.9,
          delay,
          ease: 'power3.out',
        });

        const childEls = Array.from(el.children);
        if (childEls.length > 0) {
          gsap.from(childEls, {
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
  }, [animation, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
