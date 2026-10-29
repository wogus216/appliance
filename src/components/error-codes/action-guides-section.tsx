import type { ErrorActionGuide } from '@/lib/error-action';
import { hubActionAnchor, type NoCardCode } from '@/lib/data/error-codes/action-guides';

/**
 * 허브 하단의 행동 카드 목차.
 *
 * 2026-10-29: 상담 기록 폼은 각 코드 카드 안으로 옮겼다. 예전 「모델별 상담 기록 만들기」 절로
 * 들어오던 링크(#service-record)가 깨지지 않게 같은 id로 목차만 남긴다.
 */
export function ActionGuidesSection({ guides, noCard }: { guides: ErrorActionGuide[]; noCard: NoCardCode[] }) {
  if (!guides.length && !noCard.length) return null;
  return (
    <section id="service-record" aria-labelledby="service-record-heading" className="scroll-mt-24">
      <h2 id="service-record-heading" className="text-2xl font-bold text-gray-900">코드별 다음 행동 바로가기</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">
        각 코드 설명 안에 공식 원문과 대조한 다음 행동·사용 중지 조건·적용 범위가 있습니다. AS 상담 기록은 그 카드의
        「AS 상담 기록 만들기」에서 만듭니다.
      </p>
      {guides.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {guides.map((guide) => (
            <li key={guide.id}>
              <a href={`#${hubActionAnchor(guide)}`} className="inline-block rounded-full border bg-white px-3 py-1 text-sm text-gray-700 hover:border-blue-300 hover:text-blue-700">
                {guide.category} <span className="font-mono">{guide.code}</span>
                {guide.hubScope ? <span className="text-gray-500"> ({guide.models.map((m) => m.model.replace(/\s*가스보일러\(제품군\)$/, '')).join('·')})</span> : null}
              </a>
            </li>
          ))}
        </ul>
      )}
      {noCard.length > 0 && (
        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          공식 자료에서 사용자 조치를 확인하지 못한 코드: <span className="font-mono">{noCard.map((item) => item.code).join(' · ')}</span>.
          모델명과 표시를 공식 서비스에 알려 확인하세요.
        </p>
      )}
    </section>
  );
}
