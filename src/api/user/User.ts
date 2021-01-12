import { ApiEntity } from '../../entity/ApiEntity';
import { ApplicationRole } from '../../role/ApplicationRole';

export interface User extends ApiEntity {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  roles?: ApplicationRole[];
}
