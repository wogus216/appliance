'use client';

import Link from 'next/link';
import { useState } from 'react';
import { parseFitMeasurement } from '@/lib/fridge-fit';
import { checkDishwasherFit, dishwasherFitRecord, DISHWASHER_FIT_PRODUCTS, EMPTY_DISHWASHER_FIT_INPUTS, type DishwasherFitField, type DishwasherFitInputs } from '@/lib/dishwasher-fit';
import { localDateLabel } from '@/lib/value-kind';
import { ValueBadge } from '@/components/tools/value-badge';

const field = 'mt-2 min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 aria-[invalid=true]:border-red-600';
const dimensions: { key: DishwasherFitField; title: string; hint: string }[] = [
  { key: 'width', title: '설치 자리 폭', hint: '돌출물을 제외한 가장 좁은 곳까지 재세요.' },
  { key: 'depth', title: '설치 자리 깊이', hint: '벽부터 조리대 또는 바닥의 앞 끝까지 재세요.' },
  { key: 'height', title: '위쪽 장애물까지 높이', hint: '상부장 또는 선반 아래의 유효 높이를 재세요.' },
  { key: 'openDepth', title: '뒷면부터 문 앞 장애물까지 거리', hint: '문을 열었을 때 맞은편 가구·사람의 통로를 확인하는 값입니다.' },
];
const prep = ['급수 위치', '배수 위치', '접지 콘센트', '바닥·조리대 수평'];

