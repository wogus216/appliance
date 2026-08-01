import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 순수 정적 export — 전 페이지가 Static/SSG라 서버 런타임이 필요 없다(out/).
  // Cloudflare Workers 정적 자산 배포 전제 조건.
  // ⚠️ export 모드에서는 redirects()/headers()가 동작하지 않으므로
  //    필요해지면 public/_redirects·_headers 로 대신한다.
  output: "export",
  images: {
    // export 모드에서는 Next 이미지 최적화 서버가 없으므로 필수.
    // 쿠팡 CDN 이미지는 이미 최적화되어 제공되므로 실질 손해가 없다.
    unoptimized: true,
    remotePatterns: [
      // 쿠팡 파트너스 제휴 상품 이미지 CDN — 제휴 가입 후 API/대시보드로 받은 이미지 URL 표시용
      { protocol: "https", hostname: "**.coupangcdn.com" },
    ],
  },
};

export default nextConfig;
