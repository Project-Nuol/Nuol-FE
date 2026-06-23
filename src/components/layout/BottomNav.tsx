import { NavLink } from 'react-router-dom';
import { NAV } from './nav';
import { cn } from '../../lib/cn';

/** 모바일 전용 하단 탭 내비게이션 (sm 미만에서만 표시). */
export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-canvas/90 backdrop-blur-md sm:hidden">
      <div className="mx-auto flex max-w-md items-stretch">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs transition-colors',
                isActive ? 'text-brand-400' : 'text-fg-muted',
              )
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={cn(
                    'h-1 w-1 rounded-full transition-colors',
                    isActive ? 'bg-brand-400' : 'bg-transparent',
                  )}
                />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
