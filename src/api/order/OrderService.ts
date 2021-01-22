import { Repository } from '@spetushkou/expressjs';
import { BaseApiCrudService } from '../../service/BaseApiCrudService';
import { OrderEntity } from './OrderEntity';

export class OrderService extends BaseApiCrudService<OrderEntity> {
  constructor(repository: Repository<OrderEntity>) {
    super(repository);
  }
}
