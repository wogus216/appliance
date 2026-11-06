'use client';

import Link from 'next/link';
import { useState, useSyncExternalStore, type ChangeEvent } from 'react';
import { ValueBadge } from '@/components/tools/value-badge';
import { useToolResultEvent } from '@/components/tools/use-tool-result-event';
import { CONSUMER_STANDARD_RENTAL, WATER_PURIFIER_COST_CHECKED_AT, WATER_PURIFIER_MODELS } from '@/lib/data/water-purifier-cost';
import { parseWon } from '@/lib/repair-replace';
import { localDateLabel, parsePlainNumber, type ValueKind } from '@/lib/value-kind';
import { exportPurifierScenario, importPurifierScenario, PURIFIER_SCENARIO_MAX_BYTES } from '@/lib/purifier-scenario';
import {
  PRICE_RECHECK_DAYS, calculatePenalty, comparePaths, comparisonLabel, priceRecheckNeeded, promotionRentalPath, purchasePath, rentalPath, waterPurifierCostRecord,
  type PathResult, type PenaltyResult, type PurifierCostModel, type Valued,
} from '@/lib/water-purifier-cost';

const fieldClass = 'mt-2 min-h-11 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 aria-[invalid=true]:border-red-600';
const linkClass = 'font-semibold text-blue-700 underline underline-offset-4';
const won = (value: number) => `${value.toLocaleString('ko-KR')}원`;
function serverToday() { return ''; }
function subscribeToDayChange(onChange: () => void) { const timer = window.setInterval(onChange, 60_000); return () => window.clearInterval(timer); }
function localToday() { return localDateLabel(); }

type Unit = 'won' | 'months';
interface FieldState { raw: string; value: number | null; kind: ValueKind; error?: string; overridden: boolean }

/** 공식 값이 기본값이고, 사용자가 바꾸면 사용자 입력으로 표시한다. 공식 값이 없는 칸은 비워 두면 확인 필요로 남는다. */
function resolveField(override: string | undefined, fallback: number | null, unit: Unit, allowZero: boolean): FieldState {
  if (override === undefined) return { raw: fallback === null ? '' : unit === 'won' ? fallback.toLocaleString('ko-KR') : String(fallback), value: fallback, kind: fallback === null ? 'unverified' : 'official', overridden: false };
  if (!override.trim()) return fallback === null ? { raw: override, value: null, kind: 'unverified', overridden: true } : { raw: override, value: null, kind: 'entered', overridden: true, error: '값을 넣거나 공식 값으로 되돌리세요.' };
  const parsed = unit === 'won' ? parseWon(override, allowZero) : parsePlainNumber(override, 0);
  if (parsed === null || (unit === 'months' && (parsed < 1 || parsed > 120))) return { raw: override, value: null, kind: 'entered', overridden: true, error: unit === 'won' ? '원 단위 정수로 넣으세요. 예: 50400 또는 50,400' : '1~120 사이의 개월 수로 넣으세요.' };
  return { raw: override, value: parsed, kind: parsed === fallback ? 'official' : 'entered', overridden: true };
}

function CostField({ id, label, hint, state, unit, official, onChange, onReset }: { id: string; label: string; hint?: string; state: FieldState; unit: Unit; official: boolean; onChange: (raw: string) => void; onReset: () => void }) {
  const described = [hint && `${id}-hint`, state.error && `${id}-error`].filter(Boolean).join(' ') || undefined;
  return <div>
    <label htmlFor={id} className="block text-sm font-semibold">{label} <ValueBadge kind={state.kind} /></label>
    <div className="flex items-center gap-2"><input id={id} type="text" inputMode="numeric" autoComplete="off" value={state.raw} onChange={(e) => onChange(e.target.value)} aria-invalid={!!state.error} aria-describedby={described} placeholder={official ? undefined : '계약서 값(모르면 비워 두기)'} className={fieldClass} /><span className="mt-2 shrink-0 text-sm text-gray-600">{unit === 'won' ? '원' : '개월'}</span></div>
    {hint && <p id={`${id}-hint`} className="mt-1 text-xs text-gray-600">{hint}</p>}
    {state.error && <p id={`${id}-error`} className="mt-1 text-sm text-red-700">{state.error}</p>}
    {state.overridden && official && <button type="button" onClick={onReset} className="mt-1 min-h-11 text-xs font-semibold text-blue-700 underline underline-offset-4">공식 값으로 되돌리기</button>}
  </div>;
}

