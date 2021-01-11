import { Repository } from '@spetushkou/api-expressjs';
import { BaseApiCrudService } from '../../service/BaseApiCrudService';
import { ProductEntity } from './ProductEntity';

export class ProductCrudService extends BaseApiCrudService<ProductEntity> {
  constructor(repository: Repository<ProductEntity>) {
    super(repository);
  }
}
