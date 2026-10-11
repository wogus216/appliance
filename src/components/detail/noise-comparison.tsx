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

  // 2026-10-09 4차: 같은 품목에 비교할 소음 표기가 없으면(S834 — 냉장고 4개 중 유일) H2 절 전체가 "비교 대상
  // 없음" 설명이라는 지적. 절은 남기고(TOC 'risk' 앵커·detail-sections-dom 테스트) 한 문장으로 줄인다.
  if (others.length === 0) {
    return (
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-blue-600" aria-hidden />
          소음 {noise}dB
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          제조사가 이 모델({appliance.modelNumber}) 사양에 적은 표기값입니다. 이 사이트가 다루는{' '}
          {appliance.category} {sameCategory.length}개 중 소음을 표기한 모델이 이 제품뿐이라, 생활 소음
          예시나 다른 모델과의 정숙성 비교는 하지 않습니다.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Volume2 className="w-5 h-5 text-blue-600" aria-hidden />
        소음 {noise}dB — 이 숫자로 할 수 있는 비교
      </h2>
      <div className="bg-white border rounded-2xl p-6 space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>
          {noise}dB는 제조사가 이 모델({appliance.modelNumber}) 사양에 공개한 소음 표기값입니다.
          측정 거리와 운전 상태는 확인하지 못해, 생활 소음 예시와 같은 잣대에 놓거나
          &lsquo;조용함·보통&rsquo; 같은 등급으로 바꾸지 않았습니다.
        </p>
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
      </div>
    </section>
  );
}
