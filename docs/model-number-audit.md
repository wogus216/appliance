# 카탈로그 모델번호 전수 감사

## 측정 사양

- **분석 단위**: 제품 1건의 `modelNumber` 문자열
- **모집단**: `allAppliances` 74개 **전수**
- **데이터 시점**: 2026-08-23
- **조회 대상**: 다나와 통합검색 `search.danawa.com/dsearch.php?query=<모델번호>`
- **판정 기준(사전 고정)**
  - `확인` — 검색 결과 상품명 중 하나가 모델번호를 (공백·하이픈 무시) 그대로 포함
  - `부분` — 결과 상품명이 모델번호 앞 6자를 포함 (색상 접미사 차이 등)
  - `미확인` — 어떤 결과 상품명도 모델번호를 포함하지 않음
- **2차 조회**: `미확인` 건은 모델번호 대신 `브랜드 + 제품명`으로 재조회해,
  같은 제품군의 **실제 모델 코드**가 무엇인지 후보를 수집

### 한계 (측정하지 못한 것)

- `미확인`은 **"실재하지 않는다"가 아니라 "다나와에서 확인되지 않는다"**이다.
  렌탈 전용(코웨이·SK매직·쿠쿠 정수기 등)은 다나와 미등록이 정상일 수 있다.
- 액세서리 판매글이 모델번호를 언급해 `확인`으로 잡힌 건이 일부 있다.
  호환 부품 판매자가 실재하지 않는 모델을 적을 이유는 적어 근거로 인정했지만,
  제조사 공식 페이지만큼 강한 근거는 아니다.
- **사양(소음 dB·소비전력·가격·크기)은 이번 감사 대상이 아니다.** 미검증 상태다.

## 집계

| 판정 | 건수 | 비율 |
| --- | ---: | ---: |
| 확인 | 32 | 43% |
| 부분 | 3 | 4% |
| 미확인 | 39 | 53% |
| **합계** | **74** | |

## 확인된 제품 (32)

