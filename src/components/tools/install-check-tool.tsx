'use client';

import Link from 'next/link';
import { Suspense, useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatMm, parseFitMeasurement } from '@/lib/fridge-fit';
import {
  checkInstall, effectiveStatus, emptyInstallInputs, getInstallCategory, installCheckHref, installCheckRecord, INSTALL_CATEGORIES, parseInstallSelection, SIDE_LABELS,
  type InstallCategoryId, type InstallCheck, type InstallInputs, type InstallModel, type InstallSelection,
} from '@/lib/install-check';
import { localDateLabel } from '@/lib/value-kind';
import { ValueBadge } from '@/components/tools/value-badge';

const field = 'mt-2 min-h-11 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 aria-[invalid=true]:border-red-600';
const linkClass = 'text-sm font-semibold text-blue-700 underline underline-offset-4';
const buttonClass = 'min-h-11 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700';

function subscribeToDayChange(onChange: () => void): () => void {
  const timer = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(timer);
}
const serverToday = () => '';

function SelectionQuerySync({ models, onSync }: { models: InstallModel[]; onSync: (selection: InstallSelection) => void }) {
  const search = useSearchParams();
  const { category, model, unknownModel } = parseInstallSelection(models, search.get('category'), search.get('model'));
  useEffect(() => { onSync({ category, model, unknownModel }); }, [category, model, unknownModel, onSync]);
  return null;
}

const emptyAll = (): Record<InstallCategoryId, InstallInputs> => ({ washer: emptyInstallInputs('washer'), purifier: emptyInstallInputs('purifier'), aircon: emptyInstallInputs('aircon'), robot: emptyInstallInputs('robot') });
const dims = (n: number | null) => (n === null ? '확인 필요' : formatMm(n));

function statusLabel(check: InstallCheck): string {
  return check.kind === 'short' ? '기준보다 작음' : check.kind === 'invalid' ? '입력 수정' : check.kind === 'unknown' ? '미측정' : check.kind === 'manual' ? '확인 필요' : '차이 확인';
}

function CheckRow({ check, raw }: { check: InstallCheck; raw: string }) {
  const parsed = parseFitMeasurement(raw);
  const red = check.kind === 'short' || check.kind === 'invalid';
  return <div className="py-3 text-sm">
    <dt className="font-semibold text-gray-900">{check.label} <span className={red ? 'text-red-700' : 'text-gray-600'}>· {statusLabel(check)}</span></dt>
    <dd className="mt-1 leading-relaxed text-gray-800">
      {parsed.kind === 'value' && check.kind !== 'manual' && <span className="mb-1 block">입력 {raw.trim()}mm <ValueBadge kind="measured" />{(check.kind === 'short' || check.kind === 'measured') && <> · 기준과 차이 <ValueBadge kind="calculated" /></>}</span>}
      {check.kind === 'manual' && <ValueBadge kind="unverified" className="mr-1" />}{check.message}
      {check.notes.length > 0 && <ul className="mt-2 space-y-1 text-xs leading-relaxed text-gray-700">{check.notes.map((note, index) => <li key={index} className="break-words">
        {(note.kind === 'unverified' || note.kind === 'conflict') && <ValueBadge kind="unverified" className="mr-1" />}
        {note.kind === 'troubleshooting' && <span className="mr-1 inline-block rounded border border-gray-300 px-1.5 py-0.5 text-xs font-semibold text-gray-700">고장 진단 절의 안내</span>}
        {note.text}
      </li>)}</ul>}
    </dd>
  </div>;
}

