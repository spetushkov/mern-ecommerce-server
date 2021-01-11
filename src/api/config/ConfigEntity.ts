import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseApiEntity } from '../../entity/BaseApiEntity';
import { Config } from './Config';

export class ConfigEntity extends BaseApiEntity implements Config {
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
