import { ValueBadge } from '@/components/tools/value-badge';
import { PERIOD_END_CAVEAT, WARRANTY_BASIS_OPTIONS, type StandardInput, type StandardResolution } from '@/lib/consumer-standards';
import { CONSUMER_DECREE_ANNEX, CONSUMER_STANDARD_NOTICE } from '@/lib/data/consumer-standards';

const field = 'mt-2 min-h-11 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700';
const link = 'font-semibold text-blue-700 underline underline-offset-4';

type BasisFields = Pick<StandardInput, 'basis' | 'basisDate' | 'saleDateSource' | 'manufactureLabel'>;

/** 품질보증기간 기산 기준과 명판 제조일 입력. 구입일 칸이 따로 있으면 hidePurchaseDate로 같은 날짜를 두 번 묻지 않는다. */
export function WarrantyBasisFields({ idPrefix, value, today, hidePurchaseDate, onChange }: { idPrefix: string; value: BasisFields; today: string; hidePurchaseDate?: boolean; onChange: (next: Partial<BasisFields>) => void }) {
  const option = WARRANTY_BASIS_OPTIONS.find((entry) => entry.value === value.basis)!;
  const showDate = !(hidePurchaseDate && value.basis === 'purchase');
  return <>
    <div>
      <label htmlFor={`${idPrefix}-basis`} className="block text-sm font-semibold">품질보증기간을 세는 기준</label>
      <select id={`${idPrefix}-basis`} value={value.basis} onChange={(e) => onChange({ basis: e.target.value as StandardInput['basis'], basisDate: '' })} className={field}>{WARRANTY_BASIS_OPTIONS.map((entry) => <option key={entry.value} value={entry.value}>{entry.label}</option>)}</select>
    </div>
    {showDate && <div>
      <label htmlFor={`${idPrefix}-basis-date`} className="block text-sm font-semibold">{option.dateLabel}</label>
      {value.basis === 'unknown-sale' && <select aria-label="날짜의 종류" value={value.saleDateSource} onChange={(e) => onChange({ saleDateSource: e.target.value as StandardInput['saleDateSource'] })} className={field}><option value="manufacture">제조일</option><option value="customs">수입통관일</option></select>}
      <input id={`${idPrefix}-basis-date`} type="date" max={today || undefined} value={value.basisDate} onChange={(e) => onChange({ basisDate: e.target.value })} className={field} />
      {value.basis === 'unknown-sale' && <p className="mt-1 text-xs text-gray-600">이 날짜에서 3개월이 지난 날부터 셉니다(시행령 [별표 1] 4호 마목). 날짜까지 적힌 표시만 넣으세요.</p>}
    </div>}
    <div>
      <label htmlFor={`${idPrefix}-manufacture`} className="block text-sm font-semibold">명판의 제조일 <span className="font-normal text-gray-600">(선택, 부품보유기간용)</span></label>
      <input id={`${idPrefix}-manufacture`} type="text" inputMode="numeric" maxLength={20} autoComplete="off" value={value.manufactureLabel} onChange={(e) => onChange({ manufactureLabel: e.target.value })} placeholder="예: 2024-03 또는 2024-03-15" className={field} />
      <p className="mt-1 text-xs text-gray-600">연도나 연월만 적혀 있으면 그 해·그 달의 말일을 제조일자로 봅니다(고시 [별표 Ⅲ] 주석).</p>
    </div>
  </>;
}

