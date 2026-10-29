# 2026-10-27 이전 행동 카드 4개 근거 연결 — 2026-10-29

짝 데이터: [`legacy-cards.json`](./legacy-cards.json). 테스트(`src/lib/__tests__/error-action-coverage.test.ts`)가 이 JSON을 다른 세 JSON과 같은 방식으로 카드와 대조한다.

## 측정 사양

- **분석 단위:** 허브 행동 카드 1장(`HUB_ACTION_SETS`의 `guides` 항목).
- **모집단:** 2026-10-29 기준 카드 70장. 그중 `evidence`(근거 파일)가 없던 4장 — SK매직 `dr`(DWA19 세 모델)·`F9`(DWA-81 8개 모델), 쿠쿠 `E4`(CDW-A0611TW·TS), 로보락 S7 `Error 2`. 나머지 66장은 같은 폴더의 세 JSON(`skmagic-cuckoo-roborock`·`samsung-lg-haier`·`boilers`)이 근거다.
- **판정:** 카드의 모델·설명서 주소·라벨·대조일·서비스 주소·조치 유형을 JSON에 그대로 옮기고(테스트가 일치를 검사), 각 카드의 조치가 원문 문장에 있는지 2026-10-29에 원문을 다시 열어 확인했다. 카드 문장은 고치지 않았다.
- **데이터 시점:** 2026-10-29 15:59~16:04 KST에 curl(브라우저 UA)로 받았다. 받은 파일은 세션 작업 폴더(`scratchpad/consistency/`)에 두고 저장소에는 넣지 않았다.
- **집계:** 단순 건수. 결과는 근거 파일 연결 **70/70**(이전 66/70).

## 이전 기록에서 찾은 것과 찾지 못한 것

| 카드 | 이전 기록 | 그것만으로 충분했나 |
| --- | --- | --- |
| SK매직 dr | `2026-10-02/skmagic-dwa81-dr-code-scope-audit.md` — DWA19R0P 설명서에 「문을 닫으면 dr 표시가 사라진다」는 문구가 있다고만 적음 | 아니다. 인용·해시·모델 목록(C0P·C1P)이 없어 원문을 다시 열었다 |
| SK매직 F9 | `2026-10-29/error-actions/skmagic-cuckoo-roborock.md`(F1~F9 행 인용·이미지 해시), `content-value-2026-10-08/pass2/errorcodes.json`(이미지 위치) | 근거는 같지만 F9 카드를 「다시 조사하지 않음」으로 뺐다. 같은 원문을 다시 받아 해시가 같은지 보고 F1~F9 이미지를 직접 봤다 |
| 쿠쿠 E4 | `2026-10-02/cuckoo-cdw-a0611tw-manual-code-install-audit.md`(25쪽 E4 행·32쪽 모델), `2026-10-07/cuckoo-e4-pilot-source-check.md`(25·32쪽 렌더 대조, SHA-256) | 찾았다. 인용이 없어 25쪽을 다시 렌더해 E4 행 문구를 옮겼다 |
| 로보락 S7 Error 2 | `2026-10-02/roborock-model-error-source-audit.md`(S7 설명서 주소만), `2026-10-29/…/skmagic-cuckoo-roborock.md`(같은 PDF 해시, Error 4 인용) | 아니다. Error 2 행 인용이 없어 원문을 다시 열었다 |

## 카드별 원문

### SK매직 dr — DWA19R0P·DWA19C0P·DWA19C1P (check)

