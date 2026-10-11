// src/lib/data/editorial/product-editorial.ts 를 생성한다.
//
//   node scripts/generate-editorial.mjs
//
// 기본 입력은 세 개의 출처 표다. 정확한 모델의 독립 기관 자료는 아래
// INDEPENDENT_PRODUCT_SOURCES에 검증 기록과 함께 추가한다.
//   verified-specs.ts  VERIFIED_SPECS         사양 수치를 어디서 봤는가
//                      VERIFIED_PRICES        가격을 어디서 봤는가
//                      VERIFIED_PRODUCT_PAGES 그 밖에 제품을 대조한 페이지
//
// 손으로 편집 메타데이터를 고치면 다음 생성 때 날아간다. 출처를 추가하려면
// 위 세 표 중 맞는 곳에 적고 이 스크립트를 다시 돌린다.
//
// 기존 파일에 이미 있던 출처는 URL 기준으로 보존한다 — 파일럿 9개 제품의
// 출처는 표가 아니라 손으로 조사한 것이라 표에서 복원되지 않기 때문이다.

import { readFileSync, writeFileSync } from 'node:fs';

const SPECS_FILE = 'src/lib/data/appliances/verified-specs.ts';
const OUT_FILE = 'src/lib/data/editorial/product-editorial.ts';
const DATA_DIR = 'src/lib/data/appliances';
const BRAND_FILES = [
  'samsung', 'lg', 'carrier', 'tcl', 'haier', 'dyson', 'shinil', 'xiaomi',
  'coway', 'winix', 'skmagic', 'cuckoo', 'roborock', 'apple', 'sony', 'anker', 'qcy',
];

const specsSrc = readFileSync(SPECS_FILE, 'utf-8');
const prevSrc = readFileSync(OUT_FILE, 'utf-8');

/** 도메인 → 사람이 읽는 발행처 이름 */
const PUBLISHER = [
  [/(^|\.)apple\.com$/, 'Apple'],
  [/(^|\.)samsung\.com$/, '삼성전자'],
  [/(^|\.)lge\.co\.kr$/, 'LG전자'],
  [/(^|\.)dyson\.co\.kr$/, 'Dyson'],
  [/(^|\.)skmagic\.com$/, 'SK매직'],
  [/(^|\.)danawa\.com$/, '다나와'],
  [/(^|\.)roborock\.com$/, 'Roborock'],
  [/(^|\.)tcl\.com$/, 'TCL'],
  [/(^|\.)mi\.com$/, 'Xiaomi'],
  [/(^|\.)sony\.co\.kr$/, 'Sony'],
  [/(^|\.)coway\.com$/, '코웨이'],
  [/(^|\.)ylshop\.co\.kr$/, 'QCY 공식 수입사'],
];
const publisherOf = (url) => {
  const host = new URL(url).hostname;
  for (const [re, name] of PUBLISHER) if (re.test(host)) return name;
  return host;
};

// 모델명이 정확히 일치하는 기관 목록. 적용 범위는 research/evidence/2026-10-01/
// coway-wqa-independent-performance.md와 kwtc-exact-water-purifier-register.md에 기록했다.
const INDEPENDENT_PRODUCT_SOURCES = {
  'coway-handpick-water-purifier-compact': [
    { url: 'https://find.wqa.org/find-products/ctl/detail/mid/1054/cid/coway_co_ltd/sid/1/keyword/7400n', title: 'CHPI-7400N 완제품 NSF/ANSI 42 인증 항목', publisher: 'Water Quality Association' },
    { url: 'https://find.wqa.org/find-products/ctl/detail/mid/1054/cid/coway_co_ltd/sid/3/keyword/7400n', title: 'CHPI-7400N 완제품 NSF/ANSI 53 인증 항목', publisher: 'Water Quality Association' },
    { url: 'https://find.wqa.org/find-products/ctl/detail/mid/1054/cid/coway_co_ltd/sid/63/keyword/7400n', title: 'CHPI-7400N 완제품 NSF/ANSI 401 인증 항목', publisher: 'Water Quality Association' },
    { url: 'https://portal.kwtc.or.kr/common/fileDownload.do?atchFileId=426991&fileSn=1', title: '2026-07-09 정수기 품질검사 유효 제품현황 6쪽 323번', publisher: '한국물기술인증원' },
  ],
  // 상세 리뷰·정수기 비교 글이 이 목록의 WD523ACB 1,500L 등재를 인용하는데 출처 목록에는 빠져 있었다(2026-10-08 3차).
  'lg-puricare-water-purifier-objet': [
    { url: 'https://portal.kwtc.or.kr/common/fileDownload.do?atchFileId=426991&fileSn=1', title: '2026-07-09 정수기 품질검사 유효 제품현황 3쪽 112번', publisher: '한국물기술인증원' },
  ],
};

