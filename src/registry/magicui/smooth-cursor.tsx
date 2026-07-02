'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SmoothCursorProps {
  cursor?: React.ReactNode;
  springConfig?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
    restDelta?: number;
  };
}

const DefaultCursorSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={42}
      height={42}
      viewBox="0 0 42 42"
      fill="none"
      style={{ scale: 0.5 }}
    >
      <circle
        cx="21"
        cy="21"
        r="20.5"
        fill="#FBFF00"
        stroke="white"
        strokeWidth="1"
      />
    </svg>
  );
};

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
  springConfig = {
    damping: 45,
    stiffness: 400,
    mass: 1,
    restDelta: 0.001,
  },
}: SmoothCursorProps) {
  const [isHidden, setIsHidden] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Don't show on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
      setIsHidden(true);
      return;
    }
    let rafId: number = 0;
    const updatePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{
        translateX: springX,
        translateY: springY,
        scale: isHidden ? 0 : 1,
      }}
      className="pointer-events-none fixed left-0 top-0 z-50"
    >
      {cursor}
    </motion.div>
  );
}
