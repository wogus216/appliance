import { ApplianceCategory } from '@/types/appliance';
import {
  Zap,
  AirVent,
  Droplets,
  Wind,
  Fan,
  WashingMachine,
  Refrigerator,
  GlassWater,
  Bot,
} from 'lucide-react';

/** 카테고리별 대체 아이콘 (이미지 없을 때 placeholder) */
export function CategoryIcon({
  category,
  className = 'w-12 h-12',
}: {
  category: ApplianceCategory;
  className?: string;
}) {
  const props = { className, 'aria-hidden': true };
  switch (category) {
    case '에어컨':
      return <AirVent {...props} />;
    case '제습기':
      return <Droplets {...props} />;
    case '공기청정기':
      return <Wind {...props} />;
    case '선풍기':
      return <Fan {...props} />;
    case '세탁기':
    case '건조기':
    case '식기세척기':
      return <WashingMachine {...props} />;
    case '냉장고':
      return <Refrigerator {...props} />;
    case '정수기':
      return <GlassWater {...props} />;
    case '로봇청소기':
      return <Bot {...props} />;
    default:
      return <Zap {...props} />;
  }
}
