import { describe, it, expect } from 'vitest';
import { getAllErrorCodeParams, getErrorCodeDetail, slugifyCode } from '@/lib/error-codes';

describe('slugifyCode', () => {
  it('영문 코드를 URL-safe 슬러그로 만든다', () => {
    expect(slugifyCode('CH 05')).toBe('ch-05');
    expect(slugifyCode('rd / Er FF')).toBe('rd-er-ff');
  });

  it('한글 코드의 공백을 하이픈으로 바꾼다', () => {
    expect(slugifyCode('냉각 이상')).toBe('냉각-이상');
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
