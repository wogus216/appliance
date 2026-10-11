import Link from 'next/link';
import { SITE_AUTHOR } from '@/lib/constants';

/** /about의 운영자 절. 그 절의 id와 같아야 한다(src/app/about/page.tsx의 id="operator"). */
export const OPERATOR_HREF = '/about#operator';

/**
 * 바이라인의 작성·검수자 이름.
 *
 * 2026-10-11 5차: '작성·검수 산초'가 링크 없는 글자라, 이름을 눌러도 누가 어떤 방식으로 검수하는지
 * 볼 수 없었다(P8). 운영자 필명이면 /about 운영자 절로 연결한다. 다른 이름이 들어오면 그 사람에 대한
 * 소개 절이 없으므로 글자만 둔다.
 */
export function AuthorName({ name, className }: { name: string; className?: string }) {
  if (name.trim() !== SITE_AUTHOR) return <>{name}</>;
  return (
    <Link href={OPERATOR_HREF} className={className ?? 'underline underline-offset-2 hover:text-blue-700'}>
      {name}
    </Link>
  );
}
