'use client';

import { useState } from 'react';
import type { SavedHomeEnergyRecord } from '@/lib/home-energy-record';
import { compareHomeEnergyRecords, energyAmountText, energyDifferenceText, HOME_ENERGY_COMPARISON_NOTE, homeEnergyComparisonText } from '@/lib/home-energy-comparison';
import { ValueBadge } from '@/components/tools/value-badge';

const field = 'mt-2 min-h-11 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700';

export function HomeEnergyRecordComparison({ records }: { records: SavedHomeEnergyRecord[] }) {
  const [selection, setSelection] = useState({ a: '', b: '' });
  const [copy, setCopy] = useState<{ text: string; status: 'copying' | 'copied' | 'failed' } | null>(null);
  const a = records.find((record) => record.id === selection.a);
  const b = records.find((record) => record.id === selection.b);
  const comparison = compareHomeEnergyRecords(a, b);
  const text = comparison.kind === 'ready' ? homeEnergyComparisonText(comparison) : '';
  const copyState = text && copy?.text === text ? copy.status : 'idle';
  async function copyResult() {
    setCopy({ text, status: 'copying' });
    try { await navigator.clipboard.writeText(text); setCopy({ text, status: 'copied' }); }
    catch { setCopy({ text, status: 'failed' }); }
  }

  return <section aria-labelledby="home-energy-comparison-heading" className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
    <h2 id="home-energy-comparison-heading" className="text-xl font-bold text-gray-900">저장한 전력 기록 두 개 비교</h2>
    <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-700">같은 기기를 다른 시기에 쟀다면 기준 A와 비교 B로 골라 보세요. 측정 일수가 달라도 누적량을 하루 평균으로 맞춰 비교합니다.</p>
    {records.length < 2 ? <p className="mt-4 text-sm text-gray-700">기록을 2개 이상 저장하면 비교할 수 있습니다. 현재 {records.length}개입니다.</p> : <>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 print:hidden">{(['a', 'b'] as const).map((key) => <div key={key} className="min-w-0">
        <label htmlFor={`home-energy-compare-${key}`} className="text-sm font-semibold text-gray-900">{key === 'a' ? '기준 기록 A' : '비교 기록 B'}</label>
        <select id={`home-energy-compare-${key}`} value={(key === 'a' ? a : b)?.id ?? ''} onChange={(event) => setSelection((old) => ({ ...old, [key]: event.target.value }))} className={field}>
          <option value="">기록을 고르세요</option>
          {records.map((record, index) => <option key={record.id} value={record.id} disabled={record.id === selection[key === 'a' ? 'b' : 'a']}>{index + 1}. {record.device || '이름 없는 기기'} · {record.startDate && record.endDate ? `${record.startDate}~${record.endDate}` : `기록일 ${record.recordedAt}`} · {record.days.value}일/{record.measuredKwh.value}kWh</option>)}
        </select>
      </div>)}</div>
      {comparison.kind !== 'ready' ? <p role="status" className="mt-4 text-sm text-gray-700">{comparison.message}</p> : <div className="mt-5">
        <div role="status" className="rounded-lg border border-gray-300 bg-white p-4 text-sm leading-relaxed text-gray-900">
          <h3 className="font-bold">B − A · 기간을 맞춘 사용량 차이 <ValueBadge kind="calculated" /></h3>
          <p className="mt-2 text-base font-semibold">하루 평균 {energyDifferenceText(comparison.dailyDifference, 3, 'kWh')}</p>
          <p className="mt-1">30일 환산 {energyDifferenceText(comparison.monthlyDifference, 2, 'kWh')}</p>
          <p className="mt-1">A의 하루 평균 대비 {energyDifferenceText(comparison.percentDifference, 1, '%')}</p>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">{([['A · 기준', a!, comparison.dailyA], ['B · 비교', b!, comparison.dailyB]] as const).map(([label, record, daily]) => <section key={label} aria-label={label} className="min-w-0 rounded-lg border border-gray-200 bg-white p-4 text-sm leading-relaxed">
          <h3 className="break-words font-bold text-gray-900">{label} · {record.device || '이름 없는 기기'}</h3>
          <dl className="mt-3 space-y-3 text-gray-800">
            <div><dt className="text-xs text-gray-600">측정 시작·종료일</dt><dd>{record.startDate && record.endDate ? `${record.startDate} → ${record.endDate}` : '미기록'}</dd></div>
            <div><dt className="text-xs text-gray-600">누적 측정 <ValueBadge kind="measured" /></dt><dd>{record.days.value}일 동안 {record.measuredKwh.value.toLocaleString('ko-KR', { maximumFractionDigits: 3 })}kWh</dd></div>
            <div><dt className="text-xs text-gray-600">하루 평균 / 30일 환산 <ValueBadge kind="calculated" /></dt><dd>{energyAmountText(daily, 3)} / {energyAmountText(daily * 30, 2)}</dd></div>
            <div><dt className="text-xs text-gray-600">환경·설정 메모 <ValueBadge kind="entered" /></dt><dd className="whitespace-pre-wrap break-words">{record.environmentNote || '미기록'}</dd></div>
            {record.declared && <div><dt className="text-xs text-gray-600">선택한 참고 모델</dt><dd className="break-words">{record.declared.modelNumber}</dd></div>}
            <div><dt className="text-xs text-gray-600">기록일</dt><dd>{record.recordedAt}</dd></div>
          </dl>
        </section>)}</div>
        <p className="mt-4 text-xs leading-relaxed text-gray-600">하루 평균 = 누적 kWh ÷ 측정 일수. 차이는 B − A이며, 30일 환산 차이는 하루 평균 차이 × 30입니다. 표시를 반올림하기 전 값으로 계산합니다.</p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm leading-relaxed text-gray-700">{comparison.cautions.map((note) => <li key={note}>{note}</li>)}</ul>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">{HOME_ENERGY_COMPARISON_NOTE}</p>
        <button type="button" onClick={copyResult} disabled={copyState === 'copying'} className="mt-4 min-h-11 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 print:hidden">{copyState === 'copying' ? '복사 중…' : '전력 비교 결과 복사'}</button>
        <p role="status" className="mt-2 text-sm text-gray-700 print:hidden">{copyState === 'copied' ? 'A·B의 측정값·조건과 사용량 차이를 복사했습니다.' : copyState === 'failed' ? '자동 복사에 실패했습니다. 아래 결과를 직접 선택해 복사하세요.' : ''}</p>
        {copyState === 'failed' && <textarea aria-label="직접 복사할 전력 비교 결과" readOnly rows={12} value={text} className={`${field} text-sm print:hidden`} />}
      </div>}
    </>}
  </section>;
}
