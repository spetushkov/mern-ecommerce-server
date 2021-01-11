export interface ApiEntity {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;

  getPrimaryKeys(): string[];
}
