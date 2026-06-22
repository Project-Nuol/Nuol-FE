import type { Webtoon } from '../types/webtoon';
import { cardGradient } from '../lib/gradient';
import { Badge, Card, Chip } from './ui';
import { TierBadge } from './TierBadge';

interface Props {
  webtoon: Webtoon;
  onClick?: (w: Webtoon) => void;
}

export function WebtoonCard({ webtoon, onClick }: Props) {
  const { title, author, genre, tags, oneLiner, tier, summary } = webtoon;
  const grad = cardGradient(title, genre, tier);

  // 한줄평이 없으면 줄거리요약으로 폴백하되, 시각적으로 구분(이탤릭+옅게).
  const hasOneLiner = Boolean(oneLiner);
  const bodyText = oneLiner ?? summary;
  const clickable = Boolean(onClick);

  return (
    <Card
      interactive={clickable}
      onClick={onClick ? () => onClick(webtoon) : undefined}
      className={clickable ? 'cursor-pointer overflow-hidden' : 'overflow-hidden'}
    >
      {/* 표지 대신 그라데이션 + 타이포 헤더 */}
      <div
        className="relative flex min-h-44 flex-col justify-between p-5"
        style={{ background: grad.background }}
      >
        <div className="flex items-start justify-between">
          <Badge tone="glass">{genre}</Badge>
          <TierBadge tier={tier} />
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-bold leading-tight text-white drop-shadow-sm">
            {title}
          </h3>
          {author && <p className="mt-1 text-sm text-white/75">{author}</p>}
        </div>
      </div>

      {/* 본문: 한줄평이 주인공 */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <blockquote
          className={
            hasOneLiner
              ? 'text-[15px] leading-relaxed text-zinc-200'
              : 'text-[14px] italic leading-relaxed text-fg-muted'
          }
        >
          {hasOneLiner && <span className="mr-1 text-fg-subtle">“</span>}
          {bodyText}
          {hasOneLiner && <span className="ml-0.5 text-fg-subtle">”</span>}
        </blockquote>

        <div className="mt-auto flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <Chip key={t}>#{t}</Chip>
          ))}
        </div>
      </div>
    </Card>
  );
}
