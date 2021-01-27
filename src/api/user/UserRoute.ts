import {
  AuthData,
  Authenticate,
  AuthService,
  BaseCrudController,
  BaseCrudRoute,
} from '@spetushkou/expressjs';
import { RequestHandler } from 'express';
import { UserEntity } from './UserEntity';

export class UserRoute extends BaseCrudRoute<UserEntity> {
  private authService: AuthService<UserEntity, AuthData>;

  constructor(
    controller: BaseCrudController<UserEntity>,
    authService: AuthService<UserEntity, AuthData>,
  ) {
    super(controller);
    this.authService = authService;
  }

  getBaseUrl(): string {
    return '/users';
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

  protected deleteByIdHandlers = (): RequestHandler[] => [
    Authenticate(this.authService),
    this.deleteById,
  ];
}
