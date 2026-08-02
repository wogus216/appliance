import { describe, it, expect } from 'vitest';
import { getAllErrorCodeParams, getErrorCodeDetail, slugifyCode, errorCodeHref } from '@/lib/error-codes';

describe('slugifyCode', () => {
  it('영문 코드를 URL-safe 슬러그로 만든다', () => {
    expect(slugifyCode('CH 05')).toBe('ch-05');
    expect(slugifyCode('rd / Er FF')).toBe('rd-er-ff');
  });

  it('한글 코드의 공백을 하이픈으로 바꾼다', () => {
    expect(slugifyCode('냉각 이상')).toBe('냉각-이상');
  });
});

describe('errorCodeHref', () => {
  it('영문 코드는 그대로 둔다', () => {
    expect(errorCodeHref('Samsung', 'CH 05')).toBe('/error-codes/Samsung/ch-05');
  });

  // 한글 경로를 날것으로 내보내면 서버가 인코딩된 주소로 307 리다이렉트한다.
  // sitemap·내부 링크가 매번 한 번씩 튕기지 않도록 미리 인코딩해서 내보낸다.
  it('한글 슬러그는 퍼센트 인코딩해서 내보낸다', () => {
    expect(errorCodeHref('Coway', '냉각 이상')).toBe(
      '/error-codes/Coway/%EB%83%89%EA%B0%81-%EC%9D%B4%EC%83%81'
    );
  });

  it('내보낸 경로는 다시 튕기지 않는 최종 형태다', () => {
    for (const { brand, code } of getAllErrorCodeParams()) {
      const href = errorCodeHref(brand, code);
      const slug = href.split('/').pop()!;
      expect(slug, href).toBe(encodeURIComponent(decodeURIComponent(slug)));
    }
  });
});

describe('getErrorCodeDetail', () => {
  it('generateStaticParams가 내놓은 슬러그를 모두 해석한다', () => {
    for (const { brand, code } of getAllErrorCodeParams()) {
      expect(getErrorCodeDetail(brand, code), `${brand}/${code}`).not.toBeNull();
    }
  });

  // 정적 export(output: 'export')에서 Next는 params.code를 퍼센트 인코딩된 채로 넘긴다.
  // 한글이 든 코드가 여기서 전부 notFound()로 빠져 21개 페이지가 404로 빌드됐었다.
  it('퍼센트 인코딩된 슬러그도 해석한다', () => {
    for (const { brand, code } of getAllErrorCodeParams()) {
      const encoded = encodeURIComponent(code);
      expect(getErrorCodeDetail(brand, encoded), `${brand}/${encoded}`).not.toBeNull();
    }
  });

  it('존재하지 않는 코드는 null을 준다', () => {
    expect(getErrorCodeDetail('Samsung', 'no-such-code')).toBeNull();
  });

  it('디코딩할 수 없는 슬러그에도 예외를 던지지 않는다', () => {
    expect(() => getErrorCodeDetail('Samsung', '%')).not.toThrow();
    expect(getErrorCodeDetail('Samsung', '%E0%A4%A')).toBeNull();
  });
});
