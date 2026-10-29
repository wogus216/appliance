'use client';

import Link from 'next/link';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  guideEvidenceLink, selectedGuidePart, technologyGuideHref, technologyGuideRecord,
  type ApplianceTechnologyGuide, type GuideEvidence,
} from '@/lib/appliance-technology';
import { carePlanHref } from '@/lib/care-plan';

function QuerySync({ guide, onSync }: { guide: ApplianceTechnologyGuide; onSync: (id: string | null) => void }) {
  const query = useSearchParams();
  const selected = selectedGuidePart(guide, query?.get('tech') ?? null)?.id ?? null;
  useEffect(() => { onSync(selected); }, [selected, onSync]);
  return null;
}

function EvidenceLinks({ guide, evidence }: { guide: ApplianceTechnologyGuide; evidence: GuideEvidence[] }) {
  return <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
    {evidence.map((entry) => {
      const link = guideEvidenceLink(guide, entry);
      return link && <li key={`${entry.source}-${entry.location}`}><a href={link.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 underline underline-offset-4">{link.label}</a></li>;
    })}
  </ul>;
}

/** 부품의 기능 관계를 보여 주는 범용 화면. 정수기의 물길·전력 도식은 별도 표현을 유지한다. */
export function ApplianceTechnology({ guide }: { guide: ApplianceTechnologyGuide }) {
  const [selected, setSelected] = useState<string | null>(guide.defaultPart);
  const [checked, setChecked] = useState<string[]>([]);
  const [copyState, setCopyState] = useState<'idle' | 'copying' | 'copied' | 'failed'>('idle');
  const part = selected === null ? undefined : selectedGuidePart(guide, selected);
  const record = technologyGuideRecord(guide, selected, checked);
  const sync = useCallback((next: string | null) => { setSelected(next); setCopyState('idle'); }, []);

  function select(id: string) {
    sync(id);
    const url = new URL(window.location.href);
    url.searchParams.set('tech', id); url.hash = 'technology-map';
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
    anchor.href = url; anchor.download = `${guide.modelNumber}-기술-관리카드.txt`; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <section id="technology-map" aria-labelledby="technology-guide-heading" className="scroll-mt-36 border-y border-gray-200 py-6">
      <Suspense fallback={null}><QuerySync guide={guide} onSync={sync} /></Suspense>
      <h3 id="technology-guide-heading" className="text-xl font-bold leading-snug text-gray-900">{guide.question}</h3>
      <p className="mt-3 max-w-prose text-sm leading-relaxed text-gray-700">{guide.modelNumber} · {guide.introduction} 부품을 누르면 설명과 관리할 곳이 바뀝니다.</p>
      <figure className="mt-5">
        <div className="space-y-6 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-5" role="group" aria-label={`${guide.modelNumber} 기능과 관리 연결도`}>
          {guide.groups.map((group) => <div key={group.title}>
            <p className="text-sm font-semibold text-gray-900">{group.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-gray-700">{group.description}</p>
            <div aria-hidden="true" className="mx-7 mt-4 h-3 border-x border-t border-gray-400" />
            <div className={`grid gap-2 sm:gap-3 ${group.parts.length === 3 ? 'grid-cols-3' : group.parts.length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {group.parts.map((id) => {
                const node = guide.parts.find((p) => p.id === id);
                if (!node) return null;
                return <button key={id} type="button" onClick={() => select(id)} aria-pressed={selected === id} aria-controls="technology-guide-detail"
                  className={`min-h-20 min-w-0 rounded-lg border px-2 py-3 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${selected === id ? 'border-blue-700 bg-blue-700 text-white' : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-100'}`}>
                  <span className="block break-words text-sm font-semibold leading-snug">{node.title}</span>
                  <span className={`mt-1 block text-xs leading-relaxed ${selected === id ? 'text-blue-100' : 'text-gray-700'}`}>{node.hint}</span>
                </button>;
              })}
            </div>
          </div>)}
        </div>
        <figcaption className="mt-3 max-w-prose text-sm leading-relaxed text-gray-700">{guide.diagramNote} 연결선은 같은 관리 영역을 묶은 표시이며, 진한 파란 배경이 선택한 부품입니다.</figcaption>
      </figure>

      <div id="technology-guide-detail" className="mt-6" aria-live="polite" aria-atomic="true">
        {!part ? <p className="text-sm leading-relaxed text-gray-800">주소에 있는 항목은 이 모델에서 지원하지 않습니다. 위 연결도에서 부품을 선택하세요.</p> : <>
          <h4 className="text-lg font-bold leading-snug text-gray-900">{part.heading}</h4>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-gray-800">{part.how}</p>
          <dl className="mt-4 space-y-3 text-sm leading-relaxed">
            <div className="grid gap-1 sm:grid-cols-[5rem_1fr] sm:gap-3"><dt className="font-semibold text-gray-900">생활에서</dt><dd className="text-gray-800">{part.everyday}</dd></div>
            <div className="grid gap-1 sm:grid-cols-[5rem_1fr] sm:gap-3"><dt className="font-semibold text-gray-900">관리할 곳</dt><dd className="text-gray-800">{part.care}</dd></div>
            <div className="grid gap-1 sm:grid-cols-[5rem_1fr] sm:gap-3"><dt className="font-semibold text-gray-900">해석 범위</dt><dd className="text-gray-700">{part.limit}</dd></div>
          </dl>
          <EvidenceLinks guide={guide} evidence={part.evidence} />
        </>}
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <h4 className="text-lg font-bold text-gray-900">내가 챙겨야 할 관리 항목</h4>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-700">체크는 설명서와 내 관리 내역을 확인했다는 표시입니다. 청소·교체 완료나 성능 판정이 아닙니다. 사용 환경에 따라 상태를 더 자주 확인해야 할 수 있습니다.</p>
        <div className="mt-4 divide-y divide-gray-200">
          {guide.careItems.map((item) => <div key={item.id} className="py-4">
            <label className="flex cursor-pointer items-start gap-3 text-sm font-semibold leading-relaxed text-gray-900">
              <input type="checkbox" checked={checked.includes(item.id)} onChange={(event) => { setChecked((old) => event.target.checked ? [...old, item.id] : old.filter((id) => id !== item.id)); setCopyState('idle'); }} className="mt-0.5 size-5 shrink-0 accent-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700" />
              <span>{item.title}<span className="block font-normal text-gray-700">{item.timing}</span></span>
            </label>
            <div className="ml-8"><p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-700">{item.description}</p><EvidenceLinks guide={guide} evidence={item.evidence} /></div>
          </div>)}
        </div>
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-gray-800">{guide.safetyNote}</p>
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        <button type="button" onClick={copy} disabled={copyState === 'copying'} className="min-h-11 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-wait disabled:opacity-60">{copyState === 'copying' ? '복사 중…' : '선택한 설명과 관리 카드 복사'}</button>
        <button type="button" onClick={download} className="min-h-11 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">관리 카드 파일로 저장</button>
      </div>
      <p role="status" className="mt-3 text-sm leading-relaxed text-gray-700">{copyState === 'copied' ? '모델·선택한 설명·관리 확인 항목·출처를 복사했습니다.' : copyState === 'failed' ? '자동 복사에 실패했습니다. 아래 기록을 직접 복사하거나 파일로 저장하세요.' : '선택한 부품은 주소로 다시 열 수 있습니다. 체크 상태는 저장하지 않아 새로고침하면 비워집니다.'}</p>
      {copyState === 'failed' && <textarea aria-label="직접 복사할 가전 기술·관리 카드" readOnly rows={8} value={record} className="mt-3 w-full rounded-lg border border-gray-300 p-3 text-sm leading-relaxed text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700" />}
      <ul className="mt-6 space-y-2 text-sm leading-relaxed">
        {guide.sources.map((source) => <li key={source.id}><a href={source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 underline underline-offset-4">{source.label}</a><span className="ml-2 text-gray-600">원문 확인 {source.checkedAt}</span></li>)}
      </ul>
      <p className="mt-5 text-sm leading-relaxed"><Link href={carePlanHref(guide.modelNumber)} className="font-semibold text-blue-700 underline underline-offset-4">이 모델의 다음 관리 일정 만들기</Link></p>
      <a href={technologyGuideHref(guide, part?.id)} className="mt-4 inline-block text-sm font-semibold text-blue-700 underline underline-offset-4">선택한 부품 주소로 다시 열기</a>
      <noscript><p className="mt-3 text-sm text-gray-700">부품 선택과 체크는 JavaScript를 켜면 사용할 수 있습니다. 기본 설명·관리 항목·공식 원문은 아래에서 읽을 수 있습니다.</p></noscript>
    </section>
  );
}
