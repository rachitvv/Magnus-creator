'use client';

import { useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSceneStore } from '@/store/sceneStore';

export function useScrollProgress() {
  const setScrollProgress = useSceneStore((s) => s.setScrollProgress);
  const setActiveWorld = useSceneStore((s) => s.setActiveWorld);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const trigger = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setScrollProgress(self.progress);
        const worldIndex = Math.min(Math.floor(self.progress * 5), 4);
        setActiveWorld(worldIndex);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [setScrollProgress, setActiveWorld]);
}
