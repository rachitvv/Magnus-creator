'use client';

import { useEffect, useRef } from 'react';

interface ParticlesProps {
  id?: string;
  className?: string;
  quantity?: number;
  ease?: number;
  refresh?: boolean;
  color?: string;
}

export function Particles({
  id,
  className,
  quantity = 80,
  ease = 80,
  refresh = false,
  color = '#ffffff',
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      targetOpacity: number;
    }>
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasId = id || 'tsparticles';

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Convert hex to rgba for per-particle alpha
    const hexToRgb = (hex: string) => {
      const h = hex.replace('#', '');
      const bigint = parseInt(h, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return { r, g, b };
    };
    const { r, g, b } = hexToRgb(color);

    // Initialize particles distributed across the viewport
    particlesRef.current = Array.from({ length: quantity }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.8 + 0.4,
      opacity: 0,
      targetOpacity: Math.random() * 0.5 + 0.15,
    }));

    const fadeSpeed = (ease / 100) * 0.02 + 0.002;

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around viewport edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Animate opacity toward target
        p.opacity += (p.targetOpacity - p.opacity) * fadeSpeed;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.opacity})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    // Expose id for parity with magicui (some integrations look it up)
    if (canvas.parentElement) canvas.parentElement.id = canvasId;

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [id, quantity, ease, refresh, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className || ''}`}
      aria-hidden="true"
    />
  );
}
