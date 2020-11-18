import {
  AuthData,
  AuthService,
  BaseCrudController,
  BaseCrudRoute,
} from '@spetushkou/api-expressjs';
import { RequestHandler } from 'express';
import { UserAuthorizer } from '../../server/express/middleware/UserAuthorizer';
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
    UserAuthorizer(this.authService),
    this.findAll,
  ];

  protected findByIdHandlers = (): RequestHandler[] => [
    UserAuthorizer(this.authService),
    this.findById,
  ];

  protected saveHandlers = (): RequestHandler[] => [UserAuthorizer(this.authService), this.save];

  protected updateByIdHandlers = (): RequestHandler[] => [
    UserAuthorizer(this.authService),
    this.updateById,
  ];

  protected deleteByIdHandlers = (): RequestHandler[] => [
    UserAuthorizer(this.authService),
    this.deleteById,
  ];
}
