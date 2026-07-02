'use client';

import { useMagneticEffect } from '@/components/animations/useMagneticEffect';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const variantClasses = {
  primary: 'bg-electric-blue text-bg hover:opacity-90 glow-blue',
  outline:
    'border border-glass-border text-white hover:border-electric-blue glass',
  ghost: 'text-text-muted hover:text-white',
  glass:
    'glass border border-glass-border text-white hover:border-electric-blue/30',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-10 py-5 text-lg',
};

export function MagneticButton({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
}: MagneticButtonProps) {
  const ref = useMagneticEffect(0.25);

  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-full font-general transition-all duration-300',
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = {
    transition:
      'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s, background-color 0.3s',
  };

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={classes}
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={classes}
      style={style}
    >
      {children}
    </button>
  );
}