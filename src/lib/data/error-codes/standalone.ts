// 제품 없이 존재하는 에러코드.
//
// 왜 필요한가 — 지금까지 에러코드는 `appliance.errorCodes`로 제품에 붙어 있었다.
// 그 구조에서는 코드를 실으려면 제품을 먼저 만들어야 하는데, 보일러는 우리가 리뷰할
// 근거가 없다. 스펙도 가격도 모르면서 제품 페이지를 만들면 미검증 모델 40개를
// 반복하는 일이 된다(docs/model-number-audit.md).
//
// 그런데 코드를 정리해 줄 근거는 있다. 제조사가 제품군 단위로 공개한다. 애초에
// 에러코드는 모델보다 **제품군 단위 지식**이고, SK매직에서 "같은 문자라도 계열마다
// 뜻이 다르다"를 겪은 것도 같은 이야기다. 그래서 코드를 제품에서 떼어낸다.
//
// 여기 실린 문장은 제조사 문서를 그대로 옮긴 것이 아니다. 코드가 실재하는지와
// 무엇을 뜻하는지는 공식 문서로 확인하고(수집 도구: scripts/collect-kiturami.mjs),
// 설명은 우리가 썼다. 출처는 error-code-editorial.ts 에 있다.

import type { ErrorCode } from '@/types/appliance';

/** 이 코드가 어느 제품군에서 확인됐는지. 제품 상세로 보낼 링크가 없는 대신 이걸 보여 준다 */
export interface StandaloneErrorCode extends ErrorCode {
  /** 공식 자가진단 문서에서 이 코드가 실려 있던 제품군 이름 */
  productLines: string[];
}

export interface StandaloneErrorCodeGroup {
  /** allAppliances 의 brand 와 같은 네임스페이스를 쓴다 — 허브 URL이 /error-codes/{brand} 다 */
  brand: string;
  /** 가전 카테고리(ApplianceCategory)가 아닌 값도 들어온다. 앵커 슬러그는 아래 맵에서 준다 */
  category: string;
  entries: StandaloneErrorCode[];
}

/**
 * 제품 없는 카테고리의 앵커 슬러그.
 *
 * CATEGORY_SLUGS 는 제품 카테고리 전용이라 여기에 보일러를 끼워 넣으면 카테고리 랜딩과
 * 제품 필터까지 영향을 받는다. 에러코드 앵커에만 필요한 값이므로 따로 둔다.
 */
export const STANDALONE_CATEGORY_SLUGS: Record<string, string> = {
  가스보일러: 'gas-boiler',
  기름보일러: 'oil-boiler',
};

/**
 * 귀뚜라미 가스보일러.
 *
 * 근거: 귀뚜라미 공식 자가진단 매뉴얼(krb.co.kr/self)의 제품군별 에러코드 표.
 * 2026-09-16에 6개 제품군 페이지를 받아 코드를 대조했다 — 거꾸로IN, 거꾸로 IN AD,
 * 거꾸로IIHi, 4번 타는, 거꾸로 IoT 콘덴싱, AST 콘덴싱.
 *
 * 제품군마다 코드 집합이 다르다. 여기 싣는 것은 **여러 제품군에 공통으로 나오는 코드**이고,
 * 각 항목에 확인된 제품군을 적었다. AST 콘덴싱은 E001·E106처럼 세 자리 E 코드를 쓰는
 * 다른 체계라 이 목록에 섞지 않았다.
 */
