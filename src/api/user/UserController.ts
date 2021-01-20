import { CrudService } from '@spetushkou/api-expressjs';
import { BaseApiCrudController } from '../../controller/BaseApiCrudController';
import { UserEntity } from './UserEntity';

export class UserController extends BaseApiCrudController<UserEntity> {
  constructor(service: CrudService<UserEntity>) {
    super(service, UserEntity);
  }
}
