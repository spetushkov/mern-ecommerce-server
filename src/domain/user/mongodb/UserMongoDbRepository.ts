import { BaseMongoDbRepository, MongoDbResult } from '@spetushkou/api-expressjs';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { User } from '../User';
import { UserModel } from './UserModel';

export class UserMongoDbRepository extends BaseMongoDbRepository<User> {
  constructor() {
    super(UserModel);
  }

  protected normalize(dbResult: MongoDbResult | null): User | User[] {
    return ClassTransformer.trimExcluded(ClassTransformer.fromPlain(User, dbResult));
  }
}
