import Link from 'next/link';
import type { Material } from '@/types/material';

/** '…다.'로 끝나는 첫 문장 — 없으면 원문 그대로 */
function firstSentence(text: string): string {
  const m = text.match(/^.*?다\.(?=\s|$)/);
  return m ? m[0] : text;
}

export function MaterialList({ items }: { items: Material[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="grid sm:grid-cols-2 gap-3">
      {items.map((m) => (
        <li key={m.slug}>
          <Link
            href={`/materials/${m.slug}`}
            className="block rounded-xl border p-4 hover:bg-gray-50 transition-colors"
          >
            <p className="font-semibold text-gray-900">{m.name}</p>
            {m.role && <p className="text-xs text-gray-500 mt-0.5">{m.role}층</p>}
            {/* 2026-10-09 4차: 상세 페이지 '무엇인가' 문단 전체를 그대로 복사해 HTML에 실어 중복으로 지적됐다 —
                첫 문장만 싣는다(화면은 원래 2줄로 잘려 보였다) */}
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{firstSentence(m.what)}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
