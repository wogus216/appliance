import type { Metadata } from 'next';
import Link from 'next/link';
import { ValueBadge } from '@/components/tools/value-badge';
import { buildOpenGraph } from '@/lib/metadata';
import { LIFE_TASKS, STORAGE_LABELS, TOOLS, VALUE_KIND_MEANINGS, type ToolEntry } from '@/lib/tool-directory';
import { VALUE_KIND_LABELS, type ValueKind } from '@/lib/value-kind';

const title = '가전 도구 모음';
const description = `설치 전 치수 확인, 실측 전력 기록, 관리 일정, 수리·교체 비교까지 도구 ${TOOLS.length}개를 생활 과제별로 모았습니다. 도구마다 답하는 질문과 답하지 못하는 질문, 지원 모델 수를 먼저 확인하세요.`;
export const metadata: Metadata = { title, description, alternates: { canonical: '/tools' }, openGraph: buildOpenGraph({ title, description, url: '/tools' }) };

const link = 'font-semibold text-blue-700 underline underline-offset-4';

function ToolCard({ tool }: { tool: ToolEntry }) {
  return <article aria-labelledby={`tool-${tool.slug}`} className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
    <h3 id={`tool-${tool.slug}`} className="text-lg font-bold text-gray-900"><Link href={tool.href} className="hover:underline">{tool.title}</Link></h3>
    <dl className="mt-4 space-y-4 text-sm leading-relaxed text-gray-700">
      <div><dt className="font-semibold text-gray-900">답하는 질문</dt><dd><ul className="mt-1 list-disc space-y-1 pl-5">{tool.answers.map((q) => <li key={q}>{q}</li>)}</ul></dd></div>
      <div><dt className="font-semibold text-gray-900">답하지 못하는 질문</dt><dd><ul className="mt-1 list-disc space-y-1 pl-5">{tool.cannotAnswer.map((q) => <li key={q}>{q}</li>)}</ul></dd></div>
      <div><dt className="font-semibold text-gray-900">지원 범위</dt><dd className="mt-1">{tool.scope}</dd></div>
      <div><dt className="font-semibold text-gray-900">결과에 나오는 값</dt><dd className="mt-1 flex flex-wrap gap-1.5">{tool.valueKinds.map((kind) => <ValueBadge key={kind} kind={kind} />)}</dd>{tool.valueNote && <dd className="mt-1 text-xs text-gray-600">{tool.valueNote}</dd>}</div>
      <div><dt className="font-semibold text-gray-900">입력 보관</dt><dd className="mt-1">{STORAGE_LABELS[tool.storage]}</dd></div>
    </dl>
    <Link href={tool.href} className={`mt-5 inline-block text-sm ${link}`}>{tool.title} 열기</Link>
  </article>;
}

export default function ToolsPage() {
  return <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
    <nav aria-label="현재 위치" className="mb-6 flex gap-2 text-sm text-gray-600"><Link href="/" className="text-blue-700 hover:underline">홈</Link><span aria-hidden="true">/</span><span>도구 모음</span></nav>
    <h1 className="text-3xl font-bold leading-tight text-gray-900">가전 일을 하나씩 확인하는 도구 {TOOLS.length}개</h1>
    <p className="mt-4 max-w-prose text-base leading-relaxed text-gray-700">집에서 잰 값이나 받은 견적을 공식 자료 옆에 놓고 계산하는 도구를 하려는 일에 따라 묶었습니다. 어떤 도구도 설치 가능 여부나 수리·교체를 대신 결정하지 않습니다. 쓰기 전에 각 도구가 답하지 못하는 질문을 먼저 읽어 보세요.</p>
    <p className="mt-3 max-w-prose text-base leading-relaxed text-gray-700">입력한 치수·금액·측정값·날짜는 서버로 보내지 않고 주소에도 넣지 않습니다. 도구마다 다른 보관 방식은 카드의 ‘입력 보관’에 적었습니다. 결과의 숫자에 붙는 표시는 <a href="#value-kinds" className={link}>값 종류 표시의 뜻</a>에서 풀이합니다.</p>

    {LIFE_TASKS.map((task) => {
      const tools = TOOLS.filter((tool) => tool.task === task.id);
      return <section key={task.id} aria-labelledby={`task-${task.id}`} className="mt-12 border-t border-gray-200 pt-8">
        <h2 id={`task-${task.id}`} className="text-2xl font-bold text-gray-900">{task.title}</h2>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-700">{task.lead}</p>
        {tools.length > 0 && <div className="mt-5 grid gap-5 lg:grid-cols-2">{tools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}</div>}
        {'elsewhere' in task && <p className="mt-4 text-sm leading-relaxed text-gray-700">{tools.length ? '함께 볼 곳: ' : '이 과제에는 아직 계산 도구가 없습니다. 출발점: '}<Link href={task.elsewhere.href} className={link}>{task.elsewhere.label}</Link></p>}
      </section>;
    })}

    <section id="value-kinds" aria-labelledby="value-kinds-heading" className="mt-12 scroll-mt-20 border-t border-gray-200 pt-8">
      <h2 id="value-kinds-heading" className="text-2xl font-bold text-gray-900">값 종류 표시의 뜻</h2>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-700">도구 화면과 복사·인쇄한 기록에서 숫자 옆에 같은 이름의 표시를 붙입니다. 한 결과 안에서도 공식 값과 집에서 잰 값, 계산한 값을 섞어 읽지 않도록 하기 위해서입니다.</p>
      <dl className="mt-5 grid gap-4 sm:grid-cols-2">{(Object.keys(VALUE_KIND_LABELS) as ValueKind[]).map((kind) => <div key={kind} className="rounded-lg border border-gray-200 bg-white p-4 text-sm leading-relaxed text-gray-700"><dt><ValueBadge kind={kind} /></dt><dd className="mt-2">{VALUE_KIND_MEANINGS[kind]}</dd></div>)}</dl>
    </section>
  </div>;
}
