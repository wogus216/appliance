/**
 * 공식 자료와 대조해 바로잡은 기록 — /about에 그대로 싣는다.
 *
 * 이 사이트가 제조사 사이트에 없는 가치를 내는 곳이 여기다: 같은 글자가 모델 계열마다 다른
 * 뜻이라는 것, 우리가 틀리게 싣고 있던 것, 제조사 문서 자체가 모순인 곳. 독자에게 보여 줄 수
 * 있는 기록으로 남긴다.
 *
 * 근거는 커밋 원문이다(각 항목의 `commit`). 메모리나 요약에서 옮기지 않는다 — 요약은 2차 소스다.
 * 날짜는 교정 커밋 날짜이고, 배포일과 다를 수 있다.
 */
export type CorrectionKind =
  /** 우리가 틀리게 싣고 있다가 공식 자료로 바로잡은 것 */
  | 'ours'
  /** 제조사 문서 자체에 문제가 있어 그대로 옮기지 않은 것 */
  | 'maker';

export interface Correction {
  date: string;
  kind: CorrectionKind;
  subject: string;
  /** ours: 우리가 싣던 것 / maker: 공식 문서에 적힌 것 */
  was: string;
  /** ours: 바로잡은 내용 / maker: 우리가 대신 한 일 */
  now: string;
  /** 지금 그 내용이 실린 우리 페이지 */
  href: string;
  commit: string;
}

