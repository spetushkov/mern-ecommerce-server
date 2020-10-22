import { BaseCrudController, BaseCrudRoute } from '@spetushkou/api-expressjs';
import { User } from './User';

export class UserCrudRoute extends BaseCrudRoute<User> {
  constructor(constroller: BaseCrudController<User>) {
    super(constroller);
  }

  getBaseUrl(): string {
    return '/users';
  }
}
