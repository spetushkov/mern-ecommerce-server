import { Expose, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BaseDomainEntity } from '../BaseDomainEntity';
import { ReviewEntity } from '../review/ReviewEntity';
import { UserEntity } from '../user/UserEntity';
import { Product } from './Product';

export class ProductEntity extends BaseDomainEntity implements Product {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name = '';

  @Expose()
  @IsString()
  @IsNotEmpty()
  image = '';

  @Expose()
  @IsString()
  @IsNotEmpty()
  description = '';

  @Expose()
  @IsString()
  @IsNotEmpty()
  brand = '';

  @Expose()
  @IsString()
  @IsNotEmpty()
  category = '';

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  price = 0.0;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  countInStock = 0;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  rating = 0.0;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  numReviews = 0;

  @Expose()
  @Type(() => UserEntity)
  @IsMongoId()
  @IsNotEmpty()
  user: UserEntity | string = ''; // reference: Product MANY_TO_ONE User

  @Expose()
  @Type(() => ReviewEntity)
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  reviews?: ReviewEntity[] | string[]; // reference (embedded doc): Product ONE_TO_ONE Review

  constructor() {
    super();
  }

  getPrimaryKeys(): string[] {
    return [];
  }
}
