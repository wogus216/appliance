import Link from 'next/link';
import type { ErrorCodeDirectoryGroup, ResolvedPopularCode } from '@/lib/error-codes';

/**
 * 홈 첫 화면의 에러코드 찾기.
 *
 * 서버 컴포넌트로 둔다 — 링크 전부가 정적 HTML 원문에 실려야 한다. 클라이언트 필터 안에
 * 넣으면 정적 export에서 스켈레톤만 남는다(2026-08-13 홈 스펙에서 겪었다).
 */
export function ErrorCodeFinder({
  directory,
  popular,
}: {
  directory: ErrorCodeDirectoryGroup[];
  popular: ResolvedPopularCode[];
}) {
  return (
    <section aria-labelledby="error-code-finder" className="mb-12">
      <h2 id="error-code-finder" className="text-xl font-bold text-gray-900 mb-1">
        제품군으로 찾기
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        화면에 뜬 글자를 브랜드 허브에서 찾으세요. 같은 코드라도 제품군마다 뜻이 다릅니다.
      </p>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {directory.map((g) => (
          <li key={g.category} className="rounded-2xl border p-4">
            <p className="font-semibold text-gray-900">
              {g.category}{' '}
              <span className="text-sm font-normal text-gray-400">에러코드 {g.codeCount}개</span>
            </p>
            <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm">
              {g.brands.map((b) => (
                <Link key={b.brand} href={b.href} className="text-blue-700 hover:underline">
                  {b.label} {g.category} ({b.entries.length})
                </Link>
              ))}
            </p>
          </li>
        ))}
      </ul>

      {popular.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">사람들이 많이 찾는 코드</h2>
          <p className="text-sm text-gray-500 mb-4">
            검색으로 이 사이트에 들어온 사람들이 가장 많이 찾은 코드입니다.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {popular.map((p) => (
              <li key={`${p.brand}-${p.category}-${p.code}`}>
                <Link
                  href={p.href}
                  className="flex items-baseline gap-3 rounded-xl border px-4 py-3 text-sm transition-colors hover:border-orange-300"
                >
                  <span className="font-mono font-bold text-red-600 shrink-0">{p.code}</span>
                  <span className="text-gray-900">
                    {p.label} {p.category} — {p.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