export function InstallCheckTool({ models }: { models: InstallModel[] }) {
  const router = useRouter();
  const [category, setCategory] = useState<InstallCategoryId>('washer');
  const [model, setModel] = useState(() => models.find((entry) => entry.category === 'washer')?.model ?? '');
  const [unknownModel, setUnknownModel] = useState<string | undefined>();
  // 품목마다 재는 곳이 달라 입력을 따로 둔다. 같은 품목 안에서 모델을 바꾸면 같은 자리 치수로 다시 계산한다.
  const [inputs, setInputs] = useState(emptyAll);
  const [prepared, setPrepared] = useState<string[]>([]);
  const [copyState, setCopyState] = useState<'idle' | 'copying' | 'copied' | 'failed'>('idle');
  const today = useSyncExternalStore(subscribeToDayChange, () => localDateLabel(), serverToday);
  const sync = useCallback((selection: InstallSelection) => {
    setCategory(selection.category); setModel(selection.model); setUnknownModel(selection.unknownModel); setPrepared([]); setCopyState('idle');
  }, []);

  const config = getInstallCategory(category);
  const categoryModels = models.filter((entry) => entry.category === category);
  const product = categoryModels.find((entry) => entry.model === model);
  const current = inputs[category];
  const checks = product ? checkInstall(product, current) : [];
  const record = product ? installCheckRecord(product, current, prepared, today || undefined) : '';

  function replaceUrl(nextCategory: InstallCategoryId, nextModel: string) {
    const url = new URL(window.location.href);
    url.searchParams.set('category', nextCategory);
    if (nextModel) url.searchParams.set('model', nextModel); else url.searchParams.delete('model');
    router.replace(`${url.pathname}${url.search}`, { scroll: false });
  }
  function selectCategory(next: InstallCategoryId) {
    const first = models.find((entry) => entry.category === next)?.model ?? '';
    sync({ category: next, model: first });
    replaceUrl(next, first);
  }
  function selectModel(next: string) {
    sync({ category, model: next });
    replaceUrl(category, next);
  }
  function update(key: string, value: string) {
    setInputs((old) => ({ ...old, [category]: { ...old[category], [key]: value } }));
    setCopyState('idle');
  }
  function reset() {
    setInputs((old) => ({ ...old, [category]: emptyInstallInputs(category) }));
    setPrepared([]); setCopyState('idle');
  }
  async function copy() {
    setCopyState('copying');
    try { await navigator.clipboard.writeText(record); setCopyState('copied'); }
    catch { setCopyState('failed'); }
  }
  function download() {
    if (!product) return;
    const url = URL.createObjectURL(new Blob([record], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = `설치공간확인-${product.model.replace(/[^\w-]+/g, '_')}.txt`; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const measuredCount = config.fields.filter(({ key }) => current[key]?.trim()).length;

  return <div id="install-check-tool" className="mt-8">
    <Suspense fallback={null}><SelectionQuerySync models={models} onSync={sync} /></Suspense>
    <div className="print:hidden">
      <fieldset>
        <legend className="text-sm font-semibold text-gray-900">어떤 가전을 설치하나요?</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {INSTALL_CATEGORIES.map((entry) => <label key={entry.id} className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${category === entry.id ? 'border-blue-600 bg-blue-50 font-semibold' : 'border-gray-300 bg-white'}`}>
            <input type="radio" name="install-category" value={entry.id} checked={category === entry.id} onChange={() => selectCategory(entry.id)} className="size-4 shrink-0 accent-blue-700" />
            <span className="min-w-0">{entry.label} <span className="block text-xs font-normal text-gray-600">{models.filter((m) => m.category === entry.id).length}개 모델</span></span>
          </label>)}
        </div>
      </fieldset>
      <label htmlFor="install-model" className="mt-5 block text-sm font-semibold text-gray-900">확인할 정확한 모델</label>
      <select id="install-model" value={product ? model : ''} onChange={(e) => selectModel(e.target.value)} className={`${field} sm:max-w-md`}>
        {!product && <option value="">모델을 선택하세요</option>}
        {categoryModels.map((entry) => <option key={entry.model} value={entry.model}>{entry.name} · {entry.model}</option>)}
      </select>
      {unknownModel && <p role="status" className="mt-2 text-sm leading-relaxed text-gray-800">주소에 적힌 모델 ‘{unknownModel}’은 이 확인표가 지원하지 않습니다. 목록에서 정확한 모델을 고르세요.</p>}
    </div>

    {!product ? <p role="status" className="mt-4 text-sm leading-relaxed text-gray-800">확인표에서 지원하는 정확한 모델을 목록에서 선택하세요.</p> : <>
      <section aria-labelledby="install-model-heading" className="mt-6">
        <h2 id="install-model-heading" className="text-lg font-bold text-gray-900">{config.label} · {product.name} {product.model}</h2>
        {!product.manualFound && <p className="mt-3 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm leading-relaxed text-amber-950"><ValueBadge kind="unverified" className="mr-1" /><strong>공식 설치 설명서를 찾지 못함.</strong> 아래 치수와 일부 항목은 제조사 제품 페이지 사양 값(공식 자료)이고, 간격과 설치 조건은 모두 확인 필요로 둡니다. 설명서가 없다고 단정하지 않습니다 — 설치팀·제조사에 물어 확인하세요.</p>}
        {product.manualNote && <p className="mt-3 rounded-lg bg-gray-100 p-3 text-sm leading-relaxed text-gray-800">{product.manualNote}</p>}
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-800">
          {product.parts.map((part) => <li key={part.id} className="break-words">
            <span className="font-semibold">{part.label}{part.model ? ` (${part.model})` : ''}</span> 폭 {dims(part.width)} × 깊이 {dims(part.depth)} × 높이 {dims(part.height)}{part.width !== null ? 'mm' : ''} <ValueBadge kind={part.width === null ? 'unverified' : 'official'} />{!part.compare && <span className="text-xs text-gray-600"> · 참고(비교에 쓰지 않음)</span>}
            <span className="block text-xs text-gray-600">{part.basis} {part.where}</span>
            {part.axisNote && <span className="block text-xs font-semibold text-amber-900">{part.axisNote}</span>}
          </li>)}
          {product.envelope && <li className="break-words"><span className="font-semibold">확보 공간 외곽</span> 폭 {formatMm(product.envelope.width)} × 깊이 {formatMm(product.envelope.depth)} × 높이 {formatMm(product.envelope.height)}mm <ValueBadge kind="official" /><span className="block text-xs text-gray-600">{product.envelope.text} {product.envelope.where}. 둘레 여유가 아니라 도크를 포함한 공간의 바깥 치수입니다.</span></li>}
          {product.category === 'washer' && product.door && <li><span className="font-semibold">문을 연 깊이</span> {product.door.openDepth !== null ? <>{formatMm(product.door.openDepth)}mm <ValueBadge kind="official" /></> : <ValueBadge kind="unverified" />}<span className="block text-xs text-gray-600">{product.door.basis} {product.door.where}</span></li>}
        </ul>
      </section>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-2 print:block">
        <section aria-labelledby="install-input-heading" className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 print:hidden">
          <h2 id="install-input-heading" className="text-xl font-bold text-gray-900">{config.label} 자리 재기 <ValueBadge kind="measured" /></h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">{config.lead} 단위는 mm이고, 모르는 칸은 비워 두세요. 치수는 주소나 서버에 남지 않습니다.</p>
          <p role="status" className="mt-2 text-xs leading-relaxed text-gray-600">{measuredCount ? `${config.label} 치수 ${measuredCount}개를 넣었습니다. 같은 품목의 다른 모델을 고르면 같은 치수로 다시 계산합니다.` : '품목을 바꿔도 품목별로 넣은 치수는 따로 남습니다.'}</p>
          <div className="mt-5 space-y-5">{config.fields.map(({ key, label, hint }) => {
            const parsed = parseFitMeasurement(current[key] ?? '');
            return <div key={key}>
              <label htmlFor={`install-${key}`} className="block text-sm font-semibold text-gray-900">{label} <span className="font-normal text-gray-600">(mm)</span></label>
              <p id={`install-${key}-hint`} className="mt-1 text-xs leading-relaxed text-gray-600">{hint}</p>
              <input id={`install-${key}`} type="text" inputMode="decimal" autoComplete="off" value={current[key] ?? ''} onChange={(e) => update(key, e.target.value)} aria-invalid={parsed.kind === 'invalid'} aria-describedby={`install-${key}-hint${parsed.kind === 'invalid' ? ` install-${key}-error` : ''}`} className={field} />
              {parsed.kind === 'invalid' && <p id={`install-${key}-error`} className="mt-1 text-sm text-red-700">{parsed.message}</p>}
            </div>;
          })}</div>
          <fieldset className="mt-7"><legend className="font-semibold text-gray-900">설치 상담에 가져갈 자료</legend><p className="mt-1 text-xs text-gray-600">체크는 설치 조건을 갖췄다는 뜻이 아닙니다.</p>
            <div className="mt-3 grid gap-2">{config.prepare.map((item) => <label key={item} className="flex min-h-11 items-center gap-3 text-sm"><input type="checkbox" checked={prepared.includes(item)} onChange={(e) => { setPrepared((old) => e.target.checked ? [...old, item] : old.filter((value) => value !== item)); setCopyState('idle'); }} className="size-4 shrink-0 accent-blue-700" />{item}의 사진·위치를 챙겼습니다</label>)}</div>
          </fieldset>
          <button type="button" onClick={reset} className={`mt-5 ${buttonClass}`}>이 품목의 치수와 체크 비우기</button>
        </section>

        <section aria-labelledby="install-result-heading" className="rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6 print:border-0 print:bg-white print:p-0">
          <h2 id="install-result-heading" className="text-xl font-bold text-gray-900">설치 전 확인 카드</h2>
          <p className="mt-1 text-sm text-gray-700">{product.name} {product.model}{today && <> · 기록일 {today}</>}</p>
          <p role="status" aria-live="polite" className="mt-4 text-sm leading-relaxed text-gray-800">{checks.some((c) => c.kind === 'invalid') ? '입력 오류를 고치세요. 잘못된 칸 아래에 이유를 적었습니다.' : checks.some((c) => c.kind === 'short') ? '기준보다 작은 칸이 있습니다. 다시 재 보고 설치팀에 상담하세요.' : checks.every((c) => c.kind === 'unknown' || c.kind === 'manual') ? '치수를 넣으면 칸마다 기준과의 차이를 보여 줍니다.' : '넣은 칸의 치수 차이만 계산했습니다. 설치할 수 있는지는 현장에서 정해집니다.'}</p>
          <p className="mt-2 text-xs leading-relaxed text-gray-600">기준 = 본체 치수 + 설명서에서 확인된 여유 <ValueBadge kind="calculated" />. 확인 필요인 면의 여유는 더하지 않고 칸 아래에 적습니다. 설치 가능 여부는 판정하지 않습니다.</p>
          <dl className="mt-4 divide-y divide-gray-200 border-y border-gray-200">{checks.map((check) => <CheckRow key={check.id} check={check} raw={current[check.field] ?? ''} />)}</dl>
          <p className="mt-3 text-sm text-gray-800">상담 자료: {prepared.length ? prepared.join(' · ') : '아직 없음'}</p>
        </section>
      </div>

      <div className="mt-10 grid items-start gap-8 border-t border-gray-200 pt-7 lg:grid-cols-2 print:block">
        <section aria-labelledby="install-clearance-heading">
          <h2 id="install-clearance-heading" className="text-xl font-bold text-gray-900">면별 여유</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">설명서 문장·도면에서 수치를 찾은 면만 ‘공식 자료’입니다. 고장 진단 절에만 있는 수치는 따로 표시합니다.</p>
          <ul className="mt-3 space-y-3 text-sm leading-relaxed">{product.clearances.map((c, index) => {
            const part = product.parts.find((entry) => entry.id === c.part);
            const status = effectiveStatus(product, c);
            return <li key={index} className="break-words rounded-lg border border-gray-200 bg-white p-3">
              <p className="font-semibold text-gray-900">{part?.label} {SIDE_LABELS[c.side]} {c.mm !== null && status === 'confirmed' ? `${formatMm(c.mm)}mm` : ''} <ValueBadge kind={status === 'confirmed' ? 'official' : 'unverified'} />{c.troubleshooting && <span className="ml-1 inline-block rounded border border-gray-300 px-1.5 py-0.5 text-xs font-semibold text-gray-700">고장 진단 절의 안내</span>}</p>
              {c.conflict && <p className="mt-1 font-semibold text-amber-900">원문 안에서 값이 엇갈림: {c.conflict.map((v) => `${formatMm(v.mm)}mm(${v.where})`).join(' / ')}. 계산에 쓰지 않습니다.</p>}
              <p className="mt-1 text-gray-800">{c.text}</p>
              <p className="mt-1 text-xs text-gray-600">{c.where}</p>
            </li>;
          })}</ul>
        </section>
        <section aria-labelledby="install-condition-heading" className="print:mt-6">
          <h2 id="install-condition-heading" className="text-xl font-bold text-gray-900">급수·배수·전원·위치 조건</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">숫자로 비교할 수 없는 조건은 원문에서 찾았는지로만 나눕니다.{!product.manualFound && ' 설명서를 찾지 못한 모델은 제품 페이지 사양 탭 값만 공식 자료로 둡니다.'}</p>
          <ul className="mt-3 space-y-3 text-sm leading-relaxed">{product.conditions.map((c, index) => {
            const status = effectiveStatus(product, c);
            return <li key={index} className="break-words rounded-lg border border-gray-200 bg-white p-3">
              <p className="font-semibold text-gray-900">{c.topic} <ValueBadge kind={status === 'confirmed' ? 'official' : 'unverified'} /></p>
              <p className="mt-1 text-gray-800">{c.text}</p>
              {status !== c.status && <p className="mt-1 text-xs font-semibold text-amber-900">제품 페이지의 사양 값이 아니라 설명서로 확인하기 전까지 확인 필요로 둡니다.</p>}
              <p className="mt-1 text-xs text-gray-600">{c.where}</p>
            </li>;
          })}</ul>
          {product.notes.length > 0 && <ul className="mt-4 list-disc space-y-1 pl-5 text-sm leading-relaxed text-gray-700">{product.notes.map((note) => <li key={note}>{note}</li>)}</ul>}
        </section>
      </div>

      <section aria-labelledby="install-source-heading" className="mt-10 border-t border-gray-200 pt-7">
        <h2 id="install-source-heading" className="text-xl font-bold text-gray-900">어느 원문으로 확인했나요?</h2>
        <p className="mt-3 break-words text-sm leading-relaxed text-gray-700">{product.document} · {product.sourcePages}<br />원문 확인 {product.checkedAt}. 제품 라벨의 모델번호가 같은지 함께 확인하세요.</p>
        <a href={product.sourceUrl} target="_blank" rel="noopener noreferrer" className={`mt-3 inline-block ${linkClass}`}>{product.manualFound ? `${product.model} 공식 설명서 열기` : `${product.model} 제조사 제품 페이지 열기`}</a>
        <div className="mt-5 flex flex-wrap gap-3 print:hidden">
          <button type="button" onClick={copy} disabled={copyState === 'copying'} className="min-h-11 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-wait disabled:opacity-60">{copyState === 'copying' ? '복사 중…' : '설치 상담 기록 복사'}</button>
          <button type="button" onClick={download} className={buttonClass}>기록 파일로 저장</button>
          <button type="button" onClick={() => window.print()} className={buttonClass}>인쇄하기</button>
        </div>
        <p role="status" className="mt-3 text-sm leading-relaxed text-gray-700 print:hidden">{copyState === 'copied' ? '모델·잰 치수·기준과 차이·확인 필요 항목·원문을 복사했습니다.' : copyState === 'failed' ? '자동 복사에 실패했습니다. 아래 기록을 선택해 직접 복사하거나 파일로 저장하세요.' : '기록에는 값마다 공식 자료·사용자 실측·계산값·확인 필요 표시와 기록일이 붙습니다.'}</p>
        {copyState === 'failed' && <textarea aria-label="직접 복사할 설치 상담 기록" readOnly rows={12} value={record} className={`${field} text-sm leading-relaxed print:hidden`} />}
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 print:hidden">
          <Link href={`/products/${product.slug}#fit`} className={linkClass}>이 모델의 제품 상세 보기</Link>
          <Link href={installCheckHref(product.category, product.model)} className={linkClass}>이 모델 주소로 다시 열기</Link>
        </div>
      </section>
    </>}
  </div>;
}
