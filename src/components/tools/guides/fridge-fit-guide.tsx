import { ValueBadge } from '@/components/tools/value-badge';
import { Formula, GuideExample, GuideList, GuidePart, GuideTable, SourceLink, ToolGuide } from '@/components/tools/tool-guide';
import { FIT_FIELDS, FRIDGE_EXAMPLE_KITCHENS, fitMargin, formatMm, fridgeFitTargets, fridgeFrontClearance, parseFitMeasurement, type FridgeFitProduct } from '@/lib/fridge-fit';

const COMPARED = ['spaceWidth', 'spaceHeight', 'openingWidth', 'frontDistance'] as const;
const labelOf = (key: typeof FIT_FIELDS[number]['key']) => FIT_FIELDS.find((field) => field.key === key)!.label;
const margin = (n: number) => n < 0 ? `${formatMm(-n)}mm 부족` : n === 0 ? '차이 0mm' : `${formatMm(n)}mm 큼`;

export function FridgeFitGuide({ products }: { products: FridgeFitProduct[] }) {
  const product = products[0];
  const scene = FRIDGE_EXAMPLE_KITCHENS.compact;
  const target = fridgeFitTargets(product);
  const clearance = fridgeFrontClearance(product, scene.inputs);
  const splitAngle = products.filter((entry) => entry.openWidthBasis !== entry.openDepthBasis);
  const topNotes = [...new Map(products.map((entry) => [entry.brandLabel, entry.topNote])).entries()];
  const transportNotes = [...new Map(products.map((entry) => [entry.brandLabel, entry.transportNote])).entries()];
  const basisText: Record<typeof COMPARED[number], string> = {
    spaceWidth: `본체 폭 ${formatMm(product.width)} + 좌우 ${product.sideGap} × 2`,
    spaceHeight: '본체 높이',
    openingWidth: `문 개방 폭(${product.openWidthBasis})`,
    frontDistance: `후면 간격 ${product.rearGap} + 문 개방 깊이 ${formatMm(product.openDepth)}(${product.openDepthBasis})`,
  };

  return <ToolGuide title="이 확인표는 어떤 기준으로 몇 mm를 계산하나요?" lead={`지원하는 냉장고 ${products.length}개 모델마다 공용 설명서 한 권에서 이 모델의 치수 열과 문 개방 도면을 골라 기준을 만들었습니다. 아래는 그 기준과 계산 순서, 그리고 결과를 읽을 때 흔히 넘겨짚는 부분입니다.`}>
    <GuidePart title="쓰는 설명서와 원문" wide>
      <p>본체 치수·후면 간격·문 개방 치수는 모두 <ValueBadge kind="official" /> 값입니다. 좌우 간격이 설명서의 어느 절에서 나왔는지는 표의 근거 문장에 모델마다 적었습니다.</p>
      <GuideTable caption="냉장고 모델별 설명서, 쪽, 간격 근거와 문 개방 도면 각도" head={['모델', '설명서와 쪽', '후면·좌우 간격', '문 개방 폭 / 깊이 도면']} rows={products.map((entry) => [
        `${entry.brandLabel} ${entry.modelNumber}`,
        <><SourceLink href={entry.sourceUrl}>{entry.document}</SourceLink><span className="mt-1 block text-xs text-gray-600">{entry.sourcePages} · 원문 재확인 {entry.checkedAt}</span></>,
        <>후면 {entry.rearGap}mm · 좌우 각 {entry.sideGap}mm<span className="mt-1 block text-xs text-gray-600">{entry.sideBasis}</span></>,
        `${formatMm(entry.openWidth)}mm(${entry.openWidthBasis}) / ${formatMm(entry.openDepth)}mm(${entry.openDepthBasis})`,
      ])} />
    </GuidePart>

    <GuidePart title="계산식">
      <Formula>자리 폭 기준 = 본체 폭 + 좌우 간격 × 2</Formula>
      <Formula>높이 기준 = 본체 높이(상부 여유는 더하지 않음)</Formula>
      <Formula>문 개방 폭 기준 = 설명서 도면의 문 개방 폭</Formula>
      <Formula>뒷벽 거리 기준 = 후면 간격 + 문 개방 깊이</Formula>
      <Formula>차이 = 집에서 잰 값 − 기준(0.1mm 단위 반올림, 음수면 부족)</Formula>
      <p>뒷벽 거리를 넣으면 남는 거리 두 가지를 더 보여 줍니다 <ValueBadge kind="calculated" />. 닫힌 본체 앞면부터는 ‘뒷벽 거리 − 후면 간격 − 본체 깊이’, 문 개방 끝부터는 ‘뒷벽 거리 − 뒷벽 거리 기준’입니다. 반입 경로 폭은 어떤 기준과도 빼지 않고 입력한 값만 상담 기록에 옮깁니다.</p>
    </GuidePart>

    <GuidePart title="재는 방법과 입력 규칙">
      <GuideList items={[
        '모든 칸의 단위는 mm입니다. 줄자의 cm 눈금을 읽었다면 10을 곱해 105cm는 1050으로 적습니다.',
        '소수는 첫째 자리까지만 받습니다(1050.5). 쉼표는 1,050처럼 세 자리마다 찍은 것만 읽고, 1,05처럼 자리가 맞지 않으면 오류로 표시합니다.',
        '0보다 크고 20,000 이하만 계산합니다. 비워 둔 칸은 0이 아니라 ‘아직 재지 않음’으로 남아 차이를 내지 않습니다.',
        '뒷벽 거리는 냉장고 뒷면이 닿을 벽에서 출발해 식탁·아일랜드처럼 가장 먼저 걸리는 물건까지 잽니다. 놓인 냉장고 앞면에서 재면 본체 깊이만큼 짧은 값이 들어갑니다.',
        '문 개방 폭은 냉장고장 안쪽 폭과 따로 잽니다. 장 밖으로 문이 펼쳐질 구역에서 가장 좁은 곳이 기준입니다.',
      ]} />
    </GuidePart>

    <GuidePart title="예시 계산" wide>
      <GuideExample title={`${scene.title} × ${product.brandLabel} ${product.modelNumber}`}>
        <p>도구의 예시 주방 치수를 이 모델 기준에 넣은 결과입니다. 주방 치수는 가상의 값이고, 모델 치수는 위 설명서 값입니다.</p>
        <GuideTable caption="예시 주방 치수와 모델 기준의 차이" head={['항목', <>입력 <ValueBadge kind="example" /></>, <>기준 <ValueBadge kind="calculated" /></>, <>차이 <ValueBadge kind="calculated" /></>]} rows={COMPARED.map((key) => {
          const value = parseFitMeasurement(scene.inputs[key]);
          const mm = value.kind === 'value' ? value.mm : 0;
          return [labelOf(key), `${formatMm(mm)}mm`, `${basisText[key]} = ${formatMm(target[key])}mm`, margin(fitMargin(product, key, mm))];
        })} />
        {clearance && <p>뒷벽 거리 {formatMm(Number(scene.inputs.frontDistance))}mm에서 닫힌 본체 앞면까지 남는 거리는 {formatMm(clearance.closed)}mm, 문을 연 끝부터는 {formatMm(clearance.open)}mm입니다. 반입 경로 {formatMm(Number(scene.inputs.routeWidth))}mm는 비교 없이 기록만 됩니다.</p>}
      </GuideExample>
    </GuidePart>

    <GuidePart title="자주 하는 오해">
      <GuideList items={[
        <><strong>네 칸이 모두 ‘큼’이면 놓을 수 있다?</strong> 기준에는 줄자 오차, 문짝이 그리는 궤적, 반입하며 돌리는 공간, 다리로 맞추는 수평 높이가 들어 있지 않습니다. 결과는 설치 가능 판정이 아니라 설치팀과 이야기할 치수 차이입니다.</>,
        <><strong>문 개방 폭과 깊이는 문을 연 사각형 하나다?</strong> {splitAngle.length ? `${splitAngle.map((entry) => entry.modelNumber).join(', ')}은(는) 폭과 깊이가 다른 각도의 도면에서 나온 값입니다. 두 값을 같은 순간의 점유 면적으로 겹쳐 읽지 마세요.` : '모든 모델의 폭과 깊이가 같은 각도 도면 값입니다.'}</>,
        <><strong>높이 칸을 통과하면 위쪽 여유도 충분하다?</strong> 본체 높이만 비교합니다. {topNotes.map(([brand, note]) => `${brand}: ${note}`).join(' ')}</>,
        <><strong>뒷벽 거리 기준을 넘으면 문 앞에 서서 꺼낼 수 있다?</strong> 기준은 문 끝이 닿는 지점까지입니다. 사람이 서거나 지나갈 폭은 정하지 않았으니 현장에서 따로 확인하세요.</>,
        <><strong>반입 경로도 통과 여부를 알려 준다?</strong> 경로 폭은 판정하지 않습니다. {transportNotes.map(([brand, note]) => `${brand}: ${note}`).join(' ')}</>,
      ]} />
    </GuidePart>
  </ToolGuide>;
}
