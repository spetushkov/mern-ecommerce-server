import { BaseCrudController, CrudService } from '@spetushkou/api-expressjs';
import { ClassTransformer } from '../../class/ClassTransformer';
import { Product } from './Product';

export class ProductCrudController extends BaseCrudController<Product> {
  constructor(service: CrudService<Product>) {
    super(service);
  }

  protected normalize(entity: Object | null): Product {
    return ClassTransformer.fromPlain(Product, entity);
  }
}
