import { Zap, Lightbulb, CircleCheck } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

function formatMan(price: number) {
  return Math.round(price / 10000) + '만원';
}

// 에너지등급별 전력 소비 배율 (1등급 대비)
const GRADE_MULTIPLIER: Record<string, number> = {
  '1등급': 1,
  '2등급': 1.25,
  '3등급': 1.55,
  '4등급': 1.9,
  '5등급': 2.3,
};

type Props = {
  currentGrade: string;
  monthlyElecCost: number;
  purchasePrice: number;
};

export function EnergyGradeImpact({ currentGrade, monthlyElecCost, purchasePrice }: Props) {
  const currentMultiplier = GRADE_MULTIPLIER[currentGrade] || 1;
  const grade1Monthly = monthlyElecCost / currentMultiplier;

  const grades = Object.entries(GRADE_MULTIPLIER).map(([grade, mult]) => {
    const monthly = grade1Monthly * mult;
    const yearly = monthly * 12;
    const ten_year = yearly * 10;
    const diff_from_1 = ten_year - (grade1Monthly * 12 * 10);
    return { grade, monthly, yearly, ten_year, diff_from_1, isCurrent: grade === currentGrade };
  });

  const currentGradeData = grades.find(g => g.isCurrent);
  const grade1Data = grades[0];
  const savingsVs1 = currentGradeData ? currentGradeData.ten_year - grade1Data.ten_year : 0;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-yellow-500" />
        에너지등급이 전기요금에 미치는 영향
      </h2>
      <div className="bg-white border rounded-2xl p-6 space-y-6">
        {/* 등급별 비교 테이블 */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-600">등급</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-600">월 전기요금</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-600">연간</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-600">10년 총액</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-600">1등급 대비</th>
              </tr>
            </thead>
            <tbody>
              {grades.map(g => (
                <tr
                  key={g.grade}
                  className={`border-b border-gray-100 ${
                    g.isCurrent ? 'bg-blue-50 font-semibold' : ''
                  }`}
                >
                  <td className="py-2.5 px-3">
                    <span className={`inline-flex items-center gap-1 ${g.isCurrent ? 'text-blue-700' : 'text-gray-700'}`}>
                      {g.grade}
                      {g.isCurrent && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-blue-600 text-white rounded-full">이 제품</span>
                      )}
                    </span>
                  </td>
                  <td className="text-right py-2.5 px-3 text-gray-900">
                    {formatPrice(g.monthly)}
                  </td>
                  <td className="text-right py-2.5 px-3 text-gray-900">
                    {formatPrice(g.yearly)}
                  </td>
                  <td className="text-right py-2.5 px-3 text-gray-900">
                    {formatMan(g.ten_year)}
                  </td>
                  <td className={`text-right py-2.5 px-3 ${
                    g.diff_from_1 === 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {g.diff_from_1 === 0 ? '-' : `+${formatMan(g.diff_from_1)}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 핵심 인사이트 */}
        {savingsVs1 > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm font-bold text-amber-800 flex items-start gap-2">
              <Lightbulb className="w-5 h-5 shrink-0" aria-hidden />
              <span>이 제품({currentGrade})을 10년 쓰면, 1등급 대비 전기요금이 약 {formatMan(savingsVs1)} 더 나옵니다.</span>
            </p>
            <p className="text-xs text-amber-700 mt-1">
              {savingsVs1 > purchasePrice * 0.5
                ? `구매가 차이(${formatMan(purchasePrice)})의 절반 이상이 전기요금으로 나가는 구조입니다. 1등급 제품과 총비용을 비교해보세요.`
                : '구매가 절약분이 크기 때문에 총비용은 여전히 유리할 수 있습니다.'}
            </p>
          </div>
        )}

        {savingsVs1 === 0 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm font-bold text-green-800 flex items-start gap-2">
              <CircleCheck className="w-5 h-5 shrink-0" aria-hidden />
              <span>최고 효율 1등급 — 동일 카테고리 제품 중 전기요금이 가장 적습니다.</span>
            </p>
          </div>
        )}

        {/* 시각적 비유 */}
        <div className="text-center text-sm text-gray-500 pt-2">
          <p>
            {currentGradeData && (
              <>월 전기요금 {formatPrice(currentGradeData.monthly)}은 매달 <span className="font-semibold text-gray-900">
              {currentGradeData.monthly < 15000 ? '커피 3잔' :
               currentGradeData.monthly < 25000 ? '치킨 1마리' :
               currentGradeData.monthly < 40000 ? '외식 1회' :
               '통신비 수준'}
              </span> 정도입니다</>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
