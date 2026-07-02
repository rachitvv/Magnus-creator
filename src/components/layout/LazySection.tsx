'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function LazySection({ children, fallback = null }: LazySectionProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}

export const LazyCursor = dynamic(
  () => import('@/components/ui/SmoothCursor').then((m) => ({ default: m.SmoothCursor })),
  { ssr: false }
);
