import { Appliance } from '@/types/appliance';

export const shinilAppliances: Appliance[] = [
  // === 선풍기 ===
  {
    id: 'shinil-bldc-stand-sif14bldc',
    slug: 'shinil-bldc-stand-sif14bldc',
    brand: 'Shinil',
    name: 'BLDC 리모컨 스탠드선풍기 SIF-14BLDC',
    modelNumber: 'SIF-14BLDC',
    category: '선풍기',
    rating: 4.5,
    image: '/images/appliances/shinil/sif-14bldc/main.webp',
    images: [],
    price: 119000,
    description: '신일 BLDC 스탠드선풍기. 저소음 BLDC 모터와 12단 자연풍, 리모컨·타이머를 갖춘 국민 가성비 모델.',
    oneliner: '저소음 BLDC 모터 + 12단 자연풍, 여름 한 철 든든한 국민 스탠드선풍기',
    editorComment: '가장 무난한 가정용 스탠드선풍기입니다. BLDC 모터라 일반 AC 선풍기보다 조용하고(약풍 28dB) 소비전력이 25W로 낮아 월 전기요금이 1천원 미만입니다. 12단 풍량에 수면풍·자연풍 모드가 있어 밤새 틀어도 부담이 적습니다. 높이 조절과 좌우 회전, 7시간 타이머까지 기본기를 다 갖췄고 가격은 12만원 안팎. 화려한 앱 연동은 없지만 "조용하고 전기 적게 먹는 선풍기"를 찾는다면 가장 합리적인 선택입니다.',
    status: 'best',
    tags: ['신일', 'BLDC', '스탠드선풍기', '선풍기', '저소음', '리모컨', '가성비', '14인치'],

    specs: {
      powerConsumption: 25,
      noise: 28,
      energyEfficiency: 9,
      performance: 7,
      convenience: 8,
      durability: 7,
    },

    techSpecs: {
      coreTechnology: 'BLDC 인버터 모터 + 7엽 날개',
      capacity: '14인치 (7엽 날개)',
      dimensions: '430 x 1280 x 430mm',
      weight: 5.2,
      monthlyElectricityCost: 900,
    },

    roomFit: {
      recommendedSize: ['원룸', '소형', '중형'],
      coverageArea: 26,
      installationType: '스탠드형',
      installationNote: '높이 약 90~128cm 무단 조절. 받침대 조립 필요',
    },

    errorCodes: [
      {
        code: 'E1',
        description: 'BLDC 모터 구동 이상',
        cause: '날개 걸림 또는 모터 과부하 보호 동작',
        solution: '전원을 끄고 날개 주변 이물질을 제거한 뒤 재가동. 반복 시 신일 서비스센터(1577-6667) 문의',
        severity: 'medium',
      },
      {
        code: 'E2',
        description: '모터 홀센서(위치센서) 감지 이상',
        cause: 'BLDC 모터 내부 홀센서 신호 불량 또는 커넥터 접촉 불량으로 회전수 제어 실패',
        solution: '전원 플러그를 뽑고 3분 후 재연결하여 초기화. 풍량이 일정하지 않거나 증상이 반복되면 신일 서비스센터(1577-6667)에 모터 점검 문의',
        severity: 'medium',
      },
      {
        code: 'E3',
        description: '좌우 회전(스윙) 동작 불량',
        cause: '회전 기어 걸림 또는 스윙 기구부 이물질·결합 풀림',
        solution: '회전을 멈추고 헤드를 손으로 가볍게 좌우로 움직여 걸림을 확인. 받침 결합과 기어부 이물질을 점검하고, 회전이 안 되면 신일 서비스센터(1577-6667) 문의',
        severity: 'low',
      },
      {
        code: 'E4',
        description: '리모컨 신호 수신 불량',
        cause: '리모컨 건전지 소모 또는 본체 수신부와 리모컨 사이 장애물·직사광선 간섭',
        solution: '리모컨 건전지를 새것으로 교체하고 수신부를 향해 1~3m 이내에서 조작. 그래도 안 되면 신일 서비스센터(1577-6667) 문의',
        severity: 'low',
      },
      {
        code: 'E5',
        description: '전원·제어기판 인식 오류',
        cause: '순간 정전·전압 변동 또는 제어기판(PCB) 일시 오류로 버튼 입력이 동작하지 않음',
        solution: '전원 플러그를 뽑고 1분 후 재연결하여 리셋. 멀티탭 대신 벽 콘센트에 직접 연결해 재시도하고, 반복되면 신일 서비스센터(1577-6667)에 기판 점검 문의',
        severity: 'medium',
      },
      {
        code: 'E6',
        description: '모터 과열·권선 손상 보호 정지',
        cause: '장시간 과부하 가동 또는 모터 권선 손상으로 과열 보호 회로가 작동해 정지',
        solution: '전원을 끄고 30분 이상 식힌 뒤 재가동. 식힌 후에도 즉시 정지하거나 타는 냄새가 나면 사용을 멈추고 신일 서비스센터(1577-6667)에 모터 수리 문의',
        severity: 'high',
      },
    ],

    targetUsers: {
      recommended: [
        '조용한 선풍기를 원하는 침실·서재 사용자',
        '전기요금 부담 없이 오래 틀어두려는 가정',
        '복잡한 기능 없이 기본기 충실한 선풍기를 찾는 사용자',
        '리모컨·타이머가 필요한 1~2인 가구',
      ],
      notRecommended: [
        '공기청정 기능을 함께 원하는 사용자',
        '앱·음성 제어 등 스마트 기능이 필요한 경우',
      ],
    },

    features: [
      'BLDC 인버터 모터 (저소음·저전력)',
      '12단 풍량 + 자연풍/수면풍 모드',
      '리모컨 + 7시간 예약 타이머',
      '좌우 75도 자동 회전 + 상하 각도 조절',
      '높이 무단 조절 스탠드',
    ],

    priceAnalysis: {
      msrp: 119000,
      streetPrice: 99000,
      monthlyCost: 900,
      valueRating: 5,
      priceTier: 'budget',
      alternatives: ['xiaomi-mijia-dc-fan-1x'],
    },

    reviews: [
      {
        userType: '예민한 잠귀의 1인 가구',
        rating: 5,
        text: '약풍으로 틀면 소리가 거의 안 들립니다. 밤새 수면풍으로 돌려도 전기요금 걱정 없고, 리모컨이라 누워서 끄기 편해요. 이 가격에 이 정도면 충분합니다.',
        pros: ['조용함', '저전력', '리모컨'],
        cons: ['약풍 풍량 약함'],
      },
      {
        userType: '거실에서 쓰는 4인 가족',
        rating: 4,
        text: '조용하고 바람도 부드럽습니다. 다만 거실처럼 넓은 곳에선 강풍을 써야 시원해서, 큰 공간이면 한 단계 큰 모델이 나을 수도 있어요.',
        pros: ['저소음', '부드러운 바람'],
        cons: ['넓은 공간 부족'],
      },
      {
        userType: '여름마다 재구매하는 주부',
        rating: 4,
        text: '12단이라 풍량 맞추기 좋고 자연풍 모드가 은근히 시원합니다. 다만 받침대 조립이 처음엔 좀 헷갈렸어요. 전체적으로 가격 대비 만족합니다.',
        pros: ['가성비', '12단 풍량', '자연풍'],
        cons: ['받침대 조립 번거로움'],
      },
      {
        userType: '후기 꼼꼼히 보는 직장인',
        rating: 3,
        text: '바람과 소음은 만족인데 좌우 회전할 때 미세하게 드드득 소리가 납니다. 헤드 플라스틱 마감도 가격값이라 딱 그 정도예요. 기본기는 충분합니다.',
        pros: ['저전력', '리모컨 편의'],
        cons: ['회전 소음', '플라스틱 마감'],
      },
      {
        userType: '3년째 쓰는 단골',
        rating: 5,
        text: '두 대째 구매했습니다. 여름 내내 틀어도 전기요금 티가 안 나고 잔고장도 없었어요. 리모컨이 가끔 멀리서는 잘 안 먹는 게 유일한 단점입니다.',
        pros: ['내구성', '전기요금 절약', '조용함'],
        cons: ['리모컨 인식 거리'],
      },
    ],

    purchaseLinks: [
      { store: '신일 공식몰', url: '#', price: 119000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 99000 },
    ],

    similarProducts: ['xiaomi-mijia-dc-fan-1x', 'dyson-pure-cool-tp07'],
  },
  {
    id: 'shinil-cordless-fan-sif10',
    slug: 'shinil-cordless-fan-sif10',
    brand: 'Shinil',
    name: '무선 충전식 선풍기 SIF-10',
    modelNumber: 'SIF-10CF',
    category: '선풍기',
    rating: 3.9,
    image: '/images/appliances/shinil/sif-10cf/main.webp',
    images: [],
    price: 49000,
    description: '신일 무선 충전식 BLDC 선풍기. 8000mAh 배터리로 최대 20시간 사용, USB-C 충전과 상하 각도조절을 갖춘 캠핑·차박용 휴대 선풍기.',
    oneliner: '한 번 충전에 최대 20시간, 캠핑·차박에 들고 다니는 무선 BLDC 선풍기',
    editorComment: '"콘센트 없는 곳에서 쓰는 선풍기"가 필요할 때 답이 되는 모델입니다. 8000mAh 배터리로 약풍 기준 최대 20시간(강풍은 4~5시간)이라 캠핑·차박·사무실 책상까지 들고 다니기 좋고, USB-C로 보조배터리에서도 충전됩니다. BLDC 모터라 무게 1.3kg에 작동음도 조용한 편입니다. 다만 본질은 휴대용이라 풍량과 적용범위는 거치형 스탠드선풍기(예: 신일 SIF-14BLDC)에 분명히 못 미칩니다. 좁은 텐트·1인 반경을 시원하게 하는 용도지 방 전체를 식히는 용도는 아닙니다. 5만원 안팎 가격에 무선 휴대성을 더한, 용도가 확실할 때 가성비가 빛나는 보조 선풍기입니다.',
    status: 'new',
    tags: ['신일', '무선선풍기', '충전식', '선풍기', 'BLDC', '캠핑', '차박', '휴대용', 'USB-C'],

    specs: {
      powerConsumption: 5,
      noise: 32,
      energyEfficiency: 9,
      performance: 5,
      convenience: 8,
      durability: 6,
    },

    techSpecs: {
      coreTechnology: 'BLDC 모터',
      capacity: '8000mAh 리튬배터리 (약풍 최대 20시간 / 강풍 약 4~5시간)',
      dimensions: '220 x 320 x 180mm',
      weight: 1.3,
      monthlyElectricityCost: 100,
    },

    roomFit: {
      recommendedSize: ['원룸', '소형'],
      coverageArea: 10,
      installationType: '무선 휴대형',
      installationNote: 'USB-C 충전(약 4~5시간 완충). 탁상·바닥 거치 및 손잡이 휴대 겸용, 상하 각도조절 가능',
    },

    errorCodes: [
      {
        code: 'E1',
        description: '충전 불가 / 배터리 미인식',
        cause: 'USB-C 케이블·어댑터 불량 또는 저전류(0.5A) 어댑터 사용으로 충전 전류 부족',
        solution: '정품 USB-C 케이블과 5V/2A 이상 어댑터로 재충전. 충전 표시등이 켜지지 않으면 신일 고객센터(1577-6667)에 배터리 점검 문의',
        severity: 'medium',
      },
      {
        code: 'E2',
        description: '저전압 보호 / 사용 중 자동 꺼짐',
        cause: '배터리 잔량 부족 또는 장기 미사용으로 배터리 방전·보호회로 동작',
        solution: '30분 이상 충전 후 재가동. 완충해도 사용시간이 크게 짧아지면 신일 고객센터(1577-6667)에 배터리 교체 문의',
        severity: 'medium',
      },
      {
        code: 'E3',
        description: 'BLDC 모터 구동 이상',
        cause: '날개 걸림 또는 모터 과부하 보호 동작',
        solution: '전원을 끄고 날개 주변 이물질을 제거한 뒤 재가동. 반복 시 신일 고객센터(1577-6667) 문의',
        severity: 'low',
      },
      {
        code: 'E4',
        description: '충전 중 과열 보호 / 충전 일시 정지',
        cause: '직사광선·고온 환경에서 충전하거나 충전과 강풍 사용을 동시에 해 배터리 온도가 상승',
        solution: '충전을 멈추고 그늘진 곳에서 30분 이상 식힌 뒤 재충전. 충전과 사용을 동시에 하지 말고, 반복되면 신일 고객센터(1577-6667) 문의',
        severity: 'medium',
      },
      {
        code: 'E5',
        description: '배터리 팽창·과열 감지 / 사용 중지 권고',
        cause: '배터리 셀 노화 또는 손상으로 내부 온도·부풀음 이상이 감지됨',
        solution: '즉시 사용과 충전을 중단하고 화기·직사광선을 피해 보관. 임의로 분해하지 말고 신일 고객센터(1577-6667)에 배터리 교체·점검 문의',
        severity: 'high',
      },
      {
        code: 'E6',
        description: '풍량 버튼·터치 입력 불량',
        cause: '버튼부 습기·이물질 유입 또는 제어부 일시 오류로 풍량 조작이 되지 않음',
        solution: '전원을 끄고 버튼 주변을 마른 천으로 닦은 뒤 재시도. 완충 상태에서도 반복되면 신일 고객센터(1577-6667) 문의',
        severity: 'low',
      },
    ],

    targetUsers: {
      recommended: [
        '캠핑·차박에서 전원 없이 쓸 선풍기가 필요한 사용자',
        '사무실 책상·주방 등 콘센트가 멀리 있는 자리에서 쓰려는 사용자',
        '들고 다니며 쓰는 가벼운 휴대용 선풍기를 찾는 1인 가구',
        '보조배터리로도 충전 가능한 USB-C 제품을 원하는 사용자',
      ],
      notRecommended: [
        '방·거실 전체를 시원하게 식히려는 사용자 (풍량·적용범위 부족)',
        '하루 종일 강풍으로 연속 가동하려는 사용자 (강풍 시 4~5시간)',
        '리모컨·앱 등 부가기능과 넓은 회전각을 원하는 사용자',
      ],
    },

    features: [
      'BLDC 모터 무선 충전식 (저소음·저전력)',
      '8000mAh 배터리 약풍 최대 20시간 사용',
      'USB-C 충전 (보조배터리 호환)',
      '상하 각도조절 + 탁상·휴대 겸용 거치',
      '3단 풍량 + 무게 1.3kg 경량 바디',
    ],

    priceAnalysis: {
      msrp: 49000,
      streetPrice: 39000,
      monthlyCost: 100,
      valueRating: 4,
      priceTier: 'budget',
      alternatives: ['xiaomi-mijia-dc-fan-1x', 'shinil-bldc-stand-sif14bldc'],
    },

    reviews: [
      {
        userType: '차박 자주 다니는 캠퍼',
        rating: 5,
        text: '텐트 안에서 전원 걱정 없이 밤새 약풍으로 돌려도 다음날까지 버팁니다. USB-C라 보조배터리로 충전되는 게 진짜 편해요. 가볍고 각도조절도 돼서 만족.',
        pros: ['무선 휴대', 'USB-C 충전', '장시간'],
        cons: ['강풍 사용시간 짧음'],
      },
      {
        userType: '사무실 책상에서 쓰는 직장인',
        rating: 3,
        text: '가까이 두고 쓰면 시원한데 강풍은 금방 닳습니다. 방 전체를 시원하게 하려고 사면 실망해요. 딱 내 자리용 보조 선풍기로는 가성비 좋습니다.',
        pros: ['휴대성', '가성비'],
        cons: ['강풍 배터리 소모', '풍량 약함'],
      },
      {
        userType: '주방에서 쓰는 자취생',
        rating: 4,
        text: '설거지할 때 옆에 두면 딱입니다. 가볍고 조용해서 좋은데 좌우 회전이 안 돼서 방향을 손으로 돌려놔야 하는 건 살짝 아쉬워요.',
        pros: ['가벼움', '조용함'],
        cons: ['좌우 회전 없음'],
      },
      {
        userType: '외출 잦은 아이 엄마',
        rating: 4,
        text: '유모차에 걸어두거나 외출할 때 들고 다니기 좋아요. 각도조절로 아이 쪽에 바람 맞추기 편합니다. 다만 완충까지 시간이 좀 걸리는 편이에요.',
        pros: ['휴대 간편', '각도조절'],
        cons: ['충전 시간 김'],
      },
      {
        userType: '꼼꼼하게 따지는 캠핑 초보',
        rating: 2,
        text: '광고의 20시간은 약풍 기준이고 강풍으로 쓰면 4시간 남짓이라 한여름 낮엔 부족했습니다. 휴대성은 좋지만 메인 선풍기로 기대하면 실망할 수 있어요.',
        pros: ['가벼움', '휴대성'],
        cons: ['강풍 4시간', '풍량 부족'],
      },
    ],

    purchaseLinks: [
      { store: '신일 공식몰', url: '#', price: 49000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 39000 },
    ],

    similarProducts: ['xiaomi-mijia-dc-fan-1x', 'shinil-bldc-stand-sif14bldc'],
  },
];
