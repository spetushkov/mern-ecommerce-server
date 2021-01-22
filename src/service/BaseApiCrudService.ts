import { BaseCrudService, Repository } from '@spetushkou/expressjs';
import { ClassTransformer } from '../class/ClassTransformer';
import { BaseApiEntity } from '../entity/BaseApiEntity';

export class BaseApiCrudService<T extends BaseApiEntity> extends BaseCrudService<T> {
  constructor(repository: Repository<T>) {
    super(repository);
  }

  protected normalize(entity: T | T[]): T | T[] {
    return ClassTransformer.trimExcluded(entity);
  }
}
