import { Repository } from '@spetushkou/api-expressjs';
import { BaseDomainCrudService } from '../../service/BaseDomainCrudService';
import { OrderEntity } from './OrderEntity';

export class OrderCrudService extends BaseDomainCrudService<OrderEntity> {
  constructor(repository: Repository<OrderEntity>) {
    super(repository);
  }
}
