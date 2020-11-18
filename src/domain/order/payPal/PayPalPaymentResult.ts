import { Expose, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

class Payer {
  @Expose()
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email_address?: string;
}

export class PayPalPaymentResult {
  @Expose()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  status?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  update_time?: string;

  @Expose()
  @Type(() => Payer)
  @IsOptional()
  @ValidateNested()
  payer?: Payer;
}
