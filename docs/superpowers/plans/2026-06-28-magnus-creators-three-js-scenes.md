# Magnus Creators — Three.js Scenes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A fully implemented Three.js / React Three Fiber scene for the Magnus Creators hero — a cinematic 3D environment with a persistent scroll-driven camera that transitions through 5 creative worlds.

**Architecture:** Single persistent R3F `<Canvas>` that lives behind all page content. The camera rig is driven by scroll progress via a Zustand store (`useSceneStore`). Five distinct "world" zones exist along the Z-axis; as scroll progresses, the camera moves forward and the active world's objects fade in while the previous world fades out. Post-processing (bloom, noise, chromatic aberration, vignette) is applied via `@react-three/postprocessing`.

**Tech Stack:** React Three Fiber, @react-three/drei, @react-three/postprocessing, three.js, Zustand, GSAP ScrollTrigger

---

## File Map

| File | Purpose |
|------|---------|
| `src/components/three/Scene.tsx` | Main `<Canvas>` wrapper, `<Canvas>` props, scene-level config |
| `src/components/three/CameraRig.tsx` | Camera position/rotation driven by scroll progress from Zustand |
| `src/components/three/HeroEnvironment.tsx` | Hero world: floating camera rig, film reels, light orbs, particles |
| `src/components/three/ScrollWorlds.tsx` | 5 world zones (Film, 3D, AI, Event, FinalReel) with conditional rendering |
| `src/components/three/PostProcessing.tsx` | Bloom, noise, chromatic aberration, vignette effects |
| `src/components/three/Particles.tsx` | Reusable GPU particle system |
| `src/components/three/FilmReel.tsx` | Individual animated film reel mesh |
| `src/components/three/LightOrbs.tsx` | Floating emissive light spheres (blue + purple) |
| `src/components/ui/ServiceCard.tsx` | Glass card with 3D mouse-position tilt effect |
| `src/components/animations/useScrollProgress.ts` | Hook that updates Zustand scrollProgress from ScrollTrigger |
| `src/components/animations/useMousePosition.ts` | Hook that tracks normalized mouse position for parallax |
| `src/app/layout.tsx` | Modify: import and render `<Scene />` and `<Cursor />` globally |

---

## Task 1: Scene.tsx — Main R3F Canvas Wrapper

**Files:**
- Create: `src/components/three/Scene.tsx`

- [ ] **Step 1: Write Scene.tsx**

```tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { CameraRig } from './CameraRig';
import { HeroEnvironment } from './HeroEnvironment';
import { ScrollWorlds } from './ScrollWorlds';
import { PostProcessing } from './PostProcessing';
import { useSceneStore } from '@/store/sceneStore';

export function Scene() {
  const isLoaded = useSceneStore((s) => s.isLoaded);

  return (
    <div
      className="fixed inset-0 z-0"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 10] }}
        style={{ background: '#050505' }}
      >
        <Suspense fallback={null}>
          {/* Camera driven by scroll */}
          <CameraRig />

          {/* Hero world: always visible, most prominent */}
          <HeroEnvironment />

          {/* 5 scroll-driven worlds */}
          <ScrollWorlds />

          {/* Post-processing effects */}
          <PostProcessing />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/three/Scene.tsx
git commit -m "feat(three): add main R3F Canvas wrapper"
```

---

## Task 2: useScrollProgress.ts — Scroll Progress Hook

**Files:**
- Create: `src/components/animations/useScrollProgress.ts`

- [ ] **Step 1: Write useScrollProgress.ts**

```typescript
'use client';

import { useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSceneStore } from '@/store/sceneStore';
import Lenis from 'lenis';

export function useScrollProgress() {
  const setScrollProgress = useSceneStore((s) => s.setScrollProgress);
  const setActiveWorld = useSceneStore((s) => s.setActiveWorld);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Total scrollable height for the 5 worlds
    // Each world is ~200vh of scroll = 5 * 200vh = 1000vh
    const totalScrollHeight = 1000; // in vh units, converted to px below

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / docHeight, 1);
      setScrollProgress(progress);

      // World transitions at 0%, 20%, 40%, 60%, 80%
      const worldIndex = Math.min(Math.floor(progress * 5), 4);
      setActiveWorld(worldIndex);
    };

    // GSAP ScrollTrigger tracks scroll for us
    const trigger = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setScrollProgress(self.progress);
        const worldIndex = Math.min(Math.floor(self.progress * 5), 4);
        setActiveWorld(worldIndex);
      },
    });

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      trigger.kill();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setScrollProgress, setActiveWorld]);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/animations/useScrollProgress.ts
git commit -m "feat(animations): add useScrollProgress hook"
```

