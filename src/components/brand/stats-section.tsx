import type { BrandStats } from '@/lib/brand-stats';
import { EDITOR_RATING_LABEL } from '@/lib/constants';

/** 원 단위 가격을 '349만원'으로 */
function manwon(price: number): string {
  return `${Math.round(price / 10000).toLocaleString('ko-KR')}만원`;
}

/**
 * 카탈로그 파생 통계. 집필 부담이 0이고 제품이 늘면 저절로 맞는다.
 *
 * 제품이 1개인 브랜드는 '가격대 19만~19만원' 같은 범위 표기 대신 단일 값을 보여준다.
 * 통계 섹션을 통째로 감추면 QCY처럼 카탈로그 제품이 1개뿐인 브랜드가 구조적으로
 * 분량을 못 채우게 되기 때문이다 — 애플·소니·앤커도 같은 구조다.
 */
export function BrandStatsSection({ stats }: { stats: BrandStats }) {
  if (stats.productCount === 0) return null;

  const isSingleProduct = stats.productCount === 1;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-3">라인업 한눈에</h2>
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 rounded-xl bg-gray-50 p-5">
        <div>
          <dt className="text-sm text-gray-500">카테고리</dt>
          <dd className="font-semibold text-gray-900">{stats.categories.length}개</dd>
        </div>
        {stats.priceMin != null && stats.priceMax != null && (
          <div>
            <dt className="text-sm text-gray-500">
              {stats.priceMin === stats.priceMax ? '가격' : '가격대'}
            </dt>
            <dd className="font-semibold text-gray-900">
              {stats.priceMin === stats.priceMax
                ? manwon(stats.priceMin)
                : `${manwon(stats.priceMin)}~${manwon(stats.priceMax)}`}
            </dd>
          </div>
        )}
        {stats.avgRating !== null && (
          <div>
            <dt className="text-sm text-gray-500">
              {isSingleProduct ? EDITOR_RATING_LABEL : `평균 ${EDITOR_RATING_LABEL}`}
            </dt>
            <dd className="font-semibold text-gray-900">{stats.avgRating}</dd>
          </div>
        )}
      </dl>

      {stats.energyGrades.length > 0 && (
        <p className="mt-3 text-sm text-gray-600">
          에너지소비효율등급{' '}
          {stats.energyGrades.map((g) => `${g.label} ${g.count}`).join(' / ')}
        </p>
      )}

      <p className="mt-2 text-sm text-gray-500">
        {stats.categories.join(' · ')}
      </p>
    </section>
  );
}
