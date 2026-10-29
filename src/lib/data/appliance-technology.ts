import type { ApplianceTechnologyGuide, GuideEvidence } from '@/lib/appliance-technology';
import { HOUSEHOLD_TECHNOLOGY_GUIDES } from './catalog-technology/household';
import { MEDIA_TECHNOLOGY_GUIDES } from './catalog-technology/media';

// 실제 모델 설명서 재수신과 대조: research/evidence/2026-10-28/appliance-technology-source-check.md
const manual = (location: string, pdfPage: number): GuideEvidence[] => [{ source: 'manual', location, pdfPage }];
const PILOT_TECHNOLOGY_GUIDES: ApplianceTechnologyGuide[] = [
  {
    modelNumber: 'CDW-A0611TW', slug: 'cuckoo-dishwasher-table-cdw61', title: '쿠쿠 6인용 식기세척기',
    question: '식기가 깨끗해지려면, 물이 어디까지 닿아야 할까?',
    introduction: '분사 노즐이 회전할 공간과 식기의 방향, 사용 후 필터·건조 관리를 함께 확인하세요.',
    diagramNote: '설명서에서 확인한 세척 조건과 관리 부품의 연결도입니다. 실제 배관 위치·물 순환 순서나 세척 성능을 재현하지 않았습니다.',
    defaultPart: 'spray',
    groups: [
      { title: '물이 닿는 세척 공간', description: '분사 노즐의 회전을 식기가 막지 않아야 합니다.', parts: ['spray', 'basket'] },
      { title: '사용 후 남는 찌꺼기와 습기', description: '필터 청소와 코스 후 문 열기는 별도로 챙깁니다.', parts: ['filter', 'drying'] },
    ],
    sources: [{ id: 'manual', label: '쿠쿠 공식 설명서', url: 'https://www.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/200424%3Dz0383-0082a0%20rev.1_cdw-a0611t.pdf', checkedAt: '2026-10-28' }],
    safetyNote: '청소 전 전원을 끄고 플러그를 분리하며, 코스 직후에는 내부 온도가 내려간 뒤 작업하세요. 노즐·필터의 분리와 재조립은 설명서 전체 절차를 확인하세요.',
    parts: [
      { id: 'spray', title: '분사 노즐', hint: '회전 공간', heading: '노즐이 돌아야 식기에 물이 닿습니다', how: '노즐의 구멍으로 물을 분사합니다. 설명서는 음식 찌꺼기로 구멍이 막혔는지와 재조립 후 회전을 확인하도록 안내합니다.', everyday: '수저나 작은 식기가 바스켓 아래로 빠져 노즐의 회전을 막지 않게 배치하세요.', care: '노즐 구멍의 막힘을 확인하고, 필요할 때 24쪽 절차로 청소·재조립합니다.', limit: '구멍 수나 회전만으로 오염별 세척력·살균율을 계산하지 않습니다.', evidence: manual('인쇄 18·24쪽', 18) },
      { id: 'basket', title: '식기 바스켓', hint: '겹침·방향', heading: '겹친 식기 안쪽까지 물이 닿는지 확인하세요', how: '설명서는 식기를 겹치지 않게 놓고 안쪽이 분사기 쪽을 향하게 배치하도록 안내합니다.', everyday: '6인용이라는 숫자보다 식기의 모양과 배치가 중요합니다. 큰 찌꺼기는 넣기 전에 제거하세요.', care: '수저 손잡이가 아래로 빠지거나 식기가 노즐의 회전을 방해하지 않는지 확인합니다.', limit: '표준 적재 수를 모든 그릇·냄비 조합의 수용량으로 해석하지 않습니다.', evidence: manual('인쇄 18~19쪽', 18) },
      { id: 'filter', title: '3종 필터', hint: '찌꺼기 거름', heading: '필터는 찌꺼기를 거르며, 직접 청소해야 합니다', how: '프리·마이크로·스테인리스 필터가 큰 찌꺼기와 작은 찌꺼기·이물을 거르는 역할을 나눕니다.', everyday: '자동으로 모든 찌꺼기가 사라지는 구조로 생각하지 마세요. 남은 음식물과 필터 상태를 확인해야 합니다.', care: '22~23쪽 전체 절차로 분리·세척·재조립합니다. 필터 없이 사용하거나 거꾸로 끼우지 않습니다.', limit: '설명서는 정기 청소를 안내하지만 이 절에는 고정 일수 주기가 없습니다.', evidence: manual('인쇄 22~23쪽', 22) },
      { id: 'drying', title: '코스 후 건조', hint: '수동 문 열기', heading: '코스가 끝나면 남은 습기도 챙기세요', how: '관리 절은 매번 사용 후 급수를 중지하고 문을 열어 내부를 말리는 방법을 안내합니다.', everyday: '자동 문 열림 기능으로 오해하지 말고 코스 종료 후 내부가 식으면 잔여 습기를 빼 주세요.', care: '뜨거운 내부가 충분히 식은 뒤 청소·관리하고, 도어 잠금장치에는 세제를 쓰지 않습니다.', limit: '문을 연다고 특정 시간 안에 완전 건조된다고 보장하지 않습니다.', evidence: manual('인쇄 24쪽', 24) },
    ],
    careItems: [
      { id: 'loading', title: '식기 적재와 노즐 회전 공간', timing: '사용 전 확인', description: '큰 찌꺼기를 제거하고 식기 겹침·수저 돌출이 노즐을 막지 않는지 확인하세요.', evidence: manual('인쇄 18~19쪽', 18) },
      { id: 'filters', title: '필터 청소와 재조립', timing: '정기 점검 · 고정 일수 미제시', description: '음식물을 제거하고 흐르는 물로 세척한 뒤 방향에 맞게 조립합니다. 거친 수세미로 손상시키지 마세요.', evidence: manual('인쇄 22~23쪽', 22) },
      { id: 'nozzle', title: '분사 노즐 구멍', timing: '막힘 여부 확인', description: '필요하면 설명서 순서로 분리·청소하고 다시 끼운 후 손으로 회전을 확인합니다.', evidence: manual('인쇄 24쪽', 24) },
      { id: 'vent', title: '코스 후 잔여 습기', timing: '매번 사용 후', description: '내부 온도가 충분히 내려간 뒤 문을 열어 내부를 말리는 관리 안내를 확인하세요.', evidence: manual('인쇄 24쪽', 24) },
    ],
  },
  {
    modelNumber: 'DV17A9720BV', slug: 'samsung-bespoke-grande-dv17a9720', title: '삼성 그랑데 AI 17kg 건조기',
    question: '옷에서 빠진 보풀과 물은 어디로 갈까?',
    introduction: '가열 방식과 별개로 필터·열교환기·물통을 관리해야 합니다. 서로 다른 청소 기준을 눌러 확인하세요.',
    diagramNote: '정확 모델의 건조 방식과 공용 설명서의 관리 부품을 묶은 기능 연결도입니다. 실제 공기·냉매 유로와 부품 배치는 재현하지 않았습니다.',
    defaultPart: 'filter',
    groups: [
      { title: '건조 공기와 보풀 관리', description: '가열 방식과 필터·열교환기의 역할을 구별합니다.', parts: ['heating', 'filter', 'exchanger'] },
      { title: '옷에서 빠진 물의 처리', description: '물통을 쓰는지 직배수로 설치했는지 먼저 확인하세요.', parts: ['water'] },
    ],
    sources: [
      { id: 'manual', label: '삼성 공식 공용 설명서', url: 'https://downloadcenter.samsung.com/content/UM/202504/20250401094234705/WM0013_IB_DV8700TK_DV19A9740_KO_250313.pdf', checkedAt: '2026-10-28' },
      { id: 'spec', label: 'DV17A9720BV 공식 사양', url: 'https://www.samsung.com/sec/support/model/DV17A9720BV/', checkedAt: '2026-10-28' },
    ],
    safetyNote: '청소·분리 작업은 전원을 끄고 플러그를 분리한 뒤 설명서 절차로 진행하세요. 열교환기는 날카로우므로 맨손으로 만지지 말고 핀을 변형시키지 마세요.',
    parts: [
      { id: 'heating', title: '히트펌프·히터', hint: '건조 방식', heading: '이 모델은 히트펌프와 히터를 함께 표기합니다', how: '정확 모델 공식 사양의 건조 방식은 인버터 히트펌프 + 히터입니다.', everyday: '히트펌프라는 이름만 보고 히터가 없거나 모든 코스가 같은 전기량을 쓴다고 해석하지 마세요.', care: '건조 방식과 별도로 필터·열교환기·응축수 관리를 챙겨야 합니다.', limit: '부품별 동작 시간·절전율·냉매 회로는 확인하지 못해 그림이나 숫자로 만들지 않았습니다.', evidence: [{ source: 'spec', location: '기본 사양 > 건조 방식' }] },
      { id: 'filter', title: '내부·외부 필터', hint: '매회 청소', heading: '일반 필터와 3차 필터의 청소 기준은 다릅니다', how: '문 쪽의 필터는 내부·외부 필터를 분리해 보풀을 제거하는 구조입니다. 설명서는 한 번 사용할 때마다 청소하도록 안내합니다.', everyday: '3차 필터의 25회 알림을 일반 필터 청소 주기로 적용하지 마세요.', care: '물로 씻었다면 완전히 말린 뒤 다시 조립하세요. 필터를 끼운 상태에서 세탁물을 넣고 뺍니다.', limit: '청소 알림이나 필터 상태만으로 남은 건조 시간·전기요금을 추정하지 않습니다.', evidence: manual('인쇄 66~68·79쪽', 66) },
      { id: 'exchanger', title: '열교환기·3차 필터', hint: '별도 관리', heading: '3차 필터가 있어도 열교환기는 확인해야 합니다', how: '마이크로 안심필터는 열교환기에 쌓이는 먼지를 줄이는 용도입니다. 설명서는 3차 필터 사용 시 25회마다 청소하도록 안내합니다.', everyday: '알림은 3차필터알림 설정 시 발생합니다. 알림을 켰는지와 부품을 실제 사용 중인지 함께 확인하세요.', care: '3차 필터 청소 때 열교환기도 확인하고 먼지가 있으면 설명서 절차로 청소하세요. 날카로운 핀에 주의하세요.', limit: '열교환기를 자동으로 청소해 주는 구조라고 표시하지 않습니다.', evidence: manual('인쇄 76~79쪽', 76) },
      { id: 'water', title: '물통·직배수', hint: '설치별 확인', heading: '물통을 쓴다면 매번 물을 비워야 합니다', how: '정확 모델 사양은 7L 내장 물통을 표기합니다. 공용 설명서는 물통 사용 시 매번 비우도록 안내하며 배수호스 설치도 별도로 다룹니다.', everyday: '직배수 연결 여부에 따라 물통을 비우는 일이 달라집니다. 우리 집 설치 상태부터 확인하세요.', care: '가득 찬 물통은 무거우므로 설명서에 따라 양손으로 수평을 유지해 꺼냅니다. 모인 물은 마시지 않습니다.', limit: '7L를 매 코스 발생하는 물의 양으로 해석하지 않습니다. 직배수 호스를 임의로 바꾸지 말고 설치 설명서를 확인하세요.', evidence: [{ source: 'spec', location: '외관 사양 > 물통' }, ...manual('인쇄 13~14·65쪽', 65)] },
    ],
    careItems: [
      { id: 'filter', title: '내부·외부 필터', timing: '한 번 사용할 때마다', description: '보풀을 제거하고 물 세척 후에는 완전히 말린 뒤 방향에 맞게 다시 끼우세요.', evidence: manual('인쇄 66~68쪽', 66) },
      { id: 'third', title: '3차 필터(마이크로 안심필터)', timing: '사용 중이라면 25회마다', description: '3차필터알림 설정 시 알림이 발생합니다. 청소할 때 열교환기도 확인하세요.', evidence: manual('인쇄 78~79쪽', 78) },
      { id: 'exchanger', title: '열교환기', timing: '청소 표시·먼지 상태 확인', description: '맨손으로 만지거나 핀을 변형시키지 말고 76~77쪽의 도구·절차를 확인하세요.', evidence: manual('인쇄 76~77쪽', 76) },
      { id: 'water', title: '물통', timing: '물통 사용 시 매번 비우기', description: '직배수 여부를 먼저 확인합니다. 물통을 쓴다면 꺼내는 방법과 물통 청소 절차를 함께 확인하세요.', evidence: manual('인쇄 65쪽', 65) },
    ],
  },
  {
    modelNumber: 'S8 Pro Ultra', slug: 'roborock-s8-proultra', title: '로보락 S8 Pro Ultra',
    question: '도크가 자동으로 관리해도, 내가 챙길 곳은 어디일까?',
    introduction: '본체에서 청소하는 부품과 도크에서 모아 두는 물·먼지를 나눠 확인하세요.',
    diagramNote: 'S8 Pro Ultra 공식 영문 설명서의 본체·도크 부품을 관리 역할별로 묶은 연결도입니다. 실제 내부 배관·공기 유로·부품 위치를 재현하지 않았습니다. 국내 동봉 설명서와 차이가 있으면 해당 설명서를 우선하세요.',
    defaultPart: 'filter',
    groups: [
      { title: '바닥을 청소하는 본체', description: '브러시·공기 필터·물걸레의 관리 기준이 다릅니다.', parts: ['brush', 'filter', 'mop'] },
      { title: '물과 먼지가 모이는 도크', description: '청수·오수와 물 필터·먼지봉투를 별도로 관리합니다.', parts: ['tanks', 'waterfilter', 'bag'] },
    ],
    sources: [{ id: 'manual', label: '로보락 공식 영문 설명서', url: 'https://support.roborock.com/hc/en-us/article_attachments/18342044174873', checkedAt: '2026-10-28' }],
    safetyNote: '청소·관리 전 전원을 끄고 플러그를 분리하라는 안전 안내를 확인하세요. 본체·도크 전체를 물로 씻지 말고 부품별 허용된 세척 방법을 따르세요.',
    parts: [
      { id: 'brush', title: '메인 브러시', hint: '엉킨 머리카락', heading: '자동 먼지비움이 브러시의 엉킴을 풀어 주지는 않습니다', how: '바닥의 먼지를 모으는 본체 메인 브러시와 끝부분에는 머리카락이 얽힐 수 있습니다.', everyday: '도크의 먼지봉투와 별도로 본체 브러시 상태를 확인해야 합니다.', care: '영문 설명서는 2주마다 청소·6~12개월 교체를 안내합니다. 분리·재조립은 C1 절을 확인하세요.', limit: '흡입 압력 수치만으로 머리카락 처리량이나 바닥별 청소율을 계산하지 않습니다.', evidence: manual('영문 10쪽 C1', 10) },
      { id: 'filter', title: '본체 세척 필터', hint: '공기 필터', heading: '본체 필터와 도크의 물 필터는 다릅니다', how: '먼지통의 세척 가능 필터는 본체 쪽 관리 대상입니다. 도크 세척부의 물 필터와 위치·용도가 다릅니다.', everyday: '물 필터를 청소했다고 본체의 먼지 필터까지 관리된 것으로 생각하지 마세요.', care: '2주마다 청소·6~12개월 교체 안내가 있습니다. 물 세척 후 24시간 충분히 말려 재장착합니다.', limit: '필터 표면을 손·브러시·단단한 물체로 문지르지 않습니다. 젖은 상태로 재장착하지 마세요.', evidence: manual('영문 11쪽 C6', 11) },
      { id: 'mop', title: 'VibraRise 물걸레', hint: '세척·건조', heading: '자동 걸레 세척과 걸레 교체는 별개입니다', how: 'VibraRise 물걸레는 도크의 세척 기능과 별도로 관리하는 소모품입니다.', everyday: '걸레가 더러우면 물걸레 청소 성능에 영향을 줄 수 있어 사용 전 상태를 확인하세요.', care: '설명서는 필요 시 세척·3~6개월 교체를 안내합니다. 손세척 후에는 자연 건조합니다.', limit: '걸레 홀더는 분리 불가라고 명시돼 있습니다. 분리되는 걸레와 홀더를 혼동하지 마세요.', evidence: manual('영문 5쪽 A4·11쪽 C7', 11) },
      { id: 'tanks', title: '청수·오수통', hint: '보충·비우기', heading: '이 도크는 청수 보충과 오수 비움이 필요합니다', how: '도크에는 청수통과 오수통이 있으며 물걸레 세척 등에 사용한 물을 따로 관리합니다.', everyday: '자동급배수 설치가 된 제품처럼 생각하지 말고 탱크 수위와 장착 상태를 확인하세요.', care: '청수는 필요에 따라 채우고 오수통은 필요 시 비우고 세척합니다. 도크를 물통 손잡이로 들어 옮기지 마세요.', limit: '이 설명서의 탱크형 도크를 다른 직배수·자동급배수 모델에 적용하지 않습니다.', evidence: manual('영문 6쪽 A10·11쪽 C10~C11·14쪽', 11) },
      { id: 'waterfilter', title: '도크 물 필터', hint: '세척부 거름', heading: '걸레를 씻는 도크에도 청소할 필터가 있습니다', how: '도크의 물 필터는 본체 먼지통 필터와 별개의 부품입니다.', everyday: '자동 걸레 세척이 있어도 세척부의 거름망과 물 필터는 점검해야 합니다.', care: '설명서 C13의 필요 시 청소 안내에 따라 세척·재조립하고, 물 필터 주변 세척부는 부드러운 마른 천으로 닦습니다.', limit: '공기 필터의 2주·24시간 건조 기준을 이 부품의 별도 교체 주기로 옮기지 않습니다.', evidence: manual('영문 11쪽 C13', 11) },
      { id: 'bag', title: '도크 먼지봉투', hint: '가득 차면 교체', heading: '자동 비움은 먼지를 도크 봉투로 옮기는 기능입니다', how: '본체 먼지통을 비운 먼지는 도크의 일회용 먼지봉투에 모입니다.', everyday: '먼지가 집 밖으로 사라지는 것이 아니므로 봉투가 찼는지 확인해야 합니다.', care: '설명서는 일회용 먼지봉투가 가득 차면 교체하도록 안내합니다.', limit: '집마다 발생하는 먼지가 달라 고정 사용 일수나 비움 횟수를 만들지 않았습니다.', evidence: manual('영문 12쪽 C14', 12) },
    ],
    careItems: [
      { id: 'brush', title: '메인 브러시', timing: '2주마다 청소 · 6~12개월 교체', description: '엉킨 머리카락과 끝부분의 이물을 확인하고 C1의 분리·재조립 안내를 따르세요.', evidence: manual('영문 10쪽 C1', 10) },
      { id: 'filter', title: '본체 세척 필터', timing: '2주마다 청소 · 6~12개월 교체', description: '물 세척했다면 24시간 충분히 건조합니다. 필터 표면을 브러시 등으로 문지르지 마세요.', evidence: manual('영문 11쪽 C6', 11) },
      { id: 'mop', title: '물걸레', timing: '필요 시 세척 · 3~6개월 교체', description: '걸레는 세척 후 자연 건조합니다. 분리 불가인 걸레 홀더를 억지로 떼지 마세요.', evidence: manual('영문 5·11쪽 A4·C7', 11) },
      { id: 'water', title: '오수통·도크 물 필터', timing: '필요 시 비우기·청소', description: 'C11·C13을 각각 확인합니다. 도크 전체를 젖은 천이나 물로 씻지 않습니다.', evidence: manual('영문 7·11쪽 C11·C13', 11) },
      { id: 'bag', title: '일회용 먼지봉투', timing: '가득 찼을 때 교체', description: '사용 일수가 아닌 실제 봉투 상태를 확인하고 C14 교체 절차를 따르세요.', evidence: manual('영문 12쪽 C14', 12) },
    ],
  },
];

export const APPLIANCE_TECHNOLOGY_GUIDES: ApplianceTechnologyGuide[] = [
  ...PILOT_TECHNOLOGY_GUIDES, ...HOUSEHOLD_TECHNOLOGY_GUIDES, ...MEDIA_TECHNOLOGY_GUIDES,
];

export function getApplianceTechnologyGuide(modelNumber: string): ApplianceTechnologyGuide | undefined {
  return APPLIANCE_TECHNOLOGY_GUIDES.find((guide) => guide.modelNumber === modelNumber);
}
