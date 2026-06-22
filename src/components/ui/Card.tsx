import { type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** hover 시 살짝 떠오르는 인터랙션 (클릭 가능한 카드에). */
  interactive?: boolean;
}

/** 기본 표면 컨테이너. 깊이는 그림자가 아닌 보더 + 표면색 대비로 만든다. */
export function Card({ interactive, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-line bg-surface',
        interactive &&
          'transition-transform duration-200 ease-out hover:-translate-y-1 hover:border-line-strong',
        className,
      )}
      {...props}
    />
  );
}
