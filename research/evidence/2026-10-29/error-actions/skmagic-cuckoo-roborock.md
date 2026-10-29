# SK매직·쿠쿠·로보락 에러코드 행동 카드 원문 조사 — 2026-10-29

짝 데이터: [skmagic-cuckoo-roborock.json](./skmagic-cuckoo-roborock.json). 조사 범위와 원칙은 아래와 같다.

- **분석 단위**: 허브에 보이는 코드 1행(빌드 `out/error-codes/{SKMagic,Cuckoo,Roborock}.html`의 `<h3 class="font-mono font-bold text-lg">`)과 추가 요청 3건이다. 같은 코드라도 모델 범위가 다르면 행을 나눴다(로보락 Error 4 = S8 Pro Ultra·Qrevo Curv 1행, S7 1행).
- **모집단**: SK매직 10, 쿠쿠 7, 로보락 9, 합계 26행이다. 이미 카드가 있는 4행(쿠쿠 E4, SK매직 dr·F9, 로보락 S7 Error 2)은 다시 조사하지 않고 JSON에서도 뺐다. 조사 대상은 22행에 추가 요청 3건을 더한 25건이다. 쿠쿠 E2는 허브에 이미 있어 추가 요청 건과 겹친다. 그래서 JSON은 24행이다.
- **카드 판정 기준**: 공식 원문이 그 모델명을 명시하고 사용자 조치를 적은 경우에만 card로 했다. steps는 원문 문장만 옮겼다. 누수·온도센서·PBA·기능 이상은 contact로 분류했다.
- **데이터 시점**: 2026-10-29 KST에 내려받았다. 파일은 `scratchpad/err-a/`에 있으며 저장소에는 넣지 않았다.

## 결과 요약

| 허브 | 조사 | card | no-card | 비고 |
| --- | --- | --- | --- | --- |
| SK매직 식기세척기 | 8 (AU·E2·E3·E4·F1·F3·F5·ts/to) | 7 | 1 (E4) | dr·F9 기존 카드 제외 |
| SK매직 정수기 | 1 (F01 = 표시 `F:01`) | 1 | 0 | 사이트에 없음. WPU-IAC425·506·606 한정 |
| 쿠쿠 식기세척기 | 6 (dr·E1·E2·E3·E6/E7·ED) | 6 | 0 | E4 기존 카드 제외. E2 적용 모델 3계열 추가 확인 |
| 로보락 로봇청소기 | 8 (Error 1·4·5·7·9·10·13·18) + S7 Error 4 | 9 | 0 | Error 2 기존 카드 제외 |
| **합계** | **24행** | **23** | **1** | |

## 못 한 것·찾지 못한 것

- **SK매직 DWA-81R0D의 E4 뜻: 원문 없음.** 설명서 자가진단표에 E4가 없다. SK인텔릭스서비스가 2026-10-28에 E4 FAQ를 모델별로 나눴는데, 새 FAQ들의 연결 제품코드에도 DWA81*이 없다(아래 E4 절). 그래서 no-card로 판정했다.
- **SK매직 F:01의 설명서 근거: 없음.** WPU-IAC425·506·606 설명서 세 권의 텍스트에서 `F:01`은 0건이다. 대조군으로 `oPn`은 세 권 모두, `FLo`·`FLO`는 506·606에서 잡혔다. 425의 인쇄 45쪽 「제품 누수 발생」 쪽은 렌더해 직접 봤고 F:01 그림은 없었다. 506·606의 같은 쪽은 렌더하지 않고 텍스트로만 대조했다. 따라서 코드의 뜻과 조치는 FAQ 표 이미지에서만 확인한 것이다. 카드 단계는 설명서 「제품 누수 발생」 행과 내용이 같다.
- **쿠쿠 CDW-A0310TW: 코드표 불명.** 이미지 PDF를 OCR한 결과 E 코드가 0건이었다. 해당 쪽은 육안으로 보지 않아 「코드 없음」이 아니라 「불명」으로 남긴다.
- **로보락 S8 Pro Ultra 설명서(support.roborock.com 문서 페이지)는 403으로 받지 못했다.** 이 모델의 근거는 모델별 문제 해결 페이지(미국판)뿐이다. Qrevo Curv 설명서는 받았고, 번호별 오류표가 없다는 것을 다시 확인했다.
- **로보락 Error 13: 3단계 뒤 어떻게 할지는 원문에 없다.** 원문 안내는 「로봇을 다시 올려 표시등이 꺼지는지 확인」에서 끝난다. 카드의 마지막 단계도 거기까지만 썼다. 서비스 연락을 넣을지는 편집 판단으로 남긴다.
- 로보락 Error 8은 기존 판단대로 조사 범위에서 뺐다.
- 쿠쿠 「고장증상」 페이지와 SK·쿠쿠 동영상 가이드는 보지 않았다.

