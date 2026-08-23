import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allMaterials, getMaterial, getRelated } from '@/lib/data/materials';
import { SITE_NAME } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';
import { BreadcrumbJsonLd } from '@/components/jsonld';
import { AdSenseScript } from '@/components/adsense-script';
import { isMaterialIndexable } from '@/lib/content-quality';

/** 본문과 출처가 모두 있어야 색인한다 */
const materialIndexable = (m: { sources: unknown[]; what: string; whyUsed: string; concern?: string }) =>
  isMaterialIndexable({
    sourceCount: m.sources.length,
    bodyChars: (m.what + m.whyUsed + (m.concern ?? '')).trim().length,
  });

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allMaterials.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = getMaterial(slug);
  if (!m) return { title: '항목을 찾을 수 없습니다' };

  const title = `${m.name} — 기저귀 성분 사전`;
  const url = `/materials/${m.slug}`;
  return {
    title,
    description: m.what,
    alternates: { canonical: url },
    openGraph: buildOpenGraph({ title: `${title} | ${SITE_NAME}`, description: m.what, url }),
    ...(materialIndexable(m) ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function MaterialPage({ params }: Props) {
  const { slug } = await params;
  const m = getMaterial(slug);
  if (!m) notFound();

  const related = getRelated(slug);

  return (
    <>
      {materialIndexable(m) && <AdSenseScript />}
      <BreadcrumbJsonLd
        items={[
          { name: '홈', path: '/' },
          { name: '기저귀 성분 사전', path: '/materials' },
          { name: m.name },
        ]}
      />

      <article className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <header>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <Link href="/materials" className="hover:text-blue-600 transition-colors">
              기저귀 성분 사전
            </Link>
            <span className="text-gray-300">|</span>
            <span>{m.kind}</span>
            {m.role && (
              <>
                <span className="text-gray-300">|</span>
                <span>{m.role}층</span>
              </>
            )}
          </div>
          <h1 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">{m.name}</h1>
          {m.aliases.length > 0 && (
            <p className="mt-2 text-sm text-gray-500">다른 이름: {m.aliases.join(' · ')}</p>
          )}
          {m.testStandard && (
            <p className="mt-2 inline-block rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-700">
              시험 기준 {m.testStandard}
            </p>
          )}
        </header>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">무엇인가</h2>
          <p className="text-gray-700 leading-relaxed">{m.what}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {m.kind === '소재' ? '왜 쓰는가' : '왜 규제하는가'}
          </h2>
          <p className="text-gray-700 leading-relaxed">{m.whyUsed}</p>
        </section>

        {m.concern && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">자주 나오는 우려</h2>
            <div className="rounded-xl bg-blue-50 p-5 text-gray-700 leading-relaxed">
              {m.concern}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">함께 보기</h2>
            <ul className="space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/materials/${r.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {r.name}
                  </Link>
                  <span className="text-sm text-gray-500"> — {r.kind}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="border-t pt-5 text-sm text-gray-500 space-y-2">
          <div>
            <p className="font-semibold text-gray-700 mb-1">근거</p>
            <ul className="space-y-1">
              {m.sources.map((source) => (
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
                  {source.publisher && (
                    <span className="text-gray-400"> — {source.publisher}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <p>{m.updated} 검수</p>
        </footer>
      </article>
    </>
  );
}
