import { BaseCrudController, BaseCrudRoute } from '@spetushkou/api-expressjs';
import { Product } from './Product';

export class ProductCrudRoute extends BaseCrudRoute<Product> {
  constructor(constroller: BaseCrudController<Product>) {
    super(constroller);
  }

  getBaseUrl(): string {
    return '/products';
  }
}
