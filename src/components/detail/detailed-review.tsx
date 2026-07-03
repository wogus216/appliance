import { Appliance } from '@/types/appliance';
import { Star, Check } from 'lucide-react';
import { getDetailedReview } from '@/lib/data/detailed-reviews';

const PRICE_TIER_LABELS: Record<Appliance['priceAnalysis']['priceTier'], string> = {
  budget: '보급형',
  mid: '중급',
  premium: '프리미엄',
  luxury: '최고급',
};

export function DetailedReview({ appliance }: { appliance: Appliance }) {
  const { description, editorComment, features, priceAnalysis } = appliance;
  const tier = PRICE_TIER_LABELS[priceAnalysis.priceTier] ?? priceAnalysis.priceTier;
  const sections = getDetailedReview(appliance.slug);

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">상세 리뷰</h2>

      {/* 총평 카드 */}
      <div className="border rounded-2xl p-6 mb-5">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          <div>
            <div className="text-xs text-gray-500 mb-1.5">가성비</div>
            <div
              className="flex items-center gap-0.5"
              role="img"
              aria-label={`가성비 ${priceAnalysis.valueRating}/5`}
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  aria-hidden
                  className={`w-4 h-4 ${
                    i <= priceAnalysis.valueRating
                      ? 'fill-current text-amber-500'
                      : 'fill-none text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1.5">가격대</div>
            <span className="inline-block text-sm font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
              {tier}
            </span>
          </div>
        </div>
        {description && (
          <p className="mt-5 text-gray-700 leading-relaxed">{description}</p>
        )}
      </div>

      {/* 에디터 분석 */}
      {editorComment && (
        <div className="mb-5">
          <h3 className="font-bold text-gray-900 mb-2">에디터 분석</h3>
          <div className="bg-blue-50 rounded-xl p-5 text-gray-700 leading-relaxed">
            {editorComment}
          </div>
        </div>
      )}

      {/* 심층 리뷰 (플래그십 항목별) */}
      {sections && sections.length > 0 && (
        <div className="mb-5 space-y-5">
          {sections.map((s, i) => (
            <div key={i}>
              <h3 className="font-bold text-gray-900 mb-1.5">{s.heading}</h3>
              <p className="text-gray-700 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      )}

      {/* 핵심 기능 */}
      {features.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-900 mb-3">핵심 기능</h3>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
            {features.map((f, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
