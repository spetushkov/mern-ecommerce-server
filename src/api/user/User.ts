import { ApiEntity } from '../../entity/ApiEntity';
import { ApplicationRole } from '../../role/application/ApplicationRole';

export interface User extends ApiEntity {
  name: string;
  email: string;
  password: string;
  roles?: ApplicationRole[];
}
