import { OrderPermission } from '../api/order/OrderPermission';
import { ProductPermission } from '../api/product/ProductPermission';
import { Role } from './Role';

export interface ApiRole extends Role {
  order: OrderPermission;
  product: ProductPermission;
}
