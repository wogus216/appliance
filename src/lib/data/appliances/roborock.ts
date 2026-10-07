import { Appliance } from '@/types/appliance';

export const roborockAppliances: Appliance[] = [
  // === 로봇청소기 ===
  {
    id: 'roborock-s8-proultra',
    slug: 'roborock-s8-proultra',
    brand: 'Roborock',
    name: 'S8 프로 울트라 로봇청소기',
    modelNumber: 'S8 Pro Ultra',
    category: '로봇청소기',
    image: '/images/appliances/roborock/s8-pro-ultra/main.webp',
    images: [],
    price: 1766390,
    description: '로보락 S8 프로 울트라는 6000Pa HyperForce 흡입과 VibraRise 2.0 음파진동 물걸레를 갖춘 로봇청소기입니다. 도크는 자동 먼지비움·물걸레 세척·건조를 지원하며, 물통과 먼지봉투는 사용 상태에 따라 관리해야 합니다. Reactive 3D 장애물 회피와 PreciSense 라이다를 지원합니다.',
    oneliner: '6000Pa 최대 흡입과 음파진동 물걸레, 자동 먼지비움·걸레 세척·건조 도크',
    editorComment: 'S8 Pro Ultra는 음파진동 물걸레와 자동 세척·건조 도크를 사용하지만 물통·봉투·브러시 관리는 남습니다. 6000Pa를 털 제거율로 바꾸지 않고, 도크 관리 동선과 실제 소모품 비용을 확인해야 합니다.',
    status: 'best',
    tags: ['로보락', '로봇청소기', '물걸레', '자동비움', '올인원스테이션', '강력흡입', '장애물회피', '프리미엄'],

    specs: {
      energyEfficiency: 9,
      performance: 9,
      convenience: 10,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '6000Pa HyperForce 흡입 + VibraRise 2.0 음파진동 물걸레 + Reactive 3D 장애물 회피',
      filterType: '세척 가능한 먼지 필터(HEPA 등급 미확인)',
      capacity: '6000Pa 흡입 / 0.35L 먼지통 / 진동 물걸레 (도크 자동 비움·세척·열풍건조)',
    },

    roomFit: {
      recommendedSize: ['소형', '중형', '대형', '초대형'],
      coverageArea: 250,
      installationType: '올인원 클린 스테이션',
      installationNote: '도크 설치 공간과 가까운 콘센트가 필요합니다. 기본 도크의 깨끗한 물·오수통은 직접 채우고 비워야 합니다. 문턱 통과 높이는 이 모델의 공식 사양에서 확인하지 못했으므로 집의 단차를 구매 전에 확인하세요.',
    },

    errorCodes: [
      {
        code: 'Error 5',
        description: '메인브러시 끼임/엉킴 알림',
        cause: '머리카락·실 등이 메인브러시와 양 끝 베어링에 감겨 회전이 막힘',
        solution: '전원을 끄고 메인브러시를 분리해 감긴 이물질을 제거한 뒤 재장착합니다. 반복되면 브러시·베어링 캡 마모를 점검하고, 지속 시 로보락 공식 고객센터(1566-5534)/앱 채팅으로 문의하세요.',
        severity: 'medium',
      },
      {
        code: 'Error 1',
        description: '라이다(LDS) 센서 막힘 / 회전 불량',
        cause: '상단 라이다 터렛에 먼지·머리카락이 끼거나 좁은 가구 밑에 눌려 회전이 멈춤',
        solution: '라이다 터렛 주변 이물질을 제거하고 손으로 가볍게 돌려 회전이 부드러운지 확인합니다. 가구 밑 끼임 여부를 점검하고, 증상이 지속되면 로보락 공식 고객센터(1566-5534)로 점검을 요청하세요.',
        severity: 'medium',
      },
      {
        code: 'Error 13',
        description: '충전 실패 (충전 접점 불량)',
        cause: '로봇·도크의 금속 충전 단자 오염 또는 도크 전원 미연결로 충전이 되지 않음',
        solution: '마른 천으로 로봇과 도크의 충전 접점을 닦고, 도크 전원 플러그 연결과 주변 장애물을 확인합니다. 정상 안착 후에도 반복되면 로보락 공식 고객센터(1566-5534)/앱 채팅으로 문의하세요.',
        severity: 'high',
      },
      {
        code: 'Error 4',
        description: '낭떠러지(추락 방지) 센서 오류로 청소가 중단됨',
        cause: '본체 바닥 센서에 먼지·물기가 묻었거나, 검은색·반사 바닥재나 강한 직사광 환경에서 단차로 오인식',
        solution: '본체를 뒤집어 바닥의 낭떠러지 센서를 마른 천으로 닦고 평평한 곳에서 재시작한다. 검은색 매트·러그 위는 노쓰루 구역으로 지정한다. 청소 후에도 계속 뜨면 로보락 공식 서비스센터(1566-5534)에 점검을 의뢰한다.',
        severity: 'medium',
      },
      {
        code: 'Error 9',
        description: '필터 인식 점검',
        cause: 'S8 Pro Ultra 공식 지원 안내는 필터 측면의 자석 유무를 확인하도록 안내합니다.',
        solution: '필터 측면의 자석이 있는지 확인하세요. 없다면 필터를 교체하고 다시 시도합니다. 반복되면 로보락 공식 고객지원에 문의하세요.',
        severity: 'low',
      },
    ],

    targetUsers: {
      recommended: [
        '반려동물 털·머리카락 청소 부담이 큰 가구',
        '거실·방이 여러 개인 다층·중대형 아파트 거주자',
        '흡입부터 물걸레 세척·건조까지 도크의 자동 관리를 원하는 사용자',
        '유지관리에 손대는 빈도를 최대한 줄이고 싶은 맞벌이·바쁜 사용자',
      ],
      notRecommended: [
        '원룸에서 최소 예산으로 흡입만 필요한 1인 가구',
        '도크(스테이션)를 둘 여유 공간이 없는 집',
        '두꺼운 카펫 위주라 물걸레 효용이 낮은 환경',
        '문턱이 높은 복층·구옥 구조 거주자',
      ],
    },

    features: [
      '6000Pa HyperForce 강력 흡입',
      'VibraRise 2.0 음파진동 물걸레 + 카펫 감지 자동 리프트',
      '올인원 도크: 자동 먼지비움 + 물걸레 자가세척 + 열풍건조',
      'Reactive 3D 장애물 회피 + PreciSense 라이다 정밀 맵핑',
      'DuoRoller 듀얼 고무 메인브러시 (엉킴 저감)',
    ],

    priceAnalysis: {
      msrp: 1766390,
      valueRating: 4,
      priceTier: 'premium',
      alternatives: ['xiaomi-robot-vacuum-x10'],
    },

    reviews: [
      {
        userType: '반려묘 2마리 키우는 30평대 아파트',
        rating: 5,
        text: '털이 정말 많은 집인데 6000Pa라 그런지 한 번 돌면 바닥이 깔끔해요. 제일 좋은 건 도크가 알아서 먼지 비우고 물걸레 빨아서 열풍건조까지 해줘서 2주에 한 번만 손대면 끝납니다. 비싼 값은 하네요.',
        pros: ['강력 흡입', '자동 비움', '열풍건조'],
        cons: ['도크 큼'],
      },
      {
        userType: '복층 신혼집 사용자',
        rating: 4,
        text: '흡입·물걸레 다 만족인데 도크가 생각보다 커서 자리를 좀 차지하고, 물은 직결이 아니라 통을 직접 채워야 해요. 높은 문턱은 가끔 못 넘습니다. 그래도 청소에 신경을 안 쓰게 된 건 확실해요.',
        pros: ['물걸레 세척', '저관리'],
        cons: ['도크 큼', '문턱'],
      },
      {
        userType: '맞벌이 부부, 25평 아파트',
        rating: 5,
        text: '둘 다 늦게 들어오는데 예약 청소만 걸어두면 퇴근하고 오면 늘 깨끗해요. 앱에서 방마다 청소 순서랑 흡입 세기를 다르게 줄 수 있어서 좋고, 맵핑도 정확해서 거실만 따로 돌리기도 편합니다. 충전 케이블이나 양말 정도는 알아서 피해가네요.',
        pros: ['예약 청소', '맵핑', '장애물 회피'],
        cons: ['소음'],
      },
      {
        userType: '거실 카펫 많은 30평대',
        rating: 3,
        text: '흡입력 자체는 좋은데 우리집은 두꺼운 카펫이 많아서 물걸레가 사실상 무용지물이에요. 카펫 감지해서 걸레를 들어 올리긴 하는데, 그럴 거면 굳이 비싼 물걸레 모델을 살 필요가 있었나 싶습니다. 흡입만 보면 만족이지만 가격 대비는 좀 아쉬워요.',
        pros: ['강력 흡입', '카펫 감지'],
        cons: ['카펫 물걸레 무용', '가격'],
      },
      {
        userType: '대형견 키우는 단독주택',
        rating: 4,
        text: '털 빠짐이 심한 대형견인데 매일 돌려도 먼지통을 자동으로 비워주니 손이 거의 안 갑니다. 다만 도크 먼지봉투랑 세척수가 생각보다 빨리 닳아서 소모품 비용은 감안해야 해요. 강력모드일 때 소음은 좀 큰 편입니다.',
        pros: ['자동 비움', '반려동물 털'],
        cons: ['소모품 비용', '소음'],
      },
    ],

    purchaseLinks: [
      { store: '로보락 공식스토어', url: '#', price: 1290000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 999000 },
    ],

    similarProducts: ['samsung-bespoke-jetbot-ai', 'lg-codezero-r5-robot', 'xiaomi-robot-vacuum-x10'],
  },
  {
    id: 'roborock-qrevo-curv',
    slug: 'roborock-qrevo-curv',
    brand: 'Roborock',
    name: 'Qrevo Curv',
    modelNumber: 'Qrevo Curv',
    category: '로봇청소기',
    image: '/images/appliances/roborock/qrevo-curv/main.webp',
    images: [],
    description: '로보락 Qrevo Curv는 제조사 최대 18,500Pa 흡입, DuoDivide 메인 브러시, 듀얼 회전 물걸레를 갖춘 로봇청소기입니다. AdaptiLift 섀시는 제조사 시험에서 단일 문턱 최대 3cm, 이중 문턱 최대 4cm를 넘도록 설계됐습니다. 다기능 도크는 자동 먼지비움·75℃ 온수 물걸레 세척·열풍건조를 지원합니다. 실제 통과 높이와 청소 결과는 문턱 형태·바닥재에 따라 달라집니다.',
    oneliner: '18,500Pa 제조사 최대 흡입, 듀얼 회전 물걸레와 AdaptiLift 섀시를 갖춘 도크형 로봇청소기',
    editorComment: 'Qrevo Curv의 단일 3cm·이중 4cm는 다른 문턱 시험 조건입니다. 집의 단차 형태와 도크 자리를 재고, 75℃ 걸레 세척을 바닥 청소수 온도로 읽지 마세요. 급배수·자동 세제 투입은 기본형과 별도 사양을 구분해 견적 받으세요.',
    status: 'new',
    tags: ['로보락', '로봇청소기', '물걸레리프트', '듀얼회전물걸레', '올인원스테이션', '온수세척', '열풍건조', '장애물회피', '프리미엄'],

    specs: {
      energyEfficiency: 9,
      performance: 9,
      convenience: 10,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '18,500Pa 최대 흡입 + DuoDivide 메인 브러시 + 듀얼 회전 물걸레 + AdaptiLift 섀시',
      filterType: '세척 가능한 먼지 필터(HEPA 등급 미확인)',
      capacity: '18,500Pa 흡입 / 0.35L 먼지통 / 듀얼 회전 물걸레 (도크 자동 비움·75℃ 온수 세척·열풍건조)',
      // 로보락 코리아 공식 제품 페이지 표기(2026-08-24 확인). verified-specs.ts 참조.
      dimensions: '352 x 347 x 103mm',
    },

    roomFit: {
      recommendedSize: ['소형', '중형', '대형', '초대형'],
      coverageArea: 280,
      installationType: '자동 도크형',
      installationNote: '공식 설명서는 도크에 높이 0.9m·폭 0.46m·앞쪽 깊이 1.2m 이상의 공간을 확보하도록 안내합니다. 급·배수 직결형이 아니므로 깨끗한 물과 오수통은 직접 관리해야 합니다. 제조사 시험상의 문턱 한도는 단일 3cm, 이중 4cm이며 실제 통과 여부는 형태에 따라 달라집니다.',
    },

    errorCodes: [
      {
        code: 'Error 5',
        description: '메인브러시 끼임/엉킴 알림',
        cause: '머리카락·실 등이 메인브러시와 양 끝 베어링에 감겨 회전이 막힘',
        solution: '전원을 끄고 메인브러시를 분리해 감긴 이물질을 제거한 뒤 재장착합니다. 반복되면 브러시·베어링 캡 마모를 점검하고, 로보락 앱 알림에서 안내된 절차를 따른 뒤에도 지속되면 로보락 공식 고객센터(1566-5534)로 문의하세요.',
        severity: 'medium',
      },
      {
        code: 'Error 13',
        description: '충전 실패 (충전 접점 불량)',
        cause: '로봇·도크의 금속 충전 단자 오염 또는 도크 전원 미연결로 충전이 되지 않음',
        solution: '마른 천으로 로봇과 도크의 충전 접점을 닦고, 도크 전원 플러그 연결과 주변 장애물을 확인합니다. 정상 안착 후에도 반복되면 로보락 앱 알림/공식 고객센터로 문의하세요.',
        severity: 'high',
      },
      {
        code: 'Error 1',
        description: '라이다(LDS) 센서 막힘 / 회전 불량',
        cause: '상단 라이다 터렛에 먼지·머리카락이 끼거나 좁은 가구 밑에 눌려 회전이 멈춤',
        solution: '라이다 터렛 주변 이물질을 제거하고 손으로 가볍게 돌려 회전이 부드러운지 확인합니다. 로보락 앱 알림에서 안내된 절차를 따른 뒤에도 증상이 지속되면 로보락 공식 고객센터(1566-5534)에 점검을 요청하세요.',
        severity: 'medium',
      },
      {
        code: 'Error 4',
        description: '낙하 방지(낭떠러지) 센서 오류로 청소가 중단됨',
        cause: '본체 바닥 센서에 먼지·물기가 묻었거나 검은색·반사 바닥재, 강한 직사광 환경에서 단차로 오인식',
        solution: '본체를 뒤집어 바닥의 낙하 방지 센서를 마른 천으로 닦고 평평한 곳에서 재시작합니다. 검은색 매트·러그 위는 노고존(가상벽)으로 지정하고, 로보락 앱 알림 안내대로 조치한 뒤에도 계속 표시되면 로보락 공식 고객센터(1566-5534)에 점검을 요청하세요.',
        severity: 'medium',
      },
    ],

    targetUsers: {
      recommended: [
        '회전 물걸레 방식과 온수 걸레 세척 도크가 필요한 사용자',
        '문턱·단차가 많은 구옥·복층 구조 거주자',
        '흡입부터 물걸레 온수세척·건조까지 도크의 자동 관리를 원하는 가구',
        '반려동물 털·머리카락 청소 부담이 큰 다층·중대형 아파트 거주자',
      ],
      notRecommended: [
        '원룸에서 최소 예산으로 흡입만 필요한 1인 가구',
        '국내 AS·앱 생태계를 최우선해 삼성·LG를 선호하는 사용자',
        '도크(스테이션)를 둘 여유 공간이 없는 집',
      ],
    },

    features: [
      '18,500Pa HyperForce 강력 흡입',
      'DuoDivide 메인 브러시 + 듀얼 회전 물걸레·물걸레 리프트',
      'AdaptiLift 섀시: 본체 상승으로 높은 문턱·단차 주파',
      '기본형 다기능 도크: 자동 먼지비움 + 75℃ 온수 물걸레 세척 + 열풍건조',
      'FlexiArm 사이드 물걸레 + Reactive AI 2.0 장애물 회피',
    ],

    priceAnalysis: {
      valueRating: 4,
      priceTier: 'premium',
      alternatives: ['roborock-s8-proultra', 'xiaomi-robot-vacuum-x20'],
    },

    reviews: [
      {
        userType: '문턱 많은 구옥 거주 30대',
        rating: 5,
        text: '예전 로봇청소기는 문턱마다 멈췄는데 얘는 몸을 들어서 척척 넘어갑니다. 회전 물걸레라 주방 기름때도 잘 닦이고, 도크가 온수로 빨아서 말려주니 걸레 냄새도 없어요. 비싸지만 물걸레 청소는 확실히 한 수 위입니다.',
        pros: ['문턱 주파', '회전 물걸레', '온수 세척'],
        cons: ['가격', '도크 큼'],
      },
      {
        userType: 'S8 프로 울트라에서 갈아탄 사용자',
        rating: 4,
        text: '회전 물걸레랑 문턱 넘는 건 만족인데, 흡입력 숫자가 18,500Pa라고 해서 기대했지만 체감은 S8이랑 큰 차이를 모르겠어요. 도크도 더 커졌고요. 물걸레 성능 보고 사는 거면 추천, 흡입만 보면 굳이까진 아닙니다.',
        pros: ['회전 물걸레', '문턱 주파'],
        cons: ['흡입 체감 차이 적음', '도크 큼'],
      },
      {
        userType: '맞벌이, 신축 아파트 34평',
        rating: 5,
        text: '온수로 걸레를 빨아주니 물걸레에서 쉰내가 안 나는 게 제일 만족스러워요. 세제도 알아서 넣어주고 열풍건조까지 되니 정말 손 댈 일이 없습니다. FlexiArm 사이드 걸레가 벽 모서리까지 닦아주는 것도 꼼꼼해요.',
        pros: ['온수 세척', '세제 자동 투입', '구석 청소'],
        cons: ['도크 큼'],
      },
      {
        userType: '국내 AS 걱정되는 40대',
        rating: 3,
        text: '청소 성능은 좋은데 가끔 와이파이가 끊겨서 앱 제어가 안 될 때가 있어요. 펌웨어 업데이트하고 공유기를 2.4GHz로 잡아주니 좀 나아지긴 했습니다. 삼성·LG 쓰다 와서 그런지 국내 AS가 좀 불안한 건 어쩔 수 없네요.',
        pros: ['청소 성능'],
        cons: ['Wi-Fi 끊김', '국내 AS 우려'],
      },
      {
        userType: '소형 평수 자취생',
        rating: 2,
        text: '청소력은 두말할 것 없이 좋은데 도크가 너무 커서 좁은 집에선 존재감이 부담스럽습니다. 자동 비움 돌아갈 때 소음도 깜짝 놀랄 정도로 크고요. 큰 집이면 모를까 작은 집에 이 가격, 이 크기는 좀 오버였어요.',
        pros: ['청소력'],
        cons: ['도크 큼', '자동비움 소음', '가격'],
      },
    ],

    purchaseLinks: [
      { store: '로보락 공식스토어', url: '#', price: 1490000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 1190000 },
    ],

    similarProducts: ['roborock-s8-proultra', 'samsung-bespoke-jetbot-ai', 'xiaomi-robot-vacuum-x20'],
  },
];
