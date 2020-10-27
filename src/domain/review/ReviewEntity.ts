import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Review } from '../../shared/Review';
import { BaseDomainEntity } from '../BaseDomainEntity';

export class ReviewEntity extends BaseDomainEntity implements Review {
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
