import {
  AuthController,
  AuthData,
  AuthService,
  AuthToken,
  BaseController,
  Cookie,
  ServerException,
  StatusCode,
  StatusCodeReason,
} from '@spetushkou/api-expressjs';
import { Request, Response } from 'express';
import { ClassTransformer } from '../../class/ClassTransformer';
import { UserEntity } from '../user/UserEntity';

export class JwtAuthController extends BaseController<UserEntity> implements AuthController {
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
        this.createAuthCookie(res, data.authToken);
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
        this.createAuthCookie(res, data.authToken);
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
        this.removeAuthCookie(res);
      }
      res.status(StatusCode.OK).json(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private createAuthCookie(res: Response, authToken: AuthToken): void {
    res.cookie(Cookie.AUTHORIZATION, authToken.token, this.getAuthCookieConfig(authToken));
  }

  private removeAuthCookie(res: Response): void {
    res.clearCookie(Cookie.AUTHORIZATION, this.getAuthCookieConfig());
  }

  private getAuthCookieConfig(authToken?: AuthToken) {
    return {
      path: '/',
      maxAge: authToken ? authToken.expiresIn * 1000 : 0, // seconds to milliseconds
      httpOnly: process.env.NODE_ENV !== 'development',
      secure: process.env.NODE_ENV !== 'development',
      sameSite: true,
    };
  }

  protected normalize(entity: Object | null): UserEntity {
    return ClassTransformer.fromPlain(UserEntity, entity);
  }
}
