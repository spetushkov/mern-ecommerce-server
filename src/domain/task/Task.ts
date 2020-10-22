import { Expose, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseDomainEntity } from '../BaseDomainEntity';
import { Responsible } from '../user/Responsible';
import { User } from '../user/User';

export class Task extends BaseDomainEntity {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name = '';

  @Expose()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  assignee?: string;

  @Expose()
  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  dueDateStr?: string;

  dueDate?: Date;

  @Expose()
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  projects?: string[];

  @Expose()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @Expose()
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isCompleted?: boolean;

  @Expose()
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  comments?: string[];

  @Expose()
  @IsOptional()
  userId = ''; // authorized user id

  @Expose()
  @Type(() => User)
  @IsOptional()
  author?: User | string; // ext. reference: user as author ONE_TO_MANY task

  @Expose()
  @Type(() => Responsible)
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsMongoId({
    each: true,
  })
  responsibles?: Responsible[] | string[]; // ext. reference: user as responsibles MANY_TO_MANY task

  constructor() {
    super();
  }

  getPrimaryKeys(): string[] {
    return ['name'];
  }
}
