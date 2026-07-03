'use client';

import { useEffect, useState } from 'react';

type TocItem = { id: string; label: string };

export function ProductTOC({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | undefined>(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-120px 0px -70% 0px', threshold: 0 },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="섹션 바로가기"
      className="sticky top-16 z-40 -mx-4 border-b bg-white/90 px-4 backdrop-blur"
    >
      <ul className="flex gap-1 overflow-x-auto py-2 text-sm">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? 'true' : undefined}
              className={`block whitespace-nowrap rounded-full px-3 py-1.5 transition-colors ${
                active === i.id
                  ? 'bg-blue-600 font-medium text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
