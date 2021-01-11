import { ApiEntity } from '../../entity/ApiEntity';
import { User } from '../user/User';
import { OrderItem } from './OrderItem';
import { PaymentMethod } from './PaymentMethod';
import { PayPalPaymentResult } from './payPal/PayPalPaymentResult';
import { ShippingAddress } from './ShippingAddress';

export interface Order extends ApiEntity {
  user?: User | string; // reference: Order MANY_TO_ONE User
  orderItems: OrderItem[]; // reference (embedded doc): Order ONE_TO_ONE OrderItem
  shippingAddress: ShippingAddress | null;
  paymentMethod: PaymentMethod | null;
  orderItemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  paymentResult?: PayPalPaymentResult;
  isPaid?: boolean;
  paidAt?: Date;
  isDelivered?: boolean;
  deliveredAt?: Date;
}