// 정확한 모델 페이지에서 연결한 계열 설명서와 모델별 공단 신고값.
const VERIFIED_MODEL_SOURCES = {
  'anker-soundcore-liberty5': [
    { url: 'https://www.soundcore.com/products/a3957-liberty-5-tws-earbuds?variant=45054923014334', title: 'A3957 Liberty 5 제조사 사양·재생 조건', publisher: 'soundcore' },
    { url: 'https://service.soundcore.com/article-description/Can-I-use-Dual-Connections-and-LDAC-or-Dolby-Sound-simultaneously', title: '두 기기 연결과 LDAC·Dolby 동시 사용, 배터리 조건', publisher: 'soundcore' },
  ],
  'sony-wf-1000xm5': [
    { url: 'https://helpguide.sony.net/mdr/2963/v1/en/contents/TP1001106282.html', title: 'WF-1000XM5 두 기기 연결·재생 전환 안내', publisher: 'Sony' },
    { url: 'https://www.sony.co.kr/headphones/products/wf-1000xm5/spec', title: 'WF-1000XM5 코덱·배터리 공식 사양', publisher: 'Sony' },
    { url: 'https://www.sony.co.kr/headphones/products/wf-1000xm5/features8', title: 'WF-1000XM5 기능성 — 케이스 포함 24·36시간, 3분 충전, 방수 제외 각주', publisher: 'Sony' },
    { url: 'https://www.sony.co.kr/headphones/products/wf-1000xm5/features3', title: 'WF-1000XM5 통화 품질 — 골전도 센서', publisher: 'Sony' },
    { url: 'https://www.sony.co.kr/headphones/products/wf-1000xm5/features4', title: 'WF-1000XM5 디자인과 착용감 — XM4 대비 약 25%·20%, 팁 4종', publisher: 'Sony' },
  ],
  'samsung-galaxy-buds3-pro': [
    { url: 'https://www.samsung.com/sec/buds/galaxy-buds/galaxy-buds3-pro/', title: '버즈3 프로 고해상 오디오·Galaxy 기능 조건', publisher: '삼성전자' },
    { url: 'https://www.samsung.com/sec/buds/galaxy-buds/galaxy-buds3-pro/specs/', title: '갤럭시 버즈3 프로 상세 스펙 — 통화 시간·배터리 용량·크기', publisher: '삼성전자' },
  ],
  'qcy-melobuds-pro': [
    { url: 'https://www.qcy.com/products/qcy-melobuds-pro?spec=1879', title: 'MeloBuds Pro 국제 판매 사양·시험 조건', publisher: 'QCY' },
  ],
  'apple-airpods-pro3': [
    { url: 'https://www.apple.com/kr/airpods-pro/specs/', title: 'AirPods Pro 3 재생 시간·방수 사양', publisher: 'Apple' },
    { url: 'https://www.apple.com/kr/airpods-pro/feature-availability/', title: '청각 건강 기능 지역·기기·연령 조건', publisher: 'Apple' },
    { url: 'https://support.apple.com/ko-kr/guide/airpods/dev228ba3df8/web', title: 'Apple 기기 간에 AirPods 연결 전환하기', publisher: 'Apple' },
    { url: 'https://support.apple.com/ko-kr/guide/airpods/dev499c9718b/web', title: '타사 기기와 AirPods 페어링하기', publisher: 'Apple' },
  ],
  'samsung-the-movingstyle': [
    { url: 'https://www.samsung.com/sec/support/model/KU27LSFM7AXXKR/', title: 'KU27LSFM7AXXKR 화면·무게·배터리 사양', publisher: '삼성전자' },
    { url: 'https://www.samsung.com/sec/tvs/the-movingstyle-lsfm7-d2c/KU27LSFM7AXXKR/', title: 'KU27LSFM7AXXKR 배터리 시험 조건·킥스탠드·터치 조건', publisher: '삼성전자' },
    { url: 'https://downloadcenter.samsung.com/content/EM/202605/20260508041921001/BN68-23869C-01_SUG_LSM7F%2027_KR_KOR_260417.0.pdf', title: 'LSM7F 27 사용자 가이드 — 음성 출력 10W(5W×2)·배터리 충전·사용 환경', publisher: '삼성전자' },
    { url: 'https://www.lge.co.kr/stan-by-me/27lx6tpga', title: '비교 대상 스탠바이미 2(27LX6TPGA) 화면·배터리·별매 액세서리', publisher: 'LG전자' },
  ],
  'lg-standbyme2': [
    { url: 'https://www.lge.co.kr/stan-by-me/27lx6tpga', title: '27LX6TPGA 화면·배터리·별매 액세서리', publisher: 'LG전자' },
    { url: 'https://gscs-b2c.lge.com/open/downloadFile?fileId=Tl3sJzEVjhEk8mS5e3tmw', title: '27LX6TPGA 사용설명서 — 배터리 85.15Wh(제품 페이지 비교표는 90Wh)·USB PD 충전·보증', publisher: 'LG전자' },
  ],
  'lg-standbyme2-max': [
    { url: 'https://www.lge.co.kr/stan-by-me/32lx6bpga', title: '32LX6BPGA 4K·배터리·가상 음향 조건', publisher: 'LG전자' },
    { url: 'https://gscs-b2c.lge.com/open/downloadFile?fileId=QtVqT3GbiUtdGG5demnHcg', title: '32LX6BPGA 사용설명서 — 배터리 144Wh·USB PD 충전·보증', publisher: 'LG전자' },
    { url: 'https://www.lge.co.kr/stan-by-me/27lx6tpga', title: '비교 대상 스탠바이미 2(27LX6TPGA) 화면·배터리·별매 액세서리', publisher: 'LG전자' },
  ],
  'lg-standbyme-go': [
    { url: 'https://www.lge.co.kr/stan-by-me/27lx5qkna', title: '27LX5QKNA 케이스·무게·판매 상태', publisher: 'LG전자' },
    { url: 'https://gscs-b2c.lge.com/open/downloadFile?fileId=z0LRJfepnQfS0bHp7CZT4g', title: '27LX5QKNA 사용설명서 — 배터리 74Wh·완충 시간·보증', publisher: 'LG전자' },
    { url: 'https://www.lge.co.kr/stan-by-me/27lx6tpga', title: '비교 대상 스탠바이미 2(27LX6TPGA) 화면·배터리·별매 액세서리', publisher: 'LG전자' },
  ],
  'tcl-tac-12csd-wall': [
    { url: 'https://www.tcl.com/kr/ko/air-conditioners/tac-12csd-tph11i', title: 'TAC-12CSD/TPH11I 표시 면적·기류 기능', publisher: 'TCL' },
    { url: 'https://eep.energy.or.kr/certification/certi_view_260.aspx?no=260240214', title: 'TAC-12CSD/TPH11I-I·O 냉방효율 신고값', publisher: '한국에너지공단' },
  ],
  'samsung-bespoke-grande-wf24a9500': [
    { url: 'https://downloadcenter.samsung.com/content/UM/202304/20230407100730025/Drum_WF8000AK_WF21A9400_WF24A9500_9501.pdf', title: 'WF24A9500KE 지원 페이지의 공용 사용설명서, 인쇄 5·8·11·15·27·31·39~46·55·72~78쪽', publisher: '삼성전자' },
    { url: 'https://www.samsungsvc.co.kr/solution/25169', title: '[삼성 건조기] 직렬·병렬 설치 시 사이즈와 설치 키트(SKK-AL*) 안내', publisher: '삼성전자서비스' },
    { url: 'https://www.samsungsvc.co.kr/solution/1491476', title: '[삼성 세탁기] HC·HE 점검 코드 — 세탁 히터 동작 이상', publisher: '삼성전자서비스' },
    { url: 'https://www.samsungsvc.co.kr/solution/1491469', title: '[삼성 세탁기] FC·FE 점검 코드 — 건조 팬 모터 동작 이상', publisher: '삼성전자서비스' },
  ],
  'samsung-bespoke-grande-dv17a9720': [
    { url: 'https://downloadcenter.samsung.com/content/UM/202504/20250401094234705/WM0013_IB_DV8700TK_DV19A9740_KO_250313.pdf', title: 'DV17A9720BV 지원 페이지의 공용 사용설명서, 인쇄 13~14·16·33·35~37·52·60·63·65~66·76~77·80~81쪽', publisher: '삼성전자' },
    { url: 'https://www.samsungsvc.co.kr/solution/25169', title: '[삼성 건조기] 직렬·병렬 설치 시 사이즈와 설치 키트(SKK-AL*) 안내', publisher: '삼성전자서비스' },
    { url: 'https://downloadcenter.samsung.com/content/UM/202103/20210304125357740/Stacking_kit_2_DC68-03859F-00_KR_0208.pdf', title: 'STACKING KIT 설치 가이드(SKK-AL*) — 직렬 설치 시 건조기 직배수', publisher: '삼성전자' },
  ],
  'samsung-wind-free-ar07a9170': [
    { url: 'https://downloadcenter.samsung.com/content/UM/202105/20210513131032816/RAC068-02_IB_21Y_AR9500T_MOTION_DETECT_KR_KO_210428-D04.pdf', title: 'AR07A9170HCN 포함 공용 사용설명서, 인쇄 7·9·28·29·31·34·38쪽', publisher: '삼성전자' },
    { url: 'https://eep.energy.or.kr/certification/certi_view_260.aspx?no=260200419', title: 'AR07A9170HCN·AR07A9170HAX 냉방효율 신고값', publisher: '한국에너지공단' },
    // 공용 설명서를 정확 모델에 연결하는 모델별 페이지. 2026-10-09 사용자 승인으로 등재(제트봇 AI와 같은 기준 — samsungsvc.co.kr는 OFFICIAL_DOMAINS의 별도 발행처).
    { url: 'https://www.samsungsvc.co.kr/download/view?code=AR07A9170HCN&prd1DepNm=%EC%97%90%EC%96%B4%EC%BB%A8&prd2DepNm=%EB%B2%BD%EA%B1%B8%EC%9D%B4%28%EC%B0%BD%EB%AC%B8%29%20%EC%97%90%EC%96%B4%EC%BB%A8', title: 'AR07A9170HCN 모델별 다운로드 — 공용 설명서 RAC068-02 연결', publisher: '삼성전자서비스' },
  ],
  'samsung-bespoke-ai-combo-wd25': [
    { url: 'https://downloadcenter.samsung.com/content/UM/202608/20260818083830741/OID76616_IB_T-PJT_WD8000D-AD_7LCD_KO_260814.pdf', title: 'WD25DB8995BZ 지원 페이지의 공용 사용설명서, 인쇄 4·7·18~20·24~27·41·43~50·61~63·67·69·71~74쪽', publisher: '삼성전자' },
  ],
  'lg-dios-obje-4door-t873': [
    { url: 'https://gscs-b2c.lge.com/open/downloadFile?fileId=a8sdGu0vrerKMqWmu5nkQ', title: 'T873MEE111 지원 페이지의 공용 사용설명서, 인쇄 14~15·20~21·25~27·33쪽', publisher: 'LG전자' },
    { url: 'https://www.lge.co.kr/support/rates-warranty-guide', title: 'LG전자 제품 보증기간·핵심부품 무상수리 안내', publisher: 'LG전자' },
    { url: 'https://eep.energy.or.kr/certification/certi_view_252.aspx?no=252220489&page=1', title: 'T873MEE111 냉장고 효율 신고값', publisher: '한국에너지공단' },
  ],
  'lg-dios-obje-sxs-s834': [
    { url: 'https://gscs-b2c.lge.com/open/downloadFile?fileId=pYFpi7CzmmgetzthPkurQ', title: 'S834MWW1D 지원 페이지의 공용 사용설명서, 인쇄 14~15·21·25·27쪽', publisher: 'LG전자' },
    { url: 'https://www.lge.co.kr/support/rates-warranty-guide', title: 'LG전자 제품 보증기간·핵심부품 무상수리 안내', publisher: 'LG전자' },
    { url: 'https://eep.energy.or.kr/certification/certi_view_252.aspx?no=252220710&page=1', title: 'S834MWW1D 냉장고 효율 신고값', publisher: '한국에너지공단' },
  ],
  'lg-puricare-water-purifier-objet': [
    { url: 'https://gscs-b2c.lge.com/open/downloadFile?fileId=jO7RH8OLgibKoMzZYJqKw', title: 'WD523A** 포함 데스크 정수기 공용 설명서, 인쇄 14·17·29·31~33쪽', publisher: 'LG전자' },
    { url: 'https://eep.energy.or.kr/certification/certi_view_159.aspx?no=282230026', title: 'WD523ACB 정수기 효율 신고값', publisher: '한국에너지공단' },
  ],
  'lg-codezero-r5-robot': [
    { url: 'https://www.lge.co.kr/support/solutions-20153096346359', title: '코드제로 R5 충돌·범퍼·라이다 증상별 점검', publisher: 'LG전자' },
  ],
  'samsung-bespoke-jetbot-ai': [
    { url: 'https://images.samsung.com/is/content/samsung/assets/nz/ha/guides/vac/VR50T95735W-SA_V2.pdf', title: 'VR50T95735W/SA 해외 지역형 제품 자료', publisher: '삼성전자' },
    { url: 'https://www.samsungsvc.co.kr/solution/4048329', title: '제트봇 브러시 이물질 제거 및 재조립 안내', publisher: '삼성전자서비스' },
    { url: 'https://www.samsungsvc.co.kr/shop/product/0000079860', title: '제트봇 청정스테이션 먼지봉투 판매가·적용 모델', publisher: '삼성전자서비스' },
    { url: 'https://www.samsung.com/es/vacuum-cleaners/robot/vr9500t-white-vr50t95735w-wa/', title: 'VR50T95735W/WA 해외 지역형 사양표 — 3D 센서 범위·흡입력(SET)', publisher: '삼성전자' },
    { url: 'https://www.samsung.com/sec/support/model/VR50T95935W/', title: 'VR50T95935W 국내 지원 페이지 — 센서·치수·소비전력', publisher: '삼성전자' },
    { url: 'https://downloadcenter.samsung.com/content/UM/202512/20251216141652843/O-DJ68-00846A-16_IB_VR9500_KO_KO_251209.pdf', title: 'VR50T95**** 국내 공용 사용설명서(ver.16, 2025-12-16)', publisher: '삼성전자' },
  ],
  'roborock-s8-proultra': [
    { url: 'https://help.roborock.com/us/product/s8-pro-ultra-message?category=troubleshooting', title: 'S8 Pro Ultra 모델별 오류 안내', publisher: 'Roborock' },
    { url: 'https://de.roborock.com/products/roborock-s8-pro-ultra', title: 'S8 Pro Ultra 제조사 제품 사양', publisher: 'Roborock' },
    { url: 'https://support.roborock.com/hc/en-us/article_attachments/18342044174873', title: 'S8 Pro Ultra 공식 사용설명서 — 도크 설치·관리', publisher: 'Roborock' },
    { url: 'https://ca.roborock.com/pages/roborock-s8-pro-ultra', title: 'S8 Pro Ultra 제조사 사양·시험 각주(캐나다)', publisher: 'Roborock' },
    { url: 'https://kr.roborock.com/blogs/roborock-kr/comparison-of-roborock-s8-pro-ultra-and-s7-max-ultra', title: 'S8 Pro Ultra와 S7 Max Ultra 사양 비교 — 먼지통 350ml', publisher: 'Roborock' },
    // 커뮤니티 원자료라 색인 게이트 계산에는 들어가지 않는다(source-trust). 상세 리뷰의 7일 전력 계산이 인용한다.
    { url: 'https://www.roboter-forum.com/threads/stromverbrauch-des-s8-pro-ultra.66036/', title: 'S8 Pro Ultra 소유자 콘센트 전력계의 7일 운전 기록 — 단일 가정 사례', publisher: 'Roboter-Forum 작성자' },
  ],
  'roborock-qrevo-curv': [
    { url: 'https://support.roborock.com/hc/en-us/article_attachments/46138473099289', title: 'Qrevo Curv 공식 설명서 — 도크 확보 공간', publisher: 'Roborock' },
    { url: 'https://help.roborock.com/us/product/roborock-qrevo-curv-message?category=troubleshooting', title: 'Qrevo Curv 모델별 오류 안내', publisher: 'Roborock' },
    { url: 'https://kr.roborock.com/pages/roborock-qrevo-curv', title: 'Qrevo Curv 국내 제품 사양 및 옵션', publisher: 'Roborock' },
  ],
  'cuckoo-dishwasher-table-cdw61': [
    { url: 'https://www.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/200424%3Dz0383-0082a0%20rev.1_cdw-a0611t.pdf', title: 'CDW-A0611TS·TW 사용설명서, 인쇄 2·9·11·15·17~20·22~23·25·32쪽', publisher: '쿠쿠전자' },
  ],
  'xiaomi-smart-air-purifier-4': [
    { url: 'https://www.mi.com/kr/product/xiaomi-smart-air-purifier-4/specs/', title: 'Xiaomi 스마트 공기청정기 4 AC-M16-SC 사양', publisher: 'Xiaomi' },
    { url: 'https://www.mi.com/kr/support/faq/details/KA-32487/', title: '스마트 공기청정기 4 정품 필터 인식 안내', publisher: 'Xiaomi' },
    { url: 'https://www.mi.com/kr/support/faq/details/KA-27892/', title: '스마트 공기청정기 4 Wi-Fi 연결 안내', publisher: 'Xiaomi' },
    { url: 'https://eep.energy.or.kr/certification/certi_view_121.aspx?no=288250041', title: 'AC-M16-SC 공기청정기 효율 신고값(표준사용면적 45.5㎡·2등급)', publisher: '한국에너지공단' },
    { url: 'https://eep.energy.or.kr/certification/certi_view_121.aspx?no=288210331', title: 'AC-M16-SC 공기청정기 효율 신고값(43.2㎡·3등급)', publisher: '한국에너지공단' },
    { url: 'https://eep.energy.or.kr/certification/certi_view_121.aspx?no=288210338', title: 'AC-M16-SC 공기청정기 효율 신고값(42.5㎡·3등급)', publisher: '한국에너지공단' },
    { url: 'https://eep.energy.or.kr/certification/certi_view_121.aspx?no=288210356', title: 'AC-M16-SC 공기청정기 효율 신고값(43㎡·3등급)', publisher: '한국에너지공단' },
  ],
  'dyson-pure-cool-tp07': [
    { url: "https://www.dyson.co.kr/360-glass-hepa-carbon-air-purifier-filter", title: "965432-01 TP07·HP09 호환 필터 — 2026-10-08 판매가·교체 주기", publisher: "Dyson" },
    { url: "https://www.dyson.co.kr/products/tools-and-accessories/air-purifier-filters", title: "Dyson 필터 교체 FAQ — 하루 12시간·12개월 조건", publisher: "Dyson" },
    { url: 'https://www.dyson.co.uk/content/dam/dyson/maintenance/user-guides/kr_kr/EC_438E_TP09_07_User_Manual.pdf', title: '다이슨 TP07·TP09 한국어 사용설명서', publisher: 'Dyson' },
  ],
  'dyson-hot-cool-hp09': [
    { url: "https://www.dyson.co.kr/360-glass-hepa-carbon-air-purifier-filter", title: "965432-01 TP07·HP09 호환 필터 — 2026-10-08 판매가·교체 주기", publisher: "Dyson" },
    { url: "https://www.dyson.co.kr/products/tools-and-accessories/air-purifier-filters", title: "Dyson 필터 교체 FAQ — 하루 12시간·12개월 조건", publisher: "Dyson" },
    { url: 'https://www.dyson.co.uk/content/dam/dyson/maintenance/user-guides/kr_kr/EC_527E_HP09_User_Manual.pdf', title: '다이슨 HP09 한국어 사용설명서', publisher: 'Dyson' },
    { url: 'https://eep.energy.or.kr/certification/certi_view_121.aspx?no=288210259', title: 'HP09 공기청정기 효율 신고 — 표준사용면적 13.3㎡·4등급(2021-08-26)', publisher: '한국에너지공단' },
    { url: 'https://eep.energy.or.kr/certification/certi_view_121.aspx?no=288230024', title: 'HP09 XX 공기청정기 효율 신고 — 표준사용면적 18.7㎡·4등급(2023-02-02)', publisher: '한국에너지공단' },
    { url: 'https://www.law.go.kr/행정규칙/효율관리기자재운용규정', title: '효율관리기자재 운용규정 — 전기온풍기 월간에너지비용 산정식', publisher: '국가법령정보센터' },
  ],
  'tcl-tac-08csd-wall': [
    { url: 'https://eep.energy.or.kr/certification/certi_view_260.aspx?no=260240215', title: 'TAC-08CSD/TPH11I-I·O 냉방효율 신고값', publisher: '한국에너지공단' },
  ],
  'coway-handpick-water-purifier-compact': [
    { url: 'https://eep.energy.or.kr/certification/certi_view_159.aspx?no=282260052', title: 'CHPI-7400N 정수기 효율 신고값', publisher: '한국에너지공단' },
  ],
  'haier-cth06qbw-wall': [
    { url: 'https://www.haier.co.kr/include/download.asp?file_name=HSU06_Series__CTH06_Series_%EC%82%AC%EC%9A%A9%EC%84%A4%EB%AA%85%EC%84%9C_20240221.pdf&file_full_name=00000002312024000262_file1.pdf&folder=0000000231', title: 'CTH06 계열 사용설명서 PDF, 인쇄 14·17·26·28·30쪽', publisher: '하이얼' },
  ],
  'haier-cth10qbw-wall': [
    { url: 'https://www.haier.co.kr/include/download.asp?file_name=HSU10Q_Series__CTH10Q_Series_%EC%82%AC%EC%9A%A9%EC%84%A4%EB%AA%85%EC%84%9C_20240221.pdf&file_full_name=00000002312024000264_file1.pdf&folder=0000000231', title: 'CTH10Q 계열 사용설명서 PDF, 인쇄 14·17·28쪽', publisher: '하이얼' },
  ],
  'samsung-bespoke-4door-rf85': [
    { url: 'https://www.samsungsvc.co.kr/info/fee?tab=assure', title: '삼성전자서비스 핵심부품 무상보증 기간표', publisher: '삼성전자서비스' },
    { url: 'https://downloadcenter.samsung.com/content/UM/202312/20231211100502613/RF9000C_CC_2023_UM_DA68-04671A_KO_UA_230804.pdf', title: 'RF85C90D1AP 지원 페이지의 RF60/85/84C* 공용 사용설명서, 인쇄 5·9·11·13·26·47~48·74·89·97~98쪽', publisher: '삼성전자' },
    { url: 'https://downloadcenter.samsung.com/content/EM/202604/20260401071252508/DA68-04370A-05_IB_REF_KO_KO_260304.pdf', title: 'RF85C90D1AP 지원 페이지 Quick Guide(2026-04-01 게시), 2쪽 품질 보증서', publisher: '삼성전자' },
    { url: 'https://eep.energy.or.kr/certification/certi_view_252.aspx?no=252230128&page=1', title: 'RF85C90D1AP 냉장고 효율 신고값(월 41.38kWh·연간에너지비용 79,000원)', publisher: '한국에너지공단' },
  ],
  // 같은 삼성 문서·공단 신고라 색인 게이트의 독립 발행처 수는 늘지 않는다(RS84는 계속 noindex).
  'samsung-bespoke-sxs-rs84': [
    { url: 'https://downloadcenter.samsung.com/content/UM/202206/20220608185736816/RS5000T_3Door.pdf', title: 'RS84B5061M9 지원 페이지의 양문형 공용 사용설명서, 인쇄 4·24~25·50·62·70~72쪽', publisher: '삼성전자' },
    { url: 'https://eep.energy.or.kr/certification/certi_view_252.aspx?no=252230494&page=1', title: 'RS84B5061M9 냉장고 효율 신고값', publisher: '한국에너지공단' },
  ],
  'skmagic-allin-water-purifier-wpu': [
    { url: 'https://eep.energy.or.kr/certification/certi_view_159.aspx?no=282180025', title: 'WPU-A710C 정수기 효율 신고값', publisher: '한국에너지공단' },
  ],
  'winix-posong-dehumidifier-16l': [
    { url: 'https://www.winix.com/product/790', title: 'DN2H160-IWK 위닉스 제품 페이지', publisher: '위닉스' },
    { url: 'https://kr.object.ncloudstorage.com/w2r-commerce-winix/USEMANUAL/202507/250722111846926-78c8424e1fa84ce2bc3fd07992f4d6f2.pdf', title: '위닉스 DN2 계열 사용설명서', publisher: '위닉스' },
    { url: 'https://eep.energy.or.kr/certification/certi_view_145.aspx?no=283190073', title: 'DN2H160-IWK 제습기 효율 신고값', publisher: '한국에너지공단' },
    { url: 'https://www.law.go.kr/행정규칙/효율관리기자재운용규정', title: '효율관리기자재 운용규정 — 제습기 측정방법·월간소비전력량(×171h)·에너지비용(×160원) 산정식', publisher: '국가법령정보센터' },
  ],
};

