import { Appliance } from '@/types/appliance';

export const haierAppliances: Appliance[] = [
  {
    id: 'haier-cth06qbw-wall',
    slug: 'haier-cth06qbw-wall',
    brand: 'Haier',
    name: '하이얼 셀프클리닝 벽걸이 CTH06QBW',
    modelNumber: 'CTH06QBW',
    category: '에어컨',
    rating: 3.9,
    image: '/images/appliances/haier/cth06qbw/main.webp',
    images: [],
    price: 449000,
    description: '하이얼 셀프클리닝 인버터 벽걸이 에어컨 6평형. 세계 판매 1위 브랜드의 초가성비 모델.',
    oneliner: '글로벌 1위 하이얼, 45만원 초가성비 셀프클리닝 벽걸이',
    editorComment: '글로벌 가전 판매 1위 하이얼의 한국 시판 모델입니다. 44.9만원으로 TCL과 함께 한국 에어컨 시장 최저가 구간을 형성하고 있습니다. 셀프클리닝 기능이 차별점으로, 냉각→해동→건조 3단계로 열교환기 내부를 자동 세척합니다. A/S는 하이마트·쿠팡 무상A/S 채널로 접수 가능합니다.',
    status: 'best',
    tags: ['하이얼', '벽걸이', '에어컨', '6평', '초저가', '셀프클리닝', '인버터'],

    specs: {
      powerConsumption: 750,
      noise: 36,
      energyEfficiency: 5,
      performance: 6,
      convenience: 5,
      durability: 6,
    },

    techSpecs: {
      coreTechnology: '인버터 컴프레서 + 셀프클리닝',
      filterType: '항균 필터',
      refrigerant: 'R32',
      capacity: '6평형 (18.7m2)',
      dimensions: '795 x 280 x 194mm',
      weight: 8.8,
      energyGrade: '4등급',
      monthlyElectricityCost: 21000,
    },

    roomFit: {
      recommendedSize: ['원룸'],
      coverageArea: 18.7,
      installationType: '벽걸이형',
      installationNote: '전국 기본설치 무료 (하이마트/쿠팡)',
    },

    errorCodes: [
      {
        code: 'E1',
        description: '실내 온도센서 이상',
        cause: '온도센서 불량 또는 연결 불량',
        solution: '전원 끄고 10분 후 재가동. 반복 시 A/S 접수',
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
        code: 'F1',
        description: '냉매 순환 이상',
        cause: '냉매 부족 또는 배관 꺾임',
        solution: '서비스센터 연락하여 냉매 점검',
        severity: 'high',
      },
      {
        code: 'E3',
        description: '냉방 능력이 떨어지거나 운전이 멈춤(저압·냉매 부족 보호)',
        cause: '냉매 누설 또는 부족, 저압 스위치 동작, 실외기 흡배기 막힘 등으로 시스템 압력이 비정상적으로 낮아짐',
        solution: '실외기 주변 환기를 확보하고 흡배기구 이물질을 제거한 뒤 전원을 차단해 5~10분 후 재가동하세요. 냉매 보충·누설 수리는 사용자가 할 수 없으므로 같은 코드가 반복되면 하이얼 서비스센터(1588-6645)에 점검을 요청하세요.',
        severity: 'high',
      },
      {
        code: 'E4',
        description: '운전 중 컴프레서 토출관 고온 보호로 정지됨',
        cause: '냉매 부족, 실외기 방열 불량(먼지·차폐물), 과부하 운전 등으로 압축기 토출 온도가 과도하게 상승',
        solution: '실외기 통풍 공간을 확보하고 응축기 표면 먼지를 청소한 뒤 충분히 식혀 재가동하세요. 반복되면 냉매·압축기 점검이 필요하므로 하이얼 서비스센터(1588-6645)에 문의하세요.',
        severity: 'high',
      },
      {
        code: 'E5',
        description: '과전류 또는 공급 전압 이상으로 운전이 정지됨',
        cause: '저전압·과전압 등 전원 불안정, 컴프레서 과부하, 전원 배선·기판 이상',
        solution: '멀티탭 대신 정격 전원의 단독 콘센트를 사용하고 전원을 완전히 내렸다가 재투입하세요. 다른 가전과 분리해도 반복되면 전압·기판 점검을 위해 하이얼 서비스센터(1588-6645)에 문의하세요.',
        severity: 'medium',
      },
      {
        code: 'E6',
        description: '실내기-실외기 통신 불량으로 운전이 멈추거나 실외기가 동작하지 않음',
        cause: '실내외기 연결선 접촉 불량·단선, 통신 기판 이상, 전원 결선 오류',
        solution: '전원을 내리고 1~2분 후 다시 켜서 통신을 재시도하세요. 반복되면 연결 배선과 기판 점검이 필요하므로 하이얼 서비스센터(1588-6645)에 점검을 요청하세요.',
        severity: 'medium',
      },
    ],

    targetUsers: {
      recommended: [
        '최저 예산으로 에어컨을 구매하려는 소비자',
        '원룸·자취방 전용 에어컨이 필요한 경우',
        '셀프클리닝 위생 기능을 원하는 사용자',
      ],
      notRecommended: [
        '전기요금에 민감한 사용자 (4등급)',
        '국산 브랜드 A/S를 선호하는 사용자',
        '8평 이상 공간 (냉방력 부족)',
      ],
    },

    features: [
      '스마트 셀프클리닝 (냉각→해동→건조 3단계)',
      '인버터 컴프레서',
      '건강 바람 모드',
      '수면 모드',
      '24시간 타이머',
    ],

    priceAnalysis: {
      msrp: 449000,
      streetPrice: 420000,
      monthlyCost: 21000,
      valueRating: 5,
      priceTier: 'budget',
      alternatives: ['tcl-tac-08csd-wall', 'carrier-cpae-a100fwea'],
    },

    reviews: [
      {
        userType: '대학생 자취생',
        rating: 4,
        text: '45만원짜리 에어컨인데 셀프클리닝까지 됩니다. 냉방도 3평 원룸에서 충분해요. 삼성 LG 90만원 주기엔 부담스러웠는데 이걸로 잘 해결했습니다.',
        pros: ['초저가', '셀프클리닝', '원룸 냉방 충분'],
        cons: ['4등급 전기요금'],
      },
      {
        userType: '원룸 추가 설치',
        rating: 3,
        text: '가격 대비 좋은데 리모컨 반응이 좀 느리고, 바람 방향 조절이 삼성 LG만큼 세밀하진 않아요. 그래도 이 가격이면 OK.',
        pros: ['가성비'],
        cons: ['리모컨 반응 느림', '풍향 조절 단순'],
      },
      {
        userType: '신혼부부 작은방',
        rating: 4,
        text: '작은방에 달았는데 6평형이라 금방 시원해져요. 셀프클리닝 돌리면 곰팡이 냄새 없이 깔끔하게 유지됩니다. 다만 4등급이라 한여름 종일 틀면 전기요금이 좀 나오는 편이에요.',
        pros: ['빠른 냉방', '위생 관리'],
        cons: ['여름 전기요금'],
      },
      {
        userType: 'A/S 경험 사용자',
        rating: 2,
        text: '설치 두 달 만에 E6 에러 뜨면서 실외기가 안 돌아갔어요. 하이마트 통해 접수했는데 기사님 방문까지 일주일 걸렸습니다. 제품 자체는 싼데 A/S 대응 속도는 국산 대기업이랑 비교하면 답답합니다.',
        pros: ['저렴한 가격'],
        cons: ['A/S 대응 느림', '초기 불량'],
      },
      {
        userType: '사무실 관리자',
        rating: 5,
        text: '사무실 탕비실 옆에 설치했는데 소음도 조용하고 냉방 빵빵합니다. 이 가격에 인버터라 종일 틀어도 전기요금 부담이 생각보다 적어요. 가성비로는 최고 같습니다.',
        pros: ['저소음', '인버터 절전', '가성비'],
        cons: ['디자인 평범'],
      },
    ],

    purchaseLinks: [
      { store: '롯데하이마트', url: '#', price: 449000 },
      { store: '쿠팡', url: '#', price: 449000 },
    ],

    similarProducts: ['tcl-tac-08csd-wall', 'samsung-wind-free-ar07a9170'],
  },

  {
    id: 'haier-cth10qbw-wall',
    slug: 'haier-cth10qbw-wall',
    brand: 'Haier',
    name: '하이얼 셀프클리닝 벽걸이 CTH10QBW',
    modelNumber: 'CTH10QBW',
    category: '에어컨',
    rating: 4.1,
    image: '/images/appliances/haier/cth10qbw/main.webp',
    images: [],
    price: 599000,
    description: '하이얼 셀프클리닝 인버터 벽걸이 에어컨 10평형. 안방·소형 거실까지 커버하는 가성비.',
    oneliner: '10평형 셀프클리닝 벽걸이, 캐리어 대비 10만원 저렴',
    editorComment: '6평형 CTH06QBW의 상위 모델로 10평형까지 커버합니다. 59.9만원으로 캐리어 10평형(69만원) 대비 10만원 저렴하면서 셀프클리닝 기능까지 탑재되어 있습니다. 안방이나 소형 거실에 가성비 옵션으로 좋습니다.',
    status: undefined,
    tags: ['하이얼', '벽걸이', '에어컨', '10평', '가성비', '셀프클리닝', '인버터'],

    specs: {
      powerConsumption: 1050,
      noise: 39,
      energyEfficiency: 5,
      performance: 7,
      convenience: 5,
      durability: 6,
    },

    techSpecs: {
      coreTechnology: '인버터 컴프레서 + 셀프클리닝',
      filterType: '항균 필터',
      refrigerant: 'R32',
      capacity: '10평형 (33m2)',
      dimensions: '870 x 292 x 210mm',
      weight: 11,
      energyGrade: '3등급',
      monthlyElectricityCost: 26000,
    },

    roomFit: {
      recommendedSize: ['소형', '중형'],
      coverageArea: 33,
      installationType: '벽걸이형',
      installationNote: '전국 기본설치 무료',
    },

    errorCodes: [
      {
        code: 'E1',
        description: '실내 온도센서 이상',
        cause: '온도센서 불량',
        solution: '전원 끄고 10분 후 재가동',
        severity: 'medium',
      },
      {
        code: 'E2',
        description: '실내기 열교환기(증발기)가 얼어붙어 냉방이 약해지고 운전이 멈춥니다.',
        cause: '에어필터 막힘, 실내 공기 순환 불량, 냉매 부족, 장시간 저온 운전 등으로 증발기(실내 열교환기)에 결빙이 발생합니다.',
        solution: '운전을 멈추고 송풍 모드로 돌리거나 전원을 끈 뒤 얼음이 녹도록 기다립니다. 이후 에어필터를 청소하고 흡입구·토출구 주변 장애물을 치웁니다. 청소 후에도 반복되면 냉매 부족 가능성이 있으니 하이얼 공식 서비스센터(1588-6645)에 점검을 의뢰하세요.',
        severity: 'medium',
      },
      {
        code: 'E3',
        description: '냉매 압력이 낮아(저압 보호) 압축기 보호가 작동해 냉방이 되지 않습니다.',
        cause: '냉매 부족 또는 누설, 배관 연결부 누기, 지나치게 낮은 외기 온도 등으로 저압 보호가 동작합니다.',
        solution: '냉매 보충은 사용자가 할 수 없는 작업입니다. 전원을 껐다가 잠시 후 재가동해 일시적 오류인지 확인하고, 반복 표시되면 냉매 누설 점검이 필요하므로 하이얼 공식 서비스센터(1588-6645)에 의뢰하세요.',
        severity: 'high',
      },
      {
        code: 'E4',
        description: '압축기 온도가 비정상적으로 높아 보호 동작으로 운전이 멈춥니다.',
        cause: '실외기 방열 불량(먼지·이물질), 냉매 부족, 고온 환경, 과부하 운전 등으로 압축기가 과열됩니다.',
        solution: '전원을 끄고 실외기 주변 통풍을 확보한 뒤 응축기(실외기) 표면의 먼지를 제거하고 충분히 식힌 후 재가동합니다. 그래도 반복되면 하이얼 공식 서비스센터(1588-6645)에 점검을 의뢰하세요.',
        severity: 'high',
      },
      {
        code: 'E5',
        description: '부하 증가로 압축기가 과전류·과부하 보호로 정지합니다.',
        cause: '전원 전압 불안정(저전압), 실외기 응축기 막힘, 고온·과부하 운전 등으로 압축기 전류가 비정상적으로 상승합니다.',
        solution: '전원을 끄고 수 분 뒤 재가동하며, 실외기 통풍·청소 상태를 확인하고 멀티탭 대신 단독 콘센트를 사용하세요. 반복되면 전압·압축기 점검이 필요하므로 하이얼 공식 서비스센터(1588-6645)에 의뢰하세요.',
        severity: 'high',
      },
      {
        code: 'E6',
        description: '실내기와 실외기 사이 통신이 끊겨 운전이 멈춥니다.',
        cause: '실내외기 연결 배선의 단선·접촉 불량, 제어 기판 이상, 설치 시 오결선 등으로 통신이 두절됩니다.',
        solution: '전원 차단기를 내렸다가 일정 시간 뒤 다시 올려 리셋해 봅니다. 연결 배선을 직접 만지지 말고, 반복 표시되면 배선·기판 점검이 필요하므로 하이얼 공식 서비스센터(1588-6645)에 의뢰하세요.',
        severity: 'medium',
      },
    ],

    targetUsers: {
      recommended: [
        '안방·소형 거실용 가성비 에어컨을 찾는 가정',
        '캐리어보다 더 저렴한 옵션을 원하는 소비자',
      ],
      notRecommended: [
        '15평 이상 거실 (스탠드 추천)',
        '1등급 효율을 원하는 사용자',
      ],
    },

    features: [
      '스마트 셀프클리닝',
      '인버터 컴프레서',
      '4방향 풍향 조절',
      '수면 모드',
      '24시간 타이머',
    ],

    priceAnalysis: {
      msrp: 599000,
      streetPrice: 550000,
      monthlyCost: 26000,
      valueRating: 5,
      priceTier: 'budget',
      alternatives: ['carrier-cpae-a100fwea', 'tcl-tac-12csd-wall'],
    },

    reviews: [
      {
        userType: '안방 설치 고객',
        rating: 4,
        text: '캐리어보다 10만원 싸고 셀프클리닝까지 있어서 선택했습니다. 10평 안방에 냉방 잘 되고, A/S도 하이마트에서 접수 가능해서 안심이에요.',
        pros: ['캐리어보다 저렴', '셀프클리닝', '냉방 충분'],
        cons: ['효율 3등급'],
      },
      {
        userType: '거실 겸용 사용자',
        rating: 4,
        text: '10평형이라 거실 겸 주방까지는 살짝 모자라지만 안방용으론 차고 넘칩니다. 3등급이라 6평형보다 효율이 좋아서 전기요금도 합리적이에요. 풍향 4방향 조절되는 것도 마음에 듭니다.',
        pros: ['넓은 냉방', '4방향 풍향', '3등급 효율'],
        cons: ['거실 단독은 부족'],
      },
      {
        userType: '인테리어 중시 사용자',
        rating: 3,
        text: '성능은 만족하는데 디자인이 좀 투박하고 본체가 두꺼운 편이에요. 벽에 달아놓으니 존재감이 큽니다. 냉방이랑 셀프클리닝은 제값 하니까 그 부분은 불만 없어요.',
        pros: ['냉방 성능', '셀프클리닝'],
        cons: ['투박한 디자인', '두꺼운 본체'],
      },
      {
        userType: '노부모님 댁 설치',
        rating: 5,
        text: '부모님 안방에 달아드렸는데 리모컨 글씨도 크고 조작이 단순해서 어르신들도 잘 쓰십니다. 캐리어 견적보다 10만원 가까이 저렴해서 설치비까지 합쳐도 부담이 덜했어요.',
        pros: ['간편 조작', '저렴한 가격'],
        cons: ['스마트 기능 없음'],
      },
      {
        userType: '여름철 장기 사용자',
        rating: 3,
        text: '한여름 한 달 내내 돌렸더니 셀프클리닝을 자주 안 하면 송풍구에서 냄새가 살짝 납니다. 주기적으로 청소 모드 돌려주면 괜찮아요. 39dB라는데 밤엔 약간 거슬릴 때도 있습니다.',
        pros: ['장시간 냉방'],
        cons: ['청소 자주 필요', '야간 소음'],
      },
    ],

    purchaseLinks: [
      { store: '롯데하이마트', url: '#', price: 599000 },
      { store: '쿠팡', url: '#', price: 560000 },
    ],

    similarProducts: ['carrier-cpae-a100fwea', 'haier-cth06qbw-wall'],
  },

  // === 냉장고 ===
  {
    id: 'haier-mini-fridge-155',
    slug: 'haier-mini-fridge-155',
    brand: 'Haier',
    name: '미니 냉장고 HRB-155MDW',
    modelNumber: 'HRB-155MDW',
    category: '냉장고',
    rating: 4.3,
    image: '/images/appliances/haier/hrb-155mdw/main.webp',
    images: [],
    price: 239000,
    description: '하이얼 155L 소형 2도어 냉장고. 원룸·사무실·세컨드 냉장고로 적합한 가성비 콤팩트 모델.',
    oneliner: '155L 콤팩트 2도어, 원룸·세컨드용 가성비 미니 냉장고',
    editorComment: '원룸 자취나 사무실, 세컨드 냉장고로 딱인 소형 모델입니다. 155L로 1인 가구의 기본 식재료와 음료·냉동식품을 보관하기에 충분하고, 상냉장·하냉동 2도어 구조라 쓰기 편합니다. 하이얼은 소형 냉장고에서 글로벌 점유율이 높아 이 체급의 완성도가 좋습니다. 대형 냉장고 같은 정온·디스펜서는 없지만, 24만원대 가격에 필요한 기능은 다 갖췄습니다. 1~2인 가구나 보조 냉장고를 찾는다면 가성비 1순위입니다.',
    status: 'best',
    tags: ['하이얼', '냉장고', '소형', '미니', '155L', '2도어', '원룸', '가성비'],

    specs: {
      powerConsumption: 20,
      noise: 40,
      energyEfficiency: 7,
      performance: 7,
      convenience: 6,
      durability: 7,
    },

    techSpecs: {
      coreTechnology: '간냉식(직냉) + 저소음 컴프레서',
      refrigerant: 'R600a',
      capacity: '155L (2도어)',
      dimensions: '495 x 1280 x 545mm',
      weight: 34,
      energyGrade: '2등급',
      monthlyElectricityCost: 1500,
    },

    roomFit: {
      recommendedSize: ['원룸', '소형'],
      coverageArea: 0,
      installationType: '소형 2도어 (프리스탠딩)',
      installationNote: '방열을 위해 좌우·후면 5cm 이상 이격. 수동 성에 제거 모델 여부 확인',
    },

    errorCodes: [
      {
        code: 'E0',
        description: '온도 센서 이상',
        cause: '냉장/냉동 온도 센서 접촉 불량 또는 고장',
        solution: '전원을 끄고 10분 후 재가동. 반복 시 하이얼 고객센터(1588-6645) 문의',
        severity: 'medium',
      },
      {
        code: 'E1',
        description: '냉동실(증발기) 순환 팬 모터 정지 — 냉동실이 덜 차가워짐',
        cause: '냉동실 순환팬 모터 고장, 또는 성에·이물질로 팬이 구속되거나 배선 접촉 불량',
        solution: '전원을 끄고 10분 뒤 재가동한 뒤 냉동실 성에·이물질을 제거하세요. 팬 소음이나 미작동이 반복되면 하이얼 고객센터(1588-6645)에 점검을 요청하세요.',
        severity: 'high',
      },
      {
        code: 'E2',
        description: '응축기(방열) 팬 모터 이상 — 냉각력 저하·본체 발열 증가',
        cause: '뒷면 방열용 응축기 팬 모터 고장, 또는 먼지 끼임·구속·배선 불량',
        solution: '전원을 끄고 뒷면·하단 방열부의 먼지를 제거한 뒤 재가동하세요. 발열이 심하거나 코드가 반복되면 하이얼 고객센터(1588-6645) 점검이 필요합니다.',
        severity: 'high',
      },
      {
        code: 'EH',
        description: '온도 센서 이상 — 온도 표시·자동 제어가 부정확',
        cause: '냉장 또는 냉동 온도 센서(서미스터)의 단선·단락, 커넥터 접촉 불량',
        solution: '전원을 끄고 10분 뒤 재가동해 초기화해 보세요. 코드가 계속 뜨면 센서 교체가 필요하므로 하이얼 고객센터(1588-6645)에 의뢰하세요.',
        severity: 'medium',
      },
      {
        code: 'Fr',
        description: '메인(본체) 센서 이상 — 자동 온도제어 오류',
        cause: '본체 제어용 센서 고장, 또는 메인 기판과 센서 사이 배선 불량',
        solution: '전원 재투입으로 초기화를 시도하세요. 반복되면 자가 조치가 어려우므로 하이얼 고객센터(1588-6645)에 점검을 맡기세요.',
        severity: 'medium',
      },
      {
        code: 'FD',
        description: '냉동실 제상(자동 성에 제거) 이상 — 증발기 성에 과다·냉각 저하',
        cause: '제상 히터 또는 제상 센서 고장으로 자동 성에 제거가 동작하지 않음',
        solution: '전원을 끄고 냉동실 내용물을 옮긴 뒤 성에를 충분히 녹여(수동 제상) 재가동하세요. 다시 표시되면 하이얼 고객센터(1588-6645)에 제상 부품 점검을 요청하세요.',
        severity: 'high',
      },
    ],

    targetUsers: {
      recommended: [
        '원룸·오피스텔 1인 가구',
        '사무실·매장 음료 보관용',
        '세컨드(보조) 냉장고가 필요한 가정',
        '저예산 콤팩트 냉장고를 찾는 사용자',
      ],
      notRecommended: [
        '3인 이상 가족 메인 냉장고 (용량 부족)',
        '정온·디스펜서 등 고급 기능이 필요한 사용자',
      ],
    },

    features: [
      '155L 상냉장·하냉동 2도어',
      '콤팩트 사이즈 (좁은 공간 설치)',
      '저소음 컴프레서',
      '도어 포켓·선반 수납',
      '온도 조절 다이얼',
    ],

    priceAnalysis: {
      msrp: 239000,
      streetPrice: 199000,
      monthlyCost: 1500,
      valueRating: 5,
      priceTier: 'budget',
      alternatives: ['samsung-bespoke-sxs-rs84'],
    },

    reviews: [
      {
        userType: '원룸 자취생',
        rating: 5,
        text: '혼자 살기 딱 좋은 크기예요. 음료, 반찬, 냉동식품 다 들어가고 조용한 편입니다. 이 가격에 2도어면 충분합니다.',
        pros: ['적당한 용량', '저소음', '2도어 가성비'],
        cons: ['수동 성에 제거'],
      },
      {
        userType: '사무실에 둔 사용자',
        rating: 4,
        text: '사무실 음료용으로 샀는데 잘 씁니다. 큰 기능은 없지만 가성비는 확실해요. 성에는 가끔 제거해줘야 합니다.',
        pros: ['가성비', '음료 보관 충분'],
        cons: ['성에 수동 제거'],
      },
      {
        userType: '신혼 세컨드 냉장고',
        rating: 4,
        text: '김치냉장고 대신 음료랑 과일 보관용 세컨드로 들였어요. 155L면 둘이 보조용으로 쓰기 딱입니다. 다만 냉동실에 성에가 끼어서 가끔 비우고 녹여줘야 해요.',
        pros: ['세컨드용 적당', '저전력'],
        cons: ['냉동실 성에'],
      },
      {
        userType: '오피스텔 입주민',
        rating: 3,
        text: '가격은 정말 착한데 컴프레서 돌아갈 때 \'웅\' 하는 소리가 조용한 새벽엔 좀 들립니다. 냉장 성능 자체는 문제없고 채소칸도 쓸 만해요. 디자인은 무난한 화이트라 어디든 잘 어울립니다.',
        pros: ['저렴한 가격', '무난한 디자인'],
        cons: ['새벽 컴프레서 소음'],
      },
      {
        userType: '1인 가구 장기 사용자',
        rating: 4,
        text: '2년째 쓰는데 잔고장 없이 잘 돌아갑니다. 냉동칸이 작아서 냉동식품 많이 쟁여두는 사람한텐 부족할 수 있어요. 혼자 살면서 기본 식재료만 보관하기엔 전기요금도 거의 안 나와서 만족합니다.',
        pros: ['내구성', '저전력', '잔고장 없음'],
        cons: ['냉동칸 작음'],
      },
    ],

    purchaseLinks: [
      { store: '하이얼 공식', url: '#', price: 239000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 199000 },
    ],

    similarProducts: ['samsung-bespoke-sxs-rs84', 'samsung-bespoke-4door-rf85', 'lg-dios-obje-4door-t873'],
  },
  // === 세탁기 ===
  {
    id: 'haier-mini-washer-wmd3',
    slug: 'haier-mini-washer-wmd3',
    brand: 'Haier',
    name: '하이얼 미니세탁기 3kg HWM30-22',
    modelNumber: 'HWM30-22',
    category: '세탁기',
    rating: 3.8,
    image: '/images/appliances/haier/hwm30-22/main.webp',
    images: [],
    price: 229000,
    description: '하이얼 미니세탁기 3kg. 원룸·아기옷·속옷·행주 분리세탁을 위한 소형 드럼 세탁기로, 95도 삶음·고온 살균 코스와 콤팩트 설치를 갖춘 가성비 세컨드 세탁기.',
    oneliner: '3kg 미니 드럼, 95도 삶음으로 아기옷·속옷·행주 분리세탁',
    editorComment: '삼성 그랑데AI·LG 트롬 같은 대형 드럼이 집안 메인 세탁을 책임지는 다인 가구라면 이 하이얼 미니세탁기는 분리세탁 전용 보조(세컨드) 세탁기 포지션이고, 원룸·자취 1인 가구에게는 3kg만으로 충분한 단독(메인) 세탁기가 됩니다. 3kg 소형이라 아기옷·속옷·행주를 어른 빨래와 따로 돌리기 좋고, 95도 삶음·고온 살균 코스로 위생 세탁까지 가능합니다. 정가 20만원대로 가성비는 분명하지만, 용량이 작고 탈수 소음이 큰 편이라 3~4인 가족의 메인 세탁기로 쓰긴 어렵습니다. 원룸 1인 가구의 단독(메인) 세탁기, 또는 아기 키우는 집·다인 가구의 분리세탁용 세컨드 세탁기를 찾는다면 1순위로 고려할 만합니다.',
    status: 'featured',
    tags: ['하이얼', '세탁기', '미니세탁기', '3kg', '미니 드럼', '삶음세탁', '분리세탁', '가성비'],

    specs: {
      powerConsumption: 1900,
      noise: 70,
      energyEfficiency: 5,
      performance: 6,
      convenience: 5,
      durability: 6,
    },

    techSpecs: {
      coreTechnology: '삶음 히터 내장 미니 드럼 + 95℃ 삶음·고온 살균 세탁 (가열 정격 약 1900W, 일반 세탁 약 300W)',
      filterType: '배수 거름망 필터',
      capacity: '3kg',
      dimensions: '550 x 600 x 450mm',
      weight: 26,
      energyGrade: '4등급',
      monthlyElectricityCost: 2000,
    },

    roomFit: {
      recommendedSize: ['원룸', '소형'],
      coverageArea: 0,
      installationType: '드럼형',
      installationNote: '급수·배수 연결 필요. 콤팩트 사이즈로 좁은 세탁공간이나 메인 세탁기 옆 보조 설치 가능',
    },

    errorCodes: [
      {
        code: 'E2',
        description: '도어 잠금 이상',
        cause: '도어가 완전히 닫히지 않았거나 도어 잠금장치 접촉 불량',
        solution: '도어를 다시 확실히 닫고 재시작. 세탁물이 도어에 끼었는지 확인, 반복 시 하이얼코리아 고객센터(1588-6645) 문의',
        severity: 'low',
      },
      {
        code: 'E4',
        description: '급수 이상',
        cause: '수도 밸브가 잠겼거나 급수 호스 꺾임·급수 필터망 막힘',
        solution: '수도꼭지 개방 확인, 급수 호스 꼬임·동결 점검, 급수 필터망 청소',
        severity: 'medium',
      },
      {
        code: 'E1',
        description: '배수 이상',
        cause: '배수 거름망 막힘 또는 배수 호스 꺾임·높이 부적합',
        solution: '배수 거름망 청소, 배수 호스 꼬임·설치 높이 확인 후 재시작',
        severity: 'medium',
      },
      {
        code: 'E3',
        description: '세탁·탈수 중 통이 심하게 흔들리며 \'E3\'가 표시되고 동작이 멈춘다(편중 감지).',
        cause: '빨래가 한쪽으로 쏠려 무게 균형이 맞지 않거나, 이불·매트처럼 소량이면서 부피가 큰 세탁물, 또는 본체가 기울어 수평이 맞지 않아 진동이 과다할 때 발생한다.',
        solution: '뚜껑을 열어 빨래를 골고루 펴서 다시 배치한 뒤 닫고 재시작한다. 소량·부피 큰 세탁물은 수건 몇 장을 함께 넣어 균형을 맞춘다. 바닥이 기울었으면 받침다리를 조절해 수평을 맞춘다. 조치 후에도 반복되면 서스펜션·균형 센서 점검이 필요하니 하이얼 서비스센터(또는 구매처)에 문의한다.',
        severity: 'low',
      },
      {
        code: 'E5',
        description: '구동 모터 이상으로 세탁·탈수 동작이 멈춤',
        cause: '모터 과열·과부하, 구동 벨트 이탈, 또는 모터 배선 접촉 불량',
        solution: '전원을 끄고 10분 정도 식힌 뒤 세탁물 양을 정량 이하로 줄여 재시작하세요. 반복되면 모터·벨트 점검이 필요하므로 하이얼코리아 고객센터(1588-6645)에 문의하세요.',
        severity: 'high',
      },
      {
        code: 'E6',
        description: '수위 감지 이상으로 급수·배수가 비정상 동작',
        cause: '수위 센서(압력 스위치) 고장 또는 에어트랩 호스 막힘·꺾임',
        solution: '전원을 끄고 5분 뒤 재시작하세요. 반복되면 하이얼코리아 고객센터(1588-6645)에 수위 센서 점검을 요청하세요.',
        severity: 'medium',
      },
    ],

    targetUsers: {
      recommended: [
        '아기옷·속옷·행주 등 분리세탁이 필요한 가정',
        '원룸·자취 1인 가구의 메인 소형 세탁기를 찾는 경우',
        '95도 삶음·고온 살균 위생 세탁을 원하는 사용자',
        '메인 세탁기와 별도로 보조(세컨드) 세탁기가 필요한 가정',
      ],
      notRecommended: [
        '3~4인 가족의 메인 세탁기 (용량 부족)',
        '이불·커튼 등 대형 빨래가 잦은 사용자',
        '1등급 고효율·저소음을 중시하는 사용자',
      ],
    },

    features: [
      '95℃ 삶음 + 고온 살균 코스',
      '3kg 미니 드럼 (아기옷·속옷·행주 분리세탁)',
      '콤팩트 설치 (원룸·좁은 세탁공간)',
      '간편 다이얼·버튼 조작',
      '소량 빨래 절수 세탁',
    ],

    priceAnalysis: {
      msrp: 229000,
      streetPrice: 179000,
      monthlyCost: 2000,
      valueRating: 4,
      priceTier: 'budget',
      alternatives: ['samsung-bubblewash-top-wa16'],
    },

    reviews: [
      {
        userType: '아기 키우는 집',
        rating: 4,
        text: '아기 옷이랑 어른 옷 분리해서 빨려고 샀어요. 95도 삶음 코스가 있어서 손수건이랑 행주 삶기 좋습니다. 3kg라 한 번에 많이는 못 넣지만 분리세탁용으론 딱이에요.',
        pros: ['95도 삶음', '분리세탁', '콤팩트'],
        cons: ['용량 작음'],
      },
      {
        userType: '원룸 자취생',
        rating: 3,
        text: '혼자 살아서 이 정도면 충분한데 탈수할 때 소리가 좀 큽니다. 가격은 저렴해서 만족해요. 빨래 양 많은 날은 두 번 돌려야 하는 게 단점이에요.',
        pros: ['저렴한 가격', '1인 적당'],
        cons: ['탈수 소음 큼', '용량 작음'],
      },
      {
        userType: '반려동물 가정',
        rating: 4,
        text: '강아지 방석이랑 수건을 따로 삶아 빨려고 샀어요. 95도 삶음 코스로 냄새랑 세균 걱정이 줄었습니다. 3kg라 한꺼번에 많이는 안 되지만 분리세탁 전용으론 만족해요.',
        pros: ['삶음 살균', '분리세탁 전용'],
        cons: ['소용량'],
      },
      {
        userType: '자취 신입생',
        rating: 2,
        text: '탈수 들어가면 통이 흔들리면서 소리가 엄청 큽니다. 빨래 적게 넣으면 E3 편중 에러가 자주 떠서 수건 몇 장 같이 넣어야 돌아가요. 가격은 싸지만 소음 때문에 밤엔 못 돌립니다.',
        pros: ['저렴'],
        cons: ['탈수 소음', '편중 에러'],
      },
      {
        userType: '다인 가구 보조세탁',
        rating: 4,
        text: '메인 세탁기는 따로 있고 속옷이랑 행주 분리용으로 들였습니다. 콤팩트해서 세탁기 옆 좁은 공간에 쏙 들어가요. 삶음 기능 덕에 위생적으로 관리되는 게 제일 마음에 듭니다.',
        pros: ['콤팩트 설치', '위생 삶음', '분리세탁'],
        cons: ['탈수 진동'],
      },
    ],

    purchaseLinks: [
      { store: '하이얼 공식', url: '#', price: 229000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 179000 },
    ],

    similarProducts: ['samsung-bubblewash-top-wa16', 'samsung-bespoke-grande-wf24a9500'],
  },
];
