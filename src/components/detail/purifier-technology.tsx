'use client';

import Link from 'next/link';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import {
  getTechnologyPart, purifierCareRecord, purifierTechnologyHref,
  type PurifierPart, type PurifierTechnology as Technology, type TechnologyPart,
} from '@/lib/purifier-technology';
import { carePlanHref } from '@/lib/care-plan';

function TechnologyQuerySync({ technology, onSync }: { technology: Technology; onSync: (part: PurifierPart | null) => void }) {
  const query = useSearchParams();
  const part = getTechnologyPart(technology, query?.get('tech') ?? null)?.id ?? null;
  useEffect(() => { onSync(part); }, [part, onSync]);
  return null;
}

const sourceClass = 'font-semibold text-blue-700 underline underline-offset-4';

export function PurifierTechnology({ technology }: { technology: Technology }) {
  const [selected, setSelected] = useState<PurifierPart | null>('cold');
  const [prepared, setPrepared] = useState<string[]>([]);
  const [copyState, setCopyState] = useState<'idle' | 'copying' | 'copied' | 'failed'>('idle');
  const part = selected ? getTechnologyPart(technology, selected) : undefined;
  const manual = technology.sources.find((s) => s.id === 'manual');
  const energy = technology.sources.find((s) => s.id === 'energy');
  const record = purifierCareRecord(technology, selected, prepared);
  const sync = useCallback((next: PurifierPart | null) => { setSelected(next); setCopyState('idle'); }, []);

  function choose(next: PurifierPart) {
    sync(next);
    const url = new URL(window.location.href);
    url.searchParams.set('tech', next);
    url.hash = 'technology-map';
    // 같은 제품 안의 선택만 바꾼다. Next가 지원하는 History API로 검색 매개변수와 동기화한다.
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  }
  async function copy() {
    setCopyState('copying');
    try { await navigator.clipboard.writeText(record); setCopyState('copied'); }
    catch { setCopyState('failed'); }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([record], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = `${technology.modelNumber}-기술-관리카드.txt`; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function node(item: TechnologyPart, filter = false) {
    const active = selected === item.id;
    const inPath = selected !== null && (item.id === 'nano' || item.id === 'carbon' && selected !== 'nano');
    return <button key={item.id} type="button" onClick={() => choose(item.id)} aria-pressed={active} aria-controls="purifier-part-detail"
      className={`relative min-h-20 min-w-0 rounded-lg border px-2 py-3 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${active ? 'border-blue-700 bg-blue-700 text-white' : filter && inPath ? 'border-blue-700 bg-blue-50 text-blue-900 hover:bg-blue-100' : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'}`}>
      <span className="block break-keep text-sm font-semibold leading-snug">{item.shortLabel}</span>
      <span className={`mt-1 block text-xs leading-relaxed ${active ? 'text-blue-100' : 'text-gray-700'}`}>{item.hint}</span>
    </button>;
  }

  return (
    <section id="technology-map" aria-labelledby="purifier-map-heading" className="scroll-mt-36 border-y border-gray-200 py-6">
      <Suspense fallback={null}><TechnologyQuerySync technology={technology} onSync={sync} /></Suspense>
      <h3 id="purifier-map-heading" className="text-xl font-bold text-gray-900">직수인데 냉수·얼음은 어디에 머물까?</h3>
      <p className="mt-3 max-w-prose text-sm leading-relaxed text-gray-700">{technology.modelNumber}의 필터와 네 가지 기능을 눌러 보세요. 저장되는 곳과 관리할 곳을 연결해 볼 수 있습니다.</p>
      <figure className="mt-5">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-5" role="group" aria-label="필터에서 기능으로 이어지는 원리 도식, 각 항목을 누르면 설명이 바뀝니다">
          <div className="grid grid-cols-[auto_1rem_1fr_1rem_1fr] items-center gap-1 sm:gap-3">
            <div className="px-1 text-center text-sm font-semibold text-gray-800">수도<span className="mt-1 block text-xs font-normal text-gray-600">원수</span></div>
            <ArrowRight className="size-4 text-gray-600" aria-hidden="true" />
            {node(technology.parts.find((p) => p.id === 'nano')!, true)}
            <ArrowRight className="size-4 text-gray-600" aria-hidden="true" />
            {node(technology.parts.find((p) => p.id === 'carbon')!, true)}
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-700"><ArrowDown className="size-4" aria-hidden="true" />정수된 물의 기능별 방식</div>
          <svg viewBox="0 0 400 34" preserveAspectRatio="none" aria-hidden="true" className="mt-1 h-8 w-full">
            <path d="M200 0 V14 M50 34 V14 H350 V34 M150 14 V34 M250 14 V34" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
          </svg>
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {technology.parts.filter((item) => !['nano', 'carbon'].includes(item.id)).map((item) => node(item))}
          </div>
        </div>
        <figcaption className="mt-3 max-w-prose text-sm leading-relaxed text-gray-700">{technology.diagramNote} 진한 파란 배경이 현재 선택한 항목입니다.</figcaption>
      </figure>

      <div id="purifier-part-detail" className="mt-6" aria-live="polite" aria-atomic="true">
        {!part ? <p className="text-sm leading-relaxed text-gray-800">주소에 있는 항목은 지원하지 않습니다. 위 도식에서 확인할 필터나 기능을 선택하세요.</p> : <>
          <h4 className="text-lg font-bold leading-snug text-gray-900">{part.heading}</h4>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-gray-800">{part.explanation}</p>
          <dl className="mt-4 space-y-3 text-sm leading-relaxed">
            <div className="grid gap-1 sm:grid-cols-[5rem_1fr] sm:gap-3"><dt className="font-semibold text-gray-900">생활에서</dt><dd className="text-gray-800">{part.everyday}</dd></div>
            <div className="grid gap-1 sm:grid-cols-[5rem_1fr] sm:gap-3"><dt className="font-semibold text-gray-900">관리할 곳</dt><dd className="text-gray-800">{part.care}</dd></div>
            <div className="grid gap-1 sm:grid-cols-[5rem_1fr] sm:gap-3"><dt className="font-semibold text-gray-900">해석 범위</dt><dd className="text-gray-700">{part.limit}</dd></div>
          </dl>
          {manual && <a href={`${manual.url}#page=${Number.parseInt(part.pages, 10) + 1}`} target="_blank" rel="noopener noreferrer" className={`mt-4 inline-block text-sm ${sourceClass}`}>이 항목의 설명서 근거 · 인쇄 {part.pages}</a>}
        </>}
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <h4 className="text-lg font-bold text-gray-900">자동 UV 관리와 별도로 챙길 일</h4>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-700">설명서 28쪽에는 UV 관리 기능이 있고, 29~32쪽에는 청소·필터 관리가 따로 안내돼 있습니다. 아래 체크는 설명서와 내 관리 내역을 확인했다는 표시입니다. 세척·교체 완료나 수질을 판정하지 않습니다.</p>
        <div className="mt-4 divide-y divide-gray-200">
          {technology.careItems.map((item) => <div key={item.id} className="py-4">
            <label className="flex cursor-pointer items-start gap-3 text-sm font-semibold leading-relaxed text-gray-900">
              <input type="checkbox" checked={prepared.includes(item.id)} onChange={(event) => { setPrepared((old) => event.target.checked ? [...old, item.id] : old.filter((id) => id !== item.id)); setCopyState('idle'); }} className="mt-0.5 size-5 shrink-0 accent-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700" />
              <span>{item.title}<span className="block font-normal text-gray-700">{item.timing}</span></span>
            </label>
            <p className="ml-8 mt-2 max-w-prose text-sm leading-relaxed text-gray-700">{item.description}</p>
            {manual && <a href={`${manual.url}#page=${Number.parseInt(item.pages, 10) + 1}`} target="_blank" rel="noopener noreferrer" className={`ml-8 mt-2 inline-block text-xs ${sourceClass}`}>{item.title} 관리 근거 · 인쇄 {item.pages}</a>}
          </div>)}
        </div>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-700">청소와 필터 자가 교체는 전원 처리 조건이 다릅니다. 요약만 보고 분해하거나 교체하지 말고 해당 설명서의 전체 절차를 확인하세요.</p>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <h4 className="text-lg font-bold text-gray-900">2,950W와 12.17kWh/월은 무엇이 다를까?</h4>
        <dl className="mt-4 grid gap-5 text-sm sm:grid-cols-2">
          <div><dt className="font-semibold text-gray-900">온수 정격 전력 · {technology.energy.hotRatedWatts.toLocaleString('ko-KR')}W</dt><dd className="mt-2 leading-relaxed text-gray-700">제조사 설명서의 온수 전력 규격입니다. 한 달 내내 이 전력을 사용한다는 뜻이 아닙니다.</dd></div>
          <div><dt className="font-semibold text-gray-900">공단 월간 신고값 · {technology.energy.monthlyDeclaredKwh}kWh/월</dt><dd className="mt-2 leading-relaxed text-gray-700">공단에 신고된 시험 조건의 전기량입니다. 우리 집의 실측값·예상 요금으로 바꾸지 않습니다.</dd></div>
        </dl>
        <p className="mt-3 text-xs leading-relaxed text-gray-600">신고 번호 {technology.energy.declarationId} · 시험기관 {technology.energy.testLab}. 냉수·얼음 저장부의 용량은 위 제조사 설명서 기준입니다.</p>
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        <button type="button" onClick={copy} disabled={copyState === 'copying'} className="min-h-11 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-wait disabled:opacity-60">{copyState === 'copying' ? '복사 중…' : '선택한 설명과 관리 카드 복사'}</button>
        <button type="button" onClick={download} className="min-h-11 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">관리 카드 파일로 저장</button>
      </div>
      <p role="status" className="mt-3 text-sm leading-relaxed text-gray-700">{copyState === 'copied' ? '선택한 설명·확인 항목·출처·주소를 복사했습니다.' : copyState === 'failed' ? '자동 복사에 실패했습니다. 아래 기록을 직접 복사하거나 파일로 저장하세요.' : '선택한 기능은 주소로 공유할 수 있습니다. 체크 상태는 저장되지 않아 새로고침하면 비워집니다.'}</p>
      {copyState === 'failed' && <textarea aria-label="직접 복사할 정수기 기술·관리 카드" readOnly rows={8} value={record} className="mt-3 w-full rounded-lg border border-gray-300 p-3 text-sm leading-relaxed text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700" />}
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm">
        {manual && <a href={manual.url} target="_blank" rel="noopener noreferrer" className={sourceClass}>공식 설명서 전체 · 확인 {manual.checkedAt}</a>}
        {energy && <a href={energy.url} target="_blank" rel="noopener noreferrer" className={sourceClass}>공단 신고 원문 · 확인 {energy.checkedAt}</a>}
        <a href={purifierTechnologyHref(technology, part?.id)} className={sourceClass}>선택한 기능 주소로 다시 열기</a>
      </div>
      <p className="mt-5 text-sm leading-relaxed"><Link href={carePlanHref(technology.modelNumber)} className={sourceClass}>이 모델의 다음 관리 일정 만들기</Link></p>
      <noscript><p className="mt-3 text-sm leading-relaxed text-gray-700">기능 선택과 체크를 사용하려면 JavaScript를 켜 주세요. 기본 설명과 관리 안내, 공식 원문은 이 화면에서도 읽을 수 있습니다.</p></noscript>
    </section>
  );
}
