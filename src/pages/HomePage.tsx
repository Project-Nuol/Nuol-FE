import { WEBTOONS } from '../data/webtoons';
import { ARTICLES } from '../lib/articles';
import { Hero } from '../components/home/Hero';
import { TasteStats } from '../components/home/TasteStats';
import { SectionHeader } from '../components/home/SectionHeader';
import { WebtoonCard } from '../components/WebtoonCard';
import { ArticleCard } from '../components/ArticleCard';

// 홈에 노출할 데이터 (지금은 클라이언트 규칙, 추후 백엔드 큐레이션으로 교체)
const SPOTLIGHT = WEBTOONS.filter((w) => w.tier === 'A').slice(0, 3);
const POPULAR_ARTICLES = ARTICLES.slice(0, 3);

export function HomePage() {
  return (
    <div>
      <Hero />

      {/* 취향 한눈에 */}
      <section className="mb-12">
        <SectionHeader title="내 취향 한눈에" subtitle="기록이 쌓일수록 또렷해집니다." />
        <TasteStats />
      </section>

      {/* 인기 아티클 */}
      {POPULAR_ARTICLES.length > 0 && (
        <section className="mb-12">
          <SectionHeader
            title="주목할 아티클"
            subtitle="취향과 추천에 대한 이야기"
            moreHref="/articles"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {POPULAR_ARTICLES.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}

      {/* 취향 코어 — 인생작 */}
      {SPOTLIGHT.length > 0 && (
        <section className="mb-12">
          <SectionHeader
            title="이번 주 취향 코어"
            subtitle="내가 A티어로 남긴 인생작"
            moreHref="/library"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SPOTLIGHT.map((w) => (
              <WebtoonCard key={w.id} webtoon={w} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
