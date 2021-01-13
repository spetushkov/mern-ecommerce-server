import {
  AuthData,
  AuthService,
  BaseCrudController,
  BaseCrudRoute,
} from '@spetushkou/api-expressjs';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AuthenticatedRole } from '../../role/system/AuthenticatedRole';
import { PublicRole } from '../../role/system/PublicRole';
import { Authenticate } from '../../server/express/middleware/Authenticate';
import { Authorize } from '../../server/express/middleware/Authorize';
import { AuthorizeUser } from '../../server/express/middleware/AuthorizeUser';
import { FileController } from '../file/FileController';
import { UserEntity } from '../user/UserEntity';
import { ProductEntity } from './ProductEntity';

export class ProductRoute extends BaseCrudRoute<ProductEntity> {
  private authService: AuthService<UserEntity, AuthData>;
  private fileController: FileController;
  private permissionSchemaId: string;

  constructor(
    constroller: BaseCrudController<ProductEntity>,
    fileController: FileController,
    authService: AuthService<UserEntity, AuthData>,
  ) {
    super(constroller);
    this.fileController = fileController;
    this.authService = authService;
    this.permissionSchemaId = 'product';

    this.registerAdditionalRoutes();
  }

  private registerAdditionalRoutes() {
    this.router.post(`${this.getBaseUrl()}/upload`, [this.upload]);
  }

  private upload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.fileController.upload(req, res);
    } catch (error) {
      next(error);
    }
  };

  getBaseUrl(): string {
    return '/products';
  }

  protected saveHandlers = (handlerId?: string): RequestHandler[] => [
    Authorize(PublicRole, this.permissionSchemaId, handlerId),
    Authenticate(this.authService),
    Authorize(AuthenticatedRole, this.permissionSchemaId, handlerId),
    AuthorizeUser(this.permissionSchemaId, handlerId),
    this.save,
  ];

  protected updateByIdHandlers = (handlerId?: string): RequestHandler[] => [
    Authorize(PublicRole, this.permissionSchemaId, handlerId),
    Authenticate(this.authService),
    Authorize(AuthenticatedRole, this.permissionSchemaId, handlerId),
    AuthorizeUser(this.permissionSchemaId, handlerId),
    this.updateById,
  ];

  protected deleteByIdHandlers = (handlerId?: string): RequestHandler[] => [
    Authorize(PublicRole, this.permissionSchemaId, handlerId),
    Authenticate(this.authService),
    Authorize(AuthenticatedRole, this.permissionSchemaId, handlerId),
    AuthorizeUser(this.permissionSchemaId, handlerId),
    this.deleteById,
  ];
}
