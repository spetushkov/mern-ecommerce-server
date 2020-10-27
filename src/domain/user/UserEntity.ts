import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { User } from '../../shared/User';
import { BaseDomainEntity } from '../BaseDomainEntity';

export class UserEntity extends BaseDomainEntity implements User {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name = '';

  @Expose()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email = '';

  @Expose()
  @Exclude({ toPlainOnly: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password = '';

  @Expose()
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isAdmin? = false;

  constructor() {
    super();
  }

  getPrimaryKeys(): string[] {
    return ['email'];
  }
}
