'use client';

import Link from 'next/link';
import { Suspense, useCallback, useEffect, useId, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  checkFridgeFit, EMPTY_FIT_INPUTS, FIT_FIELDS, FIT_QUESTIONS, fitMargin, formatMm, fridgeFitHref, fridgeFitRecord, fridgeFitTargets, fridgeFrontClearance,
  parseFitMeasurement, parseFitModel, FRIDGE_EXAMPLE_KITCHENS, type FitField, type FitInputs, type FitQuestion, type FridgeExampleScene, type FridgeFitProduct,
} from '@/lib/fridge-fit';
import { energyComparisonHref } from '@/lib/energy-comparison';
import { getEnergyMeasurement } from '@/lib/data/energy-measurements';
import { localDateLabel } from '@/lib/value-kind';
import { ValueBadge } from '@/components/tools/value-badge';
import { useToolResultEvent } from '@/components/tools/use-tool-result-event';

function ModelQuerySync({ products, onSync }: { products: FridgeFitProduct[]; onSync: (model: string) => void }) {
  const search = useSearchParams();
  const model = parseFitModel(search.get('model'), products);
  useEffect(() => { onSync(model); }, [model, onSync]);
  return null;
}

type InputKind = 'measured' | 'example';
// 예시값은 색만으로 구별하지 않도록 점선으로도 그린다. 빨강(부족)과 섞이지 않는 호박색을 쓴다.
const COLORS = { official: '#1d4ed8', measured: '#047857', example: '#d97706', short: '#b91c1c', calculated: '#6d28d9' };
const VW = 440, CX = 220, WALL_Y = 46;

function Marker({ x, y, n, color }: { x: number; y: number; n: number; color: string }) {
  return <g><circle cx={x} cy={y} r="12" fill="#fff" stroke={color} strokeWidth="2" /><text x={x} y={y + 0.5} textAnchor="middle" dominantBaseline="middle" fill={color} fontSize="14" fontWeight="700">{n}</text></g>;
}

function measured(inputs: FitInputs, key: FitField) {
  const parsed = parseFitMeasurement(inputs[key]);
  return parsed.kind === 'value' ? parsed.mm : undefined;
}

