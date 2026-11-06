import Link from 'next/link';
import type { CardAppliance } from '@/types/appliance';
import type { PurifierComparisonFact, PurifierComparisonFacts, PurifierComparisonMap } from '@/lib/purifier-comparison';

const rows = [
  ['management', '관리 방식'],
  ['filters', '필터 교체 주기'],
  ['space', '본체 치수·주변 여유'],
  ['connections', '급수·배수·전원'],
] as const;

function Fact({ fact }: { fact?: PurifierComparisonFact }) {
  if (!fact) return <p>이 정확한 모델의 자료는 확인 필요입니다. 제조사 설명서와 계약서를 확인하세요.</p>;
  return (
    <div className="space-y-3 text-left">
      {fact.lines.map((line, index) => <p key={index} className="leading-relaxed">{line}</p>)}
      <ul className="space-y-2 text-xs text-gray-500">
        {fact.sources.map((source) => (
          <li key={`${source.url}-${source.label}`}>
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline underline-offset-2">{source.label}</a>
            <span className="block">자료 확인 {source.checkedAt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PurifierComparison({ appliances, facts }: { appliances: CardAppliance[]; facts: PurifierComparisonMap }) {
  const purifiers = appliances.filter((appliance) => appliance.category === '정수기');
  if (!purifiers.length) return null;
  const getFact = (slug: string, key: keyof Pick<PurifierComparisonFacts, 'management' | 'filters' | 'space' | 'connections'>) => facts[slug]?.[key];
  return (
    <div className="mt-6 space-y-4 border-t border-gray-200 pt-6">
      <h3 className="text-lg font-semibold text-gray-900">정수기 관리·설치 조건</h3>
      <p className="text-sm leading-relaxed text-gray-600">선택한 정수기의 정확한 모델 자료를 나란히 놓았습니다. 필터 주기는 설명서의 사용량·수질 조건에 따른 안내이며, 관리 계약에 포함되는 교체 범위는 계약서로 확인하세요. 본체 크기만으로 설치 가능 여부를 판단할 수 없습니다.</p>
      <div className="space-y-4 md:hidden">
        {purifiers.map((appliance) => (
          <div key={appliance.slug} className="rounded-xl border p-4">
            <h4 className="font-semibold text-gray-900">{appliance.name}</h4>
            <dl className="mt-4 space-y-5 text-sm text-gray-700">
              {rows.map(([key, label]) => (
                <div key={key}>
                  <dt className="mb-2 font-semibold text-gray-900">{label}</dt>
                  <dd><Fact fact={getFact(appliance.slug, key)} /></dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[600px] table-fixed text-sm text-gray-700">
          <caption className="sr-only">선택한 정수기 관리 방식·필터 주기·설치 조건</caption>
          <thead><tr className="border-b border-gray-200">
            <th scope="col" className="w-36 bg-gray-50 p-4 text-left">항목</th>
            {purifiers.map((appliance) => <th scope="col" key={appliance.slug} className="p-4 text-left text-gray-900">{appliance.name}</th>)}
          </tr></thead>
          <tbody>{rows.map(([key, label]) => (
            <tr key={key} className="border-b border-gray-100">
              <th scope="row" className="bg-gray-50 p-4 text-left align-top font-medium">{label}</th>
              {purifiers.map((appliance) => <td key={appliance.slug} className="p-4 align-top"><Fact fact={getFact(appliance.slug, key)} /></td>)}
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
        <Link href="/tools/water-purifier-cost" className="text-blue-700 underline underline-offset-4">같은 기간의 렌탈·구매 비용 비교</Link>
        {purifiers.map((appliance) => <Link key={appliance.slug} href={facts[appliance.slug]?.installHref ?? '/tools/install-check'} className="text-blue-700 underline underline-offset-4">{facts[appliance.slug]?.modelNumber ?? appliance.name} 설치 조건과 우리 집 치수 확인</Link>)}
      </div>
    </div>
  );
}
