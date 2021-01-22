import { AuthData, AuthService, BaseAuthController } from '@spetushkou/expressjs';
import { ClassTransformer } from '../../class/ClassTransformer';
import { UserEntity } from '../user/UserEntity';

export class JwtAuthController extends BaseAuthController<UserEntity> {
  constructor(service: AuthService<UserEntity, AuthData>) {
    super(service);
  }

  protected authCookieConfigHttpOnly(): boolean {
    return process.env.NODE_ENV !== 'development';
  }

  protected authCookieConfigSecure(): boolean {
    return process.env.NODE_ENV !== 'development';
  }

  protected normalize(entity: Object | null): UserEntity {
    return ClassTransformer.fromPlain(UserEntity, entity);
  }
}
