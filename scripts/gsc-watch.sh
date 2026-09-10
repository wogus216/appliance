#!/bin/bash
#
# 색인 상태 일일 감시 (launchd에서 호출)
#
# 하는 일: scripts/gsc-inspect.mjs 를 매일 돌려 이전 스냅샷과 대조하고,
#          "새로 색인 / 처음 크롤됨 / 색인 이탈" 중 하나라도 0이 아닌 날에만 알린다.
#
# ⚠️ 설계상 중요한 점 — 침묵은 "변화 없음"일 때만 허용한다.
#    측정이 실패했는데 조용하면 "아무 일도 없었다"와 구별이 안 된다. 그래서
#    실패·node 없음·대조 줄 없음은 전부 알림을 띄운다. 조용한 날은
#    "정상적으로 재 봤고 정말 안 바뀌었다"는 뜻이어야 한다.
#
# 왜 이 감시가 필요한가 — 2026-09-10 실측에서 이 사이트의 자발적 크롤 간격이
# 1일에서 16일까지 널뛰었다. 날을 정해 한 번 재는 방식으로는 놓친다.
#
# 수동 실행(테스트): bash scripts/gsc-watch.sh
# 강제 알림 시험:    GSC_WATCH_FORCE_NOTIFY=1 bash scripts/gsc-watch.sh
# 로그:  ~/Library/Logs/salimlab-gsc-watch.log
# 해제:  launchctl bootout gui/$(id -u)/kr.salimlab.gsc-watch
# 즉시실행: launchctl kickstart -k gui/$(id -u)/kr.salimlab.gsc-watch

set -uo pipefail

# 스크립트 위치에서 리포 루트를 역산한다 — launchd 가 어디서 부르든 동작하고,
# 개인 홈 경로를 리포에 박지 않는다.
REPO="${GSC_WATCH_REPO:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
KEY_FILE="${GSC_KEY_FILE:-$HOME/.config/gsc/service-account.json}"

# launchd 는 로그인 셸 PATH를 안 물려받는다 — node 경로를 직접 잡아준다.
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }

notify() {
  # 알림이 실패해도 로그는 남게 한다
  /usr/bin/osascript -e "display notification \"$2\" with title \"$1\"" >/dev/null 2>&1 || true
  log "알림: $1 — $2"
}

cd "$REPO" || { log "❌ 리포 경로 없음: $REPO"; exit 1; }

log "── 색인 상태 확인 시작 ──"

NODE="$(command -v node || true)"
if [ -z "$NODE" ]; then
  # nvm default 로 한 번 더 시도한다
  NVM_DEFAULT="$(cat "$HOME/.nvm/alias/default" 2>/dev/null || true)"
  [ -n "$NVM_DEFAULT" ] && NODE="$HOME/.nvm/versions/node/$NVM_DEFAULT/bin/node"
fi
if [ ! -x "$NODE" ]; then
  notify "살림랩 색인 감시 — 실행 불가" "node를 찾지 못했습니다. 로그를 확인하세요."
  exit 1
fi
log "node: $NODE ($("$NODE" -v))"

if [ ! -r "$KEY_FILE" ]; then
  notify "살림랩 색인 감시 — 실행 불가" "서비스 계정 키를 읽지 못했습니다: $KEY_FILE"
  exit 1
fi

OUT="$(GSC_KEY_FILE="$KEY_FILE" "$NODE" scripts/gsc-inspect.mjs 2>&1)"
STATUS=$?
printf '%s\n' "$OUT"

if [ $STATUS -ne 0 ]; then
  notify "살림랩 색인 감시 — 측정 실패" "gsc-inspect 가 종료코드 $STATUS 로 끝났습니다."
  exit 1
fi

# "2026-09-09 이후 변화: 새로 색인 0 · 처음 크롤됨 0 · 색인 이탈 0"
LINE="$(printf '%s' "$OUT" | grep -F '이후 변화:' | tail -1)"
if [ -z "$LINE" ]; then
  # 대조 줄이 없으면 '변화 없음'이 아니라 '대조하지 못함'이다. 침묵하면 안 된다.
  notify "살림랩 색인 감시 — 대조 불가" "이전 스냅샷과 비교하지 못했습니다. 로그를 확인하세요."
  exit 0
fi

# 날짜의 숫자가 섞이지 않도록 '이후 변화:' 뒤쪽만 본다
COUNTS="${LINE#*이후 변화:}"
TOTAL=0
for n in $(printf '%s' "$COUNTS" | grep -oE '[0-9]+'); do
  TOTAL=$((TOTAL + n))
done
log "대조 결과: $LINE (합계 $TOTAL)"

if [ "${GSC_WATCH_FORCE_NOTIFY:-}" = "1" ]; then
  notify "살림랩 색인 감시 — 시험" "$COUNTS"
  exit 0
fi

if [ "$TOTAL" -gt 0 ]; then
  notify "살림랩 색인에 변화" "$COUNTS"
else
  log "변화 없음 — 알리지 않는다"
fi

log "── 끝 ──"
