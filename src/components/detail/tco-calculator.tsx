'use client';

import { useState } from 'react';
import { Calculator, TrendingDown, AlertTriangle } from 'lucide-react';
import { Appliance } from '@/types/appliance';
import { formatPrice } from '@/lib/utils';

function formatMan(price: number) {
  return Math.round(price / 10000) + '만원';
}

export function TcoCalculator({ appliance }: { appliance: Appliance }) {
  const [years, setYears] = useState(10);
  const [hoursPerDay, setHoursPerDay] = useState(8);

  const monthlyElec = appliance.techSpecs.monthlyElectricityCost || 0;
  // 하루 8시간 기준 월 전기요금 → 실사용 시간에 비례 조정
  const adjustedMonthly = monthlyElec * (hoursPerDay / 8);
  const totalElec = adjustedMonthly * 12 * years;
  const filterCost = years * 30000; // 연간 필터/소모품 약 3만원
  const purchasePrice = appliance.priceAnalysis.streetPrice || appliance.price;
  const totalCost = purchasePrice + totalElec + filterCost;
  const monthlyCost = totalCost / (years * 12);

  // 에너지등급별 전기요금 비교 (1등급 vs 현재)
  const grade = appliance.techSpecs.energyGrade;
  // 효율등급 비대상 품목(선풍기·정수기·로봇청소기 등)은 등급이 없어 gradeNum=0 → 등급 배너 미표시
  const gradeNum = grade ? parseInt(grade.replace('등급', '')) : 0;
  const grade1Monthly = monthlyElec * (gradeNum === 1 ? 1 : 0.6); // 1등급 대비 추정
  const gradeDiffYearly = (adjustedMonthly - grade1Monthly * (hoursPerDay / 8)) * 12;
  const gradeDiffTotal = gradeDiffYearly * years;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Calculator className="w-5 h-5 text-blue-600" />
        {years}년 총비용 계산기
      </h2>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 space-y-6">
        {/* 조절 슬라이더 */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tco-years" className="text-sm font-medium text-gray-700 mb-1 block">
              사용 기간: <span className="text-blue-700 font-bold">{years}년</span>
            </label>
            <input
              id="tco-years"
              type="range"
              min={3}
              max={15}
              value={years}
              onChange={e => setYears(Number(e.target.value))}
              aria-label="사용 기간"
              aria-valuetext={`${years}년`}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>3년</span><span>15년</span>
            </div>
          </div>
          <div>
            <label htmlFor="tco-hours" className="text-sm font-medium text-gray-700 mb-1 block">
              하루 사용: <span className="text-blue-700 font-bold">{hoursPerDay}시간</span>
            </label>
            <input
              id="tco-hours"
              type="range"
              min={2}
              max={16}
              value={hoursPerDay}
              onChange={e => setHoursPerDay(Number(e.target.value))}
              aria-label="하루 사용 시간"
              aria-valuetext={`${hoursPerDay}시간`}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>2시간</span><span>16시간</span>
            </div>
          </div>
        </div>

        {/* 비용 분해 */}
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-blue-100">
            <span className="text-sm text-gray-600">구매가 (실거래가)</span>
            <span className="font-semibold text-gray-900">{formatPrice(purchasePrice)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-blue-100">
            <span className="text-sm text-gray-600">전기요금 ({years}년, 하루 {hoursPerDay}시간)</span>
            <span className="font-semibold text-gray-900">{formatPrice(totalElec)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-blue-100">
            <span className="text-sm text-gray-600">소모품 (필터 등, {years}년)</span>
            <span className="font-semibold text-gray-900">{formatPrice(filterCost)}</span>
          </div>
          <div className="flex justify-between items-center py-3 bg-white/60 rounded-xl px-4">
            <span className="font-bold text-gray-900">
              {years}년 총비용
            </span>
            <span className="text-2xl font-black text-blue-700">{formatMan(totalCost)}</span>
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-500">
              월 평균 <span className="font-bold text-gray-900">{formatPrice(monthlyCost)}</span>
            </span>
          </div>
        </div>

        {/* 에너지등급 경고 */}
        {gradeNum >= 3 && (
          <div className="flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-800">
                {grade} → 1등급 제품 대비 {years}년간 약 {formatMan(gradeDiffTotal)} 전기요금 추가
              </p>
              <p className="text-xs text-amber-600 mt-1">
                구매가가 싸도 전기요금까지 합치면 역전될 수 있습니다.
                {gradeDiffTotal > purchasePrice * 0.3 && ' 1등급 제품을 함께 비교해보세요.'}
              </p>
            </div>
          </div>
        )}

        {gradeNum === 1 && (
          <div className="flex gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
            <TrendingDown className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-green-800">
                1등급 최고효율 — 전기요금이 가장 적게 나옵니다
              </p>
              <p className="text-xs text-green-600 mt-1">
                구매가가 높아도 {years}년 쓰면 총비용이 저가 제품과 비슷해질 수 있습니다.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
