import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { BaseApiEntity } from '../../entity/BaseApiEntity';
import { User } from './User';

export class UserEntity extends BaseApiEntity implements User {
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

  getPrimaryKeys(): string[] {
    return ['email'];
  }
}
