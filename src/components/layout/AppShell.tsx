import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';

/** 로그인 후 화면의 공통 레이아웃 (상단바 + 콘텐츠 + 모바일 하단탭). */
export function AppShell() {
  return (
    <div className="min-h-dvh">
      <TopBar />
      {/* pb-24: 모바일 하단 탭바에 콘텐츠가 가리지 않도록 */}
      <main className="mx-auto max-w-6xl px-5 py-8 pb-24 sm:px-6 sm:py-10 sm:pb-10">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
