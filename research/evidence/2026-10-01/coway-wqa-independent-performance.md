# CHPI-7400N 정수 성능의 독립 인증 범위 — 2026-10-01

코웨이의 [CHPI/CPI-7400N 사용설명서](https://www.coway.com/core/product/fmanual/download/274)에 적힌 인증 문구를 인증기관인 [WQA 공개 제품 목록](https://find.wqa.org/find-products)과 직접 대조했다. WQA 목록은 **NSF/ANSI 규격에 따라 WQA가 인증**한 항목이다. `NSF가 이 모델을 직접 인증했다`는 뜻으로 바꾸지 않는다.

| WQA 공개 목록 | 정확한 모델과 적용 부품 | 인증된 범위 |
| --- | --- | --- |
| [NSF/ANSI 42 완제품 항목](https://find.wqa.org/find-products/ctl/detail/mid/1054/cid/coway_co_ltd/sid/1/keyword/7400n) | `CHPI-7400N` → 교체 요소 `CCNTN7-D-PLUS` | 잔류염소, 맛·냄새, 명목 미립자 Class I |
| [NSF/ANSI 53 완제품 항목](https://find.wqa.org/find-products/ctl/detail/mid/1054/cid/coway_co_ltd/sid/3/keyword/7400n) | 같은 모델·교체 요소 | 낭포, 마이크로시스틴, 탁도, VOC(클로로포름 대리 시험), 1,2,3-TCP |
| [NSF/ANSI 401 완제품 항목](https://find.wqa.org/find-products/ctl/detail/mid/1054/cid/coway_co_ltd/sid/63/keyword/7400n) | 같은 모델·교체 요소 | 미세플라스틱, 아테놀올, 비스페놀 A 등 **목록에 명시된 16개** 물질 |
| [NSF/ANSI/CAN 372 항목](https://find.wqa.org/find-products/ctl/detail/mid/1054/cid/coway_co_ltd/sid/29/keyword/7400n) | `CHPI-7400N` | 물과 접촉하는 부품의 **납 함량** 기준. 납 제거 성능 인증은 아니다. |

WQA 완제품의 42·53·401 항목에는 **정격 유량 0.4 gpm**, **용량 150 US gal**이 표시된다. 150 US gal은 약 **568 L**이다. 설명서 영문 성능표 42쪽의 **정격 용량 560 L**과 거의 같지만 **정격 유량 1.89 L/min(약 0.5 gpm)** 표기는 WQA 목록의 0.4 gpm과 다르다. 문서 개정·시험 조건 차이를 확인하지 못했으므로 둘을 같은 유량으로 합치지 않는다. 설명서의 국내 **4개월(10 L/일)** 필터 교환 안내와 영문 성능표의 **6개월** 표기도 별도 조건이다.

WQA의 [필터 부품 `CCNTN7-D-PLUS` 401 항목](https://find.wqa.org/find-products/ctl/detail/mid/1054/cid/coway_co_ltd/sid/63/keyword/ccntn7-d-plus)에는 독립 시험 통과 물질과 조건(0.5 gpm, 150 gal)이 각주로 적히지만, 부품 행의 제거 성능 인증 표시는 **`Not Applicable`**이다. [42 부품 항목](https://find.wqa.org/find-products/ctl/detail/mid/1054/cid/coway_co_ltd/sid/1/keyword/ccntn7-d-plus)도 같은 방식이다. 두 부품 항목은 **재료 안전성과 구조 건전성 요구사항에 한해 인증**한다고 명시한다. 부품 시험 각주를 필터 단독의 인증 제거율로 바꾸지 않는다.

**독자적 판단:** 제조사 설명서에만 있던 `CHPI-7400N` ↔ `CCNTN7-D-PLUS` 적용 관계와 명시된 완제품 정수 성능 항목은 WQA 목록으로 교차 확인됐다. 이는 실제 판매 개체의 장착 필터 라벨, 국내 교체 공임, 다른 정수기와의 동일 조건 성능 우위까지 확인한 결과는 아니다. 제조사 상품 페이지의 특정 제거율 수치를 WQA 목록에 없는 독립 측정값으로 옮기지 않는다.

나머지 두 모델의 인증 대상과 모델 연결 범위는 [LG·SK매직 정수 성능 근거 대조](./lg-sk-certification-scope-audit.md)에 정리했다.

별도 [한국물기술인증원 유효 제품 목록](./kwtc-exact-water-purifier-register.md)에도 `CHPI-7400N` 정확한 모델이 **2026-07-09 기준 323번**, 유효 정수량 **1,000 L**로 등재된다. 이는 위 WQA의 **150 US gal(약 568 L)**과 다른 제도·시험 기준의 표시값이므로 두 용량을 같은 정격으로 합치지 않는다.
