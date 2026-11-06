/** 가이드의 행동 요약. 제품 수치 비교와 별개인 표·사진·판단/확인 도식. */
export interface GuideVisualSummary {
  heading: string;
  takeaway: string;
  photos?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    title: string;
    caption: string;
    source: { label: string; href: string };
  }[];
  columns: [string, string, string];
  rows: { label: string; meaning: string; action: string }[];
  flow: {
    layout?: 'branches' | 'sequence';
    question: string;
    branches: { condition: string; action: string }[];
    note: string;
  };
  image?: { src: string; alt: string; caption: string; width: number; height: number };
  links?: { label: string; href: string }[];
}
