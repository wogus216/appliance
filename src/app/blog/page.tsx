import type { Metadata } from 'next';
import Link from 'next/link';
import { allBlogPosts } from '@/lib/data/blog';
import { isPostIndexable, getIndexableBlogPosts } from '@/lib/blog';
import { isBlogHubIndexable } from '@/lib/content-quality';
import { blogBodyChars } from '@/types/blog';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';
import { JsonLd, BreadcrumbJsonLd } from '@/components/jsonld';
import { AdSenseScript } from '@/components/adsense-script';

const TITLE = '블로그 — 제품을 나란히 놓고 따져 본 글';
const DESCRIPTION =
  '스펙표를 옮겨 적는 대신, 제조사 공식 사양을 대조하고 그 숫자가 우리 집에서 무엇을 뜻하는지 계산한 글을 모았습니다. 확인하지 못한 값은 확인하지 못했다고 적습니다.';

export function generateMetadata(): Metadata {
  const indexable = isBlogHubIndexable({ indexablePostCount: getIndexableBlogPosts().length });
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: '/blog' },
    openGraph: buildOpenGraph({ title: TITLE, description: DESCRIPTION, url: '/blog' }),
    ...(indexable ? {} : { robots: { index: false, follow: true } }),
  };
}

export default function BlogIndexPage() {
  const posts = allBlogPosts;
  const showAds = isBlogHubIndexable({ indexablePostCount: getIndexableBlogPosts().length });

  return (
    <>
      {showAds && <AdSenseScript />}
      <BreadcrumbJsonLd items={[{ name: '홈', path: '/' }, { name: '블로그' }]} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: `${SITE_NAME} 블로그`,
          description: DESCRIPTION,
          url: `${SITE_URL}/blog`,
          inLanguage: 'ko',
          publisher: { '@id': `${SITE_URL}/#organization` },
          blogPost: posts.filter(isPostIndexable).map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            url: `${SITE_URL}/blog/${p.slug}`,
            datePublished: p.publishedAt,
            dateModified: p.updatedAt,
          })),
        }}
      />

      <section className="bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="mx-auto max-w-4xl px-4">
          <nav aria-label="브레드크럼" className="mb-3 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900">
              홈
            </Link>
            <span className="mx-2" aria-hidden>
              ›
            </span>
            <span className="text-gray-900">블로그</span>
          </nav>
          <h1 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
            제품을 나란히 놓고 따져 본 글
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-gray-600">{DESCRIPTION}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-12 px-4 py-10">
        <section aria-labelledby="posts-heading">
          <h2 id="posts-heading" className="mb-5 text-xl font-bold text-gray-900">
            전체 {posts.length}편
          </h2>
          <ul className="space-y-4">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="block rounded-2xl border p-5 transition-colors hover:border-blue-300"
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 font-semibold text-blue-700">
                      {p.kind}
                    </span>
                    <span className="text-gray-400">
                      최종 검수 <time dateTime={p.updatedAt}>{p.updatedAt}</time>
                    </span>
                    <span className="text-gray-400">
                      · 출처 {p.sources.length}건 · 약 {blogBodyChars(p).toLocaleString()}자
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold leading-snug text-gray-900">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{p.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 목록만 있는 페이지는 그 자체로 알맹이가 없다. 이 섹션이 허브의 본문이다. */}
        <section aria-labelledby="how-heading" className="max-w-2xl">
          <h2 id="how-heading" className="mb-4 text-xl font-bold text-gray-900">
            이 글들을 어떻게 씁니까
          </h2>
          <div className="space-y-4 leading-relaxed text-gray-700">
            <p>
              제품 상세 페이지가 한 제품을 설명하는 자리라면, 여기는 두세 제품을 같은 표에 올려놓고
              무엇이 실제로 다른지 따지는 자리입니다. 그래서 글마다 답해야 하는 질문을 하나 정하고,
              결론을 맨 앞에 놓은 뒤 근거를 뒤에 붙입니다.
            </p>
            <p>
              표에 넣는 수치는 제조사가 공개한 사양과 조사 시점의 시중가뿐입니다. 확인하지 못한
              값은 빈칸으로 두거나 &ldquo;확인하지 못함&rdquo;이라고 적습니다. 그래서 모든 글에{' '}
              <strong className="font-semibold text-gray-900">저희가 확인하지 못한 것</strong> 항목이
              있습니다 — 무엇을 모르는지 밝히지 않으면 나머지 숫자도 믿을 이유가 없기 때문입니다.
            </p>
            <p>
              저희는 제품을 직접 측정하거나 분해하지 않습니다. 그래서 &ldquo;차음 몇 dB&rdquo;,
              &ldquo;월 전기요금 몇 원&rdquo; 같은 실측·추정 수치를 쓰지 않습니다. 이 글들이 하는
              일은 공개된 숫자를 대조하고, 그 차이가 우리 집 조건에서 무엇을 뜻하는지 계산해
              보여주는 것입니다.
            </p>
            <p>
              점수와 평가는 모두 살림랩 편집팀의 판단이며 구매자 평점이 아닙니다. 산출 기준은{' '}
              <Link href="/methodology" className="text-blue-600 hover:underline">
                평가 방법
              </Link>
              , 출처를 다루는 원칙은{' '}
              <Link href="/editorial-policy" className="text-blue-600 hover:underline">
                편집 원칙
              </Link>
              에 정리해 두었습니다.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
