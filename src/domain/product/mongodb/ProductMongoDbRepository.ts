import { BaseMongoDbRepository, MongoDbResult } from '@spetushkou/api-expressjs';
import { Document } from 'mongoose';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { Product } from '../Product';
import { ProductModel, ProductSchema } from './ProductModel';

export class ProductMongoDbRepository extends BaseMongoDbRepository<Product> {
  constructor() {
    super(ProductModel);
  }

  protected async postSave(doc: Document): Promise<Document> {
    try {
      const keys = ProductSchema.statics.getExternalKeys();
      for (const key of keys) {
        await doc.populate(key).execPopulate();
      }
      return doc;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  protected normalize(dbResult: MongoDbResult | null): Product | Product[] {
    return ClassTransformer.fromPlain(Product, dbResult);
  }
}
