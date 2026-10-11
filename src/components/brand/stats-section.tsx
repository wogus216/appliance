import type { BrandStats } from '@/lib/brand-stats';
import { formatPrice } from '@/lib/utils';

/** 가격을 확인한 제품 수와 그 가격들의 조사일 — 브랜드 페이지가 카탈로그에서 넘긴다 */
export interface BrandPriceInfo {
  pricedCount: number;
  /** 중복 없는 조사일, 오래된 순 */
  dates: string[];
}

/**
 * brand-stats.ts의 '대상 아님' 묶음을 화면에서는 '등급 미기재'로 읽는다.
 *
 * 그 묶음은 "이 사이트 데이터에 등급이 없다"는 뜻일 뿐이다. 식기세척기(쿠쿠 CDW-A0611TW·
 * SK매직 DWA-81R0D)와 공기청정기(샤오미)는 효율관리기자재 지정품목인데 '대상 아님'으로
 * 나가고 있었다(2026-10-08). 라이브러리 라벨은 테스트가 붙들고 있어 표시만 바꾼다.
 */
function gradeLabel(label: string): string {
  return label === '대상 아님' ? '등급 미기재' : label;
}

/**
 * 카탈로그 파생 통계. 집필 부담이 0이고 제품이 늘면 저절로 맞는다.
 *
 * 제품이 1개인 브랜드는 '가격대 19만~19만원' 같은 범위 표기 대신 단일 값을 보여준다.
 * 통계 섹션을 통째로 감추면 QCY처럼 카탈로그 제품이 1개뿐인 브랜드가 구조적으로
 * 분량을 못 채우게 되기 때문이다 — 애플·소니·앤커도 같은 구조다.
 *
 * 가격은 만원 단위로 반올림하지 않는다(2026-10-08). 449,000원이 '45만원'으로 나가
 * 같은 페이지 총평의 '44만원대'와 어긋났다. 조사일과, 가격을 확인한 제품이 일부뿐이면
 * 그 비율을 함께 적는다 — 로보락은 2개 중 1개만 가격이 있는데 '가격 177만원'으로 나갔다.
 */
export function BrandStatsSection({
  stats,
  priceInfo,
}: {
  stats: BrandStats;
  priceInfo?: BrandPriceInfo;
}) {
  if (stats.productCount === 0) return null;

  const priceNotes = [
    ...(priceInfo && priceInfo.dates.length > 0 ? [`${priceInfo.dates.join('·')} 조사`] : []),
    ...(priceInfo && priceInfo.pricedCount < stats.productCount
      ? [`${stats.productCount}개 중 ${priceInfo.pricedCount}개만 가격 확인`]
      : []),
  ];

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-3">라인업 한눈에</h2>
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 rounded-xl bg-gray-50 p-5">
        <div>
          <dt className="text-sm text-gray-500">카테고리</dt>
          <dd className="font-semibold text-gray-900">{stats.categories.length}개</dd>
        </div>
        {stats.priceMin != null && stats.priceMax != null && (
          <div className="col-span-2 sm:col-span-2">
            <dt className="text-sm text-gray-500">
              {stats.priceMin === stats.priceMax ? '조사 가격' : '조사 가격 범위'}
            </dt>
            <dd className="font-semibold text-gray-900">
              {stats.priceMin === stats.priceMax
                ? formatPrice(stats.priceMin)
                : `${formatPrice(stats.priceMin)}~${formatPrice(stats.priceMax)}`}
            </dd>
            {priceNotes.length > 0 && (
              <dd className="text-xs text-gray-500 mt-0.5">{priceNotes.join(' · ')}</dd>
            )}
          </div>
        )}
      </dl>

      {stats.energyGrades.length > 0 && (
        <p className="mt-3 text-sm text-gray-600">
          에너지소비효율등급{' '}
          {stats.energyGrades.map((g) => `${gradeLabel(g.label)} ${g.count}`).join(' / ')}
          {/* 2026-10-09 4차: 샤오미 페이지에서 '등급 미기재 1'과 총평의 '효율 2~3등급'이 어긋나 보인다는 지적 —
              이 칸이 무엇을 세는지 같은 자리에서 밝힌다 */}
          {stats.energyGrades.some((g) => g.label === '대상 아님') && (
            <span className="block text-xs text-gray-500 mt-0.5">
              등급 미기재는 이 사이트가 모델의 등급을 한 값으로 확인해 등급 칸에 싣지 않은 제품 수입니다.
              신고값이 갈리거나 확인하지 못한 사정은 제품 글과 아래 총평에 적었습니다.
            </span>
          )}
        </p>
      )}

      <p className="mt-2 text-sm text-gray-500">
        {stats.categories.join(' · ')}
      </p>
    </section>
  );
}
