import { NavLink } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { Button } from '../ui';
import { Logo } from '../Logo';
import { cn } from '../../lib/cn';

const NAV = [
  { to: '/library', label: '내 서재' },
  { to: '/discover', label: '추천' },
];

export function TopBar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:gap-6 sm:px-6">
        {/* 로고 — 모바일은 심볼, sm+는 락업 */}
        <NavLink to="/library" className="flex shrink-0 items-center text-fg">
          <Logo variant="lockup" size={26} className="hidden sm:inline-flex" />
          <Logo variant="symbol" size={24} className="sm:hidden" />
        </NavLink>

        {/* 네비게이션 */}
        <nav className="flex items-center gap-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'whitespace-nowrap rounded-md px-3 py-1.5 text-sm transition-colors',
                  isActive
                    ? 'bg-surface-2 text-fg'
                    : 'text-fg-muted hover:bg-surface-2 hover:text-fg',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* 유저 영역 */}
        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-surface-2 text-xs font-semibold text-fg-muted">
              {user?.name?.[0]?.toUpperCase() ?? '?'}
            </span>
            <span className="hidden text-sm text-fg-muted sm:inline">
              {user?.name}
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={logout} className="whitespace-nowrap">
            로그아웃
          </Button>
        </div>
      </div>
    </header>
  );
}
