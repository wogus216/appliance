import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildProductToc } from '@/lib/detail-sections';
import { getApplianceBySlug } from '@/lib/data/appliances';
import type { Appliance } from '@/types/appliance';

const bySlug = (slug: string): Appliance => {
  const a = getApplianceBySlug(slug);
  if (!a) throw new Error(`fixture not found: ${slug}`);
  return a;
};

/**
 * page.tsx를 소스 텍스트로 읽어 `id="..."` 등장 순서를 뽑는다.
 * 조건부 렌더(hasPurchase/hasErrorCodes) 블록도 소스 코드 상에는 항상 존재하므로,
 * 어떤 제품을 넘기든 이 함수는 page.tsx에 실제로 작성된 8개 id를 고정 순서로 반환한다.
 */
function extractDomIds(): string[] {
  const pagePath = join(process.cwd(), 'src/app/products/[slug]/page.tsx');
  const source = readFileSync(pagePath, 'utf-8');
  const matches = source.matchAll(/id="([a-z-]+)"/g);
  return [...matches].map((m) => m[1]);
}

/**
 * 왜 이 테스트가 존재하는가:
 * ProductTOC는 IntersectionObserver로 buildProductToc()가 낸 id 순서를 기준 삼아
 * 스크롤 위치에 따라 활성 항목을 하이라이트한다. page.tsx의 DOM id 순서와
 * buildProductToc()의 id 순서가 어긋나면 하이라이트가 실제 스크롤 위치와 다른
 * TOC 항목을 가리키게 되는데, 그 오류는 화면을 스크롤해보기 전까지는 드러나지 않는다.
 * 지금은 둘이 일치하지만 그 사실은 사람이 다는 주석 하나가 보장할 뿐이라, page.tsx에
 * 섹션을 추가/재배치하면서 buildProductToc() 갱신을 빼먹어도 lint/tsc/기존 테스트는
 * 통과한다. 그런 회귀를 여기서 기계적으로 잡는다.
 */
describe('TOC id 순서와 DOM id 순서 일치', () => {
  it('생활가전: buildProductToc 7개 id가 DOM id 순서의 부분수열(순서 보존)이다', () => {
    const appliance = bySlug('samsung-bespoke-wind-free-af25a9970');
    const tocIds = buildProductToc(appliance).map((t) => t.id);
    const domIds = extractDomIds();

    expect(tocIds).toHaveLength(7);
    expect(domIds).toHaveLength(8);

    let cursor = 0;
    for (const id of tocIds) {
      const idx = domIds.indexOf(id, cursor);
      expect(
        idx,
        `id "${id}" 를 DOM 순서 ${JSON.stringify(domIds)} 에서 cursor=${cursor} 이후로 찾지 못함 (TOC 순서: ${JSON.stringify(tocIds)})`,
      ).toBeGreaterThanOrEqual(0);
      cursor = idx + 1;
    }
  });

  it('비가전: buildProductToc 6개 id가 DOM id 순서의 부분수열(순서 보존)이다', () => {
    const appliance = bySlug('sony-wf-1000xm5');
    const tocIds = buildProductToc(appliance).map((t) => t.id);
    const domIds = extractDomIds();

    expect(tocIds).toHaveLength(6);
    expect(domIds).toHaveLength(8);

    // domIds에서 tocIds를 순서대로 하나씩 찾아나간다. 하나라도 못 찾거나
    // 순서가 어긋나면 실패하고, 어느 지점에서 갈렸는지 메시지에 남긴다.
    let cursor = 0;
    for (const id of tocIds) {
      const idx = domIds.indexOf(id, cursor);
      expect(
        idx,
        `id "${id}" 를 DOM 순서 ${JSON.stringify(domIds)} 에서 cursor=${cursor} 이후로 찾지 못함 (TOC 순서: ${JSON.stringify(tocIds)})`,
      ).toBeGreaterThanOrEqual(0);
      cursor = idx + 1;
    }
  });
});
