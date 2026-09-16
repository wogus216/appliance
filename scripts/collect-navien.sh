#!/bin/bash
set -uo pipefail
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="${NAVIEN_DIR:-$REPO/.audit/navien}"
cd "$REPO" || exit 1
{
  printf 'globalThis.__NAVIEN__ = { outDir: "%s" };\n' "$OUT"
  cat "$REPO/scripts/collect-navien.mjs"
} | ego-browser nodejs
