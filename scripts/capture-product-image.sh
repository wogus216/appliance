#!/bin/bash
# 가전제품 공식 사이트에서 제품 이미지를 캡처하는 스크립트
#
# 사용법:
#   ./scripts/capture-product-image.sh <brand> <model-slug> <url>
#
# 예시:
#   ./scripts/capture-product-image.sh samsung af25a9970 "https://www.samsung.com/sec/air-conditioners/..."
#   ./scripts/capture-product-image.sh lg fq25sdwhs "https://www.lge.co.kr/air-conditioner/..."
#
# 결과: public/images/appliances/<brand>/<model-slug>/main.webp

set -e

BRAND=$1
MODEL=$2
URL=$3

if [ -z "$BRAND" ] || [ -z "$MODEL" ] || [ -z "$URL" ]; then
  echo "사용법: $0 <brand> <model-slug> <url>"
  echo "예시: $0 samsung af25a9970 'https://www.samsung.com/sec/...'"
  exit 1
fi

DIR="public/images/appliances/${BRAND}/${MODEL}"
mkdir -p "$DIR"

echo "=== 제품 이미지 캡처 ==="
echo "브랜드: $BRAND"
echo "모델: $MODEL"
echo "URL: $URL"
echo "저장 경로: $DIR/"
echo ""

# 1. 페이지 스크린샷 (playwright 또는 Chrome DevTools 사용)
# 아래는 playwright CLI가 설치되어 있을 때의 예시
if command -v npx &> /dev/null; then
  echo "[1/3] 페이지 캡처 중..."
  npx playwright screenshot --wait-for-timeout 5000 "$URL" "${DIR}/full-page.png" 2>/dev/null || {
    echo "playwright 미설치. 수동으로 이미지를 다운로드하세요:"
    echo "  1. $URL 접속"
    echo "  2. 제품 이미지 우클릭 → 다른 이름으로 저장"
    echo "  3. ${DIR}/main.png 으로 저장"
    echo "  4. 이 스크립트를 다시 실행 (WebP 변환만)"
  }
fi

# 2. WebP 변환 (sharp 사용)
if [ -f "${DIR}/main.png" ] || [ -f "${DIR}/main.jpg" ]; then
  echo "[2/3] WebP 변환 중..."
  node -e "
    const sharp = require('sharp');
    const fs = require('fs');
    const input = fs.existsSync('${DIR}/main.png') ? '${DIR}/main.png' : '${DIR}/main.jpg';
    sharp(input)
      .resize(800, null, { withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: 85 })
      .toFile('${DIR}/main.webp')
      .then(() => {
        const size = fs.statSync('${DIR}/main.webp').size;
        console.log('  완료: ' + (size / 1024).toFixed(1) + ' KB');
        fs.unlinkSync(input);
      });
  "
  echo "[3/3] 완료!"
  echo ""
  echo "데이터 파일에 이미지 경로를 추가하세요:"
  echo "  image: '/images/appliances/${BRAND}/${MODEL}/main.webp'"
else
  echo ""
  echo "=== 수동 이미지 수급 가이드 ==="
  echo ""
  echo "방법 1: 공식 사이트 캡처"
  echo "  - 삼성: samsung.com/sec → 제품 상세 → 이미지 저장"
  echo "  - LG: lge.co.kr → 제품 상세 → 이미지 저장"
  echo "  - ${DIR}/main.png 또는 main.jpg 로 저장 후 이 스크립트 재실행"
  echo ""
  echo "방법 2: Claude Code에서 캡처"
  echo "  - Chrome MCP로 공식 사이트 접속"
  echo "  - evaluate_script로 제품 이미지 URL 추출"
  echo "  - curl로 다운로드 → WebP 변환"
fi
