import { Appliance } from '@/types/appliance';

export const samsungAppliances: Appliance[] = [
  {
    id: 'samsung-bespoke-wind-free-af25a9970',
    slug: 'samsung-bespoke-wind-free-af25a9970',
    brand: 'Samsung',
    name: '비스포크 윈드프리 AF25A9970',
    modelNumber: 'AF25A9970',
    category: '에어컨',
    rating: 4.5,
    image: '/images/appliances/samsung/af25a9970/main.webp',
    images: [],
    price: 2890000,
    description: '삼성 비스포크 윈드프리 스탠드 에어컨. 무풍 냉방과 AI 절전 기능을 갖춘 프리미엄 모델.',
    oneliner: '무풍 냉방 + AI 절전, 25평형 프리미엄 스탠드 에어컨',
    editorComment: '삼성 에어컨 라인업의 최상위 모델입니다. 윈드프리 기술로 직접 바람 없이 냉방하며, AI가 사용 패턴을 학습해 전기요금을 절약합니다. 25평형 기준 냉방력이 충분하고, 1등급 에너지효율로 월 전기요금 부담이 적습니다. 다만 가격이 289만원으로 높은 편이라 가성비를 중시하면 하위 모델을 고려하세요.',
    status: 'featured',
    tags: ['삼성', '비스포크', '윈드프리', '스탠드', '에어컨', '25평', '무풍', '1등급'],

    specs: {
      powerConsumption: 2850,
      noise: 34,
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
      dimensions: '550 x 1800 x 330mm',
      weight: 52,
      energyGrade: '1등급',
      monthlyElectricityCost: 42000,
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
        solution: '실외기 주변 통풍 공간을 확보하고 눈에 보이는 이물질을 제거한 뒤 전원을 재투입한다. 실외기는 사용자가 임의로 분해하지 말고, 증상이 지속되면 삼성전자서비스(1588-3366)에 점검을 의뢰한다.',
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
      msrp: 2890000,
      streetPrice: 2490000,
      monthlyCost: 42000,
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
    name: '윈드프리 벽걸이 AR07A9170',
    modelNumber: 'AR07A9170',
    category: '에어컨',
    rating: 4.3,
    image: '/images/appliances/samsung/ar07a9170/main.webp',
    images: [],
    price: 890000,
    description: '삼성 윈드프리 벽걸이 에어컨. 원룸~소형 평수에 적합한 가성비 무풍 모델.',
    oneliner: '원룸/소형 평수용 가성비 무풍 벽걸이 에어컨',
    editorComment: '7평형 벽걸이로 원룸~작은 방에 딱 맞는 모델입니다. 윈드프리 무풍은 상위 모델과 동일하고, 가격은 89만원으로 진입 장벽이 낮습니다. 다만 냉방 면적이 좁아 15평 이상 거실에는 부적합합니다.',
    status: 'best',
    tags: ['삼성', '윈드프리', '벽걸이', '에어컨', '7평', '원룸', '가성비', '1등급'],

    specs: {
      powerConsumption: 780,
      noise: 30,
      energyEfficiency: 8,
      performance: 7,
      convenience: 7,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '윈드프리 무풍냉방',
      filterType: 'HD 필터',
      refrigerant: 'R32',
      capacity: '7평형 (23.1m2)',
      dimensions: '820 x 299 x 215mm',
      weight: 9.5,
      energyGrade: '1등급',
      monthlyElectricityCost: 15000,
    },

    roomFit: {
      recommendedSize: ['원룸', '소형'],
      coverageArea: 23.1,
      installationType: '벽걸이형',
      installationNote: '벽면 고정 브래킷 + 실외기 설치 공간 필요',
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
        code: 'E101',
        description: '실내기와 실외기 사이 통신이 끊겨 운전이 멈춤',
        cause: '실내기-실외기 연결(통신) 케이블 불량·접속 불량 또는 순간 전원 이상',
        solution: '분전반 차단기를 내리고 약 5분 뒤 다시 올려 보세요. 그래도 표시되면 연결 배선 문제일 수 있으니 삼성전자 서비스센터(1588-3366)에 점검을 요청하세요.',
        severity: 'high',
      },
      {
        code: 'E422',
        description: '실외기 전자팽창밸브(전동변, EEV) 자가진단 이상으로 냉매 순환이 원활하지 않아 운전이 정지됨',
        cause: '전자팽창밸브(전동변, EEV) 막힘·동작 불량, 설치 시 서비스(개폐) 밸브 미개방 또는 냉매 순환 불량',
        solution: '분전반 차단기를 내리고 약 1분 뒤 다시 올려 보세요. 설치 직후라면 실외기 서비스 밸브가 완전히 열려 있는지 확인하세요. 그래도 반복되면 전동변·냉매 계통 점검이 필요하므로 삼성전자 서비스센터(1588-3366)에 점검을 요청하세요.',
        severity: 'high',
      },
      {
        code: 'E458',
        description: '실외기 팬이 정상 속도로 돌지 않아 냉방이 정지됨',
        cause: '실외기 팬 모터 고장 또는 이물질 끼임으로 팬 구속',
        solution: '실외기 팬 주변의 낙엽·이물질을 제거하고 전원을 재투입하세요. 팬이 여전히 정상 작동하지 않으면 모터 고장이므로 삼성전자 서비스센터(1588-3366)에 점검을 요청하세요.',
        severity: 'high',
      },
      {
        code: 'E464',
        description: '컴프레서 과전류로 보호 회로가 작동해 운전이 멈춤(인버터 IPM 과전류)',
        cause: '인버터 전력모듈(IPM) 과전류 — 전압 불안정, 실외기 방열 불량 또는 컴프레서 과부하',
        solution: '실외기 통풍이 막히지 않았는지 확인하고 10분 뒤 재가동하세요. 반복되면 인버터·컴프레서 문제이므로 삼성전자 서비스센터(1588-3366)에 점검을 요청하세요.',
        severity: 'high',
      },
    ],

    targetUsers: {
      recommended: [
        '원룸/오피스텔 거주자',
        '작은 방 전용 에어컨이 필요한 가정',
        '가성비 무풍 에어컨을 찾는 사용자',
      ],
      notRecommended: [
        '15평 이상 거실 사용 (냉방력 부족)',
        '스탠드형 선호 사용자',
      ],
    },

    features: [
      '윈드프리 무풍 냉방',
      '1등급 에너지효율',
      '스마트싱스 앱 원격 제어',
      '좋은잠 모드',
    ],

    priceAnalysis: {
      msrp: 890000,
      streetPrice: 750000,
      monthlyCost: 15000,
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
    rating: 3.9,
    image: '/images/appliances/samsung/dg16a7500/main.webp',
    images: [],
    price: 599000,
    description: '삼성 비스포크 제습기. 16L/일 대용량 제습에 의류건조까지 가능한 프리미엄 모델.',
    oneliner: '16L 대용량 제습 + 의류건조, 비스포크 디자인',
    editorComment: '장마철 필수 가전으로, 하루 16L 제습량은 25평까지 커버합니다. 의류건조 기능이 있어 빨래 건조기 대용으로도 쓸 수 있습니다. 비스포크 디자인으로 거실에 놓아도 인테리어와 어울립니다.',
    status: 'featured',
    tags: ['삼성', '비스포크', '제습기', '16L', '의류건조', '1등급'],

    specs: {
      powerConsumption: 410,
      noise: 40,
      energyEfficiency: 8,
      performance: 8,
      convenience: 8,
      durability: 7,
    },

    techSpecs: {
      coreTechnology: '콤프레서 제습 + 의류건조 모드',
      filterType: '항균 필터',
      capacity: '16L/일',
      dimensions: '360 x 595 x 250mm',
      weight: 14.5,
      energyGrade: '1등급',
      monthlyElectricityCost: 8000,
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
      msrp: 599000,
      streetPrice: 479000,
      monthlyCost: 8000,
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
    modelNumber: 'WF24A9500',
    category: '세탁기',
    rating: 4.5,
    image: '/images/appliances/samsung/wf24a9500/main.webp',
    images: [],
    price: 1590000,
    description: '삼성 비스포크 그랑데AI 드럼세탁기. AI 맞춤세탁 + 버블워시로 세탁력과 편의성을 잡은 24kg 대용량.',
    oneliner: 'AI 맞춤세탁 + 버블워시, 24kg 대용량 드럼',
    editorComment: 'AI가 세탁물 무게·오염도를 자동 감지해 세제량과 세탁 코스를 최적화합니다. 버블워시는 찬물에서도 세제를 미세 거품으로 만들어 세탁력이 좋고, 24kg 대용량이라 이불 세탁도 가능합니다. 가격은 159만원으로 프리미엄이지만 4인 가족 기준 최적 모델입니다.',
    status: 'best',
    tags: ['삼성', '비스포크', '그랑데', 'AI', '드럼세탁기', '24kg', '버블워시'],

    specs: {
      powerConsumption: 150,
      noise: 45,
      energyEfficiency: 9,
      performance: 9,
      convenience: 10,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: 'AI 맞춤세탁 + 버블워시 + DD모터',
      filterType: '자가세정 필터',
      capacity: '24kg',
      dimensions: '686 x 984 x 600mm',
      weight: 82,
      energyGrade: '1등급',
      monthlyElectricityCost: 3500,
    },

    roomFit: {
      recommendedSize: ['중형', '대형', '초대형'],
      coverageArea: 0,
      installationType: '드럼형',
      installationNote: '급수/배수 연결 필요. 도어 개방 반경 확인',
    },

    errorCodes: [
      {
        code: 'UE',
        description: '세탁물 편중',
        cause: '세탁물이 한쪽으로 치우침',
        solution: '세탁물을 고르게 펼치고 재시작. 큰 빨래+작은 빨래 섞어 넣기',
        severity: 'low',
      },
      {
        code: 'DE',
        description: '도어 열림',
        cause: '도어가 완전히 닫히지 않음',
        solution: '도어를 확실히 닫고 재시작. 세탁물이 끼었는지 확인',
        severity: 'low',
      },
      {
        code: '4E',
        description: '급수 이상',
        cause: '수도 밸브가 잠기거나 급수 호스 꺾임',
        solution: '수도 밸브 확인, 급수 호스 꼬임/동결 점검',
        severity: 'medium',
      },
      {
        code: '5E',
        description: '배수 이상',
        cause: '배수 필터 막힘 또는 배수호스 꺾임',
        solution: '배수 필터 청소, 배수호스 높이·꼬임 확인',
        severity: 'medium',
      },
      {
        code: 'Sud',
        description: '세탁 중 거품이 과도하게 감지됨 (기기에 따라 \'5d\'로 표시)',
        cause: '세제 과다 투입 또는 일반(고거품) 세제 사용. 버블워시 특성상 거품이 더 잘 발생',
        solution: '세제를 표준량으로 줄이고 드럼세탁기 전용 저거품 세제 사용. 보통 기기가 헹굼을 추가하며 자동 해소됨. 반복되면 삼성전자서비스(1588-3366) 점검',
        severity: 'low',
      },
      {
        code: '3E',
        description: 'DD모터 구동 이상 (신형 펌웨어는 \'3C\'로 표시)',
        cause: '세탁물 과적재로 모터 과부하, 또는 모터 홀센서·구동기판 이상',
        solution: '전원 코드를 뽑고 5~10분 후 재시도, 세탁물 양을 줄여 균등 배치. 반복되면 모터·기판 점검 필요 — 삼성전자서비스(1588-3366) 문의',
        severity: 'high',
      },
      {
        code: 'tE',
        description: '세탁수·히터 온도 센서 이상 (신형은 \'1 tC\' 등으로 표시)',
        cause: '온도센서 단선·고장 또는 일시적 감지 오류',
        solution: '전원을 껐다 켠 뒤 재시도. 반복되면 온도센서 점검 필요 — 삼성전자서비스(1588-3366) 문의',
        severity: 'medium',
      },
      {
        code: 'LC',
        description: '본체 누수 감지 (기기에 따라 \'LC1\'으로 표시)',
        cause: '급·배수 호스 연결부 또는 본체 내부 누수',
        solution: '사용을 멈추고 수도 밸브를 잠근 뒤 본체 하단·호스 연결부 누수 확인. 누수가 보이면 삼성전자서비스(1588-3366)에 점검 요청',
        severity: 'high',
      },
    ],

    targetUsers: {
      recommended: [
        '4인 이상 가족',
        '이불·커튼 등 대용량 세탁이 잦은 가정',
        'AI 자동 세탁을 선호하는 사용자',
      ],
      notRecommended: [
        '1~2인 가구 (오버스펙, 14kg 이하 추천)',
        '설치 공간이 좁은 환경',
      ],
    },

    features: [
      'AI 맞춤세탁 (무게·오염도 자동 감지)',
      '버블워시 (찬물 미세거품 세탁)',
      'DD 인버터 모터 (저진동·저소음)',
      '스팀 살균 세탁',
      '스마트싱스 앱 원격 제어',
    ],

    priceAnalysis: {
      msrp: 1590000,
      streetPrice: 1290000,
      monthlyCost: 3500,
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
    modelNumber: 'DV17A9720',
    category: '건조기',
    rating: 4.5,
    image: '/images/appliances/samsung/dv17a9720/main.webp',
    images: [],
    price: 1490000,
    description: '삼성 비스포크 그랑데AI 건조기. AI 건조 + 히트펌프로 옷감 손상 없이 빠르게 건조.',
    oneliner: 'AI 건조 + 히트펌프, 17kg 프리미엄 건조기',
    editorComment: '히트펌프 방식이라 저온 건조로 옷감 손상이 적고, AI가 건조도를 실시간 감지해 과건조를 방지합니다. 17kg 대용량으로 이불 건조도 가능. 세탁기와 스태킹 설치하면 공간 절약됩니다.',
    status: 'featured',
    tags: ['삼성', '비스포크', '그랑데', '건조기', '히트펌프', '17kg', 'AI'],

    specs: {
      powerConsumption: 900,
      noise: 42,
      energyEfficiency: 9,
      performance: 9,
      convenience: 9,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: 'AI 건조 + 히트펌프 + 리버스 드럼',
      filterType: '2중 필터 시스템',
      capacity: '17kg',
      dimensions: '686 x 984 x 600mm',
      weight: 65,
      energyGrade: '1등급',
      monthlyElectricityCost: 12000,
    },

    roomFit: {
      recommendedSize: ['중형', '대형', '초대형'],
      coverageArea: 0,
      installationType: '독립형/스태킹',
      installationNote: '세탁기 위 스태킹 설치 가능. 환기구 연결 권장',
    },

    errorCodes: [
      {
        code: 'tS',
        description: '온도센서 이상',
        cause: '건조기 내부 온도센서 불량',
        solution: '전원 끄고 10분 후 재가동. 반복 시 서비스센터 연락',
        severity: 'medium',
      },
      {
        code: 'FC',
        description: '필터 청소 필요',
        cause: '먼지 필터에 보풀 과다 축적',
        solution: '필터를 꺼내 보풀 제거 후 재장착. 매 사용 후 청소 권장',
        severity: 'low',
      },
      {
        code: 'dC',
        description: '운전 중 도어가 열렸거나 제대로 닫히지 않아 동작이 멈춤(dC1로 표시되거나 LCD에서는 \'문열림\'으로 표시되기도 함).',
        cause: '도어를 끝까지 닫지 않음, 도어 걸쇠(래치) 부위 이물질·변형, 도어 스위치 접점 불량.',
        solution: '빨래가 도어에 끼지 않았는지 확인하고 \'딸깍\' 소리가 날 때까지 도어를 다시 꽉 닫은 뒤 재시작. 걸쇠 주변 이물질을 제거. 반복되면 도어 스위치 고장일 수 있으니 삼성전자서비스(1588-3366)에 점검 요청.',
        severity: 'low',
      },
      {
        code: '5C',
        description: '응축수(배수)가 정상적으로 빠지지 않아 건조가 중단됨(SC로 표기되기도 함).',
        cause: '응축수 물통 가득 참, 하단 배수 펌프 필터 막힘, 배수 호스 꺾임·막힘, 펌프 내 이물질.',
        solution: '응축수 물통을 비우고, 제품 하단의 배수 펌프 필터를 분리해 머리카락·이물질을 청소. 배수 호스가 꺾이거나 눌리지 않았는지, 직배수 설치 시 배수구가 막히지 않았는지 확인. 청소 후에도 반복되면 삼성전자서비스(1588-3366)에 펌프 점검 요청.',
        severity: 'medium',
      },
      {
        code: 'HC',
        description: '히트펌프 압축기(컴프레서)가 과열된 것으로 감지되어 건조가 중단됨.',
        cause: '압축기(컴프레서) 과열, 흡입구·내부 통풍 막힘, 콘덴서(열교환기)에 먼지 누적, 설치 공간 통풍 부족.',
        solution: '전원을 끄고 약 10분 뒤 다시 시도. 필터와 열교환기(콘덴서) 부위 먼지를 청소하고 설치 공간의 통풍을 확보. 그래도 반복되면 압축기 등 가열부 고장일 수 있으니 삼성전자서비스(1588-3366)에 점검 요청.',
        severity: 'high',
      },
      {
        code: 'AC6',
        description: '내부 회로(메인-인버터 PBA) 간 통신 오류로 동작이 멈춤(AC 또는 RC·RC6로 표시되기도 함).',
        cause: '기판(회로) 간 통신 불량, 커넥터 접촉 불량, 일시적 전기 노이즈.',
        solution: '전원 플러그를 뽑고 약 1~2분 뒤 다시 꽂아 초기화. 멀티탭 대신 접지된 단독 콘센트 사용을 권장. 재발하면 기판/배선 점검이 필요하므로 삼성전자서비스(1588-3366)에 문의.',
        severity: 'medium',
      },
    ],

    targetUsers: {
      recommended: [
        '빨래 건조가 잦은 가정',
        '미세먼지/장마 때문에 실외 건조가 어려운 환경',
        '옷감 관리가 중요한 사용자',
      ],
      notRecommended: [
        '설치 공간이 없는 원룸',
        '전기요금에 매우 민감한 사용자',
      ],
    },

    features: [
      'AI 건조 (건조도 실시간 감지)',
      '히트펌프 저온 건조 (옷감 보호)',
      '리버스 드럼 (엉킴 방지)',
      '스팀 구김 제거',
      '스태킹 설치 지원',
    ],

    priceAnalysis: {
      msrp: 1490000,
      streetPrice: 1190000,
      monthlyCost: 12000,
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
    rating: 4.3,
    image: '/images/appliances/samsung/ax90b7980wbd/main.webp',
    images: [],
    price: 499000,
    description: '삼성 비스포크 큐브 에어 공기청정기. 적층형 큐브 디자인에 무풍 청정과 맞춤형 색상을 갖춘 27평형 모델.',
    oneliner: '큐브 적층 디자인 + 무풍 청정, 인테리어가 되는 27평형 공기청정기',
    editorComment: '인테리어 가전을 지향하는 삼성 비스포크 라인의 공기청정기입니다. 적용면적 90m2(27평)로 거실급이고, 큐브를 위로 쌓아 청정 용량을 늘리는 적층 구조가 특징입니다. 무풍 청정 모드는 직바람 없이 조용하게 돌아가 침실에도 부담이 적습니다. 코웨이 노블 대비 순수 청정 속도는 비슷하거나 약간 아래지만, 비스포크 색상과 스마트싱스 생태계가 강점입니다. 삼성 가전을 쓰고 있다면 연동 면에서 자연스러운 선택입니다.',
    status: 'featured',
    tags: ['삼성', '비스포크', '큐브에어', '공기청정기', '27평', '무풍청정', '적층형', '1등급'],

    specs: {
      powerConsumption: 60,
      noise: 48,
      energyEfficiency: 8,
      performance: 9,
      convenience: 9,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '무풍 청정 + 3방향 청정 + 적층형 큐브',
      filterType: 'PM 1.0 헤파 + 일체형 탈취 필터',
      capacity: '27평형 (90m2)',
      dimensions: '340 x 555 x 340mm (1단 기준)',
      weight: 12.6,
      monthlyElectricityCost: 2300,
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
      msrp: 499000,
      streetPrice: 399000,
      monthlyCost: 7000,
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
    rating: 4.5,
    image: '/images/appliances/samsung/rf85c90d1ap/main.webp',
    images: [],
    price: 3590000,
    description: '삼성 비스포크 4도어 냉장고. 875L 대용량에 맞춤형 패널과 메탈쿨링, 인버터 컴프레서를 갖춘 플래그십.',
    oneliner: '875L 대용량 + 비스포크 맞춤 패널, 4인 가족 플래그십 4도어',
    editorComment: '삼성 냉장고 라인업의 최상위 4도어입니다. 875L로 4인 이상 가족이 넉넉하게 쓰고, 비스포크 패널로 주방 인테리어에 맞춰 색을 고를 수 있습니다. 메탈쿨링과 정온 기술로 문을 자주 여닫아도 온도 변화가 적고, 디지털 인버터 컴프레서가 저소음·절전을 책임집니다. LG 디오스 4도어와 양강 구도인데, 삼성은 비스포크 색상 선택폭과 스마트싱스 연동이 강점입니다. 가격이 높은 게 유일한 진입 장벽입니다.',
    status: 'featured',
    tags: ['삼성', '비스포크', '냉장고', '4도어', '875L', '메탈쿨링', '인버터', '1등급'],

    specs: {
      powerConsumption: 45,
      noise: 38,
      energyEfficiency: 9,
      performance: 9,
      convenience: 9,
      durability: 9,
    },

    techSpecs: {
      coreTechnology: '디지털 인버터 컴프레서 + 메탈쿨링 + 정온',
      filterType: '탈취 필터',
      refrigerant: 'R600a',
      capacity: '875L (4도어)',
      dimensions: '912 x 1853 x 716mm',
      weight: 121,
      energyGrade: '1등급',
      monthlyElectricityCost: 4000,
    },

    roomFit: {
      recommendedSize: ['대형', '초대형'],
      coverageArea: 0,
      installationType: '4도어 (프리스탠딩)',
      installationNote: '방열을 위해 좌우·상단 5cm 이상, 후면 5cm 이상 이격. 문 열림 공간 확보 필요',
    },

    errorCodes: [
      {
        code: '22 E',
        description: '냉장실 팬 이상',
        cause: '냉장실 순환 팬에 성에·이물질 끼임 또는 모터 이상',
        solution: '전원을 끄고 성에를 제거한 뒤 재가동. 반복 시 삼성전자 서비스센터(1588-3366) 문의',
        severity: 'medium',
      },
      {
        code: 'OF F',
        description: '데모(매장 전시) 모드',
        cause: '냉각이 멈추는 전시용 모드가 켜짐',
        solution: '냉각/절전 버튼을 약 10초간 길게 눌러 데모 모드 해제',
        severity: 'low',
      },
      {
        code: 'PC ER',
        description: '디스플레이에 \'PC ER\'가 뜨고 버튼·온도 설정이 제대로 동작하지 않음.',
        cause: '메인 PCB(제어 기판)와 디스플레이(패널) 기판 사이 통신 불량. 커넥터 접촉 불량이나 배선·기판 손상이 흔한 원인.',
        solution: '전원 플러그를 뽑고 1~2분 뒤 다시 꽂아 리셋한다. 그래도 \'PC ER\'가 계속 표시되면 기판·배선 점검이 필요하므로 삼성전자서비스(1588-3366)에 점검을 의뢰한다.',
        severity: 'medium',
      },
      {
        code: '5 E',
        description: '제상(서리 제거) 센서 계통 이상으로, 증발기에 성에가 과도하게 끼고 냉각력이 떨어질 수 있음.',
        cause: '제상 온도센서(NTC) 고장 또는 센서 배선·커넥터 접촉 불량이 주원인.',
        solution: '전원을 차단해 내부 성에를 충분히 녹인 뒤 재가동해 일시 오류인지 확인한다. 반복되면 제상 센서 점검·교체가 필요하므로 삼성전자서비스(1588-3366)에 의뢰한다.',
        severity: 'high',
      },
      {
        code: '40 E',
        description: '제빙실(얼음칸) 팬이 정상 작동하지 않아 표시되는 에러로, 제빙·냉각 성능 저하를 동반할 수 있음.',
        cause: '제빙실 팬 모터 고장, 팬에 성에·얼음이 끼어 회전이 막힘, 배선·커넥터 불량.',
        solution: '제빙 기능을 끄고 성에가 의심되면 전원 차단 후 일정 시간 해동한 뒤 재가동한다. 반복되면 팬 모터 점검이 필요하므로 삼성전자서비스(1588-3366)에 의뢰한다.',
        severity: 'medium',
      },
      {
        code: '8 E',
        description: '제빙기(아이스메이커) 온도센서 이상으로, 얼음이 만들어지지 않거나 제빙이 불안정함.',
        cause: '제빙기 온도센서(NTC) 고장 또는 센서 배선·커넥터 접촉 불량.',
        solution: '전원 리셋(플러그 분리 후 재연결)으로 일시 오류 여부를 확인한다. 계속 표시되면 센서 교체가 필요하므로 삼성전자서비스(1588-3366)에 점검을 요청한다.',
        severity: 'medium',
      },
    ],

    targetUsers: {
      recommended: [
        '4인 이상 가족, 식재료 보관량이 많은 가정',
        '주방 인테리어에 맞춘 색상을 원하는 사용자',
        '문을 자주 여닫아도 정온이 중요한 가정',
        '삼성 가전·스마트싱스를 함께 쓰는 사용자',
      ],
      notRecommended: [
        '1~2인 가구 (오버스펙)',
        '설치 폭이 좁은 주방',
        '가성비를 최우선으로 보는 소비자',
      ],
    },

    features: [
      '875L 4도어 대용량',
      '비스포크 맞춤 패널 (색상 교체)',
      '메탈쿨링 + 정온 (온도 변화 최소화)',
      '디지털 인버터 컴프레서 (저소음·절전)',
      '스마트싱스 앱 연동 (문 열림·온도 알림)',
    ],

    priceAnalysis: {
      msrp: 3590000,
      streetPrice: 2990000,
      monthlyCost: 4000,
      valueRating: 4,
      priceTier: 'luxury',
      alternatives: ['lg-dios-obje-4door-t873', 'samsung-bespoke-sxs-rs84'],
    },

    reviews: [
      {
        userType: '5인 가족 주부',
        rating: 5,
        text: '875L라 장 한 번 봐도 다 들어갑니다. 메탈쿨링이라 문 자주 열어도 온도가 잘 유지돼요. 패널 색을 주방에 맞춰 고른 것도 만족.',
        pros: ['대용량', '메탈쿨링', '디자인'],
        cons: ['비싼 가격'],
      },
      {
        userType: '비스포크로 주방 통일한 가정',
        rating: 4,
        text: '디자인과 용량은 최고인데 가격이 셉니다. 그래도 10년 쓸 거 생각하면 후회는 없어요.',
        pros: ['디자인', '대용량'],
        cons: ['비싼 가격'],
      },
      {
        userType: '냉장고 소음 신경 쓰는 사용자',
        rating: 5,
        text: '디지털 인버터 컴프레서라 그런지 주방에서 거의 소리가 안 들립니다. 정온 기능 덕에 야채칸 신선도도 오래 가요. 전기요금도 용량 대비 적게 나옵니다.',
        pros: ['저소음', '절전'],
        cons: ['설치 공간 필요'],
      },
      {
        userType: '좁은 주방에 들인 사용자',
        rating: 3,
        text: '용량과 성능은 흠잡을 데 없는데 폭이 넓어서 우리 집 주방엔 좀 빠듯했어요. 문 활짝 여는 공간까지 생각하면 설치 전 실측은 필수입니다.',
        pros: ['대용량'],
        cons: ['큰 크기', '설치 공간'],
      },
    ],

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
    name: '비스포크 양문형 RS84',
    modelNumber: 'RS84B5061M9',
    category: '냉장고',
    rating: 4.3,
    image: '/images/appliances/samsung/rs84b5061m9/main.webp',
    images: [],
    price: 1890000,
    description: '삼성 비스포크 양문형 냉장고. 846L 대용량 양문형에 트윈 쿨링과 인버터 컴프레서를 갖춘 중급 모델.',
    oneliner: '846L 양문형 + 트윈 쿨링, 4도어가 부담될 때 가성비 대안',
    editorComment: '4도어 플래그십이 부담스러울 때 합리적인 양문형입니다. 846L로 용량은 4도어급인데 가격은 절반 수준입니다. 양문형 특성상 좌우로 문을 활짝 열어 큰 식재료를 넣기 편하고, 트윈 쿨링으로 냉장·냉동을 독립 제어해 냄새 섞임이 적습니다. 4도어 대비 디자인·수납 세분화는 떨어지지만, 용량 대비 가성비는 이쪽이 낫습니다. 넓은 용량이 우선이고 예산이 한정적이라면 좋은 선택입니다.',
    status: 'best',
    tags: ['삼성', '비스포크', '냉장고', '양문형', '846L', '트윈쿨링', '인버터', '가성비'],

    specs: {
      powerConsumption: 42,
      noise: 39,
      energyEfficiency: 8,
      performance: 8,
      convenience: 8,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '디지털 인버터 컴프레서 + 트윈 쿨링',
      filterType: '탈취 필터',
      refrigerant: 'R600a',
      capacity: '846L (양문형)',
      dimensions: '912 x 1780 x 716mm',
      weight: 108,
      energyGrade: '1등급',
      monthlyElectricityCost: 3500,
    },

    roomFit: {
      recommendedSize: ['중형', '대형'],
      coverageArea: 0,
      installationType: '양문형 (프리스탠딩)',
      installationNote: '방열을 위해 좌우·상단 5cm 이상 이격. 양문 동시 개방 공간 확보',
    },

    errorCodes: [
      {
        code: '22 E',
        description: '냉장실 팬 이상',
        cause: '냉장실 순환 팬 성에·이물질 또는 모터 이상',
        solution: '전원을 끄고 성에 제거 후 재가동. 반복 시 삼성전자 서비스센터(1588-3366) 문의',
        severity: 'medium',
      },
      {
        code: '21 E',
        description: '냉동실 순환 팬 이상',
        cause: '냉동실 팬에 성에가 끼거나 이물질이 걸림, 또는 팬 모터 이상으로 냉기 순환이 멈춤',
        solution: '전원을 끄고 냉동실 문을 연 채 반나절 이상 성에를 충분히 녹인 뒤 재가동. 재가동 후에도 다시 뜨면 팬 모터 점검이 필요하므로 삼성전자 서비스센터(1588-3366) 문의',
        severity: 'high',
      },
      {
        code: '24 E',
        description: '냉동실 제상(성에 제거) 기능 이상',
        cause: '제상 센서 또는 제상 히터 이상으로 자동 성에 제거가 되지 않아 증발기에 성에가 쌓이고 냉각이 약해짐',
        solution: '전원을 끄고 성에를 충분히 녹이면 일시적으로 풀릴 수 있으나, 제상 부품 자체 문제인 경우가 많아 재발 시 삼성전자 서비스센터(1588-3366) 점검 권장',
        severity: 'high',
      },
      {
        code: '39 E',
        description: '자동 제빙기 작동 이상',
        cause: '제빙기 내부 얼음 끼임, 제빙 모터·센서 이상 또는 급수 불량',
        solution: '제빙기 얼음통을 비우고 끼인 얼음을 제거한 뒤 재가동하고 급수 연결·수압을 확인. 그래도 반복되면 삼성전자 서비스센터(1588-3366) 문의',
        severity: 'medium',
      },
      {
        code: 'OF F',
        description: '데모(매장) 모드 — 냉각이 멈춘 상태',
        cause: '매장 진열·운반용 데모 모드가 켜져 있어 조명·패널은 동작하지만 냉각은 정지된 상태(고장 아님)',
        solution: '사용설명서의 모델별 버튼 조합(예: 냉장·냉동 또는 절전 관련 버튼 동시 길게 누름)으로 데모 모드를 해제. 해제 절차가 안 되거나 계속 표시되면 삼성전자 서비스센터(1588-3366) 문의',
        severity: 'low',
      },
      {
        code: 'PC ER',
        description: '디스플레이 패널과 메인 기판 간 통신 이상',
        cause: '순간 정전·전압 변동 또는 패널-기판 연결 커넥터 접촉 불량/기판 이상',
        solution: '전원 플러그를 뽑고 약 1분 후 다시 꽂아 리셋. 리셋 후에도 표시되면 기판·배선 점검이 필요하므로 삼성전자 서비스센터(1588-3366) 문의',
        severity: 'medium',
      },
      {
        code: '88 88',
        description: '정전·전압 변동 후 통신 오류(전원 리셋 필요)',
        cause: '순간 정전이나 전압 급변으로 제어부 통신이 일시적으로 멈춤',
        solution: '전원 플러그를 뽑고 1분 이상 둔 뒤 다시 연결. 반복적으로 나타나면 전원·기판 점검을 위해 삼성전자 서비스센터(1588-3366) 문의',
        severity: 'medium',
      },
    ],

    targetUsers: {
      recommended: [
        '대용량은 원하지만 4도어가 부담스러운 가정',
        '큰 식재료를 자주 넣는 사용자',
        '냉장·냉동 냄새 분리가 중요한 가정',
        '용량 대비 가성비를 보는 소비자',
      ],
      notRecommended: [
        '세분화된 수납·디자인을 중시하는 사용자',
        '설치 폭이 매우 좁은 주방',
      ],
    },

    features: [
      '846L 양문형 대용량',
      '트윈 쿨링 (냉장·냉동 독립 제어)',
      '디지털 인버터 컴프레서',
      '비스포크 맞춤 도어',
      '스마트싱스 앱 연동',
    ],

    priceAnalysis: {
      msrp: 1890000,
      streetPrice: 1490000,
      monthlyCost: 3500,
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
    rating: 4.5,
    image: '/images/appliances/samsung/dw60a8375bb/main.webp',
    images: [],
    price: 1290000,
    description: '삼성 비스포크 14인용 빌트인 식기세척기. 워터월(WaterWall) 면세척과 인버터 모터, 스마트싱스, 세척 후 문이 자동으로 열리는 오토 오픈 도어 건조를 갖춘 프리미엄 모델.',
    oneliner: '워터월 면세척 + 오토 오픈 건조, 4인+ 가족용 14인용 빌트인 식기세척기',
    editorComment: '삼성 식기세척기 라인업의 상위 모델로, 분사 노즐이 좌우로 움직이며 물의 벽을 만드는 워터월 면세척이 핵심입니다. 인버터 모터로 소음이 44dB 수준까지 낮고, 세척이 끝나면 문이 살짝 자동으로 열려 잔열로 건조하는 오토 오픈 방식이라 별도 송풍 건조보다 전기를 덜 씁니다. 6인용 식탁형이 1~2인 자취·신혼용이라면 이 14인용은 냄비·프라이팬까지 한 번에 돌리는 4인 이상 가족·빌트인 주방을 위한 체급입니다. LG 1등급 빌트인과 양강 구도인데, 삼성은 비스포크 색상과 스마트싱스 연동이 강점이고 약점은 빌트인 시공이 필수라 설치 자유도가 낮다는 점입니다.',
    status: 'featured',
    tags: ['삼성', '비스포크', '식기세척기', '14인용', '빌트인', '워터월', '인버터', '1등급'],

    specs: {
      powerConsumption: 1850,
      noise: 44,
      energyEfficiency: 9,
      performance: 9,
      convenience: 9,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '워터월(WaterWall) 면세척 + 인버터 모터 + 오토 오픈 도어 건조',
      filterType: '3중 자가세정 필터',
      capacity: '14인용',
      dimensions: '598 x 817 x 575mm',
      weight: 41,
      energyGrade: '1등급',
      monthlyElectricityCost: 4500,
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
      msrp: 1290000,
      streetPrice: 990000,
      monthlyCost: 5000,
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
    rating: 4.3,
    image: '/images/appliances/samsung/wa16t6261bv/main.webp',
    images: [],
    price: 549000,
    description: '삼성 워블 버블워시 통돌이(전자동) 세탁기 16kg. 워블 물살로 옷감을 보호하고 버블세탁·강력 워터샷 헹굼으로 세탁력을 챙긴 가성비 대용량 모델.',
    oneliner: '워블 물살 + 버블세탁, 드럼이 부담스러울 때 16kg 가성비 통돌이',
    editorComment: '삼성 통돌이(전자동) 라인의 가성비 16kg 모델입니다. 드럼 특유의 문 냄새·곰팡이 관리가 부담스럽거나 159만원대 그랑데AI 드럼이 과한 가정에, 50만원대로 대용량 세탁을 해결해 줍니다. 워블 물살로 옷감 손상·엉킴을 줄이고 버블세탁과 워터샷 헹굼으로 세탁력은 챙겼지만, 건조 기능이 없고 에너지효율 2등급이라 물·전기 사용은 프리미엄 드럼보다 많습니다. 빨래 널 공간이 있고 단순·튼튼한 대용량 세탁기를 원하는 3~4인 가정에 적합합니다.',
    status: 'best',
    tags: ['삼성', '워블', '버블워시', '통돌이', '전자동', '16kg', '워터샷', '가성비'],

    specs: {
      powerConsumption: 250,
      noise: 47,
      energyEfficiency: 7,
      performance: 7,
      convenience: 7,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '워블(Wobble) 물살 + 버블세탁 + 강력 워터샷 헹굼 + 디지털 인버터 모터',
      filterType: '이지 필터 (보풀·먼지 거름망)',
      capacity: '16kg',
      dimensions: '600 x 1020 x 640mm',
      weight: 41,
      energyGrade: '2등급',
      monthlyElectricityCost: 2500,
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
      msrp: 549000,
      streetPrice: 449000,
      monthlyCost: 3000,
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
    rating: 4.5,
    image: '/images/appliances/samsung/dv14b8520bv/main.webp',
    images: [],
    price: 920000,
    description: '삼성 그랑데 히트펌프 건조기 14kg. 저온 히트펌프로 옷감을 보호하고 에어워시로 살균·탈취하는 중형 가성비 독립형 모델. 별도 환기구 없이 설치 가능하며 스마트싱스 연동을 지원합니다.',
    oneliner: '저온 히트펌프 + 에어워시 살균, 14kg 중형 가성비 건조기',
    editorComment: '상위 17kg 비스포크 그랑데AI가 부담스러울 때 고르는 가성비 사이즈입니다. 저온 히트펌프로 니트·기능성 의류도 줄지 않게 말리고, 에어워시(열풍 살균·탈취)로 세탁하기 애매한 외투·이불의 냄새를 빼는 게 강점입니다. 응축식 독립형이라 배기 덕트 공사가 필요 없어 17kg 대비 설치 자리 부담과 비용이 확실히 적습니다. 다만 상위 모델의 AI 자동코스·스팀 구김제거는 빠졌고 두꺼운 겨울 이불은 14kg으로 빠듯하니, 1~3인 가구의 일상 빨래 위주라면 90만원대 가성비로 가장 합리적인 선택입니다.',
    status: 'best',
    tags: ['삼성', '그랑데', '건조기', '히트펌프', '14kg', '에어워시', '독립형', '가성비'],

    specs: {
      powerConsumption: 750,
      noise: 45,
      energyEfficiency: 8,
      performance: 8,
      convenience: 7,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '저온 히트펌프 건조 + 에어워시(열풍 살균·탈취)',
      filterType: '2중 먼지 필터 + 자동 응축수 배수',
      capacity: '14kg',
      dimensions: '600 x 850 x 600mm',
      weight: 48,
      energyGrade: '1등급',
      monthlyElectricityCost: 9000,
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
      msrp: 920000,
      streetPrice: 790000,
      monthlyCost: 9000,
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
    modelNumber: 'VR50T95735W',
    category: '로봇청소기',
    rating: 4.3,
    image: '/images/appliances/samsung/vr50t95735w/main.webp',
    images: [],
    price: 1390000,
    description: '삼성 비스포크 제트봇 AI 로봇청소기. AI 사물인식으로 전선·반려동물 배변물 등 장애물을 회피하고, 3D 라이다로 집 구조를 정밀 매핑하며, 청정스테이션이 청소가 끝나면 먼지를 자동으로 비워주는 프리미엄 흡입형 모델. 스마트싱스 연동으로 원격 제어와 홈 모니터링까지 지원한다.',
    oneliner: 'AI 사물인식 회피 + 라이다 매핑 + 청정스테이션 자동비움, 손 안 가는 프리미엄 로봇청소기',
    editorComment: '손이 가장 덜 가는 로봇청소기를 찾는다면 후보에 올릴 만한 삼성 플래그십입니다. AI 사물인식으로 전선·반려동물 배변물을 비교적 잘 피하고, 3D 라이다 매핑이 여러 방 구조에서 정확하며, 청정스테이션이 청소 후 먼지를 자동으로 비워줘 수 주간 손댈 일이 없습니다. 다만 물걸레 동시 청소 기능이 없고 가격이 130만원대라, 흡입과 물걸레를 한 번에 원하거나 가성비를 따진다면 로보락·LG 올인원 라인이 더 맞습니다. 삼성 가전과 스마트싱스를 쓰는 집이라면 기기 연동과 카메라 홈 모니터링까지 묶이는 점이 같은 프리미엄 구간에서의 가장 큰 차별점입니다.',
    status: 'featured',
    tags: ['삼성', '비스포크', '제트봇AI', '로봇청소기', 'AI사물인식', '라이다매핑', '청정스테이션', '프리미엄'],

    specs: {
      powerConsumption: 50,
      noise: 66,
      energyEfficiency: 9,
      performance: 9,
      convenience: 9,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: 'AI 사물인식 회피 + 3D 라이다(LiDAR) 매핑 + 청정스테이션 자동 먼지비움',
      filterType: '헤파 필터 (H13)',
      capacity: '6000Pa 흡입 / 0.3L 먼지통 + 청정스테이션 자동비움(2.5L 먼지봉투)',
      dimensions: '350 x 350 x 96mm (본체)',
      weight: 4.4,
      monthlyElectricityCost: 800,
    },

    roomFit: {
      recommendedSize: ['중형', '대형'],
      coverageArea: 200,
      installationType: '청정스테이션(자동비움)',
      installationNote: '청정스테이션은 좌우 0.5m·전방 1m 여유 공간 확보가 권장. 2.4GHz 와이파이 연결 후 스마트싱스 앱에서 맵 학습을 먼저 돌리면 구역 지정·청소 정확도가 올라갑니다.',
    },

    errorCodes: [
      {
        code: '바퀴 끼임 (Wheel Stuck)',
        description: '본체가 끼었거나 바퀴가 헛도는 상태로 주행 중지',
        cause: '문턱·전선·러그 술 등에 바퀴가 걸리거나 들림',
        solution: '본체를 평평한 바닥으로 옮기고 바퀴에 감긴 이물질을 제거한 뒤 재시작. 특정 구간에서 반복되면 출입금지 구역으로 설정하거나 삼성전자 서비스센터(1588-3366)에 문의',
        severity: 'medium',
      },
      {
        code: '메인브러시 엉킴 (Brush Tangled)',
        description: '메인브러시가 회전하지 못해 흡입이 중단됨',
        cause: '머리카락·반려동물 털·실 등이 브러시에 감김',
        solution: '전원을 끄고 브러시 커버를 분리해 감긴 이물질을 잘라낸 뒤 다시 장착. 주기적으로 브러시를 청소하면 예방 가능',
        severity: 'low',
      },
      {
        code: '충전 실패 (Docking Failed)',
        description: '청소 후 청정스테이션을 찾지 못하거나 충전이 시작되지 않음',
        cause: '스테이션 주변 장애물, 충전 단자 오염, 스테이션 위치 이동',
        solution: '스테이션 주변을 정리하고 충전 단자를 마른 천으로 닦은 뒤 본체를 수동으로 도킹. 와이파이·맵이 어긋났다면 스마트싱스에서 맵을 재학습. 지속 시 서비스센터(1588-3366) 문의',
        severity: 'medium',
      },
      {
        code: 'C05',
        description: '범퍼(부딪침 감지센서)가 눌린 상태로 인식되어 주행을 멈춤',
        cause: '벽·가구 모서리에 범퍼가 낀 채 눌려 있거나, 범퍼 틈에 이물질이 끼어 정상 위치로 복귀하지 못함',
        solution: '본체를 평평하고 트인 곳으로 옮긴 뒤 범퍼를 손으로 눌렀다 떼어 부드럽게 복귀되는지 확인하세요. 범퍼 틈새의 머리카락·먼지를 제거하고 전원을 껐다 켜면 대부분 해제됩니다. 같은 자리가 아닌데도 반복되면 삼성전자서비스(1588-3366)에 점검을 의뢰하세요.',
        severity: 'medium',
      },
      {
        code: 'C06',
        description: '장애물 감지 센서창이 오염되어 주변 사물 인식이 되지 않음',
        cause: '본체 전면·후면의 장애물 감지 센서창에 먼지나 이물질이 쌓임',
        solution: '전원을 끄고 전면·후면 센서창을 마른 부드러운 천으로 닦은 뒤 다시 켜세요. 물기나 세제는 사용하지 마세요. 깨끗이 닦았는데도 코드가 계속 뜨면 삼성전자서비스(1588-3366)에 점검을 의뢰하세요.',
        severity: 'low',
      },
      {
        code: 'C07',
        description: '추락방지(낭떠러지) 센서창 오염으로 바닥 단차를 감지하지 못함',
        cause: '본체 밑면 양쪽 추락방지 센서창에 먼지·이물질이 묻음. 어둡거나 광택 있는 바닥에서도 오인식될 수 있음',
        solution: '본체를 뒤집어 밑면 양쪽 추락방지 센서창을 마른 천으로 닦은 뒤 전원을 껐다 켜세요. 안전과 직결되는 센서이므로 계단·단차 근처에서 반복되면 사용을 멈추고 삼성전자서비스(1588-3366)에 점검을 의뢰하세요.',
        severity: 'medium',
      },
      {
        code: 'C08',
        description: '먼지통이 장착되지 않아 청소가 시작되지 않음',
        cause: '먼지통이 빠져 있거나 덜 끼워짐, 또는 필터가 조립되지 않은 채 먼지통을 장착함',
        solution: '필터가 제대로 끼워진 먼지통을 \'딸깍\' 소리가 날 때까지 밀어 넣으세요. 장착부와 접촉면에 이물질이 끼지 않았는지 확인하고 전원을 껐다 켭니다. 정상 장착 후에도 인식되지 않으면 삼성전자서비스(1588-3366)에 문의하세요.',
        severity: 'low',
      },
      {
        code: 'C09',
        description: '측면 회전솔(사이드 브러시)에 이물질이 엉켜 회전이 멈춤',
        cause: '머리카락·실·끈 등이 측면 회전솔 축에 감겨 모터가 멈춤',
        solution: '전원을 끄고 측면 회전솔을 분리해 감긴 이물질을 제거한 뒤 재조립하세요. 심하게 엉킨 경우 분리한 상태에서 가위로 잘라 제거합니다. 재조립 후에도 반복되거나 회전솔이 헐거우면 삼성전자서비스(1588-3366)에서 부품 점검·교체를 받으세요.',
        severity: 'low',
      },
    ],

    targetUsers: {
      recommended: [
        '머리카락·반려동물 털로 먼지통을 자주 비우기 번거로운 가정',
        '여러 방 구조를 정밀하게 매핑해 구역별로 청소하고 싶은 사용자',
        '삼성 가전·스마트싱스로 집안 기기를 통합 관리하는 가정',
        '전선·양말 같은 바닥 장애물 회피가 중요한 집',
      ],
      notRecommended: [
        '흡입과 물걸레 동시 청소를 핵심으로 원하는 사용자 (이 모델은 흡입 위주)',
        '100만원대 예산이 부담스러운 가성비 우선 소비자',
        '문턱이 많거나 복층 등 주행 난도가 높아 끼임이 잦은 환경',
      ],
    },

    features: [
      'AI 사물인식으로 전선·양말·반려동물 배변물 등 장애물 회피',
      '3D 라이다(LiDAR) 매핑으로 여러 방 구조 정밀 주행',
      '청정스테이션 자동 먼지비움 (수 주간 먼지통 비울 필요 없음)',
      '헤파(H13) 필터로 미세먼지 흡착 후 깨끗한 배기',
      '스마트싱스 원격 제어·청소 구역 지정·카메라 홈 모니터링',
    ],

    priceAnalysis: {
      msrp: 1390000,
      streetPrice: 990000,
      monthlyCost: 1500,
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
    rating: 4.3,
    image: '/images/appliances/samsung/rf60a91r3ap/main.webp',
    images: [],
    price: 2790000,
    description: '삼성 비스포크 키친핏 4도어 냉장고. 깊이를 줄인 빌트인룩 슬림 디자인에 615L 대용량과 메탈쿨링, 디지털 인버터 컴프레서를 갖춘 1등급 프리미엄 모델.',
    oneliner: '615L 빌트인룩 슬림 4도어, 주방과 앞면을 맞추는 키친핏 냉장고',
    editorComment: '비스포크 4도어 RF85가 875L 플래그십이라면, 이 키친핏 RF60은 깊이를 줄여 주방 가구와 앞면을 맞추는 빌트인룩 슬림 4도어입니다. 615L로 3~4인 가족에 넉넉하고, 메탈쿨링과 1등급 효율로 정온·절전은 상위 모델과 큰 차이가 없습니다. 슬림 깊이라 좁은 주방에도 답답하지 않게 들어가지만, 깊이를 줄인 만큼 총 용량과 칸별 수납은 875L 4도어보다 한 단계 아래입니다. 디자인 통일감과 공간 효율을 중시하는 가정에 잘 맞는, 우리 냉장고 라인업의 premium 포지션입니다.',
    status: 'new',
    tags: ['삼성', '비스포크', '냉장고', '4도어', '키친핏', '615L', '메탈쿨링', '1등급'],

    specs: {
      powerConsumption: 38,
      noise: 37,
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
      dimensions: '795 x 1853 x 660mm',
      weight: 105,
      energyGrade: '1등급',
      monthlyElectricityCost: 3500,
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
      msrp: 2790000,
      streetPrice: 2390000,
      monthlyCost: 3500,
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
    rating: 4.3,
    image: '/images/appliances/samsung/wd25db8995bz/main.webp',
    images: [],
    price: 3490000,
    description: '삼성 비스포크 AI 콤보 세탁건조기. 세탁 25kg과 히트펌프 건조 15kg을 한 대에 담은 올인원 일체형으로, AI 맞춤세탁과 버블워시까지 갖춘 프리미엄 모델.',
    oneliner: '세탁 25kg + 히트펌프 건조 15kg, 한 대로 끝내는 올인원 일체형',
    editorComment: '세탁기와 건조기를 한 대로 합친 올인원 일체형입니다. 세탁 25kg에 히트펌프 건조 15kg을 한 몸체에서 처리해, 건조기 자리를 따로 못 내는 집도 세탁부터 건조까지 한 번에 끝낼 수 있습니다. AI가 세탁물 무게와 오염도를 감지해 코스와 세제량을 잡아주고, 히트펌프 저온 건조라 옷감 손상도 적습니다. 다만 세탁과 건조를 한 통에서 하다 보니 같은 용량의 분리형 세탁기+건조기보다 한 사이클이 길고 가격도 349만원으로 높아, 두 대를 놓을 공간과 예산이 된다면 분리형이 회전율 면에서 유리합니다.',
    status: 'featured',
    tags: ['삼성', '비스포크', 'AI콤보', '세탁건조일체형', '올인원', '25kg', '히트펌프건조', '1등급'],

    specs: {
      powerConsumption: 700,
      noise: 44,
      energyEfficiency: 8,
      performance: 9,
      convenience: 10,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: 'AI 맞춤세탁 + 히트펌프 건조 + 버블워시 + DD 인버터 모터',
      filterType: '자가세정 필터 + 건조 콘덴서(자동세척)',
      capacity: '세탁 25kg / 건조 15kg (일체형)',
      dimensions: '686 x 980 x 700mm',
      weight: 96,
      energyGrade: '1등급',
      monthlyElectricityCost: 9000,
    },

    roomFit: {
      recommendedSize: ['소형', '중형', '대형'],
      coverageArea: 0,
      installationType: '세탁·건조 일체형 드럼',
      installationNote: '급수·배수 연결 필요. 일체형이라 세탁기·건조기 두 대 자리 없이 한 대로 설치 가능하며, 히트펌프 응축식이라 별도 배기 덕트 공사가 필요 없습니다. 도어 개방 반경을 확인하세요.',
    },

    errorCodes: [
      {
        code: '4C',
        description: '급수 불량',
        cause: '수도꼭지 잠김 또는 급수필터 막힘',
        solution: '수도를 확인하고 급수필터를 청소하세요. 지속되면 삼성전자 서비스센터(1588-3366)',
        severity: 'medium',
      },
      {
        code: '5C',
        description: '배수 불량',
        cause: '배수 호스 꺾임 또는 거름망 막힘',
        solution: '배수 거름망을 청소하고 호스를 펴 주세요. 반복되면 삼성전자 서비스센터(1588-3366)',
        severity: 'medium',
      },
      {
        code: 'dC',
        description: '도어 열림',
        cause: '문이 덜 닫혔거나 세탁물이 끼임',
        solution: '문 사이 세탁물을 정리하고 확실히 닫은 뒤 재가동',
        severity: 'low',
      },
      {
        code: '1C',
        description: '수위센서 이상',
        cause: '수위센서 오류',
        solution: '전원을 재투입하세요. 지속되면 삼성전자 서비스센터(1588-3366) 점검',
        severity: 'medium',
      },
      {
        code: 'HC',
        description: '건조 히트펌프 과열',
        cause: '필터 막힘 또는 통풍 불량',
        solution: '콘덴서와 필터를 청소한 뒤 재가동하세요. 반복되면 삼성전자 서비스센터(1588-3366)',
        severity: 'high',
      },
      {
        code: '3C',
        description: '모터 구동 이상',
        cause: '모터 또는 홀센서 오류',
        solution: '전원을 분리 후 재투입하고, 지속되면 삼성전자 서비스센터(1588-3366) 점검',
        severity: 'high',
      },
    ],

    targetUsers: {
      recommended: [
        '세탁기와 건조기를 둘 자리가 없어 한 대로 해결하려는 가정',
        '세탁부터 건조까지 한 번에 끝내고 싶은 맞벌이·1~2인 가구',
        '히트펌프 저온 건조로 옷감을 보호하고 싶은 사용자',
        'AI 자동 세탁과 스마트싱스 연동을 선호하는 사용자',
      ],
      notRecommended: [
        '세탁기와 건조기를 따로 둘 공간·예산이 충분한 가정 (분리형이 회전율 유리)',
        '하루에 세탁·건조를 여러 번 빠르게 돌려야 하는 대가족',
        '초기 구입가 349만원이 부담스러운 가성비 소비자',
      ],
    },

    features: [
      'AI 맞춤세탁 (무게·오염도 자동 감지로 코스·세제량 최적화)',
      '히트펌프 저온 건조 (옷감 손상 최소화, 별도 배기 덕트 불필요)',
      '버블워시 (찬물 미세거품 세탁)',
      '세탁 25kg + 건조 15kg 올인원 (세탁기·건조기 한 대로 통합)',
      '스마트싱스 앱 원격 제어·세탁/건조 알림',
    ],

    priceAnalysis: {
      msrp: 3490000,
      streetPrice: 2990000,
      monthlyCost: 9000,
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
    rating: 4.3,
    image: '/images/appliances/samsung/dv10b6320lv/main.webp',
    images: [],
    price: 690000,
    description: '삼성 인버터 히트펌프 건조기 10kg. 1~2인 가구를 위한 소형 저온 건조기로, 응축식이라 환기구 공사 없이 설치 가능하고 1등급 효율로 전기요금 부담이 적은 가성비 모델.',
    oneliner: '1~2인 가구용 10kg 히트펌프, 환기구 공사 없는 소형 가성비 건조기',
    editorComment: '17kg·14kg 그랑데가 부담스러운 1~2인 가구를 위한 소형 10kg 히트펌프 건조기입니다. 인버터 히트펌프 저온 건조라 니트도 줄지 않고, 응축식이라 환기구 공사 없이 어디든 놓을 수 있어 원룸·오피스텔에 특히 잘 맞습니다. 1등급 효율로 전기요금 부담이 적은 대신, 두꺼운 겨울 이불이나 4인 가족 빨래량에는 10kg이 빠듯합니다. 혼자 또는 둘이 사는 집에서 매일 나오는 빨래를 가볍게 말리는 용도라면 70만원 이하 가성비로 합리적인 선택입니다.',
    status: 'best',
    tags: ['삼성', '건조기', '히트펌프', '인버터', '10kg', '소형', '1~2인가구', '1등급'],

    specs: {
      powerConsumption: 600,
      noise: 44,
      energyEfficiency: 8,
      performance: 7,
      convenience: 7,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '인버터 히트펌프 저온 건조',
      filterType: '2중 먼지 필터 + 자동 응축수 배수',
      capacity: '10kg',
      dimensions: '600 x 850 x 600mm',
      weight: 42,
      energyGrade: '1등급',
      monthlyElectricityCost: 7000,
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
      msrp: 690000,
      streetPrice: 590000,
      monthlyCost: 7000,
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
    name: '삼성 더 무빙스타일',
    modelNumber: 'KU27LSFM7AXXKR',
    category: 'TV',
    rating: 4.1,
    images: [],
    price: 1490000,
    description:
      '삼성 더 무빙스타일(KU27LSFM7AXXKR). 화면과 무빙 스탠드를 분리할 수 있는 27인치 QHD 이동식 터치 TV로, 120Hz 고주사율과 풀 모션 스탠드를 지원한다.',
    oneliner: '화면 분리형 이동식 QHD 터치 TV',
    editorComment:
      'LG 스탠바이미의 강력한 경쟁작으로, 같은 이동식 카테고리에서 120Hz 고주사율과 터치스크린을 앞세웁니다. 게임·스포츠에서 부드러움이 확실히 체감되고, 화면 분리와 풀 모션(틸트·스위블·피벗) 스탠드로 활용도가 높습니다. 다만 100만원대 가격에 QHD 해상도라는 점은 국내 리뷰에서 가장 많이 지적되는 부분이고, 스탠드 포함 25.7kg의 무게와 3시간 배터리도 아쉽습니다. 고주사율·터치 조작을 중시하는 사용자에게 유리한 선택입니다.',
    status: 'featured',
    tags: ['삼성', '더무빙스타일', '이동식TV', '무선TV', 'QHD', '120Hz', '터치스크린', '라이프스타일'],

    specs: {
      powerConsumption: 0,
      noise: 5,
      energyEfficiency: 7,
      performance: 8,
      convenience: 8,
      durability: 6,
    },

    techSpecs: {
      coreTechnology: '27형 LED 터치스크린 · 2세대 AI 4K 프로세서',
      capacity: '27인치 QHD (2560×1440)',
      weight: 5.2,
      extraSpecs: [
        { label: '해상도', value: 'QHD 2560×1440' },
        { label: '주사율', value: '120Hz (절전 시 60Hz)' },
        { label: 'HDR', value: 'HDR10+ · HLG' },
        { label: '스마트OS', value: '타이젠(2025년형)' },
        { label: '배터리', value: '69Wh · 무선 최대 3시간' },
        { label: '조작', value: '터치스크린' },
        { label: '스탠드 포함 무게', value: '25.7kg' },
        { label: '특징', value: '화면 분리 · 풀 모션 스탠드(틸트·스위블·피벗)' },
      ],
    },

    targetUsers: {
      recommended: [
        '이동식 TV에서 120Hz 고주사율을 원하는 사용자',
        '터치 조작과 화면 분리를 활용하려는 사용자',
        '게임·스포츠를 부드럽게 보고 싶은 사용자',
      ],
      notRecommended: [
        '가격 대비 4K 해상도를 기대하는 사용자',
        '자주 옮겨야 해 25.7kg 무게가 부담인 사용자',
        '배터리 장시간 사용이 필요한 사용자',
      ],
    },

    features: [
      '화면과 무빙 스탠드 분리 가능',
      '120Hz 고주사율로 게임·스포츠 최적화',
      '터치스크린 조작 지원',
      '풀 모션 스탠드(틸트·스위블·피벗, 높이 최대 23cm)',
      '2세대 AI 4K 프로세서 · Vision AI 화질 최적화',
    ],

    priceAnalysis: {
      msrp: 1490000,
      streetPrice: 1180000,
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
    ],

    purchaseLinks: [
      { store: '삼성전자 공식', url: '#', price: 1490000, isOfficial: true },
      { store: '다나와 최저가', url: '#', price: 1180000 },
    ],

    similarProducts: ['lg-standbyme2', 'lg-standbyme2-max', 'lg-standbyme-go'],
  },

  // === 무선이어폰 ===
  {
    id: 'samsung-galaxy-buds3-pro',
    slug: 'samsung-galaxy-buds3-pro',
    brand: 'Samsung',
    name: '삼성 갤럭시 버즈3 프로',
    modelNumber: 'SM-R630N',
    category: '무선이어폰',
    rating: 4.4,
    images: [],
    price: 319000,
    description:
      '삼성 갤럭시 버즈3 프로(SM-R630N). 10.5mm 다이나믹과 6.1mm 평판형을 결합한 2-way 듀얼 드라이버, 적응형 ANC, 갤럭시 실시간 통역을 갖춘 삼성 생태계 최적화 하이엔드 버즈.',
    oneliner: '갤럭시 최적화 하이엔드 버즈',
    editorComment:
      '갤럭시 사용자라면 최우선 후보입니다. 듀얼 드라이버로 해상력이 높고, 적응형 ANC 성능도 동급 상위권이며 실시간 통역·자동 기기 전환 등 삼성 연동 편의가 뛰어납니다. IP57 방수와 5.4 블루투스로 완성도도 좋습니다. 다만 ANC ON 시 6시간으로 배터리가 짧은 편이고, iOS·타 기기에서는 기능이 크게 제한됩니다. 출시가 대비 실거래가가 20만원대까지 내려와 가성비도 개선됐습니다.',
    status: 'best',
    tags: ['삼성', '갤럭시버즈', '버즈3프로', '무선이어폰', 'ANC', '노이즈캔슬링', '듀얼드라이버', 'IP57'],

    specs: {
      powerConsumption: 0,
      noise: 8,
      energyEfficiency: 8,
      performance: 8,
      convenience: 8,
      durability: 6,
    },

    techSpecs: {
      coreTechnology: '10.5mm 다이나믹 + 6.1mm 평판형 2-way 듀얼 드라이버',
      capacity: '최대 26시간(케이스 포함)',
      extraSpecs: [
        { label: '드라이버', value: '2-way 듀얼(다이나믹+평판형)' },
        { label: '코덱', value: 'SBC · AAC · SSC(24bit UHQ)' },
        { label: 'ANC', value: '적응형 ANC' },
        { label: '배터리', value: 'ANC ON 6h · 총 26h(케이스)' },
        { label: '방수', value: 'IP57' },
        { label: '블루투스', value: '5.4' },
        { label: '멀티포인트', value: '지원' },
        { label: '무게', value: '5.4g(개당)' },
        { label: '공간음향', value: '360 오디오 · 헤드트래킹' },
      ],
    },

    targetUsers: {
      recommended: [
        '갤럭시 스마트폰·워치를 함께 쓰는 사용자',
        '듀얼 드라이버 고해상 음질을 원하는 사용자',
        '실시간 통역·자동 전환 등 삼성 연동을 활용하는 사용자',
      ],
      notRecommended: [
        '아이폰·타 기기에서 주로 쓰는 사용자',
        'ANC 켜고 장시간(6시간 초과) 연속 사용하는 사용자',
        '초기 스템 내구성 이슈에 민감한 사용자',
      ],
    },

    features: [
      '2-way 듀얼 드라이버(다이나믹+평판형) 고해상 음질',
      '적응형 ANC + 슈퍼 클리어 콜',
      '갤럭시 AI 실시간 통역',
      '360 공간음향 · 적응형 EQ',
      'IP57 방수방진 · 블루투스 5.4 멀티포인트',
    ],

    priceAnalysis: {
      msrp: 319000,
      streetPrice: 209000,
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
    ],

    purchaseLinks: [
      { store: '삼성전자 공식', url: '#', price: 319000, isOfficial: true },
      { store: '다나와 최저가', url: '#', price: 209000 },
    ],

    similarProducts: ['apple-airpods-pro3', 'sony-wf-1000xm5', 'anker-soundcore-liberty5'],
  },
];
