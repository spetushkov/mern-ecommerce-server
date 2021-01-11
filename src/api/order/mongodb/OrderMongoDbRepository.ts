import { Document } from 'mongoose';
import { BaseApiMongoDbRepository } from '../../../repository/mongodb/BaseApiMongoDbRepository';
import { OrderEntity } from '../OrderEntity';
import { OrderModel, OrderSchema } from './OrderModel';

export class OrderMongoDbRepository extends BaseApiMongoDbRepository<OrderEntity> {
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
