import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseDomainEntity } from '../BaseDomainEntity';
import { Config } from './Config';

export class ConfigEntity extends BaseDomainEntity implements Config {
  @Expose()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  payPalClientId?: string;

  constructor() {
    super();
  }

  getPrimaryKeys(): string[] {
    return [];
  }
}
