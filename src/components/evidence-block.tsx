import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { SourceRef } from '@/types/source';

/**
 * "이 문서의 근거" 블록 — 에러코드 허브와 카테고리 가이드가 함께 쓴다.
 *
 * 제품 상세의 `EditorialMetaSection`과 자리·모양은 같지만 성격이 다르다. 제품 쪽은
 * "이 제품의 사양을 어디서 봤는가"이고, 여기는 "이 서술을 무엇과 대조했는가"다.
 * 후자에서는 근거가 **덮지 못하는 범위**를 밝히는 문장(`covers`)이 출처 목록만큼
 * 중요해서 별도 필드로 받는다.
 *
 * 근거가 없으면 빈 블록을 만들지 않고 `fallback`을 그대로 보여 준다 — 빈 껍데기를
 * 채우는 순간 근거 표시가 신호로서 무의미해진다(editorial.ts의 원칙과 같다).
 */
export function EvidenceBlock({
  heading = '이 문서의 근거',
  reviewedBy,
  checkedAt,
  covers,
  sources,
  fallback,
  footnote,
}: {
  heading?: string;
  reviewedBy?: string;
  checkedAt?: string;
  covers?: string;
  sources?: SourceRef[];
  /** 출처가 없을 때 대신 보여 줄 고지 */
  fallback?: React.ReactNode;
  /** 블록 맨 아래 공통 주의문 */
  footnote: React.ReactNode;
}) {
  const hasSources = !!sources?.length;

  return (
    <section aria-labelledby="evidence-heading" className="mt-12">
      <h2 id="evidence-heading" className="text-xl font-bold text-gray-900 mb-4">
        {heading}
      </h2>

      <div className="rounded-2xl border bg-gray-50 p-5 space-y-4 text-sm">
        {hasSources ? (
          <>
            {(reviewedBy || checkedAt) && (
              <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {reviewedBy && (
                  <div className="flex gap-2">
                    <dt className="text-gray-500 shrink-0">작성·검수</dt>
                    <dd className="text-gray-900 font-medium">{reviewedBy}</dd>
                  </div>
                )}
                {checkedAt && (
                  <div className="flex gap-2">
                    <dt className="text-gray-500 shrink-0">최종 검수일</dt>
                    <dd className="text-gray-900 font-medium">
                      <time dateTime={checkedAt}>{checkedAt}</time>
                    </dd>
                  </div>
                )}
              </dl>
            )}

            {covers && (
              <p className="border-t pt-4 text-gray-700 leading-relaxed">{covers}</p>
            )}

            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-800 mb-2">대조한 자료</h3>
              <ul className="space-y-1.5">
                {sources!.map((s) => (
                  <li key={s.url} className="flex gap-1.5 text-gray-700">
                    <span aria-hidden className="text-gray-300">
                      ·
                    </span>
                    <span>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {s.title}
                        <span className="sr-only"> (새 창)</span>
                      </a>
                      {s.publisher && (
                        <span className="text-gray-500"> — {s.publisher}</span>
                      )}
                      <ExternalLink
                        aria-hidden
                        className="inline w-3 h-3 ml-1 text-gray-400"
                      />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="text-gray-600 leading-relaxed space-y-2">{fallback}</div>
        )}

        <p className="border-t pt-4 text-xs text-gray-500 leading-relaxed">
          {footnote}{' '}
          처리 원칙은{' '}
          <Link href="/editorial-policy" className="text-blue-600 hover:underline">
            편집 원칙
          </Link>
          에 정리해 두었습니다.
        </p>
      </div>
    </section>
  );
}
