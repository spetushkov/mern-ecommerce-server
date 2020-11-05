import {
  AuthController,
  AuthData,
  AuthService,
  AuthToken,
  BaseController,
  Cookie,
  Header,
  ServerException,
  StatusCode,
  StatusCodeReason,
} from '@spetushkou/api-expressjs';
import { Request, Response } from 'express';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { UserEntity } from '../UserEntity';

export class UserAuthController extends BaseController<UserEntity> implements AuthController {
  private service: AuthService<UserEntity, AuthData>;

  constructor(service: AuthService<UserEntity, AuthData>) {
    super();
    this.service = service;
  }

  async signUp(req: Request, res: Response): Promise<void> {
    try {
      const entity = (await this.normalizeRequestBody(req.body, false)) as UserEntity;

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
      const entity = (await this.normalizeRequestBody(req.body, true)) as UserEntity;

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
      if (!response) {
        const error = ServerException.create(
          StatusCode.INTERNAL_SERVER_ERROR,
          StatusCodeReason.INTERNAL_SERVER_ERROR,
        );
        res.status(error.status).json(response);
        return;
      }

      if (response) {
        res.setHeader(Header.SET_COOKIE, [this.removeAuthCookie()]);
      }
      res.status(StatusCode.OK).json(response);
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

  protected normalize(entity: Object | null): UserEntity {
    return ClassTransformer.fromPlain(UserEntity, entity);
  }
}
