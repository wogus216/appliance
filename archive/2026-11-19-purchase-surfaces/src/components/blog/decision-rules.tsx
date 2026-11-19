import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { DecisionRule } from '@/types/blog';
import { getApplianceBySlug } from '@/lib/data/appliances';
import { BRAND_LABELS } from '@/lib/constants';

/**
 * "이런 조건이면 이걸" 목록.
 *
 * 총평 한 문단으로 끝내면 읽는 사람은 결국 자기 상황에 대입해야 한다.
 * 조건을 먼저 적고 답을 붙이면 자기 줄만 찾아 읽으면 된다.
 * 근거 제품이 있으면 상세로 보낸다 — 결론이 허공에 뜨지 않도록.
 */
export function DecisionRules({ rules }: { rules: DecisionRule[] }) {
  if (rules.length === 0) return null;

  return (
    <section aria-labelledby="decision-heading" className="scroll-mt-32" id="decision">
      {/* 2026-10-09 4차: 18편 모두에 같은 도입문("해당하는 줄만 읽으셔도 됩니다…우리 집에서…")이 붙어
          상용구로 지적됐고, '우리 집'은 이어폰 글에도 나갔다. 표 자체가 조건→결론 형식이라 도입문을 뺐다. */}
      <h2 id="decision-heading" className="text-2xl font-bold text-gray-900 mb-5">
        조건별 결론
      </h2>
      <ol className="space-y-3">
        {rules.map((rule, i) => {
          const product = rule.productSlug ? getApplianceBySlug(rule.productSlug) : undefined;
          return (
            <li key={i} className="rounded-2xl border p-5">
              <p className="mb-2 flex gap-2 font-bold text-gray-900">
                <span aria-hidden className="text-blue-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{rule.when}</span>
              </p>
              <p className="pl-7 leading-relaxed text-gray-700">{rule.then}</p>
              {product && (
                <p className="pl-7 pt-3">
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
                  >
                    {BRAND_LABELS[product.brand] || product.brand} {product.name} 자세히 보기
                    <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                  </Link>
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
