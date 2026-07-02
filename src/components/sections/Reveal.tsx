'use client';

import { CSSProperties, useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleIn';
}

/**
 * Lightweight scroll-reveal using IntersectionObserver + CSS transitions.
 * No GSAP, no ScrollTrigger — just one observer per element.
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  animation = 'fadeUp',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const initialTransform: Record<string, string> = {
    fadeUp: 'translateY(40px)',
    fadeIn: 'translateY(0)',
    slideLeft: 'translateX(-40px)',
    slideRight: 'translateX(40px)',
    scaleIn: 'scale(0.94)',
  };

  const style: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible
      ? 'translate(0, 0) scale(1)'
      : initialTransform[animation],
    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    willChange: 'opacity, transform',
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}