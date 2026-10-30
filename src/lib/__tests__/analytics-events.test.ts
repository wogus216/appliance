// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackToolResult } from '@/lib/analytics';

/**
 * 도구 결과 이벤트(2026-10-30).
 *
 * 막으려는 실패는 셋이다 — 입력값이 GA로 나가는 것, 로컬 검수가 운영 통계를 오염시키는 것,
 * 광고 차단기로 gtag가 없을 때 도구가 깨지는 것.
 */
describe('trackToolResult', () => {
  afterEach(() => { delete window.gtag; });

  it('운영 도메인에서는 도구 이름만 실어 tool_result 이벤트를 보낸다', () => {
    const gtag = vi.fn();
    window.gtag = gtag;
    trackToolResult('repair-replace', 'salimlab.kr');
    expect(gtag.mock.calls).toEqual([['event', 'tool_result', { tool_name: 'repair-replace' }]]);
  });

  it('운영 도메인이 아니면 보내지 않는다', () => {
    const gtag = vi.fn();
    window.gtag = gtag;
    trackToolResult('repair-replace', '127.0.0.1');
    expect(gtag).not.toHaveBeenCalled();
  });

  it('gtag가 없어도(차단기) 오류를 내지 않는다', () => {
    expect(() => trackToolResult('care-plan', 'salimlab.kr')).not.toThrow();
  });
});

describe('개인정보처리방침', () => {
  const privacy = readFileSync(join(process.cwd(), 'src/app/privacy/page.tsx'), 'utf-8').replace(/\s+/g, ' ');

  it('도구 결과 이벤트와 입력값을 보내지 않는다는 점, 주소에 남는 모델번호를 밝힌다', () => {
    expect(privacy).toContain('도구 이름');
    expect(privacy).toContain('입력한 치수·금액·측정값·날짜는 Google 애널리틱스로 보내지 않습니다');
    expect(privacy).toContain('모델번호');
  });

  it('최종 업데이트 날짜를 이번 개정일로 올린다', () => {
    expect(privacy).toContain('최종 업데이트: 2026년 10월 30일');
  });
});
