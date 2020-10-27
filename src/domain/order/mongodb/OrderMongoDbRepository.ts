import { BaseDomainMongoDbRepository } from '../../../repository/mongodb/BaseDomainMongoDbRepository';
import { OrderEntity } from '../OrderEntity';
import { OrderModel } from './OrderModel';

export class OrderMongoDbRepository extends BaseDomainMongoDbRepository<OrderEntity> {
  constructor() {
    super(OrderModel, OrderEntity);
  }
}
