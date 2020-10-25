import { CrudService } from '@spetushkou/api-expressjs';
import { BaseDomainCrudController } from '../../server/express/controller/BaseDomainCrudController';
import { User } from './User';

export class UserCrudController extends BaseDomainCrudController<User> {
  constructor(service: CrudService<User>) {
    super(service, User);
  }
}
