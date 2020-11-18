import { Expose, Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongodb';
import { MongoDbUtils } from '../../repository/mongodb/MongoDbUtils';
import { BaseDomainEntity } from '../BaseDomainEntity';
import { ProductEntity } from '../product/ProductEntity';
import { UserEntity } from '../user/UserEntity';
import { Order } from './Order';
import { PaymentMethod } from './PaymentMethod';
import { PayPalPaymentResult } from './payPal/PayPalPaymentResult';

class OrderItem {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name = '';

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  quantity = 0;

  @Expose()
  @IsString()
  @IsNotEmpty()
  image = '';

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  price = 0.0;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  countInStock = 0;

  @Expose()
  @Type(() => ObjectId)
  @Transform(MongoDbUtils.toObjectId('product'), { toClassOnly: true })
  @IsMongoId()
  @IsNotEmpty()
  product: ProductEntity | string = ''; // reference: OrderItem MANY_TO_ONE Order
}

class ShippingAddress {
  @Expose()
  @IsString()
  @IsNotEmpty()
  address = '';

  @Expose()
  @IsString()
  @IsNotEmpty()
  city = '';

  @Expose()
  @IsString()
  @IsNotEmpty()
  postalCode = '';

  @Expose()
  @IsString()
  @IsNotEmpty()
  country = '';
}

export class OrderEntity extends BaseDomainEntity implements Order {
  @Expose()
  @Type(() => UserEntity)
  @IsOptional()
  @IsMongoId()
  @IsNotEmpty()
  user?: UserEntity | string; // reference: Order MANY_TO_ONE User

  @Expose()
  @Type(() => OrderItem)
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  orderItems: OrderItem[] = []; // reference (embedded doc): Order ONE_TO_ONE OrderItem

  @Expose()
  @Type(() => ShippingAddress)
  @ValidateNested()
  shippingAddress = null;

  @Expose()
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod = null;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  orderItemsPrice = 0.0;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  shippingPrice = 0.0;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  taxPrice = 0.0;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  totalPrice = 0.0;

  @Expose()
  @Type(() => PayPalPaymentResult)
  @IsOptional()
  @ValidateNested()
  paymentResult?: PayPalPaymentResult;

  @Expose()
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isPaid? = false;

  @Expose()
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  paidAt?: Date;

  @Expose()
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isDelivered = false;

  @Expose()
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  deliveredAt?: Date;

  getPrimaryKeys(): string[] {
    return [];
  }
}
