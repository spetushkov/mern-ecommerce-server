import { BaseCrudController, CrudService } from '@spetushkou/expressjs';
import { ClassTransformer, Clazz } from '../class/ClassTransformer';
import { BaseApiEntity } from '../entity/BaseApiEntity';

export class BaseApiCrudController<T extends BaseApiEntity> extends BaseCrudController<T> {
  private entityClass: Clazz<T>;

  constructor(service: CrudService<T>, entityClass: Clazz<T>) {
    super(service);
    this.entityClass = entityClass;
  }

  protected normalize(entity: Object | null): T {
    return ClassTransformer.fromPlain(this.entityClass, entity);
  }
}
