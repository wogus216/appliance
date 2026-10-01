# 유지비·고장률 공개 근거 감사 — 2026-09-30

대상은 [전날 자료집의 공개 모델 34개](../2026-09-29/models.json)다. 제조사 국내 공식몰, 공식 서비스 부품몰, 보증·요금표와 조사기관의 원자료 설명을 확인했다. `maintenance-cost-evidence.jsonl`에는 가격을 **조회일의 부품 단품가**로 저장했다. 가격은 이후 바뀔 수 있다.

## 실제로 가격과 호환성을 확인한 교체품

| 사이트 모델 | 공식 교체품·조회가 | 비용 해석과 한계 |
| --- | --- | --- |
| Dyson `TP07`, `HP09` | [Dyson Korea `965432-01` HEPA+탄소 필터](https://www.dyson.co.kr/360-glass-hepa-carbon-air-purifier-filter) **59,000원**, 정가 79,000원 | 두 모델이 공식 호환 목록에 있다. 제품 페이지는 **12개월마다 교체 권장**하고, [필터 FAQ](https://www.dyson.co.kr/products/tools-and-accessories/air-purifier-filters)는 HEPA+탄소 필터에 **하루 12시간 사용 기준 12개월**을 명시한다. 그 조건과 조회가가 유지된다면 필터 약 **59,000원/12개월**이라는 조건부 예산을 제시할 수 있다. 실제 교체 시기는 사용량·오염도·필터 알림에 따른다. 필터의 별도 12개월 *품질보증*은 교체 주기와 다른 문구다. HP09의 별도 촉매 필터 비용까지 포함한 금액이 아니다. |
| Samsung `DV17A9720BV` | [삼성전자서비스 `DC63-02526A` 3차 마이크로 안심필터](https://www.samsungsvc.co.kr/shop/product/0000083525) **10,000원** | 정확한 모델이 호환 목록에 있다. 설명은 **필요한 경우 장착**하고 세척해 다시 쓰는 필터라고 한다. 따라서 구매가를 필수 연간 유지비로 환산하지 않는다. 단품만 주문하면 표시 배송비 **2,500원**이 추가되어 표시 결제액은 12,500원이다. 기본 장착 여부나 본체 압축기 교체비의 근거가 아니다. |
| Samsung Jet Bot AI `VR50T95735W` 계열 | [배터리 `DJ96-00234A`](https://www.samsungsvc.co.kr/shop/product/0000090678) **128,000원**; [고성능 필터 `DJ97-02931A`](https://www.samsungsvc.co.kr/shop/product/0000123382) **18,000원**; [도크 먼지봉투 `DJ67-00878B`](https://www.samsungsvc.co.kr/shop/product/0000079860) **4,000원/개** | 서비스몰의 적용표는 `VR50T95735W/AA` 등 **국가별 접미 코드가 붙은 형번**을 나열한다. 카탈로그에는 접미 코드가 없으므로 국내 판매 개체의 명판 전체 코드·제조번호를 대조하기 전에는 적용 확정으로 표시하지 않는다. 배터리는 수명이나 정기 교체 주기가 공개된 것이 아니므로 연간 128,000원으로 계산하지 않는다. 필터·봉투도 이 개체의 연간 교체 횟수가 없고, 필터·봉투 단품 주문에는 표시 배송비 2,500원이 붙는다. |
| Xiaomi `AC-M16-SC` | [본체 모델 규격](https://www.mi.com/kr/product/xiaomi-smart-air-purifier-4/specs/)과 [필터 `M16R-FLP-GL` 적용 규격](https://www.mi.com/kr/product/xiaomi-smart-air-purifier-4-filter/specs/) 연결 | [제조사 필터 안내](https://www.mi.com/kr/product/xiaomi-smart-air-purifier-4-filter/)는 사용 환경에 따라 **6–12개월 교체**를 권장한다. [국내 구매 페이지](https://www.mi.com/kr/product/xiaomi-smart-air-purifier-4-filter/buy/)의 `0원`은 동적 로딩의 자리 표시로 보이며 실거래가로 기록하지 않았다. 가격을 확인할 때까지 연간 비용도 비워 둔다. |

[로보락 S8 Pro Ultra 사용설명서](https://support.roborock.com/hc/en-us/article_attachments/18342044174873)는 세척 가능 필터를 2주마다 청소하고 6–12개월마다 교체하도록 안내한다. [미국 공식몰의 S8 Pro Ultra 호환 필터 2개 묶음](https://us.roborock.com/collections/accessories?page=2)은 미국 달러 가격이므로 국내 원화 유지비에 섞지 않았다. 국내 공식 가격은 이번 조사에서 확인하지 못했다. 같은 설명서의 장기 미사용 시 3개월마다 충전 안내는 **배터리 교체 주기**가 아니다.

## 압축기 보증과 유상수리비

[LG의 정확한 `S834MWW1D` 제품 규격](https://www.lge.co.kr/product/refrigerators/s834mww1d?modelId=MD09795830&pdpType=PURCHASE&sKwd=S834MWW1D&sRank=1&sTab=unit_product_list)은 **인버터 컴프레서**, [`T873MEE111` 규격](https://www.lge.co.kr/product/refrigerators/t873mee111)은 **인버터 리니어 컴프레서**라고 구분한다. [LG 공식 보증표](https://www.lge.co.kr/support/rates-warranty-guide)는 냉장고의 2021년 10월 이후 생산 인버터 컴프레서와 2009년 10월 이후 생산 리니어 컴프레서를 각각 10년 핵심부품 무상 보증 대상으로 기재하고, 해당 보증기간의 핵심부품 교체에는 부품대와 수리비 전액 무상이라고 명시한다. 개별 개체의 생산 시점·보증 적용 여부는 제품 명판과 구매 증빙으로 판단해야 한다. **10년 보증은 10년 무고장 확률이나 평균 수명이 아니다.**

[삼성전자서비스 보증표](https://www.samsungsvc.co.kr/info/fee?tab=assure)는 냉장고 일반 컴프레서 3년, 양문형 냉장고 인버터 컴프레서는 2009년 11월 판매분부터 10년, 건조기는 모터·컴프레서에 별도 10년/12년 조건을 기재한다. 모델별 판매 시점·형식·보증서를 확인하지 않고 `RF85C90D1AP`, `RS84B5061M9`, `DV17A9720BV`의 적용 기간을 일괄 확정하지 않는다.

유상 수리 청구액은 **부품비+수리 기술료+출장비**다. [삼성전자서비스 2026-01-07 요금 안내](https://www.samsungsvc.co.kr/solution/1014598)와 [LG 공식 요금표](https://www.lge.co.kr/support/rates-warranty-guide)는 평절기 일반 출장비 28,000원, 야간·휴일 33,000원, 6–8월 기본 33,000원·야간/휴일 38,000원을 게시한다. 이는 수리 전체액이 아니라 유상 출장 항목이다. [삼성 리퍼 부품 공개 검색](https://www.samsungsvc.co.kr/info/fee?tab=price)은 휴대폰·컴퓨터·TV/모니터로 제한되어 냉장고·건조기·에어컨 압축기 가격을 제공하지 않는다. 조사한 정확한 모델의 **공식 압축기 부품가와 모델별 기술료는 확인되지 않았다.** 따라서 공임 포함 압축기 수리비를 숫자로 게시하지 않는다.

## 고장률 자료의 적용 범위

고장률은 적어도 **판매/조사 개체 수(분모), 고장 정의, 관찰 기간, 모델번호 전체, 국가/사용 환경**이 있어야 산출할 수 있다. 서비스 문의 건수, 리뷰 별점, 보증기간, 부품 판매가만으로는 계산할 수 없다.

- [Consumer Reports의 2026년 진공청소기 소유자 조사](https://www.consumerreports.org/vacuum-cleaners/most-and-least-reliable-vacuum-cleaners)는 2016–2026년 새로 산 청소기 **165,569대**의 경험을 모았고, 로봇청소기 브랜드의 *4년차 예상 문제율* 산출 방식을 공개한다. 보고서도 **로봇 물걸레 겸용 제품은 아직 예측 신뢰도 점수를 낼 자료가 부족하다**고 밝힌다. 표본은 미국 회원 설문과 여러 모델의 혼합이어서 이 자료로 S8 Pro Ultra·R5·제트봇의 한국 개체 고장률을 추정하지 않는다. 응답의 `문제`에는 브러시 엉킴·앱 연결 같은 사항도 포함되므로 압축기/배터리 물리 고장률로 읽지 않는다.
- [Consumer Reports 2026년 냉장고 조사](https://www.consumerreports.org/cro/news/2014/11/the-most-and-least-reliable-refrigerator-brands/index.htm?EXTKEY=AYAHRE02)는 2016–2026년 새로 산 **제빙기 탑재 냉장고 85,290대**를 대상으로 한 미국 회원 자료이며, 이 범위의 **5년차까지 예상 문제 발생 30%**를 제시한다. 이는 압축기 고장률이 아니고, 우리 카탈로그의 특정 한국 모델·비제빙기 제품 고장률도 아니다.
- [Which? 2025년 7월 냉장냉동고 소유자 조사](https://www.which.co.uk/reviews/fridge-freezers/article/top-fridge-freezer-brands-anUP31D5GeNb)는 **5,132대**의 영국 소유자 자료를 바탕으로 7년 내 브랜드별 고장 비중을 평가하지만 공개 화면에는 브랜드별 수치가 잠겨 있다. 국가·제품군·모델 귀속이 달라 카탈로그 개별 냉장고의 고장률로 옮기지 않는다.

**결론:** 가격은 정확히 호환이 확인된 부품 단위로만 일부 확보했다. 공개된 정확한 한국 SKU의 압축기 공임 포함 견적, 배터리 교체 주기, 34개 개별 모델/부품의 기간별 고장률은 현재 자료에서 확인되지 않았다. 사이트의 내구성·비용 순위를 쓰려면 동일한 분모와 관찰 기간을 갖춘 모델별 수리 기록 또는 장기 사용자 패널이 추가로 필요하다. 공개 자료만으로 이를 만들어 낼 수는 없다.

이번 조사에서 발견한 `T873MEE111` 리뷰의 **10년 보증 → 내구성 우수** 해석과 냉장고 비교 글의 **압축기가 가장 비싼 수리 부품** 단정을 제거했다. 보증 적용 범위와 유상 수리비의 미확인 상태만 게시한다.
