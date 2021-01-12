import { BaseRequest, PermissionManager, ServerException } from '@spetushkou/api-expressjs';
import { NextFunction, RequestHandler, Response } from 'express';
import { ApiRole } from '../../../role/ApiRole';

export const AuthorizeDefault = (
  role: ApiRole,
  scope: string,
  permission: string,
): RequestHandler => (req: BaseRequest, res: Response, next: NextFunction) => {
  try {
    if (!PermissionManager.hasPermission(role, scope, permission)) {
      throw ServerException.InvalidAccessException();
    }

    next();
  } catch (error) {
    next(error);
  }
};
