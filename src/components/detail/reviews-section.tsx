import { Review } from '@/types/appliance';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;

  const count = reviews.length;
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / count;
  const recommendRate = Math.round(
    (reviews.filter((r) => r.rating >= 4).length / count) * 100,
  );
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    n: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">사용자 리뷰</h2>

      {/* 집계 요약 */}
      <div className="border rounded-2xl p-5 mb-5 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex items-center justify-center gap-6 sm:border-r sm:pr-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 leading-none">
                {avg.toFixed(1)}
              </div>
              <div
                className="flex items-center justify-center gap-0.5 mt-1.5"
                role="img"
                aria-label={`평균 ${avg.toFixed(1)}/5`}
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    aria-hidden
                    className={`w-3.5 h-3.5 ${
                      i <= Math.round(avg)
                        ? 'fill-current text-yellow-500'
                        : 'fill-none text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-1.5">사용자 평균 · 리뷰 {count}개</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 leading-none">
                {recommendRate}%
              </div>
              <div className="text-xs text-gray-500 mt-1.5">추천</div>
            </div>
          </div>

          {/* 평점 분포 */}
          <div className="flex-1 space-y-1.5">
            {distribution.map(({ star, n }) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-7 shrink-0">{star}점</span>
                <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-yellow-400"
                    style={{ width: `${count ? (n / count) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-5 text-right shrink-0">
                  {n}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 개별 리뷰 */}
      <div className="space-y-4">
        {reviews.map((review, i) => (
          <div key={i} className="border rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                {review.userType}
              </span>
              <span className="flex items-center gap-1 text-yellow-500">
                <Star aria-hidden className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">{review.rating}</span>
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>

            {(review.pros?.length || review.cons?.length) ? (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {review.pros?.map((p, j) => (
                  <span
                    key={`p${j}`}
                    className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-100"
                  >
                    <ThumbsUp aria-hidden className="w-3 h-3" />
                    {p}
                  </span>
                ))}
                {review.cons?.map((c, j) => (
                  <span
                    key={`c${j}`}
                    className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-100"
                  >
                    <ThumbsDown aria-hidden className="w-3 h-3" />
                    {c}
                  </span>
                ))}
              </div>
            ) : null}

            {review.source && (
              <p className="mt-2 text-xs text-gray-500">
                출처:{' '}
                {review.sourceUrl ? (
                  <a
                    href={review.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {review.source}
                    <span className="sr-only"> (새 창)</span>
                  </a>
                ) : (
                  review.source
                )}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