const KITURAMI_GAS: StandaloneErrorCodeGroup = {
  brand: 'Kiturami',
  category: '가스보일러',
  entries: [
    {
      code: '01 / 02 / 03',
      description: '점화 실패 또는 점화 직후 안전차단 (불꽃 감지 이상)',
      cause:
        '불꽃이 감지되지 않아 보일러가 스스로 멈춘 상태입니다. 보일러 고장보다 가스가 안 들어오는 것 같은 외부 조건 때문에 일시적으로 나는 경우가 많습니다.',
      solution:
        '가스밸브가 잠겨 있지 않은지 먼저 확인하고, 실내 온도 조절기의 전원/재가동 버튼을 눌러 다시 켜 보세요. 도시가스 요금 미납이나 공사로 공급이 끊겼을 때도 같은 표시가 납니다. 재가동해도 반복되면 대리점이나 A/S센터(1588-9000)에 점검을 받으세요.',
      severity: 'medium',
      productLines: ['거꾸로IN', '거꾸로 IN AD', '거꾸로IIHi', '4번 타는', '거꾸로 IoT 콘덴싱'],
    },
    {
      code: '04 / 05',
      description: '온도센서·과열센서 이상',
      cause:
        '난방수 온도를 재는 센서나 과열을 감지하는 센서의 신호가 정상 범위를 벗어난 상태입니다. 제품군에 따라 05는 지진감지센서 작동이나 풍압 스위치 동작을 함께 뜻하기도 합니다.',
      solution:
        '사용자가 손볼 수 있는 부분이 아닙니다. 보일러 가동을 멈추고 A/S센터(1588-9000)에 점검을 요청하세요.',
      severity: 'high',
      productLines: ['거꾸로IN', '거꾸로IIHi', '4번 타는', '거꾸로 IoT 콘덴싱'],
    },
    {
      code: '06',
      description: '송·배풍기 회전수가 감지되지 않음',
      cause: '연소 공기를 보내고 배기를 빼내는 팬의 회전이 잡히지 않는 상태입니다.',
      solution:
        '가동을 멈추고 A/S센터(1588-9000)에 연락하세요. 배기가 제대로 빠지지 않는 상태로 계속 쓰면 위험합니다.',
      severity: 'high',
      productLines: ['거꾸로IN', '거꾸로 IN AD', '거꾸로IIHi', '4번 타는', '거꾸로 IoT 콘덴싱'],
    },
    {
      code: '07 / 10',
      description: '송·배풍기 회전수 이상 (너무 낮거나 높음)',
      cause:
        '송풍기 케이스에 이물질이 끼었거나, 연통이 바람을 심하게 받는 위치에 있을 때 납니다. 연통 굴곡부에 응축수가 고여도 같은 증상이 나타납니다.',
      solution:
        '자주 반복된다면 연통 위치가 문제일 수 있어 시공업체에 상담하세요. 굴곡부 응축수는 제거해야 합니다. 그 밖의 경우에는 가동을 멈추고 A/S센터(1588-9000)에 점검을 받으세요.',
      severity: 'medium',
      productLines: ['거꾸로IN', '거꾸로 IN AD', '거꾸로IIHi', '4번 타는', '거꾸로 IoT 콘덴싱'],
    },
    {
      code: '08',
      description: '실내 온도 조절기 통신 이상',
      cause:
        '조절기와 본체 사이 통신이 끊긴 상태입니다. 연결 배선이 10m를 넘거나 고압선·전화선과 닿아 있을 때 생길 수 있습니다.',
      solution:
        '배선이 AC 220V 전선이나 매설 배관과 같은 관에 들어가 있지 않은지, 피복이 벗겨진 곳은 없는지 확인하세요. 배선을 손대야 하는 상황이라면 A/S센터(1588-9000)에 맡기는 편이 안전합니다.',
      severity: 'medium',
      productLines: ['거꾸로IN', '거꾸로 IN AD', '거꾸로IIHi', '4번 타는', '거꾸로 IoT 콘덴싱'],
    },
    {
      code: '95 / 98',
      description: '보일러 내 물 부족 (자동 급수 동작)',
      cause: '난방수가 모자라 자동 급수가 도는 중입니다. 직수 배관 밸브가 닫혀 있으면 보충이 안 됩니다.',
      solution:
        '직수 배관 밸브가 열려 있는지 확인하세요. 보충이 끝나면 저절로 정상 가동으로 돌아갑니다. 계속 해제되지 않고 물도 차지 않으면 A/S센터(1588-9000)에 문의하세요.',
      severity: 'low',
      productLines: ['거꾸로IN', '거꾸로 IN AD', '거꾸로IIHi', '4번 타는'],
    },
    {
      code: '96',
      description: '과열안전장치 작동 (난방수 온도가 너무 높음)',
      cause: '난방수 온도가 안전 범위를 넘어 보일러가 스스로 가동을 멈춘 상태입니다.',
      solution:
        '순환펌프가 돌면서 온도를 낮추므로 잠시 기다려 보세요. 계속 해제되지 않으면 반드시 A/S센터(1588-9000)에 점검을 받아야 합니다.',
      severity: 'medium',
      productLines: ['거꾸로IN', '거꾸로 IN AD', '거꾸로IIHi', '4번 타는'],
    },
    {
      code: '97',
      description: '공기량 부족·역풍 감지',
      cause: '연소에 필요한 공기가 모자라거나 역풍이 들어와 표시됩니다.',
      solution:
        '가스공급밸브를 잠그고 창문을 열어 실내를 충분히 환기하세요. 이때 다른 전원 코드를 꽂거나 전자레인지를 켜는 것, 담배·성냥·라이터처럼 불이 붙는 것을 쓰는 일은 절대 피해야 합니다. 환기 후에도 표시가 남으면 A/S센터(1588-9000)에 연락하세요.',
      severity: 'high',
      productLines: ['거꾸로IN', '거꾸로 IN AD', '거꾸로IIHi', '4번 타는'],
    },
    {
      code: '21',
      description: '지진감지센서 작동',
      cause: '지진이 감지되면 보일러가 안전을 위해 가동을 멈춥니다.',
      solution:
        '지진 발생 시 대처 요령에 따라 몸의 안전을 먼저 챙기세요. 보일러는 상황이 정리된 뒤 확인하면 됩니다.',
      severity: 'high',
      productLines: ['거꾸로 IN AD', '거꾸로 IoT 콘덴싱'],
    },
  ],
};

