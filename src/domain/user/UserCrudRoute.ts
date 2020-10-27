import { BaseCrudController, BaseCrudRoute } from '@spetushkou/api-expressjs';
import { UserEntity } from './UserEntity';

export class UserCrudRoute extends BaseCrudRoute<UserEntity> {
  constructor(constroller: BaseCrudController<UserEntity>) {
    super(constroller);
  }

  getBaseUrl(): string {
    return '/users';
  }
}
