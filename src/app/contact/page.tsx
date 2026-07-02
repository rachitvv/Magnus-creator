import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Magnus Creators to discuss your next cinematic project.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main className="pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-electric-blue font-general text-sm tracking-widest uppercase mb-4">
            Get in Touch
          </p>
          <h1 className="font-space font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6">
            Let&apos;s Create Together
          </h1>
          <p className="text-text-muted font-general text-lg max-w-2xl mx-auto">
            Have a project in mind? We&apos;d love to hear about it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <form className="space-y-6">
            <div>
              <label className="block font-general text-sm tracking-wide text-text-muted mb-2">
                Your Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-glass-fill border border-glass-border rounded-lg px-4 py-3 font-general text-white placeholder:text-text-muted/50 focus:outline-none focus:border-electric-blue transition-colors"
              />
            </div>
            <div>
              <label className="block font-general text-sm tracking-wide text-text-muted mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full bg-glass-fill border border-glass-border rounded-lg px-4 py-3 font-general text-white placeholder:text-text-muted/50 focus:outline-none focus:border-electric-blue transition-colors"
              />
            </div>
            <div>
              <label className="block font-general text-sm tracking-wide text-text-muted mb-2">
                Service Interested In
              </label>
              <select className="w-full bg-glass-fill border border-glass-border rounded-lg px-4 py-3 font-general text-white focus:outline-none focus:border-electric-blue transition-colors">
                <option value="">Select a service</option>
                <option value="filmmaking">Film Making</option>
                <option value="event-coverage">Event Coverage</option>
                <option value="3d-rendering">3D Rendering</option>
                <option value="2d-3d-tours">2D & 3D Tours</option>
                <option value="ai-video-production">AI Video Production</option>
              </select>
            </div>
            <div>
              <label className="block font-general text-sm tracking-wide text-text-muted mb-2">
                Project Details
              </label>
              <textarea
                rows={5}
                placeholder="Tell us about your project..."
                className="w-full bg-glass-fill border border-glass-border rounded-lg px-4 py-3 font-general text-white placeholder:text-text-muted/50 focus:outline-none focus:border-electric-blue transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 rounded-full bg-electric-blue text-bg font-general font-semibold hover:opacity-90 transition-opacity glow-blue"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass rounded-2xl p-8">
              <h3 className="font-space font-bold text-xl mb-4">Contact Info</h3>
              <div className="space-y-4">
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 text-text-muted hover:text-electric-blue transition-colors"
                >
                  <span>{SITE_CONFIG.email}</span>
                </a>
                <a
                  href={SITE_CONFIG.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-muted hover:text-electric-blue transition-colors"
                >
                  <span>{SITE_CONFIG.phone}</span>
                </a>
              </div>
            </div>

            <div className="glass rounded-2xl p-8">
              <h3 className="font-space font-bold text-xl mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href={SITE_CONFIG.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center hover:border-electric-blue transition-colors"
                >
                  <span className="text-lg">📸</span>
                </a>
                <a
                  href={SITE_CONFIG.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center hover:border-electric-blue transition-colors"
                >
                  <span className="text-lg">💼</span>
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="glass rounded-2xl aspect-video flex items-center justify-center border border-glass-border">
              <p className="text-text-muted text-sm font-general">
                Google Maps Integration
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}