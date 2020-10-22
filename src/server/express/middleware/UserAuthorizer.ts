import {
  AuthData,
  AuthService,
  AuthTokenResolver,
  AuthTokenService,
  BaseRequest,
  ServerException,
} from '@spetushkou/api-expressjs';
import { NextFunction, RequestHandler, Response } from 'express';
import { User } from '../../../domain/user/User';

export const UserAuthorizer = (authService: AuthService<User, AuthData>): RequestHandler => async (
  req: BaseRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = AuthTokenResolver.resolveFromRequestCookies(req);
    const payload = AuthTokenService.verify(token, authService.getSecret());
    const userEntity = await authService.findById(payload.userId);
    if (!userEntity) {
      throw ServerException.InvalidAuthenticationTokenException();
    }

    req.user = userEntity;
    next();
  } catch (error) {
    next(error);
  }
};
