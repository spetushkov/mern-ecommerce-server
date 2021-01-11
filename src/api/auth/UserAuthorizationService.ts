import { BaseEntity } from '@spetushkou/api-expressjs';
import { ClassTransformer } from '../../class/ClassTransformer';
import { UserEntity } from '../user/UserEntity';

export class UserAuthorizationService {
  static isAdmin(user?: BaseEntity): boolean {
    if (!user) {
      return false;
    }

    const userEntity = ClassTransformer.fromPlain(UserEntity, user);
    return !!userEntity.isAdmin;
  }
}
