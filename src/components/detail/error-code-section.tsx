import Link from 'next/link';
import { ErrorCode, ApplianceCategory } from '@/types/appliance';
import { BRAND_LABELS } from '@/lib/constants';
import { resolveErrorCodeAnchor } from '@/lib/error-codes';

const SEVERITY_STYLES = {
  low: 'bg-green-50 text-green-800 border-green-200',
  medium: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  high: 'bg-red-50 text-red-800 border-red-200',
};

const SEVERITY_LABELS = {
  low: '경미',
  medium: '주의',
  high: '긴급',
};

/**
 * 제품 상세의 에러코드 요약.
 *
 * 원인·해결 전문은 브랜드 허브가 갖는다. 같은 글을 양쪽에 두면 사이트 안에서
 * 복제가 되므로 여기서는 코드와 증상만 보여주고 허브의 해당 위치로 보낸다.
 */
export function ErrorCodeSection({
  errorCodes,
  brand,
  category,
}: {
  errorCodes: ErrorCode[];
  brand: string;
  category: ApplianceCategory;
}) {
  const brandLabel = BRAND_LABELS[brand] || brand;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        {brandLabel} 에러코드 자가진단
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        이 제품에 표시될 수 있는 에러코드 {errorCodes.length}개입니다. 코드를 누르면 원인과
        해결 방법을 볼 수 있습니다.
      </p>

      <ul className="space-y-2">
        {errorCodes.map((error) => (
          <li key={error.code}>
            <Link
              href={resolveErrorCodeAnchor(brand, category, error)}
              className={`flex items-center gap-3 rounded-xl border p-3 transition-colors hover:border-blue-300 ${
                SEVERITY_STYLES[error.severity]
              }`}
            >
              <span className="font-mono font-bold shrink-0">{error.code}</span>
              <span className="text-sm flex-1">{error.description}</span>
              <span className="text-xs px-2 py-0.5 rounded-full border font-medium shrink-0">
                {SEVERITY_LABELS[error.severity]}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-sm">
        <Link href={`/error-codes/${brand}`} className="text-blue-600 hover:underline">
          {brandLabel} 에러코드 전체 보기 →
        </Link>
      </p>
    </section>
  );
}
