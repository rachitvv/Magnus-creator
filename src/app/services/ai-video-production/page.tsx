import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Video Production',
  description:
    'AI commercials, AI product videos, AI fashion videos, AI social media ads, AI animation, AI talking avatar, AI cinematic content.',
  alternates: { canonical: '/services/ai-video-production' },
};

export default function AIPage() {
  return (
    <main className="pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-electric-blue font-general text-sm tracking-widest uppercase mb-4">
            Service 05
          </p>
          <h1 className="font-space font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6">
            <span className="text-5xl mr-3">🤖</span>
            AI Video Production
          </h1>
          <p className="text-text-muted font-general text-lg max-w-2xl mx-auto">
            AI Commercials, AI Product Videos, AI Fashion Videos, AI Social Media Ads, AI Animation, AI Talking Avatar, AI Cinematic Content.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {[
            { title: 'AI Commercials', desc: 'High-converting AI-generated TVCs and digital ads.' },
            { title: 'AI Product Videos', desc: 'Scalable product showcase videos with AI-enhanced visuals.' },
            { title: 'AI Fashion Videos', desc: 'Editorial fashion films generated with cutting-edge AI tools.' },
            { title: 'AI Social Media Ads', desc: 'Platform-optimized AI ads for Instagram, TikTok, YouTube.' },
            { title: 'AI Animation', desc: 'Animated content with AI motion and stylized art direction.' },
            { title: 'AI Talking Avatar', desc: 'Lifelike AI avatars for explainers, training, and onboarding.' },
            { title: 'AI Cinematic Content', desc: 'Cinematic AI films for luxury and lifestyle brands.' },
            { title: 'Personalization', desc: 'AI-personalized video for email and CRM campaigns.' },
            { title: 'Multilingual Dubbing', desc: 'AI-driven voice cloning and language adaptation.' },
          ].map((item, i) => (
            <div key={i} className="glass rounded-2xl p-8 border border-glass-border hover:border-electric-blue/40 transition-all duration-300">
              <h3 className="font-space font-bold text-xl mb-3">{item.title}</h3>
              <p className="text-text-muted font-general text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center glass rounded-2xl p-12 border border-glass-border">
          <h2 className="font-space font-bold text-3xl md:text-4xl mb-4">
            Future-proof your content
          </h2>
          <p className="text-text-muted font-general mb-8">
            Harness AI to scale your video production without losing cinematic quality.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-electric-blue text-bg font-general font-semibold hover:opacity-90 transition-opacity glow-blue text-lg"
          >
            Start with AI
          </a>
        </div>
      </div>
    </main>
  );
}