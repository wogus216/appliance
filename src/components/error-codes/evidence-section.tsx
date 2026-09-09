import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { ErrorCodeEditorial } from '@/lib/data/editorial/error-code-editorial';

/**
 * 에러코드 허브의 근거 블록.
 *
 * 제품 상세의 `EditorialMetaSection`과 같은 자리·같은 모양이지만 문구가 다르다.
 * 제품 쪽은 "이 제품의 사양을 어디서 봤는가"이고, 여기는 "이 수리 지시를 무엇과
 * 대조했는가"다. 후자는 틀리면 사람이 다치는 문서라, 근거가 덮지 못하는 범위를
 * 함께 밝히는 `covers` 문장이 출처 목록만큼 중요하다.
 *
 * 근거가 아예 없는 브랜드에는 빈 블록을 만들지 않고 `EvidenceFallbackNotice`로
 * 무엇을 근거로 썼는지와 무엇을 확인하지 못했는지를 밝힌다.
 */
export function ErrorCodeEvidenceSection({
  brandLabel,
  meta,
}: {
  brandLabel: string;
  meta: ErrorCodeEditorial | undefined;
}) {
  if (!meta) return <EvidenceFallbackNotice brandLabel={brandLabel} />;

  return (
    <section aria-labelledby="error-code-evidence-heading" className="mt-12">
      <h2
        id="error-code-evidence-heading"
        className="text-xl font-bold text-gray-900 mb-4"
      >
        이 문서의 근거
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
        </dl>

        <p className="border-t pt-4 text-gray-700 leading-relaxed">{meta.covers}</p>

        {meta.sources.length > 0 && (
          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-800 mb-2">대조한 자료</h3>
            <ul className="space-y-1.5">
              {meta.sources.map((s) => (
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
        )}

        <p className="border-t pt-4 text-xs text-gray-500 leading-relaxed">
          코드 표기와 조치는 같은 브랜드 안에서도 모델·연식에 따라 다릅니다. 여기 실린
          내용과 제품 사용설명서가 다르면 <strong className="font-semibold text-gray-700">
          설명서를 따르세요</strong>. 설치·사용 조건이 원인인 경우에는 보증 기간 안이라도
          출장이 유상일 수 있습니다. 처리 원칙은{' '}
          <Link href="/editorial-policy" className="text-blue-600 hover:underline">
            편집 원칙
          </Link>
          에 정리해 두었습니다.
        </p>
      </div>
    </section>
  );
}

/** 공식 코드 문서를 찾지 못한 브랜드용 고지 */
function EvidenceFallbackNotice({ brandLabel }: { brandLabel: string }) {
  return (
    <section aria-labelledby="error-code-evidence-heading" className="mt-12">
      <h2
        id="error-code-evidence-heading"
        className="text-xl font-bold text-gray-900 mb-4"
      >
        이 문서의 근거
      </h2>
      <div className="rounded-2xl border bg-gray-50 p-5 text-sm text-gray-600 leading-relaxed space-y-2">
        <p>
          아래 코드는 <strong className="font-semibold text-gray-800">제품 사용설명서</strong>를
          근거로 정리했습니다. 국내에 공개된 {brandLabel} 에러코드 문서를 저희가 찾지 못해,
          제조사 자료와 코드별로 대조하지는 못했습니다.
        </p>
        <p>
          코드 표기와 조치는 모델·연식에 따라 다릅니다. 여기 실린 내용과 제품 설명서가
          다르면 <strong className="font-semibold text-gray-800">설명서를 따르세요</strong>.
          설치·사용 조건이 원인인 경우에는 보증 기간 안이라도 출장이 유상일 수 있습니다.
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