/**
 * 귀뚜라미 AST 콘덴싱 가스보일러 — 세 자리 E 코드 체계.
 *
 * 위 목록과 같은 브랜드·같은 연료지만 코드 체계가 완전히 다르다. 숫자 두 자리(01·95)를
 * 쓰는 구형과 섞으면 "귀뚜라미 06"을 찾는 사람에게 E106을 보여 주게 되므로 항목을 나눴다.
 * 화면에서는 같은 '가스보일러' 카테고리 안에 들어가되, 각 항목의 확인된 제품군이
 * 'AST 콘덴싱'으로 찍힌다.
 *
 * ⚠️ 공식 페이지에 조치 문구가 어긋난 항목이 있다. E204/E214/E224/E234는 제목이
 * "수온·출탕·축열·직수 센서 이상"인데 조치 설명은 송풍기 회전수 이야기를 한다
 * (krb.co.kr/self/10759 의 JSON-LD 원문에도 그대로 들어 있어 수집 오류가 아니다).
 * 어느 쪽이 맞는지 우리가 판정할 수 없으므로, 두 경우에 공통으로 맞는 조치
 * — 가동 중단과 서비스 접수 — 만 싣고 원인 서술은 코드 제목을 따른다.
 */
const KITURAMI_GAS_AST: StandaloneErrorCodeGroup = {
  brand: 'Kiturami',
  category: '가스보일러',
  entries: [
    {
      code: 'E001 / E002 / E003',
      description: '점화 실패·의사화염·실화 (AST 콘덴싱)',
      cause: '불꽃 감지에 이상이 생겨 점화되지 않거나, 점화 직후 안전차단이 걸린 상태입니다.',
      solution:
        '가스밸브가 잠겨 있지 않은지 확인하고 실내 온도 조절기의 전원/재가동 버튼을 눌러 보세요. 외부 조건 때문에 일시적으로 나는 경우가 많습니다. 반복되면 A/S센터(1588-9000)에 점검을 받으세요.',
      severity: 'medium',
      productLines: ['AST 콘덴싱'],
    },
    {
      code: 'E106',
      description: '송풍기(FAN) 회전수 미감지 (AST 콘덴싱)',
      cause: '연소 공기를 보내는 팬의 회전이 잡히지 않는 상태입니다.',
      solution:
        '전원/재가동 버튼으로 한 번 다시 켜 보고, 같은 표시가 남으면 가동을 멈추고 A/S센터(1588-9000)에 연락하세요.',
      severity: 'high',
      productLines: ['AST 콘덴싱'],
    },
    {
      code: 'E107 / E110',
      description: '송풍기 회전수 기준 초과·미달 (AST 콘덴싱)',
      cause: '팬이 기준 회전수보다 빠르거나 느리게 도는 상태입니다.',
      solution: '보일러 가동을 멈추고 A/S센터(1588-9000)에 점검을 요청하세요.',
      severity: 'high',
      productLines: ['AST 콘덴싱'],
    },
    {
      code: 'E204 / E214 / E224 / E234',
      description: '수온·출탕·축열·직수 센서 이상 (AST 콘덴싱)',
      cause:
        '코드별로 난방수 온도, 출탕 온도, 축열, 직수 쪽 센서를 가리킵니다. 제조사 안내에 조치 설명이 송풍기 항목과 뒤섞여 있어, 여기서는 코드 제목이 가리키는 범위까지만 적습니다.',
      solution:
        '사용자가 확인할 수 있는 부분이 아닙니다. 보일러 가동을 멈추고 A/S센터(1588-9000)에 점검을 요청하세요.',
      severity: 'high',
      productLines: ['AST 콘덴싱'],
    },
    {
      code: 'E294 / E495',
      description: '수위봉 이상·저수위 감지 (AST 콘덴싱)',
      cause: '보일러 내 물이 부족한 상태입니다. 부족하면 자동으로 급수가 돌고, 보충이 끝나면 정상 가동으로 돌아갑니다.',
      solution:
        '잠시 기다려 보세요. 표시가 계속되고 물도 차지 않으면 A/S센터(1588-9000)에 연락하세요.',
      severity: 'low',
      productLines: ['AST 콘덴싱'],
    },
    {
      code: 'E297',
      description: '가스 누설 감지 (AST 콘덴싱)',
      cause: '귀뚜라미 가스보일러에 들어 있는 가스 감지 기능이 작동한 상태입니다.',
      solution:
        '가스 밸브를 잠그고 창문을 열어 실내를 충분히 환기하세요. 표시가 계속되면 실내 전화가 아니라 바깥 전화로 가스회사나 A/S센터(1588-9000)에 연락해야 합니다. 실내에서 전기 기기를 조작하는 것 자체가 점화원이 될 수 있습니다.',
      severity: 'high',
      productLines: ['AST 콘덴싱'],
    },
    {
      code: 'E396 / E399',
      description: '과열센서 이상·수온센서 과열 (AST 콘덴싱)',
      cause: '난방수 온도가 안전 범위를 넘어 과열안전장치가 작동한 상태입니다.',
      solution:
        '순환펌프가 돌면서 온도를 낮추므로 잠시 기다려 보세요. 해제되지 않으면 A/S센터(1588-9000)에 점검을 받으세요.',
      severity: 'medium',
      productLines: ['AST 콘덴싱'],
    },
    {
      code: 'E491',
      description: '단수 확인 (AST 콘덴싱)',
      cause: '저수위 상태가 5분 넘게 이어질 때 표시됩니다.',
      solution: '집 전체가 단수인지 먼저 확인하세요. 단수가 아니라면 A/S센터(1588-9000)에 문의하세요.',
      severity: 'medium',
      productLines: ['AST 콘덴싱'],
    },
    {
      code: 'E508',
      description: '통신 이상 (AST 콘덴싱)',
      cause: '실내 온도 조절기와 본체 사이 통신이 끊긴 상태입니다.',
      solution: '보일러 가동을 멈추고 A/S센터(1588-9000)에 연락하세요.',
      severity: 'medium',
      productLines: ['AST 콘덴싱'],
    },
    {
      code: 'E621',
      description: '지진 감지 (AST 콘덴싱)',
      cause: '지진이 감지되면 보일러가 안전을 위해 가동을 멈춥니다.',
      solution: '지진 대처 요령에 따라 몸의 안전을 먼저 챙기고, 상황이 정리된 뒤 보일러를 확인하세요.',
      severity: 'high',
      productLines: ['AST 콘덴싱'],
    },
    {
      code: 'E622',
      description: '응축수 배출구 막힘 (AST 콘덴싱)',
      cause: '응축수 트랩 내부가 이물질로 막혔거나 배수가 원활하지 않은 상태입니다.',
      solution:
        '응축수 배출구를 살펴 물이 제대로 빠지고 있는지 확인하세요. 막힌 곳을 찾지 못하거나 손대기 어려우면 A/S센터(1588-9000)에 문의하세요.',
      severity: 'medium',
      productLines: ['AST 콘덴싱'],
    },
    {
      code: 'E743',
      description: '시운전 이상 (AST 콘덴싱)',
      cause: '시운전 모드가 2시간 넘게 이어질 때 표시됩니다.',
      solution:
        '물 보충이 제대로 되는지, 배관에 누수가 없는지 확인하세요. 원인을 찾지 못하면 A/S센터(1588-9000)에 문의하세요.',
      severity: 'medium',
      productLines: ['AST 콘덴싱'],
    },
  ],
};

