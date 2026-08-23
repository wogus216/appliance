import type { Metadata } from 'next';
import './globals.css';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, ADSENSE_CLIENT_ID } from '@/lib/constants';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SiteJsonLd } from '@/components/jsonld';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'ko_KR',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  // 애드센스 사이트 소유권 확인용
  other: {
    'google-adsense-account': ADSENSE_CLIENT_ID,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <SiteJsonLd />
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:rounded focus:bg-blue-600 focus:px-3 focus:py-2 focus:text-white">본문 바로가기</a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        {/*
          애드센스 광고 스크립트는 여기 두지 않는다.
          전역에 두면 404와 정책 페이지처럼 실질 콘텐츠가 없는 화면에도 광고가 실린다.
          광고를 실을 자격이 있는 페이지가 광고 스크립트 컴포넌트를 직접 렌더한다
          (src/components/adsense-script.tsx). 소유권 확인용 메타태그는 위 metadata에 남는다.
        */}
      </body>
    </html>
  );
}
