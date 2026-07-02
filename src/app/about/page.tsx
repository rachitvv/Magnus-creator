import type { Metadata } from 'next';
import { STATS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Magnus Creators crafts cinematic stories for real estate & hospitality brands — blending storytelling with cutting-edge tech for unforgettable visuals.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <main className="pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-electric-blue font-general text-sm tracking-widest uppercase mb-4">
            Our Story
          </p>
          <h1 className="font-space font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6">
            About Magnus Creators
          </h1>
          <p className="text-text-muted font-general text-lg max-w-3xl mx-auto">
            From luxury residences to boutique hotels, we transform spaces into stories. Our films highlight architecture, atmosphere, and emotions — crafted to captivate audiences and elevate your brand.
          </p>
        </div>

        {/* Story */}
        <div className="grid md:grid-cols-2 gap-16 mb-32">
          <div>
            <h2 className="font-space font-bold text-3xl mb-6">Our Craft</h2>
            <p className="text-text-muted font-general text-lg leading-relaxed mb-6">
              From luxury residences to boutique hotels, we transform spaces into stories. Our films highlight architecture, atmosphere, and emotions — crafted to captivate audiences and elevate your brand.
            </p>
            <p className="text-text-muted font-general text-lg leading-relaxed">
              We blend cinematic storytelling with cutting-edge tech to create unforgettable visuals — every frame tells a story, every project is built for impact.
            </p>
          </div>
          <div>
            <h2 className="font-space font-bold text-3xl mb-6">True Partnerships</h2>
            <p className="text-text-muted font-general text-lg leading-relaxed mb-6">
              We believe the best work comes from true partnerships. Share your vision, and together we&apos;ll design a cinematic experience that goes beyond property showcase — tailored films that resonate, inspire, and deliver impact.
            </p>
            <p className="text-text-muted font-general text-lg leading-relaxed">
              Our workflow is built for speed and transparency. Track progress, request revisions, and get creative backing around the clock.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-glass-border">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-space font-bold text-4xl md:text-5xl text-electric-blue mb-2">
                {stat.number}
              </p>
              <p className="text-text-muted font-general text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}