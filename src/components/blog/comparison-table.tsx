import type { ComparisonTable } from '@/types/blog';

/**
 * 비교표.
 *
 * 줄마다 note를 붙일 수 있게 한 것이 핵심이다. 숫자만 나란히 놓은 표는
 * "875L vs 870L"을 의미 있는 차이처럼 보이게 만든다. 무엇을 봐야 하고
 * 무엇을 보면 안 되는지를 같은 줄에서 말해야 표가 정보가 된다.
 *
 * 모바일에서는 가로 스크롤로 둔다 — 열을 접어 세로로 쌓으면 비교라는
 * 목적 자체가 사라진다.
 */
export function BlogComparisonTable({ table }: { table: ComparisonTable }) {
  return (
    <section aria-labelledby="comparison-heading" className="scroll-mt-32" id="comparison">
      <h2 id="comparison-heading" className="text-2xl font-bold text-gray-900 mb-4">
        {table.caption}
      </h2>
      <div className="overflow-x-auto rounded-2xl border">
        {/* 표 이름은 위 h2를 가리킨다. <caption>을 따로 두면 같은 문장이 두 번 나온다 */}
        <table className="w-full min-w-[36rem] text-sm" aria-labelledby="comparison-heading">
          <thead>
            <tr className="bg-gray-50">
              <th scope="col" className="p-3 text-left font-semibold text-gray-500 align-bottom">
                항목
              </th>
              {table.columns.map((c) => (
                <th
                  key={c}
                  scope="col"
                  className="p-3 text-left font-bold text-gray-900 align-bottom"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.label} className="border-t align-top">
                <th scope="row" className="p-3 text-left font-medium text-gray-600 whitespace-nowrap">
                  {row.label}
                </th>
                {row.values.map((v, i) => (
                  <td key={`${row.label}-${i}`} className="p-3 text-gray-900">
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 주석은 표 아래 한 곳에만 둔다.
          셀 안에도 같이 넣으면 표가 읽히지 않고, 반응형으로 둘 다 렌더하면
          같은 문장이 HTML에 두 번 들어간다 — 크롤러에게는 중복 본문으로 보인다. */}
      <ul className="mt-4 space-y-1.5">
        {table.rows
          .filter((r) => r.note)
          .map((r) => (
            <li key={r.label} className="flex gap-2 text-xs leading-relaxed text-gray-500">
              <span className="shrink-0 font-medium text-gray-600">{r.label}</span>
              <span>{r.note}</span>
            </li>
          ))}
      </ul>

      <p className="mt-4 rounded-xl bg-gray-50 p-3 text-xs leading-relaxed text-gray-500">
        {table.footnote}
      </p>
    </section>
  );
}
