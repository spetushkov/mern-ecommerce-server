import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDomainEntity } from '../BaseDomainEntity';

export class Review extends BaseDomainEntity {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name = '';

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  rating = 0.0;

  @Expose()
  @IsString()
  @IsNotEmpty()
  comment = '';

  getPrimaryKeys(): string[] {
    return [];
  }
}
