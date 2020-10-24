import { BaseCrudController, CrudService } from '@spetushkou/api-expressjs';
import { ClassTransformer } from '../../class/ClassTransformer';
import { User } from './User';

export class UserCrudController extends BaseCrudController<User> {
  constructor(service: CrudService<User>) {
    super(service);
  }

  protected normalize(entity: Object | null): User {
    return ClassTransformer.fromPlain(User, entity);
  }
}
