import { BooleanUtils } from '@spetushkou/api-expressjs';
import { Expose, Transform, Type } from 'class-transformer';

export class FileQueryEntity {
  @Expose()
  field = '';

  @Expose()
  @Type(() => Number)
  limitFileSize?: number;

  @Expose()
  @Transform((value: string) => {
    return BooleanUtils.fromString(value);
  })
  imageFileType?: boolean;
}
