// 블로그 글 하나를 색인 게이트에 통과시키는 자리.
//
// 판정 규칙 자체는 content-quality.ts에 있고 여기서는 BlogPost에서 값을 뽑아
// 넘기기만 한다. 페이지의 generateMetadata와 사이트맵이 반드시 이 함수를 쓴다 —
// 서로 다른 기준을 쓰면 "사이트맵에는 있는데 noindex"인 URL이 생긴다.

import { blogBodyChars, type BlogPost } from '@/types/blog';
import { countCitableSources } from '@/lib/source-trust';
import { isBlogPostIndexable } from '@/lib/content-quality';
import { allBlogPosts } from '@/lib/data/blog';

export function isPostIndexable(post: BlogPost): boolean {
  return isBlogPostIndexable({
    citableSourceCount: countCitableSources(post.sources),
    bodyChars: blogBodyChars(post),
    sectionCount: post.sections.length,
    reviewedBy: post.reviewedBy,
    updatedAt: post.updatedAt,
  });
}

export function getIndexableBlogPosts(): BlogPost[] {
  return allBlogPosts.filter(isPostIndexable);
}