- 원문: [DWA19R0P 공용 설명서](https://m.manual.skmagic.com/2019/model/DWA/DWA19R0P00BL/Manual.htm)(HTML, 쪽 번호 없음).
- 사용하기 › TOUCH ON: 「문을 닫을 때는 문의 위쪽 끝 부분을 눌러 닫아주세요.」 「' dr '표시가 없어져야 문이 완전히 닫힌 상태가 됩니다.」 주의 「문을 강제로 열지 마세요. 고장의 원인이 됩니다.」
- 고장 신고 전 확인하기: 「고장수리로 의뢰하시기 전에 아래사항을 확인해 보시고 그래도 이상이 있을 때는 서비스지정점이나 고객상담센터로 연락해 주세요.」
- 제품규격 모델명: 「DWA19R0P, DWA19C0P, DWA19C1P」.
- 카드 대조: 단계(위쪽 끝을 눌러 닫고 dr이 사라지는지 확인, 강제로 열지 않기, 남으면 공식 서비스)는 원문 문장 범위 안이다.

### SK매직 F9 — DWA-81 터치온 8개 모델 (contact)

- 원문: [DWA-81R0D 공용 설명서](https://m.manual.skmagic.com/2019/model/DWA/DWA81R0D00SL/Manual.htm)(HTML).
- 자가 진단하기: 코드 표시 이미지 `img_08_01_03.png`를 받아 직접 봤다 — 「F1~F9」. 같은 행: 「기능 이상입니다.」 「전원을 끄고 전원 플러그를 콘센트에서 빼주세요.」 「중간밸브를 잠근 후 SK매직 고객상담센터(1600-1661)에 문의하세요.」 F9만의 원인 문장은 없다.
- 제품규격 모델명: 프리스탠딩 「DWA-81R0D, DWA-81R1D, DWA-81U0D, DWA-81U1D」, 빌트인 「DWA-81R5B, DWA-81R6B, DWA-81U5B, DWA-81U6B」.
- 카드 대조: 전원·플러그·중간밸브 차단 뒤 문의만 싣는 contact 카드와 맞다.

### 쿠쿠 E4 — CDW-A0611TW·CDW-A0611TS (contact, 누수)

- 원문: [CDW-A0611T 공용 설명서](https://www.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/200424%3Dz0383-0082a0%20rev.1_cdw-a0611t.pdf)(이미지 PDF). 2026-10-29에는 이 주소가 `cdn.cuckoo.co.kr`의 같은 파일로 301 이동한다. 받은 파일의 SHA-256은 10-07·10-29 기록과 같다.
- 인쇄 25쪽 「에러코드 발생시 대처방법」(70·150dpi로 렌더해 육안 대조): E4 「누수 및 기능점검」, 해결방법 「전원을 끄고 전원 플러그를 콘센트에서 빼 주십시오.」 「중간밸브를 잠근 후 당사 A/S센터에 문의 바랍니다.」 같은 쪽 경고 상자 「누수가 발생하면 서비스를 요청하기 전에 중간밸브를 차단하십시오.」
- 인쇄 32쪽(모델 병기)·12쪽(중간밸브)은 다시 렌더하지 않았다. 10-02·10-07 기록의 대조를 파일 해시 일치로 이어 쓴다.
- 카드 대조: 전원·플러그·중간밸브 차단 뒤 서비스 요청만 싣는 contact 카드와 맞다. 「물이 안 보이거나 표시가 사라져도 다시 세척하지 말고」는 살림랩 편집 안내다(10-07 기록이 이미 구분).

### 로보락 S7 Error 2 — S7 (check)

- 원문: [Roborock S7 공식 영문 설명서](https://support.roborock.com/hc/en-us/article_attachments/900008254623)(PDF 46쪽, 텍스트 추출 가능). 인쇄 쪽 = PDF 쪽 + 2.
- 인쇄 38쪽 Errors: 「Error 2: Bumper stuck. Clean it and lightly tap to release it.」 표 머리 「1. After resolving any of the following errors, relocate your robot and restart cleaning.」
- 인쇄 39쪽: 「If the problem persists after using the recommendations in the table above, please email our after-sales service team:」
- 인쇄 37쪽 Basic Parameters: 「Model roborock S7」.
- 카드 대조: 범퍼 청소·가볍게 두드리기·다른 위치에서 다시 시작, 지속 시 서비스 문의는 원문 범위 안이다. 「본체를 분해하지 말고」는 살림랩 편집 안내다.

## 확인 방법

- HTML은 태그를 걷어 텍스트로, PDF는 `pdftotext`로 뽑아 JSON 인용과 공백 무시 부분일치로 대조했다: 글 인용 14건 일치·불일치 0, 이미지·렌더 인용 5건은 대조에서 빼고 육안으로 봤다. 대조군(원문에 없는 문장 「문을 강제로 열어도 괜찮습니다.」)은 불일치로 잡혔다.
- 스크립트는 세션 작업 폴더(`scratchpad/consistency-scripts/`)에 두었고 커밋하지 않았다.

## SHA-256

해시는 받은 파일을 식별할 뿐 원문이 앞으로 바뀌지 않는다는 보증이 아니다.

| 파일 | 원문 | SHA-256 | 이전 기록과 |
| --- | --- | --- | --- |
| sk-dwa19r0p-manual.htm | DWA19R0P 공용 설명서 | `bfe669a51201508a657e9eb467e6b04f9918f2c360205ee0e90e66b547c3b271` | 이전 해시 없음 |
| sk-dwa81-manual.htm | DWA-81R0D 공용 설명서 | `8cd2bf4389c720d924cabcbfce300f7ef9688f5e84f1a7c49b9084b66951768a` | 10-29 기록과 같음 |
| dwa81-img_08_01_03.png | 같은 설명서 F1~F9 이미지 | `70e16a6fcb214139ada917754eb09b8dca4df0f2ed4cf6f33c130b5b3b970798` | 10-29 기록과 같음 |
| cuckoo-cdw-a0611t.pdf | CDW-A0611T 공용 설명서 | `a2590ff4393d07341c286dd792a20ad02278565d716a81cd214683c7fd66e2c1` | 10-07·10-29 기록과 같음 |
| roborock-s7-manual.pdf | Roborock S7 설명서 | `d3eece49b014035dcfe75c4545e36ff5921e5e010dbe34c9283d893b5e13ac3b` | 10-29 기록과 같음 |
