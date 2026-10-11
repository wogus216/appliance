import { Appliance } from '@/types/appliance';

export const samsungAppliances: Appliance[] = [
  {
    id: 'samsung-bespoke-wind-free-af25a9970',
    slug: 'samsung-bespoke-wind-free-af25a9970',
    brand: 'Samsung',
    name: '비스포크 윈드프리 AF25A9970',
    modelNumber: 'AF25A9970',
    category: '에어컨',
    image: '/images/appliances/samsung/af25a9970/main.webp',
    images: [],
    description: '삼성 비스포크 윈드프리 스탠드 에어컨. 무풍 냉방과 AI 절전 기능을 갖춘 프리미엄 모델.',
    oneliner: '무풍 냉방 + AI 절전, 25평형 프리미엄 스탠드 에어컨',
    editorComment: '삼성 에어컨 라인업의 최상위 모델입니다. 윈드프리 기술로 직접 바람 없이 냉방하며, AI가 사용 패턴을 학습해 전기요금을 절약합니다. 25평형 기준 냉방력이 충분하고, 1등급 에너지효율로 월 전기요금 부담이 적습니다. 다만 가격이 289만원으로 높은 편이라 가성비를 중시하면 하위 모델을 고려하세요.',
    status: 'featured',
    tags: ['삼성', '비스포크', '윈드프리', '스탠드', '에어컨', '25평', '무풍', '1등급'],

    specs: {
      energyEfficiency: 9,
      performance: 9,
      convenience: 9,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '윈드프리 무풍냉방 + AI 절전',
      filterType: 'PM 1.0 필터',
      refrigerant: 'R32',
      capacity: '25평형 (83.6m2)',
      energyGrade: '1등급',
    },

    roomFit: {
      recommendedSize: ['대형'],
      coverageArea: 83.6,
      installationType: '스탠드형',
      installationNote: '실외기 설치 공간 필요 (900x800x350mm)',
    },

    errorCodes: [
      {
        code: 'E1',
        description: '실내 온도센서 이상',
        cause: '온도센서 불량 또는 연결 불량',
        solution: '전원 끄고 10분 후 재가동. 반복 시 서비스센터 연락 (1588-3366)',
        severity: 'medium',
      },
      {
        code: 'E2',
        description: '실내 열교환기 센서 이상',
        cause: '열교환기 센서 고장',
        solution: '서비스센터 점검 필요',
        severity: 'high',
      },
      {
        code: 'E4',
        description: '실외기 온도센서 이상',
        cause: '실외기 센서 불량 또는 배선 문제',
        solution: '실외기 주변 청소 후 재가동. 반복 시 서비스센터 연락',
        severity: 'medium',
      },
      {
        code: 'E101',
        description: '통신 에러',
        cause: '실내기-실외기 통신 불량',
        solution: '전원 차단 후 5분 대기, 재가동. 반복 시 배선 점검 필요',
        severity: 'high',
      },
      {
        code: 'E121',
        description: '실내 온도센서(룸 센서) 이상으로 실내 온도를 감지하지 못함',
        cause: '실내기 온도센서 단선·단락, 센서 커넥터 접촉 불량, 제어 기판 불량',
        solution: '전원 플러그를 뽑거나 차단기를 내려 1~2분 후 재투입해 본다. 표시가 사라지지 않으면 센서·기판 점검이 필요하므로 삼성전자서비스(1588-3366)에 점검을 의뢰한다.',
        severity: 'medium',
      },
      {
        code: 'E154',
        description: '실내기 팬 모터가 정상 회전하지 않음(회전수 피드백 이상)',
        cause: '팬·토출구 이물질 끼임, 팬 모터 또는 모터 커넥터 불량, 제어 기판 이상',
        solution: '전원을 차단한 뒤 토출구와 팬 주변에 이물질이 끼어 있는지 확인하고 제거한 후 재가동한다. 증상이 반복되면 팬 모터·기판 점검이 필요하므로 삼성전자서비스(1588-3366)에 의뢰한다.',
        severity: 'medium',
      },
      {
        code: 'E458',
        description: '실외기 팬 모터의 과전류·구속 등 회전 이상',
        cause: '실외기 팬 이물질·결빙, 팬 모터 불량, 인버터 기판 이상',
        solution: '실외기 주변에 바람을 막는 장애물이 있는지 보고 통풍을 확보한다. 실외기실에 설치돼 있다면 갤러리 창을 완전히 열 것 — 닫혀 있으면 그것만으로 보호 제어가 걸린다. 팬 가드 안으로 손을 넣지 않는다(전원이 살아 있으면 예고 없이 돌고, 멈춰 있어도 바깥 바람에 돈다). 실외기는 임의로 분해하지 말고, 증상이 지속되면 삼성전자서비스(1588-3366)에 점검을 의뢰한다.',
        severity: 'high',
      },
      {
        code: 'E461',
        description: '컴프레서 기동 불량(시동 실패)로 냉방·난방이 되지 않음',
        cause: '공급 전압 불안정, 컴프레서 과부하·기동토크 부족, 인버터 기판 이상',
        solution: '전원을 끄고 수 분 기다린 뒤 다시 켜 본다. 다른 가전과 분리된 안정적인 전원에 연결되어 있는지 확인한다. 반복되면 컴프레서·인버터 점검이 필요하므로 삼성전자서비스(1588-3366)에 의뢰한다.',
        severity: 'high',
      },
    ],

    targetUsers: {
      recommended: [
        '25평 이상 거실 냉방이 필요한 가정',
        '직접 바람을 싫어하는 사용자',
        '전기요금 절약이 중요한 가정',
        'AI 자동 제어를 선호하는 사용자',
      ],
      notRecommended: [
        '소형 원룸 사용자 (오버스펙)',
        '가성비 우선 소비자',
        '벽걸이 설치만 가능한 환경',
      ],
    },

    features: [
      '윈드프리 무풍 냉방 (23,000개 마이크로 홀)',
      'AI 절전 모드 (사용 패턴 학습)',
      'PM 1.0 공기청정 필터',
      '스마트싱스 앱 원격 제어',
      '자동 청소 (건조+UV)',
    ],

    priceAnalysis: {
      valueRating: 3,
      priceTier: 'premium',
      alternatives: ['lg-whisen-obje-fq25sdwhs'],
    },

    reviews: [
      {
        userType: '30평 아파트 거주자',
        rating: 5,
        text: '무풍이라 아이 있는 집에 최고입니다. 직접 바람 맞으면 감기 걸리는데 이건 걱정 없어요. 전기요금도 전작 대비 확실히 줄었습니다.',
        pros: ['무풍 냉방', '전기요금 절약'],
        cons: ['비싼 가격'],
      },
      {
        userType: '에어컨 전문 설치기사',
        rating: 4,
        text: '성능은 확실하지만 가격이 높습니다. 20평 이하면 벽걸이로도 충분하니 평수에 맞게 선택하세요. 필터 청소는 2주 1회 권장합니다.',
        pros: ['확실한 냉방력'],
        cons: ['비싼 가격', '필터 관리'],
      },
      {
        userType: 'AI 절전 기능 활용 사용자',
        rating: 5,
        text: 'AI 절전 모드 켜두면 알아서 바람 세기를 조절해줘서 한여름 전기요금이 생각보다 적게 나왔어요. 스마트싱스로 외출 중에 미리 켜두는 것도 편합니다.',
        pros: ['AI 절전', '앱 원격제어'],
        cons: ['초기 설정 번거로움'],
      },
      {
        userType: '거실 25평 사용자',
        rating: 3,
        text: '냉방력은 만족스럽지만 무풍 모드는 한여름엔 시원해지는 속도가 좀 느립니다. 빨리 시원하게 하려면 결국 일반 냉방으로 돌리게 돼요.',
        pros: ['넓은 냉방 면적'],
        cons: ['무풍 냉방 속도', '비싼 가격'],
      },
      {
        userType: '신축 아파트 입주자',
        rating: 4,
        text: '디자인이 깔끔해서 거실에 둬도 고급스럽습니다. 자동 청소 기능 덕에 관리도 편한 편이에요. 다만 실외기 소음은 예상보다 조금 있습니다.',
        pros: ['디자인', '자동 청소'],
        cons: ['실외기 소음'],
      },
    ],

    purchaseLinks: [
      { store: '삼성닷컴', url: '#', price: 2890000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 2490000 },
    ],

    similarProducts: ['lg-whisen-obje-fq25sdwhs'],
  },

  {
    id: 'samsung-wind-free-ar07a9170',
    slug: 'samsung-wind-free-ar07a9170',
    brand: 'Samsung',
    name: '윈드프리 벽걸이 AR07A9170HCN',
    modelNumber: 'AR07A9170HCN',
    category: '에어컨',
    image: '/images/appliances/samsung/ar07a9170/main.webp',
    images: [],
    // 가격 철회(2026-10-08): 기존 789,990원의 출처 다나와 pcode 122688519는 AR07A9170HCS 상품
    // (7평 23.1㎡·2021년형·4등급·0.75kW)이고, 'AR07A9170HCN' 검색도 HCS 상품만 나온다.
    // 정확 모델 HCN의 조사가가 없으므로 price·msrp를 두지 않는다.
    description: '삼성 AR07A9170HCN은 표시 냉방 면적 24.4㎡, 공단 신고 3등급의 무풍 벽걸이 에어컨입니다. 이 사이트가 대조한 벽걸이 다섯 대의 설명서·제조사 페이지 중 무풍 운전과 앱 제어가 안내된 모델은 이것뿐입니다.',
    oneliner: '24.4㎡ 표시 면적과 무풍 운전을 갖춘 벽걸이 에어컨',
    editorComment: '고를 이유는 직바람을 줄이는 무풍 운전과 앱 제어이고, 전기요금 절약은 근거가 되지 않습니다. 6평형 4등급 두 모델보다 CSPF는 높아도 냉방능력이 커서 공단 신고 월 전력량이 13.5~15.2kWh 많습니다.',
    status: 'best',
    tags: ['삼성', '윈드프리', '벽걸이', '에어컨', '7평', '원룸'],

    specs: {
      // 정격 냉방 소비전력 850W — 삼성 공식 사양
      powerConsumption: 850,
      energyEfficiency: 8,
      performance: 7,
      convenience: 7,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '윈드프리 무풍냉방',
      // 삼성 지원 페이지 사양의 '청정: 극세 필터'(2026-10-08). 이전 'HD 필터'는 근거가 없었다.
      filterType: '극세 필터',
      // 냉매는 삼성 지원 페이지와 공용 설명서 규격표에 없어 비운다(2026-10-08).
      capacity: '7평형 (24.4m2)',
      dimensions: '820 x 299 x 215mm',
      // 공식 사양 기준 3등급. 카탈로그에 1등급으로 적혀 있던 것을 바로잡았다.
      energyGrade: '3등급',
      // 한국에너지공단 신고 260200419(실외기 AR07A9170HAX, 2020-11-30 완료, 2026-10-08 재확인).
      extraSpecs: [
        { label: '정격 냉방능력 (공단 신고)', value: '3,000W' },
        { label: '월간소비전력량 (공단 신고·1:1)', value: '103kWh' },
      ],
    },

    roomFit: {
      // 평수 등급 칩은 근거가 없어 비운다. 24.4㎡(약 7.4평)에 '소형(7~15평)'은 표시 면적을 넘는다.
      recommendedSize: [],
      coverageArea: 24.4,
      installationType: '벽걸이형',
      installationNote: '실외기 720×548×265mm(가로×높이×깊이, 설명서 31쪽). 배관 연장·보조 전원 스위치는 추가 비용이며, 삼성전자가 인정하지 않은 곳에서 설치하면 무상 서비스 불가',
    },

    targetUsers: {
      recommended: [
        '침대·책상에 직바람이 닿는 자리라 무풍 운전이 필요한 방',
        '외출 중 SmartThings 앱으로 켜고 끄려는 사용자(2.4GHz Wi-Fi 연결 필요)',
        '냉방 구역이 18.7㎡를 넘는 침실',
      ],
      notRecommended: [
        '무풍·앱 제어가 필요 없는 사용자',
        '실외기 자리에 720×548×265mm 실외기와 통풍 공간을 확보할 수 없는 집',
      ],
    },

    features: [
      '윈드프리 무풍 냉방',
      '3등급 에너지효율',
      '스마트싱스 앱 원격 제어 (2.4GHz Wi-Fi)',
      '쾌면(열대야 쾌면) 예약 (30분~12시간, 공용 설명서 기준)',
    ],

    priceAnalysis: {
      valueRating: 5,
      priceTier: 'mid',
      alternatives: ['samsung-bespoke-wind-free-af25a9970'],
    },

    reviews: [
      {
        userType: '원룸 자취생',
        rating: 5,
        text: '원룸에 딱 맞습니다. 바람 안 나오는데 시원하고, 전기요금도 만오천원 수준이라 부담 없어요.',
        pros: ['저렴한 전기요금', '무풍 냉방'],
        cons: ['좁은 냉방 면적'],
      },
      {
        userType: '오피스텔 거주 직장인',
        rating: 4,
        text: '설치도 금방 끝나고 작은 방 식히는 데는 충분합니다. 좋은잠 모드로 밤에 틀어두면 너무 춥지 않게 유지돼서 좋아요.',
        pros: ['빠른 설치', '좋은잠 모드'],
        cons: ['소음 약간'],
      },
      {
        userType: '신혼집 작은방 사용자',
        rating: 4,
        text: '가격 대비 무풍 기능이 있다는 게 가장 큰 장점이에요. 7평형이라 거실엔 부족하지만 침실용으로는 만족합니다.',
        pros: ['가성비', '무풍 냉방'],
        cons: ['거실엔 역부족'],
      },
      {
        userType: '15평 거실에 설치한 사용자',
        rating: 3,
        text: '방 하나엔 충분한데 거실 겸용으로 쓰니 한여름엔 냉방력이 살짝 부족합니다. 평수 작은 공간에 쓰는 게 맞는 것 같아요.',
        pros: ['저렴한 가격'],
        cons: ['냉방력 부족'],
      },
    ],

    purchaseLinks: [
      { store: '삼성닷컴', url: '#', price: 890000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 750000 },
    ],

    similarProducts: ['samsung-bespoke-wind-free-af25a9970'],
  },

  // === 제습기 ===
  {
    id: 'samsung-bespoke-dehumidifier-dg16a7500',
    slug: 'samsung-bespoke-dehumidifier-dg16a7500',
    brand: 'Samsung',
    name: '비스포크 제습기 DG16A7500',
    modelNumber: 'DG16A7500',
    category: '제습기',
    image: '/images/appliances/samsung/dg16a7500/main.webp',
    images: [],
    description: '삼성 비스포크 제습기. 16L/일 대용량 제습에 의류건조까지 가능한 프리미엄 모델.',
    oneliner: '16L 대용량 제습 + 의류건조, 비스포크 디자인',
    editorComment: '장마철 필수 가전으로, 하루 16L 제습량은 25평까지 커버합니다. 의류건조 기능이 있어 빨래 건조기 대용으로도 쓸 수 있습니다. 비스포크 디자인으로 거실에 놓아도 인테리어와 어울립니다.',
    status: 'featured',
    tags: ['삼성', '비스포크', '제습기', '16L', '의류건조', '1등급'],

    specs: {
      energyEfficiency: 8,
      performance: 8,
      convenience: 8,
      durability: 7,
    },

    techSpecs: {
      coreTechnology: '콤프레서 제습 + 의류건조 모드',
      filterType: '항균 필터',
      capacity: '16L/일',
      energyGrade: '1등급',
    },

    roomFit: {
      recommendedSize: ['소형', '중형', '대형'],
      coverageArea: 66,
      installationType: '이동식',
      installationNote: '배수 호스 연결 시 연속 배수 가능',
    },

    errorCodes: [
      {
        code: 'E1',
        description: '수위 센서 이상',
        cause: '물통이 가득 찼거나 수위센서 접촉 불량',
        solution: '물통 비우고 재장착. 반복 시 센서 청소 후 재시도',
        severity: 'low',
      },
      {
        code: 'E5',
        description: '습도센서 이상',
        cause: '습도센서 고장',
        solution: '전원 끄고 10분 후 재가동. 반복 시 서비스센터 연락 (1588-3366)',
        severity: 'medium',
      },
      {
        code: 'E8',
        description: '제상(성에 제거) 이상 — 열교환기에 성에가 과도하게 끼어 제습력이 떨어짐',
        cause: '낮은 실내 온도(18도 미만)에서 장시간 운전하거나 제상 센서 이상으로 자동 성에 제거가 원활하지 않음',
        solution: '전원을 끄고 1시간가량 두어 성에를 녹인 뒤 재가동하세요. 실온이 너무 낮을 때는 사용을 피하고, 반복되면 삼성전자 서비스센터(1588-3366)에 점검을 요청하세요',
        severity: 'medium',
      },
      {
        code: 'E9',
        description: '압축기(컴프레서) 보호 정지 — 제습이 멈춤',
        cause: '연속 운전으로 압축기가 과열되었거나 주변 통풍이 막혀 보호 회로가 작동함',
        solution: '전원을 끄고 약 30분 식힌 뒤 통풍이 잘 되는 곳으로 옮겨 재가동하세요. 흡입구·토출구가 벽에 너무 붙지 않도록 간격을 두세요. 반복 시 삼성전자 서비스센터(1588-3366) 문의',
        severity: 'high',
      },
      {
        code: 'tE',
        description: '온도센서 이상',
        cause: '내부 온도센서(NTC) 단선·고장 또는 커넥터 접촉 불량',
        solution: '전원 플러그를 뽑고 1~2분 후 다시 꽂아 재가동하세요. 일시 오류가 아니라면 센서 점검이 필요하므로 삼성전자 서비스센터(1588-3366)에 문의하세요',
        severity: 'medium',
      },
      {
        code: 'CE',
        description: '내부 제어부 통신 이상으로 동작이 멈춤',
        cause: '순간 정전·전압 변동 또는 제어 기판 커넥터 접촉 불량',
        solution: '전원 플러그를 뽑고 1분 이상 둔 뒤 다시 연결하세요. 단독 콘센트 사용을 권장하며, 반복되면 삼성전자 서비스센터(1588-3366)에 점검을 요청하세요',
        severity: 'low',
      },
    ],

    targetUsers: {
      recommended: [
        '장마철 습도 관리가 필요한 가정',
        '실내 빨래 건조가 잦은 가정',
        '지하/반지하 거주자',
      ],
      notRecommended: [
        '원룸 소형 제습만 필요한 경우 (오버스펙)',
        '소음에 매우 민감한 사용자',
      ],
    },

    features: [
      '16L/일 대용량 제습',
      '의류건조 집중 모드',
      '자동 습도 조절 (40~70%)',
      '물통 만수 알림 + 연속 배수',
      '비스포크 컬러 패널',
    ],

    priceAnalysis: {
      valueRating: 4,
      priceTier: 'mid',
      alternatives: ['lg-puricare-dehumidifier-dq16sdwhs'],
    },

    reviews: [
      {
        userType: '25평 아파트 거주자',
        rating: 4,
        text: '장마철에 하루 물통 2번 비웁니다. 제습력은 확실하고 의류건조도 쓸만해요. 다만 소음이 좀 있어서 밤에는 약풍 권장.',
        pros: ['강력한 제습력', '의류건조'],
        cons: ['소음'],
      },
      {
        userType: '반지하 거주자',
        rating: 5,
        text: '반지하라 곰팡이가 고민이었는데 이거 들이고 나서 벽지 눅눅한 게 확실히 줄었어요. 연속 배수로 호스 빼두니 물통 비울 일도 없습니다.',
        pros: ['곰팡이 예방', '연속 배수'],
        cons: ['전기요금 약간'],
      },
      {
        userType: '비스포크 가전 통일 가정',
        rating: 4,
        text: '거실에 둬도 디자인이 예뻐서 가전 같지 않아요. 제습량도 넉넉하고 자동 습도 조절이 편합니다. 무게가 좀 있어서 방 옮길 때는 불편하네요.',
        pros: ['디자인', '자동 습도조절'],
        cons: ['무거운 무게'],
      },
      {
        userType: '실내 빨래 자주 너는 주부',
        rating: 3,
        text: '의류건조 모드로 빨래 말리는 건 좋은데 건조기만큼 뽀송하진 않아요. 보조 수단으로는 쓸만하지만 큰 기대는 마세요.',
        pros: ['보조 의류건조'],
        cons: ['건조 성능 한계', '소음'],
      },
      {
        userType: '소음 민감한 사용자',
        rating: 2,
        text: '제습 성능은 좋은데 밤에 켜두면 콤프레서 돌아가는 소리가 거슬려서 잠을 설칩니다. 예민한 분들은 거실에만 쓰는 걸 추천해요.',
        pros: ['제습 성능'],
        cons: ['소음', '밤 사용 불편'],
      },
    ],

    purchaseLinks: [
      { store: '삼성닷컴', url: '#', price: 599000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 479000 },
    ],

    similarProducts: ['lg-puricare-dehumidifier-dq16sdwhs'],
  },

  // === 세탁기 ===
  {
    id: 'samsung-bespoke-grande-wf24a9500',
    slug: 'samsung-bespoke-grande-wf24a9500',
    brand: 'Samsung',
    name: '비스포크 그랑데AI WF24A9500',
    modelNumber: 'WF24A9500KE',
    category: '세탁기',
    image: '/images/appliances/samsung/wf24a9500/main.webp',
    images: [],
    price: 2250240,
    description: "삼성 WF24A9500KE는 세제·유연제 자동 투입과 AI맞춤세탁을 갖춘 24kg 드럼세탁기입니다. 코스마다 적재 상한이 따로 있고, 호환 건조기를 위에 쌓으면 올인원 컨트롤로 함께 조작할 수 있습니다.",
    oneliner: 'AI 맞춤세탁 + 버블워시, 24kg 대용량 드럼',
    editorComment: '24kg 표시와 자동 코스 상한이 다른 세탁기입니다. 무게·오염도를 감지하는 AI맞춤세탁은 최대 9kg이라(설명서 40쪽), 24kg를 한 번에 쓰려면 표준세탁을 직접 골라야 합니다.',
    status: 'best',
    tags: ['삼성', '비스포크', '그랑데', 'AI', '드럼세탁기', '24kg', '버블워시'],

    specs: {
      // 가열세탁 시 2200W — 삼성 공식 사양이 표기하는 소비전력
      powerConsumption: 2200,
      energyEfficiency: 9,
      performance: 9,
      convenience: 10,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: 'AI 맞춤세탁 + 버블워시',
      filterType: '급수 거름망·배수 필터(배수 필터 주 1회 이상 청소)',
      capacity: '24kg',
      dimensions: '686 x 984 x 850mm',
      weight: 110,
      energyGrade: '1등급',
    },

    roomFit: {
      // 세탁기에는 적용 평수 개념이 없다. 근거 없는 평수 칩을 붙이지 않는다.
      recommendedSize: [],
      coverageArea: 0,
      installationType: '드럼형',
      installationNote: '배수호스는 배수관보다 낮게, 3m 넘게 연장하지 않습니다(설명서 15쪽). 벽 간격과 콘센트 조건은 아래 디자인·설치 절에 정리했습니다.',
    },

    targetUsers: {
      recommended: [
        '빨래 양에 따라 AI맞춤세탁과 표준세탁을 나눠 쓰려는 가정',
        '호환 건조기를 전용 상단 키트로 직렬 설치해 올인원 컨트롤로 함께 조작하려는 가정',
        '세제·유연제 자동 투입량을 설정해 두고 매번 계량하는 일을 줄이려는 사용자',
      ],
      notRecommended: [
        '울·섬세의류·이불을 24kg에 맞춰 한 번에 몰아 세탁하려는 사용자',
        '설치 간격까지 더한 바닥 치수(디자인·설치 절)를 확보하기 어려운 좁은 세탁실',
      ],
    },

    features: [
      'AI 맞춤세탁 (무게·오염도 감지, 최대 9kg)',
      '버블불림 옵션 (코스 설정 후 선택)',
      '세제·유연제 자동 투입 (투입량·농축도 설정 변경)',
      '살균세탁 코스 (고온 세탁, 최대 9kg)',
      '스마트싱스 앱 원격 제어',
    ],

    priceAnalysis: {
      msrp: 2250240,
      valueRating: 4,
      priceTier: 'premium',
      alternatives: ['lg-trom-obje-fw25eswhs'],
    },

    reviews: [
      {
        userType: '4인 가족 주부',
        rating: 5,
        text: '24kg라 이불도 한 번에 들어갑니다. AI가 알아서 세탁 코스 잡아줘서 편해요. 버블워시 덕에 찬물 세탁해도 깨끗합니다.',
        pros: ['대용량', 'AI 맞춤세탁', '세탁력'],
        cons: ['비싼 가격'],
      },
      {
        userType: '맞벌이 직장인',
        rating: 4,
        text: 'DD모터라 탈수할 때 진동이 거의 없고 조용합니다. 스마트싱스로 세탁 완료 알림 받는 것도 편해요. 다만 대용량이라 본체가 커서 설치 공간을 좀 차지합니다.',
        pros: ['저소음', '앱 알림'],
        cons: ['큰 크기'],
      },
      {
        userType: '아이 둘 키우는 가정',
        rating: 5,
        text: '스팀 살균 세탁이 있어서 아이 옷이나 수건 삶는 느낌으로 빨 수 있어 좋아요. 오염 심한 것도 AI가 알아서 강하게 돌려줍니다.',
        pros: ['스팀 살균', 'AI 자동코스'],
        cons: ['긴 세탁 시간'],
      },
      {
        userType: '1인 가구 사용자',
        rating: 3,
        text: '성능은 정말 좋은데 혼자 살기엔 24kg가 너무 큽니다. 적은 빨래 돌릴 때도 물·전기가 아까운 느낌이라 가족 단위에 추천해요.',
        pros: ['세탁력'],
        cons: ['오버스펙', '큰 크기'],
      },
    ],

    purchaseLinks: [
      { store: '삼성닷컴', url: '#', price: 1590000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 1290000 },
    ],

    similarProducts: ['lg-trom-obje-fw25eswhs'],
  },

  // === 건조기 ===
  {
    id: 'samsung-bespoke-grande-dv17a9720',
    slug: 'samsung-bespoke-grande-dv17a9720',
    brand: 'Samsung',
    name: '비스포크 그랑데AI 건조기 DV17A9720',
    modelNumber: 'DV17A9720BV',
    category: '건조기',
    image: '/images/appliances/samsung/dv17a9720/main.webp',
    images: [],
    description: '삼성 DV17A9720BV는 17kg 건조 용량에 인버터 히트펌프와 히터를 함께 쓰는 건조기입니다. 7ℓ 내장 물통을 쓰며, 세탁기 위에 쌓을 수 있는 호환 키트가 있습니다.',
    oneliner: 'AI 건조 + 히트펌프·히터, 17kg 건조기',
    editorComment: '17kg 정격보다 코스 상한이 적재를 정하는 건조기입니다. 이불 코스는 4kg 이내 한 장(설명서 33쪽)이고 거위털·양모·목화솜 같은 충전재 이불은 건조할 수 없습니다.',
    status: 'featured',
    tags: ['삼성', '비스포크', '그랑데', '건조기', '히트펌프', '17kg', 'AI'],

    specs: {
      powerConsumption: 2400,
      energyEfficiency: 9,
      performance: 9,
      convenience: 9,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: 'AI 건조 + 인버터 히트펌프·히터',
      filterType: '필터(매회 청소)·마이크로 안심필터(알림 설정 시 25회마다)',
      capacity: '17kg',
      dimensions: '686 x 984 x 840mm',
      weight: 75,
      energyGrade: '1등급',
    },

    roomFit: {
      // 건조기에는 적용 평수 개념이 없다. 근거 없는 평수 칩을 붙이지 않는다.
      recommendedSize: [],
      coverageArea: 0,
      installationType: '독립형/스태킹',
      installationNote: '공용 설명서 기준 영상 5~35℃ 환경에 설치합니다(13쪽). 벽 간격과 직렬 설치 높이는 아래 디자인·설치 절, 물통·배수 방식은 물통과 직배수 중 선택 절에 정리했습니다.',
    },

    // DV17A9720BV 지원 페이지에 연결된 공용 설명서 인쇄 81쪽.
    errorCodes: [
      {
        code: 'HC',
        description: '압축기 과열 점검 표시',
        cause: '설명서가 압축기 과열로 분류한 표시이며, 고장 부품과 원인은 현장 점검 전 특정할 수 없습니다.',
        solution: '표시가 계속되면 삼성전자서비스(1588-3366)에 점검을 요청하세요. 반복 재시작이나 내부 부품 분해로 해소하려 하지 마세요.',
        severity: 'high',
      },
      {
        code: 'TC5',
        description: '압축기 온도 센서 관련 점검 표시',
        cause: '압축기 온도를 감지하는 계통의 문제로 안내됩니다. 코드만으로 센서 교체가 필요하다고 확정할 수 없습니다.',
        solution: '2~3분 기다린 다음 전원을 켜고 다시 시작하세요. 같은 표시가 남으면 삼성전자서비스(1588-3366)에 점검을 요청하세요.',
        severity: 'medium',
      },
      {
        code: '9C2',
        description: '저전압 감지',
        cause: '제품에 공급되는 전압이 낮은 것으로 감지된 상태입니다.',
        solution: '설명서는 전원 코드가 꽂혀 있는지, 다른 콘센트에 꽂았을 때 전원이 들어오는지, 멀티탭이 220V 16A 이상이고 단독으로 쓰이는지, 절전 콘센트라면 상시 모드로 바꿨는지를 차례로 확인하도록 합니다. 다른 기기와 멀티탭을 나눠 쓰고 있었다면 그것부터 분리하세요. 손상되거나 젖은 콘센트는 만지지 말고, 네 가지를 확인한 뒤에도 표시가 계속되면 삼성전자서비스(1588-3366)에 문의하세요.',
        severity: 'medium',
      },
    ],

    targetUsers: {
      recommended: [
        '호환 세탁기 위에 전용 키트로 직렬 설치해 올인원 컨트롤로 함께 조작하려는 가정',
        '배수구가 가까워 매회 물통 비우기를 없애려는 세탁실',
        '타월·일상복처럼 텀블 건조가 허용된 빨래를 자주 말리는 가정',
      ],
      notRecommended: [
        '영하로 내려가거나 5℃ 아래로 떨어지는 베란다에 둘 수밖에 없는 집',
        '충전재 이불이나 큰 이불을 건조기로 말리는 것이 주된 구매 이유인 사용자',
      ],
    },

    features: [
      'AI맞춤건조 코스 (건조 용량 이하)',
      '인버터 히트펌프 + 히터 건조',
      '내장 물통 7ℓ·직배수 전환',
      '마이크로 안심필터·필터 체크 알람',
      '호환 세탁기와 올인원 컨트롤 연결',
    ],

    priceAnalysis: {
      valueRating: 4,
      priceTier: 'premium',
      alternatives: ['lg-trom-obje-dryer-rd20wswhs'],
    },

    reviews: [
      {
        userType: '맞벌이 부부',
        rating: 5,
        text: '장마철 구세주입니다. 밤에 세탁기 돌리고 바로 건조기에 넣으면 아침에 뽀송뽀송. 히트펌프라 니트도 걱정 없어요.',
        pros: ['옷감 보호', '건조 성능'],
        cons: ['긴 건조 시간'],
      },
      {
        userType: '세탁기와 스태킹 설치한 사용자',
        rating: 5,
        text: '세탁기 위에 스태킹으로 올리니 공간 차지도 안 하고 동선이 편합니다. 17kg라 이불 건조도 한 번에 되고 리버스 드럼이라 빨래도 덜 엉켜요.',
        pros: ['공간 절약', '대용량'],
        cons: ['설치비 추가'],
      },
      {
        userType: '미세먼지 때문에 구매한 가정',
        rating: 4,
        text: '미세먼지 심한 날 실외 건조가 꺼려져서 들였는데 대만족입니다. 다만 전기요금이 에어컨만큼은 아니어도 매일 돌리면 좀 부담돼요.',
        pros: ['실내 건조', '먼지 걱정 없음'],
        cons: ['전기요금'],
      },
      {
        userType: '건조 시간 신경 쓰는 사용자',
        rating: 3,
        text: '저온 건조라 옷감엔 좋은데 한 번 돌리는 데 시간이 꽤 걸립니다. 급할 때는 답답할 수 있으니 시간 여유 두고 쓰는 게 좋아요.',
        pros: ['옷감 보호'],
        cons: ['긴 건조 시간'],
      },
    ],

    purchaseLinks: [
      { store: '삼성닷컴', url: '#', price: 1490000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 1190000 },
    ],

    similarProducts: ['lg-trom-obje-dryer-rd20wswhs'],
  },

  // === 공기청정기 ===
  {
    id: 'samsung-bespoke-cube-air-ax90',
    slug: 'samsung-bespoke-cube-air-ax90',
    brand: 'Samsung',
    name: '비스포크 큐브 에어 AX90',
    modelNumber: 'AX90B7980WBD',
    category: '공기청정기',
    image: '/images/appliances/samsung/ax90b7980wbd/main.webp',
    images: [],
    description: '삼성 비스포크 큐브 에어 공기청정기. 적층형 큐브 디자인에 무풍 청정과 맞춤형 색상을 갖춘 27평형 모델.',
    oneliner: '큐브 적층 디자인 + 무풍 청정, 인테리어가 되는 27평형 공기청정기',
    editorComment: '인테리어 가전을 지향하는 삼성 비스포크 라인의 공기청정기입니다. 적용면적 90m2(27평)로 거실급이고, 큐브를 위로 쌓아 청정 용량을 늘리는 적층 구조가 특징입니다. 무풍 청정 모드는 직바람 없이 조용하게 돌아가 침실에도 부담이 적습니다. 코웨이 노블 대비 순수 청정 속도는 비슷하거나 약간 아래지만, 비스포크 색상과 스마트싱스 생태계가 강점입니다. 삼성 가전을 쓰고 있다면 연동 면에서 자연스러운 선택입니다.',
    status: 'featured',
    tags: ['삼성', '비스포크', '큐브에어', '공기청정기', '27평', '무풍청정', '적층형', '1등급'],

    specs: {
      energyEfficiency: 8,
      performance: 9,
      convenience: 9,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '무풍 청정 + 3방향 청정 + 적층형 큐브',
      filterType: 'PM 1.0 헤파 + 일체형 탈취 필터',
      capacity: '27평형 (90m2)',
    },

    roomFit: {
      recommendedSize: ['중형', '대형'],
      coverageArea: 90,
      installationType: '이동식 / 적층형',
      installationNote: '큐브 2단 적층 시 청정 용량 확대. 필터 약 1년 주기 교체',
    },

    errorCodes: [
      {
        code: 'C1',
        description: '먼지 센서 점검',
        cause: '먼지 센서 흡입부 오염',
        solution: '센서 흡입구를 청소하고 재가동. 반복 시 삼성전자 서비스센터(1588-3366) 문의',
        severity: 'low',
      },
      {
        code: 'FILTER',
        description: '필터 교체 알림',
        cause: '헤파 필터 사용 시간 도달',
        solution: '정품 필터로 교체 후 스마트싱스 앱 또는 본체에서 필터 알림 리셋',
        severity: 'low',
      },
      {
        code: 'C2',
        description: '팬 모터 회전 이상으로 청정 운전이 멈춤',
        cause: '팬·흡입구에 이물질이 끼었거나 팬 모터 또는 커넥터 불량',
        solution: '전원을 끄고 흡입구·토출구와 팬 주변의 이물질을 제거한 뒤 재가동하세요. 반복되면 팬 모터 점검이 필요하므로 삼성전자 서비스센터(1588-3366)에 문의하세요',
        severity: 'medium',
      },
      {
        code: 'C7',
        description: '냄새(가스) 센서 점검 — 청정도 표시가 부정확함',
        cause: '가스 센서부 오염 또는 주방·흡연 등 강한 냄새에 장시간 노출되어 감지가 불안정함',
        solution: '센서 주변을 환기하고 흡입부를 청소한 뒤 재가동하세요. 깨끗이 한 뒤에도 반복되면 삼성전자 서비스센터(1588-3366)에 점검을 요청하세요',
        severity: 'low',
      },
      {
        code: 'U2',
        description: '필터 미장착 또는 전면 덮개(그릴) 열림 감지',
        cause: '필터를 빼거나 덜 장착한 상태, 또는 전면 덮개가 완전히 닫히지 않음',
        solution: '정품 필터의 비닐을 벗겨 정위치에 끼우고 전면 덮개를 \'딸깍\' 소리가 날 때까지 닫은 뒤 재가동하세요. 그래도 표시되면 삼성전자 서비스센터(1588-3366) 문의',
        severity: 'low',
      },
      {
        code: 'E8',
        description: '내부 제어부 통신 이상으로 동작이 멈춤',
        cause: '순간 정전·전압 변동 또는 제어 기판 커넥터 접촉 불량',
        solution: '전원 플러그를 뽑고 1분 이상 둔 뒤 다시 연결하세요. 반복되면 기판 점검이 필요하므로 삼성전자 서비스센터(1588-3366)에 문의하세요',
        severity: 'medium',
      },
    ],

    targetUsers: {
      recommended: [
        '인테리어와 어울리는 공기청정기를 원하는 가정',
        '직바람 없는 무풍 청정을 선호하는 사용자',
        '삼성 가전·스마트싱스를 함께 쓰는 가정',
        '거실용 27평형 청정이 필요한 사용자',
      ],
      notRecommended: [
        '원룸·작은 방 전용 (오버스펙)',
        '가성비를 최우선으로 보는 소비자',
      ],
    },

    features: [
      '무풍 청정 (직바람 없는 저소음 운전)',
      '적층형 큐브 디자인 (청정 용량 확장)',
      'PM 1.0 헤파 필터',
      '비스포크 맞춤 컬러 패널',
      '스마트싱스 앱 원격 제어·필터 알림',
    ],

    priceAnalysis: {
      valueRating: 4,
      priceTier: 'premium',
      alternatives: ['coway-noble-ap-3023a', 'lg-puricare-360-as203nw3a'],
    },

    reviews: [
      {
        userType: '비스포크 가전으로 통일한 가정',
        rating: 5,
        text: '냉장고·에어컨이 다 비스포크라 색 맞춰 들였어요. 무풍 청정이라 밤에 켜둬도 조용하고, 스마트싱스에서 한 번에 관리돼서 편합니다.',
        pros: ['디자인 통일', '무풍 저소음'],
        cons: ['비싼 가격'],
      },
      {
        userType: '디자인 보고 산 사용자',
        rating: 4,
        text: '거실에 두니 가전 같지 않고 인테리어 소품 느낌. 청정 성능도 충분합니다. 다만 적층까지 하면 가격이 꽤 올라가요.',
        pros: ['인테리어', '청정 성능'],
        cons: ['적층 비용'],
      },
      {
        userType: '알레르기 비염 가족',
        rating: 4,
        text: '먼지 농도 올라가면 자동으로 세게 돌아가서 아침 비염이 한결 나아졌어요. PM 1.0 필터라 미세먼지 잡는 건 확실합니다. 필터값이 좀 나가는 게 흠.',
        pros: ['미세먼지 제거', '자동 운전'],
        cons: ['필터 교체 비용'],
      },
      {
        userType: '27평 거실 사용자',
        rating: 3,
        text: '청정 면적은 표기대로 넓은데 강풍으로 돌리면 생각보다 소리가 큽니다. 무풍 모드는 조용한 대신 정화 속도가 느려서 상황 따라 바꿔 써요.',
        pros: ['넓은 청정 면적'],
        cons: ['강풍 소음', '무풍 속도'],
      },
    ],

    purchaseLinks: [
      { store: '삼성닷컴', url: '#', price: 499000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 399000 },
    ],

    similarProducts: ['coway-noble-ap-3023a', 'lg-puricare-360-as203nw3a', 'winix-tower-xq-azbe630'],
  },

  // === 냉장고 ===
  {
    id: 'samsung-bespoke-4door-rf85',
    slug: 'samsung-bespoke-4door-rf85',
    brand: 'Samsung',
    name: '비스포크 4도어 RF85',
    modelNumber: 'RF85C90D1AP',
    category: '냉장고',
    image: '/images/appliances/samsung/rf85c90d1ap/main.webp',
    images: [],
    price: 2898000,
    description: '삼성 비스포크 4도어 RF85C90D1AP. 875L를 냉장 522L·냉동 177L·맞춤보관실 176L로 나누고, 디지털 인버터 컴프레서·트리플 독립냉각·일반 쿨링커버(+엣지 쿨링)를 표기한 모델입니다.',
    oneliner: '875L 4도어 + 맞춤보관실 176L, 도어 패널 교체 가능',
    editorComment: '김치·살얼음·냉동으로 바꿔 쓰는 맞춤보관실이 필요한 집에 맞는 4도어입니다. 냉동만 보면 맞춤보관실까지 냉동으로 써도 353L로, 같은 폭 LG T873(367L)보다 14L 작습니다.',
    status: 'featured',
    tags: ['삼성', '비스포크', '냉장고', '4도어', '875L', '일반 쿨링커버', '인버터', '1등급'],

    specs: {
      energyEfficiency: 9,
      performance: 9,
      convenience: 9,
      durability: 9,
    },

    techSpecs: {
      // 삼성 정확한 모델 사양(2026-10-08 재확인)은 '트리플 독립냉각'을 적고 정온 항목은 두지 않는다.
      coreTechnology: '디지털 인버터 컴프레서 + 트리플 독립냉각',
      filterType: '청정탈취(탈취기)',
      refrigerant: 'R600a',
      capacity: '875L (냉장 522·냉동 177·맞춤보관 176L)',
      dimensions: '912 x 1853 x 930mm',
      weight: 144,
      energyGrade: '1등급',
    },

    // 냉장고에는 평형 개념이 없어 추천 평수를 비운다. 이격·문 열림 치수는 지원 페이지가 연결한
    // RF60/85/84C* 공용 사용설명서(ver.5.0) 인쇄 5·74쪽(뒷면·옆면 5cm)과 97쪽(RF85/84C* 열)에서 옮겼다.
    // 상부 여유 수치는 설명서에 없다.
    roomFit: {
      recommendedSize: [],
      installationType: '4도어 (프리스탠딩)',
      installationNote: '삼성 공용 설명서 기준 뒷면·옆면을 벽에서 5cm 이상 띄우고(필요 공간표는 뒷벽 50mm 이상), 상부 여유 수치는 적혀 있지 않습니다. 문을 90°로 열면 뒷면부터 1,268mm·본체 옆으로 55mm, 끝까지(125°) 열면 폭 1,498mm가 필요합니다.',
    },

    targetUsers: {
      recommended: [
        '맞춤보관실 176L를 냉동·김치·살얼음·냉장으로 바꿔 쓰려는 가정 (공용 설명서 기준 7가지 모드)',
        '나중에 도어 패널 색을 바꿀 계획이 있는 사용자 (패널 교체 가능 표기, 교체는 유상일 수 있음)',
        '현관이 좁아 문을 떼고 들여야 하는 집 (설명서에 문 분리 방법)',
        'SmartThings 앱으로 다른 삼성 가전을 이미 관리하는 사용자',
      ],
      notRecommended: [
        '냉장고장 내경 높이가 1,853mm 미만이거나 폭이 912mm 미만인 집',
        '냉동 칸이 최대한 커야 하는 가정 (같은 폭 T873이 더 큼)',
        '수도 연결 자동 제빙이 필요한 가정 (슬림 아이스메이커는 물컵에 직접 물을 붓는 방식)',
      ],
    },

    features: [
      '875L = 냉장 522L + 냉동 177L + 맞춤보관실 176L',
      '맞춤보관실 모드 냉동·살얼음(-5℃)·냉장(2℃)·맥주(4℃)·김치 3단 (공용 설명서)',
      '트리플 독립냉각 · 냉동실 정온(공용 설명서) · 일반 쿨링커버(+엣지 쿨링)',
      '디지털 인버터 컴프레서 · 1등급 · 43.0kWh/월 (삼성 사양)',
      '도어 패널 교체 가능 · 슬림 아이스메이커(물컵 직접 급수) · SmartThings',
    ],

    priceAnalysis: {
      msrp: 2898000,
      valueRating: 4,
      priceTier: 'luxury',
      alternatives: ['lg-dios-obje-4door-t873', 'samsung-bespoke-sxs-rs84'],
    },

    reviews: [],

    purchaseLinks: [
      { store: '삼성닷컴', url: '#', price: 3590000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 2990000 },
    ],

    similarProducts: ['lg-dios-obje-4door-t873', 'samsung-bespoke-sxs-rs84', 'haier-mini-fridge-155'],
  },

  {
    id: 'samsung-bespoke-sxs-rs84',
    slug: 'samsung-bespoke-sxs-rs84',
    brand: 'Samsung',
    name: '양문형 냉장고 RS84',
    modelNumber: 'RS84B5061M9',
    category: '냉장고',
    image: '/images/appliances/samsung/rs84b5061m9/main.webp',
    images: [],
    description: '삼성 RS84B5061M9 양문형 냉장고. 846L, 더블냉각, 디지털 인버터 컴프레서와 푸드쇼케이스 도어를 갖춘 모델입니다. 공식 사양은 패널 교체가 불가능하다고 명시합니다.',
    oneliner: '846L 양문형 + 더블냉각, 패널 교체는 불가',
    editorComment: '냉장 526L·냉동 320L 양문형이며 도어 패널 교체는 지원하지 않습니다. 냉동 320L는 같은 회사 4도어 RF85의 냉동 177L보다 크지만 LG 4도어 T873의 367L보다는 작습니다. 삼성 사양의 2등급·53.0kWh/월은 RF85의 43.0kWh/월보다 월 10.0kWh 많은 표시값이며, 집의 청구액이 아닙니다.',
    status: 'best',
    tags: ['삼성', '냉장고', '양문형', '846L', '더블냉각', '디지털 인버터', '푸드쇼케이스'],

    specs: {
      energyEfficiency: 8,
      performance: 8,
      convenience: 8,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '디지털 인버터 컴프레서 + 더블냉각',
      filterType: '솔라파워탈취기',
      refrigerant: 'R600a',
      capacity: '846L (냉장 526·냉동 320L)',
      dimensions: '912 x 1780 x 915mm',
      weight: 125,
      // 공식 사양 기준 2등급. 카탈로그의 1등급 표기를 바로잡았다.
      energyGrade: '2등급',
    },

    // 냉장고에는 평형 개념이 없어 추천 평수를 비운다. 이격·문 열림 치수는 지원 페이지가 연결한
    // SBS 공용 사용설명서(RS5000T, ver.1.0) 인쇄 4·50쪽(뒷면·옆면 5cm)과 70쪽(치수표가 이 모델과 같음)에서 옮겼다.
    roomFit: {
      recommendedSize: [],
      installationType: '양문형 (프리스탠딩)',
      installationNote: '삼성 공용 설명서 기준 뒷면·옆면을 벽에서 5cm 이상 띄우고(필요 공간표는 뒷벽 50mm 이상 권장), 상부 여유 수치는 적혀 있지 않습니다. 양문을 90°로 열면 뒷면부터 1,364mm·본체 옆으로 29mm, 끝까지 열면 폭 1,726mm가 필요합니다.',
    },

    targetUsers: {
      recommended: [
        '상부·하부보다 좌우로 나뉜 냉장·냉동 칸을 원하는 가정',
        '칸 전환 없이 냉동 전용 320L를 쓰려는 가정 (RF85는 냉동 177L에 맞춤보관실 176L를 따로 둠)',
        '도어 색 교체 없이 젠틀실버(메탈) 도어로 충분한 사용자',
        '양문형 인버터 컴프레서의 10년 보증 항목을 보증서로 확인하고 사려는 사용자',
      ],
      notRecommended: [
        '나중에 도어 색을 바꾸려는 사용자 (패널 교체 불가능)',
        '냉장고 자리 내경 폭이 912mm보다 좁은 집',
        '문 앞 공간이 뒷면부터 1,364mm에 못 미치는 주방 (양문을 90°로 열 때, 4도어 RF85는 1,268mm)',
        '월 표시 전력량이 낮은 모델을 우선하는 사용자 (2등급·53.0kWh/월)',
      ],
    },

    features: [
      '846L = 냉장 526L + 냉동 320L',
      '더블냉각 (삼성 공식 사양 표기)',
      '디지털 인버터 컴프레서 · 2등급 · 53.0kWh/월 (삼성 사양)',
      '슬림 아이스메이커 (물컵에 직접 급수, 공용 설명서)',
      'SmartThings 앱 지원',
    ],

    priceAnalysis: {
      valueRating: 4,
      priceTier: 'premium',
      alternatives: ['samsung-bespoke-4door-rf85', 'lg-dios-obje-4door-t873'],
    },

    reviews: [
      {
        userType: '4인 가족, 4도어와 고민한 사용자',
        rating: 4,
        text: '4도어 반값에 용량은 비슷해서 이걸로 갔어요. 양문이라 큰 냄비도 잘 들어가고 만족합니다. 세세한 수납칸은 4도어가 낫겠더라고요.',
        pros: ['가성비', '대용량'],
        cons: ['수납 세분화 부족'],
      },
      {
        userType: '대용량 우선 신혼부부',
        rating: 5,
        text: '846L인데 가격은 4도어 절반이라 가성비 끝판왕입니다. 트윈 쿨링이라 김치 냄새가 냉장실로 안 넘어와서 좋아요.',
        pros: ['가성비', '냄새 분리'],
        cons: ['디자인 평범'],
      },
      {
        userType: '비스포크 도어로 고른 사용자',
        rating: 4,
        text: '양문형도 비스포크 색상이 있어서 주방 톤에 맞췄어요. 좌우로 활짝 열려서 큰 그릇 넣기 편합니다. 다만 냉동실 폭이 양문이라 좀 좁은 편이에요.',
        pros: ['디자인', '넓은 개방'],
        cons: ['냉동실 폭'],
      },
      {
        userType: '4도어에서 갈아탄 사용자',
        rating: 3,
        text: '용량은 충분한데 4도어 쓰다 오니 칸 구성이 단순해서 정리가 좀 아쉽습니다. 가격 보고 타협한 거라 후회는 없지만 수납 중시하면 4도어가 나아요.',
        pros: ['넉넉한 용량'],
        cons: ['수납 구성 단순'],
      },
    ],

    purchaseLinks: [
      { store: '삼성닷컴', url: '#', price: 1890000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 1490000 },
    ],

    similarProducts: ['samsung-bespoke-4door-rf85', 'lg-dios-obje-4door-t873', 'haier-mini-fridge-155'],
  },
  // === 식기세척기 ===
  {
    id: 'samsung-bespoke-dishwasher-dw60',
    slug: 'samsung-bespoke-dishwasher-dw60',
    brand: 'Samsung',
    name: '비스포크 식기세척기 14인용 DW60A8375BB',
    modelNumber: 'DW60A8375BB',
    category: '식기세척기',
    image: '/images/appliances/samsung/dw60a8375bb/main.webp',
    images: [],
    description: '삼성 비스포크 14인용 빌트인 식기세척기. 워터월(WaterWall) 면세척과 인버터 모터, 스마트싱스, 세척 후 문이 자동으로 열리는 오토 오픈 도어 건조를 갖춘 프리미엄 모델.',
    oneliner: '워터월 면세척 + 오토 오픈 건조, 4인+ 가족용 14인용 빌트인 식기세척기',
    editorComment: '삼성 식기세척기 라인업의 상위 모델로, 분사 노즐이 좌우로 움직이며 물의 벽을 만드는 워터월 면세척이 핵심입니다. 인버터 모터로 소음이 44dB 수준까지 낮고, 세척이 끝나면 문이 살짝 자동으로 열려 잔열로 건조하는 오토 오픈 방식이라 별도 송풍 건조보다 전기를 덜 씁니다. 6인용 식탁형이 1~2인 자취·신혼용이라면 이 14인용은 냄비·프라이팬까지 한 번에 돌리는 4인 이상 가족·빌트인 주방을 위한 체급입니다. LG 1등급 빌트인과 양강 구도인데, 삼성은 비스포크 색상과 스마트싱스 연동이 강점이고 약점은 빌트인 시공이 필수라 설치 자유도가 낮다는 점입니다.',
    status: 'featured',
    tags: ['삼성', '비스포크', '식기세척기', '14인용', '빌트인', '워터월', '인버터', '1등급'],

    specs: {
      energyEfficiency: 9,
      performance: 9,
      convenience: 9,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '워터월(WaterWall) 면세척 + 인버터 모터 + 오토 오픈 도어 건조',
      filterType: '3중 자가세정 필터',
      capacity: '14인용',
      energyGrade: '1등급',
    },

    roomFit: {
      recommendedSize: ['중형', '대형', '초대형'],
      coverageArea: 0,
      installationType: '빌트인',
      installationNote: '60cm 빌트인 규격(폭 598mm). 싱크대 하부 급수·온수 분기, 배수 연결, 단독 콘센트가 필요하며 도어 개폐 공간을 확보해야 합니다. 빌트인 시공은 전문 설치 기사 방문이 필수입니다.',
    },

    errorCodes: [
      {
        code: '4C',
        description: '급수 이상',
        cause: '수도 밸브가 잠겼거나 급수 호스가 꺾임·동결, 또는 급수 필터(거름망) 막힘',
        solution: '수도 밸브를 완전히 열고 급수 호스 꼬임·동결을 점검하세요. 호스 연결부 급수 필터를 분리해 청소 후 재가동. 반복 시 삼성전자 서비스센터(1588-3366) 문의',
        severity: 'medium',
      },
      {
        code: '5C',
        description: '배수 이상',
        cause: '바닥 배수 필터(자가세정 필터) 막힘 또는 배수 호스 꺾임·높이 부적합',
        solution: '바닥 배수 필터를 분리해 음식물 찌꺼기를 제거하고, 배수 호스가 꺾이거나 너무 높게 연결되지 않았는지 확인 후 재가동',
        severity: 'medium',
      },
      {
        code: 'LC',
        description: '누수 감지',
        cause: '본체 하단 누수 센서가 물을 감지(호스 연결부 누수, 도어 개스킷 노후, 내부 누수)',
        solution: '전원과 수도 밸브를 잠그고 급·배수 호스 연결부 누수를 점검하세요. 바닥에 고인 물을 제거해도 코드가 사라지지 않으면 내부 누수일 수 있으니 사용을 멈추고 서비스센터(1588-3366)에 점검을 요청하세요',
        severity: 'high',
      },
      {
        code: '4C2',
        description: '급수되는 물의 온도가 기준보다 높을 때(온수가 연결된 경우) 표시됩니다.',
        cause: '식기세척기 급수 호스가 온수 수전이나 온수 배관에 연결되어, 들어오는 물 온도가 허용 범위를 초과한 경우입니다. (식기세척기는 자체적으로 물을 데우므로 냉수 연결이 기본입니다.)',
        solution: '급수 호스를 냉수 수전에 연결했는지 확인하고, 온수에 연결돼 있으면 냉수로 바꿔 주세요. 냉수로 변경 후에도 반복되면 삼성전자서비스(1588-3366)에 점검을 요청하세요.',
        severity: 'medium',
      },
      {
        code: '3C',
        description: '세척수를 순환시키는 펌프(순환모터)가 정상 동작하지 않을 때 표시됩니다.',
        cause: '순환펌프 모터 또는 구동부 이상, 모터 주변 이물질 끼임, 관련 배선·기판 이상 등이 원인입니다.',
        solution: '전원 플러그를 뽑고 1~2분 뒤 다시 켜서 일시적 오류인지 확인하세요. 반복되면 내부 부품 점검이 필요하므로 임의 분해하지 말고 삼성전자서비스(1588-3366)에 접수하세요.',
        severity: 'high',
      },
      {
        code: '7C',
        description: '회전 분사(워터월)·분사암 계통이 제대로 회전하거나 동작하지 않을 때 표시됩니다.',
        cause: '하단 분사암이나 워터월 가이드에 식기·이물질이 걸려 회전이 막혔거나, 구동부에 이상이 있는 경우입니다.',
        solution: '전원을 끄고 하단 분사암·워터월 부위에 그릇이나 이물질이 걸렸는지 확인해 제거한 뒤, 식기를 다시 정리하고 재실행하세요. 정리 후에도 반복되면 삼성전자서비스(1588-3366) 점검을 받으세요.',
        severity: 'medium',
      },
      {
        code: 'HC',
        description: '물을 데우는 히터/온도 계통에 이상이 있거나 과열이 감지될 때 표시됩니다.',
        cause: '히터 단선·고장 또는 온도센서 이상으로, 세척수가 정상 온도로 가열되지 않거나 과도하게 가열되는 경우입니다.',
        solution: '전원을 끄고 잠시 후 재시작해 일시 오류인지 확인하세요. 히터·센서 점검은 분해가 필요하므로 반복되면 임의로 분해하지 말고 삼성전자서비스(1588-3366)에 의뢰하세요.',
        severity: 'high',
      },
      {
        code: 'OC',
        description: '내부 수위가 기준보다 높게(과수위) 감지될 때 표시됩니다.',
        cause: '세제 과다 사용으로 거품이 넘치거나, 급수 밸브가 완전히 잠기지 않아 물이 계속 유입되거나, 수위센서(플로트) 이상이 원인일 수 있습니다.',
        solution: '식기세척기 전용 세제를 정량만 사용하고 일반 주방세제는 쓰지 마세요. 전원을 껐다 켜서 배수가 끝난 뒤 다시 시도하고, 반복되면 삼성전자서비스(1588-3366)에 점검을 요청하세요.',
        severity: 'medium',
      },
    ],

    targetUsers: {
      recommended: [
        '냄비·프라이팬까지 한 번에 돌리는 4인 이상 가족',
        '싱크대 하부에 빌트인 시공이 가능한 주방',
        '고온 헹굼·살균으로 위생 세척을 원하는 가정',
        '삼성 가전·스마트싱스를 함께 쓰는 사용자',
      ],
      notRecommended: [
        '1~2인 자취·신혼 가구(6인용 식탁형이 적합)',
        '빌트인 시공이 어려운 전월세·좁은 주방',
        '초기 설치·시공 비용을 부담스러워하는 소비자',
      ],
    },

    features: [
      '워터월 면세척(좌우 이동 분사로 사각지대 최소화)',
      '오토 오픈 도어 건조(세척 후 문 자동 개방, 잔열 건조)',
      '인버터 모터(저소음 44dB·내구성)',
      '고온 세척·헹굼 살균 코스',
      '스마트싱스 앱 원격 제어·코스 알림',
    ],

    priceAnalysis: {
      valueRating: 4,
      priceTier: 'premium',
      alternatives: ['lg-dios-dishwasher-truesteam-dt14'],
    },

    reviews: [
      {
        userType: '4인 가족 주부',
        rating: 5,
        text: '예열 없이도 기름때가 잘 닦여서 손설거지를 거의 안 하게 됐어요. 자동문열림 건조까지 깔끔합니다.',
        pros: ['세척력', '자동 건조'],
        cons: ['예약 시간 김'],
      },
      {
        userType: '신혼부부',
        rating: 4,
        text: '14인용이라 한 번에 많이 들어가고 작동음도 조용한 편입니다. 다만 설치 공간을 좀 차지해요.',
        pros: ['대용량', '저소음'],
        cons: ['설치 공간'],
      },
      {
        userType: '맞벌이 직장인',
        rating: 3,
        text: '세척은 만족스러운데 표준 코스가 길어 급할 땐 불편하고 전용세제를 꼭 써야 합니다.',
        pros: ['세척 만족'],
        cons: ['긴 코스', '전용세제'],
      },
      {
        userType: '주방 리모델링한 50대',
        rating: 5,
        text: '비스포크 패널이라 주방 색과 맞췄더니 빌트인처럼 보입니다. 위생 헹굼이 특히 좋네요.',
        pros: ['디자인', '위생 헹굼'],
        cons: ['가격대'],
      },
    ],

    purchaseLinks: [
      { store: '삼성닷컴', url: '#', price: 1290000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 990000 },
    ],

    similarProducts: ['lg-dios-dishwasher-truesteam-dt14', 'skmagic-touchon-dishwasher-dwa81'],
  },
  // === 세탁기 ===
  {
    id: 'samsung-bubblewash-top-wa16',
    slug: 'samsung-bubblewash-top-wa16',
    brand: 'Samsung',
    name: '워블 버블워시 통돌이 WA16',
    modelNumber: 'WA16T6261BV',
    category: '세탁기',
    image: '/images/appliances/samsung/wa16t6261bv/main.webp',
    images: [],
    description: '삼성 워블 버블워시 통돌이(전자동) 세탁기 16kg. 워블 물살로 옷감을 보호하고 버블세탁·강력 워터샷 헹굼으로 세탁력을 챙긴 가성비 대용량 모델.',
    oneliner: '워블 물살 + 버블세탁, 드럼이 부담스러울 때 16kg 가성비 통돌이',
    editorComment: '삼성 통돌이(전자동) 라인의 가성비 16kg 모델입니다. 드럼 특유의 문 냄새·곰팡이 관리가 부담스럽거나 159만원대 그랑데AI 드럼이 과한 가정에, 50만원대로 대용량 세탁을 해결해 줍니다. 워블 물살로 옷감 손상·엉킴을 줄이고 버블세탁과 워터샷 헹굼으로 세탁력은 챙겼지만, 건조 기능이 없고 에너지효율 2등급이라 물·전기 사용은 프리미엄 드럼보다 많습니다. 빨래 널 공간이 있고 단순·튼튼한 대용량 세탁기를 원하는 3~4인 가정에 적합합니다.',
    status: 'best',
    tags: ['삼성', '워블', '버블워시', '통돌이', '전자동', '16kg', '워터샷', '가성비'],

    specs: {
      energyEfficiency: 7,
      performance: 7,
      convenience: 7,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '워블(Wobble) 물살 + 버블세탁 + 강력 워터샷 헹굼 + 디지털 인버터 모터',
      filterType: '이지 필터 (보풀·먼지 거름망)',
      capacity: '16kg',
      energyGrade: '2등급',
    },

    roomFit: {
      recommendedSize: ['소형', '중형', '대형'],
      coverageArea: 0,
      installationType: '통돌이(전자동)',
      installationNote: '급수·배수 연결 필요. 상부 뚜껑이 위로 열리므로 상단 개방 공간을 확보하고, 진동·소음을 줄이려면 수평을 맞춰 설치하세요.',
    },

    errorCodes: [
      {
        code: 'UE',
        description: '세탁물 편중',
        cause: '세탁물이 한쪽으로 치우쳐 탈수 시 균형이 맞지 않음',
        solution: '세탁물을 고르게 펼쳐 다시 시작하세요. 큰 빨래와 작은 빨래를 섞어 넣고, 본체 수평이 맞는지 확인하세요.',
        severity: 'low',
      },
      {
        code: '4E',
        description: '급수 이상',
        cause: '수도 밸브가 잠겼거나 급수 호스 꺾임·동결, 또는 급수 필터(거름망) 막힘',
        solution: '수도 밸브를 완전히 열고 급수 호스 꼬임·동결을 점검하세요. 호스 연결부 급수 필터를 분리해 청소 후 재가동. 반복 시 삼성전자 서비스센터(1588-3366) 문의',
        severity: 'medium',
      },
      {
        code: '5E',
        description: '배수 이상',
        cause: '배수 필터 막힘 또는 배수 호스 꺾임·높이 부적합',
        solution: '배수 필터를 분리해 이물질을 제거하고, 배수 호스가 꺾이거나 너무 높게 연결되지 않았는지 확인 후 재가동',
        severity: 'medium',
      },
      {
        code: 'dC',
        description: '세탁/탈수 중 문(상부 리드)이 열렸거나 잠금이 풀려 동작이 멈춤.',
        cause: '도어(리드)가 완전히 닫히지 않았거나, 빨래가 도어 사이에 끼었거나, 도어 잠금 스위치 접촉 불량.',
        solution: '도어를 다시 눌러 완전히 닫고 빨래가 끼지 않았는지 확인 후 재시작. 반복되면 도어 스위치 불량일 수 있으니 삼성전자서비스(1588-3366)에 점검 요청. (구형 표기 dE)',
        severity: 'low',
      },
      {
        code: 'Sud',
        description: '거품(세제)이 과다하게 감지되어 헹굼·탈수가 일시 지연됨.',
        cause: '세제 과다 투입, 고거품 세제 사용, 또는 소량 빨래에 비해 세제가 많은 경우.',
        solution: '거품이 가라앉을 때까지 잠시 두면 자동으로 헹굼이 이어짐. 다음 세탁부터 세제량을 줄이고 저거품 표준세제 사용. 자주 발생하면 삼성전자서비스(1588-3366) 문의. (모델에 따라 \'5d\'로 표시)',
        severity: 'low',
      },
      {
        code: '3C',
        description: '모터가 정상적으로 구동되지 않아 세탁/탈수가 멈춤.',
        cause: '모터 또는 모터 위치센서(홀센서) 이상, 빨래 과다로 인한 과부하, 배선 접촉 불량.',
        solution: '전원을 끄고 빨래량을 줄인 뒤 재시작. 같은 코드가 다시 뜨면 모터 계통 점검이 필요하므로 삼성전자서비스(1588-3366)에 수리 요청. (구형 표기 3E)',
        severity: 'high',
      },
      {
        code: '1C',
        description: '수위(압력) 센서 신호 이상으로 급수·배수 제어가 되지 않음.',
        cause: '수위센서 불량, 또는 센서에 연결된 에어호스(압력호스)의 막힘·꺾임·이탈.',
        solution: '전원을 껐다 켜고 재시도. 반복되면 내부 센서·호스 점검이 필요하므로 삼성전자서비스(1588-3366)에 점검 요청. (구형 표기 1E)',
        severity: 'medium',
      },
    ],

    targetUsers: {
      recommended: [
        '드럼 문 냄새·곰팡이 관리가 부담스러운 3~4인 가정',
        '찬물에서도 세제가 잘 풀리는 버블 세탁을 원하는 사용자',
        '복잡한 기능보다 단순·튼튼한 대용량 세탁기를 원하는 사용자',
        '예산 50만원대에서 16kg 통돌이를 찾는 가정',
      ],
      notRecommended: [
        '세탁·건조 겸용을 원하는 사용자(통돌이는 건조 기능 없음)',
        '1등급 에너지효율과 최저 전기·물 사용을 최우선으로 보는 가정',
        '1~2인 원룸(16kg 오버스펙)',
      ],
    },

    features: [
      '워블(Wobble) 물살 (옷감 보호 + 엉킴 감소)',
      '버블세탁 (찬물에서도 세제를 미세 거품화해 세탁력 향상)',
      '강력 워터샷 헹굼 (고압 분사로 세제 잔여 감소)',
      '디지털 인버터 모터 (저진동·모터 10년 무상보증)',
      '이지 필터 + 통살균 코스',
    ],

    priceAnalysis: {
      valueRating: 4,
      priceTier: 'mid',
      alternatives: ['haier-mini-washer-wmd3'],
    },

    reviews: [
      {
        userType: '대가족 주부',
        rating: 5,
        text: '버블워시로 찬물에도 세제가 잘 풀려 이불 빨래까지 시원하게 됩니다.',
        pros: ['버블 세탁', '대용량'],
        cons: ['높이 있음'],
      },
      {
        userType: '자취생',
        rating: 4,
        text: '통돌이라 사용법이 간단하고 빨래 시간이 드럼보다 짧아 좋습니다.',
        pros: ['빠른 세탁', '간편 조작'],
        cons: ['탈수 진동'],
      },
      {
        userType: '1인 가구 직장인',
        rating: 3,
        text: '세탁력은 무난한데 탈수할 때 진동과 소음이 좀 있는 편이에요.',
        pros: ['가성비'],
        cons: ['탈수 소음'],
      },
      {
        userType: '아이 키우는 30대',
        rating: 4,
        text: '아이 옷 삶음 코스를 자주 쓰는데 만족합니다. 물 사용량은 드럼보다 많아요.',
        pros: ['삶음 코스'],
        cons: ['물 사용량'],
      },
    ],

    purchaseLinks: [
      { store: '삼성닷컴', url: '#', price: 549000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 449000 },
    ],

    similarProducts: ['samsung-bespoke-grande-wf24a9500', 'lg-trom-obje-fw25eswhs', 'haier-mini-washer-wmd3'],
  },
  // === 건조기 ===
  {
    id: 'samsung-grande-dryer-dv14',
    slug: 'samsung-grande-dryer-dv14',
    brand: 'Samsung',
    name: '그랑데 건조기 DV14B8520BV',
    modelNumber: 'DV14B8520BV',
    category: '건조기',
    image: '/images/appliances/samsung/dv14b8520bv/main.webp',
    images: [],
    description: '삼성 그랑데 히트펌프 건조기 14kg. 저온 히트펌프로 옷감을 보호하고 에어워시로 살균·탈취하는 중형 가성비 독립형 모델. 별도 환기구 없이 설치 가능하며 스마트싱스 연동을 지원합니다.',
    oneliner: '저온 히트펌프 + 에어워시 살균, 14kg 중형 가성비 건조기',
    editorComment: '상위 17kg 비스포크 그랑데AI가 부담스러울 때 고르는 가성비 사이즈입니다. 저온 히트펌프로 니트·기능성 의류도 줄지 않게 말리고, 에어워시(열풍 살균·탈취)로 세탁하기 애매한 외투·이불의 냄새를 빼는 게 강점입니다. 응축식 독립형이라 배기 덕트 공사가 필요 없어 17kg 대비 설치 자리 부담과 비용이 확실히 적습니다. 다만 상위 모델의 AI 자동코스·스팀 구김제거는 빠졌고 두꺼운 겨울 이불은 14kg으로 빠듯하니, 1~3인 가구의 일상 빨래 위주라면 90만원대 가성비로 가장 합리적인 선택입니다.',
    status: 'best',
    tags: ['삼성', '그랑데', '건조기', '히트펌프', '14kg', '에어워시', '독립형', '가성비'],

    specs: {
      energyEfficiency: 8,
      performance: 8,
      convenience: 7,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '저온 히트펌프 건조 + 에어워시(열풍 살균·탈취)',
      filterType: '2중 먼지 필터 + 자동 응축수 배수',
      capacity: '14kg',
      energyGrade: '1등급',
    },

    roomFit: {
      recommendedSize: ['소형', '중형'],
      coverageArea: 0,
      installationType: '히트펌프 독립형',
      installationNote: '응축식 독립형으로 별도 환기구(배기 덕트) 공사가 필요 없습니다. 응축수는 물통 또는 배수 호스로 처리하며, 단독 설치를 기본으로 하되 전용 스태킹 키트 사용 시 세탁기 위 설치도 가능합니다.',
    },

    errorCodes: [
      {
        code: 'FC',
        description: '필터 청소 필요',
        cause: '먼지 필터에 보풀·이물질이 과다하게 쌓여 공기 순환이 막힘',
        solution: '필터를 꺼내 보풀을 제거하고 물세척 후 완전히 말려 재장착하세요. 매 사용 후 청소를 권장합니다',
        severity: 'low',
      },
      {
        code: 'tS',
        description: '온도센서 이상',
        cause: '건조기 내부 온도센서 불량 또는 연결 접촉 불량',
        solution: '전원을 끄고 10분 후 재가동하세요. 반복되면 삼성전자 서비스센터(1588-3366)에 점검을 요청하세요',
        severity: 'medium',
      },
      {
        code: 'AC6',
        description: '통신 이상',
        cause: '인버터(컴프레서) 제어부와 메인 PBA 간 통신 불량',
        solution: '전원 플러그를 뽑고 약 5분 대기 후 재연결하세요. 반복 시 기판 점검이 필요하므로 서비스센터(1588-3366)에 문의하세요',
        severity: 'high',
      },
      {
        code: 'dE',
        description: '도어 열림 또는 도어 감지 이상으로 작동이 멈춤',
        cause: '도어가 완전히 닫히지 않았거나, 도어 사이에 빨래가 끼었거나, 도어 걸쇠·감지 스위치의 접촉이 불량한 경우',
        solution: '도어 틈에 빨래가 끼지 않았는지 확인하고 "딸깍" 소리가 날 때까지 완전히 닫은 뒤 재시작하세요. 제대로 닫았는데도 반복되면 도어 스위치 불량일 수 있으니 삼성전자 서비스센터(1588-3366)에 점검을 요청하세요.',
        severity: 'low',
      },
      {
        code: 'HC',
        description: '내부 과열 감지 — 히트펌프 컴프레서(압축기) 또는 가열부 과열',
        cause: '린트(먼지) 필터나 열교환기가 막혀 열이 빠지지 못하거나, 히트펌프 컴프레서(압축기)가 과열된 경우',
        solution: '전원을 끄고 도어를 열어 충분히 식힌 뒤, 먼지 필터와 열교환기(콘덴서)를 청소하고 재가동하세요. 과열은 안전과 직결되므로 청소 후에도 반복되면 즉시 사용을 멈추고 삼성전자 서비스센터(1588-3366)에 점검을 요청하세요.',
        severity: 'high',
      },
      {
        code: '5C',
        description: '응축수 배수 이상',
        cause: '내부 물통이 가득 찼거나, 배수 펌프·거름망 막힘, 직접 배수로 설치 시 배수 호스의 꺾임·막힘(겨울철 동결 포함)',
        solution: '내부 물통을 비우고 펌프 거름망을 청소하세요. 직접 배수로 연결한 경우 배수 호스가 꺾이거나 막히지 않았는지, 동결되지 않았는지 확인하세요. 정리 후에도 반복되면 배수 펌프 점검이 필요하니 삼성전자 서비스센터(1588-3366)에 문의하세요.',
        severity: 'medium',
      },
    ],

    targetUsers: {
      recommended: [
        '1~3인 가구의 일상 빨래 건조',
        '미세먼지·장마로 실외 건조가 어려운 환경',
        '니트·기능성 의류 등 옷감 손상이 걱정되는 사용자',
        '환기구 공사 없이 간편하게 설치하고 싶은 가정',
      ],
      notRecommended: [
        '두꺼운 겨울 이불을 자주 건조하는 4인 이상 대가족(17kg 권장)',
        'AI 자동코스·스팀 구김제거가 꼭 필요한 사용자',
        '설치 공간이 전혀 없는 초소형 원룸',
      ],
    },

    features: [
      '저온 히트펌프 건조 (옷감 손상 최소화)',
      '에어워시 (열풍 살균·탈취, 세탁 없이 냄새 제거)',
      '인버터 컴프레서 (저소음·절전)',
      '스마트싱스 앱 원격 제어·건조 알림',
      '2중 먼지 필터 + 자동 응축수 배수',
    ],

    priceAnalysis: {
      valueRating: 5,
      priceTier: 'mid',
      alternatives: ['lg-trom-heatpump-dryer-rh14'],
    },

    reviews: [
      {
        userType: '4인 가족',
        rating: 5,
        text: '히트펌프라 옷감 손상이 적고 수건이 정말 보송해집니다. 전기료도 생각보다 적게 나와요.',
        pros: ['보송한 건조', '절전'],
        cons: ['콘덴서 청소'],
      },
      {
        userType: '신혼부부',
        rating: 4,
        text: '대용량이라 이불도 한 번에 말려요. 다만 건조 시간이 좀 깁니다.',
        pros: ['대용량'],
        cons: ['긴 건조시간'],
      },
      {
        userType: '맞벌이 부부',
        rating: 3,
        text: '성능은 좋은데 필터 먼지를 자주 비워줘야 건조력이 유지됩니다.',
        pros: ['건조 성능'],
        cons: ['잦은 필터청소'],
      },
      {
        userType: '반려동물 가정',
        rating: 5,
        text: '강아지 털이 필터에 모여 청소가 편하고 옷에 털이 확 줄었어요.',
        pros: ['털 제거', '관리 편의'],
        cons: ['설치 공간'],
      },
    ],

    purchaseLinks: [
      { store: '삼성닷컴', url: '#', price: 920000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 790000 },
    ],

    similarProducts: ['samsung-bespoke-grande-dv17a9720', 'lg-trom-obje-dryer-rd20wswhs', 'lg-trom-heatpump-dryer-rh14'],
  },
  // === 로봇청소기 ===
  {
    id: 'samsung-bespoke-jetbot-ai',
    slug: 'samsung-bespoke-jetbot-ai',
    brand: 'Samsung',
    name: '비스포크 제트봇 AI',
    // 국내 판매 모델코드(2026-10-08 교정). 예전 표기 VR50T95735W는 /WA·/SA 등 해외 지역형 코드다.
    // 이미지 경로의 vr50t95735w는 파일 경로라 그대로 둔다.
    modelNumber: 'VR50T95935W',
    category: '로봇청소기',
    image: '/images/appliances/samsung/vr50t95735w/main.webp',
    images: [],
    description: '삼성 비스포크 제트봇 AI VR50T95935W는 3D 센서 사물인식 회피, LiDAR 위치 인식 주행, 청정스테이션 자동 먼지비움, SmartThings 홈 모니터링을 갖춘 흡입 전용 로봇청소기입니다. 물걸레가 없어, 스테이션 자리와 방 사이 문턱이 맞는지가 판단의 출발점입니다.',
    oneliner: '3D 센서 사물인식·LiDAR 주행과 청정스테이션 자동 먼지비움',
    editorComment: '제트봇 AI는 방 사이 문턱이 1.5cm 이하이고 청정스테이션 주변을 비울 수 있는 집의 흡입 전용 후보입니다. 국내 설명서상 스테이션(폭 272mm)은 좌우 약 0.5m·앞 약 1m를 비워야 해 실제로 필요한 폭은 약 1.27m입니다.',
    status: 'featured',
    tags: ['삼성', '비스포크', '제트봇AI', '로봇청소기', 'AI사물인식', '라이다', '청정스테이션', '프리미엄'],

    specs: {
      energyEfficiency: 9,
      performance: 9,
      convenience: 9,
      durability: 8,
    },

    techSpecs: {
      // 국내 지원 페이지 VR50T95935W 스펙("3D센서 있음", "LIDAR센서 있음")과 국내 공용 설명서(2026-10-08 확인).
      // 국내 자료에 없는 값(흡입력 30W, LiDAR 6m·초당 10회전)만 해외 지역형 /WA 자료. pass3/sources/robot-jetbot-*.txt
      coreTechnology: 'AI 사물인식(3D 센서) 회피 + LiDAR 위치 인식 주행 + 청정스테이션 자동 먼지비움',
      filterType: '본체·청정스테이션의 다층 여과(99.999% 미세먼지 차단 표기)',
      capacity: '먼지통 0.2L / 청정스테이션 봉투 2.5L',
    },

    roomFit: {
      // 1회 충전 청소 면적 근거가 없어 추천 평수를 두지 않는다(2026-10-08).
      recommendedSize: [],
      installationType: '청정스테이션(자동비움)',
      installationNote: 'SmartThings 원격 제어와 홈 모니터링에는 Wi-Fi와 삼성 계정이 필요합니다. 스테이션 크기·주변 여유 공간과 문턱 조건은 아래 설치·공간, 사용성·편의 절에 있습니다.',
    },

    targetUsers: {
      recommended: [
        '본체 먼지통(0.2L)을 매번 비우기 번거로워 2.5L 봉투로 옮기는 청정스테이션이 필요한 가정',
        "LiDAR 지도에 사물인식으로 찾은 가구·물체 위치를 겹쳐 구역별 청소·제외 구역을 설정하려는 사용자",
        '삼성 가전·스마트싱스로 집안 기기를 통합 관리하는 가정',
        '바닥의 전선·양말을 다 치우기 어려워 사물인식 회피를 보조 수단으로 쓰려는 집 (제조사도 형태·환경에 따라 결과가 다르다고 밝힘)',
      ],
      notRecommended: [
        '흡입과 물걸레 동시 청소를 핵심으로 원하는 사용자 (이 모델은 흡입 위주)',
        '청정스테이션 주변 여유 공간을 비울 수 없는 자리에 두려는 집',
        '방 사이 문턱이 1.5cm를 넘거나 털이 긴 카펫이 많은 집',
      ],
    },

    features: [
      'AI 사물인식(3D 센서)으로 전선·양말·반려동물 배변물 등 장애물 회피 (결과는 형태·환경에 따라 다름)',
      'LiDAR 위치 인식 주행 — 충전 중에는 LiDAR 센서가 본체 안으로 들어감 (6m 범위 360° 스캔은 해외형 /WA 자료 표기)',
      'AI 사물인식으로 가구·물체 위치를 지도에 표시(제조사 자료)',
      '청정스테이션 자동 먼지비움 (동작 약 18초, 국내 설명서)',
      '본체·청정스테이션 다층 여과 (99.999% 미세먼지 차단 표기)',
      '엉킴 제거 브러시 (국내 지원 페이지 표기)',
      '스마트싱스 원격 제어·청소 금지 영역 설정·카메라 홈 모니터링',
    ],

    priceAnalysis: {
      valueRating: 4,
      priceTier: 'premium',
      alternatives: ['lg-codezero-r5-robot'],
    },

    reviews: [
      {
        userType: '맞벌이 부부',
        rating: 5,
        text: 'AI가 장애물을 잘 피하고 충전스테이션이 먼지를 자동으로 비워줘 손이 거의 안 갑니다.',
        pros: ['장애물 회피', '자동 먼지비움'],
        cons: ['도크 큼'],
      },
      {
        userType: '반려동물 가정',
        rating: 4,
        text: '사물 인식이 좋아 반려동물 배변 사고를 피해 다니고 카펫 흡입력도 괜찮습니다.',
        pros: ['사물 인식', '흡입력'],
        cons: ['가격'],
      },
      {
        userType: '원룸 자취생',
        rating: 3,
        text: '넓은 집엔 좋은데 원룸에선 사양이 과하고 도크가 자리를 많이 차지해요.',
        pros: ['청소력'],
        cons: ['도크 공간', '과한 사양'],
      },
      {
        userType: '4인 가족',
        rating: 4,
        text: '앱으로 구역 지정 청소가 편하고 청정스테이션이 먼지를 자동으로 비워줘서 손이 거의 안 갑니다.',
        pros: ['앱 구역청소', '자동 먼지비움'],
        cons: ['물걸레 미지원'],
      },
    ],

    purchaseLinks: [
      { store: '삼성닷컴', url: '#', price: 1390000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 990000 },
    ],

    similarProducts: ['roborock-s8-proultra', 'lg-codezero-r5-robot', 'xiaomi-robot-vacuum-x10'],
  },
  // === 냉장고 ===
  {
    id: 'samsung-bespoke-kitchenfit-rf60',
    slug: 'samsung-bespoke-kitchenfit-rf60',
    brand: 'Samsung',
    name: '비스포크 키친핏 4도어 RF60',
    modelNumber: 'RF60A91R3AP',
    category: '냉장고',
    image: '/images/appliances/samsung/rf60a91r3ap/main.webp',
    images: [],
    description: '삼성 비스포크 키친핏 4도어 냉장고. 깊이를 줄인 빌트인룩 슬림 디자인에 615L 대용량과 메탈쿨링, 디지털 인버터 컴프레서를 갖춘 1등급 프리미엄 모델.',
    oneliner: '615L 빌트인룩 슬림 4도어, 주방과 앞면을 맞추는 키친핏 냉장고',
    editorComment: '비스포크 4도어 RF85가 875L 플래그십이라면, 이 키친핏 RF60은 깊이를 줄여 주방 가구와 앞면을 맞추는 빌트인룩 슬림 4도어입니다. 615L로 3~4인 가족에 넉넉하고, 메탈쿨링과 1등급 효율로 정온·절전은 상위 모델과 큰 차이가 없습니다. 슬림 깊이라 좁은 주방에도 답답하지 않게 들어가지만, 깊이를 줄인 만큼 총 용량과 칸별 수납은 875L 4도어보다 한 단계 아래입니다. 디자인 통일감과 공간 효율을 중시하는 가정에 잘 맞는, 우리 냉장고 라인업의 premium 포지션입니다.',
    status: 'new',
    tags: ['삼성', '비스포크', '냉장고', '4도어', '키친핏', '615L', '메탈쿨링', '1등급'],

    specs: {
      energyEfficiency: 9,
      performance: 8,
      convenience: 9,
      durability: 9,
    },

    techSpecs: {
      coreTechnology: '디지털 인버터 컴프레서 + 메탈쿨링 + 키친핏 슬림 디자인',
      filterType: '탈취 필터',
      refrigerant: 'R600a',
      capacity: '615L (4도어)',
      energyGrade: '1등급',
    },

    roomFit: {
      recommendedSize: ['중형', '대형'],
      coverageArea: 0,
      installationType: '4도어 키친핏 (빌트인룩 프리스탠딩)',
      installationNote: '키친핏 슬림 깊이로 주방 가구와 앞면을 맞춰 빌트인처럼 설치 가능. 방열을 위해 상단·후면 5cm 이상 이격하고 문 열림 공간을 확보하세요.',
    },

    errorCodes: [
      {
        code: '22',
        description: '냉장실 온도 높음',
        cause: '문을 자주 열거나 음식을 과도하게 채워 냉기가 부족함',
        solution: '문 닫힘 상태와 과적 여부를 확인하고 잠시 비워 두세요. 반복되면 삼성전자 서비스센터(1588-3366)에 점검 문의',
        severity: 'medium',
      },
      {
        code: '40',
        description: '제빙 기능 이상',
        cause: '정수 필터 막힘 또는 급수 연결 불량',
        solution: '급수 호스와 필터를 점검하고 재가동하세요. 지속되면 삼성전자 서비스센터(1588-3366)',
        severity: 'low',
      },
      {
        code: '14',
        description: '제상 센서 이상',
        cause: '제상 센서 단선 또는 접촉 불량',
        solution: '전원을 5분간 분리 후 재투입하세요. 반복되면 삼성전자 서비스센터(1588-3366) 점검',
        severity: 'medium',
      },
      {
        code: '88',
        description: '메인 제어보드 통신 이상',
        cause: '일시적 전원 노이즈 또는 기판 오류',
        solution: '전원 코드를 5분간 분리 후 재연결하세요. 지속되면 삼성전자 서비스센터(1588-3366)',
        severity: 'high',
      },
      {
        code: 'PC',
        description: '패널-본체 통신 이상',
        cause: '디스플레이 패널 연결 불량',
        solution: '전원을 재투입하고, 지속되면 삼성전자 서비스센터(1588-3366)에 점검 문의',
        severity: 'medium',
      },
    ],

    targetUsers: {
      recommended: [
        '3~4인 가족이 쓸 615L 대용량 냉장고가 필요한 가정',
        '주방 가구와 앞면을 맞추는 빌트인룩 슬림 디자인을 원하는 사용자',
        '깊이가 얕은 주방·아일랜드 구조에 맞는 냉장고를 찾는 가정',
        '삼성 가전·스마트싱스를 함께 쓰는 사용자',
      ],
      notRecommended: [
        '800L 이상 최대 용량과 세분화된 수납이 필요한 대가족',
        '1~2인 가구 (오버스펙)',
        '가성비를 최우선으로 보는 소비자',
      ],
    },

    features: [
      '615L 4도어 대용량 (빌트인룩 키친핏 슬림 깊이)',
      '비스포크 맞춤 패널 (색상 교체)',
      '메탈쿨링 + 정온 (온도 변화 최소화)',
      '디지털 인버터 컴프레서 (저소음·절전)',
      '스마트싱스 앱 연동 (문 열림·온도 알림)',
    ],

    priceAnalysis: {
      valueRating: 4,
      priceTier: 'premium',
      alternatives: ['samsung-bespoke-4door-rf85', 'lg-dios-obje-4door-t873'],
    },

    reviews: [
      {
        userType: '주방 리모델링 가정',
        rating: 5,
        text: '키친핏이라 싱크대와 딱 맞아 빌트인처럼 들어갑니다. 메탈쿨링으로 냉기도 빨라요.',
        pros: ['키친핏 매립', '빠른 냉각'],
        cons: ['용량 보통'],
      },
      {
        userType: '신혼부부',
        rating: 4,
        text: '슬림한데 내부는 넓게 잘 빠졌고 비스포크 색상 고르는 재미가 있습니다.',
        pros: ['공간 활용', '디자인'],
        cons: ['도어 수납 적음'],
      },
      {
        userType: '4인 가족',
        rating: 3,
        text: '디자인은 만족하는데 600L급이라 대가족에는 살짝 부족할 수 있어요.',
        pros: ['디자인'],
        cons: ['용량 아쉬움'],
      },
      {
        userType: '자취 직장인',
        rating: 4,
        text: '문 여닫을 때 조용하고 정리 칸이 잘 나뉘어 있어 편합니다.',
        pros: ['저소음', '수납 구성'],
        cons: ['가격대'],
      },
    ],

    purchaseLinks: [
      { store: '삼성전자 공식', url: '#', price: 2790000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 2390000 },
    ],

    similarProducts: ['samsung-bespoke-4door-rf85', 'samsung-bespoke-sxs-rs84', 'lg-dios-obje-4door-t873'],
  },
  // === 세탁기 ===
  {
    id: 'samsung-bespoke-ai-combo-wd25',
    slug: 'samsung-bespoke-ai-combo-wd25',
    brand: 'Samsung',
    name: '비스포크 AI 콤보 WD25',
    modelNumber: 'WD25DB8995BZ',
    category: '세탁기',
    image: '/images/appliances/samsung/wd25db8995bz/main.webp',
    images: [],
    price: 3759990,
    description: '삼성 WD25DB8995BZ는 세탁 25kg·건조 15kg 일체형 세탁건조기입니다. 한 통에서 세탁부터 건조까지 이어지며, 코스마다 적재 상한이 따로 정해져 있습니다.',
    oneliner: "세탁 25kg·건조 15kg, 코스별 적재를 구분하는 일체형",
    editorComment: '세탁 25kg·건조 15kg는 표준 코스 상한이라, 25kg를 세탁하면 건조 전에 25−15=10kg을 꺼내야 합니다(설명서 43쪽). 무게를 감지하는 AI 맞춤 코스는 9kg까지여서 그 안에서는 덜어낼 빨래가 없습니다.',
    status: 'featured',
    tags: ['삼성', '비스포크', 'AI콤보', '세탁건조일체형', '올인원', '25kg', '히트펌프건조', '1등급'],

    specs: {
      // 가열세탁 2100W / 건조 1700W — 삼성 공식 사양
      powerConsumption: 2100,
      energyEfficiency: 8,
      performance: 9,
      convenience: 10,
      durability: 8,
    },

    techSpecs: {
      // 정확 모델 사양표에 건조 방식 항목이 없다. 공용 설명서 인쇄 74쪽의 "히트펌프 건조"만 쓴다.
      // 삼성 구매 가이드의 "하이브리드 히트펌프"는 콤보 제품군 소개 문구(2026-10-08 확인)라 옮기지 않는다.
      coreTechnology: 'AI 맞춤세탁 + 히트펌프 건조 + 버블워시',
      filterType: '배수 필터(주 1회 이상)·건조 먼지 필터(건조 코스 후 매번)',
      capacity: '세탁 25kg / 건조 15kg (일체형)',
      dimensions: '686 x 1110 x 875mm',
      weight: 144,
      energyGrade: '1등급',
      extraSpecs: [{ label: '정격 소비전력', value: '가열 세탁 2,100W / 건조 1,700W' }],
    },

    roomFit: {
      // 세탁건조기에는 적용 평수 개념이 없다. 근거 없는 평수 칩을 붙이지 않는다.
      recommendedSize: [],
      coverageArea: 0,
      installationType: '세탁·건조 일체형 드럼',
      installationNote: '220V 16A 이상 콘센트 단독 사용, 영하로 내려가는 곳 설치 금지, 36℃ 이상에서는 건조 성능 저하(설명서 4쪽). 배기 덕트는 없지만 밀폐된 곳에서는 환기가 필요합니다(74쪽). 벽 간격과 반입 조건은 아래 설치·공간 절에 정리했습니다.',
    },

    // 정확한 모델 지원 페이지가 연결한 설명서의 배수 필터 안내에서 확인한 코드.
    errorCodes: [
      {
        code: '5C',
        description: '배수 관련 점검 표시',
        cause: '배수 필터 막힘 등으로 물이 빠지지 않는 상태. 코드만으로 펌프 고장을 확정할 수 없습니다.',
        solution: '전원을 분리하고 내부 물이 식은 뒤 잔수 제거 호스로 물을 먼저 받아 내세요. 그다음 배수 필터를 청소하고 배수 호스의 꺾임을 확인합니다. 필터를 다시 끼운 뒤에는 끝까지 잠겼는지 확인하세요. 설명서는 덜 잠긴 필터를 누수 원인으로 경고합니다. 바닥이나 전원 부근이 물에 잠겼다면 재가동하지 말고 삼성전자서비스(1588-3366)에 문의하세요. 조치 뒤에도 표시가 남으면 점검이 필요합니다. 설명서는 배수 필터를 일주일에 한 번 이상 청소하도록 권하므로, 필터에 찌꺼기가 많았다면 청소 주기부터 맞추세요.',
        severity: 'medium',
      },
    ],

    targetUsers: {
      recommended: [
        '나란히 둘 폭도, 직렬 설치할 높이도 없어 바닥 한 칸에 세탁·건조를 모아야 하는 세탁실',
        '한 번 빨래가 AI 맞춤 코스 상한 안에 들어 세탁부터 건조까지 이어 가려는 가정',
        '단독 콘센트를 하나만 확보할 수 있어 세탁기·건조기 두 대 배선이 어려운 집',
      ],
      notRecommended: [
        "한 통이 세탁·건조 중일 때 다음 세탁을 동시에 시작해야 하는 사용자",
        '깊이 방향 여유(설치·공간 절)가 부족한 좁은 발코니',
        '울·이불처럼 상한이 낮은 코스 빨래가 매번 큰 비중을 차지하는 집',
      ],
    },

    features: [
      'AI 맞춤 코스 (무게·종류·오염도 감지, 최대 9kg)',
      '히트펌프 건조 (배기 덕트 없음, 설치 공간 환기 필요)',
      '버블 불림 옵션 (섬세의류·울·데님 코스 제외)',
      '세탁 25kg·건조 15kg (표준 코스 상한)',
      '스마트싱스 앱 원격 제어 (스마트컨트롤 활성화 시)',
    ],

    priceAnalysis: {
      msrp: 3759990,
      valueRating: 4,
      priceTier: 'premium',
      alternatives: ['samsung-bespoke-grande-wf24a9500', 'lg-trom-obje-fw25eswhs'],
    },

    reviews: [
      {
        userType: '맞벌이 부부',
        rating: 5,
        text: '세탁부터 건조까지 한 통에서 끝나니 빨래 너는 수고가 사라졌어요. 공간도 절약됩니다.',
        pros: ['올인원', '공간 절약'],
        cons: ['건조 용량 적음'],
      },
      {
        userType: '신혼부부',
        rating: 4,
        text: 'AI가 옷감 무게를 보고 알아서 코스를 잡아줘 편하고 일체형치곤 건조력도 괜찮습니다.',
        pros: ['AI 자동코스', '건조력'],
        cons: ['1회 시간 김'],
      },
      {
        userType: '원룸 자취생',
        rating: 4,
        text: '건조기 둘 자리가 없는 원룸에 딱입니다. 다만 한 번 돌리면 오래 걸려요.',
        pros: ['공간 절약'],
        cons: ['긴 사이클'],
      },
      {
        userType: '4인 가족',
        rating: 3,
        text: '편리하지만 세탁과 건조를 연속으로 하니 가족 빨래량엔 회전이 좀 느립니다.',
        pros: ['편의성'],
        cons: ['회전율', '가격'],
      },
    ],

    purchaseLinks: [
      { store: '삼성전자 공식', url: '#', price: 3490000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 2990000 },
    ],

    similarProducts: ['samsung-bespoke-grande-wf24a9500', 'lg-trom-obje-fw25eswhs', 'lg-tongdolyi-washer-tr25'],
  },
  // === 건조기 ===
  {
    id: 'samsung-inverter-heatpump-dryer-dv10',
    slug: 'samsung-inverter-heatpump-dryer-dv10',
    brand: 'Samsung',
    name: '인버터 히트펌프 건조기 10kg DV10',
    modelNumber: 'DV10B6320LV',
    category: '건조기',
    image: '/images/appliances/samsung/dv10b6320lv/main.webp',
    images: [],
    description: '삼성 인버터 히트펌프 건조기 10kg. 1~2인 가구를 위한 소형 저온 건조기로, 응축식이라 환기구 공사 없이 설치 가능하고 1등급 효율로 전기요금 부담이 적은 가성비 모델.',
    oneliner: '1~2인 가구용 10kg 히트펌프, 환기구 공사 없는 소형 가성비 건조기',
    editorComment: '17kg·14kg 그랑데가 부담스러운 1~2인 가구를 위한 소형 10kg 히트펌프 건조기입니다. 인버터 히트펌프 저온 건조라 니트도 줄지 않고, 응축식이라 환기구 공사 없이 어디든 놓을 수 있어 원룸·오피스텔에 특히 잘 맞습니다. 1등급 효율로 전기요금 부담이 적은 대신, 두꺼운 겨울 이불이나 4인 가족 빨래량에는 10kg이 빠듯합니다. 혼자 또는 둘이 사는 집에서 매일 나오는 빨래를 가볍게 말리는 용도라면 70만원 이하 가성비로 합리적인 선택입니다.',
    status: 'best',
    tags: ['삼성', '건조기', '히트펌프', '인버터', '10kg', '소형', '1~2인가구', '1등급'],

    specs: {
      energyEfficiency: 8,
      performance: 7,
      convenience: 7,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '인버터 히트펌프 저온 건조',
      filterType: '2중 먼지 필터 + 자동 응축수 배수',
      capacity: '10kg',
      energyGrade: '1등급',
    },

    roomFit: {
      recommendedSize: ['원룸', '소형'],
      coverageArea: 0,
      installationType: '히트펌프 독립형',
      installationNote: '응축식이라 별도 환기구(배기 덕트) 공사가 필요 없습니다. 응축수는 물통 또는 배수 호스로 처리하며, 전용 스태킹 키트 사용 시 세탁기 위 설치도 가능합니다.',
    },

    errorCodes: [
      {
        code: 'tC',
        description: '온도센서 이상',
        cause: '온도센서 접촉 불량',
        solution: '전원을 재투입하세요. 지속되면 삼성전자 서비스센터(1588-3366) 점검',
        severity: 'medium',
      },
      {
        code: 'dC',
        description: '도어 열림',
        cause: '문이 덜 닫힘',
        solution: '문을 확실히 닫고 재시작하세요',
        severity: 'low',
      },
      {
        code: '9C1',
        description: '콘덴서 오염',
        cause: '자동세척 후 잔여 먼지 누적',
        solution: '콘덴서를 점검·청소하세요',
        severity: 'low',
      },
      {
        code: '5C',
        description: '응축수 배수 이상',
        cause: '물통 가득 참 또는 배수 막힘',
        solution: '물통을 비우거나 배수 호스를 점검하세요',
        severity: 'medium',
      },
      {
        code: 'HC',
        description: '히트펌프 과열',
        cause: '통풍구·콘덴서 막힘',
        solution: '필터와 콘덴서를 청소한 뒤 재가동하세요. 반복되면 삼성전자 서비스센터(1588-3366)',
        severity: 'high',
      },
    ],

    targetUsers: {
      recommended: [
        '1~2인 가구의 일상 빨래 건조',
        '환기구 공사 없이 원룸·오피스텔에 간편하게 설치하려는 사용자',
        '니트·기능성 의류 등 옷감 손상이 걱정되는 사용자',
        '전기요금 부담이 적은 1등급 소형 건조기를 찾는 가정',
      ],
      notRecommended: [
        '두꺼운 겨울 이불·4인 이상 가족 빨래를 자주 건조하는 가정 (14kg 이상 권장)',
        'AI 자동코스·스팀 구김제거가 꼭 필요한 사용자',
        '한 번에 많은 양을 빠르게 건조해야 하는 사용자',
      ],
    },

    features: [
      '인버터 히트펌프 저온 건조 (옷감 손상 최소화)',
      '환기구 공사 불필요한 응축식 (설치 자유도 높음)',
      '인버터 컴프레서 (저소음·절전, 1등급 효율)',
      '소형 10kg (1~2인 가구 일상 빨래에 최적)',
      '2중 먼지 필터 + 자동 응축수 배수',
    ],

    priceAnalysis: {
      valueRating: 5,
      priceTier: 'mid',
      alternatives: ['samsung-grande-dryer-dv14', 'lg-trom-heatpump-dryer-rh14'],
    },

    reviews: [
      {
        userType: '1~2인 가구',
        rating: 5,
        text: '소형이라 자리를 덜 차지하면서 히트펌프 건조력은 제대로네요. 전기료도 부담 없어요.',
        pros: ['콤팩트', '절전'],
        cons: ['대용량엔 부족'],
      },
      {
        userType: '신혼부부',
        rating: 4,
        text: '수건과 속옷이 보송하게 잘 말라요. 이불은 한 번에 안 들어가는 게 아쉽습니다.',
        pros: ['보송 건조'],
        cons: ['이불 용량 부족'],
      },
      {
        userType: '자취생',
        rating: 4,
        text: '원룸에 두기 좋은 크기고 옷감 손상이 적어 만족합니다.',
        pros: ['적당한 크기', '옷감 보호'],
        cons: ['건조시간'],
      },
      {
        userType: '맞벌이 직장인',
        rating: 3,
        text: '성능은 좋은데 콘덴서와 필터를 관리하지 않으면 건조력이 떨어집니다.',
        pros: ['성능'],
        cons: ['관리 필요'],
      },
    ],

    purchaseLinks: [
      { store: '삼성전자 공식', url: '#', price: 690000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 590000 },
    ],

    similarProducts: ['samsung-grande-dryer-dv14', 'lg-trom-heatpump-dryer-rh14', 'lg-trom-mini-dryer-3kg'],
  },

  // === TV (이동식·라이프스타일) ===
  {
    id: 'samsung-the-movingstyle',
    slug: 'samsung-the-movingstyle',
    brand: 'Samsung',
    name: '더 무빙스타일',
    modelNumber: 'KU27LSFM7AXXKR',
    category: 'TV',
    image: '/images/appliances/samsung/ku27lsfm7/main.webp',
    images: [],
    price: 1232220,
    description:
      '삼성 더 무빙스타일(KU27LSFM7AXXKR). 화면과 무빙 스탠드를 분리할 수 있는 27인치 QHD 이동식 터치 TV로, 120Hz 주사율과 풀 모션 서포트(피벗·틸트·스위블·높이 조절)를 지원합니다.',
    oneliner: '화면 분리형 이동식 QHD 터치 TV',
    editorComment:
      'QHD·120Hz 화면이지만 120Hz는 전원을 연결한 자리에서 쓰는 기능이라, 콘솔을 꽂아 한두 자리에서 쓰고 떼어 낸 화면은 내장 킥스탠드로 세워 쓰는 사용에 맞습니다.',
    status: 'featured',
    tags: ['삼성', '더무빙스타일', '이동식TV', '무선TV', 'QHD', '120Hz', '터치스크린', '라이프스타일'],

    specs: {
      powerConsumption: 100, // 정격 소비전력, 삼성 공식 사양 (평균 34W)
      noise: 5,
      energyEfficiency: 7,
      performance: 8,
      convenience: 8,
      durability: 6,
    },

    techSpecs: {
      coreTechnology: '27형 LED 터치스크린 · 2세대 AI 4K 프로세서',
      capacity: '27인치 QHD (2560×1440)',
      dimensions: '628.3 x 1272.3 x 409mm (스탠드 포함)',
      weight: 5.2,
      extraSpecs: [
        { label: '해상도', value: 'QHD 2560×1440' },
        { label: '주사율', value: '120Hz (HDMI 1 QHD 120Hz 입력 · 절전 모드 60Hz)' },
        { label: 'HDR', value: 'HDR10+ · HLG' },
        { label: '스마트OS', value: '타이젠(2025년형)' },
        { label: '스피커', value: '10W(5W × 2) · 2채널' },
        { label: '배터리', value: '69Wh · 무선 최대 3시간(에코 스크린·절전 모드, 볼륨 20)' },
        { label: '충전', value: 'USB-C 65W 이상 PD 어댑터 · 45W 이상 PD 보조배터리 · 완충 대기 약 3시간·동작 중 약 3시간 30분' },
        { label: '조작', value: '터치스크린(앱별 지원 상이 · AirPlay 2 터치 미지원)' },
        { label: '스탠드 포함 무게', value: '25.7kg' },
        { label: '특징', value: '화면 분리 · 일체형 킥스탠드 · 풀 모션 서포트(피벗 ±90°·틸트 ±35°·스위블 ±30°·최대 23cm 높이 조절)' },
        { label: '게임 기능', value: '게임 모션 플러스 · Dynamic Black EQ · 게임 허브(사양표에 VRR·ALLM 항목 없음)' },
        { label: '무선', value: 'Wi-Fi 5 · 블루투스 5.3' },
        { label: '사용 환경', value: '동작 0~40℃ · 습도 10~80% · 0℃ 이하·50℃ 이상에 보관된 배터리는 충전되지 않음' },
      ],
    },

    targetUsers: {
      recommended: [
        '콘솔·PC를 연결하고 전원을 꽂은 채 120Hz로 쓰려는 사용자',
        '분리한 화면을 별매 받침 없이 내장 킥스탠드로 세워 쓰려는 사용자',
        '갤럭시 휴대폰 화면을 띄워 터치로 조작하려는 사용자(삼성 안내상 화면 공유 터치는 갤럭시 기기만)',
      ],
      notRecommended: [
        '돌비 비전 표기 콘텐츠를 그 형식으로 보려는 사용자(HDR10+·HLG만 표기)',
        '스탠드째 야외로 가져가거나 러그·문턱 위로 밀고 다닐 사용자(삼성이 스탠드 부착 상태 야외 사용·이동을 금지)',
        '배터리로 120Hz 게임을 하려는 사용자(무선 모드에서 절전 자동 활성화)',
      ],
    },

    features: [
      '화면과 무빙 스탠드 분리 · 화면 일체형 킥스탠드(손잡이·테이블 스탠드 겸용)',
      '120Hz 주사율(HDMI 1 QHD 120Hz 입력, 절전 모드에서는 60Hz)',
      '터치스크린 조작(앱별 지원 상이, AirPlay 2는 화면 공유만)',
      '풀 모션 서포트(피벗 ±90°·틸트 ±35°·스위블 ±30°, 최대 23cm 높이 조절)',
      '2세대 AI 4K 프로세서 · Samsung Vision AI 컴패니언',
    ],

    priceAnalysis: {
      msrp: 1232220,
      valueRating: 3,
      priceTier: 'premium',
      alternatives: ['lg-standbyme2', 'lg-standbyme2-max'],
    },

    reviews: [
      {
        userType: '콘솔 게임 즐기는 20대',
        rating: 5,
        text: '이동식인데 120Hz라 스위치·PS 게임이 확실히 부드러워요. 터치로 조작하는 것도 신기하고, 화면 떼어 침대로 가져가 쓰기 좋습니다.',
        pros: ['120Hz 주사율', '터치 조작', '이동성'],
        cons: ['무거운 무게'],
      },
      {
        userType: '가격 대비 스펙 따지는 소비자',
        rating: 3,
        text: '만듦새는 좋은데 100만원 넘는데 QHD라는 게 걸려요. 화질 자체는 AI 보정으로 준수하지만 해상도 숫자만 보면 아쉽고, 스탠드까지 25kg이라 이동도 만만치 않습니다.',
        pros: ['고주사율', 'AI 화질 보정'],
        cons: ['QHD 해상도', '비싼 가격', '무게'],
        source: '삼성 공식·다나와 사용기 종합',
        sourceUrl: 'https://prod.danawa.com/info/?pcode=98076260',
      },
      {
        userType: '스탠바이미와 비교한 구매자',
        rating: 4,
        text: '"삼탠바이미"로 불릴 만큼 스탠바이미2와의 비교가 활발합니다. 120Hz 주사율과 부드러운 터치 반응은 무빙스타일의 확실한 우위지만, 배터리가 3시간으로 1시간 짧고 돌비비전이 빠진 점은 비교 리뷰들이 공통으로 짚는 약점입니다.',
        pros: ['120Hz(비교 우위)', '터치 반응성'],
        cons: ['배터리 3시간', '돌비비전 미지원'],
        source: '다나와 DPG·유튜브 비교 리뷰 종합',
        sourceUrl: 'https://dpg.danawa.com/news/view?boardSeq=63&listSeq=5942825',
      },
      {
        userType: '언론 장기 사용기',
        rating: 4,
        text: '방에서 캠핑장까지 끌고 다니며 쓴 언론 사용기에서는 "거대한 휴대폰이 하나 더 생긴 느낌"이라는 표현이 나올 만큼 터치 조작과 기능 전환의 부드러움을 높게 평가했습니다. 2026년형 라인업이 85형까지 확대되며 시리즈의 지속성도 확인됐습니다.',
        pros: ['터치 UX 완성도', '시리즈 확장으로 액세서리·생태계 기대'],
        cons: ['이동 시 스탠드 무게 체감'],
        source: '아시아경제·디지털데일리 등 사용기 종합',
        sourceUrl: 'https://view.asiae.co.kr/article/2026011510080029708',
      },
    ],

    purchaseLinks: [
      { store: '삼성전자 공식', url: '#', price: 1490000, isOfficial: true },
      { store: '쿠팡', url: 'https://link.coupang.com/a/g88WyhlCE0' },
    ],

    similarProducts: ['lg-standbyme2', 'lg-standbyme2-max', 'lg-standbyme-go'],
  },

  // === 무선이어폰 ===
  {
    id: 'samsung-galaxy-buds3-pro',
    slug: 'samsung-galaxy-buds3-pro',
    brand: 'Samsung',
    name: '갤럭시 버즈3 프로',
    modelNumber: 'SM-R630N',
    category: '무선이어폰',
    image: '/images/appliances/samsung/sm-r630n/main.webp',
    images: [],
    price: 237390,
    description:
      '삼성 갤럭시 버즈3 프로(SM-R630N). 평판형 트위터를 넣은 2-way 스피커와 듀얼 앰프, 적응형 ANC, SSC 코덱을 갖춘 무선 이어폰입니다. 24bit/96kHz 재생·자동 전환·실시간 통역은 삼성이 지정한 갤럭시 기기·One UI·삼성 계정 조건에서만 안내됩니다.',
    oneliner: '지원 갤럭시·One UI 조건에서 기능이 열리는 이어폰',
    editorComment:
      'SM-R630N은 지원 갤럭시와 삼성 계정을 쓰는 사람에게 맞는 이어폰입니다. 24bit 재생·오토 스위치·통역이 모두 그 조건에서만 켜지고(지원 기기 목록은 코덱 절), ANC를 켠 재생은 이어폰 6시간입니다.',
    status: 'best',
    tags: ['삼성', '갤럭시버즈', '버즈3프로', '무선이어폰', 'ANC', '노이즈캔슬링', '듀얼드라이버', 'IP57'],

    specs: {
      noise: 9,
      energyEfficiency: 8,
      performance: 8,
      convenience: 8,
      durability: 6,
    },

    techSpecs: {
      coreTechnology: 'Enhanced 2-way 스피커(평판형 트위터) · 듀얼 앰프',
      capacity: '최대 26시간(케이스 포함·ANC 켬)',
      extraSpecs: [
        { label: '드라이버', value: 'Enhanced 2-way(평판형 트위터) · 듀얼 앰프' },
        { label: '코덱', value: 'SBC · AAC · SSC · SSC-UHQ(24bit)' },
        { label: 'ANC', value: '적응형 ANC · 마이크 6개' },
        { label: '배터리', value: 'ANC 켬 6h/26h · 끔 7h/30h(이어폰/케이스 포함) · 통화 ANC 켬 4.5h' },
        { label: '방수', value: 'IP57(이어폰, 담수 1m·30분 내부 시험) · 충전 케이스 방수 아님' },
        { label: '블루투스', value: '5.4' },
        { label: '기기 전환', value: 'One UI 4.1.1+ 갤럭시 폰·태블릿, One UI 6.0+ 갤럭시 북 자동 전환' },
        { label: '무게', value: '5.4g(개당)' },
        { label: '공간음향', value: '360 오디오(One UI 3.1 이상 갤럭시) · 헤드트래킹' },
        { label: '이어팁', value: 'S·M(기본)·L 3세트' },
      ],
    },

    targetUsers: {
      recommended: [
        '갤럭시 폰·태블릿·워치4 이상을 같은 삼성 계정으로 쓰는 사용자',
        '24bit 재생을 지원하는 갤럭시(코덱 절 목록)를 쓰는 사용자',
        '갤럭시 스마트폰과 연결해 실시간 통역을 쓸 사용자',
      ],
      notRecommended: [
        '아이폰·타 기기에서 주로 쓰는 사용자',
        'ANC 켜고 장시간(6시간 초과) 연속 사용하는 사용자',
        '갤럭시 북이 아닌 Windows PC와 폰 사이 자동 전환을 기대하는 사용자',
      ],
    },

    features: [
      '2-way 스피커(평판형 트위터) · 듀얼 앰프',
      '적응형 ANC + 슈퍼 클리어 콜(슈퍼 와이드밴드는 Z 폴드6·플립6)',
      '갤럭시 AI 실시간 통역(갤럭시 스마트폰·삼성 계정)',
      '360 오디오(One UI 3.1 이상 갤럭시) · 적응형 EQ',
      'IP57(이어폰, 담수 1m·30분 내부 시험) · 무선충전 · 블루투스 5.4',
    ],

    priceAnalysis: {
      msrp: 237390,
      valueRating: 4,
      priceTier: 'premium',
      alternatives: ['apple-airpods-pro3', 'sony-wf-1000xm5'],
    },

    reviews: [
      {
        userType: '갤럭시 S 시리즈 사용자',
        rating: 5,
        text: '폰·워치·태블릿 오갈 때 자동 전환이 진짜 편해요. 음질도 듀얼 드라이버라 그런지 해상력이 좋고, 통역 기능은 해외여행에서 신세계였습니다.',
        pros: ['갤럭시 연동', '고해상 음질', '실시간 통역'],
        cons: ['배터리 6시간'],
      },
      {
        userType: 'ANC 중시하는 통근족',
        rating: 4,
        text: '지하철 소음 차단은 만족스럽습니다. 다만 ANC 켜면 6시간이라 하루 종일 쓰면 케이스 자주 넣게 되고, 초기 스템 크랙 이슈가 있었다는 점은 감안해야 해요.',
        pros: ['ANC 성능', '편안한 착용감'],
        cons: ['짧은 배터리', '초기 품질 논란'],
        source: '삼성 공식·다나와 사용기 종합',
        sourceUrl: 'https://prod.danawa.com/info/?pcode=59537216',
      },
      {
        userType: '해외 커뮤니티 장기 사용자',
        rating: 3,
        text: 'ANC를 켠 상태에서 유닛을 가까이 대면 날카로운 고음 노이즈가 난다는 보고가 있고, 왼쪽 유닛만 충전이 안 되는 불량 사례가 특정 생산분에서 반복 보고됐습니다. 이어팁을 빼다가 찢어졌다는 후기도 적지 않아 소모품 관리가 필요합니다.',
        pros: ['음질·ANC 자체는 준수'],
        cons: ['ANC 고음 노이즈 보고', '왼쪽 유닛 충전 불량 사례', '이어팁 내구성'],
        source: 'Reddit r/galaxybuds · TechRadar 종합',
        sourceUrl: 'https://www.reddit.com/r/galaxybuds/comments/1uwc3y0/galaxy_buds_3_pro/',
      },
      {
        userType: '버즈4 프로와 저울질한 구매자',
        rating: 4,
        text: '버즈4 프로가 나오면서 해외에선 정가의 30% 이상 할인가가 일상이 됐습니다. 4 프로의 개선(ANC·마이크·작아진 케이스)이 점진적이라, 갤럭시 유저라면 할인된 3 프로가 가성비로는 더 합리적이라는 평가가 많습니다.',
        pros: ['대폭 인하된 실거래가', '여전한 삼성 생태계 연동'],
        cons: ['후속작 대비 구형 코덱·케이스'],
        source: 'PhoneArena·SoundGuys 비교 종합',
        sourceUrl: 'https://www.phonearena.com/news/galaxy-buds-3-pro-great-price_id180579',
      },
    ],

    purchaseLinks: [
      { store: '삼성전자 공식', url: '#', price: 319000, isOfficial: true },
      { store: '쿠팡', url: 'https://link.coupang.com/a/g88WC4PeYC' },
    ],

    similarProducts: ['apple-airpods-pro3', 'sony-wf-1000xm5', 'anker-soundcore-liberty5'],
  },
];
