import { MongoDbUtils } from '@spetushkou/expressjs';
import { Expose, Transform, Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { BaseApiEntity } from '../../entity/BaseApiEntity';
import { ReviewEntity } from '../review/ReviewEntity';
import { UserEntity } from '../user/UserEntity';
import { Product } from './Product';

export class ProductEntity extends BaseApiEntity implements Product {
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
  @Type(() => ObjectId)
  @Transform(MongoDbUtils.toObjectId('user'), { toClassOnly: true })
  @IsMongoId()
  @IsNotEmpty()
  user: UserEntity | string = ''; // reference: Product MANY_TO_ONE User

  @Expose()
  @Type(() => ObjectId)
  @Transform(MongoDbUtils.toArrayObjectId('reviews'), { toClassOnly: true })
  @IsOptional()
  @IsMongoId()
  @IsNotEmpty()
  reviews?: string[]; // reference: Product MANY_TO_ONE Review

  @Expose()
  @Type(() => ReviewEntity)
  _reviews?: ReviewEntity[] | string[];

  constructor() {
    super();
  }

  getPrimaryKeys(): string[] {
    return [];
  }
}