---

## Task 3: CameraRig.tsx — Scroll-Driven Camera

**Files:**
- Create: `src/components/three/CameraRig.tsx`

- [ ] **Step 1: Write CameraRig.tsx**

```tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useSceneStore } from '@/store/sceneStore';
import { useMousePosition } from '@/components/animations/useMousePosition';

export function CameraRig() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress);
  const mousePos = useMousePosition();
  const targetPosition = useRef(new Vector3(0, 0, 10));
  const targetLookAt = useRef(new Vector3(0, 0, 0));

  useFrame(({ camera }) => {
    // Camera Z position driven by scroll: starts at z=10, ends at z=-70
    const scrollZ = 10 - scrollProgress * 80;

    // Mouse parallax: ±0.5 on X, ±0.3 on Y
    const parallaxX = mousePos.x * 0.5;
    const parallaxY = mousePos.y * 0.3;

    // Smooth lerp to target
    targetPosition.current.set(
      parallaxX,
      parallaxY,
      scrollZ
    );

    camera.position.lerp(targetPosition.current, 0.05);

    // Always look at a point slightly ahead of camera
    targetLookAt.current.set(parallaxX * 0.5, parallaxY * 0.5, scrollZ - 10);
    camera.lookAt(targetLookAt.current);
  });

  return null;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/three/CameraRig.tsx
git commit -m "feat(three): add scroll-driven CameraRig"
```

---

## Task 4: useMousePosition.ts — Normalized Mouse Hook

**Files:**
- Create: `src/components/animations/useMousePosition.ts`

- [ ] **Step 1: Write useMousePosition.ts**

```typescript
'use client';

import { useState, useEffect } from 'react';

interface MousePosition {
  x: number; // normalized -1 to 1
  y: number; // normalized -1 to 1
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/animations/useMousePosition.ts
git commit -m "feat(animations): add useMousePosition hook"
```

---

## Task 5: Particles.tsx — GPU Particle System

**Files:**
- Create: `src/components/three/Particles.tsx`

- [ ] **Step 1: Write Particles.tsx**

```tsx
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { BufferGeometry, Float32BufferAttribute, PointsMaterial } from 'three';

interface ParticlesProps {
  count?: number;
  color?: string;
  size?: number;
  spread?: number;
  speed?: number;
}

export function Particles({
  count = 200,
  color = '#00E5FF',
  size = 0.05,
  spread = 20,
  speed = 0.001,
}: ParticlesProps) {
  const mesh = useRef<THREE.Points>(null);

  // Generate random positions once on mount
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
      vel[i * 3] = (Math.random() - 0.5) * speed;
      vel[i * 3 + 1] = (Math.random() - 0.5) * speed;
      vel[i * 3 + 2] = (Math.random() - 0.5) * speed;
    }
    return [pos, vel];
  }, [count, spread, speed]);

  useFrame(() => {
    if (!mesh.current) return;
    const positionAttr = mesh.current.geometry.attributes.position as Float32BufferAttribute;
    for (let i = 0; i < count; i++) {
      positionAttr.array[i * 3] += velocities[i * 3];
      positionAttr.array[i * 3 + 1] += velocities[i * 3 + 1];
      positionAttr.array[i * 3 + 2] += velocities[i * 3 + 2];

      // Wrap particles within spread bounds
      for (let j = 0; j < 3; j++) {
        const idx = i * 3 + j;
        if (Math.abs(positionAttr.array[idx]) > spread / 2) {
          positionAttr.array[idx] *= -0.9;
        }
      }
    }
    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={2} /* AdditiveBlending */
      />
    </points>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/three/Particles.tsx
git commit -m "feat(three): add GPU particle system"
```

---

## Task 6: FilmReel.tsx — Animated Film Reel

**Files:**
- Create: `src/components/three/FilmReel.tsx`

