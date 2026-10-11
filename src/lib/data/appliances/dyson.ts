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
    image: '/images/appliances/dyson/tp07/main.webp',
    images: [],
    price: 529990,
    description: '다이슨 퓨어쿨 타워팬 TP07. 에어 멀티플라이어 송풍에 HEPA+탄소 교체 필터의 공기청정을 결합한 타워형 제품으로, 온풍과 포름알데히드 촉매 필터는 없다.',
    oneliner: '난방 없이 송풍·청정만 결합한 TP07, 교체 필터와 1,050mm 설치 높이 확인',
    editorComment: '온풍과 포름알데히드 촉매 필터가 필요 없다면 TP07이 HP09보다 2026-08-24 조사가 기준 207,300원 낮은 선택이고, 교체 필터(965432-01)는 두 모델이 같습니다. 다만 공단 공기청정기 신고가 없어 청정 면적으로 다른 공기청정기와 견줄 수는 없습니다.',
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
      coreTechnology: '에어 멀티플라이어 송풍 + HEPA+탄소 필터 청정',
      filterType: 'H13 등급 글라스 HEPA+탄소 일체형 교체 필터 (965432-01, 세척 불가)',
      capacity: '타워형 (높이 1050mm)',
      dimensions: '204 x 1050 x 120mm',
    },

    // 2026-10-08 2차 교정: 27㎡ 면적·30cm 간격·추천 평수는 정확한 모델 원문이 없는
    // 옛 카탈로그 값이라 제거했다(.audit/spec-compare.md, verified-specs.ts 미등재).
    // 3차: 공단 공기청정기 신고표(certi_list_121) 모델명 TP07 0건, 다이슨코리아 19건에도 없음.
    roomFit: {
      recommendedSize: [],
      installationType: '타워형/스탠드',
      installationNote: '필터를 교체할 하단 양쪽 외부 커버를 열 공간과 회전 범위(0~350° 설정)를 함께 고려해 자리를 잡으세요.',
    },

    targetUsers: {
      recommended: [
        '난방 없이 송풍과 HEPA+탄소 청정을 한 대로 쓰려는 가정',
        '12개월마다 교체하는 HEPA+탄소 필터 비용을 예산에 넣을 수 있는 사용자',
        'LCD·앱으로 PM2.5·PM10·VOC·이산화질소와 필터 잔여 수명을 확인하며 쓰려는 사용자',
        '다이슨 링크 앱·Alexa·Google Assistant·Siri 단축어로 제어하려는 사용자',
      ],
      notRecommended: [
        '풍량 시험값이 공개된 선풍기끼리 비교해 고르려는 사용자',
        '방 온도를 낮추는 것이 목적인 경우(실내 열을 밖으로 옮기는 에어컨이 아님)',
        '표준사용면적으로 다른 공기청정기와 비교해 고르려는 경우',
      ],
    },

    features: [
      '외부 회전 날개가 보이지 않는 에어 멀티플라이어 송풍',
      'H13 등급 글라스 HEPA+탄소 교체 필터 (965432-01, HP09와 공용)',
      '0~350° 범위에서 회전 설정',
      '야간 모드(설명서상 최저 소음 설정·화면 밝기 낮춤)와 슬립 타이머',
      '다이슨 링크 앱 + 음성비서 제어',
    ],

    priceAnalysis: {
      msrp: 529990,
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
    image: '/images/appliances/dyson/hp09/main.webp',
    images: [],
    price: 737290,
    description: '다이슨 퓨어 핫앤쿨 HP09. 에어 멀티플라이어 송풍·온풍·HEPA+탄소 청정에 교체가 필요 없는 포름알데히드 촉매 필터를 더한 타워형 제품. 온풍은 설정한 실내 온도에 도달하면 일시 정지한다.',
    oneliner: "송풍·청정에 난방을 더한 HP09, 운전·필터 관리 조건 확인",
    editorComment: '온풍과 포름알데히드 촉매 필터가 둘 다 필요할 때 HP09가 TP07 대신 고를 이유가 됩니다. 온풍 비용은 상품정보고시 기준 하루 8시간·30일에 가정용 197,000원이고, 같은 라벨 산정식으로 하루 1시간이면 약 24,600원입니다.',
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
      coreTechnology: '에어 멀티플라이어 송풍 + 온풍 + HEPA+탄소·포름알데히드 촉매 필터',
      filterType: 'H13 등급 글라스 HEPA+탄소 일체형 교체 필터 (965432-01) + 촉매 필터 (설명서상 교체 불필요)',
      capacity: '송풍·난방·청정 타워형 (높이 764mm)',
      dimensions: '205 x 764 x 130mm',
      // 4차(2026-10-09): 현행 상품정보고시에 무게 항목이 없어 techSpecs.weight에서 빼고
      // 조건을 붙인 extraSpecs로 옮겼다(verified-specs.ts의 weight 등재 해제는 조정자 요청).
      extraSpecs: [{ label: '무게', value: '5.7kg (2026-08-24 대조 기록 · 2026-10-08 상품정보고시에는 무게 항목 없음)' }],
    },

    // 2026-10-08 2차 교정: 27㎡·30cm·추천 평수와 'PTC 세라믹 히터'는 정확한 모델
    // 원문에서 확인되지 않아 제거했다(remaining-component-analysis.md, 한국어 HP09 설명서).
    // 3차: 적용 면적은 다이슨코리아 공단 공기청정기 신고(certi_view_121 no=288210259,
    // 모델명 HP09) 표준사용면적 13.3㎡·4등급. 같은 업체의 HP09 XX 신고(no=288230024)는 18.7㎡.
    // 13.3~18.7㎡(4.0~5.7평)가 모두 드는 '원룸(7평 이하)'만 추천 평수로 둔다.
    roomFit: {
      recommendedSize: ['원룸'],
      coverageArea: 13.3,
      installationType: '타워형 이동식',
      installationNote: '적용 면적은 다이슨코리아가 한국에너지공단에 신고한 공기청정기 모드 표준사용면적입니다(HP09 XX 신고는 18.7㎡).',
      // 멀티탭 전류(2,200W ≈ 10A)·커튼 거리 문장은 group9 '디자인·설치'와 같은 페이지에 두 번 나와 여기서 뺐다(2026-10-09).
    },

    targetUsers: {
      recommended: [
        '송풍·청정에 온풍까지 한 대로 쓰려는 사용자',
        '온풍 2,200W를 감당할 콘센트와 가연물에서 떨어진 자리를 마련할 수 있는 사용자',
        '새 가구·바닥재처럼 포름알데히드 발생원이 있는 작은 방에서 촉매 필터와 HCHO 표시를 쓰려는 가정',
      ],
      notRecommended: [
        '방 전체 난방 능력 시험값을 보고 주 난방기로 고르려는 사용자(공개 난방 면적·능력 미확인)',
        '작은 방보다 넓은 공간을 주 공기청정기로 맡기려는 경우(국내 신고 면적 기준)',
        '온풍·포름알데히드 촉매가 필요 없는 사용자(같은 필터를 쓰는 TP07이 더 낮은 가격)',
      ],
    },

    features: [
      '송풍·온풍·공기청정 결합 — 온풍은 설정 온도 도달 시 일시 정지',
      '외부 회전 날개가 보이지 않는 에어 멀티플라이어 송풍',
      'H13 등급 HEPA+탄소 교체 필터(965432-01) + 교체가 필요 없는 포름알데히드 촉매 필터',
      '온풍 정격 2,200W·목표 실내 온도 설정',
      '0~350° 회전 설정 + 다이슨 링크 앱·음성비서 제어',
    ],

    priceAnalysis: {
      msrp: 737290,
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
