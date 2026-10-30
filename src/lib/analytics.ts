import { SITE_URL } from '@/lib/constants';
import type { ToolSlug } from '@/lib/tool-directory';

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

const SITE_HOST = new URL(SITE_URL).hostname;

export type TrackedTool = ToolSlug | 'error-action-card';

/**
 * 도구에서 결과가 나왔다는 사실만 GA4로 보낸다(2026-10-30).
 *
 * 인자를 도구 이름 하나로 제한해 입력값이 이벤트에 실릴 길을 막는다. 어느 페이지에서 썼는지는
 * GA가 페이지 경로로 붙인다. 호스트 검사는 ga4-init과 같은 이유다 — 로컬 검수가 운영 통계에 쌓이지 않게 한다.
 * 결과 도달의 정의: docs/salimlab-tools-entry-measure-2026-10-30.md
 */
export function trackToolResult(tool: TrackedTool, hostname = window.location.hostname) {
  if (hostname !== SITE_HOST) return;
  window.gtag?.('event', 'tool_result', { tool_name: tool });
}
