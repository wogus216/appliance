# 모델별 부품·반도체 근거 감사 — 2026-09-29

## 결론

현재 자료는 **기술 구조를 공부하고 조사 대상을 고르는 데는 유용하지만, 34개 제품 전체의 실제 내부 부품을 분석한 독자 평가를 쓰기에는 부족하다.** 기존 `component-map.jsonl` 8건 중 5건은 반도체 업체의 일반 참조 설계이며 사이트 모델에 해당 칩이 탑재됐다는 자료가 아니다. 제조사·인증·원제품 분해 자료를 추가 조사해 `model-component-evidence.json`에 모델 연결 근거 32건을 기록했다. 다만 이 수에는 해외형·공용 설명서·위닉스 DN2 계열 근거가 포함되므로 **정확한 국내 SKU의 실장 부품 32건**으로 읽으면 안 된다. 부품번호 근거는 18행을 따로 기록했다. 이 중 원제품 한 개체의 IC 번호 6개는 **WF-1000XM5·TP07·S8 Pro Ultra 3개 제품**에서 확인됐다. 가전의 컴프레서·모터 주요 조립품 번호와 개별 부품의 전력 기여는 여전히 확인되지 않았다.

| 범위 | 모델 수 | 해석 |
| --- | ---: | --- |
| 사이트 공개 모델 | 34 | `models.json` 기준 |
| 모델과 연결한 기술 구성·부품/프로세서 | 32 | 제조사 제품 페이지·공용 설명서·해외 지역형·인증 제출 근거가 일부 포함됨 |
| 구성 근거가 아직 없는 모델 | 2 | 하이얼 CTH06QBW·CTH10QBW. 인증상 기준 모델과의 관계만 확보 |
| 이름이 확인된 프로세서/칩 계열 | 10 | H2, QN2e/V2, Myriad X, WQ7034AX, 알파7/8, STM32F429, MR813 등 포함 |
| 실제 분해 개체에서 IC 번호 확인 | 3개 모델·6개 IC | Sony 케이스 3개, TP07 MCU 1개, S8 Pro Ultra 본체 2개. 전 로트 공통 탑재는 미확인 |
| 제조사 부품표로 주요 조립품 번호 확인 | 0 | 판매 사이트의 호환 부품 후보는 별도 검증 필요 |
| 동일 SKU·동일 조건의 독립 건조 품질 측정 | 0 | `measurement-gaps.jsonl` 참고 |

`component-coverage.json`은 34개 모델 모두에 연결 자료·미확인 항목·기존 주장 충돌을 기록한다. 수치는 `node scripts/audit-appliance-components.mjs`로 다시 계산한다.

## 새로 확보한 부품번호와 적용 범위

