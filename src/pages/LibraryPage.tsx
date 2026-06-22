import { useMemo, useState } from 'react';
import { WEBTOONS } from '../data/webtoons';
import type { Tier } from '../types/webtoon';
import { WebtoonCard } from '../components/WebtoonCard';
import { Input } from '../components/ui';
import { cn } from '../lib/cn';

const TIER_FILTERS: (Tier | 'ALL')[] = ['ALL', 'A', 'B', 'C', 'D'];

export function LibraryPage() {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('ALL');
  const [tier, setTier] = useState<Tier | 'ALL'>('ALL');

  const genres = useMemo(
    () => ['ALL', ...Array.from(new Set(WEBTOONS.map((w) => w.genre)))],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return WEBTOONS.filter((w) => {
      if (genre !== 'ALL' && w.genre !== genre) return false;
      if (tier !== 'ALL' && w.tier !== tier) return false;
      if (!q) return true;
      const hay = [w.title, w.author, w.oneLiner, ...w.tags]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, genre, tier]);

  return (
    <div>
      <header className="mb-8">
        <p className="text-sm font-medium uppercase tracking-widest text-brand-400">
          my library
        </p>
        <h1 className="mt-2 text-3xl font-bold text-fg">내 서재</h1>
        <p className="mt-2 text-fg-muted">
          기록된 {WEBTOONS.length}편 · 한줄평과 티어로 남긴 나의 취향.
        </p>
      </header>

      {/* 필터 바 */}
      <div className="mb-6 flex flex-col gap-4">
        <Input
          placeholder="제목 · 작가 · 태그 · 한줄평 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-md"
        />
        <div className="flex flex-wrap items-center gap-4">
          {/* 장르 */}
          <div className="flex flex-wrap gap-1.5">
            {genres.map((g) => (
              <FilterPill key={g} active={genre === g} onClick={() => setGenre(g)}>
                {g === 'ALL' ? '전체 장르' : g}
              </FilterPill>
            ))}
          </div>
          {/* 티어 */}
          <div className="flex gap-1.5">
            {TIER_FILTERS.map((t) => (
              <FilterPill key={t} active={tier === t} onClick={() => setTier(t)}>
                {t === 'ALL' ? '전체 티어' : t}
              </FilterPill>
            ))}
          </div>
        </div>
      </div>

      {/* 결과 */}
      {filtered.length === 0 ? (
        <div className="grid place-items-center rounded-lg border border-dashed border-line py-20 text-fg-subtle">
          조건에 맞는 작품이 없어요.
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((w) => (
            <WebtoonCard key={w.id} webtoon={w} />
          ))}
        </section>
      )}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1 text-sm transition-colors',
        active
          ? 'border-brand-500 bg-brand-500/15 text-brand-300'
          : 'border-line text-fg-muted hover:border-line-strong hover:text-fg',
      )}
    >
      {children}
    </button>
  );
}
