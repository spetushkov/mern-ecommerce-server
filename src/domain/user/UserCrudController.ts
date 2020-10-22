import { BaseCrudController, BaseRequest, CrudService } from '@spetushkou/api-expressjs';
import { ClassTransformer } from '../../class/ClassTransformer';
import { User } from './User';

export class UserCrudController extends BaseCrudController<User> {
  constructor(service: CrudService<User>) {
    super(service);
  }

  protected preSave(req: BaseRequest, entity: User): User {
    return entity;
  }

  protected preUpdate(req: BaseRequest, entity: User): User {
    return entity;
  }

  protected fromPlain(entity: Object | null): User {
    return ClassTransformer.fromPlain(User, entity);
  }

  protected fromQueryPlain(entity: Object | null) {
    return undefined;
  }
}
