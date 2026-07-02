import type { Metadata } from 'next';
import { SERVICES, SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Filmmaking, Event Coverage, 3D Renders, 2D & 3D Tours — cinematic storytelling and cutting-edge visualization for luxury real estate and hospitality brands.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <main className="pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-electric-blue font-general text-sm tracking-widest uppercase mb-4">
            What We Offer
          </p>
          <h1 className="font-space font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6">
            Our Services
          </h1>
          <p className="text-text-muted font-general text-lg max-w-2xl mx-auto">
            From cinematic storytelling to cutting-edge 3D visualization, we craft compelling visuals that enhance the way properties are showcased. Shoot. Aerial. 3D — all in one agency.
          </p>
        </div>

        <div className="space-y-6">
          {SERVICES.map((service) => (
            <a
              key={service.id}
              href={service.href}
              className="group glass rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-6 hover:border-electric-blue/30 transition-all duration-500"
            >
              <div className="flex items-center gap-6">
                <span className="text-5xl">{service.icon}</span>
                <div>
                  <h2 className="font-space font-bold text-2xl md:text-3xl group-hover:text-electric-blue transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-text-muted font-general text-sm mt-1 max-w-xl">
                    {service.description}
                  </p>
                </div>
              </div>
              <div className="md:ml-auto">
                <span className="inline-flex items-center gap-2 text-electric-blue text-sm font-general opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <span>→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}