import {
  AuthData,
  AuthService,
  AuthTokenManager,
  AuthTokenService,
  BaseRequest,
  ServerException,
} from '@spetushkou/api-expressjs';
import { NextFunction, RequestHandler, Response } from 'express';
import { UserEntity } from '../../../api/user/UserEntity';

export const Authenticate = (
  authService: AuthService<UserEntity, AuthData>,
): RequestHandler => async (req: BaseRequest, res: Response, next: NextFunction) => {
  try {
    const token = AuthTokenManager.getFromRequest(req);
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
