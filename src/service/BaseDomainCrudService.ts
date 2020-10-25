import { BaseCrudService, BaseEntity, Repository } from '@spetushkou/api-expressjs';
import { ClassTransformer } from '../class/ClassTransformer';

export class BaseDomainCrudService<T extends BaseEntity> extends BaseCrudService<T> {
  constructor(repository: Repository<T>) {
    super(repository);
  }

  protected normalize(entity: T | T[]): T | T[] {
    return ClassTransformer.trimExcluded(entity);
  }
}
