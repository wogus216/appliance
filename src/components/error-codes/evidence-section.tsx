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
          코드 표기와 조치는 같은 브랜드 안에서도 모델·연식에 따라 다릅니다. 여기 실린
          내용과 제품 사용설명서가 다르면{' '}
          <strong className="font-semibold text-gray-700">설명서를 따르세요</strong>.
          설치·사용 조건이 원인인 경우에는 보증 기간 안이라도 출장이 유상일 수 있습니다.
        </>
      }
    />
  );
}
