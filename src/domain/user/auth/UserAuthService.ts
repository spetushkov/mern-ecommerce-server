import {
  AuthData,
  AuthResult,
  AuthService,
  AuthTokenService,
  BaseCrudService,
  PasswordService,
  Repository,
  ServerException,
} from '@spetushkou/api-expressjs';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { User } from '../User';

export class UserAuthService extends BaseCrudService<User> implements AuthService<User, AuthData> {
  constructor(repository: Repository<User>) {
    super(repository);
  }

  async signUp(user: User): Promise<AuthResult<AuthData>> {
    try {
      const userUpdated = ClassTransformer.clone(user);
      userUpdated.password = await PasswordService.hash(user.password);

      const userEntity = await this.save(userUpdated);

      return Promise.resolve(new AuthResult(this.getAuthData(userEntity)));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async signIn(user: User): Promise<AuthResult<AuthData>> {
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

  async signOut(): Promise<boolean> {
    try {
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findById(userId: string): Promise<User> {
    try {
      return await this.repository.findById(userId);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  protected getCreatedBy(entity: User): string | undefined {
    return undefined;
  }

  protected getUpdatedBy(entity: User): string | undefined {
    return undefined;
  }

  getSecret(): string {
    return process.env.JWT_SECRET || 'secret';
  }

  private getAuthData(userEntity: User): AuthData {
    return {
      user: ClassTransformer.trimExcluded(userEntity),
      authToken: AuthTokenService.create(userEntity, this.getSecret()),
    };
  }
}
