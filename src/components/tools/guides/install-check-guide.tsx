import type { ReactNode } from 'react';
import { ValueBadge } from '@/components/tools/value-badge';
import { Formula, GuideExample, GuideList, GuidePart, GuideTable, SourceLink, ToolGuide } from '@/components/tools/tool-guide';
import { formatMm } from '@/lib/fridge-fit';
import { INSTALL_MODELS } from '@/lib/data/install-check';
import {
  checkInstall, INSTALL_CATEGORIES, INSTALL_EXAMPLES, installStatusCounts, SIDE_LABELS,
  type InstallCategory, type InstallCategoryId, type InstallCheck, type InstallModel,
} from '@/lib/install-check';

const H4 = ({ children }: { children: ReactNode }) => <h4 className="pt-2 text-base font-bold text-gray-900">{children}</h4>;
const join = (items: string[]) => items.join(', ');

function referenceCell(check: InstallCheck): ReactNode {
  if (check.kind === 'manual') return <>계산 안 함 <ValueBadge kind="unverified" /></>;
  return <>{check.formula}{check.missingSides?.length ? <span className="mt-1 block text-xs text-gray-600">더하지 않은 면: {check.missingSides.map((side) => SIDE_LABELS[side]).join('·')}</span> : null}</>;
}

function differenceCell(check: InstallCheck): string {
  if (check.kind === 'manual') return '비교하지 않음';
  if (check.difference === undefined) return '미측정';
  return check.message.split(' · ')[0];
}

/** 품목마다 다른 재는 법·식·예시·오해. 모델 이름과 수치는 데이터에서 읽는다. */
function measuring(id: InstallCategoryId, models: InstallModel[]): ReactNode[] {
  const has = (model: string) => models.some((entry) => entry.model === model);
  const topConfirmed = models.filter((entry) => entry.clearances.some((c) => c.side === 'top' && c.status === 'confirmed' && entry.manualFound));
  switch (id) {
    case 'washer': return [
      '세탁기 뒷면이 닿을 벽을 0으로 두고 잽니다. 수전 손잡이, 배수구 덮개, 걸레받이처럼 벽에서 튀어나온 것이 있으면 그 앞면이 실제 출발점입니다.',
      '앞쪽 거리는 세탁실 문이나 맞은편 벽까지입니다. 문을 열어 둔 채로는 쓸 수 없는 집이 많으니 문을 닫은 상태에서 잰 값을 넣으세요.',
      `위쪽 높이는 선반·수납장·수도꼭지 가운데 가장 낮은 곳까지입니다. 위 여유가 원문에서 확인된 모델은 ${join(topConfirmed.map((entry) => entry.model)) || '없습니다'}${topConfirmed.length ? '뿐입니다' : ''}.`,
      ...(has('WF24A9500KE') ? ['세탁기 위에 건조기를 올리는 직렬 설치는 키트 높이와 전체 높이가 원문에 없어 계산하지 않습니다. 이 칸은 한 대의 높이만 비교합니다.'] : []),
    ];
    case 'purifier': return [
      '조리대 위에 올리므로 높이의 바닥은 조리대 윗면입니다. 상부장 아래에 조명·손잡이가 내려와 있으면 그 아랫면까지 잽니다.',
      '깊이는 뒤쪽 벽 타일(또는 백스플래시) 앞면에서 조리대 앞 모서리까지입니다. 수전 분기 배관이 벽에서 나와 있으면 그 앞부터 셉니다.',
      '폭은 싱크볼 가장자리·옆 가전·벽 사이의 빈 조리대 길이입니다. 코웨이·LG 설명서는 물이 튀는 곳을 피하라고 적어, 싱크볼 바로 옆이라면 그 점도 상담 때 물어보세요.',
      '콘센트 위치도 함께 적어 두세요. 세 설명서 모두 다른 제품과 콘센트를 나눠 쓰지 말라고 적습니다.',
    ];
    case 'aircon': return [
      '실내기 벽면 폭은 실내기를 걸 높이에서 잽니다. 바닥 근처가 넓어도 천장 가까이에 커튼박스·붙박이장이 있으면 그 사이가 실제 폭입니다.',
      '세로 공간은 천장(몰딩 아래)부터 창틀 윗면·가구 윗면처럼 아래에서 처음 걸리는 곳까지입니다. 실내기 아래 여유는 지원 모델 어디에서도 수치를 찾지 못했습니다.',
      '실외기실이라면 루버(창)가 있는 쪽이 앞입니다. 실외기를 둘 받침면에서 위쪽 선반·천장까지가 높이입니다.',
      '높이차는 실내기를 걸 높이와 실외기 받침면 높이의 차이입니다. 다른 층에 둔다면 층 높이까지 더해 mm로 넣으세요.',
    ];
    case 'robot': return [
      '스테이션은 벽에 붙여 두므로 폭은 벽을 따라, 깊이는 벽에서 정면으로 잽니다. 소파·식탁 다리처럼 낮은 물체도 로봇의 출입을 막으니 장애물로 셉니다.',
      '위쪽 높이는 콘솔·선반 아래에 넣을 때만 잽니다. 위가 비어 있으면 비워 두세요.',
      '문턱은 바닥재 윗면에서 문턱 꼭대기까지 잽니다. 두 단으로 된 이중 문턱이면 바닥에서 가장 높은 곳까지입니다.',
      ...(has('Qrevo Curv') ? ['Qrevo Curv는 둘레 여유 대신 확보할 공간의 바깥 치수가 있어, 잰 공간을 그 치수와 바로 비교합니다.'] : []),
    ];
  }
}

