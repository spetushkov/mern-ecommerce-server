import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class OrderQueryEntity {
  @Expose()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  user?: string;

  @Expose()
  @Type(() => Boolean)
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  payOrder?: boolean;
}
