import { BaseEntity } from '@spetushkou/api-expressjs';
import { Expose } from 'class-transformer';

export abstract class BaseDomainEntity extends BaseEntity {
  @Expose()
  id = '';

  @Expose()
  createdAtIso?: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  createdBy?: string;

  @Expose()
  updateAtIso?: string;

  @Expose()
  updateAt?: Date;

  @Expose()
  updatedBy?: string;

  abstract getPrimaryKeys(): string[];
}
