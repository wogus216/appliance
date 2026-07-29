import { DetailedReviewSection } from '@/types/appliance';
import { group1 } from './group1';
import { group2 } from './group2';
import { group3 } from './group3';
import { group4 } from './group4';
import { group5 } from './group5';
import { group6 } from './group6';
import { group7 } from './group7';
import { group8 } from './group8';
import { group9 } from './group9';
import { group10 } from './group10';
import { group11 } from './group11';

const detailedReviews: Record<string, DetailedReviewSection[]> = {
  ...group1,
  ...group2,
  ...group3,
  ...group4,
  ...group5,
  ...group6,
  ...group7,
  ...group8,
  ...group9,
  ...group10,
  ...group11,
};

export function getDetailedReview(slug: string): DetailedReviewSection[] | undefined {
  return detailedReviews[slug];
}
