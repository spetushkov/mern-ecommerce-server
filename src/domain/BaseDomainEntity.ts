import { BaseEntity } from '@spetushkou/api-expressjs';
import { Expose } from 'class-transformer';

export abstract class BaseDomainEntity extends BaseEntity {
  @Expose()
  id = '';

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