function PromotionTag() {
  return <span className="ml-1 inline-block whitespace-nowrap rounded border border-orange-300 bg-orange-50 px-1.5 py-0.5 align-middle text-xs font-semibold text-orange-950 print:border-gray-500 print:bg-white print:text-black">프로모션</span>;
}

function PathCard({ title, result, promotion }: { title: string; result: PathResult; promotion?: boolean }) {
  return <div className="rounded-lg border border-gray-200 bg-white p-4">
    <h3 className="text-sm font-semibold text-gray-700">{title}{promotion && <PromotionTag />}</h3>
    <p className="mt-1 text-xl font-bold tabular-nums">{won(result.totalWon)} <ValueBadge kind="calculated" />{result.partial && <span className="ml-1 align-middle text-sm font-semibold text-amber-800">부분 합계</span>}</p>
    <ul className="mt-2 space-y-1 text-sm">{result.lines.map((line) => <li key={line.label}>{line.label}: <span className="tabular-nums">{won(line.won)}</span> <ValueBadge kind={line.kind} />{line.promotion && <PromotionTag />}</li>)}</ul>
    {result.missing.length > 0 && <div className="mt-3 rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-950"><p className="font-semibold">빠진 비용 · 합계에 넣지 않음</p><ul className="mt-1 list-disc space-y-1 pl-5">{result.missing.map((item) => <li key={item.label}>{item.label} <ValueBadge kind="unverified" /> — {item.reason}</li>)}</ul></div>}
  </div>;
}

function PenaltyView({ model, result, usedMonths }: { model: PurifierCostModel; result: PenaltyResult; usedMonths: number }) {
  if (result.kind === 'invalid') return <p className="mt-3 text-sm text-red-700">{result.message}</p>;
  if (result.kind === 'after-obligation') return <div className="mt-3 space-y-3 text-sm"><p>{result.note}</p>{(result.maker.lines.length > 0 || result.maker.missing.length > 0) && <PathCard title="제조사 기준 남는 비용" result={result.maker} />}</div>;
  return <div className="mt-3 space-y-3 text-sm leading-relaxed">
    <p>사용 {usedMonths}개월 <ValueBadge kind="entered" /> · 남은 의무사용기간 {result.remainingMonths}개월({result.remainingDays.toLocaleString('ko-KR')}일로 환산) · 적용 비율 {result.ratePercent}%</p>
    <div className="grid gap-3 sm:grid-cols-2">
      <PathCard title={`제조사 ${model.penalty.kind === 'daily-10' ? '약관' : '공개 안내'} 산식`} result={result.maker} />
      <div className="rounded-lg border border-gray-200 bg-white p-4"><h3 className="text-sm font-semibold text-gray-700">공정위 소비자분쟁해결기준(참고)</h3><p className="mt-1 text-xl font-bold tabular-nums">{won(result.standard.won)} <ValueBadge kind="calculated" /></p><p className="mt-2">{result.standard.formula}</p><p className="mt-1 text-xs text-gray-600">{result.standard.rule}. {CONSUMER_STANDARD_RENTAL.notes[0]}</p></div>
    </div>
    <p className="text-xs text-gray-600">일수는 남은 개월 수 × 30일로 바꿔 넣었습니다. 약관과 고시는 달력 일수로 계산하므로 몇 일치 차이가 날 수 있습니다.</p>
    <ul className="list-disc space-y-1 pl-5 text-xs text-gray-700">{model.penalty.extras.map((extra) => <li key={extra}>{extra}</li>)}</ul>
    {model.penalty.caveat && <p className="text-xs text-gray-700">{model.penalty.caveat}</p>}
    <p className="rounded border border-gray-300 bg-gray-50 p-3">어느 기준이 적용되는지 법적 판단은 하지 않습니다. 분쟁은 1372소비자상담센터(한국소비자원)에 상담하세요.</p>
  </div>;
}

