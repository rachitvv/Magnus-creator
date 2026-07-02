import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        'electric-blue': '#00E5FF',
        'purple-accent': '#8B5CF6',
        white: '#FFFFFF',
        'text-muted': '#999999',
        'glass-fill': 'rgba(255,255,255,0.04)',
        'glass-border': 'rgba(255,255,255,0.08)',
        'glow-blue': 'rgba(0,229,255,0.15)',
        'glow-purple': 'rgba(139,92,246,0.15)',
      },
      fontFamily: {
        space: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        general: ['var(--font-general-sans)', 'system-ui', 'sans-serif'],
        satoshi: ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'marquee-scroll': 'marquee-scroll 30s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'marquee-scroll': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;