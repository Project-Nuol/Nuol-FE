import { useMemo, useState } from 'react';
import { ARTICLES } from '../lib/articles';
import { ArticleCard } from '../components/ArticleCard';
import { cn } from '../lib/cn';

export function ArticleListPage() {
  const [category, setCategory] = useState('ALL');

  const categories = useMemo(
    () => ['ALL', ...Array.from(new Set(ARTICLES.map((a) => a.category)))],
    [],
  );
  const filtered =
    category === 'ALL' ? ARTICLES : ARTICLES.filter((a) => a.category === category);

  return (
    <div>
      <header className="mb-8">
        <p className="text-sm font-medium uppercase tracking-widest text-brand-400">
          articles
        </p>
        <h1 className="mt-2 text-3xl font-bold text-fg">아티클</h1>
        <p className="mt-2 text-fg-muted">
          취향·추천·기록에 대한 이야기 {ARTICLES.length}편.
        </p>
      </header>

      <div className="mb-6 flex flex-wrap gap-1.5">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              'rounded-full border px-3 py-1 text-sm transition-colors',
              category === c
                ? 'border-brand-500 bg-brand-500/15 text-brand-300'
                : 'border-line text-fg-muted hover:border-line-strong hover:text-fg',
            )}
          >
            {c === 'ALL' ? '전체' : c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="grid place-items-center rounded-lg border border-dashed border-line py-20 text-fg-subtle">
          아직 아티클이 없어요.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