// 정확한 모델의 근거가 아닌 것으로 확인돼 철회한 출처. 기존 출처는 URL 기준으로 보존되므로
// 표에서 지우는 것만으로는 빠지지 않는다. 여기 적어야 빠진다.
// 근거: research/evidence/content-value-2026-10-08/pass2/coordinator.json
const RETRACTED_SOURCES = {
  // AR07A9170HCS(2021년형·4등급·23.1㎡·0.75kW) 상품 페이지. 공개 모델 HCN의 가격 근거가 아니다.
  'samsung-wind-free-ar07a9170': ['https://prod.danawa.com/info/?pcode=122688519'],
  // 본문·블로그가 인용하지 않는 시장 기사(비노출 후기 데이터에만 남음). 2026-10-09 외부 평가의 '출처 부풀림' 지적으로 철회.
  'samsung-the-movingstyle': ['https://dpg.danawa.com/news/view?boardSeq=63&listSeq=5942825', 'https://view.asiae.co.kr/article/2026011510080029708'],
  'lg-standbyme2': ['https://dpg.danawa.com/news/view?boardSeq=63&listSeq=5942825'],
};

// 가격 출처가 정확한 모델이 아니라 같은 사양의 다른 구성일 때, 그 조건을 출처 제목에 밝힌다.
const SOURCE_TITLE_OVERRIDES = {
  'https://ylshop.co.kr/product/qcy-ht08-멜로버즈-프로-플러스-블루투스-이어폰-노이즈캔슬링-블랙/977/category/24/display/1/': 'QCY-HT08 멜로버즈 프로 플러스 국내 수입사 상품 상세 — 사양표·LDAC와 멀티포인트 조건',
  'https://prod.danawa.com/info/?pcode=14760566': 'WF24A9500KF(새틴 그린, KE와 색상만 다름) 상품 가격 정보',
  'https://prod.danawa.com/info/?pcode=20419955': 'RF85C90D1 코타 화이트 구성(RF85C90D1AP 동일스펙 표기) 가격 정보',
};

