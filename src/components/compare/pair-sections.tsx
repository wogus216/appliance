// 비교 페이지의 본문 섹션들. 전부 서버 컴포넌트다.
//
// 'use client'를 쓰지 않는 이유는 크롤러 때문이다. 이 사이트는 홈에서 한 번 겪었다 —
// 제품 그리드가 클라이언트 컴포넌트라 정적 HTML 본문이 336자였다. 비교 페이지는
// 본문이 HTML에 그대로 있어야 하고, 상호작용이 필요한 요소도 없다.
//
// 모든 문장은 카탈로그 값의 파생이다. 여기서 새 사실을 만들지 않는다.
// 제품명 뒤에 조사를 붙이지 않는다 — 이름의 받침이 제각각이라 '갤럭시 버즈3이' 같은
// 문장이 나온다. 이름이 들어갈 자리는 표·괄호·대시로 처리한다.

import type { Appliance } from '@/types/appliance';
import { getPairSpecRows, type ComparisonPair } from '@/lib/comparisons';
import { getProductEditorial } from '@/lib/data/editorial';
import { getPriceVariant } from '@/lib/price-source';
import { JsonLd } from '@/components/jsonld';

type LabelProps = { aLabel: string; bLabel: string };

/**
 * 표의 '가격' 줄에 붙일 조사일. 가격이 날짜 없이 나가면 현재 판매가처럼 읽힌다.
 * 날짜는 제품 상세의 가격 확인일(EditorialMeta.priceCheckedAt)과 같은 값이다.
 */
function priceDateNote(pair: ComparisonPair, aLabel: string, bLabel: string): string | null {
  const dated = [
    { label: aLabel, price: pair.a.price, at: getProductEditorial(pair.a.slug)?.priceCheckedAt },
    { label: bLabel, price: pair.b.price, at: getProductEditorial(pair.b.slug)?.priceCheckedAt },
  ].filter((x) => x.price != null);
  if (dated.length === 0) return null;
  // 색상·구성만 다른 상품의 가격이면 표 아래에 밝힌다(price-source.ts)
  const variants = [
    { label: aLabel, v: pair.a.price != null ? getPriceVariant(pair.a.slug) : undefined },
    { label: bLabel, v: pair.b.price != null ? getPriceVariant(pair.b.slug) : undefined },
  ]
    .filter((x) => x.v)
    .map((x) => ` ${x.label} 가격은 ${x.v} 상품 가격입니다.`)
    .join('');
  if (dated.length === 2 && dated[0].at && dated[0].at === dated[1].at) {
    return `가격은 두 제품 모두 ${dated[0].at}에 조사한 값이며 현재 판매가가 아닙니다.${variants}`;
  }
  return `가격은 ${dated
    .map((x) => `${x.label} ${x.at ? `${x.at} 조사` : '조사일 미기재'}`)
    .join(', ')} 값이며 현재 판매가가 아닙니다.${variants}`;
}

export function PairSpecTable({ pair, aLabel, bLabel }: { pair: ComparisonPair } & LabelProps) {
  const rows = getPairSpecRows(pair);
  const priceNote = priceDateNote(pair, aLabel, bLabel);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-50 text-sm text-gray-600">
            <th className="py-3 px-4 text-left font-medium">스펙</th>
            <th className="py-3 px-4 text-center font-medium">{aLabel}</th>
            <th className="py-3 px-4 text-center font-medium">{bLabel}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-gray-100">
              <td className="py-3 px-4 bg-gray-50 text-sm font-medium text-gray-700 whitespace-nowrap">
                {row.label}
              </td>
              <td className="py-3 px-4 text-sm text-center text-gray-800">{row.a ?? '—'}</td>
              <td className="py-3 px-4 text-sm text-center text-gray-800">{row.b ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-xs text-gray-500">
        빈칸(—)은 확인하지 못한 값입니다. 추정치를 채워 넣지 않습니다.
        {priceNote && ` ${priceNote}`}
      </p>
    </div>
  );
}

