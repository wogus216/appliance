import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { EditorialMeta } from '@/types/editorial';

/**
 * 편집 신뢰 정보 — 누가 썼고, 언제 검수했고, 무엇을 근거로 했는가.
 *
 * 메타데이터가 없는 제품에는 빈 껍데기("출처: 없음")를 만들지 않는다. 대신 무엇을
 * 근거로 썼는지(제조사 공개 사양)와 외부 출처 링크가 아직 없다는 사실을 밝히고
 * 평가 방법 안내로 보낸다. 근거의 범위를 감추지 않는 것이 신뢰 신호의 핵심이다.
 */
export function EditorialMetaSection({ meta }: { meta: EditorialMeta | undefined }) {
  if (!meta) return <EditorialFallbackNotice />;

  return (
    <section aria-labelledby="editorial-meta-heading">
      <h2 id="editorial-meta-heading" className="text-xl font-bold text-gray-900 mb-4">
        이 글의 근거
      </h2>

      <div className="rounded-2xl border bg-gray-50 p-5 space-y-4 text-sm">
        <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
          <div className="flex gap-2">
            <dt className="text-gray-500 shrink-0">작성·검수</dt>
            <dd className="text-gray-900 font-medium">{meta.reviewedBy}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-gray-500 shrink-0">최종 검수일</dt>
            <dd className="text-gray-900 font-medium">
              <time dateTime={meta.updatedAt}>{meta.updatedAt}</time>
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-gray-500 shrink-0">최초 작성일</dt>
            <dd className="text-gray-900 font-medium">
              <time dateTime={meta.publishedAt}>{meta.publishedAt}</time>
            </dd>
          </div>
          {meta.priceCheckedAt && (
            <div className="flex gap-2">
              <dt className="text-gray-500 shrink-0">가격 확인일</dt>
              <dd className="text-gray-900 font-medium">
                <time dateTime={meta.priceCheckedAt}>{meta.priceCheckedAt}</time>
              </dd>
            </div>
          )}
        </dl>

        {meta.sources.length > 0 && (
          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-800 mb-2">참고한 자료</h3>
            <ul className="space-y-1.5">
              {meta.sources.map((s) => (
                <li key={s.url} className="flex gap-1.5 text-gray-700">
                  <span aria-hidden className="text-gray-300">·</span>
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
                    {s.publisher && <span className="text-gray-500"> — {s.publisher}</span>}
                    <ExternalLink aria-hidden className="inline w-3 h-3 ml-1 text-gray-400" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="border-t pt-4 text-xs text-gray-500 leading-relaxed">
          점수는 살림랩 편집팀이 공개 스펙과 공개된 리뷰를 근거로 매긴{' '}
          <strong className="font-semibold text-gray-700">에디터 평가</strong>입니다. 산출 방법은{' '}
          <Link href="/methodology" className="text-blue-600 hover:underline">
            평가 방법
          </Link>
          , 출처·후기 처리 원칙은{' '}
          <Link href="/editorial-policy" className="text-blue-600 hover:underline">
            편집 원칙
          </Link>
          에 정리해 두었습니다.
        </p>
      </div>
    </section>
  );
}

/**
 * 외부 출처 링크가 아직 없는 제품용 고지.
 *
 * noindex 여부는 메타태그로 이미 기계가 읽을 수 있다. 방문자에게까지 "이 페이지는
 * 색인에서 뺐다"고 말할 필요는 없어서, 밝혀야 할 것(근거의 범위)만 적는다.
 */
function EditorialFallbackNotice() {
  return (
    <section aria-labelledby="editorial-meta-heading">
      <h2 id="editorial-meta-heading" className="text-xl font-bold text-gray-900 mb-4">
        이 글의 근거
      </h2>
      <div className="rounded-2xl border bg-gray-50 p-5 text-sm text-gray-600 leading-relaxed space-y-2">
        <p>
          이 제품 문서는 살림랩 편집팀이 <strong className="font-semibold text-gray-800">제조사가
          공개한 사양</strong>을 근거로 작성했습니다. 개별 외부 출처 링크는 아직 붙이지
          않았습니다 — 직접 확인한 자료만 싣는다는 편집 원칙 때문입니다.
        </p>
        <p>
          점수는 모두 <strong className="font-semibold text-gray-800">에디터 평가</strong>이며 실제
          구매자 후기가 아닙니다. 산출 방법은{' '}
          <Link href="/methodology" className="text-blue-600 hover:underline">
            평가 방법
          </Link>
          , 출처·후기 처리 원칙은{' '}
          <Link href="/editorial-policy" className="text-blue-600 hover:underline">
            편집 원칙
          </Link>
          을 참고하세요.
        </p>
      </div>
    </section>
  );
}
