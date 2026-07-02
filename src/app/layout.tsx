import type { Metadata } from 'next';
import { Space_Grotesk, Outfit, Syne } from 'next/font/google';
import './globals.css';
import { SITE_CONFIG } from '@/lib/constants';
import { SceneProvider } from '@/components/layout/SceneProvider';
import { Navbar } from '@/components/layout/Navbar';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { PageTransition } from '@/components/layout/PageTransition';
import { Preloader } from '@/components/layout/Preloader';
import { Particles } from '@/registry/magicui/particles';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-general-sans',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-satoshi',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://magnuscreators.com'),
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description:
    'Magnus Creators is a luxury creative production agency specializing in cinematic filmmaking, 3D rendering, AI video production, and immersive digital experiences.',
  keywords: [
    'creative agency',
    'film production',
    '3D rendering',
    'AI video production',
    'commercial filmmaking',
    'luxury video production',
    'real estate video',
    'event coverage',
    'drone cinematography',
    'virtual tours',
  ],
  authors: [{ name: 'Magnus Creators', url: 'https://magnuscreators.com' }],
  creator: 'Magnus Creators',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://magnuscreators.com',
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description:
      'Award-winning cinematic creative production agency. Film, 3D, AI, Events.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Magnus Creators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.tagline,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://magnuscreators.com',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${outfit.variable} ${syne.variable}`}
    >
      <body className="font-general antialiased bg-bg text-white overflow-x-hidden">
        {/* Skip to main content */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: SITE_CONFIG.name,
              description:
                'Award-winning luxury creative production agency.',
              url: `https://${SITE_CONFIG.domain}`,
              email: SITE_CONFIG.email,
              sameAs: [SITE_CONFIG.instagram, SITE_CONFIG.linkedin],
            }),
          }}
        />

        {/* Preloader */}
        <Preloader />

        {/* Noise overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Particles background (hidden in hero by hero's video + overlay) */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Particles
            className="absolute inset-0 h-full w-full"
            quantity={100}
            ease={80}
            color="#00E5FF"
          />
        </div>

        {/* 3D Scene + Cursor */}
        <SceneProvider />

        {/* Navigation */}
        <Navbar />

        {/* Mobile Menu */}
        <MobileMenu />

        {/* Page Transition */}
        <PageTransition />

        {/* Main content */}
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        {/* Footer */}
        <footer className="relative border-t-2 border-electric-blue/30 bg-bg-elevated/40 backdrop-blur-sm py-14 px-6 lg:px-12 mt-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-electric-blue to-transparent" />
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
              <a
                href="/"
                className="font-space font-bold text-xl tracking-widest uppercase text-white hover:text-electric-blue transition-colors"
              >
                {SITE_CONFIG.name}
              </a>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                <a
                  href="/about"
                  className="text-white/80 hover:text-electric-blue transition-colors text-sm"
                >
                  About
                </a>
                <a
                  href="/services"
                  className="text-white/80 hover:text-electric-blue transition-colors text-sm"
                >
                  Services
                </a>
                <a
                  href="/portfolio"
                  className="text-white/80 hover:text-electric-blue transition-colors text-sm"
                >
                  Portfolio
                </a>
                <a
                  href="/contact"
                  className="text-white/80 hover:text-electric-blue transition-colors text-sm"
                >
                  Contact
                </a>
                <a
                  href={SITE_CONFIG.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-electric-blue transition-colors text-sm"
                >
                  Instagram
                </a>
                <a
                  href={SITE_CONFIG.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-electric-blue transition-colors text-sm"
                >
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-electric-blue hover:text-white transition-colors text-sm font-medium"
              >
                {SITE_CONFIG.email}
              </a>
              <p className="text-text-muted text-xs">
                © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}