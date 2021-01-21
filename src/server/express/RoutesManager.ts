import {
  AuthController,
  AuthData,
  AuthService,
  BaseCrudController,
  BaseCrudService,
  Repository,
  RootRoute,
  Route,
  StaticFolderRegister,
  UndefinedRoute,
} from '@spetushkou/api-expressjs';
import { Application, Request, Response } from 'express';
import path from 'path';
import { JwtAuthController } from '../../api/auth/JwtAuthController';
import { JwtAuthRoute } from '../../api/auth/JwtAuthRoute';
import { JwtAuthService } from '../../api/auth/JwtAuthService';
import { ConfigController } from '../../api/config/ConfigController';
import { ConfigEntity } from '../../api/config/ConfigEntity';
import { ConfigEnvRepository } from '../../api/config/ConfigEnvRepository';
import { ConfigRoute } from '../../api/config/ConfigRoute';
import { ConfigService } from '../../api/config/ConfigService';
import { FileController } from '../../api/file/FileController';
import { FileRoute } from '../../api/file/FileRoute';
import { OrderMongoDbRepository } from '../../api/order/mongodb/OrderMongoDbRepository';
import { OrderController } from '../../api/order/OrderController';
import { OrderEntity } from '../../api/order/OrderEntity';
import { OrderRoute } from '../../api/order/OrderRoute';
import { OrderService } from '../../api/order/OrderService';
import { ProductMongoDbRepository } from '../../api/product/mongodb/ProductMongoDbRepository';
import { ProductController } from '../../api/product/ProductController';
import { ProductEntity } from '../../api/product/ProductEntity';
import { ProductRoute } from '../../api/product/ProductRoute';
import { ProductService } from '../../api/product/ProductService';
import { ReviewMongoDbRepository } from '../../api/review/mongodb/ReviewMongoDbRepository';
import { ReviewController } from '../../api/review/ReviewController';
import { ReviewEntity } from '../../api/review/ReviewEntity';
import { ReviewRoute } from '../../api/review/ReviewRoute';
import { ReviewService } from '../../api/review/ReviewService';
import { UserMongoDbRepository } from '../../api/user/mongodb/UserMongoDbRepository';
import { UserController } from '../../api/user/UserController';
import { UserEntity } from '../../api/user/UserEntity';
import { UserRoute } from '../../api/user/UserRoute';
import { UserService } from '../../api/user/UserService';

export class RoutesManager {
  private app: Application;

  private apiVersion: string;
  private baseUrl: string;
  private routes: Route[] = [];

  private userRepository: Repository<UserEntity>;
  private userService: BaseCrudService<UserEntity>;
  private userController: BaseCrudController<UserEntity>;
  private userRoute: UserRoute;

  private authService: AuthService<UserEntity, AuthData>;
  private authController: AuthController;
  private authRoute: JwtAuthRoute;

  private productRepository: Repository<ProductEntity>;
  private productService: BaseCrudService<ProductEntity>;
  private productController: BaseCrudController<ProductEntity>;
  private productRoute: ProductRoute;

  private orderRepository: Repository<OrderEntity>;
  private orderService: BaseCrudService<OrderEntity>;

  private orderController: BaseCrudController<OrderEntity>;
  private orderRoute: OrderRoute;

  private configRepository: Repository<ConfigEntity>;
  private configService: BaseCrudService<ConfigEntity>;
  private configController: BaseCrudController<ConfigEntity>;
  private configRoute: ConfigRoute;

  private fileController: FileController;
  private fileRoute: FileRoute;

  private reviewRepository: Repository<ReviewEntity>;
  private reviewService: BaseCrudService<ReviewEntity>;
  private reviewController: BaseCrudController<ReviewEntity>;
  private reviewRoute: ReviewRoute;

  constructor(app: Application) {
    this.app = app;
    this.apiVersion = process.env.API_VERSION || 'v1';
    this.baseUrl = `/${this.apiVersion}/api`;

    this.userRepository = new UserMongoDbRepository();

    this.fileController = new FileController();
    this.fileRoute = new FileRoute(this.fileController);
    this.register(this.fileRoute);

    this.authService = new JwtAuthService(this.userRepository);
    this.authController = new JwtAuthController(this.authService);
    this.authRoute = new JwtAuthRoute(this.authController);
    this.register(this.authRoute);

    this.userService = new UserService(this.userRepository);
    this.userController = new UserController(this.userService);
    this.userRoute = new UserRoute(this.userController, this.authService);
    this.register(this.userRoute);

    this.productRepository = new ProductMongoDbRepository();
    this.productService = new ProductService(this.productRepository);
    this.productController = new ProductController(this.productService);
    this.productRoute = new ProductRoute(
      this.productController,
      this.fileController,
      this.authService,
    );
    this.register(this.productRoute);

    this.orderRepository = new OrderMongoDbRepository();
    this.orderService = new OrderService(this.orderRepository);
    this.orderController = new OrderController(this.orderService);
    this.orderRoute = new OrderRoute(this.orderController, this.authService);
    this.register(this.orderRoute);

    this.configRepository = new ConfigEnvRepository();
    this.configService = new ConfigService(this.configRepository);
    this.configController = new ConfigController(this.configService);
    this.configRoute = new ConfigRoute(this.configController);
    this.register(this.configRoute);

    this.reviewRepository = new ReviewMongoDbRepository();
    this.reviewService = new ReviewService(this.reviewRepository, this.productRepository);
    this.reviewController = new ReviewController(this.reviewService);
    this.reviewRoute = new ReviewRoute(this.reviewController, this.authService);
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
