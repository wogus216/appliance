#!/bin/bash
#
# 네이버 색인 커버리지 확인 (ego-browser 래퍼)
#
# naver-index.mjs 는 ego-browser 안에서 돌기 때문에 이 리포의 작업 디렉터리도 env 도
# 물려받지 못한다. 그래서 설정을 코드로 앞에 붙여 stdin 으로 넘긴다 — naver-watch.sh 와
# 같은 방식이고, 같은 이유로 그렇게 됐다.
#
# 사용:
#   bash scripts/naver-index.sh                          # 사이트맵 전체 (123개 ≈ 7분)
#   LIMIT=10 bash scripts/naver-index.sh                 # 빠른 확인
#   ONLY=/error-codes bash scripts/naver-index.sh        # 경로 접두사만
#   SITE=https://allrunabout.com bash scripts/naver-index.sh   # 대조 사이트
#
# ⚠️ 사용자가 네이버에 로그인해 둔 ego-browser 세션을 그대로 쓴다.
#    대조군이 무너지면(차단·로그아웃) 수치를 기록하지 않고 종료코드 1로 끝난다.

set -uo pipefail

REPO="${GSC_WATCH_REPO:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
AUDIT_DIR="${NAVER_INDEX_AUDIT_DIR:-$REPO/.audit/naver-index}"
TARGET_SITE="${SITE:-https://salimlab.kr}"

cd "$REPO" || { echo "리포 경로 없음: $REPO"; exit 1; }

{
  printf 'globalThis.__NAVER_INDEX__ = { site: "%s", outDir: "%s", limit: %s, only: "%s", delayMs: %s };\n' \
    "$TARGET_SITE" "$AUDIT_DIR" "${LIMIT:-0}" "${ONLY:-}" "${DELAY_MS:-2500}"
  cat "$REPO/scripts/naver-index.mjs"
} | ego-browser nodejs
