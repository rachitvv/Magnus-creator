'use client';

import { useEffect, useRef } from 'react';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const crosshairHRef = useRef<HTMLDivElement>(null);
  const crosshairVRef = useRef<HTMLDivElement>(null);
  const apertureRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  // Mutable refs so the RAF loop can read state without re-running the effect
  const visibleRef = useRef(false);
  const hiddenRef = useRef(false);
  const hoveredRef = useRef(false);
  const pressedRef = useRef(false);

  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const angleRef = useRef(0);

  useEffect(() => {
    document.documentElement.classList.add('custom-cursor-active');

    const setVisible = (v: boolean) => {
      visibleRef.current = v;
      if (dotRef.current) dotRef.current.style.opacity = String(v ? 1 : 0);
      if (crosshairHRef.current) crosshairHRef.current.style.opacity = String(v ? 1 : 0);
      if (crosshairVRef.current) crosshairVRef.current.style.opacity = String(v ? 1 : 0);
      if (apertureRef.current) apertureRef.current.style.opacity = String(v ? (hoveredRef.current ? 0.95 : 0.7) : 0);
      if (labelRef.current) labelRef.current.style.opacity = String(v && hoveredRef.current ? 1 : 0);
    };

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visibleRef.current) setVisible(true);
      if (hiddenRef.current) {
        hiddenRef.current = false;
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);
    const onMouseDown = () => {
      pressedRef.current = true;
      if (labelRef.current) labelRef.current.textContent = 'Click';
    };
    const onMouseUp = () => {
      pressedRef.current = false;
      if (labelRef.current) labelRef.current.textContent = 'View';
    };
    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) hiddenRef.current = true;
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]'
      );
      const wasHovered = hoveredRef.current;
      hoveredRef.current = !!isInteractive;
      if (wasHovered !== hoveredRef.current) {
        if (crosshairHRef.current) crosshairHRef.current.style.width = hoveredRef.current ? '36px' : '16px';
        if (crosshairVRef.current) crosshairVRef.current.style.height = hoveredRef.current ? '36px' : '16px';
        if (labelRef.current) labelRef.current.style.opacity = String(visibleRef.current && hoveredRef.current ? 1 : 0);
        if (labelRef.current) labelRef.current.textContent = pressedRef.current ? 'Click' : 'View';
        if (apertureRef.current) apertureRef.current.style.opacity = String(visibleRef.current ? (hoveredRef.current ? 0.95 : 0.7) : 0);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousemove', checkHover);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    const animate = () => {
      const dx = pos.current.x - ringPos.current.x;
      const dy = pos.current.y - ringPos.current.y;
      const easing = hoveredRef.current ? 0.18 : 0.12;
      ringPos.current.x += dx * easing;
      ringPos.current.y += dy * easing;

      const rotationSpeed = hoveredRef.current ? 2.4 : 0.6;
      angleRef.current += rotationSpeed;
      if (angleRef.current >= 360) angleRef.current -= 360;

      const transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;

      if (dotRef.current) {
        dotRef.current.style.transform = transform;
      }
      if (crosshairHRef.current) {
        crosshairHRef.current.style.transform = transform;
      }
      if (crosshairVRef.current) {
        crosshairVRef.current.style.transform = transform;
      }
      if (apertureRef.current) {
        const scale = pressedRef.current ? 0.85 : hoveredRef.current ? 1.15 : 1;
        apertureRef.current.style.transform = `${transform} rotate(${angleRef.current}deg) scale(${scale})`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y + 36}px) translate(-50%, -50%)`;
      }

      // Hide everything when window has lost pointer
      if (hiddenRef.current) {
        const opacity = '0';
        if (dotRef.current) dotRef.current.style.opacity = opacity;
        if (crosshairHRef.current) crosshairHRef.current.style.opacity = opacity;
        if (crosshairVRef.current) crosshairVRef.current.style.opacity = opacity;
        if (apertureRef.current) apertureRef.current.style.opacity = opacity;
        if (labelRef.current) labelRef.current.style.opacity = opacity;
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousemove', checkHover);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, []); // Empty deps — listeners and RAF only mount/unmount once

  return (
    <>
      {/* Center dot — small electric-blue point */}
      <div
        ref={dotRef}
        className="cursor-dot fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-electric-blue pointer-events-none z-[9999]"
        style={{
          boxShadow:
            '0 0 8px rgba(0, 229, 255, 0.9), 0 0 16px rgba(0, 229, 255, 0.4)',
          transition: 'opacity 0.25s ease',
          opacity: 0,
        }}
      />

      {/* Crosshair — horizontal line */}
      <div
        ref={crosshairHRef}
        className="cursor-crosshair fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 16,
          height: 1,
          background:
            'linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.7), transparent)',
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease',
          opacity: 0,
        }}
      />

      {/* Crosshair — vertical line */}
      <div
        ref={crosshairVRef}
        className="cursor-crosshair fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 1,
          height: 16,
          background:
            'linear-gradient(180deg, transparent, rgba(0, 229, 255, 0.7), transparent)',
          transition: 'height 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease',
          opacity: 0,
        }}
      />

      {/* Aperture — 6 rotating blades forming a viewfinder ring */}
      <div
        ref={apertureRef}
        className="cursor-aperture fixed top-0 left-0 w-14 h-14 pointer-events-none z-[9998]"
        style={{
          transition: 'opacity 0.3s ease',
          opacity: 0,
        }}
      >
        {/* Outer dashed ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '1px dashed rgba(0, 229, 255, 0.4)',
            animation: 'apertureSpinReverse 12s linear infinite',
          }}
        />
        {/* 6 aperture blades */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2"
            style={{
              width: 2,
              height: 22,
              background:
                'linear-gradient(180deg, rgba(0, 229, 255, 0.8), transparent)',
              transformOrigin: 'center -10px',
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-4px)`,
              opacity: 0.5,
              transition: 'opacity 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Label — appears on hover */}
      <span
        ref={labelRef}
        className="cursor-label fixed top-0 left-0 pointer-events-none z-[9999] text-[10px] font-general uppercase tracking-[0.2em] text-electric-blue whitespace-nowrap"
        style={{
          transition: 'opacity 0.25s ease',
          textShadow: '0 0 8px rgba(0, 229, 255, 0.6)',
          opacity: 0,
        }}
      >
        View
      </span>

      <style jsx>{`
        @keyframes apertureSpinReverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </>
  );
}