import type { Metadata } from 'next';
import { SITE_NAME } from './constants';

/**
 * 페이지 메타데이터의 openGraph를 만든다.
 *
 * Next의 메타데이터 병합은 shallow라서, 페이지가 openGraph를 정의하는 순간
 * layout.tsx의 openGraph가 통째로 교체된다 — siteName·type·locale이 유실된다.
 * 페이지에서 openGraph를 직접 리터럴로 쓰지 말고 항상 이 헬퍼를 거칠 것.
 */
export function buildOpenGraph(og: {
  title: string;
  description: string;
  url: string;
  images?: string[];
}): Metadata['openGraph'] {
  return {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'ko_KR',
    ...og,
  };
}
