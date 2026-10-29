import type { ReactNode } from 'react';
import { ValueBadge } from '@/components/tools/value-badge';

/**
 * 도구 아래에 붙는 정적 설명 절. 서버에서 렌더해 자바스크립트 없이도 읽힌다.
 * 인쇄물은 결과 카드만 남기도록 통째로 숨긴다.
 */
export function ToolGuide({ title, lead, children }: { title: string; lead: string; children: ReactNode }) {
  return <section id="tool-guide" aria-labelledby="tool-guide-heading" className="mt-14 border-t border-gray-200 pt-8 print:hidden">
    <h2 id="tool-guide-heading" className="text-2xl font-bold leading-tight text-gray-900">{title}</h2>
    <p className="mt-3 max-w-prose text-base leading-relaxed text-gray-700">{lead}</p>
    <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">{children}</div>
  </section>;
}

export function GuidePart({ title, wide, children }: { title: string; wide?: boolean; children: ReactNode }) {
  return <div className={`min-w-0 ${wide ? 'lg:col-span-2' : ''}`}>
    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
    <div className={`mt-3 space-y-3 text-sm leading-relaxed text-gray-700 ${wide ? '' : 'max-w-prose'}`}>{children}</div>
  </div>;
}

/** 코드의 실제 식을 그대로 옮긴 줄. */
export function Formula({ children }: { children: ReactNode }) {
  return <p data-formula className="rounded-lg border border-violet-200 bg-violet-50 px-4 py-3 font-semibold text-violet-950">{children}</p>;
}

export function GuideExample({ title, children }: { title: string; children: ReactNode }) {
  return <div data-example className="rounded-lg border border-orange-300 bg-orange-50 p-4 text-gray-800">
    <p className="font-semibold text-orange-950">{title} <ValueBadge kind="example" /></p>
    <div className="mt-2 space-y-2">{children}</div>
  </div>;
}

export function GuideList({ items }: { items: ReactNode[] }) {
  return <ul className="list-disc space-y-2 pl-5">{items.map((item, index) => <li key={index}>{item}</li>)}</ul>;
}

/** 좁은 화면에서는 표 안에서만 가로로 밀린다. 페이지 전체는 넘치지 않는다. */
export function GuideTable({ caption, head, rows }: { caption: string; head: ReactNode[]; rows: ReactNode[][] }) {
  return <div className="overflow-x-auto">
    <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
      <caption className="sr-only">{caption}</caption>
      <thead><tr className="border-b border-gray-300 text-gray-700">{head.map((cell, index) => <th key={index} scope="col" className="py-2 pr-3 align-bottom font-semibold">{cell}</th>)}</tr></thead>
      <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex} className="border-b border-gray-200 align-top">{row.map((cell, index) => index === 0
        ? <th key={index} scope="row" className="py-2 pr-3 font-semibold text-gray-900">{cell}</th>
        : <td key={index} className="py-2 pr-3 tabular-nums text-gray-800">{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}

export function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 underline underline-offset-4">{children}</a>;
}
