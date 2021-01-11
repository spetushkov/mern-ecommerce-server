import { CrudService } from '@spetushkou/api-expressjs';
import { ClassTransformer } from '../../class/ClassTransformer';
import { BaseApiCrudController } from '../../controller/BaseApiCrudController';
import { ProductEntity } from './ProductEntity';
import { ProductQueryEntity } from './ProductQueryEntity';

export class ProductController extends BaseApiCrudController<ProductEntity> {
  constructor(service: CrudService<ProductEntity>) {
    super(service, ProductEntity);
  }

  protected normalizeRequestQueryParams(query: Object | null): Object | undefined {
    const queryEntity = ClassTransformer.fromPlain(ProductQueryEntity, query);
    if (queryEntity.keyword) {
      queryEntity.name = {
        $regex: queryEntity.keyword,
        $options: 'i',
      };
      delete queryEntity.keyword;
    }
    return queryEntity;
  }
}
