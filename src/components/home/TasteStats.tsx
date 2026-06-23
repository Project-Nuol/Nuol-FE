import { useMemo } from 'react';
import { WEBTOONS } from '../../data/webtoons';
import type { Tier } from '../../types/webtoon';
import { Card } from '../ui';

const TIERS: Tier[] = ['A', 'B', 'C', 'D'];
const TIER_COLOR: Record<Tier, string> = {
  A: 'bg-brand-400',
  B: 'bg-brand-500',
  C: 'bg-brand-600',
  D: 'bg-brand-700',
};

/** 내 기록을 요약한 취향 대시보드 — 홈의 정체성 섹션. */
export function TasteStats() {
  const { total, topGenres, tierCounts } = useMemo(() => {
    const total = WEBTOONS.length;
    const genreMap = new Map<string, number>();
    const tierMap = new Map<string, number>();
    for (const w of WEBTOONS) {
      genreMap.set(w.genre, (genreMap.get(w.genre) ?? 0) + 1);
      tierMap.set(w.tier ?? '—', (tierMap.get(w.tier ?? '—') ?? 0) + 1);
    }
    const topGenres = [...genreMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
    return { total, topGenres, tierCounts: tierMap };
  }, []);

  const maxTier = Math.max(...TIERS.map((t) => tierCounts.get(t) ?? 0), 1);

  return (
    <Card className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-3">
      {/* 총 기록 */}
      <div className="flex flex-col justify-center">
        <p className="text-sm text-fg-muted">기록한 작품</p>
        <p className="mt-1 text-4xl font-bold text-fg">
          {total}
          <span className="ml-1 text-lg font-medium text-fg-muted">편</span>
        </p>
      </div>

      {/* 최애 장르 */}
      <div>
        <p className="mb-2 text-sm text-fg-muted">가장 많이 본 장르</p>
        <div className="flex flex-wrap gap-1.5">
          {topGenres.map(([g, n]) => (
            <span
              key={g}
              className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-xs text-fg"
            >
              {g} <span className="text-fg-subtle">{n}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 티어 분포 */}
      <div>
        <p className="mb-2 text-sm text-fg-muted">티어 분포</p>
        <div className="flex items-end gap-3">
          {TIERS.map((t) => {
            const n = tierCounts.get(t) ?? 0;
            return (
              <div key={t} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs text-fg-subtle">{n}</span>
                <div className="flex h-16 w-full items-end">
                  <div
                    className={`w-full rounded-t ${TIER_COLOR[t]}`}
                    style={{ height: `${Math.max((n / maxTier) * 100, 6)}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-fg-muted">{t}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
