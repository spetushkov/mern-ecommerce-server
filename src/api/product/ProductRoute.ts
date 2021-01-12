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
import { AuthorizeDefault } from '../../server/express/middleware/AuthorizeDefault';
import { UserRoleValidator } from '../../server/express/middleware/UserAdminValidator';
import { FileController } from '../file/FileController';
import { UserEntity } from '../user/UserEntity';
import { ProductEntity } from './ProductEntity';

export class ProductRoute extends BaseCrudRoute<ProductEntity> {
  private authService: AuthService<UserEntity, AuthData>;
  private fileController: FileController;

  constructor(
    constroller: BaseCrudController<ProductEntity>,
    fileController: FileController,
    authService: AuthService<UserEntity, AuthData>,
  ) {
    super(constroller);
    this.fileController = fileController;
    this.authService = authService;

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

  protected findAllHandlers = (): RequestHandler[] => [
    AuthorizeDefault(PublicRole, 'product', 'findAll'),
    Authenticate(this.authService),
    AuthorizeDefault(AuthenticatedRole, 'product', 'findAll'),
    Authorize('product', 'findAll'),
    this.findAll,
  ];

  protected saveHandlers = (): RequestHandler[] => [
    Authenticate(this.authService),
    UserRoleValidator(),
    this.save,
  ];

  protected updateByIdHandlers = (): RequestHandler[] => [
    Authenticate(this.authService),
    UserRoleValidator(),
    this.updateById,
  ];

  protected deleteByIdHandlers = (): RequestHandler[] => [
    Authenticate(this.authService),
    UserRoleValidator(),
    this.deleteById,
  ];
}
