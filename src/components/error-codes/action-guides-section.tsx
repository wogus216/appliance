import { ErrorActionCard } from './action-card';
import type { ErrorActionGuide } from '@/lib/error-action';

export function ActionGuidesSection({ guides }: { guides: ErrorActionGuide[] }) {
  if (!guides.length) return null;
  return (
    <section id="service-record" aria-labelledby="service-record-heading" className="scroll-mt-24">
      <h2 id="service-record-heading" className="text-2xl font-bold text-gray-900">모델별 상담 기록 만들기</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">아래 모델과 코드 조합은 공식 설명서를 대조했습니다. 해당 안내를 열고 명판의 모델명을 입력하세요.</p>
      <div className="mt-5 space-y-5">
        {guides.map((guide) => (
          // 주소의 앵커가 내부 폼을 가리키면 브라우저가 React 초기화 전에 open을 추가한다.
          // 이 속성은 브라우저가 관리하며 입력·결과 영역의 불일치는 계속 검사한다.
          <details key={guide.id} suppressHydrationWarning>
            <summary className="cursor-pointer rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
              <span className="font-semibold">{guide.category} {guide.code} 상담 기록</span>
              <span className="mt-1 block break-words text-sm leading-relaxed text-gray-700">{guide.models.map((entry) => entry.model).join(' · ')}</span>
            </summary>
            <div className="mt-3"><ErrorActionCard guide={guide} /></div>
          </details>
        ))}
      </div>
    </section>
  );
}
