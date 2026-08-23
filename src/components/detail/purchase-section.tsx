import { PurchaseLink } from '@/types/appliance';
import { ExternalLink } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import {
  getValidPurchaseLinks,
  hasCoupangPartnersLink,
  isCoupangLink,
} from '@/lib/purchase-links';

/**
 * 구매처 섹션.
 *
 * 자리표시자(`url: '#'`) 링크는 렌더하지 않는다. 걸러 낸 뒤 남는 게 없으면
 * 제목까지 포함해 섹션 전체를 그리지 않는다 — 아무 데도 가지 않는 "구매처"는
 * 미완성 콘텐츠 신호다.
 */
export function PurchaseSection({ links }: { links: PurchaseLink[] }) {
  const validLinks = getValidPurchaseLinks(links);
  if (validLinks.length === 0) return null;

  const showCoupangDisclosure = hasCoupangPartnersLink(validLinks);

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">구매처</h2>
      <div className="space-y-2">
        {validLinks.map((link, i) => (
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
      {showCoupangDisclosure && (
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
