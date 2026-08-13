import type { BrandProfile } from '@/types/brand';

/**
 * 브랜드 프로필.
 *
 * 집필 순서가 정해져 있다 — LG·QCY를 먼저 써서 가장 큰 브랜드와 가장 작은 브랜드
 * 양극단에서 구조가 성립하는지 확인하고, 그 뒤 나머지를 3~4개씩 라운드로 검수받는다.
 * 한 번에 17개를 쏟아내지 않는다. 그것이 구글이 말하는 대량 생성 패턴이고,
 * 이 사이트가 애드센스에서 거절당한 이유와 같은 부류다.
 */
export const brandProfiles: BrandProfile[] = [
  {
    brand: 'LG',
    intro:
      'LG전자는 에어컨·세탁기·냉장고·청소기·공기청정기 등 생활가전 전 카테고리를 자체 라인업 브랜드로 나눠 판매한다. 라인업 이름은 카테고리별로 고정되어 있고, 오브제컬렉션은 특정 카테고리가 아니라 여러 제품군에 걸친 인테리어 디자인 컬렉션이다.',
    lines: [
      {
        name: '휘센',
        what: '에어컨과 제습기 라인. 스탠드·벽걸이 에어컨과 제습기가 이 이름으로 나온다.',
        categories: ['에어컨', '제습기'],
      },
      {
        name: '트롬',
        what: '세탁기·건조기·워시타워·워시콤보 라인.',
        categories: ['세탁기', '건조기'],
      },
      {
        name: '디오스',
        what: '냉장고·식기세척기·전자레인지·인덕션 등 주방 가전 라인.',
        categories: ['냉장고', '식기세척기'],
      },
      {
        name: '오브제컬렉션',
        what: '특정 카테고리가 아니라 에어컨·세탁기·냉장고·청소기·공기청정기 등 여러 제품군에 인테리어 디자인을 입힌 상위 라인이다. 휘센·트롬·디오스·퓨리케어·코드제로 제품에 함께 붙어 팔린다.',
      },
      {
        name: '퓨리케어',
        what: '공기청정기·정수기·가습기·서큘레이터(에어로타워) 등 공기·물 관련 라인.',
        categories: ['공기청정기', '정수기', '선풍기'],
      },
      {
        name: '코드제로',
        what: '로봇청소기·무선청소기 라인.',
        categories: ['로봇청소기'],
      },
    ],
    serviceCenter: {
      phone: '1544-7777',
      sourceUrl: 'https://www.lge.co.kr/support/notice-NTC20260806568003',
      note: 'LG전자 고객센터 대표번호. 전화상담·서비스 예약/접수 공용.',
    },
    errorCodePattern:
      '카테고리마다 표기 체계가 다르다. 에어컨은 "CH" 뒤에 두 자리 숫자를 스페이스로 구분해 붙이고(CH 01), 세탁기·건조기·식기세척기는 UE·OE·dE·IE처럼 대소문자를 섞은 알파벳 2~3자 약어를 쓰며, 로봇청소기는 코드 대신 "라이다(LDS) 센서 확인"처럼 점검 항목을 문장으로 표시한다.',
    editorNote:
      '카탈로그에 등록된 LG 제품은 에어컨·세탁기·건조기·냉장고·식기세척기·공기청정기·제습기·선풍기·정수기·로봇청소기·TV까지 11개 카테고리, 20개 모델로 가장 넓다. 오브제컬렉션이 붙은 제품이 다수를 차지해 인테리어 가전 수요가 카탈로그 구성에도 그대로 반영되어 있다.',
    sources: [
      {
        url: 'https://www.lge.co.kr/home',
        title: 'LGE.COM | LG전자',
        publisher: 'LG전자',
      },
      {
        url: 'https://www.lge.co.kr/support/notice-NTC20260806568003',
        title: '[안내] 8월 서비스센터 및 고객센터 휴무 안내',
        publisher: 'LG전자',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'QCY',
    intro:
      'QCY는 중국의 무선이어폰 제조사로, 국내에는 공식 수입사 와이엘사이언스가 운영하는 QCY STORE를 통해 정식 유통된다. 카탈로그에는 ANC 탑재 중가형 모델 1종만 등록되어 있지만, 실제 라인업은 T·HT·CT 세 시리즈로 나뉘어 보급형부터 상위 모델까지 이어진다.',
    lines: [
      {
        name: 'T 시리즈',
        what: '가장 저변이 넓은 보급형 무선이어폰 라인이다. T13처럼 색상 다양화를 앞세운 모델, T41 같은 오픈형, T43 같은 ENC 통화 노이즈 저감 모델까지 폼팩터가 다양하며 매년 여러 모델이 나온다.',
        categories: ['무선이어폰'],
      },
      {
        name: 'HT 시리즈',
        what: 'ANC(노이즈캔슬링)를 탑재한 중가형 라인으로, 대부분 "멜로버즈(MeloBuds)"라는 제품명을 함께 쓴다. 카탈로그의 멜로버즈 프로(HT08, 공식 판매명은 멜로버즈 프로 플러스)를 비롯해 Hi-Res LDAC를 지원하는 HT10, HT16, HT20(MeloBuds NEO)이 이 시리즈다.',
        categories: ['무선이어폰'],
      },
      {
        name: 'CT 시리즈',
        what: '오픈형(귀찌형) 디자인의 상위 라인이다. 대표 모델 CT06은 블루투스 6.0을 지원하며, 러닝·자전거 등 운동 중 착용을 겨냥한 이어커프 형태다.',
        categories: ['무선이어폰'],
      },
    ],
    serviceCenter: {
      phone: '02-853-1107',
      sourceUrl: 'https://ylshop.co.kr/',
      note: '제조사 직영 A/S가 아니라 국내 공식 수입사(주식회사 와이엘사이언스)를 통한 A/S다. 전화 상담은 평일 오전 10시~오후 4시(점심시간 11:40~13:00 제외)만 운영한다.',
    },
    errorCodePattern: '무선이어폰이라 별도 에러코드 체계 없이, 전용 앱과 LED 점멸 패턴으로 상태를 안내한다.',
    editorNote:
      '카탈로그에는 멜로버즈 프로(HT08) 1종만 등록되어 있다. 4만원대에 LDAC·하이브리드 ANC를 넣은 가성비형 모델로, QCY 라인업 전체에서는 ANC를 탑재한 중가형 HT 시리즈, 그중에서도 "멜로버즈" 제품군에 해당한다.',
    sources: [
      {
        url: 'https://ylshop.co.kr/',
        title: 'QCY STORE',
        publisher: '와이엘사이언스',
      },
      {
        url: 'https://shop.coupang.com/ylscience/272978',
        title: 'QCY 정품 국내공식수입사',
        publisher: '와이엘사이언스',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'Samsung',
    intro:
      '삼성전자는 냉장고·세탁기/건조기·청소기·에어컨 등 리빙가전 전반에 \'비스포크(Bespoke)\'라는 디자인 라인을 공통으로 씌워 판매한다. 그 아래에서 카테고리별 하위 라인 이름은 따로 붙는데, 세탁기·건조기 콤보는 \'Bespoke Grande AI\', 에어컨은 \'무풍\', 공기청정기는 \'Infinite AI\'·\'블루스카이\'로 나뉜다. 냉장고·세탁기건조기·청소기·에어컨 카테고리 페이지 모두 이런 라인 이름을 상단 필터 탭으로 두고 있어, 어느 라인인지는 제품 상세 페이지가 아니라 목록 단계에서부터 구분된다.',
    lines: [
      {
        name: '비스포크',
        what: '냉장고·세탁기/건조기·청소기·에어컨 등 여러 카테고리에 공통으로 붙는 디자인 라인이다. 냉장고 카테고리 페이지의 필터 탭은 "전체" 다음 자리에 "Bespoke AI"를 두고 있어, 삼성 냉장고 라인업의 사실상 기본값으로 자리 잡았다.',
        categories: ['냉장고', '세탁기', '건조기', '로봇청소기'],
      },
      {
        name: 'Bespoke Grande AI',
        what: '세탁기·건조기 상위 라인으로, 세탁기와 건조기를 위아래로 합친 콤보 제품에 주로 쓰인다. 공식 이벤트 페이지 주소에도 "bespoke-grande-ai"라는 이름이 그대로 들어간다.',
        categories: ['세탁기', '건조기'],
      },
      {
        name: '무풍',
        what: '에어컨 라인으로, "Bespoke AI 무풍콤보 갤러리 프로"·"무풍 윈도우핏"처럼 직접 바람 없이 냉방하는 제품 이름에 공통으로 들어간다.',
        categories: ['에어컨'],
      },
      {
        name: 'Infinite AI · 블루스카이',
        what: '공기청정기의 두 축이다. Infinite AI는 리유저블·S 필터를 함께 파는 상위 라인이고, 블루스카이는 그보다 낮은 가격대의 실속형 라인이다.',
        categories: ['공기청정기'],
      },
      {
        name: 'Bespoke AI 스팀',
        what: '로봇청소기 라인으로, 물걸레 자동 세척과 급배수 기능을 갖춘 상위 모델에 붙는다.',
        categories: ['로봇청소기'],
      },
    ],
    serviceCenter: {
      phone: '1588-3366',
      sourceUrl: 'https://www.samsung.com/sec/',
      note: '삼성닷컴 구매 문의(1588-6084)와는 다른, 제품/서비스/멤버십 공용 번호다.',
    },
    errorCodePattern:
      "카테고리마다 기본 틀은 'E' 뒤에 숫자 한 자리에서 세 자리를 붙이는 방식이지만 세부 규칙은 갈린다. 세탁기·건조기는 UE·tS·HC처럼 알파벳 2~3자만 쓰는 코드가 섞여 있고, 냉장고는 '22 E'처럼 숫자와 알파벳 사이를 띄어 쓰며, 로봇청소기는 코드 대신 '바퀴 끼임'처럼 증상을 문장으로 표시하기도 한다.",
    editorNote:
      '카탈로그에 등록된 삼성 제품은 에어컨·제습기·세탁기·건조기·공기청정기·냉장고·식기세척기·로봇청소기·TV·무선이어폰까지 10개 카테고리 17개 모델로, LG 다음으로 폭이 넓다. 비스포크 패널이 붙은 프리미엄 모델이 다수를 차지해 가격대가 전반적으로 높게 형성돼 있고, 위닉스·캐리어처럼 한두 카테고리에 집중한 브랜드와는 카탈로그 구성부터 다르다.',
    sources: [
      {
        url: 'https://www.samsung.com/sec/',
        title: 'Samsung 대한민국 | 모바일 | TV | 가전 | IT',
        publisher: '삼성전자',
      },
      {
        url: 'https://www.samsung.com/sec/washers-and-dryers/all-washers-and-dryers/',
        title: '세탁기 건조기 | Samsung 대한민국',
        publisher: '삼성전자',
      },
      {
        url: 'https://www.samsung.com/sec/air-conditioners/all-air-conditioners/',
        title: '에어컨 | Samsung 대한민국',
        publisher: '삼성전자',
      },
      {
        url: 'https://www.samsung.com/sec/air-cleaner/all-air-cleaner/',
        title: '공기청정기 | Samsung 대한민국',
        publisher: '삼성전자',
      },
      {
        url: 'https://www.samsung.com/sec/vacuum-cleaners/all-vacuum-cleaners/',
        title: '청소기 | Samsung 대한민국',
        publisher: '삼성전자',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'Coway',
    intro:
      "코웨이는 정수기·공기청정기·제습기·비데 등을 구매와 렌탈 두 가지 방식으로 함께 파는 브랜드로, 국내 정수기·공기청정기 렌탈 시장에서 오래 자리 잡았다. 상위 라인에는 '노블'이라는 이름을 여러 카테고리에 공통으로 붙이고, 정수기는 얼음정수기 중심의 '아이콘' 라인을 따로 두고 있다. 코디(전속 방문관리 인력)를 통한 정기 관리가 렌탈 계약의 기본값이라, 다른 브랜드보다 서비스 접점이 촘촘한 편이다.",
    lines: [
      {
        name: '노블',
        what: '공기청정기·제습기·가습기·정수기에 걸쳐 붙는 상위 라인이다. 공기청정기 카테고리 페이지에는 "노블 시리즈"라는 필터 탭이 따로 있고, 노블 공기청정기2만 해도 53㎡부터 133㎡까지 평형별로 나뉜다.',
        categories: ['공기청정기', '제습기', '정수기'],
      },
      {
        name: '아이콘',
        what: '얼음정수기를 중심으로 한 정수기 라인이다. "아이콘 얼음정수기 미니·스탠다드·맥스·오리지널"이 현재 정수기 카테고리 판매 순위 1~4위를 차지하고 있다.',
        categories: ['정수기'],
      },
      {
        name: '스퀘어핏',
        what: '공기청정기의 슬림형 라인으로, 38㎡부터 82㎡까지 평형별 모델이 있고 노블보다 낮은 가격대를 겨냥한다.',
        categories: ['공기청정기'],
      },
    ],
    serviceCenter: {
      phone: '1588-5200',
      sourceUrl: 'https://www.coway.com/cs/main',
      note: '고객지원 페이지에 "고객센터 1588-5200, 긴급상담 365일 24시간"으로 안내돼 있고, 같은 페이지에서 A/S·이전설치 신청도 함께 접수한다.',
    },
    errorCodePattern:
      "공기청정기·제습기는 E1·FL·CF·C1처럼 알파벳 한두 글자와 숫자를 섞어 쓰는데, 정수기는 코드 대신 '누수 감지'·'온수 잠금'처럼 증상을 그대로 문구로 표시한다.",
    editorNote:
      '카탈로그에 등록된 코웨이 제품은 공기청정기 2종, 제습기 2종, 정수기 2종으로 총 6개 모델이다. 정수기 두 모델은 100만원대 냉온정형과 50만원대 슬림형으로 가격대가 갈리고, 공기청정기·제습기는 각각 대형·중형이 한 쌍씩 있어 평수별 선택지를 좁게나마 갖췄다.',
    sources: [
      {
        url: 'https://www.coway.com/cs/main',
        title: '고객지원 | coway',
        publisher: '코웨이',
      },
      {
        url: 'https://www.coway.com/product/detail?prdno=1068',
        title: '노블 공기청정기2 (53㎡) - 코웨이 청정기/에어컨 | coway',
        publisher: '코웨이',
      },
      {
        url: 'https://www.coway.com/product/air-purifier-air-conditioner/all/all',
        title: '코웨이 청정기/에어컨 전체보기 | coway',
        publisher: '코웨이',
      },
      {
        url: 'https://www.coway.com/product/water-purifier/all/all',
        title: '코웨이 정수기 전체보기 | coway',
        publisher: '코웨이',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'Winix',
    intro:
      "위닉스는 공기청정기와 제습기 두 카테고리에 집중하는 국내 생활가전 브랜드로, 코웨이·삼성보다 낮은 가격대에서 '방마다 한 대씩' 수요를 겨냥한다. 공기청정기는 '타워', 제습기는 '뽀송'이라는 이름을 각각 대표 라인으로 쓰고, 두 라인 모두 용량·평형별로 세분화된 모델을 여럿 낸다.",
    lines: [
      {
        name: '타워',
        what: '세로로 슬림한 공기청정기 라인이다. "타워엣지"·"타워엣지 컴팩트"·"타워프라임"·"타워프라임 플러스" 순으로 크기와 청정 면적이 커지며, 최상위 "타워프라임 플러스"는 37평형까지 담당한다.',
        categories: ['공기청정기'],
      },
      {
        name: '뽀송',
        what: '제습기 라인으로 12L부터 인버터 24L까지 용량별 모델이 있다. "인버터"가 붙은 모델(19L·21L·22L·24L)은 저소음·저전력 컴프레서를, 일반 모델(12L·17L·18L)은 낮은 가격을 겨냥한다.',
        categories: ['제습기'],
      },
    ],
    serviceCenter: {
      phone: '1544-5081',
      sourceUrl: 'https://www.winix.com/customer/product',
      note: '위닉스 고객만족센터 번호로 평일 09:00~18:00만 운영하고 주말·공휴일은 쉰다. 창문형 에어컨 설치 상담은 1670-3230으로 별도 운영된다.',
    },
    errorCodePattern:
      "공기청정기는 A1·A2·A3·C1·Cd처럼 알파벳(대소문자 혼용)에 숫자를 붙이고, 제습기는 E1·E2·DF·E3·CF 코드와 '만수 표시등' 같은 문구를 함께 쓴다.",
    editorNote:
      '카탈로그에 등록된 위닉스 제품은 공기청정기 1종(타워 XQ)과 제습기 1종(뽀송 16L)으로 총 2개 모델이다. 둘 다 30만원대에 걸쳐 있어, 코웨이·삼성 동급 모델의 절반 안팎 가격이라는 위닉스 라인업 전체의 포지셔닝이 카탈로그에도 그대로 드러난다.',
    sources: [
      {
        url: 'https://www.winix.com/customer/product',
        title: '위닉스 고객지원 - 제품 FAQ',
        publisher: '위닉스',
      },
      {
        url: 'https://www.winix.com/product/list/001',
        title: '공기청정기 | 위닉스',
        publisher: '위닉스',
      },
      {
        url: 'https://www.winix.com/product/list/003',
        title: '제습기 | 위닉스',
        publisher: '위닉스',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'Carrier',
    intro:
      "캐리어는 1902년 에어컨을 발명한 미국 캐리어(Carrier)의 한국 브랜드로, 국내에서는 오텍캐리어가 판매와 서비스를 맡는다. 카탈로그와 공식 사이트 모두 에어컨에 집중돼 있고, 벽걸이·스탠드 상위 모델에는 '에어로'라는 이름을 공통으로 쓴다.",
    lines: [
      {
        name: '에어로',
        what: '18단으로 바람 세기를 조절하는 벽걸이·스탠드 공용 상위 라인이다. AI 쾌적제어(PMV)와 자체 AI 플랫폼 "AI MASTER"를 탑재했고, 공식 사이트는 이를 "국내 최초 AI플러스 인증"으로 소개한다.',
        categories: ['에어컨'],
      },
      {
        name: '디오퍼스(The Opus)',
        what: '에어로보다 상위인 프리미엄 스탠드 라인으로, 공식 사이트 배너에는 "The Opus+"라는 이름으로 소개된다. 스탠드형 목록에는 "디오퍼스 에어컨"이라는 제품명으로 등록돼 있다.',
        categories: ['에어컨'],
      },
    ],
    serviceCenter: {
      phone: '1588-8866',
      sourceUrl: 'https://www.carrier.co.kr/main',
      note: '"서비스 문의" 번호로, 제품 구매 상담(1588-8855)과는 다른 번호다.',
    },
    errorCodePattern:
      "'E'+숫자 한 자리(E1·E4·E5·E6)를 기본으로 쓰고, 냉매·배수 관련 이상은 CH·LC·EC·P0 같은 두 글자 코드로 따로 구분한다.",
    editorNote:
      '카탈로그에 등록된 캐리어 제품은 벽걸이 에어컨과 스탠드 에어컨 각 1종으로 총 2개 모델이다. 벽걸이는 69만원대 가성비형이고 스탠드는 189만원대로, 삼성·LG의 동급 20평형대 스탠드보다 100만원가량 저렴한 실속형 포지션을 카탈로그 안에서도 확인할 수 있다.',
    sources: [
      {
        url: 'https://www.carrier.co.kr/main',
        title: 'Carrier',
        publisher: '오텍캐리어',
      },
      {
        url: 'https://www.carrier.co.kr/product/productsByCtgCd?hrnkMenu=FPD0104',
        title: 'Carrier - 제품 리스트 (벽걸이형 에어컨)',
        publisher: '오텍캐리어',
      },
      {
        url: 'https://www.carrier.co.kr/product/productsByCtgCd?hrnkMenu=FPD0102',
        title: 'Carrier - 제품 리스트 (스탠드형 에어컨)',
        publisher: '오텍캐리어',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'TCL',
    intro:
      "TCL은 중국 TCL그룹의 가전 브랜드로, 한국에는 TCL코리아가 TV·태블릿과 함께 벽걸이 에어컨을 공식 판매하지만 실제 유통은 쿠팡 중심이다. 카탈로그의 6평·9평형 벽걸이 두 종은 TCL 코리아 공식 사이트에 'Breeze IN 시리즈'로 등록돼 있고, 4.5평형 창문형 모델은 같은 사이트에 없이 쿠팡 전용으로만 유통된다.",
    lines: [
      {
        name: 'Breeze IN 시리즈',
        what: '직바람을 줄인 벽걸이 에어컨 라인이다. TCL 코리아 공식 사이트에 6평형·9평형 모델이 이 이름으로 게재돼 있고, "부드러운 바람"과 "자동 세척 기능"을 공통 특징으로 내세운다.',
        categories: ['에어컨'],
      },
    ],
    serviceCenter: {
      phone: '1577-2420',
      sourceUrl:
        'https://solutions.coupang.com/hc/ko/articles/58375688262681--TCL-창문형-에어컨-에어컨-작동-시-오류-알림(에러코드)-해결-방법을-알고-싶어요',
      note: 'TCL 본사나 국내 총판이 아니라 쿠팡의 A/S 기술지원센터로 연결되는 번호다. TCL 코리아 공식 사이트(tcl.com/kr)에는 전화번호 없이 문의 폼만 있고, 카탈로그의 TCL 에어컨 3종 모두 쿠팡에서만 판매된다.',
    },
    errorCodePattern:
      "벽걸이 모델은 'E' 뒤에 숫자 한 자리(E0~E6)를 기본으로 쓰고 냉매 이상은 F0, 컴프레서 보호정지는 P4처럼 별도 코드를 쓰는데, 창문형 모델은 EA·EE·EC처럼 E 뒤에 알파벳을 붙이는 코드도 함께 쓴다.",
    editorNote:
      '카탈로그에 등록된 TCL 제품은 에어컨 3종뿐이다. 6평·9평 벽걸이는 공식 Breeze IN 시리즈에 속하고 47만~66만원대, 4.5평 창문형은 실외기 없이 51만원대로 셋 다 쿠팡에서만 판매된다. 벽걸이 두 모델은 국산 동급 대비 절반 수준 가격을 앞세우지만, A/S도 브랜드 직영이 아니라 쿠팡 경유로 처리된다는 점이 카탈로그 편집자 코멘트에도 반복해서 나온다.',
    sources: [
      {
        url: 'https://www.tcl.com/kr/ko/air-conditioners/tac-08csd-tph11i',
        title: 'TCL 18.7㎡인버터 벽걸이 에어컨 TAC-08CSD/TPH11I - TCL Korea',
        publisher: 'TCL코리아',
      },
      {
        url: 'https://www.tcl.com/kr/ko/air-conditioners',
        title: 'TCL Air Conditioners',
        publisher: 'TCL코리아',
      },
      {
        url: 'https://solutions.coupang.com/hc/ko/articles/58375688262681--TCL-창문형-에어컨-에어컨-작동-시-오류-알림(에러코드)-해결-방법을-알고-싶어요',
        title: '[TCL / 창문형 에어컨] 에어컨 작동 시 오류 알림(에러코드) 해결 방법을 알고 싶어요',
        publisher: '쿠팡',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'Haier',
    intro:
      "하이얼은 세계 가전 판매량 1위를 내세우는 중국 브랜드로, 한국에서는 하이얼코리아가 고객센터를 직접 운영한다. 카탈로그에는 셀프클리닝 벽걸이 에어컨과 미니 냉장고·미니 세탁기가 올라 있는데, 에어컨은 공식 사이트의 'Self-Cleaning' 라인과 이름이 일치하지만 미니 냉장고는 하이얼코리아가 내세우는 '컨버터블'·'레트로'·'글램글라스' 냉장고 라인 어디에도 명시적으로 속하지 않는 별도 보급형 모델이다.",
    lines: [
      {
        name: 'Self-Cleaning(셀프클리닝)',
        what: '벽걸이 에어컨 라인으로, 하이얼코리아 공식 사이트 홈에 "6·8·10평형 맞춤 선택"으로 소개된다. 냉각→해동→건조 3단계로 열교환기 내부를 자동 세척하는 기능이 라인 이름의 유래다.',
        categories: ['에어컨'],
      },
      {
        name: '컨버터블 · 레트로 · 글램글라스',
        what: '하이얼코리아 냉장고 라인으로, 공식 사이트 홈에 김치냉장고 컨버터블 라인, 레트로 감성의 미니 냉장고, 4도어 글램글라스가 각각 소개돼 있다. 다만 카탈로그의 155L 미니 냉장고(HRB-155MDW)는 이 라인들과 별도의 보급형 모델로, 공식 사이트에서 소속이 확인되지 않는다.',
        categories: ['냉장고'],
      },
    ],
    serviceCenter: {
      phone: '1588-6645',
      sourceUrl:
        'https://www.haier.co.kr/board/board_center/board_list.asp?scrID=0000000228&pageNum=3&subNum=4&ssubNum=1',
      note: '하이얼코리아 고객센터 번호로, 총판이나 수입사가 아니라 한국 법인이 직접 운영한다. 토요일·일요일·공휴일은 휴무이며 이 경우 콜백 시스템으로 접수된다.',
    },
    errorCodePattern:
      "에어컨·세탁기는 'E' 뒤에 숫자 한 자리(E1~E6)를 기본으로 쓰지만, 같은 저압·냉매 부족 보호 증상도 모델마다 표기가 다르다 — 6평형은 E3와 별도로 F1을 냉매 순환 이상 전용 코드로 두는데, 10평형은 F1 없이 같은 증상을 E3 하나로만 표기한다. 냉장고는 E0~E2 숫자 코드와 EH·Fr·FD 같은 알파벳 코드를 섞어 쓴다.",
    editorNote:
      '카탈로그에 등록된 하이얼 제품은 에어컨 2종(6평·10평 셀프클리닝), 미니 냉장고 1종(155L), 미니 세탁기 1종(3kg)으로 총 4개 모델이 3개 카테고리에 걸쳐 있다. 전 모델이 22만~60만원대에 몰려 있어 TCL과 함께 초저가 구간을 형성하지만, 미니 냉장고·세탁기는 원룸의 메인 가전이 아니라 세컨드(보조) 가전으로 편집부가 포지셔닝한 점이 대형가전 중심 브랜드와 다르다.',
    sources: [
      {
        url: 'https://www.haier.co.kr/',
        title: '하이얼코리아 공식 홈페이지',
        publisher: '하이얼코리아',
      },
      {
        url: 'https://www.haier.co.kr/board/board_center/board_list.asp?scrID=0000000228&pageNum=3&subNum=4&ssubNum=1',
        title: '고객센터 안내',
        publisher: '하이얼코리아',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'Shinil',
    intro:
      "신일전자는 1959년 설립된 국내 생활가전 제조사로, 선풍기·계절가전을 직영 공식몰과 자체 고객센터로 판매·지원한다. 공식 사이트는 선풍기를 브랜드 마케팅용 시리즈명이 아니라 '지상용·천장용·DC팬·소형팬·타워팬' 같은 형태별 카테고리로만 분류하고 있어, 카탈로그의 두 모델도 이 분류 체계 안에서 설명하는 편이 정확하다.",
    lines: [
      {
        name: 'DC팬',
        what: '신일전자 공식 사이트가 선풍기를 분류하는 카테고리 중 하나로, BLDC(DC) 모터를 쓰는 저소음·저전력 모델을 묶는다. 브랜드 시리즈 이름이 아니라 사이트 상품 분류명이며, 카탈로그의 BLDC 스탠드선풍기 SIF-14BLDC가 이 계열에 해당한다.',
        categories: ['선풍기'],
      },
    ],
    serviceCenter: {
      phone: '1577-6667',
      sourceUrl: 'https://www.shinil.co.kr/',
      note: '신일전자 홈페이지 하단에 "TEL : 1577-6667(통화요금 발신자부담)"으로 직접 게재된, 국내 제조사가 직영하는 번호다.',
    },
    errorCodePattern: "선풍기 두 모델 모두 'E' 뒤에 숫자 한 자리(E1~E6)를 붙이는 코드 체계를 쓴다.",
    editorNote:
      '카탈로그에 등록된 신일 제품은 선풍기 2종뿐이다. 12만원대 BLDC 스탠드형은 리모컨·12단 풍량·자연풍 모드로 거치형 수요를, 5만원대 무선 충전식은 8000mAh 배터리와 USB-C 충전으로 콘센트 없는 캠핑·차박 수요를 나눠 맡아 같은 카테고리 안에서도 두 모델의 용도가 겹치지 않는다.',
    sources: [
      {
        url: 'https://www.shinil.co.kr/',
        title: '신일전자',
        publisher: '신일전자',
      },
      {
        url: 'https://www.shinil.co.kr/ko/product/product_list.html?c_id=A',
        title: '선풍기 | 신일전자',
        publisher: '신일전자',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'Xiaomi',
    intro:
      '샤오미는 중국 스마트 가전 브랜드로, 한국에는 샤오미테크놀로지코리아가 mi.com/kr 공식 스토어를 운영하며 070-8015-1154 번호로 A/S를 직접 접수한다. 다만 카탈로그의 로봇청소기 X10처럼 공식 스토어에 없는 병행수입 제품은 이 공식 A/S 대상에서 벗어날 수 있어, 같은 브랜드 안에서도 구매 경로에 따라 A/S 여부가 갈린다.',
    lines: [
      {
        name: 'Xiaomi Mijia(미지아)',
        what: '샤오미 본사의 생활가전 서브브랜드로, mi.com/kr 공식 스토어에도 "Xiaomi Mijia 스탠딩 선풍기"처럼 제품명에 그대로 쓰인다. 카탈로그의 미지아 DC 스탠드선풍기 1X가 이 브랜드에 해당한다.',
        categories: ['선풍기'],
      },
    ],
    serviceCenter: {
      phone: '070-8015-1154',
      sourceUrl: 'https://www.mi.com/kr/support/warranty/',
      note: 'mi.com/kr 공식 스토어와 정식 유통 제품에 적용되는 번호다. 카탈로그의 로봇청소기 X10(BHR6068EU)처럼 병행수입으로 유통된 제품은 이 공식 채널의 보증 대상이 아닐 수 있다.',
    },
    errorCodePattern:
      "선풍기·공기청정기는 'E' 뒤에 숫자 한 자리를 붙이는 흔한 방식을 쓰지만, 로봇청소기는 알파벳을 줄이지 않고 'Error' 뒤에 숫자를 그대로 붙이는 표기를 쓴다.",
    editorNote:
      '카탈로그에 등록된 샤오미 제품은 선풍기 1종, 로봇청소기 2종(X10·X20+), 공기청정기 1종으로 4개 모델이 3개 카테고리에 걸쳐 있다. 로봇청소기 X20+는 물걸레 자동세척·급배수까지 지원하는 80만원대 상위 모델인 반면 X10은 절반 수준 가격에 자동 먼지비움만 갖춘 보급형이라, 같은 카테고리 안에서도 두 모델의 가격·기능 격차가 카탈로그에 그대로 드러난다.',
    sources: [
      {
        url: 'https://www.mi.com/kr/support/warranty/',
        title: '지원 - 보증 | Xiaomi Korea',
        publisher: '샤오미테크놀로지코리아',
      },
      {
        url: 'https://www.mi.com/kr/',
        title: 'Xiaomi® Korea | Xiaomi 공식 웹사이트',
        publisher: '샤오미테크놀로지코리아',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'SKMagic',
    intro:
      'SK매직은 정수기·공기청정기·식기세척기·비데 등을 렌탈(구독)과 일시불 구매로 함께 파는 브랜드로, 운영법인은 2026년 현재 SK매직에서 SK인텔릭스(주)로 바뀌었지만 제품에는 SK매직 상표를 그대로 쓴다. SK매직몰(공식 쇼핑몰)은 정수기를 하나의 마케팅 시리즈로 묶지 않고 얼음 정수기·직수 정수기·대용량 정수기라는 사이트 상품 분류로 나눈 뒤, 제품마다 MEGA ICE·투워터처럼 다른 이름을 붙인다. 반면 식기세척기는 터치온(TouchOn)이라는 이름을 여러 모델에 공통으로 쓴다.',
    lines: [
      {
        name: '터치온(TouchOn)',
        what: '식기세척기 라인 이름이다. SK매직몰 검색 결과에 "(12인용) 터치온 식기세척기"와 "프리미엄 파워워시 식기세척기 TouchOn UV"가 함께 걸려 있어, 한 모델만이 아니라 여러 모델에 걸쳐 쓰이는 이름임을 확인했다.',
        categories: ['식기세척기'],
      },
      {
        name: '얼음 정수기 · 직수 정수기(상품 분류)',
        what: 'SK매직몰은 정수기를 하나의 시리즈 브랜드로 묶지 않고, 얼음 정수기·직수 정수기·대용량 정수기라는 사이트 상품 분류 아래 MEGA ICE·투워터·원코크 플러스·초소형처럼 제품마다 다른 이름을 붙인다. 카탈로그의 올인원 직수 냉온정수기·슈퍼 정수기 얼음은 이 분류 체계에 있던 이전 세대 제품으로, 지금 SK매직몰 검색에서는 나오지 않는다.',
        categories: ['정수기'],
      },
    ],
    serviceCenter: {
      phone: '1600-1661',
      sourceUrl: 'https://www.skintellixservice.com/web/main/main.do',
      note: 'SK매직몰은 이 번호를 "구독계약상담 및 문의"로 표기하지만, SK매직 서비스센터(SK인텔릭스서비스)의 FAQ·ARS 안내는 같은 1600-1661번을 정수기 이전설치·고장 상담 같은 실제 A/S 접수 창구로도 함께 안내한다. 렌탈 계약 문의와 수리 접수가 창구부터 나뉘어 있지 않다는 뜻이다.',
    },
    errorCodePattern:
      '식기세척기는 E1·E2·E4처럼 E 뒤에 숫자를 붙이거나 dr(도어)·F5(거품)·t5/t0(온도)처럼 알파벳과 숫자를 섞어 쓰는데, 정수기 2종은 이런 코드 없이 "필터 교체 알림"·"누수 감지"·"온수 히터 이상"처럼 증상을 그대로 문구로 표시한다.',
    editorNote:
      '카탈로그에 등록된 SK매직 제품은 식기세척기 1종과 정수기 2종으로 총 3개 모델, 2개 카테고리다. 정수기 두 모델은 69만원대 올인원 직수와 99만원대 얼음 겸용으로 가격이 갈리는데, 올인원은 필터를 직접 갈아 끼우는 자가관리로 렌탈비를 낮춘 쪽이고 얼음 모델은 물길 전체를 스테인리스로 두른 올스텐 유로로 위생을 앞세운 쪽이라, 같은 브랜드 안에서도 "저렴하게 직접 관리"와 "위생·기능 상위"로 포지션이 갈린다.',
    sources: [
      {
        url: 'https://www.skmagic.com/',
        title: 'SK매직몰',
        publisher: 'SK인텔릭스',
      },
      {
        url: 'https://www.skmagic.com/customer/indexCustomer',
        title: '고객지원 | SK매직몰',
        publisher: 'SK인텔릭스',
      },
      {
        url: 'https://www.skintellixservice.com/web/main/main.do',
        title: 'SK인텔릭스서비스',
        publisher: 'SK인텔릭스',
      },
      {
        url: 'https://www.skmagic.com/goods/indexGoodsList?dispClsfNo=100000005&mstDispClsfNo=100000003&dispLvl=2&menuNo=1001',
        title: '정수기 추천 목록, 가격 비교 | 정수기 | SK매직몰',
        publisher: 'SK인텔릭스',
      },
      {
        url: 'https://www.skmagic.com/search/searchResult?searchType=recent&srchWord=%EC%8B%9D%EA%B8%B0%EC%84%B8%EC%B2%99%EA%B8%B0&srchWordBefore=',
        title: '검색 결과 | SK매직몰',
        publisher: 'SK인텔릭스',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'Cuckoo',
    intro:
      '쿠쿠는 밥솥으로 잘 알려진 국내 가전사로, 정수기·비데는 렌탈(구독) 위주로 팔고 식기세척기는 일시불 구매로 판매한다. 고객센터도 이 구조를 그대로 따라가 렌탈 고객 서비스(1577-0010)와 일반 구매 제품 A/S(1588-8899)를 처음부터 분리해 운영한다. 정수기 라인 중 하나인 인스퓨어는 지금도 셀프 직수 얼음정수기로 판매되고, 식기세척기는 최근 스팀샷이라는 이름의 고온 스팀 살균 모델을 앞세운다.',
    lines: [
      {
        name: '인스퓨어',
        what: '정수기 라인 이름 중 하나다. 쿠쿠몰에는 "인스퓨어셀프직수얼음정수기"(CP-SS011WSV)가 지금도 판매 중이며, 저수조 없이 그때그때 걸러내는 직수형과 코크·유로 UV살균을 공통 특징으로 내세운다.',
        categories: ['정수기'],
      },
      {
        name: '스팀샷',
        what: '식기세척기 최신 라인이다. "쿠쿠 스팀샷 식기세척기(14인용)"·"120도 스팀 살균 14인용 글라스도어 식기세척기"가 지금 쿠쿠몰의 대표 모델이며, 카탈로그의 6인용 식탁형·12인용 모델은 이 스팀샷 세대 이전 제품으로 보이고 쿠쿠몰에서 같은 모델명은 확인되지 않는다.',
        categories: ['식기세척기'],
      },
    ],
    serviceCenter: {
      phone: '1588-8899',
      sourceUrl: 'https://www.cuckoo.co.kr/customer',
      note: '쿠쿠는 렌탈(구독) A/S·설치·점검(1577-0010)과 일반 구매 제품 A/S(1588-8899)를 창구부터 분리해 운영한다. 카탈로그의 식기세척기·정수기 3종은 모두 구매 가격이 매겨진 일반 구매 제품이라 구매 서비스 번호를 확인해 실었다.',
    },
    errorCodePattern:
      '식기세척기 두 모델은 E1부터 E7까지의 숫자 코드에 ED·dr 같은 알파벳 코드를 더해 쓰는데, 정수기 인스퓨어 아이스는 같은 E-코드(E1·E3·E5) 사이에 PL(온수 잠금)·UV(살균 모듈)처럼 숫자 없이 알파벳만 쓰는 코드와 "필터 교체 알림등" 같은 문구형 알림이 섞여 있다.',
    editorNote:
      '카탈로그에 등록된 쿠쿠 제품은 식기세척기 2종과 정수기 1종으로 총 3개 모델, 2개 카테고리다. 식기세척기는 36만원대 6인용 식탁형과 90만원대 12인용 빌트인 겸용으로 나뉘어 1~2인 가구의 입문용과 4인 가족의 메인 가전을 각각 맡고, 정수기 인스퓨어 아이스는 저수조 없는 직수형에 제빙까지 더한 99만원대 상위 모델이라 세 제품의 가격대가 36만원부터 99만원까지 넓게 퍼져 있다.',
    sources: [
      {
        url: 'https://www.cuckoo.co.kr/',
        title: 'CUCKOO',
        publisher: '쿠쿠전자',
      },
      {
        url: 'https://www.cuckoo.co.kr/customer',
        title: '고객지원 | CUCKOO',
        publisher: '쿠쿠전자',
      },
      {
        url: 'https://www.cuckoo.co.kr/rental/productList?cateUid=223',
        title: '얼음 정수기 | 쿠쿠렌탈',
        publisher: '쿠쿠전자',
      },
      {
        url: 'https://www.cuckoo.co.kr/mall/productList?categoryCd=73',
        title: '식기세척기 | 쿠쿠몰',
        publisher: '쿠쿠전자',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'Roborock',
    intro:
      '로보락은 중국 로봇청소기 제조사로, 한국에는 주식회사 로보락 코리아가 kr.roborock.com 공식 스토어와 A/S를 직접 운영한다. 라인업은 최상위 Saros, 물걸레·문턱 주파력에 강한 Qrevo, 그 아래 S8 시리즈로 나뉘는데, 카탈로그의 S8 프로 울트라는 이 S8 Pro 시리즈에 속했던 모델로 현재 공식 사이트에는 같은 모델명 페이지가 남아 있지 않다. 반면 Qrevo Curv는 지금도 공식 스토어에서 그대로 판매 중이다.',
    lines: [
      {
        name: 'Qrevo',
        what: '문턱·단차 주파력과 물걸레 청소를 앞세운 상위 라인이다. 공식 사이트에 Qrevo Curv·Qrevo Curv 2 Flow·Qrevo Edge 2·Qrevo C 등 여러 모델이 걸려 있고, 카탈로그의 Qrevo Curv도 이 라인의 현재 판매 모델이다.',
        categories: ['로봇청소기'],
      },
      {
        name: 'S8 시리즈',
        what: 'Saros(최상위)와 Qrevo 아래에 있는 라인으로, 공식 사이트의 "Roborock S8 Pro 시리즈" 페이지에는 S8 Pro·S8 Pro+가 올라 있다. 카탈로그의 S8 프로 울트라는 이 시리즈에 속했던 모델명이지만 같은 URL 패턴(roborock-s8-pro-ultra)으로 접속하면 홈으로 넘어가, 지금은 판매 목록에서 빠진 것으로 보인다.',
        categories: ['로봇청소기'],
      },
    ],
    serviceCenter: {
      phone: '1566-5534',
      sourceUrl: 'https://kr.roborock.com/pages/roborock-service-warranty',
      note: '서비스 및 보증 페이지에 "AS 전화 문의 1566 5534"로 명시된, 주식회사 로보락 코리아가 직접 운영하는 번호다.',
    },
    errorCodePattern:
      '두 모델 모두 "Error" 뒤에 숫자를 붙이는 표기를 쓰는데, 겹치는 기능은 같은 번호를 쓴다 — 라이다 센서 막힘은 둘 다 Error 1, 낭떠러지 센서 오류는 둘 다 Error 4, 충전 실패는 둘 다 Error 13이다. 반면 S8 프로 울트라에만 있는 범퍼·바퀴·먼지통 오류는 Error 2·3·9·12로, Qrevo Curv에만 있는 회전 물걸레·물탱크 오류는 Error 15·21로 따로 번호를 매긴다.',
    editorNote:
      '카탈로그에 등록된 로보락 제품은 로봇청소기 2종으로, S8 프로 울트라(129만원대)와 Qrevo Curv(149만원대) 모두 흡입·물걸레·유지관리를 도크가 알아서 처리하는 올인원 스테이션 구성이다. 두 모델의 차이는 물걸레 방식에 있는데, S8 프로 울트라는 음파진동으로 문지르고 Qrevo Curv는 듀얼 회전판을 돌려 닦으며 몸체를 들어 올려 문턱까지 넘는 AdaptiLift 섀시를 더 얹었다.',
    sources: [
      {
        url: 'https://kr.roborock.com/',
        title: 'Roborock South Korea | 로보락',
        publisher: '로보락 코리아',
      },
      {
        url: 'https://kr.roborock.com/pages/roborock-service-warranty',
        title: '서비스 및 보증 | Roborock South Korea',
        publisher: '로보락 코리아',
      },
      {
        url: 'https://kr.roborock.com/pages/roborock-s8-pro-series',
        title: 'Roborock S8 Pro 시리즈 - 타협하지 않는 우수함 | Roborock South Korea',
        publisher: '로보락 코리아',
      },
      {
        url: 'https://kr.roborock.com/pages/roborock-qrevo-curv',
        title: 'Roborock Qrevo Curv - 엉킴 없는 청소, 간편한 우아함 | Roborock South Korea',
        publisher: '로보락 코리아',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'Dyson',
    intro:
      '다이슨은 영국의 가전 제조사로, 한국에는 다이슨 코리아가 공식몰과 A/S를 직접 운영하며 고객센터는 유료(1588-4253)와 수신자부담(080-300-4253) 두 번호를 함께 안내한다. 선풍기·공기청정기 라인은 최근 이름이 크게 바뀌었는데, 카탈로그의 퓨어쿨(TP07)이 속했던 "퓨어쿨"이라는 이름은 현재 다이슨 공식몰 상품 목록에서 확인되지 않고, 대신 허쉬젯·파인드+팔로우·빅+콰이엇 같은 새 이름의 제품이 그 자리를 채우고 있다. 다만 핫앤쿨(HP09가 속한 라인)은 지금도 판매 중이다.',
    lines: [
      {
        name: '핫앤쿨(Hot+Cool)',
        what: '냉방·난방·공기청정을 한 대에 담은 라인이다. 다이슨 공기청정기 카테고리 페이지에 "다이슨 핫앤쿨 공기청정기 HP2"가 올라 있어, 카탈로그의 HP09가 속했던 라인이 지금도 이어지고 있음을 확인했다. 다만 현재 판매 모델명은 HP2로 HP09보다 뒤 세대다.',
        categories: ['선풍기'],
      },
      {
        name: '퓨어쿨(단종 추정)',
        what: '카탈로그의 TP07이 속했던 날개 없는 타워팬 겸 공기청정기 라인이다. 다이슨 공기청정기·선풍기 카테고리 페이지 어디에도 "퓨어쿨"이라는 이름이 남아 있지 않아, 허쉬젯·파인드+팔로우 같은 후속 라인으로 대체된 것으로 보인다.',
        categories: ['선풍기'],
      },
    ],
    serviceCenter: {
      phone: '1588-4253',
      sourceUrl: 'https://www.dyson.co.kr/support/support-home',
      note: '유료 1588-4253과 수신자부담 080-300-4253 두 번호를 함께 안내하며, 평일 오전 9시~오후 6시만 운영하고 주말은 쉰다.',
    },
    errorCodePattern:
      '두 모델 모두 필터 알림은 F(교체 시기)·F2(미장착)로 같고 본체 이상은 E로 표시하지만, 세부 코드는 기능 차이만큼 갈린다 — Wi-Fi 연결 오류가 TP07은 CL, HP09는 CN으로 다르고, HP09에는 난방 과열을 감지하는 HH가 따로 있는 대신 TP07에만 있는 모터 회전 이상 코드 U1은 HP09에 없다.',
    editorNote:
      '카탈로그에 등록된 다이슨 제품은 선풍기(공기청정기 겸용) 2종으로, 69만원대 퓨어쿨과 109만원대 퓨어 핫앤쿨 모두 날개 없는 에어 멀티플라이어 송풍과 HEPA H13 필터를 공유한다. 가격 차이 40만원의 정체는 난방 기능인데, HP09의 월 전기요금(9,500원)이 TP07(1,900원)의 5배에 달해 난방을 얼마나 쓰느냐가 유지비를 가르는 핵심 변수임이 카탈로그 스펙에도 그대로 나타난다.',
    sources: [
      {
        url: 'https://www.dyson.co.kr/',
        title: '다이슨 공식몰 | 다이슨 코리아',
        publisher: '다이슨코리아',
      },
      {
        url: 'https://www.dyson.co.kr/support/support-home',
        title: '다이슨 고객 지원 | 다이슨 | www.dyson.co.kr',
        publisher: '다이슨코리아',
      },
      {
        url: 'https://www.dyson.co.kr/products/air-quality/air-quality-purifiers',
        title: '공기청정기 | 다이슨 | www.dyson.co.kr',
        publisher: '다이슨코리아',
      },
      {
        url: 'https://www.dyson.co.kr/products/air-quality/fans-and-heaters',
        title: '선풍기 - 공기청정기 및 선풍기 - 제품',
        publisher: '다이슨코리아',
      },
    ],
    updated: '2026-08',
  },
];
