import Link from 'next/link';

/**
 * 에러코드 허브로 보내는 요약.
 *
 * 코드 본문을 여기 늘어놓지 않는다 — 그것은 1순위 작업에서 브랜드 허브로 통합한
 * 내용이고, 여기서 다시 쓰면 그때 없앤 중복을 되살리는 것이 된다.
 *
 * count가 0인 이유는 두 가지다: 카테고리 자체에 에러코드 체계가 없거나(무선이어폰 등),
 * 전통 가전인데 단지 기록이 없거나. 후자를 "체계가 없다"고 잘못 단정하지 않기 위해
 * isNonAppliance가 true일 때만 안내 문구를 보여준다. 이때도 pattern이 있으면 그 브랜드
 * 고유의 설명을 우선 쓰고, 없을 때만 기본 문장으로 폴백한다.
 */
export function BrandErrorCodeSummary({
  brand,
  label,
  count,
  pattern,
  isNonAppliance,
  categories,
}: {
  brand: string;
  label: string;
  count: number;
  pattern?: string;
  isNonAppliance: boolean;
  categories: string[];
}) {
  if (count === 0) {
    if (!isNonAppliance) return null;

    return (
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-2">에러코드</h2>
        <p className="text-gray-700 leading-relaxed">
          {pattern ?? `${categories.join(' · ')} 제품은 카테고리 특성상 에러코드 체계가 없다.`}
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-2">에러코드</h2>
      {pattern && <p className="text-gray-700 leading-relaxed mb-2">{pattern}</p>}
      <Link href={`/error-codes/${brand}`} className="text-blue-600 hover:underline">
        {label} 제품에서 확인된 에러코드 {count}개 보기
      </Link>
    </section>
  );
}
