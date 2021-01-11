import { PageRequest, Repository, ServerException, StatusCode } from '@spetushkou/api-expressjs';
import { BaseApiCrudService } from '../../service/BaseApiCrudService';
import { ProductEntity } from '../product/ProductEntity';
import { ReviewEntity } from './ReviewEntity';

export class ReviewService extends BaseApiCrudService<ReviewEntity> {
  private productRepository: Repository<ProductEntity>;

  constructor(repository: Repository<ReviewEntity>, productRepository: Repository<ProductEntity>) {
    super(repository);
    this.productRepository = productRepository;
  }

  protected async preSave(entity: ReviewEntity): Promise<ReviewEntity> {
    try {
      const productId = entity.product as string;
      if (!productId) {
        throw ServerException.create(StatusCode.BAD_REQUEST, 'Product is not defined');
      }

      const userId = entity.user as string;
      if (!userId) {
        throw ServerException.create(StatusCode.BAD_REQUEST, 'User is not defined');
      }

      const reviewEntities = await this.getReviews({
        user: userId,
        product: productId,
      });
      if (reviewEntities.length > 0) {
        throw ServerException.create(
          StatusCode.CONFLICT,
          'Product has already been reviewed by user',
        );
      }

      const productEntity = await this.productRepository.findById(productId);
      if (!productEntity) {
        throw ServerException.create(StatusCode.INTERNAL_SERVER_ERROR, 'Product was not found');
      }

      if (!entity.name) {
        entity.name = userId;
      }

      return this.onSave(entity);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  protected async postSave(entitySaved: ReviewEntity): Promise<void> {
    const productId = (entitySaved.product as ProductEntity).id;
    const productEntity = await this.productRepository.findById(productId);
    if (!productEntity) {
      throw ServerException.create(StatusCode.INTERNAL_SERVER_ERROR, 'Product was not found');
    }

    const productEntityUpdated: Partial<ProductEntity> = {};

    let reviews: string[] = [];
    if (productEntity.reviews) {
      reviews = [...productEntity.reviews] as string[];
    }
    reviews.push(entitySaved.id);

    productEntityUpdated.reviews = reviews;
    productEntityUpdated._reviews = reviews;
    productEntityUpdated.numReviews = reviews.length;

    const reviewEntities = await this.getReviews({
      product: productId,
    });
    productEntityUpdated.rating =
      reviewEntities.reduce((accumulator, reviewEntity) => accumulator + reviewEntity.rating, 0) /
      reviews.length;

    await this.productRepository.updateById(productId, productEntityUpdated);
  }

  private async getReviews(query: Partial<ReviewEntity>): Promise<ReviewEntity[]> {
    try {
      const pageRequest = new PageRequest(query);
      const result = await this.findAll(pageRequest);
      if (result.error) {
        return Promise.reject(result.error);
      }

      return Promise.resolve(result.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