function formulas(id: InstallCategoryId): string[] {
  switch (id) {
    case 'washer': return ['자리 폭 기준 = 왼쪽 여유 + 본체 폭 + 오른쪽 여유', '앞쪽 거리 기준 = 뒤 여유 + 본체 깊이 + 앞 여유(확인된 경우만)', '문 앞 기준 = 뒤 여유 + 문을 연 깊이(문을 연 깊이가 확인된 모델만)', '높이 기준 = 본체 높이 + 위 여유(확인된 경우만)'];
    case 'purifier': return ['놓을 자리 폭 기준 = 왼쪽 여유 + 본체 폭 + 오른쪽 여유', '조리대 깊이 기준 = 뒤 여유 + 본체 깊이', '상부장까지 높이 기준 = 본체 높이 + 위 여유(확인된 경우만)'];
    case 'aircon': return ['실내기 벽면 폭 기준 = 왼쪽 여유 + 실내기 폭 + 오른쪽 여유', '세로 공간 기준 = 아래 여유 + 실내기 높이 + 위 여유', '실외기 폭·깊이·높이 기준 = 실외기 치수 + 같은 방향의 확인된 여유', '높이차 차이 = 설명서의 최대 높이차 − 잰 높이차'];
    case 'robot': return ['스테이션 폭 기준 = 왼쪽 여유 + 스테이션 폭 + 오른쪽 여유', '벽~앞 장애물 기준 = 뒤 여유 + 스테이션 깊이 + 앞 여유', '확보 공간이 있는 모델: 기준 = 원문의 공간 외곽 치수(여유를 더하지 않음)', '문턱 차이 = 넘을 수 있는 문턱 안내 값 − 잰 문턱 높이'];
  }
}

