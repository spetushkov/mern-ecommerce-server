import { BaseMongoDbRepository, MongoDbResult } from '@spetushkou/api-expressjs';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { Review } from '../Review';
import { ReviewModel } from './ReviewModel';

export class ReviewMongoDbRepository extends BaseMongoDbRepository<Review> {
  constructor() {
    super(ReviewModel);
  }

  protected normalize(dbResult: MongoDbResult | null): Review | Review[] {
    return ClassTransformer.fromPlain(Review, dbResult);
  }
}
