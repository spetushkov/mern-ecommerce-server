import { BaseApiMongoDbRepository } from '../../../repository/mongodb/BaseApiMongoDbRepository';
import { ProductEntity } from '../ProductEntity';
import { ProductModel } from './ProductModel';

export class ProductMongoDbRepository extends BaseApiMongoDbRepository<ProductEntity> {
  constructor() {
    super(ProductModel, ProductEntity);
  }
}
