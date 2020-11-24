import { BaseRequest, ServerException } from '@spetushkou/api-expressjs';
import { NextFunction, RequestHandler, Response } from 'express';
import { ClassTransformer } from '../../../../class/ClassTransformer';
import { UserEntity } from '../../../../domain/user/UserEntity';

export const AdminAuthenticator = (): RequestHandler => async (
  req: BaseRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw ServerException.InvalidAccessException();
    }

    const user = ClassTransformer.fromPlain(UserEntity, req.user);
    if (!user.isAdmin) {
      throw ServerException.InvalidAccessException();
    }

    next();
  } catch (error) {
    next(error);
  }
};
