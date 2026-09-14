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
# ⚠️ 발행 시각에 네트워크가 없을 수 있다 — 2026-09-12·09-14에 실제로 그랬다.
#    09:00은 맥이 깨어난 직후라 Wi-Fi가 아직 안 붙었고, 둘 다
#    `fetch failed (ENOTFOUND salimlab.kr)`로 즉사했다. 도메인은 멀쩡했다.
#    그래서 재기 전에 네트워크가 붙을 때까지 기다린다. 기다려도 안 붙으면 그때 알린다.
#
# 수동 실행(테스트): bash scripts/gsc-watch.sh
# 강제 알림 시험:    GSC_WATCH_FORCE_NOTIFY=1 bash scripts/gsc-watch.sh
# 네트워크 대기 시간 조절: GSC_WATCH_NET_WAIT=60 bash scripts/gsc-watch.sh  (초, 기본 900)
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

# ── 네트워크가 붙기를 기다린다 ────────────────────────────────────────
#
# 사이트와 구글 API 둘 다 닿아야 측정이 된다. 사이트맵은 salimlab.kr에서 받고
# 토큰은 oauth2.googleapis.com에서 받으므로 한쪽만 확인하면 반쪽이다.
# googleapis 쪽은 GET하면 4xx가 정상이라 -f를 쓰지 않는다 — 여기서 보는 것은
# 응답 코드가 아니라 "이름이 풀리고 연결이 되는가"다.
NET_WAIT_MAX="${GSC_WATCH_NET_WAIT:-900}"
NET_PROBE_INTERVAL=30

network_ready() {
  /usr/bin/curl -sS --max-time 10 -o /dev/null "https://salimlab.kr/sitemap.xml" 2>/dev/null &&
    /usr/bin/curl -sS --max-time 10 -o /dev/null "https://oauth2.googleapis.com/" 2>/dev/null
}

WAITED=0
until network_ready; do
  if [ "$WAITED" -ge "$NET_WAIT_MAX" ]; then
    notify "살림랩 색인 감시 — 네트워크 없음" \
      "${NET_WAIT_MAX}초를 기다렸지만 연결되지 않아 측정하지 못했습니다."
    exit 1
  fi
  [ "$WAITED" -eq 0 ] && log "네트워크 대기 중 (최대 ${NET_WAIT_MAX}초)"
  sleep "$NET_PROBE_INTERVAL"
  WAITED=$((WAITED + NET_PROBE_INTERVAL))
done
[ "$WAITED" -gt 0 ] && log "네트워크 준비됨 (${WAITED}초 대기)"

# ── 측정 ──────────────────────────────────────────────────────────
#
# 네트워크가 붙은 뒤에도 한 번은 실패할 수 있다(API 일시 오류·토큰 발급 실패).
# 두 번째까지 실패하면 그때 알린다 — 재시도가 침묵을 늘리지는 않는다.
run_inspect() {
  OUT="$(GSC_KEY_FILE="$KEY_FILE" "$NODE" scripts/gsc-inspect.mjs 2>&1)"
  STATUS=$?
}

run_inspect
if [ $STATUS -ne 0 ]; then
  log "1차 측정 실패(종료코드 $STATUS) — 60초 뒤 한 번 더 시도한다"
  printf '%s\n' "$OUT"
  sleep 60
  run_inspect
fi
printf '%s\n' "$OUT"

if [ $STATUS -ne 0 ]; then
  notify "살림랩 색인 감시 — 측정 실패" "gsc-inspect 가 두 번 다 종료코드 $STATUS 로 끝났습니다."
  exit 1
fi

# "2026-09-09 이후 변화: 새로 색인 0 · 처음 크롤됨 0 · 색인 이탈 0"
LINE="$(printf '%s' "$OUT" | grep -F '이후 변화:' | tail -1)"
if [ -z "$LINE" ]; then
  # 대조 줄이 없으면 '변화 없음'이 아니라 '대조하지 못함'이다. 침묵하면 안 된다.
  notify "살림랩 색인 감시 — 대조 불가" "이전 스냅샷과 비교하지 못했습니다. 로그를 확인하세요."
  exit 0
fi

# 대조 상대가 며칠 전인지 — 측정 공백을 드러낸다.
#
# 이 감시는 매일 도는 것을 전제로 "변화 없음 = 조용히"를 쓴다. 그런데 맥이 꺼져 있으면
# launchd가 그날 치를 소급 실행하지 않는다(2026-09-13에 실제로 건너뛰었다). 공백이
# 길어지면 '조용함'이 '매일 재고 있음'을 뜻하지 않게 되므로 그 사실을 따로 알린다.
PREV_DATE="${LINE%% 이후 변화:*}"
GAP_DAYS=0
if [ -n "$PREV_DATE" ]; then
  PREV_EPOCH="$(/bin/date -j -f '%Y-%m-%d' "$PREV_DATE" '+%s' 2>/dev/null || true)"
  TODAY_EPOCH="$(/bin/date -j -f '%Y-%m-%d' "$(/bin/date '+%Y-%m-%d')" '+%s' 2>/dev/null || true)"
  if [ -n "$PREV_EPOCH" ] && [ -n "$TODAY_EPOCH" ]; then
    GAP_DAYS=$(( (TODAY_EPOCH - PREV_EPOCH) / 86400 ))
  fi
fi
[ "$GAP_DAYS" -gt 1 ] && log "직전 측정이 ${GAP_DAYS}일 전($PREV_DATE)이다 — 그사이는 재지 못했다"

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
elif [ "$GAP_DAYS" -ge 3 ]; then
  # 변화는 없지만 사흘 넘게 못 쟀다. 이때의 '변화 없음'은 '사흘간 변화 없음'이 아니라
  # '사흘 전과 비교했을 때 같음'이다. 둘은 다르고, 조용히 넘기면 구별할 수 없다.
  notify "살림랩 색인 감시 — 측정 공백" \
    "${GAP_DAYS}일 만의 측정입니다(직전 $PREV_DATE). 변화는 없었습니다."
else
  log "변화 없음 — 알리지 않는다"
fi

log "── 끝 ──"
