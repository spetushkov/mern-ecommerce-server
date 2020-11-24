import { BaseRequest, CrudService, ServerException } from '@spetushkou/api-expressjs';
import { Response } from 'express';
import { ClassTransformer } from '../../class/ClassTransformer';
import { BaseDomainCrudController } from '../../server/express/controller/BaseDomainCrudController';
import { OrderEntity } from './OrderEntity';
import { OrderQueryEntity } from './OrderQueryEntity';

export class OrderCrudController extends BaseDomainCrudController<OrderEntity> {
  constructor(service: CrudService<OrderEntity>) {
    super(service, OrderEntity);
  }

  protected preFindAll(req: BaseRequest): void {
    this.insertUserIdToRequestQuery(req);
  }

  protected preFindById(req: BaseRequest): void {
    this.insertUserIdToRequestQuery(req);
  }

  protected preSave(req: BaseRequest, entity: OrderEntity): OrderEntity {
    return this.insertUserIdToEntity(req, entity);
  }

  protected preUpdate(req: BaseRequest, entity: OrderEntity): OrderEntity {
    this.insertUserIdToRequestQuery(req);

    // pay order with PayPal handler
    const query = ClassTransformer.fromPlain(OrderQueryEntity, req.query);
    if (
      query.payOrder &&
      entity.paymentResult &&
      entity.paymentResult.id &&
      entity.paymentResult.status === 'COMPLETED'
    ) {
      const entityUpdated = ClassTransformer.clone(entity);
      entityUpdated.isPaid = true;
      entityUpdated.paidAt = new Date();
      return entityUpdated;
    }

    return entity;
  }

  private insertUserIdToRequestQuery(req: BaseRequest): void {
    const userId = this.getUserId(req);
    if (!userId) {
      return;
    }

    req.query = {
      ...req.query,
      user: userId,
    };
  }

  private insertUserIdToEntity(req: BaseRequest, entity: OrderEntity): OrderEntity {
    const userId = this.getUserId(req);
    if (!userId) {
      return entity;
    }

    const entityUpdated = ClassTransformer.clone(entity);
    entityUpdated.user = userId;
    return entityUpdated;
  }

  private getUserId(req: BaseRequest): string | null {
    return req.user ? req.user.id : null;
  }

  deleteById(req: BaseRequest, res: Response): Promise<void> {
    throw ServerException.MethodNotAllowedException();
  }

  protected normalizeRequestQueryParams(query: Object | null): Partial<OrderEntity> {
    return ClassTransformer.fromPlain(OrderQueryEntity, query);
  }
}
