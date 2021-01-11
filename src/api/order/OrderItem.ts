import { Product } from '../product/Product';

export interface OrderItem {
  product: Product | string; // reference: OrderItem MANY_TO_ONE Order
  quantity: number;
  name: string;
  image: string;
  price: number;
  countInStock: number;
}
