import { Check, X } from 'lucide-react';
import { Appliance } from '@/types/appliance';
import { PRICE_TIER_LABELS } from '@/lib/constants';
import { StarRating } from '@/components/detail/star-rating';

/**
 * 섹션 ② — "그래서 살 만한가".
 * 스캔 가능한 결론(총평·추천/비추천)을 먼저 주고, 긴 산문인 에디터 분석은 근거로 뒤에 둔다.
 */
export function VerdictSection({ appliance }: { appliance: Appliance }) {
  const { description, editorComment, priceAnalysis, targetUsers } = appliance;
  const tier = PRICE_TIER_LABELS[priceAnalysis.priceTier] ?? priceAnalysis.priceTier;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">총평</h2>

      <div className="border rounded-2xl p-6 mb-5">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          <div>
            <div className="text-xs text-gray-500 mb-1.5">가성비</div>
            <StarRating rating={priceAnalysis.valueRating} label="가성비" />
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1.5">가격대</div>
            <span className="inline-block text-sm font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
              {tier}
            </span>
          </div>
        </div>
        {description && <p className="mt-5 text-gray-700 leading-relaxed">{description}</p>}
      </div>

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
          <div className="bg-blue-50 rounded-xl p-5 text-gray-700 leading-relaxed">
            {editorComment}
          </div>
        </div>
      )}
    </section>
  );
}
