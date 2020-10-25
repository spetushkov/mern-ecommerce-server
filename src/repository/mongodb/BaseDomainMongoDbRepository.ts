import { BaseMongoDbRepository, MongoDbResult } from '@spetushkou/api-expressjs';
import { Document, Model } from 'mongoose';
import { ClassTransformer, Clazz } from '../../class/ClassTransformer';

export class BaseDomainMongoDbRepository<T> extends BaseMongoDbRepository<T> {
  private entityClass: Clazz<T>;

  constructor(mongooseModel: Model<Document, {}>, entityClass: Clazz<T>) {
    super(mongooseModel);
    this.entityClass = entityClass;
  }

  protected normalize(dbResult: MongoDbResult | null): T | T[] {
    const resultNotExcluded = ClassTransformer.fromPlain(this.entityClass, dbResult, false);
    return ClassTransformer.fromPlain(this.entityClass, resultNotExcluded, true);
  }
}
