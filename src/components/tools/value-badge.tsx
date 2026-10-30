import { VALUE_KIND_LABELS, type ValueKind } from '@/lib/value-kind';

// 2026-10-30: 숫자마다 색 상자가 붙어 결과를 덮었다. 출처 구별은 글자로 남기고,
// 사용자가 무언가 해야 하는 두 표시(확인 필요·예시값)만 눈에 띄게 둔다.
const QUIET = 'font-normal text-gray-600';
const styles: Record<ValueKind, string> = {
  official: QUIET,
  'official-test': QUIET,
  measured: QUIET,
  entered: QUIET,
  calculated: QUIET,
  example: 'rounded border border-orange-300 bg-orange-50 px-1.5 py-0.5 font-semibold text-orange-950',
  unverified: 'rounded border border-amber-300 bg-amber-50 px-1.5 py-0.5 font-semibold text-amber-950',
};

export function ValueBadge({ kind, className = '' }: { kind: ValueKind; className?: string }) {
  return <span className={`inline-block whitespace-nowrap align-middle text-xs print:border-gray-500 print:bg-white print:text-black ${styles[kind]} ${className}`}>{VALUE_KIND_LABELS[kind]}</span>;
}
