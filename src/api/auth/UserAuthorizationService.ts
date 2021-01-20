import { BaseEntity } from '@spetushkou/api-expressjs';

export class UserAuthorizationService {
  static isAdmin(user?: BaseEntity): boolean {
    if (!user) {
      return false;
    }

    return false;

    // const userEntity = ClassTransformer.fromPlain(UserEntity, user);
    // return !!userEntity.isAdmin;
  }
}
