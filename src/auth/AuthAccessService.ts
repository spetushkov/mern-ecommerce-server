import { BaseEntity } from '@spetushkou/api-expressjs';
import { ClassTransformer } from '../class/ClassTransformer';
import { UserEntity } from '../domain/user/UserEntity';

export class AuthAccessService {
  static isAdmin(user?: BaseEntity): boolean {
    if (!user) {
      return false;
    }

    const userEntity = ClassTransformer.fromPlain(UserEntity, user);
    return !!userEntity.isAdmin;
  }
}
