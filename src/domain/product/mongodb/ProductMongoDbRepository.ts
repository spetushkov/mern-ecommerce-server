import { MongoDbUtils } from '@spetushkou/api-expressjs';
import { Document } from 'mongoose';
import { BaseDomainMongoDbRepository } from '../../../repository/mongodb/BaseDomainMongoDbRepository';
import { ProductEntity } from '../ProductEntity';
import { ProductModel } from './ProductModel';

export class ProductMongoDbRepository extends BaseDomainMongoDbRepository<ProductEntity> {
  constructor() {
    super(ProductModel, ProductEntity);
  }

  protected async postFindById(doc: Document): Promise<Document> {
    try {
      return await MongoDbUtils.exposeExternalRefs(doc);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  protected async postSave(doc: Document): Promise<Document> {
    try {
      return await MongoDbUtils.exposeExternalRefs(doc);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
