import { type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

/** 태그용 알약(pill). 클릭 가능하게 쓰려면 onClick + role 부여. */
export function Chip({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-line bg-white/5 px-2.5 py-1',
        'text-xs text-fg-muted',
        className,
      )}
      {...props}
    />
  );
}
