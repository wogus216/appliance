# 미확인 근거 추적 — 2026-09-30

전날의 [34개 공개 모델 자료집](../2026-09-29/README.md)에 대한 추가 조사다. 전날 파일과 집계는 그 날짜의 스냅샷으로 남긴다. 이번 조사에서 확인한 하이얼 설명서 2건은 `haier-exact-model-manuals.jsonl`에 원문 주소·파일 해시·사양표 위치·적용 한계를 기록했다. S8 Pro Ultra 운전 구간별 공개 계측 2건은 `power-state-measurements.jsonl`, 오류 코드 원문 적용 범위는 `error-code-source-audit.jsonl`에 기록했다. PDF 전문은 저장소에 복제하지 않았다.

조사 방식은 **공개된 제조사·시험기관·인증 원문과 원본 사진을 직접 찾는 것**으로 정했다. [`primary-source-requests.md`](primary-source-requests.md)는 필요한 필드를 정리한 과거 초안으로만 보관하며 외부 문의는 진행하지 않는다.

## 남은 확인 순서

| 순서 | 확인할 사실 | 2026-09-30 상태 | 필요한 다음 근거 |
| --- | --- | --- | --- |
| 1 | 하이얼 `CTH06QBW`·`CTH10QBW`의 정확한 모델 설명서와 냉각계 구성 | **설명서 확보**. 제조사 사이트가 각 모델명으로 공용 계열 설명서를 제공한다. 06은 R410A 0.54kg·정격 1,050W, 10은 R32 0.58kg·정격 1,500W. 먼지필터·증발기 셀프 클리닝·실외 압축기 보호 지연 확인 | 생산 로트별 실외기 라벨·부품표로 컴프레서/팬/기판 번호 확인 |
| 2 | 국내 SKU에 실제 적용되는 주요 조립품 및 IC 번호 | **공개 원문 재조사 완료, 실장번호 미확인**. [`installed-parts-source-audit.md`](installed-parts-source-audit.md)에 하이얼·삼성 공식 경로, 해외 부품표 후보와 한계를 기록했다. 주요 구동·냉각·제어 조립품 실장 확정 0건 | 모델 전체 코드와 제조번호를 포함한 공식 부품 적용표, 서비스 부품도 또는 실물 부품 라벨 사진 |
| 3 | 정확한 국내 SKU의 동일 조건 건조·세척 품질과 회당 Wh | **공개 원문 추가 조사 완료, 정확한 SKU의 품질+Wh 쌍은 미확인**. [`wash-dry-outcome-energy-audit.md`](wash-dry-outcome-energy-audit.md)에 삼성 정확한 `BZ`의 3kg·98분 제조사 시험, `BB`의 독립기관 품질·Wh, 실사용 앱 합계와 모델 귀속 충돌을 분리했다 | 정확한 SKU·코스·부하·소프트웨어가 찍힌 공개 회당 Wh 및 종료 품질 자료 |
| 4 | 운전 시간별 W·누적 Wh, 회로별 소비전력 | **S8 Pro Ultra의 운전 상태별 콘센트 W·기간 합계 Wh 확보**. [`power-trace-circuit-audit.md`](power-trace-circuit-audit.md)에 소유자 7일 전력계 기록과 별도 직접 시험을 대조했다. 정확한 SKU의 연속 시각별 파형과 내부 회로별 Wh는 여전히 미확인 | 모델·지역형·코스가 기록된 일정 간격 W/누적 Wh 원자료; 부품별 판단에는 회로별 계측 또는 검증 가능한 제어 로그 |
| 5 | 오류 코드별 진단과 수리 결과 | **하이얼 2개 모델의 `F25` 표시 조건·10초 재시작 안내 확보**, 사이트에 반영. [`error-code-diagnostic-audit.md`](error-code-diagnostic-audit.md)에 해외 동일 코드의 다른 진단과 TCL 2개 벽걸이의 판매처 설명서·A/S 조치 범위를 대조했다. TCL 2개 모델의 근거 없는 부품 단위 코드 매핑 13개를 게시 보류했다. 정확한 모델의 서비스 부품 진단과 실제 수리 결과는 미확인 | 국내 정확한 모델 서비스 진단표·센서 정상 범위·코드 사진과 교체 부품 및 수리 전후 결과가 연결된 공개 기록 |
| 6 | 사이트 사양 충돌 및 출처가 약한 기술 주장 | **전날 기록한 7개 모델 주장 충돌 교정 완료**. [`catalog-claim-conflict-audit.md`](catalog-claim-conflict-audit.md)에 모델별 원문·게시 수정·남은 불확실성을 기록했다. 하이얼 관련 등급·냉매·무게·필터 교정도 유지했다 | 정확한 SKU의 생산 로트별 사양표·실장 부품번호와 쿠쿠 도어 작동·건조 방식, 국내 제트봇의 공인 흡입력을 확인 |
| 7 | 필터·배터리·압축기 유지비와 고장률 | **공개 자료 조사 완료, 일부 비용만 확인**. [`maintenance-reliability-audit.md`](maintenance-reliability-audit.md)에 다이슨 정확한 모델 필터 59,000원과 조건부 12개월 교체, 삼성 건조기 선택 필터 10,000원, 제트봇 계열 배터리 128,000원·필터 18,000원·봉투 4,000원, 샤오미 필터 주기, LG·삼성 보증/출장비와 조사기관 표본 범위를 분리했다. 개별 모델·부품 고장률과 압축기 공임 포함 견적은 미확인 | 국내 개체의 전체 형번·제조번호에 맞는 공식 부품가/기술료, 실제 사용별 교체 횟수, 모델별 분모·기간·고장 정의가 공개된 수리 자료 |

