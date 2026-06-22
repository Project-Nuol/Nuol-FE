import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** 조건부 className 병합 + Tailwind 충돌 해소. 모든 컴포넌트의 className 합성에 사용. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
