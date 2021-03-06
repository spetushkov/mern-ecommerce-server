import {
  AuthData,
  Authenticate,
  AuthService,
  BaseCrudController,
  BaseCrudRoute,
} from '@spetushkou/expressjs';
import { RequestHandler } from 'express';
import { UserEntity } from '../user/UserEntity';
import { OrderEntity } from './OrderEntity';

export class OrderRoute extends BaseCrudRoute<OrderEntity> {
  private authService: AuthService<UserEntity, AuthData>;

  constructor(
    controller: BaseCrudController<OrderEntity>,
    authService: AuthService<UserEntity, AuthData>,
  ) {
    super(controller);
    this.authService = authService;
  }

  getBaseUrl(): string {
    return '/orders';
  }

  protected findAllHandlers = (): RequestHandler[] => [
    Authenticate(this.authService),
    this.findAll,
  ];

  protected findByIdHandlers = (): RequestHandler[] => [
    Authenticate(this.authService),
    this.findById,
  ];

  protected saveHandlers = (): RequestHandler[] => [Authenticate(this.authService), this.save];

  protected updateByIdHandlers = (): RequestHandler[] => [
    Authenticate(this.authService),
    this.updateById,
  ];
}
