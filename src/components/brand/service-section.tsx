import type { BrandProfile } from '@/types/brand';

/**
 * A/S 접수 번호. 번호의 출처는 페이지 하단 '근거'에 함께 실린다.
 * 2026-10-09 4차: 라벨을 '대표번호'에서 '고객센터'로 바꿨다 — LG 1544-7777은 고객센터 번호이고 회사
 * 대표번호(02-3777-1114)가 따로 있다는 사실 검증 지적. 다른 브랜드 번호도 고객·A/S 상담 창구다
 * (TCL은 쿠팡 A/S 기술지원센터라는 사실을 note가 밝힌다).
 */
export function BrandServiceSection({
  serviceCenter,
}: {
  serviceCenter: NonNullable<BrandProfile['serviceCenter']>;
}) {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-2">A/S</h2>
      <p className="text-gray-900">
        고객센터 <span className="font-semibold">{serviceCenter.phone}</span>
      </p>
      {serviceCenter.note && (
        <p className="mt-1 text-gray-700 leading-relaxed">{serviceCenter.note}</p>
      )}
    </section>
  );
}
