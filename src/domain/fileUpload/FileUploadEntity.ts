import { Expose } from 'class-transformer';
import { BaseDomainEntity } from '../BaseDomainEntity';
import { FileUpload } from './FileUpload';

export class FileUploadEntity extends BaseDomainEntity implements FileUpload {
  @Expose()
  destination = '';

  @Expose()
  encoding = '';

  @Expose()
  fieldname = '';

  @Expose()
  filename = '';

  @Expose()
  mimetype = '';

  @Expose()
  originalname = '';

  @Expose()
  path = '';

  @Expose()
  size = 0;

  getPrimaryKeys(): string[] {
    return [];
  }
}