export const CORRECTIONS: Correction[] = [
  {
    date: '2026-10-29',
    kind: 'ours',
    subject: 'SK매직 식기세척기 DWA-81R0D F1',
    was: '물이 새지 않을 때만 거름망을 분리해 씻고 급수 중간밸브가 열려 있는지 확인',
    now: '설명서의 F1~F9 조치는 전원을 끄고 플러그를 뺀 뒤 중간밸브를 잠그고 문의하는 것뿐이다. 필터·중간밸브는 원인 설명이라 조치가 아닌 상담 때 알릴 정보로 옮겼다.',
    href: '/error-codes/SKMagic',
    commit: '7df0cc0',
  },
  {
    date: '2026-10-29',
    kind: 'ours',
    subject: 'SK매직 식기세척기 DWA-81R0D E4',
    was: '60℃ 이상 고온수 급수 감지',
    now: 'SK매직이 2026-10-28 E4 안내를 계열별로 나눈 뒤 어느 안내에도 DWA-81 계열이 연결돼 있지 않고 설명서 자가진단표에도 E4가 없다. 이 모델에 뜻을 붙이지 않고 서비스 문의로 안내하며, 계열별 뜻은 각 안내의 연결 모델 범위대로 적었다.',
    href: '/error-codes/SKMagic',
    commit: 'e599d2d',
  },
  {
    date: '2026-10-29',
    kind: 'ours',
    subject: 'SK매직 식기세척기 DWA-81R0D F3',
    was: '거품 과다 — 거품을 걷어내거나 30초 뒤 전원 재연결',
    now: '설명서는 F3을 F1~F9 기능 이상으로 묶고 전원·플러그를 끄고 중간밸브를 잠근 뒤 문의하라고 한다. 거품 과다는 모델 구분 없이 연결된 FAQ에만 있어 이 모델의 원인으로 확정하지 않는다.',
    href: '/error-codes/SKMagic',
    commit: 'e599d2d',
  },
  {
    date: '2026-10-29',
    kind: 'ours',
    subject: '로보락 Error 4(낭떠러지 센서)',
    was: '반복되면 앱에서 그 구역을 청소 금지 구역으로 지정',
    now: '공식 안내에 없는 단계라 지웠다. 센서를 닦고 어두운 색·털이 긴 카펫 위가 아닌지 확인한 뒤 다시 시작, 계속되면 AS만 남겼다.',
    href: '/error-codes/Roborock',
    commit: 'e599d2d',
  },
  {
    date: '2026-10-29',
    kind: 'ours',
    subject: '삼성 콤보 WD25DB8995BZ 5C',
    was: '내부 물이 식은 뒤 잔수를 빼고, 바닥이나 전원 부근이 물에 잠겼다면 재가동 금지',
    now: '설명서는 배수되는 물이 뜨거울 수 있으니 손대지 말라고 하고, 재가동 금지 기준을 「제품 밑면이 물에 잠긴 경우」로 적는다. 원문대로 고치고 62쪽의 두 가지 주의를 더했다.',
    href: '/error-codes/Samsung',
    commit: 'e599d2d',
  },
  {
    date: '2026-10-29',
    kind: 'maker',
    subject: '귀뚜라미 거꾸로 IN AD 10',
    was: '자가진단 페이지는 「센서부 이상」, 같은 제품군 설명서 28쪽은 「E1 10 배풍기 회전수 낮은 경우」',
    now: '한쪽으로 단정하던 문장(송풍기 회전수로 해석하지 말라)을 지우고 두 원문을 출처와 함께 나란히 싣고 A/S 확인을 안내한다.',
    href: '/error-codes/Kiturami',
    commit: 'e599d2d',
  },
  {
    date: '2026-10-29',
    kind: 'ours',
    subject: '귀뚜라미 97(가스 누설) 적용 제품군',
    was: '거꾸로 IoT 콘덴싱이 빠져 있었다',
    now: '자가진단 페이지와 설명서 모두 97을 가스 누설로 다뤄 거꾸로 IoT 콘덴싱을 적용 제품군에 더했다.',
    href: '/error-codes/Kiturami',
    commit: 'e599d2d',
  },
  {
    date: '2026-10-29',
    kind: 'ours',
    subject: '귀뚜라미 21(지진 감지)',
    was: '상황이 정리되면 보일러를 다시 켜기 전에 가스 냄새를 확인',
    now: '공식 안내에는 다시 켜는 방법이 없어 재가동 안내를 지우고, 재가동 전 A/S 문의와 가스 냄새 시 97 조치만 남겼다.',
    href: '/error-codes/Kiturami',
    commit: 'e599d2d',
  },
  {
    date: '2026-10-29',
    kind: 'ours',
    subject: '경동나비엔 Er03',
    was: '가스 냄새가 나면 점화 시험을 하지 말고 밖에서 가스 공급업체에 연락',
    now: '나비엔 공식 자가진단 가이드 67건 어디에서도 이 절차를 찾지 못해 제조사 안내처럼 싣던 문장을 지웠다. 가스 냄새 대처는 한국가스안전공사의 가정용 누출 응급조치를 출처와 함께 허브 안전 문구에 실었다.',
    href: '/error-codes/Navien',
    commit: 'e599d2d',
  },
  {
    date: '2026-10-29',
    kind: 'ours',
    subject: 'SK매직 식기세척기 DWA-81R0D 수평 조절',
    was: '하단 레벨러로 높이를 40mm까지 조절할 수 있다',
    now: '설명서의 40mm 안내는 빌트인(DWA-8***B 계열) 설치 절에 있는 문구였다. 프리스탠딩인 이 모델의 조절 범위는 확인하지 못했다고 고쳤다.',
    href: '/products/skmagic-touchon-dishwasher-dwa81',
    commit: '84b6b06',
  },
  {
    date: '2026-09-16',
    kind: 'ours',
    subject: 'SK매직 식기세척기 E2',
    was: '배수 이상',
    now: '급수 에러. 제조사 코드별 FAQ 기준으로 정반대였다 — 배수 호스가 아니라 수도·급수 쪽을 봐야 한다.',
    href: '/error-codes/SKMagic',
    commit: '327eb54',
  },
  {
    date: '2026-09-16',
    kind: 'ours',
    subject: 'SK매직 식기세척기 E4',
    was: '누수 감지',
    now: '12인용·클림 계열에서는 60℃ 이상 고온수 급수 — 급수 호스가 온수 배관에 연결된 경우다. 같은 E4가 계열에 따라 다른 뜻이라 계열을 함께 적었다.',
    href: '/error-codes/SKMagic',
    commit: '327eb54',
  },
  {
    date: '2026-09-16',
    kind: 'ours',
    subject: 'SK매직 식기세척기 E1',
    was: '이 제품의 코드로 실려 있었다',
    now: 'DWA2800·2810·2820 전용 코드라 이 제품 목록에서 뺐다.',
    href: '/error-codes/SKMagic',
    commit: '327eb54',
  },
  {
    date: '2026-09-16',
    kind: 'ours',
    subject: 'SK매직 식기세척기 온도센서 표시',
    was: 't5 / t0',
    now: 'ts / to — 화면에 실제로 뜨는 글자, 곧 사람들이 검색창에 치는 글자로 고쳤다.',
    href: '/error-codes/SKMagic',
    commit: '327eb54',
  },
  {
    date: '2026-09-16',
    kind: 'ours',
    subject: 'SK매직 고객센터 번호',
    was: '1588-1588 — 삼성전자 번호가 16곳에 적혀 있었다',
    now: '1600-1661. 같은 번호를 브랜드 소개에는 맞게 적어 두고 에러코드 쪽과 대조한 적이 없었다. 지금은 두 곳을 자동으로 대조해, 어긋나면 게시 전 검사에서 걸린다.',
    href: '/error-codes/SKMagic',
    commit: '327eb54',
  },
  {
    date: '2026-09-16',
    kind: 'ours',
    subject: '캐리어·위닉스·쿠쿠 고객센터 번호',
    was: '그 브랜드의 서비스 번호가 아닌 번호',
    now: '각 브랜드 공식 지원 페이지의 번호로 바로잡았다(캐리어 1588-8866, 위닉스 1544-5081).',
    href: '/error-codes',
    commit: 'd8a696d',
  },
  {
    date: '2026-09-18',
    kind: 'ours',
    subject: '애플 에어팟 프로 3 노이즈 캔슬링',
    was: '"전작 대비 4배"',
    now: '4배는 1세대 대비이고, 바로 전 모델(에어팟 프로 2) 대비로는 2배다.',
    href: '/products/apple-airpods-pro3',
    commit: '68cc464',
  },
  {
    date: '2026-09-18',
    kind: 'ours',
    subject: '삼성 윈드프리 벽걸이 AR07A9170 냉방 면적',
    was: '23.1m²',
    now: '24.4m²',
    href: '/products/samsung-wind-free-ar07a9170',
    commit: '68cc464',
  },
  {
    date: '2026-09-16',
    kind: 'maker',
    subject: '귀뚜라미 E204·E214·E224·E234',
    was: '제목은 수온·출탕·축열·직수 센서 이상인데, 설명은 송풍기 회전수 문제로 되어 있다(제조사 페이지의 구조화 데이터에도 같은 모순이 있다).',
    now: '어느 쪽이 맞는지 우리가 판정할 수 없어, 원인은 코드 제목을 따르고 조치는 어느 쪽이든 맞는 것(가동 중단·서비스 접수)만 실었다.',
    href: '/error-codes/Kiturami',
    commit: 'bf50130',
  },
  {
    date: '2026-09-16',
    kind: 'maker',
    subject: '귀뚜라미 기름보일러 자가진단',
    was: '기름보일러 페이지에 "가스밸브가 잠겨 있는지 확인하세요"라는 조치가 있다.',
    now: '가스보일러 문구를 재사용한 것으로 보이고 기름보일러 고유의 조치는 공개돼 있지 않아, 따를 수 없는 지시를 싣는 대신 기름보일러 코드는 싣지 않았다.',
    href: '/error-codes/Kiturami',
    commit: 'bf50130',
  },
];
