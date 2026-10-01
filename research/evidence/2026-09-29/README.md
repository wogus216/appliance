# 가전 독자 분석을 위한 근거 자료집 (2026-09-29)

공개 중인 34개 모델을 기준으로 제조사 문서, 한국에너지공단 신고값, 시험 방법, 연구 논문을 모은 **편집 전 조사 자료**다. 이 폴더의 수치를 자동으로 제품 평가나 사이트 본문에 내보내지 않는다. 출처 확인, 동일 모델 검증, 비교 조건 검토를 마친 주장만 별도로 편집한다.

## 저장된 자료

| 파일 | 내용 |
| --- | --- |
| `models.json` | 공개 모델 34개의 정확한 모델번호·분류·기존 기술 주장 |
| `sources.jsonl` | 중복 제거한 출처 링크 180개, 모델 연결·유형·검토 상태 |
| `curated-sources.json` | 직접 확인한 원문·표준·논문·시험 보고서와 적용 범위 |
| `registry/kea-269.jsonl` | 한국에너지공단 의류건조기 신고표 1,110행 |
| `registry/kea-292.jsonl` | 식기세척기 신고표 162행 |
| `registry/kea-298.jsonl` | 일반 세탁기 신고표 759행 |
| `registry/kea-299.jsonl` | 드럼 세탁기 신고표 1,029행 |
| `additional-registry-search.json` | 공단 추가 9개 품목, 총 41,782행 검색 결과와 모델별 일치 건수 |
| `additional-registry-exact.jsonl` | 추가 품목의 정확한 모델번호 일치 신고값 15행 |
| `exact-model-measurements.jsonl` | 전체 13개 사이트 모델에 연결된 공단 신고값 16행 |
| `independent-tests.jsonl` | 한국소비자원 동일 조건 비교시험 2건의 시험 대상 8개 모델, 조건·건조 결과·회당 사용량 |
| `energy-research.jsonl` | 냉장고·에어컨·세탁기·건조기·필터·로봇 주행 등의 전력량 연구 8건과 적용 한계 |
| `component-map.jsonl` | 가전 부품·반도체 구조 근거 8건과 실제 사이트 모델 확인 범위 |
| `model-component-evidence.json` | 제조사·인증 자료에서 모델과 연결한 기술 구성·부품·프로세서 근거 32건, 미확인 항목, 카탈로그 충돌 |
| `part-level-evidence.jsonl` | 원제품 분해·제품 규격·서비스 문서·인증 자료에서 확인한 부품번호 18건, 모델 관계와 해석 한계 |
| `certification-identity-bridges.jsonl` | 하이얼 정확한 SKU 2개와 안전·전파 인증 기준 모델의 관계 및 적용 한계 |
| `component-coverage.json` | 공개 모델 34개 전체의 부품 근거 연결·칩/조립품 번호 부재 감사 결과 |
| `component-evidence-audit.md` | 부품 자료의 충분성 판단, 사이트의 잘못된 주장, 다음 1차 자료 수집 목록 |
| `samsung-laundry-part-analysis.md` | WD25·DV17의 확정 사양, 관련 해외 부품번호의 적용 한계, 독자 측정 과제 |
| `remaining-component-analysis.md` | 남은 모델의 필터·물걸레·정수 구조를 원문과 대조한 독자 판단 및 증거 한계 |
| `energy-and-components.md` | 전력 소모 요인, 반도체, 시험할 질문을 제품군별로 정리한 조사 노트 |
| `next-evidence-plan.md` | 독자적인 모델 평가에 필요한 자료의 우선순위·첫 조사 대상·공통 시험 기록표 |
| `foreign/us-epa-energy-star-*.jsonl` | 미국 EPA 식기세척기 756·건조기 674·세탁기 412개 인증 모델 원자료 |
| `foreign/energy-star-summary.json` | 미국 자료의 수집 주소·건수·사이트 모델번호 대조 결과 |
| `foreign/eprel-dishwasher-examples.jsonl` | EU EPREL 식기세척기 3개 제품의 eco 코스 건조 지수·전력량 사례 |
| `verified-facts.jsonl` | 제조사 규격·공단 신고에서 직접 확인한 기술 사실 11개 |
| `model-coverage.json` | 모델별 문서·공식 출처 후보·측정 자료 확보 현황 |
| `measurement-gaps.jsonl` | 모델별 정확한 신고값·건조 품질 자료 부재 기록 |
| `raw-manifest.json` | 로컬 설명서 5개, LG 제품 카탈로그 1개, 소비자원 시험 보고서 2개, EU 제품 정보표 3개의 출처·SHA-256·크기 |
| `raw/*.pdf` | 로컬 조사용 PDF 원본. Git과 공개 웹에서 제외 |

