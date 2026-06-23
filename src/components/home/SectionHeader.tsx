import { Link } from 'react-router-dom';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  /** 우측 "더보기" 링크 경로 (옵션) */
  moreHref?: string;
  moreLabel?: string;
}

/** 홈/리스트의 섹션 제목 줄. 확장 시 새 섹션도 이걸 재사용. */
export function SectionHeader({ title, subtitle, moreHref, moreLabel = '더보기' }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold text-fg">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-fg-muted">{subtitle}</p>}
      </div>
      {moreHref && (
        <Link
          to={moreHref}
          className="shrink-0 text-sm text-fg-muted transition-colors hover:text-brand-400"
        >
          {moreLabel} →
        </Link>
      )}
    </div>
  );
}
