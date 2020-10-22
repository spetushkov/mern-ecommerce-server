import { BaseMongoDbRepository, MongoDbResult } from '@spetushkou/api-expressjs';
import { Document } from 'mongoose';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { User } from '../User';
import { UserModel } from './UserModel';

export class UserMongoDbRepository extends BaseMongoDbRepository<User> {
  constructor() {
    super(UserModel);
  }

  protected async postSave(doc: Document): Promise<Document> {
    return doc;
  }

  protected normalize(dbResult: MongoDbResult | null): User | User[] {
    return ClassTransformer.trimExcluded(ClassTransformer.fromPlain(User, dbResult));
  }
}
