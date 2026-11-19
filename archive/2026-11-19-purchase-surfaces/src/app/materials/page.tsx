import type { Metadata } from 'next';
import Link from 'next/link';
import { allMaterials, getMaterialsByKind } from '@/lib/data/materials';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';
import { JsonLd, BreadcrumbJsonLd } from '@/components/jsonld';
import { LayerDiagram } from '@/components/materials/layer-diagram';
import { MaterialList } from '@/components/materials/material-list';
import { isMaterialsHubIndexable } from '@/lib/content-quality';

// 항목이 목록으로 성립할 만큼 쌓이기 전까지는 색인·광고 대상이 아니다.
// 2026-08-23에는 2개라 미달이었고, 2026-09-02에 6개로 채워 게이트를 넘겼다.
const INDEXABLE = isMaterialsHubIndexable({ entryCount: allMaterials.length });

const TITLE = '기저귀 성분 사전';
const DESCRIPTION =
  '기저귀가 무엇으로 만들어지고, 식약처 위생용품 기준·규격이 무엇을 시험하는지 정리했습니다. 소재별·규제항목별로 근거와 함께 확인하세요.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/materials' },
  openGraph: buildOpenGraph({ title: `${TITLE} — ${SITE_NAME}`, description: DESCRIPTION, url: '/materials' }),
  ...(INDEXABLE ? {} : { robots: { index: false, follow: true } }),
};

export default function MaterialsIndexPage() {
  const substances = getMaterialsByKind('소재');
  const regulatedItems = getMaterialsByKind('규제항목');

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: '홈', path: '/' }, { name: TITLE }]} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: TITLE,
          numberOfItems: allMaterials.length,
          itemListElement: allMaterials.map((m, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: m.name,
            url: `${SITE_URL}/materials/${m.slug}`,
          })),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{TITLE}</h1>
          <p className="mt-3 text-gray-600 leading-relaxed">{DESCRIPTION}</p>
          <p className="mt-3 text-sm text-gray-500 leading-relaxed">
            일회용 기저귀는 2018년 4월 19일부터 어린이제품 KC 안전확인이 아니라 식품의약품안전처가
            관리하는 위생용품입니다. 포장에는 안감·흡수층·방수층·고정(테이프)별로 원료명과 성분명을
            적어야 하지만 함량까지 적을 의무는 없습니다. 이 사전은 제조사가 공개한 정보와 「위생용품의
            기준 및 규격」이 정한 시험 항목을 정리한 것이며, 살림랩이 제품의 안전 등급을 매기지는
            않습니다.
          </p>
        </header>

        <section aria-labelledby="label-reading-heading" className="border-y border-gray-200 py-6">
          <h2 id="label-reading-heading" className="text-xl font-bold text-gray-900">포장 한 장을 펼쳐 놓고 읽어 보세요</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-gray-700 leading-relaxed">
            <li>안감·흡수층·방수층·고정 테이프의 원료명을 나눠 적습니다.</li>
            <li>무첨가·불검출 문구가 어느 재료와 어느 층을 가리키는지 봅니다.</li>
            <li>확인한 정보와 빠진 정보를 나누고, 구매 전에 확인할 질문을 남깁니다.</li>
          </ol>
          <Link href="/blog/diaper-label-reading" className="mt-3 inline-flex min-h-11 items-center font-semibold text-blue-700 underline underline-offset-4">
            가상 포장 사례 세 가지로 읽는 법 익히기
          </Link>
          <p className="text-sm leading-relaxed text-gray-700">특정 제품의 시험 결과나 안전 순위를 제공하는 사전은 아닙니다.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-1">기저귀는 이렇게 만들어집니다</h2>
          <p className="text-sm text-gray-500">피부에 닿는 쪽이 맨 위입니다.</p>
          <LayerDiagram />
        </section>

        {substances.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">소재</h2>
            <MaterialList items={substances} />
          </section>
        )}

        {regulatedItems.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-1">안전기준이 시험하는 항목</h2>
            <p className="text-sm text-gray-500 mb-4">
              식품의약품안전처 「위생용품의 기준 및 규격」이 일회용 기저귀에 정한 규격 항목입니다.
              안감·방수층처럼 시험하는 층이 항목마다 다릅니다.
            </p>
            <MaterialList items={regulatedItems} />
          </section>
        )}
      </div>
    </>
  );
}
