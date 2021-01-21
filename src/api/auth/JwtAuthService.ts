import { BaseAuthService, Repository } from '@spetushkou/api-expressjs';
import { ClassTransformer } from '../../class/ClassTransformer';
import { UserEntity } from '../user/UserEntity';

export class JwtAuthService extends BaseAuthService<UserEntity> {
  constructor(repository: Repository<UserEntity>) {
    super(repository);
  }

  protected normalize(entity: UserEntity | UserEntity[]): UserEntity | UserEntity[] {
    return ClassTransformer.trimExcluded(entity);
  }

  getSecret(): string {
    return process.env.JWT_SECRET || 'JWT_SECRET';
  }
}
