import { BaseRequest, ServerException } from '@spetushkou/api-expressjs';
import { NextFunction, RequestHandler, Response } from 'express';
import { AuthAccessService } from '../../../auth/AuthAccessService';

export const UserAdminValidator = (): RequestHandler => (
  req: BaseRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!AuthAccessService.isAdmin(req.user)) {
      throw ServerException.InvalidAccessException();
    }

    next();
  } catch (error) {
    next(error);
  }
};
