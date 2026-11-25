import { ADSENSE_CLIENT_ID } from '@/lib/constants';

/**
 * 광고 스크립트를 넣기로 한 상세 글에서만 렌더한다. 사이트 소유권 확인에는 루트 메타태그와 ads.txt를 쓴다.
 * 자동 광고의 페이지 제외 설정은 AdSense 계정에서 관리한다.
 */
export function AdSenseScript() {
  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
    />
  );
}