| slug | 브랜드 | 카테고리 | 모델번호 | 근거로 잡힌 상품명 |
| --- | --- | --- | --- | --- |
| `samsung-wind-free-ar07a9170` | 삼성 | 에어컨 | `AR07A9170` | 삼성전자 무풍에어컨 와이드 AR07A9170HCS |
| `samsung-bespoke-grande-wf24a9500` | 삼성 | 세탁기 | `WF24A9500` | 삼성전자 비스포크 AI WF24A9500KV + DV19A9740CV |
| `samsung-bespoke-grande-dv17a9720` | 삼성 | 건조기 | `DV17A9720` | 삼성전자 비스포크 그랑데AI DV17A9720BV |
| `samsung-bespoke-4door-rf85` | 삼성 | 냉장고 | `RF85C90D1AP` | 삼성 정품 RF85C90D1AP 사용 냉장고 DEOD 탈취필터 |
| `samsung-bespoke-sxs-rs84` | 삼성 | 냉장고 | `RS84B5061M9` | 삼성전자(주) 삼성 냉장고렌탈 양문형 3도어 냉장고 846리터 (RS84B5061M9) 등록비 전액지원 |
| `samsung-bespoke-jetbot-ai` | 삼성 | 로봇청소기 | `VR50T95735W` | [호환] 삼성 비스포크 제트봇 청정스테이션 VR30T85514W VR50T95735W VR50T95935B  |
| `samsung-bespoke-ai-combo-wd25` | 삼성 | 세탁기 | `WD25DB8995BZ` | 삼성전자 비스포크 AI 콤보 WD25DB8995BZ |
| `samsung-the-movingstyle` | 삼성 | TV | `KU27LSFM7AXXKR` | 삼성전자 더 무빙스타일 KU27LSFM7AXXKR |
| `samsung-galaxy-buds3-pro` | 삼성 | 무선이어폰 | `SM-R630N` | 삼성전자 갤럭시 버즈3 프로 SM-R630N |
| `lg-dios-obje-4door-t873` | LG | 냉장고 | `T873MEE111` | LG전자 디오스 오브제컬렉션 T873MEE111 |
| `lg-standbyme2` | LG | TV | `27LX6TPGA` | LG전자 스탠바이미2 27LX6TPGA |
| `lg-standbyme2-max` | LG | TV | `32LX6BPGA` | LG전자 스탠바이미2 Max 32LX6BPGA |
| `lg-standbyme-go` | LG | TV | `27LX5QKNA` | LG전자 스탠바이미 Go 27LX5QKNA |
| `tcl-tac-12csd-wall` | TCL | 에어컨 | `TAC-12CSD/TPH11I` | TCL TAC-12CSD/TPH11I |
| `haier-cth06qbw-wall` | 하이얼 | 에어컨 | `CTH06QBW` | 하이얼 CTH06QBW |
| `haier-cth10qbw-wall` | 하이얼 | 에어컨 | `CTH10QBW` | 하이얼 CTH10QBW |
| `dyson-pure-cool-tp07` | 다이슨 | 선풍기 | `TP07` | 다이슨 쿨 공기청정기 TP07 |
| `dyson-hot-cool-hp09` | 다이슨 | 선풍기 | `HP09` | 다이슨 퓨어 핫앤쿨 포름알데히드 HP-09 |
| `xiaomi-mijia-dc-fan-1x` | 샤오미 | 선풍기 | `BPLDS01DM` | [해외] 선풍기 액세서리 세트 샤오미 호환 부품 미지아 스탠드형 교체용 날개 모터 커버링  1개  하단 나사 |
| `xiaomi-robot-vacuum-x20` | 샤오미 | 로봇청소기 | `B116CN` | 샤오미 옴니 1/2 / B101CN / C102CN / X20+ / X20 Plus / C102 / 옴니 1 |
| `xiaomi-smart-air-purifier-4` | 샤오미 | 공기청정기 | `AC-M16-SC` | 샤오미 미에어 스마트 4 AC-M16-SC |
| `coway-handpick-water-purifier-compact` | 코웨이 | 정수기 | `CHPI-7400N` | 코웨이 아이콘 CHPI-7400N |
| `winix-posong-dehumidifier-16l` | 위닉스 | 제습기 | `DN2H160-IWK` | 위닉스 뽀송 DN2H160-IWK |
| `skmagic-touchon-dishwasher-dwa81` | SK매직 | 식기세척기 | `DWA81` | SK매직 식기세척기 DWA-81UR 정수 필터 정품 |
| `skmagic-allin-water-purifier-wpu` | SK매직 | 정수기 | `WPU-A710C` | 필터탑스 SK매직 WPU-A710C 나노 호환필터 세트 |
| `cuckoo-dishwasher-table-cdw61` | 쿠쿠 | 식기세척기 | `CDW-A0611TW` | 쿠쿠전자 CDW-A0611TW |
| `roborock-s8-proultra` | 로보락 | 로봇청소기 | `S8 Pro Ultra` | 로보락 S8 Pro Ultra |
| `roborock-qrevo-curv` | 로보락 | 로봇청소기 | `Qrevo Curv` | 로보락 Qrevo Curv 2 Flow |
| `apple-airpods-pro3` | 애플 | 무선이어폰 | `A3063 / A3064 / A3122` | [해외] 새 제품, 미개봉 애플 에어팟 프로 3 PFHQ4LL/A A3063 A3064 A3122 |
| `sony-wf-1000xm5` | 소니 | 무선이어폰 | `WF-1000XM5` | SONY WF-1000XM5 |
| `anker-soundcore-liberty5` | 앤커 | 무선이어폰 | `A3957` | ANKER Soundcore 리버티 5 A3957 |
| `qcy-melobuds-pro` | QCY | 무선이어폰 | `HT08` | QCY MeloBuds Pro HT08 |

## 부분 일치 (3)

