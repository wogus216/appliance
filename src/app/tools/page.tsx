import type { Metadata } from 'next';
import Link from 'next/link';
import { ValueBadge } from '@/components/tools/value-badge';
import { buildOpenGraph } from '@/lib/metadata';
import { LIFE_TASKS, STORAGE_LABELS, TOOLS as ALL_TOOLS, VALUE_KIND_MEANINGS, type ToolEntry } from '@/lib/tool-directory';
import { VALUE_KIND_LABELS, type ValueKind } from '@/lib/value-kind';

import { PUBLISHED_TOOL_SLUGS } from '@/lib/site-scope';

const TOOLS = ALL_TOOLS.filter((tool) => PUBLISHED_TOOL_SLUGS.has(tool.slug));
const publishedValueKinds = new Set<ValueKind>(['example', ...TOOLS.flatMap((tool) => tool.valueKinds)]);
const title = '가전 수리·관리 도구';
const description = '수리 견적 비교, 관리 일정과 제품별 상담 기록을 돕는 세 가지 도구입니다. 지원 모델과 한계를 확인하고 사용하세요.';
export const metadata: Metadata = { title, description, alternates: { canonical: '/tools' }, openGraph: buildOpenGraph({ title, description, url: '/tools' }) };

const link = 'font-semibold text-blue-700 underline underline-offset-4';

function ToolCard({ tool }: { tool: ToolEntry }) {
  // 2026-10-30: 여는 단추가 다섯 소제목 뒤에 있었다. 지원 범위까지만 펼쳐 두고, 한계와 보관 방식은 펼침에 둔다(정적 HTML에는 남는다).
  return <article aria-labelledby={`tool-${tool.slug}`} className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
    <h3 id={`tool-${tool.slug}`} className="text-lg font-bold text-gray-900">{tool.title}</h3>
    <Link href={tool.href} aria-label={`${tool.title} 도구 열기`} className="mt-3 inline-flex min-h-11 items-center rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">도구 열기</Link>
    <dl className="mt-4 space-y-4 text-sm leading-relaxed text-gray-700">
      <div><dt className="font-semibold text-gray-900">답하는 질문</dt><dd><ul className="mt-1 list-disc space-y-1 pl-5">{tool.answers.map((q) => <li key={q}>{q}</li>)}</ul></dd></div>
      <div><dt className="font-semibold text-gray-900">지원 범위</dt><dd className="mt-1">{tool.scope}</dd></div>
    </dl>
    <details className="mt-4 text-sm leading-relaxed text-gray-700">
      <summary className="flex min-h-11 cursor-pointer items-center font-semibold text-gray-900">이 도구의 한계와 입력 보관</summary>
      <dl className="mt-2 space-y-4">
        <div><dt className="font-semibold text-gray-900">답하지 못하는 질문</dt><dd><ul className="mt-1 list-disc space-y-1 pl-5">{tool.cannotAnswer.map((q) => <li key={q}>{q}</li>)}</ul></dd></div>
        <div><dt className="font-semibold text-gray-900">결과에 나오는 값</dt><dd className="mt-1 flex flex-wrap gap-x-3 gap-y-1">{tool.valueKinds.map((kind) => <ValueBadge key={kind} kind={kind} />)}</dd>{tool.valueNote && <dd className="mt-1 text-xs text-gray-600">{tool.valueNote}</dd>}</div>
        <div><dt className="font-semibold text-gray-900">입력 보관</dt><dd className="mt-1">{STORAGE_LABELS[tool.storage]}</dd></div>
      </dl>
    </details>
  </article>;
}

export default function ToolsPage() {
  return <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
    <nav aria-label="현재 위치" className="mb-6 flex gap-2 text-sm text-gray-600"><Link href="/" className="text-blue-700 hover:underline">홈</Link><span aria-hidden="true">/</span><span>도구 모음</span></nav>
    <h1 className="text-3xl font-bold leading-tight text-gray-900">{title}</h1>
    <p className="mt-4 max-w-prose text-base leading-relaxed text-gray-700">수리 견적을 받았다면 새 제품 비용과 비교해 보세요. 한 가지 관리 항목의 날짜를 정할 때는 일정표를, 여러 가전의 일정과 수리 내역을 모을 때는 수첩을 사용하세요.</p>
    <p className="mt-3 max-w-prose text-sm leading-relaxed text-gray-700">견적에 넣은 금액과 기록에 적은 날짜는 브라우저에서 처리합니다. 각 도구의 보관 방식은 카드에서, 결과에 붙은 표시는 <a href="#value-kinds" className={link}>값 종류 표시의 뜻</a>에서 확인할 수 있습니다.</p>

    {LIFE_TASKS.filter((task) => TOOLS.some((tool) => tool.task === task.id)).map((task) => {
      const tools = TOOLS.filter((tool) => tool.task === task.id);
      return <section key={task.id} aria-labelledby={`task-${task.id}`} className="mt-12 border-t border-gray-200 pt-8">
        <h2 id={`task-${task.id}`} className="text-2xl font-bold text-gray-900">{task.title}</h2>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-700">{task.id === 'use' ? '설명서의 관리 주기로 다음 확인일을 정하고, 구입·보증·수리 기록을 보관하세요.' : task.lead}</p>
        {tools.length > 0 && <div className="mt-5 grid gap-5 lg:grid-cols-2">{tools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}</div>}
        {'elsewhere' in task && <p className="mt-4 text-sm leading-relaxed text-gray-700">{tools.length ? '함께 볼 곳: ' : '이 과제에는 아직 계산 도구가 없습니다. 출발점: '}<Link href={task.elsewhere.href} className={link}>{task.elsewhere.label}</Link></p>}
      </section>;
    })}

    <section id="value-kinds" aria-labelledby="value-kinds-heading" className="mt-12 scroll-mt-20 border-t border-gray-200 pt-8">
      <h2 id="value-kinds-heading" className="text-2xl font-bold text-gray-900">값 종류 표시의 뜻</h2>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-700">화면과 복사·인쇄 기록에서 금액이나 날짜 옆의 표시를 보면 값이 어디에서 왔는지 알 수 있습니다.</p>
      <dl className="mt-5 grid gap-4 sm:grid-cols-2">{(Object.keys(VALUE_KIND_LABELS) as ValueKind[]).filter((kind) => publishedValueKinds.has(kind)).map((kind) => <div key={kind} className="rounded-lg border border-gray-200 bg-white p-4 text-sm leading-relaxed text-gray-700"><dt><ValueBadge kind={kind} /></dt><dd className="mt-2">{VALUE_KIND_MEANINGS[kind]}</dd></div>)}</dl>
    </section>
  </div>;
}
