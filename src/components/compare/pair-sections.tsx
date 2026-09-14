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
import type { AxisComparison, ComparisonPair, PairScores } from '@/lib/comparisons';
import { EDITOR_RATING_LABEL } from '@/lib/constants';
import { isTraditionalAppliance } from '@/lib/category-config';
import { describeAxisBasis } from '@/lib/scoring';
import { getScoreAxes } from '@/lib/scoring';
import { JsonLd } from '@/components/jsonld';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

type LabelProps = { aLabel: string; bLabel: string };

/** 우열 표시 — 동점이면 양쪽 모두 강조하지 않는다 */
function winnerCell(isWinner: boolean, isTie: boolean) {
  return cn(
    'py-3 px-4 text-sm text-center',
    isWinner && !isTie && 'bg-blue-50 text-blue-700 font-semibold',
  );
}

export function PairVerdict({
  pair,
  scores,
  axes,
  aLabel,
  bLabel,
}: {
  pair: ComparisonPair;
  scores: PairScores;
  axes: AxisComparison[];
} & LabelProps) {
  const decided = axes.filter((ax) => ax.winner !== 'tie');
  const ties = axes.length - decided.length;
  const aWins = decided.filter((ax) => ax.winner === 'a');
  const bWins = decided.filter((ax) => ax.winner === 'b');

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">한눈에 보기</h2>

      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { label: aLabel, score: scores.a, isWinner: scores.winner === 'a', wins: aWins },
          { label: bLabel, score: scores.b, isWinner: scores.winner === 'b', wins: bWins },
        ].map((side) => (
          <div
            key={side.label}
            className={cn(
              'rounded-lg border p-4',
              side.isWinner ? 'border-blue-300 bg-blue-50/50' : 'border-gray-200',
            )}
          >
            <div className="text-sm text-gray-500">{EDITOR_RATING_LABEL}</div>
            <div className="text-2xl font-bold text-gray-900">{side.score.toFixed(1)}</div>
            <div className="mt-1 text-sm font-medium text-gray-800">{side.label}</div>
            <div className="mt-2 text-xs text-gray-600">
              {side.wins.length > 0
                ? `앞서는 항목 — ${side.wins.map((ax) => ax.label).join('·')}`
                : '앞서는 항목 없음'}
            </div>
          </div>
        ))}
      </div>

      <p className="text-gray-700 leading-relaxed">
        공통 축 {axes.length}개를 맞댄 결과{' '}
        {decided.length > 0
          ? `${decided.length}개에서 우열이 갈리고 ${ties}개는 동점입니다.`
          : '모든 항목이 동점입니다.'}{' '}
        {scores.winner === 'tie'
          ? `종합 ${EDITOR_RATING_LABEL}도 ${scores.a.toFixed(1)}로 같습니다.`
          : `종합 ${EDITOR_RATING_LABEL}는 ${scores.a.toFixed(1)} 대 ${scores.b.toFixed(1)}입니다.`}
      </p>

      <p className="text-xs text-gray-500 leading-relaxed">
        {describeAxisBasis(getScoreAxes(pair.a))}
      </p>
    </section>
  );
}

