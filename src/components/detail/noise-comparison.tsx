import { Volume2 } from 'lucide-react';
import type { Appliance } from '@/types/appliance';
import { BRAND_LABELS } from '@/lib/constants';
import { allAppliances } from '@/lib/data/appliances';

/**
 * 소음(dB) 표기값과, 그 값으로 할 수 있는 비교.
 *
 * 예전에는 이 값을 '속삭임 30dB·조용한 도서관 35dB·가정용 냉장고 45dB' 같은 생활 소음
 * 예시와 막대로 나란히 놓고 '보통 — 일상생활에 큰 방해 없음', '수면 모드 사용 권장 — 약풍/
 * 수면 모드로 전환하세요', 'WHO 권장 야간 소음 기준(35dB 이하)' 같은 판정을 붙였다(2026-10-08 제거).
 *  - 생활 소음 예시 값과 WHO 문구에는 출처가 없었다.
 *  - 제조사 표기 dB는 측정 거리·운전 상태를 이 사이트가 확인하지 못한 값이라, 생활 소음과
 *    같은 잣대에 놓을 수 없다(/methodology '이 방법의 한계').
 *  - 공개 제품 중 이 컴포넌트가 그려지는 것은 냉장고 S834MWW1D 하나였는데, 냉장고에
 *    '약풍/수면 모드'를 권했고, 예시 줄의 '가정용 냉장고 45dB'와 제품 36dB가 서로 어긋났다.
 *    같은 제품 본문은 "36dB 표기만으로 다른 모델과 정숙성을 비교하지 않는다"고 쓰고 있었다.
 * 그래서 지금은 표기값과, 같은 품목의 공개 제품 중 소음 표기를 확인한 모델만 보여 준다.
 */
export function NoiseComparison({ appliance }: { appliance: Appliance }) {
  const noise = appliance.specs.noise;
  if (noise == null) return null;

  const sameCategory = allAppliances.filter((a) => a.category === appliance.category);
  const others = sameCategory.filter(
    (a) => a.slug !== appliance.slug && a.specs.noise != null,
  );

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Volume2 className="w-5 h-5 text-blue-600" aria-hidden />
        소음 {noise}dB — 이 숫자로 할 수 있는 비교
      </h2>
      <div className="bg-white border rounded-2xl p-6 space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>
          {noise}dB는 제조사가 이 모델({appliance.modelNumber}) 사양에 공개한 소음 표기값입니다.
          측정 거리와 운전 상태는 확인하지 못해, 속삭임·도서관 같은 생활 소음 예시와 같은
          잣대에 놓거나 &lsquo;조용함·보통&rsquo; 같은 등급으로 바꾸지 않았습니다.
        </p>
        {others.length === 0 ? (
          <p>
            이 사이트가 다루는 {appliance.category} {sameCategory.length}개 중 소음 표기값을 확인한
            모델은 이 제품뿐이라, 정숙성으로 순위를 매길 같은 기준의 비교 대상이 없습니다. 소음이
            고르는 기준이라면 후보 모델의 제조사 사양에서 소음 표기와 그 측정 조건을 찾아 대조하세요.
          </p>
        ) : (
          <>
            <p>같은 품목에서 소음 표기값을 확인한 다른 공개 제품입니다.</p>
            <ul className="list-disc pl-5 space-y-1">
              {others.map((a) => (
                <li key={a.slug}>
                  {BRAND_LABELS[a.brand] || a.brand} {a.name} — {a.specs.noise}dB
                </li>
              ))}
            </ul>
            <p>
              제조사마다 측정 조건이 다를 수 있어, 조건이 같다고 확인된 경우에만 숫자 차이를
              정숙성 차이로 읽으세요.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
