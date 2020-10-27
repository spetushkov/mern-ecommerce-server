import { Repository } from '@spetushkou/api-expressjs';
import { BaseDomainCrudService } from '../../service/BaseDomainCrudService';
import { UserEntity } from './UserEntity';

export class UserCrudService extends BaseDomainCrudService<UserEntity> {
  constructor(repository: Repository<UserEntity>) {
    super(repository);
  }
}
