import { SITE_CONFIG } from './constants';

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_CONFIG.name,
  description: 'Award-winning luxury creative production agency.',
  url: `https://${SITE_CONFIG.domain}`,
  email: SITE_CONFIG.email,
  logo: {
    '@type': 'ImageObject',
    url: `https://${SITE_CONFIG.domain}/logo.png`,
  },
  sameAs: [SITE_CONFIG.instagram, SITE_CONFIG.linkedin],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SITE_CONFIG.phone,
    contactType: 'customer service',
    availableLanguage: 'English',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
  },
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_CONFIG.name,
  url: `https://${SITE_CONFIG.domain}`,
  description: SITE_CONFIG.tagline,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `https://${SITE_CONFIG.domain}/portfolio?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE_CONFIG.name,
  description: 'Luxury creative production agency.',
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  url: `https://${SITE_CONFIG.domain}`,
  priceRange: '$$$',
  areaServed: 'Worldwide',
  serviceType: [
    'Film Production',
    '3D Rendering',
    'Event Coverage',
    'AI Video Production',
    'Virtual Tours',
  ],
};