## SK매직 식기세척기 (DWA-81 터치온 8개 모델)

**원문**: [DWA-81R0D 공용 설명서](https://m.manual.skmagic.com/2019/model/DWA/DWA81R0D00SL/Manual.htm)(HTML). 제품규격에 DWA-81R0D·R1D·U0D·U1D·R5B·R6B·U5B·U6B가 나온다. 「자가 진단하기」의 코드 표시는 7세그 이미지라서 `img_08_01_01~04.png` 네 장을 내려받아 직접 봤다. 각각 `E2`, `E3`, `F1~F9`, `tS, tO`다. 본문에서 `E4`·`AU`·`F3`를 텍스트로 검색하면 0건이다. 대조군 `F1`·`F5`는 잡혔다.

| 코드 | 판정 | 원문 위치와 짧은 인용 |
| --- | --- | --- |
| AU | card(check) | [FAQ210104033100](https://www.skintellixservice.com/web/easy/easyMain.do?tabIndex=0&subIndex=0&selectedPrdCd=04&selectedSubPrdCd=DWA&inputFaqId=FAQ210104033100): 연결 제품코드 28개에 DWA-81 8개 모델이 모두 들어 있다(선별 연결). 인용: 「전원 콘센트 분리 후 10초정도 이후 재연결」, 「[AU]문구가 뜨고 자동 문열림이 안되는 경우에는 서비스 접수」. 수동 레버 조작은 설명서 TOUCH ON 절: 「레버를 손가락으로 우측에서 좌측으로 밀면 … 문이 열립니다」 |
| E2 | card(check) | 자가 진단하기: 「급수 이상입니다」. 중간밸브·단수·수압·급수호스 확인 |
| E3 | card(check) | 자가 진단하기: 「배수 이상입니다」. 배수경로·배수호스/배수구 막힘·꺾임 확인 |
| E4 | **no-card** | 아래 절 |
| F1 | card(contact) | F1~F9: 「기능 이상입니다」, 「전원을 끄고 전원 플러그를 콘센트에서 빼주세요」, 「중간밸브를 잠근 후 … 문의하세요」. F1 원인 문장(필터 미청소·중간밸브 잠김)은 observationHint로만 옮겼다 |
| F3 | card(contact) | F3은 F1~F9 기능 이상 범위에 들고, 설명서에 따로 적힌 원인은 없다. 거품이라는 뜻은 일괄 FAQ210104033078(연결 250개)에만 있다 |
| F5 | card(check) | F1~F9 절: 「전용세제를 사용하지 않을 경우에 거품에 의한 F5 … 거품 제거 후 사용하세요」. 세제 투입하기 절: 「반드시 식기 세척기 전용세제」 |
| ts / to | card(contact) | 「온도 감지 이상입니다」. 처리는 전원·플러그·중간밸브 차단 뒤 문의 |

### E4: 공식 FAQ가 하루 전(2026-10-28)에 바뀌었다

FAQ JSON(`/web/search/getFaqList.do`, `prd_div_cd='DWA'`)을 다시 조회했다. 결과는 다음과 같다.

| FAQ ID | 제목·갱신 | 연결 제품코드 | DWA81* 포함 |
| --- | --- | --- | --- |
| FAQ210104033077 | 「[E4] 표시가 떠요 (DWA2900/2910/2920/2930)」, upt 2026-10-28 11:41 | 4 (DWA2900·2910·2920·2930) | 없음 |
| FAQ261028039824 | 「[E4] 표시가 떠요 (DWA16 클림 계열, DWA12인용)」, 2026-10-28 신설 | 93 | **없음** |
| FAQ261028039822 | 「[E4] 표시가 떠요 (DWA19R)」, 2026-10-28 신설 | 10 (DWA19R*·DWA19C*) | 없음 |
| FAQ261028039815 | 「[E1] [E4] 표시가 떠요 (DWA2820, DWA2810, DWA2800)」, 2026-10-28 신설 | 4 | 없음 |

이전 기록(2026-10-08)에서 FAQ210104033077은 245개 제품에 연결돼 있었고 본문에 네 계열을 함께 실었다. 지금은 계열별 FAQ로 갈라졌다. 12인용 FAQ 본문에는 「DWA12인용」이라는 말이 있지만, 연결된 93개 제품코드 중 DWA81*은 하나도 없다. 그래서 DWA-81R0D의 E4를 공식 원문으로 확인할 수 없다. 갱신된 FAQ210104033077 본문에는 「세척수 및 헹굼수 가열이 안될 경우 발생됩니다」와 「1~2일 지나고 다시 연결」도 새로 들어갔다.

## SK매직 정수기 F01 (사이트에 없는 코드)

- [FAQ260907039642](https://www.skintellixservice.com/web/easy/easyMain.do?tabIndex=0&subIndex=0&selectedPrdCd=01&selectedSubPrdCd=WPU&inputFaqId=FAQ260907039642) 「정수기 에러 종류와 조치 방법 (FLS, oPn, FLO, F01, F11, F41)」. 본문: 「WPUIAC425, WPUIAC506, WPUIAC606 모델에서만 표시된 에러가 발생합니다.」 연결 제품코드는 391개다(일괄 연결). 모델 범위는 본문 문장을 따랐다.
- 표 이미지(`static.service.skmagic.com/editor/faq/ckimg/89adc249….png`)의 F:01 행: 「누수 에러 | 1. 급수 밸브 잠그고 전원 코드 분리 2. 위 조치 후 SK매직 고객상담센터(1600-1661) 문의」. 같은 표의 F:11은 냉각수 탱크 물 없음, F:41은 온수 기능 에러(「출수된 물 음용 금지」)다.
- 설명서는 SK인텔릭스서비스 「제품 사용설명서」 검색 API로 찾았다. 세 권 모두 「제품 누수 발생」 행에 「중간 밸브 혹은 제품 뒷면의 볼 밸브(파란색 밸브)를 잠그고 SK매직 고객상담센터로 문의」가 있다. 쪽수는 WPU-IAC425 rev02 인쇄 45쪽, WPU-IAC506 rev00 인쇄 44쪽, WPU-IAC606 rev00 인쇄 42쪽이다.
- 사이트의 SK매직 정수기 WPU-A710C에는 이 코드를 적용하지 않는다. FAQ가 명시한 세 모델에 들지 않는다.

## 쿠쿠 식기세척기

**CDW-A0611TW·TS**: [공용 설명서](https://www.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/200424%3Dz0383-0082a0%20rev.1_cdw-a0611t.pdf)는 이미지 PDF다. 인쇄 25쪽을 렌더해 직접 봤다. SHA-256은 이전 기록 `a2590ff4…`와 같다. 코드별 조치는 다음과 같다.

- E1 급수점검: 중간밸브·단수·수압·급수호스 확인, 계속되면 A/S
- E3 히터점검: 「전원을 껐다 켜서 다시 시작해 보십시오」
- E6~E7·ED: 「전원을 끄고 전원 플러그를 콘센트에서 빼 주십시오」, 「중간밸브를 잠근 후 당사 A/S센터에 문의」
- dr: 「문이 꼭 잠겨 있는지」 확인. 「정상적으로 닫혀있는 상태에서 dr 표시가 해제되지 않을 경우」 A/S

사이트 문구(`src/lib/data/appliances/cuckoo.ts:44-87`)는 원문과 일치한다.

**E2 (네이버 검색어 「쿠쿠 식기세척기 E2」)**: 허브에는 이미 CDW-CS0620T 계열 카드가 있다(`standalone.ts:607-617`). 쿠쿠 설명서 검색 API(`/rest/customer/productManualSearch`, 검색어 `CDW`)가 돌려준 16건을 모두 받았다. 내용이 같은 파일을 빼면 11종이다. 전부 이미지 PDF라 macOS Vision으로 OCR했고, E2가 나온 쪽은 렌더해 직접 봤다.

| 모델(설명서 표기) | E2 | 원문 위치 |
| --- | --- | --- |
| CDW-CS0620T Series | 히터 저온 점검 → 「전원을 껏다 켜서 다시 시작」, 지속 시 A/S (E2·E3 병합 칸) | 사이트 출처 [file_42564d7e](https://cdn.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/file_42564d7e-2cf0-4afa-a733-16ec86be146a.pdf) 인쇄 26쪽. 현재 검색 목록의 CDW-CS0620TWE 파일 [file_4178a676](https://cdn.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/file_4178a676-43bb-4bc1-af5a-6f97d8485074.pdf) 인쇄 26쪽도 같은 표 |
| **CDW-CS0610T Series** (목록: CS0610TW/TGP/TGW) | 히터 저온 점검, 같은 조치 | [file_81c59aac](https://cdn.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/file_81c59aac-9db5-4986-99d1-bb7727c8bacd.pdf) 인쇄 26쪽 |
| **CDW-BD0610TB·TG, BD0620TB·TW** | 히터 저온 점검, 같은 조치 | [file_510811c7](https://cdn.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/file_510811c7-6e60-4e0a-a8a8-a02cc66427cd.pdf) 인쇄 25쪽 |
| **CDW-BS0310T Series** (목록: BS0310TWE) | 「E2, E3 히터 점검」 한 행, 「전원을 껐다 켜서 다시 시작해보십시오」 | [file_1485a9e8](https://cdn.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/file_1485a9e8-af7f-4595-9393-99e30f350a22.pdf) 인쇄 26쪽 |
| CDW-A0611T, AD0611T, A1210UBS, BS1210UDG, BS1410B, BS14(BSST·BSGL·BS1420), D0620TWE/DGL06TGIE | 코드표에 E2 없음. 대조군 E1·E4는 OCR에서 잡혔다. D0620/DGL06은 렌더로 확인했고, 이 모델은 E1 한 행이 「급수 점검·배수 점검」을 겸한다 | 각 설명서 「에러코드 발생시 대처방법」 |
| CDW-A0310TW | 불명(OCR에서 코드표를 찾지 못함, 육안 미확인) | — |

새로 찾은 범위는 셋이다. **CS0610T·BD06 계열은 CS0620T와 E2의 뜻·조치가 같고, BS0310T는 E2를 E3와 묶어 「히터 점검」으로 적는다.** 같은 쪽 하단 경고 상자에는 모두 「누수가 발생하면 서비스를 요청하기 전에 중간밸브를 차단하십시오」가 있다.

## 로보락

- 모델별 공식 문제 해결 페이지(미국판): [S8 Pro Ultra](https://help.roborock.com/us/product/s8-pro-ultra-message?category=troubleshooting), [Qrevo Curv](https://help.roborock.com/us/product/roborock-qrevo-curv-message?category=troubleshooting). 두 페이지의 Error 4·5·7·1·8·9·10·13·18 블록을 텍스트 diff로 비교했고 같았다. S8 페이지에는 여기에 더해 구판 error 13(도크 전원 약 2분 분리 등), 별도 error 18(먼지통 비우기·필터 세척 건조·새 필터·펌웨어), Error 42가 있다.
- [Qrevo Curv 설명서](https://support.roborock.com/hc/en-us/article_attachments/46138473099289)에는 번호별 오류표가 없다. 대조군으로 「Error」 절(표시등)과 「D8 Robot Sensors … Use a soft, dry cloth … Cliff Sensors」는 잡혔다.
- **추락방지 센서 오류**: S8 Pro Ultra·Qrevo Curv는 Error 4로 허브에 이미 있다. S7은 사이트에 Error 2만 있다. [S7 공식 설명서](https://support.roborock.com/hc/en-us/article_attachments/900008254623) 인쇄 38쪽에 「Error 4: Cliff sensor error. Clean cliff sensors, move robot away from drops and restart.」가 있다. 인쇄 27쪽 정기 관리 표에는 「Cliff Sensors | Monthly | Wipe clean with a soft dry cloth.」, 인쇄 39쪽에는 「If the problem persists … please email our after-sales service team」이 있다. 이 근거로 **S7 Error 4를 새 카드로 넣었다.**

## 사이트 문구 불일치 (고치지 않음)

| 파일:줄 | 현재 | 원문 | 정도 |
| --- | --- | --- | --- |
| `src/lib/data/appliances/skmagic.ts:69-77` | DWA-81R0D E4 「고온수 급수 감지」, 허브 「이 코드가 표시되는 제품: … DWA81」 | 설명서에 E4 없음. 2026-10-28 이후 12인용 E4 FAQ 연결 93개에 DWA81* 없음 | **높음** |
| `src/app/error-codes/SKMagic/dishwasher/e4/page.tsx:16-17` | 출처 FAQ210104033077(전 계열) | 현재 DWA29x0 전용(연결 4개) | 높음 |
| `…/e4/page.tsx:33,114-127` | 「DWA-81R0D 등 12인용·DWA16 클림」 | FAQ261028039824 연결에 DWA81* 없음 | 높음 |
| `…/e4/page.tsx:34,130-141` | DWA2910·2920·2930 = 거품 과다·누수 | 갱신 FAQ에 「세척수 및 헹굼수 가열이 안될 경우」와 「1~2일 뒤 재연결」 추가 | 중간 |
| `…/e4/page.tsx:36,157-169` | 「DWA19·DWA90 계열」 | 새 FAQ는 「(DWA19R)」, 연결은 DWA19R*·DWA19C* 10개, DWA90 없음 | 중간 |
| `src/lib/data/editorial/error-code-editorial.ts:130` | 「E4·F3 FAQ는 식기세척기 대부분에 함께 연결 … E4는 FAQ 본문의 12인용 구분」 | E4 FAQ는 모델별로 분리됨 | 중간 |
| `src/lib/data/appliances/skmagic.ts:97-104` | F3 = 「거품 과다 (F5와 같은 계열)」, 지속 시 30초 재연결만 안내 | 설명서는 F3을 기능 이상으로 분류하고 전원·플러그·**중간밸브** 차단 후 문의를 지시 | 중간 |
| `src/lib/data/appliances/skmagic.ts:118` | F5 지속 시 상담센터 문의 | 기능 이상 조치에 플러그 분리·중간밸브 잠금 포함 | 낮음 |
| `src/lib/data/appliances/roborock.ts:69`, `:240` | Error 4 「청소 금지 구역으로 지정하는 방법」 | 두 모델의 error 4 항목에 없음 | 낮음 |

참고(불일치 아님): SK매직 E2의 결빙 해동·30초 재연결과 E3의 거름망 청소는 일괄 FAQ(FAQ210104033072·033074, 연결 250·253개)에서 온 문구로, 설명서와 충돌하지 않는다. 쿠쿠 E2 카드의 출처 파일(file_42564d7e)은 현재 쿠쿠 설명서 검색 목록에 없지만 링크는 200으로 열리고 내용도 목록의 파일(file_4178a676)과 같다.

## 내려받은 파일 SHA-256

경로: `scratchpad/err-a/`. 2026-10-29에 받았다. 그 폴더 안에서는 코드를 실행하지 않았다.

| 파일 | 출처 | SHA-256 |
| --- | --- | --- |
| skmagic-dwa81r0d-manual.htm | m.manual.skmagic.com …/DWA81R0D00SL/Manual.htm | `8cd2bf4389c720d924cabcbfce300f7ef9688f5e84f1a7c49b9084b66951768a` |
| dwa81img/img_08_01_01.png (E2) | 같은 설명서 images/ | `7ecafdb0be4541ac80f5811c26381dca236fa712fc489e07b5275907a62cc85e` |
| dwa81img/img_08_01_02.png (E3) | 〃 | `d742e360ecc03029e407b1755d79905f3fb92e5a59976ad8e5693fb6afa719ed` |
| dwa81img/img_08_01_03.png (F1~F9) | 〃 | `70e16a6fcb214139ada917754eb09b8dca4df0f2ed4cf6f33c130b5b3b970798` |
| dwa81img/img_08_01_04.png (tS, tO) | 〃 | `14cd3c82e24f891f1cea5ac1190bb5952272551b553fa7e1cc592312f7e1884d` |
| sk-faq-dwa.json (식기세척기 FAQ 150건) | skintellixservice.com getFaqList.do | `7a4c5fbb8fd55905f9bc0fb173c9fa38d88af5c8001030a15e7e5ff7a781a551` |
| sk-faq-FAQ210104033100.json (AU) | 〃 | `1260a873da2e573611b758994c5d522a9714f14493d3a0b0fe2ad28e981f673c` |
| sk-faq-FAQ210104033077.json (E4 DWA29x0) | 〃 | `cdfdec5269ee203e7ce5672974b221564ae1b2c26acde068484737bd15aa21b8` |
| sk-faq-FAQ261028039824.json (E4 12인용·클림) | 〃 | `d2b62027140bd2d4e87bdf14cf3c47f2c107d91be603f5cd8caaa291d7d6d2a0` |
| sk-faq-FAQ261028039822.json (E4 DWA19R) | 〃 | `688d92abc0c6c65b316270c485fa4310f1981bdc90aa7929759a53e98a397cf6` |
| sk-faq-FAQ261028039815.json (E1·E4 DWA28x0) | 〃 | `9b8e9ffa0570ac7819be47839f89ca3ac958d3c1ebacd5bffe121a056a64c95a` |
| sk-faq-FAQ210104033072.json (E2) | 〃 | `6efb7e9e4d6222355229af94813517633fde8135bbdb82a86afa6016270fe814` |
| sk-faq-FAQ210104033074.json (E3) | 〃 | `721a7d42081c40f257f23d02a4c4615acd118f8bb725e0f75cfdcb8f131906d8` |
| sk-faq-FAQ210104033078.json (F3·F5) | 〃 | `2f354129dc15ff947d44a94a2e01b48ee5908731879daac2ecb0bec808d62919` |
| sk-faq-FAQ210104033083.json (F1·F2·F4·F6~F9) | 〃 | `ab921283c62a1b953a4a87c1f366b4bf91cacd27269c0e2bf1d9eef416f93dc5` |
| sk-faq-FAQ210104033089.json (ts·to) | 〃 | `1fdc66a5e7a9e6cc59f39add43f4135b24a5e96db98ed695855c95c605f7edd5` |
| sk-faq-wpu.json (정수기 FAQ 260건) | 〃 | `28c457d6599f8ff800020e5956106a8eb9eb017b8222fcad917a81363fcad681` |
| sk-faq-FAQ260907039642.json (F01 등) | 〃 | `3b8b06798bd023f8862c0a5f69cf98813298d972e8a834f8fc1c30c57ba6475a` |
| sk-wpu-f01-table.png (FAQ 표 이미지) | static.service.skmagic.com | `f2fae7646e1551e3cf5f94b39a5d333aff92a55b0c0ee5b6c90991151092f6a9` |
| sk-wpuiac425.pdf (rev02) | fileDownloadS3.do | `97c027ce75bec40386307c867dd3983513cb70fac687f2d2db6f1167ec9caec8` |
| sk-wpuiac506.pdf (rev00) | 〃 | `2ae0adead5fa1aa282d1e9c4944dd5389ae79ef8b20f73bcb93374e02963bea9` |
| sk-wpuiac606.pdf (rev00) | 〃 | `a062c0dd5c2ed17bc3734215c3106dcc82ab69346cf546bddd9edd328ea49572` |
| cuckoo-cdw-a0611t.pdf | cuckoo.co.kr (A0611TW·TS) | `a2590ff4393d07341c286dd792a20ad02278565d716a81cd214683c7fd66e2c1` |
| cuckoo-cdw-cs0620t.pdf | cdn file_42564d7e | `61c9b564eb38a806071de7d03fb63203908ecf61a6bc3cf5e08cda5657f09167` |
| cuckoo-dw/m1867.pdf (CS0620TWE) | cdn file_4178a676 | `c0b97649842adbf08b7def1f405c5db252ee5cf715a10bdb0f5904022cb18b81` |
| cuckoo-dw/m1717.pdf (CS0610T) | cdn file_81c59aac | `823121045c0bb4e133cc7b18396403ce6a470f707f19c1193d3c1dc13597ab1a` |
| cuckoo-dw/m1652.pdf (BD0610T·BD0620T) | cdn file_510811c7 | `b16a97a953a4d66bf3bf50ed59b6c7dc9b73f23ab8930d29d1439e80efda062c` |
| cuckoo-dw/m1869.pdf (BS0310TWE) | cdn file_1485a9e8 | `5bc5fbaa88404d45c4c3120822e2bb3c6e4daabcbe05c9b4d550ddd0e961c905` |
| cuckoo-dw/m1909.pdf (D0620TWE/DGL06TGIE) | cdn file_6689c330 | `88c045d40b66456039d5ffb4095b7327fefb613a5bf85bfaea9eb88f7b2c74ca` |
| cuckoo-dw/m1947.pdf (AD0611T, m1651과 동일) | cdn file_f164f731 | `26d5f1650dcff58e32a6b70ea1cdd83aee24e0b6957da5adf570143589a7f96a` |
| cuckoo-dw/m1768.pdf (BS1210UDG) | cdn file_c5d81cd2 | `0b3bc6dd1c16af0dd1bb2c8afb8017d01bd2913d21fdd07eb38322b4cc72af80` |
| cuckoo-dw/m1790.pdf (BS1410B) | cdn file_38148a9b | `ebf6ca1942a0b9bc22cad2c8969416ca6cee7a9afe67cdae4ca62efc12ecbe90` |
| cuckoo-dw/m1882.pdf (BS14, m1880·1881과 동일) | cdn file_0a7604e6 | `a262304c05fe33731293cc22a8a83e4bb35919d027535995636ec499802a7201` |
| cuckoo-dw/m415.pdf (A1210UBS) | cdn cdw-a12_… | `5355d4929b1ecd8bc160d54ba64993525f0497c510f9cd43834ca95a52ed5924` |
| cuckoo-dw/m412.pdf (A0310TW) | cdn z0383-0081a0 … | `a04912516429ce8954508219a91e15f9d0e539cbda3624ddd5e7105ee4286085` |
| roborock-s8pu-help.html | help.roborock.com/us/product/s8-pro-ultra-message | `6f134027dea6ebd6ff2f16732488c585bc2e3da392571b955825b32e258f2a6d` |
| roborock-curv-help.html | help.roborock.com/us/product/roborock-qrevo-curv-message | `a9fa06d31941b497522a0f512da1b10d923e5690e848ed19122baff19b900d54` |
| roborock-s7-manual.pdf | support.roborock.com article_attachments/900008254623 | `d3eece49b014035dcfe75c4545e36ff5921e5e010dbe34c9283d893b5e13ac3b` |
| roborock-curv-manual.pdf | support.roborock.com article_attachments/46138473099289 | `00a870131761d4909b275bf07a9d6d3069c11ba9730c8f41d4c441be8ebedf91` |

## 재현 방법

- **SK FAQ**: `getFaqList.do`를 GET으로 호출한다. 헤더에 `AJAX: true`를 넣는다. `where`와 `custom`은 사이트 스크립트처럼 encodeURIComponent를 한 번 거친 뒤 쿼리스트링으로 다시 인코딩한다(이중 인코딩). 예: `where=prd_div_cd='DWA' and faq_id='FAQ…' order by $relevance desc`. 이중 인코딩을 하지 않으면 500이 난다.
- **SK 설명서**: `getUserManualList.do`에서 `atch_nm`·`atch_org_nm`을 얻는다. 그 값으로 `/common/fileDownloadS3.do?atchPath=cnts&atchNm=…&atchOrgNm=…&atchExtNm=pdf`를 호출한다.
- **쿠쿠 설명서 목록**: `POST https://www.cuckoo.co.kr/rest/customer/productManualSearch`에 `{"page":1,"pageCount":0,"productCd":"CDW"}`를 보낸다. 16건이 나오고 page 3은 비어 있다. 파일은 `https://cdn.cuckoo.co.kr` 뒤에 `filePath`를 붙여 받는다.
- **텍스트 추출**: PDF는 `pdftotext -layout`으로 뽑는다. 이미지 PDF는 `pdftoppm -r 90` 렌더 후 Swift `VNRecognizeTextRequest`(ko-KR)로 OCR한다. tesseract에는 kor 데이터가 없어 쓰지 않았다. 코드표 쪽은 렌더 이미지를 직접 봤다.
