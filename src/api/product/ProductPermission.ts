import { CrudPermission } from '@spetushkou/api-expressjs';

export interface ProductPermission extends CrudPermission {
  productPublish: boolean;
}
