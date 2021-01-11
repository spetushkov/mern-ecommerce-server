import { CrudService } from '@spetushkou/api-expressjs';
import { BaseApiCrudController } from '../../controller/BaseApiCrudController';
import { ReviewEntity } from './ReviewEntity';

export class ReviewCrudController extends BaseApiCrudController<ReviewEntity> {
  constructor(service: CrudService<ReviewEntity>) {
    super(service, ReviewEntity);
  }
}
