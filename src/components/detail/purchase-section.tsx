import { PurchaseLink } from '@/types/appliance';
import { ExternalLink } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const isCoupangLink = (url: string) => /(^|\.)coupang\.com/.test(new URL(url, 'https://x.invalid').hostname);

export function PurchaseSection({ links }: { links: PurchaseLink[] }) {
  const hasCoupangPartners = links.some((link) => isCoupangLink(link.url));
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">구매처</h2>
      <div className="space-y-2">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel={isCoupangLink(link.url) ? 'sponsored noopener noreferrer' : 'noopener noreferrer'}
            className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-900">{link.store}</span>
              <span className="sr-only"> (새 창)</span>
              {link.isOfficial && (
                <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">공식</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {link.price && (
                <span className="font-bold text-gray-900">{formatPrice(link.price)}</span>
              )}
              <ExternalLink aria-hidden className="w-4 h-4 text-gray-400" />
            </div>
          </a>
        ))}
      </div>
      {hasCoupangPartners && (
        <p className="mt-3 text-xs text-gray-500">
          이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
        </p>
      )}
      <p className="mt-3 text-xs text-gray-400">
        * 가격은 변동될 수 있습니다. 구매 전 해당 사이트에서 최신 가격을 확인하세요.
      </p>
    </section>
  );
}
