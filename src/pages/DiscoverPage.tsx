import { WEBTOONS } from '../data/webtoons';
import { WebtoonCard } from '../components/WebtoonCard';

// A티어를 "취향 코어"로 간주한 임시 미리보기.
// 실제 임베딩 추천(webtoon/ai의 recommend.py 결과)이 연결되면 이 로직만 교체.
const TOP_PICKS = WEBTOONS.filter((w) => w.tier === 'A').slice(0, 6);

export function DiscoverPage() {
  return (
    <div>
      <header className="mb-8">
        <p className="text-sm font-medium uppercase tracking-widest text-brand-400">
          discover
        </p>
        <h1 className="mt-2 text-3xl font-bold text-fg">추천</h1>
        <p className="mt-2 max-w-xl text-fg-muted">
          “이거 좋아했으면 이것도.” 곧 임베딩 추천 엔진(KURE-v1)이 여기에
          연결됩니다. 지금은 취향 코어(A티어) 미리보기를 보여줘요.
        </p>
      </header>

      <div className="mb-6 rounded-lg border border-dashed border-brand-500/30 bg-brand-500/5 p-4 text-sm text-brand-300">
        🔌 백엔드 추천 API 연결 예정 — 프로파일 Top-N · 아이템-아이템 유사작
      </div>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TOP_PICKS.map((w) => (
          <WebtoonCard key={w.id} webtoon={w} />
        ))}
      </section>
    </div>
  );
}
