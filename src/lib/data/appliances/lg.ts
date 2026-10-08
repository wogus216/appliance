import { Appliance } from '@/types/appliance';

export const lgAppliances: Appliance[] = [
  {
    id: 'lg-whisen-obje-fq25sdwhs',
    slug: 'lg-whisen-obje-fq25sdwhs',
    brand: 'LG',
    name: '휘센 오브제컬렉션 FQ25SDWHS',
    modelNumber: 'FQ25SDWHS',
    category: '에어컨',
    image: '/images/appliances/lg/fq25sdwhs/main.webp',
    images: [],
    description: 'LG 휘센 오브제컬렉션 스탠드 에어컨. 듀얼 인버터 + AI 쾌적 엔진으로 빠른 냉방과 절전을 동시에.',
    oneliner: '듀얼 인버터 + AI 쾌적, 25평 프리미엄 스탠드 에어컨',
    editorComment: 'LG 에어컨 라인업의 플래그십입니다. 듀얼 인버터 컴프레서가 빠른 냉방과 저소음을 동시에 잡고, AI가 외부 온도·습도까지 분석해 최적 운전합니다. 삼성 윈드프리와 가격대가 비슷한데, LG는 냉방 속도가 빠른 대신 삼성은 무풍이 장점입니다. 바람이 괜찮다면 LG, 바람이 싫다면 삼성으로 갈리는 선택입니다.',
    status: 'featured',
    tags: ['LG', '휘센', '오브제컬렉션', '스탠드', '에어컨', '25평', '듀얼인버터', '1등급'],

    specs: {
      energyEfficiency: 9,
      performance: 10,
      convenience: 9,
      durability: 9,
    },

    techSpecs: {
      coreTechnology: '듀얼 인버터 컴프레서 + AI 쾌적 엔진',
      filterType: '플라즈마 이오나이저 + 극세 필터',
      refrigerant: 'R32',
      capacity: '25평형 (83.6m2)',
      energyGrade: '1등급',
    },

    roomFit: {
      recommendedSize: ['대형'],
      coverageArea: 83.6,
      installationType: '스탠드형',
      installationNote: '실외기 설치 공간 필요. 오브제 패널 색상 선택 가능.',
    },

    errorCodes: [
      {
        code: 'CH 01',
        description: '실내기 온도센서 이상',
        cause: '온도센서 단선 또는 접촉 불량',
        solution: '전원 끄고 10분 후 재가동. 반복 시 서비스센터 연락 (1544-7777)',
        severity: 'medium',
      },
      {
        code: 'CH 05',
        description: '실내기와 실외기 사이의 통신에 이상이 생겨 운전이 멈춤.',
        cause: 'LG전자 안내는 실내외기 회로 기판 문제, 두 기기를 연결하는 통신선 손상·눌림, 전원 불안정을 원인으로 든다. 온도센서 문제가 아니다.',
        solution: '에어컨 전용 차단기를 5분간 내렸다가 다시 올려 코드가 사라지는지 확인한다. 눈에 보이는 통신선이 눌리거나 상한 곳이 없는지만 살피고, 배선을 직접 만지거나 실외기를 분해하지는 않는다. 반복되면 LG전자 서비스센터(1544-7777)에 점검을 의뢰한다.',
        severity: 'medium',
      },
      {
        code: 'CH 10',
        description: '실내기 팬이 돌지 않아(구속) 운전이 멈춤.',
        cause: 'LG전자 안내는 실내기 팬 구동부에 이물질이나 눈이 쌓인 경우, 또는 팬 모터 불량을 원인으로 든다(실외기 팬 구속은 CH 67). 컴프레서 과전류는 CH 22로 따로 있다.',
        solution: '전원을 차단한 상태에서 실내기 팬 주변에 이물질이 끼지 않았는지 확인하고 제거한다. 환경적으로 이상이 없는데도 팬이 돌지 않으면 모터 불량이므로 LG전자 서비스센터(1544-7777)에 접수한다.',
        severity: 'high',
      },
      {
        code: 'CH 21',
        description: '실외기 인버터 계통이 보호 동작으로 운전을 멈춤.',
        // LG 공식 페이지에서 이 코드의 정의를 확인하지 못했다. 2차 자료는 인버터
        // 전력모듈(IPM) 이상으로 설명하지만 1차 소스가 아니라 단정하지 않는다.
        // 같은 브랜드의 CH 22(컴프레서 과전류) 설명과 구분되는 코드라는 점만 확실하다.
        cause: '저희는 이 코드의 정의를 LG전자 공식 자료에서 확인하지 못했습니다. 실외기 인버터 계통의 보호 정지라는 것까지만 확인했고, 그 이상은 단정하지 않습니다.',
        solution: '실외 측 차단기를 내렸다가 몇 분 뒤 다시 올려 일시 오류인지 확인한다. 반복되면 실외기 내부 부품 문제일 가능성이 크고 사용자가 손댈 수 있는 범위가 아니므로, 임의 분해하지 말고 LG전자 서비스센터(1544-7777)에 점검을 의뢰한다.',
        severity: 'high',
      },
      {
        code: 'CH 02',
        description: '실내기 열교환기(파이프) 온도센서 신호 이상으로 냉·난방 능력이 약해지거나 보호를 위해 운전이 멈춤.',
        cause: '실내기 열교환기 온도센서의 단선·단락, 커넥터 접촉 불량, 센서 노후가 주원인이다. 습기·먼지로 인한 접점 불량도 영향을 준다.',
        solution: '전원을 2~3분간 차단했다가 재가동해 일시적 오류인지 먼저 확인한다. 동일 코드가 반복되면 센서·기판 점검이 필요하므로 임의 분해하지 말고 LG전자 서비스센터(1544-7777)에 점검을 의뢰한다.',
        severity: 'medium',
      },
      {
        code: 'CH 22',
        description: '실외기 컴프레서에 과전류(전류 과다)가 감지되어 보호를 위해 운전을 멈춤.',
        cause: '실외기 통풍 불량(먼지·이물질로 막힘), 주변 고온, 냉매 과충전 또는 부족, 입력 전압 불안정, 컴프레서 부하 과다 등이 원인이 된다. 실외기 인버터 계통 보호 정지(CH 21)와 달리 운전 전류 자체가 과도한 경우다.',
        solution: '실외기 주변과 통풍구의 이물질을 치우고 그늘·통풍을 확보한 뒤 전원을 재투입한다. 그래도 반복되면 냉매량·컴프레서 점검이 필요하므로 LG전자 서비스센터(1544-7777)에 의뢰한다.',
        severity: 'high',
      },
      {
        code: 'CH 44',
        description: '실외 공기(외기) 온도센서 신호 이상으로 운전 제어가 비정상이 됨.',
        cause: '실외기 외기 온도센서의 단선·단락, 커넥터 접촉 불량, 빗물 침수나 부식이 주원인이다.',
        solution: '전원을 재투입해 일시 오류인지 확인한다. 반복되면 실외기 센서 교체가 필요한 경우가 많으니 실외기를 임의로 분해하지 말고 LG전자 서비스센터(1544-7777)에 점검을 요청한다.',
        severity: 'medium',
      },
      {
        code: 'CH 67',
        description: '실외기 팬이 돌지 않아(구속·락) 냉방 능력이 떨어지거나 보호를 위해 운전을 멈춤.',
        cause: '팬 날개에 낙엽·비닐 등 이물질이나 결빙이 끼임, 팬 모터 고장, 모터 배선·커넥터 불량이 원인이다.',
        solution: '전원을 차단한 상태에서 실외기 팬 주변의 이물질을 제거하고 재가동한다. 팬이 여전히 돌지 않으면 모터 고장일 수 있으므로 LG전자 서비스센터(1544-7777)에 의뢰한다.',
        severity: 'high',
      },
    ],

    targetUsers: {
      recommended: [
        '25평 이상 거실 냉방이 필요한 가정',
        '빠른 냉방 속도를 원하는 사용자',
        '오브제컬렉션으로 인테리어 통일을 원하는 가정',
        '전기요금 절약이 중요한 가정',
      ],
      notRecommended: [
        '직접 바람을 싫어하는 사용자 (삼성 윈드프리 추천)',
        '소형 평수 사용자 (오버스펙)',
        '예산 200만원 이하',
      ],
    },

    features: [
      '듀얼 인버터 컴프레서 (빠른 냉방 + 저소음)',
      'AI 쾌적 엔진 (외부 온도/습도 자동 분석)',
      '플라즈마 이오나이저 공기청정',
      'ThinQ 앱 원격 제어',
      '오브제컬렉션 패널 (인테리어 컬러 매칭)',
    ],

    priceAnalysis: {
      valueRating: 4,
      priceTier: 'premium',
      alternatives: ['samsung-bespoke-wind-free-af25a9970'],
    },

    reviews: [
      {
        userType: '32평 아파트 거주자',
        rating: 5,
        text: '냉방 속도가 확실히 빠릅니다. 귀가 후 10분이면 거실이 시원해져요. 오브제 디자인도 거실 인테리어와 잘 어울립니다.',
        pros: ['빠른 냉방', '인테리어', '저소음'],
        cons: ['높은 가격'],
      },
      {
        userType: '가전 블로거',
        rating: 4,
        text: '성능은 최상급이지만 삼성 윈드프리처럼 완전한 무풍은 아닙니다. 바람에 민감하면 삼성, 냉방 속도 우선이면 LG 선택하세요.',
        pros: ['냉방 성능', 'AI 절전'],
        cons: ['무풍 아님'],
      },
      {
        userType: '신혼 30평대 거주자',
        rating: 5,
        text: 'AI 쾌적 모드 켜두면 알아서 온도·습도 맞춰줘서 한여름에도 전기요금이 생각보다 안 나옵니다. 설치도 깔끔하게 잘 해주셨어요.',
        pros: ['전기요금 절약', 'AI 자동운전'],
        cons: ['실외기 자리'],
      },
      {
        userType: '바람 민감한 사용자',
        rating: 3,
        text: '냉방력은 좋은데 직바람이 좀 셉니다. 풍향을 위로 돌려도 무풍 에어컨만큼 부드럽진 않아서, 찬바람 싫어하면 고민해보세요.',
        pros: ['강한 냉방'],
        cons: ['직바람', '바람 셈'],
      },
      {
        userType: '40평 거실 사용자',
        rating: 4,
        text: '거실이 넓은데도 금방 시원해집니다. 다만 가격이 만만찮고 실외기 설치비까지 생각하면 부담은 있어요. 성능 자체는 불만 없습니다.',
        pros: ['넓은 면적', '빠른 냉방'],
        cons: ['설치비 부담'],
      },
    ],

    purchaseLinks: [
      { store: 'LG전자 공식', url: '#', price: 2790000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 2390000 },
    ],

    similarProducts: ['samsung-bespoke-wind-free-af25a9970'],
  },

  // === LG 에어컨 벽걸이 ===
  {
    id: 'lg-whisen-wall-sq07edawhs',
    slug: 'lg-whisen-wall-sq07edawhs',
    brand: 'LG',
    name: '휘센 벽걸이 SQ07EDAWHS',
    modelNumber: 'SQ07EDAWHS',
    category: '에어컨',
    image: '/images/appliances/lg/sq07edawhs/main.webp',
    images: [],
    description: 'LG 휘센 벽걸이 에어컨. 듀얼 인버터로 저소음·고효율, 원룸~소형 평수 최적.',
    oneliner: '듀얼 인버터 저소음, 7평형 가성비 벽걸이',
    editorComment: 'LG 벽걸이 에어컨 중 가성비 모델입니다. 듀얼 인버터 컴프레서로 소음이 21dB까지 낮아지고, 1등급 효율로 전기요금 부담도 적습니다. 삼성 벽걸이 대비 무풍 기능은 없지만, 소음과 냉방 속도에서 앞섭니다.',
    status: 'best',
    tags: ['LG', '휘센', '벽걸이', '에어컨', '7평', '듀얼인버터', '가성비', '1등급'],

    specs: {
      energyEfficiency: 9,
      performance: 7,
      convenience: 7,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '듀얼 인버터 컴프레서',
      filterType: '플라즈마 필터',
      refrigerant: 'R32',
      capacity: '7평형 (23.1m2)',
      energyGrade: '1등급',
    },

    roomFit: {
      recommendedSize: ['원룸', '소형'],
      coverageArea: 23.1,
      installationType: '벽걸이형',
      installationNote: '벽면 고정 브래킷 + 실외기 필요',
    },

    errorCodes: [
      {
        code: 'CH 01',
        description: '실내기 온도센서 이상',
        cause: '온도센서 단선 또는 접촉 불량',
        solution: '전원 끄고 10분 후 재가동. 반복 시 서비스센터 연락 (1544-7777)',
        severity: 'medium',
      },
      {
        code: 'CH 02',
        description: '실내기 열교환기 입구측 배관 온도 센서 이상으로 냉·난방 운전이 제한됨.',
        cause: '실내 열교환기 입구 배관 온도 센서(서미스터)의 단선·단락 또는 센서 커넥터 접촉 불량.',
        solution: '전원(차단기)을 2~3분간 내렸다가 다시 올려 재가동해 본다. 증상이 반복되면 센서·커넥터 점검이 필요하므로 LG전자 서비스센터(1544-7777)에 점검을 요청한다.',
        severity: 'medium',
      },
      {
        code: 'CH 05',
        description: '실내기와 실외기 사이 통신이 끊겨 실외기가 동작하지 않고 운전이 멈춤.',
        cause: '실내기-실외기 연결 배선의 단선·오결선·접촉 불량, 통신선 노이즈, 또는 실외기 기판 이상.',
        solution: '차단기를 내렸다가 약 3분 후 다시 올려 재기동해 본다. 그래도 통신 에러가 계속되면 배선·기판 점검이 필요하니 LG전자 서비스센터(1544-7777)에 의뢰한다.',
        severity: 'high',
      },
      {
        code: 'CH 06',
        description: '실내기 열교환기 출구측 배관 온도 센서 이상으로 냉·난방 운전이 제한됨.',
        cause: '실내 열교환기 출구 배관 온도 센서(서미스터)의 단선·단락 또는 커넥터 접촉 불량.',
        solution: '전원(차단기)을 2~3분간 내렸다가 다시 올려 재가동해 본다. 반복되면 센서·커넥터 점검이 필요하므로 LG전자 서비스센터(1544-7777)에 점검을 받는다.',
        severity: 'medium',
      },
      {
        code: 'CH 10',
        description: '실내기 팬(BLDC) 모터가 회전하지 않거나 회전 신호가 감지되지 않아 정지함.',
        cause: '팬 모터 구속(이물질·먼지 끼임), 모터 커넥터 접촉 불량, 모터 또는 기판 고장.',
        solution: '전원을 끄고 송풍구 주변 이물질을 확인한 뒤 재가동한다. 팬이 돌지 않거나 에러가 반복되면 모터 교체가 필요할 수 있으니 LG전자 서비스센터(1544-7777)에 문의한다.',
        severity: 'high',
      },
      {
        code: 'CH 21',
        description: '인버터 컴프레서에 과전류가 감지되어 실외기가 보호 정지함.',
        cause: '컴프레서 과부하, 냉매 과충전·부족, 실외기 방열 불량(먼지·통풍 막힘), 전원 전압 이상.',
        solution: '실외기 주변의 통풍을 막는 물건과 먼지를 제거하고 전원을 재투입한다. 자주 반복되면 컴프레서·인버터 기판 점검이 필요하므로 LG전자 서비스센터(1544-7777)에 점검을 요청한다.',
        severity: 'high',
      },
      {
        code: 'CH 67',
        description: '실외기 팬 모터가 정상 회전하지 않아 실외기가 정지함.',
        cause: '실외기 팬 구속(낙엽·이물질), 팬 모터 커넥터 불량, 모터 또는 기판 고장.',
        solution: '전원 차단 후 실외기 팬 주변의 이물질을 제거하고 재가동한다. 팬이 돌지 않거나 증상이 반복되면 LG전자 서비스센터(1544-7777)에 점검을 의뢰한다.',
        severity: 'high',
      },
    ],

    targetUsers: {
      recommended: [
        '원룸/오피스텔 거주자',
        '소음에 민감한 사용자',
        '가성비 벽걸이를 찾는 사용자',
      ],
      notRecommended: [
        '15평 이상 거실 (냉방력 부족)',
        '무풍 기능을 원하는 사용자 (삼성 윈드프리 추천)',
      ],
    },

    features: [
      '듀얼 인버터 (최저 21dB 저소음)',
      '1등급 에너지효율',
      '인공지능 스마트 케어',
      'ThinQ 앱 원격 제어',
    ],

    priceAnalysis: {
      valueRating: 5,
      priceTier: 'mid',
      alternatives: ['samsung-wind-free-ar07a9170'],
    },

    reviews: [
      {
        userType: '원룸 거주자',
        rating: 5,
        text: '소음이 정말 조용합니다. 밤에 틀어놓고 자도 전혀 안 시끄러워요. 전기요금도 만원대로 부담 없습니다.',
        pros: ['저소음', '저렴한 전기요금'],
        cons: ['약한 냉방력'],
      },
      {
        userType: '오피스텔 자취생',
        rating: 5,
        text: '7평형이라 작은 방엔 딱입니다. 듀얼 인버터라 한 번 시원해지면 그 온도를 조용히 유지해줘서 좋아요. 가성비 최고.',
        pros: ['가성비', '저소음'],
        cons: ['소형 전용'],
      },
      {
        userType: '신혼 거실 사용자',
        rating: 3,
        text: '방에는 충분한데 거실에 달았더니 한여름엔 냉방이 좀 달립니다. 7평형은 딱 작은 방용으로 보는 게 맞아요.',
        pros: ['조용함'],
        cons: ['거실엔 부족', '냉방력 약함'],
      },
      {
        userType: '전기요금 신경 쓰는 1인 가구',
        rating: 4,
        text: '1등급이라 한 달 내내 켜도 요금 부담이 적습니다. 무풍 기능은 없지만 이 가격에 이 정도면 만족해요.',
        pros: ['1등급 효율', '저렴'],
        cons: ['무풍 없음'],
      },
    ],

    purchaseLinks: [
      { store: 'LG전자 공식', url: '#', price: 850000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 690000 },
    ],

    similarProducts: ['samsung-wind-free-ar07a9170'],
  },

  // === 제습기 ===
  {
    id: 'lg-puricare-dehumidifier-dq16sdwhs',
    slug: 'lg-puricare-dehumidifier-dq16sdwhs',
    brand: 'LG',
    name: '퓨리케어 제습기 DQ16SDWHS',
    modelNumber: 'DQ16SDWHS',
    category: '제습기',
    image: '/images/appliances/lg/dq16sdwhs/main.webp',
    images: [],
    description: 'LG 퓨리케어 오브제컬렉션 제습기. 16L/일 대용량 + 2in1 공기청정 기능 탑재.',
    oneliner: '16L 제습 + 공기청정 2in1, 오브제컬렉션 디자인',
    editorComment: '제습기와 공기청정기를 하나로 합친 2in1 모델입니다. 제습력 16L/일로 장마철 확실하고, HEPA 필터로 미세먼지 제거까지 가능합니다. 삼성 대비 공기청정 기능이 추가된 대신 가격이 5만원 정도 높습니다.',
    status: 'featured',
    tags: ['LG', '퓨리케어', '제습기', '16L', '공기청정', '오브제', '2in1'],

    specs: {
      energyEfficiency: 8,
      performance: 9,
      convenience: 9,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '콤프레서 제습 + HEPA 공기청정',
      filterType: '360도 HEPA 필터',
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
        code: 'FL',
        description: '물통 만수',
        cause: '물통이 가득 참',
        solution: '물통을 비우거나 연속배수 호스를 연결하세요',
        severity: 'low',
      },
      {
        code: 'CH',
        description: '자동 제상 동작',
        cause: '저온 환경 제상',
        solution: '실내온도를 18도 이상으로 올린 뒤 재가동하세요',
        severity: 'low',
      },
      {
        code: 'E1',
        description: '습도센서 이상',
        cause: '습도센서 접촉 불량',
        solution: '전원을 재투입하세요. 지속되면 LG전자 서비스센터(1544-7777)',
        severity: 'medium',
      },
      {
        code: 'E4',
        description: '압축기 보호 정지',
        cause: '과열 보호 동작',
        solution: '30분 후 재가동하세요. 반복되면 LG전자 서비스센터(1544-7777)',
        severity: 'high',
      },
      {
        code: 'CL',
        description: '필터 청소 알림',
        cause: '필터 오염',
        solution: '필터를 청소한 뒤 알림을 리셋하세요',
        severity: 'low',
      },
    ],

    targetUsers: {
      recommended: [
        '제습기+공기청정기 한 대로 해결하고 싶은 가정',
        '장마철 곰팡이 예방이 필요한 가정',
        '지하/반지하 거주자',
      ],
      notRecommended: [
        '전문 공기청정기 성능이 필요한 경우 (별도 구매 추천)',
      ],
    },

    features: [
      '16L/일 대용량 제습',
      '360도 HEPA 공기청정',
      '의류건조 모드',
      'ThinQ 앱 원격 제어',
      '오브제컬렉션 디자인',
    ],

    priceAnalysis: {
      valueRating: 5,
      priceTier: 'mid',
      alternatives: ['samsung-bespoke-dehumidifier-dg16a7500'],
    },

    reviews: [
      {
        userType: '반지하 거주자',
        rating: 5,
        text: '제습+공기청정 겸용이라 공간 절약됩니다. 장마철 하루 물통 가득 차고, 곰팡이 냄새도 사라졌어요.',
        pros: ['2in1 절약', '강한 제습'],
        cons: ['잦은 물통 비움'],
      },
      {
        userType: '장마철 빨래 건조용 구매자',
        rating: 4,
        text: '의류건조 모드로 실내 빨래 말리는 데 잘 씁니다. 16L라 거실까지 커버되고, HEPA라 공기청정도 그럭저럭 됩니다.',
        pros: ['의류건조', '대용량'],
        cons: ['공청 성능 보통'],
      },
      {
        userType: '아파트 4인 가족',
        rating: 3,
        text: '제습력은 만족인데 작동 소음이 생각보다 있어서 잘 때는 거슬립니다. 물통도 자주 비워야 해서 연속배수 호스 연결해서 씁니다.',
        pros: ['제습 성능'],
        cons: ['소음', '물통 자주 참'],
      },
      {
        userType: '오브제 색상 보고 산 사용자',
        rating: 5,
        text: '디자인이 예뻐서 거실에 둬도 안 튑니다. 제습·청정 한 대로 되니 따로 공기청정기 안 사도 돼서 좋아요.',
        pros: ['예쁜 디자인', '공간 절약'],
        cons: ['높은 가격'],
      },
    ],

    purchaseLinks: [
      { store: 'LG전자 공식', url: '#', price: 649000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 519000 },
    ],

    similarProducts: ['samsung-bespoke-dehumidifier-dg16a7500'],
  },

  // === 세탁기 ===
  {
    id: 'lg-trom-obje-fw25eswhs',
    slug: 'lg-trom-obje-fw25eswhs',
    brand: 'LG',
    name: '트롬 오브제컬렉션 FW25ESWHS',
    modelNumber: 'FW25ESWHS',
    category: '세탁기',
    image: '/images/appliances/lg/fw25eswhs/main.webp',
    images: [],
    description: 'LG 트롬 오브제컬렉션 드럼세탁기. 인버터 DD모터 + 터보샷으로 강력 세탁, 25kg 대용량.',
    oneliner: 'DD모터 + 터보샷 강력세탁, 25kg 초대용량 드럼',
    editorComment: 'LG 세탁기의 플래그십 모델입니다. DD 인버터 모터가 드럼을 직접 구동해 진동·소음이 적고, 터보샷이 고압수를 분사해 세탁력을 높입니다. 25kg로 업계 최대급이라 대가족이나 이불 세탁에 유리합니다. 삼성 그랑데 대비 1kg 더 크고, 터보샷이 차별점입니다.',
    status: 'featured',
    tags: ['LG', '트롬', '오브제컬렉션', '드럼세탁기', '25kg', 'DD모터', '터보샷'],

    specs: {
      energyEfficiency: 9,
      performance: 10,
      convenience: 9,
      durability: 9,
    },

    techSpecs: {
      coreTechnology: 'DD 인버터 모터 + 터보샷 + 6모션',
      filterType: '자가세정 필터',
      capacity: '25kg',
      energyGrade: '1등급',
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
        solution: '세탁물을 고르게 펼치고 재시작',
        severity: 'low',
      },
      {
        code: 'OE',
        description: '배수 이상',
        cause: '배수 필터 막힘 또는 배수호스 꺾임',
        solution: 'LG전자 안내는 배수필터 청소 시 바닥에 많은 물이 흘러나올 수 있다고 경고합니다. 수건을 깔고 전면 왼쪽 하단 커버를 연 뒤 잔수 호스로 물을 먼저 빼고 필터를 청소하세요. 그다음 배수호스 높이와 꼬임을 확인합니다.',
        severity: 'medium',
      },
      {
        code: 'IE',
        description: '급수 이상',
        cause: '수도 밸브가 잠기거나 급수 호스 꺾임',
        solution: '수도 밸브 열림 확인, 급수 호스 점검',
        severity: 'medium',
      },
      {
        code: 'FE',
        description: '급수 과다',
        cause: '급수밸브 고장으로 물이 계속 유입',
        solution: '수도 밸브 잠그고 서비스센터 연락 (1544-7777)',
        severity: 'high',
      },
      {
        code: 'dE',
        description: '세탁기 문(도어)이 제대로 닫히지 않아 작동이 시작되지 않는 상태.',
        cause: '도어가 완전히 닫히지 않았거나 도어 사이에 빨래가 끼임, 또는 도어 잠금장치(락) 불량.',
        solution: '문을 \'딸깍\' 소리가 날 때까지 다시 확실히 닫고, 고무패킹 사이에 낀 빨래가 없는지 확인한 뒤 재시작. 제대로 닫아도 반복되면 잠금장치 고장일 수 있으니 LG전자 서비스센터(1544-7777)에 점검을 요청.',
        severity: 'medium',
      },
      {
        code: 'tE',
        description: '세탁수 가열 온도가 정상 범위를 벗어났을 때 표시되는 온도·히터 계통 이상.',
        cause: '삶음·온수 코스에서 히터 또는 온도센서 이상, 혹은 급수 온도 문제.',
        solution: '전원을 끈 뒤 5~10분 기다렸다가 다시 켜고 일반(냉수) 코스로 재시도. 온수·삶음 코스에서 반복되면 히터·센서 고장 가능성이 있으므로 LG전자 서비스센터(1544-7777) 점검이 필요.',
        severity: 'medium',
      },
      {
        code: 'LE',
        description: '모터에 과부하가 걸리거나 구속(잠김)되어 드럼이 정상적으로 회전하지 못하는 상태.',
        cause: '빨래를 한 번에 너무 많이 넣은 과부하, 이불·매트 등 무거운 빨래 편중, 또는 모터·구동부 이상.',
        solution: '빨래 양을 정량 이하로 줄이고 고르게 편 뒤 재시작하고, 무거운 빨래는 나눠서 세탁. 그래도 반복되면 모터·구동계 점검이 필요하므로 LG전자 서비스센터(1544-7777)에 문의.',
        severity: 'medium',
      },
    ],

    targetUsers: {
      recommended: [
        '4인 이상 대가족',
        '이불/커튼 등 대형 세탁이 잦은 가정',
        '세탁력(강력 세탁)을 중시하는 사용자',
      ],
      notRecommended: [
        '1~2인 가구 (오버스펙)',
        '설치 공간이 좁은 환경',
      ],
    },

    features: [
      'DD 인버터 모터 (10년 무상 보증)',
      '터보샷 (고압수 분사 세탁)',
      '6모션 세탁 (두드림, 비빔, 주무름 등)',
      '스팀+ 살균',
      'ThinQ 앱 원격 제어',
    ],

    priceAnalysis: {
      valueRating: 4,
      priceTier: 'premium',
      alternatives: ['samsung-bespoke-grande-wf24a9500'],
    },

    reviews: [
      {
        userType: '5인 가족 주부',
        rating: 5,
        text: '25kg라 왕이불도 한 번에 세탁됩니다. 터보샷 덕분에 목깃 때도 잘 빠져요. DD모터라 진동이 거의 없어 밤에 돌려도 됩니다.',
        pros: ['초대용량', '강력 세탁', '저진동'],
        cons: ['큰 크기'],
      },
      {
        userType: '맞벌이 4인 가족',
        rating: 4,
        text: '용량이 커서 몰아 빨 때 편합니다. 스팀 코스로 아이 옷 살균하는 것도 좋고요. 다만 세탁 시간이 표준 코스 기준 좀 깁니다.',
        pros: ['스팀 살균', '대용량'],
        cons: ['긴 세탁시간'],
      },
      {
        userType: '드럼 처음 쓰는 사용자',
        rating: 3,
        text: '세탁력은 좋은데 도어가 커서 좁은 세탁실엔 개방 공간 확인이 필요합니다. 통세척 안 하면 고무패킹에 냄새가 좀 생겨요.',
        pros: ['세탁력'],
        cons: ['도어 개방 공간', '패킹 냄새'],
      },
      {
        userType: '이불 세탁 잦은 가정',
        rating: 5,
        text: '왕사이즈 이불도 빨고 헹굼까지 깔끔합니다. 진동·소음이 적어서 거실 옆 세탁실인데도 잘 때 안 거슬려요. 10년 모터 보증도 든든합니다.',
        pros: ['이불 세탁', '저소음', '10년 보증'],
        cons: ['무거운 본체'],
      },
    ],

    purchaseLinks: [
      { store: 'LG전자 공식', url: '#', price: 1690000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 1350000 },
    ],

    similarProducts: ['samsung-bespoke-grande-wf24a9500'],
  },

  // === 건조기 ===
  {
    id: 'lg-trom-obje-dryer-rd20wswhs',
    slug: 'lg-trom-obje-dryer-rd20wswhs',
    brand: 'LG',
    name: '트롬 오브제컬렉션 건조기 RD20WSWHS',
    modelNumber: 'RD20WSWHS',
    category: '건조기',
    image: '/images/appliances/lg/rd20wswhs/main.webp',
    images: [],
    description: 'LG 트롬 오브제컬렉션 건조기. 히트펌프 인버터 + 듀얼 인버터로 저온 건조, 20kg 대용량.',
    oneliner: '히트펌프 저온건조 + 듀얼인버터, 20kg 대용량',
    editorComment: 'LG 건조기 플래그십. 듀얼 인버터 히트펌프로 저온 건조하면서도 건조 시간이 빠릅니다. 20kg 대용량은 이불 건조에도 여유 있고, 트루스팀으로 옷 냄새·구김 제거가 가능합니다. 삼성 대비 3kg 더 크고, 트루스팀이 차별점입니다.',
    status: 'best',
    tags: ['LG', '트롬', '오브제컬렉션', '건조기', '히트펌프', '20kg', '듀얼인버터'],

    specs: {
      energyEfficiency: 9,
      performance: 9,
      convenience: 10,
      durability: 9,
    },

    techSpecs: {
      coreTechnology: '듀얼 인버터 히트펌프 + 트루스팀',
      filterType: '듀얼 필터 + 히트익스체인저 자동세척',
      capacity: '20kg',
      energyGrade: '1등급',
    },

    roomFit: {
      recommendedSize: ['중형', '대형', '초대형'],
      coverageArea: 0,
      installationType: '독립형/스태킹',
      installationNote: '세탁기 위 스태킹 설치 가능. 환기구 연결 권장',
    },

    errorCodes: [
      {
        code: 'tE1',
        description: '배기 온도센서 이상',
        cause: '온도센서 불량',
        solution: '전원 끄고 10분 후 재가동. 반복 시 서비스센터 연락',
        severity: 'medium',
      },
      {
        code: 'dE',
        description: '도어 열림',
        cause: '도어가 완전히 닫히지 않음',
        solution: '도어를 확실히 닫고 재시작',
        severity: 'low',
      },
      {
        code: 'nP',
        description: '전원 이상',
        cause: '전원 공급 불안정',
        solution: '콘센트 점검, 멀티탭 대신 벽면 콘센트 직접 연결',
        severity: 'medium',
      },
      {
        code: 'tE2',
        description: '건조 온도센서 감지값이 정상 범위를 벗어나 건조가 중단됩니다.',
        cause: '온도센서(서미스터)의 단선·접촉 불량 또는 센서 회로 이상. 필터·콘덴서에 보풀이 많이 쌓여 온도가 비정상적으로 감지되는 경우도 원인입니다.',
        solution: '전원 플러그를 뽑고 약 5분 뒤 다시 연결해 재시도하세요. 도어 안쪽 필터와 콘덴서(2중 필터)의 보풀을 청소하고 주변 통풍이 잘 되도록 한 뒤 사용합니다. 청소·재시작 후에도 반복되면 센서 점검·교체가 필요하므로 LG전자 서비스센터(1544-7777)에 점검을 요청하세요.',
        severity: 'medium',
      },
      {
        code: 'OE',
        description: '건조 중 생긴 응축수가 제대로 배수되지 않아 동작이 멈춥니다.',
        cause: '응축수 물통이 가득 찼거나, 직배수 호스가 꺾임·막힘, 배수펌프·배수필터에 이물질이 끼었거나 직배수 설치(높이·연결)가 잘못된 경우입니다.',
        solution: '먼저 물통을 비우고 제자리에 다시 장착하세요. 직배수로 쓴다면 호스 꺾임·막힘과 설치 높이를 확인하고, 배수필터의 이물질을 제거한 뒤 재시작합니다. 그래도 반복되면 배수펌프 점검이 필요하니 LG전자 서비스센터(1544-7777)에 문의하세요.',
        severity: 'medium',
      },
      {
        code: 'LE1',
        description: '드럼 구동 모터에 과부하 또는 구속(끼임)이 감지되어 건조가 중단됩니다.',
        cause: '한 번에 너무 많은 빨래를 넣어 생긴 과부하, 드럼 안 이물질 끼임, 또는 모터·구동부 이상입니다.',
        solution: '전원을 끄고 빨래 양을 적정 용량 이하로 줄인 뒤, 드럼이 손으로 부드럽게 돌아가는지 확인하고 재시작하세요. 전원 플러그를 뽑았다가 약 5분 후 다시 연결하는 것도 도움이 됩니다. 빨래를 줄여도 반복되면 모터·구동부 점검이 필요하므로 LG전자 서비스센터(1544-7777)에 점검을 요청하세요.',
        severity: 'high',
      },
    ],

    targetUsers: {
      recommended: [
        '빨래 건조가 잦은 대가족',
        '장마철/미세먼지 때문에 실외 건조가 어려운 환경',
        '옷감 관리가 중요한 사용자',
      ],
      notRecommended: [
        '소형 원룸 (설치 공간 부족)',
        '전기요금에 매우 민감한 사용자',
      ],
    },

    features: [
      '듀얼 인버터 히트펌프 (저온 고속 건조)',
      '트루스팀 (냄새·구김·알레르기 제거)',
      '20kg 대용량 (이불 건조 OK)',
      '히트익스체인저 자동 세척',
      'ThinQ 앱 원격 제어',
    ],

    priceAnalysis: {
      valueRating: 4,
      priceTier: 'premium',
      alternatives: ['samsung-bespoke-grande-dv17a9720'],
    },

    reviews: [
      {
        userType: '맞벌이 주부',
        rating: 5,
        text: '트루스팀이 최고입니다. 고기집 다녀온 코트 넣으면 냄새 싹 사라져요. 20kg라 침대 이불도 한 번에 건조됩니다.',
        pros: ['트루스팀', '대용량', '냄새 제거'],
        cons: ['전기요금'],
      },
      {
        userType: '세탁기 위 스태킹 설치자',
        rating: 4,
        text: '세탁기 위에 올려 설치하니 공간 효율이 좋습니다. 히트펌프라 옷이 안 줄고 저온이라 니트도 안심돼요. 건조 시간은 용량 큰 만큼 좀 걸립니다.',
        pros: ['저온 건조', '공간 효율'],
        cons: ['건조 시간'],
      },
      {
        userType: '전기요금 신경 쓰는 사용자',
        rating: 3,
        text: '건조 성능은 흠잡을 데 없는데 매일 돌리니 전기요금이 은근 올라갑니다. 콘덴서 자동세척이 있어도 가끔 필터는 직접 청소해줘야 해요.',
        pros: ['건조 성능'],
        cons: ['전기요금', '필터 관리'],
      },
      {
        userType: '알레르기 있는 가족',
        rating: 5,
        text: '스팀 살균 모드 덕에 침구 알레르기가 확실히 줄었습니다. 이불 건조까지 한 대로 끝나니 만족도가 높아요.',
        pros: ['알레르기 케어', '이불 건조'],
        cons: ['높은 가격'],
      },
    ],

    purchaseLinks: [
      { store: 'LG전자 공식', url: '#', price: 1590000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 1290000 },
    ],

    similarProducts: ['samsung-bespoke-grande-dv17a9720'],
  },

  // === 선풍기 ===
  {
    id: 'lg-puricare-aerotower-fs061pwua',
    slug: 'lg-puricare-aerotower-fs061pwua',
    brand: 'LG',
    name: '퓨리케어 에어로타워 FS061PWUA',
    modelNumber: 'FS061PWUA',
    category: '선풍기',
    image: '/images/appliances/lg/fs061pwua/main.webp',
    images: [],
    description: 'LG 퓨리케어 에어로타워. 클린부스터 청정송풍에 H13 헤파 공기청정을 결합한 날개 없는 타워팬.',
    oneliner: '청정송풍 + H13 공기청정, 다이슨에 맞서는 국산 날개없는 타워팬',
    editorComment: '다이슨 퓨어쿨의 직접 경쟁 모델입니다. 날개 없는 타워팬에 H13 헤파 공기청정을 더해 여름엔 송풍, 사철엔 청정으로 씁니다. 다이슨 대비 강점은 국내 정식 A/S와 클린부스터의 직진성 있는 바람, 오브제컬렉션 색상 선택입니다. 약점은 앱 생태계가 다이슨만큼 매끄럽진 않다는 점. 송풍 시 소비전력은 낮지만 온풍 겸용 상위 모델은 전력이 크게 오르니 모델을 확인하세요. 국산 A/S를 중시하면 다이슨보다 이쪽이 합리적입니다.',
    status: 'featured',
    tags: ['LG', '퓨리케어', '에어로타워', '선풍기', '타워팬', '날개없는', '공기청정', 'H13'],

    specs: {
      energyEfficiency: 7,
      performance: 8,
      convenience: 9,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '클린부스터 청정송풍 + H13 헤파 공기청정',
      filterType: 'H13 헤파 + 탈취 일체형 필터',
      capacity: '타워형 (높이 1000mm)',
    },

    roomFit: {
      recommendedSize: ['소형', '중형'],
      coverageArea: 30,
      installationType: '타워형/스탠드',
      installationNote: '공기청정 권장 면적 약 30m2. 필터는 약 1년 주기 교체',
    },

    errorCodes: [
      {
        code: 'E1',
        description: '팬 모터 이상',
        cause: '이물 끼임 또는 모터 과부하',
        solution: '전원을 분리하고 흡입구를 점검하세요. 지속되면 LG전자 서비스센터(1544-7777)',
        severity: 'medium',
      },
      {
        code: 'CL',
        description: '필터 교체 알림',
        cause: '필터 수명 도달',
        solution: '정품 필터로 교체한 뒤 알림을 리셋하세요',
        severity: 'low',
      },
      {
        code: 'C1',
        description: '통신 연결 이상',
        cause: 'Wi-Fi 또는 ThinQ 연결 불안정',
        solution: '공유기를 재연결하고 앱에서 다시 등록하세요',
        severity: 'low',
      },
      {
        code: 'PE',
        description: '전원 어댑터 이상',
        cause: '전원 접촉 불량',
        solution: '콘센트와 전원 코드를 점검하세요',
        severity: 'medium',
      },
      {
        code: 'SE',
        description: '공기질 센서 이상',
        cause: '센서 흡입구 오염',
        solution: '센서 흡입구를 청소하세요',
        severity: 'low',
      },
    ],

    targetUsers: {
      recommended: [
        '날개 없는 타워팬을 원하지만 국내 정식 A/S를 중시하는 사용자',
        '여름 송풍 + 사철 공기청정을 한 대로 쓰려는 가정',
        '오브제컬렉션 인테리어 색상을 선호하는 사용자',
        '아이·반려동물이 있어 안전한 송풍이 필요한 가정',
      ],
      notRecommended: [
        '강한 직바람 냉감을 원하는 사용자',
        '가성비를 최우선으로 보는 소비자',
        '넓은 거실 전체를 빠르게 식히려는 경우',
      ],
    },

    features: [
      '날개 없는 클린부스터 청정송풍',
      'H13 헤파 + 탈취 일체형 필터',
      '좌우 회전 + 다단계 풍량',
      '취침 모드 (저소음·디스플레이 소등)',
      'LG 씽큐 앱 제어',
    ],

    priceAnalysis: {
      valueRating: 4,
      priceTier: 'premium',
      alternatives: ['dyson-pure-cool-tp07'],
    },

    reviews: [
      {
        userType: '다이슨과 비교 후 구매한 사용자',
        rating: 4,
        text: '다이슨이랑 고민하다 A/S 때문에 이걸로 갔어요. 바람·청정 성능은 충분하고 색상이 집이랑 잘 맞습니다. 앱은 다이슨이 좀 더 깔끔하긴 해요.',
        pros: ['국내 A/S', '청정송풍'],
        cons: ['앱 완성도'],
      },
      {
        userType: '거실에서 쓰는 3인 가족',
        rating: 4,
        text: '날개가 없어 청소가 편하고 안전합니다. 다만 가격이 있는 만큼 순수 선풍기 용도면 부담스럽고, 공기청정까지 쓸 사람한테 추천해요.',
        pros: ['청소 편함', '안전'],
        cons: ['높은 가격'],
      },
      {
        userType: '아이 키우는 엄마',
        rating: 5,
        text: '날개가 없어서 아이가 손 넣어도 안심입니다. 여름엔 송풍, 환절기엔 공기청정으로 사철 쓰니 한 대로 충분해요.',
        pros: ['안전', '사철 활용'],
        cons: ['필터 비용'],
      },
      {
        userType: '강한 바람 원하는 사용자',
        rating: 3,
        text: '바람이 부드럽게 퍼지는 스타일이라 직바람 시원함을 기대하면 약하게 느껴집니다. 청정 위주로 보면 괜찮은데 선풍기로만 보면 아쉬워요.',
        pros: ['부드러운 바람'],
        cons: ['약한 풍량'],
      },
    ],

    purchaseLinks: [
      { store: 'LG전자 공식', url: '#', price: 599000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 499000 },
    ],

    similarProducts: ['dyson-pure-cool-tp07', 'shinil-bldc-stand-sif14bldc'],
  },

  // === 공기청정기 ===
  {
    id: 'lg-puricare-360-as203nw3a',
    slug: 'lg-puricare-360-as203nw3a',
    brand: 'LG',
    name: '퓨리케어 오브제컬렉션 360° AS203NW3A',
    modelNumber: 'AS203NW3A',
    category: '공기청정기',
    image: '/images/appliances/lg/as203nw3a/main.webp',
    images: [],
    description: 'LG 퓨리케어 오브제컬렉션 360도 공기청정기. 원통형 360도 흡입·토출과 클린부스터로 빠르게 청정하는 20평형 모델.',
    oneliner: '360도 흡입 + 클린부스터, 오브제 색상으로 거실에 어울리는 공기청정기',
    editorComment: 'LG 퓨리케어의 360도 원통형 모델입니다. 사방에서 오염 공기를 빨아들이고 상단 클린부스터가 멀리까지 정화 공기를 쏘아 보내 청정 도달 거리가 깁니다. 적용면적 66m2(20평)로 중형 거실에 적당하고, 오브제컬렉션 색상으로 인테리어 선택폭이 넓습니다. 코웨이·삼성과 비슷한 중상급 포지션이며, LG 씽큐 생태계와 360도 흡입을 선호한다면 좋은 선택입니다.',
    status: 'best',
    tags: ['LG', '퓨리케어', '오브제컬렉션', '공기청정기', '20평', '360도', '클린부스터', '1등급'],

    specs: {
      energyEfficiency: 8,
      performance: 8,
      convenience: 9,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '360도 흡입·토출 + 클린부스터',
      filterType: 'H13 헤파 + 탈취 일체형 360도 필터',
      capacity: '20평형 (66m2)',
    },

    roomFit: {
      recommendedSize: ['소형', '중형', '대형'],
      coverageArea: 66,
      installationType: '이동식 원통형',
      installationNote: '360도 흡입이라 공간 중앙 배치에 유리. 필터 약 1년 주기 교체',
    },

    errorCodes: [
      {
        code: 'C1',
        description: '필터 미장착/도어 열림',
        cause: '필터 미장착 또는 커버 열림',
        solution: '필터를 정위치에 끼우고 커버를 닫으세요',
        severity: 'low',
      },
      {
        code: 'CL',
        description: '필터 교체 알림',
        cause: '필터 수명 도달',
        solution: '정품 필터로 교체한 뒤 알림을 리셋하세요',
        severity: 'low',
      },
      {
        code: 'E1',
        description: '팬 모터 이상',
        cause: '모터 과부하 또는 이물 끼임',
        solution: '전원을 분리 후 점검하세요. 지속되면 LG전자 서비스센터(1544-7777)',
        severity: 'medium',
      },
      {
        code: 'SE',
        description: '먼지센서 이상',
        cause: '센서 흡입구 오염',
        solution: '센서 흡입구를 청소하세요',
        severity: 'low',
      },
      {
        code: 'C2',
        description: '통신 이상',
        cause: 'Wi-Fi 또는 ThinQ 연결 불안정',
        solution: '공유기를 재연결하세요',
        severity: 'low',
      },
    ],

    targetUsers: {
      recommended: [
        '공간 중앙에 두고 360도 청정을 원하는 가정',
        '청정 도달 거리가 긴 모델을 찾는 사용자',
        'LG 씽큐 생태계를 함께 쓰는 가정',
        '오브제컬렉션 색상을 선호하는 사용자',
      ],
      notRecommended: [
        '벽에 붙여 쓰는 좁은 배치 환경 (360도 흡입 손해)',
        '가성비를 최우선으로 보는 소비자',
      ],
    },

    features: [
      '360도 흡입·토출 (전 방향 청정)',
      '클린부스터 (정화 공기 원거리 송출)',
      'H13 헤파 360도 일체형 필터',
      '실시간 공기질 표시 + 자동 운전',
      'LG 씽큐 앱 원격 제어·필터 알림',
    ],

    priceAnalysis: {
      valueRating: 4,
      priceTier: 'premium',
      alternatives: ['coway-noble-ap-3023a', 'samsung-bespoke-cube-air-ax90'],
    },

    reviews: [
      {
        userType: '거실 중앙에 배치한 사용자',
        rating: 4,
        text: '방 가운데 두니 사방에서 빨아들이는 게 체감됩니다. 클린부스터로 바람이 멀리까지 가요. 색상도 집이랑 잘 맞고 만족합니다.',
        pros: ['360도 흡입', '먼 청정 도달'],
        cons: ['중앙 배치 필요'],
      },
      {
        userType: '여러 공청기 비교 후 구매',
        rating: 4,
        text: '360도라 배치 자유도가 좋습니다. 다만 벽에 붙이면 장점이 줄어드니 중앙에 둘 수 있을 때 사세요.',
        pros: ['배치 자유도'],
        cons: ['벽 배치 손해'],
      },
      {
        userType: '비염 있는 가족',
        rating: 5,
        text: '봄철 미세먼지 심한 날 자동 운전 켜두면 금방 파란불로 바뀝니다. 비염이 있는데 확실히 코가 편해졌어요. 씽큐 앱으로 필터 알림 뜨는 것도 편합니다.',
        pros: ['빠른 청정', '앱 알림'],
        cons: ['필터값'],
      },
      {
        userType: '소음 민감한 사용자',
        rating: 3,
        text: '청정 성능은 좋은데 풍량을 높이면 소음이 제법 큽니다. 잘 때는 취침 모드로 낮춰야 거슬리지 않아요. 필터 교체 비용도 은근 부담입니다.',
        pros: ['청정 성능'],
        cons: ['고풍량 소음', '필터 비용'],
      },
    ],

    purchaseLinks: [
      { store: 'LG전자 공식', url: '#', price: 449000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 369000 },
    ],

    similarProducts: ['coway-noble-ap-3023a', 'samsung-bespoke-cube-air-ax90', 'winix-tower-xq-azbe630'],
  },

  // === 냉장고 ===
  {
    id: 'lg-dios-obje-4door-t873',
    slug: 'lg-dios-obje-4door-t873',
    brand: 'LG',
    name: '디오스 오브제컬렉션 4도어 T873',
    modelNumber: 'T873MEE111',
    category: '냉장고',
    image: '/images/appliances/lg/t873mee111/main.webp',
    images: [],
    price: 2001350,
    description: 'LG 디오스 오브제컬렉션 4도어 냉장고. 870L(냉장 503L·냉동 367L)에 히든 버튼으로 여는 매직스페이스와 인버터 리니어 컴프레서를 갖춘 모델입니다. 공식 사양의 노크온 기능은 X입니다.',
    oneliner: '870L + 히든 버튼 매직스페이스, 노크온은 미지원',
    editorComment: '870L T873MEE111은 냉동 367L로 같은 폭의 삼성 RF85(177L)나 양문형 두 모델(320·308L)보다 냉동 전용 칸이 큽니다. 설명서는 문 위쪽과 냉장고 설치장 사이 2.5cm를 요구해, 본체 높이 1,787mm에 더한 1,812mm면 높이 조건을 확실히 맞춥니다. 노크온·자동 제빙(아이스 트레이)·패널 교체는 지원하지 않습니다.',
    status: 'featured',
    tags: ['LG', '디오스', '오브제컬렉션', '냉장고', '4도어', '870L', '매직스페이스', '1등급'],

    specs: {
      energyEfficiency: 9,
      performance: 9,
      convenience: 10,
      durability: 9,
    },

    techSpecs: {
      coreTechnology: '인버터 리니어 컴프레서 + 히든 버튼 매직스페이스',
      filterType: '탈취 필터',
      refrigerant: 'R600a',
      capacity: '870L (냉장 503·냉동 367L)',
      dimensions: '914 x 1787 x 918mm',
      weight: 146,
      energyGrade: '1등급',
    },

    // 냉장고에는 평형 개념이 없어 추천 평수를 비운다. 이격·문 열림 치수는 지원 페이지가 연결한
    // 공용 설명서 인쇄 20쪽(치수표 유형 1 = 914×1,787×918mm)과 25·27쪽(고장 진단)에서 옮겼다.
    roomFit: {
      recommendedSize: [],
      installationType: '4도어 (프리스탠딩)',
      installationNote: 'LG 공용 설명서 기준 후면 벽과 10cm 이상, 문 위쪽과 냉장고 설치장 사이 2.5cm 이상을 두고, 고장 진단 쪽은 천장·좌우 벽에서 10cm 이상 띄우라고 안내합니다. 문을 끝까지 열면 폭 1,667mm, 뒷면부터 깊이 1,293mm가 필요합니다.',
    },

    targetUsers: {
      recommended: [
        '냉동 보관량이 많은 가정 (냉동 367L, 같은 폭 RF85는 맞춤보관실까지 냉동으로 써도 353L)',
        '자주 꺼내는 음료·간식을 별도 매직스페이스에 수납하려는 사용자',
        '리니어 컴프레서 10년 핵심부품 무상 항목(LG 보증표)을 따져 보는 가정',
        'LG ThinQ 앱으로 다른 LG 가전을 이미 관리하는 사용자',
      ],
      notRecommended: [
        '본체 1,787mm 위로 설명서의 문 위 여유 2.5cm를 둘 수 없는 냉장고장 (넉넉히 잡으면 1,812mm)',
        '문 앞 통로가 좁아 뒷면부터 1,293mm까지 문을 열 공간이 없는 주방',
        '자동 제빙이나 도어 색 교체가 필요한 가정 (아이스 트레이·수도관 연결 X, 패널 교체 미지원)',
      ],
    },

    features: [
      '870L = 냉장 503L + 냉동 367L',
      '히든 버튼 매직스페이스 (자주 쓰는 식품 별도 수납)',
      '인버터 리니어 컴프레서 · 1등급 · 43.7kWh/월 (LG 사양)',
      '자동정온 · 문열림 각도 135˚ (냉장칸 기준)',
      'ThinQ(Wi-Fi) · 스마트 진단 지원',
    ],

    priceAnalysis: {
      msrp: 2001350,
      valueRating: 4,
      priceTier: 'luxury',
      alternatives: ['samsung-bespoke-4door-rf85', 'samsung-bespoke-sxs-rs84'],
    },

    reviews: [
      {
        userType: '4인 가족, 삼성과 비교 후 구매',
        rating: 5,
        text: '노크온이 생각보다 유용해요. 안에 뭐 있나 두드려 보고 안 열게 되니 냉기도 덜 빠집니다. 조용하고 용량도 넉넉해서 만족.',
        pros: ['노크온', '대용량', '정숙'],
        cons: ['높은 가격'],
      },
      {
        userType: '오브제 색상으로 주방 꾸민 사용자',
        rating: 4,
        text: '색·소재 고르는 재미가 있고 마감이 고급스럽습니다. 가격은 비싸지만 10년 보증이라 안심돼요.',
        pros: ['색상 선택', '고급 마감', '10년 보증'],
        cons: ['비싼 가격'],
      },
      {
        userType: '대가족 살림하는 주부',
        rating: 5,
        text: '870L라 김치통에 반찬통 다 넣어도 자리가 남습니다. 매직스페이스 칸에 자주 먹는 음료 넣어두니 문 전체를 열 일이 줄어요.',
        pros: ['넉넉한 수납', '매직스페이스'],
        cons: ['넓은 설치폭'],
      },
      {
        userType: '좁은 주방 거주자',
        rating: 3,
        text: '용량·기능은 최고인데 폭이 넓어서 우리 주방엔 빠듯하게 들어갔습니다. 구매 전 설치 치수랑 문 열림 공간 꼭 재보세요.',
        pros: ['기능 만족'],
        cons: ['큰 설치폭'],
      },
    ],

    purchaseLinks: [
      { store: 'LG전자 공식', url: '#', price: 3490000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 2890000 },
    ],

    similarProducts: ['samsung-bespoke-4door-rf85', 'samsung-bespoke-sxs-rs84', 'haier-mini-fridge-155'],
  },
  // === 식기세척기 ===
  {
    id: 'lg-dios-dishwasher-truesteam-dt14',
    slug: 'lg-dios-dishwasher-truesteam-dt14',
    brand: 'LG',
    name: '디오스 식기세척기 트루스팀 12인용 DUBJ4ESS',
    modelNumber: 'DUBJ4ESS',
    category: '식기세척기',
    image: '/images/appliances/lg/dubj4ess/main.webp',
    images: [],
    description: 'LG 디오스 12인용 빌트인 식기세척기. 트루스팀 스팀 살균과 쿼드워시 4방향 분사, 인버터 DD모터, 토네이도 고온 헹굼으로 강력하고 위생적인 세척을 제공한다.',
    oneliner: '트루스팀 살균 + 쿼드워시, 12인용 빌트인 프리미엄 식기세척기',
    editorComment: 'LG 디오스 식기세척기의 상위 라인입니다. 트루스팀이 고온 스팀으로 그릇을 예열·살균해 기름때와 눌어붙은 음식물에 강하고, 쿼드워시 4방향 분사암이 사각지대를 줄여 12인용을 꽉 채워도 세척력이 고릅니다. 세척이 끝나면 문이 자동으로 살짝 열려 잔열로 건조되는 자동 문열림이 위생과 전기 절약 모두에 유리합니다. 삼성 식기세척기와 직접 경쟁하는데, LG는 트루스팀 살균과 인버터 DD모터 10년 보증이 강점이고 삼성은 워터월 세척이 강점입니다. 다만 예열·온수 헹굼 탓에 표준 코스가 2시간을 넘기고 빌트인 급배수 설치가 필요하니, 1~2인 자취·신혼이라면 6인용 식탁형이 더 맞습니다.',
    status: 'featured',
    tags: ['LG', '디오스', '식기세척기', '12인용', '빌트인', '트루스팀', '쿼드워시', 'DD모터'],

    specs: {
      energyEfficiency: 8,
      performance: 9,
      convenience: 9,
      durability: 9,
    },

    techSpecs: {
      coreTechnology: '트루스팀 스팀살균 + 쿼드워시 4방향 분사 + 인버터 DD모터',
      filterType: '3중 자가세정 필터',
      capacity: '12인용',
      energyGrade: '1등급',
    },

    roomFit: {
      recommendedSize: ['중형', '대형', '초대형'],
      coverageArea: 0,
      installationType: '빌트인',
      installationNote: '빌트인 폭 600mm 규격. 급수(냉수)·배수 연결과 별도 전원 콘센트 필요. 싱크대 하부장 매립형으로 도어 개방 공간과 배수 호스 높이를 확인하세요.',
    },

    errorCodes: [
      {
        code: 'IE',
        description: '급수 이상',
        cause: '수도 밸브 잠김, 급수 호스 꺾임 또는 단수',
        solution: '수도 밸브 열림과 급수 호스 꼬임을 확인하고 재시작. 반복 시 급수 필터망 청소 후 LG전자 서비스센터(1544-7777) 문의',
        severity: 'medium',
      },
      {
        code: 'OE',
        description: '배수 이상',
        cause: '배수 필터 막힘 또는 배수 호스 꺾임·높이 초과',
        solution: '하단 배수 필터를 분리할 때 고인 물이 흘러나오므로 수건을 먼저 깔고, 잔수 호스가 있으면 물을 뺀 뒤 엽니다. 음식물 찌꺼기를 청소하고 배수 호스 높이·꼬임을 확인하세요. 반복되면 서비스센터에 문의합니다.',
        severity: 'medium',
      },
      {
        code: 'AE',
        description: '누수 감지',
        cause: '내부 또는 급배수 연결부 누수로 안전장치 작동',
        solution: '즉시 수도 밸브를 잠그고 본체 하단·연결부의 물기를 확인 후 LG전자 서비스센터(1544-7777)에 점검 요청',
        severity: 'high',
      },
      {
        code: 'FE',
        description: '표준량보다 많은 물이 급수되는 과수위(과급수) 상태로, 누수 방지를 위해 배수펌프가 자동 작동하며 동작이 멈춥니다.',
        cause: '식기세척기 전용이 아닌 일반 주방세제 사용이나 세제 과다로 인한 거품 발생, 큰 그릇이 물길을 막아 수위가 비정상적으로 올라가는 경우, 또는 제품이 수평으로 설치되지 않은 경우.',
        solution: '식기세척기 전용 세제만 권장량으로 사용하고, 큰 그릇과 냄비는 뒤집어 넣어 물길을 확보하세요. 제품이 좌우/앞뒤 수평으로 설치됐는지 확인한 뒤 전원을 껐다 켜고 재시도합니다. 거품 등 명확한 원인이 없는데도 반복되면 LG전자 서비스센터(1544-7777)에 점검을 요청하세요.',
        severity: 'medium',
      },
      {
        code: 'HE',
        description: '물을 설정 온도까지 데우지 못하거나 과열되는 등 히터 가열에 이상이 생긴 상태입니다.',
        cause: '히터(가열부) 단선·불량, 또는 가열 회로 이상으로 정상 가열이 되지 않거나 과도하게 가열되는 경우.',
        solution: '전원 플러그를 뽑고 1~2분 후 다시 꽂아 재동작해 보세요. 그래도 HE가 반복되면 가열부 부품 점검·수리가 필요하므로 LG전자 서비스센터(1544-7777)에 접수하세요. (가정 내 자가수리 불가)',
        severity: 'medium',
      },
      {
        code: 'tE',
        description: '내부 수온이 비정상 범위로 감지되는 온도(써미스터) 센서 에러입니다.',
        cause: '온도센서(써미스터) 불량이나 관련 배선·회로 이상으로 수온이 정상 범위를 벗어났다고 인식되는 경우.',
        solution: '전원을 껐다 켜고 다시 동작시켜 일시적 오류인지 확인하세요. 반복되면 센서·회로 점검이 필요하므로 LG전자 서비스센터(1544-7777)에 점검을 요청하세요. (가정 내 자가수리 불가)',
        severity: 'medium',
      },
      {
        code: 'LE',
        description: '세척수를 분사암으로 보내는 순환모터가 동작하지 않거나 제어보드와 통신이 끊겨 세척이 진행되지 않는 상태입니다.',
        cause: '순환모터(BLDC) 과부하·구속(잠김), 모터와 제어보드 사이 배선 불량, 또는 제어보드 이상.',
        solution: '전원을 껐다 켜고, 분사암이 식기나 이물질에 걸려 있지 않은지 확인한 뒤 재동작하세요. LE가 계속 표시되면 모터·제어보드 점검이 필요하므로 LG전자 서비스센터(1544-7777)에 수리를 접수하세요.',
        severity: 'high',
      },
    ],

    targetUsers: {
      recommended: [
        '설거지량이 많은 4인 이상 가족',
        '빌트인 주방으로 깔끔한 매립 설치를 원하는 가정',
        '기름때·눌어붙은 그릇이 많아 고온 스팀 살균이 필요한 가정',
        '아이 식기·젖병 등 위생 살균을 중시하는 가정',
      ],
      notRecommended: [
        '1~2인 자취·신혼 가구 (6인용 식탁형이 적합, 오버스펙)',
        '빌트인 공간이나 급배수 설치가 어려운 환경',
        '한 사이클 2시간 넘는 긴 세척 시간을 감수하기 어려운 사용자',
      ],
    },

    features: [
      '트루스팀 스팀 살균 (고온 스팀으로 99.9% 위생 세척)',
      '쿼드워시 4방향 회전 분사암 (사각지대 최소화)',
      '인버터 DD모터 (저소음·저진동, 10년 무상 보증)',
      '토네이도 고온 헹굼 (고온 회오리 헹굼으로 잔여 세제 제거)',
      '자동 문열림 건조 + LG 씽큐 앱 원격 제어',
    ],

    priceAnalysis: {
      valueRating: 4,
      priceTier: 'premium',
      alternatives: ['samsung-bespoke-dishwasher-dw60'],
    },

    reviews: [
      {
        userType: '4인 가족',
        rating: 5,
        text: '트루스팀 덕에 기름기 많은 그릇도 깔끔하고 살균까지 되니 안심됩니다.',
        pros: ['스팀 살균', '세척력'],
        cons: ['1회 시간 김'],
      },
      {
        userType: '신혼부부',
        rating: 4,
        text: '작동음이 적고 건조가 잘 돼서 만족해요. 전용세제는 꼭 필요합니다.',
        pros: ['저소음', '건조'],
        cons: ['전용세제'],
      },
      {
        userType: '맞벌이 직장인',
        rating: 3,
        text: '세척은 좋은데 그릇 적재 방법을 익히는 데 시간이 좀 걸렸어요.',
        pros: ['세척 만족'],
        cons: ['적재 적응'],
      },
      {
        userType: '1인 가구',
        rating: 4,
        text: '12인용이라 몰아서 한 번에 돌리기 좋고 손설거지가 확 줄었습니다.',
        pros: ['용량', '편의'],
        cons: ['설치 공간'],
      },
    ],

    purchaseLinks: [
      { store: 'LG전자 공식', url: '#', price: 1190000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 890000 },
    ],

    similarProducts: ['samsung-bespoke-dishwasher-dw60', 'skmagic-touchon-dishwasher-dwa81'],
  },
  // === 건조기 ===
  {
    id: 'lg-trom-heatpump-dryer-rh14',
    slug: 'lg-trom-heatpump-dryer-rh14',
    brand: 'LG',
    name: '트롬 히트펌프 건조기 RH14ETN',
    modelNumber: 'RH14ETN',
    category: '건조기',
    image: '/images/appliances/lg/rh14etn/main.webp',
    images: [],
    description: 'LG 트롬 히트펌프 건조기 14kg. 인버터 히트펌프로 저온 건조해 옷감을 보호하고, 트루스팀으로 위생까지 챙긴 가성비 모델. 90만원대.',
    oneliner: '인버터 히트펌프 저온건조 + 트루스팀, 14kg 가성비',
    editorComment: 'LG 건조기 라인업에서 20kg 플래그십 오브제컬렉션 RD20WSWHS보다 한 체급 작은 가성비 포지션입니다. 인버터 히트펌프와 트루스팀은 그대로 가져오면서 용량을 14kg으로 줄이고 가격을 90만원대로 낮췄습니다. 2~4인 가구라면 14kg으로 하루 빨래가 한 번에 끝나고, 600mm 슬림 바디라 설치 공간 부담도 덜합니다. 다만 이불·대형 빨래가 잦거나 한 번에 많은 양을 말려야 한다면 20kg RD20WSWHS가 낫습니다.',
    status: 'featured',
    tags: ['LG', '트롬', '건조기', '히트펌프', '14kg', '인버터', '트루스팀', '가성비'],

    specs: {
      energyEfficiency: 8,
      performance: 8,
      convenience: 8,
      durability: 9,
    },

    techSpecs: {
      coreTechnology: '인버터 히트펌프 + 트루스팀 (저온 건조)',
      filterType: '2중 도어 필터 + 콘덴서 자동세척',
      capacity: '14kg',
      energyGrade: '1등급',
    },

    roomFit: {
      recommendedSize: ['소형', '중형'],
      coverageArea: 0,
      installationType: '히트펌프 독립형',
      installationNote: '히트펌프 방식이라 별도 환기구(배기 덕트) 연결이 필요 없음. 세탁기 위 스태킹 또는 독립 설치 가능. 응축수 배수 연결 또는 물통 비움 필요',
    },

    errorCodes: [
      {
        code: 'd90',
        description: '통풍 경로 막힘 (필터·콘덴서 청소 알림)',
        cause: '도어 필터·콘덴서에 보풀이 누적되어 통풍량이 저하됨',
        solution: '도어 필터를 물세척하고 콘덴서를 점검·청소. d95까지 오르기 전에 청소 권장',
        severity: 'low',
      },
      {
        code: 'tE1',
        description: '온도센서(서미스터) 이상',
        cause: '히트펌프 온도센서 불량 또는 일시적 과열',
        solution: '전원을 끄고 10분 후 재가동. 반복되면 서비스센터(1544-7777) 점검',
        severity: 'medium',
      },
      {
        code: 'CE',
        description: '통신 이상',
        cause: '메인 PCB와 인버터/디스플레이 간 통신 불량',
        solution: '전원 코드를 뽑고 1분 후 재연결. 반복되면 서비스센터 점검',
        severity: 'medium',
      },
      {
        code: 'tE2',
        description: '온도센서(서미스터) 이상 — 건조기 내부의 여러 온도센서 중 tE1과는 다른 위치의 센서에서 감지 오류가 발생해 건조가 중단됨',
        cause: '히트펌프 응축부/배기부 온도센서 불량 또는 센서 배선 접촉 불량이 주원인. 도어 필터·콘덴서에 보풀이 과다하게 쌓여 온도 감지가 틀어질 때 일시적으로 나타나기도 함',
        solution: '전원 콘센트를 뺀 뒤 약 1~10분 후 다시 꽂아 재가동(센서 일시 오류면 정상 복귀). 도어 필터를 물세척하고 콘덴서 부위를 청소한 뒤 다시 시도. 같은 코드가 반복되면 센서·기판 점검이 필요하므로 LG전자 서비스센터(1544-7777)에 점검 요청',
        severity: 'medium',
      },
      {
        code: 'dE',
        description: '도어 열림 감지 — 도어가 덜 닫혀 동작이 시작되지 않거나 중간에 멈춤 (모델에 따라 dE1, 시그니처 등 일부 모델은 dE4로 표시)',
        cause: '도어가 완전히 닫히지 않음, 세탁물이 문틈에 낌, 도어 후크(걸쇠)나 도어 스위치 접점 불량',
        solution: '문틈에 낀 세탁물을 빼고 \'딸깍\' 소리가 나도록 도어를 다시 닫은 뒤 시작. 도어 패킹·걸쇠 주변 이물질 제거. 반복되면(특히 dE4) 도어 스위치 점검이 필요하므로 LG전자 서비스센터(1544-7777)에 문의',
        severity: 'low',
      },
      {
        code: 'OE',
        description: '응축수 배수 불량 — 건조 중 생긴 물이 배출되지 않아 동작이 멈춤',
        cause: '물통(자동배수 미사용 시) 가득 참, 배수 호스 막힘·꺾임, 배수펌프 필터 이물질 또는 배수펌프 이상. 겨울철 한파로 잔류수나 배수 호스가 얼어 배수펌프가 작동하지 못할 때도 발생',
        solution: '물통식이면 물통을 비우고, 직접 배수 연결이면 배수 호스의 막힘·꺾임과 배수구 높이가 규격에 맞는지 확인. 호스가 얼었으면 따뜻한 수건으로 10분 정도 감싸 녹임. 그래도 OE가 반복되면 배수펌프 점검이 필요하므로 LG전자 서비스센터(1544-7777)에 문의',
        severity: 'medium',
      },
    ],

    targetUsers: {
      recommended: [
        '2~4인 가구 (14kg이면 하루 빨래를 한 번에)',
        '전기요금·옷감 손상이 걱정돼 저온 히트펌프 건조를 원하는 사용자',
        '20kg는 과하고 설치 공간이 넉넉지 않은 집',
      ],
      notRecommended: [
        '이불·대형 빨래를 자주 건조하는 대가족 (20kg RD20WSWHS 권장)',
        '건조 시간이 가장 짧은 모델만 찾는 사용자',
        '최저가 히터식만 고려하는 초가성비 구매자',
      ],
    },

    features: [
      '인버터 히트펌프 (저온 건조, 10년 무상 보증)',
      '트루스팀 (냄새·구김·알레르기 유발물질 제거)',
      '저온 건조로 옷감 수축·손상 최소화',
      '콘덴서 자동세척 + 2중 도어 필터',
      'ThinQ 앱 원격 제어·스마트 진단',
    ],

    priceAnalysis: {
      valueRating: 5,
      priceTier: 'mid',
      alternatives: ['samsung-grande-dryer-dv14'],
    },

    reviews: [
      {
        userType: '4인 가족',
        rating: 5,
        text: '히트펌프라 저온 건조로 옷감이 안 상하고 수건이 새것처럼 보송합니다.',
        pros: ['옷감 보호', '보송함'],
        cons: ['건조시간 김'],
      },
      {
        userType: '맞벌이 부부',
        rating: 4,
        text: '전기료가 생각보다 적게 나오고 대용량이라 이불도 잘 말려요.',
        pros: ['절전', '대용량'],
        cons: ['콘덴서 관리'],
      },
      {
        userType: '신혼부부',
        rating: 3,
        text: '성능은 만족인데 필터와 콘덴서를 자주 청소하지 않으면 건조가 오래 걸립니다.',
        pros: ['건조 성능'],
        cons: ['잦은 관리'],
      },
      {
        userType: '반려동물 가정',
        rating: 4,
        text: '강아지 털이 필터에 잘 모여 옷에 털이 줄었어요. 관리도 어렵지 않습니다.',
        pros: ['털 제거'],
        cons: ['설치 공간'],
      },
    ],

    purchaseLinks: [
      { store: 'LG전자 공식', url: '#', price: 950000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 790000 },
    ],

    similarProducts: ['lg-trom-obje-dryer-rd20wswhs', 'samsung-bespoke-grande-dv17a9720', 'samsung-grande-dryer-dv14'],
  },
  // === 정수기 ===
  {
    id: 'lg-puricare-water-purifier-objet',
    slug: 'lg-puricare-water-purifier-objet',
    brand: 'LG',
    name: '퓨리케어 오브제컬렉션 정수기 WD523ACB',
    modelNumber: 'WD523ACB',
    category: '정수기',
    image: '/images/appliances/lg/wd523as/main.webp',
    images: [],
    price: 1454000,
    description: "LG WD523ACB는 얼음 없이 냉·온·정수를 내는 폭 168mm 직수형 정수기입니다. 직수관 고온살균은 매주, 출수구 내부 UVnano 살균은 1시간마다 자동으로 돌지만, 출수구 고온살균은 설명서가 최소 3개월에 한 번 사용자가 버튼으로 실행하라고 안내하고, 필터 두 종도 사용자가 6·12개월마다 교체하는 절차가 실려 있습니다.",
    oneliner: "폭 168mm, 필터를 직접 교체할 수 있는 얼음 없는 냉·온·정수 직수 정수기",
    editorComment: 'WD523ACB의 정품 필터 자재비는 2026-10-01 정상가(중금속9 73,000원×2+바이러스 클리어 54,600원)로 연 200,600원이고, 에너지공단 신고 라벨의 연간에너지비용은 23,000원입니다. 유지비는 전기보다 필터·관리 계약이 좌우합니다. 구매가 1,454,000원에 필터 자재비를 더해 6년(72개월)으로 나누면 월 약 36,900원이므로, 구독 견적은 같은 기간의 월 청구액과 관리 범위로 이 값과 비교하세요.',
    status: 'featured',
    tags: ['LG', '퓨리케어', '오브제컬렉션', '정수기', '직수', '스테인리스', '자동살균', '냉온정'],

    specs: {
      powerConsumption: 2820, // 순간온수 유도가열 기준, LG 공식 사양
      energyEfficiency: 8,
      performance: 8,
      convenience: 9,
      durability: 9,
    },

    techSpecs: {
      coreTechnology: '직수관 고온살균(매주 자동) + 출수구 살균(수동) + 출수구 UVnano(제조사 표시)',
      filterType: '중금속9 흡착 필터 + 바이러스 클리어 필터',
      capacity: '냉수 직수식 순간 냉각 · 온수 순간 가열 · 정수 직수 · 얼음 없음',
      // LG 사양 표의 축 표기: 제품 크기 (WxHxD, mm) 168 x 398 x 400 (2026-10-08 확인)
      dimensions: '168 x 398 x 400mm',
      weight: 11.6,
      extraSpecs: [{ label: '월간 소비전력량(에너지공단 신고)', value: '12.17kWh' }],
    },

    roomFit: {
      // 정수기에는 평수 개념이 없다. 근거 없는 평수 칩을 비우면 화면에서 감춰진다.
      recommendedSize: [],
      coverageArea: 0,
      installationType: '직수형(카운터탑)',
      installationNote: '수도 분기 연결과 접지된 220V 전용 콘센트가 필요합니다. 공용 설명서는 전용 콘센트가 없으면 16A 이상 접지 멀티 콘센트에 이 제품만 꽂도록 하고, 수압 147~780kPa를 작동 조건으로 적습니다. LG 사양 표의 크기는 폭 168·높이 398·깊이 400mm이고, 제품 페이지는 설치 환경에 따라 가로·세로 설치를 고를 수 있으며 이후 변경은 유상이라고 안내합니다. 출수구 아래 컵 높이와 수도·전원 위치를 함께 재세요.',
    },

    targetUsers: {
      recommended: [
        '얼음 없이 냉·온·정수만 쓰는 가정',
        '필터를 직접 교체하려는 사용자(설명서 29쪽 교체 절차, LG 공식몰 정품 필터 판매)',
        '싱크대 옆 폭 20cm 안팎 자리에 둘 냉·온·정수기를 찾는 주방(본체 폭 168mm)',
        '오브제컬렉션 카밍 베이지 외관을 원하고 가로·세로 설치를 고르려는 주방',
      ],
      notRecommended: [
        '얼음이 필요한 가정',
        '역삼투압(RO) 방식이 꼭 필요한 사용자',
        "WQA 인증을 완제품 성능 근거로 찾는 사용자(LG가 밝힌 인증 대상은 적용 필터)",
      ],
    },

    features: [
      '스테인리스 직수관 · 직수관 고온살균 주 1회 자동(LG 사양 표)',
      '출수구 고온살균은 수동(설명서상 최소 3개월마다) · 출수구 내부 UVnano 1시간마다 10분 자동(제조사 표시)',
      '냉수 직수식 순간 냉각·온수 인덕션 순간 가열, 얼음 미지원',
      '오브제컬렉션 카밍 베이지 · 가로/세로 설치 선택(제품 페이지)',
      'LG ThinQ 스마트 진단(설명서 31~33쪽)',
    ],

    priceAnalysis: {
      msrp: 1454000,
      valueRating: 4,
      priceTier: 'premium',
      alternatives: ['coway-noble-water-purifier-chp'],
    },

    reviews: [
      {
        userType: '신혼부부',
        rating: 5,
        text: '오브제 색상이 주방과 잘 어울리고 직수형이라 위생 걱정이 덜해요. 냉온수 다 빠릅니다.',
        pros: ['디자인', '직수 위생'],
        cons: ['필터 교체 비용'],
      },
      {
        userType: '4인 가족',
        rating: 4,
        text: 'UV 살균에 코크가 자동으로 올라와 관리가 편합니다. 다만 얼음은 안 나와요.',
        pros: ['UV 살균', '자동 코크'],
        cons: ['얼음 미지원'],
      },
      {
        userType: '자취생',
        rating: 3,
        text: '물맛은 좋은데 렌탈과 필터 유지비가 꾸준히 들어 부담될 수 있어요.',
        pros: ['물맛'],
        cons: ['유지비'],
      },
      {
        userType: '반려동물 가정',
        rating: 4,
        text: '냉수가 시원하게 잘 나오고 직수라 탱크 세균 걱정이 없어 안심됩니다.',
        pros: ['시원한 냉수', '직수'],
        cons: ['온수 잠금 번거로움'],
      },
    ],

    purchaseLinks: [
      { store: 'LG전자 공식', url: '#', price: 990000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 890000 },
    ],

    similarProducts: ['coway-noble-water-purifier-chp', 'skmagic-allin-water-purifier-wpu', 'coway-handpick-water-purifier-compact'],
  },
  // === 로봇청소기 ===
  {
    id: 'lg-codezero-r5-robot',
    slug: 'lg-codezero-r5-robot',
    brand: 'LG',
    name: '코드제로 R5 오브제컬렉션 로봇청소기 RO585HGH',
    modelNumber: 'RO585HGH',
    category: '로봇청소기',
    image: '/images/appliances/lg/ro585hgh/main.webp',
    images: [],
    description: 'LG 코드제로 R5 RO585HGH는 라이다 주행으로 흡입과 물걸레 청소를 함께 하고, 올인원타워(202 × 480 × 233mm)에서 먼지를 자동으로 비웁니다. LG 라인업 비교표 기준 물걸레 자동 세척·건조와 자동 리프팅은 지원하지 않고, 문턱 등반은 최대 2cm입니다.',
    oneliner: '라이다 주행 + 흡입·물걸레 동시 청소 + 자동 먼지비움',
    editorComment: 'R5는 물걸레를 단 채 돌지만 LG 비교표상 자동 리프팅이 없어, 러그가 있는 방은 걸레를 떼거나 금지영역으로 빼야 합니다. 문턱 등반 최대 2cm와 걸레 손세탁 자리가 맞는지가 먼저이고, 폭 202mm의 좁은 올인원타워는 도크 자리가 좁은 집에서 이 모델을 고를 이유가 됩니다.',
    status: 'featured',
    tags: ['LG', '코드제로', '오브제컬렉션', '로봇청소기', '자동 먼지비움', '물걸레 동시 청소', '라이다'],

    specs: {
      energyEfficiency: 8,
      performance: 8,
      convenience: 9,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '라이다 주행 + 흡입·물걸레 동시 청소 + 자동 먼지비움',
      filterType: '먼지 필터(HEPA 등급은 정확한 모델 자료에서 미확인)',
      capacity: '먼지통 0.4L / 올인원타워 먼지봉투 2.0L',
      dimensions: '342 x 94.5 x 342mm',
      weight: 3.1,
    },

    roomFit: {
      // LG 공식 사양에 1회 충전 청소 면적이 없어 추천 평수를 두지 않는다(2026-10-08 확인).
      recommendedSize: [],
      installationType: '먼지 비움 충전대',
      installationNote: 'LG 공식 사양의 올인원타워는 202 × 480 × 233mm(폭×높이×깊이), 5.4kg입니다. 콘센트 옆에 폭 20cm 남짓만 비면 세울 수 있지만, 로봇이 드나들 앞쪽 거리는 공식 사양에서 확인하지 못했습니다. 최대 사용시간은 흡입 약 모드 140분, 터보 모드 60분이며 1회 충전 청소 면적은 공개되지 않아 추천 평수를 표시하지 않습니다.',
    },

    targetUsers: {
      recommended: [
        '먼지비움 자동화를 원하고 물걸레는 직접 세척할 수 있는 가정',
        '러그가 없거나 적어 물걸레를 단 채 대부분의 바닥을 돌릴 수 있는 집',
        '도크 자리가 좁아 폭 202mm 세로형 올인원타워가 맞는 집',
        'LG 씽큐 생태계와 오브제컬렉션 인테리어 통일을 원하는 가정',
      ],
      notRecommended: [
        "걸레 자동 세척·건조까지 한 도크에서 끝내려는 사용자",
        "물걸레 패드를 직접 세척·건조할 관리 동선을 마련하기 어려운 사용자",
        '2cm를 넘는 문턱 너머 방까지 맡기려는 집 (LG 비교표의 문턱 등반 최대 2cm)',
        '머리카락·털 엉킴을 줄이는 브러시가 필요한 집 (LG 비교표에서 R5는 엉킴 방지 브러시 미지원)',
      ],
    },

    features: [
      '라이다(LiDAR) 센서 기반 주행 + 자이로·적외선·가속도·낭떠러지 센서',
      '흡입·물걸레 동시 청소 (자동물공급시스템, 전자식 펌프)',
      '올인원타워 자동 먼지비움 (5분 이상 청소 후 복귀 시)',
      '스마트 터보 (먼지·구석·카펫 감지)',
      'LG ThinQ 앱: 스마트 원격제어·청소예약·마이존·청소 다이어리 (스마트 진단은 LG 로봇청소기 공통 FAQ 기준, 충전 중 사용)',
    ],

    priceAnalysis: {
      valueRating: 3,
      priceTier: 'premium',
      alternatives: ['samsung-bespoke-jetbot-ai'],
    },

    reviews: [],

    purchaseLinks: [
      { store: 'LG전자 공식', url: '#', price: 1490000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 1290000 },
    ],

    similarProducts: ['roborock-s8-proultra', 'samsung-bespoke-jetbot-ai', 'xiaomi-robot-vacuum-x10'],
  },
  // === 냉장고 (양문형) ===
  {
    id: 'lg-dios-obje-sxs-s834',
    slug: 'lg-dios-obje-sxs-s834',
    brand: 'LG',
    name: '디오스 오브제컬렉션 베이직 양문형 S834MWW1D',
    modelNumber: 'S834MWW1D',
    category: '냉장고',
    image: '/images/appliances/lg/s834mww10/main.webp',
    images: [],
    description: 'LG 디오스 오브제컬렉션 베이직 양문형 냉장고. 832L(냉장 524L·냉동 308L), 인버터 컴프레서, 2등급 효율. LG 공식 사양에서 노크온과 매직스페이스는 미지원입니다.',
    oneliner: '832L 양문형 + 인버터 컴프레서, 2등급 오브제컬렉션 베이직',
    editorComment: '832L 양문형 S834MWW1D는 냉동 308L로 같은 회사 4도어 T873(367L)보다 59L 작고, 무게는 119kg으로 27kg 가볍습니다. 양문을 끝까지 열면 뒷면부터 1,358mm가 필요해 T873보다 앞쪽 공간을 65mm 더 씁니다. 36dB는 LG 사양값이며 소음을 공개하지 않은 모델과 순위를 매기지 않습니다.',
    status: 'new',
    tags: ['LG', '디오스', '오브제컬렉션', '냉장고', '양문형', '832L', '인버터', '2등급'],

    specs: {
      noise: 36, // LG 공식 사양 표기
      energyEfficiency: 9,
      performance: 9,
      convenience: 9,
      durability: 9,
    },

    techSpecs: {
      coreTechnology: '인버터 컴프레서 + 정온기능',
      filterType: '탈취 필터',
      refrigerant: 'R600a',
      capacity: '832L (냉장 524·냉동 308L)',
      dimensions: '913 x 1790 x 913mm',
      weight: 119,
      // 공식 사양 기준 2등급. 카탈로그의 1등급 표기를 바로잡았다.
      energyGrade: '2등급',
    },

    // 냉장고에는 평형 개념이 없어 추천 평수를 비운다. 이격·문 열림 치수는 지원 페이지가 연결한
    // 공용 설명서 인쇄 21쪽(치수표 913×1,790×913mm)과 25·27쪽(고장 진단)에서 옮겼다.
    roomFit: {
      recommendedSize: [],
      installationType: '양문형 (프리스탠딩)',
      installationNote: 'LG 공용 설명서 기준 후면 벽과 10cm 이상, 문 위쪽과 냉장고 설치장 사이 2.5cm 이상을 두고, 고장 진단 쪽은 천장·좌우 벽에서 10cm 이상 띄우라고 안내합니다. 양문을 끝까지 열면 폭 1,635mm, 뒷면부터 깊이 1,358mm가 필요합니다.',
    },

    targetUsers: {
      recommended: [
        '냉동식품을 세로로 긴 칸에 세워 보관하려는 가정 (냉동 308L)',
        '정온기능을 원하는 사용자',
        '노크온·매직스페이스 없이 좌우 칸 구조로 수납하려는 사용자',
        '반입 무게를 줄여야 하는 집 (119kg, 같은 회사 4도어 T873은 146kg)',
      ],
      notRecommended: [
        '냉동 전용 용량이 우선인 가정 (냉동 308L, 4도어 T873은 367L)',
        '문 앞 공간이 뒷면부터 1,358mm에 못 미치는 주방 (양문을 끝까지 열 때)',
        '자동 제빙이 필요한 가정 (오토 아이스메이커 X, 무빙 도어 아이스메이커 O)',
      ],
    },

    features: [
      '832L = 냉장 524L + 냉동 308L',
      '정온기능 (LG 공식 사양 O)',
      '인버터 컴프레서 · 2등급 · 52.3kWh/월 (LG 사양)',
      '무빙 도어 아이스메이커 (오토 아이스메이커 X)',
      'ThinQ(Wi-Fi) · 스마트 진단 지원',
    ],

    priceAnalysis: {
      valueRating: 4,
      priceTier: 'premium',
      alternatives: ['samsung-bespoke-sxs-rs84', 'lg-dios-obje-4door-t873'],
    },

    reviews: [],

    purchaseLinks: [
      { store: 'LG전자 공식', url: '#', price: 2490000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 2090000 },
    ],

    similarProducts: ['samsung-bespoke-sxs-rs84', 'lg-dios-obje-4door-t873', 'samsung-bespoke-4door-rf85'],
  },
  // === 세탁기 (통돌이) ===
  {
    id: 'lg-tongdolyi-washer-tr25',
    slug: 'lg-tongdolyi-washer-tr25',
    brand: 'LG',
    name: '통돌이 세탁기 25kg TR25',
    modelNumber: 'TR25WK1',
    category: '세탁기',
    image: '/images/appliances/lg/tr25wk1/main.webp',
    images: [],
    description: 'LG 통돌이(전자동) 세탁기 25kg. 인버터 DD모터와 6모션으로 강력 세탁, 허리 굽힘이 적고 사용이 간편한 대용량 탑로드.',
    oneliner: '인버터 DD모터 + 6모션, 25kg 대용량 통돌이',
    editorComment: 'LG 통돌이 세탁기의 대용량 모델입니다. 드럼 대비 세탁 시간이 짧고 도중 세탁물 추가가 쉬우며, 위에서 넣는 구조라 허리 부담이 적어 어르신·임산부가 있는 가정에서 선호합니다. 인버터 DD모터로 진동·소음을 줄였고 10년 모터 보증으로 내구성도 챙겼습니다. 25kg 대용량이라 이불·작업복 등 부피 큰 빨래에 여유가 있습니다. 다만 통돌이 특성상 옷감 엉킴·마모는 드럼보다 큰 편이고 물 사용량이 많으며, 같은 LG 트롬 드럼(FW25)보다 세탁 품질·건조 연계는 한 수 아래입니다. 건조기를 따로 두고 세탁만 빠르고 간편하게 끝내려는 가정에 잘 맞는 가성비 선택입니다.',
    status: 'new',
    tags: ['LG', '통돌이', '세탁기', '25kg', '탑로드', 'DD모터', '6모션', '대용량'],

    specs: {
      energyEfficiency: 7,
      performance: 8,
      convenience: 7,
      durability: 9,
    },

    techSpecs: {
      coreTechnology: '인버터 DD모터 + 6모션 DD',
      filterType: '자동 린트(보풀) 필터',
      capacity: '25kg',
      energyGrade: '2등급',
    },

    roomFit: {
      recommendedSize: ['중형', '대형', '초대형'],
      coverageArea: 0,
      installationType: '통돌이(탑로드)',
      installationNote: '급수/배수 연결 필요. 상부 도어 개방을 위해 위쪽 공간 확보 (상단 선반·수납장 주의)',
    },

    errorCodes: [
      {
        code: 'IE',
        description: '급수 이상',
        cause: '수도 잠김 또는 급수필터 막힘',
        solution: '수도와 급수필터를 점검하세요',
        severity: 'medium',
      },
      {
        code: 'OE',
        description: '배수 이상',
        cause: '배수 호스 꺾임 또는 거름망 막힘',
        solution: '배수 거름망을 청소하고 호스를 펴 주세요',
        severity: 'medium',
      },
      {
        code: 'UE',
        description: '세탁물 편심',
        cause: '빨래가 한쪽으로 쏠림',
        solution: '빨래를 고르게 펴고 다시 탈수하세요',
        severity: 'low',
      },
      {
        code: 'PE',
        description: '수위센서 이상',
        cause: '수위센서 오류',
        solution: '전원을 재투입하세요. 지속되면 LG전자 서비스센터(1544-7777)',
        severity: 'medium',
      },
      {
        code: 'tE',
        description: '모터 과열',
        cause: '모터 과열 또는 센서 이상',
        solution: 'LG전자 서비스센터(1544-7777)에 점검을 문의하세요',
        severity: 'high',
      },
    ],

    targetUsers: {
      recommended: [
        '세탁을 빠르고 간편하게 끝내고 싶은 가정',
        '허리 굽힘이 적은 탑로드를 선호하는 어르신·임산부 가정',
        '이불·작업복 등 부피 큰 빨래가 잦은 대가족',
        '건조기를 따로 두고 세탁기는 가성비로 가려는 사용자',
      ],
      notRecommended: [
        '옷감 손상·엉킴을 최소화하고 싶은 사용자 (드럼 권장)',
        '세탁기 위에 건조기를 스태킹하려는 경우 (탑로드는 불가)',
        '물·전기 사용량을 최소화하려는 사용자',
      ],
    },

    features: [
      '25kg 대용량 탑로드',
      '인버터 DD모터 (저진동·저소음, 10년 보증)',
      '6모션 DD 세탁 (두드림·비빔·주무름 등)',
      '소프트 클로징 도어 + 통살균 코스',
      'LG 씽큐 앱 원격 제어·스마트 진단',
    ],

    priceAnalysis: {
      valueRating: 4,
      priceTier: 'mid',
      alternatives: ['samsung-bubblewash-top-wa16', 'lg-trom-obje-fw25eswhs'],
    },

    reviews: [
      {
        userType: '대가족 주부',
        rating: 5,
        text: '25kg라 이불 빨래가 한 번에 되고 인버터DD라 조용하면서 힘이 좋아요.',
        pros: ['대용량', '저소음 모터'],
        cons: ['높이 있음'],
      },
      {
        userType: '자취생',
        rating: 4,
        text: '통돌이라 조작이 단순하고 빨래 시간이 짧아 좋습니다.',
        pros: ['간편 조작', '빠른 세탁'],
        cons: ['탈수 진동'],
      },
      {
        userType: '1인 가구',
        rating: 3,
        text: '용량이 커서 혼자 살기엔 과하고 키가 작으면 바닥 빨래 꺼내기가 힘들어요.',
        pros: ['세탁력'],
        cons: ['과한 용량', '깊은 통'],
      },
      {
        userType: '아이 둘 가정',
        rating: 4,
        text: '삶음과 통세척이 잘 돼서 위생적으로 쓰고 있어요. 물은 드럼보다 많이 씁니다.',
        pros: ['삶음/통세척'],
        cons: ['물 사용량'],
      },
    ],

    purchaseLinks: [
      { store: 'LG전자 공식', url: '#', price: 899000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 739000 },
    ],

    similarProducts: ['samsung-bubblewash-top-wa16', 'lg-trom-obje-fw25eswhs', 'samsung-bespoke-grande-wf24a9500'],
  },
  // === 건조기 (미니/벽걸이) ===
  {
    id: 'lg-trom-mini-dryer-3kg',
    slug: 'lg-trom-mini-dryer-3kg',
    brand: 'LG',
    name: '트롬 미니 건조기 3kg',
    modelNumber: 'RH3W',
    category: '건조기',
    image: '/images/appliances/lg/rh3w/main.webp',
    images: [],
    description: 'LG 트롬 미니 건조기 3kg. 벽걸이로 설치하는 듀얼 인버터 히트펌프 보조 건조기로, 메인 건조기와 별도로 속옷·아기옷·운동복을 분리 건조.',
    oneliner: '벽걸이 듀얼 히트펌프 3kg, 속옷·아기옷 분리 건조하는 미니 보조건조기',
    editorComment: 'LG 트롬 미니는 \'두 번째 건조기\' 콘셉트의 벽걸이 보조 건조기입니다. 듀얼 인버터 히트펌프로 저온 건조해 옷감 손상이 적고, 3kg 소용량이라 속옷·아기옷·수건·운동복처럼 위생적으로 따로 말리고 싶은 빨래를 메인 건조기와 분리해 돌릴 수 있습니다. 벽걸이라 바닥 공간을 차지하지 않고 세탁기 위 자투리 벽에 설치할 수 있는 게 핵심 강점입니다. 다만 3kg는 어디까지나 보조 용량이라 이불·대량 빨래는 불가하고, 메인 건조기 없이 이것만으로 온 가족 빨래를 감당하긴 어렵습니다. 영유아·반려동물 가정이나 위생 분리 건조 수요가 있는 집의 세컨 건조기로 적합합니다.',
    status: 'new',
    tags: ['LG', '트롬', '건조기', '미니', '벽걸이', '3kg', '히트펌프', '보조건조'],

    specs: {
      energyEfficiency: 8,
      performance: 7,
      convenience: 8,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '듀얼 인버터 히트펌프 (저온 건조)',
      filterType: '도어 보풀 필터 + 콘덴서 자동세척',
      capacity: '3kg',
      energyGrade: '1등급',
    },

    roomFit: {
      recommendedSize: ['원룸', '소형'],
      coverageArea: 0,
      installationType: '벽걸이형',
      installationNote: '전용 벽걸이 브래킷으로 콘크리트 등 견고한 벽면에 고정 필요(석고보드 단독 설치 불가). 응축수 물통 비움 또는 직배수 연결, 별도 전원 콘센트 필요',
    },

    errorCodes: [
      {
        code: 'tE',
        description: '온도센서 이상',
        cause: '온도센서 접촉 불량',
        solution: '전원을 재투입하세요. 지속되면 LG전자 서비스센터(1544-7777)',
        severity: 'medium',
      },
      {
        code: 'dE',
        description: '도어 열림',
        cause: '문이 덜 닫힘',
        solution: '문을 확실히 닫고 재시작하세요',
        severity: 'low',
      },
      {
        code: 'F1',
        description: '필터 막힘',
        cause: '보풀 누적',
        solution: '필터를 청소하세요',
        severity: 'low',
      },
      {
        code: 'OE',
        description: '응축수 배수 이상',
        cause: '물통 가득 참 또는 배수 막힘',
        solution: '물통을 비우거나 배수를 점검하세요',
        severity: 'medium',
      },
      {
        code: 'CE',
        description: '모터 과부하',
        cause: '통풍 불량 또는 과열',
        solution: '통풍구를 확보하고 재가동하세요. 반복되면 LG전자 서비스센터(1544-7777)',
        severity: 'high',
      },
    ],

    targetUsers: {
      recommended: [
        '속옷·아기옷·운동복을 위생적으로 분리 건조하려는 가정',
        '메인 건조기를 둔 채 세컨 건조기를 추가하려는 사용자',
        '바닥 공간이 부족해 벽걸이 설치를 원하는 원룸·소형 주거',
        '영유아·반려동물이 있어 소량 건조가 잦은 가정',
      ],
      notRecommended: [
        '이불·대량 빨래를 한 번에 말려야 하는 가정 (메인 건조기 필요)',
        '이 한 대로 온 가족 빨래를 모두 감당하려는 사용자',
        '석고보드 벽 등 벽걸이 고정이 어려운 설치 환경',
      ],
    },

    features: [
      '듀얼 인버터 히트펌프 (저온 건조, 옷감 보호)',
      '벽걸이 설치 (바닥 공간 절약)',
      '3kg 소용량 분리 건조 (속옷·아기옷·운동복)',
      '콘덴서 자동세척 + 도어 보풀 필터',
      'LG 씽큐 앱 원격 제어·스마트 진단',
    ],

    priceAnalysis: {
      valueRating: 4,
      priceTier: 'mid',
      alternatives: ['lg-trom-heatpump-dryer-rh14'],
    },

    reviews: [
      {
        userType: '4인 가족',
        rating: 5,
        text: '메인 건조기 위에 올려두고 속옷·수건만 따로 돌리니 분리 건조가 정말 편해요.',
        pros: ['분리 건조', '벽걸이 설치'],
        cons: ['소용량'],
      },
      {
        userType: '신혼부부',
        rating: 4,
        text: '아기 옷 소량만 빠르게 말릴 때 딱입니다. 다만 한 번에 많이는 못 넣어요.',
        pros: ['소량 신속'],
        cons: ['용량 제한'],
      },
      {
        userType: '자취생',
        rating: 3,
        text: '아이디어는 좋은데 3kg라 일반 빨래엔 부족하고 보조용으로만 쓰게 돼요.',
        pros: ['보조 건조'],
        cons: ['용량 부족'],
      },
      {
        userType: '반려동물 가정',
        rating: 4,
        text: '반려동물 담요나 작은 빨래 전용으로 쓰는데 털 제거가 잘 됩니다.',
        pros: ['털 제거'],
        cons: ['설치 위치 제약'],
      },
    ],

    purchaseLinks: [
      { store: 'LG전자 공식', url: '#', price: 690000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 590000 },
    ],

    similarProducts: ['lg-trom-heatpump-dryer-rh14', 'lg-trom-obje-dryer-rd20wswhs', 'samsung-inverter-heatpump-dryer-dv10'],
  },
  // === 식기세척기 (14인용) ===
  {
    id: 'lg-dios-dishwasher-steam-14',
    slug: 'lg-dios-dishwasher-steam-14',
    brand: 'LG',
    name: '디오스 오브제컬렉션 식기세척기 14인용 스팀',
    modelNumber: 'DUE14GW',
    category: '식기세척기',
    image: '/images/appliances/lg/due14gw/main.webp',
    images: [],
    description: 'LG 디오스 오브제컬렉션 14인용 빌트인 식기세척기. 트루스팀 스팀 살균과 쿼드워시 4방향 분사, 인버터 DD모터로 대용량을 꽉 채워도 고른 세척력을 내는 1등급 모델.',
    oneliner: '트루스팀 살균 + 쿼드워시, 14인용 빌트인 1등급 대용량',
    editorComment: 'LG 디오스 식기세척기의 14인용 대용량 라인입니다. 12인용 트루스팀(DT14)과 핵심 기능은 같지만 한 단계 큰 용량으로, 4인 이상 가족이나 손님 접대가 잦은 가정이 하루치 설거지를 한 번에 처리하기 좋습니다. 트루스팀이 고온 스팀으로 그릇을 예열·살균해 기름때·눌어붙은 음식물에 강하고, 쿼드워시 4방향 분사암이 사각지대를 줄여 가득 채워도 세척이 고릅니다. 세척 후 문이 자동으로 살짝 열려 잔열로 건조되는 자동 문열림은 위생과 절전에 모두 유리하고, 1등급 효율이라 유지비 부담도 낮습니다. 다만 14인용은 빌트인 폭·높이를 더 차지하고 예열·온수 헹굼 탓에 표준 코스가 2시간을 넘기니, 1~2인 가구라면 식탁형이 더 맞습니다.',
    status: 'new',
    tags: ['LG', '디오스', '오브제컬렉션', '식기세척기', '14인용', '빌트인', '트루스팀', '1등급'],

    specs: {
      energyEfficiency: 9,
      performance: 9,
      convenience: 9,
      durability: 9,
    },

    techSpecs: {
      coreTechnology: '트루스팀 스팀살균 + 쿼드워시 4방향 분사 + 인버터 DD모터',
      filterType: '3중 자가세정 필터',
      capacity: '14인용',
      energyGrade: '1등급',
    },

    roomFit: {
      recommendedSize: ['중형', '대형', '초대형'],
      coverageArea: 0,
      installationType: '빌트인',
      installationNote: '빌트인 폭 600mm 규격. 급수(냉수)·배수 연결과 별도 전원 콘센트 필요. 14인용은 높이 여유가 필요하니 싱크대 하부장 매립 공간과 도어 개방 공간, 배수 호스 높이를 확인하세요.',
    },

    errorCodes: [
      {
        code: 'IE',
        description: '급수 이상',
        cause: '수도 잠김 또는 급수필터 막힘',
        solution: '수도와 필터를 점검하세요',
        severity: 'medium',
      },
      {
        code: 'OE',
        description: '배수 이상',
        cause: '배수 호스 또는 거름망 막힘',
        solution: '거름망을 청소하세요',
        severity: 'medium',
      },
      {
        code: 'AE',
        description: '누수 감지',
        cause: '도어 패킹 또는 배관 누수',
        solution: '전원을 끄고 LG전자 서비스센터(1544-7777)에 점검을 요청하세요',
        severity: 'high',
      },
      {
        code: 'tE',
        description: '히터 온도 이상',
        cause: '히터 또는 센서 이상',
        solution: 'LG전자 서비스센터(1544-7777)에 점검을 문의하세요',
        severity: 'medium',
      },
      {
        code: 'FE',
        description: '과급수',
        cause: '급수밸브 오작동',
        solution: '전원을 재투입하세요. 반복되면 LG전자 서비스센터(1544-7777)',
        severity: 'medium',
      },
    ],

    targetUsers: {
      recommended: [
        '설거지량이 많은 4인 이상 가족·손님 접대가 잦은 가정',
        '빌트인 주방으로 깔끔한 매립 설치를 원하는 가정',
        '기름때·눌어붙은 그릇이 많아 고온 스팀 살균이 필요한 가정',
        '아이 식기·젖병 등 위생 살균을 중시하는 가정',
      ],
      notRecommended: [
        '1~2인 자취·신혼 가구 (식탁형이 적합, 오버스펙)',
        '빌트인 공간·높이나 급배수 설치가 어려운 환경',
        '한 사이클 2시간 넘는 긴 세척 시간을 감수하기 어려운 사용자',
      ],
    },

    features: [
      '트루스팀 스팀 살균 (고온 스팀으로 99.9% 위생 세척)',
      '쿼드워시 4방향 회전 분사암 (사각지대 최소화)',
      '14인용 대용량 (하루치 설거지 한 번에)',
      '인버터 DD모터 (저소음·저진동, 10년 무상 보증)',
      '자동 문열림 건조 + LG 씽큐 앱 원격 제어',
    ],

    priceAnalysis: {
      valueRating: 4,
      priceTier: 'premium',
      alternatives: ['lg-dios-dishwasher-truesteam-dt14', 'samsung-bespoke-dishwasher-dw60'],
    },

    reviews: [
      {
        userType: '4인 가족',
        rating: 5,
        text: '트루스팀으로 찌든 때가 불려져 잘 닦이고 14인용이라 냄비까지 한 번에 들어가요.',
        pros: ['스팀 세척', '대용량'],
        cons: ['코스 시간 김'],
      },
      {
        userType: '신혼부부',
        rating: 4,
        text: '건조가 깔끔하고 작동음이 적어 밤에 돌려도 괜찮습니다.',
        pros: ['건조', '저소음'],
        cons: ['전용세제 필요'],
      },
      {
        userType: '맞벌이 직장인',
        rating: 3,
        text: '세척력은 좋은데 빌트인 설치비와 본체 가격이 좀 부담됐어요.',
        pros: ['세척력'],
        cons: ['설치비', '가격'],
      },
      {
        userType: '주방 리모델링 가정',
        rating: 5,
        text: '디오스 패널이 주방과 잘 어울리고 위생 헹굼이 좋아 손설거지를 끊었습니다.',
        pros: ['디자인', '위생'],
        cons: ['설치 공간'],
      },
    ],

    purchaseLinks: [
      { store: 'LG전자 공식', url: '#', price: 1390000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 1090000 },
    ],

    similarProducts: ['lg-dios-dishwasher-truesteam-dt14', 'samsung-bespoke-dishwasher-dw60', 'cuckoo-dishwasher-builtin-12'],
  },
  // === 제습기 (20L) ===
  {
    id: 'lg-whisen-dehumidifier-20l',
    slug: 'lg-whisen-dehumidifier-20l',
    brand: 'LG',
    name: '휘센 제습기 20L',
    modelNumber: 'DQ20GPWHS',
    category: '제습기',
    image: '/images/appliances/lg/dq20gpwhs/main.webp',
    images: [],
    description: 'LG 휘센 제습기 20L. 인버터 컴프레서로 대용량 제습과 절전을 동시에 잡고, HEPA 공기청정을 겸한 1등급 모델.',
    oneliner: '20L 인버터 대용량 + 공기청정 겸용, 1등급 절전 제습기',
    editorComment: 'LG 휘센 제습기 라인업의 대용량 모델입니다. 20L/일 제습량으로 넓은 거실이나 지하·반지하처럼 습기가 심한 공간을 빠르게 잡고, 인버터 컴프레서라 정속형 대비 소음·전기요금이 낮고 1등급 효율을 받았습니다. HEPA 공기청정을 겸해 장마철엔 제습, 평소엔 미세먼지 제거로 사철 쓸 수 있는 2in1 구성이 강점입니다. 같은 LG 퓨리케어 16L(DQ16) 대비 제습 용량이 커 더 넓은 면적·심한 습기에 유리하지만 본체가 크고 가격이 높습니다. 16L로 부족한 넓은 거실·다습 환경에서 제습력과 절전을 모두 원하는 가정에 적합하며, 좁은 방 한 칸이면 16L급이 더 합리적입니다.',
    status: 'new',
    tags: ['LG', '휘센', '제습기', '20L', '인버터', '공기청정', '2in1', '1등급'],

    specs: {
      energyEfficiency: 9,
      performance: 10,
      convenience: 9,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '인버터 컴프레서 제습 + HEPA 공기청정',
      filterType: '360도 HEPA 필터 + 프리필터',
      capacity: '20L/일',
      energyGrade: '1등급',
    },

    roomFit: {
      recommendedSize: ['중형', '대형', '초대형'],
      coverageArea: 80,
      installationType: '이동식',
      installationNote: '배수 호스 연결 시 연속 배수 가능. 물통 만수 시 안전 자동정지. 이동 손잡이·바퀴 내장',
    },

    errorCodes: [
      {
        code: 'CH',
        description: '자동 제상 동작',
        cause: '저온 환경에서 증발기 제상 동작',
        solution: '실내온도를 18도 이상으로 올린 뒤 재가동하세요',
        severity: 'low',
      },
      {
        code: 'E1',
        description: '습도센서 이상',
        cause: '습도센서 접촉 불량',
        solution: '전원을 재투입하세요. 지속되면 LG전자 서비스센터(1544-7777)',
        severity: 'medium',
      },
      {
        code: 'E4',
        description: '압축기 보호 정지',
        cause: '연속운전 과열 보호',
        solution: '30분 후 재가동하세요. 반복되면 LG전자 서비스센터(1544-7777)',
        severity: 'high',
      },
      {
        code: 'FL',
        description: '물통 만수',
        cause: '물통이 가득 참',
        solution: '물통을 비우거나 연속배수 호스를 연결하세요',
        severity: 'low',
      },
      {
        code: 'CL',
        description: '필터 청소 알림',
        cause: '필터 오염',
        solution: '필터를 청소한 뒤 알림을 리셋하세요',
        severity: 'low',
      },
    ],

    targetUsers: {
      recommended: [
        '넓은 거실·다습 공간에 대용량 제습이 필요한 가정',
        '지하·반지하 등 습기·곰팡이가 심한 환경의 거주자',
        '제습기와 공기청정기를 한 대로 해결하고 싶은 사용자',
        '인버터 절전·저소음과 1등급 효율을 중시하는 가정',
      ],
      notRecommended: [
        '좁은 방 한 칸만 쓰는 사용자 (16L급이 합리적)',
        '본체 크기·무게가 부담스러운 좁은 주거',
        '초저가 제습기만 찾는 가성비 우선 소비자',
      ],
    },

    features: [
      '20L/일 인버터 대용량 제습',
      'HEPA 공기청정 겸용 (사철 2in1)',
      '1등급 에너지효율 (인버터 절전)',
      '연속배수 + 만수 안전 자동정지',
      'LG 씽큐 앱 원격 제어·습도 모니터링',
    ],

    priceAnalysis: {
      valueRating: 4,
      priceTier: 'premium',
      alternatives: ['lg-puricare-dehumidifier-dq16sdwhs', 'samsung-bespoke-dehumidifier-dg16a7500'],
    },

    reviews: [
      {
        userType: '대가족 주부',
        rating: 5,
        text: '20L라 장마철 거실 습기를 금방 잡아주고 공기청정 겸용이라 일석이조예요.',
        pros: ['강력 제습', '공청 겸용'],
        cons: ['크고 무거움'],
      },
      {
        userType: '실내건조 가정',
        rating: 4,
        text: '빨래 건조 모드로 실내 건조가 빨라졌어요. 다만 작동음이 좀 있습니다.',
        pros: ['빨래 건조'],
        cons: ['작동 소음'],
      },
      {
        userType: '자취생',
        rating: 3,
        text: '성능은 확실한데 원룸엔 용량이 과하고 자리를 많이 차지해요.',
        pros: ['제습력'],
        cons: ['과한 용량', '부피'],
      },
      {
        userType: '반려동물 가정',
        rating: 4,
        text: '인버터라 24시간 켜둬도 전기료 부담이 적고 습도 유지가 잘 됩니다.',
        pros: ['인버터 절전', '습도 유지'],
        cons: ['물통 비우기 잦음'],
      },
    ],

    purchaseLinks: [
      { store: 'LG전자 공식', url: '#', price: 749000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 629000 },
    ],

    similarProducts: ['lg-puricare-dehumidifier-dq16sdwhs', 'samsung-bespoke-dehumidifier-dg16a7500', 'coway-inverter-dehumidifier-16l'],
  },

  // === TV (이동식·라이프스타일) ===
  {
    id: 'lg-standbyme2',
    slug: 'lg-standbyme2',
    brand: 'LG',
    name: '스탠바이미 2',
    modelNumber: '27LX6TPGA',
    category: 'TV',
    image: '/images/appliances/lg/27lx6tpga/main.webp',
    images: [],
    price: 995360,
    description:
      'LG 스탠바이미 2(27LX6TPGA). 4.3kg 화면을 원터치로 분리해 옮길 수 있는 27인치 QHD 무선 이동식 TV로, 무빙휠 스탠드·풀터치 스크린·세로 모드를 지원한다.',
    oneliner: '분리형 27형 QHD 무선 이동식 TV',
    editorComment:
      '바퀴 스탠드(전체 15.2kg)로 방을 옮기고 필요할 때 4.3kg 화면만 떼는 구조입니다. 떼어 낸 화면을 세울 받침·커버는 별매이고, 스탠드 자동 충전은 스탠드에 전원선이 꽂혀 있을 때만 됩니다. 떼어 쓰는 중 충전에는 65W 이상 USB-C 어댑터나 보조배터리가 필요합니다.',
    status: 'featured',
    tags: ['LG', '스탠바이미', '이동식TV', '무선TV', 'QHD', 'webOS', '라이프스타일', '세로모드'],

    specs: {
      noise: 5,
      energyEfficiency: 7,
      performance: 5,
      convenience: 9,
      durability: 7,
    },

    techSpecs: {
      coreTechnology: '27형(68cm) LED · 알파8 AI 프로세서',
      capacity: '27인치 QHD (2560×1440)',
      extraSpecs: [
        { label: '해상도', value: 'QHD 2560×1440' },
        { label: '주사율', value: '60Hz' },
        { label: 'HDR', value: '돌비 비전 · HDR10 · HLG' },
        { label: '스마트OS', value: 'webOS 24' },
        { label: '배터리', value: '85.15Wh(설명서 정격 15.52V·5,486mAh) · 무선 최대 4시간(에코화면·절전 모드, 볼륨 30)' },
        { label: '충전', value: '스탠드(전원선 연결 시) · USB-C 65W 이상(권장 86W) · 완충 대기 약 3시간·동작 중 약 3시간 30분' },
        { label: '스피커', value: '10W · 2.0ch' },
        { label: '스탠드 포함 무게', value: '15.2kg' },
        { label: '화면 무게(스탠드 제외)', value: '4.3kg' },
        { label: '크기(스탠드 포함)', value: '623 x 1,265 x 398mm(세로 회전 시 높이 1,396mm) · 스탠드 바닥 398 x 398mm' },
        { label: '특징', value: '화면 원터치 분리 · 풀터치 스크린 · 높이 조절(범위 미표기) · 로테이팅 ±90°·틸팅 ±25°·스위블 ±90°' },
        { label: '무선', value: 'Wi-Fi 5 · 블루투스 5.1' },
        { label: '보증', value: '품질 보증 1년(배터리 6개월) · 핵심 부품 2년' },
      ],
    },

    targetUsers: {
      recommended: [
        '같은 층 안에서 바퀴로 옮기다 필요할 때 4.3kg 화면만 떼어 쓰려는 사용자',
        '세로로 돌려 숏폼·웹툰을 보려는 사용자(아이폰 AirPlay는 세로에서 양쪽이 검게 나온다고 LG 안내)',
        '벽 타공 없이 398 x 398mm 바닥 자리에 세워 두려는 사용자',
      ],
      notRecommended: [
        '콘솔의 120Hz 출력을 쓰려는 사용자(60Hz)',
        '분리 화면 거치·보호까지 본체 가격 안에서 해결하려는 사용자(원클릭 스탠드·폴리오 커버 별매)',
        "밝은 야외에서의 시인성 확인이 구매 조건인 사용자",
      ],
    },

    features: [
      '원클릭 버튼으로 4.3kg 화면 분리(분리 화면 받침·커버는 별매)',
      'QHD 해상도 · 알파8 AI 프로세서',
      'webOS 24 · 풀터치 스크린 · AirPlay·Google Cast',
      '무빙휠 스탠드 · 높이 조절 · 로테이팅 ±90°·틸팅 ±25°·스위블 ±90°',
      '85.15Wh 내장 배터리(설명서 정격) · 무선 최대 4시간(에코화면·절전 모드, 볼륨 30 조건)',
    ],

    priceAnalysis: {
      msrp: 995360,
      valueRating: 3,
      priceTier: 'premium',
      alternatives: ['lg-standbyme2-max', 'samsung-the-movingstyle'],
    },

    reviews: [
      {
        userType: '원룸 자취 직장인',
        rating: 5,
        text: '침대에서 세로로 눕혀 유튜브·웹툰 보다가, 주방으로 끌고 가서 요리하며 보고… 무선이라 진짜 자유로워요. QHD라 화질도 깔끔합니다.',
        pros: ['이동성', '세로 모드', 'QHD 화질'],
        cons: ['비싼 가격'],
      },
      {
        userType: '가전 비교 좋아하는 30대',
        rating: 4,
        text: 'webOS 앱이 많아 세컨드 TV로 손색없습니다. 다만 60Hz라 게임엔 아쉽고, 밝은 낮 거실에선 반사가 좀 있어요.',
        pros: ['풍부한 스마트 기능', '무선 편의'],
        cons: ['60Hz 주사율', '야외 시인성'],
        source: '다나와 사용기·전문 리뷰 종합',
        sourceUrl: 'https://prod.danawa.com/info/?pcode=75537515',
      },
      {
        userType: '해외 커뮤니티 실사용자',
        rating: 4,
        text: '최대 밝기로 쓰면 배터리가 3시간 20분 정도로 공칭 4시간보다 짧지만, 드라마 몇 편이나 영화 1~2편은 충분하다는 실측 후기입니다. 조립·설정이 쉽고 방에서 방으로 굴려 다니는 활용에는 만족도가 높습니다. 해외에선 정가 대비 30% 안팎 할인도 자주 등장합니다.',
        pros: ['간편한 설치·이동', '할인 빈도 증가'],
        cons: ['최대 밝기 시 배터리 3시간대'],
        source: 'Reddit r/StanbyME 사용기 종합(LG 체험단 고지 포함)',
        sourceUrl: 'https://www.reddit.com/r/StanbyME/comments/1uwys7r/my_honest_take_on_the_lg_stanbyme_2_wireless_tv/',
      },
      {
        userType: '무빙스타일과 비교한 구매자',
        rating: 4,
        text: '국내 비교 리뷰의 결론은 대체로 일치합니다. 게임·스포츠 등 120Hz가 필요하면 무빙스타일, 돌비비전 화질·1시간 더 긴 배터리·화면만 분리해 쓰는 활용이 중요하면 스탠바이미2입니다. 유튜브 비교 영상들이 화제가 될 만큼 양강 구도가 뚜렷해요.',
        pros: ['돌비비전', '배터리 4시간', '화면 분리'],
        cons: ['60Hz(경쟁작은 120Hz)'],
        source: '다나와 DPG·유튜브 비교 리뷰 종합',
        sourceUrl: 'https://dpg.danawa.com/news/view?boardSeq=63&listSeq=5942825',
      },
    ],

    purchaseLinks: [
      { store: 'LG전자 공식', url: '#', price: 950000, isOfficial: true },
      { store: '쿠팡', url: 'https://link.coupang.com/a/g88Wksd8YS' },
    ],

    similarProducts: ['lg-standbyme2-max', 'lg-standbyme-go', 'samsung-the-movingstyle'],
  },
  {
    id: 'lg-standbyme2-max',
    slug: 'lg-standbyme2-max',
    brand: 'LG',
    name: '스탠바이미 2 Max',
    modelNumber: '32LX6BPGA',
    category: 'TV',
    image: '/images/appliances/lg/32lx6bpga/main.webp',
    images: [],
    price: 1294110,
    description:
      'LG 스탠바이미 2 Max(32LX6BPGA)는 32인치 4K 이동식 TV입니다. 최대 배터리 안내는 4시간 30분이며 버추얼 11.1.2는 AI 음향 처리 채널입니다.',
    oneliner: '32형 4K 이동형 무선 TV',
    editorComment:
      '32형(79cm) 4K 화면은 떼면 5.6kg, 스탠드까지 20.3kg입니다. 스피커는 스탠바이미 2와 같은 10W·2.0ch이고 버추얼 11.1.2는 가상 처리 이름입니다. 떼어 쓰는 중 USB-C로 충전하려면 100W 이상(권장 140W) 어댑터나 보조배터리가 필요해 27형보다 충전 장비 기준이 높습니다.',
    status: 'new',
    tags: ['LG', '스탠바이미', '스탠바이미2Max', '이동식TV', '4K', 'webOS', '돌비애트모스', '라이프스타일'],

    specs: {
      noise: 5,
      energyEfficiency: 8,
      performance: 5,
      convenience: 9,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '32형(79cm) 4K LED · 알파8 AI 프로세서 Gen3',
      capacity: '32인치 4K UHD (3840×2160)',
      extraSpecs: [
        { label: '해상도', value: '4K UHD 3840×2160' },
        { label: '주사율', value: '60Hz (ALLM·HGIG 지원, 돌비 비전 게이밍 최대 60Hz)' },
        { label: 'HDR', value: '돌비 비전 · HDR10 · HLG' },
        { label: '스마트OS', value: 'webOS 26' },
        { label: '스피커', value: '10W · 2.0ch' },
        { label: '배터리', value: '144Wh(설명서 정격 15.52V·9,279mAh) · 무선 최대 4시간 30분(출하모드 ECO, 볼륨 30)' },
        { label: '충전', value: '스탠드(전원선 연결 시) · USB-C 100W 이상(권장 140W) · 완충 대기 약 3시간·동작 중 약 3시간 30분' },
        { label: '음향 처리', value: 'AI 버추얼 11.1.2(가상 채널) · 돌비 애트모스' },
        { label: '스탠드 포함 무게', value: '20.3kg' },
        { label: '화면 무게(스탠드 제외)', value: '5.6kg' },
        { label: '크기(스탠드 포함)', value: '724 x 1,308 x 420mm(세로 회전 시 높이 1,461mm) · 스탠드 바닥 420 x 420mm' },
        { label: '특징', value: '화면 원터치 분리 · 풀터치 스크린 · 높이 조절(범위 미표기) · 로테이팅 ±90°·틸팅 ±25°·스위블 ±90°' },
        { label: '무선', value: 'Wi-Fi 6E · 블루투스 5.3' },
        { label: '보증', value: '품질 보증 1년(배터리 6개월) · 핵심 부품 2년' },
      ],
    },

    targetUsers: {
      recommended: [
        '79cm(32형) 4K 화면을 바퀴 스탠드로 방 사이에서 옮기며 보려는 사용자',
        'Wi-Fi 6E·블루투스 5.3·USB-C 4포트가 필요한 사용자',
        '네 이동식 모델 중 가장 큰 배터리(144Wh, 최대 4시간 30분)가 필요한 사용자',
      ],
      notRecommended: [
        '예산이 빠듯한 사용자 (이 카탈로그에서 가장 비싼 이동식 TV)',
        '화면만 떼어 자주 들고 다니려는 사용자(5.6kg)',
        '콘솔의 120Hz 출력을 쓰려는 사용자(60Hz)',
      ],
    },

    features: [
      '32인치 4K 화면 · 알파8 AI 프로세서 Gen3 · AI 4K 업스케일링',
      'AI 버추얼 11.1.2 음향 처리 · 돌비 애트모스(실제 스피커 10W·2.0ch)',
      '144Wh 배터리로 무선 최대 4시간 30분',
      '풀터치 스크린 · 높이 조절 · 로테이팅 ±90°·틸팅 ±25°·스위블 ±90°',
      'LG 갤러리 플러스 · LG 채널 등 콘텐츠 지원',
    ],

    priceAnalysis: {
      msrp: 1294110,
      valueRating: 3,
      priceTier: 'luxury',
      alternatives: ['lg-standbyme2', 'samsung-the-movingstyle'],
    },

    reviews: [
      {
        userType: '거실 세컨드 TV로 구매한 30대',
        rating: 5,
        text: '32인치 4K로 오니 확실히 화면이 시원합니다. 내장 스피커도 웬만한 사운드바 없이 쓸 만해요. 배터리도 늘어서 베란다·안방 오가며 잘 씁니다.',
        pros: ['4K 대화면', '내장 사운드', '배터리 시간'],
        cons: ['무거운 무게'],
      },
      {
        userType: '가격 고민하는 예비 구매자',
        rating: 4,
        text: '화질·사운드는 최고인데 159만원은 부담이네요. 60Hz라 콘솔 게임엔 아쉽고, 스탠드까지 20kg이라 진짜 자주 옮길 사람은 각오해야 합니다.',
        pros: ['화질', '입체음향'],
        cons: ['비싼 가격', '60Hz', '무게'],
        source: '다나와·머니투데이 등 출시 기사 종합',
        sourceUrl: 'https://prod.danawa.com/info/?pcode=122632760',
      },
      {
        userType: '구매 가치 따지는 예비 구매자',
        rating: 4,
        text: '"크기·화질 한계를 넘었다"는 호평과 함께, 충동구매로는 본전을 뽑기 어려운 가격이니 침대·주방·서재를 실제로 옮겨 다니며 볼 사람인지부터 따져보라는 게 국내 기획 리뷰들의 공통 조언입니다. 27형 QHD 기본형과의 가격 차이만큼 4K 대화면을 쓸 일이 있는지가 관건입니다.',
        pros: ['시리즈 최상위 화질·사운드'],
        cons: ['용도 불분명하면 과소비 위험'],
        source: '다나와·블로터 기획 리뷰 종합',
        sourceUrl: 'https://v.daum.net/v/phAORJA85A',
      },
    ],

    purchaseLinks: [
      { store: 'LG전자 공식', url: '#', price: 1590000, isOfficial: true },
      { store: '쿠팡', url: 'https://link.coupang.com/a/g88WpqCbtI' },
    ],

    similarProducts: ['lg-standbyme2', 'lg-standbyme-go', 'samsung-the-movingstyle'],
  },
  {
    id: 'lg-standbyme-go',
    slug: 'lg-standbyme-go',
    brand: 'LG',
    name: '스탠바이미 Go',
    modelNumber: '27LX5QKNA',
    category: 'TV',
    image: '/images/appliances/lg/27lx5qkna/main.webp',
    images: [],
    price: 894550,
    description:
      'LG 스탠바이미 Go(27LX5QKNA)는 케이스에 27인치 FHD 화면을 담은 이동식 TV입니다. 무게·전원·사용 환경을 확인해야 하며 방수 제품으로 가정하지 않습니다.',
    oneliner: '케이스형 27형 무선 포터블 TV',
    editorComment:
      '케이스를 닫으면 670 x 119 x 433mm·12.7kg 한 덩어리로 차에 실립니다. 최대 3시간은 저전력·에코 모드, 볼륨 30 조건의 값이고 방수는 지원하지 않습니다. LG 공식 페이지가 단종으로 표시하는 모델이라(2026-10-08 확인) 재고품을 산다면, 설명서상 보증(1년, 배터리 6개월)이 구입일부터 계산되도록 구입 일자가 찍힌 영수증을 남기세요.',
    status: 'featured',
    tags: ['LG', '스탠바이미Go', '포터블TV', '무선TV', 'FHD', '캠핑', '차박', '케이스형'],

    specs: {
      noise: 6,
      energyEfficiency: 6,
      performance: 5,
      convenience: 7,
      durability: 7,
    },

    techSpecs: {
      coreTechnology: '27형(68cm) LED · 5세대 인공지능 알파7 · webOS 22',
      capacity: '27인치 FHD (1920×1080)',
      extraSpecs: [
        { label: '해상도', value: 'FHD 1920×1080' },
        { label: '주사율', value: '60Hz (HGiG 지원)' },
        { label: 'HDR', value: '돌비 비전 · HDR10 · HLG' },
        { label: '스마트OS', value: 'webOS 22' },
        { label: '배터리', value: '74Wh(설명서 정격 14.8V·5,000mAh) · 무선 최대 3시간(저전력·에코 모드, 볼륨 30)' },
        { label: '충전', value: '전원 코드 연결 시 충전 · 완충 대기 약 3시간·동작 중 약 4시간 · 0℃ 이하에서는 충전이 안 될 수 있음' },
        { label: '스피커', value: '20W · 4.0ch (버추얼 5.1.2)' },
        { label: '케이스', value: '캐리백 일체형 · 12.7kg · 닫았을 때 670 x 119 x 433mm' },
        { label: '조작', value: '터치스크린(앱별 지원 상이, 미지원 앱은 리모컨)' },
        { label: '특징', value: '가로·세로·테이블 모드 · 로테이팅 90°·틸팅 90° · 높이 최대 180mm' },
        { label: '무선', value: 'Wi-Fi 5 · 블루투스 5.0' },
        { label: '사용 환경', value: '동작 0~40℃ · 습도 80% 이하 · 방수 미지원' },
        { label: '보증', value: '품질 보증 1년(배터리 6개월) · 핵심 부품 2년' },
      ],
    },

    targetUsers: {
      recommended: [
        '케이스째 차에 싣고 나가 그 자리에서 펼쳐 쓰려는 사용자(닫았을 때 670 x 119 x 433mm)',
        '바퀴 스탠드 없이 바닥·탁자에 펼쳐 쓰려는 사용자(가로 모드 670 x 598(최대) x 560mm)',
        '테이블 모드로 눕혀 터치 게임·콘텐츠를 쓰려는 사용자(앱별 터치 지원 상이)',
      ],
      notRecommended: [
        '도보로 자주 들고 다니려는 사용자(12.7kg)',
        'QHD 이상 해상도가 필요한 사용자(FHD 1920×1080)',
        '배터리 장시간(3시간 초과) 사용이 필요한 사용자',
      ],
    },

    features: [
      '캐리백 케이스 일체형으로 휴대·수납(방수 미지원)',
      '케이스 열면 자동 켜짐 / 닫으면 자동 꺼짐',
      '돌비 비전 · 돌비 애트모스 지원',
      'webOS 22 · 터치스크린 · AirPlay(화면 공유만, 터치 미지원)',
      '가로·세로·테이블 모드 · 로테이팅 90°·틸팅 90° · 높이 최대 180mm',
    ],

    priceAnalysis: {
      msrp: 894550,
      valueRating: 3,
      priceTier: 'premium',
      alternatives: ['lg-standbyme2', 'samsung-the-movingstyle'],
    },

    reviews: [
      {
        userType: '차박 즐기는 캠퍼',
        rating: 5,
        text: '차에 싣고 다니며 캠핑장에서 꺼내 봅니다. 케이스 열면 바로 켜지고 스피커도 야외에서 충분해요. 방수는 아니지만 아웃도어 감성엔 딱.',
        pros: ['케이스 휴대성', '자동 전원', '20W 스피커'],
        cons: ['무거운 무게'],
      },
      {
        userType: '집·야외 겸용 찾던 1인 가구',
        rating: 4,
        text: '수납이 깔끔하고 디자인이 예뻐요. 다만 12.7kg이라 여자 혼자 도보 이동은 힘들고, FHD·3시간 배터리라 스펙은 요즘 기준 살짝 아쉽습니다.',
        pros: ['디자인', '수납 편의'],
        cons: ['무게', 'FHD 스펙', '배터리 3시간'],
        source: 'LG 공식·다나와 사용기 종합',
        sourceUrl: 'https://prod.danawa.com/info/?pcode=20361317',
      },
      {
        userType: '캠핑 사용기 종합',
        rating: 4,
        text: '국내 캠핑 사용기들의 공통 평가는 "케이스가 곧 보호 장비"라는 점입니다. 단단한 케이스가 본체를 감싸 이동 중 파손 걱정이 적고 별도 수납 가방이 필요 없다는 게 최대 강점으로 꼽힙니다. 다만 12.7kg 무게 때문에 도보 백패킹보다는 오토캠핑·차박 전제 장비라는 결론이 일반적입니다.',
        pros: ['케이스 자체가 보호 수단', '텐트 안 여럿이 보기 좋은 27형'],
        cons: ['오토캠핑 전제(12.7kg)', '높은 출시가'],
        source: '국내 캠핑 사용기 블로그 종합',
        sourceUrl: 'https://funfunhan.com/2477778',
      },
    ],

    purchaseLinks: [
      { store: 'LG전자 공식', url: '#', price: 1170000, isOfficial: true },
      { store: '쿠팡', url: 'https://link.coupang.com/a/g88WtHayyG' },
    ],

    similarProducts: ['lg-standbyme2', 'lg-standbyme2-max', 'samsung-the-movingstyle'],
  },
];
