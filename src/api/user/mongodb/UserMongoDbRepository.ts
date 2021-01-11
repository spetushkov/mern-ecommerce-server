import { BaseApiMongoDbRepository } from '../../../repository/mongodb/BaseApiMongoDbRepository';
import { UserEntity } from '../UserEntity';
import { UserModel } from './UserModel';

export class UserMongoDbRepository extends BaseApiMongoDbRepository<UserEntity> {
  constructor() {
    super(UserModel, UserEntity);
  }
}
