import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import PortfolioView from './portfolio-view';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Explore high-end cinematic visuals that showcase spaces at their best — from luxury real estate to premium hotels.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: `Portfolio | ${SITE_CONFIG.name}`,
    description:
      'High-end cinematic visuals for luxury real estate and premium hotels. Each project reflects our passion for storytelling and excellence.',
    url: 'https://magnuscreators.com/portfolio',
  },
};

export default function PortfolioPage() {
  return <PortfolioView />;
}