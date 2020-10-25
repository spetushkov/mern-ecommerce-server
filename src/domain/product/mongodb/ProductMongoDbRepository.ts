import { Document } from 'mongoose';
import { BaseDomainMongoDbRepository } from '../../../repository/mongodb/BaseDomainMongoDbRepository';
import { MongoDbUtils } from '../../../utils/MongoDbUtils';
import { Product } from '../Product';
import { ProductModel } from './ProductModel';

export class ProductMongoDbRepository extends BaseDomainMongoDbRepository<Product> {
  constructor() {
    super(ProductModel, Product);
  }

  protected async postSave(doc: Document): Promise<Document> {
    try {
      return await MongoDbUtils.exposeExternalRefs(doc);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