const REVIEWED_AT_OVERRIDES = {
  'samsung-wind-free-ar07a9170': '2026-10-09',
  'samsung-bespoke-grande-wf24a9500': '2026-10-09',
  'samsung-bespoke-grande-dv17a9720': '2026-10-09',
  'samsung-bespoke-4door-rf85': '2026-10-09',
  'samsung-bespoke-sxs-rs84': '2026-10-08',
  'samsung-bespoke-jetbot-ai': '2026-10-09',
  'samsung-bespoke-ai-combo-wd25': '2026-10-09',
  'samsung-the-movingstyle': '2026-10-09',
  'samsung-galaxy-buds3-pro': '2026-10-09',
  'lg-dios-obje-4door-t873': '2026-10-09',
  'lg-puricare-water-purifier-objet': '2026-10-09',
  'lg-codezero-r5-robot': '2026-10-09',
  'lg-dios-obje-sxs-s834': '2026-10-09',
  'lg-standbyme2': '2026-10-09',
  'lg-standbyme2-max': '2026-10-09',
  'lg-standbyme-go': '2026-10-09',
  'tcl-tac-08csd-wall': '2026-10-09',
  'tcl-tac-12csd-wall': '2026-10-09',
  'haier-cth06qbw-wall': '2026-10-09',
  'haier-cth10qbw-wall': '2026-10-09',
  'dyson-pure-cool-tp07': '2026-10-09',
  'dyson-hot-cool-hp09': '2026-10-09',
  'xiaomi-smart-air-purifier-4': '2026-10-09',
  'coway-handpick-water-purifier-compact': '2026-10-09',
  'winix-posong-dehumidifier-16l': '2026-10-09',
  'skmagic-touchon-dishwasher-dwa81': '2026-10-08',
  'skmagic-allin-water-purifier-wpu': '2026-10-08',
  'cuckoo-dishwasher-table-cdw61': '2026-10-09',
  'roborock-s8-proultra': '2026-10-09',
  'roborock-qrevo-curv': '2026-10-09',
  'apple-airpods-pro3': '2026-10-09',
  'sony-wf-1000xm5': '2026-10-09',
  'anker-soundcore-liberty5': '2026-10-09',
  'qcy-melobuds-pro': '2026-10-09'
};

