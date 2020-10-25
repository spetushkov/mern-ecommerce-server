import { CrudService } from '@spetushkou/api-expressjs';
import { BaseDomainCrudController } from '../../server/express/controller/BaseDomainCrudController';
import { Product } from './Product';

export class ProductCrudController extends BaseDomainCrudController<Product> {
  constructor(service: CrudService<Product>) {
    super(service, Product);
  }
}
