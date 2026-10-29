'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FRIDGE_ENERGY_MEASUREMENTS } from '@/lib/data/energy-measurements';
import { calculateHomeEnergy, homeEnergyRecordText, type HomeEnergyInput } from '@/lib/home-energy-record';
import { localDateLabel } from '@/lib/value-kind';
import { ValueBadge } from '@/components/tools/value-badge';

const field = 'mt-2 min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 aria-[invalid=true]:border-red-600';
const measurements = Object.values(FRIDGE_ENERGY_MEASUREMENTS);

export function HomeEnergyTool() {
  const [input, setInput] = useState<HomeEnergyInput>({ kwh: '', days: '' });
  const [device, setDevice] = useState('');
  const [model, setModel] = useState('');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const result = calculateHomeEnergy(input);
  const errors = result.kind === 'invalid' ? result.fields : {};
  const declared = measurements.find((entry) => entry.modelNumber === model);
  const record = result.kind === 'ready' ? homeEnergyRecordText(result, { device, model: model || undefined, declared: declared?.value, sourceUrl: declared?.sourceUrl, checkedAt: declared?.checkedAt, recordedAt: localDateLabel() }) : '';
  function update(key: keyof HomeEnergyInput, value: string) { setInput((old) => ({ ...old, [key]: value })); setCopyState('idle'); }
  async function copy() {
    try { await navigator.clipboard.writeText(record); setCopyState('copied'); }
    catch { setCopyState('failed'); }
  }
  return <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start print:block">
    <section aria-labelledby="home-energy-input-heading" className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 print:hidden">
      <h2 id="home-energy-input-heading" className="text-xl font-bold text-gray-900">실제로 측정한 값을 적어 보세요</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">해당 기기만 측정한 누적 사용량을 넣으세요. 집 전체 전기 고지서의 사용량을 기기 한 대의 값으로 입력하면 비교할 수 없습니다.</p>
      <div className="mt-6 space-y-5">
        <div><label htmlFor="measured-device" className="block text-sm font-semibold">측정한 기기 <span className="font-normal text-gray-600">(선택)</span></label><input id="measured-device" value={device} maxLength={40} onChange={(e) => { setDevice(e.target.value); setCopyState('idle'); }} placeholder="예: 주방 냉장고" className={field} /><p className="mt-1 text-xs text-gray-600">복사·인쇄한 기록에서 어느 기기를 쟀는지 구별하는 이름입니다.</p></div>
        <div><label htmlFor="measured-kwh" className="block text-sm font-semibold">측정 기간 누적 사용량 (kWh)</label><input id="measured-kwh" type="text" inputMode="decimal" autoComplete="off" value={input.kwh} onChange={(e) => update('kwh', e.target.value)} placeholder="예: 12.4" aria-invalid={!!errors.kwh} aria-describedby={`measured-kwh-hint${errors.kwh ? ' measured-kwh-error' : ''}`} className={field} /><p id="measured-kwh-hint" className="mt-1 text-xs text-gray-600">정격 소비전력 W가 아닌 계량기의 누적 kWh를 입력하세요. 소수점은 마침표(.)로 씁니다.</p>{errors.kwh && <p id="measured-kwh-error" className="mt-1 text-sm text-red-700">{errors.kwh}</p>}</div>
        <div><label htmlFor="measured-days" className="block text-sm font-semibold">측정 일수</label><input id="measured-days" type="text" inputMode="numeric" autoComplete="off" value={input.days} onChange={(e) => update('days', e.target.value)} placeholder="예: 7" aria-invalid={!!errors.days} aria-describedby={errors.days ? 'measured-days-error' : undefined} className={field} />{errors.days && <p id="measured-days-error" className="mt-1 text-sm text-red-700">{errors.days}</p>}</div>
        <div><label htmlFor="energy-model" className="block text-sm font-semibold">공식 신고값과 나란히 보기 <span className="font-normal text-gray-600">(해당 냉장고만, 선택)</span></label><select id="energy-model" value={model} onChange={(e) => { setModel(e.target.value); setCopyState('idle'); }} className={field}><option value="">모델을 선택하지 않음</option>{measurements.map((entry) => <option key={entry.modelNumber} value={entry.modelNumber}>{entry.modelNumber}</option>)}</select><p className="mt-1 text-xs text-gray-600">모델번호가 정확히 일치할 때만 선택하세요.</p></div>
      </div>
      <div className="mt-6 rounded-lg bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">계량 장치가 기기와 콘센트의 정격·접지 조건에 맞는지 공식 설명서를 먼저 확인하세요. 측정할 수 없는 환경이라면 임의로 플러그를 연결하지 마세요.</div>
    </section>

    <section aria-labelledby="home-energy-result-heading" className="rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6 print:border-0 print:bg-white print:p-0">
      <h2 id="home-energy-result-heading" className="text-xl font-bold text-gray-900">우리 집 전력 기록 카드</h2>
      {result.kind === 'ready' ? <div className="mt-5 space-y-5 text-sm leading-relaxed text-gray-800">
        {device.trim() && <p className="font-semibold text-gray-900">{device.trim()}</p>}
        <p><ValueBadge kind="measured" /> <strong>{result.days}일 동안 {result.measuredKwh.toLocaleString('ko-KR', { maximumFractionDigits: 3 })}kWh</strong></p>
        <div role="status" aria-live="polite" className="rounded-lg border border-blue-200 bg-white p-5"><p className="font-semibold text-gray-700">30일 환산 사용량 <ValueBadge kind="calculated" /></p><p className="mt-1 text-3xl font-bold tabular-nums text-blue-800">{result.normalizedKwh.toFixed(2)}<span className="ml-1 text-base">kWh</span></p><p className="mt-2 text-xs text-gray-600">{result.measuredKwh}kWh × 30 ÷ {result.days}일. 측정 기간의 사용 패턴이 30일 이어진다는 산술값입니다.</p></div>
        {declared && <div className="rounded-lg border bg-white p-4"><p className="font-semibold text-gray-900">공단 월간 신고값 · {declared.modelNumber} <ValueBadge kind="official-test" /></p><p className="mt-1 text-lg font-bold tabular-nums">{declared.value.toFixed(2)}kWh/월</p><p className="mt-2 text-xs text-gray-600">한국에너지공단 신고값 · {declared.checkedAt} 확인. 공식 시험 조건과 집의 측정 환경은 다릅니다.</p><a href={declared.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-semibold text-blue-700 underline underline-offset-4">공단 신고 자료 보기</a></div>}
        <div className="border-t border-gray-200 pt-4"><h3 className="font-bold text-gray-900">이 숫자로 알 수 있는 것</h3><p className="mt-2">입력한 기간을 30일로 환산한 값입니다. 계절·설정 온도·사용 횟수·실내 조건이 바뀌면 달라집니다. 공식 월간값과 나란히 볼 수 있지만 시험 조건이 달라 차이만으로 제품 상태나 절감량을 판정할 수 없습니다.</p><p className="mt-2">전기요금은 가구 전체 사용량과 계약·요율이 있어야 계산할 수 있어 여기에는 표시하지 않습니다.</p></div>
        <p className="print:hidden"><Link href="/blog/fridge-monthly-kwh-measurement" className="font-semibold text-blue-700 underline underline-offset-4">냉장고 라벨과 집의 실제 사용량이 다른 이유 읽기</Link></p>
        <div className="flex flex-wrap gap-3 print:hidden"><button type="button" onClick={copy} className="min-h-11 rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800">기록 복사</button><button type="button" onClick={() => window.print()} className="min-h-11 rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold">인쇄하기</button></div>
        <p role="status" className="print:hidden">{copyState === 'copied' ? '측정값과 계산 근거를 복사했습니다.' : copyState === 'failed' ? '자동 복사에 실패했습니다. 아래 내용을 직접 복사하세요.' : ''}</p>
        {copyState === 'failed' && <textarea readOnly aria-label="직접 복사할 전력 기록" rows={10} value={record} className={`${field} print:hidden`} />}
      </div> : <p role="status" className={`mt-5 text-sm ${result.kind === 'invalid' ? 'text-red-700' : 'text-gray-700'}`}>{result.message}</p>}
    </section>
  </div>;
}
