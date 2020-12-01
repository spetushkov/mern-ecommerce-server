import {
  AuthData,
  AuthService,
  BaseCrudController,
  BaseCrudRoute,
} from '@spetushkou/api-expressjs';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserAdminValidator } from '../../server/express/middleware/UserAdminValidator';
import { UserAuthenticator } from '../../server/express/middleware/UserAuthenticator';
import { FileController } from '../file/FileController';
import { UserEntity } from '../user/UserEntity';
import { ProductEntity } from './ProductEntity';

export class ProductCrudRoute extends BaseCrudRoute<ProductEntity> {
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

  protected saveHandlers = (): RequestHandler[] => [
    UserAuthenticator(this.authService),
    UserAdminValidator(),
    this.save,
  ];

  protected updateByIdHandlers = (): RequestHandler[] => [
    UserAuthenticator(this.authService),
    UserAdminValidator(),
    this.updateById,
  ];

  protected deleteByIdHandlers = (): RequestHandler[] => [
    UserAuthenticator(this.authService),
    UserAdminValidator(),
    this.deleteById,
  ];
}
