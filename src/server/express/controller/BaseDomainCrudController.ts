import { BaseCrudController, CrudService, Entity } from '@spetushkou/api-expressjs';
import { ClassTransformer, Clazz } from '../../../class/ClassTransformer';

export class BaseDomainCrudController<T extends Entity> extends BaseCrudController<T> {
  private entityClass: Clazz<T>;

  constructor(service: CrudService<T>, entityClass: Clazz<T>) {
    super(service);
    this.entityClass = entityClass;
  }

  protected normalize(entity: Object | null): T {
    return ClassTransformer.fromPlain(this.entityClass, entity);
  }
}
