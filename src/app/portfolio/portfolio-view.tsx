'use client';

import { useState } from 'react';
import { PORTFOLIO_PROJECTS, CLIENTS } from '@/lib/constants';
import { Reveal } from '@/components/sections/Reveal';

export default function PortfolioView() {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(PORTFOLIO_PROJECTS.map((p) => p.category)))];
  const filtered =
    activeFilter === 'All'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <main className="pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="mb-16">
          <p className="text-electric-blue font-general text-xs tracking-[0.3em] uppercase mb-4">
            The Magnus Portfolio
          </p>
          <h1 className="font-space font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] mb-6">
            Signature Projects
            <sup className="text-xl md:text-2xl align-top">®</sup>
          </h1>
          <p className="text-text-muted font-general text-lg max-w-2xl">
            High-end cinematic visuals for luxury real estate and premium hotels. Each project reflects our passion for storytelling and excellence.
          </p>
        </div>

        {/* Filters */}
        <Reveal animation="fadeUp" className="flex flex-wrap items-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-general transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-electric-blue text-bg glow-blue'
                  : 'glass border border-glass-border text-text-muted hover:text-white hover:border-electric-blue/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((project, i) => (
            <Reveal key={project.id} animation="fadeUp" delay={i * 0.08}>
              <a
                href={`/films/${project.slug}`}
                className="group relative block rounded-2xl overflow-hidden border border-glass-border hover:border-electric-blue/30 transition-all duration-500"
              >
                <div className="relative aspect-[16/9] bg-bg overflow-hidden">
                  <video
                    src={project.video}
                    poster={project.poster}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play().catch(() => {})}
                    onMouseLeave={(e) => (e.currentTarget as HTMLVideoElement).pause()}
                  />
                  {/* Top-right number badge */}
                  <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <span className="font-space font-bold text-white text-sm">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  {/* Default state — bottom label */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-300 group-hover:opacity-0">
                    <span className="text-electric-blue text-xs font-general uppercase tracking-widest mb-2 block">
                      {project.tag}
                    </span>
                    <h3 className="font-space font-bold text-xl md:text-2xl text-white leading-tight">
                      {project.title}
                    </h3>
                  </div>
                  {/* Hover state — full info */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center p-6">
                    <span className="text-electric-blue text-xs font-general uppercase tracking-widest mb-3">
                      {project.tag}
                    </span>
                    <h3 className="font-space font-bold text-2xl md:text-3xl text-white leading-tight mb-3 max-w-md">
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-sm max-w-md">
                      {project.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-electric-blue text-xs font-general tracking-widest uppercase">
                      Watch Film
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Client marquee */}
        <div className="mt-32 border-y border-glass-border py-10">
          <p className="text-text-muted text-xs uppercase tracking-widest text-center mb-6 font-general">
            Trusted By Industry Leaders
          </p>
          <div className="marquee-container">
            <div className="marquee-content">
              {[...CLIENTS, ...CLIENTS].map((client, i) => (
                <span
                  key={`${client}-${i}`}
                  className="font-space font-bold text-lg md:text-xl tracking-widest uppercase text-white/40 hover:text-electric-blue transition-colors mx-8 inline-block"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}