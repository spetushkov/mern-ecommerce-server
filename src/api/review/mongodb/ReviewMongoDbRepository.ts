import { BaseApiMongoDbRepository } from '../../../repository/mongodb/BaseApiMongoDbRepository';
import { ReviewEntity } from '../ReviewEntity';
import { ReviewModel } from './ReviewModel';

export class ReviewMongoDbRepository extends BaseApiMongoDbRepository<ReviewEntity> {
  constructor() {
    super(ReviewModel, ReviewEntity);
  }
}
