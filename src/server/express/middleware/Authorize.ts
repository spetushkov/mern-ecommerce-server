import { BaseRequest, PermissionManager, ServerException } from '@spetushkou/api-expressjs';
import { NextFunction, RequestHandler, Response } from 'express';
import { ApiRole } from '../../../role/ApiRole';

export const Authorize = (
  role: ApiRole,
  permissionSchemaId: string,
  permission?: string,
): RequestHandler => (req: BaseRequest, res: Response, next: NextFunction) => {
  try {
    if (!PermissionManager.hasPermission(role, permissionSchemaId, permission)) {
      throw ServerException.InvalidAccessException();
    }

    next();
  } catch (error) {
    next(error);
  }
};
