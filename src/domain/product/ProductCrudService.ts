import { BaseCrudService, Repository } from '@spetushkou/api-expressjs';
import { ClassTransformer } from '../../class/ClassTransformer';
import { Product } from './Product';

export class ProductCrudService extends BaseCrudService<Product> {
  constructor(repository: Repository<Product>) {
    super(repository);
  }

  protected normalize(entity: Product | Product[]): Product | Product[] {
    return ClassTransformer.trimExcluded(entity);
  }
}
