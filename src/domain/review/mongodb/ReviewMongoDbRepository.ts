import { BaseDomainMongoDbRepository } from '../../../repository/mongodb/BaseDomainMongoDbRepository';
import { ReviewEntity } from '../ReviewEntity';
import { ReviewModel } from './ReviewModel';

export class ReviewMongoDbRepository extends BaseDomainMongoDbRepository<ReviewEntity> {
  constructor() {
    super(ReviewModel, ReviewEntity);
  }
}
