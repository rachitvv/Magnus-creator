'use client';

import { useEffect, useRef, useCallback } from 'react';

export function useMagneticEffect(strength = 0.3) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = (ref.current as HTMLElement).getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      (ref.current as HTMLElement).style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    },
    [strength]
  );

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