// ── 출처 표 파싱
const specs = {};
for (const m of specsSrc.matchAll(
  /^ {2}'([^']+)': \{\n\s*fields: \[([^\]]*)\],\n\s*source: '([^']+)',\n\s*\},$/gm,
)) {
  specs[m[1]] = { source: m[3] };
}

const prices = {};
for (const m of specsSrc.matchAll(
  // variant(색상·구성만 다른 상품 표기)는 화면용 선택 필드라 여기서는 읽지 않는다(2026-10-09).
  /^ {2}'([^']+)': \{ source: '([^']+)', checkedAt: '([^']+)'(?:, variant: '[^']*')? \},$/gm,
)) {
  prices[m[1]] = { source: m[2], checkedAt: m[3] };
}

const productPages = {};
for (const m of specsSrc.matchAll(
  /^ {2}'([^']+)': \{\n\s*source: '([^']+)',\n\s*what: '((?:[^'\\]|\\.)*)',\n\s*checkedAt: '([^']+)',\n\s*\},$/gm,
)) {
  productPages[m[1]] = { source: m[2], what: m[3] };
}

// ── 기존 출처 보존
const existing = {};
const unesc = (s) => s.replace(/\\'/g, "'").replace(/\\\\/g, '\\');
for (const block of prevSrc.split(/\n {2}'/).slice(1)) {
  const slug = block.slice(0, block.indexOf("'"));
  const sources = [];
  for (const m of block.matchAll(
    /url: '([^']+)',\n\s*title: '((?:[^'\\]|\\.)*)',\n\s*publisher: '((?:[^'\\]|\\.)*)',/g,
  )) {
    sources.push({ url: m[1], title: unesc(m[2]), publisher: unesc(m[3]) });
  }
  for (const m of block.matchAll(
    /\{ url: '([^']+)', title: '((?:[^'\\]|\\.)*)', publisher: '((?:[^'\\]|\\.)*)' \}/g,
  )) {
    sources.push({ url: m[1], title: unesc(m[2]), publisher: unesc(m[3]) });
  }
  const publishedAt = block.match(/publishedAt: '([^']+)'/)?.[1];
  const updatedAt = block.match(/updatedAt: '([^']+)'/)?.[1];
  const priceCheckedAt = block.match(/priceCheckedAt: '([^']+)'/)?.[1];
  if (sources.length) existing[slug] = { sources, publishedAt, updatedAt, priceCheckedAt };
}

