import {
  AuthData,
  AuthService,
  BaseCrudController,
  BaseCrudRoute,
} from '@spetushkou/api-expressjs';
import { RequestHandler } from 'express';
import { FileUploader } from '../../server/express/middleware/FileUploader';
import { UserEntity } from '../user/UserEntity';
import { FileUploadEntity } from './FileUploadEntity';

export class FileUploadCrudRoute extends BaseCrudRoute<FileUploadEntity> {
  private authService: AuthService<UserEntity, AuthData>;

  constructor(
    constroller: BaseCrudController<FileUploadEntity>,
    authService: AuthService<UserEntity, AuthData>,
  ) {
    super(constroller);
    this.authService = authService;
  }

  getBaseUrl(): string {
    return '/fileuploads';
  }

  protected saveHandlers = (): RequestHandler[] => [
    // UserAuthenticator(this.authService),
    // UserAdminValidator(),
    FileUploader('image'),
    this.save,
  ];
}
