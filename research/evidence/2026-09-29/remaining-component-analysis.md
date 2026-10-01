# 남은 모델 기술 구성 대조 — 2026-09-29

이 문서는 제조사 원문에서 **모델에 연결되는 구성**을 추출한 뒤, 같은 부품 또는 같은 성능으로 묶어도 되는 범위를 판단한다. 자체 분해·전력 측정 결과는 아니다. 각 모델의 원문 위치와 미확인 항목은 `model-component-evidence.json`, 부품번호의 적용 범위는 `part-level-evidence.jsonl`에 기록했다.

## 같은 소모품 번호와 다른 공기 처리 구조: HP09·TP07

[다이슨코리아 필터 호환 목록](https://www.dyson.co.kr/360-glass-hepa-carbon-air-purifier-filter)에 따르면 `965432-01` 글라스 HEPA+탄소 교체 필터는 HP09와 TP07 모두에 맞는다. 따라서 **교체 소모품 선택**에는 같은 번호를 사용할 수 있다. 그러나 [HP09 설명서](https://www.dyson.com/content/dam/dyson/maintenance/user-guides/en_US/airtreatment/purifiers/HP09/369063-01.pdf)는 영구 촉매 필터를 교체형 HEPA+탄소 필터와 별도 부품으로 설명한다. TP07의 [제조사 제품 소개](https://www.dyson.com/air-treatment/air-purifiers/purifier-cool-tp07)는 HEPA H13·탄소 여과와 송풍을 설명한다. 같은 교체 필터가 호환된다고 해서 촉매 단계나 온풍 회로까지 같다는 결론은 나오지 않는다.

**독자적 판단:** 두 제품의 필터 유지비를 비교할 때는 `965432-01`의 교체 주기와 가격을 공통 항목으로 둘 수 있다. 포름알데히드 처리·온풍 전력·실내 공기 정화 속도를 비교하려면 HP09 촉매 및 히터 운전 조건, TP07 공기 유량, 동일 공간에서의 측정값이 따로 필요하다. 현재의 제조사 여과율은 필터 또는 정해진 시험 조건의 값이며 두 완제품의 동일 조건 비교값이 아니다. 사이트의 HP09 `PTC 세라믹 히터` 소재도 확보한 설명서만으로 확정하지 않는다.

[TP07 원제품 분해](https://n0.lol/notes/teardown-dyson/)에서는 메인 MCU `STM32F429` 계열이 식별됐다. 무선 모듈의 `QCA4020`은 바코드 판독이며 칩 표면 확인과 다르다. 분해 글에 적힌 팬 모터 번호는 제3자의 전언이라 사용하지 않았다. TP07의 MCU가 보인다고 해서 HP09가 같은 기판을 사용한다는 결론도 나오지 않는다.

## 물걸레 유지관리 구조: LG R5·Roborock S8 Pro Ultra

[LG RO585HGH 정확한 모델 비교표](https://www.lge.co.kr/product/object-collection/ro585hgh)는 R5에 라이다, 흡입·물걸레 청소, 먼지 자동 비움을 표시한다. 자동 물걸레 세척·건조는 다른 상위 제품군에 붙고 R5에는 적용되지 않는다. `듀얼 스핀 물걸레` 설명도 같은 LG 페이지에서 M9 항목에 나온다. 반면 [로보락 S8 Pro Ultra 설명](https://kr.roborock.com/blogs/roborock-kr/comparison-of-roborock-s8-pro-ultra-and-s7-max-ultra)은 RockDock Ultra의 물걸레 자동 세척·건조·먼지 비움과 구조광·적외선 장애물 감지를 명시한다.

**독자적 판단:** 두 모델의 자동 유지관리 기능을 같은 등급으로 묶는 것은 잘못이다. R5에는 사용자가 물걸레를 청소하는 작업이 남고, S8 Pro Ultra는 도크가 그 작업 일부를 수행한다. 따라서 비교 지표는 로봇 본체의 흡입력 수치 하나보다 물걸레 세척 빈도, 도크의 물·먼지 관리, 도크 건조 전력, 장애물 회피 성공률을 같은 집 구조에서 함께 측정하는 편이 유효하다. 로보락의 `6000Pa`는 제조사 조건의 진공도 수치이며 청소 성능의 독립 실측 결과가 아니다.

[S8 Pro Ultra 원제품 분해](https://karlquinsland.com/roborock-s8-pro-ultra-dock-teardown/)에서는 본체 PCB의 `Allwinner MR813`과 `Realtek RTL8189FTV`가 식별됐다. 전자는 본체 연산부, 후자는 무선 연결부로 해석할 수 있지만 두 칩의 정격만으로 청소 중 배터리 사용량을 계산할 수 없다. 같은 글의 메모리·저수준 제어 칩 설명은 표기와 역할이 모호해 부품번호 목록에 넣지 않았다.

## 정수기 소모품 교체와 냉각·가열부: SK매직 WPU-A710C·LG WD523ACB

[SK매직 WPU-A710C 공용 설명서](https://qr.skmagic.com/2019/model/WPU/WPUA710CRERO/Manual.htm)는 필터 단계와 WPU-A710C의 직수 UV 모듈을 설명하며, 필터·피팅·튜브 교체를 전문 기사에게 의뢰하라고 안내한다. [LG WD523ACB 제품 페이지](https://www.lge.co.kr/product/care-solutions/water-purifiers/wd523acb?modelId=MD10017831&pdpType=SUBSCRIPTION)는 필터 시스템과 출수구 UVnano를 설명한다. 두 제품 모두 세부 필터 카트리지·UV LED·온수 가열부의 부품번호는 아직 없다.

**독자적 판단:** WPU-A710C를 `필터 셀프 교체` 제품으로 표시하면 실제 유지비와 관리 절차를 잘못 안내할 수 있다. 두 모델의 필터 구성만으로 정수 성능 우열을 매길 수 없다. 같은 원수 조건에서 오염물질별 전후 농도, 사용 수명, 교체 공임, 온수 목표 온도별 소비전력을 확인해야 한다. UV LED가 있다는 사실은 모든 유로가 살균된다는 근거도 아니다.

## 부품번호 확보 수준과 다음 증거

| 증거 수준 | 현재 예 | 가능한 결론 | 보류할 결론 |
| --- | --- | --- | --- |
| 정확한 모델 호환 부품번호 | HP09·TP07 `965432-01` | 이 교체 필터가 두 제품에 호환됨 | 출고 시 장착 번호·팬/히터/제어 IC 동일성 |
| 이름 붙은 프로세서 계열 | 27LX5QKNA 알파7 Gen5 | 제조사 명명 화질 엔진 계열 | 칩 패키지·공정·전력 손실 |
| 정확한 모델 구성 설명 | TCL 08/12 인버터 모터, WF24A9500KE 워터샷, RF85C90D1AP 디지털 인버터 컴프레서 | 해당 기능/구성이 제품에 표시됨 | 컴프레서·펌프·IPM의 실제 부품번호 |
| 계열 공용 설명서 | 위닉스 DN2 | 같은 계열의 컴프레서·팬 구조 가설 | DN2H160-IWK의 동일 실장 확인 |
| 원제품 분해와 마킹 | WF-1000XM5·TP07·S8 Pro Ultra 각 한 개체 | 그 개체의 IC 번호 합계 6개 | 모든 생산 로트·국내 판매품의 동일성 |

삼성 `RF85C90D1AP`의 [정확한 모델 사양](https://www.samsung.com/sec/support/model/RF85C90D1AP/)은 디지털 인버터 컴프레서·R600a·트리플 독립냉각을 명시하고, `AR07A9170HCN`의 [정확한 모델 사양](https://www.samsung.com/sec/support/model/AR07A9170HCN/)은 디지털 인버터·모션센서·동결세정을 명시한다. 후자에 호환되는 교체 리모컨은 [삼성전자서비스](https://www.samsungsvc.co.kr/shop/product/0000150332)의 `DB96-25319C`다. 이 외부 리모컨 번호로 실외기 부품을 추정하지 않는다. RF85의 사이트 `메탈쿨링` 설명은 정확한 모델 사양의 `일반 쿨링커버(+엣지 쿨링)`과 맞지 않아 보류한다.

하이얼 `CTH06QBW`·`CTH10QBW`는 정확한 SKU의 구성 원문이 부족한 2개다. [6형 안전인증](https://www.safetykorea.kr/release/certDetail?certNum=SU072854-22002C&certUid=6223467)과 [10형 안전인증](https://www.safetykorea.kr/release/certDetail?certNum=SU072854-23001&certUid=6155493)에서 각각 기준 실내·실외기 조합의 파생모델임을 확인했다. 기준 모델과 정확한 SKU의 공단 신고 냉방능력·월간 전력량·효율등급도 일치한다. 하지만 인증·효율 동일성이 특정 컴프레서 또는 제어기판 번호를 증명하지 않는다. `CTH06QBW`의 사이트 표기 5등급은 [공단 정확한 모델 신고의 4등급](https://eep.energy.or.kr/certification/certi_view_260.aspx?no=260240150)과 충돌한다. 모델·생산 로트가 적힌 하이얼 부품표 또는 분해 사진이 다음 필요 자료다.
