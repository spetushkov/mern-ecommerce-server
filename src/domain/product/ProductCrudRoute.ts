import {
  AuthData,
  AuthService,
  BaseCrudController,
  BaseCrudRoute,
} from '@spetushkou/api-expressjs';
import { RequestHandler } from 'express';
import { UserAuthorizer } from '../../server/express/middleware/UserAuthorizer';
import { User } from '../user/User';
import { Product } from './Product';

export class ProductCrudRoute extends BaseCrudRoute<Product> {
  private authService: AuthService<User, AuthData>;

  constructor(constroller: BaseCrudController<Product>, authService: AuthService<User, AuthData>) {
    super(constroller);
    this.authService = authService;
  }

  getBaseUrl(): string {
    return '/products';
  }

  protected allMutateHandlers = (): RequestHandler[] => [
    UserAuthorizer(this.authService),
    this.allMutate,
  ];
}