function myths(id: InstallCategoryId, models: InstallModel[]): ReactNode[] {
  const byModel = (model: string) => models.find((entry) => entry.model === model);
  switch (id) {
    case 'washer': {
      const noDoor = models.filter((entry) => entry.door && entry.door.openDepth === null);
      const withDoor = models.filter((entry) => entry.door && entry.door.openDepth !== null);
      return [
        <><strong>좌우 2cm만 띄우면 문도 열 수 있다?</strong> 좌우·뒤 여유는 본체를 놓는 자리의 조건입니다. 문을 연 깊이는 {join(withDoor.map((entry) => `${entry.model}(${formatMm(entry.door!.openDepth!)}mm)`)) || '어느 모델에도'}만 원문에 있고, {join(noDoor.map((entry) => entry.model))}은 찾지 못해 문 앞 비교를 하지 않습니다.</>,
        <><strong>직렬 설치 높이도 계산해 준다?</strong> 직렬 설치 키트의 품번·높이와 쌓은 뒤 전체 높이는 원문에 없습니다. 높이 칸은 한 대만 비교합니다.</>,
        <><strong>배수호스는 필요한 만큼 늘리면 된다?</strong> 삼성 세탁기 설명서는 배수호스를 3 m 이상 연장하지 말라고 적고, 건조기 설명서는 호스 끝 높이가 90 cm를 넘지 않게 하라고 적습니다.</>,
      ];
    }
    case 'purifier': {
      const trouble = models.filter((entry) => entry.clearances.some((c) => c.troubleshooting));
      const lg = byModel('WD523ACB');
      return [
        <><strong>좌우 10cm는 설치 절의 조건이다?</strong> {join(trouble.map((entry) => entry.model))}의 좌우 수치는 설치 절이 아니라 고장 진단 절(소음 항목)에 있습니다. 공식 자료로 계산에 넣되 출처 절을 따로 표시합니다.</>,
        <><strong>상부장 아래 높이만 넉넉하면 된다?</strong> 위 여유가 원문에 있는 모델은 {lg ? `${lg.model}뿐이고, 그 기준도 상부장이 아니라 ‘천장’입니다` : '없습니다'}. 나머지는 본체 높이만 비교합니다.</>,
        <><strong>온수 배관에 연결해도 정수는 된다?</strong> 세 설명서 모두 냉수 배관(식수관)에 연결하라고 적습니다. 코웨이·SK매직은 온수에 연결하면 필터가 손상된다고 적습니다.</>,
      ];
    }
    case 'aircon': {
      const conflicts = models.filter((entry) => entry.clearances.some((c) => c.conflict));
      const noManual = models.filter((entry) => !entry.manualFound);
      return [
        <><strong>실외기 배관 쪽 옆면은 30cm면 된다?</strong> {join(conflicts.map((entry) => entry.model))} 설명서는 같은 책 안에서 설치도에 60cm, 본문에 30cm를 적습니다. 어느 쪽인지 알 수 없어 그 면은 계산에 넣지 않습니다.</>,
        <><strong>모든 모델의 간격 수치가 있다?</strong> 삼성 AR07A9170HCN은 별도 설치 안내서를 받지 못해, {join(noManual.map((entry) => entry.model))}은 설치 설명서를 찾지 못해 간격이 모두 확인 필요입니다. 이 모델들은 실내기·실외기 치수만 비교합니다.</>,
        <><strong>구성품 배관 3M·5M가 최대 배관 길이다?</strong> TCL 구성품 탭의 ‘구리 배관 3M 1개 / 5M 1개’는 들어 있는 부품 목록입니다. 최대 배관 길이는 어느 모델에서도 확인하지 못했습니다.</>,
        <><strong>실외기는 베란다 난간 바깥에 달아도 된다?</strong> 하이얼 설명서는 실외기를 베란다 바깥쪽이나 건물 외벽면에 설치하는 것을 불법이라고 적고, 삼성 설명서도 낙하 우려가 있는 곳을 피하라고 적습니다.</>,
      ];
    }
    case 'robot': {
      const envelope = models.find((entry) => entry.envelope);
      const noAxis = models.filter((entry) => entry.parts.some((part) => part.compare && part.width === null));
      return [
        ...(envelope ? [<><strong>{envelope.model}의 0.46m는 양옆에 띄울 거리다?</strong> 원문은 도크를 벽에 붙이고 높이 0.9m·폭 0.46m·깊이 1.2m의 공간을 확보하라고 적습니다. 도크를 포함한 공간의 바깥 치수라 도크 폭에 더하지 않습니다.</>] : []),
        ...(noAxis.length ? [<><strong>{join(noAxis.map((entry) => entry.model))}도 자리 크기를 계산해 준다?</strong> 스테이션 치수가 축 표기 없이 공개돼 폭·깊이·높이를 나눌 수 없어 계산하지 않습니다. 확인된 앞·위 여유만 보여 줍니다.</>] : []),
        <><strong>문턱 2cm는 RO585HGH 모델의 값이다?</strong> LG 제품 페이지 FAQ는 모델번호가 아니라 라인명 ‘R5’로 적습니다. 설명서를 찾지 못한 모델이라 이 값은 확인 필요로 두고 비교하지 않습니다.</>,
        <><strong>유럽판 설명서의 전원 사양이 국내판과 같다?</strong> 로보락 두 모델의 도크 전원 값은 CE판 기준이고, 국내판 도크 모델명은 확인하지 못했습니다.</>,
      ];
    }
  }
}