| slug | 모델번호 | 근접 상품명 |
| --- | --- | --- |
| `lg-puricare-water-purifier-objet` | `WD523AS` | LG 정품 WD507ASB.AKOR WU803AS.BSVGDV1 WD523ACB.AKOR WD505AMB.AKOR 정수기 중금 |
| `lg-dios-obje-sxs-s834` | `S834MWW10` | LG S834MWW1D.CKOR S834MEE10.CKOR S831SS30Q.CKOR S834S32.CKOR 냉장고 신선냉동실 |
| `tcl-tac-08csd-wall` | `TAC-08CSD/TPH11I` | TCL TAC-08CSD |

## 미확인 제품 (39)

`실제 모델 코드 후보`는 같은 브랜드·같은 제품군으로 다나와에 실재하는 상품이다.
카탈로그의 번호와 나란히 놓고 보면, 형태는 비슷하지만 실재하는 코드와 일치하지 않는다.

| slug | 브랜드 | 카테고리 | 카탈로그 모델번호 | 실제 모델 코드 후보 |
| --- | --- | --- | --- | --- |
| `samsung-bespoke-wind-free-af25a9970` | 삼성 | 에어컨 | `AF25A9970` | 삼성전자 비스포크 AI 스팀 울트라 VR90F01AAG<br>삼성전자 비스포크 DW30FB305CW0 6인용 카운터탑<br>삼성전자 비스포크 RWP54421BF7M |
| `samsung-bespoke-dehumidifier-dg16a7500` | 삼성 | 제습기 | `DG16A7500` | 삼성전자 비스포크 그랑데AI DV20CB8890BE<br>삼성전자 비스포크 그랑데AI DV17B8720BP<br>삼성전자 비스포크 그랑데AI DV19A9740CP |
| `samsung-bespoke-cube-air-ax90` | 삼성 | 공기청정기 | `AX90B7980WBD` | 삼성전자 비스포크 큐브 Air 인피니트 라인 AI AP90F08163ED<br>삼성 비스포크 큐브 무풍 큐브 펫케어 정품 극세필터 CFX-H540D A<br>좋은 품질 삼성호환 무풍큐브 BESPOKE AX90R9880WFD pnl |
| `samsung-bespoke-dishwasher-dw60` | 삼성 | 식기세척기 | `DW60A8375BB` | 삼성전자 비스포크 DW90F79P1U01 14인용 빌트인<br>삼성전자 비스포크 인피니트 라인 키친핏 DW99F79E1USWS 14인용<br>삼성전자 비스포크 DW80F73X1UEWS 14인용 빌트인 |
| `samsung-bubblewash-top-wa16` | 삼성 | 세탁기 | `WA16T6261BV` | 삼성전자 워블 WA10T5262BW<br>삼성전자 워블 WA16T6264BV<br>삼성전자 워블 WA13T5262BW |
| `samsung-grande-dryer-dv14` | 삼성 | 건조기 | `DV14B8520BV` | 삼성전자 그랑데 AI WF25DG8250BW + DV21DG8200BW<br>삼성전자 그랑데AI DV21DG8200BW<br>삼성전자 비스포크 그랑데AI DV21DG8200BV |
| `samsung-bespoke-kitchenfit-rf60` | 삼성 | 냉장고 | `RF60A91R3AP` | 삼성전자 비스포크 키친핏 새틴 RF60DB9KF1AP (화이트)<br>삼성전자 비스포크 키친핏 코타 RF60B91C3AP (색상선택형)<br>삼성전자 비스포크 키친핏 코타 RF60DB9K41AP (색상선택형) |
| `samsung-inverter-heatpump-dryer-dv10` | 삼성 | 건조기 | `DV10B6320LV` | 삼성전자 DV90T5540BV<br>삼성전자 DV90T5440KW<br>삼성전자 DV90TA040KE |
| `lg-whisen-obje-fq25sdwhs` | LG | 에어컨 | `FQ25SDWHS` | LG전자 휘센 오브제컬렉션 듀얼호스 PQ08FDWBS<br>LG전자 휘센 오브제컬렉션 DQ256MWGA<br>LG전자 휘센 오브제컬렉션 듀얼호스 PQ08FDWAS |
| `lg-whisen-wall-sq07edawhs` | LG | 에어컨 | `SQ07EDAWHS` | LG전자 휘센 SQ06FA1WDS<br>LG전자 휘센 SQ06FJ1WFS<br>LG전자 휘센 SQ06GZ1WCS |
| `lg-puricare-dehumidifier-dq16sdwhs` | LG | 제습기 | `DQ16SDWHS` | LG전자 퓨리케어 360˚ 플러스 AS285DWWA + 제습기 DQ205<br>LG전자 퓨리케어 에어로 Hit AS105GWJC + 제습기 DQ205P<br>LG전자 퓨리케어 360˚ 플러스 AS235DWSA + 제습기 DQ185 |
| `lg-trom-obje-fw25eswhs` | LG | 세탁기 | `FW25ESWHS` | LG전자 트롬 오브제컬렉션 워시타워 W2320WANQR<br>LG전자 트롬 오브제컬렉션 FX25EF<br>LG전자 트롬 오브제컬렉션 워시콤보 FH25ES |
| `lg-trom-obje-dryer-rd20wswhs` | LG | 건조기 | `RD20WSWHS` | LG전자 트롬 오브제컬렉션 워시타워 W2320WANQR<br>LG전자 트롬 오브제컬렉션 FX25EF<br>LG전자 트롬 오브제컬렉션 워시콤보 FH25ES |
| `lg-puricare-aerotower-fs061pwua` | LG | 선풍기 | `FS061PWUA` | LG전자 오브제컬렉션 퓨리케어 하이드로타워 HY705RSUABM<br>LG전자 오브제컬렉션 퓨리케어 에어로캣타워 AS065CWHA<br>LG전자 오브제컬렉션 퓨리케어 에어로타워 Hit FS065PSKA |
| `lg-puricare-360-as203nw3a` | LG | 공기청정기 | `AS203NW3A` | LG전자 오브제컬렉션 퓨리케어 AI 360˚ M7 AS356NSMA<br>LG전자 오브제컬렉션 퓨리케어 에어로퍼니처 AS065PWHA<br>LG전자 오브제컬렉션 퓨리케어 에어로부스터 AS155GWDL |
| `lg-dios-dishwasher-truesteam-dt14` | LG | 식기세척기 | `DUBJ4ESS` | LG전자 디오스 스팀 DFB22M 12인용 프리스탠딩<br>LG전자 디오스 스팀 DUB22MA 12인용 빌트인<br>LG전자 디오스 스팀 DUB22WA 12인용 빌트인 |
| `lg-trom-heatpump-dryer-rh14` | LG | 건조기 | `RH14ETN` | LG전자 트롬 오브제컬렉션 워시콤보 FH25ES<br>LG전자 트롬 오브제컬렉션 워시콤보 FH25WA<br>LG전자 트롬 RH18WTSN |
| `lg-codezero-r5-robot` | LG | 로봇청소기 | `R585GA` | LG전자 오브제컬렉션 코드제로 R5 RO585HGH<br>[호환] LG 코드제로 오브제컬렉션 R5 올인원 타워 로봇청소기 물걸레 <br>[호환] LG 코드제로 오브제컬렉션 R5 올인원 타워 로봇청소기 소모품  |
| `lg-tongdolyi-washer-tr25` | LG | 세탁기 | `TR25WK1` | LG전자 트롬 오브제컬렉션 FX25EF<br>LG전자 트롬 오브제컬렉션 워시콤보 FH25WA<br>LG전자 트롬 오브제컬렉션 워시콤보 FC2521SX6C |
| `lg-trom-mini-dryer-3kg` | LG | 건조기 | `RH3W` | LG전자 트롬 오브제컬렉션 워시콤보 FH25ES<br>LG전자 트롬 오브제컬렉션 워시콤보 FH25WA<br>LG전자 트롬 오브제컬렉션 워시콤보 FC2521SX6C |
| `lg-dios-dishwasher-steam-14` | LG | 식기세척기 | `DUE14GW` | LG전자 오브제컬렉션 DUE6BGE 14인용 빌트인<br>LG전자 오브제컬렉션 DUE6BGL1E 14인용 빌트인<br>LG전자 오브제컬렉션 DEE6BGE 14인용 빌트인 |
| `lg-whisen-dehumidifier-20l` | LG | 제습기 | `DQ20GPWHS` | LG전자 휘센 DQ205PSVA<br>LG전자 휘센 DQ205PBBC<br>LG전자 휘센 DQ202PSUA |
| `carrier-cpae-a100fwea` | 캐리어 | 에어컨 | `CPAE-A100FWEA` | LG전자 [중고]캐리어 중고 스탠드에어컨 서울 경기 인천 설치별도 투인원<br>캐리어 에어로 18단 투인원(2in1) 에어컨 16평+6평 /전국무료배송 |
| `carrier-cpam-a200pda` | 캐리어 | 에어컨 | `CPAM-A200PDA` | 캐리어 모드비 MFNO122WKM1<br>캐리어 에어로 18단 ESQD231XAWWSD<br>캐리어 오퍼스 EASB-0161RHAMD |
| `tcl-tac-07cwa-window` | TCL | 에어컨 | `TAC-07CWA/TPH21I` | TCL TAC-07CWA/DBP<br>TCL 듀얼 인버터 창문형 에어컨 연장키트 VACIB98 |
| `haier-mini-fridge-155` | 하이얼 | 냉장고 | `HRB-155MDW` | 하이얼 HSC132MDB<br>하이얼 HRT78MDW<br>하이얼 HRT78MDB |
| `haier-mini-washer-wmd3` | 하이얼 | 세탁기 | `HWM30-22` | 중국산 [해외] Haier 벽걸이세탁기 3kg 완전자동 드럼형 의류 속옷<br>미니 통돌이세탁기 3kg 12L 원룸 하이센스 가열 수 운동화 드럼 미니<br>미니 통돌이세탁기 3kg 12L 원룸 하이센스 가열 수 운동화 드럼 미니 |
| `shinil-bldc-stand-sif14bldc` | 신일 | 선풍기 | `SIF-14BLDC` | 신일전자 SIF-H14SRW<br>신일전자 SIF-EF12CJ<br>신일전자 더톤 SIF-TH14TIV |
| `shinil-cordless-fan-sif10` | 신일 | 선풍기 | `SIF-10CF` | 신일전자 SIF-H32CIV<br>신일전자 SIF-R100TS<br>신일전자 SIF-PD10DIF |
| `xiaomi-robot-vacuum-x10` | 샤오미 | 로봇청소기 | `BHR6068EU (EU/글로벌)` | 샤오미 X10 Plus<br>샤오미 미지아 B101CN<br>샤오미 로봇 청소기 S10 S20, X10, X10, X20, 플러스 B |
| `coway-noble-ap-3023a` | 코웨이 | 공기청정기 | `AP-3023A` | 코웨이 노블 AP-2021A<br>코웨이 노블 AP-1521B<br>코웨이 노블 2 AP-2023K |
| `coway-inverter-dehumidifier-10l` | 코웨이 | 제습기 | `AD-1018B` | 코웨이 AD-2325C<br>코웨이 노블 AD-1221E<br>코웨이 노블 제습공기청정기 APD-1025E |
| `coway-noble-water-purifier-chp` | 코웨이 | 정수기 | `CHP-7311N` | 코웨이 노블 RO CHP-8310L<br>코웨이 노블 빌트인 CHP-3140N<br>코웨이 노블 빌트인 CP-3140N |
| `coway-duo-air-purifier` | 코웨이 | 공기청정기 | `AP-2023C` | 코웨이 콰트로 파워 AP-3018B<br>코웨이 듀얼파워 AP-1818C<br>마중물 국내생산 웅진 코웨이 공기청정기 필터 AP-1717A 1515D  |
| `coway-inverter-dehumidifier-16l` | 코웨이 | 제습기 | `AD-1623A` | 코웨이 AD-2325C<br>코웨이 노블 AD-1221E<br>코웨이 노블 제습공기청정기 APD-1025E |
| `winix-tower-xq-azbe630` | 위닉스 | 공기청정기 | `AZBE630-IWK` | 위닉스 타워 XQ 전용 CAF-E0S4 필터세트<br>위닉스 타워 XQ ATXH763-IWK<br>위닉스 타워 XQ500 전용 CAF-E0H1 집진필터 |
| `skmagic-super-ice-water-purifier` | SK매직 | 정수기 | `WPU-I9200C` | SK매직(주)(SKmagic(JU)) [렌탈] 슈퍼미니정수기 S케어 정수<br>필터스텝 SK매직 WPU-A200C 슈퍼직수냉온 정수기필터 4인치 세디먼<br>SK매직 슈퍼 미니 정수전용 정수기 |
| `cuckoo-dishwasher-builtin-12` | 쿠쿠 | 식기세척기 | `CDW-A1200FW` | 쿠쿠전자 CDW-A1210UBS<br>쿠쿠전자 스팀샷 CDW-BS1210UDG<br>쿠쿠 빌트인 스팀샷 식기세척기 12인용 컵 수저통 스팀 열풍건조  가정용 |
| `cuckoo-inspure-ice-water-purifier` | 쿠쿠 | 정수기 | `CP-ISN0210L` | 쿠쿠 [렌탈]쿠쿠홈시스 쿠쿠 정수기 공기청정기 비데 기획전 얼음 냉정 인 |

