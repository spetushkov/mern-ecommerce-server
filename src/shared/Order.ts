import { BaseDomain } from './BaseDomain';
import { Product } from './Product';
import { User } from './User';

interface OrderItem {
  name: string;
  quantity: number;
  image: string;
  price: number;
  product: Product | string; // reference: OrderItem MANY_TO_ONE Order
}

interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface PaymentResult {
  id?: string;
  status?: string;
  update_time?: string;
  email_address?: string;
}

export interface Order extends BaseDomain {
  user: User | string; // reference: Order MANY_TO_ONE User
  orderItems?: OrderItem[]; // reference (embedded doc): Order ONE_TO_ONE OrderItem
  shippingAddress?: ShippingAddress;
  paymentMethod: string;
  paymentResult?: PaymentResult;
  taxPrice: number;
  shippingPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
}
