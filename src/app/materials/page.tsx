import type { Metadata } from 'next';
import { allMaterials, getMaterialsByKind } from '@/lib/data/materials';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';
import { JsonLd, BreadcrumbJsonLd } from '@/components/jsonld';
import { LayerDiagram } from '@/components/materials/layer-diagram';
import { MaterialList } from '@/components/materials/material-list';
import { AdSenseScript } from '@/components/adsense-script';
import { isMaterialsHubIndexable } from '@/lib/content-quality';

// 항목이 목록으로 성립할 만큼 쌓이기 전까지는 색인·광고 대상이 아니다.
// 2026-08-23 현재 2개라 미달 — 항목을 더 쓰면 자동으로 풀린다.
const INDEXABLE = isMaterialsHubIndexable({ entryCount: allMaterials.length });

const TITLE = '기저귀 성분 사전';
const DESCRIPTION =
  '기저귀가 무엇으로 만들어지고, 국내 안전기준이 무엇을 시험하는지 정리했습니다. 소재별·규제항목별로 근거와 함께 확인하세요.';

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
      {INDEXABLE && <AdSenseScript />}
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
            유아용 일회용 기저귀는 전성분 표시 의무가 없습니다. 이 사전은 제조사가 공개한 정보와
            국내 안전기준이 정한 시험 항목을 정리한 것이며, 살림랩이 제품의 안전 등급을 매기지는
            않습니다.
          </p>
        </header>

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
              KC 안전확인을 받으려면 아래 항목을 시험해야 합니다.
            </p>
            <MaterialList items={regulatedItems} />
          </section>
        )}
      </div>
    </>
  );
}
