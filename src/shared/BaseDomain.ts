export interface BaseDomain {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;

  getPrimaryKeys(): string[];
}
