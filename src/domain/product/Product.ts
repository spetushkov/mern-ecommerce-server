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
import { Review } from '../review/Review';
import { User } from '../user/User';

export class Product extends BaseDomainEntity {
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
  @IsMongoId()
  @IsNotEmpty()
  user: User | string = ''; // reference: Product MANY_TO_ONE User

  @Expose()
  @Type(() => Review)
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  reviews?: Review[] | string[]; // reference (embedded doc): Product ONE_TO_ONE Review

  constructor() {
    super();
  }

  getPrimaryKeys(): string[] {
    return [];
  }
}
