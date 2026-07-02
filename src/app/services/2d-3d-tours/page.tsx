import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '2D & 3D Tours',
  description:
    'Virtual walkthroughs, VR tours, real estate tours, hotels, resorts, and commercial building tours.',
  alternates: { canonical: '/services/2d-3d-tours' },
};

export default function ToursPage() {
  return (
    <main className="pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-electric-blue font-general text-sm tracking-widest uppercase mb-4">
            Service 04
          </p>
          <h1 className="font-space font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6">
            <span className="text-5xl mr-3">🏠</span>
            2D &amp; 3D Tours
          </h1>
          <p className="text-text-muted font-general text-lg max-w-2xl mx-auto">
            Virtual Walkthroughs, VR Tours, Real Estate Tours, Hotels, Resorts, Commercial Buildings.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {[
            { title: 'Virtual Walkthroughs', desc: 'Immersive 3D walkthroughs that let buyers explore every corner remotely.' },
            { title: 'VR Tours', desc: 'Full virtual reality experiences for headsets and online viewing.' },
            { title: 'Real Estate Tours', desc: 'Property showcase tours built for listings and pre-sales.' },
            { title: 'Hotels & Resorts', desc: 'Hospitality tours that sell the experience before the guest arrives.' },
            { title: 'Commercial Buildings', desc: 'Office and retail tours for leasing and tenant presentations.' },
            { title: 'Matterport Integration', desc: 'Seamless integration with your existing property listings.' },
          ].map((item, i) => (
            <div key={i} className="glass rounded-2xl p-8 border border-glass-border hover:border-electric-blue/40 transition-all duration-300">
              <h3 className="font-space font-bold text-xl mb-3">{item.title}</h3>
              <p className="text-text-muted font-general text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center glass rounded-2xl p-12 border border-glass-border">
          <h2 className="font-space font-bold text-3xl md:text-4xl mb-4">
            Bring properties to life
          </h2>
          <p className="text-text-muted font-general mb-8">
            Let buyers explore from anywhere in the world.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-electric-blue text-bg font-general font-semibold hover:opacity-90 transition-opacity glow-blue text-lg"
          >
            Build Your Tour
          </a>
        </div>
      </div>
    </main>
  );
}