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
import { JsonLd } from '@/components/jsonld';

type LabelProps = { aLabel: string; bLabel: string };

export function PairSpecTable({ pair, aLabel, bLabel }: { pair: ComparisonPair } & LabelProps) {
  const rows = getPairSpecRows(pair);

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
    faq.push({
      question: '에너지소비효율등급은 어느 쪽이 높나요?',
      answer:
        aGrade === bGrade
          ? `둘 다 ${aGrade}입니다.`
          : `${aLabel} ${aGrade}, ${bLabel} ${bGrade}입니다. 등급은 제조사 표기를 그대로 옮긴 값입니다.`,
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