// ── 제품 이름 (출처 제목에 쓴다)
const names = {};
for (const f of BRAND_FILES) {
  const src = readFileSync(`${DATA_DIR}/${f}.ts`, 'utf-8');
  for (const block of src.split('\n  {\n').slice(1)) {
    const slug = block.match(/^ {4}slug: '([^']+)'/m)?.[1];
    const name = block.match(/^ {4}name: '([^']+)'/m)?.[1];
    if (slug && name) names[slug] = name;
  }
}

const slugs = [
  ...new Set([
    ...Object.keys(specs),
    ...Object.keys(prices),
    ...Object.keys(productPages),
    ...Object.keys(existing),
    ...Object.keys(VERIFIED_MODEL_SOURCES),
  ]),
].sort();

const L = [];
const esc = (s) => s.replace(/'/g, "\\'");
L.push("import type { EditorialMeta } from '@/types/editorial';");
L.push("import { SITE_AUTHOR } from '@/lib/constants';");
L.push('');
L.push('/**');
L.push(' * 제품별 편집 신뢰 정보.');
L.push(' *');
L.push(' * ⚠️ 이 파일은 생성물이다. 손으로 고치지 말고 scripts/generate-editorial.mjs 를 돌린다.');
L.push(' *    출처를 추가하려면 verified-specs.ts 의 세 표 중 맞는 곳에 먼저 적는다:');
L.push(' *      VERIFIED_SPECS         사양 수치의 출처');
L.push(' *      VERIFIED_PRICES        가격의 출처');
L.push(' *      VERIFIED_PRODUCT_PAGES 그 밖에 제품을 대조한 페이지');
L.push(' *    정확한 모델의 독립 기관 자료는 생성 스크립트의 INDEPENDENT_PRODUCT_SOURCES에 적는다.');
L.push(' *');
L.push(' * 근거가 없는 제품에는 레코드를 만들지 않는다. 빈 레코드로 채우면 색인 품질');
L.push(' * 게이트(src/lib/content-quality.ts)가 통과 도장 찍는 기계가 된다.');
L.push(' */');
L.push('export const PRODUCT_EDITORIAL: Record<string, EditorialMeta> = {');

let records = 0;
for (const slug of slugs) {
  const seen = new Set();
  const out = [];
  const retracted = new Set(RETRACTED_SOURCES[slug] ?? []);
  // 같은 URL이 기존 파일에도 있으면 표의 제목을 따른다. 표가 입력이고 기존 파일은 생성물이라,
  // 그렇게 하지 않으면 표에서 고친 쪽수·조건이 옛 제목에 가려 반영되지 않는다.
  const tableTitle = new Map(
    [...(INDEPENDENT_PRODUCT_SOURCES[slug] ?? []), ...(VERIFIED_MODEL_SOURCES[slug] ?? [])]
      .map((source) => [source.url, source.title]),
  );
  const push = (url, title, publisher) => {
    if (seen.has(url) || retracted.has(url)) return;
    seen.add(url);
    out.push({ url, title: SOURCE_TITLE_OVERRIDES[url] ?? tableTitle.get(url) ?? title, publisher });
  };

  for (const s of existing[slug]?.sources ?? []) push(s.url, s.title, s.publisher);
  const label = names[slug] ?? slug;
  if (specs[slug]) push(specs[slug].source, `${label} 제품 사양`, publisherOf(specs[slug].source));
  if (prices[slug]) push(prices[slug].source, `${label} 가격 정보`, publisherOf(prices[slug].source));
  if (productPages[slug]) {
    push(productPages[slug].source, `${label} 제품 확인`, publisherOf(productPages[slug].source));
  }
  for (const source of INDEPENDENT_PRODUCT_SOURCES[slug] ?? []) {
    push(source.url, source.title, source.publisher);
  }
  for (const source of VERIFIED_MODEL_SOURCES[slug] ?? []) {
    push(source.url, source.title, source.publisher);
  }
  if (!out.length) continue;

  records++;
  L.push(`  '${slug}': {`);
  L.push('    sources: [');
  for (const s of out) {
    L.push('      {');
    L.push(`        url: '${s.url}',`);
    L.push(`        title: '${esc(s.title)}',`);
    L.push(`        publisher: '${esc(s.publisher)}',`);
    L.push('      },');
  }
  L.push('    ],');
  if (existing[slug]?.publishedAt) L.push(`    publishedAt: '${existing[slug].publishedAt}',`);
  L.push(`    updatedAt: '${REVIEWED_AT_OVERRIDES[slug] ?? existing[slug]?.updatedAt ?? '2026-08-24'}',`);
  L.push('    reviewedBy: SITE_AUTHOR,');
  // 가격 확인일은 가격 출처 표에 남아 있는 제품에만 둔다. 표에서 뺀(철회한) 가격의 날짜가
  // 기존 파일에서 되살아나지 않게 한다.
  if (prices[slug]) {
    L.push(`    priceCheckedAt: '${existing[slug]?.priceCheckedAt ?? prices[slug].checkedAt}',`);
  }
  L.push('  },');
}
L.push('};');
L.push('');
L.push('export function getProductEditorial(slug: string): EditorialMeta | undefined {');
L.push('  return PRODUCT_EDITORIAL[slug];');
L.push('}');
L.push('');

writeFileSync(OUT_FILE, L.join('\n'));
console.log(
  `사양 ${Object.keys(specs).length} · 가격 ${Object.keys(prices).length} · ` +
    `제품확인 ${Object.keys(productPages).length}  →  편집 메타데이터 ${records}건`,
);
