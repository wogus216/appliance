# 정수기 렌탈·필터·소비자분쟁해결기준 원문 대조 — 2026-10-29

산출물: [rental.json](./rental.json) · [filters.json](./filters.json) · [consumer-standards.json](./consumer-standards.json)

## 찾지 못한 것 (먼저)

| 대상 | 항목 | 확인한 곳 | 상태 |
| --- | --- | --- | --- |
| SK매직 WPU-A710C | 현행 판매 화면, 렌탈료, 의무사용기간, 등록비·설치비, 일시불가, 방문 주기 계약값, 위약금율 | 공식몰 정수기 목록 AJAX(rows=200, 1페이지, WPU 73줄 중 `A710` 0건) | **찾지 못함.** 대조군 WPUIAC425·WPUJAC104 등은 같은 응답에 나온다. 모델번호 검색은 현행 모델 `WPUIAC414`도 제품 0건이라 근거로 쓰지 않았다. 필터정기배송 카테고리 조회는 "결과 없음"이었지만 파라미터가 맞는지 확인하지 못해 근거에서 뺐다. |
| SK매직 WPU-A710C | 필터 3종 품번·공식 판매가 | 설명서(품번 없음), 공식몰 정수기 필터 목록(2개, 둘 다 에코&위글미니 전용) | **찾지 못함** → 3종 모두 계산 대상 아님 |
| 코웨이 CHPI-7400N | 나노트랩필터-세트 공식 판매가 | 필터/소모품 전체보기(카드 82개), 제품 전용 소모품 5개 | **찾지 못함** → 계산 대상 아님. 대조군인 다른 모델 필터세트(CHP-320N)는 목록에 나온다. |
| 코웨이 CHPI-7400N | 일시불 구매 1년 무상 서비스 뒤 멤버십 월 요금 | 제품 화면 가격표·구매 탭, 멤버십 약관(2026-04-15판) | **찾지 못함.** 화면의 "일시불 멤버십"은 표의 caption 문구일 뿐 요금표가 아니다. |
| 코웨이 CHPI-7400N | 회수비 금액, 설치비 금액표 | 렌탈/구매계약 약관, 가격표 | **찾지 못함.** 약관에는 회수비를 부과한다는 조항만 있고 금액이 없다. |
| 코웨이 | "매월 5,000원 할인"의 항목명 | 렌탈 탭 "지금 렌탈 시" 할인 내역 DOM | **불명.** 금액만 있고 텍스트 라벨이 없다. |
| LG WD523ACB | 4·5·6년 계약별 의무사용기간 개월 수 | 구독 PDP 텍스트·HTML 데이터(`contractTerm` 키만 존재), 가전구독 안내 | **찾지 못함.** 공개 문구는 "계약서 또는 [마이페이지]에서 확인"이다. 그래서 위약금 금액은 계산할 수 없다. |
| LG WD523ACB | 등록비, 계약서 원문 약관 | 구독 PDP, 가전구독 안내 | **찾지 못함.** 위약금 산식은 공개 안내 페이지 기준이다. |
| 고시 | 식기세척기·공기청정기·로봇청소기·무선이어폰 행 | [별표 Ⅲ] HWPX 36개 행 | **해당 분류 없음.** 다른 분류로 채우지 않았다. |

의도적으로 뺀 것: 판매점·오픈마켓 가격(2026-10-01 기록에 있음), 다른 SK매직 모델 화면의 등록비·설치비, 로그인·주문 단계 화면. 로그인·결제·개인정보 입력은 하지 않았다.

## 측정 사양

- **분석 단위:** 모델 1개 × 조건 항목 1개. 필터는 판매 단위 1개로 센다(세트로만 관리되면 세트 1개).
- **모집단:** CHPI-7400N·WD523ACB·WPU-A710C 정확한 모델. 고시는 law.go.kr 현행판.
- **포함:** 제조사 본사 도메인의 제품·약관 화면과 설명서, law.go.kr 별표 원본 파일.
- **제외:** 가격비교·블로그·대리점·호환품.
- **집계:** 하지 않았다. 표시값을 옮기고, 파생 계산은 `derived`로 따로 표시했다.
- **cutoff:** 2026-10-29 13:50~14:10 KST.
- **2차 소스:** 2026-10-01 기록(`research/evidence/2026-10-01/water-purifier-*.md`, `coway-sk-filter-price-followup.md`)은 대조용으로만 썼다. 코웨이 가격표 값과 LG 구매가·구독 시작가는 10-01 기록과 같았다.

