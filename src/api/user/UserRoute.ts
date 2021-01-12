import {
  AuthData,
  AuthService,
  BaseCrudController,
  BaseCrudRoute,
} from '@spetushkou/api-expressjs';
import { RequestHandler } from 'express';
import { Authenticate } from '../../server/express/middleware/Authenticate';
import { UserRoleValidator } from '../../server/express/middleware/UserAdminValidator';
import { UserEntity } from './UserEntity';

export class UserRoute extends BaseCrudRoute<UserEntity> {
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
    Authenticate(this.authService),
    UserRoleValidator(),
    this.findAll,
  ];

  protected findByIdHandlers = (): RequestHandler[] => [
    Authenticate(this.authService),
    UserRoleValidator(),
    this.findById,
  ];

  protected saveHandlers = (): RequestHandler[] => [
    Authenticate(this.authService),
    UserRoleValidator(),
    this.save,
  ];

  protected updateByIdHandlers = (): RequestHandler[] => [
    Authenticate(this.authService),
    UserRoleValidator(),
    this.updateById,
  ];

  protected deleteByIdHandlers = (): RequestHandler[] => [
    Authenticate(this.authService),
    UserRoleValidator(),
    this.deleteById,
  ];
}
