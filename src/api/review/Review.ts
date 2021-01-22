import { BaseApiEntity } from '../../entity/BaseApiEntity';
import { Product } from '../product/Product';
import { User } from '../user/User';

export interface Review extends BaseApiEntity {
  name?: string;
  rating: number;
  comment: string;
  user: User | string; // reference: Review MANY_TO_ONE User
  product: Product | string; // reference: Review MANY_TO_ONE Product
}
