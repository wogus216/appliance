import Link from 'next/link';

/**
 * 에러코드 허브로 보내는 요약.
 *
 * 코드 본문을 여기 늘어놓지 않는다 — 그것은 1순위 작업에서 브랜드 허브로 통합한
 * 내용이고, 여기서 다시 쓰면 그때 없앤 중복을 되살리는 것이 된다.
 *
 * count가 0이면 pattern(브랜드별 설명)이 있을 때 그것을 싣는다 — 가전이든 아니든.
 * pattern이 없으면 비가전 브랜드에만 폴백 문장을 쓰고, 가전 브랜드는 섹션을 그리지 않는다.
 * 폴백은 "체계가 없다"가 아니라 "자료에서 확인하지 못했다"로 쓴다 — 확인한 범위만 말한다.
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
    // 코드가 0개여도 브랜드별 설명(pattern)이 있으면 싣는다(2026-10-08). 예전에는 가전 브랜드면
    // 통째로 감춰서, 공식 설명서로 교정한 문장(위닉스 dF는 고장이 아니라 자동 제상 표시 등)이
    // 화면에 나가지 않았다.
    if (!pattern && !isNonAppliance) return null;

    return (
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-2">에러코드</h2>
        <p className="text-gray-700 leading-relaxed">
          {/* 폴백은 "카테고리 특성상 에러코드 체계가 없다"였다 — 확인한 적 없는 전칭이다 */}
          {pattern ??
            `${categories.join(' · ')} 공개 모델의 제조사 자료에서 에러코드표를 확인하지 못했습니다. 고장 증상은 제조사 지원 페이지의 증상별 안내를 따르세요.`}
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
