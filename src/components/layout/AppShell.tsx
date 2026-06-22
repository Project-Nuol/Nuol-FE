import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';

/** 로그인 후 화면의 공통 레이아웃 (상단바 + 콘텐츠 영역). */
export function AppShell() {
  return (
    <div className="min-h-dvh">
      <TopBar />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
