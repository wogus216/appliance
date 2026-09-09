import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { allAppliances } from '@/lib/data/appliances';
import { PRODUCT_EDITORIAL, getProductEditorial } from '@/lib/data/editorial';
import { getDetailedReview } from '@/lib/data/detailed-reviews';
import {
  citesUnsourcedProse,
  evaluateProductQuality,
  isProductIndexable,
  MIN_CITABLE_SOURCES,
} from '@/lib/content-quality';
import { countCitableSources, classifySourceUrl, registrableDomain } from '@/lib/source-trust';
import { isIsoDate } from '@/types/editorial';
import {
  citesUnsourcedTestimony,
  getPublishedReviews,
  PUBLISH_INDIVIDUAL_REVIEWS,
} from '@/lib/reviews';
import { ERROR_CODE_EDITORIAL } from '@/lib/data/editorial/error-code-editorial';
import { getErrorCodeBrands } from '@/lib/error-codes';

const allSlugs = new Set(allAppliances.map((a) => a.slug));
const indexed = allAppliances.filter(isProductIndexable);

describe('출처 신뢰도 분류', () => {
  it('등록 가능 도메인을 뽑는다 (2단계 국가 접미사 포함)', () => {
    expect(registrableDomain('https://prod.danawa.com/info/?pcode=1')).toBe('danawa.com');
    expect(registrableDomain('https://dpg.danawa.com/news/view')).toBe('danawa.com');
    expect(registrableDomain('https://www.lge.co.kr/support/x')).toBe('lge.co.kr');
    expect(registrableDomain('https://scienceon.kisti.re.kr/x')).toBe('kisti.re.kr');
    expect(registrableDomain('not a url')).toBeNull();
  });

  it('제조사·공공은 official', () => {
    expect(classifySourceUrl('https://www.apple.com/kr/airpods-pro/')).toBe('official');
    expect(classifySourceUrl('https://www.law.go.kr/x')).toBe('official');
  });

  it('매체·대형 DB는 trusted', () => {
    expect(classifySourceUrl('https://prod.danawa.com/info/?pcode=1')).toBe('trusted');
    expect(classifySourceUrl('https://www.techradar.com/x')).toBe('trusted');
  });

  it('커뮤니티·개인 블로그·포털 퍼머링크는 근거 수에 넣지 않는다', () => {
    expect(classifySourceUrl('https://www.reddit.com/r/airpods/comments/x/')).toBe('community');
    expect(classifySourceUrl('https://funfunhan.com/2477778')).toBe('community');
    expect(classifySourceUrl('https://v.daum.net/v/phAORJA85A')).toBe('community');
  });

  it('같은 발행처의 페이지 두 장은 출처 한 건으로 센다', () => {
    expect(
      countCitableSources([
        { url: 'https://prod.danawa.com/info/?pcode=1', title: 'a' },
        { url: 'https://dpg.danawa.com/news/view', title: 'b' },
      ]),
    ).toBe(1);
  });
});

describe('편집 메타데이터 데이터 정합성', () => {
  it('모든 키가 실제 제품 slug다', () => {
    const dangling = Object.keys(PRODUCT_EDITORIAL).filter((s) => !allSlugs.has(s));
    expect(dangling, `없는 slug: ${dangling.join(', ')}`).toEqual([]);
  });

  it.each(Object.entries(PRODUCT_EDITORIAL))('%s: 날짜 형식과 필수 필드', (slug, meta) => {
    if (meta.publishedAt !== undefined) {
      expect(isIsoDate(meta.publishedAt), `${slug} publishedAt=${meta.publishedAt}`).toBe(true);
    }
    expect(isIsoDate(meta.updatedAt), `${slug} updatedAt=${meta.updatedAt}`).toBe(true);
    expect(meta.reviewedBy.trim().length).toBeGreaterThan(0);
    expect(meta.sources.length).toBeGreaterThan(0);
    if (meta.priceCheckedAt !== undefined) {
      expect(isIsoDate(meta.priceCheckedAt)).toBe(true);
    }
    if (meta.publishedAt) {
      expect(new Date(meta.publishedAt) <= new Date(meta.updatedAt)).toBe(true);
    }
  });

  it.each(Object.entries(PRODUCT_EDITORIAL))('%s: 출처 URL은 절대 https URL이고 제목이 있다', (slug, meta) => {
    for (const s of meta.sources) {
      expect(s.url.startsWith('https://'), `${slug}: ${s.url}`).toBe(true);
      expect(() => new URL(s.url)).not.toThrow();
      expect(s.title.trim().length, `${slug}: ${s.url} 제목 없음`).toBeGreaterThan(0);
    }
    const urls = meta.sources.map((s) => s.url);
    expect(new Set(urls).size, `${slug}: 중복 출처 URL`).toBe(urls.length);
  });
});

