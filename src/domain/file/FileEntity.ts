import { Expose } from 'class-transformer';

export class FileEntity implements Partial<Express.Multer.File> {
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
}
