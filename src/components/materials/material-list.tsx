import Link from 'next/link';
import type { Material } from '@/types/material';

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
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{m.what}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
