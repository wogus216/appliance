import { VALUE_KIND_LABELS, type ValueKind } from '@/lib/value-kind';

const styles: Record<ValueKind, string> = {
  official: 'border-blue-200 bg-blue-50 text-blue-900',
  'official-test': 'border-blue-200 bg-blue-50 text-blue-900',
  measured: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  entered: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  calculated: 'border-violet-200 bg-violet-50 text-violet-900',
  example: 'border-orange-300 bg-orange-50 text-orange-950',
  unverified: 'border-amber-300 bg-amber-50 text-amber-950',
};

export function ValueBadge({ kind, className = '' }: { kind: ValueKind; className?: string }) {
  return <span className={`inline-block whitespace-nowrap rounded border px-1.5 py-0.5 align-middle text-xs font-semibold print:border-gray-500 print:bg-white print:text-black ${styles[kind]} ${className}`}>{VALUE_KIND_LABELS[kind]}</span>;
}
