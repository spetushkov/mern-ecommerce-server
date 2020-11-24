import {
  AuthData,
  AuthService,
  BaseCrudController,
  BaseCrudRoute,
} from '@spetushkou/api-expressjs';
import { RequestHandler } from 'express';
import { AdminAuthenticator } from '../../server/express/middleware/auth/AdminAuthenticator';
import { UserAuthenticator } from '../../server/express/middleware/auth/UserAuthenticator';
import { UserEntity } from './UserEntity';

export class UserCrudRoute extends BaseCrudRoute<UserEntity> {
  private authService: AuthService<UserEntity, AuthData>;

  constructor(
    constroller: BaseCrudController<UserEntity>,
    authService: AuthService<UserEntity, AuthData>,
  ) {
    super(constroller);
    this.authService = authService;
  }

  getBaseUrl(): string {
    return '/users';
  }

  protected findAllHandlers = (): RequestHandler[] => [
    UserAuthenticator(this.authService),
    AdminAuthenticator(),
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

  protected deleteByIdHandlers = (): RequestHandler[] => [
    UserAuthenticator(this.authService),
    this.deleteById,
  ];
}
