import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '3D Rendering',
  description:
    'Photo-realistic 3D rendering for architecture, interior visualization, exterior visualization, product rendering, real estate, and furniture.',
  alternates: { canonical: '/services/3d-rendering' },
};

export default function ThreeDRenderingPage() {
  return (
    <main className="pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-electric-blue font-general text-sm tracking-widest uppercase mb-4">
            Service 03
          </p>
          <h1 className="font-space font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6">
            <span className="text-5xl mr-3">🏛</span>
            3D Rendering
          </h1>
          <p className="text-text-muted font-general text-lg max-w-2xl mx-auto">
            Architecture, Interior Visualization, Exterior Visualization, Product Rendering, Real Estate, Furniture.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {[
            { title: 'Architecture', desc: 'Photorealistic exterior and interior renders for unbuilt properties.' },
            { title: 'Interior Visualization', desc: 'Stunning interior renders that capture lighting, materials, and atmosphere.' },
            { title: 'Exterior Visualization', desc: 'Aerial and ground-level renders for real estate marketing.' },
            { title: 'Product Rendering', desc: 'High-end product visuals for e-commerce and advertising.' },
            { title: 'Real Estate', desc: 'Marketing renders for pre-construction and off-plan sales.' },
            { title: 'Furniture', desc: 'Lifestyle and catalog renders for furniture brands.' },
          ].map((item, i) => (
            <div key={i} className="glass rounded-2xl p-8 border border-glass-border hover:border-electric-blue/40 transition-all duration-300">
              <h3 className="font-space font-bold text-xl mb-3">{item.title}</h3>
              <p className="text-text-muted font-general text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center glass rounded-2xl p-12 border border-glass-border">
          <h2 className="font-space font-bold text-3xl md:text-4xl mb-4">
            Visualize before you build
          </h2>
          <p className="text-text-muted font-general mb-8">
            Get photo-realistic 3D renders that sell the vision.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-electric-blue text-bg font-general font-semibold hover:opacity-90 transition-opacity glow-blue text-lg"
          >
            Start Rendering
          </a>
        </div>
      </div>
    </main>
  );
}