## 도구와 확인 방법

- curl(브라우저 UA)로 서버 렌더 페이지를 받았다. 코웨이 약관은 `/core/community/fclause?clcd=CM01|CM02` JSON, SK매직 목록은 `/goods/indexSubGoodsList` POST로 받았다.
- 코웨이 제품 화면은 스크립트 렌더라 `aside repl`(openTab·evaluate·클릭)로 읽었다. 방문주기 2종 × 의무사용기간 4종 = 8조합을 모두 직접 클릭했고, 렌더 본문을 파일로 저장했다.
- 고시 별표는 PDF를 `pdftotext -layout`으로 읽고, HWPX(zip)를 풀어 `hp:tr/hp:tc` 셀 단위로 다시 대조했다. PDF 레이아웃에서는 "에어컨(냉방 전용)" 값이 한 줄 위에 찍히는데, 셀 대조로 같은 행임을 확인했다.
- 0건이 나온 검색은 모두 대조군으로 도구가 작동하는지 확인했다(위 표 참고).
- 다운로드 폴더: `/private/tmp/claude-501/-Users-kwonjaehyeon-Programming-sancho-appliance/937b18c9-2d69-434d-8cb4-c0e08656515f/scratchpad/costs/`(그 안에서 코드를 실행하지 않음). 스크립트는 같은 scratchpad의 `costs-scripts/`에 두었다.

## SHA-256 (조회 시점 사본)

동적 HTML은 다시 받으면 세션 값 때문에 해시가 바뀔 수 있다. 정적 파일(PDF·HWPX)은 재현할 수 있다.

| 파일 | 원본 URL | SHA-256 |
| --- | --- | --- |
| law-byl3.pdf | https://www.law.go.kr/LSW/flDownload.do?flSeq=159470219&bylClsCd=200201 | `efd94a7a06c489dab45e1160aa558be638af0176bec932f74fe0385616b11dd7` |
| law-byl3.hwp(HWPX) | https://www.law.go.kr/LSW/flDownload.do?flSeq=159470211&bylClsCd=200201 | `a23aa1b9b719ca8f3267b476f4d42d041a79bf43eaa190631cf5471990bd4f3f` |
| law-byl2.pdf | https://www.law.go.kr/LSW/flDownload.do?flSeq=159470209&bylClsCd=200201 | `242401b8ae436e786a1b3c33aa5f568d7c8cb3a0927484a25ed933346bf72083` |
| law-byl2.hwp(HWPX) | https://www.law.go.kr/LSW/flDownload.do?flSeq=159469939&bylClsCd=200201 | `504ce9604ffdf412d6e15ff90a26525f5f77d1eb3105f2a5c54fba8f199a0bb2` |
| law-byl1.pdf | https://www.law.go.kr/LSW/flDownload.do?flSeq=159469937&bylClsCd=200201 | `c9a1aa0c121a58767b22f21da16a857df103e5594c9bd6a8b7ab37fdb417c321` |
| law-body.html | https://www.law.go.kr/LSW/admRulLsInfoR.do (admRulSeq=2100000270136) | `b6548fcbfb2014287d77bb30713a9c88484d8918a9059f9de6552b940b2da85d` |
| coway-manual-274.pdf | https://www.coway.com/core/product/fmanual/download/274 | `61194f9fbcb96eb6b82143629b2610dfb1f48639d9cac68e947ad4f43371d577` |
| coway-clause-CM01.json | https://www.coway.com/core/community/fclause?clcd=CM01 | `2ac7f82da2ad91b10670aa68f95cd79f082aa89d158df8a69b62bf5a772b18ee` |
| coway-clause-CM02.json | https://www.coway.com/core/community/fclause?clcd=CM02 | `4f6211766635e982ec06cf6d9d08f66650c4b10c7a522e5a5929473ec2aefcb1` |
| coway-1148-pricetab.txt(렌더 본문) | https://www.coway.com/product/detail?prdno=1148&optno=1 | `2a16a67aa689d8392963fbd861db0944fa9d9b58608e2f7829e577583edccf81` |
| coway-1148-rental-default.txt(렌더 본문) | 같은 URL | `0a82cfb47cfb3beb7bae102caeafe6e84d5a0afdd40bfe712567d081dd05203b` |
| coway-1148-purchase.txt(렌더 본문) | 같은 URL, 구매 탭 | `591c193b18d4c2c100de385483466c5d1fff08b1da988ae57e51b4153b922850` |
| lg-wd523acb-sub.html | https://www.lge.co.kr/product/care-solutions/water-purifiers/wd523acb?modelId=MD10017831&pdpType=SUBSCRIPTION | `79277f88c05792251903a1f79c38886a845bc12cb7ff903e403e311bb5798f81` |
| lg-wd523acb-buy.html | https://www.lge.co.kr/product/object-collection/wd523acb | `12bb88a7d97ed923b8272d3c0b4fae28fd001ad644497d0f134dd52298c0edf8` |
| lg-rentalService.html | https://www.lge.co.kr/care-solutions/rentalService | `aa3ae641328bbe1e5ba431c640d23ddc6fb654e6b51dd923504a96972bbd6134` |
| lg-agm30040101.html | https://www.lge.co.kr/care-accessories/water-purifier/agm30040101 | `9c6b3b03fce71e5407bd109a62ac45e767e2e0a98a55a0af842218c8e16ff940` |
| lg-agm30063801.html | https://www.lge.co.kr/care-accessories/water-purifier/agm30063801 | `eea0bc144dc9320381b721236e9789e7ba963bcb5c230b808f844913a64a6f8a` |
| lg-manual.pdf | https://gscs-b2c.lge.com/open/downloadFile?fileId=jO7RH8OLgibKoMzZYJqKw | `93f91e80ce8806973e9f11058e56a0690ed85e4d6b1de118d5c3cec4a276d214` |
| sk-manual.html | https://qr.skmagic.com/2019/model/WPU/WPUA710CRERO/Manual.htm | `517b07d4ddb1f6c6e1086e5ae4fb67e90f4367d742ee69efc11cc715d47b0d81` |
| sk-purifier-sub.html | https://www.skmagic.com/goods/indexSubGoodsList (dispClsfNo=100000005) | `a62680ebe73cca30c6361d6af9459fcf8c685b6f61bcc2f4f2c743835d880681` |
| sk-filter-sub.html | https://www.skmagic.com/goods/indexSubGoodsList (dispClsfNo=1000000241) | `5686bd258abf81e33ba18b81a1b32050e2d2943c0f5b0b3a397d9246b072955f` |
| sk-contract.html | https://www.skmagic.com/introduce/contract/indexContract | `05c0a6a0fc240fcf691ca81d272e1c484a3163c87101ba2336562f9855adf3ef` |

