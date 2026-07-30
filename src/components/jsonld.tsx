import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, CONTACT_EMAIL } from '@/lib/constants';

/** JSON-LD <script> 공통 렌더러 — XSS 방지를 위해 '<'를 유니코드로 치환 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

/** 사이트 전역 Organization + WebSite 스키마 (layout에서 1회 렌더) */
export function SiteJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: SITE_NAME,
            url: SITE_URL,
            email: CONTACT_EMAIL,
          },
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            name: SITE_NAME,
            description: SITE_DESCRIPTION,
            url: SITE_URL,
            inLanguage: 'ko',
            publisher: { '@id': `${SITE_URL}/#organization` },
          },
        ],
      }}
    />
  );
}

export interface BreadcrumbItem {
  name: string;
  /** 절대 경로(/products/...) — 마지막 항목은 생략 가능 */
  path?: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          ...(item.path ? { item: `${SITE_URL}${item.path}` } : {}),
        })),
      }}
    />
  );
}
