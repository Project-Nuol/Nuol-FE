import { type Tier, TIER_META } from '../types/webtoon';
import { cn } from '../lib/cn';

interface TierBadgeProps {
  tier: Tier | null;
  className?: string;
}

/** 티어(A/B/C/D) 배지. null이면 "아직 평가 안 함" 표식(—). */
export function TierBadge({ tier, className }: TierBadgeProps) {
  if (!tier) {
    return (
      <span
        title="아직 평가하지 않음"
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg border border-white/25 text-sm font-medium text-white/60 backdrop-blur-sm',
          className,
        )}
      >
        —
      </span>
    );
  }
  return (
    <span
      title={TIER_META[tier].label}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-lg bg-black/35 text-lg font-black text-white backdrop-blur-sm',
        className,
      )}
    >
      {tier}
    </span>
  );
}