## 눈에 띄는 사례

| 카탈로그 | 실재하는 것 | 차이 |
| --- | --- | --- |
| 삼성 워블 통돌이 `WA16T6261BV` | `WA16T6264BV`, `WA16T6264BY` | 숫자 한 자리 |
| 신일 BLDC 선풍기 `SIF-14BLDC` | `SIF-BLDC14WH` | 토큰 순서가 뒤집혀 있음 |
| 코웨이 노블 공기청정기 `AP-3023A` | `AP-3021D`, `AP-2023K`, `AP-3024H` | 실재 목록에 없음 |
| 코웨이 노블 정수기 `CHP-7311N` | `CHP-8210N`, `CHP-8310L`, `CHP-3140N` | 실재 목록에 없음 |
| LG 휘센 제습기 20L `DQ20GPWHS` | `DQ205PSVA`, `DQ205PBBC` | 명명 규칙 자체가 다름 |
| LG 디오스 식기세척기 14인용 `DUE14GW` | `DUE6BGE`, `DUE6BGL1E` | 명명 규칙 자체가 다름 |
| 위닉스 타워 XQ `AZBE630-IWK` | `ATXH763-IWK` | 실재 목록에 없음 |
| 삼성 비스포크 식기세척기 `DW60A8375BB` **14인용** | `DW60A8375FG` 계열은 **12인용** | 코드·용량 둘 다 불일치 |
| LG 퓨리케어 제습기 (제품명) | LG 제습기는 **휘센** 라인 | 저장소의 브랜드 프로필과도 모순 |

## 재현 방법

```
node scripts/verify-model-numbers.mjs        # 1차: 모델번호 정확 일치 → .audit/model-verify.json
node scripts/verify-model-numbers-pass2.mjs  # 2차: 브랜드+제품명으로 실제 코드 후보 수집
```

두 스크립트는 `src/lib/data/appliances/*.ts`를 직접 읽어 카탈로그를 재구성하므로
별도 준비 없이 그대로 돌아간다. 결과는 `.audit/`(gitignore)에 남는다.
다나와에 초당 1~2회만 요청하도록 간격을 두었고, 74개 조회에 약 1분 걸린다.

