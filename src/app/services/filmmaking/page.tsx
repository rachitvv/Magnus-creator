import type { Metadata } from 'next';
import { PORTFOLIO_PROJECTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Film Making',
  description:
    'Cinematic film production for luxury real estate, hospitality, and premium brands. Wedding films, commercials, corporate videos, music videos, documentaries, drone cinematography.',
  alternates: { canonical: '/services/filmmaking' },
};

export default function FilmmakingPage() {
  return (
    <main className="pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-electric-blue font-general text-sm tracking-widest uppercase mb-4">
            Service 01
          </p>
          <h1 className="font-space font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6">
            <span className="text-5xl mr-3">🎬</span>
            Film Making
          </h1>
          <p className="text-text-muted font-general text-lg max-w-2xl mx-auto">
            Wedding Films, Commercial Films, Corporate Videos, Music Videos, Documentaries, Drone Cinematography.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {PORTFOLIO_PROJECTS.slice(0, 4).map((project) => (
            <div key={project.id} className="group relative rounded-2xl overflow-hidden border border-glass-border glass hover:border-electric-blue/30 transition-all duration-300">
              <div className="relative aspect-[16/9] bg-bg overflow-hidden">
                <video
                  src={project.video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-electric-blue text-xs uppercase tracking-widest mb-2 block font-general">
                    {project.tag}
                  </span>
                  <h3 className="font-space font-bold text-xl md:text-2xl text-white">
                    {project.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center glass rounded-2xl p-12 border border-glass-border">
          <h2 className="font-space font-bold text-3xl md:text-4xl mb-4">
            Ready to tell your story?
          </h2>
          <p className="text-text-muted font-general mb-8">
            Let&apos;s craft a cinematic film that elevates your brand.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-electric-blue text-bg font-general font-semibold hover:opacity-90 transition-opacity glow-blue text-lg"
          >
            Start a Project
          </a>
        </div>
      </div>
    </main>
  );
}