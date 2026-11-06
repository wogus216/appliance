import { ADSENSE_CLIENT_ID } from '@/lib/constants';

/**
 * 애드센스 자동 광고 스크립트.
 *
 * 왜 layout이 아니라 페이지가 직접 렌더하는가:
 *   404·편집 원칙·도구 등 운영자가 광고 코드를 두지 않기로 한 화면을 구분하기 위해서다.
 *   호출 여부는 내부 설정이며 Google의 광고 게재 자격이나 승인 판정이 아니다.
 *   색인용 자동 검사를 통과해도 원고의 고유 가치와 실제 광고 배치는 별도로 검토한다.
 *
 * 왜 클라이언트 pathname 검사가 아닌가:
 *   클라이언트에서 경로를 보고 끄면 스크립트가 이미 한 번 로드된 뒤다.
 *   서버 컴포넌트가 아예 마크업을 내보내지 않아야 정적 HTML에도 남지 않는다.
 *
 * 왜 next/script가 아닌가:
 *   생성한 정적 HTML에서 광고 스크립트 URL을 직접 확인할 수 있도록 일반 script를 쓴다.
 *   특정 구현을 Google 크롤러가 인식하는지 또는 승인이 되는지를 보장하지 않는다.
 *   (소유권 확인용 `google-adsense-account` 메타태그는 layout.tsx가 계속 전역으로 낸다.)
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
