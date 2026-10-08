# 2026-10-08 근거 대조

가격을 새로 조사한 작업이 아니다. 기존 가격 조사일과 원자료를 보존했다. 공식 페이지를 읽어 기능·표시 조건을 확인한 항목과 과거 원문 재검토를 구분한다.

- wd25-load-gap: [WD25DB8995BZ 지원 페이지 연결 공용 설명서](https://downloadcenter.samsung.com/content/UM/202608/20260818083830741/OID76616_IB_T-PJT_WD8000D-AD_7LCD_KO_260814.pdf); stored_source_rechecked; 원래 관측일 2026-10-08; 제품 규격·코스 안내 인쇄 45–46쪽.
- wd25-course-limits: [해당 모델 연결 설명서](https://downloadcenter.samsung.com/content/UM/202608/20260818083830741/OID76616_IB_T-PJT_WD8000D-AD_7LCD_KO_260814.pdf); stored_source_rechecked; 원래 관측일 2026-10-08; 인쇄 45–46쪽.
- dv17-bedding: [DV17A9720BV 연결 설명서](https://downloadcenter.samsung.com/content/UM/202504/20250401094234705/WM0013_IB_DV8700TK_DV19A9740_KO_250313.pdf); stored_source_rechecked; 원래 관측일 2026-10-08; 인쇄 33쪽.
- curv-dock-clearance: [Qrevo Curv 물탱크형](https://support.roborock.com/hc/en-us/article_attachments/46138473099289); stored_source_rechecked; 원래 관측일 2026-10-08; 도크 설치 그림.
- curv-threshold: [Qrevo Curv](https://kr.roborock.com/pages/roborock-qrevo-curv); official_page_read; 원래 관측일 2026-10-08; AdaptiLift·흡입 압력 시험 각주.
- sony-two-devices: [WF-1000XM5](https://helpguide.sony.net/mdr/2963/v1/en/contents/TP1001106282.html); official_page_read; 원래 관측일 2026-10-08; 두 기기 연결·음악 재생 전환 절차.
- liberty5-dual-runtime: [A3957](https://service.soundcore.com/article-description/Can-I-use-Dual-Connections-and-LDAC-or-Dolby-Sound-simultaneously); official_page_read; 원래 관측일 2026-10-08; Liberty 5 질문 답변.
- xiaomi-cadr-volume: [AC-M16-SC](https://www.mi.com/kr/product/xiaomi-smart-air-purifier-4/); official_page_read; 원래 관측일 2026-10-08; 입자 CADR·필터 설명.
- xiaomi-filter-scope: [AC-M16-SC](https://www.mi.com/kr/product/xiaomi-smart-air-purifier-4/); official_page_read; 원래 관측일 2026-10-08; 자체 고효율 필터·일체형 구성.
- winix-tank-ratio: [DN2H160-IWK 연결 DN2 계열](https://kr.object.ncloudstorage.com/w2r-commerce-winix/USEMANUAL/202507/250722111846926-78c8424e1fa84ce2bc3fd07992f4d6f2.pdf); stored_source_rechecked; 원래 관측일 2026-10-08; DN2 규격·운전 조건.
- lg-go-touch: [27LX5QKNA](https://www.lge.co.kr/stan-by-me/27lx5qkna); official_page_read; 원래 관측일 2026-10-08; 선택 이유·세 가지 화면 모드·터치 앱별 안내.
- dyson-shared-filter: [TP07·HP09 공통 HEPA+탄소 필터](https://www.dyson.co.kr/360-glass-hepa-carbon-air-purifier-filter); stored_source_rechecked; 원래 관측일 2026-09-30; 965432-01 호환 목록·가격, 별도 필터 FAQ.
- fridge-manufacturer-registry: [각 모델 제조사 표기와 2026-09-29 신고](https://www.lge.co.kr/product/refrigerators/s834mww1d); mixed_historical_and_official_recheck; 원래 관측일 2026-10-08; 제조사 고지정보·공단 정확 모델 신고.
- rf85-t873-label-gap: [제조사 표시 RF85·T873](https://www.lge.co.kr/product/refrigerators/t873mee111); mixed_historical_and_official_recheck; 원래 관측일 2026-10-08; 제조사 고지정보.
- samsung-code-scope: [각 정확 모델 설명서](https://downloadcenter.samsung.com/content/UM/202608/20260818083830741/OID76616_IB_T-PJT_WD8000D-AD_7LCD_KO_260814.pdf); stored_source_rechecked; 원래 관측일 2026-10-08; WF24 인쇄74, WD25 인쇄62–63·71.

`claims.jsonl`은 핵심 신규/교정 주장 15건이다. 전체 34개 모델의 모든 사양을 새로 실측·재수집했다는 뜻이 아니다. `source-usage.json`의 inventory_and_reference_scan은 파일 목록/참조 대조이며 원문 정독 완료를 뜻하지 않는다.

계산 검산: 25−15=10kg; 40×2.4÷400×60=14.4분(청정 공기 부피); 16÷4.5≈3.56(실제 비움 횟수 아님); (43.7−43.0)×12=8.4kWh/년(표시 차이).

후속 단위 교정:43.0÷1.6≈26.9kWh/월(보정 전 월 환산),43.0÷1.6×12÷365≈0.884kWh/일(하루 역산). 같은 단위로 표기하지 않는다. 추천 평수와 Dyson 높이 해석의 후속 교정은 검수 보고서 마지막 절 참조.

확대 교정: `broad-audit.json`은 제품34·글18·가이드12 전후 스냅샷과 브랜드 문구 교정 이력이다. 중간 변경도 포함하므로 최종 내용은 after와 현재 소스로 판단한다. 초기 browser.json, 후속 persona-browser.json과 최종 broad-browser.json은 검사 단계를 구분한다. 최종 누적 수정은 제품30·글15·가이드12·브랜드6이다.

## 2차 교정 기록 (2026-10-08 오후)

`pass2/` 폴더:
- `<영역>.json` 10개: fridge·laundry·aircon·airquality·kitchen·robot·tv·earbuds·errorcodes·site. 각 파일에 변경·근거(원문 위치·관측일·상태)·계산·독자 판단·보류·범위 밖을 적었다.
- `coordinator.json`: 다나와 가격 출처 33건의 모델번호 대조와 AR07 가격 철회 결정.
- `browser.json`: 16경로 × 390/1440px.
- `changed-html.txt`·`changed-sitemap.txt`: 교정 전후 본문 변경 경로.

`claims.jsonl`의 curv-threshold(IEC 오기)와 fridge-manufacturer-registry(RS84 53.0 재확인)에는 `correction` 필드로 정정 이력을 남겼다. 상태값 `official_page_read`는 2026-10-08에 원문을 다시 열었다는 뜻이다. 일부는 WebFetch 요약을 거쳐 읽었으므로 원문 HTML이 저장돼 있지 않다.

2차 계산 검산(조정자 재계산):
- 45.5×0.64=29.12W; ×7.2×365=76.5kWh; ×160≈12,243원(신고 12,000원)
- 89.5−87.8=1.7kWh, 1.7÷87.8≈1.94%
- 277,200×2=554,400원
- 4.5÷16×24=6.75시간
- 64.6×40.0×26.5≈68,476㎣; 56.3×51.1×28≈80,554㎣
- 522−343=179분, 179÷343≈0.52
- 369,000÷91,900≈4.02
- 6×3×75=1,350Wh; 1.35÷1.9≈0.71
- 0.202×0.233≈0.047㎡; 0.45×0.45≈0.20㎡

## 3차 교정 기록 (2026-10-08 밤 ~ 10-09 오전)

`pass3/` 폴더:
- `<영역>.json` 10개. 2차와 같은 영역이고, 항목은 다음과 같다.
  - `resolved`: 2차 보류 항목의 판정(확인/수정/삭제/확인 필요)
  - `featuresAudit`: 공개 제품 기능 목록 대조
  - `stillHeld`: 남은 것과 시도한 방법
  - `sourceRequests`: 조정자에게 보낸 출처 등재 요청과 처리 결과
- `sources/`: 판정에 쓴 원문 발췌 70개. 파일 첫 줄에 URL·열람 일시·방법(curl·WebFetch·aside repl)을 적었다. 페이지 전체나 쿠키·토큰은 넣지 않았다. PDF 표는 `pdftoppm`으로 해당 쪽만 렌더해 눈으로 읽은 경우가 있고, 그 사실을 발췌에 적었다.
- `coordinator.json`: 조정자 표본 대조 9건, 결정(제트봇 국내 모델코드, AR07 samsungsvc 등재(2026-10-09 사용자 승인), 샤오미 가격 유지, 하이얼 인버터 출처 수준, 반복 문장 정리), 생성기 변경, 검증.
- `browser.json`: 19개 검사(18개 경로) × 390/1440px. 경로마다 필수·금지 문구를 함께 검사했다.
- `changed-html-vs-pass2.txt`(122)·`changed-html-vs-before.txt`(148)·`changed-sitemap.txt`(100): `<main>` 텍스트 기준 변경 경로.

3차 계산 검산(조정자 재계산):
- 85.15 ÷ 4 ≈ 21.3W; 85.15 − 69 = 16.15Wh; 144 ÷ 85.15 ≈ 1.69
- 15.52V × 5.486Ah ≈ 85.14Wh (설명서 85.15Wh와 반올림 차)
- 20 + 686 + 20 + 686 + 20 = 1,432mm; 984 + 984 = 1,968mm
- 255W × 171h = 43.6kWh; × 160원 ≈ 6,976원(공단 표시 7,000원)
- 197,000원 ÷ 384원 ≈ 513kWh/월; ÷ (8h × 30일) ≈ 2.14kW
- 15.2 → 25.7kg 차이 10.5kg
