import { BaseDomainMongoDbRepository } from '../../../repository/mongodb/BaseDomainMongoDbRepository';
import { User } from '../User';
import { UserModel } from './UserModel';

export class UserMongoDbRepository extends BaseDomainMongoDbRepository<User> {
  constructor() {
    super(UserModel, User);
  }
}
