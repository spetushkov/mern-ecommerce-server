import { Expose, Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseApiEntity } from '../../entity/BaseApiEntity';
import { ProductEntity } from '../product/ProductEntity';
import { UserEntity } from '../user/UserEntity';
import { Review } from './Review';

export class ReviewEntity extends BaseApiEntity implements Review {
  @Expose()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  rating = 0.0;

  @Expose()
  @IsString()
  @IsNotEmpty()
  comment = '';

  @Expose()
  @Type(() => UserEntity)
  @IsMongoId()
  @IsNotEmpty()
  user: UserEntity | string = ''; // reference: Review MANY_TO_ONE User

  @Expose()
  @Type(() => ProductEntity)
  @IsMongoId()
  @IsNotEmpty()
  product: ProductEntity | string = ''; // reference: Review MANY_TO_ONE Product

  getPrimaryKeys(): string[] {
    return [];
  }
}
