import { CrudService } from '@spetushkou/api-expressjs';
import { BaseDomainCrudController } from '../../server/express/controller/BaseDomainCrudController';
import { UserEntity } from './UserEntity';

export class UserCrudController extends BaseDomainCrudController<UserEntity> {
  constructor(service: CrudService<UserEntity>) {
    super(service, UserEntity);
  }
}
