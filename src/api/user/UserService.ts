import { Repository } from '@spetushkou/expressjs';
import { BaseApiCrudService } from '../../service/BaseApiCrudService';
import { UserEntity } from './UserEntity';

export class UserService extends BaseApiCrudService<UserEntity> {
  constructor(repository: Repository<UserEntity>) {
    super(repository);
  }
}
