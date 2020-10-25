import { Repository } from '@spetushkou/api-expressjs';
import { BaseDomainCrudService } from '../../service/BaseDomainCrudService';
import { User } from './User';

export class UserCrudService extends BaseDomainCrudService<User> {
  constructor(repository: Repository<User>) {
    super(repository);
  }
}
