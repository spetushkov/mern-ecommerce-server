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
import { FileController } from '../file/FileController';
import { UserEntity } from '../user/UserEntity';
import { ProductEntity } from './ProductEntity';

export class ProductRoute extends BaseCrudRoute<ProductEntity> {
  private authService: AuthService<UserEntity, AuthData>;
  private fileController: FileController;
  private modelId: string;

  constructor(
    constroller: BaseCrudController<ProductEntity>,
    fileController: FileController,
    authService: AuthService<UserEntity, AuthData>,
  ) {
    super(constroller);
    this.fileController = fileController;
    this.authService = authService;
    this.modelId = 'product';

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

  protected findAllHandlers = (handlerId?: string): RequestHandler[] => [
    AuthorizeDefault(PublicRole, this.modelId, handlerId),
    Authenticate(this.authService),
    AuthorizeDefault(AuthenticatedRole, this.modelId, handlerId),
    Authorize(this.modelId, handlerId),
    this.findAll,
  ];

  protected saveHandlers = (): RequestHandler[] => [Authenticate(this.authService), this.save];

  protected updateByIdHandlers = (): RequestHandler[] => [
    Authenticate(this.authService),
    this.updateById,
  ];

  protected deleteByIdHandlers = (): RequestHandler[] => [
    Authenticate(this.authService),
    this.deleteById,
  ];
}
