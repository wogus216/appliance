export const SITE_NAME = '가전비교';
export const SITE_DESCRIPTION = '가전제품 비교·분석·에러코드 자가진단 — 에어컨, 제습기, 세탁기 등';
// 문의/개인정보 담당 이메일 (환경변수로 덮어쓰기 가능)
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'wogus21694@gmail.com';
// 프로덕션 도메인은 NEXT_PUBLIC_SITE_URL 환경변수로 주입 (배포 전 반드시 설정)
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://appliance.example.com';

export const BRAND_LABELS: Record<string, string> = {
  Samsung: '삼성',
  LG: 'LG',
  Dyson: '다이슨',
  Coway: '코웨이',
  Winix: '위닉스',
  Carrier: '캐리어',
  TCL: 'TCL',
  Haier: '하이얼',
  Shinil: '신일',
  Xiaomi: '샤오미',
  SKMagic: 'SK매직',
  Cuckoo: '쿠쿠',
  Roborock: '로보락',
};

export const CATEGORY_LABELS: Record<string, string> = {
  에어컨: '에어컨',
  제습기: '제습기',
  공기청정기: '공기청정기',
  선풍기: '선풍기',
  세탁기: '세탁기',
  건조기: '건조기',
  냉장고: '냉장고',
  식기세척기: '식기세척기',
  정수기: '정수기',
  로봇청소기: '로봇청소기',
};

export const ROOM_SIZE_LABELS: Record<string, string> = {
  원룸: '원룸 (7평 이하)',
  소형: '소형 (7~15평)',
  중형: '중형 (15~25평)',
  대형: '대형 (25~35평)',
  초대형: '초대형 (35평 이상)',
};
