import { Exclude, Expose, Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsAlphanumeric,
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Max,
  Min,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import moment, { Moment } from 'moment';
import { BaseDomainEntity } from '../BaseDomainEntity';
import { Profile } from '../profile/Profile';
import { LengthBetween } from './validation/LengthBetween';
import { UserDescriptionValidator } from './validation/UserDescriptionValidator';

export class User extends BaseDomainEntity {
  @Expose()
  @IsOptional()
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  name?: string;

  @Expose()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email = '';

  @Expose()
  @Exclude({ toPlainOnly: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message:
      '$target.$property: Password is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  password = '';

  @Expose()
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @MinLength(3, {
    each: true,
  })
  roles?: string[];

  @Expose()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Validate(UserDescriptionValidator, [1, 20], {
    message: 'Description is too short or long!',
  })
  description?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @LengthBetween([1, 10], {
    message: 'Notes is too short or long!',
  })
  notes?: string;

  @Expose()
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isActive?: boolean;

  @Expose()
  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  @Min(18)
  @Max(99)
  @IsNotEmpty()
  age?: number;

  @Expose()
  @IsOptional()
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  imageUri?: string;

  @Expose()
  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  address?: {
    country: string;
    city: string;
    street: string;
    building: number | null;
    apartment: number;
    isEU: boolean;
    labels: string[];
  };

  @Expose()
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  registrationDate?: Date;

  @Expose()
  @Type(() => Date)
  @Transform((value) => (value ? moment(value) : null), { toClassOnly: true })
  @IsOptional()
  @IsNotEmpty()
  enrollmentDate?: Moment;

  @Expose()
  @Type(() => Boolean)
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isRegistered?: boolean;

  @Expose()
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  registrationCount?: number;

  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  registrationFirstName?: string;

  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  registrationLastName?: string;

  @Expose({ name: 'registrationFullName' })
  getRegistrationFullName(): string {
    return this.registrationFirstName + ' ' + this.registrationLastName;
  }

  @Expose()
  @Type(() => Profile)
  @IsOptional()
  @ValidateNested()
  profile?: Profile; // reference (embedded doc): user ONE_TO_ONE profile

  constructor() {
    super();
  }

  getPrimaryKeys(): string[] {
    return ['email'];
  }
}
