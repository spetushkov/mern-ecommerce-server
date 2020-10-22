import {
  AuthController,
  AuthData,
  AuthService,
  AuthToken,
  BaseController,
  Cookie,
  Header,
  StatusCode,
} from '@spetushkou/api-expressjs';
import { Request, Response } from 'express';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { User } from '../User';

export class UserAuthController extends BaseController<User> implements AuthController {
  private service: AuthService<User, AuthData>;

  constructor(service: AuthService<User, AuthData>) {
    super();
    this.service = service;
  }

  async signUp(req: Request, res: Response): Promise<void> {
    try {
      const entity = (await this.normalizeRequestBody(req.body, false)) as User;

      const response = await this.service.signUp(entity);
      const { error, data } = response;
      if (error) {
        res.status(error.status).json(response);
        return;
      }

      if (data) {
        res.setHeader(Header.SET_COOKIE, [this.createAuthCookie(data.authToken)]);
      }
      res.status(StatusCode.OK).json(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async signIn(req: Request, res: Response): Promise<void> {
    try {
      const entity = (await this.normalizeRequestBody(req.body, true)) as User;

      const response = await this.service.signIn(entity);
      const { error, data } = response;
      if (error) {
        res.status(error.status).json(response);
        return;
      }

      if (data) {
        res.setHeader(Header.SET_COOKIE, [this.createAuthCookie(data.authToken)]);
      }
      res.status(StatusCode.OK).json(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async signOut(req: Request, res: Response): Promise<void> {
    try {
      const response = await this.service.signOut();
      if (response) {
        res.setHeader(Header.SET_COOKIE, [this.removeAuthCookie()]);
      }
      res.status(StatusCode.NO_CONTENT).send();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private createAuthCookie(token: AuthToken): string {
    return `${Cookie.AUTHORIZATION}=${token.token}; HttpOnly; Max-Age=${token.expiresIn}`;
  }

  private removeAuthCookie(): string {
    return `${Cookie.AUTHORIZATION}=; Max-Age=0`;
  }

  protected fromPlain(entity: Object | null): User {
    return ClassTransformer.fromPlain(User, entity);
  }
}
