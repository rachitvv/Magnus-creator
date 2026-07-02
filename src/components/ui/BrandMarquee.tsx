'use client';

import { ScrollVelocityContainer, ScrollVelocityRow } from '@/registry/magicui/scroll-based-velocity';
import { ALL_LOGOS } from '@/components/ui/BrandLogos';

export function BrandMarquee() {
  // Split logos into two rows (5 + 5) for the magicui two-row velocity layout
  const half = Math.ceil(ALL_LOGOS.length / 2);
  const row1 = ALL_LOGOS.slice(0, half);
  const row2 = ALL_LOGOS.slice(half);

  return (
    <section className="relative py-20 border-y border-glass-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
        <p className="text-electric-blue font-general text-xs tracking-[0.3em] uppercase text-center">
          Trusted By Industry Leaders
        </p>
      </div>

      <ScrollVelocityContainer className="text-white">
        <ScrollVelocityRow
          baseVelocity={50}
          direction={1}
          className="py-4"
        >
          {row1.map(({ Component, key }) => (
            <Component key={key} className="text-white/80 hover:text-white transition-colors" />
          ))}
        </ScrollVelocityRow>
        <ScrollVelocityRow
          baseVelocity={50}
          direction={-1}
          className="py-4"
        >
          {row2.map(({ Component, key }) => (
            <Component key={key} className="text-white/80 hover:text-white transition-colors" />
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>

      {/* Edge fade gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-bg to-transparent" />
    </section>
  );
}
