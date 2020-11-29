import {
  AuthData,
  AuthService,
  BaseCrudController,
  BaseCrudRoute,
  ServerException,
} from '@spetushkou/api-expressjs';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { UserEntity } from '../user/UserEntity';
import { FileUploadEntity } from './FileUploadEntity';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'fileUploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const checkFileType = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname.toLocaleLowerCase()));
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only!'));
  }
};

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

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
    upload.single('image'),
    this.save,
  ];

  findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    throw ServerException.MethodNotAllowedException();
  };

  findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    throw ServerException.MethodNotAllowedException();
  };

  save = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.send(`/${req.file.path}`);
    } catch (error) {
      next(error);
    }
  };

  updateById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    throw ServerException.MethodNotAllowedException();
  };

  deleteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    throw ServerException.MethodNotAllowedException();
  };
}
