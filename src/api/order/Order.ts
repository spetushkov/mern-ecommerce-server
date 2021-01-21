import { ApiEntity } from '../../entity/ApiEntity';
import { PayPalPaymentResult } from '../payPal/PayPalPaymentResult';
import { User } from '../user/User';
import { OrderItem } from './OrderItem';
import { OrderPaymentMethod } from './OrderPaymentMethod';
import { OrderShippingAddress } from './OrderShippingAddress';

export interface Order extends ApiEntity {
  user?: User | string; // reference: Order MANY_TO_ONE User
  orderItems: OrderItem[]; // reference (embedded doc): Order ONE_TO_ONE OrderItem
  shippingAddress: OrderShippingAddress | null;
  paymentMethod: OrderPaymentMethod | null;
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