- [WF-1000XM5 직접 분해](https://www.52audio.com/archives/179869.html)는 충전 케이스의 `BQ25618`(유선 충전), `MAX77857`(전력 변환), `P9222`(무선전력 수신)를 식별한다. 각 제조사의 [TI BQ25618](https://www.ti.com/product/BQ25618), [ADI MAX77857](https://www.analog.com/en/products/max77857.html), [Renesas P9222-R](https://www.renesas.com/en/products/p9222-r) 자료로 부품 기능을 읽을 수 있다. 분해 자료가 적은 `P9222`와 제조사의 `P9222-R` 세부 주문형을 동일하다고 단정하지 않는다. `GSBR-0002 V5`는 이어버드 SiP 외부 마킹이며 QN2e와 V2 각각의 다이 번호가 아니다. 이 조합은 충전 케이스의 입력·충전·출력 경로를 설명하는 출발점이지만, 회로별 Wh나 이어버드 ANC 소비전력은 알려주지 않는다.
- [Sony 서비스 문서](https://research.encompass.com/SON/rr/WF1000XM5.pdf)는 유럽 지역 `YY2963` 검은색 충전 케이스 교체 조립품을 `A5061335B`로 적는다. 국내 서비스 번호 또는 케이스 내부 기판 번호라고 말할 수 없다.
- [SM-R630 왼쪽 이어버드의 FCC 제출 안테나 사양](https://fcc.report/FCC-ID/A3LSMR630L/7313520.pdf)은 Kyocera AVX `LT31453`과 삼성 `GH42-07066A`를 같은 안테나에 연결한다. 사이트 모델은 `SM-R630N`이므로 국내 버전의 개정 동일성은 보류한다.
- [QCY HT08 제품 규격표](https://p.globalsources.com/IMAGES/PDT/SPEC/398/K1223873398.pdf)는 블루투스 오디오 칩셋 모델을 `WQ7034AX`로 명시한다. 이는 모델별 제조사 기재값이지 국내 유통 개체의 기판 마킹을 직접 본 결과가 아니다.
- [삼성 작성 해외 변형 서비스 문서 사본](https://manuals.plus/m/73b8fc1505369dfb68cf4bfbd4a207089081bcac21a0ec3952dc1b1d4570f5f2.pdf)은 `WD18DB8995BZT2`의 배수펌프 조립품 `DC97-24179B` 규격에 `WD25DB8995BZ`를 명시하고 하위 BLDC 모터를 `DC31-00200A`로 적는다. 국내 `WD25DB8995BZ` 실장 확인 전에는 **후보**다. 문서 전체를 재배포하지 않는다.
- 같은 해외 변형 부품표의 드럼 구동 모터 `DC93-00236G`, 송풍 팬 모터 `DC31-00198A`, 유럽형 표시판 `DC92-03710D`는 국내 `WD25DB8995BZ`와의 부품별 연결이 없다. 따라서 국내 모델 후보 수에도 넣지 않았다. 두 제품의 확정 구조와 부품 후보, 측정 과제는 [`samsung-laundry-part-analysis.md`](samsung-laundry-part-analysis.md)에 대조했다.
- [삼성전자서비스 소모품샵](https://www.samsungsvc.co.kr/shop/product/0000083525)은 `DC63-02526A` 필터의 적용 모델에 정확한 `DV17A9720BV`를 적고 필요한 경우 장착하도록 안내한다. 선택 장착 가능한 소모품의 호환 근거이며, 기본 장착 여부나 히트펌프 핵심 부품번호의 근거가 아니다.
- [다이슨코리아 정품 필터 목록](https://www.dyson.co.kr/360-glass-hepa-carbon-air-purifier-filter)은 `965432-01` 글라스 HEPA+탄소 교체 필터의 호환 제품에 **HP09와 TP07을 모두** 명시한다. 두 모델의 교체 소모품 호환성은 확인됐지만 출고 필터 코드나 팬·히터·제어기판의 내부 부품번호는 아니다. [HP09 사용설명서](https://www.dyson.com/content/dam/dyson/maintenance/user-guides/en_US/airtreatment/purifiers/HP09/369063-01.pdf)의 영구 촉매 필터는 별개이므로 TP07에 옮겨 적지 않는다.
- [TP07 원제품 분해](https://n0.lol/notes/teardown-dyson/)에서 메인보드의 `STM32F429` 계열 MCU를 식별했다. 무선 모듈의 `QCA4020`은 바코드 판독이므로 **칩 패키지 마킹 관찰**과 분리했다. 본문에 나온 팬 모터 번호는 분해자가 직접 판독한 값이 아닌 전언이어서 부품번호 근거로 넣지 않았다.
- [S8 Pro Ultra 원제품 분해](https://karlquinsland.com/roborock-s8-pro-ultra-dock-teardown/)의 본체 기판에서 `MR813`과 `RTL8189FTV`가 식별됐다. 같은 글의 메모리·저수준 제어 IC 설명은 표기가 모호해 보수적으로 제외했다. 두 IC 모두 한 개체의 기판 관찰이며 국내 개체의 부품 개정 동일성은 별도로 확인해야 한다.
- [삼성전자서비스 소모품샵](https://www.samsungsvc.co.kr/shop/product/0000150332)은 `DB96-25319C` 무선 리모컨의 호환 모델에 정확한 `AR07A9170HCN`을 명시한다. 이는 외부 교체 리모컨의 호환 근거이며 실외기 컴프레서·인버터 PCB 번호나 출고 동봉 리모컨 개정을 뜻하지 않는다.

번호·부품 종류·출처 위치·모델 관계·금지할 해석은 `part-level-evidence.jsonl`의 각 행에 분리해 저장했다.

## 확보한 모델별 근거의 예

- [삼성 WD25DB8995BZ 공식 지원](https://www.samsung.com/sec/support/model/WD25DB8995BZ/)과 보관된 계열 설명서로 히트펌프 건조계·열교환기·습도 센서를 확인했다. 컴프레서, 모터, MCU, IPM의 실제 부품번호는 없다.
- [삼성 DV17A9720BV 공식 사양](https://www.samsung.com/sec/support/model/DV17A9720BV/)은 건조 방식을 `인버터 히트펌프 + 히터`로 명시한다. 히터가 언제 켜지고 전력량이 얼마인지는 나타내지 않는다.
- [LG 2025년 5월 공식 카탈로그](https://www.lge.co.kr/kr/ebook/2025/may/elec/catImage/554/202505_elec_catalogue.pdf)는 `T873MEE111`에 인버터 리니어 컴프레서 적용을 표시한다. [LG S834MWW1D 공식 사양](https://www.lge.co.kr/product/refrigerators/s834mww1d)은 별도로 인버터 컴프레서와 노크온 미탑재를 표시한다. 두 제품을 같은 컴프레서로 묶으면 안 된다.
- [코웨이 CHPI-7400N 공식 설명서](https://www.coway.com/core/product/fmanual/download/274)는 냉수·온수·정수·제빙, R-600a 냉매, 순간온수, 필터 소재와 UV 살균을 기재한다. 실제 컴프레서·가열부·LED의 부품번호는 없다.
- [샤오미 AC-M16-SC 공식 사양](https://www.mi.com/in/product/xiaomi-smart-air-purifier-4/specs/)은 레이저 입자 센서와 DC 브러시리스 모터를 밝힌다. 인도 시장 문서이므로 국내 제품의 센서 부품 동일성은 별도 확인이 필요하다.
- [소니 WF-1000XM5 공식 대본](https://www.sony.co.kr/headphones/products/wf-1000xm5/video-transcript_1_1)은 QN2e·V2 프로세서 이름을 명시한다. 위 분해 자료는 이어버드 SiP 외부 마킹과 충전 케이스의 전력 IC를 별도로 확인한다. [삼성 VR50T95735W/WA 해외 제품 사양](https://www.samsung.com/es/vacuum-cleaners/robot/vr9500t-white-vr50t95735w-wa/)은 Intel Movidius Myriad X를 명시하지만 국내 유통형 기판 마킹은 아직 없다.
- [SK매직 DWA-81R0D 공용 설명서](https://m.manual.skmagic.com/2019/model/DWA/DWA81R0D00SL/Manual.htm)는 분사날개, 열풍 토출구, 필터 및 자동 문열림을 설명한다. `* 해당 모델에 한함`이라고 적힌 옵션 부품은 DWA-81R0D 적용 여부를 따로 확인해야 한다.
- [LG 27LX5QKNA 공식 카탈로그](https://www.lge.co.kr/kr/ebook/2025/december/best/catImage/615/202512_best_catalogue.pdf)는 알파7 Gen5 프로세서 계열과 내장 배터리를 명시한다. [Soundcore A3957 공식 사양](https://www.soundcore.com/products/a3957-liberty-5-tws-earbuds)은 9.2mm 드라이버와 마이크 6개를 명시한다. 두 자료 모두 패키지 마킹이나 생산 로트의 부품번호는 제공하지 않는다.
- [로보락 S8 Pro Ultra 공식 비교](https://kr.roborock.com/blogs/roborock-kr/comparison-of-roborock-s8-pro-ultra-and-s7-max-ultra)는 구조광·적외선 장애물 감지와 듀얼 브러시를 기재한다. 본체 기판 IC 두 개는 위 분해에서 별도로 확인됐다. [TCL 08형](https://www.tcl.com/kr/ko/air-conditioners/tac-08csd-tph11i)·[12형](https://www.tcl.com/kr/ko/air-conditioners/tac-12csd-tph11i)은 각각 인버터 모터와 송풍구 구성을 명시한다. 제조사 기능 설명을 센서·모터의 실제 주문번호로 간주하지 않는다.
- [삼성 RF85C90D1AP 정확한 모델 사양](https://www.samsung.com/sec/support/model/RF85C90D1AP/)은 디지털 인버터 컴프레서, R600a, 트리플 독립냉각, 슬림 아이스메이커와 일반 쿨링커버를 명시한다. [삼성 AR07A9170HCN 사양](https://www.samsung.com/sec/support/model/AR07A9170HCN/)은 초절전 디지털 인버터·모션센서·워시클린 동결세정을 명시한다. [공단 신고](https://eep.energy.or.kr/certification/certi_view_260.aspx?no=260200419)는 에어컨 실외기를 `AR07A9170HAX`로 연결한다. 두 제품의 내부 컴프레서·인버터 보드 번호는 아직 없다.

## 사이트에서 먼저 교정해야 할 주장

1. `CHPI-7400N`은 현재 사이트에 **온수·얼음이 없는 한뼘 냉정 정수기**로 소개되지만 코웨이 원문에서는 **아이콘 얼음정수기**다. 필터를 `중공사막 UF`라고 한 설명도 공식 설명서의 나노트랩 소재 표기와 맞지 않는다.
2. `S834MWW1D`의 **리니어 컴프레서·노크온 매직스페이스** 주장은 LG 정확한 모델 사양의 **인버터 컴프레서·노크온 X·매직스페이스 X**와 충돌한다.
3. `VR50T95735W`의 **170W 흡입**은 삼성 자료에서 확인되는 **최대 소비전력 170W**와 물리량이 다르다. 흡입력 수치로 게시하려면 별도의 측정/제조사 근거가 필요하다.
4. `CDW-A0611TW`의 **자동 문열림 건조**는 확보한 [쿠쿠 공용 설명서](https://www.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/200424%3Dz0383-0082a0%20rev.1_cdw-a0611t.pdf)에서 확인되지 않았다. 기능의 부재까지 확정한 것은 아니므로 확인 전까지 이 주장을 보류한다.
5. `RO585HGH`의 **듀얼 회전 물걸레·물걸레 자동 세척·살균 건조**는 [LG 정확한 모델 비교표](https://www.lge.co.kr/product/object-collection/ro585hgh)에서 R5에 미지원으로 표시된 기능을 포함한다. 라이다와 자동 먼지 비움은 별도로 확인된다.
6. `WPU-A710C`의 **필터 셀프 교체**는 [SK매직 공식 공용 설명서](https://qr.skmagic.com/2019/model/WPU/WPUA710CRERO/Manual.htm)가 필터·피팅·튜브 교체를 전문 기사에게 의뢰하도록 안내하는 내용과 충돌한다.
7. `RF85C90D1AP`의 **메탈쿨링** 주장은 [삼성 정확한 모델 사양](https://www.samsung.com/sec/support/model/RF85C90D1AP/)의 **일반 쿨링커버(+엣지 쿨링)** 표기와 맞지 않는다. 다른 모델의 메탈쿨링 설명을 옮겼을 가능성이 있으므로 확인 전 보류한다.

별도로 `CTH06QBW`의 사이트 효율등급은 **5등급**이지만 [한국에너지공단의 정확한 모델 신고](https://eep.energy.or.kr/certification/certi_view_260.aspx?no=260240150)는 **4등급**이다. 이 차이는 부품 구성 충돌 7건의 집계 밖에 있는 사양 충돌이다. `RF85C90D1AP`의 삼성 제품표 `43.0kWh/월`과 공단 신고 `41.38kWh/월`도 산정 시점·기준을 확인하기 전까지 하나의 값으로 합치지 않는다.

## 아직 모델 구성 근거가 부족한 2개

- `CTH06QBW`, `CTH10QBW`: [제품안전 인증 6형](https://www.safetykorea.kr/release/certDetail?certNum=SU072854-22002C&certUid=6223467)·[10형](https://www.safetykorea.kr/release/certDetail?certNum=SU072854-23001&certUid=6155493)은 각각 `AS07PH1LRC/1U07OK1QRC`, `AS15PC1LRC/1U15YK1SRC`의 파생모델로 연결한다. 공단의 기준 모델과 정확한 SKU 신고값도 각각 일치한다. 그러나 인증서는 컴프레서·팬·PCB의 부품번호를 제공하지 않고, 하이얼의 해당 SKU 설명서·부품표도 찾지 못했다. 관계와 한계는 `certification-identity-bridges.jsonl`에 분리했다.

## 다음에 확보해야 할 1차 자료

1. **정확한 모델/제조 로트별 부품표**: 컴프레서, 모터, 순환·배수 펌프, 히터, 센서, 제어 PCB의 제조사 부품번호와 대체/개정 이력. 제조사 서비스센터 또는 공식 부품 유통망의 적용 모델 표가 필요하다. 같은 제품명이라도 지역 접미사와 생산 시기에 따라 부품이 달라질 수 있다.
2. **기판·모듈 실물 확인**: 공식 서비스 문서, 제조사 제공 부품 사진 또는 직접 촬영한 분해 자료에서 IC 패키지 마킹을 확인한다. 그 후 칩 제조사 데이터시트에서 정격, 제어 기능, 손실 특성을 읽는다. ST/NXP/TI 참조 설계에 나온 칩을 국내 모델의 실장 칩으로 옮기지 않는다.
3. **동일 조건 에너지 분해 측정**: 전력 로거로 코스 전체의 W 시계열과 Wh를 기록하고 부하량·초기 수분·급수온도·실온·코스·건조 종료 상태를 함께 보관한다. 완제품 Wh에서 컴프레서/히터/모터의 Wh를 곧바로 분리할 수 없으므로 장치 제어 로그 또는 회로별 계측이 추가로 필요하다.
4. **에러코드 진단 자료**: 정확한 모델·코드별 서비스 절차, 센서 정상 범위, 점검 순서와 실제 수리 결과. 사용자 설명서의 코드 설명은 표시된 조건만 알려주며 단일 고장 부품을 확정하지 않는다.

공식 공개 자료에서 부품번호가 나오지 않은 경우는 `미확인`으로 남긴다. 검색된 해외 호환 부품 판매 페이지의 번호도 국내 SKU와 생산 로트에 적용된다는 공식 확인 전에는 콘텐츠의 사실로 사용하지 않는다.
