import Link from 'next/link';

/**
 * 에러코드 허브로 보내는 요약.
 *
 * 코드 본문을 여기 늘어놓지 않는다 — 그것은 1순위 작업에서 브랜드 허브로 통합한
 * 내용이고, 여기서 다시 쓰면 그때 없앤 중복을 되살리는 것이 된다.
 *
 * count가 0이면 pattern(브랜드별 설명)이 있을 때만 그것을 싣고, 없으면 섹션을 그리지 않는다.
 * 2026-10-09 4차: 비가전 브랜드용 폴백 문장("…에러코드표를 확인하지 못했습니다. 고장 증상은 제조사
 * 지원 페이지의 증상별 안내를 따르세요.")이 애플·소니·앤커 세 페이지에 똑같이 나가 정형구로 지적됐다.
 * 그 문장은 아무 판단도 더하지 않아 폴백을 없앴다(isNonAppliance·categories는 호출부 호환으로 남김).
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
    // 코드가 0개여도 브랜드별 설명(pattern)이 있으면 싣는다(2026-10-08) — 위닉스 dF처럼 공식 설명서로
    // 교정한 문장이 화면에 나가도록. 설명이 없으면 그리지 않는다.
    if (!pattern) return null;
    void isNonAppliance;
    void categories;

    return (
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-2">에러코드</h2>
        <p className="text-gray-700 leading-relaxed">{pattern}</p>
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
