import { type ReactNode } from 'react';
import { Logo } from '../components/Logo';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

/** 로그인/회원가입 공통 레이아웃. 좌측 브랜드 패널 + 우측 폼 (모바일은 폼만). */
export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      {/* 좌측 브랜드 패널 — 표지 없는 그라데이션 정체성 */}
      <aside className="relative hidden overflow-hidden lg:block">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(95% 95% at 12% 8%, rgba(79,141,245,0.35), transparent 58%), #10183A',
          }}
        />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Logo variant="lockup" size={30} />
          <div>
            <p className="text-3xl font-bold leading-snug text-white">
              별점이 아니라
              <br />
              한줄평으로 보는
              <br />
              나만의 웹툰 취향
            </p>
            <p className="mt-4 max-w-sm text-white/70">
              당신의 웹툰 취향 알고리즘을 분석해 비슷하거나, 아예 색다른 장르를 추천해줍니다
            </p>
          </div>
          <p className="text-sm text-white/50">Designed by HwangHyeong</p>
        </div>
      </aside>

      {/* 우측 폼 */}
      <main className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-fg">{title}</h1>
          <p className="mt-2 text-sm text-fg-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-center text-sm text-fg-muted">{footer}</div>
        </div>
      </main>
    </div>
  );
}
