import type { EditorialMeta } from '@/types/editorial';
import { SITE_AUTHOR } from '@/lib/constants';

/**
 * 제품별 편집 신뢰 정보.
 *
 * ⚠️ 이 파일은 생성물이다. 손으로 고치지 말고 scripts/generate-editorial.mjs 를 돌린다.
 *    출처를 추가하려면 verified-specs.ts 의 세 표 중 맞는 곳에 먼저 적는다:
 *      VERIFIED_SPECS         사양 수치의 출처
 *      VERIFIED_PRICES        가격의 출처
 *      VERIFIED_PRODUCT_PAGES 그 밖에 제품을 대조한 페이지
 *    정확한 모델의 독립 기관 자료는 생성 스크립트의 INDEPENDENT_PRODUCT_SOURCES에 적는다.
 *
 * 근거가 없는 제품에는 레코드를 만들지 않는다. 빈 레코드로 채우면 색인 품질
 * 게이트(src/lib/content-quality.ts)가 통과 도장 찍는 기계가 된다.
 */
export const PRODUCT_EDITORIAL: Record<string, EditorialMeta> = {
  'anker-soundcore-liberty5': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=91767473',
        title: '앤커 사운드코어 리버티 5 상품 정보',
        publisher: '다나와',
      },
      {
        url: 'https://www.techradar.com/audio/earbuds-airpods/anker-soundcore-liberty-5-review',
        title: 'Anker Soundcore Liberty 5 review',
        publisher: 'TechRadar',
      },
      {
        url: 'https://www.soundguys.com/anker-soundcore-liberty-5-review-137445/',
        title: 'Anker Soundcore Liberty 5 review',
        publisher: 'SoundGuys',
      },
      {
        url: 'https://www.soundcore.com/products/a3957-liberty-5-tws-earbuds?variant=45054923014334',
        title: 'A3957 Liberty 5 제조사 사양·재생 조건',
        publisher: 'soundcore',
      },
      {
        url: 'https://service.soundcore.com/article-description/Can-I-use-Dual-Connections-and-LDAC-or-Dolby-Sound-simultaneously',
        title: '두 기기 연결과 LDAC·Dolby 동시 사용, 배터리 조건',
        publisher: 'soundcore',
      },
    ],
    publishedAt: '2026-07-04',
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
    priceCheckedAt: '2026-08-24',
  },
  'apple-airpods-pro3': {
    sources: [
      {
        url: 'https://www.apple.com/kr/airpods-pro/',
        title: '에어팟 프로 3 제품 페이지',
        publisher: 'Apple',
      },
      {
        url: 'https://www.apple.com/kr/airpods-pro/specs/',
        title: 'AirPods Pro 3 재생 시간·방수 사양',
        publisher: 'Apple',
      },
      {
        url: 'https://9to5mac.com/2026/04/14/airpods-pro-3-better-today-than-at-launch-video/',
        title: 'AirPods Pro 3 장기 사용 리뷰',
        publisher: '9to5Mac',
      },
      {
        url: 'https://appleinsider.com/articles/26/03/06/airpods-pro-3-long-term-review-apples-latest-earbuds-are-great-with-one-asterisk',
        title: 'AirPods Pro 3 3개월 장기 리뷰',
        publisher: 'AppleInsider',
      },
      {
        url: 'https://www.rtings.com/headphones/reviews/apple/airpods-pro-3',
        title: 'Apple AirPods Pro 3 측정 리뷰',
        publisher: 'RTINGS',
      },
      {
        url: 'https://www.macrumors.com/2025/11/04/airpods-pro-3-long-term-review/',
        title: 'AirPods Pro 3 2개월 장기 리뷰',
        publisher: 'MacRumors',
      },
      {
        url: 'https://www.soundguys.com/apple-airpods-pro-3-review-close-to-perfect-144636/',
        title: 'Apple AirPods Pro 3 실험실 리뷰',
        publisher: 'SoundGuys',
      },
      {
        url: 'https://www.tomsguide.com/audio/airpods/ive-been-using-the-airpods-pro-3-for-three-months-the-good-the-bad-and-the-ugly',
        title: 'AirPods Pro 3 3개월 장단점 리뷰',
        publisher: 'Tom\'s Guide',
      },
      {
        url: 'https://www.techradar.com/audio/earbuds-airpods/apple-airpods-pro-3-review',
        title: 'Apple AirPods Pro 3 리뷰',
        publisher: 'TechRadar',
      },
      {
        url: 'https://www.apple.com/kr/shop/buy-airpods/airpods-pro-3',
        title: '에어팟 프로 3 가격 정보',
        publisher: 'Apple',
      },
      {
        url: 'https://www.apple.com/kr/airpods-pro/feature-availability/',
        title: '청각 건강 기능 지역·기기·연령 조건',
        publisher: 'Apple',
      },
      {
        url: 'https://support.apple.com/ko-kr/guide/airpods/dev228ba3df8/web',
        title: 'Apple 기기 간에 AirPods 연결 전환하기',
        publisher: 'Apple',
      },
      {
        url: 'https://support.apple.com/ko-kr/guide/airpods/dev499c9718b/web',
        title: '타사 기기와 AirPods 페어링하기',
        publisher: 'Apple',
      },
    ],
    publishedAt: '2026-07-04',
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
    priceCheckedAt: '2026-08-24',
  },
  'coway-handpick-water-purifier-compact': {
    sources: [
      {
        url: 'https://www.coway.com/core/product/fmanual/download/274',
        title: '아이콘 얼음정수기 CHPI-7400N 사용설명서',
        publisher: '코웨이',
      },
      {
        url: 'https://www.coway.com/product/detail?prdno=1148',
        title: '아이콘 얼음정수기 CHPI-7400N 제품 확인',
        publisher: '코웨이',
      },
      {
        url: 'https://prod.danawa.com/info/?pcode=89626019',
        title: '아이콘 얼음정수기 CHPI-7400N 제품 사양',
        publisher: '다나와',
      },
      {
        url: 'https://find.wqa.org/find-products/ctl/detail/mid/1054/cid/coway_co_ltd/sid/1/keyword/7400n',
        title: 'CHPI-7400N 완제품 NSF/ANSI 42 인증 항목',
        publisher: 'Water Quality Association',
      },
      {
        url: 'https://find.wqa.org/find-products/ctl/detail/mid/1054/cid/coway_co_ltd/sid/3/keyword/7400n',
        title: 'CHPI-7400N 완제품 NSF/ANSI 53 인증 항목',
        publisher: 'Water Quality Association',
      },
      {
        url: 'https://find.wqa.org/find-products/ctl/detail/mid/1054/cid/coway_co_ltd/sid/63/keyword/7400n',
        title: 'CHPI-7400N 완제품 NSF/ANSI 401 인증 항목',
        publisher: 'Water Quality Association',
      },
      {
        url: 'https://portal.kwtc.or.kr/common/fileDownload.do?atchFileId=426991&fileSn=1',
        title: '2026-07-09 정수기 품질검사 유효 제품현황 6쪽 323번',
        publisher: '한국물기술인증원',
      },
      {
        url: 'https://eep.energy.or.kr/certification/certi_view_159.aspx?no=282260052',
        title: 'CHPI-7400N 정수기 효율 신고값',
        publisher: '한국에너지공단',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
  },
  'cuckoo-dishwasher-table-cdw61': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=10591083',
        title: '6인용 식탁형 식기세척기 CDW-A0611TW 제품 사양',
        publisher: '다나와',
      },
      {
        url: 'https://www.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/200424%3Dz0383-0082a0%20rev.1_cdw-a0611t.pdf',
        title: 'CDW-A0611TS·TW 사용설명서, 인쇄 2·9·11·15·17~20·22~23·25·32쪽',
        publisher: '쿠쿠전자',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
    priceCheckedAt: '2026-08-24',
  },
  'dyson-hot-cool-hp09': {
    sources: [
      {
        url: 'https://www.dyson.co.kr/dyson-purifier-hot-cool-formaldehyde-white-nickel-gold',
        title: '퓨어 핫앤쿨 HP09 제품 사양',
        publisher: 'Dyson',
      },
      {
        url: 'https://prod.danawa.com/info/?pcode=16588751',
        title: '퓨어 핫앤쿨 HP09 가격 정보',
        publisher: '다나와',
      },
      {
        url: 'https://www.dyson.co.uk/content/dam/dyson/maintenance/user-guides/kr_kr/EC_527E_HP09_User_Manual.pdf',
        title: '다이슨 HP09 한국어 사용설명서',
        publisher: 'Dyson',
      },
      {
        url: 'https://www.dyson.co.kr/360-glass-hepa-carbon-air-purifier-filter',
        title: '965432-01 TP07·HP09 호환 필터 — 2026-10-08 판매가·교체 주기',
        publisher: 'Dyson',
      },
      {
        url: 'https://www.dyson.co.kr/products/tools-and-accessories/air-purifier-filters',
        title: 'Dyson 필터 교체 FAQ — 하루 12시간·12개월 조건',
        publisher: 'Dyson',
      },
      {
        url: 'https://eep.energy.or.kr/certification/certi_view_121.aspx?no=288210259',
        title: 'HP09 공기청정기 효율 신고 — 표준사용면적 13.3㎡·4등급(2021-08-26)',
        publisher: '한국에너지공단',
      },
      {
        url: 'https://eep.energy.or.kr/certification/certi_view_121.aspx?no=288230024',
        title: 'HP09 XX 공기청정기 효율 신고 — 표준사용면적 18.7㎡·4등급(2023-02-02)',
        publisher: '한국에너지공단',
      },
      {
        url: 'https://www.law.go.kr/행정규칙/효율관리기자재운용규정',
        title: '효율관리기자재 운용규정 — 전기온풍기 월간에너지비용 산정식',
        publisher: '국가법령정보센터',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
    priceCheckedAt: '2026-08-24',
  },
  'dyson-pure-cool-tp07': {
    sources: [
      {
        url: 'https://www.dyson.co.kr/dyson-purifier-cool-white-silver',
        title: '퓨어쿨 타워팬 TP07 제품 사양',
        publisher: 'Dyson',
      },
      {
        url: 'https://prod.danawa.com/info/?pcode=15991760',
        title: '퓨어쿨 타워팬 TP07 가격 정보',
        publisher: '다나와',
      },
      {
        url: 'https://www.dyson.co.uk/content/dam/dyson/maintenance/user-guides/kr_kr/EC_438E_TP09_07_User_Manual.pdf',
        title: '다이슨 TP07·TP09 한국어 사용설명서',
        publisher: 'Dyson',
      },
      {
        url: 'https://www.dyson.co.kr/360-glass-hepa-carbon-air-purifier-filter',
        title: '965432-01 TP07·HP09 호환 필터 — 2026-10-08 판매가·교체 주기',
        publisher: 'Dyson',
      },
      {
        url: 'https://www.dyson.co.kr/products/tools-and-accessories/air-purifier-filters',
        title: 'Dyson 필터 교체 FAQ — 하루 12시간·12개월 조건',
        publisher: 'Dyson',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
    priceCheckedAt: '2026-08-24',
  },
  'haier-cth06qbw-wall': {
    sources: [
      {
        url: 'https://www.haier.co.kr/board/board_manual/board_list.asp?scrID=0000000231&pageNum=3&subNum=7&ssubNum=1&page=1&s_string=CTH06QBW',
        title: 'CTH06QBW 공식 사용설명서',
        publisher: '하이얼코리아',
      },
      {
        url: 'https://eep.energy.or.kr/certification/certi_view_260.aspx?no=260240150',
        title: 'CTH06QBW 에너지소비효율 신고',
        publisher: '한국에너지공단',
      },
      {
        url: 'https://prod.danawa.com/info/?pcode=61541945',
        title: '셀프클리닝 벽걸이 CTH06QBW 가격 정보',
        publisher: '다나와',
      },
      {
        url: 'https://www.haier.co.kr/include/download.asp?file_name=HSU06_Series__CTH06_Series_%EC%82%AC%EC%9A%A9%EC%84%A4%EB%AA%85%EC%84%9C_20240221.pdf&file_full_name=00000002312024000262_file1.pdf&folder=0000000231',
        title: 'CTH06 계열 사용설명서 PDF, 인쇄 14·17·26·28·30쪽',
        publisher: '하이얼',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
    priceCheckedAt: '2026-08-24',
  },
  'haier-cth10qbw-wall': {
    sources: [
      {
        url: 'https://www.haier.co.kr/board/board_manual/board_list.asp?scrID=0000000231&pageNum=3&subNum=7&ssubNum=1&page=1&s_string=CTH10QBW',
        title: 'CTH10QBW 공식 사용설명서',
        publisher: '하이얼코리아',
      },
      {
        url: 'https://eep.energy.or.kr/certification/certi_view_260.aspx?no=260240148',
        title: 'CTH10QBW 에너지소비효율 신고',
        publisher: '한국에너지공단',
      },
      {
        url: 'https://prod.danawa.com/info/?pcode=63420386',
        title: '셀프클리닝 벽걸이 CTH10QBW 가격 정보',
        publisher: '다나와',
      },
      {
        url: 'https://www.haier.co.kr/include/download.asp?file_name=HSU10Q_Series__CTH10Q_Series_%EC%82%AC%EC%9A%A9%EC%84%A4%EB%AA%85%EC%84%9C_20240221.pdf&file_full_name=00000002312024000264_file1.pdf&folder=0000000231',
        title: 'CTH10Q 계열 사용설명서 PDF, 인쇄 14·17·28쪽',
        publisher: '하이얼',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
    priceCheckedAt: '2026-08-24',
  },
  'lg-codezero-r5-robot': {
    sources: [
      {
        url: 'https://www.lge.co.kr/product/vacuum-cleaners/ro585hgh',
        title: '코드제로 R5 오브제컬렉션 로봇청소기 RO585HGH 제품 사양',
        publisher: 'LG전자',
      },
      {
        url: 'https://prod.danawa.com/info/?pcode=77208635',
        title: '코드제로 R5 오브제컬렉션 로봇청소기 RO585HGH 제품 확인',
        publisher: '다나와',
      },
      {
        url: 'https://www.lge.co.kr/support/solutions-20153096346359',
        title: '코드제로 R5 충돌·범퍼·라이다 증상별 점검',
        publisher: 'LG전자',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
  },
  'lg-dios-obje-4door-t873': {
    sources: [
      {
        url: 'https://www.lge.co.kr/product/refrigerators/t873mee111',
        title: '디오스 오브제컬렉션 4도어 T873 제품 사양',
        publisher: 'LG전자',
      },
      {
        url: 'https://prod.danawa.com/info/?pcode=17432099',
        title: '디오스 오브제컬렉션 4도어 T873 가격 정보',
        publisher: '다나와',
      },
      {
        url: 'https://gscs-b2c.lge.com/open/downloadFile?fileId=a8sdGu0vrerKMqWmu5nkQ',
        title: 'T873MEE111 지원 페이지의 공용 사용설명서, 인쇄 14~15·20~21·25~27·33쪽',
        publisher: 'LG전자',
      },
      {
        url: 'https://www.lge.co.kr/support/rates-warranty-guide',
        title: 'LG전자 제품 보증기간·핵심부품 무상수리 안내',
        publisher: 'LG전자',
      },
      {
        url: 'https://eep.energy.or.kr/certification/certi_view_252.aspx?no=252220489&page=1',
        title: 'T873MEE111 냉장고 효율 신고값',
        publisher: '한국에너지공단',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
    priceCheckedAt: '2026-08-24',
  },
  'lg-dios-obje-sxs-s834': {
    sources: [
      {
        url: 'https://www.lge.co.kr/product/refrigerators/s834mww1d',
        title: '디오스 오브제컬렉션 베이직 양문형 S834MWW1D 제품 사양',
        publisher: 'LG전자',
      },
      {
        url: 'https://prod.danawa.com/info/?pcode=18934184',
        title: '디오스 오브제컬렉션 베이직 양문형 S834MWW1D 제품 확인',
        publisher: '다나와',
      },
      {
        url: 'https://gscs-b2c.lge.com/open/downloadFile?fileId=pYFpi7CzmmgetzthPkurQ',
        title: 'S834MWW1D 지원 페이지의 공용 사용설명서, 인쇄 14~15·21·25·27쪽',
        publisher: 'LG전자',
      },
      {
        url: 'https://www.lge.co.kr/support/rates-warranty-guide',
        title: 'LG전자 제품 보증기간·핵심부품 무상수리 안내',
        publisher: 'LG전자',
      },
      {
        url: 'https://eep.energy.or.kr/certification/certi_view_252.aspx?no=252220710&page=1',
        title: 'S834MWW1D 냉장고 효율 신고값',
        publisher: '한국에너지공단',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
  },
  'lg-puricare-water-purifier-objet': {
    sources: [
      {
        url: 'https://www.lge.co.kr/product/care-solutions/water-purifiers/wd523acb?modelId=MD10017831&pdpType=SUBSCRIPTION',
        title: '퓨리케어 오브제컬렉션 정수기 WD523ACB 제품 사양·필터 교체 주기',
        publisher: 'LG전자',
      },
      {
        url: 'https://prod.danawa.com/info/?pcode=21677045',
        title: '퓨리케어 오브제컬렉션 정수기 WD523ACB 제품 확인',
        publisher: '다나와',
      },
      {
        url: 'https://www.lge.co.kr/product/object-collection/wd523acb',
        title: '퓨리케어 오브제컬렉션 정수기 WD523ACB 제품 사양',
        publisher: 'LG전자',
      },
      {
        url: 'https://www.lge.co.kr/care-accessories/water-purifier/agm30040101',
        title: '중금속9 흡착 필터 AGM30040101 가격·적용 모델',
        publisher: 'LG전자',
      },
      {
        url: 'https://www.lge.co.kr/care-accessories/water-purifier/agm30063801',
        title: '바이러스 클리어 필터 AGM30063801 가격·적용 모델',
        publisher: 'LG전자',
      },
      {
        url: 'https://gscs-b2c.lge.com/open/downloadFile?fileId=jO7RH8OLgibKoMzZYJqKw',
        title: 'WD523A** 포함 데스크 정수기 공용 설명서, 인쇄 14·17·29·31~33쪽',
        publisher: 'LG전자',
      },
      {
        url: 'https://eep.energy.or.kr/certification/certi_view_159.aspx?no=282230026',
        title: 'WD523ACB 정수기 효율 신고값',
        publisher: '한국에너지공단',
      },
      {
        url: 'https://portal.kwtc.or.kr/common/fileDownload.do?atchFileId=426991&fileSn=1',
        title: '2026-07-09 정수기 품질검사 유효 제품현황 3쪽 112번',
        publisher: '한국물기술인증원',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
    priceCheckedAt: '2026-10-01',
  },
  'lg-standbyme-go': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=20361317',
        title: 'LG 스탠바이미 Go 상품 정보',
        publisher: '다나와',
      },
      {
        url: 'https://www.lge.co.kr/stan-by-me/27lx5qkna',
        title: '27LX5QKNA 케이스·무게·판매 상태',
        publisher: 'LG전자',
      },
      {
        url: 'https://gscs-b2c.lge.com/open/downloadFile?fileId=z0LRJfepnQfS0bHp7CZT4g',
        title: '27LX5QKNA 사용설명서 — 배터리 74Wh·완충 시간·보증',
        publisher: 'LG전자',
      },
    ],
    publishedAt: '2026-07-04',
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
    priceCheckedAt: '2026-08-24',
  },
  'lg-standbyme2': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=75537515',
        title: 'LG 스탠바이미 2 상품 정보',
        publisher: '다나와',
      },
      {
        url: 'https://dpg.danawa.com/news/view?boardSeq=63&listSeq=5942825',
        title: '이동형 TV 비교 리뷰',
        publisher: '다나와 DPG',
      },
      {
        url: 'https://www.lge.co.kr/stan-by-me/27lx6tpga',
        title: '27LX6TPGA 화면·배터리·별매 액세서리',
        publisher: 'LG전자',
      },
      {
        url: 'https://gscs-b2c.lge.com/open/downloadFile?fileId=Tl3sJzEVjhEk8mS5e3tmw',
        title: '27LX6TPGA 사용설명서 — 배터리 85.15Wh(제품 페이지 비교표는 90Wh)·USB PD 충전·보증',
        publisher: 'LG전자',
      },
    ],
    publishedAt: '2026-07-04',
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
    priceCheckedAt: '2026-08-24',
  },
  'lg-standbyme2-max': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=122632760',
        title: 'LG 스탠바이미 2 Max 상품 정보',
        publisher: '다나와',
      },
      {
        url: 'https://www.lge.co.kr/stan-by-me/32lx6bpga',
        title: '32LX6BPGA 4K·배터리·가상 음향 조건',
        publisher: 'LG전자',
      },
      {
        url: 'https://gscs-b2c.lge.com/open/downloadFile?fileId=QtVqT3GbiUtdGG5demnHcg',
        title: '32LX6BPGA 사용설명서 — 배터리 144Wh·USB PD 충전·보증',
        publisher: 'LG전자',
      },
    ],
    publishedAt: '2026-07-04',
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
    priceCheckedAt: '2026-08-24',
  },
  'qcy-melobuds-pro': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=71645780',
        title: 'QCY 멜로버즈 프로 상품 정보',
        publisher: '다나와',
      },
      {
        url: 'https://ylshop.co.kr/product/qcy-ht08-멜로버즈-프로-플러스-블루투스-이어폰-노이즈캔슬링-블랙/977/category/24/display/1/',
        title: 'QCY-HT08 멜로버즈 프로 플러스 국내 수입사 상품 상세 — 사양표·LDAC와 멀티포인트 조건',
        publisher: 'QCY 공식 수입사',
      },
      {
        url: 'https://www.qcy.com/products/qcy-melobuds-pro?spec=1879',
        title: 'MeloBuds Pro 국제 판매 사양·시험 조건',
        publisher: 'QCY',
      },
    ],
    publishedAt: '2026-07-04',
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
    priceCheckedAt: '2026-08-24',
  },
  'roborock-qrevo-curv': {
    sources: [
      {
        url: 'https://kr.roborock.com/pages/roborock-qrevo-curv',
        title: 'Qrevo Curv 국내 제품 사양 및 옵션',
        publisher: 'Roborock',
      },
      {
        url: 'https://prod.danawa.com/info/?pcode=71422415',
        title: 'Qrevo Curv 제품 확인',
        publisher: '다나와',
      },
      {
        url: 'https://help.roborock.com/us/product/roborock-qrevo-curv-message?category=troubleshooting',
        title: 'Qrevo Curv 모델별 오류 안내',
        publisher: 'Roborock',
      },
      {
        url: 'https://support.roborock.com/hc/en-us/article_attachments/46138473099289',
        title: 'Qrevo Curv 공식 설명서 — 도크 확보 공간',
        publisher: 'Roborock',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
  },
  'roborock-s8-proultra': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=19522775',
        title: 'S8 프로 울트라 로봇청소기 가격 정보',
        publisher: '다나와',
      },
      {
        url: 'https://help.roborock.com/us/product/s8-pro-ultra-message?category=troubleshooting',
        title: 'S8 Pro Ultra 모델별 오류 안내',
        publisher: 'Roborock',
      },
      {
        url: 'https://de.roborock.com/products/roborock-s8-pro-ultra',
        title: 'S8 Pro Ultra 제조사 제품 사양',
        publisher: 'Roborock',
      },
      {
        url: 'https://support.roborock.com/hc/en-us/article_attachments/18342044174873',
        title: 'S8 Pro Ultra 공식 사용설명서 — 도크 설치·관리',
        publisher: 'Roborock',
      },
      {
        url: 'https://ca.roborock.com/pages/roborock-s8-pro-ultra',
        title: 'S8 Pro Ultra 제조사 사양·시험 각주(캐나다)',
        publisher: 'Roborock',
      },
      {
        url: 'https://kr.roborock.com/blogs/roborock-kr/comparison-of-roborock-s8-pro-ultra-and-s7-max-ultra',
        title: 'S8 Pro Ultra와 S7 Max Ultra 사양 비교 — 먼지통 350ml',
        publisher: 'Roborock',
      },
      {
        url: 'https://www.roboter-forum.com/threads/stromverbrauch-des-s8-pro-ultra.66036/',
        title: 'S8 Pro Ultra 소유자 콘센트 전력계의 7일 운전 기록 — 단일 가정 사례',
        publisher: 'Roboter-Forum 작성자',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
    priceCheckedAt: '2026-08-24',
  },
  'samsung-bespoke-4door-rf85': {
    sources: [
      {
        url: 'https://www.samsung.com/sec/support/model/RF85C90D1AP/',
        title: '비스포크 4도어 RF85 제품 사양',
        publisher: '삼성전자',
      },
      {
        url: 'https://prod.danawa.com/info/?pcode=20419955',
        title: 'RF85C90D1 코타 화이트 구성(RF85C90D1AP 동일스펙 표기) 가격 정보',
        publisher: '다나와',
      },
      {
        url: 'https://www.samsungsvc.co.kr/info/fee?tab=assure',
        title: '삼성전자서비스 핵심부품 무상보증 기간표',
        publisher: '삼성전자서비스',
      },
      {
        url: 'https://downloadcenter.samsung.com/content/UM/202312/20231211100502613/RF9000C_CC_2023_UM_DA68-04671A_KO_UA_230804.pdf',
        title: 'RF85C90D1AP 지원 페이지의 RF60/85/84C* 공용 사용설명서, 인쇄 5·9·11·13·26·47~48·74·89·97~98쪽',
        publisher: '삼성전자',
      },
      {
        url: 'https://downloadcenter.samsung.com/content/EM/202604/20260401071252508/DA68-04370A-05_IB_REF_KO_KO_260304.pdf',
        title: 'RF85C90D1AP 지원 페이지 Quick Guide(2026-04-01 게시), 2쪽 품질 보증서',
        publisher: '삼성전자',
      },
      {
        url: 'https://eep.energy.or.kr/certification/certi_view_252.aspx?no=252230128&page=1',
        title: 'RF85C90D1AP 냉장고 효율 신고값(월 41.38kWh·연간에너지비용 79,000원)',
        publisher: '한국에너지공단',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
    priceCheckedAt: '2026-08-24',
  },
  'samsung-bespoke-ai-combo-wd25': {
    sources: [
      {
        url: 'https://www.samsung.com/sec/support/model/WD25DB8995BZ/',
        title: '비스포크 AI 콤보 WD25 제품 사양',
        publisher: '삼성전자',
      },
      {
        url: 'https://prod.danawa.com/info/?pcode=36707846',
        title: '비스포크 AI 콤보 WD25 가격 정보',
        publisher: '다나와',
      },
      {
        url: 'https://www.samsungsvc.co.kr/solution/1491447',
        title: '[삼성 세탁기] [dC, dE 점검 코드] 도어를 닫아주세요',
        publisher: '삼성전자서비스',
      },
      {
        url: 'https://downloadcenter.samsung.com/content/UM/202608/20260818083830741/OID76616_IB_T-PJT_WD8000D-AD_7LCD_KO_260814.pdf',
        title: 'WD25DB8995BZ 지원 페이지의 공용 사용설명서, 인쇄 4·7·18~20·24~27·41·43~50·61~63·67·69·71~74쪽',
        publisher: '삼성전자',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
    priceCheckedAt: '2026-08-24',
  },
  'samsung-bespoke-grande-dv17a9720': {
    sources: [
      {
        url: 'https://www.samsung.com/sec/support/model/DV17A9720BV/',
        title: '비스포크 그랑데AI 건조기 DV17A9720 제품 사양',
        publisher: '삼성전자',
      },
      {
        url: 'https://prod.danawa.com/info/?pcode=15403370',
        title: '비스포크 그랑데AI 건조기 DV17A9720 제품 확인',
        publisher: '다나와',
      },
      {
        url: 'https://downloadcenter.samsung.com/content/UM/202504/20250401094234705/WM0013_IB_DV8700TK_DV19A9740_KO_250313.pdf',
        title: 'DV17A9720BV 지원 페이지의 공용 사용설명서, 인쇄 13~14·16·33·35~37·52·60·63·65~66·76~77·80~81쪽',
        publisher: '삼성전자',
      },
      {
        url: 'https://www.samsungsvc.co.kr/solution/25169',
        title: '[삼성 건조기] 직렬·병렬 설치 시 사이즈와 설치 키트(SKK-AL*) 안내',
        publisher: '삼성전자서비스',
      },
      {
        url: 'https://downloadcenter.samsung.com/content/UM/202103/20210304125357740/Stacking_kit_2_DC68-03859F-00_KR_0208.pdf',
        title: 'STACKING KIT 설치 가이드(SKK-AL*) — 직렬 설치 시 건조기 직배수',
        publisher: '삼성전자',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
  },
  'samsung-bespoke-grande-wf24a9500': {
    sources: [
      {
        url: 'https://www.samsung.com/sec/support/model/WF24A9500KE/',
        title: '비스포크 그랑데AI WF24A9500 제품 사양',
        publisher: '삼성전자',
      },
      {
        url: 'https://prod.danawa.com/info/?pcode=14760566',
        title: 'WF24A9500KF(새틴 그린, KE와 색상만 다름) 상품 가격 정보',
        publisher: '다나와',
      },
      {
        url: 'https://www.samsungsvc.co.kr/solution/1571074',
        title: '[삼성 세탁기] 드럼 세탁기 점검 코드에 대해 알아보기',
        publisher: '삼성전자서비스',
      },
      {
        url: 'https://www.samsungsvc.co.kr/solution/1489265',
        title: '[삼성 세탁기] [4C, 4E 점검 코드] 표시가 나타나요',
        publisher: '삼성전자서비스',
      },
      {
        url: 'https://www.samsungsvc.co.kr/solution/1489272',
        title: '[삼성 세탁기] [5C, 5E, SC, SE, E2 에러 점검 코드] 배수가 안돼요',
        publisher: '삼성전자서비스',
      },
      {
        url: 'https://www.samsungsvc.co.kr/solution/1488876',
        title: '[삼성 세탁기] [5C/5E 점검 코드] 배수가 안돼요',
        publisher: '삼성전자서비스',
      },
      {
        url: 'https://www.samsungsvc.co.kr/solution/1490485',
        title: '[삼성 세탁기] UE 에러, UB 에러, U6 에러(불균형 감지 에러)가 깜박거려요',
        publisher: '삼성전자서비스',
      },
      {
        url: 'https://www.samsungsvc.co.kr/solution/1491460',
        title: '[삼성 세탁기] [LC, LE 점검 코드] 누수감지 점검',
        publisher: '삼성전자서비스',
      },
      {
        url: 'https://downloadcenter.samsung.com/content/UM/202304/20230407100730025/Drum_WF8000AK_WF21A9400_WF24A9500_9501.pdf',
        title: 'WF24A9500KE 지원 페이지의 공용 사용설명서, 인쇄 5·8·11·15·27·31·39~46·55·72~78쪽',
        publisher: '삼성전자',
      },
      {
        url: 'https://www.samsungsvc.co.kr/solution/25169',
        title: '[삼성 건조기] 직렬·병렬 설치 시 사이즈와 설치 키트(SKK-AL*) 안내',
        publisher: '삼성전자서비스',
      },
      {
        url: 'https://www.samsungsvc.co.kr/solution/1491476',
        title: '[삼성 세탁기] HC·HE 점검 코드 — 세탁 히터 동작 이상',
        publisher: '삼성전자서비스',
      },
      {
        url: 'https://www.samsungsvc.co.kr/solution/1491469',
        title: '[삼성 세탁기] FC·FE 점검 코드 — 건조 팬 모터 동작 이상',
        publisher: '삼성전자서비스',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
    priceCheckedAt: '2026-08-24',
  },
  'samsung-bespoke-jetbot-ai': {
    sources: [
      {
        url: 'https://images.samsung.com/is/content/samsung/assets/nz/ha/guides/vac/VR50T95735W-SA_V2.pdf',
        title: 'VR50T95735W/SA 해외 지역형 제품 자료',
        publisher: '삼성전자',
      },
      {
        url: 'https://www.samsungsvc.co.kr/solution/4048329',
        title: '제트봇 브러시 이물질 제거 및 재조립 안내',
        publisher: '삼성전자서비스',
      },
      {
        url: 'https://www.samsungsvc.co.kr/shop/product/0000079860',
        title: '제트봇 청정스테이션 먼지봉투 판매가·적용 모델',
        publisher: '삼성전자서비스',
      },
      {
        url: 'https://www.samsung.com/es/vacuum-cleaners/robot/vr9500t-white-vr50t95735w-wa/',
        title: 'VR50T95735W/WA 해외 지역형 사양표 — 3D 센서 범위·흡입력(SET)',
        publisher: '삼성전자',
      },
      {
        url: 'https://www.samsung.com/sec/support/model/VR50T95935W/',
        title: 'VR50T95935W 국내 지원 페이지 — 센서·치수·소비전력',
        publisher: '삼성전자',
      },
      {
        url: 'https://downloadcenter.samsung.com/content/UM/202512/20251216141652843/O-DJ68-00846A-16_IB_VR9500_KO_KO_251209.pdf',
        title: 'VR50T95**** 국내 공용 사용설명서(ver.16, 2025-12-16)',
        publisher: '삼성전자',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
  },
  'samsung-bespoke-sxs-rs84': {
    sources: [
      {
        url: 'https://www.samsung.com/sec/support/model/RS84B5061M9/',
        title: '비스포크 양문형 RS84 제품 사양',
        publisher: '삼성전자',
      },
      {
        url: 'https://downloadcenter.samsung.com/content/UM/202206/20220608185736816/RS5000T_3Door.pdf',
        title: 'RS84B5061M9 지원 페이지의 양문형 공용 사용설명서, 인쇄 4·24~25·50·62·70~72쪽',
        publisher: '삼성전자',
      },
      {
        url: 'https://eep.energy.or.kr/certification/certi_view_252.aspx?no=252230494&page=1',
        title: 'RS84B5061M9 냉장고 효율 신고값',
        publisher: '한국에너지공단',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
  },
  'samsung-galaxy-buds3-pro': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=59537216',
        title: '삼성 갤럭시 버즈3 프로 상품 정보',
        publisher: '다나와',
      },
      {
        url: 'https://www.phonearena.com/news/galaxy-buds-3-pro-great-price_id180579',
        title: 'Galaxy Buds 3 Pro 가격·성능 분석',
        publisher: 'PhoneArena',
      },
      {
        url: 'https://www.samsung.com/sec/buds/galaxy-buds/galaxy-buds3-pro/',
        title: '버즈3 프로 고해상 오디오·Galaxy 기능 조건',
        publisher: '삼성전자',
      },
      {
        url: 'https://www.samsung.com/sec/buds/galaxy-buds/galaxy-buds3-pro/specs/',
        title: '갤럭시 버즈3 프로 상세 스펙 — 통화 시간·배터리 용량·크기',
        publisher: '삼성전자',
      },
    ],
    publishedAt: '2026-07-04',
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
    priceCheckedAt: '2026-08-24',
  },
  'samsung-the-movingstyle': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=98076260',
        title: '삼성 더 무빙스타일 상품 정보',
        publisher: '다나와',
      },
      {
        url: 'https://dpg.danawa.com/news/view?boardSeq=63&listSeq=5942825',
        title: '이동형 TV 비교 리뷰',
        publisher: '다나와 DPG',
      },
      {
        url: 'https://view.asiae.co.kr/article/2026011510080029708',
        title: '이동형 스크린 사용기 기사',
        publisher: '아시아경제',
      },
      {
        url: 'https://www.samsung.com/sec/support/model/KU27LSFM7AXXKR/',
        title: 'KU27LSFM7AXXKR 화면·무게·배터리 사양',
        publisher: '삼성전자',
      },
      {
        url: 'https://www.samsung.com/sec/tvs/the-movingstyle-lsfm7-d2c/KU27LSFM7AXXKR/',
        title: 'KU27LSFM7AXXKR 배터리 시험 조건·킥스탠드·터치 조건',
        publisher: '삼성전자',
      },
      {
        url: 'https://downloadcenter.samsung.com/content/EM/202605/20260508041921001/BN68-23869C-01_SUG_LSM7F%2027_KR_KOR_260417.0.pdf',
        title: 'LSM7F 27 사용자 가이드 — 음성 출력 10W(5W×2)·배터리 충전·사용 환경',
        publisher: '삼성전자',
      },
    ],
    publishedAt: '2026-07-04',
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
    priceCheckedAt: '2026-08-24',
  },
  'samsung-wind-free-ar07a9170': {
    sources: [
      {
        url: 'https://www.samsung.com/sec/support/model/AR07A9170HCN/',
        title: '윈드프리 벽걸이 AR07A9170HCN 제품 사양',
        publisher: '삼성전자',
      },
      {
        url: 'https://downloadcenter.samsung.com/content/UM/202105/20210513131032816/RAC068-02_IB_21Y_AR9500T_MOTION_DETECT_KR_KO_210428-D04.pdf',
        title: 'AR07A9170HCN 포함 공용 사용설명서, 인쇄 7·9·28·29·31·34·38쪽',
        publisher: '삼성전자',
      },
      {
        url: 'https://eep.energy.or.kr/certification/certi_view_260.aspx?no=260200419',
        title: 'AR07A9170HCN·AR07A9170HAX 냉방효율 신고값',
        publisher: '한국에너지공단',
      },
      {
        url: 'https://www.samsungsvc.co.kr/download/view?code=AR07A9170HCN&prd1DepNm=%EC%97%90%EC%96%B4%EC%BB%A8&prd2DepNm=%EB%B2%BD%EA%B1%B8%EC%9D%B4%28%EC%B0%BD%EB%AC%B8%29%20%EC%97%90%EC%96%B4%EC%BB%A8',
        title: 'AR07A9170HCN 모델별 다운로드 — 공용 설명서 RAC068-02 연결',
        publisher: '삼성전자서비스',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
  },
  'skmagic-allin-water-purifier-wpu': {
    sources: [
      {
        url: 'https://qr.skmagic.com/2019/model/WPU/WPUA710CRERO/Manual.htm',
        title: '올인원 직수 냉온정수기 WPU-A710C 제품 사양',
        publisher: 'SK매직',
      },
      {
        url: 'https://eep.energy.or.kr/certification/certi_view_159.aspx?no=282180025',
        title: 'WPU-A710C 정수기 효율 신고값',
        publisher: '한국에너지공단',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
  },
  'skmagic-touchon-dishwasher-dwa81': {
    sources: [
      {
        url: 'https://m.manual.skmagic.com/2019/model/DWA/DWA81R0D00SL/Manual.htm',
        title: '터치온 식기세척기 12인용 DWA81 제품 사양',
        publisher: 'SK매직',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
  },
  'sony-wf-1000xm5': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=27250154',
        title: '소니 WF-1000XM5 상품 정보',
        publisher: '다나와',
      },
      {
        url: 'https://www.sony.co.kr/headphones/products/wf-1000xm5',
        title: 'WF-1000XM5 제품 확인',
        publisher: 'Sony',
      },
      {
        url: 'https://www.sony.co.kr/headphones/products/wf-1000xm5/spec',
        title: 'WF-1000XM5 코덱·배터리 공식 사양',
        publisher: 'Sony',
      },
      {
        url: 'https://helpguide.sony.net/mdr/2963/v1/en/contents/TP1001106282.html',
        title: 'WF-1000XM5 두 기기 연결·재생 전환 안내',
        publisher: 'Sony',
      },
      {
        url: 'https://www.sony.co.kr/headphones/products/wf-1000xm5/features8',
        title: 'WF-1000XM5 기능성 — 케이스 포함 24·36시간, 3분 충전, 방수 제외 각주',
        publisher: 'Sony',
      },
      {
        url: 'https://www.sony.co.kr/headphones/products/wf-1000xm5/features3',
        title: 'WF-1000XM5 통화 품질 — 골전도 센서',
        publisher: 'Sony',
      },
      {
        url: 'https://www.sony.co.kr/headphones/products/wf-1000xm5/features4',
        title: 'WF-1000XM5 디자인과 착용감 — XM4 대비 약 25%·20%, 팁 4종',
        publisher: 'Sony',
      },
    ],
    publishedAt: '2026-07-04',
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
    priceCheckedAt: '2026-08-24',
  },
  'tcl-tac-08csd-wall': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=51549299',
        title: '인버터 벽걸이 TAC-08CSD 제품 사양',
        publisher: '다나와',
      },
      {
        url: 'https://www.tcl.com/kr/ko/air-conditioners/tac-08csd-tph11i',
        title: '인버터 벽걸이 TAC-08CSD 제품 확인',
        publisher: 'TCL',
      },
      {
        url: 'https://eep.energy.or.kr/certification/certi_view_260.aspx?no=260240215',
        title: 'TAC-08CSD/TPH11I-I·O 냉방효율 신고값',
        publisher: '한국에너지공단',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
    priceCheckedAt: '2026-08-24',
  },
  'tcl-tac-12csd-wall': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=53783573',
        title: '인버터 벽걸이 TAC-12CSD 제품 사양',
        publisher: '다나와',
      },
      {
        url: 'https://www.tcl.com/kr/ko/air-conditioners/tac-12csd-tph11i',
        title: 'TAC-12CSD/TPH11I 표시 면적·기류 기능',
        publisher: 'TCL',
      },
      {
        url: 'https://eep.energy.or.kr/certification/certi_view_260.aspx?no=260240214',
        title: 'TAC-12CSD/TPH11I-I·O 냉방효율 신고값',
        publisher: '한국에너지공단',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
    priceCheckedAt: '2026-08-24',
  },
  'winix-posong-dehumidifier-16l': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=7039534',
        title: '뽀송 제습기 16L 가격 정보',
        publisher: '다나와',
      },
      {
        url: 'https://www.law.go.kr/행정규칙/효율관리기자재운용규정',
        title: '효율관리기자재 운용규정 — 제습기 측정방법·월간소비전력량(×171h)·에너지비용(×160원) 산정식',
        publisher: '국가법령정보센터',
      },
      {
        url: 'https://www.consumer.go.kr/user/ftc/consumer/cnsmrBBS/79/selectInfoRptDetail.do?infoId=A0000436',
        title: '제습기 품질비교시험(비교공감 제2014-9호) — 표준조건 27℃·상대습도 60%',
        publisher: '소비자24',
      },
      {
        url: 'https://www.winix.com/product/790',
        title: 'DN2H160-IWK 위닉스 제품 페이지',
        publisher: '위닉스',
      },
      {
        url: 'https://kr.object.ncloudstorage.com/w2r-commerce-winix/USEMANUAL/202507/250722111846926-78c8424e1fa84ce2bc3fd07992f4d6f2.pdf',
        title: '위닉스 DN2 계열 사용설명서',
        publisher: '위닉스',
      },
      {
        url: 'https://eep.energy.or.kr/certification/certi_view_145.aspx?no=283190073',
        title: 'DN2H160-IWK 제습기 효율 신고값',
        publisher: '한국에너지공단',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
    priceCheckedAt: '2026-08-24',
  },
  'xiaomi-smart-air-purifier-4': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=16218836',
        title: '스마트 공기청정기 4 제품 사양',
        publisher: '다나와',
      },
      {
        url: 'https://www.mi.com/kr/product/xiaomi-smart-air-purifier-4/',
        title: '스마트 공기청정기 4 제품 확인',
        publisher: 'Xiaomi',
      },
      {
        url: 'https://www.consumer.go.kr/user/ftc/consumer/cnsmrBBS/79/selectInfoRptDetail.do?infoId=A1078051',
        title: '공기청정기 품질비교시험(비교공감 제2019-15호) — 표준사용면적 실측 기준',
        publisher: '소비자24',
      },
      {
        url: 'https://www.mi.com/kr/product/xiaomi-smart-air-purifier-4/specs/',
        title: 'Xiaomi 스마트 공기청정기 4 AC-M16-SC 사양',
        publisher: 'Xiaomi',
      },
      {
        url: 'https://www.mi.com/kr/support/faq/details/KA-32487/',
        title: '스마트 공기청정기 4 정품 필터 인식 안내',
        publisher: 'Xiaomi',
      },
      {
        url: 'https://www.mi.com/kr/support/faq/details/KA-27892/',
        title: '스마트 공기청정기 4 Wi-Fi 연결 안내',
        publisher: 'Xiaomi',
      },
      {
        url: 'https://eep.energy.or.kr/certification/certi_view_121.aspx?no=288250041',
        title: 'AC-M16-SC 공기청정기 효율 신고값(표준사용면적 45.5㎡·2등급)',
        publisher: '한국에너지공단',
      },
      {
        url: 'https://eep.energy.or.kr/certification/certi_view_121.aspx?no=288210331',
        title: 'AC-M16-SC 공기청정기 효율 신고값(43.2㎡·3등급)',
        publisher: '한국에너지공단',
      },
      {
        url: 'https://eep.energy.or.kr/certification/certi_view_121.aspx?no=288210338',
        title: 'AC-M16-SC 공기청정기 효율 신고값(42.5㎡·3등급)',
        publisher: '한국에너지공단',
      },
      {
        url: 'https://eep.energy.or.kr/certification/certi_view_121.aspx?no=288210356',
        title: 'AC-M16-SC 공기청정기 효율 신고값(43㎡·3등급)',
        publisher: '한국에너지공단',
      },
    ],
    updatedAt: '2026-10-08',
    reviewedBy: SITE_AUTHOR,
    priceCheckedAt: '2026-08-24',
  },
};

export function getProductEditorial(slug: string): EditorialMeta | undefined {
  return PRODUCT_EDITORIAL[slug];
}
