import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BaseDomainEntity } from '../BaseDomainEntity';
import { ProductEntity } from '../product/ProductEntity';
import { UserEntity } from '../user/UserEntity';
import { Order } from './Order';

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

class PaymentResult {
  @Expose()
  @IsOptional()
  @IsString()
  id?: string;

  @Expose()
  @IsOptional()
  @IsString()
  status?: string;

  @Expose()
  @IsOptional()
  @IsString()
  update_time?: string;

  @Expose()
  @IsOptional()
  @IsString()
  email_address?: string;
}

export class OrderEntity extends BaseDomainEntity implements Order {
  @Expose()
  @IsMongoId()
  @IsNotEmpty()
  user: UserEntity | string = ''; // reference: Order MANY_TO_ONE User

  @Expose()
  @Type(() => OrderItem)
  @IsOptional()
  @ValidateNested()
  orderItems?: OrderItem[]; // reference (embedded doc): Order ONE_TO_ONE OrderItem

  @Expose()
  @Type(() => ShippingAddress)
  @IsOptional()
  @ValidateNested()
  shippingAddress?: ShippingAddress;

  @Expose()
  @IsString()
  @IsNotEmpty()
  paymentMethod = '';

  @Expose()
  @Type(() => PaymentResult)
  @IsOptional()
  @ValidateNested()
  paymentResult?: PaymentResult;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  taxPrice = 0.0;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  shippingPrice = 0.0;

  @Expose()
  @IsBoolean()
  @IsNotEmpty()
  isPaid = false;

  @Expose()
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  paidAt?: Date;

  @Expose()
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
