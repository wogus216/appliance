#!/bin/bash
# SK매직 공식 FAQ 수집 (ego-browser 래퍼).
# naver-watch.sh 와 같은 이유로 설정을 코드로 주입한다 — ego-browser 의 node 는
# 부모 셸의 env 도 작업 디렉터리도 물려받지 않는다.
set -uo pipefail
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="${SKMAGIC_FAQ_DIR:-$REPO/.audit/skmagic-faq}"
cd "$REPO" || exit 1
{
  printf 'globalThis.__SKMAGIC_FAQ__ = { outDir: "%s" };\n' "$OUT"
  cat "$REPO/scripts/collect-skmagic-faq.mjs"
} | ego-browser nodejs
