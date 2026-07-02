import { create } from 'zustand';

interface SceneState {
  // Active scroll world (0-4)
  activeWorld: number;
  setActiveWorld: (world: number) => void;

  // Camera scroll progress (0-1)
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;

  // Preloader state
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;

  // Menu state
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  activeWorld: 0,
  setActiveWorld: (world) => set({ activeWorld: world }),

  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),

  isLoaded: false,
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),

  isMenuOpen: false,
  setIsMenuOpen: (open) => set({ isMenuOpen: open }),
}));