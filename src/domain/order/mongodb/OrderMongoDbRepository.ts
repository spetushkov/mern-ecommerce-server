import { Document } from 'mongoose';
import { BaseDomainMongoDbRepository } from '../../../repository/mongodb/BaseDomainMongoDbRepository';
import { OrderEntity } from '../OrderEntity';
import { OrderModel, OrderSchema } from './OrderModel';

export class OrderMongoDbRepository extends BaseDomainMongoDbRepository<OrderEntity> {
  constructor() {
    super(OrderModel, OrderEntity);
  }

  protected async postFindById(doc: Document): Promise<Document> {
    try {
      const keys = OrderSchema.statics.getExternalKeys();
      for (const key of keys) {
        await doc.populate(key).execPopulate();
      }
      return doc;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