/**
 * 경동나비엔 가스보일러.
 *
 * 근거: 나비엔하우스 자가진단 가이드(navienhouse.com/support/guide/list/3210)의
 * '에러 관련' 항목 13건. 2026-09-16에 하나씩 열어 증상·예상 원인·조치를 확인했다.
 *
 * ⚠️ 나비엔은 **같은 고장을 세대별로 다르게 표시한다** — Er51과 E351이 같은 저수위이고,
 * Er03·E3·E003이 모두 같은 불착화다. 보일러를 쓰는 사람은 자기 조절기에 뜬 글자
 * 그대로 검색하므로 표기를 전부 적는다. 하나만 적으면 나머지로 찾는 사람을 놓친다.
 *
 * 겨울에 몰리는 코드가 많다(직수배관 동결, 응축수 호스 결빙, 난방수 0도). 동절기와
 * 그 밖의 계절에 조치가 갈리는 항목은 그 갈림을 그대로 적었다.
 */
const NAVIEN_GAS: StandaloneErrorCodeGroup = {
  brand: 'Navien',
  category: '가스보일러',
  entries: [
    {
      code: 'Er03 / E3 / E003',
      description: '점화 실패 (불착화)',
      cause: '연소가 시작되지 않는 상태입니다. 집에 가스가 들어오지 않거나, 점화 관련 부품에 문제가 생긴 경우입니다.',
      solution:
        '가스레인지를 켜 보면 집 전체 가스 공급 여부를 바로 알 수 있습니다. 불이 안 붙으면 밸브 잠김·요금 미납·공사로 공급이 끊긴 것이니 그쪽을 먼저 해결하세요. 가스는 정상인데 보일러만 점화되지 않으면 부품 문제라 A/S가 필요합니다. 고객상담센터 1588-1144.',
      severity: 'medium',
      productLines: ['가스보일러'],
    },
    {
      code: 'Er02',
      description: '저수위 (개방식)',
      cause:
        '보일러 내부 물이 부족한 상태입니다. 겨울철 직수(냉수)배관 동결, 단수, 직수 밸브 잠김, 또는 물 보충 부품 이상이 원인입니다.',
      solution:
        '싱크대나 욕실에서 찬물이 나오는지 확인하세요. 안 나오면 단수이고, 단수가 풀리면 물 보충이 자동으로 진행됩니다. 찬물은 나오는데 보일러만 보충이 안 되면 직수 밸브가 잠겼는지 보세요 — 배관과 나란히 일자면 열린 상태, 직각이면 잠긴 상태입니다. 겨울이라면 배관 동결부터 의심해야 합니다. 고객상담센터 1588-1144.',
      severity: 'medium',
      productLines: ['가스보일러', '기름보일러'],
    },
    {
      code: 'Er51 / E351',
      description: '물 부족 상태에서 5분 안에 보충 실패',
      cause:
        '저수위인데 물이 채워지지 않는 상태입니다. 직수배관 동결, 단수, 직수 밸브 잠김, 또는 본체·난방배관 누수가 원인입니다.',
      solution:
        'Er02와 같은 순서로 확인하세요 — 찬물이 나오는지, 직수 밸브가 열려 있는지, 겨울이면 배관이 얼지 않았는지. 물이 계속 새는 소리가 나거나 보일러 주변이 젖어 있다면 누수이므로 직접 손대지 말고 A/S를 부르세요. 고객상담센터 1588-1144.',
      severity: 'medium',
      productLines: ['가스보일러'],
    },
    {
      code: 'Er28 / E228',
      description: '물 부족 또는 누수로 인한 잦은 물 보충',
      cause:
        'Er51과 같은 저수위 계열이지만, 누수 때문에 물 보충이 지나치게 자주 일어나는 경우도 여기에 걸립니다.',
      solution:
        '직수 공급(단수·밸브·동결)을 먼저 확인하고, 그쪽이 정상인데도 반복된다면 누수를 의심해야 합니다. 보일러 본체 아래나 난방배관 주변이 젖어 있는지 살펴보고 A/S를 접수하세요. 고객상담센터 1588-1144.',
      severity: 'medium',
      productLines: ['가스보일러'],
    },
    {
      code: 'Er50 / E250',
      description: '난방수 온도가 0도 이하로 감지됨',
      cause: '난방배관이 얼었거나 온도 감지 부품에 이상이 생긴 상태입니다.',
      solution:
        '겨울철에 이 표시가 뜨면 동결을 먼저 의심하세요. 배관이 언 상태로 계속 가동하면 배관이 터질 수 있습니다. 해빙이 필요하면 무리하게 열을 가하지 말고 A/S에 문의하세요. 고객상담센터 1588-1144.',
      severity: 'high',
      productLines: ['가스보일러'],
    },
    {
      code: 'Er49 / E049',
      description: '난방수가 순환하지 않음',
      cause:
        '난방 분배기 밸브가 모두 잠겼거나, 배관이 막혔거나 난방수가 오염된 경우입니다. 겨울에는 배관 동결도 원인이 됩니다.',
      solution:
        '난방 분배기(보통 베란다나 다용도실에 있는 여러 개의 밸브 뭉치)에서 밸브가 전부 잠겨 있지 않은지 확인하세요. 한두 개라도 열려 있어야 물이 돕니다. 밸브가 정상인데도 같은 표시가 나면 배관 막힘이나 난방수 오염일 수 있어 점검이 필요합니다. 고객상담센터 1588-1144.',
      severity: 'medium',
      productLines: ['가스보일러'],
    },
    {
      code: 'Er24 / E324',
      description: '난방배관 순환 이상',
      cause: '난방 분배기 밸브 잠김, 배관 막힘, 난방수 오염, 또는 부품 이상입니다.',
      solution:
        '분배기 밸브가 모두 잠겨 있지 않은지 확인하세요. 밸브를 열어도 해결되지 않으면 배관 막힘이나 난방수 오염일 수 있습니다. 고객상담센터 1588-1144.',
      severity: 'medium',
      productLines: ['가스보일러'],
    },
    {
      code: 'Er25 / E325',
      description: '난방배관 순환 이상',
      cause:
        'Er24와 같은 계열의 순환 문제입니다. 분배기 밸브 잠김, 배관 막힘, 난방수 오염, 부품 이상이 원인입니다.',
      solution:
        '분배기 밸브부터 확인하고, 정상이라면 배관·난방수 쪽 점검이 필요합니다. 고객상담센터 1588-1144.',
      severity: 'medium',
      productLines: ['가스보일러'],
    },
    {
      code: 'Er54 / E154',
      description: '응축수 배출 불량',
      cause: '응축수 호스가 꺾이거나 막힌 상태입니다. 겨울에는 호스가 얼어서 막히기도 합니다.',
      solution:
        '보일러에서 나오는 응축수 호스가 눌리거나 꺾인 곳이 없는지 살펴보세요. 겨울철이라면 호스가 얼었을 수 있습니다. 호스를 바로잡아도 해결되지 않으면 부품 문제이므로 A/S가 필요합니다. 고객상담센터 1588-1144.',
      severity: 'medium',
      productLines: ['가스보일러'],
    },
    {
      code: 'Er26 / E026',
      description: '버너 이상',
      cause: '연소를 담당하는 버너 쪽에서 이상이 감지된 상태입니다.',
      solution:
        '사용자가 확인할 수 있는 부분이 아닙니다. 고객상담센터(1588-1144)에 점검을 요청하세요.',
      severity: 'high',
      productLines: ['가스보일러'],
    },
    {
      code: 'Er29 / E255',
      description: '삼방밸브 이상',
      cause:
        '난방과 온수 중 어느 쪽으로 열을 보낼지 전환하는 부품(삼방밸브)에 이상이 감지된 상태입니다. 집 안 난방 분배기 밸브가 전부 잠겨 있을 때도 나타납니다.',
      solution:
        '먼저 난방 분배기 밸브가 모두 잠겨 있지 않은지 확인하세요. 밸브가 정상인데도 표시가 남으면 부품 점검이 필요합니다. 고객상담센터 1588-1144.',
      severity: 'medium',
      productLines: ['가스보일러'],
    },
    {
      code: 'Er407',
      description: '온수온도센서 이상',
      cause: '물 온도를 감지하는 센서에 문제가 생긴 상태입니다.',
      solution:
        '센서 교체가 필요한 경우가 많아 자가 조치 대상이 아닙니다. 고객상담센터(1588-1144)에 점검을 요청하세요.',
      severity: 'medium',
      productLines: ['가스보일러'],
    },
    {
      code: 'E594 / E615',
      description: '컨트롤러(제어장치) 이상',
      cause: '보일러 내부 제어장치에서 이상이 감지된 상태입니다.',
      solution:
        '제어장치는 사용자가 다룰 수 없습니다. 가동을 멈추고 고객상담센터(1588-1144)에 접수하세요.',
      severity: 'high',
      productLines: ['가스보일러'],
    },
  ],
};

export const STANDALONE_ERROR_CODE_GROUPS: StandaloneErrorCodeGroup[] = [
  KITURAMI_GAS,
  KITURAMI_GAS_AST,
  NAVIEN_GAS,
];

/** 독립 에러코드를 가진 브랜드 목록 */
export function getStandaloneBrands(): string[] {
  return [...new Set(STANDALONE_ERROR_CODE_GROUPS.map((g) => g.brand))];
}

export function getStandaloneGroups(brand: string): StandaloneErrorCodeGroup[] {
  return STANDALONE_ERROR_CODE_GROUPS.filter((g) => g.brand === brand);
}
