// 표지 이미지 없이 카드 배경을 만드는 결정론적 그라데이션 생성기.
// 같은 (제목, 장르)면 항상 같은 색 → 새로고침해도 카드 정체성이 유지됨.
// 저작권 자산을 일절 쓰지 않는 게 이 프로젝트의 핵심 제약.

import type { Tier } from '../types/webtoon';

// 문자열 → 안정적인 정수 해시 (djb2 변형)
function hash(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = (h * 33) ^ str.charCodeAt(i);
  }
  return h >>> 0; // unsigned
}

// 대장르마다 색 '계열(기준 색상)'을 고정해두면, 장르가 같은 작품끼리
// 시각적으로 묶여 보여서 카탈로그를 훑을 때 장르 감이 빠르게 잡힌다.
const GENRE_HUE: Record<string, number> = {
  로맨스: 330,
  로판: 312,
  판타지: 270,
  액션: 8,
  무협: 25,
  스릴러: 210,
  드라마: 190,
  코미디: 45,
  일상: 150,
  스포츠: 100,
  공포: 285,
  기타: 220,
};

// 티어가 높을수록 채도/명도를 살짝 끌어올려 '에너지'를 준다.
// 티어 미기록(null)은 무채색에 가깝게 → "아직 평가 안 함"이 시각적으로 드러남.
const TIER_INTENSITY: Record<Tier | 'none', { sat: number; light: number }> = {
  A: { sat: 72, light: 52 },
  B: { sat: 60, light: 46 },
  C: { sat: 42, light: 40 },
  D: { sat: 26, light: 34 },
  none: { sat: 14, light: 34 },
};

export interface CardGradient {
  background: string; // CSS linear-gradient
  hue: number;        // 칩/테두리 등 보조 요소에 재사용
}

export function cardGradient(
  title: string,
  genre: string,
  tier: Tier | null,
): CardGradient {
  const baseHue = GENRE_HUE[genre] ?? hash(genre) % 360;
  const h = hash(title);

  // 같은 장르 안에서도 작품마다 ±20도 정도 흔들어 변별력을 준다.
  const drift = (h % 40) - 20;
  const hue = (baseHue + drift + 360) % 360;
  const hue2 = (hue + 35 + (h % 25)) % 360; // 두 번째 색상은 살짝 옆 계열

  const { sat, light } = TIER_INTENSITY[tier ?? 'none'];
  const angle = 110 + (h % 60); // 105~165도 대각선

  const c1 = `hsl(${hue} ${sat}% ${light}%)`;
  const c2 = `hsl(${hue2} ${sat - 12}% ${Math.max(light - 16, 18)}%)`;

  return {
    background: `linear-gradient(${angle}deg, ${c1}, ${c2})`,
    hue,
  };
}

// 아티클 전용 그라데이션 — 브랜드 블루(코발트~인디고~네이비) 계열로 묶어
// 웹툰 카드(전체 장르 스펙트럼)와 시각적으로 구분되게 한다. seed로만 변주.
export function articleGradient(seed: string): CardGradient {
  const h = hash(seed);
  const hue = 205 + (h % 50); // 205~255 (cobalt → indigo)
  const hue2 = hue + 12 + (h % 18);
  const angle = 120 + (h % 50);
  const c1 = `hsl(${hue} 62% 46%)`;
  const c2 = `hsl(${hue2} 55% 26%)`;
  return { background: `linear-gradient(${angle}deg, ${c1}, ${c2})`, hue };
}
