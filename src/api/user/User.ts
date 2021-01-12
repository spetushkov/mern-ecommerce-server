import { ApiEntity } from '../../entity/ApiEntity';
import { Role } from '../../role/Role';

export interface User extends ApiEntity {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  roles: Role[];
}
