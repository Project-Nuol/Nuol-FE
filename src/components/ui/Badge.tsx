import { type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

type Tone = 'neutral' | 'brand' | 'glass';

const TONES: Record<Tone, string> = {
  neutral: 'bg-surface-2 text-fg-muted border border-line',
  brand: 'bg-brand-500/15 text-brand-300 border border-brand-500/25',
  glass: 'bg-black/30 text-white/85 backdrop-blur-sm',
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

/** 작은 상태/메타 라벨 (장르, 카운트 등). */
export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium tracking-wide',
        TONES[tone],
        className,
      )}
      {...props}
    />
  );
}
