import { BaseCrudService, Repository } from '@spetushkou/api-expressjs';
import { ClassTransformer } from '../../class/ClassTransformer';
import { User } from './User';

export class UserCrudService extends BaseCrudService<User> {
  constructor(repository: Repository<User>) {
    super(repository);
  }

  protected normalize(entity: User | User[]): User | User[] {
    return ClassTransformer.trimExcluded(entity);
  }
}