export function PairAxisTable({ axes, aLabel, bLabel }: { axes: AxisComparison[] } & LabelProps) {
  if (axes.length === 0) {
    return <p className="text-sm text-gray-600">두 제품에 공통으로 그려지는 축이 없습니다.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-50 text-sm text-gray-600">
            <th className="py-3 px-4 text-left font-medium">항목</th>
            <th className="py-3 px-4 text-center font-medium">{aLabel}</th>
            <th className="py-3 px-4 text-center font-medium">{bLabel}</th>
          </tr>
        </thead>
        <tbody>
          {axes.map((ax) => (
            <tr key={ax.label} className="border-t border-gray-100">
              <td className="py-3 px-4 bg-gray-50 text-sm font-medium text-gray-700">
                {ax.label}
                {ax.scope && <div className="text-xs font-normal text-gray-500">{ax.scope}</div>}
              </td>
              <td className={winnerCell(ax.winner === 'a', ax.winner === 'tie')}>{ax.aValue}</td>
              <td className={winnerCell(ax.winner === 'b', ax.winner === 'tie')}>{ax.bValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-xs text-gray-500">10점 만점. 값이 같으면 강조하지 않습니다.</p>
    </div>
  );
}

/** 표에 실을 스펙 한 줄. 양쪽 다 비어 있으면 줄 자체를 만들지 않는다 */
type SpecRow = { label: string; a?: string; b?: string };

function buildSpecRows(pair: ComparisonPair): SpecRow[] {
  const { a, b } = pair;
  const traditional = isTraditionalAppliance(pair.category);

  const rows: SpecRow[] = [
    { label: '모델번호', a: a.modelNumber, b: b.modelNumber },
    { label: '용량', a: a.techSpecs.capacity, b: b.techSpecs.capacity },
    { label: '핵심 기술', a: a.techSpecs.coreTechnology, b: b.techSpecs.coreTechnology },
    { label: '에너지등급', a: a.techSpecs.energyGrade, b: b.techSpecs.energyGrade },
    {
      label: '월 예상 전기요금',
      a: a.techSpecs.monthlyElectricityCost
        ? `${a.techSpecs.monthlyElectricityCost.toLocaleString()}원`
        : undefined,
      b: b.techSpecs.monthlyElectricityCost
        ? `${b.techSpecs.monthlyElectricityCost.toLocaleString()}원`
        : undefined,
    },
    {
      label: '소비전력',
      a: a.specs.powerConsumption ? `${a.specs.powerConsumption}W` : undefined,
      b: b.specs.powerConsumption ? `${b.specs.powerConsumption}W` : undefined,
    },
    // 소음은 이중 슬롯이다 — 생활가전만 dB이고 TV·무선이어폰은 축 점수로 쓰인다.
    // 구분하지 않으면 '연결성 9점'이 '9dB'로 나간다.
    ...(traditional
      ? [
          {
            label: '소음',
            a: a.specs.noise ? `${a.specs.noise}dB` : undefined,
            b: b.specs.noise ? `${b.specs.noise}dB` : undefined,
          },
        ]
      : []),
    { label: '냉매', a: a.techSpecs.refrigerant, b: b.techSpecs.refrigerant },
    { label: '필터', a: a.techSpecs.filterType, b: b.techSpecs.filterType },
    { label: '크기', a: a.techSpecs.dimensions, b: b.techSpecs.dimensions },
    {
      label: '무게',
      a: a.techSpecs.weight ? `${a.techSpecs.weight}kg` : undefined,
      b: b.techSpecs.weight ? `${b.techSpecs.weight}kg` : undefined,
    },
    {
      label: '적용 면적',
      a: a.roomFit?.coverageArea ? `${a.roomFit.coverageArea}m²` : undefined,
      b: b.roomFit?.coverageArea ? `${b.roomFit.coverageArea}m²` : undefined,
    },
    {
      label: '설치 형태',
      a: a.roomFit?.installationType,
      b: b.roomFit?.installationType,
    },
    {
      label: '가격',
      a: a.price ? formatPrice(a.price) : undefined,
      b: b.price ? formatPrice(b.price) : undefined,
    },
  ];

  // 카테고리별 추가 스펙 — 라벨이 양쪽에 다 있는 것만 맞댄다
  const aExtra = new Map((a.techSpecs.extraSpecs ?? []).map((s) => [s.label, s.value]));
  const bExtra = new Map((b.techSpecs.extraSpecs ?? []).map((s) => [s.label, s.value]));
  for (const label of aExtra.keys()) {
    if (bExtra.has(label)) rows.push({ label, a: aExtra.get(label), b: bExtra.get(label) });
  }

  return rows.filter((r) => r.a?.trim() || r.b?.trim());
}

export function PairSpecTable({ pair, aLabel, bLabel }: { pair: ComparisonPair } & LabelProps) {
  const rows = buildSpecRows(pair);

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
 * FAQ — 카탈로그 값에서 답이 나오는 질문만 만든다.
 *
 * 화면에 보이는 Q&A와 FAQPage 스키마가 같은 배열에서 나온다. 스키마에만 있고
 * 화면에 없는 질문은 구조화 데이터 정책 위반이다.
 */
function buildFaq(
  pair: ComparisonPair,
  axes: AxisComparison[],
  scores: PairScores,
  aLabel: string,
  bLabel: string,
): { question: string; answer: string }[] {
  const faq: { question: string; answer: string }[] = [];

  faq.push({
    question: `${aLabel} vs ${bLabel} — 종합 점수가 더 높은 쪽은?`,
    answer:
      scores.winner === 'tie'
        ? `두 제품 모두 ${scores.a.toFixed(1)}점으로 같습니다. 종합 점수는 그려지는 축의 평균을 2로 나눈 값이라, 축이 같으면 점수도 같습니다.`
        : `${scores.winner === 'a' ? aLabel : bLabel} 쪽이 높습니다 — ${scores.a.toFixed(1)} 대 ${scores.b.toFixed(1)}. 다만 종합 점수는 축의 단순 평균이라 가중치가 없습니다. 중요하게 보는 항목이 있다면 항목별 비교를 직접 확인하는 편이 낫습니다.`,
  });

  const decided = axes.filter((ax) => ax.winner !== 'tie');
  if (decided.length > 0) {
    const aWins = decided.filter((ax) => ax.winner === 'a').map((ax) => ax.label);
    const bWins = decided.filter((ax) => ax.winner === 'b').map((ax) => ax.label);
    faq.push({
      question: '항목별로는 어떻게 갈리나요?',
      answer: [
        aWins.length > 0 ? `${aLabel} — ${aWins.join('·')}` : null,
        bWins.length > 0 ? `${bLabel} — ${bWins.join('·')}` : null,
        axes.length - decided.length > 0
          ? `나머지 ${axes.length - decided.length}개 항목은 동점입니다.`
          : null,
      ]
        .filter(Boolean)
        .join(' / '),
    });
  }

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
  axes,
  scores,
  aLabel,
  bLabel,
}: {
  pair: ComparisonPair;
  axes: AxisComparison[];
  scores: PairScores;
} & LabelProps) {
  const faq = buildFaq(pair, axes, scores, aLabel, bLabel);
  if (faq.length === 0) return null;

  return (
    <>
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
    </>
  );
}
