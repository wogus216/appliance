import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // 쿠팡 파트너스 제휴 상품 이미지 CDN — 제휴 가입 후 API/대시보드로 받은 이미지 URL 표시용
      { protocol: "https", hostname: "**.coupangcdn.com" },
    ],
  },
};

export default nextConfig;