describe('색인 품질 게이트', () => {
  it('색인 제품은 서로 다른 발행처 2곳 이상의 출처를 갖는다', () => {
    for (const a of indexed) {
      const meta = getProductEditorial(a.slug);
      expect(meta, `${a.slug}: 편집 메타데이터 없음`).toBeDefined();
      expect(
        countCitableSources(meta!.sources),
        `${a.slug}: 확인 가능한 출처 부족`,
      ).toBeGreaterThanOrEqual(MIN_CITABLE_SOURCES);
    }
  });

  it('색인 제품은 검수일과 검수 주체를 갖는다', () => {
    for (const a of indexed) {
      const meta = getProductEditorial(a.slug)!;
      expect(isIsoDate(meta.updatedAt), `${a.slug}`).toBe(true);
      expect(meta.reviewedBy.trim().length, `${a.slug}`).toBeGreaterThan(0);
    }
  });

  it('색인 제품은 모델 번호와 고유 에디터 분석을 갖는다', () => {
    for (const a of indexed) {
      expect(a.modelNumber.trim().length, `${a.slug}`).toBeGreaterThan(0);
      const sections = getDetailedReview(a.slug);
      expect(sections?.length ?? 0, `${a.slug}`).toBeGreaterThanOrEqual(3);
      expect(a.editorComment?.trim().length ?? 0, `${a.slug}`).toBeGreaterThan(0);
    }
  });

  it('색인 제품은 출처 없는 후기를 노출하지 않는다', () => {
    for (const a of indexed) {
      expect(getPublishedReviews(a.reviews), `${a.slug}`).toEqual([]);
    }
  });

  // 광고 노출도 같은 판정을 쓴다(products/[slug]/page.tsx의 showAds = isProductIndexable).
  // 그래서 이 검사 하나가 "사진 0장인 페이지에 광고가 붙는" 경우까지 같이 막는다.
  // 경로만 있고 파일이 없으면 화면에는 깨진 이미지가 남으므로 존재 여부까지 본다.
  it('색인 제품은 실제로 존재하는 사진을 갖는다', () => {
    expect(indexed.length).toBeGreaterThan(0);
    for (const a of indexed) {
      const srcs = [a.image, ...(a.images ?? [])].filter((s): s is string => !!s?.trim());
      expect(srcs.length, `${a.slug}: 사진이 0장인데 색인·광고 대상`).toBeGreaterThan(0);
      for (const src of srcs) {
        // 외부 CDN(쿠팡 파트너스 등)은 로컬 파일 검사 대상이 아니다.
        if (!src.startsWith('/')) continue;
        expect(
          existsSync(join(process.cwd(), 'public', src)),
          `${a.slug}: ${src} 파일이 없음`,
        ).toBe(true);
      }
    }
  });

  it('근거가 없는 제품은 색인되지 않는다 (게이트가 실제로 걸린다)', () => {
    const noMeta = allAppliances.filter((a) => !getProductEditorial(a.slug));
    expect(noMeta.length).toBeGreaterThan(0);
    for (const a of noMeta) {
      expect(isProductIndexable(a), `${a.slug}: 메타데이터 없이 통과함`).toBe(false);
    }
  });

  it('실패 사유가 사람이 보강할 목록으로 남는다', () => {
    const sample = allAppliances.find((a) => !isProductIndexable(a))!;
    expect(evaluateProductQuality(sample).failures.length).toBeGreaterThan(0);
  });
});

// "고유한 에디터 분석"의 '고유'는 길이만으로 보장되지 않는다.
// 대량 템플릿 생성의 전형적 흔적은 본문 재사용이므로 카탈로그 전체에서 검사한다.
describe('심층 리뷰 본문은 제품 간 재사용되지 않는다', () => {
  it('같은 본문 문단이 두 제품에 걸치지 않는다', () => {
    const seen = new Map<string, string>();
    const dupes: string[] = [];
    for (const a of allAppliances) {
      for (const s of getDetailedReview(a.slug) ?? []) {
        const key = s.body.trim();
        const owner = seen.get(key);
        if (owner && owner !== a.slug) dupes.push(`${owner} == ${a.slug}`);
        else seen.set(key, a.slug);
      }
    }
    expect(dupes, `중복 본문: ${dupes.join(', ')}`).toEqual([]);
  });
});

describe('개별 후기 공개 정책', () => {
  it('현재 정책은 개별 후기 비공개다', () => {
    expect(PUBLISH_INDIVIDUAL_REVIEWS).toBe(false);
  });

  it('어떤 제품도 후기를 노출하지 않는다', () => {
    for (const a of allAppliances) {
      expect(getPublishedReviews(a.reviews), a.slug).toEqual([]);
    }
  });
});