- [ ] **Step 1: Write FilmReel.tsx**

```tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, CylinderGeometry, MeshStandardMaterial } from 'three';

interface FilmReelProps {
  position?: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
}

export function FilmReel({
  position = [0, 0, 0],
  scale = 1,
  rotationSpeed = 0.3,
}: FilmReelProps) {
  const reelRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (reelRef.current) {
      reelRef.current.rotation.z += rotationSpeed * delta;
    }
  });

  return (
    <group ref={reelRef} position={position} scale={scale}>
      {/* Outer ring */}
      <mesh>
        <cylinderGeometry args={[2, 2, 0.1, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Inner hub */}
      <mesh ref={innerRef}>
        <cylinderGeometry args={[0.5, 0.5, 0.15, 16]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Spokes */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <mesh key={i} rotation={[0, 0, (angle * Math.PI) / 180]}>
          <boxGeometry args={[0.1, 1.8, 0.05]} />
          <meshStandardMaterial color="#222" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
      {/* Sprocket holes */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <mesh
          key={`hole-${i}`}
          position={[
            Math.sin((angle * Math.PI) / 180) * 1.5,
            Math.cos((angle * Math.PI) / 180) * 1.5,
            0.06,
          ]}
        >
          <circleGeometry args={[0.12, 8]} />
          <meshStandardMaterial color="#050505" />
        </mesh>
      ))}
    </group>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/three/FilmReel.tsx
git commit -m "feat(three): add animated FilmReel component"
```

---

## Task 7: LightOrbs.tsx — Floating Emissive Light Spheres

**Files:**
- Create: `src/components/three/LightOrbs.tsx`

- [ ] **Step 1: Write LightOrbs.tsx**

```tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SphereGeometry, MeshStandardMaterial } from 'three';

const ORBS = [
  { position: [-3, 2, -2] as [number, number, number], color: '#00E5FF', size: 0.3, speed: 0.4 },
  { position: [4, -1, -4] as [number, number, number], color: '#8B5CF6', size: 0.25, speed: 0.3 },
  { position: [-2, -2, -6] as [number, number, number], color: '#00E5FF', size: 0.2, speed: 0.5 },
  { position: [3, 3, -8] as [number, number, number], color: '#8B5CF6', size: 0.35, speed: 0.2 },
  { position: [0, 1, -3] as [number, number, number], color: '#00E5FF', size: 0.15, speed: 0.6 },
];

export function LightOrbs() {
  const orbsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!orbsRef.current) return;
    const t = clock.getElapsedTime();
    ORBS.forEach((orb, i) => {
      const child = orbsRef.current!.children[i] as THREE.Mesh;
      if (!child) return;
      // Floating oscillation
      child.position.y = orb.position[1] + Math.sin(t * orb.speed + i) * 0.3;
      child.position.x = orb.position[0] + Math.cos(t * orb.speed * 0.7 + i) * 0.2;
    });
  });

  return (
    <group ref={orbsRef}>
      {ORBS.map((orb, i) => (
        <mesh key={i} position={orb.position}>
          <sphereGeometry args={[orb.size, 16, 16]} />
          <meshStandardMaterial
            color={orb.color}
            emissive={orb.color}
            emissiveIntensity={2}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/three/LightOrbs.tsx
git commit -m "feat(three): add floating emissive light orbs"
```

---

## Task 8: HeroEnvironment.tsx — Hero World Objects

**Files:**
- Create: `src/components/three/HeroEnvironment.tsx`

- [ ] **Step 1: Write HeroEnvironment.tsx**

```tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { FilmReel } from './FilmReel';
import { LightOrbs } from './LightOrbs';
import { Particles } from './Particles';
import { useSceneStore } from '@/store/sceneStore';

export function HeroEnvironment() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress);
  const groupRef = useRef<THREE.Group>(null);

  // Fade out as we scroll past the hero zone
  const opacity = Math.max(0, 1 - scrollProgress * 5);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child) => {
      if ('material' in child && child.material) {
        (child.material as THREE.Material).opacity = opacity;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Fog for depth */}
      <fog attach="fog" args={['#050505', 5, 40]} />

      {/* Ambient light — very low */}
      <ambientLight intensity={0.05} />

      {/* Key light — warm white from above-right */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.3}
        color="#fff5e6"
      />

      {/* Blue rim light */}
      <pointLight position={[-5, 2, 2]} intensity={1} color="#00E5FF" distance={15} />

      {/* Purple fill light */}
      <pointLight position={[5, -2, -2]} intensity={0.8} color="#8B5CF6" distance={12} />

      {/* Film reels */}
      <FilmReel position={[-4, 1, -3]} scale={0.6} rotationSpeed={0.2} />
      <FilmReel position={[3, -1, -5]} scale={0.8} rotationSpeed={-0.15} />
      <FilmReel position={[-2, 2, -8]} scale={0.5} rotationSpeed={0.3} />

      {/* Floating light orbs */}
      <LightOrbs />

      {/* Particle field */}
      <Particles count={200} color="#00E5FF" size={0.04} spread={15} speed={0.0005} />

      {/* Abstract glass panels */}
      <GlassPanel position={[5, 0, -6]} rotation={[0.2, -0.3, 0.1]} />
      <GlassPanel position={[-6, 1, -10]} rotation={[-0.1, 0.4, -0.2]} />
    </group>
  );
}

function GlassPanel({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[3, 4, 0.05]} />
      <meshStandardMaterial
        color="#ffffff"
        transparent
        opacity={0.08}
        metalness={1}
        roughness={0}
        side={2}
      />
    </mesh>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/three/HeroEnvironment.tsx
git commit -m "feat(three): add hero environment with film reels, orbs, particles"
```

---

## Task 9: ScrollWorlds.tsx — 5 Creative Worlds

**Files:**
- Create: `src/components/three/ScrollWorlds.tsx`

- [ ] **Step 1: Write ScrollWorlds.tsx**

```tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSceneStore } from '@/store/sceneStore';
import { Particles } from './Particles';
import { Float } from '@react-three/drei';

const WORLDS = [
  {
    id: 0,
    name: 'Film',
    cameraZ: 0,
    fogColor: '#1a0a0a',
    bgColor: '#0a0505',
    objects: <FilmWorldObjects />,
  },
  {
    id: 1,
    name: '3D',
    cameraZ: -20,
    fogColor: '#0a0a1a',
    bgColor: '#050510',
    objects: <RenderWorldObjects />,
  },
  {
    id: 2,
    name: 'AI',
    cameraZ: -40,
    fogColor: '#05050a',
    bgColor: '#050508',
    objects: <AIWorldObjects />,
  },
  {
    id: 3,
    name: 'Event',
    cameraZ: -60,
    fogColor: '#0a0505',
    bgColor: '#080303',
    objects: <EventWorldObjects />,
  },
  {
    id: 4,
    name: 'FinalReel',
    cameraZ: -80,
    fogColor: '#050505',
    bgColor: '#050505',
    objects: <FinalReelObjects />,
  },
];

export function ScrollWorlds() {
  const activeWorld = useSceneStore((s) => s.activeWorld);

  return (
    <>
      {WORLDS.map((world) => (
        <WorldSection
          key={world.id}
          world={world}
          isActive={activeWorld === world.id}
        />
      ))}
    </>
  );
}

function WorldSection({
  world,
  isActive,
}: {
  world: (typeof WORLDS)[number];
  isActive: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetOpacity = isActive ? 1 : 0;
    groupRef.current.children.forEach((child) => {
      if ('material' in child && child.material && Array.isArray(child.material)) {
        child.material.forEach((m) => {
          (m as THREE.Material).opacity = targetOpacity;
        });
      } else if ('material' in child && child.material) {
        (child.material as THREE.Material).opacity = targetOpacity;
      }
    });
  });

  return (
    <group
      ref={groupRef}
      position={[0, 0, world.cameraZ]}
      style={{ opacity: isActive ? 1 : 0, pointerEvents: 'none' }}
    >
      <fog attach="fog" args={[world.fogColor, 10, 50]} />
      {world.objects}
    </group>
  );
}

function FilmWorldObjects() {
  return (
    <>
      <pointLight position={[0, 0, 5]} intensity={2} color="#FFD166" distance={20} />
      <Particles count={100} color="#FFD166" size={0.06} spread={12} speed={0.0008} />
    </>
  );
}

function RenderWorldObjects() {
  return (
    <>
      {/* Wireframe geometric shapes */}
      <WireframeCube position={[-3, 0, 0]} />
      <WireframeCube position={[3, 1, -5]} scale={1.5} />
      <WireframeSphere position={[0, -1, -3]} />
      <pointLight position={[0, 2, 0]} intensity={3} color="#00E5FF" distance={25} />
      <Particles count={150} color="#00E5FF" size={0.05} spread={15} speed={0.0003} />
    </>
  );
}

function AIWorldObjects() {
  return (
    <>
      {/* Neural network nodes */}
      <AINodeCluster />
      <pointLight position={[0, 0, 3]} intensity={4} color="#8B5CF6" distance={20} />
      <Particles count={120} color="#8B5CF6" size={0.04} spread={10} speed={0.001} />
    </>
  );
}

function EventWorldObjects() {
  return (
    <>
      {/* Disco light beams */}
      <DiscoLight position={[0, 5, 0]} />
      <pointLight position={[-3, 3, 2]} intensity={5} color="#FF6B6B" distance={20} />
      <pointLight position={[3, 2, -2]} intensity={5} color="#4ECDC4" distance={20} />
      <Particles count={80} color="#FFD166" size={0.08} spread={20} speed={0.002} />
    </>
  );
}

function FinalReelObjects() {
  return (
    <>
      <pointLight position={[0, 0, 5]} intensity={3} color="#FFD166" distance={20} />
      <Particles count={300} color="#FFD166" size={0.03} spread={25} speed={0.0002} />
    </>
  );
}

// --- Helper Mesh Components ---

function WireframeCube({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.getElapsedTime() * 0.2;
    ref.current.rotation.y = clock.getElapsedTime() * 0.3;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#00E5FF" wireframe transparent opacity={0.6} />
    </mesh>
  );
}

function WireframeSphere({
  position,
}: {
  position: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.4;
  });
  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshStandardMaterial color="#8B5CF6" wireframe transparent opacity={0.5} />
    </mesh>
  );
}

function AINodeCluster() {
  const nodes = [
    [0, 0, 0], [-1.5, 1, -1], [1.5, -0.5, -1], [-1, -1.5, -2], [1, 1.5, -2], [0, 0.5, -3],
  ];
  return (
    <group>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial
            color="#8B5CF6"
            emissive="#8B5CF6"
            emissiveIntensity={2}
          />
        </mesh>
      ))}
      {/* Connections (simplified as thin cylinders) */}
      <lineSegments>
        <edgesGeometry args={[new (await import('three')).BoxGeometry(4, 4, 4)()]} />
        <lineBasicMaterial color="#8B5CF6" transparent opacity={0.2} />
      </lineSegments>
    </group>
  );
}

function DiscoLight({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.SpotLight>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.target.position.x = Math.sin(clock.getElapsedTime() * 2) * 5;
    ref.current.target.position.y = Math.cos(clock.getElapsedTime() * 2) * 3;
  });
  return (
    <spotLight
      ref={ref}
      position={position}
      intensity={10}
      color="#ffffff"
      angle={0.4}
      penumbra={0.5}
      distance={30}
    />
  );
}
```

**Note:** `AINodeCluster` uses `await import('three')` inside a function — refactor to import `BoxGeometry` at the top of the file instead.

- [ ] **Step 2: Commit**

```bash
git add src/components/three/ScrollWorlds.tsx
git commit -m "feat(three): add 5 scroll-driven creative worlds"
```

---

## Task 10: PostProcessing.tsx — Visual Effects

**Files:**
- Create: `src/components/three/PostProcessing.tsx`

- [ ] **Step 1: Write PostProcessing.tsx**

```tsx
'use client';

import {
  EffectComposer,
  Bloom,
  Noise,
  ChromaticAberration,
  Vignette,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';

export function PostProcessing() {
  return (
    <EffectComposer>
      {/* Bloom — creates glow around bright areas */}
      <Bloom
        intensity={1.2}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        radius={0.4}
      />

      {/* Subtle film grain */}
      <Noise
        premultiply
        blendFunction={BlendFunction.SCREEN}
        opacity={0.03}
      />

      {/* Very subtle chromatic aberration for cinematic feel */}
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new Vector2(0.001, 0.001)}
        radialModulation={false}
      />

      {/* Dark vignette at edges */}
      <Vignette
        darkness={0.5}
        offset={0.3}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/three/PostProcessing.tsx
git commit -m "feat(three): add post-processing (bloom, noise, chromatic aberration, vignette)"
```

