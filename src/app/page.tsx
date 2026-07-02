'use client';

import { SERVICES, STATS, TESTIMONIALS, PORTFOLIO_PROJECTS, SITE_CONFIG, CLIENTS } from '@/lib/constants';
import { Reveal } from '@/components/sections/Reveal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { BrandMarquee } from '@/components/ui/BrandMarquee';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';

export default function HomePage() {
  return (
    <main className="relative">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24 pb-32">
        {/* Video background */}
        <video
          src="/Terra-Solis-Lifestyle-Ad.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-bg z-10" />
        <div className="absolute inset-0 bg-black/30 z-10" />

        <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-6xl mx-auto">
          {/* Logo image as the hero focal point */}
          <img
            src="/logo.png"
            alt="Magnus Creator — bringing ideas to life"
            className="w-full max-w-3xl h-auto drop-shadow-[0_0_60px_rgba(232,162,60,0.25)]"
          />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <MagneticButton href="/portfolio" variant="primary" size="lg">
              View Our Work
            </MagneticButton>
            <MagneticButton href="/contact" variant="outline" size="lg">
              Get in Touch
            </MagneticButton>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <span className="text-white/70 text-xs font-general tracking-widest uppercase">Scroll</span>
          <div className="scroll-indicator-arrow">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 3v14M3 12l7 7 7-7" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── BRAND MARQUEE ── */}
      <BrandMarquee />

      {/* ── ABOUT ── */}
      <section className="py-32 px-6 lg:px-12 border-t border-glass-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <Reveal animation="slideLeft">
            <p className="text-electric-blue font-general text-sm tracking-widest uppercase mb-4">
              About Us
            </p>
            <h2 className="font-space font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
              Spaces into Stories.
            </h2>
          </Reveal>
          <Reveal animation="slideRight" delay={0.1}>
            <p className="text-text-muted font-general text-lg leading-relaxed mb-6">
              From luxury residences to boutique hotels, we transform spaces into stories. Our films highlight architecture, atmosphere, and emotions — crafted to captivate audiences and elevate your brand.
            </p>
            <p className="text-text-muted font-general text-lg leading-relaxed">
              We believe the best work comes from true partnerships. Share your vision, and together we&apos;ll design a cinematic experience that goes beyond property showcase — tailored films that resonate, inspire, and deliver impact.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 px-6 lg:px-12 border-t border-glass-border">
        <div className="max-w-7xl mx-auto">
          <Reveal animation="fadeUp" className="text-center mb-12">
            <p className="text-text-muted font-general text-base md:text-lg max-w-3xl mx-auto">
              Every frame tells a story. We&apos;re dedicated to delivering cinematic quality that captivates and sells.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} animation="fadeUp" delay={i * 0.08}>
                <div>
                  <p className="font-space font-bold text-4xl md:text-5xl text-electric-blue mb-2">
                    {stat.number}
                  </p>
                  <p className="text-text-muted font-general text-sm">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-32 px-6 lg:px-12 border-t border-glass-border">
        <div className="max-w-7xl mx-auto">
          <Reveal animation="fadeUp" className="text-center mb-20">
            <p className="text-electric-blue font-general text-sm tracking-widest uppercase mb-4">
              What We Do
            </p>
            <h2 className="font-space font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Our Services
            </h2>
            <p className="text-text-muted font-general text-lg max-w-2xl mx-auto mt-6">
              From cinematic storytelling to cutting-edge 3D visualization, we craft compelling visuals that enhance the way properties are showcased.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map((service, i) => (
              <Reveal key={service.id} animation="fadeUp" delay={i * 0.05}>
                <a
                  href={service.href}
                  className="group glass rounded-2xl p-8 md:p-10 block hover:border-electric-blue/40 transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <span className="text-4xl">{service.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-space font-bold text-2xl md:text-3xl mb-3 group-hover:text-electric-blue transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-text-muted font-general text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIGNATURE PROJECTS® ── */}
      <section className="py-32 px-6 lg:px-12 border-t border-glass-border">
        <div className="max-w-7xl mx-auto">
          <Reveal animation="fadeUp" className="mb-16">
            <p className="text-electric-blue font-general text-xs tracking-[0.3em] uppercase mb-4">
              The Magnus Portfolio
            </p>
            <h2 className="font-space font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95]">
              Signature Projects
              <sup className="text-xl md:text-2xl align-top">®</sup>
            </h2>
            <p className="text-text-muted font-general text-lg max-w-2xl mt-6">
              From luxury real estate to premium hotels, each project reflects our passion for storytelling and excellence.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {PORTFOLIO_PROJECTS.map((project, i) => (
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
          <Reveal animation="fadeUp" className="text-center mt-12">
            <MagneticButton href="/portfolio" variant="outline" size="lg">
              View Full Portfolio
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-32 px-6 lg:px-12 border-t border-glass-border">
        <div className="max-w-7xl mx-auto">
          <Reveal animation="fadeUp" className="text-center mb-16">
            <p className="text-electric-blue font-general text-sm tracking-widest uppercase mb-4">
              Trusted By Experts
            </p>
            <h2 className="font-space font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Stories From Those Who&apos;ve Worked With Us
            </h2>
          </Reveal>

          {/* Animated testimonials carousel */}
          <AnimatedTestimonials testimonials={TESTIMONIALS} autoplay />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 lg:px-12 text-center border-t border-glass-border">
        <Reveal animation="scaleIn" className="max-w-3xl mx-auto">
          <h2 className="font-space font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-8">
            Ready to Create Something
            <br />
            <span className="text-electric-blue">Extraordinary?</span>
          </h2>
          <p className="text-text-muted font-general text-lg mb-10">
            Lightning-fast delivery without compromising quality &mdash; your film launches in 7 days. Let&apos;s discuss your project and bring your vision to life.
          </p>
          <MagneticButton href="/contact" variant="primary" size="lg">
            Start a Project
          </MagneticButton>
        </Reveal>
      </section>
    </main>
  );
}