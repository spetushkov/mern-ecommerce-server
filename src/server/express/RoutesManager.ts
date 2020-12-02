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
import { Application } from 'express';
import { ConfigCrudController } from '../../domain/config/ConfigCrudController';
import { ConfigCrudRoute } from '../../domain/config/ConfigCrudRoute';
import { ConfigCrudService } from '../../domain/config/ConfigCrudService';
import { ConfigEntity } from '../../domain/config/ConfigEntity';
import { ConfigEnvRepository } from '../../domain/config/ConfigEnvRepository';
import { FileController } from '../../domain/file/FileController';
import { FileRoute } from '../../domain/file/FileRoute';
import { OrderMongoDbRepository } from '../../domain/order/mongodb/OrderMongoDbRepository';
import { OrderCrudController } from '../../domain/order/OrderCrudController';
import { OrderCrudRoute } from '../../domain/order/OrderCrudRoute';
import { OrderCrudService } from '../../domain/order/OrderCrudService';
import { OrderEntity } from '../../domain/order/OrderEntity';
import { ProductMongoDbRepository } from '../../domain/product/mongodb/ProductMongoDbRepository';
import { ProductCrudController } from '../../domain/product/ProductCrudController';
import { ProductCrudRoute } from '../../domain/product/ProductCrudRoute';
import { ProductCrudService } from '../../domain/product/ProductCrudService';
import { ProductEntity } from '../../domain/product/ProductEntity';
import { ReviewMongoDbRepository } from '../../domain/review/mongodb/ReviewMongoDbRepository';
import { ReviewCrudController } from '../../domain/review/ReviewCrudController';
import { ReviewCrudRoute } from '../../domain/review/ReviewCrudRoute';
import { ReviewCrudService } from '../../domain/review/ReviewCrudService';
import { ReviewEntity } from '../../domain/review/ReviewEntity';
import { UserAuthController } from '../../domain/user/auth/UserAuthController';
import { UserAuthRoute } from '../../domain/user/auth/UserAuthRoute';
import { UserAuthService } from '../../domain/user/auth/UserAuthService';
import { UserMongoDbRepository } from '../../domain/user/mongodb/UserMongoDbRepository';
import { UserCrudController } from '../../domain/user/UserCrudController';
import { UserCrudRoute } from '../../domain/user/UserCrudRoute';
import { UserCrudService } from '../../domain/user/UserCrudService';
import { UserEntity } from '../../domain/user/UserEntity';

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

    this.app.use(RootRoute.registerRoutes());
    this.app.use(UndefinedRoute);
  }
}
