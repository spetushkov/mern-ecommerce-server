import { BaseMongoDbRepository, MongoDbResult } from '@spetushkou/api-expressjs';
import { Document } from 'mongoose';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { MongoDb } from '../../../utils/MongoDb';
import { Product } from '../Product';
import { ProductModel } from './ProductModel';

export class ProductMongoDbRepository extends BaseMongoDbRepository<Product> {
  constructor() {
    super(ProductModel);
  }

  protected async postSave(doc: Document): Promise<Document> {
    try {
      return await MongoDb.exposeExternalRefs(doc);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  protected normalize(dbResult: MongoDbResult | null): Product | Product[] {
    const resultNotExcluded = ClassTransformer.fromPlain(Product, dbResult, false);
    return ClassTransformer.fromPlain(Product, resultNotExcluded, true);
  }
}
