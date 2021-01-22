import { Role } from '@spetushkou/expressjs';
import { OrderPermission } from '../api/order/OrderPermission';
import { ProductPermission } from '../api/product/ProductPermission';

export interface ApiRole extends Role {
  order: OrderPermission;
  product: ProductPermission;
}
