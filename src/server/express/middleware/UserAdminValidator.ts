import { BaseRequest, ServerException } from '@spetushkou/api-expressjs';
import { NextFunction, RequestHandler, Response } from 'express';
import { UserAuthorizationService } from '../../../api/auth/UserAuthorizationService';

export const UserRoleValidator = (): RequestHandler => (
  req: BaseRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!UserAuthorizationService.isAdmin(req.user)) {
      throw ServerException.InvalidAccessException();
    }

    next();
  } catch (error) {
    next(error);
  }
};