`sources.jsonl`의 `catalog_reference_unchecked`는 기존 사이트에 실려 있던 링크를 옮긴 것이다. 이번 조사에서 링크 내용과 정확한 모델 적용 범위를 새로 검증했다는 뜻이 아니다. `reviewed_2026-09-29`도 문서의 존재와 기재 내용 확인 상태이며 독립 실측의 보증이 아니다. `kind`가 제조사 출처여도 판매 지역, 계열 공통 문서, 옵션 차이를 다시 확인해야 한다.

## 지금 확인된 사실

- [한국에너지공단 DV17A9720BV 신고 상세](https://eep.energy.or.kr/certification/certi_view_269.aspx?no=269210105)에 모델번호가 정확히 일치한다. 표준건조용량 17kg, `1kg당 소비전력량 154.7Wh/kg`, 1등급, 연간 환산 282.3kWh다. 이는 국내 신고 시험값이다. `154.7 × 17 = 2,629.9Wh`라는 곱셈은 규정의 실제 1회 건조 사용량과 동일하다고 검증하지 않았으므로 공개 주장에 쓰지 않는다.
- [삼성 DV17A9720 계열 설명서](https://downloadcenter.samsung.com/content/UM/202504/20250401094234705/WM0013_IB_DV8700TK_DV19A9740_KO_250313.pdf)는 17kg, 정격 2,400W를 싣는다. 정격 W는 작동 중의 전력 한도/정격이지 회당 사용량 Wh가 아니다.
- [삼성 WD25DB8995 계열 설명서](https://downloadcenter.samsung.com/content/UM/202608/20260818083830741/OID76616_IB_T-PJT_WD8000D-AD_7LCD_KO_260814.pdf)는 세탁 25kg, 건조 15kg, 건조 시 정격 1,700W를 구분한다. `17kg/2,400W`와 `15kg/1,700W`를 한 회 전기요금 순위로 바꾸면 안 된다.
- [삼성 WF24A9500 계열 설명서](https://downloadcenter.samsung.com/content/UM/202304/20230407100730025/Drum_WF8000AK_WF21A9400_WF24A9500_9501.pdf)는 세탁 24kg, 가열 세탁 시 정격 2,200W를 싣는다.
- [쿠쿠 CDW-A0611TW 공식 설명서](https://www.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/200424%3Dz0383-0082a0%20rev.1_cdw-a0611t.pdf)는 정확한 모델번호가 표지에 나온다. [SK매직 DWA-81R0D 설명서](https://m.manual.skmagic.com/2019/model/DWA/DWA81R0D00SL/Manual.htm)는 열풍건조 추가 시 30분, 자동문 열림 선택의 건조 영향을 설명한다. 두 문서 모두 동일 조건에서 측정한 잔류 물방울이나 건조 지수는 제공하지 않는다. SK매직 설명서의 소비전력 `2,150kW` 표기는 단위 오류로 보여 검증 전 인용을 금지한다.
- 공단의 추가 품목에서는 정확한 모델번호로 냉장고 4개, 에어컨 3개, 공기청정기 1개(신고 4건), 제습기 1개, 순간식 정수기 3개를 찾았다. `AC-M16-SC` 공기청정기는 신고 업체·완료일에 따라 효율등급과 대기전력이 달라 **모델명만으로 하나의 등급을 확정하면 안 된다**.
- [한국소비자원 일체형 세탁건조기 비교시험](https://www.kca.go.kr/webzine/board/view?div=kca_2504&linkId=823&menuId=MENU00307)은 3.6kg 표준 면 시험포, 기본 표준코스에서 `WD25DB8995BB`의 원스탑 건조도 104%, 전력량 1,160Wh를 측정했다. [국립전파연구원 인증](https://www.rra.go.kr/ko/license/A_b_popup_keyno.do?key_no=R-R-SEC-WD8000D)은 사이트의 `WD25DB8995BZ`를 기준모델, 시험 대상 `BB`를 파생모델로 적는다. 인증 관계는 성능 동일성의 증거가 아니므로 `BZ` 실측값으로 인용할 수 없다.
- [한국소비자원 소형 식기세척기 비교시험](https://www.kca.go.kr/webzine/resources/doc/%5B202511%5D%EC%97%90%EB%84%88%EC%A7%80%EC%82%AC%EC%9A%A9%EB%9F%89_%EB%B9%84%EA%B5%90%EA%B2%B0%EA%B3%BC.pdf)은 정확한 시험 대상 6개 모델에서 건조 평가·회당 소비전력량·물 사용량을 같은 조건으로 비교했다. 사이트 식기세척기 모델과 일치하지 않아 시험 설계와 건조 방식의 참고 근거로만 쓴다.
- 미국 [ENERGY STAR 식기세척기](https://data.energystar.gov/d/q8py-6w3f)·[건조기](https://data.energystar.gov/d/t9u7-4d2j)·[세탁기](https://data.energystar.gov/d/bghd-e2wd) 1,842개 행을 저장했다. 사이트 모델번호와 정확히 일치하는 행은 0건이다. [EU EPREL의 4인용 식기세척기 제품 정보표](https://eprel.ec.europa.eu/fiches/dishwashers2019/Fiche_1987228_EN.pdf)는 eco 코스의 건조 지수 1.015와 회당 0.439kWh·5.4L를 함께 공개한다. 또 13인용 [LG DF030FW](https://eprel.ec.europa.eu/fiches/dishwashers2019/Fiche_2120884_EN.pdf)와 [Bosch SBV6EB801E](https://eprel.ec.europa.eu/fiches/dishwashers2019/Fiche_998967_EN.pdf)는 표시 건조 지수가 모두 1.061이고 회당 전력량은 각각 0.930·0.635kWh다. 설치 유형 등 조건이 다른 제품의 신고값이므로 효율 순위를 단정하는 자료로 쓰지 않는다. 해외 시험값은 국내 신고값·소비자원 별점과 바로 비교하지 않는다.

## 비교 규칙

1. **동일성**: 모델번호 전체가 일치하거나 설명서 규격표의 와일드카드가 해당 모델을 포괄하는지 확인한다. 유사 모델·해외 SKU·색상 파생형은 별도로 표시한다.
2. **지표**: 정격 소비전력(W), 1회 소비전력량(Wh/회), 건조물 1kg당 소비전력량(Wh/kg), 연간 환산(kWh/year)을 섞지 않는다.
3. **시험 조건**: 같은 시험 기준 버전, 부하 질량·직물/식기 구성, 초기 수분/오염도, 코스, 급수 온도, 건조 종료 기준을 확인한 값만 성능 순위로 비교한다. 한국 신고표 안에서도 완료일과 기준 변경 여부를 확인한다.
4. **건조 품질**: 건조 전후 무게, 잔류 수분율 또는 식기 표면 잔수 점수, 코스 시간, 전력량을 함께 보아야 한다. 낮은 전력량만으로 '더 잘 말린다'고 말할 수 없다.
5. **기술 논문**: 히트펌프, 흡착, 열전 냉각, 세제, 온도 제어의 작동 원리와 시험 설계에 사용한다. 연구 장치의 성능 수치를 국내 상용 모델에 옮기지 않는다.
6. **설명서 저작권**: 로컬 PDF는 조사용 보관물이다. PDF 전체, 긴 문구, 이미지를 사이트나 공개 저장소에 재배포하지 않는다. 게시물에는 직접 검증한 사실과 짧은 출처 링크를 붙인다.
7. **부품 동일성**: 반도체 업체의 참조 설계는 업계의 가능한 회로 구조를 보여줄 뿐이다. 내부 칩 제조사·부품번호·원가는 해당 모델의 부품표, 분해 자료 또는 제조사 확인 없이는 단정하지 않는다.

## 현재의 공백과 다음 수집 순서

**부품·반도체 근거도 아직 충분하지 않다.** 이번 모델별 감사에서 34개 중 32개에 제조사·인증·원제품 분해 자료를 통한 기술 구성 또는 부품·프로세서 근거를 연결했다. 그중 공용 설명서·해외 지역형·제품 계열 근거가 포함되며, 위닉스 1건은 DN2 계열까지만 확인됐다. 부품번호 기록은 9개 모델의 18행이고 다이슨 HP09·TP07의 `965432-01`과 삼성 AR07의 `DB96-25319C`는 교체품 **호환 번호**다. 원제품 한 개체의 실제 IC 번호는 WF-1000XM5·TP07·S8 Pro Ultra의 3개 제품에서 6개가 확인됐다. QCY HT08의 제조사 제품 규격에는 칩셋 모델 `WQ7034AX`가 명시됐다. 그러나 가전의 컴프레서·모터 주요 조립품 번호는 확인되지 않았다. 기존 `component-map.jsonl`의 참조 설계에 나온 MCU·IPM을 사이트 모델의 탑재 칩으로 해석하지 않는다. 부품번호별 출처·적용 범위, 사이트 기술 주장 충돌 7건, 하이얼 효율등급 충돌은 [`component-evidence-audit.md`](component-evidence-audit.md)에 있다.

정확한 공단 신고값은 34개 중 13개 모델에 연결됐다. 첫 네 개 신고표의 3,060행과 추가 9개 품목의 41,782행은 **검색한 후보군**이지 사이트 모델의 실측 건수가 아니다. 정확한 공단 일치 기록은 16행이며, 나머지 21개 모델은 `measurement-gaps.jsonl`에 검색 범위와 함께 기록했다. 사이트의 정확한 SKU에서 같은 조건으로 얻은 **건조 결과 지표는 여전히 0건**이다. 인증 관계에 있는 파생모델 1개의 비교시험은 별도 표시했다. 하이얼 에어컨 2개는 공단 신고값과 안전·전파 인증의 기준 모델 관계를 확인했지만 해당 정확한 SKU의 부품표는 확보하지 못했다. 위닉스 제습기는 DN2 계열 설명서만 확보했다. 삼성 제트봇은 해외 지역 코드가 붙은 공식 지원 페이지만 연결했으므로 국내 SKU 사양 확인이 필요하다.

다음 단계는 식기세척기 2대와 건조기/콤보 2대에 집중하는 것이다. 제조사에 해당 SKU의 시험성적서나 효율 라벨 근거, 코스별 전력량·잔류 수분 자료를 요청하고, 공개 자료가 없으면 동일한 식기·세제·급수 온도 또는 동일한 직물·초기 수분율로 자체 시험을 설계한다. [IEC 60436:2025](https://webstore.iec.ch/en/publication/80459), [IEC 61121:2012](https://webstore.iec.ch/en/publication/4539), [IEC 60456:2024](https://webstore.iec.ch/en/publication/70049)의 공개 소개로 시험 항목을 확인했지만 유료 전문은 구입하지 않았다. 한국 신고 시험과 IEC 시험의 일치 여부도 가정하지 않는다.

## 다시 생성하기

부품 감사표는 `node scripts/audit-appliance-components.mjs`로 다시 계산한다. `model-component-evidence.json`과 `part-level-evidence.jsonl`은 원문을 검토해 입력하는 수작업 자료이며, 이 명령은 모델번호 일치 여부를 검사하고 `component-coverage.json`만 갱신한다.

저장소 루트에서 `node scripts/collect-additional-appliance-registry.mjs`, `node scripts/collect-foreign-appliance-evidence.mjs`, `node scripts/collect-appliance-evidence.mjs` 순서로 실행한다. 카탈로그·기존 출처·공단 공개 표·미국 EPA 공개 표를 읽어 JSON/JSONL 파일을 다시 만든다. 인터넷 접근과 설치된 `typescript`, `jsdom`이 필요하다. `curated-sources.json`, `model-component-evidence.json`, `part-level-evidence.jsonl`, `independent-tests.jsonl`, `energy-research.jsonl`, `component-map.jsonl`, `foreign/eprel-dishwasher-examples.jsonl`, `verified-facts.jsonl`, `raw-manifest.json`, `raw/`는 수작업 검토 자료다. 같은 날짜의 자료집을 재생성할 때만 실행하고, 나중에 갱신하려면 새 날짜 폴더와 수집 시점을 함께 기록한다.
