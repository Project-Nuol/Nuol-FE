import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { Button } from '../ui';
import { HeroCanvasBoundary } from './HeroCanvasBoundary';

// 3D 너울 메시는 무겁고(three.js) 첫 페인트를 막지 않도록 lazy 로드.
const HeroWave3D = lazy(() => import('./HeroWave3D'));

/** 홈 최상단 — 서비스 아이덴티티를 한눈에 전달하는 히어로. */
export function Hero() {
  const { user } = useAuth();

  return (
    <section className="relative mb-12 overflow-hidden rounded-xl border border-line">
      {/* 브랜드 네이비 베이스 + 다층 코발트 글로우 (심볼이 사는 배경) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(75% 90% at 82% 8%, rgba(79,141,245,0.40), transparent 60%),' +
            'radial-gradient(55% 80% at 10% 110%, rgba(45,107,229,0.30), transparent 55%),' +
            'linear-gradient(160deg, #141d47 0%, #10183A 55%, #0b1130 100%)',
        }}
      />
      {/* 미세 그리드 — 표면에 결을 준다 (그림자 대신 보더 철학) */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage:
            'radial-gradient(80% 80% at 72% 18%, #000 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(80% 80% at 72% 18%, #000 30%, transparent 75%)',
        }}
      />
      {/* 3D 너울 — 글로시 로고 심볼 + 와이어프레임 파도 (마우스 패럴랙스) */}
      <HeroCanvasBoundary>
        <Suspense fallback={null}>
          <div className="pointer-events-none absolute inset-0 opacity-90">
            <HeroWave3D />
          </div>
        </Suspense>
      </HeroCanvasBoundary>
      {/* 너울 스웰 모티프 — 심볼을 빌린 파도 결, 좌우로 천천히 흐른다 */}
      <svg
        aria-hidden
        viewBox="0 0 1600 300"
        preserveAspectRatio="none"
        className="hero-wave-drift pointer-events-none absolute bottom-0 left-0 h-2/3 w-[150%]"
      >
        <path
          d="M0 220 C 220 140, 360 300, 600 220 S 980 140, 1200 210 S 1580 140, 1600 210"
          fill="none"
          stroke="rgba(156,192,251,0.40)"
          strokeWidth="2"
        />
        <path
          d="M0 260 C 240 180, 380 330, 620 255 S 1000 185, 1200 250 S 1560 185, 1600 250"
          fill="none"
          stroke="rgba(79,141,245,0.26)"
          strokeWidth="2"
        />
        <path
          d="M0 300 C 260 220, 400 360, 640 290 S 1020 230, 1200 290 S 1580 230, 1600 290"
          fill="none"
          stroke="rgba(45,107,229,0.20)"
          strokeWidth="2"
        />
      </svg>
      {/* 상단 하이라이트 — 표면이 빛을 받는 가장자리 */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="relative px-8 py-14 sm:px-12 sm:py-20">
        <p className="text-sm font-medium uppercase tracking-widest text-brand-300">
          {user ? `${user.name}님의 취향 항해` : 'taste engine'}
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl">
          별점이 아니라 한줄평으로,
          <br />
          당신만의 웹툰 취향을 항해하세요.
        </h1>
        <p className="mt-4 max-w-xl text-white/70">
          본 작품을 기록하면 임베딩이 취향을 학습해 “이거 좋아했으면 이것도”를
          찾아줍니다. 표지 없이, 색과 타이포로.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/discover">
            <Button size="lg">추천 받아보기</Button>
          </Link>
          <Link to="/library">
            <Button size="lg" variant="secondary">
              내 서재 보기
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
