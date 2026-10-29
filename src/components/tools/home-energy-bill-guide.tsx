import { KEPCO_CALCULATOR_EXAMPLE, KEPCO_CALCULATOR_OCTOBER_TOTALS, KEPCO_RESIDENTIAL_LOW } from '@/lib/data/kepco-tariff';
import { formatWon } from '@/lib/electricity-bill';
import { ValueBadge } from '@/components/tools/value-badge';

const tariff = KEPCO_RESIDENTIAL_LOW;
const example = KEPCO_CALCULATOR_EXAMPLE;
const rate = (won: number) => `${won.toFixed(1)}원/kWh`;
const won = (value: number) => value.toLocaleString('ko-KR');

function blockRange(blocks: readonly { upToKwh: number | null }[], index: number): string {
  const previous = index > 0 ? blocks[index - 1].upToKwh : null;
  const upTo = blocks[index].upToKwh;
  if (previous === null) return `${upTo}kWh 이하`;
  return upTo === null ? `${previous}kWh 초과` : `${previous + 1}~${upTo}kWh`;
}

// 자바스크립트 없이 읽히는 설명. 숫자는 모두 요금표 데이터와 한전ON 계산기 사례에서 가져온다.
export function HomeEnergyBillGuide() {
  const [low, mid, high] = KEPCO_CALCULATOR_OCTOBER_TOTALS;
  const steps = [
    { from: low, to: mid },
    { from: mid, to: high },
  ].map(({ from, to }) => ({ from, to, added: to.kwh - from.kwh, difference: to.total - from.total }));
  return <section id="home-energy-bill-guide" aria-labelledby="home-energy-bill-guide-heading" className="mt-12 scroll-mt-24 border-t border-gray-200 pt-8 print:hidden">
    <h2 id="home-energy-bill-guide-heading" className="text-2xl font-bold text-gray-900">기기 하나가 늘면 전기요금은 어떻게 계산될까?</h2>
    <p className="mt-3 max-w-prose text-sm leading-relaxed text-gray-700">
      위 계산은 {tariff.name}, 주거용 일반 가구 요금표를 씁니다. 고지서의 가구 사용량에 기기 사용분을 더한 뒤 요금 전체를 다시 계산해 그 차이를 봅니다.
      복지할인 가구의 200kWh 이하 추가감액은 금액표를 찾지 못해 지원하지 않습니다. 대가족·출산 등 신청 할인도 넣지 않았습니다.
    </p>

    <div className="mt-6 grid gap-8 lg:grid-cols-2">
      <div className="min-w-0">
        <h3 className="text-lg font-semibold text-gray-900">계산 순서</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-gray-800">
          <li><strong>기본요금</strong>: 그 달 사용량이 속한 구간의 금액 하나를 냅니다.</li>
          <li><strong>전력량요금</strong>: 구간마다 그 구간에 든 kWh × 단가를 더하고 원 미만은 버립니다.</li>
          <li><strong>기후환경요금</strong>: 사용량 × {rate(tariff.climateEnvironment.wonPerKwh)}, 원 미만 절사.</li>
          <li><strong>연료비조정요금</strong>: 사용량 × {rate(tariff.fuelAdjustment.wonPerKwh)}({tariff.fuelAdjustment.label}), 원 미만 절사.</li>
          <li><strong>전기요금계</strong> = 1 + 2 + 3 + 4.</li>
          <li><strong>부가가치세</strong> = 전기요금계 × 10%, {tariff.vat.rounding}.</li>
          <li><strong>전력산업기반기금</strong> = 전기요금계 × {(tariff.fund.rate * 100).toFixed(1)}%, {tariff.fund.rounding}.</li>
          <li><strong>청구요금</strong> = 5 + 6 + 7, 10원 미만 절사. TV수신료는 따로 붙습니다.</li>
        </ol>

        <table className="mt-5 w-full table-fixed text-left text-xs text-gray-800 sm:text-sm">
          <caption className="pb-2 text-left text-sm font-semibold text-gray-900">구간별 기본요금과 전력량 단가</caption>
          <thead className="border-y border-gray-200 bg-gray-50"><tr><th scope="col" className="w-[24%] p-2">계절</th><th scope="col" className="p-2">사용량 구간</th><th scope="col" className="p-2">기본요금</th><th scope="col" className="p-2">단가</th></tr></thead>
          <tbody className="divide-y divide-gray-200 tabular-nums">
            {(['other', 'summer'] as const).flatMap((season) => tariff.energyCharge[season].map((block, index) => <tr key={`${season}-${index}`}>
              {index === 0 && <th scope="row" rowSpan={tariff.energyCharge[season].length} className="p-2 align-top font-medium">{season === 'summer' ? '하계(7~8월)' : '기타계절'}</th>}
              <td className="p-2">{blockRange(tariff.energyCharge[season], index)}</td>
              <td className="p-2">{won(tariff.basicCharge[season][index].won)}원</td>
              <td className="p-2">{block.wonPerKwh.toFixed(1)}원</td>
            </tr>))}
          </tbody>
        </table>
        <p className="mt-2 text-xs leading-relaxed text-gray-600">하계(7~8월)·동계(12~2월)에 {won(tariff.superUser.overKwh)}kWh를 넘는 사용량에는 {rate(tariff.superUser.wonPerKwh)}의 슈퍼유저 요금이 붙습니다. 이 구간은 한전 계산기 사례로 맞춰 보지 못해 살림랩 계산에서 제외했습니다.</p>
      </div>

      <div className="min-w-0">
        <h3 className="text-lg font-semibold text-gray-900">예시: {example.period.slice(0, 4)}년 {example.month}월에 {example.kwh}kWh를 쓴 집 <ValueBadge kind="example" /></h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">한전ON 전기요금계산기(주택용 저압, {example.period})에 {example.kwh}kWh를 넣은 결과를 그대로 옮겼습니다.</p>
        <table className="mt-3 w-full table-fixed text-left text-sm text-gray-800">
          <caption className="sr-only">예시 계산의 항목별 금액</caption>
          <tbody className="divide-y divide-gray-200 border-y border-gray-200 tabular-nums">
            <tr><th scope="row" className="w-[55%] p-2 font-medium">기본요금(201~400kWh)</th><td className="p-2">{formatWon(example.basicCharge)}</td></tr>
            <tr><th scope="row" className="p-2 font-medium">전력량요금<br /><span className="text-xs font-normal">{example.energyChargeBlocks}</span></th><td className="p-2">{formatWon(example.energyCharge)}</td></tr>
            <tr><th scope="row" className="p-2 font-medium">기후환경요금</th><td className="p-2">{formatWon(example.climateEnvironment)}</td></tr>
            <tr><th scope="row" className="p-2 font-medium">연료비조정요금</th><td className="p-2">{formatWon(example.fuelAdjustment)}</td></tr>
            <tr><th scope="row" className="p-2 font-medium">전기요금계</th><td className="p-2">{formatWon(example.subtotal)}</td></tr>
            <tr><th scope="row" className="p-2 font-medium">부가가치세</th><td className="p-2">{formatWon(example.vat)}</td></tr>
            <tr><th scope="row" className="p-2 font-medium">전력산업기반기금</th><td className="p-2">{formatWon(example.fund)}</td></tr>
            <tr><th scope="row" className="p-2 font-semibold">청구요금 합계</th><td className="p-2 font-semibold">{formatWon(example.total)}</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <h3 className="mt-8 text-lg font-semibold text-gray-900">자주 하는 오해</h3>
    <dl className="mt-3 grid gap-5 text-sm leading-relaxed text-gray-800 lg:grid-cols-2">
      <div className="min-w-0">
        <dt className="font-semibold text-gray-900">“라벨의 월 kWh로 요금을 계산하면 된다”</dt>
        <dd className="mt-1">공단 월간 신고값은 정해진 시험 조건에서 나온 값이라 우리 집에서 쓰는 양과 다릅니다. 공단 표시의 연간에너지비용도 한전 요금표가 아니라 연간소비전력량에 kWh당 160원을 곱한 고정 환산입니다. 그래서 살림랩은 계량 플러그 등으로 잰 우리 집 실측값으로만 요금 차이를 계산합니다.</dd>
      </div>
      <div className="min-w-0">
        <dt className="font-semibold text-gray-900">“kWh당 단가 하나만 곱하면 된다”</dt>
        <dd className="mt-1">
          누진 구간과 기본요금 때문에 같은 kWh를 더해도 가구 사용량에 따라 늘어나는 요금이 다릅니다. 같은 {example.period.slice(0, 4)}년 10월 한전ON 계산기 결과로 보면 <ValueBadge kind="example" />
          <ul className="mt-2 list-disc space-y-1 pl-5 tabular-nums">
            {steps.map((step) => <li key={step.from.kwh}>{step.from.kwh}kWh → {step.to.kwh}kWh: {formatWon(step.from.total)} → {formatWon(step.to.total)}, {step.added}kWh에 {formatWon(step.difference)} 늘어 kWh당 약 {(step.difference / step.added).toFixed(1)}원</li>)}
          </ul>
        </dd>
      </div>
    </dl>

    <h3 className="mt-8 text-lg font-semibold text-gray-900">요금표 출처와 적용 기간</h3>
    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-800">
      <li><a href={tariff.rateTableUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 underline underline-offset-4">한전ON 전기요금표(주택용 저압)</a> — 기본요금·전력량 단가, 부가가치세·전력산업기반기금({(tariff.fund.rate * 100).toFixed(1)}%, {tariff.fund.since}부터) 계산 방법</li>
      <li><a href={tariff.climateEnvironment.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 underline underline-offset-4">한전ON 주요 전기요금제도</a> — 기후환경요금 {rate(tariff.climateEnvironment.wonPerKwh)}({tariff.climateEnvironment.since}부터)</li>
      <li><a href={tariff.fuelAdjustment.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 underline underline-offset-4">한전ON 공지사항</a> — 연료비조정단가 {rate(tariff.fuelAdjustment.wonPerKwh)}, {tariff.fuelAdjustment.label}({tariff.fuelAdjustment.publishedAt} 게시)</li>
      <li><a href={tariff.calculatorUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 underline underline-offset-4">한전ON 전기요금계산기</a> — 살림랩 계산이 같은 결과를 내는지 맞춰 본 사례의 출처</li>
    </ul>
    <p className="mt-3 max-w-prose text-sm leading-relaxed text-gray-700">
      모두 {tariff.checkedAt}에 확인했습니다. 연료비조정단가는 분기마다 다시 정해지므로, 이 계산기는 {tariff.fuelAdjustment.from}~{tariff.fuelAdjustment.to} 사용분만 계산하고 그 밖의 달은 ‘요금표 갱신 필요’로 멈춥니다.
    </p>
  </section>;
}
