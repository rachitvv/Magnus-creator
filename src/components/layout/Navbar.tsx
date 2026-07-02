'use client';

import { useEffect, useState } from 'react';
import { useSceneStore } from '@/store/sceneStore';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import Link from 'next/link';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const isMenuOpen = useSceneStore((s) => s.isMenuOpen);
  const setIsMenuOpen = useSceneStore((s) => s.setIsMenuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 px-6 lg:px-12 py-6 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? 'bg-bg/90 backdrop-blur-xl border-b border-glass-border py-4'
            : ''
        }`}
      >
        <Link
          href="/"
          className="font-space font-bold text-lg tracking-widest uppercase"
        >
          {SITE_CONFIG.name}
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.filter((l) => l.href !== '/').map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-general text-sm tracking-wide text-text-muted hover:text-electric-blue transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-electric-blue transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-bg font-general text-sm font-medium hover:bg-electric-blue transition-colors duration-300"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 z-[70] relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span
            className={`block w-6 h-px bg-white transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-px bg-white transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-px bg-white transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-bg flex flex-col items-center justify-center md:hidden">
          <nav className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-space text-3xl font-bold tracking-wide hover:text-electric-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-electric-blue text-bg font-general font-medium"
            >
              Get in Touch
            </a>
          </nav>
        </div>
      )}
    </>
  );
}