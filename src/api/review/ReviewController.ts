import { CrudService } from '@spetushkou/expressjs';
import { BaseApiCrudController } from '../../controller/BaseApiCrudController';
import { ReviewEntity } from './ReviewEntity';

export class ReviewController extends BaseApiCrudController<ReviewEntity> {
  constructor(service: CrudService<ReviewEntity>) {
    super(service, ReviewEntity);
  }
}
