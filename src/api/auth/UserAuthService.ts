import {
  AuthData,
  AuthResult,
  AuthService,
  AuthTokenService,
  PasswordService,
  Repository,
  ServerException,
} from '@spetushkou/api-expressjs';
import { ClassTransformer } from '../../class/ClassTransformer';
import { BaseApiCrudService } from '../../service/BaseApiCrudService';
import { UserEntity } from '../user/UserEntity';

export class UserAuthService
  extends BaseApiCrudService<UserEntity>
  implements AuthService<UserEntity, AuthData> {
  constructor(repository: Repository<UserEntity>) {
    super(repository);
  }

  async signUp(user: UserEntity): Promise<AuthResult<AuthData>> {
    try {
      const userUpdated = ClassTransformer.clone(user);
      userUpdated.password = await PasswordService.hash(user.password);

      const userEntity = await this.save(userUpdated);

      return Promise.resolve(new AuthResult(this.getAuthData(userEntity)));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async signIn(user: UserEntity): Promise<AuthResult<AuthData>> {
    try {
      const { email } = user;
      const userEntity = await this.repository.findOne({ email });
      if (!userEntity) {
        throw ServerException.InvalidCredentialsException();
      }

      if (!(await PasswordService.compare(user.password, userEntity.password))) {
        throw ServerException.InvalidCredentialsException();
      }

      return Promise.resolve(new AuthResult(this.getAuthData(userEntity)));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async signOut(): Promise<AuthResult<boolean>> {
    try {
      return Promise.resolve(new AuthResult(true));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findById(userId: string): Promise<UserEntity> {
    try {
      return await this.repository.findById(userId);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getSecret(): string {
    return process.env.JWT_SECRET || 'secret';
  }

  private getAuthData(userEntity: UserEntity): AuthData {
    return {
      user: this.normalize(userEntity) as UserEntity,
      authToken: AuthTokenService.create(userEntity, this.getSecret()),
    };
  }
}
