import { Check, X } from 'lucide-react';
import { Appliance } from '@/types/appliance';
import { getProductReadingScope } from '@/lib/product-evidence';

/**
 * 섹션 ② — "그래서 살 만한가".
 * 스캔 가능한 결론(총평·추천/비추천)을 먼저 주고, 긴 산문인 에디터 분석은 근거로 뒤에 둔다.
 */
export function VerdictSection({ appliance }: { appliance: Appliance }) {
  const { description, editorComment, targetUsers } = appliance;
  const scope = getProductReadingScope(appliance);

  return (
    <section>
      {/* 제목은 '결론' — 심층리뷰(⑥)의 마무리 소제목이 74개 제품 전부 '총평'이라
          여기서도 '총평'을 쓰면 한 페이지에 같은 이름의 heading이 두 번 나온다.
          TOC 칩 라벨(buildProductToc의 'verdict')과도 이 이름이 맞는다. */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">결론</h2>

      {/* 가성비 별점(2026-09-27)과 가격대 칩(2026-10-08)이 있던 자리다. 둘 다 기준을 공개할 수
          없는 편집 판단이라 걷었다 — 가격대는 가격을 모르는 제품에도 '프리미엄'을 띄웠다
          (value-section.tsx 주석). 남는 것은 제품 설명뿐이다. */}
      {description && (
        <div className="border rounded-2xl p-6 mb-5">
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4 mb-5">
        <div className="bg-green-50 rounded-xl p-6">
          <h3 className="font-bold text-green-800 mb-3">이런 분께 추천</h3>
          <ul className="space-y-2">
            {targetUsers.recommended.map((r, i) => (
              <li key={i} className="text-sm text-green-700 flex gap-2">
                <Check className="w-4 h-4 shrink-0 mt-0.5 text-green-600" aria-hidden="true" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 rounded-xl p-6">
          <h3 className="font-bold text-red-800 mb-3">이런 분께 비추천</h3>
          <ul className="space-y-2">
            {targetUsers.notRecommended.map((r, i) => (
              <li key={i} className="text-sm text-red-700 flex gap-2">
                <X className="w-4 h-4 shrink-0 mt-0.5 text-red-500" aria-hidden="true" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {editorComment && (
        <div>
          <h3 className="font-bold text-gray-900 mb-2">에디터 분석</h3>
          <div className="bg-blue-50 rounded-xl p-5 text-blue-950 leading-relaxed">
            {editorComment}
          </div>
        </div>
      )}
      <div className="mt-6 border-t border-gray-200 pt-5 text-sm leading-relaxed" aria-labelledby="reading-scope-heading">
        <h3 id="reading-scope-heading" className="font-bold text-gray-900">이 자료로 어디까지 판단할 수 있나요?</h3>
        <p className="mt-2 text-gray-700">{appliance.modelNumber}의 공개 자료를 분석했습니다. 제품을 직접 사용·측정한 평가가 아닙니다.</p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div><h4 className="font-semibold text-gray-900">자료로 비교할 수 있는 조건</h4><ul className="mt-2 list-disc space-y-2 pl-5 text-gray-700">{scope.canJudge.map((text) => <li key={text}>{text}</li>)}</ul></div>
          <div><h4 className="font-semibold text-gray-900">실측·상담이 더 필요한 질문</h4><ul className="mt-2 list-disc space-y-2 pl-5 text-gray-700">{scope.needsChecking.map((text) => <li key={text}>{text}</li>)}</ul></div>
        </div>
        <a href="#sources" className="mt-4 inline-flex min-h-11 items-center font-semibold text-blue-700 underline underline-offset-4">원문과 항목별 확인일 보기</a>
      </div>
    </section>
  );
}
