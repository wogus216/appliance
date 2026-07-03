import Link from 'next/link';
import { ErrorCode } from '@/types/appliance';
import { BRAND_LABELS } from '@/lib/constants';
import { errorCodeHref } from '@/lib/error-codes';

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

export function ErrorCodeSection({
  errorCodes,
  brand,
}: {
  errorCodes: ErrorCode[];
  brand: string;
}) {
  const brandLabel = BRAND_LABELS[brand] || brand;

  const severityCounts = errorCodes.reduce(
    (acc, e) => {
      acc[e.severity] += 1;
      return acc;
    },
    { high: 0, medium: 0, low: 0 } as Record<ErrorCode['severity'], number>,
  );

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        {brandLabel} 에러코드 자가진단
      </h2>
      <p className="text-sm text-gray-500 mb-3">
        에러코드가 표시될 때 아래 해결법을 먼저 시도하세요. 반복되면 서비스센터에 연락하세요.
      </p>

      {/* 요약 */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-sm font-semibold text-gray-700">
          총 {errorCodes.length}개
        </span>
        {severityCounts.high > 0 && (
          <span className="text-xs px-2 py-1 rounded-full border bg-red-50 text-red-800 border-red-200">
            긴급 {severityCounts.high}
          </span>
        )}
        {severityCounts.medium > 0 && (
          <span className="text-xs px-2 py-1 rounded-full border bg-yellow-50 text-yellow-800 border-yellow-200">
            주의 {severityCounts.medium}
          </span>
        )}
        {severityCounts.low > 0 && (
          <span className="text-xs px-2 py-1 rounded-full border bg-green-50 text-green-800 border-green-200">
            경미 {severityCounts.low}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {errorCodes.map((error) => (
          <div
            key={error.code}
            className={`border rounded-xl p-5 ${SEVERITY_STYLES[error.severity]}`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg">
                에러코드:{' '}
                <Link
                  href={errorCodeHref(brand, error.code)}
                  className="underline decoration-dotted underline-offset-2 hover:text-blue-600"
                >
                  {error.code}
                </Link>
              </h3>
              <span className="text-xs px-2 py-1 rounded-full border font-medium">
                {SEVERITY_LABELS[error.severity]}
              </span>
            </div>
            <p className="font-medium mb-2">{error.description}</p>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">원인:</span> {error.cause}</p>
              <p><span className="font-medium">해결:</span> {error.solution}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
