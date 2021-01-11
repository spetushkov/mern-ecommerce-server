import { Repository } from '@spetushkou/api-expressjs';
import { BaseApiCrudService } from '../../service/BaseApiCrudService';
import { OrderEntity } from './OrderEntity';

export class OrderCrudService extends BaseApiCrudService<OrderEntity> {
  constructor(repository: Repository<OrderEntity>) {
    super(repository);
  }
}