## 원문 인용

### 코웨이 CHPI-7400N

제품 화면, 가격 혜택 탭 "가격&구매정책"(렌탈료, 렌탈등록비 10만원 기준):

> 모델명 관리방식 방문주기 의무사용기간 렌탈료 재렌탈 일시불액
> CHPI-7400N (냉/온/정/얼음) 방문관리 2개월 3년 59,900원 53,900원 2,380,000원 / 5년 56,400원 / 6년 54,900원 / 7년 53,400원
> 4개월 3년 56,900원 / 5년 53,400원 / 6년 51,900원 / 7년 50,400원
> 위의 렌탈료는 자동이체 기준으로 1,000원 할인된 금액이며, 기재된 요금은 회사 내부 사정에 따라서 변경될 수 있습니다.
> 3년 약정 (최초 설치일로부터) 5년 ※ 소유권 이전 및 재렌탈은 총 렌탈 계약 기간 이후 추가 비용 납부 없이 가능합니다.
> 공기청정기, 비데, 정수기, 연수기 잔여 의무사용기간 X 정상 렌탈료 X 10 %

렌탈 탭(프로모션, 4개월·7년 선택 시):

> 월 51,400원 / 월 22,700원 / 렌탈료 12개월 반값 할인 중! / 13개월차부터 기본 약정 할인 렌탈료 월 45,400원이 청구됩니다. / 렌탈료 총합 7년(소유권이전) 3,541,200원

렌탈/구매계약 약관(게시 2026-10-28 09:00판) 제11조 제1항:

> [정수기, 청정기, 비데, 연수기,음식물 처리기] : 의무사용기간 내에 고객의 사유로 본 계약이 해지되는 경우, 고객은 위약금 [(총 의무사용기간 일수-사용일수)X(월렌탈료÷30)X10%]과 회수비를 부담합니다.

설명서 PDF 32/52쪽(인쇄 31쪽):

> 나노트랩필터-세트 - 나노트랩필터 - 플러스이노센스필터(D) 4개월 (10L/일)

같은 설명서 PDF 43/52쪽: `CCNTN7-D-PLUS  NANOTRAP FILTER-SET  6`. 이 6개월은 영문 성능표의 조건이라 국내 주기로 쓰지 않았다.

