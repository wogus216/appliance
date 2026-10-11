import type { Metadata } from 'next';
import Link from 'next/link';
import { allBlogPosts } from '@/lib/data/blog';
import { isPostIndexable, getIndexableBlogPosts } from '@/lib/blog';
import { isBlogHubIndexable } from '@/lib/content-quality';
import { blogBodyChars } from '@/types/blog';
import { SITE_NAME, SITE_AUTHOR, SITE_URL } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';
import { JsonLd, BreadcrumbJsonLd } from '@/components/jsonld';
import { AdSenseScript } from '@/components/adsense-script';

// 글이 전부 두세 제품 비교는 아니다 — 라벨 숫자(냉장고 월간 kWh·식기세척기 물 사용량)와
// 점검 코드를 푸는 해설·가이드가 함께 있다(2026-10-08 kind 기준 비교 11·해설 6·가이드 1).
const TITLE = '블로그 — 제품과 숫자를 따져 본 글';
const DESCRIPTION =
  '스펙표를 옮겨 적는 대신, 제조사 사양과 국가 고시·공공기관 시험 자료를 대조하고 그 숫자가 우리 집에서 무엇을 뜻하는지 계산한 글을 모았습니다. 확인하지 못한 값은 확인하지 못했다고 적습니다.';

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
            제품과 숫자를 따져 본 글
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
              제품 상세 페이지가 한 제품을 설명하는 자리라면, 여기는 두세 제품을 같은 표에 올려놓거나
              라벨·사양의 숫자 하나가 어떻게 정해지는지 따지는 자리입니다. 그래서 글마다 답해야 하는
              질문을 하나 정하고, 결론을 맨 앞에 놓은 뒤 근거를 뒤에 붙입니다.
            </p>
            {/* 예전 문구는 "표의 수치는 제조사 사양과 시중가뿐", "모든 글에 '저희가 확인하지 못한 것'
                항목이 있다"였다. 실제로는 고시 산식(냉장고 월간 kWh)·소비자원 시험·전문 매체 측정을
                인용한 글이 있고, 그 절이 있는 글은 18편 중 9편이었다(2026-10-08 heading 기준). */}
            <p>
              표에 넣는 수치는 제조사가 공개한 사양, 국가 고시와 공공기관 시험 자료, 조사 시점의
              시중가처럼 출처를 붙일 수 있는 값입니다. 확인하지 못한 값은 빈칸으로 두거나 그 자리에
              &ldquo;확인하지 못함&rdquo;이라고 적고, 확인하지 못한 항목이 여럿인 글에는{' '}
              <strong className="font-semibold text-gray-900">저희가 확인하지 못한 것</strong> 절을
              따로 둡니다 — 무엇을 모르는지 밝히지 않으면 나머지 숫자도 믿을 이유가 없기 때문입니다.
            </p>
            <p>
              {/* 2026-10-09 4차: "추정한 '월 전기요금 몇 원'은 쓰지 않는다"는 다이슨 글의 라벨 산정식 역산
                  (하루 1시간이면 월 약 24,600원)과 부딪혔다. 실제 정책 — 실측 요금은 없고, 요금은 공단 라벨·
                  고시 산정식으로 계산 과정을 보일 때만 쓴다 — 대로 고쳤다. */}
              저희는 제품을 직접 측정하거나 분해하지 않습니다. 그래서 저희가 잰 &ldquo;차음 몇
              dB&rdquo;이나 우리 집 고지서 같은 실측 요금은 없습니다. 요금을 적는 글은 한국에너지공단
              라벨 값과 고시 산정식처럼 출처가 있는 입력으로 계산하고, 그 식과 조건을 함께 보여 줍니다.
              다른 매체의 측정을 인용할 때는 그 매체와 시험 조건을 함께 적습니다.
            </p>
            <p>
              글 속의 판단은 {SITE_AUTHOR}의 것이고, 제품에 점수나 별점은 매기지 않습니다.
              가격·전기요금 계산 방식은{' '}
              <Link href="/methodology" className="text-blue-600 hover:underline">
                계산 방법
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