export function DishwasherFitTool() {
  const [model, setModel] = useState(DISHWASHER_FIT_PRODUCTS[0].model);
  const [inputs, setInputs] = useState<DishwasherFitInputs>({ ...EMPTY_DISHWASHER_FIT_INPUTS });
  const [prepared, setPrepared] = useState<string[]>([]);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const product = DISHWASHER_FIT_PRODUCTS.find((entry) => entry.model === model)!;
  const checks = checkDishwasherFit(product, inputs);
  const record = dishwasherFitRecord(product, inputs, prepared, localDateLabel());
  const hadInputs = Object.values(inputs).some((value) => value.trim()) || prepared.length > 0;
  const [resetNotice, setResetNotice] = useState(false);
  async function copy() {
    try { await navigator.clipboard.writeText(record); setCopyState('copied'); }
    catch { setCopyState('failed'); }
  }
  return <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start print:block">
    <section aria-labelledby="dishwasher-input-heading" className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 print:hidden">
      <h2 id="dishwasher-input-heading" className="text-xl font-bold">어디에 놓을 예정인가요?</h2>
      <label htmlFor="dishwasher-model" className="mt-5 block text-sm font-semibold">정확한 모델</label>
      <select id="dishwasher-model" value={model} onChange={(e) => { setResetNotice(hadInputs); setModel(e.target.value); setInputs({ ...EMPTY_DISHWASHER_FIT_INPUTS }); setPrepared([]); setCopyState('idle'); }} className={field}>{DISHWASHER_FIT_PRODUCTS.map((entry) => <option key={entry.model} value={entry.model}>{entry.name} · {entry.model}</option>)}</select>
      <p className="mt-2 text-sm text-gray-700">{product.placement} · 본체 {product.width} × {product.depth} × {product.height}mm <ValueBadge kind="official" /></p>
      <p role="status" className="mt-2 text-xs leading-relaxed text-gray-600">{resetNotice ? '모델을 바꿔 입력한 치수와 체크를 비웠습니다. 두 모델은 놓는 자리(조리대·바닥)가 달라 재는 곳도 다릅니다.' : '모델을 바꾸면 놓는 자리가 달라지므로 입력값과 체크를 비웁니다.'}</p>
      <div className="mt-6 space-y-5">{dimensions.filter(({ key }) => key !== 'openDepth' || product.openDepth !== undefined).map(({ key, title, hint }) => {
        const parsed = parseFitMeasurement(inputs[key]);
        return <div key={key}><label htmlFor={`dishwasher-${key}`} className="block text-sm font-semibold">{title} <span className="font-normal text-gray-600">(mm)</span></label><p id={`dishwasher-${key}-hint`} className="mt-1 text-xs text-gray-600">{hint}</p><input id={`dishwasher-${key}`} type="text" inputMode="decimal" autoComplete="off" value={inputs[key]} onChange={(e) => { setInputs((old) => ({ ...old, [key]: e.target.value })); setCopyState('idle'); }} aria-invalid={parsed.kind === 'invalid'} aria-describedby={`dishwasher-${key}-hint${parsed.kind === 'invalid' ? ` dishwasher-${key}-error` : ''}`} className={field} />{parsed.kind === 'invalid' && <p id={`dishwasher-${key}-error`} className="mt-1 text-sm text-red-700">{parsed.message}</p>}</div>;
      })}</div>
      {product.openDepth === undefined && <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm leading-relaxed text-amber-950"><ValueBadge kind="unverified" /> 이 모델은 문을 연 깊이를 공식 자료에서 찾지 못해 문 앞 거리 칸을 두지 않았습니다.</p>}
      <fieldset className="mt-7"><legend className="font-semibold">설치팀에 전달할 자료</legend><p className="mt-1 text-xs text-gray-600">체크는 설치 조건 충족을 뜻하지 않습니다.</p><div className="mt-3 grid gap-3">{prep.map((item) => <label key={item} className="flex min-h-11 items-center gap-3 text-sm"><input type="checkbox" checked={prepared.includes(item)} onChange={(e) => { setPrepared((old) => e.target.checked ? [...old, item] : old.filter((value) => value !== item)); setCopyState('idle'); }} className="size-4" />{item}의 사진·위치를 확인했습니다</label>)}</div></fieldset>
    </section>
    <section aria-labelledby="dishwasher-result-heading" className="rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6 print:border-0 print:bg-white print:p-0">
      <h2 id="dishwasher-result-heading" className="text-xl font-bold">설치 전 확인 카드</h2>
      <p className="mt-2 text-sm font-semibold">{product.name} · {product.model}</p>
      <p role="status" aria-live="polite" className="mt-4 text-sm leading-relaxed text-gray-800">{checks.some((check) => check.kind === 'invalid') ? '입력 오류를 수정하세요. 잘못된 칸 아래에 이유를 표시했습니다.' : checks.some((check) => check.kind === 'short') ? '본체 또는 문 개방 참고 치수보다 작은 곳이 있습니다. 다시 재고 설치팀에 문의하세요.' : '측정한 항목의 치수 차이만 확인합니다. 설치 가능 여부는 현장에서 확인해야 합니다.'}</p>
      <dl className="mt-5 divide-y divide-gray-200 border-y border-gray-200">{checks.map((check) => {
        const parsed = parseFitMeasurement(inputs[check.key]);
        return <div key={check.key} className="py-3 text-sm"><dt className="font-semibold">{check.label} <span className={check.kind === 'short' || check.kind === 'invalid' ? 'text-red-700' : 'text-gray-600'}>· {check.kind === 'short' ? '치수 부족' : check.kind === 'invalid' ? '입력 수정' : check.kind === 'unknown' ? '미측정' : check.kind === 'manual' ? '확인 필요' : '치수 확인'}</span></dt><dd className="mt-1 leading-relaxed text-gray-800">{parsed.kind === 'value' && check.kind !== 'manual' && <span className="mb-1 block">입력 {inputs[check.key].trim()}mm <ValueBadge kind="measured" /> · 차이 <ValueBadge kind="calculated" /></span>}{check.message}</dd></div>;
      })}</dl>
      <div className="mt-5 text-sm leading-relaxed text-gray-800">
        <h3 className="font-semibold">급수·배수·전원·여유 조건</h3>
        <p className="mt-1 text-xs text-gray-600">설명서에서 찾은 조건만 ‘공식 자료’로, 찾지 못한 수치는 ‘확인 필요’로 표시합니다.</p>
        <ul className="mt-3 space-y-3">{product.conditions.map((condition) => <li key={condition.topic} className="rounded-lg border border-gray-200 bg-white p-3"><p className="font-semibold">{condition.topic} <ValueBadge kind={condition.status === 'confirmed' ? 'official' : 'unverified'} /></p><p className="mt-1">{condition.text}</p><p className="mt-1 text-xs text-gray-600">{condition.where}</p></li>)}</ul>
        <p className="mt-3">자료를 준비한 항목: {prepared.length ? prepared.join(' · ') : '아직 없음'}</p>
      </div>
      <p className="mt-5 text-xs leading-relaxed text-gray-600">설명서 {product.sourcePages} · 원문 재확인 {product.checkedAt}. 제품 라벨의 모델번호가 일치하는지 확인하세요.</p>
      <a href={product.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-blue-700 underline underline-offset-4">공식 설명서 열기</a>
      <p className="mt-3 print:hidden"><Link href={`/products/${product.slug}`} className="text-sm font-semibold text-blue-700 underline underline-offset-4">제품 상세 보기</Link></p>
      <div className="mt-6 flex flex-wrap gap-3 print:hidden"><button type="button" onClick={copy} className="min-h-11 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white">상담 기록 복사</button><button type="button" onClick={() => window.print()} className="min-h-11 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold">인쇄하기</button></div>
      <p role="status" className="mt-2 text-sm print:hidden">{copyState === 'copied' ? '치수와 미확인 조건을 복사했습니다.' : copyState === 'failed' ? '자동 복사에 실패했습니다. 아래 내용을 직접 복사하세요.' : ''}</p>
      {copyState === 'failed' && <textarea readOnly aria-label="직접 복사할 설치 기록" rows={12} value={record} className={`${field} print:hidden`} />}
    </section>
  </div>;
}
