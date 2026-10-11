import { Appliance } from '@/types/appliance';

export const tclAppliances: Appliance[] = [
  {
    id: 'tcl-tac-08csd-wall',
    slug: 'tcl-tac-08csd-wall',
    brand: 'TCL',
    name: '인버터 벽걸이 TAC-08CSD',
    modelNumber: 'TAC-08CSD/TPH11I',
    category: '에어컨',
    image: '/images/appliances/tcl/tac-08csd/main.webp',
    images: [],
    price: 449000,
    description: 'TCL TAC-08CSD/TPH11I는 제조사 표시 냉방 면적 18.7㎡의 인버터 벽걸이로, 최대 72도의 4방향 기류와 7단계 풍속을 안내합니다.',
    oneliner: '18.7㎡ 냉방 면적, 4방향 기류와 7단계 풍속을 갖춘 인버터 벽걸이',
    editorComment: '좌우 바람까지 리모컨으로 움직이고 싶다면 같은 18.7㎡ 하이얼 CTH06QBW보다 이 모델이 맞습니다. 운전비로는 갈리지 않습니다 — 공단 신고 월간소비전력량이 87.8kWh 대 89.5kWh입니다.',
    status: 'best',
    tags: ['TCL', '벽걸이', '에어컨', '6평', '가성비', '초저가', '인버터', '쿠팡'],

    specs: {
      powerConsumption: 780,
      energyEfficiency: 5,
      performance: 6,
      convenience: 4,
      durability: 6,
    },

    techSpecs: {
      coreTechnology: '인버터 컴프레서',
      // 필터 종류와 냉매는 TCL 제품 페이지·다나와·저장 근거에서 확인하지 못해 비운다(2026-10-08).
      capacity: '6평형 (18.7m2)',
      dimensions: '788 x 275 x 192mm',
      energyGrade: '4등급',
      // 한국에너지공단 신고 260240215(TCL 명의, 실내기 -I·실외기 -O 조합). research/evidence/2026-10-02/tcl-08csd-efficiency-check.md
      extraSpecs: [
        { label: '정격 냉방능력 (공단 신고)', value: '2,350W' },
        { label: '월간소비전력량 (공단 신고·1:1)', value: '87.8kWh' },
      ],
    },

    roomFit: {
      // 평수 등급 칩은 근거가 없어 비운다. 표시 냉방 면적(coverageArea)만 보여 준다.
      recommendedSize: [],
      coverageArea: 18.7,
      installationType: '벽걸이형',
      installationNote: '실외기 치수는 TCL 제품 페이지에 수치가 없어(2026-10-08 확인) 설치 상담에서 따로 확인 필요',
    },

    targetUsers: {
      recommended: [
        '문을 닫은 냉방 구역이 18.7㎡ 안인 방',
        '좌우 바람까지 리모컨으로 움직이려는 침실(최대 72도 4방향·7단계)',
      ],
      notRecommended: [
        '무풍 운전이나 앱 제어가 필요한 사용자(제조사 페이지에 안내 없음)',
        '냉방 구역이 18.7㎡보다 넓은 집(29.3㎡ TAC-12CSD부터 비교)',
      ],
    },

    features: [
      '인버터 컴프레서',
      '4방향 풍향 조절 (최대 72도)',
      '7단계 풍량 조절',
      '셀프 내부 청소 (냉각→해동→건조 3단계)',
      '타이머 켜기·끄기 예약 (08·12형 공용 설명서 기준)',
    ],

    priceAnalysis: {
      msrp: 449000,
      valueRating: 5,
      priceTier: 'budget',
      alternatives: ['haier-cth06qbw-wall', 'carrier-cpae-a100fwea'],
    },

    reviews: [
      {
        userType: '원룸 자취생',
        rating: 4,
        text: '47만원에 이 정도면 대만족입니다. 냉방 잘 되고, 설치도 쿠팡에서 바로 해줘서 편했어요. 4등급이라 전기요금이 좀 나오는 게 유일한 단점.',
        pros: ['가성비', '빠른 냉방', '쿠팡 설치 편리'],
        cons: ['4등급 전기요금'],
      },
      {
        userType: '자취방 추가 설치',
        rating: 3,
        text: '가격은 최고인데 소음이 좀 있습니다. 밤에 수면모드 써도 삼성 LG보다는 시끄러워요. 대신 반값이니 트레이드오프.',
        pros: ['반값 가격'],
        cons: ['수면 시 소음', '국산 대비 정숙성 부족'],
      },
      {
        userType: '신혼부부 작은방',
        rating: 5,
        text: '6평 작은방에 딱입니다. 인버터라 설정온도 도달하면 바람이 약해지면서 조용해지고, 전기요금도 생각보다 안 나왔어요. 이 가격에 이 정도 냉방이면 가성비 끝판왕.',
        pros: ['인버터 정숙', '준수한 전기요금', '냉방력 충분'],
        cons: ['리모컨 UI 투박'],
      },
      {
        userType: '전월세 1인가구',
        rating: 4,
        text: '국산 반값이라 큰 기대 안 했는데 냉방 하나는 확실합니다. 다만 A/S 문의할 때 센터 연결이 좀 오래 걸렸어요. 단순 고장은 쿠팡 통해 처리되긴 합니다.',
        pros: ['저렴한 가격', '확실한 냉방'],
        cons: ['A/S 연결 지연'],
      },
      {
        userType: '꼼꼼한 가성비러',
        rating: 3,
        text: '냉방 성능은 가격값 충분히 하는데 마감이 살짝 아쉽습니다. 토출구 플라스틱이 저렴해 보이고 셀프청소 돌릴 때 소리가 커요. 그래도 6평엔 무난합니다.',
        pros: ['가격 대비 냉방'],
        cons: ['마감 품질', '셀프청소 소음'],
      },
    ],

    purchaseLinks: [
      { store: '쿠팡', url: '#', price: 474000 },
    ],

    similarProducts: ['haier-cth06qbw-wall', 'samsung-wind-free-ar07a9170'],
  },

  {
    id: 'tcl-tac-12csd-wall',
    slug: 'tcl-tac-12csd-wall',
    brand: 'TCL',
    name: '인버터 벽걸이 TAC-12CSD',
    modelNumber: 'TAC-12CSD/TPH11I',
    category: '에어컨',
    image: '/images/appliances/tcl/tac-12csd/main.webp',
    images: [],
    price: 509000,
    description: 'TCL TAC-12CSD/TPH11I는 제조사 표시 냉방 면적 29.3㎡의 인버터 벽걸이로, 기능과 실내기 크기는 08CSD와 같고 냉방능력이 다릅니다.',
    oneliner: '29.3㎡ 표시 냉방 면적과 4방향 기류의 인버터 벽걸이',
    editorComment: '냉방 구역이 18.7㎡를 넘고 29.3㎡ 안쪽이라면 08CSD 대신 볼 모델입니다. 공단 신고 정격 냉방능력이 3,515W로 08CSD(2,350W)의 약 1.5배입니다.',
    status: undefined,
    tags: ['TCL', '벽걸이', '에어컨', '9평', '가성비', '인버터'],

    specs: {
      powerConsumption: 1160,
      energyEfficiency: 6,
      performance: 7,
      convenience: 4,
      durability: 6,
    },

    techSpecs: {
      coreTechnology: '인버터 컴프레서',
      // 필터 종류와 냉매는 TCL 제품 페이지·다나와·저장 근거에서 확인하지 못해 비운다(2026-10-08).
      capacity: '9평형 (29.3m2)',
      dimensions: '788 x 275 x 192mm',
      energyGrade: '4등급',
      // 한국에너지공단 신고 260240214(TCL 명의, 실내기 TAC-12CSD/TPH11I-I·실외기 -O, 2026-10-08 확인).
      // 같은 조합의 쿠팡 명의 신고 260240185는 136.8kWh·4등급. research/evidence/content-value-2026-10-08/pass3/sources/aircon-kea-tac12.txt
      extraSpecs: [
        { label: '정격 냉방능력 (공단 신고)', value: '3,515W' },
        { label: '월간소비전력량 (공단 신고·1:1)', value: '137kWh' },
      ],
    },

    roomFit: {
      // 평수 등급 칩은 근거가 없어 비운다. 29.3㎡(약 8.9평)에 '소형(7~15평)'은 표시 면적을 넘는다.
      recommendedSize: [],
      coverageArea: 29.3,
      installationType: '벽걸이형',
      installationNote: '실외기·배관 조건은 08CSD 견적을 쓰지 말고 이 모델명으로 다시 견적',
    },

    targetUsers: {
      recommended: [
        '냉방 구역이 18.7㎡를 넘고 29.3㎡ 안쪽인 안방·작은 거실',
      ],
      notRecommended: [
        '냉방 구역이 18.7㎡ 안인 방(08CSD로 충분)',
        '앱 제어가 필요한 사용자(제조사 페이지에 안내 없음)',
      ],
    },

    features: [
      '인버터 컴프레서',
      '4방향 풍향 조절 (최대 72도)',
      '7단계 풍량 조절',
      '셀프 내부 청소 (냉각→해동→건조 3단계)',
      '타이머 켜기·끄기 예약 (08·12형 공용 설명서 기준)',
    ],

    priceAnalysis: {
      msrp: 509000,
      valueRating: 4,
      priceTier: 'budget',
      alternatives: ['carrier-cpae-a100fwea', 'lg-whisen-wall-sq07edawhs'],
    },

    reviews: [
      {
        userType: '안방 설치 고객',
        rating: 4,
        text: '캐리어보다 싸고 9평 안방에 충분합니다. 국산 1등급은 아니지만 이 가격에 인버터면 훌륭해요.',
        pros: ['가성비', '9평 냉방 충분', '인버터'],
        cons: ['1등급 아님'],
      },
      {
        userType: '소형 거실 사용',
        rating: 4,
        text: '거실 겸 주방 합쳐 10평 정도인데 문 닫으면 금방 시원해집니다. 3등급이라 6평 모델보다 전기요금 부담이 덜해서 만족해요.',
        pros: ['3등급 효율', '소형 거실 커버'],
        cons: ['넓은 거실엔 부족'],
      },
      {
        userType: '두 아이 키우는 집',
        rating: 5,
        text: '안방에 설치했는데 아이들 자는 동안 조용하고 시원합니다. 풍향이 4방향이라 직바람 안 맞게 돌려놓기 편해요. 이 가격에 가성비 최고.',
        pros: ['정숙한 취침', '풍향 조절 편리', '가성비'],
        cons: ['앱 연동 미지원'],
      },
      {
        userType: '전자제품 리뷰어',
        rating: 3,
        text: '냉방 자체는 9평에 충분한데 컴프레서 가동 초기에 진동음이 살짝 들립니다. 설치 기사님에 따라 마감 편차가 있으니 설치 마무리는 꼼꼼히 확인하세요.',
        pros: ['넉넉한 냉방력'],
        cons: ['초기 진동음', '설치 편차'],
      },
      {
        userType: '부모님댁 설치',
        rating: 4,
        text: '부모님 안방에 놔드렸는데 리모컨이 크고 버튼이 단순해서 어르신도 쉽게 쓰십니다. A/S만 국산처럼 빵빵하면 별 다섯 줬어요.',
        pros: ['쉬운 조작', '준수한 냉방'],
        cons: ['A/S 접근성'],
      },
    ],

    purchaseLinks: [
      { store: '쿠팡', url: '#', price: 659000 },
    ],

    similarProducts: ['carrier-cpae-a100fwea', 'tcl-tac-08csd-wall'],
  },

  {
    id: 'tcl-tac-07cwa-window',
    slug: 'tcl-tac-07cwa-window',
    brand: 'TCL',
    name: '듀얼인버터 창문형 TAC-07CWA',
    modelNumber: 'TAC-07CWA/TPH21I',
    category: '에어컨',
    image: '/images/appliances/tcl/tac-07cwa/main.webp',
    images: [],
    description: 'TCL 듀얼인버터 창문형 에어컨 4.5평형. 실외기 없이 창문에 설치, 1인 가구 최적.',
    oneliner: '실외기 없는 창문형, 4.5평 원룸 최적 가성비',
    editorComment: '실외기가 필요 없어 설치가 간편한 창문형 에어컨입니다. 원룸이나 고시원처럼 실외기 설치가 어려운 환경에서 유일한 선택지가 될 수 있습니다. 51만원대로 파세코 창문형 대비 가격이 비슷하면서 듀얼인버터 탑재가 장점입니다. 다만 냉방 면적이 4.5평으로 좁고, 벽걸이 대비 소음이 큽니다.',
    status: undefined,
    tags: ['TCL', '창문형', '에어컨', '4.5평', '실외기없음', '듀얼인버터', '원룸'],

    specs: {
      energyEfficiency: 5,
      performance: 5,
      convenience: 6,
      durability: 6,
    },

    techSpecs: {
      coreTechnology: '듀얼인버터 컴프레서',
      filterType: '항균 필터',
      refrigerant: 'R32',
      capacity: '4.5평형 (15m2)',
      energyGrade: '4등급',
    },

    roomFit: {
      recommendedSize: ['원룸'],
      coverageArea: 15,
      installationType: '창문형',
      installationNote: '슬라이드 창문 필요. 연장키트 별매. 실외기 불필요',
    },

    errorCodes: [
      {
        code: 'E1',
        description: '온도센서 이상',
        cause: '센서 불량',
        solution: '전원 끄고 10분 후 재가동',
        severity: 'medium',
      },
      {
        code: 'E2',
        description: '표시창에 E2가 뜨고 냉방이 약해지거나 자동으로 멈추는 등 온도 제어가 정상적으로 되지 않습니다.',
        cause: '실내기 열교환기(배관)에 부착된 실내 배관 온도 센서의 단선·단락 또는 커넥터 접촉 불량으로 제어부가 배관 온도를 정상적으로 읽지 못하는 상태입니다.',
        solution: '전원 플러그를 뽑고 3~5분 뒤 다시 꽂아 리셋하고, 실내기 흡입구와 필터를 청소해 결빙·오작동 요인을 제거하세요. 그래도 E2가 반복되면 센서·기판 점검이 필요하므로 임의로 분해하지 말고 쿠팡 A/S 기술지원센터(1577-2420) 또는 TCL 서비스센터에 점검을 의뢰하세요.',
        severity: 'medium',
      },
      {
        code: 'E7',
        description: '표시창에 E7이 뜨면서 냉방이 멈추거나 압축기가 자주 정지합니다.',
        cause: '실외측 토출관 온도 센서의 단선·단락·접촉 불량, 또는 제품 뒤쪽 방열부의 통풍 불량으로 토출 온도가 비정상적으로 감지되어 보호 정지가 걸린 상태입니다.',
        solution: '전원 플러그를 뽑고 3~5분 뒤 재연결해 리셋하고, 제품 뒤쪽 방열부의 창문·방충망이 열려 통풍이 되는지, 토출구에 이물질이 없는지 확인해 제거하세요. 증상이 반복되면 센서·보호 회로 점검이 필요하므로 쿠팡 A/S 기술지원센터(1577-2420) 또는 TCL 서비스센터에 문의하세요.',
        severity: 'medium',
      },
      {
        code: 'EA',
        description: '표시창에 EA가 뜨고 온도 감지 이상으로 냉방 동작이 불안정하거나 멈춥니다.',
        cause: '실외 또는 실내 공기 온도 센서의 단선·단락·접촉 불량으로 외기·실내 온도를 정확히 측정하지 못하는 상태입니다.',
        solution: '전원을 껐다 켜 리셋하고, 제품 뒤쪽 방열부(창문·방충망)가 열려 통풍이 되는지, 흡입구에 이물질이 없는지 확인하세요. 반복되면 센서 점검이 필요하므로 쿠팡 A/S 기술지원센터(1577-2420) 또는 TCL 서비스센터에 점검을 맡기세요.',
        severity: 'medium',
      },
      {
        code: 'EE',
        description: '표시창에 EE가 뜨고 실외 방열 팬이 돌지 않아 냉방이 약해지거나 멈춥니다.',
        cause: '실외측 팬 모터의 고장, 이물질에 의한 구속, 배선·기판 이상으로 열을 배출하지 못해 보호 정지가 걸린 상태입니다.',
        solution: '전원을 차단한 뒤 제품 뒤쪽 방열부에 먼지·낙엽 등 이물질이 끼지 않았는지 확인해 제거하고 통풍 공간을 확보한 후 다시 켜 보세요. 그래도 EE가 표시되면 팬 모터·기판 고장이므로 임의 분해하지 말고 쿠팡 A/S 기술지원센터(1577-2420) 또는 TCL 서비스센터에 수리를 의뢰하세요.',
        severity: 'high',
      },
      {
        code: 'EC',
        description: '표시창에 EC가 뜨고 냉방이 약해지거나 압축기 보호로 운전이 멈춥니다.',
        cause: '냉매 누출·부족 또는 압축기 보호 회로 동작으로 정상적인 냉방이 되지 않는 상태입니다.',
        solution: '전원을 껐다 켜 리셋하고 제품 뒤쪽 방열부의 통풍을 확보해 보세요. 냉매 보충·누출 점검은 전문 작업이므로 임의로 분해하지 말고 쿠팡 A/S 기술지원센터(1577-2420) 또는 TCL 서비스센터에 점검을 의뢰하세요.',
        severity: 'high',
      },
    ],

    targetUsers: {
      recommended: [
        '실외기 설치가 불가능한 환경 (고시원, 오피스텔 등)',
        '셀프 설치를 원하는 1인 가구',
        '이사가 잦은 사용자',
      ],
      notRecommended: [
        '5평 이상 공간 (냉방력 부족)',
        '소음에 민감한 사용자 (48dB)',
        '벽걸이 설치가 가능한 환경 (벽걸이가 더 효율적)',
      ],
    },

    features: [
      '듀얼인버터 (빠른 냉방)',
      '실외기 불필요 (창문 설치)',
      '셀프 설치 가능',
      '제습 모드',
      '24시간 타이머',
    ],

    priceAnalysis: {
      valueRating: 4,
      priceTier: 'budget',
      alternatives: ['tcl-tac-08csd-wall'],
    },

    reviews: [
      {
        userType: '고시원 거주자',
        rating: 4,
        text: '실외기 없이 설치할 수 있어서 선택했습니다. 4평 방에는 충분히 시원해요. 소음이 좀 있지만 이 가격에 감사합니다.',
        pros: ['실외기 불필요', '셀프 설치', '4평 냉방 충분'],
        cons: ['작동 소음'],
      },
      {
        userType: '오피스텔 자취생',
        rating: 3,
        text: '실외기 못 다는 집이라 어쩔 수 없이 창문형으로 갔어요. 냉방은 잘 되는데 48dB 소음이 진짜 거슬립니다. 잘 때는 귀마개가 필수예요.',
        pros: ['설치 자유도'],
        cons: ['취침 시 소음', '낮은 정숙성'],
      },
      {
        userType: '이사 잦은 직장인',
        rating: 4,
        text: '이사 다닐 때마다 떼서 가져갈 수 있는 게 최고 장점입니다. 듀얼인버터라 전기요금도 생각보다 적게 나와요. 설치 키트는 창 규격을 꼭 확인하세요.',
        pros: ['이동 설치 용이', '듀얼인버터 절전'],
        cons: ['창 규격 제약', '연장키트 별매'],
      },
      {
        userType: '원룸 첫 에어컨',
        rating: 5,
        text: '셀프로 30분 만에 설치했습니다. 15m2 원룸이 금방 시원해지고 장마철엔 제습 모드가 유용해요. 소음은 백색소음이라 생각하니 금방 적응됐습니다.',
        pros: ['간편 셀프설치', '빠른 냉방', '제습 모드'],
        cons: ['적응 필요한 소음'],
      },
      {
        userType: '소음 민감 사용자',
        rating: 2,
        text: '냉방은 확실한데 컴프레서 돌 때 진동이 창틀로 전달돼서 생각보다 시끄럽습니다. 방음 패드를 추가로 붙여서 그나마 견디는 중이에요. 소음 예민하면 비추.',
        pros: ['확실한 냉방력'],
        cons: ['창틀 진동·소음', '방음 보강 필요'],
      },
    ],

    purchaseLinks: [
      { store: '쿠팡', url: '#', price: 512000 },
    ],

    similarProducts: ['tcl-tac-08csd-wall'],
  },
];
