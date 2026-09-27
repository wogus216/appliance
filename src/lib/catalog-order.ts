/**
 * 제품 목록의 기본 순서 — 카테고리(주어진 순서) → 제품명.
 *
 * 예전 기본값은 '추천순'이었고 실체는 편집 점수순이었다. 점수를 걷은 뒤(2026-09-27)에는
 * 우열을 암시하지 않는 순서를 쓴다.
 *
 * 카탈로그 데이터를 import하지 않는다 — 클라이언트 그리드가 이 파일을 쓰므로, 여기서 데이터를
 * 끌어오면 제품 74개가 브라우저 번들에 통째로 실린다. 카테고리 순서는 호출하는 쪽이 넘긴다.
 */
export function byCategoryThenName(categoryOrder: readonly string[]) {
  return (a: { category: string; name: string }, b: { category: string; name: string }): number =>
    categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category) ||
    a.name.localeCompare(b.name, 'ko');
}
