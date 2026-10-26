import { GA_MEASUREMENT_ID, SITE_URL } from '@/lib/constants';

const SITE_HOST = new URL(SITE_URL).hostname;

/**
 * GA4(gtag.js) 태그.
 *
 * 왜 광고와 달리 레이아웃 전역인가:
 *   방문 통계는 404와 정책 페이지까지 모든 화면에서 재야 한다. 어느 화면에서 나갔는지가 빠지면
 *   숫자가 틀린다. 광고 스크립트를 페이지별로 다는 이유(adsense-script.tsx)와는 목적이 다르다.
 *
 * 왜 next/script가 아닌가:
 *   애드센스 스크립트와 같은 이유다. 평범한 script 태그로 두면 정적 HTML에 원문 그대로 실려서
 *   배포 뒤 curl 한 번으로 태그가 실렸는지 확인할 수 있다.
 *
 * 왜 호스트를 검사하는가:
 *   로컬 빌드를 127.0.0.1에서 열어 검수할 때마다 운영 속성에 방문이 쌓이면 통계가 오염된다.
 *   운영 도메인에서만 config를 보낸다. config가 없으면 gtag.js만 받고 아무것도 보내지 않는다.
 *
 * 클라이언트 이동(Link)의 페이지뷰는 여기서 보내지 않는다. 웹 스트림의 향상된 측정 중
 * '브라우저 기록 이벤트 기반 페이지 변경'이 잡는다 — 켜져 있는지는 GA 관리 화면에서 확인할 것.
 * 여기서도 보내면 같은 이동을 두 번 센다.
 */
export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <script
        id="ga4-init"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}if(location.hostname==='${SITE_HOST}'){gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');}`,
        }}
      />
    </>
  );
}
