import {
  AuthData,
  AuthService,
  BaseCrudController,
  BaseCrudRoute,
} from '@spetushkou/api-expressjs';
import { RequestHandler } from 'express';
import { UserAuthorizer } from '../../server/express/middleware/UserAuthorizer';
import { UserEntity } from '../user/UserEntity';
import { ProductEntity } from './ProductEntity';

export class ProductCrudRoute extends BaseCrudRoute<ProductEntity> {
  private authService: AuthService<UserEntity, AuthData>;

  constructor(
    constroller: BaseCrudController<ProductEntity>,
    authService: AuthService<UserEntity, AuthData>,
  ) {
    super(constroller);
    this.authService = authService;
  }

  getBaseUrl(): string {
    return '/products';
  }

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
