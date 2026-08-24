import { Appliance } from '@/types/appliance';

export const dysonAppliances: Appliance[] = [
  // === 선풍기 ===
  {
    id: 'dyson-pure-cool-tp07',
    slug: 'dyson-pure-cool-tp07',
    brand: 'Dyson',
    name: '퓨어쿨 타워팬 TP07',
    modelNumber: 'TP07',
    category: '선풍기',
    rating: 4.3,
    image: '/images/appliances/dyson/tp07/main.webp',
    images: [],
    price: 529990,
    description: '다이슨 퓨어쿨 타워팬. 날개 없는 에어 멀티플라이어 송풍에 HEPA H13 공기청정을 결합한 프리미엄 선풍기.',
    oneliner: '날개 없는 안전 송풍 + HEPA 공기청정, 1년 내내 쓰는 프리미엄 타워팬',
    editorComment: '선풍기와 공기청정기를 한 대로 합친 모델입니다. 날개가 없어 아이·반려동물이 있는 집에서 안전하고, HEPA H13 필터로 미세먼지·꽃가루를 잡아 여름엔 송풍, 사철엔 공기청정으로 씁니다. 다이슨 공식 사양의 소비전력은 40W로, 타워형 송풍 제품 중에서는 낮은 편입니다. 단점은 가격과 송풍 직진성 — 넓은 거실을 시원하게 식히는 용도라기보다 청정+순환에 가깝습니다. 순수 냉방 체감을 원하면 일반 BLDC 선풍기가 가성비가 낫습니다.',
    status: 'featured',
    tags: ['다이슨', '퓨어쿨', '타워팬', '선풍기', '날개없는', '공기청정', 'HEPA', '저소음'],

    specs: {
      powerConsumption: 40, // 다이슨 공식
      energyEfficiency: 7,
      performance: 8,
      convenience: 10,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '에어 멀티플라이어 + HEPA H13 공기청정',
      filterType: 'HEPA H13 + 활성탄 일체형 필터',
      capacity: '타워형 (높이 1050mm)',
      dimensions: '204 x 1050 x 120mm',
    },

    roomFit: {
      recommendedSize: ['소형', '중형'],
      coverageArea: 27,
      installationType: '타워형/스탠드',
      installationNote: '공기청정 권장 면적 약 27m2. 벽에서 30cm 이상 떨어뜨려 배치 권장',
    },

    errorCodes: [
      {
        code: 'F',
        description: '필터 교체 알림',
        cause: 'HEPA 필터 사용 시간이 약 12개월(1일 12시간 기준)에 도달',
        solution: '정품 일체형 필터로 교체 후 앱 또는 본체에서 필터 수명 리셋. 미교체 시 청정 성능 저하',
        severity: 'low',
      },
      {
        code: 'F2',
        description: '필터 미장착 / 인식 불가',
        cause: '필터가 분리되어 있거나 좌우 필터가 완전히 결합되지 않아 본체가 인식하지 못함',
        solution: '전원을 끄고 좌우 필터를 \'딸깍\' 소리가 날 때까지 눌러 장착 후 재가동. 정품이 아닌 호환 필터는 인식되지 않을 수 있음',
        severity: 'medium',
      },
      {
        code: 'E',
        description: '본체 동작 이상',
        cause: '내부 센서 또는 모터 보호 동작',
        solution: '전원 코드를 뽑고 1분 후 재연결. 반복 시 다이슨 고객센터(1588-4253) 문의',
        severity: 'medium',
      },
      {
        code: 'AQ',
        description: '공기질 센서 오염 / 측정값 비정상',
        cause: '미세먼지·가스 센서 흡입구에 먼지가 쌓여 공기질이 항상 빨강으로 표시되거나 풍량이 멋대로 변함',
        solution: '전원을 끄고 본체 뒷면 센서 흡입구를 마른 면봉·솔로 가볍게 청소. 자동 모드 사용 시 한 달에 한 번 권장',
        severity: 'low',
      },
      {
        code: 'CL',
        description: 'Wi-Fi / 다이슨 링크 앱 연결 실패',
        cause: '공유기 2.4GHz 대역 미사용, 비밀번호 변경, 또는 본체와 앱의 페어링 정보 불일치',
        solution: '본체 전원 버튼을 약 5초간 길게 눌러 Wi-Fi를 리셋한 뒤 앱에서 2.4GHz 네트워크로 재등록. 라우터 재부팅 후에도 안 되면 다이슨 고객센터(1588-4253) 문의',
        severity: 'low',
      },
      {
        code: 'U1',
        description: '모터 회전 이상 / 송풍 정지',
        cause: '에어 멀티플라이어 모터에 이물질이 끼었거나 베어링 마모로 회전이 비정상',
        solution: '전원을 끄고 흡입구 주변 이물질을 제거 후 재가동. 소음·진동이 계속되면 임의 분해하지 말고 다이슨 고객센터(1588-4253)에 점검 문의',
        severity: 'high',
      },
    ],

    targetUsers: {
      recommended: [
        '아이·반려동물이 있어 날개 선풍기가 위험한 가정',
        '여름엔 선풍기, 사철엔 공기청정으로 한 대를 오래 쓰고 싶은 사용자',
        '미세먼지·알레르기 관리가 필요한 가정',
        '앱·음성으로 가전을 제어하는 스마트홈 사용자',
      ],
      notRecommended: [
        '강한 직바람 냉감을 원하는 사용자',
        '넓은 거실 전체를 빠르게 식히려는 경우',
        '가성비를 최우선으로 보는 소비자',
      ],
    },

    features: [
      '날개 없는 에어 멀티플라이어 송풍 (안전 설계)',
      'HEPA H13 + 활성탄 필터로 미세먼지·냄새 제거',
      '350도 회전 + 10단계 풍량',
      '야간 모드 (저소음·디스플레이 소등)',
      '다이슨 링크 앱 + 음성비서 제어',
    ],

    priceAnalysis: {
      msrp: 529990,
      monthlyCost: 2000,
      valueRating: 3,
      priceTier: 'premium',
      alternatives: ['lg-puricare-aerotower-fs061pwua', 'shinil-bldc-stand-sif14bldc'],
    },

    reviews: [
      {
        userType: '아이 둘 키우는 30평 아파트',
        rating: 5,
        text: '날개가 없으니 애들이 손 넣을 걱정이 없어요. 여름엔 선풍기로, 환절기엔 공기청정으로 1년 내내 돌립니다. 바람이 부드러워서 직바람 싫어하는 사람한테 딱.',
        pros: ['안전한 날개없는 송풍', '공기청정 겸용', '부드러운 바람'],
        cons: ['비싼 가격'],
      },
      {
        userType: '원룸 1인 가구',
        rating: 4,
        text: '디자인과 공기청정은 만족인데, 좁은 방에선 좋지만 거실 냉감을 기대하면 약합니다. 가격이 비싸서 순수 선풍기 용도면 추천 안 해요.',
        pros: ['디자인', '공기청정 겸용'],
        cons: ['약한 냉감', '비싼 가격'],
      },
      {
        userType: '알레르기 비염 있는 직장인',
        rating: 5,
        text: '비염 때문에 샀는데 자고 일어났을 때 코막힘이 확실히 줄었어요. 야간 모드 켜면 디스플레이도 꺼지고 소리도 거의 안 나서 침실에 두고 밤새 돌립니다. 필터값이 좀 나가는 게 흠.',
        pros: ['공기청정 성능', '저소음 야간모드'],
        cons: ['필터 교체비'],
      },
      {
        userType: '가전 비교 좋아하는 30대',
        rating: 4,
        text: '앱으로 공기질 그래프 보고 외출 중에도 켜둘 수 있어 편합니다. 350도 회전이라 방 전체 순환은 좋은데, 한 방향으로 시원한 직바람을 원하면 송풍이 퍼져서 아쉬울 수 있어요.',
        pros: ['앱 제어', '350도 회전'],
        cons: ['직진성 부족'],
      },
      {
        userType: '가성비 따지는 자취생',
        rating: 2,
        text: '디자인 보고 큰맘 먹고 샀는데 솔직히 선풍기로서의 시원함은 5만원짜리 BLDC만 못해요. 공기청정 기능값이라고 생각해야지, 바람 세기만 보면 가격이 너무 아깝습니다.',
        pros: ['디자인'],
        cons: ['비싼 가격', '풍량 아쉬움'],
      },
    ],

    purchaseLinks: [
      { store: '다이슨 공식', url: '#', price: 690000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 590000 },
    ],

    similarProducts: ['lg-puricare-aerotower-fs061pwua', 'shinil-bldc-stand-sif14bldc', 'xiaomi-mijia-dc-fan-1x'],
  },
  {
    id: 'dyson-hot-cool-hp09',
    slug: 'dyson-hot-cool-hp09',
    brand: 'Dyson',
    name: '퓨어 핫앤쿨 HP09',
    modelNumber: 'HP09',
    category: '선풍기',
    rating: 4.1,
    image: '/images/appliances/dyson/hp09/main.webp',
    images: [],
    price: 737290,
    description: '다이슨 퓨어 핫앤쿨 HP09. 날개 없는 에어 멀티플라이어 송풍에 PTC 히터와 HEPA H13 공기청정을 더한 냉방·난방·청정 3-in-1 타워팬. 포름알데히드를 지속 분해하는 셀렉티브 촉매 필터를 탑재했다.',
    oneliner: '여름엔 선풍기, 겨울엔 히터, 사철엔 공기청정 — 한 대로 끝내는 3-in-1 프리미엄 타워팬',
    editorComment: '다이슨 핫앤쿨 라인의 최상위 모델로, 선풍기(냉방)·히터(난방)·공기청정을 한 대에 담은 \'사계절 가전\'입니다. 날개 없는 에어 멀티플라이어로 아이·반려동물 가정에서도 안전하고, HEPA H13 + 활성탄에 포름알데히드를 분해하는 촉매 필터까지 더해 새집·새가구 환경에 강합니다. 다만 솔직히 말하면 가격이 가장 큰 진입장벽입니다. 조사 시점 73만원대는 선풍기·공기청정기·히터를 각각 따로 사는 것보다 비쌀 수 있어, \'한 대로 일년 내내\'라는 가치에 동의해야 납득됩니다. 또 난방은 PTC 방식 보조 난방 수준이라 한겨울 거실 메인 난방으로는 부족하고, 난방 가동 시 소비전력이 2000W까지 올라 전기요금 부담이 큽니다. 공기청정 + 순환 + 환절기 난방을 한 대로 깔끔하게 쓰려는 분께 맞는 모델입니다.',
    status: 'new',
    tags: ['다이슨', '핫앤쿨', 'HP09', '선풍기', '히터', '공기청정', '날개없는', 'HEPA', '포름알데히드분해'],

    specs: {
      powerConsumption: 2200, // 다이슨 공식
      energyEfficiency: 5,
      performance: 8,
      convenience: 10,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '에어 멀티플라이어 + PTC 세라믹 히터 + HEPA H13 공기청정 (3-in-1)',
      filterType: 'HEPA H13 + 활성탄',
      capacity: '냉난방·청정 권장 면적 약 27m2 (타워형, 높이 764mm)',
      dimensions: '205 x 764 x 130mm',
      weight: 5.7,
    },

    roomFit: {
      recommendedSize: ['소형', '중형'],
      coverageArea: 27,
      installationType: '타워형 이동식',
      installationNote: '권장 면적 약 27m2. 난방은 보조용이며 환기구·커튼에서 30cm 이상 떨어뜨려 배치 권장. 가연성 물질 근처 사용 금지',
    },

    errorCodes: [
      {
        code: 'F',
        description: '필터 교체 알림',
        cause: 'HEPA + 활성탄 필터 사용 시간이 약 12개월(1일 12시간 기준)에 도달',
        solution: '정품 일체형 필터로 교체 후 본체 또는 다이슨 링크 앱에서 필터 수명을 리셋. 미교체 시 청정·탈취 성능 저하',
        severity: 'low',
      },
      {
        code: 'E',
        description: '본체 동작 이상 / 모터 보호 정지',
        cause: '내부 센서 또는 모터 보호 회로가 비정상 동작을 감지해 운전을 중단',
        solution: '전원 코드를 뽑고 1분 후 재연결. 반복되면 다이슨 고객센터(1588-4253)에 점검 문의',
        severity: 'medium',
      },
      {
        code: 'HH',
        description: '히터 과열 보호 정지',
        cause: '난방 가동 중 흡입구 막힘 또는 좁은 공간 과열로 안전 차단 동작',
        solution: '전원을 끄고 흡입구 주변 이물질·장애물을 제거한 뒤 충분히 식혀 재가동. 지속되면 다이슨 고객센터(1588-4253) 문의',
        severity: 'high',
      },
      {
        code: 'F2',
        description: '필터 미장착 / 오장착',
        cause: '좌우 일체형 필터가 완전히 결합되지 않았거나 정품이 아닌 호환 필터를 사용',
        solution: '전원을 끄고 좌우 필터를 \'딸깍\' 소리가 날 때까지 눌러 결합 후 재가동. 정품 필터 사용 권장',
        severity: 'medium',
      },
      {
        code: 'AQ',
        description: '공기질 / 포름알데히드 센서 측정 이상',
        cause: '센서 흡입구 오염 또는 가동 직후 센서 안정화 전이라 측정값이 비정상으로 표시',
        solution: '전원을 끄고 본체 뒷면 센서 흡입구를 마른 면봉으로 청소. 재가동 후 약 30분 안정화 시간을 두면 정상화',
        severity: 'low',
      },
      {
        code: 'CN',
        description: 'Wi-Fi / 다이슨 링크 앱 연결 끊김',
        cause: '공유기 2.4GHz 대역 미사용 또는 비밀번호 변경으로 페어링 정보 불일치',
        solution: '본체 전원 버튼을 약 5초간 눌러 Wi-Fi를 리셋한 뒤 앱에서 2.4GHz 네트워크로 재등록. 반복되면 다이슨 고객센터(1588-4253) 문의',
        severity: 'low',
      },
    ],

    targetUsers: {
      recommended: [
        '선풍기·히터·공기청정기를 한 대로 통합하고 싶은 사용자',
        '아이·반려동물이 있어 날개·노출 열선이 위험한 가정',
        '새집·새가구로 포름알데히드·냄새 관리가 필요한 가정',
        '환절기 보조 난방과 사철 공기청정을 함께 쓰려는 사용자',
      ],
      notRecommended: [
        '한겨울 거실 메인 난방을 기대하는 사용자 (보조 난방 수준)',
        '난방 시 전기요금 부담에 민감한 사용자',
        '가성비를 최우선으로 보는 소비자',
      ],
    },

    features: [
      '냉방·난방·공기청정 3-in-1 통합 (사계절 사용)',
      '날개 없는 에어 멀티플라이어 송풍 (안전 설계)',
      'HEPA H13 + 활성탄 + 포름알데히드 분해 촉매 필터',
      'PTC 세라믹 히터로 환절기 보조 난방',
      '350도 회전 + 다이슨 링크 앱·음성비서 제어',
    ],

    priceAnalysis: {
      msrp: 737290,
      monthlyCost: 9500,
      valueRating: 3,
      priceTier: 'luxury',
      alternatives: ['dyson-pure-cool-tp07', 'lg-puricare-aerotower-fs061pwua'],
    },

    reviews: [
      {
        userType: '신축 입주 3인 가족',
        rating: 5,
        text: '이사하면서 새가구 냄새 잡으려고 샀는데 공기청정 성능이 확실합니다. 여름엔 선풍기, 환절기 쌀쌀할 때 히터로 잠깐씩 쓰니 진짜 일년 내내 돌아가요. 날개가 없어 애 손 넣을 걱정 없는 것도 큰 장점.',
        pros: ['공기청정 겸용', '사계절 사용', '안전한 날개없는 송풍'],
        cons: ['비싼 가격'],
      },
      {
        userType: '거실에서 난방으로 써본 사용자',
        rating: 3,
        text: '청정·송풍은 만족인데 난방은 딱 \'보조\' 수준입니다. 한겨울 거실을 데우진 못하고, 히터 켜면 전기요금이 확 올라요. 기능 다 합친 건 좋은데 가격이 너무 비싸서 별 하나 뺍니다.',
        pros: ['공기청정 겸용', '부드러운 송풍'],
        cons: ['약한 난방', '난방 시 전기요금', '비싼 가격'],
      },
      {
        userType: '환절기 보조난방 찾던 자취 직장인',
        rating: 4,
        text: '원룸이라 큰 히터 두기 부담스러웠는데 아침저녁 쌀쌀할 때 빠르게 데워줘서 딱 좋아요. 디자인도 예쁘고 한 대로 송풍·난방·청정 다 되니 공간도 절약됩니다. 다만 난방 오래 켜두면 전기요금이 신경 쓰여요.',
        pros: ['디자인', '환절기 보조 난방', '공간 절약'],
        cons: ['난방 시 전기요금'],
      },
      {
        userType: '강아지 키우는 신혼부부',
        rating: 5,
        text: '반려동물 털·냄새 때문에 골랐는데 탈취가 생각보다 훌륭합니다. 열선이 노출 안 돼서 강아지가 부딪혀도 안전하고요. 필터값은 좀 들지만 사계절 한 대로 다 해결되니 만족합니다.',
        pros: ['탈취 성능', '안전한 날개없는 송풍', '사계절 사용'],
        cons: ['필터 교체비'],
      },
      {
        userType: '가성비 중시 소비자',
        rating: 2,
        text: '기능을 다 합쳤다는 건 알겠는데 100만원이 넘으니 선뜻 추천은 못 하겠어요. 난방은 보조 수준이라 따로 히터를 또 쓰게 되고, 결국 비싼 공기청정 선풍기 느낌입니다. 예산이 넉넉한 분만.',
        pros: ['공기청정 겸용'],
        cons: ['너무 비싼 가격', '보조 난방 한계'],
      },
    ],

    purchaseLinks: [
      { store: '다이슨 공식', url: '#', price: 1090000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 890000 },
    ],

    similarProducts: ['dyson-pure-cool-tp07', 'lg-puricare-aerotower-fs061pwua', 'shinil-bldc-stand-sif14bldc'],
  },
];
