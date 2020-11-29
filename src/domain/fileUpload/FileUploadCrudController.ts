import {
  BaseRequest,
  BaseResult,
  CrudService,
  ServerException,
  StatusCode,
} from '@spetushkou/api-expressjs';
import { Response } from 'express';
import { ClassTransformer } from '../../class/ClassTransformer';
import { BaseDomainCrudController } from '../../server/express/controller/BaseDomainCrudController';
import { FileUploadEntity } from './FileUploadEntity';

export class FileUploadCrudController extends BaseDomainCrudController<FileUploadEntity> {
  constructor(service: CrudService<FileUploadEntity>) {
    super(service, FileUploadEntity);
  }

  async save(req: BaseRequest, res: Response): Promise<void> {
    try {
      if (!req.file) {
        throw ServerException.NotFoundException();
      }

      const fileUploadEntity = ClassTransformer.fromPlain(FileUploadEntity, req.file);

      const response = new BaseResult(`/${fileUploadEntity.path}`);
      res.status(StatusCode.CREATED).json(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
