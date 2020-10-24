import { BaseMongoDbRepository, MongoDbResult } from '@spetushkou/api-expressjs';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { Order } from '../Order';
import { OrderModel } from './OrderModel';

export class OrderMongoDbRepository extends BaseMongoDbRepository<Order> {
  constructor() {
    super(OrderModel);
  }

  protected normalize(dbResult: MongoDbResult | null): Order | Order[] {
    return ClassTransformer.fromPlain(Order, dbResult);
  }
}
