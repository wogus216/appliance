import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import type { GuideVisualSummary as GuideVisualSummaryData } from '@/types/guide-visual';

export function GuideVisualSummary({ summary, detailHref = '#guide-detail' }: { summary: GuideVisualSummaryData; detailHref?: string }) {
  const sequence = summary.flow.layout === 'sequence';
  return (
    <section aria-labelledby="visual-summary-heading" className="mb-12 space-y-8">
      <div>
        <h2 id="visual-summary-heading" className="scroll-mt-24 text-2xl font-bold leading-snug text-gray-900">{summary.heading}</h2>
        <p className="mt-3 leading-relaxed text-gray-700">{summary.takeaway}</p>
        {summary.photos && summary.photos.length > 0 && (
          <div className="my-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {summary.photos.map((photo) => (
                <figure key={photo.src}>
                  <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 640px) calc(100vw - 32px), 368px" className="h-52 w-full object-contain" />
                  <figcaption className="mt-3 text-sm leading-relaxed text-gray-700">
                    <strong className="block text-base text-gray-900">{photo.title}</strong>
                    <span className="block">{photo.caption}</span>
                    <a href={photo.source.href} className="inline-flex min-h-11 items-center text-blue-700 underline underline-offset-4">사진 출처: {photo.source.label}</a>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">공개 제품 사진입니다. 직접 사용한 사진이 아니며, 두 제품의 실제 크기 비율을 나타내지 않습니다.</p>
          </div>
        )}
        <table className="mt-5 w-full table-fixed border-collapse text-sm leading-relaxed">
          <caption className="sr-only">{summary.heading} — 상황별 의미와 다음 행동</caption>
          <colgroup><col className="w-[24%]" /><col className="w-[34%]" /><col className="w-[42%]" /></colgroup>
          <thead>
            <tr className="border-y border-gray-300 bg-gray-50 text-left text-gray-900">
              {summary.columns.map((column) => <th key={column} scope="col" className="break-keep px-2 py-3 font-semibold sm:px-4">{column}</th>)}
            </tr>
          </thead>
          <tbody>
            {summary.rows.map((row) => (
              <tr key={row.label} className="border-b border-gray-200 align-top">
                <th scope="row" className="break-keep px-2 py-4 text-left font-semibold text-gray-900 sm:px-4">{row.label}</th>
                <td className="break-keep px-2 py-4 text-gray-700 sm:px-4">{row.meaning}</td>
                <td className="break-keep px-2 py-4 text-gray-900 sm:px-4">{row.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {summary.image && (
        <figure data-guide-photo>
          <Image src={summary.image.src} alt={summary.image.alt} width={summary.image.width} height={summary.image.height} sizes="(max-width: 768px) 100vw, 736px" style={{ maxWidth: summary.image.width }} className="mx-auto h-auto w-full rounded-xl" />
          <figcaption className="mt-2 text-sm leading-relaxed text-gray-600">{summary.image.caption}</figcaption>
        </figure>
      )}
      <figure aria-labelledby="decision-flow-heading">
        <h3 id="decision-flow-heading" className="scroll-mt-24 text-lg font-bold text-gray-900">{summary.flow.question}</h3>
        <p className="mt-2 text-sm text-gray-600">{sequence ? '다음 세 항목을 순서대로 확인하세요.' : '아래에서 내 상황에 맞는 갈래를 따라가세요.'}</p>
        {sequence ? (
          <ol className="mt-5 grid gap-7 sm:grid-cols-3 sm:gap-6">
            {summary.flow.branches.map((step, index) => (
              <li key={step.condition} className="relative border-t border-gray-300 py-4 sm:pr-4">
                <p className="break-keep font-semibold leading-relaxed text-gray-900">{index + 1}. {step.condition}</p>
                <p className="mt-2 break-keep leading-relaxed text-gray-700">{step.action}</p>
                {index < summary.flow.branches.length - 1 && <ArrowDown aria-hidden="true" className="absolute -bottom-5 left-0 h-5 w-5 text-gray-500 sm:-right-5 sm:left-auto sm:top-4 sm:-rotate-90" />}
              </li>
            ))}
          </ol>
        ) : <ul className="mt-5 grid gap-5 sm:grid-cols-3 sm:gap-0">
          {summary.flow.branches.map((branch) => (
            <li key={branch.condition} className="border-t border-gray-300 py-4 sm:px-4 sm:first:pl-0 sm:last:pr-0">
              <p className="break-keep font-semibold leading-relaxed text-gray-900">{branch.condition}</p>
              <ArrowDown aria-hidden="true" className="my-3 h-5 w-5 text-gray-500" />
              <p className="break-keep leading-relaxed text-gray-700">{branch.action}</p>
            </li>
          ))}
        </ul>}
        <figcaption className="mt-2 text-sm leading-relaxed text-gray-600">{summary.flow.note}</figcaption>
      </figure>
      {summary.links && summary.links.length > 0 && (
        <nav aria-label="선택 조건을 우리 집에 적용하기" className="flex flex-wrap gap-x-5 gap-y-1">
          {summary.links.map((link) => <Link key={link.href} href={link.href} className="inline-flex min-h-11 items-center font-semibold text-blue-700 underline underline-offset-4">{link.label}</Link>)}
        </nav>
      )}
      <a href={detailHref} className="inline-flex min-h-11 items-center font-semibold text-blue-700 underline underline-offset-4">자세한 설명과 근거 읽기</a>
    </section>
  );
}
