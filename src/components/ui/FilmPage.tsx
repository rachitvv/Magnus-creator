'use client';

import Link from 'next/link';
import type { PortfolioProject } from '@/lib/constants';

interface FilmPageProps {
  project: PortfolioProject;
  next: PortfolioProject;
}

/**
 * Reusable film detail page layout.
 * Mirrors bricklensstudio.com/films/[slug]:
 *  1. Full-bleed hero video
 *  2. Category tag pills
 *  3. Title + tagline
 *  4. Description / story block
 *  5. Project credits (client, year, services)
 *  6. Related / next project nav
 */
export function FilmPage({ project, next }: FilmPageProps) {
  return (
    <main className="relative">
      {/* ── HERO VIDEO ── */}
      <section className="relative w-full h-screen overflow-hidden bg-bg">
        <video
          src={project.video}
          poster={project.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-white/70 text-xs font-general tracking-widest uppercase">Scroll</span>
          <div className="scroll-indicator-arrow">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 3v14M3 12l7 7 7-7" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── CATEGORY TAGS + TITLE ── */}
      <section className="py-20 md:py-32 px-6 lg:px-12 border-t border-glass-border">
        <div className="max-w-5xl mx-auto">
          {/* Tag pills */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {project.services.slice(0, 3).map((s) => (
              <span
                key={s}
                className="px-4 py-1.5 rounded-full border border-glass-border bg-glass-fill text-text-muted text-xs font-general uppercase tracking-widest"
              >
                {s}
              </span>
            ))}
            <span className="px-4 py-1.5 rounded-full bg-electric-blue/10 border border-electric-blue/30 text-electric-blue text-xs font-general uppercase tracking-widest">
              {project.tag}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-space font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white mb-8">
            {project.title}
          </h1>

          {/* Tagline */}
          <p className="font-space text-xl md:text-2xl lg:text-3xl text-white/80 leading-relaxed max-w-3xl">
            {project.tagline}
          </p>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="py-20 md:py-32 px-6 lg:px-12 border-t border-glass-border">
        <div className="max-w-3xl mx-auto">
          <p className="text-electric-blue font-general text-xs tracking-[0.3em] uppercase mb-6">
            The Story
          </p>
          <p className="font-general text-white/80 text-lg md:text-xl leading-relaxed">
            {project.story}
          </p>
        </div>
      </section>

      {/* ── CREDITS ── */}
      <section className="py-20 md:py-32 px-6 lg:px-12 border-t border-glass-border">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-electric-blue font-general text-xs tracking-[0.3em] uppercase mb-3">
              Project Credits
            </p>
            <h2 className="font-space font-bold text-3xl md:text-4xl text-white mb-8">
              Behind the Film
            </h2>
            <dl className="space-y-4 font-general">
              <div className="flex items-baseline gap-6 border-b border-glass-border pb-3">
                <dt className="text-text-muted text-sm uppercase tracking-widest w-32 flex-shrink-0">
                  Client
                </dt>
                <dd className="text-white text-base">{project.client}</dd>
              </div>
              <div className="flex items-baseline gap-6 border-b border-glass-border pb-3">
                <dt className="text-text-muted text-sm uppercase tracking-widest w-32 flex-shrink-0">
                  Year
                </dt>
                <dd className="text-white text-base">{project.year}</dd>
              </div>
              <div className="flex items-baseline gap-6 border-b border-glass-border pb-3">
                <dt className="text-text-muted text-sm uppercase tracking-widest w-32 flex-shrink-0">
                  Category
                </dt>
                <dd className="text-white text-base">{project.category}</dd>
              </div>
              <div className="flex items-baseline gap-6">
                <dt className="text-text-muted text-sm uppercase tracking-widest w-32 flex-shrink-0">
                  Services
                </dt>
                <dd className="text-white text-base">{project.services.join(', ')}</dd>
              </div>
            </dl>
          </div>

          {/* Quote / pull */}
          <div className="flex items-center">
            <blockquote className="font-space text-2xl md:text-3xl italic text-white/70 leading-snug border-l-2 border-electric-blue pl-8">
              &ldquo;{project.description}&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── NEXT PROJECT ── */}
      <section className="py-20 md:py-32 px-6 lg:px-12 border-t border-glass-border">
        <div className="max-w-7xl mx-auto">
          <p className="text-electric-blue font-general text-xs tracking-[0.3em] uppercase mb-6">
            Next Project
          </p>
          <Link
            href={`/films/${next.slug}`}
            className="group block relative rounded-2xl overflow-hidden border border-glass-border hover:border-electric-blue/30 transition-all duration-500"
          >
            <div className="relative aspect-[21/9] overflow-hidden">
              <video
                src={next.video}
                poster={next.poster}
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play().catch(() => {})}
                onMouseLeave={(e) => (e.currentTarget as HTMLVideoElement).pause()}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-12">
                <span className="text-electric-blue text-xs font-general uppercase tracking-widest mb-2">
                  {next.tag}
                </span>
                <h3 className="font-space font-bold text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-2">
                  {next.title}
                </h3>
                <span className="inline-flex items-center gap-2 text-white/80 text-sm font-general group-hover:text-electric-blue transition-colors">
                  Watch film
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── BACK TO WORK ── */}
      <section className="py-16 px-6 lg:px-12 border-t border-glass-border text-center">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-text-muted hover:text-electric-blue transition-colors text-sm font-general tracking-widest uppercase"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M11 7H3M7 3 3 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All Projects
        </Link>
      </section>
    </main>
  );
}