/** 고시 품목별 기간과, 입력한 날짜로 계산한 종료일. 고시 표에 없는 품목은 값을 채우지 않는다. */
export function ConsumerStandardInfo({ resolution, input, headingLevel = 'h3' }: { resolution: StandardResolution; input: StandardInput; headingLevel?: 'h3' | 'h4' }) {
  const Heading = headingLevel;
  const { item, warranty, parts } = resolution;
  return <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 text-sm leading-relaxed text-gray-800 print:break-inside-avoid">
    <Heading className="font-bold text-gray-900">공정위 소비자분쟁해결기준 · {item.label}</Heading>
    <p className="mt-1 text-xs text-gray-600">{CONSUMER_STANDARD_NOTICE.notice}(시행 {CONSUMER_STANDARD_NOTICE.effectiveDate}) [별표 Ⅲ] · {CONSUMER_STANDARD_NOTICE.checkedAt} 확인</p>
    {!item.row ? <p className="mt-3 rounded border border-amber-300 bg-amber-50 p-3 text-amber-950">고시 표에 해당 분류 없음 — 확인 필요 <ValueBadge kind="unverified" /><br />{item.notListed} 다른 품목의 기간으로 채우지 않습니다. 보증서의 기간을 제조사에 확인하세요.</p> : <>
      <dl className="mt-3 grid gap-3 sm:grid-cols-2">
        <div><dt className="text-gray-600">품질보증기간 <ValueBadge kind="official" /></dt><dd className="font-semibold">{item.row.warrantyYears}년 <span className="font-normal text-gray-600">({item.row.category})</span></dd></div>
        <div><dt className="text-gray-600">고시 기준 품질보증 종료일 {warranty.kind === 'ready' && <ValueBadge kind="calculated" />}</dt><dd className="font-semibold">{warranty.kind === 'ready' ? <><time dateTime={warranty.end}>{warranty.end}</time><span className="block text-xs font-normal text-gray-600">기산: {warranty.startLabel} <ValueBadge kind="entered" /></span></> : <span className={`font-normal ${warranty.kind === 'invalid' ? 'text-red-700' : 'text-gray-700'}`}>{'message' in warranty ? warranty.message : ''}</span>}</dd></div>
        <div><dt className="text-gray-600">부품보유기간 <ValueBadge kind="official" /></dt><dd className="font-semibold">제조일로부터 {item.row.partsYears}년</dd></div>
        <div><dt className="text-gray-600">부품보유 종료일 {parts.kind === 'ready' && <ValueBadge kind="calculated" />}</dt><dd className="font-semibold">{parts.kind === 'ready' ? <><time dateTime={parts.end}>{parts.end}</time><span className="block text-xs font-normal text-gray-600">제조일자 {parts.manufactureDate} · {parts.note} <ValueBadge kind="entered" /></span></> : <span className={`font-normal ${parts.kind === 'invalid' ? 'text-red-700' : 'text-gray-700'}`}>{'message' in parts ? parts.message : ''}</span>}</dd></div>
      </dl>
      {item.coreParts.length > 0 && <p className="mt-3 text-xs text-gray-700">핵심부품 품질보증기간 <ValueBadge kind="official" />: {item.coreParts.map((part) => `${part.label} ${part.warrantyYears}년`).join(' · ')}</p>}
      {input.makerWarrantyEnd && warranty.kind === 'ready' && <p className="mt-3 text-xs text-gray-700">입력한 제조사 보증 종료일 {input.makerWarrantyEnd} <ValueBadge kind="entered" /></p>}
      {resolution.makerShorter && <p className="mt-2 rounded border border-amber-300 bg-amber-50 p-3 text-amber-950">입력한 제조사 보증 종료일이 고시 기간으로 계산한 날보다 이릅니다. 시행령 [별표 1] 4호 가목은 사업자가 정한 기간이 품목별 기준보다 짧으면 품목별 기준의 기간으로 한다고 적습니다. 실제 적용은 제조사·판매처에 확인하세요.</p>}
      <p className="mt-3 text-xs text-gray-600">{PERIOD_END_CAVEAT} 품질보증기간은 구입·인도·교환받은 날부터, 부품보유기간은 제조일부터 셉니다.</p>
    </>}
    <p className="mt-2 text-xs"><a href={CONSUMER_STANDARD_NOTICE.table3Url} target="_blank" rel="noopener noreferrer" className={link}>고시 [별표 Ⅲ] 원문</a> · <a href={CONSUMER_DECREE_ANNEX.url} target="_blank" rel="noopener noreferrer" className={link}>시행령 [별표 1] 원문</a></p>
  </div>;
}