function FitColumn({ label, appliance }: { label: string; appliance: Appliance }) {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="font-medium text-gray-900">{label}</div>
      {appliance.targetUsers.recommended.length > 0 && (
        <>
          <div className="mt-3 text-sm font-medium text-gray-700">이런 분께</div>
          <ul className="mt-1 space-y-1 text-sm text-gray-600 list-disc list-inside">
            {appliance.targetUsers.recommended.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </>
      )}
      {appliance.targetUsers.notRecommended.length > 0 && (
        <>
          <div className="mt-3 text-sm font-medium text-gray-700">맞지 않는 경우</div>
          <ul className="mt-1 space-y-1 text-sm text-gray-600 list-disc list-inside">
            {appliance.targetUsers.notRecommended.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export function PairFitLists({ pair, aLabel, bLabel }: { pair: ComparisonPair } & LabelProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <FitColumn label={aLabel} appliance={pair.a} />
      <FitColumn label={bLabel} appliance={pair.b} />
    </div>
  );
}

/**
 * FAQ — 카탈로그 값에서 답이 나오는 질문만 만든다. 점수로 우열을 묻는 질문은 없다.
 *
 * 화면에 보이는 Q&A와 FAQPage 스키마가 같은 배열에서 나온다. 스키마에만 있고
 * 화면에 없는 질문은 구조화 데이터 정책 위반이다.
 */
function buildFaq(
  pair: ComparisonPair,
  aLabel: string,
  bLabel: string,
): { question: string; answer: string }[] {
  const faq: { question: string; answer: string }[] = [];

  const aGrade = pair.a.techSpecs.energyGrade;
  const bGrade = pair.b.techSpecs.energyGrade;
  if (aGrade && bGrade) {
    // 등급만으로 요금 차이를 말하지 않는다 — 같은 등급이어도 라벨의 소비전력량(kWh)은
    // 모델마다 다를 수 있다(blog/fridge-monthly-kwh-measurement). 두 제품 모두 그 값이 있으면
    // 표에 줄이 생기므로(getPairSpecRows의 extraSpecs 맞대기) 그 줄로 보내고, 없으면 라벨로 보낸다.
    const kwhRow = getPairSpecRows(pair).find(
      (r) => r.label.includes('소비전력량') && r.a?.trim() && r.b?.trim(),
    );
    const kwhA = kwhRow ? parseFloat(kwhRow.a!) : NaN;
    const kwhB = kwhRow ? parseFloat(kwhRow.b!) : NaN;
    const kwhNote =
      kwhRow && Number.isFinite(kwhA) && Number.isFinite(kwhB)
        ? `요금 차이는 등급보다 위 표의 ${kwhRow.label}이 더 직접적입니다 — ${aLabel} ${kwhRow.a}, ${bLabel} ${kwhRow.b}로 월 ${Math.abs(kwhA - kwhB).toFixed(1)}kWh 차이입니다. 한국에너지공단 신고값이라 시험 조건의 값이고 실제 청구액이 아니며, 두 모델의 신고 연도가 다를 수 있습니다.`
        : kwhRow
          ? `요금 차이는 등급보다 위 표의 ${kwhRow.label} 줄을 비교하는 편이 정확합니다.`
          : '요금 차이를 보려면 두 모델 라벨의 소비전력량(kWh)을 같은 단위로 맞춰 비교하세요. 두 모델 모두의 값은 이 표에 없습니다.';
    faq.push({
      question: '에너지소비효율등급은 어느 쪽이 높나요?',
      answer:
        aGrade === bGrade
          ? `둘 다 ${aGrade}입니다. 등급이 같아도 소비전력량은 다를 수 있습니다. ${kwhNote}`
          : `${aLabel} ${aGrade}, ${bLabel} ${bGrade}입니다. 등급은 제조사 표기를 그대로 옮긴 값입니다. ${kwhNote}`,
    });
  }

  const aCost = pair.a.techSpecs.monthlyElectricityCost;
  const bCost = pair.b.techSpecs.monthlyElectricityCost;
  if (aCost && bCost) {
    faq.push({
      question: '전기요금 차이는 얼마나 되나요?',
      answer: `월 예상 전기요금은 ${aLabel} ${aCost.toLocaleString()}원, ${bLabel} ${bCost.toLocaleString()}원입니다. 차이는 월 ${Math.abs(aCost - bCost).toLocaleString()}원입니다. 제조사 표기 기준이라 실제 사용 환경에 따라 달라집니다.`,
    });
  }

  return faq;
}

export function PairFaq({
  pair,
  aLabel,
  bLabel,
}: {
  pair: ComparisonPair;
} & LabelProps) {
  const faq = buildFaq(pair, aLabel, bLabel);
  if (faq.length === 0) return null;

  // 제목까지 여기서 그린다 — 답할 질문이 없는 조합에 빈 '자주 묻는 질문' 제목이 남지 않게
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-gray-900">자주 묻는 질문</h2>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faq.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }}
      />
      <dl className="space-y-4">
        {faq.map((f) => (
          <div key={f.question} className="rounded-lg border border-gray-200 p-4">
            <dt className="font-medium text-gray-900">{f.question}</dt>
            <dd className="mt-2 text-sm text-gray-700 leading-relaxed">{f.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
