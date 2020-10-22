import { BaseCrudService, Repository } from '@spetushkou/api-expressjs';
import { User } from './User';

export class UserCrudService extends BaseCrudService<User> {
  constructor(repository: Repository<User>) {
    super(repository);
  }

  protected getCreatedBy(entity: User): string | undefined {
    return undefined;
  }

  protected getUpdatedBy(entity: User): string | undefined {
    return undefined;
  }
}
