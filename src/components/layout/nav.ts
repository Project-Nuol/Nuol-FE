// 앱 네비게이션 정의 — TopBar(데스크탑)와 BottomNav(모바일)가 공유.
// 메뉴를 늘리려면 여기만 수정.
export interface NavItem {
  to: string;
  label: string;
  end?: boolean;
}

export const NAV: NavItem[] = [
  { to: '/', label: '홈', end: true },
  { to: '/library', label: '내 서재' },
  { to: '/discover', label: '추천' },
  { to: '/articles', label: '아티클' },
];