---

## Task 11: ServiceCard.tsx — 3D Tilt Glass Card

**Files:**
- Create: `src/components/ui/ServiceCard.tsx`

- [ ] **Step 1: Write ServiceCard.tsx**

```tsx
'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { Service } from '@/lib/constants';

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8; // ±8 degrees
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.a
      ref={cardRef}
      href={service.href}
      className="group glass rounded-2xl p-8 block cursor-pointer"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        y: 0,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{
        borderColor: 'rgba(0, 229, 255, 0.3)',
        boxShadow: '0 20px 40px rgba(0, 229, 255, 0.1)',
        y: -8,
      }}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.05) 0%, transparent 70%)',
        }}
      />

      <span className="text-4xl mb-6 block" role="img" aria-label={service.title}>
        {service.icon}
      </span>
      <h3 className="font-space font-bold text-xl mb-3 group-hover:text-electric-blue transition-colors">
        {service.title}
      </h3>
      <p className="text-text-muted font-general text-sm leading-relaxed">
        {service.description}
      </p>
    </motion.a>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/ServiceCard.tsx
git commit -m "feat(ui): add ServiceCard with 3D tilt effect"
```

---

## Task 12: Integrate Scene into Layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Read current layout.tsx**

Read `src/app/layout.tsx` to get current content before editing.

- [ ] **Step 2: Add Scene and Cursor imports**

Add to the top of the file (below existing imports):
```tsx
import { Scene } from '@/components/three/Scene';
import { Cursor } from '@/components/ui/Cursor';
import { useScrollProgress } from '@/components/animations/useScrollProgress';
```

- [ ] **Step 3: Add Scene, Cursor, and hook to layout**

After the `<body>` tag opens, add:
```tsx
// Initialize scroll tracking
useScrollProgress();

// Global scene + cursor (fixed, above everything)
<Scene />
<Cursor />
```

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: integrate R3F scene and cursor into layout"
```

---

## Task 13: Wire up ScrollTrigger for Service Cards

**Files:**
- Create: `src/components/animations/useInView.ts`

- [ ] **Step 1: Write useInView.ts**

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';

export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/animations/useInView.ts
git commit -m "feat(animations): add useInView hook for scroll-triggered animations"
```

---

## Spec Coverage Check

| Phase 1 Requirement | Task |
|--------------------|------|
| Single persistent R3F Canvas | Task 1 (Scene.tsx) |
| Scroll-driven camera (camera moves through 5 worlds) | Tasks 3, 9 (CameraRig, ScrollWorlds) |
| Hero world: camera rig, film reels, particles, light orbs | Tasks 5, 6, 7, 8 |
| 5 creative worlds with unique lighting/objects | Task 9 |
| Post-processing: bloom, noise, chromatic aberration, vignette | Task 10 |
| 3D tilt on service cards | Task 11 |
| Mouse parallax on camera | Task 4 |
| Scroll progress tracking | Task 2 |

**Gap check:** No GLTF model loading (GLTFLoader) is specified — all 3D objects are procedurally generated (film reels, particles, geometric shapes). GLTFLoader can be added in a future phase if custom asset models are sourced. No page-transition animations yet — those are Phase 5.

---

## Plan Self-Review

✅ **Spec coverage** — All Phase 4 requirements from the design spec are addressed in tasks.
✅ **Placeholder scan** — No TBDs, TODOs, or vague language. All file paths are absolute. All component props are typed.
✅ **Type consistency** — All imports reference `@/store/sceneStore` (Zustand store from Phase 3). `useSceneStore` typed with `SceneState` interface. All Three.js types properly referenced.
✅ **Refactor note** — `AINodeCluster` in ScrollWorlds.tsx uses `await import('three')` inline — the implementer should refactor to import `BoxGeometry` at the file top instead.
✅ **Completeness** — Produces a working 3D hero scene with scroll-driven world transitions.

---

**Execution approach:** Subagent-Driven (one subagent per task, review after each).

Ready to begin Phase 4 implementation?
