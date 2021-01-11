import { Repository } from '@spetushkou/api-expressjs';
import { BaseApiCrudService } from '../../service/BaseApiCrudService';
import { UserEntity } from './UserEntity';

export class UserCrudService extends BaseApiCrudService<UserEntity> {
  constructor(repository: Repository<UserEntity>) {
    super(repository);
  }
}
