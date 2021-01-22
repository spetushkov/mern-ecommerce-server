import { BaseApiEntity } from '../../entity/BaseApiEntity';
import { PayPalPaymentResultEntity } from '../payPal/PayPalPaymentResultEntity';
import { User } from '../user/User';
import { OrderItem } from './orderItem/OrderItem';
import { OrderPaymentMethod } from './orderPaymentMethod/OrderPaymentMethod';
import { OrderShippingAddress } from './orderShippingAddress/OrderShippingAddress';

export interface Order extends BaseApiEntity {
  user?: User | string; // reference: Order MANY_TO_ONE User
  orderItems: OrderItem[]; // reference (embedded doc): Order ONE_TO_ONE OrderItem
  shippingAddress: OrderShippingAddress | null;
  paymentMethod: OrderPaymentMethod | null;
  orderItemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  paymentResult?: PayPalPaymentResultEntity;
  isPaid?: boolean;
  paidAt?: Date;
  isDelivered?: boolean;
  deliveredAt?: Date;
}
