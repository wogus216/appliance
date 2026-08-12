import type { BrandProfile } from '@/types/brand';

/** A/S 대표번호. 번호의 출처는 페이지 하단 '근거'에 함께 실린다 */
export function BrandServiceSection({
  serviceCenter,
}: {
  serviceCenter: NonNullable<BrandProfile['serviceCenter']>;
}) {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-2">A/S</h2>
      <p className="text-gray-900">
        대표번호 <span className="font-semibold">{serviceCenter.phone}</span>
      </p>
      {serviceCenter.note && (
        <p className="mt-1 text-gray-700 leading-relaxed">{serviceCenter.note}</p>
      )}
    </section>
  );
}
