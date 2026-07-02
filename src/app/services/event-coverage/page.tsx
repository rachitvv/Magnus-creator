import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Coverage',
  description:
    'Cinematic event coverage for corporate events, luxury weddings, concerts, sports, product launches, and live streaming.',
  alternates: { canonical: '/services/event-coverage' },
};

export default function EventCoveragePage() {
  return (
    <main className="pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-electric-blue font-general text-sm tracking-widest uppercase mb-4">
            Service 02
          </p>
          <h1 className="font-space font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6">
            <span className="text-5xl mr-3">📷</span>
            Event Coverage
          </h1>
          <p className="text-text-muted font-general text-lg max-w-2xl mx-auto">
            Corporate Events, Luxury Weddings, Concerts, Sports, Product Launches, Live Streaming.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            { title: 'Corporate Events', desc: 'Conferences, summits, and brand activations captured cinematically.' },
            { title: 'Luxury Weddings', desc: 'Emotionally rich wedding films for high-end celebrations.' },
            { title: 'Product Launches', desc: 'High-energy launch films that amplify the reveal moment.' },
            { title: 'Concerts & Festivals', desc: 'Multi-cam coverage and atmospheric footage for live shows.' },
            { title: 'Sports', desc: 'Dynamic action coverage with slow-motion and aerial shots.' },
            { title: 'Live Streaming', desc: 'Multi-platform streaming with broadcast-grade production.' },
          ].map((item, i) => (
            <div key={i} className="glass rounded-2xl p-8 border border-glass-border">
              <h3 className="font-space font-bold text-xl mb-3">{item.title}</h3>
              <p className="text-text-muted font-general text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center glass rounded-2xl p-12 border border-glass-border">
          <h2 className="font-space font-bold text-3xl md:text-4xl mb-4">
            Let&apos;s capture your event
          </h2>
          <p className="text-text-muted font-general mb-8">
            Get cinematic coverage that makes your event unforgettable.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-electric-blue text-bg font-general font-semibold hover:opacity-90 transition-opacity glow-blue text-lg"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </main>
  );
}