### LG WD523ACB

구독 PDP HTML priceMap(48/60/72개월 × 방문 00/06개월):

> "48_00" 39900 · "48_06" 42900 · "60_00" 34900 · "60_06" 37900 · "72_00" 31900 · "72_06" 34900 (모두 monthlyPrice=originalPrice, promoPrice 없음)

구매 PDP:

> 할인 전 판매가 1,614,000원 / 회원할인가 … 할인율 9% / 할인 적용 후 가격 1,454,000 원 / 최대혜택가 1,352,300 원

가전구독 안내, 위약금과 회수비:

> 계약 후 1년 경과 이전: 잔여 의무사용기간 내 총 요금의 30% / 1년 경과 후 2년 경과 이전: … 20% / 2년 경과 후 의무사용기간 이전: … 10% … 정수기/홈브루 50,000원

필터 상세: `할인 전 판매가 73,000원 … 일반회원 할인가 69,300원`(AGM30040101), `할인 전 판매가 54,600원 … 일반회원 할인가 51,800원`(AGM30063801). 두 페이지의 적용 모델 목록에 모두 `WD523ACB.AKOR`가 있다. 공용 설명서 PDF 28/40쪽: `중금속9 흡착 필터: 6개월 (10 L/일 사용기준)`, `바이러스 클리어 필터: 12개월 (10 L/일 사용기준)`.

### SK매직 WPU-A710C

공용 설명서:

> 소모품(필터/피팅/튜빙)은 반드시 SK매직 순정품을 사용하고, 교체 시에는 전문 기사에게 의뢰해 주세요.
> 필터 구매 및 교체는 고객상담센터에 문의해 주세요. (고객상담센터: 1600-1661)
> 세디먼트 필터 / 블록 카본 복합 필터 / 나노테크 PAC 필터 — 교체 주기 4개월 / 4개월 / 12개월 (4인 가족 하루 10ℓ 사용기준)

구독 계약서 제14조(일반 약관이며 이 모델 전용이 아님):

> 위약금으로 잔여 계약기간 정상 구독료 {…1년차 구독료의 정상가(VAT포함)를 말함}에 본 계약서 전면에 표기된 위약금율을 곱한 금액을 지급하여야 합니다. 위약금율은 제품마다 상이합니다.

### 소비자분쟁해결기준 (공정거래위원회고시 제2025-14호, 시행 2025-12-18)

본문 머리: `[시행 2025. 12. 18.] [공정거래위원회고시 제2025-14호, 2025. 12. 18., 일부개정]`.

[별표 Ⅲ] HWPX 셀 원문:

> - 에어컨(냉방 전용) | ◦ 2년 | ◦ 제조일로부터 8년
> - 에어컨(냉난방 겸용) | ◦ 1년 | ◦ 제조일로부터 8년
> - 난로(전기, 가스, 기름), 선풍기, 냉풍기, 전기장판 | ◦ 2년 | ◦ 제조일로부터 5년
> - TV, 냉장고 | ◦ 1년 | ◦ 제조일로부터 9년
> - 전축, 전자레인지, 정수기, 가습기, 제습기, 전기청소기 | ◦ 1년 | ◦ 제조일로부터 7년
> - 세탁기 | ◦ 1년 | ◦ 제조일로부터 7년
> - 의류건조기, 의류관리기 | ◦ 1년 | ◦ 제조일로부터 7년

[별표 Ⅱ] 장기 물품대여서비스업 4) 소비자의 귀책사유로 인한 계약해지:

> 의무사용기간을 1년 초과로 정한 경우 | o 의무사용기간 잔여월 임대료의 10%에 해당하는 금액 배상 … *잔여월임대료={월임대료×(의무사용일수-실제사용일수)÷30}

품목별 확인 결과: 에어컨·냉장고·정수기·세탁기·건조기(의류건조기)·제습기·선풍기·TV는 **확인**했다. 식기세척기·공기청정기·로봇청소기·무선이어폰은 [별표 Ⅲ]에 **해당 분류가 없다**. 이 넷 가운데 식기세척기·공기청정기는 [별표 Ⅰ] 대상품목에 있고, 무선이어폰과 가까운 품목으로는 [별표 Ⅰ]에 "헤드폰"이 있다. 로봇청소기는 "전기청소기" 행이 있지만 고시가 로봇청소기를 포함하는지 적지 않아 값을 채우지 않았다.
