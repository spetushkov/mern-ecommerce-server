import { BaseMongoDbRepository, MongoDbResult } from '@spetushkou/api-expressjs';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { Product } from '../Product';
import { ProductModel } from './ProductModel';

export class ProductMongoDbRepository extends BaseMongoDbRepository<Product> {
  constructor() {
    super(ProductModel);
  }

  protected normalize(dbResult: MongoDbResult | null): Product | Product[] {
    return ClassTransformer.trimExcluded(ClassTransformer.fromPlain(Product, dbResult));
  }
}
