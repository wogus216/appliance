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
