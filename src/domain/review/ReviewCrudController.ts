import { CrudService } from '@spetushkou/api-expressjs';
import { BaseDomainCrudController } from '../../server/express/controller/BaseDomainCrudController';
import { ReviewEntity } from './ReviewEntity';

export class ReviewCrudController extends BaseDomainCrudController<ReviewEntity> {
  constructor(service: CrudService<ReviewEntity>) {
    super(service, ReviewEntity);
  }
}
