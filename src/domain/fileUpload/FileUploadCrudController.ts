import { CrudService } from '@spetushkou/api-expressjs';
import { BaseDomainCrudController } from '../../server/express/controller/BaseDomainCrudController';
import { FileUploadEntity } from './FileUploadEntity';

export class FileUploadCrudController extends BaseDomainCrudController<FileUploadEntity> {
  constructor(service: CrudService<FileUploadEntity>) {
    super(service, FileUploadEntity);
  }
}
