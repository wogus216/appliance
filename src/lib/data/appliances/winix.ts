import { Appliance } from '@/types/appliance';

export const winixAppliances: Appliance[] = [
  // === 공기청정기 ===
  {
    id: 'winix-tower-xq-azbe630',
    slug: 'winix-tower-xq-azbe630',
    brand: 'Winix',
    name: '타워 XQ AZBE630-IWK',
    modelNumber: 'AZBE630-IWK',
    category: '공기청정기',
    image: '/images/appliances/winix/azbe630-iwk/main.webp',
    images: [],
    description: '위닉스 타워 XQ 공기청정기. 슬림한 타워 디자인에 4단계 청정과 펫 모드를 갖춘 가성비 대표 모델.',
    oneliner: '슬림 타워 + 펫 모드, 18평을 책임지는 가성비 공기청정기',
    editorComment: '가성비 공기청정기의 기준점 같은 모델입니다. 슬림한 타워형이라 좁은 공간에도 잘 들어가고, 적용면적 60m2(18평)로 방·작은 거실에 적당합니다. 4단계 청정에 펫 전용 모드가 있어 반려동물 가정에서 인기가 많습니다. 코웨이·삼성 대비 청정 속도와 부가기능은 한 수 아래지만, 가격이 절반 수준이라 "방마다 한 대씩" 전략에 잘 맞습니다.',
    status: 'best',
    tags: ['위닉스', '타워', '공기청정기', '18평', '펫모드', '슬림', '가성비', 'H13'],

    specs: {
      energyEfficiency: 8,
      performance: 8,
      convenience: 7,
      durability: 7,
    },

    techSpecs: {
      coreTechnology: '4단계 청정 + 플라즈마웨이브',
      filterType: 'H13 헤파 + 탈취 활성탄 + 프리필터',
      capacity: '18평형 (60m2)',
    },

    roomFit: {
      recommendedSize: ['소형', '중형'],
      coverageArea: 60,
      installationType: '이동식 타워',
      installationNote: '슬림형이라 좁은 공간 배치 용이. 필터 약 6~12개월 주기 교체',
    },

    errorCodes: [
      {
        code: 'A1',
        description: '필터 미장착 / 도어 열림',
        cause: '필터가 제대로 장착되지 않았거나 전면 커버가 열림',
        solution: '전면 커버를 열고 필터를 정위치에 다시 끼운 뒤 커버를 닫고 재가동',
        severity: 'low',
      },
      {
        code: 'A2',
        description: '먼지/가스 센서 이상',
        cause: '센서 흡입구 막힘 또는 센서 점검 필요',
        solution: '센서 흡입구를 청소하고 재가동. 반복 시 위닉스 서비스센터(1544-5081) 문의',
        severity: 'low',
      },
      {
        code: 'A3',
        description: '팬모터 회전 이상',
        cause: 'BLDC 팬에 이물질·머리카락이 감겼거나 팬모터 구동부 고장',
        solution: '전원을 끄고 흡입구·토출구의 이물질을 제거한 뒤 재가동. 팬이 돌지 않거나 소음·진동이 지속되면 위닉스 서비스센터(1544-5081) 점검',
        severity: 'high',
      },
      {
        code: 'C1',
        description: '필터 수명 종료 알림',
        cause: 'H13 헤파·탈취 필터 사용 시간이 권장 교체 주기(약 6~12개월)에 도달함',
        solution: '정품 필터로 교체한 뒤 필터 교체 알림을 리셋(전원 버튼 길게 누름). 교체 후에도 알림이 꺼지지 않으면 위닉스 서비스센터(1544-5081) 문의',
        severity: 'low',
      },
      {
        code: 'Cd',
        description: '미세먼지(PM) 센서 장기 오염',
        cause: '미세먼지 센서 렌즈에 먼지가 누적되어 측정값이 비정상으로 고착됨',
        solution: '전원 분리 후 센서 커버를 열어 면봉으로 렌즈를 부드럽게 닦고 완전히 건조 후 재조립. 청정도 표시가 계속 빨강에 머물면 위닉스 서비스센터(1544-5081) 점검',
        severity: 'medium',
      },
      {
        code: 'E4',
        description: '내부 온습도 센서 이상',
        cause: '본체 내부 온도·습도 복합센서 접촉 불량 또는 회로 고장',
        solution: '전원을 끄고 10분 후 재투입. 표시가 반복되면 위닉스 서비스센터(1544-5081)에 점검 문의',
        severity: 'medium',
      },
    ],

    targetUsers: {
      recommended: [
        '방·작은 거실용 공기청정기를 찾는 사용자',
        '반려동물을 키우는 가정 (펫 모드)',
        '방마다 한 대씩 두려는 가성비 소비자',
        '슬림한 디자인을 선호하는 사용자',
      ],
      notRecommended: [
        '25평 이상 넓은 거실 단독 청정 (면적 부족)',
        '가장 빠른 청정 속도가 필요한 경우',
        '고급 IoT·리포트 기능을 중시하는 사용자',
      ],
    },

    features: [
      '4단계 청정 + 플라즈마웨이브',
      '펫 전용 모드 (털·냄새 집중)',
      '스마트 센서 자동 운전',
      '슬림 타워 디자인',
      '필터 교체 알림',
    ],

    priceAnalysis: {
      valueRating: 5,
      priceTier: 'mid',
      alternatives: ['samsung-bespoke-cube-air-ax90'],
    },

    reviews: [
      {
        userType: '강아지 키우는 1인 가구',
        rating: 5,
        text: '펫 모드가 확실히 냄새를 잡아줍니다. 슬림해서 자리도 안 차지하고, 이 가격에 이 정도면 만족이에요. 방에 딱.',
        pros: ['펫모드 탈취', '슬림 디자인', '가성비'],
        cons: ['최대풍량 소음'],
      },
      {
        userType: '거실에서 써본 사용자',
        rating: 3,
        text: '방에선 충분한데 넓은 거실에선 좀 약합니다. 면적 보고 사세요. 가성비는 확실히 좋습니다.',
        pros: ['가성비', '방에 적당'],
        cons: ['넓은 거실 부족', '청정 속도 보통'],
      },
      {
        userType: '비염 있는 30대 직장인',
        rating: 4,
        text: '아침마다 코가 막혔는데 침실에 두고 자동모드로 돌리니 확실히 덜합니다. 미세먼지 나쁜 날 빨간불 떴다가 금방 파랑으로 바뀌는 거 보면 일은 제대로 하네요. 필터값이 좀 나가는 게 흠.',
        pros: ['자동모드 반응 빠름', '비염 완화', '취침 정숙'],
        cons: ['정품 필터 비쌈'],
      },
      {
        userType: '아이 키우는 신혼부부',
        rating: 4,
        text: '아기방에 들여놨는데 디자인 깔끔하고 작동 잘 됩니다. 필터 교체 알림 떠서 갈았더니 다시 잘 돌아가요. 다만 야간에 청정도 표시등이 좀 밝아서 취침등 끄듯 조절했으면 했어요.',
        pros: ['깔끔한 디자인', '필터 교체 알림', '아기방 적합'],
        cons: ['야간 표시등 밝음'],
      },
      {
        userType: '원룸 자취생',
        rating: 2,
        text: '청정 성능은 가격대 생각하면 그럭저럭인데, 풍량 3단 이상 올리면 소리가 생각보다 큽니다. 원룸이라 자는 동안 켜두기엔 부담돼서 결국 약풍으로만 써요. 강풍 소음만 잡혔어도 별 넷은 줬을 듯.',
        pros: ['저렴한 가격', '슬림해서 공간 절약'],
        cons: ['강풍 소음 큼', '취침 사용 부담'],
      },
    ],

    purchaseLinks: [
      { store: '위닉스 공식', url: '#', price: 319000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 259000 },
    ],

    similarProducts: ['samsung-bespoke-cube-air-ax90', 'lg-puricare-360-as203nw3a', 'coway-noble-ap-3023a'],
  },
  // === 제습기 ===
  {
    id: 'winix-posong-dehumidifier-16l',
    slug: 'winix-posong-dehumidifier-16l',
    brand: 'Winix',
    name: '뽀송 제습기 16L',
    modelNumber: 'DN2H160-IWK',
    category: '제습기',
    image: '/images/appliances/winix/dn2h160-iwk/main.webp',
    images: [],
    price: 384000,
    description: '위닉스 DN2H160-IWK 제습기. DN2 계열 설명서에 자동·연속제습, 강·약풍, 집중건조 키트, 연속배수와 자동 제상 기능이 안내된다.',
    oneliner: '27℃·습도 60% 시험 16L/일, 4.5L 물통과 연속배수로 관리하는 제습기',
    editorComment: 'DN2H160-IWK의 16L/일은 27℃·상대습도 60%에서 최대 풍량으로 연속 운전한 시험값이고 물통은 4.5L입니다. 그 조건이 이어지면 약 6.8시간(4.5÷16×24)마다 만수로 멈추므로, 밤새 비워 둘 공간이라면 호스보다 낮은 배수구까지 연속배수를 준비하세요. 설명서의 적정 사용온도는 18~35℃이고 18℃ 이하에서는 결빙으로 제습량이 줄 수 있습니다.',
    status: 'best',
    tags: ['위닉스', '뽀송', '제습기', '16L', '집중건조노즐', '연속배수', '가성비', '이동식'],

    specs: {
      energyEfficiency: 8,
      performance: 8,
      convenience: 6,
      durability: 7,
    },

    techSpecs: {
      coreTechnology: '콤프레서 제습 + 자동·연속제습 / 집중건조 키트',
      filterType: '세척 가능한 프리필터',
      capacity: '16L/일 (27℃·습도 60%, 최대 풍량 연속)',
      energyGrade: '1등급',
    },

    roomFit: {
      recommendedSize: [],
      installationType: '이동식',
      installationNote: 'DN2 계열 설명서는 벽에서 10cm 이상, TV 등 전자제품과 약 30cm 띄워 단단하고 평평한 바닥에 두고, 빨래건조대 바로 아래에는 두지 말라고 안내합니다. 연속배수는 내경 16mm 호스를 따로 구입해 연결하며, 배수구가 호스보다 낮아야 물이 빠집니다. 물통이 가득 차면 운전이 멈춥니다.',
    },

    targetUsers: {
      recommended: [
        '18℃ 이상으로 유지되는 장마철 방·드레스룸의 습기를 문 닫고 관리하려는 가정',
        '물통을 비우기 어려운 시간에 낮은 배수구까지 호스(내경 16mm)를 연결할 수 있는 집',
        '신발·좁은 수납공간에 집중건조킷을 쓰려는 사용자(미포함 판매 구성은 별도 구매)',
        '실내 빨래를 연속제습으로 말리되 건조대와 본체를 떨어뜨려 둘 수 있는 집',
      ],
      notRecommended: [
        '앱 원격제어 기능이 필요한 사용자(DN2 계열 설명서에 앱·Wi-Fi 기능 없음)',
        '공기청정 성능 수치가 필요한 사용자(플라즈마 기능의 청정 시험값 미공개)',
        '18℃ 아래로 내려가는 겨울 창고·북향 방이 주 용도인 경우',
      ],
    },

    features: [
      '16L/일 콤프레서 제습 (DN2 계열 설명서: 27℃·습도 60% 시험)',
      '자동·연속제습과 강·약풍 조절',
      '집중건조킷 (물통 안 보관, 미포함 구성은 별도 구매)',
      '연속배수 (내경 16mm 호스 별도 구입)',
      '만수 자동정지 + 이동 바퀴·손잡이',
      'dF 자동 제상 표시와 플라즈마 운전',
    ],

    priceAnalysis: {
      msrp: 384000,
      valueRating: 5,
      priceTier: 'mid',
      alternatives: ['coway-inverter-dehumidifier-10l'],
    },

    reviews: [
      {
        userType: '장마철 처음 산 자취생',
        rating: 5,
        text: '가격 대비 물 진짜 잘 뽑습니다. 장마철 하루 한 번은 물통 비워요. 신발 노즐로 운동화 안쪽까지 말려지는 게 신기하고 만족. 다만 돌리면 소리는 좀 있어요.',
        pros: ['제습량 만족', '집중건조 노즐', '가성비'],
        cons: ['작동음 있음'],
      },
      {
        userType: '거실에서 써본 30대',
        rating: 4,
        text: '16L라 실내 빨래 건조 보조로도 쓸 만하고 가성비 좋습니다. 대신 앱 같은 건 없고, TV 볼 때 작동음이 살짝 거슬리는 정도. 이 가격이면 납득합니다.',
        pros: ['빨래 건조 보조', '가성비'],
        cons: ['앱 미지원', 'TV 시청 시 작동음'],
      },
      {
        userType: '신축 입주 신혼부부',
        rating: 4,
        text: '새 아파트라 곰팡이 걱정에 들였는데 욕실·드레스룸 습기가 확실히 잡힙니다. 연속배수 호스 연결해두니 물통 비울 일도 없고 편해요. 16kg이라 층간 이동할 땐 좀 무겁네요.',
        pros: ['습기 제거 확실', '연속배수 편리', '1등급 전기료'],
        cons: ['무게 무거움'],
      },
      {
        userType: '침실에서 쓰는 직장인',
        rating: 2,
        text: '제습 성능 자체는 불만 없는데 취침모드여도 콤프레서 돌아가는 소리랑 진동이 있어서 예민한 사람은 잠들기 힘듭니다. 결국 거실에서 낮에만 돌리는 용도가 됐어요. 침실용으로는 비추.',
        pros: ['제습 성능 좋음'],
        cons: ['취침모드 소음', '콤프레서 진동'],
      },
      {
        userType: '실내건조 자주 하는 주부',
        rating: 4,
        text: '비 오는 날 빨래 널어두고 같이 돌리면 반나절이면 뽀송해져요. 쾌속모드가 특히 빨리 마릅니다. 다만 필터 청소 알림 뜰 때 청소 안 하면 흡입력이 눈에 띄게 떨어져서 관리는 좀 신경 써야 해요.',
        pros: ['빨래 빨리 건조', '쾌속모드 강력'],
        cons: ['필터 관리 필요'],
      },
    ],

    purchaseLinks: [
      { store: '위닉스 공식', url: '#', price: 339000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 269000 },
    ],

    similarProducts: ['coway-inverter-dehumidifier-10l', 'samsung-bespoke-dehumidifier-dg16a7500', 'lg-puricare-dehumidifier-dq16sdwhs'],
  },
];
