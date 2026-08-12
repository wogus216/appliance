import type { BrandLine } from '@/types/brand';

/**
 * 라인업 네이밍 체계 — 이 페이지의 핵심 고유 콘텐츠.
 *
 * "비스포크가 뭐야", "휘센이랑 오브제 차이" 같은 검색 수요가 실재하는데 사이트
 * 어디에도 없었다. 브랜드 레벨에만 존재하는 내용이라 제품·카테고리 페이지와 겹치지 않는다.
 */
export function BrandLineupSection({ lines }: { lines: BrandLine[] }) {
  if (lines.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">라인업 이름으로 읽기</h2>
      <dl className="space-y-5">
        {lines.map((line) => (
          <div key={line.name}>
            <dt className="font-semibold text-gray-900">{line.name}</dt>
            <dd className="mt-1 text-gray-700 leading-relaxed">{line.what}</dd>
            {line.categories && line.categories.length > 0 && (
              <dd className="mt-1 text-sm text-gray-500">{line.categories.join(' · ')}</dd>
            )}
          </div>
        ))}
      </dl>
    </section>
  );
}
