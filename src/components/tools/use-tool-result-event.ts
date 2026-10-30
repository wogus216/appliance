import { useEffect, useRef } from 'react';
import { trackToolResult, type TrackedTool } from '@/lib/analytics';

/** 결과가 처음 나왔을 때 한 번만 보낸다. 입력을 고쳐 다시 계산돼도 한 화면에 한 번이다. */
export function useToolResultEvent(tool: TrackedTool, reached: boolean) {
  const sent = useRef(false);
  useEffect(() => {
    if (!reached || sent.current) return;
    sent.current = true;
    trackToolResult(tool);
  }, [tool, reached]);
}
