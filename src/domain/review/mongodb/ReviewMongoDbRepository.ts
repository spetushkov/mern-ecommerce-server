import { BaseDomainMongoDbRepository } from '../../../repository/mongodb/BaseDomainMongoDbRepository';
import { Review } from '../Review';
import { ReviewModel } from './ReviewModel';

export class ReviewMongoDbRepository extends BaseDomainMongoDbRepository<Review> {
  constructor() {
    super(ReviewModel, Review);
  }
}
