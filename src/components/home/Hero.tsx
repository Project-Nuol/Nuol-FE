import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { Button } from '../ui';

/** 홈 최상단 — 서비스 아이덴티티를 한눈에 전달하는 히어로. */
export function Hero() {
  const { user } = useAuth();

  return (
    <section className="relative mb-12 overflow-hidden rounded-xl border border-line">
      {/* 브랜드 네이비 + 코발트 글로우 (심볼이 사는 배경) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 120% at 85% 10%, rgba(79,141,245,0.35), transparent 55%), #10183A',
        }}
      />
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
