import { ValueBadge } from '@/components/tools/value-badge';
import { Formula, GuideExample, GuideList, GuidePart, GuideTable, SourceLink, ToolGuide } from '@/components/tools/tool-guide';
import { formatMm } from '@/lib/fridge-fit';
import { DISHWASHER_FIT_PRODUCTS, dishwasherFitDifference, type DishwasherFitProduct } from '@/lib/dishwasher-fit';

/** 예시 계산에 넣는 가상의 자리 치수(mm). 모델 치수는 데이터에서 읽는다. */
const EXAMPLE_SPOT = { width: 600, depth: 550, height: 500, openDepth: 800 } as const;
const difference = (n: number) => n < 0 ? `${formatMm(-n)}mm 부족` : `${formatMm(n)}mm 큼`;
const topics = (product: DishwasherFitProduct, status: 'confirmed' | 'unverified') => product.conditions.filter((c) => c.status === status).map((c) => c.topic);

export function DishwasherFitGuide({ products = DISHWASHER_FIT_PRODUCTS }: { products?: DishwasherFitProduct[] }) {
  const withDoor = products.filter((product) => product.openDepth !== undefined);
  const withoutDoor = products.filter((product) => product.openDepth === undefined);
  const example = withDoor[0] ?? products[0];
  const rows: [string, number, number | undefined][] = [
    ['자리 폭 − 본체 폭', EXAMPLE_SPOT.width, example.width],
    ['자리 깊이 − 본체 깊이', EXAMPLE_SPOT.depth, example.depth],
    ['위쪽 장애물까지 높이 − 본체 높이', EXAMPLE_SPOT.height, example.height],
    ['문 앞 장애물까지 거리 − 문을 연 깊이', EXAMPLE_SPOT.openDepth, example.openDepth],
  ];
  const shortRow = rows.find(([, value, target]) => target !== undefined && dishwasherFitDifference(value, target) < 0);

  return <ToolGuide title="두 식기세척기의 치수와 설치 조건은 어디서 왔나요?" lead="이 확인표는 놓는 자리가 다른 두 모델(조리대 위와 바닥)을 다룹니다. 본체 치수는 빼기 한 번으로 비교하고, 급수·배수·전원처럼 숫자로 비교할 수 없는 조건은 설명서에서 찾았는지 여부로만 나눕니다.">
    <GuidePart title="쓰는 설명서와 원문" wide>
      <GuideTable caption="식기세척기 모델별 설치 위치, 본체 치수, 문을 연 깊이, 설명서 쪽과 조건 확인 상태" head={['모델', '놓는 곳 · 본체 폭×깊이×높이', '문을 연 깊이', '설명서', '조건 확인 상태']} rows={products.map((product) => [
        `${product.name} ${product.model}`,
        `${product.placement} · ${product.width}×${product.depth}×${product.height}mm`,
        product.openDepth !== undefined ? `${formatMm(product.openDepth)}mm` : <>찾지 못함 <ValueBadge kind="unverified" /></>,
        <><SourceLink href={product.sourceUrl}>{product.model} 공식 설명서</SourceLink><span className="mt-1 block text-xs text-gray-600">{product.sourcePages} · 원문 재확인 {product.checkedAt}</span></>,
        <>공식 자료 {topics(product, 'confirmed').length}개 · 확인 필요 {topics(product, 'unverified').length}개<span className="mt-1 block text-xs text-gray-600">확인 필요: {topics(product, 'unverified').join(', ')}</span></>,
      ])} />
    </GuidePart>

    <GuidePart title="계산식">
      <Formula>폭·깊이·높이 차이 = 집에서 잰 자리 치수 − 같은 방향의 본체 치수</Formula>
      <Formula>문 앞 차이 = 뒷면부터 문 앞 장애물까지 거리 − 문을 연 깊이({withDoor.map((product) => product.model).join(', ') || '해당 모델 없음'}만)</Formula>
      <p>냉장고 확인표처럼 본체 치수에 간격을 더해 기준을 키우지 않습니다. 두 모델의 설명서 어디에서도 좌우·상부에 띄울 거리의 수치를 찾지 못했기 때문입니다. 그래서 차이가 0보다 커도 ‘띄울 여유가 충분하다’는 뜻이 되지 않습니다. 차이는 0.1mm 단위로 반올림합니다.</p>
    </GuidePart>

    <GuidePart title="재는 방법과 입력 규칙">
      <GuideList items={[
        ...products.map((product) => product.placement === '조리대 위'
          ? `${product.name}(${product.placement}): 높이는 조리대 윗면에서 상부장·선반 아랫면까지, 깊이는 벽에서 조리대 앞 끝까지 잽니다.`
          : `${product.name}(${product.placement}): 높이는 바닥에서 위쪽 장애물 아랫면까지, 깊이는 제품 뒷면이 닿을 벽에서 앞쪽 끝까지 잽니다.`),
        '폭은 수전·배관·몰딩처럼 튀어나온 것을 피해 실제로 비어 있는 가장 좁은 구간을 적습니다.',
        '숫자는 mm로, 소수는 첫째 자리까지 넣습니다. 쉼표는 세 자리 묶음일 때만 숫자로 읽고 5,5 같은 입력은 칸 아래에 오류를 띄웁니다. 이 경우 상담 기록에도 ‘입력 오류’로 남습니다.',
        '모델을 바꾸면 놓는 곳이 달라 이미 넣은 치수와 체크를 비웁니다. 두 모델을 비교하려면 모델마다 다시 재서 넣으세요.',
      ]} />
    </GuidePart>

    <GuidePart title="예시 계산" wide>
      <GuideExample title={`가상의 설치 자리 × ${example.name} ${example.model}`}>
        <p>자리 치수 네 개는 가상의 값이고, 빼는 쪽은 이 모델의 공식 치수입니다.</p>
        <GuideTable caption="예시 자리 치수와 공식 본체·문 치수의 차이" head={['계산', <>자리 <ValueBadge kind="example" /></>, <>공식 치수 <ValueBadge kind="official" /></>, <>차이 <ValueBadge kind="calculated" /></>]} rows={rows.map(([label, value, target]) => [
          label, `${formatMm(value)}mm`, target !== undefined ? `${formatMm(target)}mm` : '확인 필요', target !== undefined ? difference(dishwasherFitDifference(value, target)) : '비교하지 않음',
        ])} />
        {shortRow && <p>이 예시에서는 ‘{shortRow[0]}’가 음수라 확인 카드에 치수 부족이 뜹니다. 나머지 칸이 남는다고 해서 이 자리에 설치된다는 뜻은 아닙니다.</p>}
      </GuideExample>
    </GuidePart>

    <GuidePart title="자주 하는 오해">
      <GuideList items={[
        <><strong>부족 표시가 없으면 설치할 수 있다?</strong> 본체 크기만 뺀 결과입니다. 띄울 여유, 반입, 수평, 급수·배수 위치는 이 계산에 들어가지 않습니다.</>,
        ...(withoutDoor.length ? [<><strong>{withoutDoor.map((product) => product.model).join(', ')}도 문 앞 공간을 확인해 준다?</strong> 문을 연 깊이를 설명서에서 찾지 못해 문 앞 거리 칸 자체가 없습니다. 문 열림과 앞 통로는 설치팀에 확인하세요.</>] : []),
        ...products.filter((product) => product.conditions.some((c) => c.topic === '설치 유형')).map((product) => <><strong>{product.model} 설명서의 빌트인 설치 절도 이 모델에 해당한다?</strong> {product.conditions.find((c) => c.topic === '설치 유형')!.text}</>),
        <><strong>‘설치팀에 전달할 자료’를 체크하면 조건을 갖춘 것이다?</strong> 체크는 급수·배수 위치와 콘센트, 수평의 사진·위치를 챙겼다는 표시입니다. 조건을 만족하는지는 현장에서 정해집니다.</>,
        ...(products.every((product) => product.conditions.some((c) => c.topic === '추가 부품비' && c.status === 'confirmed')) ? [<><strong>연장 호스와 연장 코드는 설치할 때 함께 온다?</strong> 두 설명서 모두 연장 부품을 별매로 적고, 그 부품비는 소비자 부담이라고 안내합니다.</>] : []),
      ]} />
    </GuidePart>
  </ToolGuide>;
}
