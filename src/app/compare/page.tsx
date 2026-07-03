import { Metadata } from 'next';
import { CompareContent } from '@/components/compare/compare-content';
import { getCardAppliances } from '@/lib/data/appliances';

export const metadata: Metadata = {
  title: '가전제품 비교',
  description: '에어컨, 제습기, 세탁기 등 가전제품 스펙을 나란히 비교하세요.',
  alternates: { canonical: '/compare' },
  openGraph: {
    title: '가전제품 비교',
    description: '에어컨, 제습기, 세탁기 등 가전제품 스펙을 나란히 비교하세요.',
    url: '/compare',
  },
};

export default function ComparePage() {
  const allAppliances = getCardAppliances();
  return (
    <>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <CompareContent allAppliances={allAppliances} />
        </div>
    </>
  );
}
