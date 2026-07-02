'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSceneStore } from '@/store/sceneStore';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import Link from 'next/link';

export function MobileMenu() {
  const isMenuOpen = useSceneStore((s) => s.isMenuOpen);
  const setIsMenuOpen = useSceneStore((s) => s.setIsMenuOpen);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [setIsMenuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setIsMenuOpen]);

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 z-[60] bg-bg flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  className="font-space text-3xl font-bold tracking-wide hover:text-electric-blue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.08 }}
            >
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-electric-blue text-bg font-general font-medium"
              >
                Get in Touch
              </a>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}