import {
  AuthData,
  AuthService,
  BaseCrudController,
  BaseCrudRoute,
} from '@spetushkou/api-expressjs';
import { RequestHandler } from 'express';
import { UserAuthorizer } from '../../server/express/middleware/UserAuthorizer';
import { User } from '../user/User';
import { Task } from './Task';

export class TaskCrudRoute extends BaseCrudRoute<Task> {
  private authService: AuthService<User, AuthData>;

  constructor(constroller: BaseCrudController<Task>, authService: AuthService<User, AuthData>) {
    super(constroller);
    this.authService = authService;
  }

  getBaseUrl(): string {
    return '/tasks';
  }

  protected setAllHandlers = (): RequestHandler[] => [
    UserAuthorizer(this.authService),
    this.setAll,
  ];
}
