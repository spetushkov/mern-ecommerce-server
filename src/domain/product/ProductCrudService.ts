import { Repository } from '@spetushkou/api-expressjs';
import { BaseDomainCrudService } from '../../service/BaseDomainCrudService';
import { Product } from './Product';

export class ProductCrudService extends BaseDomainCrudService<Product> {
  constructor(repository: Repository<Product>) {
    super(repository);
  }
}
