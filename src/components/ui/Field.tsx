import { type ReactNode, useId } from 'react';
import { cn } from '../../lib/cn';

interface FieldProps {
  label: string;
  error?: string;
  hint?: string;
  /** (id) => 입력 요소. label/error와 a11y로 연결됨. */
  children: (id: string) => ReactNode;
  className?: string;
}

/** label + 입력 + 에러/힌트를 묶는 폼 필드 래퍼. 접근성 연결을 일관되게 처리. */
export function Field({ label, error, hint, children, className }: FieldProps) {
  const id = useId();
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-medium text-fg">
        {label}
      </label>
      {children(id)}
      {error ? (
        <p className="text-xs text-red-400">{error}</p>
      ) : hint ? (
        <p className="text-xs text-fg-subtle">{hint}</p>
      ) : null}
    </div>
  );
}
