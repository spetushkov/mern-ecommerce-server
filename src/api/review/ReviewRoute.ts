import {
  AuthData,
  Authenticate,
  AuthService,
  BaseCrudController,
  BaseCrudRoute,
} from '@spetushkou/expressjs';
import { RequestHandler } from 'express';
import { UserEntity } from '../user/UserEntity';
import { ReviewEntity } from './ReviewEntity';

export class ReviewRoute extends BaseCrudRoute<ReviewEntity> {
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
