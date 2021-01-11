import {
  AuthController,
  AuthData,
  AuthService,
  BaseCrudController,
  BaseCrudService,
  Repository,
  RootRoute,
  Route,
  UndefinedRoute,
} from '@spetushkou/api-expressjs';
import { Application, Request, Response } from 'express';
import path from 'path';
import { UserAuthController } from '../../api/auth/UserAuthController';
import { UserAuthRoute } from '../../api/auth/UserAuthRoute';
import { UserAuthService } from '../../api/auth/UserAuthService';
import { ConfigCrudController } from '../../api/config/ConfigCrudController';
import { ConfigCrudRoute } from '../../api/config/ConfigCrudRoute';
import { ConfigCrudService } from '../../api/config/ConfigCrudService';
import { ConfigEntity } from '../../api/config/ConfigEntity';
import { ConfigEnvRepository } from '../../api/config/ConfigEnvRepository';
import { FileController } from '../../api/file/FileController';
import { FileRoute } from '../../api/file/FileRoute';
import { OrderMongoDbRepository } from '../../api/order/mongodb/OrderMongoDbRepository';
import { OrderCrudController } from '../../api/order/OrderCrudController';
import { OrderCrudRoute } from '../../api/order/OrderCrudRoute';
import { OrderCrudService } from '../../api/order/OrderCrudService';
import { OrderEntity } from '../../api/order/OrderEntity';
import { ProductMongoDbRepository } from '../../api/product/mongodb/ProductMongoDbRepository';
import { ProductCrudController } from '../../api/product/ProductCrudController';
import { ProductCrudRoute } from '../../api/product/ProductCrudRoute';
import { ProductCrudService } from '../../api/product/ProductCrudService';
import { ProductEntity } from '../../api/product/ProductEntity';
import { ReviewMongoDbRepository } from '../../api/review/mongodb/ReviewMongoDbRepository';
import { ReviewCrudController } from '../../api/review/ReviewCrudController';
import { ReviewCrudRoute } from '../../api/review/ReviewCrudRoute';
import { ReviewCrudService } from '../../api/review/ReviewCrudService';
import { ReviewEntity } from '../../api/review/ReviewEntity';
import { UserMongoDbRepository } from '../../api/user/mongodb/UserMongoDbRepository';
import { UserCrudController } from '../../api/user/UserCrudController';
import { UserCrudRoute } from '../../api/user/UserCrudRoute';
import { UserCrudService } from '../../api/user/UserCrudService';
import { UserEntity } from '../../api/user/UserEntity';
import { StaticFolderRegister } from './middleware/StaticFolderRegister';

export class RoutesManager {
  private app: Application;

  private apiVersion: string;
  private baseUrl: string;
  private routes: Route[] = [];

  private userRepository: Repository<UserEntity>;
  private userService: BaseCrudService<UserEntity>;
  private userController: BaseCrudController<UserEntity>;
  private userRoute: UserCrudRoute;

  private authService: AuthService<UserEntity, AuthData>;
  private authController: AuthController;
  private authRoute: UserAuthRoute;

  private productRepository: Repository<ProductEntity>;
  private productService: BaseCrudService<ProductEntity>;
  private productController: BaseCrudController<ProductEntity>;
  private productRoute: ProductCrudRoute;

  private orderRepository: Repository<OrderEntity>;
  private orderService: BaseCrudService<OrderEntity>;
  private orderController: BaseCrudController<OrderEntity>;
  private orderRoute: OrderCrudRoute;

  private configRepository: Repository<ConfigEntity>;
  private configService: BaseCrudService<ConfigEntity>;
  private configController: BaseCrudController<ConfigEntity>;
  private configRoute: ConfigCrudRoute;

  private fileController: FileController;
  private fileRoute: FileRoute;

  private reviewRepository: Repository<ReviewEntity>;
  private reviewService: BaseCrudService<ReviewEntity>;
  private reviewController: BaseCrudController<ReviewEntity>;
  private reviewRoute: ReviewCrudRoute;

  constructor(app: Application) {
    this.app = app;
    this.apiVersion = process.env.API_VERSION || 'v1';
    this.baseUrl = `/${this.apiVersion}/api`;

    this.userRepository = new UserMongoDbRepository();

    this.fileController = new FileController();
    this.fileRoute = new FileRoute(this.fileController);
    this.register(this.fileRoute);

    this.authService = new UserAuthService(this.userRepository);
    this.authController = new UserAuthController(this.authService);
    this.authRoute = new UserAuthRoute(this.authController);
    this.register(this.authRoute);

    this.userService = new UserCrudService(this.userRepository);
    this.userController = new UserCrudController(this.userService);
    this.userRoute = new UserCrudRoute(this.userController, this.authService);
    this.register(this.userRoute);

    this.productRepository = new ProductMongoDbRepository();
    this.productService = new ProductCrudService(this.productRepository);
    this.productController = new ProductCrudController(this.productService);
    this.productRoute = new ProductCrudRoute(
      this.productController,
      this.fileController,
      this.authService,
    );
    this.register(this.productRoute);

    this.orderRepository = new OrderMongoDbRepository();
    this.orderService = new OrderCrudService(this.orderRepository);
    this.orderController = new OrderCrudController(this.orderService);
    this.orderRoute = new OrderCrudRoute(this.orderController, this.authService);
    this.register(this.orderRoute);

    this.configRepository = new ConfigEnvRepository();
    this.configService = new ConfigCrudService(this.configRepository);
    this.configController = new ConfigCrudController(this.configService);
    this.configRoute = new ConfigCrudRoute(this.configController);
    this.register(this.configRoute);

    this.reviewRepository = new ReviewMongoDbRepository();
    this.reviewService = new ReviewCrudService(this.reviewRepository, this.productRepository);
    this.reviewController = new ReviewCrudController(this.reviewService);
    this.reviewRoute = new ReviewCrudRoute(this.reviewController, this.authService);
    this.register(this.reviewRoute);
  }

  private register(route: Route) {
    this.routes.push(route);
  }

  connect(): void {
    this.routes.forEach((route) => this.app.use(`${this.baseUrl}`, route.registerRoutes()));
    this.registerProductionClientRoute();
    this.app.use(RootRoute.registerRoutes());
    this.app.use(UndefinedRoute);
  }

  registerProductionClientRoute = (): void => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    const clientBuildPath = process.env.CLIENT_BUILD_PATH || '/';
    this.app.use(StaticFolderRegister(`${clientBuildPath}`));

    this.app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(path.resolve(), clientBuildPath, 'index.html'));
    });
  };
}
