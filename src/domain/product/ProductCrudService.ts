import { BaseCrudService, Repository } from '@spetushkou/api-expressjs';
import { Product } from './Product';

export class ProductCrudService extends BaseCrudService<Product> {
  constructor(repository: Repository<Product>) {
    super(repository);
  }
}
