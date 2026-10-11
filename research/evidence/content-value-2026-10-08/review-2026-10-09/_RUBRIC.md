# 살림랩 콘텐츠 독자성 평가 기준 (2026-10-09 고정 — 결과를 보고 바꾸지 않는다)

당신은 이 콘텐츠를 쓰지 않은 **외부 편집 평가자**다. 칭찬할 이유를 찾지 말고, 독자가 이 페이지를 읽을 이유가 실제로 있는지 냉정하게 판정한다. 애드센스 승인 가능성은 판단하지 않는다.

사이트 성격: 살림랩(salimlab.kr)은 가전을 직접 구매·실측하지 않는다. 공개 원문(제조사 설명서·지원 페이지·한국에너지공단 신고·소비자원 시험 등)을 대조하고, 계산을 공개하고, 조건별 선택 기준을 제시하는 편집 매체를 표방한다.

## 핵심 질문
> 이 페이지에서 독자가 얻는 판단 중, **제조사 사양표나 쇼핑몰 상세페이지를 읽는 것만으로는 쉽게 얻기 어려운 것**은 무엇인가?

## 입력
- 페이지 본문 텍스트: 이 폴더의 `<파일>.txt` (운영 사이트 `<main>` 추출본, 첫 줄 URL). 필요하면 운영 URL을 WebFetch로 열어 렌더 상태를 확인해도 된다.
- 객관 지표: `_metrics.json` (chars, 유보 표현 수 hedges, 1천 자당 hedgesPer1k)

## 페이지별 판정 항목
1. `originalInsights` (최대 5개): 사양표·쇼핑몰 상세만으로는 얻기 어려운 구체적 판단.
   - 각 항목: `type` ∈ {계산, 출처간대조·불일치, 조건별판단규칙, 설치·운용제약해석, 비용환산, 같은기준비교}, `quote`(페이지 원문 80자 이내), `whyNotInSpecSheet`(한 줄)
   - 단순 사양 나열·바꿔 말하기는 넣지 않는다.
2. `blockShares`: 본문 문단을 세어 대략 비율(%)로 — `original` / `restated`(사양 재서술) / `generic`(어떤 제품에도 붙는 일반론) / `unsupported`(근거 없는 단정). 합 100.
3. `originalityScore` 0~3
   - 0: 독자 판단 없음(재서술·일반론뿐)
   - 1: 사소한 독자 판단 1개 정도
   - 2: 구매·설치·사용 결정을 바꾸는 독자 판단이 여러 개
   - 3: 독자 분석이 페이지의 중심이고, 사양표로는 얻을 수 없는 결정적 판단을 준다
4. `flags`
   - `experienceFabrication`: 직접 써 본 것처럼 꾸민 문장(인용)
   - `unsupportedClaims`: 근거가 안 보이는 단정(인용)
   - `internalInconsistency`: 같은 페이지 안의 수치·결론 충돌(인용)
   - `hedgeOverload`: 유보·면책 문장이 판단을 가릴 만큼 많은가(true/false + 근거)
   - `repetition`: 같은 내용 반복(인용)
   - `readability`: 읽기를 방해하는 문제(문장 길이·괄호 남용·전문용어 등, 구체적으로)
   - `formulaic`: 페이지 간 복붙처럼 보이는 정형 문구(인용)
   - `thin`: 실질 내용이 빈약한가
5. `readerVerdict`: 구매자가 제조사 페이지 대신(또는 추가로) 이 페이지를 읽을 가치가 있는지 1~2문장.

## 대조군 검사 (필수, 평가자당 최소 3페이지)
페이지의 "근거/참고 자료"에 있는 제조사·공식 URL 하나를 WebFetch로 열어, 그 페이지의 **가장 강한 독자 판단 1개**가 원문에 이미 그대로 적혀 있는지 본다.
- `baselineCheck`: {url, insight, inSource: 그대로 있음/부분적으로 있음/없음, evidence}
- 원문을 못 열면 그렇게 적는다(403 등). 못 연 것을 "없음"으로 판정하지 않는다.

## 규칙
- WebSearch 금지. WebFetch는 URL을 아는 페이지에만. 브라우저가 꼭 필요하면 `aside repl`만(`aside exec`·명령 없는 `aside "..."` 금지).
- 저장소 파일을 고치지 않는다. 커밋하지 않는다.
- 숫자를 말할 때는 무엇을 셌는지 함께 적는다.

## 출력
1. JSON 파일: `../review-out/<평가자ID>.json`
   ```json
   {"reviewer":"","pages":[{"file":"","path":"","originalityScore":0,"blockShares":{"original":0,"restated":0,"generic":0,"unsupported":0},"originalInsights":[],"flags":{},"readerVerdict":""}],
    "baselineChecks":[], "groupSummary":{"strongest":[], "weakest":[], "patterns":[], "topFixes":[]}}
   ```
2. 최종 답변(조정자에게): 15줄 이내 — 점수 분포(0/1/2/3 페이지 수), 가장 강한 페이지 3, 가장 약한 페이지 3과 이유, 반복 패턴, 우선 고칠 것 3개, 대조군 결과.
