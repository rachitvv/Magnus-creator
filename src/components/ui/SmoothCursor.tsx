'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface SmoothCursorProps {
  cursor?: React.ReactNode;
  springConfig?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
    restDelta?: number;
  };
}

const DEFAULT_SPRING = {
  damping: 30,
  stiffness: 250,
  mass: 0.8,
  restDelta: 0.001,
};

export function SmoothCursor({
  cursor,
  springConfig = DEFAULT_SPRING,
}: SmoothCursorProps) {
  const [isHovering, setIsHovering] = useState(false);

  // Center dot — tight spring, snappy
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const dotSpringX = useSpring(dotX, { damping: 30, stiffness: 700, mass: 0.3 });
  const dotSpringY = useSpring(dotY, { damping: 30, stiffness: 700, mass: 0.3 });

  // Outer ring — looser spring, trails behind
  const ringX = useMotionValue(0);
  const ringY = useMotionValue(0);
  const ringSpringX = useSpring(ringX, springConfig);
  const ringSpringY = useSpring(ringY, springConfig);

  useEffect(() => {
    document.documentElement.classList.add('custom-cursor-active');
    console.log('[SmoothCursor] Mounted — listening for mousemove');

    const handleMove = (e: MouseEvent) => {
      dotX.set(e.clientX - 8);
      dotY.set(e.clientY - 8);
      ringX.set(e.clientX - 20);
      ringY.set(e.clientY - 20);
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]'
      );
      setIsHovering(!!interactive);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousemove', checkHover);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousemove', checkHover);
    };
  }, [dotX, dotY, ringX, ringY]);

  if (cursor) {
    return <div className="smooth-cursor-wrapper">{cursor}</div>;
  }

  return (
    <>
      {/* Center dot — small, snappy */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-electric-blue pointer-events-none z-[9999]"
        style={{
          x: dotSpringX,
          y: dotSpringY,
          boxShadow:
            '0 0 12px rgba(0, 229, 255, 1), 0 0 24px rgba(0, 229, 255, 0.6), 0 0 36px rgba(0, 229, 255, 0.3)',
        }}
      />

      {/* Outer ring — trails, scales on hover */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-electric-blue/70 pointer-events-none z-[9998]"
        style={{
          x: ringSpringX,
          y: ringSpringY,
          opacity: isHovering ? 1 : 0.6,
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
        }}
        transition={{
          scale: { type: 'spring', damping: 20, stiffness: 300 },
        }}
      />
    </>
  );
}