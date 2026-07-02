'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src?: string; // optional — falls back to first-letter avatar
}

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}

// Stable color per name (hash → one of N accent gradients)
const AVATAR_GRADIENTS = [
  'from-amber-400 via-orange-500 to-rose-500',
  'from-cyan-400 via-blue-500 to-indigo-600',
  'from-emerald-400 via-teal-500 to-cyan-600',
  'from-fuchsia-400 via-purple-500 to-pink-600',
  'from-yellow-400 via-amber-500 to-red-500',
  'from-sky-400 via-cyan-500 to-blue-600',
  'from-lime-400 via-green-500 to-emerald-600',
  'from-rose-400 via-pink-500 to-fuchsia-600',
];

function pickGradient(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_GRADIENTS[h % AVATAR_GRADIENTS.length];
}

function InitialAvatar({ name }: { name: string }) {
  const initial = name.trim().charAt(0).toUpperCase() || '?';
  const gradient = pickGradient(name);
  return (
    <div
      className={`h-full w-full rounded-3xl border border-glass-border bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}
    >
      {/* Subtle noise/ring overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10" />
      <div className="absolute inset-3 rounded-2xl border border-white/15" />
      <span
        className="relative font-space font-bold text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
        style={{ fontSize: 'clamp(8rem, 28vw, 18rem)', lineHeight: 1 }}
      >
        {initial}
      </span>
    </div>
  );
}

export function AnimatedTestimonials({
  testimonials,
  autoplay = false,
  className = '',
}: AnimatedTestimonialsProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        setActive((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };
  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  const isActive = (i: number) => i === active;

  return (
    <div
      className={`mx-auto max-w-sm px-4 py-12 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12 ${className}`}
    >
      <div className="relative grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2 md:gap-x-16">
        {/* ── IMAGE STACK ── */}
        <div className="relative">
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: i % 2 === 0 ? -4 : 4,
                  }}
                  animate={{
                    opacity: isActive(i) ? 1 : 0.4,
                    scale: isActive(i) ? 1 : 0.95,
                    z: isActive(i) ? 0 : -100,
                    rotate: isActive(i) ? 0 : i % 2 === 0 ? -4 : 4,
                    zIndex: isActive(i)
                      ? 40
                      : testimonials.length + 2 - i,
                    y: isActive(i) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  {t.src ? (
                    <Image
                      src={t.src}
                      alt={t.name}
                      width={500}
                      height={500}
                      draggable={false}
                      className="h-full w-full rounded-3xl object-cover object-center border border-glass-border"
                    />
                  ) : (
                    <InitialAvatar name={t.name} />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* ── QUOTE + AUTHOR ── */}
        <div className="flex flex-col justify-between py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h3 className="text-2xl font-bold text-ink">
                {testimonials[active].name}
              </h3>
              <p className="text-sm text-electric-blue uppercase tracking-widest mt-1">
                {testimonials[active].designation}
              </p>
              <motion.p className="mt-6 text-lg text-ink-muted leading-relaxed">
                {testimonials[active].quote.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ filter: 'blur(10px)', opacity: 0, y: 5 }}
                    animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: 'easeInOut',
                      delay: 0.02 * i,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* ── CONTROLS ── */}
          <div className="flex items-center gap-4 pt-8 md:pt-0">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="group/button flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-glass-fill hover:bg-electric-blue/10 transition"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="text-ink-muted group-hover/button:text-electric-blue rotate-180 transition"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="group/button flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-glass-fill hover:bg-electric-blue/10 transition"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="text-ink-muted group-hover/button:text-electric-blue transition"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2 ml-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive(i)
                      ? 'w-8 bg-electric-blue'
                      : 'w-1.5 bg-glass-border hover:bg-ink-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}