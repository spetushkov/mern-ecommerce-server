import { BaseEntity } from '@spetushkou/api-expressjs';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { BaseDomain } from '../shared/BaseDomain';

export abstract class BaseDomainEntity extends BaseEntity implements BaseDomain {
  @Expose({ name: '_id' })
  @Exclude()
  @Type(() => ObjectId)
  @Transform(
    (value, obj) => {
      return value ? value.toString() : obj.id;
    },
    { toClassOnly: true },
  )
  id = '';

  @Expose({ name: 'id' })
  getId = (): string => this.id;

  @Expose()
  createdAt?: string;

  @Expose()
  createdBy?: string;

  @Expose()
  updatedAt?: string;

  @Expose()
  updatedBy?: string;

  abstract getPrimaryKeys(): string[];
}
