import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        'h-11 w-full rounded-md border bg-surface px-3.5 text-sm text-fg',
        'placeholder:text-fg-subtle',
        'transition-colors duration-150 ease-out',
        'hover:border-line-strong focus:border-brand-500',
        'disabled:cursor-not-allowed disabled:opacity-50',
        invalid ? 'border-red-500/70' : 'border-line',
        className,
      )}
      {...props}
    />
  );
});
