import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDomainEntity } from '../BaseDomainEntity';
import { FileUpload } from './FileUpload';

export class FileUploadEntity extends BaseDomainEntity implements FileUpload {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name = '';

  constructor() {
    super();
  }

  getPrimaryKeys(): string[] {
    return [];
  }
}
