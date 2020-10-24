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
import { UserAuthController } from '../../domain/user/auth/UserAuthController';
import { UserAuthRoute } from '../../domain/user/auth/UserAuthRoute';
import { UserAuthService } from '../../domain/user/auth/UserAuthService';
import { UserMongoDbRepository } from '../../domain/user/mongodb/UserMongoDbRepository';
import { User } from '../../domain/user/User';
import { UserCrudController } from '../../domain/user/UserCrudController';
import { UserCrudRoute } from '../../domain/user/UserCrudRoute';
import { UserCrudService } from '../../domain/user/UserCrudService';

export class RoutesManager {
  private app: Application;

  private apiVersion: string;
  private baseUrl: string;
  private routes: Route[] = [];

  private userRepository: Repository<User>;
  private userService: BaseCrudService<User>;
  private userController: BaseCrudController<User>;
  private userRoute: UserCrudRoute;

  private authService: AuthService<User, AuthData>;
  private authController: AuthController;
  private authRoute: UserAuthRoute;

  constructor(app: Application) {
    this.app = app;

    this.apiVersion = process.env.API_VERSION || 'v1';
    this.baseUrl = `/${this.apiVersion}/api`;

    this.userRepository = new UserMongoDbRepository();
    this.userService = new UserCrudService(this.userRepository);
    this.userController = new UserCrudController(this.userService);
    this.userRoute = new UserCrudRoute(this.userController);
    this.register(this.userRoute);

    this.authService = new UserAuthService(this.userRepository);
    this.authController = new UserAuthController(this.authService);
    this.authRoute = new UserAuthRoute(this.authController);
    this.register(this.authRoute);
  }

  private register(route: Route) {
    this.routes.push(route);
  }

  connect(): void {
    this.routes.forEach((route) => this.app.use(`${this.baseUrl}`, route.getRoute()));

    this.app.use(RootRoute.getRoute());
    this.app.use(UndefinedRoute);
  }
}
