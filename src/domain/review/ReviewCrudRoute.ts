import {
  AuthData,
  AuthService,
  BaseCrudController,
  BaseCrudRoute,
} from '@spetushkou/api-expressjs';
import { RequestHandler } from 'express';
import { UserAuthenticator } from '../../server/express/middleware/UserAuthenticator';
import { UserEntity } from '../user/UserEntity';
import { ReviewEntity } from './ReviewEntity';

export class ReviewCrudRoute extends BaseCrudRoute<ReviewEntity> {
  private authService: AuthService<UserEntity, AuthData>;

  constructor(
    constroller: BaseCrudController<ReviewEntity>,
    authService: AuthService<UserEntity, AuthData>,
  ) {
    super(constroller);
    this.authService = authService;
  }

  getBaseUrl(): string {
    return '/reviews';
  }

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
