'use client';

import { motion } from 'framer-motion';
import { useMagneticEffect } from '@/components/animations/useMagneticEffect';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

export function ServiceCard({ icon, title, description, index }: ServiceCardProps) {
  const ref = useMagneticEffect(0.15);

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-2xl p-8 md:p-10 group hover:border-electric-blue/40 transition-all duration-500"
    >
      <div className="text-5xl mb-6">{icon}</div>
      <h3 className="font-space font-bold text-2xl md:text-3xl mb-3 group-hover:text-electric-blue transition-colors">
        {title}
      </h3>
      <p className="text-text-muted font-general text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}