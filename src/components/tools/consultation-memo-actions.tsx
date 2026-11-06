'use client';

import { useState } from 'react';

/** 임시 상담 원문을 사용자가 선택한 곳에 보관한다. 수첩·수리 이력에는 쓰지 않는다. */
export function ConsultationMemoActions({ summary, textareaId }: { summary: string; textareaId: string }) {
  const [copying, setCopying] = useState(false);
  const [message, setMessage] = useState('');
  async function copy() {
    setCopying(true);
    try {
      await navigator.clipboard.writeText(summary);
      setMessage('상담 메모를 복사했습니다. 원하는 메모 앱에 붙여 넣어 보관하세요.');
    } catch {
      setMessage('자동 복사에 실패했습니다. 위 원문을 직접 선택해 복사하거나 텍스트 파일로 저장하세요.');
    } finally { setCopying(false); }
  }
  function download() {
    let url: string | undefined;
    try {
      url = URL.createObjectURL(new Blob([summary], { type: 'text/plain;charset=utf-8' }));
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'salimlab-consultation-memo.txt';
      anchor.click();
      setMessage('텍스트 파일 다운로드를 시작했습니다. 내려받은 파일을 확인해 보관하세요.');
    } catch {
      setMessage('텍스트 파일을 만들지 못했습니다. 위 원문을 직접 선택해 복사하세요.');
    } finally {
      if (url) { const downloadUrl = url; window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000); }
    }
  }
  const button = 'min-h-11 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700';
  return <>
    <div className="mt-3 flex flex-wrap gap-3 print:hidden">
      <button type="button" onClick={copy} disabled={copying} aria-describedby={`${textareaId}-archive-status`} className={`${button} disabled:cursor-wait disabled:opacity-60`}>{copying ? '복사 중…' : '상담 메모 복사'}</button>
      <button type="button" onClick={download} aria-describedby={`${textareaId}-archive-status`} className={button}>상담 메모 텍스트 파일 저장</button>
    </div>
    <p id={`${textareaId}-archive-status`} role="status" className="mt-2 text-sm leading-relaxed text-gray-700 print:hidden">{message}</p>
  </>;
}
