import { EvidenceBlock } from '@/components/evidence-block';
import type { ErrorCodeEditorial } from '@/lib/data/editorial/error-code-editorial';

/**
 * 에러코드 허브의 근거 블록.
 *
 * 모양과 배치는 `EvidenceBlock`이 담당하고, 여기서는 에러코드에만 해당하는 문구를
 * 정한다 — 수리 지시는 틀리면 사람이 다치는 문서라, 설명서 우선 원칙과 유상 출장
 * 가능성을 사이트가 먼저 밝혀야 한다.
 */
export function ErrorCodeEvidenceSection({
  brandLabel,
  meta,
}: {
  brandLabel: string;
  meta: ErrorCodeEditorial | undefined;
}) {
  // 2026-10-09 4차: 공통 꼬리말 3문장(모델·연식 차이/설명서 우선/보증 유상 기준)이 허브 8곳에 반복돼
  // 한 문장으로 줄였다. 모델·연식 차이는 각 품목 안전 문구(category-notes.ts)와 코드별 설명에 있다.
  return (
    <EvidenceBlock
      reviewedBy={meta?.reviewedBy}
      checkedAt={meta?.updatedAt}
      covers={meta?.covers}
      sources={meta?.sources}
      fallback={
        <p>
          아래 코드는{' '}
          <strong className="font-semibold text-gray-800">제품 사용설명서</strong>를 근거로
          정리했습니다. 국내에 공개된 {brandLabel} 에러코드 문서를 저희가 찾지 못해,
          제조사 자료와 코드별로 대조하지는 못했습니다.
        </p>
      }
      footnote={
        <>
          여기 실린 내용과 제품 사용설명서가 다르면{' '}
          <strong className="font-semibold text-gray-700">설명서를 따르세요</strong>.
        </>
      }
    />
  );
}
