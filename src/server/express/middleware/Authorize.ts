import { BaseRequest, PermissionManager, ServerException } from '@spetushkou/api-expressjs';
import { NextFunction, RequestHandler, Response } from 'express';
import { UserEntity } from '../../../api/user/UserEntity';
import { RolesManager } from '../../../role/RolesManager';

export const Authorize = (scope: string, permission?: string): RequestHandler => (
  req: BaseRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user as UserEntity;
    if (!user || !user.roles || !permission) {
      throw ServerException.InvalidAccessException();
    }

    let result = false;
    for (const appRole of user.roles) {
      const role = RolesManager.get(appRole);
      if (PermissionManager.hasPermission(role, scope, permission)) {
        result = true;
        break;
      }
    }

    if (!result) {
      throw ServerException.InvalidAccessException();
    }
    next();
  } catch (error) {
    next(error);
  }
};