export function WaterPurifierCostTool() {
  const [modelNumber, setModelNumber] = useState('');
  const [planId, setPlanId] = useState('');
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [memberPrice, setMemberPrice] = useState(false);
  const [showPromotion, setShowPromotion] = useState(false);
  const [usedRaw, setUsedRaw] = useState('');
  const [notice, setNotice] = useState('');
  const [fileMessage, setFileMessage] = useState('');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const today = useSyncExternalStore(subscribeToDayChange, localToday, serverToday);

  const selected = WATER_PURIFIER_MODELS.find((entry) => entry.modelNumber === modelNumber);
  const model = selected?.available ? selected : undefined;
  const plan = model?.rental.plans.find((entry) => entry.id === planId) ?? model?.rental.plans[0];
  const recheck = today ? priceRecheckNeeded(WATER_PURIFIER_COST_CHECKED_AT, today) : false;

  function chooseModel(next: string) {
    setModelNumber(next); setPlanId(''); setMemberPrice(false); setShowPromotion(false); setUsedRaw(''); setCopyState('idle');
    if (Object.keys(overrides).length) setNotice('모델을 바꿔 직접 고친 값을 비웠습니다.');
    setOverrides({});
  }
  function choosePlan(next: string) {
    setPlanId(next); setCopyState('idle');
    if (Object.keys(overrides).length) setNotice('계약 조건을 바꿔 직접 고친 값을 공식 값으로 되돌렸습니다.');
    setOverrides({});
  }
  const setOverride = (key: string, raw: string) => { setOverrides((old) => ({ ...old, [key]: raw })); setNotice(''); setCopyState('idle'); };
  const resetOverride = (key: string) => setOverrides((old) => { const next = { ...old }; delete next[key]; return next; });

  const fields = model && plan ? {
    monthly: resolveField(overrides.monthly, plan.monthlyWon, 'won', false),
    penaltyMonthly: resolveField(overrides.penaltyMonthly, resolveField(overrides.monthly, plan.monthlyWon, 'won', false).kind === 'entered' ? null : plan.monthlyWon, 'won', false),
    registration: resolveField(overrides.registration, model.rental.registrationWon, 'won', true),
    rentalExtra: resolveField(overrides.rentalExtra, null, 'won', true),
    purchaseExtra: resolveField(overrides.purchaseExtra, null, 'won', true),
    contract: resolveField(overrides.contract, plan.contractMonths, 'months', false),
    obligation: resolveField(overrides.obligation, plan.obligationMonths, 'months', false),
    purchase: resolveField(overrides.purchase, memberPrice && model.purchase.memberWon ? model.purchase.memberWon : model.purchase.listWon, 'won', false),
    filters: model.purchase.filters.map((filter) => resolveField(overrides[`filter-${filter.id}`], memberPrice ? filter.memberWon : filter.listWon, 'won', false)),
  } : undefined;
  const allFields = fields ? [fields.monthly, fields.registration, fields.contract, fields.obligation, fields.purchase, fields.rentalExtra, fields.purchaseExtra, ...fields.filters] : [];
  const fieldError = allFields.some((state) => state.error);
  const obligationTooLong = !!fields && fields.obligation.value !== null && fields.contract.value !== null && fields.obligation.value > fields.contract.value;
  const valued = (state: FieldState): Valued | null => state.value === null ? null : { value: state.value, kind: state.kind };

  let view: undefined | {
    values: Parameters<typeof waterPurifierCostRecord>[0]['values'];
    obligationPath?: PathResult; rental: PathResult; purchase: PathResult; purchaseLabel: string;
    promotions: { title: string; result: PathResult }[];
    penaltyBasis: Valued | null; penaltyNotice?: string; promotionNotice?: string;
    penalty?: { usedMonths: number; result: PenaltyResult }; usedError?: string;
  };
  if (model && plan && fields && !fieldError && !obligationTooLong) {
    const values = {
      monthly: valued(fields.monthly)!, registration: valued(fields.registration), contract: valued(fields.contract)!,
      obligation: valued(fields.obligation), purchase: valued(fields.purchase)!, filters: fields.filters.map((state) => valued(state)!),
      rentalExtra: valued(fields.rentalExtra), purchaseExtra: valued(fields.purchaseExtra),
    };
    const months = values.contract.value;
    const purchaseLabel = fields.purchase.kind === 'entered' ? '사용자가 넣은 구입가' : memberPrice && model.purchase.memberLabel ? model.purchase.memberLabel : model.purchase.listLabel;
    const promotions: { title: string; result: PathResult }[] = [];
    const promotionNotice = showPromotion && allFields.some((state) => state.kind === 'entered') ? '직접 고친 금액·기간에는 공식몰 프로모션의 적용을 확인하지 못해 프로모션 계산을 보류했습니다. 원래 조건으로 되돌리면 별도 계산할 수 있습니다.' : undefined;
    if (showPromotion && !promotionNotice) {
      const rentalPromo = promotionRentalPath(model, plan, months, values.rentalExtra);
      if (rentalPromo) promotions.push({ title: `렌탈 ${months}개월 합계 · 반값 ${plan.promotion!.halfPriceMonths}개월 + Pre-Pass`, result: rentalPromo });
      if (model.purchase.promotionWon && model.purchase.promotionLabel) promotions.push({ title: `구매 ${months}개월 합계 · ${model.purchase.promotionLabel}`, result: purchasePath(model, { purchase: { value: model.purchase.promotionWon, kind: 'official' }, filters: values.filters, purchaseExtra: values.purchaseExtra }, months, model.purchase.promotionLabel, true) });
    }
    const usedTrim = usedRaw.trim();
    const used = usedTrim ? parsePlainNumber(usedTrim, 0) : null;
    const usedError = usedTrim && (used === null || used > 600) ? '0~600 사이의 개월 수로 넣으세요.' : undefined;
    const penaltyBasis = valued(fields.penaltyMonthly);
    const penaltyNotice = usedTrim && (!penaltyBasis || fields.penaltyMonthly.error) ? '중도해지 계산 보류: 실납부 월요금과 산식 기준요금은 다를 수 있습니다. 계약서의 할인 전 해지 산식 기준 월요금을 확인해 입력하세요.' : undefined;
    view = {
      values, purchaseLabel, promotions, usedError, penaltyBasis, penaltyNotice, promotionNotice,
      obligationPath: values.obligation && values.obligation.value !== months ? rentalPath(model, { monthly: values.monthly, registration: values.registration }, values.obligation.value) : undefined,
      rental: rentalPath(model, values, months),
      purchase: purchasePath(model, values, months, purchaseLabel),
      penalty: used !== null && !usedError && values.obligation && penaltyBasis && !fields.penaltyMonthly.error ? { usedMonths: used, result: calculatePenalty(model, { monthlyWon: penaltyBasis.value, obligationMonths: values.obligation.value, usedMonths: used, contractMonths: months }) } : undefined,
    };
  }
  const comparison = view ? comparePaths(view.rental, view.purchase) : undefined;
  useToolResultEvent('water-purifier-cost', view !== undefined);
  const record = model && plan && view ? waterPurifierCostRecord({ model, plan, ...view, checkedAt: WATER_PURIFIER_COST_CHECKED_AT, recheck, recordedAt: today || undefined }) : '';
  async function copy() {
    try { await navigator.clipboard.writeText(record); setCopyState('copied'); }
    catch { setCopyState('failed'); }
  }
  function saveScenario() {
    if (!model || !plan || !fields || !view || view.usedError || fields.penaltyMonthly.error) return;
    const inputs: Record<string, string> = {
      monthly: fields.monthly.raw, registration: fields.registration.raw, contract: fields.contract.raw,
      obligation: fields.obligation.raw, purchase: fields.purchase.raw,
      penaltyMonthly: fields.penaltyMonthly.raw,
      rentalExtra: fields.rentalExtra.raw, purchaseExtra: fields.purchaseExtra.raw,
      ...Object.fromEntries(model.purchase.filters.map((filter, i) => [`filter-${filter.id}`, fields.filters[i].raw])),
    };
    const json = exportPurifierScenario({ format: 'salimlab-purifier-comparison', version: 1, savedAt: localDateLabel(), sourceCheckedAt: WATER_PURIFIER_COST_CHECKED_AT, modelNumber, planId: plan.id, inputs, memberPrice, showPromotion, usedRaw: usedRaw.trim() });
    try {
      const url = URL.createObjectURL(new Blob([json], { type: 'application/json;charset=utf-8' }));
      const anchor = document.createElement('a');
      anchor.href = url; anchor.download = `salimlab-purifier-${modelNumber}-${localDateLabel()}.json`; anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setFileMessage('비교 조건을 파일로 저장했습니다. 다음에 이 파일을 불러오면 이어서 수정할 수 있습니다.');
    } catch { setFileMessage('파일을 저장하지 못했습니다. 기록 복사나 인쇄로 보관하세요.'); }
  }
  async function loadScenario(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (file.size > PURIFIER_SCENARIO_MAX_BYTES) { setFileMessage('파일이 20KB보다 커서 읽지 않았습니다. 현재 입력은 유지합니다.'); return; }
    try {
      const content = typeof file.text === 'function' ? await file.text() : await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = () => reject(reader.error); reader.readAsText(file); });
      const result = importPurifierScenario(content);
      if (result.kind === 'error') { setFileMessage(result.message); return; }
      const s = result.scenario;
      setModelNumber(s.modelNumber); setPlanId(s.planId); setOverrides(s.inputs);
      setMemberPrice(s.memberPrice); setShowPromotion(s.showPromotion); setUsedRaw(s.usedRaw); setCopyState('idle'); setNotice('');
      setFileMessage(`${s.savedAt} 저장한 조건을 불러왔습니다(자료 확인일 ${s.sourceCheckedAt}). 저장한 금액으로 다시 계산했습니다. 현재 계약·판매 조건과 대조하세요.`);
    } catch { setFileMessage('파일을 읽지 못했습니다. 현재 입력은 유지합니다.'); }
  }

  return <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start print:block">
    <section aria-labelledby="cost-input-heading" className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 print:hidden">
      <h2 id="cost-input-heading" className="text-xl font-bold">모델과 계약 조건</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">제조사 공식 화면의 값({WATER_PURIFIER_COST_CHECKED_AT} 확인)을 기본으로 채웁니다. 계약서 값이 다르면 칸을 고치세요. 입력한 값은 주소나 서버에 저장하지 않습니다.</p>
      <div className="mt-4 border-y border-gray-200 py-4 print:hidden">
        <p className="text-sm leading-relaxed text-gray-700">다시 비교하려면 조건을 파일로 저장하세요. 모델·금액·기간·할인 선택을 불러와 수정할 수 있습니다. 자동 저장은 하지 않습니다.</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <button type="button" onClick={saveScenario} disabled={!view || !!view.usedError || !!fields?.penaltyMonthly.error} className="min-h-11 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold disabled:text-gray-400">비교 조건 파일 저장</button>
          <label className="inline-flex min-h-11 cursor-pointer items-center rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold focus-within:outline-2 focus-within:outline-blue-700">비교 조건 불러오기<input id="cost-scenario-import" type="file" accept="application/json,.json" onChange={loadScenario} className="sr-only" /></label>
        </div>
        <p role="status" className="mt-2 text-sm text-gray-700">{fileMessage}</p>
      </div>
      <label htmlFor="cost-model" className="mt-5 block text-sm font-semibold">정수기 모델</label>
      <select id="cost-model" value={modelNumber} onChange={(e) => chooseModel(e.target.value)} className={fieldClass}><option value="">모델 선택</option>{WATER_PURIFIER_MODELS.map((entry) => <option key={entry.modelNumber} value={entry.modelNumber}>{entry.brand} {entry.modelNumber}{entry.available ? '' : ' (공식 조건 확인 불가)'}</option>)}</select>
      {model && plan && fields && <div className="mt-5 space-y-5">
        <div><label htmlFor="cost-plan" className="block text-sm font-semibold">{model.rental.word === '렌탈료' ? '렌탈' : '구독'} 계약 조건</label><select id="cost-plan" value={plan.id} onChange={(e) => choosePlan(e.target.value)} className={fieldClass}>{model.rental.plans.map((entry) => <option key={entry.id} value={entry.id}>{entry.label} · 월 {won(entry.monthlyWon)}</option>)}</select></div>
        <a href="#cost-result-heading" className={`inline-flex min-h-11 items-center lg:hidden ${linkClass}`}>비용 비교 결과 보기</a>
        <p className="text-sm leading-relaxed text-gray-700">선택한 조건의 공식 금액으로 계산했습니다. 계약서 금액이나 할인 조건이 다르면 아래에서 바꾸세요.</p>
        <details>
          <summary className="min-h-11 cursor-pointer py-2 text-sm font-semibold text-gray-900 focus-visible:outline-2 focus-visible:outline-blue-700">금액·할인·중도해지 조건 바꾸기 (선택){(fieldError || fields.penaltyMonthly.error || obligationTooLong || view?.usedError) && ' · 입력 오류 확인'}</summary>
          <div className="mt-4 space-y-5">
            <CostField id="cost-monthly" label={`월 ${model.rental.word}`} state={fields.monthly} unit="won" official onChange={(raw) => setOverride('monthly', raw)} onReset={() => resetOverride('monthly')} />
            <CostField id="cost-penalty-monthly" label="해지 산식 기준 월요금" hint="총비용용 월요금과 별도입니다. 월요금을 직접 고쳤다면 계약서의 할인 전 기준요금을 확인해 넣으세요. 모르면 비워 두어 해지 계산을 보류합니다." state={fields.penaltyMonthly} unit="won" official={fields.monthly.kind !== 'entered'} onChange={(raw) => setOverride('penaltyMonthly', raw)} onReset={() => resetOverride('penaltyMonthly')} />
            <CostField id="cost-registration" label="등록비" state={fields.registration} unit="won" official={model.rental.registrationWon !== null} hint={model.rental.registrationWon === null ? '공식 화면에서 금액을 찾지 못했습니다. 계약서에 있으면 넣으세요. 비워 두면 빠진 비용으로 남깁니다.' : undefined} onChange={(raw) => setOverride('registration', raw)} onReset={() => resetOverride('registration')} />
            <CostField id="cost-rental-extra" label="렌탈·구독 추가 견적비 합계" state={fields.rentalExtra} unit="won" official={false} hint="총 계약기간에 발생할 설치·이전·철거 등의 확인된 견적을 한 번만 합산하세요. 월요금·등록비에 포함된 항목은 빼세요. 모르면 빈칸, 추가비가 없다고 확인했다면 0을 넣습니다." onChange={(raw) => setOverride('rentalExtra', raw)} onReset={() => resetOverride('rentalExtra')} />
            <CostField id="cost-contract" label="총 계약기간(소유권 이전까지)" state={fields.contract} unit="months" official onChange={(raw) => setOverride('contract', raw)} onReset={() => resetOverride('contract')} />
            <CostField id="cost-obligation" label="의무사용기간" state={fields.obligation} unit="months" official={plan.obligationMonths !== null} hint={plan.obligationMonths === null ? '공개 화면은 “계약서 또는 마이페이지에서 확인”이라고만 적습니다. 중도해지 계산에 필요합니다.' : undefined} onChange={(raw) => setOverride('obligation', raw)} onReset={() => resetOverride('obligation')} />
            {obligationTooLong && <p className="text-sm text-red-700">의무사용기간이 총 계약기간보다 깁니다. 계약서 값을 확인하세요.</p>}
            <h3 className="border-t border-gray-200 pt-5 font-bold">일시불 구매</h3>
            {model.purchase.memberWon && <label className="flex items-start gap-3 text-sm"><input type="checkbox" checked={memberPrice} onChange={(e) => { setMemberPrice(e.target.checked); setOverrides((old) => { const next = { ...old }; delete next.purchase; for (const key of Object.keys(next)) if (key.startsWith('filter-')) delete next[key]; return next; }); }} className="mt-1 size-4" /><span>회원할인가로 보기(로그인 회원 조건 · 본체 {won(model.purchase.memberWon)}, 필터도 회원가)</span></label>}
            <CostField id="cost-purchase" label="구입가" state={fields.purchase} unit="won" official onChange={(raw) => setOverride('purchase', raw)} onReset={() => resetOverride('purchase')} />
            <CostField id="cost-purchase-extra" label="구매 추가 견적비 합계" state={fields.purchaseExtra} unit="won" official={false} hint="같은 총 계약기간에 구매할 경우의 설치·이전·철거 등 견적을 넣으세요. 구입가에 포함된 항목과 아래 필터 자재비는 빼세요. 미확인 필터 배송비·관리비는 별도로 남깁니다. 모르면 빈칸, 추가비 없음 확인은 0입니다." onChange={(raw) => setOverride('purchaseExtra', raw)} onReset={() => resetOverride('purchaseExtra')} />
            {model.purchase.filters.map((filter, index) => <CostField key={filter.id} id={`cost-filter-${filter.id}`} label={`${filter.name} ${filter.partNumber} (${filter.cycleMonths}개월마다)`} hint={`교체 주기 ${filter.cycleMonths}개월 · ${filter.cycleBasis}(설명서)`} state={fields.filters[index]} unit="won" official onChange={(raw) => setOverride(`filter-${filter.id}`, raw)} onReset={() => resetOverride(`filter-${filter.id}`)} />)}
            <label className="flex items-start gap-3 border-t border-gray-200 pt-5 text-sm"><input type="checkbox" checked={showPromotion} onChange={(e) => setShowPromotion(e.target.checked)} className="mt-1 size-4" /><span>공식몰 프로모션 조건도 따로 계산하기 <PromotionTag /><span className="block text-xs text-gray-600">기간 한정·조건부 할인이라 기본 합계에는 쓰지 않습니다.</span></span></label>
            <div className="border-t border-gray-200 pt-5"><label htmlFor="cost-used" className="block text-sm font-semibold">중도해지: 지금까지 사용한 개월 수 <span className="font-normal text-gray-600">(선택)</span></label><input id="cost-used" type="text" inputMode="numeric" autoComplete="off" value={usedRaw} onChange={(e) => { setUsedRaw(e.target.value); setCopyState('idle'); }} aria-invalid={!!view?.usedError} placeholder="예: 18" className={fieldClass} />{view?.usedError && <p className="mt-1 text-sm text-red-700">{view.usedError}</p>}{usedRaw.trim() && fields.obligation.value === null && <p className="mt-1 text-sm text-amber-900">의무사용기간을 넣어야 위약금 산식을 계산할 수 있습니다.</p>}</div>
          </div>
        </details>
      </div>}
      <p role="status" className="mt-3 text-sm text-gray-700">{notice}</p>
    </section>

    <section aria-labelledby="cost-result-heading" className="rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6 print:border-0 print:bg-white print:p-0">
      <h2 id="cost-result-heading" tabIndex={-1} className="scroll-mt-24 text-xl font-bold">비용 비교 카드</h2>
      <p className="mt-2 text-sm text-gray-700">가격 확인일 {WATER_PURIFIER_COST_CHECKED_AT} <ValueBadge kind="official" /></p>
      {recheck && <p role="alert" className="mt-2 rounded border border-red-300 bg-red-50 p-3 text-sm font-semibold text-red-800">가격 재확인 필요: 확인일로부터 {PRICE_RECHECK_DAYS}일이 지났습니다. 제조사 화면에서 현재 가격을 다시 확인하세요.</p>}
      {!selected && <p role="status" className="mt-5 text-sm text-gray-700">모델을 고르면 공식 조건으로 렌탈·구매 합계를 계산합니다.</p>}
      {selected && !selected.available && <div className="mt-5 space-y-3 text-sm leading-relaxed">
        <p className="rounded border border-amber-300 bg-amber-50 p-3 font-semibold text-amber-950">공식 조건 확인 불가 <ValueBadge kind="unverified" /></p>
        <p>{selected.reason}</p>
        <ul className="space-y-2">{selected.facts.map((fact) => <li key={fact.label}><strong>{fact.label}</strong> <ValueBadge kind="official" /> {fact.value} <a href={fact.source.url} target="_blank" rel="noopener noreferrer" className={linkClass}>{fact.source.label}</a></li>)}</ul>
        <p><Link href={`/products/${selected.slug}`} className={linkClass}>제품 정보 보기</Link></p>
      </div>}
      {model && plan && !view && <p role="status" className="mt-5 text-sm text-red-700">표시된 칸을 고치면 다시 계산합니다.</p>}
      {model && plan && view && comparison && <div className="mt-5 space-y-5 text-sm leading-relaxed text-gray-800">
        <p className="font-semibold text-gray-900">{model.brand} {model.modelNumber} · {plan.label}</p>
        {allFields.some((state) => state.kind === 'entered') && <p className="text-xs text-gray-700">위 이름은 원래 선택한 조건입니다. 아래 합계는 직접 고친 금액·기간을 사용한 견적입니다.</p>}
        <div className="space-y-3">
          {view.obligationPath && <PathCard title={`의무사용기간 ${view.obligationPath.months}개월 ${model.rental.word} 합계 · 총기간 추가 견적비 제외`} result={view.obligationPath} />}
          <PathCard title={`총 계약기간 ${view.rental.months}개월 ${model.rental.word} 합계`} result={view.rental} />
          <PathCard title={`같은 ${view.purchase.months}개월 일시불 구매 합계`} result={view.purchase} />
        </div>
        <div role="status" aria-live="polite" className="rounded-lg border border-gray-300 bg-white p-4"><p className="font-semibold">같은 {comparison.months}개월 비교: 확인된 금액의 차이 {won(Math.abs(comparison.differenceWon))} <ValueBadge kind="calculated" /></p><p>{comparisonLabel(comparison.differenceWon)}. {comparison.comparable ? '두 합계 모두 빠진 비용 없이 계산했습니다.' : '빠진 비용이 있는 부분 합계라 이 차이는 확정된 값이 아닙니다.'} 렌탈·구매 중 하나를 추천하지 않습니다.</p></div>
        <div className="flex flex-wrap gap-3 print:hidden"><button type="button" onClick={copy} className="min-h-11 rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800">기록 복사</button><button type="button" onClick={() => window.print()} className="min-h-11 rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold">인쇄하기</button></div>
        <p role="status" className="print:hidden">{copyState === 'copied' ? '값의 종류와 출처를 붙여 복사했습니다.' : copyState === 'failed' ? '자동 복사에 실패했습니다. 아래 내용을 직접 복사하세요.' : ''}</p>
        {copyState === 'failed' && <textarea readOnly aria-label="직접 복사할 비용 기록" rows={14} value={record} className={`${fieldClass} print:hidden`} />}
        <div className="text-xs leading-relaxed text-gray-700"><p>{model.rental.includedNote}</p><p className="mt-1">{model.rental.monthlyNote}</p><p className="mt-1">{model.rental.registrationNote}</p><p className="mt-1">소유권: {model.rental.ownershipNote}</p><p className="mt-1">{model.purchase.note}</p></div>
        <p className="text-xs leading-relaxed text-gray-700">추가 견적비는 총 계약기간 비교에만 각 경로별 한 번 더합니다. 의무사용기간 카드와 중도해지 비용에는 배분하지 않습니다. 해지 회수비와 중복 합산해 청구액으로 해석하지 마세요. 필터·관리 비용의 미확인 항목은 별도로 남깁니다.</p>
        <div><h3 className="font-bold text-gray-900">조건에 따라 생기는 비용 <span className="text-xs font-normal text-gray-600">(아래 안내 금액은 자동 합산하지 않음)</span></h3><p className="mt-2 text-xs text-gray-700">실제 견적을 확인해 해당 경로의 추가 견적비 칸에 넣으세요. 이미 다른 칸에 포함된 비용은 다시 넣지 않습니다.</p><ul className="mt-2 list-disc space-y-1 pl-5">{model.rental.conditional.map((item) => <li key={item.label}><strong>{item.label}</strong> — {item.note}</li>)}</ul></div>
        {view.promotions.length > 0 && <div className="space-y-3"><h3 className="font-bold text-gray-900">프로모션 조건일 때 <PromotionTag /></h3>{view.promotions.map((promotion) => <PathCard key={promotion.title} title={promotion.title} result={promotion.result} promotion />)}{plan.promotion && <p className="text-xs text-gray-600">공식몰 화면 표시 총합: {plan.promotion.shownTotal}. ‘매월 5,000원 할인’ 항목의 이름은 화면에 없었습니다(라벨 불명).</p>}</div>}
        {view.promotionNotice && <p className="rounded-lg border border-gray-300 bg-white p-4">{view.promotionNotice}</p>}
        {view.penaltyNotice && <p role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-950">{view.penaltyNotice}</p>}
        {view.penalty && <div><h3 className="font-bold text-gray-900">중도해지 비용</h3><p className="mt-1 text-sm">해지 산식 기준 월요금: {won(view.penaltyBasis!.value)} <ValueBadge kind={view.penaltyBasis!.kind} /></p><p className="mt-1 text-xs text-gray-700">{model.penalty.formula}</p><PenaltyView model={model} result={view.penalty.result} usedMonths={view.penalty.usedMonths} /></div>}
        <p className="text-xs text-gray-600">출처: {[...model.rental.sources, ...model.purchase.sources, model.penalty.source].filter((source, index, list) => list.findIndex((other) => other.url === source.url) === index).map((source, index) => <span key={source.url}>{index > 0 && ' · '}<a href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{source.label}</a></span>)}</p>
        <p className="print:hidden"><Link href={`/products/${model.slug}`} className={linkClass}>제품 정보 보기</Link></p>
      </div>}
    </section>
  </div>;
}
