export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  href: string;
}

export const SITE_CONFIG = {
  name: 'MAGNUS CREATORS',
  tagline: 'Bringing Ideas to Life',
  domain: 'magnuscreators.com',
  email: 'rachitvats100@gmail.com',
  phone: '+91 9990668861',
  instagram: '',
  linkedin: '',
  whatsapp: 'https://wa.me/919876543210',
};

export const BRAND_COLORS = {
  bg: '#050505',
  'electric-blue': '#00E5FF',
  'purple-accent': '#8B5CF6',
  white: '#FFFFFF',
  'text-muted': '#999999',
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
];

export const SERVICES = [
  {
    id: 'filmmaking',
    title: 'Film Making',
    icon: '🎬',
    description: 'Wedding Films, Commercial Films, Corporate Videos, Music Videos, Documentaries, Drone Cinematography',
    href: '/services/filmmaking',
  },
  {
    id: 'event-coverage',
    title: 'Event Coverage',
    icon: '📷',
    description: 'Corporate Events, Luxury Weddings, Concerts, Sports, Product Launches, Live Streaming',
    href: '/services/event-coverage',
  },
  {
    id: '3d-rendering',
    title: '3D Rendering',
    icon: '🏛',
    description: 'Architecture, Interior Visualization, Exterior Visualization, Product Rendering, Real Estate, Furniture',
    href: '/services/3d-rendering',
  },
  {
    id: '2d-3d-tours',
    title: '2D & 3D Tours',
    icon: '🏠',
    description: 'Virtual Walkthroughs, VR Tours, Real Estate Tours, Hotels, Resorts, Commercial Buildings',
    href: '/services/2d-3d-tours',
  },
  {
    id: 'ai-video-production',
    title: 'AI Video Production',
    icon: '🤖',
    description: 'AI Commercials, AI Product Videos, AI Fashion Videos, AI Social Media Ads, AI Animation, AI Talking Avatar, AI Cinematic Content',
    href: '/services/ai-video-production',
  },
];

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  video: string; // public path
  poster?: string; // public path
  tag: string;
  tagline: string;
  story: string;
  services: string[];
  client: string;
  year: string;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'myriad',
    slug: 'myriad',
    title: "Myriad — It Fills Up!",
    category: 'Film TVC',
    description: 'A bold brand film that captures the essence of modern living with cinematic storytelling.',
    video: '/Myriad-It-Fills-Up-TVC.mp4',
    poster: '/myriad.jpg',
    tag: 'TVC',
    tagline:
      "Shot this for Myriad in Dubai. The idea was simple — don't sell the rooms, sell the experience.",
    story:
      "We built the whole film around how fast student life fills up. From quiet morning moments to full-on chaos, food, friends, and everything in between. Super fast shoot, lots of moving parts, match cuts, bullet-time, transitions, and a lot of controlled chaos on set. The goal was to make every viewer feel the energy of moving into a place that actually feels alive.",
    services: ['Direction', 'Cinematography', 'Edit', 'Color', 'Sound Design'],
    client: 'Myriad',
    year: '2025',
  },
  {
    id: 'adagio-premium',
    slug: 'adagio-premium-the-palm',
    title: 'Adagio Premium The Palm',
    category: 'Brand Film TVC',
    description: 'An opulent brand film showcasing luxury living on the iconic Palm Jumeirah.',
    video: '/Adagio-Premium-The-Palm-Brand-Film.mp4',
    poster: '/adagio-premium.jpg',
    tag: 'Brand Film',
    tagline:
      "An opulent brand film for Adagio Premium on the Palm Jumeirah — every frame tuned to sell the lifestyle, not the inventory.",
    story:
      "Adagio Premium is hospitality with a strong identity. Our job was to translate that into motion. We leaned into golden-hour aerials, slow interior dolly work, and a slow-burn edit that lets the architecture breathe. Every shot was built around a single question: would this make a guest feel at home?",
    services: ['Brand Film', 'Aerial Cinematography', 'Color', 'Sound Design'],
    client: 'Adagio Premium',
    year: '2025',
  },
  {
    id: 'terra-solis',
    slug: 'terra-solis',
    title: 'Terra Solis by Tomorrowland',
    category: 'Brand Film TVC',
    description: 'A vibrant lifestyle film set in a stunning architectural masterpiece.',
    video: '/Terra-Solis-Lifestyle-Ad.mp4',
    poster: '/terra-solis.jpg',
    tag: 'Brand Film',
    tagline:
      "Tomorrowland's desert destination needed a film that felt as bold as the festival itself — and that's exactly what we made.",
    story:
      "Terra Solis is a desert lifestyle resort, and the film needed to feel like the place: vibrant, surreal, sun-drenched. We shot across golden and blue hours, built a custom slow-shutter rig for the dance-floor moments, and graded the whole piece around the warm desert palette. The result is a film that reads as both luxury escape and music-festival energy.",
    services: ['Lifestyle Film', 'Aerial', 'Edit', 'Color', 'Music Supervision'],
    client: 'Terra Solis',
    year: '2025',
  },
  {
    id: 'sweden-palace',
    slug: 'sweden-palace',
    title: "Dubai's $35M Sweden Palace",
    category: 'Film Tour Video',
    description: 'A cinematic tour of a world-class luxury villa in the heart of Dubai.',
    video: '/Dubai-Sweden-Palace-Tour.mp4',
    tag: 'Tour Video',
    tagline:
      "A cinematic walkthrough of a $35M Dubai villa — built to feel less like a tour and more like a short film.",
    story:
      "The Sweden Palace sits in one of Dubai's most exclusive districts and the brief was simple: make it feel like a film, not a real-estate listing. We shot with a small crew, a stabilized gimbal rig, and a 3-axis slider to keep every room transition buttery. The edit leans into a single continuous take, broken only when the spaces demand it.",
    services: ['Tour Video', 'Cinematography', 'Edit', 'Color', 'Gimbal Work'],
    client: 'Private Residence',
    year: '2025',
  },
];

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  designation: string;
  src?: string; // optional — falls back to first-letter avatar when empty
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rahul-mehta',
    quote:
      'Magnus Creators completely transformed our visual presence with their cinematic videography. Every project now stands out, attracting more clients than ever!',
    name: 'Rahul Mehta',
    designation: 'CEO, Skyline Realty',
  },
  {
    id: 'samantha-roy',
    quote:
      "The level of detail and storytelling in Magnus Creators' work is unmatched. They turned our brand film into a visual masterpiece that exceeded all expectations.",
    name: 'Samantha Roy',
    designation: 'Marketing Director, Elite Properties',
  },
  {
    id: 'neha-sood',
    quote:
      'I was amazed by how seamlessly Magnus Creators captured the essence of our properties. Professional, creative, and always delivers top-quality work!',
    name: 'Neha Sood',
    designation: 'CMO, Urban Nest Realty',
  },
  {
    id: 'james-kim',
    quote:
      "Outstanding work and a deeply collaborative process. Magnus Creators made the entire production feel effortless, and the final film exceeded every brief.",
    name: 'James Kim',
    designation: 'Engineering Lead at DataPro',
  },
  {
    id: 'lisa-thompson',
    quote:
      "The cinematic quality and quick turnaround have been a game-changer for our launches. Magnus Creators is now our default production partner.",
    name: 'Lisa Thompson',
    designation: 'VP of Technology at FutureNet',
  },
];

export const WORKFLOW_STAGES = [
  {
    id: 'discovery',
    number: '01',
    title: 'Discovery',
    description: 'Understanding your vision, audience, and goals',
  },
  {
    id: 'planning',
    number: '02',
    title: 'Planning',
    description: 'Strategic creative direction and production roadmap',
  },
  {
    id: 'production',
    number: '03',
    title: 'Production',
    description: 'Cinematic capture with premium equipment',
  },
  {
    id: 'editing',
    number: '04',
    title: 'Editing',
    description: 'Post-production with color grading and sound design',
  },
  {
    id: 'delivery',
    number: '05',
    title: 'Delivery',
    description: 'Final files in multiple formats, ready to publish',
  },
];

export const STATS = [
  { number: '7+', label: 'Years of Experience' },
  { number: '150+', label: 'Projects Worldwide' },
  { number: '98%', label: 'Client Retention' },
  { number: '12', label: 'Countries' },
];

export const CLIENTS = [
  'DLF',
  'Godrej Properties',
  'Amazon Basics',
  'Hyatt',
  'Flame University',
  'Accor',
  'The Heart of Europe',
  'Terra Solis',
  'Jacob & Co',
  'Royal Enfield',
];