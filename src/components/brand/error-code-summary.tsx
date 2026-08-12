import Link from 'next/link';

/**
 * 에러코드 허브로 보내는 요약.
 *
 * 코드 본문을 여기 늘어놓지 않는다 — 그것은 1순위 작업에서 브랜드 허브로 통합한
 * 내용이고, 여기서 다시 쓰면 그때 없앤 중복을 되살리는 것이 된다.
 */
export function BrandErrorCodeSummary({
  brand,
  label,
  count,
  pattern,
}: {
  brand: string;
  label: string;
  count: number;
  pattern?: string;
}) {
  if (count === 0) return null;

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