describe('본문이 출처 없는 전언을 근거로 삼지 않는다', () => {
  // 2026-09-08 애드센스 재거절의 직접 원인. 후기 섹션은 껐는데 심층 리뷰 본문이
  // "…라는 후기가 있습니다"로 같은 전언을 싣고 있었다 — 공개 34개 제품에 106건,
  // 광고가 실리는 17개 중 14개. 같은 페이지 푸터의 「개별 구매자 후기는 게시하지
  // 않습니다」와 정면으로 어긋났다.

  it('탐지기가 실제 위반 표현을 잡는다 (도구가 살아 있는지부터 확인)', () => {
    const violations = [
      '조용하면서 냉방은 빵빵하다고 평가했습니다.',
      '물 비린내가 없어 깔끔하다는 평이 많습니다.',
      '다자녀 가정에서 호평입니다.',
      '실제 사용자들도 디자인 만족도를 높게 칩니다.',
      '연결성 만족도가 특히 높습니다.',
      '가장 자주 언급되는 장점입니다.',
      '국내 리뷰에서 가장 많이 지적되는 부분입니다.',
      '커뮤니티에서는 AppleCare+ 가입을 권하는 여론이 강합니다.',
      '실질적인 장점으로 꼽힙니다.',
      '들어가지 않는다는 불만이 꾸준히 나옵니다.',
    ];
    for (const v of violations) {
      expect(citesUnsourcedTestimony(v), v).toBe(true);
    }
  });

  it('정당한 표현은 잡지 않는다', () => {
    const allowed = [
      '추출 속도 관련 후기를 함께 확인하시길 권합니다.',
      '점수는 모두 에디터 평가이며 실제 구매자 후기가 아닙니다.',
      '개별 구매자 후기는 게시하지 않습니다.',
      '출처·후기 처리 원칙은 편집 원칙에 정리해 두었습니다.',
      '10.5mm 다이나믹과 6.1mm 평판형을 결합한 2-way 듀얼 드라이버입니다.',
      '인버터 제어라 설정온도에 도달하면 풍량이 줄며 조용해집니다.',
    ];
    for (const a of allowed) {
      expect(citesUnsourcedTestimony(a), a).toBe(false);
    }
  });

  it('공개된 제품 중 본문에 전언이 남은 것이 없다', () => {
    const offenders = allAppliances.filter(citesUnsourcedProse).map((a) => a.slug);
    expect(offenders, `전언이 남은 제품: ${offenders.join(', ')}`).toEqual([]);
  });

  it('전언이 들어가면 색인에서 빠진다', () => {
    const clean = indexed[0];
    expect(clean, '색인 가능한 제품이 최소 하나는 있어야 한다').toBeDefined();
    expect(isProductIndexable(clean)).toBe(true);

    const tainted = {
      ...clean,
      editorComment: `${clean.editorComment ?? ''} 실사용자들 사이에서 호평입니다.`,
    };
    expect(citesUnsourcedProse(tainted)).toBe(true);
    expect(evaluateProductQuality(tainted).failures).toContain(
      '본문이 출처 없는 후기·전언을 근거로 삼음',
    );
    expect(isProductIndexable(tainted)).toBe(false);
  });
});

describe('에러코드 허브의 근거', () => {
  // 2026-09-09: 에러코드 11개 페이지에 출처·검수일·작성 주체가 하나도 없었다.
  // 가전 수리 지시는 틀리면 사람이 다치는 문서인데 사이트에서 근거가 가장 약한
  // 자리였다. 제품·블로그와 같은 기준을 여기에도 적용한다.

  it('등록된 브랜드는 실제로 에러코드를 가진 브랜드다', () => {
    const withCodes = new Set(getErrorCodeBrands());
    const dangling = Object.keys(ERROR_CODE_EDITORIAL).filter((b) => !withCodes.has(b));
    expect(dangling, `코드가 없는 브랜드에 근거만 있음: ${dangling.join(', ')}`).toEqual([]);
  });

  it.each(Object.entries(ERROR_CODE_EDITORIAL))('%s: 검수일·검수 주체·출처', (brand, meta) => {
    expect(isIsoDate(meta.updatedAt), `${brand} updatedAt=${meta.updatedAt}`).toBe(true);
    expect(meta.reviewedBy.trim().length).toBeGreaterThan(0);
    // 빈 출처 배열은 "근거가 있다"는 거짓 신호가 된다. 없으면 레코드를 만들지 않는다.
    expect(meta.sources.length, `${brand}: 출처가 비어 있음`).toBeGreaterThan(0);
    // 근거가 덮지 못하는 범위를 밝히는 문장이 출처 목록만큼 중요하다.
    expect(meta.covers.trim().length, `${brand}: covers 문장 없음`).toBeGreaterThan(20);
  });

  it.each(Object.entries(ERROR_CODE_EDITORIAL))('%s: 출처 URL은 절대 https이고 제목이 있다', (brand, meta) => {
    for (const s of meta.sources) {
      expect(s.url.startsWith('https://'), `${brand}: ${s.url}`).toBe(true);
      expect(() => new URL(s.url)).not.toThrow();
      expect(s.title.trim().length, `${brand}: ${s.url} 제목 없음`).toBeGreaterThan(0);
    }
    const urls = meta.sources.map((s) => s.url);
    expect(new Set(urls).size, `${brand}: 중복 출처 URL`).toBe(urls.length);
  });
});
