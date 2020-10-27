import { BaseDomain } from './BaseDomain';

export interface Review extends BaseDomain {
  name: string;
  rating: number;
  comment: string;
}
