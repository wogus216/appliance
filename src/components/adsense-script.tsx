import { ADSENSE_CLIENT_ID } from '@/lib/constants';

/**
 * 애드센스 자동 광고 스크립트.
 *
 * 왜 layout이 아니라 페이지가 직접 렌더하는가:
 *   전역 레이아웃에 두면 404와 실질 콘텐츠가 없는 화면(정책 페이지 등)에도 광고가 실린다.
 *   그건 애드센스가 "가치가 별로 없는 콘텐츠"로 보는 화면에 광고를 붙이는 것이라
 *   승인에 불리하다. 광고를 실을 자격이 있는 페이지만 이 컴포넌트를 렌더한다.
 *
 * 왜 클라이언트 pathname 검사가 아닌가:
 *   클라이언트에서 경로를 보고 끄면 스크립트가 이미 한 번 로드된 뒤다.
 *   서버 컴포넌트가 아예 마크업을 내보내지 않아야 정적 HTML에도 남지 않는다.
 *
 * 왜 next/script가 아닌가:
 *   next/script는 어떤 strategy를 써도 __next_s 배열에 밀어넣는 간접 형태로만 HTML에
 *   남아서, 소스에서 스니펫을 찾는 애드센스 크롤러가 인식하지 못한다. 평범한 script
 *   태그로 두면 React가 head로 끌어올리고 원문 그대로 HTML에 실린다.
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
