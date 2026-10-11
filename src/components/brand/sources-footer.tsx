import type { SourceRef } from '@/types/source';
import { SITE_AUTHOR } from '@/lib/constants';
import { AuthorName } from '@/components/author-name';

/** 성분 사전 상세 페이지의 '근거' 푸터와 같은 형태 — 사이트 전체 편집 규칙이다 */
export function BrandSourcesFooter({
  sources,
  updated,
}: {
  sources: SourceRef[];
  updated: string;
}) {
  return (
    <footer className="border-t pt-5 text-sm text-gray-500 space-y-2">
      <div>
        <p className="font-semibold text-gray-700 mb-1">근거</p>
        <ul className="space-y-1">
          {sources.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {source.title}
                <span className="sr-only"> (새 창)</span>
              </a>
              {source.publisher && <span className="text-gray-400"> — {source.publisher}</span>}
            </li>
          ))}
        </ul>
      </div>
      <p>
        {updated} 검수 · 작성·검수 <AuthorName name={SITE_AUTHOR} />
      </p>
    </footer>
  );
}
