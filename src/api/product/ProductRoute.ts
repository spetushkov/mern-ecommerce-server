import {
  AuthData,
  Authenticate,
  Authorize,
  AuthorizeUser,
  AuthService,
  BaseCrudController,
  BaseCrudRoute,
} from '@spetushkou/expressjs';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { appContext } from '../../app/App';
import { Authenticated } from '../../role/default/Authenticated';
import { Public } from '../../role/default/Public';
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
    Authenticate(this.authService),
    AuthorizeUser(appContext.applicationRolesManager, this.permissionSchemaId, handlerId),
    this.save,
  ];

  protected updateByIdHandlers = (handlerId?: string): RequestHandler[] => [
    Authorize(Public, this.permissionSchemaId, handlerId),
    Authenticate(this.authService),
    Authorize(Authenticated, this.permissionSchemaId, handlerId),
    AuthorizeUser(appContext.applicationRolesManager, this.permissionSchemaId, handlerId),
    this.updateById,
  ];

  protected deleteByIdHandlers = (handlerId?: string): RequestHandler[] => [
    Authenticate(this.authService),
    AuthorizeUser(appContext.applicationRolesManager, this.permissionSchemaId, handlerId),
    this.deleteById,
  ];
}
