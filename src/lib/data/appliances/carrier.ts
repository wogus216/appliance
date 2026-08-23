import { Appliance } from '@/types/appliance';

export const carrierAppliances: Appliance[] = [
  {
    id: 'carrier-cpae-a100fwea',
    slug: 'carrier-cpae-a100fwea',
    brand: 'Carrier',
    name: '에어로 벽걸이 CPAE-A100FWEA',
    modelNumber: 'CPAE-A100FWEA',
    category: '에어컨',
    rating: 3.9,
    image: '/images/appliances/carrier/cpae-a100fwea/main.webp',
    images: [],
    price: 690000,
    description: '캐리어 에어로 벽걸이 에어컨. 가성비 최강 10평형, 1등급 효율.',
    oneliner: '가성비 최강 10평형 벽걸이, 1등급 에너지효율',
    editorComment: '에어컨 원조 브랜드 캐리어의 가성비 벽걸이입니다. 69만원에 10평형 1등급 효율로 소형 거실이나 안방에 적합합니다. 삼성·LG 대비 부가 기능은 적지만, 기본 냉방 성능에 충실하고 가격이 20~30% 저렴합니다. 스마트폰 제어가 필요 없고 냉방만 확실하면 되는 분께 추천합니다.',
    status: 'best',
    tags: ['캐리어', '벽걸이', '에어컨', '10평', '가성비', '1등급'],

    specs: {
      energyEfficiency: 8,
      performance: 7,
      convenience: 5,
      durability: 7,
    },

    techSpecs: {
      coreTechnology: '인버터 컴프레서',
      filterType: '항균 필터',
      refrigerant: 'R32',
      capacity: '10평형 (33m2)',
      energyGrade: '1등급',
    },

    roomFit: {
      recommendedSize: ['소형', '중형'],
      coverageArea: 33,
      installationType: '벽걸이형',
      installationNote: '벽면 고정 브래킷 + 실외기 필요',
    },

    errorCodes: [
      {
        code: 'E1',
        description: '실내 온도센서 이상',
        cause: '온도센서 불량',
        solution: '전원 끄고 10분 후 재가동. 반복 시 캐리어에어컨 서비스센터 연락 (1588-8282)',
        severity: 'medium',
      },
      {
        code: 'E4',
        description: '실외기 온도센서 이상',
        cause: '실외기 센서 불량 또는 배선 문제',
        solution: '실외기 주변 청소 후 재가동. 반복 시 캐리어에어컨 서비스센터 연락 (1588-8282)',
        severity: 'medium',
      },
      {
        code: 'E5',
        description: '실내기 송풍 팬모터 이상으로 \'E5\'가 표시되고, 바람이 약하거나 송풍팬이 멈춥니다.',
        cause: '실내기 송풍 팬모터의 구속(이물질 끼임)·과부하 또는 팬모터 배선 커넥터 접촉 불량이 원인입니다.',
        solution: '전원을 끄고 흡입구 필터와 팬 주변의 이물질·먼지를 제거한 뒤 재가동하세요. \'E5\'가 계속 뜨면 팬모터 또는 배선 점검이 필요하므로 캐리어에어컨 서비스센터에 접수하세요 (1588-8282).',
        severity: 'medium',
      },
      {
        code: 'E6',
        description: '\'E6\'가 표시되며 실내기와 실외기 사이 통신이 끊겨 냉방이 되지 않습니다.',
        cause: '실내기-실외기 연결 통신선의 단선·접촉 불량 또는 실외기 기판 이상으로 신호가 전달되지 않는 상태입니다.',
        solution: '차단기를 내렸다 5분 후 다시 켜서 일시적 오류인지 확인하세요. 반복되면 실내기·실외기 연결 배선과 단자 체결 상태 점검이 필요하므로 캐리어에어컨 서비스센터에 접수하세요 (1588-8282).',
        severity: 'high',
      },
      {
        code: 'CH',
        description: '\'CH\'가 표시되면서 냉방이 약하거나 실외기 배관에 성에가 끼는 등 냉매 부족 증상이 나타납니다.',
        cause: '냉매 배관 미세 누설 또는 설치·노후로 인한 냉매 부족이 주된 원인입니다.',
        solution: '냉매 누설·충전은 가정에서 처리할 수 없습니다. 운전을 중단하고 실외기 배관 연결부의 기름때·결빙 흔적 정도만 눈으로 확인한 뒤, 누설 점검 및 냉매 충전을 위해 캐리어에어컨 서비스센터에 접수하세요 (1588-8282). 자가 충전은 위험하니 하지 마세요.',
        severity: 'high',
      },
      {
        code: 'LC',
        description: '\'LC\' 표시와 함께 실내기에서 물이 떨어지거나 응축수가 새어 나옵니다.',
        cause: '응축수 배수 호스의 막힘·꺾임 또는 배수 구배 불량으로 물이 정상 배출되지 않는 상태입니다.',
        solution: '운전을 멈추고 실내기 하단과 배수 호스의 꺾임·이물질 막힘을 확인해 정리하세요. 호스 경로를 바로잡아도 누수가 계속되면 배수 펌프나 설치 상태 점검이 필요하므로 캐리어에어컨 서비스센터에 접수하세요 (1588-8282).',
        severity: 'low',
      },
    ],

    targetUsers: {
      recommended: [
        '가성비를 중시하는 소비자',
        '안방/소형 거실 전용 에어컨이 필요한 가정',
        '기본 냉방만 확실하면 되는 사용자',
      ],
      notRecommended: [
        '스마트폰 제어가 필수인 사용자',
        '20평 이상 거실 (냉방력 부족)',
        '무풍/저소음 기능을 원하는 사용자',
      ],
    },

    features: [
      '인버터 컴프레서 (1등급 효율)',
      '항균 필터',
      '3단 풍량 조절',
      '자동 온도 조절',
      '타이머 예약',
    ],

    priceAnalysis: {
      msrp: 690000,
      streetPrice: 550000,
      monthlyCost: 18000,
      valueRating: 5,
      priceTier: 'budget',
      alternatives: ['samsung-wind-free-ar07a9170', 'lg-whisen-wall-sq07edawhs'],
    },

    reviews: [
      {
        userType: '안방 추가 설치 고객',
        rating: 4,
        text: '삼성 LG 반값에 냉방은 똑같이 잘 됩니다. 앱 제어 없는 게 아쉽지만 리모컨으로 충분해요. 안방이나 작은 방 추가 에어컨으로 추천.',
        pros: ['가성비', '냉방 잘됨', '안방용 적당'],
        cons: ['앱 제어 없음'],
      },
      {
        userType: '원룸 자취생',
        rating: 5,
        text: '6평 원룸인데 켜자마자 5분이면 시원해집니다. 설치비 포함해도 60만원 초반이라 부담이 없었어요. 1등급이라 한여름에 종일 틀어도 전기요금이 생각보다 덜 나옵니다.',
        pros: ['빠른 냉방', '저렴한 가격', '1등급 전기요금'],
        cons: ['리모컨 디자인 투박'],
      },
      {
        userType: '인테리어 민감 신혼부부',
        rating: 3,
        text: '냉방 성능은 가격 생각하면 만족합니다. 다만 취침 모드에서도 컴프레서 돌 때 \'웅\' 하는 소리가 들려서 예민한 사람은 신경 쓰일 수 있어요. 본체 디자인도 무난한 흰색이라 특별하진 않습니다.',
        pros: ['가격 대비 냉방', '슬림한 두께'],
        cons: ['취침 시 소음', '평범한 디자인'],
      },
      {
        userType: '1인 가구 직장인',
        rating: 4,
        text: '무풍 같은 고급 기능은 없지만 딱 필요한 냉방만 확실하게 합니다. 항균 필터는 분리해서 물청소가 쉬워서 관리 편해요. 가성비 따지면 이만한 벽걸이가 없습니다.',
        pros: ['관리 편함', '필요 기능 충실', '필터 물세척'],
        cons: ['부가 기능 부족'],
      },
      {
        userType: '노부모님 댁 설치 자녀',
        rating: 2,
        text: '제품 자체는 무난한데 설치 기사 방문 일정 잡는 데 시간이 좀 걸렸고, 첫 설치 후 살짝 누수가 있어 재방문을 받았습니다. A/S 접수는 1588-8282로 했는데 연결까지 대기가 길었어요. 냉방은 잘 됩니다.',
        pros: ['냉방 성능', '저렴'],
        cons: ['설치 일정 지연', 'A/S 대기 김'],
      },
    ],

    purchaseLinks: [
      { store: '캐리어 공식', url: '#', price: 690000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 550000 },
    ],

    similarProducts: ['samsung-wind-free-ar07a9170', 'lg-whisen-wall-sq07edawhs'],
  },

  {
    id: 'carrier-cpam-a200pda',
    slug: 'carrier-cpam-a200pda',
    brand: 'Carrier',
    name: '스탠드 CPAM-A200PDA',
    modelNumber: 'CPAM-A200PDA',
    category: '에어컨',
    rating: 4.1,
    image: '/images/appliances/carrier/cpam-a200pda/main.webp',
    images: [],
    price: 1890000,
    description: '캐리어 인버터 스탠드 에어컨. 20평형 가성비 스탠드로 삼성·LG 대비 100만원 저렴.',
    oneliner: '20평형 가성비 인버터 스탠드, 삼성·LG 대비 100만원 절약',
    editorComment: '삼성 비스포크·LG 오브제컬렉션이 280만원대인데 캐리어 스탠드는 189만원입니다. 디자인과 AI 기능은 뒤지지만, 냉방 성능 자체는 견줄만합니다. 실속파에게 추천하는 모델로, 가격 대비 가성비가 좋습니다.',
    status: undefined,
    tags: ['캐리어', '스탠드', '에어컨', '20평', '인버터', '가성비'],

    specs: {
      energyEfficiency: 7,
      performance: 8,
      convenience: 5,
      durability: 7,
    },

    techSpecs: {
      coreTechnology: '인버터 컴프레서',
      filterType: '항균 필터',
      refrigerant: 'R32',
      capacity: '20평형 (66m2)',
      energyGrade: '2등급',
    },

    roomFit: {
      recommendedSize: ['중형', '대형'],
      coverageArea: 66,
      installationType: '스탠드형',
      installationNote: '실외기 설치 공간 필요',
    },

    errorCodes: [
      {
        code: 'E1',
        description: '실내 온도센서 이상',
        cause: '온도센서 불량',
        solution: '전원 끄고 10분 후 재가동. 반복 시 서비스센터 연락 (1588-8282)',
        severity: 'medium',
      },
      {
        code: 'E6',
        description: '실외기 통신 에러',
        cause: '실내기-실외기 통신 불량',
        solution: '전원 차단 후 5분 대기, 재가동. 반복 시 배선 점검',
        severity: 'high',
      },
      {
        code: 'E2',
        description: '운전 중 멈추며 \'E2\'가 표시되고, 전원·실외기 제어 계통 이상이 감지됩니다.',
        cause: '멀티탭 사용이나 전압 불안정 등 전원 공급 문제, 또는 실외기 제어기판(PCB) 이상으로 발생합니다.',
        solution: '멀티탭을 빼고 단독 전용 콘센트(220V)에 직접 연결한 뒤, 차단기를 내렸다 10분 후 재가동해 보세요. 전압이 안정되면 해소되는 경우가 많습니다. 그래도 \'E2\'가 반복되면 실외기 제어기판 점검이 필요하므로 캐리어에어컨 서비스센터에 접수하세요.',
        severity: 'medium',
      },
      {
        code: 'E4',
        description: '실내 온도 감지 오류로 \'E4\'가 표시되고, 설정 온도 제어가 불안정해집니다.',
        cause: '실내 온도센서의 단선·단락, 또는 센서 커넥터 접촉 불량이 주된 원인입니다.',
        solution: '전원을 끄고 5~10분 뒤 다시 켜서 일시적 오류인지 확인하세요. 표시가 사라지면 정상입니다. \'E4\'가 계속 뜨면 온도센서나 커넥터 점검·교체가 필요하므로 캐리어에어컨 서비스센터에 점검을 접수하세요.',
        severity: 'medium',
      },
      {
        code: 'EC',
        description: '\'EC\'가 표시되면서 냉방이 약하거나 실외기가 정상적으로 돌지 않습니다.',
        cause: '냉매 배관 누설 또는 냉매 부족(설치 불량·노후 배관 포함)으로 발생합니다.',
        solution: '냉매 누설은 가정에서 보충·수리할 수 없습니다. 운전을 중단하고 실외기 배관 연결부의 결빙·기름때 흔적 정도만 눈으로 확인한 뒤, 캐리어에어컨 서비스센터에 누설 점검 및 냉매 충전을 접수하세요. 냉매 자가 충전은 위험하니 하지 마세요.',
        severity: 'high',
      },
      {
        code: 'P0',
        description: '\'P0\' 표시 후 실외기 압축기가 멈추거나 냉방이 전혀 되지 않습니다.',
        cause: '실외기 통풍 불량에 의한 과열·과부하, 또는 압축기·인버터 모듈 등 관련 부품 이상으로 보호 정지된 상태입니다.',
        solution: '먼저 실외기 주변 통풍을 확보하세요(벽·물건과 간격 두기, 토출구·흡입구 막힘 제거). 차단기를 내렸다 10분 후 재가동해 과열이 식은 뒤 정상 동작하는지 확인합니다. \'P0\'가 반복되면 압축기 계통 점검이 필요하므로 캐리어에어컨 서비스센터에 접수하세요.',
        severity: 'high',
      },
    ],

    targetUsers: {
      recommended: [
        '예산 200만원 이하로 스탠드 에어컨을 원하는 가정',
        '기본 냉방에 충실한 실속파',
        '20~25평 거실 사용자',
      ],
      notRecommended: [
        'AI·스마트 기능을 원하는 사용자',
        '프리미엄 디자인을 중시하는 사용자',
        '전기요금 최저를 원하는 가정 (2등급)',
      ],
    },

    features: [
      '인버터 컴프레서',
      '상하좌우 풍향 조절',
      '항균 필터',
      '절전 모드',
      '타이머 예약',
    ],

    priceAnalysis: {
      msrp: 1890000,
      streetPrice: 1490000,
      monthlyCost: 48000,
      valueRating: 4,
      priceTier: 'mid',
      alternatives: ['samsung-bespoke-wind-free-af25a9970', 'lg-whisen-obje-fq25sdwhs'],
    },

    reviews: [
      {
        userType: '신혼부부',
        rating: 4,
        text: '삼성 LG 보다 100만원 넘게 아꼈습니다. 냉방은 충분히 잘 되고, AI 같은 건 사실 안 써서 아쉬울 것도 없어요. 대신 2등급이라 전기요금은 좀 나옵니다.',
        pros: ['100만원 절약', '냉방 충분'],
        cons: ['2등급 전기요금'],
      },
      {
        userType: '거실 메인 에어컨 교체 고객',
        rating: 4,
        text: '10년 된 정속형 스탠드를 이걸로 바꿨는데 인버터라 그런지 시원해진 뒤로는 조용히 유지됩니다. 22평 거실에 딱 맞고 상하좌우 풍향도 넓게 퍼져요. 가격 대비 만족도가 높습니다.',
        pros: ['넓은 풍향', '유지 시 정숙', '거실에 적당한 냉방력'],
        cons: ['초기 가동 소음'],
      },
      {
        userType: '30평대 아파트 거주자',
        rating: 3,
        text: '20평형이라 30평 거실 전체를 시원하게 하기엔 한여름 폭염엔 살짝 버겁습니다. 문 닫고 거실만 쓰면 충분한데, 주방까지 트인 구조면 한 단계 큰 모델을 권합니다. 2등급이라 전기요금도 신경 쓰이고요.',
        pros: ['가격', '거실 단독은 충분'],
        cons: ['넓은 개방형엔 부족', '2등급 전기료'],
      },
      {
        userType: '소형 매장 자영업자',
        rating: 5,
        text: '매장용으로 두 대 설치했는데 종일 가동해도 냉방이 꾸준하고 고장 없이 잘 돕니다. 같은 평수 대기업 제품 견적의 절반 가까이라 사업장 비용 부담이 확 줄었어요. 실속형으로 강력 추천합니다.',
        pros: ['종일 가동 안정', '저렴한 견적', '냉방 꾸준'],
        cons: ['디자인 사무적'],
      },
      {
        userType: '디자인 중시 구매자',
        rating: 3,
        text: '냉방 성능은 가격 대비 좋습니다. 다만 비스포크나 오브제처럼 거실 인테리어 포인트가 되는 디자인은 아니에요. 무난한 화이트 일자형이라 보이는 곳에 두면 살짝 밋밋합니다. 성능만 보면 합격.',
        pros: ['가성비 냉방', '깔끔한 화이트'],
        cons: ['평범한 디자인', '프리미엄 감성 부족'],
      },
    ],

    purchaseLinks: [
      { store: '캐리어 공식', url: '#', price: 1890000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 1490000 },
    ],

    similarProducts: ['samsung-bespoke-wind-free-af25a9970', 'lg-whisen-obje-fq25sdwhs'],
  },
];
