'use client';

// SVG-based brand logo components
// Since actual brand logos aren't in the project, these are stylized
// wordmark/emblem representations that suggest each brand identity.

import { ReactNode } from 'react';

interface LogoProps {
  className?: string;
}

const wrapperClass = 'flex-shrink-0 h-16 flex items-center justify-center px-8';

function LogoShell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`${wrapperClass} ${className}`}>{children}</div>;
}

export function DLFLogo({ className }: LogoProps) {
  return (
    <LogoShell className={className}>
      <svg viewBox="0 0 120 40" className="h-10 w-auto" fill="currentColor">
        <text x="0" y="32" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="32" letterSpacing="1">
          DLF
        </text>
        <polygon points="92,8 108,32 76,32" />
      </svg>
    </LogoShell>
  );
}

export function GodrejLogo({ className }: LogoProps) {
  return (
    <LogoShell className={className}>
      <svg viewBox="0 0 200 40" className="h-10 w-auto" fill="currentColor">
        <text x="0" y="28" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="600" fontSize="22">
          Godrej
        </text>
        <line x1="92" y1="14" x2="100" y2="14" stroke="currentColor" strokeWidth="1" />
        <text x="106" y="28" fontFamily="Arial, sans-serif" fontWeight="500" fontSize="16" letterSpacing="2">
          PROPERTIES
        </text>
        <circle cx="105" cy="32" r="2" />
      </svg>
    </LogoShell>
  );
}

export function AmazonBasicsLogo({ className }: LogoProps) {
  return (
    <LogoShell className={className}>
      <svg viewBox="0 0 200 40" className="h-9 w-auto" fill="currentColor">
        <text x="0" y="28" fontFamily="Arial, sans-serif" fontWeight="500" fontSize="26" letterSpacing="-0.5">
          amazonbasics
        </text>
        <path d="M 18 32 Q 100 44 180 32" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <polygon points="174,30 184,32 174,34" />
      </svg>
    </LogoShell>
  );
}

export function HyattLogo({ className }: LogoProps) {
  return (
    <LogoShell className={className}>
      <svg viewBox="0 0 140 40" className="h-10 w-auto" fill="currentColor">
        <text x="0" y="30" fontFamily="Georgia, serif" fontWeight="400" fontSize="32" letterSpacing="3">
          HYATT
        </text>
        <text x="125" y="14" fontFamily="Arial, sans-serif" fontSize="9">
          ®
        </text>
      </svg>
    </LogoShell>
  );
}

export function FlameUniversityLogo({ className }: LogoProps) {
  return (
    <LogoShell className={className}>
      <svg viewBox="0 0 180 50" className="h-12 w-auto" fill="currentColor">
        <text x="0" y="24" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="20" letterSpacing="1">
          FLAME
        </text>
        <text x="0" y="40" fontFamily="Arial, sans-serif" fontWeight="500" fontSize="11" letterSpacing="3">
          UNIVERSITY
        </text>
        <path d="M 120 8 L 120 36 L 140 22 Z" fill="currentColor" />
        <path d="M 145 12 L 145 32 L 165 22 Z" fill="currentColor" opacity="0.7" />
      </svg>
    </LogoShell>
  );
}

export function AccorLogo({ className }: LogoProps) {
  return (
    <LogoShell className={className}>
      <svg viewBox="0 0 160 40" className="h-9 w-auto" fill="currentColor">
        <text x="20" y="30" fontFamily="Arial, sans-serif" fontWeight="300" fontSize="26" letterSpacing="4">
          ACCOR
        </text>
        <path d="M 5 32 L 12 8 L 19 32 Z" />
        <rect x="10" y="20" width="4" height="3" fill="var(--bg, #050505)" />
      </svg>
    </LogoShell>
  );
}

export function HeartOfEuropeLogo({ className }: LogoProps) {
  return (
    <LogoShell className={className}>
      <svg viewBox="0 0 200 50" className="h-12 w-auto" fill="currentColor">
        <text x="100" y="20" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="400" fontSize="20">
          The
        </text>
        <text x="100" y="38" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="700" fontSize="20">
          Heart of
        </text>
        <text x="100" y="48" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="700" fontSize="14" letterSpacing="2">
          EUROPE
        </text>
      </svg>
    </LogoShell>
  );
}

export function TerraSolisLogo({ className }: LogoProps) {
  return (
    <LogoShell className={className}>
      <svg viewBox="0 0 200 60" className="h-14 w-auto" fill="currentColor">
        {/* Sun emblem */}
        <g transform="translate(20, 25)">
          <circle r="6" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1={Math.cos((angle * Math.PI) / 180) * 9}
              y1={Math.sin((angle * Math.PI) / 180) * 9}
              x2={Math.cos((angle * Math.PI) / 180) * 14}
              y2={Math.sin((angle * Math.PI) / 180) * 14}
              stroke="currentColor"
              strokeWidth="1.5"
            />
          ))}
        </g>
        <text x="45" y="28" fontFamily="Georgia, serif" fontWeight="400" fontSize="20" letterSpacing="3">
          TERRA SOLIS
        </text>
        <text x="45" y="44" fontFamily="Arial, sans-serif" fontWeight="500" fontSize="9" letterSpacing="2">
          DESERT DESTINATION
        </text>
      </svg>
    </LogoShell>
  );
}

export function JacobCoLogo({ className }: LogoProps) {
  return (
    <LogoShell className={className}>
      <svg viewBox="0 0 120 50" className="h-12 w-auto" fill="currentColor">
        <text x="60" y="30" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="700" fontSize="34">
          J&amp;Co
        </text>
        <text x="60" y="44" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="500" fontSize="8" letterSpacing="2">
          JACOB&amp;CO
        </text>
      </svg>
    </LogoShell>
  );
}

export function RoyalEnfieldLogo({ className }: LogoProps) {
  return (
    <LogoShell className={className}>
      <svg viewBox="0 0 220 40" className="h-9 w-auto" fill="currentColor">
        <text x="0" y="28" fontFamily="Georgia, serif" fontWeight="700" fontSize="24" letterSpacing="1">
          ROYAL ENFIELD
        </text>
        <line x1="0" y1="34" x2="190" y2="34" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </LogoShell>
  );
}

export const ALL_LOGOS = [
  { Component: DLFLogo, key: 'dlf' },
  { Component: GodrejLogo, key: 'godrej' },
  { Component: AmazonBasicsLogo, key: 'amazonbasics' },
  { Component: HyattLogo, key: 'hyatt' },
  { Component: FlameUniversityLogo, key: 'flame' },
  { Component: AccorLogo, key: 'accor' },
  { Component: HeartOfEuropeLogo, key: 'heart-of-europe' },
  { Component: TerraSolisLogo, key: 'terra-solis' },
  { Component: JacobCoLogo, key: 'jacob-co' },
  { Component: RoyalEnfieldLogo, key: 'royal-enfield' },
];
