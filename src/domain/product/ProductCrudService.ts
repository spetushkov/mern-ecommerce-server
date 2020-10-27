import { Repository } from '@spetushkou/api-expressjs';
import { BaseDomainCrudService } from '../../service/BaseDomainCrudService';
import { ProductEntity } from './ProductEntity';

export class ProductCrudService extends BaseDomainCrudService<ProductEntity> {
  constructor(repository: Repository<ProductEntity>) {
    super(repository);
  }
}