/** 설명서 치수와 입력 공간만 같은 축척으로 그린다. 문 궤적은 문짝 폭·경첩 위치 자료가 없어 그리지 않는다. */
function PlanView({ product, inputs, inputKind }: { product: FridgeFitProduct; inputs: FitInputs; inputKind: InputKind }) {
  const hatchId = useId().replaceAll(':', '');
  const space = measured(inputs, 'spaceWidth');
  const opening = measured(inputs, 'openingWidth');
  const front = measured(inputs, 'frontDistance');
  const target = fridgeFitTargets(product);
  const clearance = fridgeFrontClearance(product, inputs);
  const user = COLORS[inputKind];
  const userDash = inputKind === 'example' ? '6 4' : undefined;
  const scale = Math.min(380 / Math.max(product.openWidth, opening ?? 0, space ?? 0), 250 / (Math.max(target.frontDistance, front ?? 0) + 40));
  const s = (mm: number) => mm * scale;
  const bodyX = CX - s(product.width) / 2;
  const bodyY = WALL_Y + s(product.rearGap);
  const bodyEnd = bodyY + s(product.depth);
  const openEnd = WALL_Y + s(target.frontDistance);
  const obstacleY = front !== undefined ? WALL_Y + s(front) : undefined;
  const zoneEnd = obstacleY ?? openEnd + 18;
  const height = Math.ceil(Math.max(openEnd, (obstacleY ?? 0) + 16) + 52);
  const spaceShort = space !== undefined && fitMargin(product, 'spaceWidth', space) < 0;
  const openingShort = opening !== undefined && fitMargin(product, 'openingWidth', opening) < 0;
  const overlap = obstacleY !== undefined && obstacleY < openEnd;
  const label = `${product.modelNumber} 평면 참고도. 본체 ${product.width}×${product.depth}mm, 후면 간격 ${product.rearGap}mm, 문 개방 폭 ${product.openWidth}mm, 뒷벽부터 문 개방 끝 ${target.frontDistance}mm.${front !== undefined ? ` 입력한 맞은편 장애물까지 ${formatMm(front)}mm${overlap ? ', 문 개방 범위와 겹침' : ''}.` : ''}`;
  return (
    <figure className="mt-6">
      <div className="rounded-xl border border-gray-200 bg-white p-2 sm:p-4">
        <svg viewBox={`0 0 ${VW} ${height}`} role="img" aria-label={label} className="w-full">
          <defs>
            <pattern id={`${hatchId}-wall`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke="#9ca3af" strokeWidth="2" /></pattern>
            <pattern id={`${hatchId}-obstacle`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" stroke={user} strokeWidth="2" opacity="0.5" /></pattern>
          </defs>
          <g aria-hidden="true">
            <text x="20" y="22" fill="#374151" fontSize="14">뒷벽</text>
            <rect x="20" y={WALL_Y - 9} width="400" height="9" fill={`url(#${hatchId}-wall)`} />
            <line x1="20" y1={WALL_Y} x2="420" y2={WALL_Y} stroke="#374151" strokeWidth="3" />
            {space !== undefined && <g>
              <line x1={CX - s(space) / 2} y1={WALL_Y + 6} x2={CX + s(space) / 2} y2={WALL_Y + 6} stroke={spaceShort ? COLORS.short : user} strokeWidth="2.5" strokeDasharray={userDash} />
              {[CX - s(space) / 2, CX + s(space) / 2].map((x) => <line key={x} x1={x} y1={WALL_Y} x2={x} y2={WALL_Y + 22} stroke={spaceShort ? COLORS.short : user} strokeWidth="2.5" />)}
              <Marker x={CX - s(space) / 2 - 16} y={WALL_Y + 16} n={6} color={spaceShort ? COLORS.short : user} />
            </g>}
            <rect x={bodyX} y={bodyY} width={s(product.width)} height={s(product.depth)} fill="#dbeafe" stroke={COLORS.official} strokeWidth="2" />
            <Marker x={CX} y={(bodyY + bodyEnd) / 2} n={1} color={COLORS.official} />
            <rect x={bodyX} y={bodyEnd} width={s(product.width)} height={Math.max(0, openEnd - bodyEnd)} fill={COLORS.official} opacity="0.07" />
            <line x1={bodyX} y1={openEnd} x2={bodyX + s(product.width)} y2={openEnd} stroke={COLORS.official} strokeWidth="2" strokeDasharray="4 4" />
            <Marker x={bodyX + s(product.width) + 16} y={openEnd} n={2} color={COLORS.official} />
            <line x1={CX - s(product.openWidth) / 2} y1={bodyEnd + 14} x2={CX + s(product.openWidth) / 2} y2={bodyEnd + 14} stroke={COLORS.official} strokeWidth="2" strokeDasharray="8 5" />
            {[CX - s(product.openWidth) / 2, CX + s(product.openWidth) / 2].map((x) => <line key={x} x1={x} y1={bodyEnd + 7} x2={x} y2={bodyEnd + 21} stroke={COLORS.official} strokeWidth="2" />)}
            <Marker x={CX - s(product.openWidth) / 2 - 2} y={bodyEnd + 34} n={3} color={COLORS.official} />
            {opening !== undefined && [CX - s(opening) / 2, CX + s(opening) / 2].map((x) => <line key={x} x1={x} y1={bodyEnd} x2={x} y2={zoneEnd} stroke={openingShort ? COLORS.short : user} strokeWidth="2.5" strokeDasharray={userDash} />)}
            {opening !== undefined && <Marker x={CX + s(opening) / 2} y={zoneEnd - 26} n={5} color={openingShort ? COLORS.short : user} />}
            {obstacleY !== undefined && <g>
              <rect x="20" y={obstacleY} width="400" height="14" fill={`url(#${hatchId}-obstacle)`} stroke={user} strokeWidth="2" strokeDasharray={userDash} />
              <Marker x={36} y={obstacleY + 30} n={4} color={user} />
            </g>}
            {overlap && obstacleY !== undefined && <rect x={bodyX} y={obstacleY} width={s(product.width)} height={openEnd - obstacleY} fill={COLORS.short} opacity="0.28" stroke={COLORS.short} strokeDasharray="3 3" />}
            {clearance && obstacleY !== undefined && obstacleY > bodyEnd && <g>
              <line x1="404" y1={bodyEnd} x2="404" y2={obstacleY} stroke={COLORS.calculated} strokeWidth="2" />
              {[bodyEnd, obstacleY].map((y) => <line key={y} x1="398" y1={y} x2="410" y2={y} stroke={COLORS.calculated} strokeWidth="2" />)}
              <line x1={bodyX + s(product.width)} y1={bodyEnd} x2="404" y2={bodyEnd} stroke={COLORS.calculated} strokeWidth="1" strokeDasharray="2 3" />
              <Marker x={404} y={Math.max(bodyEnd + 14, (bodyEnd + obstacleY) / 2)} n={7} color={COLORS.calculated} />
            </g>}
            <text x={CX} y={height - 12} textAnchor="middle" fill="#374151" fontSize="14">↓ 냉장고 앞쪽 · 단위 mm</text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-gray-800">
        <ol className="space-y-2">
          <li><span className="font-semibold text-blue-800">① 닫힌 본체</span> {formatMm(product.width)}×{formatMm(product.depth)}mm <ValueBadge kind="official" /> 뒷벽에서 후면 간격 {product.rearGap}mm를 둔 위치입니다.</li>
          <li><span className="font-semibold text-blue-800">② 문 개방 깊이 끝</span> 뒷벽에서 {formatMm(target.frontDistance)}mm <ValueBadge kind="calculated" /> = 후면 {product.rearGap} + 개방 깊이 {formatMm(product.openDepth)}({product.openDepthBasis}) <ValueBadge kind="official" /></li>
          <li><span className="font-semibold text-blue-800">③ 문 개방 폭</span> {formatMm(product.openWidth)}mm({product.openWidthBasis}) <ValueBadge kind="official" /></li>
          <li><span className="font-semibold">④ 맞은편 가구·장애물</span> {front !== undefined ? <>뒷벽에서 {formatMm(front)}mm <ValueBadge kind={inputKind} /></> : '미측정 · 입력하면 띠로 표시합니다.'}</li>
          <li><span className="font-semibold">⑤ 문 구역 확보 폭</span> {opening !== undefined ? <>{formatMm(opening)}mm <ValueBadge kind={inputKind} />{openingShort ? <span className="font-semibold text-red-700"> ③보다 {formatMm(-fitMargin(product, 'openingWidth', opening))}mm 좁음</span> : null}</> : '미측정'}</li>
          <li><span className="font-semibold">⑥ 냉장고 자리 폭</span> {space !== undefined ? <>{formatMm(space)}mm <ValueBadge kind={inputKind} />{spaceShort ? <span className="font-semibold text-red-700"> 본체+좌우 참고 간격 {formatMm(target.spaceWidth)}mm보다 {formatMm(-fitMargin(product, 'spaceWidth', space))}mm 좁음</span> : null}</> : '미측정'}</li>
          <li><span className="font-semibold text-violet-800">⑦ 맞은편까지 남는 거리</span> {clearance ? <>닫힌 본체 앞면부터 {formatMm(clearance.closed)}mm · 문 개방 끝부터 {formatMm(clearance.open)}mm <ValueBadge kind="calculated" />{clearance.open < 0 ? <span className="font-semibold text-red-700"> 빨간 칸만큼 문 개방 범위와 겹칩니다.</span> : null}</> : '④를 입력하면 계산합니다.'}</li>
        </ol>
        <p className="mt-3 text-gray-700">{product.openingNote} ③과 ②는 같은 각도의 점유 범위가 아니라 각각의 참고선입니다. 문이 움직이는 궤적과 사람의 통로 기준은 그리지 않았습니다. 후면은 설명서의 최소 간격으로 둔 가정입니다.</p>
      </figcaption>
    </figure>
  );
}

function compareCell(product: FridgeFitProduct, inputs: FitInputs, key: Exclude<FitField, 'routeWidth'>) {
  const parsed = parseFitMeasurement(inputs[key]);
  if (parsed.kind === 'empty') return { text: '미측정', short: false };
  if (parsed.kind === 'invalid') return { text: '입력 오류', short: true };
  const margin = fitMargin(product, key, parsed.mm);
  return { text: margin < 0 ? `${formatMm(-margin)} 부족` : `+${formatMm(margin)}`, short: margin < 0 };
}

function ModelComparison({ products, current, inputs, inputKind, onSelect }: { products: FridgeFitProduct[]; current: string; inputs: FitInputs; inputKind: InputKind; onSelect: (model: string) => void }) {
  const columns: [Exclude<FitField, 'routeWidth'>, string][] = [['spaceWidth', '자리 폭'], ['spaceHeight', '높이'], ['openingWidth', '문 구역 폭'], ['frontDistance', '뒷벽~장애물']];
  return <section className="mt-10 border-t border-gray-200 pt-7" aria-labelledby="fit-compare-heading">
    <h2 id="fit-compare-heading" className="text-xl font-bold text-gray-900">같은 자리에 다른 모델을 놓으면?</h2>
    <p className="mt-2 text-sm leading-relaxed text-gray-700">위에 입력한 {inputKind === 'example' ? '예시' : '우리 집'} 치수 그대로 네 모델의 설명서 기준과의 차이를 계산합니다. 단위 mm, +는 기준보다 큰 값, 부족은 기준보다 작은 값입니다. 차이가 +여도 설치 가능 판정이 아닙니다.</p>
    <ul className="mt-4 space-y-3 sm:hidden print:hidden">{products.map((product) => {
      const energy = getEnergyMeasurement(product.modelNumber);
      const active = product.modelNumber === current;
      return <li key={product.modelNumber} className={`rounded-lg border p-3 text-sm ${active ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}`}>
        <p className="font-semibold">{active ? <>{product.brandLabel} {product.modelNumber} <span className="text-xs font-normal text-blue-800">(보는 중)</span></> : <button type="button" onClick={() => onSelect(product.modelNumber)} className="min-h-11 text-left font-semibold text-blue-700 underline underline-offset-4">{product.brandLabel} {product.modelNumber}</button>}</p>
        <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
          {columns.map(([key, title]) => { const cell = compareCell(product, inputs, key); return <div key={key} className="flex justify-between gap-2"><dt className="text-gray-600">{title}</dt><dd className={`tabular-nums ${cell.short ? 'font-semibold text-red-700' : ''}`}>{cell.text}</dd></div>; })}
          <div className="col-span-2 flex justify-between gap-2"><dt className="text-gray-600">공단 월간 신고</dt><dd className="tabular-nums">{energy ? `${energy.value.toFixed(2)}kWh/월` : '확인 필요'}</dd></div>
        </dl>
      </li>;
    })}</ul>
    <p className="mt-2 text-xs text-gray-600 sm:hidden print:hidden">치수 차이 <ValueBadge kind="calculated" /> · 신고 전력량 <ValueBadge kind="official-test" /></p>
    <div className="mt-4 hidden overflow-x-auto sm:block print:block">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        <caption className="sr-only">입력 치수와 모델별 설명서 기준의 차이, 공단 월간 신고 전력량</caption>
        <thead><tr className="border-b border-gray-300 text-gray-700"><th scope="col" className="py-2 pr-3 font-semibold">모델</th>{columns.map(([key, title]) => <th key={key} scope="col" className="px-2 py-2 font-semibold">{title} <ValueBadge kind="calculated" /></th>)}<th scope="col" className="px-2 py-2 font-semibold">공단 월간 신고 <ValueBadge kind="official-test" /></th></tr></thead>
        <tbody>{products.map((product) => {
          const energy = getEnergyMeasurement(product.modelNumber);
          const active = product.modelNumber === current;
          return <tr key={product.modelNumber} className={`border-b border-gray-200 ${active ? 'bg-blue-50' : ''}`}>
            <th scope="row" className="py-2 pr-3 font-semibold">{active ? <span>{product.brandLabel} {product.modelNumber} <span className="text-xs font-normal text-blue-800">(보는 중)</span></span> : <button type="button" onClick={() => onSelect(product.modelNumber)} className="min-h-11 text-left font-semibold text-blue-700 underline underline-offset-4 print:no-underline">{product.brandLabel} {product.modelNumber}</button>}</th>
            {columns.map(([key]) => { const cell = compareCell(product, inputs, key); return <td key={key} className={`px-2 py-2 tabular-nums ${cell.short ? 'font-semibold text-red-700' : 'text-gray-800'}`}>{cell.text}</td>; })}
            <td className="px-2 py-2 tabular-nums text-gray-800">{energy ? `${energy.value.toFixed(2)}kWh/월` : '확인 필요'}</td>
          </tr>;
        })}</tbody>
      </table>
    </div>
    <p className="mt-3 text-sm leading-relaxed text-gray-700">신고 전력량은 한국에너지공단 공개 신고값이며 집의 실제 사용량이나 요금이 아닙니다. <Link href={energyComparisonHref(current)} className="font-semibold text-blue-700 underline underline-offset-4 print:hidden">두 모델의 전기사용량 자세히 비교하기</Link></p>
  </section>;
}

const inputClass = 'mt-2 min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 aria-[invalid=true]:border-red-600';
const linkClass = 'text-sm font-semibold text-blue-700 underline underline-offset-4';
const EXAMPLE_KITCHENS = FRIDGE_EXAMPLE_KITCHENS;
type ExampleScene = FridgeExampleScene;
type KitchenScene = 'own' | ExampleScene;
const exampleDefaults = (): Record<ExampleScene, FitInputs> => ({ compact: { ...EXAMPLE_KITCHENS.compact.inputs }, open: { ...EXAMPLE_KITCHENS.open.inputs } });

export function FridgeFitTool({ products }: { products: FridgeFitProduct[] }) {
  const router = useRouter();
  const [model, setModel] = useState(products[0]?.modelNumber ?? '');
  // 우리 집 실측값과 예시값을 따로 보관해 예시를 둘러본 뒤에도 실측값이 사라지지 않게 한다.
  const [ownInputs, setOwnInputs] = useState<FitInputs>({ ...EMPTY_FIT_INPUTS });
  const [exampleInputs, setExampleInputs] = useState(exampleDefaults);
  const [scene, setScene] = useState<KitchenScene>('own');
  const [prepared, setPrepared] = useState<FitQuestion[]>([]);
  const [copyState, setCopyState] = useState<'idle' | 'copying' | 'copied' | 'failed'>('idle');
  const product = products.find((p) => p.modelNumber === model);
  const inputs = scene === 'own' ? ownInputs : exampleInputs[scene];
  const inputKind: InputKind = scene === 'own' ? 'measured' : 'example';
  const ownCount = FIT_FIELDS.filter(({ key }) => ownInputs[key].trim()).length;
  const checks = product ? checkFridgeFit(product, inputs) : [];
  // 예시 주방을 둘러보는 것은 결과 도달이 아니다.
  useToolResultEvent('fridge-fit', scene === 'own' && checks.some((c) => c.kind === 'short' || c.kind === 'measured'));
  const sceneTitle = scene === 'own' ? undefined : EXAMPLE_KITCHENS[scene].title;
  const record = product ? fridgeFitRecord(product, inputs, prepared, sceneTitle, localDateLabel()) : '';
  const sync = useCallback((next: string) => { setModel(next); setPrepared([]); setCopyState('idle'); }, []);

  function selectModel(next: string) {
    sync(next);
    const url = new URL(window.location.href);
    url.searchParams.set('model', next);
    router.replace(`${url.pathname}${url.search}`, { scroll: false });
  }
  function updateInput(key: FitField, value: string) {
    if (scene === 'own') setOwnInputs((old) => ({ ...old, [key]: value }));
    else setExampleInputs((old) => ({ ...old, [scene]: { ...old[scene], [key]: value } }));
    setCopyState('idle');
  }
  function selectScene(next: KitchenScene) { setScene(next); setCopyState('idle'); }
  function resetScene() {
    if (scene === 'own') { setOwnInputs({ ...EMPTY_FIT_INPUTS }); setPrepared([]); }
    else setExampleInputs((old) => ({ ...old, [scene]: { ...EXAMPLE_KITCHENS[scene].inputs } }));
    setCopyState('idle');
  }
  async function copy() {
    setCopyState('copying');
    try { await navigator.clipboard.writeText(record); setCopyState('copied'); }
    catch { setCopyState('failed'); }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([record], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = `냉장고-설치확인-${model}${scene === 'own' ? '' : '-예시'}.txt`; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div id="fridge-fit-tool" className="mt-8">
      <Suspense fallback={null}><ModelQuerySync products={products} onSync={sync} /></Suspense>
      <div className="print:hidden">
        <label htmlFor="fit-model" className="block text-sm font-semibold text-gray-900">확인할 정확한 모델</label>
        <select id="fit-model" value={model} onChange={(e) => selectModel(e.target.value)} className={`${inputClass} sm:max-w-md`}>
          <option value="">모델을 선택하세요</option>
          {products.map((p) => <option key={p.modelNumber} value={p.modelNumber}>{p.brandLabel} {p.modelNumber}</option>)}
        </select>
      </div>
      {!product ? <p role="status" className="mt-4 text-sm leading-relaxed text-gray-800">확인표에서 지원하는 정확한 모델을 목록에서 선택하세요. 주소에 적힌 모델이 목록에 없다면 이 확인표가 지원하지 않는 모델입니다.</p> : <>
        <p className="mt-3 text-sm text-gray-700"><span className="font-semibold text-gray-900 print:text-base">{product.brandLabel} {product.modelNumber}</span> · 본체 폭 {formatMm(product.width)} × 높이 {formatMm(product.height)} × 깊이 {formatMm(product.depth)}mm · 문을 닫은 상태 <ValueBadge kind="official" /></p>
        <div className={`mt-7 rounded-xl border p-4 sm:p-5 print:hidden ${scene === 'own' ? 'border-gray-200 bg-white' : 'border-orange-300 bg-orange-50'}`}>
          <fieldset>
            <legend className="text-sm font-semibold text-gray-900">어떤 치수로 볼까요?</legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {([['own', '우리 집 실측값'], ['compact', EXAMPLE_KITCHENS.compact.title], ['open', EXAMPLE_KITCHENS.open.title]] as const).map(([value, title]) => <label key={value} className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${scene === value ? (value === 'own' ? 'border-emerald-600 bg-emerald-50 font-semibold' : 'border-orange-500 bg-white font-semibold') : 'border-gray-300 bg-white'}`}>
                <input type="radio" name="fit-scene" value={value} checked={scene === value} onChange={() => selectScene(value)} className="size-4 accent-blue-700" />{title}
              </label>)}
            </div>
          </fieldset>
          <p role="status" className="mt-3 text-sm leading-relaxed text-gray-700">{scene === 'own' ? (ownCount ? `우리 집 실측값 ${ownCount}개를 보고 있습니다. 예시를 둘러봐도 이 값은 그대로 남습니다.` : '집에서 잰 값을 입력하세요. 예시 주방을 먼저 둘러봐도 됩니다.') : `${EXAMPLE_KITCHENS[scene].title}의 가상 치수입니다. 값을 수정해도 예시로 남고, 우리 집 실측값${ownCount ? ` ${ownCount}개` : ''}에는 섞이지 않습니다.`}</p>
        </div>
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <section aria-labelledby="fit-input-heading" className="print:hidden">
            <h2 id="fit-input-heading" className="text-xl font-bold text-gray-900">{scene === 'own' ? '우리 집에서 잰 치수' : '가상 주방의 예시 치수'} <ValueBadge kind={inputKind} /></h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">모르는 값은 비워 두세요. 모든 입력은 mm입니다. 100cm는 1,000mm로 입력합니다. 집 치수는 주소나 서버에 저장하지 않습니다.</p>
            <div className="mt-5 space-y-5">
              {FIT_FIELDS.map(({ key, label, hint }) => {
                const parsed = parseFitMeasurement(inputs[key]);
                return <div key={key}>
                  <label htmlFor={`fit-${key}`} className="block text-sm font-semibold text-gray-900">{label} <span className="font-normal text-gray-600">(mm)</span></label>
                  <p id={`fit-${key}-hint`} className="mt-1 text-sm leading-relaxed text-gray-700">{hint}</p>
                  <input id={`fit-${key}`} type="text" inputMode="decimal" autoComplete="off" value={inputs[key]} onChange={(e) => updateInput(key, e.target.value)}
                    aria-describedby={`fit-${key}-hint${parsed.kind === 'invalid' ? ` fit-${key}-error` : ''}`} aria-invalid={parsed.kind === 'invalid'} className={`${inputClass} ${scene === 'own' ? '' : 'border-orange-300 bg-orange-50'}`} />
                  {parsed.kind === 'invalid' && <p id={`fit-${key}-error`} className="mt-1 text-sm text-red-700">{parsed.message}</p>}
                </div>;
              })}
            </div>
            <button type="button" onClick={resetScene} className="mt-5 min-h-11 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">{scene === 'own' ? '우리 집 치수와 체크 항목 비우기' : '예시 값을 처음으로 되돌리기'}</button>
          </section>
          <section aria-labelledby="fit-plan-heading">
            <h2 id="fit-plan-heading" className="text-xl font-bold text-gray-900">위에서 보면 얼마나 차지할까?</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">설명서 치수(파랑)와 {scene === 'own' ? '집에서 잰 값(초록 실선)' : '예시값(호박색 점선)'}을 같은 축척으로 겹쳤습니다. 기준보다 작은 곳은 빨강, 두 값으로 계산한 거리는 보라입니다.</p>
            {scene !== 'own' && <p className="mt-2 rounded-lg bg-orange-50 p-3 text-sm font-semibold text-orange-950">가상 예시 치수로 그린 그림입니다.</p>}
            <PlanView product={product} inputs={inputs} inputKind={inputKind} />
          </section>
        </div>

        <section className="mt-10 border-t border-gray-200 pt-7" aria-labelledby="fit-result-heading">
          <h2 id="fit-result-heading" className="text-xl font-bold text-gray-900">부족한 곳과 아직 확인할 곳</h2>
          <p role="status" className="mt-3 text-sm leading-relaxed text-gray-800">
            {checks.some((c) => c.kind === 'invalid') ? '입력 오류가 있습니다. 표시된 칸을 수정하세요.' : checks.some((c) => c.kind === 'short') ? '참고 치수보다 작은 항목이 있습니다. 해당 공간을 다시 재고 설치팀에 상담하세요.' : checks.every((c) => c.kind === 'unknown') ? '집 치수를 입력하면 항목별 차이를 확인할 수 있습니다.' : '입력한 항목을 비교했습니다. 상부 여유·반입·실제 문 움직임은 추가 확인이 필요합니다.'}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">전체 설치 가능 여부는 판정하지 않습니다. 치수 오차·좌우 비대칭 배치·바닥 수평·문 앞 사람의 자리도 현장에서 확인해야 합니다.</p>
          {scene !== 'own' && <p className="mt-2 rounded-lg bg-orange-50 p-3 text-sm font-semibold text-orange-950">가상 예시 결과입니다. 이 결과로 우리 집 설치 여부를 판단하지 마세요.</p>}
          <dl className="mt-5 divide-y divide-gray-200 border-y border-gray-200">
            {checks.map((check) => <div key={check.field} className="grid gap-2 py-4 sm:grid-cols-[13rem_1fr] sm:gap-5">
              <dt className="text-sm font-semibold text-gray-900">{check.label}<span className={`mt-1 block text-xs font-medium ${check.kind === 'short' || check.kind === 'invalid' ? 'text-red-700' : 'text-gray-600'}`}>{check.kind === 'short' ? '참고 치수 미달' : check.kind === 'invalid' ? '입력 수정' : check.kind === 'unknown' ? '미측정' : check.kind === 'manual' ? '설치팀 확인' : '치수 차이 확인'}</span></dt>
              <dd className="text-sm leading-relaxed text-gray-800">{parseFitMeasurement(inputs[check.field]).kind === 'value' && <span className="mb-1 block">입력 {inputs[check.field].trim()}mm <ValueBadge kind={inputKind} />{(check.kind === 'short' || check.kind === 'measured') && <> · 차이 <ValueBadge kind="calculated" /></>}</span>}{check.message}</dd>
            </div>)}
          </dl>
          <p className="mt-4 text-sm leading-relaxed text-gray-800"><strong>상부 여유는 별도 확인:</strong> {product.topNote}</p>
        </section>

        <ModelComparison products={products} current={product.modelNumber} inputs={inputs} inputKind={inputKind} onSelect={selectModel} />

        <section className="mt-10" aria-labelledby="fit-questions-heading">
          <h2 id="fit-questions-heading" className="text-xl font-bold text-gray-900">설치 상담 전에 준비하세요</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">사진·치수나 질문을 준비했다면 체크하세요. 체크는 설치 조건을 충족했다는 뜻이 아닙니다. 모델을 바꾸면 체크 상태를 비웁니다.</p>
          <div className="mt-4 divide-y divide-gray-200">
            {FIT_QUESTIONS.map((q) => <label key={q.key} className="flex cursor-pointer items-start gap-3 py-3 text-sm leading-relaxed text-gray-800">
              <input type="checkbox" checked={prepared.includes(q.key)} onChange={(e) => { setPrepared((old) => e.target.checked ? [...old, q.key] : old.filter((key) => key !== q.key)); setCopyState('idle'); }} className="mt-0.5 size-5 shrink-0 accent-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700" />{q.text}
            </label>)}
          </div>
          <div className="mt-5 flex flex-wrap gap-3 print:hidden">
            <button type="button" onClick={copy} disabled={copyState === 'copying'} className="min-h-11 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-wait disabled:opacity-60">{copyState === 'copying' ? '복사 중…' : '설치 상담용 확인표 복사'}</button>
            <button type="button" onClick={download} className="min-h-11 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">확인표 파일로 저장</button>
            <button type="button" onClick={() => window.print()} className="min-h-11 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">인쇄하기</button>
          </div>
          <p role="status" className="mt-3 text-sm leading-relaxed text-gray-700 print:hidden">{copyState === 'copied' ? `모델·입력 치수(${scene === 'own' ? '우리 집 실측값' : '예시값'})·미확인 항목·출처를 복사했습니다.` : copyState === 'failed' ? '자동 복사에 실패했습니다. 아래 기록을 선택해 직접 복사하거나 파일로 저장하세요.' : '확인표에는 지금 보고 있는 치수와 그 종류(실측·예시)가 포함됩니다. 페이지를 새로 열면 치수와 체크 상태는 비워집니다.'}</p>
          {copyState === 'failed' && <textarea aria-label="직접 복사할 설치 확인표" readOnly rows={9} value={record} className={`${inputClass} text-sm leading-relaxed print:hidden`} />}
        </section>

        <section className="mt-10 border-t border-gray-200 pt-7" aria-labelledby="fit-source-heading">
          <h2 id="fit-source-heading" className="text-xl font-bold text-gray-900">어느 설명서로 확인했나요?</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-700">{product.document} · {product.sourcePages}<br />원문 재확인 {product.checkedAt}. 공용 설명서 중 이 모델의 본체 치수와 맞는 표를 사용했습니다. 제품 안의 모델 라벨과 설명서를 함께 확인하세요.</p>
          <a href={product.sourceUrl} target="_blank" rel="noopener noreferrer" className={`mt-3 inline-block ${linkClass}`}>{product.modelNumber} 공식 설명서 열기</a>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 print:hidden">
            <Link href={`/products/${product.slug}#fit`} className={linkClass}>이 모델의 제품 상세 보기</Link>
            <Link href={energyComparisonHref(product.modelNumber)} className={linkClass}>이 모델의 전기사용량 비교하기</Link>
            <Link href={fridgeFitHref(product.modelNumber)} className={linkClass}>이 모델 주소로 다시 열기</Link>
          </div>
        </section>
      </>}
    </div>
  );
}
