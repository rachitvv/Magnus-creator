'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
} from 'react';

interface ScrollVelocityContextProps {
  /** Live pixel-delta per ms (negative = scrolled up, positive = scrolled down) */
  velocityRef: React.MutableRefObject<number>;
}

const ScrollVelocityContext = createContext<ScrollVelocityContextProps | undefined>(
  undefined
);

export function useScrollVelocityContext() {
  const context = useContext(ScrollVelocityContext);
  if (!context) {
    throw new Error(
      'useScrollVelocityContext must be used within a ScrollVelocityContainer'
    );
  }
  return context;
}

export interface ScrollVelocityContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/**
 * Provides a shared scroll-velocity value (px delta between consecutive
 * scroll events) to descendant <ScrollVelocityRow /> components.
 *
 * Implementation note: instead of framer-motion's useVelocity (which
 * returns px/ms and is hard to compose with our wrap-around transform),
 * we track the per-event delta in a ref and decay it over time.
 */
export const ScrollVelocityContainer = ({
  children,
  className,
  ...props
}: ScrollVelocityContainerProps) => {
  const velocityRef = useRef(0);
  const lastYRef = useRef(0);
  const lastTRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      if (lastTRef.current > 0) {
        const dt = Math.max(1, now - lastTRef.current);
        // px per ms, but normalize to ~px per frame (16ms) for nice scaling
        velocityRef.current = ((y - lastYRef.current) / dt) * 16;
      }
      lastYRef.current = y;
      lastTRef.current = now;
    };
    // Initialize on mount
    lastYRef.current = window.scrollY;
    lastTRef.current = performance.now();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <ScrollVelocityContext.Provider value={{ velocityRef }}>
      <div className={`relative w-full ${className || ''}`} {...props}>
        {children}
      </div>
    </ScrollVelocityContext.Provider>
  );
};

export interface ScrollVelocityRowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Pixels per second the row drifts when the page is stationary. */
  baseVelocity?: number;
  /** 1 = left, -1 = right */
  direction?: 1 | -1;
}

/**
 * Constant-direction row whose drift speed adds a fraction of the page's
 * current scroll velocity. Loops seamlessly by wrapping the inner x
 * position once the first set of children has scrolled past the viewport.
 */
export const ScrollVelocityRow = ({
  children,
  baseVelocity = 30,
  direction = 1,
  className,
  ...props
}: ScrollVelocityRowProps) => {
  const { velocityRef } = useScrollVelocityContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(64, now - prev) / 1000; // clamp big gaps (tab inactive)
      prev = now;

      // Decay the cached scroll velocity
      velocityRef.current *= 0.9;

      // Base drift (px/sec → px this frame)
      let move = baseVelocity * direction * dt;
      // Scroll-velocity boost: only kick in when actively scrolling
      // Magnitude grows with how fast the page is being scrolled
      const boost = Math.abs(velocityRef.current) * 0.4 * direction;
      move += boost * dt * 60; // scale to per-frame

      xRef.current -= move;

      // Wrap around for seamless loop (content is rendered 2×)
      if (innerRef.current) {
        const oneSetWidth = innerRef.current.scrollWidth / 2;
        if (oneSetWidth > 0) {
          if (xRef.current <= -oneSetWidth) {
            xRef.current += oneSetWidth;
          } else if (xRef.current >= 0) {
            xRef.current -= oneSetWidth;
          }
        }
        innerRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [baseVelocity, direction, velocityRef]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden whitespace-nowrap ${
        className || ''
      }`}
      {...props}
    >
      <div
        ref={innerRef}
        className="inline-flex will-change-transform"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      >
        {children}
        {children}
      </div>
    </div>
  );
};
