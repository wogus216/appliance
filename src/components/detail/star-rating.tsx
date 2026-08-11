import { Star } from 'lucide-react';

/** 5점 만점 별점. 총평(②)과 가치(④) 섹션이 공유한다. */
export function StarRating({ rating, label }: { rating: number; label: string }) {
  return (
    <span className="flex items-center gap-0.5" role="img" aria-label={`${label} ${rating}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          aria-hidden
          className={`w-4 h-4 ${
            i <= rating ? 'fill-current text-amber-500' : 'fill-none text-gray-300'
          }`}
        />
      ))}
    </span>
  );
}
