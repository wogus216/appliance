#!/bin/bash
#
# 네이버 서치어드바이저 노출·클릭 감시 (ego-browser 래퍼)
#
# naver-watch.mjs 는 ego-browser 안에서 돌기 때문에 이 리포의 작업 디렉터리를 물려받지
# 못한다. 상대 경로로 스냅샷을 쓰려다 ENOENT 를 맞았다. 그래서 리포 루트를 여기서
# 역산해 절대 경로로 넘긴다 — gsc-watch.sh 와 같은 방식이다.
#
# 사용:
#   bash scripts/naver-watch.sh                          # salimlab.kr
#   SITE=https://allrunabout.com bash scripts/naver-watch.sh   # 대조군
#
# ⚠️ 사용자가 네이버에 로그인해 둔 ego-browser 세션을 그대로 쓴다. 로그인이 풀리면
#    표가 비고, 스크립트는 수치 0을 기록하지 않고 종료코드 1로 끝난다.

set -uo pipefail

REPO="${GSC_WATCH_REPO:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
AUDIT_DIR="${NAVER_AUDIT_DIR:-$REPO/.audit/naver}"
TARGET_SITE="${SITE:-https://salimlab.kr}"

cd "$REPO" || { echo "리포 경로 없음: $REPO"; exit 1; }

# env 로는 전달되지 않으므로(위 주석 참조) 설정을 코드로 앞에 붙여 stdin 으로 넘긴다.
{
  printf 'globalThis.__NAVER_WATCH__ = { site: "%s", outDir: "%s" };\n' "$TARGET_SITE" "$AUDIT_DIR"
  cat "$REPO/scripts/naver-watch.mjs"
} | ego-browser nodejs
