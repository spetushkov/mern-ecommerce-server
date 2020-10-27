import { CrudService } from '@spetushkou/api-expressjs';
import { BaseDomainCrudController } from '../../server/express/controller/BaseDomainCrudController';
import { ProductEntity } from './ProductEntity';

export class ProductCrudController extends BaseDomainCrudController<ProductEntity> {
  constructor(service: CrudService<ProductEntity>) {
    super(service, ProductEntity);
  }
}
