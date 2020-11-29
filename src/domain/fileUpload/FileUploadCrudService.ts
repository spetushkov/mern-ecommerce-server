import { Repository } from '@spetushkou/api-expressjs';
import { BaseDomainCrudService } from '../../service/BaseDomainCrudService';
import { FileUploadEntity } from './FileUploadEntity';

export class FileUploadCrudService extends BaseDomainCrudService<FileUploadEntity> {
  constructor(repository: Repository<FileUploadEntity>) {
    super(repository);
  }
}
