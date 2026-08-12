/**
 * 근거 출처 하나.
 *
 * url만으로는 링크 텍스트에 percent-encoding된 URL이 그대로 노출돼 title을 따로 둔다.
 * "출처는 발행처와 제목을 보인다"는 이 사이트 전체의 편집 규칙이라 타입도 공용이다.
 */
export interface SourceRef {
  url: string;
  /** 링크로 보여줄 제목. 스크린리더가 읽는 접근 가능한 이름이 된다 */
  title: string;
  /** 발행 주체 (예: '국가법령정보센터'). 있으면 제목 옆에 병기한다 */
  publisher?: string;
}
