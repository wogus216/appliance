import type { Metadata } from 'next';
import './globals.css';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, ADSENSE_CLIENT_ID } from '@/lib/constants';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SiteJsonLd } from '@/components/jsonld';
import { GoogleAnalytics } from '@/components/google-analytics';

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
  // Bing 웹마스터 도구 사이트 소유권 확인용(2026-11-08 등록). 지우면 소유권 확인이 풀린다.
  verification: {
    other: {
      'msvalidate.01': 'DF4343A337DA5626365CB9D8A81FD246',
    },
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
        <GoogleAnalytics />
      </body>
    </html>
  );
}
