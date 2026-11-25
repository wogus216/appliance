import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import AboutPage from '@/app/about/page';
import EditorialPolicyPage from '@/app/editorial-policy/page';
import MethodologyPage from '@/app/methodology/page';
import { ADSENSE_NOT_APPROVED_AS_OF, SITE_AUTHOR } from '@/lib/constants';

const about = renderToStaticMarkup(createElement(AboutPage));
const editorial = renderToStaticMarkup(createElement(EditorialPolicyPage));
const methodology = renderToStaticMarkup(createElement(MethodologyPage));

describe('축소 후 운영 안내의 사실·보관·광고 경계', () => {
  it.each([about, editorial])('승인 상태를 사실대로 표시하고 정책 문서에 광고를 넣지 않는다', (html) => {
    expect(html).toContain(ADSENSE_NOT_APPROVED_AS_OF);
    expect(html).toContain('Google AdSense 승인 전');
    expect(html).not.toContain('adsbygoogle');
  });
  it('운영자의 실제 배경과 자료 사용 범위를 보존한다', () => {
    expect(about).toContain(SITE_AUTHOR);
    for (const fact of ['개발자', '업계 경력은 없습니다', '직접 써 본 적은 없고', '제조사나 공인 서비스센터가 아닙니다']) expect(about).toContain(fact);
    expect(about).toContain('id="operator"');
    expect(about).toContain('id="corrections"');
  });
  it('공식 자료의 적용 모델과 사용자 조치 경계를 안내한다', () => {
    for (const fact of ['정확한 모델 설명서', '근거 없는 분해', '출처 수·글자 수·테스트 통과']) expect(editorial).toContain(fact);
  });
  it('살아 있는 도구의 계산과 원문만 안내한다', () => {
    for (const slug of ['repair-replace#tool-guide', 'care-plan', 'household-care']) expect(methodology).toContain(`href="/tools/${slug}"`);
    expect(methodology).toContain('입력한 설치·철거·배송 비용을 더한 값');
    expect(methodology).toContain('www.law.go.kr');
    expect(methodology).toContain('localStorage');
    expect(methodology).toContain('JSON');
  });
  it('안내 문서에서 퇴역 URL로 보내지 않는다', () => {
    for (const html of [about, editorial, methodology]) {
      expect(html).not.toMatch(/href="\/(?:products|brand|category|compare|materials)(?:\/|"|#)/);
      expect(html).not.toMatch(/href="\/tools\/(?:home-energy|install-check|water-purifier-cost|fridge-fit|dishwasher-fit)/);
    }
  });
});
