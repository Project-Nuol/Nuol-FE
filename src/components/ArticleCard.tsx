import { Link } from 'react-router-dom';
import type { Article } from '../lib/articles';
import { articleGradient } from '../lib/gradient';
import { Badge, Card, Chip } from './ui';

interface Props {
  article: Article;
  /** 가로형(리스트) vs 세로형(그리드 기본) */
  layout?: 'vertical' | 'horizontal';
}

export function ArticleCard({ article, layout = 'vertical' }: Props) {
  const { slug, title, excerpt, category, tags, author, date, readingMinutes } = article;
  const grad = articleGradient(slug);

  const meta = (
    <div className="flex items-center gap-2 text-xs text-fg-subtle">
      <span>{author}</span>
      {date && <span>· {date}</span>}
      <span>· {readingMinutes}분</span>
    </div>
  );

  if (layout === 'horizontal') {
    return (
      <Link to={`/articles/${slug}`} className="block">
        <Card interactive className="flex overflow-hidden">
          <div
            className="hidden w-40 shrink-0 sm:block"
            style={{ background: grad.background }}
          />
          <div className="flex flex-1 flex-col gap-2 p-5">
            <Badge tone="brand">{category}</Badge>
            <h3 className="text-lg font-bold text-fg">{title}</h3>
            <p className="line-clamp-2 text-sm text-fg-muted">{excerpt}</p>
            {meta}
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/articles/${slug}`} className="block">
      <Card interactive className="flex h-full flex-col overflow-hidden">
        <div
          className="relative flex min-h-32 items-end p-4"
          style={{ background: grad.background }}
        >
          <Badge tone="glass">{category}</Badge>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <h3 className="text-lg font-bold leading-snug text-fg">{title}</h3>
          <p className="line-clamp-2 text-sm text-fg-muted">{excerpt}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((t) => (
              <Chip key={t}>#{t}</Chip>
            ))}
          </div>
          <div className="mt-auto pt-3">{meta}</div>
        </div>
      </Card>
    </Link>
  );
}
