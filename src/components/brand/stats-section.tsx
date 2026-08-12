import type { BrandStats } from '@/lib/brand-stats';

/** 원 단위 가격을 '349만원'으로 */
function manwon(price: number): string {
  return `${Math.round(price / 10000).toLocaleString('ko-KR')}만원`;
}

/**
 * 카탈로그 파생 통계. 집필 부담이 0이고 제품이 늘면 저절로 맞는다.
 *
 * 제품이 1개인 브랜드에서는 '가격 19만~19만원' 같은 통계가 성립하지 않아 아예 감춘다.
 */
export function BrandStatsSection({ stats }: { stats: BrandStats }) {
  if (stats.productCount < 2) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-3">라인업 한눈에</h2>
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 rounded-xl bg-gray-50 p-5">
        <div>
          <dt className="text-sm text-gray-500">카테고리</dt>
          <dd className="font-semibold text-gray-900">{stats.categories.length}개</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">가격대</dt>
          <dd className="font-semibold text-gray-900">
            {manwon(stats.priceMin)}~{manwon(stats.priceMax)}
          </dd>
        </div>
        {stats.avgRating !== null && (
          <div>
            <dt className="text-sm text-gray-500">평균 평점</dt>
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
