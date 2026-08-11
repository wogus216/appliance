import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 0 }).format(price) + '원';
}

/**
 * 브랜드와 제품명을 이어 붙인 표기.
 *
 * 제품 데이터의 name이 이미 브랜드로 시작하는 경우가 74개 중 29개다
 * ('삼성 더 무빙스타일', 'LG 스탠바이미 2' 등). 그대로 이어 붙이면
 * "삼성 삼성 더 무빙스타일"이 되므로 중복될 때는 name만 쓴다.
 */
export function formatProductName(brandLabel: string, name: string): string {
  return name.startsWith(brandLabel) ? name : `${brandLabel} ${name}`;
}
