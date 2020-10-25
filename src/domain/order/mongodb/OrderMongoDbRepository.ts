import { BaseDomainMongoDbRepository } from '../../../repository/mongodb/BaseDomainMongoDbRepository';
import { Order } from '../Order';
import { OrderModel } from './OrderModel';

export class OrderMongoDbRepository extends BaseDomainMongoDbRepository<Order> {
  constructor() {
    super(OrderModel, Order);
  }
}
