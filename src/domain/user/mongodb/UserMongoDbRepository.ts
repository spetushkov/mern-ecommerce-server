import { BaseDomainMongoDbRepository } from '../../../repository/mongodb/BaseDomainMongoDbRepository';
import { UserEntity } from '../UserEntity';
import { UserModel } from './UserModel';

export class UserMongoDbRepository extends BaseDomainMongoDbRepository<UserEntity> {
  constructor() {
    super(UserModel, UserEntity);
  }
}