하이얼 두 설명서를 연결하면 전날 **모델 연결 기술 구성 근거 32/34**의 빈 2개를 채울 수 있다. 이는 **실장 컴프레서·기판 번호 34개를 확보했다는 뜻이 아니다.** 냉매 종류가 서로 다르다는 사실은 두 제품의 냉각계 사양 차이를 뒷받침하지만, 두 컴프레서의 제조사·효율·내구성을 비교하지는 못한다.

## 이번에 확인한 공식 원문

- [`CTH06QBW` 제조사 설명서 목록](https://www.haier.co.kr/board/board_manual/board_list.asp?scrID=0000000231&pageNum=3&subNum=7&ssubNum=1&page=1&s_string=CTH06QBW): `CTH06QBW_제품설명서` 한 건. [PDF 다운로드](https://www.haier.co.kr/include/download.asp?file_name=HSU06_Series__CTH06_Series_%EC%82%AC%EC%9A%A9%EC%84%A4%EB%AA%85%EC%84%9C_20240221.pdf&file_full_name=00000002312024000262_file1.pdf&folder=0000000231)의 물리 15쪽 사양표를 직접 확인했다.
- [`CTH10QBW` 제조사 설명서 목록](https://www.haier.co.kr/board/board_manual/board_list.asp?scrID=0000000231&pageNum=3&subNum=7&ssubNum=1&page=1&s_string=CTH10QBW): `CTH10QBW_제품설명서` 한 건. [PDF 다운로드](https://www.haier.co.kr/include/download.asp?file_name=HSU10Q_Series__CTH10Q_Series_%EC%82%AC%EC%9A%A9%EC%84%A4%EB%AA%85%EC%84%9C_20240221.pdf&file_full_name=00000002312024000264_file1.pdf&folder=0000000231)의 물리 16쪽 사양표를 직접 확인했다.
- [한국에너지공단 `CTH06QBW` 신고](https://eep.energy.or.kr/certification/certi_view_260.aspx?no=260240150)는 4등급·정격 냉방능력 2,300W·월간 89.5kWh다. 설명서의 정격 소비전력 1,050W와 **서로 다른 물리량**이다.
- [삼성의 `WD25DB8995BZ` 시험 조건](https://www.samsung.com/sec/ai-subs-living/WD90H25BHB-subscribe2-d2c/WD90H25BHB/)은 세탁 3kg·급수 20℃, 건조 3kg·외기 23±2℃·상대습도 55±5%, AI 맞춤+의 절약 모드 켜짐/꺼짐 비교를 명시한다. KATRI가 검증한 제조사 시험으로, 독립기관이 원자료와 결과 품질을 공개한 동등 비교로 세지 않는다.

제조사 설명서의 사양표는 계열 공용이다. 정확한 모델명은 제조사 다운로드 목록에서 PDF에 연결되므로 해당 계열 사양을 모델 근거로 사용한다. 생산 시점이나 개정에 따른 실장 부품 동일성은 별도 검증 대상이다.
