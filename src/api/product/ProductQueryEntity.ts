import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class ProductQueryEntity {
  @Expose()
  @IsOptional()
  name?: {
    $regex: string;
    $options: string;
  };

  @Expose()
  @IsOptional()
  keyword?: string;
}
