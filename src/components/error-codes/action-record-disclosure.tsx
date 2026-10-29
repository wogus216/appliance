'use client';

import { useState } from 'react';
import { ErrorActionCard } from './action-card';
import type { ErrorActionGuide } from '@/lib/error-action';

/**
 * 허브 코드 카드 안의 상담 기록 폼. 펼쳤을 때만 폼을 그린다.
 *
 * 허브에 카드가 수십 개라(귀뚜라미 25) 폼을 모두 정적 HTML로 내보내면 페이지가 무거워지고, 폼은
 * 크롤러가 읽을 본문도 아니다. 크롤러가 읽어야 할 다음 행동·사용 중지 조건·적용 범위는 바깥의
 * 정적 블록(code-action.tsx)이 갖는다.
 */
export function ActionRecordDisclosure({ guide }: { guide: ErrorActionGuide }) {
  const [open, setOpen] = useState(false);
  return (
    <details className="mt-4" onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary className="inline-flex min-h-11 cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
        {guide.modelKind === 'product-line' ? '제품군 고르고' : '모델 확인하고'} AS 상담 기록 만들기
      </summary>
      {open && (
        <div className="mt-3">
          <ErrorActionCard guide={guide} sectionId={`${guide.anchor ?? `action-${guide.id}`}-record`} headingLevel="h5" />
        </div>
      )}
    </details>
  );
}
