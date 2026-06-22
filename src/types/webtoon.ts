// 웹툰 한 편의 데이터 모양.
// data/webtoon_tracker.xlsx (시트 '웹툰_기록') 컬럼과 매핑됨.

export type Tier = 'A' | 'B' | 'C' | 'D';

export interface Webtoon {
  id: string;
  title: string;            // 제목
  author: string | null;    // 작가 (비어있을 수 있음)
  platform: string;         // 연재처
  genre: string;            // 대장르
  tier: Tier | null;        // 내티어 (비우면 implicit feedback)
  oneLiner: string | null;  // 한줄평/메모 — 카드의 주인공
  tags: string[];           // 세부태그(LLM)
  summary: string;          // 줄거리요약(LLM) — 한줄평 없을 때 폴백
}

// 티어별 의미 (UI 라벨/색 강도에 사용)
export const TIER_META: Record<Tier, { label: string; weight: number }> = {
  A: { label: '인생작·재독각', weight: 1.0 },
  B: { label: '재밌게 봄', weight: 0.7 },
  C: { label: '무난', weight: 0.4 },
  D: { label: '별로·하차', weight: 0.1 },
};
