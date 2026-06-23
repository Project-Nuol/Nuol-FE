import { cn } from '../lib/cn';

// 너울(Nuol) 공식 심볼. 원본 비율/색 불변 — 여백만 트림한 최적화 파생본.
// (원본 SVG는 public/brand/logo-symbol.svg 에 보존)
const SYMBOL_SRC = '/brand/logo-symbol.png';

interface LogoProps {
  /** 심볼 높이(px). default 28 */
  size?: number;
  /** 'symbol' = 심볼 단독, 'lockup' = 심볼 + 영문 워드마크 "Nuol" */
  variant?: 'symbol' | 'lockup';
  /** lockup 배치 방향. default 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Logo({
  size = 28,
  variant = 'symbol',
  orientation = 'horizontal',
  className,
}: LogoProps) {
  // 워드마크 "Nuol"은 반드시 웹폰트 텍스트(Pretendard)로 렌더 (이미지/AI 생성 금지).
  const symbol = (
    <img
      src={SYMBOL_SRC}
      alt=""
      aria-hidden
      draggable={false}
      style={{ height: size, width: 'auto' }}
      className="block select-none"
    />
  );

  if (variant === 'symbol') {
    return (
      <span role="img" aria-label="Nuol" className={cn('inline-flex', className)}>
        {symbol}
      </span>
    );
  }

  return (
    <span
      role="img"
      aria-label="Nuol"
      className={cn(
        'inline-flex',
        orientation === 'vertical'
          ? 'flex-col items-center gap-1'
          : 'flex-row items-center gap-2',
        className,
      )}
    >
      {symbol}
      <span
        style={{ fontSize: Math.round(size * 0.92) }}
        className="font-semibold leading-none tracking-tight text-current"
      >
        Nuol
      </span>
    </span>
  );
}
