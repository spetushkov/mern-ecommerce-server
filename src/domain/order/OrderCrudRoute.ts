import {
  AuthData,
  AuthService,
  BaseCrudController,
  BaseCrudRoute,
} from '@spetushkou/api-expressjs';
import { RequestHandler } from 'express';
import { UserAuthenticator } from '../../server/express/middleware/UserAuthenticator';
import { UserEntity } from '../user/UserEntity';
import { OrderEntity } from './OrderEntity';

export class OrderCrudRoute extends BaseCrudRoute<OrderEntity> {
  private authService: AuthService<UserEntity, AuthData>;

  constructor(
    constroller: BaseCrudController<OrderEntity>,
    authService: AuthService<UserEntity, AuthData>,
  ) {
    super(constroller);
    this.authService = authService;
  }

  getBaseUrl(): string {
    return '/orders';
  }

  protected findAllHandlers = (): RequestHandler[] => [
    UserAuthenticator(this.authService),
    this.findAll,
  ];

  protected findByIdHandlers = (): RequestHandler[] => [
    UserAuthenticator(this.authService),
    this.findById,
  ];

  protected saveHandlers = (): RequestHandler[] => [UserAuthenticator(this.authService), this.save];

  protected updateByIdHandlers = (): RequestHandler[] => [
    UserAuthenticator(this.authService),
    this.updateById,
  ];
}