function CategoryGuide({ category, models }: { category: InstallCategory; models: InstallModel[] }) {
  const example = INSTALL_EXAMPLES[category.id];
  const exampleModel = models.find((entry) => entry.model === example.model) ?? models[0];
  const exampleChecks = checkInstall(exampleModel, example.inputs);
  const axisFields = category.fields.filter((field) => field.measure.type === 'axis');
  const doorField = category.fields.find((field) => field.measure.type === 'axis' && field.measure.door);
  return <GuidePart title={`${category.label}: 재는 곳과 기준`} wide>
    <div className="grid grid-cols-1 gap-x-12 gap-y-4 lg:grid-cols-2">
      <div className="min-w-0 space-y-3">
        <H4>재는 방법</H4>
        <GuideList items={measuring(category.id, models)} />
      </div>
      <div className="min-w-0 space-y-3">
        <H4>이 품목의 계산식</H4>
        {formulas(category.id).map((line) => <Formula key={line}>{line}</Formula>)}
      </div>
    </div>
    <H4>모델별 기준</H4>
    <GuideTable caption={`${category.label} 모델별 비교 기준과 더하지 않은 면`} head={['모델', ...axisFields.map((field) => <>{field.label} <ValueBadge kind="calculated" /></>), ...(doorField ? [<>문 앞 기준 <ValueBadge kind="calculated" /></>] : [])]} rows={models.map((model) => {
      const checks = checkInstall(model, {});
      return [
        `${model.name} ${model.model}`,
        ...axisFields.map((field) => referenceCell(checks.find((check) => check.id === field.key)!)),
        ...(doorField ? [(() => { const door = checks.find((check) => check.id === `${doorField.key}-door`); return door ? referenceCell(door) : '해당 없음'; })()] : []),
      ];
    })} />
    <H4>예시 계산</H4>
    <GuideExample title={`${example.title} × ${exampleModel.name} ${exampleModel.model}`}>
      <p>집 치수는 가상의 값이고, 기준은 이 모델의 원문 치수와 확인된 여유로 만든 값입니다.</p>
      <GuideTable caption={`${category.label} 예시 치수와 기준의 차이`} head={['칸', <>입력 <ValueBadge kind="example" /></>, <>기준 <ValueBadge kind="calculated" /></>, <>차이 <ValueBadge kind="calculated" /></>]} rows={exampleChecks.map((check) => [
        check.label,
        example.inputs[check.field] ? `${formatMm(Number(example.inputs[check.field]))}mm` : '비워 둠',
        check.kind === 'manual' ? <>계산 안 함 <ValueBadge kind="unverified" /></> : check.formula ?? `${formatMm(check.reference!)}mm`,
        differenceCell(check),
      ])} />
      {exampleChecks.some((check) => check.kind === 'short') && <p>음수가 된 칸({exampleChecks.filter((check) => check.kind === 'short').map((check) => check.label).join(', ')})은 확인 카드에 ‘기준보다 작음’으로 뜹니다. 나머지 칸이 남아도 설치할 수 있다는 뜻은 아닙니다.</p>}
    </GuideExample>
    <H4>자주 하는 오해</H4>
    <GuideList items={myths(category.id, models)} />
    <H4>원문</H4>
    <ul className="space-y-2">{models.map((model) => {
      const counts = installStatusCounts(model);
      return <li key={model.model} className="break-words">
        <SourceLink href={model.sourceUrl}>{model.name} {model.model}{model.manualFound ? ' 설명서' : ' 제품 페이지'}</SourceLink>
        <span className="block text-xs text-gray-600">{model.document} · {model.sourcePages} · 원문 확인 {model.checkedAt} · 공식 자료 {counts.confirmed}개 · 확인 필요 {counts.unverified}개{model.manualFound ? '' : ' · 공식 설치 설명서를 찾지 못함'}</span>
      </li>;
    })}</ul>
  </GuidePart>;
}

export function InstallCheckGuide({ models = INSTALL_MODELS }: { models?: InstallModel[] }) {
  const noManual = models.filter((model) => !model.manualFound);
  return <ToolGuide title="품목마다 무엇을 재고, 어떤 기준과 비교하나요?" lead={`세탁기·건조기, 정수기, 벽걸이 에어컨, 로봇청소기 스테이션의 ${models.length}개 모델을 한 확인표에서 다룹니다. 재는 곳은 품목마다 다르지만 기준을 만드는 규칙은 하나입니다. 원문에서 수치가 확인된 여유만 본체 치수에 더합니다.`}>
    <GuidePart title="네 품목에 같은 계산 규칙" wide>
      <Formula>기준 = 본체(실내기·실외기·스테이션) 치수 + 같은 방향에서 원문으로 확인된 여유</Formula>
      <Formula>차이 = 집에서 잰 공간 − 기준(음수면 그만큼 모자람, 0.1mm 단위)</Formula>
      <GuideList items={[
        '확인 필요인 면의 여유는 0으로 두지 않고 아예 식에서 뺍니다. 결과 칸 아래에 그 면을 적어, 차이가 그 면에서는 본체 끝까지만 비교한 값이라는 점을 남깁니다.',
        '한 설명서 안에서 같은 면의 값이 엇갈리면 두 값과 쪽을 모두 보여 주고 어느 쪽도 계산에 쓰지 않습니다.',
        '고장 진단 절에만 나오는 간격 수치는 제조사 원문이라 공식 자료로 계산에 넣되, 설치 절의 조건과 섞이지 않도록 ‘고장 진단 절의 안내’라고 표시합니다.',
        `${noManual.length ? `${join(noManual.map((model) => model.model))}은 공식 설치 설명서를 찾지 못했습니다. 제품 페이지 사양 값만 공식 자료로 쓰고 간격·조건은 확인 필요로 둡니다.` : '모든 모델의 설치 설명서를 확보했습니다.'}`,
        '어느 칸도 설치할 수 있다고 판정하지 않습니다. 반입 경로, 벽 재질, 배관·배선 경로, 수평 조절은 계산에 들어가지 않습니다.',
      ]} />
    </GuidePart>
    {INSTALL_CATEGORIES.map((category) => <CategoryGuide key={category.id} category={category} models={models.filter((model) => model.category === category.id)} />)}
  </ToolGuide>;
}
